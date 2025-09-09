const carouselParent = document.getElementById('home-carousel');
const carouselIndicators = carouselParent.querySelector('#carousel-indicators');
const carouselInner = carouselParent.querySelector('.carousel-inner');
carouselInner.innerHTML = '';
carouselIndicators.innerHTML = '';

function createCarouselIndicator(pageIndex, isActive) {
    const button = document.createElement('button');
    button.type = 'button';
    if (isActive) {
        button.classList.add('active');
        button.setAttribute('aria-current', 'true');
    }
    button.setAttribute('data-bs-target', '#carouselExampleCaptions');
    button.setAttribute('data-bs-slide-to', pageIndex);
    button.setAttribute('aria-label', `Page ${pageIndex + 1}`);

    carouselIndicators.appendChild(button);
}

function createCarouselCardPage(pageIndex, projects, isActive) {
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (isActive) {
        carouselItem.classList.add('active');
    }

    const cardGroup = document.createElement('div');
    cardGroup.classList.add('card-group');
    
    projects.forEach(project => {
        console.log(project);
        createCard(project, cardGroup);
    });
    
    carouselItem.appendChild(cardGroup);
    carouselInner.appendChild(carouselItem);
}

fetch('/projecten/api/preview')
    .then(response => response.json())
    .then(projects => {
        const cardsPerPage = 3;
        const totalPages = Math.ceil(projects.length / cardsPerPage);
        for (let i = 0; i < totalPages; i++) {
            const start = i * cardsPerPage;
            const end = start + cardsPerPage;
            const pageProjects = projects.slice(start, end);
            createCarouselCardPage(i, pageProjects, i === 0);
            createCarouselIndicator(i, i === 0);
        }
    });
