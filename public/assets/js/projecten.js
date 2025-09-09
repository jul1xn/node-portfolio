const container = document.getElementById('project-container');
const pageNumber = document.getElementById('page-number');
const previousPageBtn = document.getElementById('previous-page-btn');
const nextPageBtn = document.getElementById('next-page-btn');

const params = new URLSearchParams(window.location.search);
params.has('page') ? page = params.get('page') : page = 1;
pageNumber.textContent = page;
if (page <= 1) {
    previousPageBtn.disabled = true;
}

previousPageBtn.addEventListener('click', () => {
    if (page > 1) {
        page--;
        window.location.href = `/projecten?page=${page}`;
    }
});

nextPageBtn.addEventListener('click', () => {
    page++;
    window.location.href = `/projecten?page=${page}`;
});

fetch(`/projecten/api/all?page=${page}`)
    .then(response => response.json())
    .then(projects => {
        if (projects.length < 30) {
            nextPageBtn.disabled = true;
        }
        projects.forEach(project => {
            createCard(project, container);
        })
    });