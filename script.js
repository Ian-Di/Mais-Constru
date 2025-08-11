document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // --- Funções de Ativação e Desativação ---
    const activateCard = (card) => {
        const video = card.querySelector('video');
        const textSpan = card.querySelector('span');
        let overlay = card.querySelector('.video-overlay');

        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'video-overlay';
            overlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: black;
                opacity: 0;
                transition: opacity 0.5s ease-in-out;
                z-index: 1;
            `;
            card.prepend(overlay);
        }
        
        overlay.style.opacity = '1';
        video.style.opacity = '1';
        textSpan.style.opacity = '0';
        video.play();
    };

    const deactivateCard = (card) => {
        const video = card.querySelector('video');
        const textSpan = card.querySelector('span');
        const overlay = card.querySelector('.video-overlay');

        video.pause();
        video.currentTime = 0;
        
        if (overlay) {
            overlay.style.opacity = '0';
        }
        video.style.opacity = '0';
        textSpan.style.opacity = '1';

        setTimeout(() => {
            if (overlay && overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 500);
    };

    // --- Lógica Principal: Aplicação de Estilos Iniciais e Eventos ---
    serviceCards.forEach(card => {
        const video = card.querySelector('video');
        const textSpan = card.querySelector('span');

        // Configuração inicial para que o layout não seja afetado
        card.style.position = 'relative';

        if (video) {
            video.removeAttribute('controls');
            // --- NOVA LINHA: Silencia o vídeo para permitir o autoplay ---
            video.muted = true;
            
            // Aplica os estilos de posicionamento e z-index logo de início
            video.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                z-index: 2;
                opacity: 0;
                transition: opacity 0.5s ease-in-out;
            `;
        }

        if (textSpan) {
            // Aplica o z-index para garantir que o texto fique acima do vídeo
            textSpan.style.zIndex = '3';
            textSpan.style.transition = 'opacity 0.5s ease-in-out';
        }
    });

    if (isTouchDevice) {
        // Lógica para **dispositivos móveis (com toque)**: Usar IntersectionObserver
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    activateCard(entry.target);
                } else {
                    deactivateCard(entry.target);
                }
            });
        }, {
            threshold: 0.7
        });

        serviceCards.forEach(card => {
            videoObserver.observe(card);
        });
    } else {
        // Lógica para **desktops (com mouse)**: Usar eventos mouseenter/mouseleave
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => activateCard(card));
            card.addEventListener('mouseleave', () => deactivateCard(card));
        });
    }
});

function clickMenu() {
        if (listmob.style.display === 'flex') {
            listmob.style.display = 'none';
        } else {
            listmob.style.display = 'flex';
        }
    }

    const my0bserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    });

    const elements = document.querySelectorAll('.card1');
    elements.forEach((element) => my0bserver.observe(element));