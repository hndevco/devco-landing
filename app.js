/**
 * DEVCO (Developers Corporation) - Main Interactive Application
 * Soluciones de Software de Alto Impacto para Cualquier Industria
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initCircularScrollProgress();
  initPortfolio();
  initAgileProgression();
  initCodeSandbox();
  initEstimator();
  initContactModal();
  initMobileNav();
  initScrollSpy();
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
  }
];

function initPortfolio() {
  const grid = document.getElementById('portfolioGrid');
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const projectModal = document.getElementById('projectDetailsModal');
  const modalBody = document.getElementById('projectModalBody');
  const closeBtn = document.getElementById('closeProjectModal');
  if (!grid) return;

  function renderProjects(filter = 'all') {
    const filtered = filter === 'all' ? portfolioData : portfolioData.filter(p => p.category === filter);
    let html = '';
    filtered.forEach(item => {
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
            <div class="flex flex-wrap gap-1.5 mb-5">
              ${item.stack.map(s => `
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">${s}</span>
              `).join('')}
            </div>
            <div class="grid grid-cols-2 gap-2">
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
        <div>
          <div class="text-xs font-mono font-bold uppercase text-slate-500 mb-2">Stack Tecnológico:</div>
          <div class="flex flex-wrap gap-2">
            ${item.stack.map(s => `
              <span class="text-xs font-mono px-3 py-1 rounded bg-[#001350] text-white font-bold">${s}</span>
            `).join('')}
          </div>
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
    products: ['Hemtosys', 'POS Syntax', 'Longhorn', 'Syntax HN'],
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

function initEstimator() {
  const projectType = document.getElementById('estProjectType');
  const squadSize = document.getElementById('estSquadSize');
  const duration = document.getElementById('estDuration');
  const scopeCloud = document.getElementById('estScopeCloud');
  const scopeUI = document.getElementById('estScopeUI');
  const scopeQA = document.getElementById('estScopeQA');
  const scopeAI = document.getElementById('estScopeAI');
  const estimatedWeeks = document.getElementById('estOutputWeeks');
  const estimatedSprints = document.getElementById('estOutputSprints');
  const estimatedCost = document.getElementById('estOutputCost');
  const openEstimateModalBtn = document.getElementById('openEstimateModalBtn');
  if (!projectType || !estimatedCost) return;

  function calculateEstimate() {
    let basePrice = 5000;
    let weeks = 6;
    const type = projectType.value;
    if (type === 'web-app') { basePrice = 6500; weeks = 8; }
    else if (type === 'mobile-app') { basePrice = 8000; weeks = 10; }
    else if (type === 'enterprise') { basePrice = 15000; weeks = 16; }
    else if (type === 'ai-integration') { basePrice = 9500; weeks = 10; }

    const squad = parseInt(squadSize.value) || 3;
    basePrice += (squad - 2) * 2200;
    if (scopeCloud && scopeCloud.checked) { basePrice += 2000; weeks += 2; }
    if (scopeUI && scopeUI.checked) { basePrice += 1800; weeks += 1; }
    if (scopeQA && scopeQA.checked) { basePrice += 1500; }
    if (scopeAI && scopeAI.checked) { basePrice += 3000; weeks += 2; }

    const sprints = Math.ceil(weeks / 2);
    if (estimatedWeeks) estimatedWeeks.textContent = `${weeks} semanas`;
    if (estimatedSprints) estimatedSprints.textContent = `${sprints} Sprints`;
    if (estimatedCost) estimatedCost.textContent = `$${basePrice.toLocaleString('en-US')} USD`;
  }

  [projectType, squadSize, duration, scopeCloud, scopeUI, scopeQA, scopeAI].forEach(el => {
    if (el) el.addEventListener('change', calculateEstimate);
  });
  calculateEstimate();

  if (openEstimateModalBtn) {
    openEstimateModalBtn.addEventListener('click', () => {
      const modal = document.getElementById('contactModal');
      const msgField = document.getElementById('contactMessage');
      if (msgField) {
        msgField.value = `Hola DEVCO, me interesa desarrollar un proyecto tipo "${projectType.options[projectType.selectedIndex].text}" con ${squadSize.value} ingenieros y presupuesto estimado de ${estimatedCost.textContent}. Favor agendar llamada técnica.`;
      }
      if (modal) modal.classList.remove('hidden');
    });
  }
}

function initContactModal() {
  const modal = document.getElementById('contactModal');
  const openBtns = document.querySelectorAll('.open-contact-modal');
  const closeBtn = document.getElementById('closeContactModal');
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('successToast');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) modal.classList.remove('hidden');
    });
  });

  if (closeBtn && modal) closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Enviando propuesta...';
      }
      setTimeout(() => {
        if (modal) modal.classList.add('hidden');
        if (form) form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Enviar Solicitud Técnica</span>';
        }
        if (toast) {
          toast.classList.remove('translate-y-24', 'opacity-0');
          toast.classList.add('translate-y-0', 'opacity-100');
          setTimeout(() => {
            toast.classList.add('translate-y-24', 'opacity-0');
            toast.classList.remove('translate-y-0', 'opacity-100');
          }, 5000);
        }
      }, 800);
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
