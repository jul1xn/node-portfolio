function addImageRow() {
    const gallery = document.getElementById('image-gallery');
    const row = document.createElement('div');
    row.className = 'row g-2 mb-2 image-row';
    row.innerHTML = `
        <div class="col-md-6">
            <input class="form-control" type="file" name="images[]" accept="image/*">
        </div>
        <div class="col-md-6">
            <input class="form-control" type="text" name="image_descriptions[]" placeholder="Image Description">
        </div>
    `;
    gallery.appendChild(row);
}

function addLanguageRow() {
    const list = document.getElementById('languages-list');
    const row = document.createElement('div');
    row.className = 'row g-2 mb-2 language-row';
    row.innerHTML = `
        <div class="col-md-12">
            <input class="form-control" type="text" name="languages[]" placeholder="Language Name" required>
        </div>
    `;
    list.appendChild(row);
}

function addLinkRow() {
    const list = document.getElementById('links-list');
    const row = document.createElement('div');
    row.className = 'row g-2 mb-2 link-row';
    row.innerHTML = `
        <div class="col-md-6">
            <input class="form-control" type="text" name="link_names[]" placeholder="Link Name" required>
        </div>
        <div class="col-md-6">
            <input class="form-control" type="url" name="link_urls[]" placeholder="Link URL" required>
        </div>
    `;
    list.appendChild(row);
}

var quill = new Quill('#editor', {
    theme: 'snow',
    placeholder: 'Write your project description here...',
    modules: {
        toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'blockquote', 'code-block'],
        ['clean']
        ]
    }
});

// Copy editor content into hidden input on form submit
document.querySelector("form").onsubmit = function() {
    document.getElementById("long_description").value = quill.root.innerHTML;
};