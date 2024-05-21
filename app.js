document.addEventListener("DOMContentLoaded", function() {
    const toggle = document.querySelector('.switch');
    const wrapper = document.querySelector('.wrapper');
    const wcloud = document.getElementById('background-wrap');
    const ccloud = document.querySelector('.clouds');
    const body = document.body;
    const container = document.getElementById('stars-container');
    const numberOfStars = 600;

    // Update based on toggle state at initialization
    updateSky();

    // Listen for toggle changes
    toggle.addEventListener('change', updateSky);

    function updateSky() {
        if (toggle.checked) { // If checked, show day
            body.classList.remove('night');
            body.classList.remove('sunset');
            body.classList.add('day');
            clearStars(); // Clear stars to show day sky
            setTimeout(() => {
                ccloud.style.display = 'none';
            }, 500); // Short delay to ensure smooth transition
        } else { // If unchecked, show night
            body.classList.remove('day');
            body.classList.add('sunset');
            wrapper.style.display = 'none';
            setTimeout(() => {
                body.classList.remove('sunset');
                body.classList.add('night');
                wcloud.style.display = 'none';
                generateStars(numberOfStars); // Generate stars for night
                setTimeout(() => {
                    ccloud.style.display = 'block';
                }, 500); // Delay to ensure smooth transition
            }, 5000); // 5 seconds for the sunset transition
        }
    }

    function generateStars(number) {
        clearStars(); // Clear existing stars first
        for (let i = 0; i < number; i++) {
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
    }

    function clearStars() {
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => star.remove());
    }
});
