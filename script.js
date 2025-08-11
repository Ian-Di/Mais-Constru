document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    serviceCards.forEach(card => {
        const video = card.querySelector('video');
        const textSpan = card.querySelector('span');

        // Garante que o vídeo e o texto estão posicionados e em camadas corretas via JS
        card.style.position = 'relative'; // Essencial para que os filhos absolutos se posicionem corretamente
        video.style.position = 'absolute';
        video.style.top = '0';
        video.style.left = '0';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.style.zIndex = '-1'; // Coloca o vídeo atrás do texto
        video.style.opacity = '0'; // Vídeo invisível
        video.style.transition = 'opacity 0.5s ease-in-out'; // Transição suave

        textSpan.style.zIndex = '1'; // Coloca o texto acima do vídeo
        textSpan.style.transition = 'opacity 0.5s ease-in-out';

        // Salva a imagem de fundo original usando uma propriedade do elemento
        const originalBackgroundImage = window.getComputedStyle(card).backgroundImage;
        
        // Função unificada para alternar o estado do card
        const toggleCard = (isActive) => {
            if (isActive) {
                // Ao ativar o card
                video.play();
                video.style.opacity = '1';
                textSpan.style.opacity = '0';
                // Garante que a imagem de fundo seja removida de forma definitiva
                card.style.backgroundImage = 'none';
                card.classList.add('active-video');
            } else {
                // Ao desativar o card
                video.pause();
                video.currentTime = 0;
                video.style.opacity = '0';
                textSpan.style.opacity = '1';
                card.classList.remove('active-video');

                // Adiciona um pequeno atraso para restaurar a imagem de fundo,
                // garantindo que a transição do vídeo termine
                setTimeout(() => {
                    if (!card.classList.contains('active-video')) {
                        card.style.backgroundImage = originalBackgroundImage;
                    }
                }, 500);
            }
        };

        if (isTouchDevice) {
            // Lógica para dispositivos móveis (com toque)
            card.addEventListener('click', (event) => {
                event.preventDefault();
                
                const cardIsActive = video.style.opacity === '1';

                // Desativa todos os outros cards primeiro
                serviceCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        const otherVideo = otherCard.querySelector('video');
                        otherVideo.pause();
                        otherVideo.currentTime = 0;
                        otherVideo.style.opacity = '0';
                        otherCard.querySelector('span').style.opacity = '1';
                        otherCard.style.backgroundImage = window.getComputedStyle(otherCard).backgroundImage;
                        otherCard.classList.remove('active-video');
                    }
                });

                toggleCard(!cardIsActive);
            });
        } else {
            // Lógica para desktops (com mouse)
            card.addEventListener('mouseenter', () => toggleCard(true));
            card.addEventListener('mouseleave', () => toggleCard(false));
        }
    });
});


// Suas outras funções
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