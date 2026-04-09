document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Trail Logic
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = `${e.clientX}px`;
        trail.style.top = `${e.clientY}px`;
        document.body.appendChild(trail);

        setTimeout(() => {
            trail.remove();
        }, 500); // matches the CSS animation duration
    });

    // Copy Contract Logic
    const copyBtn = document.getElementById('copy-btn');
    const contractAddress = "SHEEEEEEEEEEEESH0X0X0X0X0X"; // Placeholder

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(contractAddress).then(() => {
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = `
                <svg class="icon w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"/>
                </svg>
                Copied!
            `;
            copyBtn.classList.add("copied");
            
            setTimeout(() => {
                copyBtn.innerHTML = originalHTML;
                copyBtn.classList.remove("copied");
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            copyBtn.innerHTML = "Failed ❌";
            setTimeout(() => {
                copyBtn.innerHTML = `
                    <svg class="icon w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M9 8v3a1 1 0 0 1-1 1H5m11 4h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v1m4 3v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7.13a1 1 0 0 1 .24-.65L7.7 8.35A1 1 0 0 1 8.46 8H13a1 1 0 0 1 1 1Z"/>
                    </svg>
                    Copy Contract
                `;
            }, 2000);
        });
    });

    // Intersection Observer for Gallery Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el, index) => {
        // Add stagger delay based on index for a cascading effect
        el.style.transitionDelay = `${index * 150}ms`;
        observer.observe(el);
    });

    // Mini Game: Pump The Bag Logic
    const target = document.getElementById('pump-target');
    const scoreDisplay = document.getElementById('score');
    let score = 0;
    let clickPower = 100;

    if (target && scoreDisplay) {
        target.addEventListener('click', (e) => {
            // Increase score
            score += clickPower;
            scoreDisplay.textContent = score.toLocaleString();

            // Visual feedback: Scale logo up slightly based on score
            let currentScale = 1 + (score / 200000); 
            if(currentScale > 1.3) currentScale = 1.3;
            target.style.transform = `scale(${currentScale})`;

            // Floating text animation for clicks
            const floatingText = document.createElement('div');
            floatingText.textContent = `+$${clickPower}`;
            floatingText.className = 'floating-text';
            
            // Randomize position slightly around the click
            floatingText.style.left = `${e.clientX - 30 + (Math.random() * 60)}px`;
            floatingText.style.top = `${e.clientY - 30}px`;
            
            document.body.appendChild(floatingText);

            setTimeout(() => {
                floatingText.remove();
            }, 800);
            
            // Level up power
            if (score > 1000) clickPower = 500;
            if (score > 10000) clickPower = 1000;
            if (score > 50000) clickPower = 5000;
            if (score > 200000) clickPower = 10000;
        });
    }
});
