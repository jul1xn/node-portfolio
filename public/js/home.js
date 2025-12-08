const projectenContainer = document.getElementById('projecten-container');
const projectenCarousel = document.getElementById('projectenCarousel');
const countersParents = document.getElementById('counter-container');
const counters = countersParents.querySelectorAll('.counter');
const totalNumberTime = 1500;

function fadeNumber(targetElement, targetNumber) {
    let startTime = null;
    const duration = totalNumberTime;
    const startNumber = 0;
    const endNumber = targetNumber;
    const power = 2; // quadratic ease-out

    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        let t = Math.min(elapsed / duration, 1);
        // Ease-out interpolation
        const value = startNumber + (endNumber - startNumber) * (1 - Math.pow(1 - t, power));
        targetElement.textContent = Math.floor(value) + '+';
        if (t < 1) {
            requestAnimationFrame(animate);
        } else {
            targetElement.textContent = endNumber + '+';
        }
    }
    requestAnimationFrame(animate);
}

fetch('/projecten/api/homepage')
    .then(response => response.json())
    .then(projecten => {

        projecten.forEach(project => {
            fetch(`/projecten/api/${project}`)
                .then(response => response.json())
                .then(data => {
                    const projectCard = document.createElement('div');
                    projectCard.className = 'col';
                    projectCard.innerHTML = `
            <div class="card" style="min-height: 27rem;">
            <img src="/projecten/api/${project}/${data.thumbnail}" class="card-img-top"
            alt="Preview van ${data.title}">
            <div class="card-body">
            <h5 class="card-title">${data.title}</h5>
            <p class="card-text mb-2">${data.shortDescription}</p>
            <div class="mb-2">
            ${data.tech.map(tag => `<a href="/projecten?filter=${tag}"
                class="badge rounded-pill bg-secondary me-1 tech">${tag}</a>`).join('')}
                </div>
                <a href="/projecten/${project}" class="btn btn-primary">Bekijk project</a>
                </div>
                </div>
                `;
                    projectCard.querySelectorAll("*").forEach(e => {
                        e.addEventListener('click', () => {
                            window.location.href = `/projecten/${project}`;
                        });
                    });
                    projectenContainer.appendChild(projectCard);
                });
        });

    });
fetch('/projecten/api/carousel')
    .then(response => response.json())
    .then(images => {
        const carouselInner = projectenCarousel.querySelector('.carousel-inner');
        images.forEach((image, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.className = 'carousel-item' + (index === 0 ? ' active' : '');
            carouselItem.innerHTML = `
                <img src="${image}" class="d-block w-100" alt="...">
            `;
            carouselInner.appendChild(carouselItem);
        });
    });

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            console.log('Row is visible, starting animation');
            counters.forEach((counter) => {
                const numberElement = counter.querySelector('#number');
                const targetNumberText = numberElement.textContent.trim();
                const targetNumber = parseInt(targetNumberText, 10);
                fadeNumber(numberElement, targetNumber);
            });
            observer.unobserve(countersParents); // Stop observing after animation
        }
    });
});

// Observe the row, not the card
if (countersParents) {
    observer.observe(countersParents);
}