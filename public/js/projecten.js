const projectenContainer = document.getElementById('projecten-container');
const paginationContainer = document.getElementById('pagination');
const queryParams = new URLSearchParams(window.location.search);
let currentPage = parseInt(queryParams.get('page')) || 1;
let totalItems = -1;
let itemsPerPage = -1;

async function loadProjects() {
    const paginationResp = await fetch('/projecten/api/pagination');
    const paginationData = await paginationResp.json();
    itemsPerPage = paginationData.itemsPerPage;

    const allResp = await fetch('/projecten/api/all?' + queryParams.toString());
    let projectFolders = await allResp.json();

    const projectDataList = await Promise.all(
        projectFolders.map(async folder => {
            const resp = await fetch(`/projecten/api/${folder}`);
            const data = await resp.json();
            return { folder, ...data };
        })
    );

    projectDataList.sort((a, b) => a.title.localeCompare(b.title, 'nl', { sensitivity: 'base' }));

    totalItems = projectDataList.length;
    const offset = (currentPage - 1) * itemsPerPage;
    const paginatedProjects = projectDataList.slice(offset, offset + itemsPerPage);

    projectenContainer.innerHTML = '';
    if (totalItems === 0) {
        projectenContainer.classList.add('text-center');
        projectenContainer.innerHTML = '<p>Er zijn geen projecten gevonden die hierbij passen. Probeer het eens met een ander filter!</p>';
        return;
    }

    paginatedProjects.forEach(data => {
        const projectCard = document.createElement('div');
        projectCard.className = 'card projectCard';
        projectCard.innerHTML = `
            <img src="/projecten/api/${data.folder}/${data.thumbnail}" class="card-img-top" alt="Preview van ${data.title}">
            <div class="card-body">
                <h5 class="card-title mb-2">${data.title}</h5>
                <p class="card-text my-2">${data.shortDescription}</p>
                <div class="mb-3">
                    ${data.tech.map(tag => `<a href="/projecten?page=${currentPage}&filter=${tag}" class="badge rounded-pill bg-secondary me-1 tech">${tag}</a>`).join('')}
                </div>
                <a href="/projecten/${data.folder}" class="btn btn-primary">Meer informatie</a>
            </div>
        `;
        projectCard.querySelectorAll('*').forEach(e => {
            e.addEventListener('click', () => {
                window.location.href = `/projecten/${data.folder}`;
            });
        });
        projectenContainer.appendChild(projectCard);
    });

    // 7. Render pagination
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    paginationContainer.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = 'page-item' + (i === currentPage ? ' active' : '');
        pageItem.innerHTML = `<a class="page-link" href="/projecten?page=${i}">${i}</a>`;
        paginationContainer.appendChild(pageItem);
    }
}

loadProjects();