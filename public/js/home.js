const projectenContainer = document.getElementById('projecten-container');
const countersParents = document.getElementById('counter-container');
const counters = countersParents.querySelectorAll('.counter');
const totalNumberTime = 1500;

counters.forEach((counter) => {
    const numberElement = counter.querySelector('#number');
    const targetNumberText = numberElement.textContent.trim();
    const targetNumber = parseInt(targetNumberText, 10);
    fadeNumber(numberElement, targetNumber);
});

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

fetch('/projecten/api/all?limit=3')
    .then(response => response.json())
    .then(projecten => {
        projecten.forEach(project => {
            fetch(`/projecten/api/${project}`)
                .then(response => response.json())
                .then(data => {
                    const projectCard = document.createElement('div');
                    projectCard.className = 'col';
                    projectCard.innerHTML = `
                <div class="card">
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
                    projectenContainer.appendChild(projectCard);
                });
        });
    });