/**
 * DEVCO (Developers Corporation) - Main Interactive Application
 * Soluciones de Software de Alto Impacto para Cualquier Industria
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initCircularScrollProgress();
  initTypewriter();
  initProjectPanel();
  initPortfolio();
  initAgileProgression();
  initContactModal();
  initMobileNav();
  initScrollSpy();
  initSmoothScroll();
  initReveal();
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
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
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

function initTypewriter() {
  const el = document.getElementById('heroTypewriter');
  if (!el) return;

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const words = [
    'software a medida',
    'plataformas SaaS',
    'sistemas POS',
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
      }, 2600);
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

/**
 * Panel del hero: recorre los 4 pasos del proceso con lenguaje sencillo.
 */
function initProjectPanel() {
  const steps = document.querySelectorAll('#projectPanelSteps .hero-panel-step');
  const btn = document.getElementById('projectPanelBtn');
  const status = document.getElementById('projectPanelStatus');
  if (!steps.length || !btn || !status) return;

  const messages = [
    'Escuchamos tu idea…',
    'Diseñamos la propuesta…',
    'Construimos por etapas…',
    'Tu sistema queda en línea, funcionando 24/7.'
  ];

  let running = false;

  function reset() {
    steps.forEach(s => s.classList.remove('active', 'done'));
    status.textContent = '¿Quieres ver el recorrido?';
  }

  btn.addEventListener('click', () => {
    if (running) return;
    running = true;
    reset();
    btn.disabled = true;

    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const stepDelay = reduced ? 0 : 900;

    steps.forEach((step, i) => {
      setTimeout(() => {
        if (i > 0) {
          steps[i - 1].classList.remove('active');
          steps[i - 1].classList.add('done');
        }
        step.classList.add('active');
        status.textContent = messages[i];
      }, stepDelay * i);
    });

    setTimeout(() => {
      steps[steps.length - 1].classList.remove('active');
      steps[steps.length - 1].classList.add('done');
      status.textContent = messages[messages.length - 1];
      btn.disabled = false;
      btn.textContent = 'Ver de nuevo';
      running = false;
    }, stepDelay * steps.length);
  });
}

const portfolioData = [
  {
    id: 'hemtosys',
    title: 'Hemtosys — Gestión de Laboratorios Clínicos',
    category: 'health',
    categoryName: 'Salud & MedTech',
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
    url: 'https://techno-world-hn.github.io/techno_world/',
    displayUrl: 'techno-world-hn.github.io',
    badge: 'IT Solutions',
    description: 'Portal web corporativo de alto rendimiento para empresa líder de soluciones tecnológicas en Catacamas, Olancho ("Todo un mundo en tecnología"). Incluye catálogo interactivo de servicios TI, modo oscuro y cotizador de asistencia técnica.',
    metrics: ['150+ Proyectos TI Exitosos', 'Soporte Corporativo 24/7', 'Dark Mode & Alta Interactividad', '100% Responsivo & Ultra Rápido'],
    stack: ['HTML5 Semántico', 'Tailwind CSS', 'JavaScript ES6+', 'Canvas Particles', 'GitHub Pages CDN'],
    client: 'Techno World (Catacamas, HN)',
    features: [
      'Catálogo interactivo de servicios: redes, soporte de servidores y desarrollo a medida.',
      'Efectos visuales con video hero y alternador de tema oscuro/claro.',
      'Canales directos de cotización y asistencia técnica vía WhatsApp Business.',
      'Diseño de alta velocidad optimizado para carga instantánea en cualquier dispositivo.'
    ]
  },
  {
    id: 'seguridadsb',
    title: 'Seguridad SB HN — Seguridad Integral & Blindados',
    category: 'enterprise',
    categoryName: 'Seguridad Privada & Monitoreo',
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
    url: '#',
    displayUrl: 'devco.corp/pipeline',
    badge: 'Próximos lanzamientos',
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
    sector: 'Bienes Raíces & Gestión Inmobiliaria',
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
    sector: 'Automotriz & Centros de Servicio',
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
    sector: 'Salud, MedTech & Red Médica',
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
    sector: 'Soluciones Empresariales, Fintech, Agro & B2B',
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

const CHECK_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="inline-block flex-shrink-0 mt-0.5" style="color: var(--accent-link);"><polyline points="20 6 9 17 4 12"/></svg>';

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
          <div class="card p-6 flex flex-col justify-between border-dashed" data-project-id="${item.id}">
            <div>
              <div class="flex items-center justify-between gap-2 mb-4">
                <span class="text-xs font-mono font-medium text-[var(--accent-link)]">${item.categoryName}</span>
                <span class="text-xs font-mono text-[var(--text-muted)]">${item.badge}</span>
              </div>
              <h3 class="text-lg font-bold font-heading mb-2 text-[var(--text-primary)]">
                ${item.title}
              </h3>
              <p class="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                ${item.description}
              </p>
              <div class="space-y-2 mb-5">
                ${item.metrics.slice(0, 4).map(m => `
                  <div class="text-sm text-[var(--text-primary)] flex items-start gap-2">
                    ${CHECK_SVG}
                    <span>${m}</span>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2 mt-2">
              <button class="view-project-btn btn btn-navy text-xs py-2.5 px-2" data-id="${item.id}">
                Ver proyectos
              </button>
              <button class="open-contact-modal btn btn-outline text-xs py-2.5 px-2">
                Cotizar similar
              </button>
            </div>
          </div>
        `;
      } else {
        html += `
          <div class="card p-6 flex flex-col justify-between" data-project-id="${item.id}">
            <div>
              <div class="flex items-center justify-between gap-2 mb-4">
                <span class="text-xs font-mono font-medium text-[var(--accent-link)]">${item.categoryName}</span>
                <span class="text-xs font-mono text-[var(--text-muted)]">${item.badge}</span>
              </div>
              <h3 class="text-lg font-bold font-heading mb-2 text-[var(--text-primary)]">
                ${item.title}
              </h3>
              <p class="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                ${item.description}
              </p>
              <div class="space-y-2 mb-5">
                ${item.metrics.slice(0, 3).map(m => `
                  <div class="text-sm text-[var(--text-primary)] flex items-start gap-2">
                    ${CHECK_SVG}
                    <span>${m}</span>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2 mt-2">
              <button class="view-project-btn btn btn-outline text-xs py-2.5 px-2" data-id="${item.id}">
                Ver detalles
              </button>
              <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="btn btn-navy text-xs py-2.5 px-2">
                <span>Sitio web</span>
                <span aria-hidden="true">↗</span>
              </a>
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
      filterBtns.forEach(b => b.classList.remove('active'));
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
          <div class="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
            <span class="eyebrow">en construcción</span>
            <span class="text-xs font-mono text-[var(--text-muted)]">Sprints activos 2026</span>
          </div>

          <div>
            <h3 class="text-2xl sm:text-3xl font-bold font-heading text-[var(--text-primary)]">
              Proyectos actualmente en construcción
            </h3>
            <p class="text-sm text-[var(--text-secondary)] leading-relaxed mt-2">
              Estas plataformas y sistemas empresariales están siendo desarrollados por los squads de <strong>DEVCO</strong> aplicando metodologías ágiles, entregas continuas quincenales y arquitectura cloud escalable.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            ${pipelineProjects.map(p => `
              <div class="card p-5 flex flex-col justify-between">
                <div>
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h4 class="text-lg font-bold font-heading text-[var(--text-primary)]">${p.name}</h4>
                      <span class="text-xs text-[var(--text-muted)]">${p.sector}</span>
                    </div>
                    <span class="text-xs font-mono text-[var(--accent-link)] self-start sm:self-auto">${p.badge}</span>
                  </div>

                  <p class="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                    ${p.description}
                  </p>

                  <div class="space-y-1.5 mb-3">
                    ${p.features.map(f => `
                      <div class="flex items-start gap-2 text-sm text-[var(--text-primary)]">
                        ${CHECK_SVG}
                        <span>${f}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <div class="flex items-center justify-end pt-3 border-t border-[var(--border-color)] mt-2">
                  <button class="open-contact-modal text-sm font-semibold text-[var(--accent-link)] hover:underline" onclick="document.getElementById('projectDetailsModal').classList.add('hidden')">
                    Consultar este desarrollo →
                  </button>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[var(--border-color)]">
            <div class="text-sm text-[var(--text-muted)]">
              ¿Quieres desarrollar un software a medida para tu empresa o sector?
            </div>
            <button class="open-contact-modal w-full sm:w-auto btn btn-primary text-sm py-3 px-6" onclick="document.getElementById('projectDetailsModal').classList.add('hidden')">
              Iniciar proyecto con DEVCO
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
        <div class="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
          <span class="text-xs font-mono font-medium text-[var(--accent-link)]">${item.categoryName}</span>
          <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="text-xs font-mono text-[var(--accent-link)] hover:underline">
            ${item.displayUrl} ↗
          </a>
        </div>
        <div>
          <h3 class="text-2xl sm:text-3xl font-bold font-heading text-[var(--text-primary)]">
            ${item.title}
          </h3>
          <div class="text-xs text-[var(--text-muted)] mt-1.5">Cliente / Sector: ${item.client}</div>
        </div>
        <p class="text-sm text-[var(--text-secondary)] leading-relaxed">
          ${item.description}
        </p>
        <div class="p-5 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-color)]">
          <div class="text-xs font-mono font-medium uppercase text-[var(--text-muted)] mb-3">Módulos &amp; funcionalidades</div>
          <div class="space-y-2">
            ${item.features.map(f => `
              <div class="flex items-start gap-2.5 text-sm text-[var(--text-primary)]">
                ${CHECK_SVG}
                <span>${f}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="flex flex-wrap gap-2">
          ${item.stack.map(s => `
            <span class="chip">${s}</span>
          `).join('')}
        </div>
        <div class="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[var(--border-color)]">
          <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto btn btn-outline text-sm py-3 px-6">
            <span>Abrir producto en vivo</span>
            <span aria-hidden="true">↗</span>
          </a>
          <button class="open-contact-modal w-full sm:w-auto btn btn-primary text-sm py-3 px-6" onclick="document.getElementById('projectDetailsModal').classList.add('hidden')">
            Cotizar proyecto similar
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
          <div class="flex items-center justify-between mb-5">
            <span class="text-xs font-mono font-medium text-[var(--accent-link)]">${s.badge} · ${s.id * 20}% del ciclo</span>
            <span class="text-xs font-mono text-[var(--text-muted)]">Metodología DEVCO</span>
          </div>
          <h3 class="text-2xl font-bold font-heading text-[var(--text-primary)] mb-3">${s.name}</h3>
          <p class="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">${s.description}</p>
          <div class="space-y-2">
            <div class="text-xs font-mono font-medium uppercase text-[var(--text-muted)]">Entregables de esta etapa</div>
            ${s.deliverables.map(d => `
              <div class="flex items-start gap-2 text-sm text-[var(--text-primary)]">
                ${CHECK_SVG}
                <span>${d}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="pt-4 border-t border-[var(--border-color)] flex items-center justify-between">
          <div class="flex items-center gap-2">
            ${agileStages.map((st, i) => `
              <button aria-label="Fase ${st.id}" class="w-2.5 h-2.5 rounded-full cursor-pointer transition-colors ${i === idx ? 'bg-devco-cyan' : 'bg-[var(--border-color)]'}" onclick="document.querySelectorAll('.stage-nav-btn')[${i}].click()"></button>
            `).join('')}
          </div>
          <button class="open-contact-modal btn btn-primary text-xs py-2.5 px-5">Iniciar este proceso</button>
        </div>
      </div>
    `;

    nav.querySelectorAll('.stage-nav-btn').forEach((btn, i) => {
      if (i === idx) btn.classList.add('stage-active');
      else btn.classList.remove('stage-active');
    });
  }

  nav.innerHTML = agileStages.map((s, i) => `
    <button class="stage-nav-btn card p-4 text-left flex items-center gap-3 w-full cursor-pointer" data-idx="${i}">
      <span class="w-7 h-7 rounded-lg bg-devco-navy text-white dark:bg-devco-cyan dark:text-devco-navy flex items-center justify-center font-mono text-xs font-semibold flex-shrink-0">${s.id}</span>
      <div class="truncate">
        <div class="text-[10px] font-mono text-[var(--text-muted)] uppercase">${s.badge}</div>
        <div class="text-sm font-semibold truncate text-[var(--text-primary)]">${s.name}</div>
      </div>
    </button>
  `).join('');

  const style = document.createElement('style');
  style.textContent = '.stage-nav-btn.stage-active { border-color: var(--devco-cyan); background-color: rgba(43, 202, 255, 0.06); }';
  document.head.appendChild(style);

  nav.querySelectorAll('.stage-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      renderStage(parseInt(btn.getAttribute('data-idx')));
    });
  });

  renderStage(0);
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
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Enviar solicitud';

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
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <span>Enviando…</span>
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
          <span class="text-devco-cyan text-lg font-bold">✔</span>
          <div>
            <div class="font-semibold text-white">Solicitud enviada</div>
            <div class="text-slate-300 text-xs">Gracias ${name}, nos comunicaremos contigo al ${phone} a la brevedad.</div>
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
  }, { passive: true });
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

function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window) || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
    items.forEach(el => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(el => observer.observe(el));
}
