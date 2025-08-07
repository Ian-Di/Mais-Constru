document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        const video = card.querySelector('video');
        const textSpan = card.querySelector('span'); // Seleciona o <span> que envolve o texto
        const originalBackgroundImage = card.style.backgroundImage; // Guarda a imagem de fundo original

        // Estiliza o vídeo para cobrir o card (ajuste minimalista de estilo via JS)
        video.style.position = 'absolute';
        video.style.top = '0';
        video.style.left = '0';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.style.zIndex = '-1'; // Coloca o vídeo atrás de tudo (imagem e texto)
        video.style.opacity = '0'; // Vídeo invisível inicialmente
        video.style.transition = 'opacity 0.5s ease-in-out'; // Transição suave

        // Estiliza o span do texto para que ele possa ser escondido
        textSpan.style.transition = 'opacity 0.5s ease-in-out'; // Transição suave

        card.addEventListener('mouseenter', () => {
            // Ao entrar, o vídeo aparece e o texto e a imagem de fundo somem
            video.play();
            video.style.opacity = '1'; // Vídeo visível
            textSpan.style.opacity = '0'; // Texto invisível
            card.style.backgroundImage = 'none'; // Remove a imagem de fundo
        });

        card.addEventListener('mouseleave', () => {
            // Ao sair, o vídeo pausa e o texto e a imagem de fundo voltam
            video.pause();
            video.currentTime = 0; // Volta o vídeo para o início
            video.style.opacity = '0'; // Vídeo invisível
            textSpan.style.opacity = '1'; // Texto visível
            card.style.backgroundImage = originalBackgroundImage; // Restaura a imagem de fundo
        });
    });
});