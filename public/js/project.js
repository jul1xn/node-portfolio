const descriptionParent = document.getElementById('description');
const descriptionUrl = descriptionParent.getAttribute('url');

fetch(descriptionUrl)
    .then(response => response.text())
    .then(data => {
        descriptionParent.innerHTML = data;
    });