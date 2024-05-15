document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('stars-container');
    const numberOfStars = 600;

    for (let i = 0; i < numberOfStars; i++) {
        let star = document.createElement('div');
        star.className = 'star';

        // Assign size class randomly
        const size = Math.random();
        if (size < 0.5) {
            star.classList.add('small');
        } else if (size < 0.8) {
            star.classList.add('medium');
        } else {
            star.classList.add('large');
        }

        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.transform = `translateZ(${Math.random() * 500 - 250}px)`;

        // Randomize the animation delay to ensure stars flicker at different times
        star.style.animationDelay = `${Math.random() * 5}s`;

        container.appendChild(star);
    }
});
