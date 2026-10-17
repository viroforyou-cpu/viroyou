// ============================================
// NAVIGATION RESPONSE AND PROGRESS ACTIONBAR
// ============================================
window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    const progress = document.getElementById('scrollProgress');
    
    // Header transformation configuration
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // Line calculation indicator tracking
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
        const progressPercentage = (window.scrollY / totalHeight) * 100;
        progress.style.width = `${progressPercentage}%`;
    }
});

// Mobile hamburger overlay switch controls
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Automatically dismiss responsive overlay panel on jump-link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ============================================
// SCROLL VIEW REVEAL ANIMATOR INTERSECTION
// ============================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============================================
// INCREMENT STATS METRIC COUNTERS
// ============================================
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.stat-number').forEach(num => {
                const target = parseInt(num.getAttribute('data-target'), 10);
                if (isNaN(target)) return;
                let current = 0;
                const step = target / 50;
                const suffix = num.textContent.replace(/[0-9]/g, ''); 
                
                const interval = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        num.textContent = target + suffix;
                        clearInterval(interval);
                    } else {
                        num.textContent = Math.floor(current) + suffix;
                    }
                }, 25);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) counterObserver.observe(statsGrid);

// ============================================
// SECURE WORKSPACE ADMINISTRATIVE INLINE MODE
// ============================================
const editToggle = document.getElementById('editToggle');
const editBar = document.getElementById('editBar');
const editableElements = [
    document.getElementById('editableHeroTitle'),
    document.getElementById('editableHeroSubtitle')
];

if (editToggle) {
    editToggle.addEventListener('click', () => {
        const isEditingActive = editToggle.classList.toggle('active');
        if (editBar) editBar.classList.toggle('active', isEditingActive);
        
        editableElements.forEach(el => {
            if (el) {
                el.setAttribute('contenteditable', isEditingActive ? 'true' : 'false');
            }
        });
    });
}

// ============================================
// INBOUND MESSAGE FORM RESPONSE CONTROL
// ============================================
function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;

    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px; vertical-align:middle;"><polyline points="20 6 9 17 4 12"/></svg> ¡Mensaje Enviado!';
    btn.style.background = '#28a745';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
    }, 3000);
}
