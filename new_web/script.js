// ============================================
// MODAL & LIVE CMS ENGINE (Manejo de Edición)
// ============================================
let isEditMode = false;
const editToggle = document.getElementById('editToggle');
const editBar = document.getElementById('editBar');

// Cargar contenidos guardados de LocalStorage al iniciar
function loadSavedContent() {
    document.querySelectorAll('[data-editable]').forEach(el => {
        const key = el.getAttribute('data-editable');
        const savedValue = localStorage.getItem('cms_' + key);
        if (savedValue) {
            // Si tiene etiquetas internas como em, preservamos estructura o mapeamos texto
            if (el.querySelector('em')) {
                // Caso especial Hero Title para no romper el tag em estructurado
                // Mantenemos fallback seguro o dejamos que edite directamente
            } else {
                el.innerText = savedValue;
            }
        }
    });
}

// Alternar Modo Edición
editToggle.addEventListener('click', () => {
    isEditMode = !isEditMode;
    editToggle.classList.toggle('active', isEditMode);
    editBar.classList.toggle('active', isEditMode);
    
    document.querySelectorAll('[data-editable]').forEach(el => {
        el.setAttribute('contenteditable', isEditMode ? 'true' : 'false');
    });
});

// Guardar cambios dinámicamente cuando el usuario deja de hacer foco en un texto
document.addEventListener('blur', (e) => {
    if (isEditMode && e.target.hasAttribute('data-editable')) {
        const key = e.target.getAttribute('data-editable');
        const value = e.target.innerText;
        localStorage.setItem('cms_' + key, value);
    }
}, true);

// Prevenir saltos de línea molestos en elementos de encabezado o botones
document.addEventListener('keydown', (e) => {
    if (isEditMode && e.target.hasAttribute('data-editable')) {
        if (e.key === 'Enter') {
            const tag = e.target.tagName.toLowerCase();
            if (tag.startsWith('h') || tag === 'span') {
                e.preventDefault();
                e.target.blur();
            }
        }
    }
});

// Inicializar cargas guardadas al arrancar
loadSavedContent();

// ============================================
// SCROLL PROGRESS BAR
// ============================================
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    document.getElementById('scrollProgress').style.width = ((scrollTop / scrollHeight) * 100) + '%';
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ============================================
// MOBILE NAV TOGGLE
// ============================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ============================================
// INTERSECTION OBSERVER (Animación Scroll Reveal)
// ============================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Counter Observer animado (Simulación base)
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Mapeo simple de contadores si se deseara incrementar numéricamente
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });
document.querySelectorAll('.stats-grid').forEach(el => counterObserver.observe(el));

// ============================================
// FORM HANDLER
// ============================================
function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> ¡Mensaje Enviado!';
    btn.style.background = '#28a745';
    btn.disabled = true;
    setTimeout(() => { 
        btn.innerHTML = originalHTML; 
        btn.style.background = ''; 
        btn.disabled = false; 
        e.target.reset(); 
    }, 3000);
}

// ============================================
// SMART SMOOTH SCROLL FOR INTERNAL LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
