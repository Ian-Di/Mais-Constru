document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    serviceCards.forEach(card => {
        const video = card.querySelector('video');
        const textSpan = card.querySelector('span');
        const originalBackgroundImage = card.style.backgroundImage;

        // Estilos para o vídeo (se o seu CSS já não fizer isso)
        video.style.position = 'absolute';
        video.style.top = '0';
        video.style.left = '0';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.style.zIndex = '-1';
        video.style.opacity = '0';
        video.style.transition = 'opacity 0.5s ease-in-out';
        
        // Estilos para o span do texto
        textSpan.style.transition = 'opacity 0.5s ease-in-out';

        function showVideo() {
            video.play();
            video.style.opacity = '1';
            textSpan.style.opacity = '0';
            card.style.backgroundImage = 'none';
        }

        function hideVideo() {
            video.pause();
            video.currentTime = 0;
            video.style.opacity = '0';
            textSpan.style.opacity = '1';
            card.style.backgroundImage = originalBackgroundImage;
        }

        if (isTouchDevice) {
            // Lógica para dispositivos móveis (com toque)
            card.addEventListener('click', (event) => {
                event.preventDefault(); // Evita o comportamento padrão do link, se houver
                
                // Se o vídeo já estiver visível, esconde. Caso contrário, mostra.
                if (video.style.opacity === '1') {
                    hideVideo();
                } else {
                    // Esconde todos os outros vídeos antes de mostrar o atual
                    serviceCards.forEach(otherCard => {
                        if (otherCard !== card) {
                            const otherVideo = otherCard.querySelector('video');
                            const otherTextSpan = otherCard.querySelector('span');
                            otherVideo.pause();
                            otherVideo.currentTime = 0;
                            otherVideo.style.opacity = '0';
                            otherTextSpan.style.opacity = '1';
                            otherCard.style.backgroundImage = otherCard.dataset.originalBgImage || 'none'; // Usa o data attribute para restaurar
                        }
                    });

                    // Armazena a imagem de fundo original no data attribute para restaurar
                    if (!card.dataset.originalBgImage) {
                        card.dataset.originalBgImage = card.style.backgroundImage;
                    }

                    showVideo();
                }
            });
        } else {
            // Lógica para desktops (com mouse)
            card.addEventListener('mouseenter', () => {
                showVideo();
            });

            card.addEventListener('mouseleave', () => {
                hideVideo();
            });
        }
    });
});

// Mantém suas outras funções
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