const projectName = document.getElementById('pproject-container').getAttribute('data-project-name');

const projectDataName = document.getElementById('project-data-name');
const projectDataDescription = document.getElementById('project-data-description');
const projectDataImagesParent = document.getElementById('project-data-images-parent');
const projectDataLinks = document.getElementById('project-data-links');

function fetchDescription(descriptionPath) {
    fetch("/projecten/api/" + projectName + "/" + descriptionPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            projectDataDescription.innerHTML = data;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function addLinkBtn(url, name) {
    const linkElement = document.createElement('a');
    linkElement.href = url;
    linkElement.target = '_blank';
    linkElement.textContent = name;
    linkElement.classList.add('btn', 'btn-primary', 'm-1', 'fs-4', 'px-3', 'py-auto');
    projectDataLinks.appendChild(linkElement);
}

fetch(`/projecten/api/${projectName}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
.then(data => {
    document.title = `Prowser - ${data.name}`;
    projectDataName.textContent = data.name;
    fetchDescription(data.long_description);
    if (data.download_link !== "") {
        addLinkBtn(data.download_link, "Download");
    }

    console.log(data.links);
    data.links.forEach(link => {
        addLinkBtn(link.url, link.name);
    });

    if (projectDataLinks.children.length === 1) {
        projectDataLinks.remove();
    }

    data.images.forEach(image => {
        const imageCard = document.createElement('div');
        imageCard.className = 'card image-card my-3';
        imageCard.innerHTML = `
            <img src="/projecten/api/${projectName}/${image.src}" class="card-img-top" alt="${image.src}">
            <div class="card-body">
                <p class="card-text text-start">${image.description}</p>
            </div>
        `;

        if (image.description === "") {
            imageCard.querySelector('.card-body').remove();
            imageCard.querySelector('img').classList.replace('card-img-top', 'card-img');
        }
        
        projectDataImagesParent.appendChild(imageCard);
    });
});