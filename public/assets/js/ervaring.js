const ervaringSliders = document.querySelectorAll('.ervaring-slider');
const ervaringParent = document.querySelector('.ervaring-parent');
let index = 0;
ervaringParent.childNodes.forEach(child => {
    if (child.nodeType === Node.ELEMENT_NODE && child.classList.contains('ervaring-slider')) {
        child.style.setProperty('--index', index);
        child.querySelector('.progress').setAttribute('animation-delay-ms', index * 200);
        index++;
    }
});

ervaringSliders.forEach(slider => {
    const progressBar = slider.querySelector('.progress');
    const progressFill = progressBar.querySelector('.progress-bar');
    const targetProgress = parseInt(progressBar.getAttribute('aria-valuenow'));
    const fillTime = parseInt(progressBar.getAttribute('animation-fill-time-ms')) || 1000;
    const delayTime = parseInt(progressBar.getAttribute('animation-delay-ms')) || 0;

    setTimeout(() => {
        let start = null;

        function animate(timestamp) {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const fraction = Math.min(elapsed / fillTime, 1);
            const easedFraction = 1 - Math.pow(1 - fraction, 3);
            progressFill.style.width = (targetProgress * easedFraction) + '%';
            if (fraction < 1) requestAnimationFrame(animate);
        }


        requestAnimationFrame(animate);
    }, delayTime);
});
