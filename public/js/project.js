const descriptionParent = document.getElementById('description');
const descriptionUrl = descriptionParent && descriptionParent.getAttribute('url');
const imagesOriginalWrapper = document.getElementById('project-images-original');
const imagesEl = document.getElementById('project-images');
const linksEl = document.getElementById('project-links');

// Load long description HTML
if (descriptionParent && descriptionUrl) {
    fetch(descriptionUrl)
        .then(response => response.text())
        .then(data => {
            descriptionParent.innerHTML = data;
        });
}

function attachImageClicks() {
    document.querySelectorAll('#project-image').forEach(img => {
        img.addEventListener('click', () => {
            window.open(img.src, '_blank');
        });
    });
}

function moveImagesBetween() {
    if (!imagesEl || !descriptionParent || !imagesOriginalWrapper) return;

    if (window.innerWidth < 992) {
        // place images after the description element (so between description and links)
        if (imagesEl.parentElement !== descriptionParent.parentElement || imagesEl.previousElementSibling !== descriptionParent) {
            descriptionParent.insertAdjacentElement('afterend', imagesEl);
        }
    } else {
        // move back to original wrapper
        if (imagesEl.parentElement !== imagesOriginalWrapper) {
            imagesOriginalWrapper.appendChild(imagesEl);
        }
    }
}

// simple debounce
function debounce(fn, wait) {
    let t;
    return function () {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, arguments), wait);
    };
}

window.addEventListener('resize', debounce(() => {
    moveImagesBetween();
}, 150));

document.addEventListener('DOMContentLoaded', () => {
    moveImagesBetween();
    attachImageClicks();
});