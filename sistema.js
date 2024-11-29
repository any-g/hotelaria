const carouselImages = document.querySelector('.carrossel-images');
const images = document.querySelectorAll('.carrossel-images img');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let index = 0;

function showImage(idx) {
    const width = images[0].clientWidth;
    carouselImages.style.transform = `translateX(${-width * idx}px)`;
}

prevButton.addEventListener('click', () => {
    index = (index > 0) ? index - 1 : images.length - 1;
    showImage(index);
});

nextButton.addEventListener('click', () => {
    index = (index < images.length - 1) ? index + 1 : 0;
    showImage(index);
});

// Rolar automaticamente
setInterval(() => {
    index = (index < images.length - 1) ? index + 1 : 0;
    showImage(index);
}, 3000); // Troca de imagem a cada 3 segundos

