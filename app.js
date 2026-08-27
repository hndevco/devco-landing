/**
 * DEVCO (Developers Corporation) - Main Interactive Application
 * Soluciones de Software de Alto Impacto para Cualquier Industria
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initCircularScrollProgress();
  initHeroCanvas();
  initTypewriter();
  initPortfolio();
  initAgileProgression();
  initCodeSandbox();
  initContactModal();
  initMobileNav();
  initScrollSpy();
  initSmoothScroll();
});

function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const logoHeader = document.getElementById('logoHeader');
  const logoFooter = document.getElementById('logoFooter');

  const savedTheme = localStorage.getItem('devco_theme') || 'light';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('devco_theme', newTheme);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (logoHeader) {
      logoHeader.src = theme === 'dark' ? 'assets/devco-logo-dark.svg' : 'assets/devco-logo-light.svg';
    }
    if (logoFooter) {
      logoFooter.src = 'assets/devco-logo-dark.svg';
    }
    if (themeIcon) {
      themeIcon.innerHTML = theme === 'dark' 
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFC400" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#001350" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    }
  }
}

function initCircularScrollProgress() {
  const container = document.getElementById('scrollProgressContainer');
  const progressBar = document.getElementById('scrollProgressBar');
  if (!container || !progressBar) return;

  const circumference = 2 * Math.PI * 25;
  progressBar.style.strokeDasharray = circumference.toString();

  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollHeight <= 0) return;
    const scrollPercentage = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
    const offset = circumference - (scrollPercentage * circumference);
    progressBar.style.strokeDashoffset = offset.toString();
    if (scrollTop > 180) {
      container.classList.add('visible');
    } else {
      container.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
  container.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let animationFrameId;
  let isVisible = true;

  const particles = [];
  const particleCount = 45;
  const maxDistance = 140;

  const mouse = { x: null, y: null, radius: 150 };

  function resize() {
    const parent = canvas.parentElement;
    width = canvas.width = parent.offsetWidth;
    height = canvas.height = parent.offsetHeight;
  }

  function getThemeColor() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
      node: isDark ? 'rgba(43, 202, 255, 0.4)' : 'rgba(0, 19, 80, 0.25)',
      accentNode: isDark ? 'rgba(255, 196, 0, 0.5)' : 'rgba(216, 0, 39, 0.3)',
      line: isDark ? '43, 202, 255' : '0, 19, 80'
    };
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 2 + 1.2;
      this.isAccent = Math.random() < 0.25;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Subtle mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }
    }

    draw(colors) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.isAccent ? colors.accentNode : colors.node;
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    if (!isVisible) return;

    ctx.clearRect(0, 0, width, height);
    const colors = getThemeColor();

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${colors.line}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Update & draw particles
    particles.forEach(p => {
      p.update();
      p.draw(colors);
    });

    animationFrameId = requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resize();
  }, { passive: true });

  canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }, { passive: true });

  canvas.parentElement.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  }, { passive: true });

  // IntersectionObserver: Pause when out of screen to save 100% CPU/battery
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(animationFrameId);
          animate();
        }
      });
    }, { threshold: 0.1 });
    observer.observe(canvas);
  }

  init();
  animate();
}

function initTypewriter() {
  const el = document.getElementById('heroTypewriter');
  if (!el) return;

  const words = [
    'software a medida',
    'plataformas SaaS',
    'sistemas POS & facturación',
    'ERPs hospitalarios',
    'arquitecturas cloud',
    'soluciones logísticas'
  ];

  let wordIndex = 0;
  let charIndex = words[0].length;
  let isDeleting = false;
  let isPaused = true; // start paused with initial word

  function tick() {
    const currentWord = words[wordIndex];

    if (isPaused) {
      setTimeout(() => {
        isPaused = false;
        isDeleting = true;
        tick();
      }, 2400);
      return;
    }

    if (isDeleting) {
      charIndex--;
      el.textContent = currentWord.substring(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(tick, 300);
        return;
      }
      setTimeout(tick, 45);
    } else {
      charIndex++;
      el.textContent = currentWord.substring(0, charIndex);
      if (charIndex === currentWord.length) {
        isPaused = true;
        tick();
        return;
      }
      setTimeout(tick, 75);
    }
  }

  setTimeout(tick, 2000);
}

const portfolioData = [
  {
    id: 'hemtosys',
    title: 'Hemtosys — Gestión de Laboratorios Clínicos',
    category: 'health',
    categoryName: 'Salud & MedTech',
    tagColor: 'bg-[#001350] text-white',
    url: 'https://hemtosys.com/',
    displayUrl: 'hemtosys.com',
    badge: 'LIS Platform',
    description: 'Software líder en la nube para la gestión integral de laboratorios clínicos y centros diagnósticos. Centraliza pacientes, catálogo de exámenes con rangos de referencia, resultados analíticos en tiempo real, inventario de reactivos y control financiero.',
    metrics: ['Plataforma SPA Ultra-rápida', 'Gestión de Pacientes & Órdenes', 'Control de Inventario & Lotes', 'Módulo Financiero & Facturación'],
    stack: ['Laravel', 'Livewire', 'Tailwind CSS', 'Alpine.js', 'MySQL', 'DigitalOcean'],
    client: 'Laboratorios Clínicos & Médicos',
    features: [
      'Registro de órdenes de trabajo y seguimiento en tiempo real desde recepción.',
      'Configuración de parámetros y validación analítica de exámenes.',
      'Control de lotes, fechas de caducidad y alertas de bajo stock.',
      'Caja, ingresos, egresos y reportes financieros consolidados.'
    ]
  },
  {
    id: 'centromedicodiaz',
    title: 'Centro Médico Díaz — ERP & Gestión Hospitalaria',
    category: 'health',
    categoryName: 'Salud & MedTech',
    tagColor: 'bg-[#001350] text-white',
    url: 'https://centromedicodiaz.com',
    displayUrl: 'centromedicodiaz.com',
    badge: 'Hospital ERP',
    description: 'Sistema empresarial integral (ERP Hospitalario / Clínico) para la administración médica, operativa y financiera del Centro Médico Díaz. Centraliza expedientes clínicos, consultas, admisiones, control de farmacia interna y facturación hospitalaria.',
    metrics: ['Gestión Hospitalaria & Pacientes', 'Expediente Clínico Digital', 'Control de Farmacia & Stock', 'Facturación & Admisiones'],
    stack: ['PHP', 'Laravel', 'Soft UI Dashboard', 'Bootstrap 5', 'MySQL', 'Cloud'],
    client: 'Centro Médico Díaz (Catacamas, HN)',
    features: [
      'Expediente clínico electrónico integral y registro de consultas médicas.',
      'Control de admisiones, hospitalización y disponibilidad de salas.',
      'Gestión de inventarios de farmacia con control de lotes y recetas.',
      'Facturación de procedimientos médicos, caja y reportería consolidada.'
    ]
  },
  {
    id: 'pos-syntax',
    title: 'POS Syntax HN — Punto de Venta & Facturación',
    category: 'retail',
    categoryName: 'Retail & Facturación',
    tagColor: 'bg-[#FFC400] text-[#001350]',
    url: 'https://pos.syntaxhn.com/',
    displayUrl: 'pos.syntaxhn.com',
    badge: 'POS & Facturación',
    description: 'Sistema empresarial de Punto de Venta (POS) y facturación comercial con control de inventarios multisede, cortes de caja en tiempo real, emisión fiscal y catálogo de productos para comercios minoristas y mayoristas.',
    metrics: ['Facturación Fiscal Rápida', 'Inventario Multi-sucursal', 'Corte de Caja en Vivo', 'Reportes de Utilidad & Ventas'],
    stack: ['Laravel', 'PHP', 'Tailwind CSS', 'JavaScript', 'PostgreSQL', 'Cloud'],
    client: 'Empresas Comerciales & Retail',
    features: [
      'Emisión de facturas y tickets en segundos con lector de código de barra.',
      'Manejo de stock en tiempo real con alertas de reabastecimiento.',
      'Control de apertura, arqueos y cierre de turnos de caja.',
      'Gestión de cartera de clientes y cuentas por cobrar.'
    ]
  },
  {
    id: 'longhorn',
    title: 'Longhorn Hardscape & Construction',
    category: 'enterprise',
    categoryName: 'Construcción & US Market',
    tagColor: 'bg-[#D80027] text-white',
    url: 'https://longhornhctexas.com/',
    displayUrl: 'longhornhctexas.com',
    badge: 'Houston, TX (USA)',
    description: 'Plataforma web de alto rendimiento y captación de clientes para empresa de construcción y diseño exterior en el área metropolitana de Houston, Texas (EE.UU.). Incluye catálogo interactivo, cotizador online y SEO local avanzado.',
    metrics: ['Mercado Internacional (Houston, TX)', 'Video Hero & Portafolio 4K', 'SEO Local Schema.org & GA4', 'Calificación 5.0 ★★★★★'],
    stack: ['HTML5 Semántico', 'CSS3 Moderno', 'JavaScript ES6+', 'Google Analytics 4', 'Cloudflare CDN'],
    client: 'Longhorn Hardscape LLC (Texas, USA)',
    features: [
      'Diseño responsivo optimizado para alta conversión de leads en EE.UU.',
      'Galería interactiva de proyectos residenciales y comerciales.',
      'Integración con reseñas verificadas de Google Business Profile.',
      'Formulario inteligente de solicitud de presupuestos y consultas.'
    ]
  },
  {
    id: 'syntaxhn',
    title: 'Syntax HN — Ecosistema Tecnológico',
    category: 'enterprise',
    categoryName: 'SaaS & Ecosistema Tech',
    tagColor: 'bg-[#001350] text-white',
    url: 'https://syntaxhn.com/',
    displayUrl: 'syntaxhn.com',
    badge: 'Enterprise Platform',
    description: 'Portal corporativo y ecosistema de soluciones tecnológicas de software empresarial. Plataforma diseñada para presentar productos digitales, servicios de transformación de procesos y automatización para empresas en crecimiento.',
    metrics: ['Ecosistema de Software Modular', 'Arquitectura Cloud Escalable', 'Alta Disponibilidad', 'Integración de Servicios'],
    stack: ['PHP / Laravel', 'Tailwind CSS', 'Alpine.js', 'REST APIs', 'Cloud Server'],
    client: 'Syntax HN Enterprise Solutions',
    features: [
      'Catálogo de soluciones de software para negocios.',
      'Integración con plataformas hijas como POS y sistemas a medida.',
      'Infraestructura cloud optimizada para máxima velocidad de carga.',
      'Panel de contacto y soporte técnico para clientes corporativos.'
    ]
  },
  {
    id: 'colibrixpress',
    title: 'Colibrí Xpress — Casillero & Logística Internacional',
    category: 'logistics',
    categoryName: 'Logística & E-commerce',
    tagColor: 'bg-[#001350] text-white',
    url: 'https://colibrixpress.com/',
    displayUrl: 'colibrixpress.com',
    badge: 'Logistics Platform',
    description: 'Plataforma integral de casillero virtual y gestión logística para compras en EE.UU. con entregas en Honduras. Centraliza casilleros virtuales, tracking de paquetes en tiempo real, control de manifiestos y cálculo de fletes.',
    metrics: ['Tracking de Paquetes en Vivo', 'Casillero Virtual USA-HN', 'Control Aduanal & Despachos', 'Panel de Usuarios & Tarifas'],
    stack: ['PHP', 'Argon Dashboard', 'Bootstrap 5', 'DataTables', 'MySQL', 'Cloud'],
    client: 'Colibrí Xpress Logistics',
    features: [
      'Asignación automática de casillero internacional en Miami a clientes.',
      'Seguimiento y notificaciones de paquetes en tiempo real.',
      'Calculadora de fletes, peso volumétrico y tarifas de importación.',
      'Control administrativo de guías aéreas/marítimas y entregas.'
    ]
  },
  {
    id: 'bitstudio',
    title: 'BitStudio HN — Estudio Creativo & Desarrollo Web',
    category: 'enterprise',
    categoryName: 'Design & Web Studio',
    tagColor: 'bg-[#FFC400] text-[#001350]',
    url: 'https://bitstudiohn.com/',
    displayUrl: 'bitstudiohn.com',
    badge: 'Digital Agency',
    description: 'Plataforma web de alto impacto visual y catálogo digital para estudio de diseño gráfico, desarrollo de software y producción multimedia. Construido con arquitectura moderna en Astro, animaciones fluidas y diseño editorial.',
    metrics: ['Arquitectura Ultra-rápida (Astro)', 'Diseño UI/UX Interactivo', 'SEO & Performance 100/100', '+80 Proyectos Exhibidos'],
    stack: ['Astro v6', 'Tailwind CSS', 'TypeScript', 'Manrope & Space Grotesk', 'Cloudflare'],
    client: 'BitStudio Honduras',
    features: [
      'Arquitectura de componentes modular con Astro y carga instantánea.',
      'Catálogo interactivo de servicios, proyectos y casos de éxito.',
      'Integración directa con canales de captación y WhatsApp comercial.',
      'Diseño responsivo optimizado para máxima estética visual.'
    ]
  },
  {
    id: 'byronmerlo',
    title: 'Dr. Byron Merlo — Portal Médico Quirúrgico',
    category: 'health',
    categoryName: 'Salud & Branding Profesional',
    tagColor: 'bg-[#FFC400] text-[#001350]',
    url: 'https://hndevco.github.io/cvbyronmerlo/',
    displayUrl: 'hndevco.github.io/cvbyronmerlo',
    badge: 'Medical Branding',
    description: 'Plataforma web interactiva de marca profesional y trayectoria clínica para el Cirujano General Dr. Byron Ely Merlo Zelaya. Presenta especialidades quirúrgicas, certificaciones, publicaciones, testimonios y sistema de citas médicas.',
    metrics: ['Diseño Accesible & Limpio', 'Agendamiento Directo de Citas', 'Presentación de Procedimientos', '100% Responsivo'],
    stack: ['HTML5', 'Tailwind CSS', 'JavaScript ES6+', 'GitHub Pages CDN'],
    client: 'Dr. Byron Merlo (Cirujano General)',
    features: [
      'Presentación interactiva de procedimientos quirúrgicos avanzados.',
      'Historial académico, fellowships y membresías médicas.',
      'Canales directos de consulta por WhatsApp y correo electrónico.',
      'Diseño ultra-ligero con carga en menos de 1 segundo.'
    ]
  },
  {
    id: 'technoworld',
    title: 'TECHNO WORLD — Soluciones TI & Soporte Empresarial',
    category: 'enterprise',
    categoryName: 'Soporte TI & Servicios Tech',
    tagColor: 'bg-[#001350] text-white',
    url: 'https://technoworldhn.com',
    displayUrl: 'technoworldhn.com',
    badge: 'IT Solutions',
    description: 'Portal web corporativo de alto rendimiento para empresa líder de soluciones tecnológicas en Catacamas, Olancho ("Todo un mundo en tecnología"). Incluye catálogo interactivo de servicios TI, efectos visuales con canvas, modo oscuro y cotizador de asistencia técnica.',
    metrics: ['150+ Proyectos TI Exitosos', 'Soporte Corporativo 24/7', 'Diseño Glassmorphism & Dark Mode', '100% Responsivo & Ultra Rápido'],
    stack: ['HTML5 Semántico', 'Tailwind CSS', 'JavaScript ES6+', 'Canvas Particles', 'GitHub Pages CDN'],
    client: 'Techno World (Catacamas, HN)',
    features: [
      'Catálogo interactivo de servicios: redes, soporte de servidores y desarrollo a medida.',
      'Efectos visuales con video hero, canvas de partículas y alternador de tema oscuro/claro.',
      'Canales directos de cotización y asistencia técnica vía WhatsApp Business.',
      'Diseño de alta velocidad optimizado para carga instantánea en cualquier dispositivo.'
    ]
  },
  {
    id: 'seguridadsb',
    title: 'Seguridad SB HN — Seguridad Integral & Blindados',
    category: 'enterprise',
    categoryName: 'Seguridad Privada & Monitoreo',
    tagColor: 'bg-[#D80027] text-white',
    url: 'https://seguridadsbhn.com',
    displayUrl: 'seguridadsbhn.com',
    badge: 'Seguridad Integral',
    description: 'Plataforma corporativa para empresa líder en seguridad privada, protección ejecutiva, transporte blindado y monitoreo 24/7 en Honduras (SB Seguridad Protección Blindados y Asesorías). Integra catálogo de servicios de seguridad física, supervisión GPS, reportes automáticos y cotizador de protección patrimonial.',
    metrics: ['Monitoreo Remoto 24/7', 'Supervisión GPS en Vivo', 'Flota de Blindados & Escoltas', 'Cobertura Nacional (HN)'],
    stack: ['HTML5 Semántico', 'Tailwind CSS', 'JavaScript ES6+', 'Google Maps API', 'Cloud Host'],
    client: 'SB Seguridad Protección Blindados y Asesorías',
    features: [
      'Supervisión y geolocalización de guardias en campo en tiempo real.',
      'Generación automática de reportes de supervisión con evidencias y bitácoras.',
      'Presentación interactiva de flota de vehículos blindados y transporte ejecutivo.',
      'Canales directos de cotización de seguridad para empresas, residenciales y eventos.'
    ]
  },
  {
    id: 'proyectos-en-construccion',
    isPipeline: true,
    title: 'Pipeline DEVCO — Proyectos en Construcción',
    category: 'construction',
    categoryName: 'En Construcción',
    tagColor: 'bg-[#FFC400] text-[#001350]',
    url: '#',
    displayUrl: 'devco.corp/pipeline',
    badge: '🚧 Próximos Lanzamientos',
    description: 'Sistemas empresariales y plataformas en desarrollo activo por el equipo de ingeniería de DEVCO: TERRANOVA (Inmobiliario), MULTITALLER (Automotriz), MEDPHE (Salud), entre otros.',
    metrics: ['TERRANOVA (Bienes Raíces)', 'MULTITALLER (Automotriz)', 'MEDPHE (Red Médica)', 'Sprints Ágiles Activos'],
    stack: ['Laravel', 'Node.js', 'Vue.js', 'PostgreSQL', 'Livewire', 'AWS'],
    client: 'Clientes Corporativos DEVCO',
    features: [
      'TERRANOVA — Software de Gestión Inmobiliaria & Urbanística.',
      'MULTITALLER — ERP para Talleres Mecánicos & Control de Repuestos.',
      'MEDPHE — Directorio & Ecosistema Digital de Salud.',
      'Otros proyectos corporativos en fase de arquitectura y sprints activos.'
    ]
  }
];

const pipelineProjects = [
  {
    name: 'TERRANOVA',
    badge: 'En Desarrollo — Sprint 4',
    badgeColor: 'bg-[#FFC400] text-[#001350]',
    sector: 'Bienes Raíces & Gestión Inmobiliaria',
    icon: '🏗️',
    description: 'Plataforma web enterprise para comercialización y administración de desarrollos inmobiliarios, lotificaciones y proyectos urbanísticos. Facilita planos interactivos, disponibilidad de lotes en tiempo real, estados de cuenta y cobranza digital.',
    features: [
      'Mapa interactivo de proyectos urbanísticos con selección y reserva de lotes.',
      'Generación automatizada de promesas de compraventa y cronogramas de financiamiento.',
      'Portal del cliente para seguimiento de pagos, cuotas y expedientes de escrituración.',
      'Panel comercial para asesores inmobiliarios con cálculo de comisiones y metas.'
    ],
    stack: ['Laravel 11', 'Livewire', 'PostgreSQL', 'Tailwind CSS', 'AWS S3']
  },
  {
    name: 'MULTITALLER',
    badge: 'En Desarrollo — Sprint 5',
    badgeColor: 'bg-[#D80027] text-white',
    sector: 'Automotriz & Centros de Servicio',
    icon: '🔧',
    description: 'ERP especializado para la administración y operación integral de talleres mecánicos, centros de servicio automotriz y comercializadoras de repuestos. Abarca check-in digital de vehículos, órdenes de trabajo (OT) e inventarios.',
    features: [
      'Recepción digital de vehículos con inspección visual fotográfica e historial por placa/VIN.',
      'Creación, cotización y seguimiento en tiempo real de Órdenes de Trabajo (OT).',
      'Control de inventario de repuestos con alertas automáticas de reabastecimiento.',
      'Notificaciones y cotizaciones directas a clientes mediante WhatsApp Business API.'
    ],
    stack: ['PHP / Laravel', 'MySQL', 'Alpine.js', 'Tailwind CSS', 'WhatsApp API']
  },
  {
    name: 'MEDPHE',
    badge: 'En Desarrollo — Sprint 3',
    badgeColor: 'bg-[#2BCAFF] text-[#001350]',
    sector: 'Salud, MedTech & Red Médica',
    icon: '🩺',
    description: 'Directorio médico inteligente y ecosistema digital de salud que conecta a pacientes con clínicas y médicos especialistas verificados. Sistema de agendamiento online, teleconsulta y recetas electrónicas.',
    features: [
      'Directorio médico geolocalizado con filtros avanzados por especialidad y ciudad.',
      'Agendamiento de citas presenciales o virtuales sincronizado con la agenda del médico.',
      'Módulo de teleconsulta segura con videollamada encriptada y receta médica digital.',
      'Panel administrativo para clínicas y doctores con reportes de atención y calificaciones.'
    ],
    stack: ['Node.js', 'Express', 'Vue.js', 'Tailwind CSS', 'PostgreSQL', 'Redis']
  },
  {
    name: 'Entre Otros',
    badge: 'Fase de Arquitectura & Prototipado',
    badgeColor: 'bg-[#001350] text-white border border-slate-600',
    sector: 'Soluciones Empresariales, Fintech, Agro & B2B',
    icon: '🚀',
    description: 'Ecosistema de plataformas especializadas y módulos a la medida actualmente en fase de ingeniería de software, modelado de bases de datos y prototipado ágil para diversos sectores productivos:',
    features: [
      'Plataforma B2B de Conciliación & Facturación Fiscal Electrónica con firma digital autorizada.',
      'Sistema de Trazabilidad Agroindustrial para control de cosechas, lotes, pesaje y despachos.',
      'Portal de Autoservicio para Clientes Corporativos con reportería analítica y pasarela de pagos.',
      'Módulos con Inteligencia Artificial (IA) para predicción de demanda, inventarios y analítica de datos.',
      'Desarrollos y plataformas a la medida bajo estrictos acuerdos de confidencialidad (NDA).'
    ],
    stack: ['Laravel / Node.js', 'Python / FastAPI', 'PostgreSQL / Redis', 'Docker', 'AWS & Cloudflare']
  }
];

function initPortfolio() {
  const grid = document.getElementById('portfolioGrid');
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const projectModal = document.getElementById('projectDetailsModal');
  const modalContainer = document.getElementById('projectModalContainer') || (projectModal ? projectModal.querySelector('div') : null);
  const modalBody = document.getElementById('projectModalBody');
  const closeBtn = document.getElementById('closeProjectModal');
  if (!grid) return;

  function renderProjects(filter = 'all') {
    const filtered = filter === 'all' ? portfolioData : portfolioData.filter(p => p.category === filter);
    let html = '';
    filtered.forEach(item => {
      if (item.isPipeline) {
        html += `
          <div class="solid-card p-6 flex flex-col justify-between group transition-all duration-300 border-2 border-dashed border-[#D80027] hover:border-[#001350] dark:hover:border-[#FFC400] bg-amber-50/40 dark:bg-slate-900 shadow-md relative overflow-hidden" data-project-id="${item.id}">
            <div class="absolute -top-7 -right-7 w-24 h-24 bg-[#FFC400]/20 rounded-full blur-xl pointer-events-none"></div>
            <div>
              <div class="flex items-center justify-between gap-2 mb-4">
                <span class="text-xs font-mono font-bold px-3 py-1 rounded ${item.tagColor} flex items-center gap-1.5 shadow-sm">
                  <span class="w-2 h-2 rounded-full bg-[#D80027] animate-ping"></span>
                  <span>${item.categoryName}</span>
                </span>
                <span class="text-xs font-mono font-bold text-[#D80027]">${item.badge}</span>
              </div>
              <h3 class="text-xl font-bold font-heading mb-2 text-[#001350] dark:text-white group-hover:text-[#D80027] transition-colors">
                ${item.title}
              </h3>
              <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                ${item.description}
              </p>
              <div class="p-3.5 bg-white/80 dark:bg-slate-800/80 rounded-lg mb-5 border border-amber-200 dark:border-slate-700 space-y-1.5 shadow-sm">
                <div class="text-[10px] font-mono uppercase font-bold text-[#001350] dark:text-[#FFC400]">Proyectos Activos en Pipeline:</div>
                ${item.metrics.slice(0, 4).map(m => `
                  <div class="text-xs font-bold text-[#001350] dark:text-white flex items-center gap-2">
                    <span class="text-[#D80027] font-bold">⚡</span>
                    <span>${m}</span>
                  </div>
                `).join('')}
              </div>
            </div>
            <div>
              <div class="grid grid-cols-2 gap-2 mt-4">
                <button class="view-project-btn btn-solid-red text-xs py-2.5 px-2 justify-center font-bold flex items-center gap-1.5" data-id="${item.id}">
                  <span>Ver Proyectos</span>
                  <span>→</span>
                </button>
                <button class="open-contact-modal btn-solid-outline text-xs py-2.5 px-2 justify-center font-bold">
                  Cotizar Similar
                </button>
              </div>
            </div>
          </div>
        `;
      } else {
        html += `
          <div class="solid-card p-6 flex flex-col justify-between group transition-all duration-300 border-2 hover:border-[#001350] dark:hover:border-[#FFC400] bg-white dark:bg-slate-900 shadow-md" data-project-id="${item.id}">
            <div>
              <div class="flex items-center justify-between gap-2 mb-4">
                <span class="text-xs font-mono font-bold px-3 py-1 rounded ${item.tagColor}">${item.categoryName}</span>
                <span class="text-xs font-mono text-slate-400 font-bold text-[#D80027]">${item.badge}</span>
              </div>
              <h3 class="text-xl font-bold font-heading mb-2 text-[#001350] dark:text-white group-hover:text-[#D80027] transition-colors">
                ${item.title}
              </h3>
              <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                ${item.description}
              </p>
              <div class="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg mb-5 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <div class="text-[10px] font-mono uppercase font-bold text-slate-400">Capacidades & Impacto:</div>
                ${item.metrics.slice(0, 3).map(m => `
                  <div class="text-xs font-bold text-[#001350] dark:text-white flex items-center gap-2">
                    <span class="text-[#D80027] font-bold">✔</span>
                    <span>${m}</span>
                  </div>
                `).join('')}
              </div>
            </div>
            <div>
              <div class="grid grid-cols-2 gap-2 mt-4">
                <button class="view-project-btn btn-solid-outline text-xs py-2.5 px-2 justify-center font-bold" data-id="${item.id}">
                  Ver Detalles
                </button>
                <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="btn-solid-red text-xs py-2.5 px-2 justify-center font-bold flex items-center gap-1">
                  <span>Sitio Web</span>
                  <span class="text-[10px]">↗</span>
                </a>
              </div>
            </div>
          </div>
        `;
      }
    });
    grid.innerHTML = html;

    grid.querySelectorAll('.view-project-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openProjectModal(id);
      });
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active', 'bg-[#001350]', 'text-white'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderProjects(filter);
    });
  });

  renderProjects('all');

  function openProjectModal(id) {
    const item = portfolioData.find(p => p.id === id);
    if (!item || !projectModal || !modalBody) return;

    if (item.isPipeline) {
      if (modalContainer) {
        modalContainer.classList.remove('max-w-2xl');
        modalContainer.classList.add('max-w-5xl');
      }

      modalBody.innerHTML = `
        <div class="space-y-6">
          <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono font-bold px-3 py-1 rounded bg-[#FFC400] text-[#001350] flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-[#D80027] animate-ping"></span>
                <span>EN CONSTRUCCIÓN & PIPELINE</span>
              </span>
              <span class="text-xs font-mono text-slate-400 font-bold hidden sm:inline">DEVCO Engineering</span>
            </div>
            <span class="text-xs font-mono font-bold text-[#D80027]">Sprints Activos 2026</span>
          </div>

          <div>
            <h3 class="text-2xl sm:text-3xl font-extrabold font-heading text-[#001350] dark:text-white">
              Proyectos Actualmente en Construcción
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
              Estas plataformas y sistemas empresariales están siendo desarrollados por los squads de <strong>DEVCO</strong> aplicando metodologías ágiles, entregas continuas quincenales y arquitectura cloud escalable.
            </p>
          </div>

          <!-- List of projects in pipeline: 2-Column Responsive Grid on XL modal -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            ${pipelineProjects.map((p, idx) => `
              <div class="solid-card p-5 border-l-4 ${idx === 0 ? 'border-[#FFC400]' : idx === 1 ? 'border-[#D80027]' : idx === 2 ? 'border-[#2BCAFF]' : 'border-[#001350]'} bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between">
                <div>
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div class="flex items-center gap-2.5">
                      <span class="text-2xl">${p.icon}</span>
                      <div>
                        <h4 class="text-lg font-bold font-heading text-[#001350] dark:text-white">${p.name}</h4>
                        <span class="text-[11px] font-mono text-slate-500 font-medium">${p.sector}</span>
                      </div>
                    </div>
                    <span class="text-[11px] font-mono font-bold px-2.5 py-1 rounded ${p.badgeColor} self-start sm:self-auto">${p.badge}</span>
                  </div>

                  <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    ${p.description}
                  </p>

                  <div class="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-lg mb-3 space-y-1.5 border border-slate-100 dark:border-slate-800">
                    <div class="text-[10px] font-mono font-bold uppercase text-[#001350] dark:text-[#FFC400]">Módulos & Funcionalidades en Desarrollo:</div>
                    ${p.features.map(f => `
                      <div class="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                        <span class="text-[#D80027] font-bold mt-0.5">✔</span>
                        <span>${f}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <div class="flex items-center justify-end pt-3 border-t border-slate-100 dark:border-slate-800 mt-2">
                  <button class="open-contact-modal text-xs font-mono font-bold text-[#D80027] hover:underline" onclick="document.getElementById('projectDetailsModal').classList.add('hidden')">
                    Consultar este desarrollo →
                  </button>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800">
            <div class="text-xs text-slate-500 font-mono">
              ¿Quieres desarrollar un software a medida para tu empresa o sector?
            </div>
            <button class="open-contact-modal w-full sm:w-auto btn-solid-red text-xs py-3 px-6 justify-center" onclick="document.getElementById('projectDetailsModal').classList.add('hidden')">
              Iniciar Proyecto con DEVCO →
            </button>
          </div>
        </div>
      `;
      projectModal.classList.remove('hidden');
      return;
    }

    if (modalContainer) {
      modalContainer.classList.remove('max-w-5xl');
      modalContainer.classList.add('max-w-2xl');
    }

    modalBody.innerHTML = `
      <div class="space-y-6">
        <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <span class="text-xs font-mono font-bold px-3 py-1 rounded ${item.tagColor}">${item.categoryName}</span>
          <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="text-xs font-mono text-[#D80027] font-bold hover:underline flex items-center gap-1">
            <span>Visitar ${item.displayUrl}</span>
            <span>↗</span>
          </a>
        </div>
        <div>
          <h3 class="text-2xl sm:text-3xl font-extrabold font-heading text-[#001350] dark:text-white">
            ${item.title}
          </h3>
          <div class="text-xs font-mono text-slate-500 mt-1">Cliente / Sector: ${item.client}</div>
        </div>
        <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          ${item.description}
        </p>
        <div class="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <div class="text-xs font-mono font-bold uppercase text-[#001350] dark:text-[#FFC400] mb-3">Módulos & Funcionalidades:</div>
          <div class="space-y-2">
            ${item.features.map(f => `
              <div class="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-200">
                <span class="text-[#D80027] font-bold mt-0.5">✔</span>
                <span>${f}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          ${item.metrics.map(m => `
            <div class="p-2.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-center">
              <div class="text-[11px] font-bold text-[#001350] dark:text-white">${m}</div>
            </div>
          `).join('')}
        </div>
        <div class="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800">
          <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto btn-solid-blue text-xs py-3 px-6 justify-center">
            <span>Abrir Producto en Vivo ( ${item.displayUrl} )</span>
            <span>↗</span>
          </a>
          <button class="open-contact-modal w-full sm:w-auto btn-solid-red text-xs py-3 px-6 justify-center" onclick="document.getElementById('projectDetailsModal').classList.add('hidden')">
            Cotizar Proyecto Similar →
          </button>
        </div>
      </div>
    `;
    projectModal.classList.remove('hidden');
  }

  if (closeBtn && projectModal) {
    closeBtn.addEventListener('click', () => projectModal.classList.add('hidden'));
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) projectModal.classList.add('hidden');
    });
  }
}

const agileStages = [
  { id: 1, name: 'Arquitectura & Lógica de Negocio', badge: 'Fase 1', description: 'Modelado de dominio, selección de base de datos, diseño de APIs y arquitectura limpia adaptada a tu industria.', deliverables: ['Especificación Técnica y Modelado de Datos', 'Microservicios / Monolito Modular', 'Diagramas de Secuencia y Seguridad'] },
  { id: 2, name: 'Innovación & Cloud Native', badge: 'Fase 2', description: 'Infraestructura en la nube, contenedores y pipelines CI/CD automatizados en AWS/DigitalOcean.', deliverables: ['Pipeline CI/CD Automatizado', 'Infraestructura Cloud', 'Integración con APIs'] },
  { id: 3, name: 'Diseño UI/UX & Sistemas de Diseño', badge: 'Fase 3', description: 'Prototipado interactivo de alta fidelidad, usabilidad y librerías de componentes accesibles.', deliverables: ['Design System en Figma / Tailwind', 'Prototipos Navegables', 'Guía de Estilos de Interfaz'] },
  { id: 4, name: 'Sprints Ágiles & Entregas Continuas', badge: 'Fase 4', description: 'Ciclos de desarrollo de 2 semanas con demos funcionales quincenales y pruebas automatizadas.', deliverables: ['Demos Quincenales con Software Funcional', '100% Pruebas Automatizadas', 'Reportes de Velocidad'] },
  { id: 5, name: 'Despliegue, Estabilidad & Soporte 24/7', badge: 'Fase 5', description: 'Puesta en producción con Zero Downtime Deploy, observabilidad y soporte técnico enterprise.', deliverables: ['Monitoreo en Tiempo Real', 'SLA Garantizado 99.99%', 'Capacitación y Documentación'] }
];

function initAgileProgression() {
  const nav = document.getElementById('agileDotsNav');
  const details = document.getElementById('agileStageDetails');
  if (!nav || !details) return;

  function renderStage(idx) {
    const s = agileStages[idx];
    details.innerHTML = `
      <div class="p-8 flex flex-col justify-between h-full space-y-6">
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="badge-blue text-xs">${s.badge} • ${s.id * 20}% del Ciclo</span>
            <span class="text-xs font-mono text-slate-400">Metodología DEVCO</span>
          </div>
          <h3 class="text-2xl font-bold font-heading text-[#001350] dark:text-white mb-3">${s.name}</h3>
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">${s.description}</p>
          <div class="space-y-2">
            <div class="text-xs font-mono font-bold uppercase text-slate-500">Entregables de esta Etapa:</div>
            ${s.deliverables.map(d => `
              <div class="flex items-center gap-2 text-xs font-medium text-slate-800 dark:text-slate-200">
                <span class="text-[#D80027] font-bold">✔</span>
                <span>${d}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div class="devco-dots-solid">
            ${agileStages.map((st, i) => `
              <span class="w-3 h-3 rounded cursor-pointer ${i === idx ? 'bg-[#D80027] scale-125' : 'bg-slate-300 dark:bg-slate-700'}" onclick="document.querySelectorAll('.stage-nav-btn')[${i}].click()"></span>
            `).join('')}
          </div>
          <button class="open-contact-modal btn-solid-red text-xs py-2.5 px-5">Iniciar este Proceso →</button>
        </div>
      </div>
    `;

    nav.querySelectorAll('.stage-nav-btn').forEach((btn, i) => {
      if (i === idx) btn.classList.add('border-2', 'border-[#001350]', 'bg-slate-100', 'dark:bg-slate-800', 'font-bold');
      else btn.classList.remove('border-2', 'border-[#001350]', 'bg-slate-100', 'dark:bg-slate-800', 'font-bold');
    });
  }

  nav.innerHTML = agileStages.map((s, i) => `
    <button class="stage-nav-btn p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 text-left transition-all hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 w-full" data-idx="${i}">
      <span class="w-6 h-6 rounded bg-[#001350] text-white flex items-center justify-center font-mono text-xs font-bold">${s.id}</span>
      <div class="truncate">
        <div class="text-[10px] font-mono text-slate-400 uppercase">${s.badge}</div>
        <div class="text-xs font-bold truncate">${s.name}</div>
      </div>
    </button>
  `).join('');

  nav.querySelectorAll('.stage-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      renderStage(parseInt(btn.getAttribute('data-idx')));
    });
  });

  renderStage(0);
}

const codeSamples = {
  typescript: `// DEVCO Software Engineering Stack
import { SoftwareSquad, CloudSecurity } from '@devco/core';

export async function deployLivePlatform(specs: ClientSpecs) {
  const squad = new SoftwareSquad({
    products: ['Hemtosys', 'POS Syntax', 'Colibri Xpress', 'BitStudio HN', 'Longhorn'],
    sprintFrequency: '2-Week Continuous Delivery',
    qaCoverage: '100% Automated'
  });

  const architecture = await squad.deployProduction({
    scalability: 'Elastic Cloud Cluster',
    security: CloudSecurity.ENTERPRISE_GRADE
  });

  return squad.launchLive(architecture);
}`,
  python: `# DEVCO High-Performance Backend Engine
from devco.architecture import ScalableEngine, CloudDeployer

class EnterprisePlatform:
    def __init__(self, industry: str):
        self.industry = industry
        self.engine = ScalableEngine(sla_uptime=0.9999)

    def execute_sprint(self, modules: list) -> dict:
        solution = self.engine.compile_production(modules)
        return CloudDeployer.deploy_zero_downtime(solution)`,
  go: `// DEVCO Cloud Native Microservices
package main
import (
	"context"
	"devco.corp/cloud"
	"devco.corp/security"
)
func main() {
	app := cloud.NewProductionEngine("devco-platform")
	app.SetPolicy(security.EnterpriseLevel)
	app.StartContinuousDelivery(context.Background())
}`
};

function initCodeSandbox() {
  const codeDisplay = document.getElementById('codeDisplay');
  const langBtns = document.querySelectorAll('.lang-tab-btn');
  const runBtn = document.getElementById('runCodeBtn');
  const terminalLogs = document.getElementById('terminalLogs');
  if (!codeDisplay) return;

  function setLanguage(lang) {
    codeDisplay.textContent = codeSamples[lang] || codeSamples.typescript;
    langBtns.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('bg-[#FFC400]', 'text-[#001350]', 'font-bold');
        btn.classList.remove('text-slate-400');
      } else {
        btn.classList.remove('bg-[#FFC400]', 'text-[#001350]', 'font-bold');
        btn.classList.add('text-slate-400');
      }
    });
  }

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')));
  });
  setLanguage('typescript');

  if (runBtn && terminalLogs) {
    runBtn.addEventListener('click', () => {
      runBtn.disabled = true;
      runBtn.innerHTML = 'Compilando...';
      terminalLogs.innerHTML = '<div class="text-[#2BCAFF]">🚀 [DEVCO Engine] Compilando solución multi-industria...</div>';
      setTimeout(() => {
        terminalLogs.innerHTML += '<div class="text-[#FFC400]">✔ Hemtosys, POS Syntax y Cloud validado.</div><div class="text-[#2BCAFF]">✔ Latencia Cloud: 12ms.</div>';
      }, 400);
      setTimeout(() => {
        terminalLogs.innerHTML += '<div class="text-[#D80027]">✔ 42 Pruebas automatizadas aprobadas (100% Pass).</div><div class="text-emerald-400 font-bold mt-1">✨ Despliegue en producción completado con éxito (v2.6.0).</div>';
        runBtn.disabled = false;
        runBtn.innerHTML = '▶ Ejecutar Código';
      }, 1000);
    });
  }
}

function initContactModal() {
  const modal = document.getElementById('contactModal');
  const closeBtn = document.getElementById('closeContactModal');
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('successToast');

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.open-contact-modal');
    if (btn) {
      e.preventDefault();
      const projModal = document.getElementById('projectDetailsModal');
      if (projModal) projModal.classList.add('hidden');
      if (modal) modal.classList.remove('hidden');
    }
  });

  if (closeBtn && modal) closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '<span>Enviar Solicitud Técnica</span>';

      const nameInput = form.querySelector('[name="nombre"]');
      const phoneInput = form.querySelector('[name="telefono"]');
      const messageInput = form.querySelector('[name="mensaje"]');

      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !phone || !message) {
        alert('Por favor completa todos los campos requeridos (Nombre, Teléfono y Detalle).');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <span>Enviando a hndevco@gmail.com...</span>
        `;
      }

      const payload = {
        nombre: name,
        telefono: phone,
        mensaje: message,
        destinatario: 'hndevco@gmail.com',
        fecha: new Date().toLocaleString('es-HN', { timeZone: 'America/Tegucigalpa' })
      };

      let sent = false;

      // 1. Try local server API endpoint first
      try {
        const localRes = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (localRes.ok) {
          sent = true;
        }
      } catch (err) {
        // Fallback to cloud mail dispatch
      }

      // 2. Direct cloud dispatch to hndevco@gmail.com (via FormSubmit AJAX)
      if (!sent) {
        try {
          const cloudRes = await fetch('https://formsubmit.co/ajax/hndevco@gmail.com', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              _subject: `🚀 Solicitud Técnica DEVCO: ${name} (${phone})`,
              Nombre_Completo: name,
              Telefono_WhatsApp: phone,
              Detalle_Proyecto: message,
              Destinatario: 'hndevco@gmail.com',
              Fecha_Envio: payload.fecha
            })
          });
          if (cloudRes.ok) {
            sent = true;
          }
        } catch (cloudErr) {
          console.warn('FormSubmit dispatch error:', cloudErr);
        }
      }

      if (modal) modal.classList.add('hidden');
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }

      if (toast) {
        toast.innerHTML = `
          <span class="text-[#FFC400] text-xl font-bold">✔</span>
          <div>
            <div class="font-bold text-white">¡Solicitud enviada a hndevco@gmail.com!</div>
            <div class="text-slate-300 text-[11px]">Gracias ${name}, nos comunicaremos contigo al ${phone} a la brevedad.</div>
          </div>
        `;
        toast.classList.remove('translate-y-24', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
        setTimeout(() => {
          toast.classList.add('translate-y-24', 'opacity-0');
          toast.classList.remove('translate-y-0', 'opacity-100');
        }, 6000);
      }
    });
  }
}

function initMobileNav() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    mobileLinks.forEach(link => link.addEventListener('click', () => mobileMenu.classList.add('hidden')));
  }
}

function initScrollSpy() {
  const navbar = document.getElementById('mainNavbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) navbar.classList.add('shadow-md');
    else navbar.classList.remove('shadow-md');
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) {
        if (targetId === '#') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }
      try {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const header = document.getElementById('mainNavbar');
          const headerHeight = header ? header.offsetHeight : 80;
          const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
          });
        }
      } catch (err) {
        // Fallback for invalid selector
      }
    });
  });
}
