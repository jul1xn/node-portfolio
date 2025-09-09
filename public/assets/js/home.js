const stats = document.getElementById('statistics');
const totalNumberTime = 1500; // In milliseconds

if (stats) {
    stats.childNodes.forEach((child) => {
        if (child.nodeType === Node.ELEMENT_NODE) {
            if (child.classList.contains('stat-parent')){
                fadeNumber(child.querySelector('.counter'), parseInt(child.querySelector('.counter').textContent, 10));
            }
        }
    });
}

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
        targetElement.textContent = Math.floor(value);
        if (t < 1) {
            requestAnimationFrame(animate);
        } else {
            targetElement.textContent = endNumber;
        }
    }
    requestAnimationFrame(animate);
}