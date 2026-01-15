// ============================================
// SCRIPT PRINCIPAL - Digital Learning
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // 1. MENÚ MÓVIL
    // ============================================
    
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('show');
            // Cambiar ícono
            const icon = this.querySelector('i');
            if (mainNav.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    mainNav.classList.remove('show');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
    
    // ============================================
    // 2. RESALTAR ENLACE ACTIVO
    // ============================================
    
    function highlightActiveNav() {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === 'index.html' && linkPage === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    highlightActiveNav();
    
    // ============================================
    // 3. ANIMACIÓN DE CONTADORES (si existen)
    // ============================================
    
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace('%', '').replace('x', ''));
            const duration = 1500;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current) + (counter.textContent.includes('%') ? '%' : counter.textContent.includes('x') ? 'x' : '');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + (counter.textContent.includes('%') ? '%' : counter.textContent.includes('x') ? 'x' : '');
                }
            };
            
            // Iniciar animación cuando el elemento sea visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }
    
    // Ejecutar animación de contadores si existen
    if (document.querySelector('.stat-number')) {
        // Esperar un momento para que las imágenes carguen
        setTimeout(animateCounters, 500);
    }
    
    // ============================================
    // 4. TABS INTERACTIVOS (Página Recursos)
    // ============================================
    
    function setupResourceTabs() {
        const dTabButtons = document.querySelectorAll('.d-tab-btn');
        
        if (dTabButtons.length > 0) {
            dTabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const tabId = this.getAttribute('data-tab');
                    
                    // Remover clase activa de todos los tabs
                    dTabButtons.forEach(t => t.classList.remove('active'));
                    
                    // Agregar clase activa al tab clickeado
                    this.classList.add('active');
                    
                    // Ocultar todos los paneles
                    document.querySelectorAll('.d-tab-pane').forEach(pane => {
                        pane.classList.remove('active');
                    });
                    
                    // Mostrar panel correspondiente
                    const activePane = document.getElementById(tabId);
                    if (activePane) {
                        activePane.classList.add('active');
                    }
                });
            });
        }
    }
    
    setupResourceTabs();
    
    // ============================================
    // 5. FAQ ACORDEÓN (Página Apoyo)
    // ============================================
    
    function setupFAQ() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        if (faqQuestions.length > 0) {
            faqQuestions.forEach(question => {
                question.addEventListener('click', function() {
                    // Alternar clase activa en la pregunta
                    this.classList.toggle('active');
                    
                    // Obtener la respuesta
                    const answer = this.nextElementSibling;
                    
                    // Alternar visibilidad de la respuesta
                    if (this.classList.contains('active')) {
                        answer.classList.add('active');
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    } else {
                        answer.classList.remove('active');
                        answer.style.maxHeight = null;
                    }
                    
                    // Cerrar otras preguntas
                    faqQuestions.forEach(otherQuestion => {
                        if (otherQuestion !== this && otherQuestion.classList.contains('active')) {
                            otherQuestion.classList.remove('active');
                            const otherAnswer = otherQuestion.nextElementSibling;
                            otherAnswer.classList.remove('active');
                            otherAnswer.style.maxHeight = null;
                        }
                    });
                });
            });
        }
    }
    
    setupFAQ();
    
    // ============================================
    // 6. SCROLL SUAVE
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorar si es solo #
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                // Cerrar menú móvil si está abierto
                if (mainNav && mainNav.classList.contains('show')) {
                    mainNav.classList.remove('show');
                    if (mobileMenuBtn) {
                        const icon = mobileMenuBtn.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
                
                // Calcular posición de destino
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                // Scroll suave
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // 7. ANIMACIÓN DE ELEMENTOS AL SCROLL
    // ============================================
    
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.feature-card, .tool-item, .category-card, .software-card, .teacher-card, .challenge-card, .guide-card, .problem-card, .template-card, .cheatsheet-item, .subject-card, .mini-game');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(element);
        });
    }
    
    // Ejecutar después de que el DOM esté completamente cargado
    setTimeout(animateOnScroll, 300);
    
    // ============================================
    // 8. CAMBIO DE HEADER AL SCROLL
    // ============================================
    
    function handleHeaderScroll() {
        const header = document.querySelector('header');
        
        if (header) {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.97)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
                header.style.backgroundColor = 'white';
                header.style.backdropFilter = 'none';
            }
        }
    }
    
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Ejecutar una vez al cargar
    handleHeaderScroll();
    
    // ============================================
    // 9. PREVENIR COMPORTAMIENTO POR DEFECTO DE ENLACES VACÍOS
    // ============================================
    
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Mostrar mensaje de que el recurso está en desarrollo
            showNotification('Este recurso está en desarrollo. ¡Próximamente disponible!', 'info');
        });
    });
    
    // ============================================
    // 10. BOTONES DE DESCARGA SIMULADOS
    // ============================================
    
    document.querySelectorAll('.download-btn, .cheatsheet-download, .guide-btn, .play-mini-btn').forEach(button => {
        if (button.getAttribute('href') === '#') {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('Descarga simulada. En una implementación real, este botón descargaría el recurso.', 'info');
            });
        }
    });
    
    // ============================================
    // 11. FUNCIÓN DE NOTIFICACIÓN
    // ============================================
    
    function showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Estilos para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 300px;
            max-width: 400px;
            transform: translateX(120%);
            transition: transform 0.3s ease;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        `;
        
        // Estilos para el contenido
        const notificationContent = notification.querySelector('.notification-content');
        notificationContent.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
            flex: 1;
        `;
        
        // Estilos para el botón de cerrar
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 16px;
            cursor: pointer;
            margin-left: 15px;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        // Agregar al DOM
        document.body.appendChild(notification);
        
        // Mostrar con animación
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Cerrar notificación
        closeBtn.addEventListener('click', function() {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
        
        // Auto-cerrar después de 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                closeBtn.click();
            }
        }, 5000);
    }
    
    // ============================================
    // 12. MEJORAR EXPERIENCIA DE LOS IFRAMES DE JUEGOS
    // ============================================
    
    function enhanceGameFrames() {
        const gameFrames = document.querySelectorAll('.game-frame iframe');
        
        gameFrames.forEach(frame => {
            // Agregar título accesible
            frame.setAttribute('title', 'Juego educativo interactivo');
            
            // Agregar mensaje de carga
            const container = frame.parentElement;
            const loadingMsg = document.createElement('div');
            loadingMsg.className = 'frame-loading';
            loadingMsg.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando juego...';
            loadingMsg.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #3498db;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 10px;
            `;
            
            container.style.position = 'relative';
            container.appendChild(loadingMsg);
            
            // Ocultar mensaje cuando el iframe cargue
            frame.addEventListener('load', function() {
                loadingMsg.style.display = 'none';
            });
        });
    }
    
    if (document.querySelector('.game-frame iframe')) {
        enhanceGameFrames();
    }
    
    // ============================================
    // 13. DETECCIÓN DE NAVEGADOR Y DISPOSITIVO
    // ============================================
    
    function detectBrowserAndDevice() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const body = document.body;
        
        if (isMobile) {
            body.classList.add('mobile-device');
            // Optimizaciones para móviles
            if (document.querySelector('.game-frame iframe')) {
                document.querySelectorAll('.game-frame iframe').forEach(frame => {
                    frame.style.height = '350px';
                });
            }
        } else {
            body.classList.add('desktop-device');
        }
    }
    
    detectBrowserAndDevice();
    
    // ============================================
    // 14. MEJORAR ACCESIBILIDAD DEL TECLADO
    // ============================================
    
    document.addEventListener('keydown', function(e) {
        // Cerrar menú con Escape
        if (e.key === 'Escape' && mainNav && mainNav.classList.contains('show')) {
            mainNav.classList.remove('show');
            if (mobileMenuBtn) {
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
        
        // Navegación por tabs con teclado en FAQ
        if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('faq-question')) {
            e.preventDefault();
            e.target.click();
        }
        
        // Navegación en tabs de recursos
        if ((e.key === 'Enter' || e.key === ' ') && 
            (e.target.classList.contains('d-tab-btn') || 
             e.target.classList.contains('guide-tab') || 
             e.target.classList.contains('resource-tab'))) {
            e.preventDefault();
            e.target.click();
        }
    });
    
    // ============================================
    // 15. INICIALIZACIÓN COMPLETA
    // ============================================
    
    console.log('✅ Digital Learning - Sitio web completamente cargado');
    console.log('📱 Dispositivo: ' + (document.body.classList.contains('mobile-device') ? 'Móvil' : 'Escritorio'));
    console.log('🔗 Páginas cargadas: 5');
    console.log('🎮 Juegos integrados: 2 principales + 3 adicionales');
    
    // Mostrar mensaje de bienvenida en consola
    console.log(`
    ╔══════════════════════════════════════════════════════╗
    ║               DIGITAL LEARNING                       ║
    ║      Tecnología y Software Educativo                 ║
    ║                                                      ║
    ║  • 5 páginas HTML completas                          ║
    ║  • Diseño responsive y moderno                       ║
    ║  • Juegos educativos interactivos                    ║
    ║  • Recursos descargables gratuitos                   ║
    ║  • Totalmente funcional                              ║
    ╚══════════════════════════════════════════════════════╝
    `);
});

// ============================================
// FUNCIONES GLOBALES ADICIONALES
// ============================================

// Función para cambiar modo claro/oscuro (opcional)
function toggleTheme() {
    const body = document.body;
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Mostrar notificación
    const event = new Event('themeChanged');
    document.dispatchEvent(event);
}

// Verificar tema guardado al cargar
window.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
});


// Agregar botón de impresión si no existe
if (!document.querySelector('.print-button')) {
    const printButton = document.createElement('button');
    printButton.className = 'print-button';
    printButton.innerHTML = '<i class="fas fa-print"></i>';
    printButton.title = 'Imprimir esta página';
    printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 50px;
        height: 50px;
        background: #2c3e50;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;
    
    printButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = '#3498db';
    });
    
    printButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = '#2c3e50';
    });
    
    printButton.addEventListener('click', printPage);
    
    // Solo mostrar en escritorio
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.body.appendChild(printButton);
    }
}