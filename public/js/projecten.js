const projectenContainer = document.getElementById('projecten-container');
const paginationContainer = document.getElementById('pagination');
const queryParams = new URLSearchParams(window.location.search);
let currentPage = parseInt(queryParams.get('page')) || 1;
let totalItems = -1;
let itemsPerPage = -1;

fetch('/projecten/api/pagination')
    .then(response => response.json())
    .then(data => {
        itemsPerPage = data.itemsPerPage;
    });

fetch('/projecten/api/all?' + queryParams.toString())
    .then(response => response.json())
    .then(data => {
        const projecten = data;
        totalItems = projecten.length;

        if (totalItems === 0) {
            projectenContainer.classList.add('text-center');
            projectenContainer.innerHTML = '<p>Er zijn geen projecten gevonden die hierbij passen. Probeer het eens met een ander filter!</p>';
            return;
        }

        projecten.forEach(project => {
            fetch(`/projecten/api/${project}`)
                .then(response => response.json())
                .then(data => {
                    const projectCard = document.createElement('div');
                    projectCard.className = 'card projectCard';
                    projectCard.innerHTML = `
                    <img src="/projecten/api/${project}/${data.thumbnail}" class="card-img-top" alt="Preview van ${data.title}">
                    <div class="card-body">
                        <h5 class="card-title mb-2">${data.title}</h5>
                        <p class="card-text my-2">${data.shortDescription}</p>
                        <div class="mb-3">
                            ${data.tech.map(tag => `<a href="/projecten?page=${currentPage}&filter=${tag}" class="badge rounded-pill bg-secondary me-1 tech" >${tag}</a>`).join('')}
                        </div>
                        <a href="/projecten/${project}" class="btn btn-primary">Meer informatie</a>
                    </div>
                    `;
                    projectenContainer.appendChild(projectCard);
                });
        });
    });

const totalPages = Math.ceil(totalItems / itemsPerPage);

paginationContainer.innerHTML = '';
if (currentPage > 1) {
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = 'page-item' + (i === currentPage ? ' active' : '');
        pageItem.innerHTML = `<a class="page-link" href="/projecten?page=${i}">${i}</a>`;
        paginationContainer.appendChild(pageItem);
    }
}