function createCard(projectInternalName, dropoffParent) {
    console.log("Creating card for:", projectInternalName , " in parent:", dropoffParent);
    fetch(`/projecten/api/${projectInternalName}/short`)
        .then(response => response.json())
        .then(data => {
            const card = document.createElement('div');
            card.className = 'card mb-4';
            card.style.width = '18rem';
            card.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <img src="/projecten/api/${projectInternalName}/${data.thumbnail}" class="card-img-top" alt="${data.thumbnail}">
                    <div class="card-body">
                        <h5 class="card-title">${data.name}</h5>
                        <p class="card-text">${data.short_description}</p>
                        <figcaption class="blockquote-footer pt-2">
                                ${(Array.isArray(data.technologies) ? data.technologies.join(', ') : data.technologies)}
                        </figcaption>
                        <a href="/projecten/${projectInternalName}" class="btn btn-primary">See details</a>
                    </div>
                </div>
            `;
            dropoffParent.appendChild(card);
        });
}