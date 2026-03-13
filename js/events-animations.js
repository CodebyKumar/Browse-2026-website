// Events Section Animations
function initEventsAnimations() {
    const eventsSection = document.querySelector('.events');
    if (!eventsSection) return;

    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'events-particles';
    eventsSection.appendChild(particlesContainer);

    // Create particles
    function createParticles() {
        const particleCount = 30; // Increased particle count
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random starting position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random size
            const size = Math.random() * 6 + 2; // Increased size range
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random animation delay
            particle.style.animationDelay = `${Math.random() * 15}s`;
            
            // Random color with more vibrant options
            const colors = [
                'rgba(108, 99, 255, 0.4)',
                'rgba(255, 86, 120, 0.4)',
                'rgba(44, 220, 220, 0.4)',
                'rgba(255, 215, 0, 0.4)'
            ];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            // Add blur effect
            particle.style.filter = 'blur(1px)';
            
            particlesContainer.appendChild(particle);
        }
    }

    // Initialize particles
    createParticles();

    // Add hover effect to event cards
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            const icon = card.querySelector('.event-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.background = 'rgba(108, 99, 255, 0.2)';
                icon.style.boxShadow = '0 0 20px rgba(108, 99, 255, 0.3)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            const icon = card.querySelector('.event-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
                icon.style.background = 'rgba(255, 255, 255, 0.1)';
                icon.style.boxShadow = 'none';
            }
        });
    });

    // Add scroll reveal animation with staggered delay
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-up', 'appear');
                }, index * 100); // Staggered delay based on index
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    eventCards.forEach(card => {
        observer.observe(card);
    });

    // Add parallax effect to background
    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const moveX = (clientX - window.innerWidth / 2) * 0.01;
        const moveY = (clientY - window.innerHeight / 2) * 0.01;
        
        eventCards.forEach(card => {
            card.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initEventsAnimations); 