document.addEventListener("DOMContentLoaded", function() {
    const toggle = document.querySelector('.switch');
    const wrapper = document.querySelector('.wrapper');
    const wcloud = document.getElementById('background-wrap');
    const ccloud = document.querySelector('.clouds');
    const moon = document.getElementById('moon');
    const topText = document.getElementById('toptext');
    const bottomText = document.getElementById('bottomtext');
    const spotifyContainer = document.getElementById('spotify-container');
    const body = document.body;
    const container = document.getElementById('stars-container');
    const numberOfStars = 600;

    let currentTimeouts = [];
    let lastDisplayedIndex = -1;

    // Update based on toggle state at initialization
    updateSky();

    // Listen for toggle changes
    toggle.addEventListener('change', updateSky);

    const textData = [
        { time: 5, top: "And then one day" },
        { time: 10, bottom: "Someone walks into your life" },
        { time: 15, top: "A total stranger" },
        { time: 20, bottom: "And they become so important to you" },
        { time: 25, top: "And while you've known them" },
        { time: 30, bottom: "For such a short time" },
        { time: 35, top: "You feel that you have loved them" },
        { time: 40, bottom: "For a lifetime" },
        { time: 45, top: "", bottom: "" }
    ];

    function displayText(currentTime) {
        clearTimeouts();
        for (let i = 0; i < textData.length; i++) {
            if (textData[i].time <= currentTime && currentTime < (textData[i + 1] ? textData[i + 1].time : Infinity)) {
                if (lastDisplayedIndex !== i) {
                    lastDisplayedIndex = i;
                    if (textData[i].top) {
                        typeWriterEffect(topText, textData[i].top);
                    } else {
                        topText.textContent = '';
                    }
                    if (textData[i].bottom) {
                        typeWriterEffect(bottomText, textData[i].bottom);
                    } else {
                        bottomText.textContent = '';
                    }
                }
                break;
            }
        }
    }

    function typeWriterEffect(element, text) {
        element.textContent = '';
        for (let i = 0; i < text.length; i++) {
            currentTimeouts.push(setTimeout(() => {
                element.textContent += text[i];
            }, i * 44));
        }
    }

    function clearTimeouts() {
        currentTimeouts.forEach(timeout => clearTimeout(timeout));
        currentTimeouts = [];
    }

    let currentTime = 0;
    setInterval(() => {
        currentTime++;
        displayText(currentTime);
    }, 1500); // Update every second

    function updateSky() {
        if (toggle.checked) { // If checked, show day
            body.classList.remove('night');
            body.classList.remove('sunset');
            body.classList.add('day');
            moon.style.display = 'none';
            ccloud.style.display = 'none';
            setTimeout(() =>{
            topText.style.display = 'block';
            bottomText.style.display = 'block';    
            },1000);
            
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
                    moon.style.display = 'block';
                    spotifyContainer.style.display = 'block';
                }, 2000);
            }, 5000); 
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