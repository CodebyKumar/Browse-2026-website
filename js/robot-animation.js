// BROWSE 2025 - Robot Animation JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initRobotAnimation();
});

function initRobotAnimation() {
    const robotContainer = document.querySelector('.robot-container');
    const robotMessage = document.querySelector('.robot-message');
    const robotEyes = document.querySelectorAll('.robot-eye');
    const robotSparkles = document.querySelector('.robot-sparkles');
    
    if (!robotContainer) return;
    
    // Create sparkles
    createSparkles(robotSparkles);
    
    // Add interactive hover effect
    robotContainer.addEventListener('mouseenter', function() {
        // Change animation pause state
        robotContainer.style.animationPlayState = 'paused';
        
        // Show message immediately
        robotMessage.style.animation = 'none';
        robotMessage.style.opacity = '1';
        robotMessage.style.transform = 'scale(1) translateX(0)';
        
        // Make eyes glow brighter
        robotEyes.forEach(eye => {
            eye.style.boxShadow = '0 0 15px 5px #2CDCDC, 0 0 30px rgba(44, 220, 220, 0.5)';
        });
        
        // Add more sparkles
        createMoreSparkles(robotSparkles);
    });
    
    robotContainer.addEventListener('mouseleave', function() {
        // Resume animation
        robotContainer.style.animationPlayState = 'running';
        
        // Reset message animation
        robotMessage.style.animation = 'message-popup 3s ease-in-out infinite';
        
        // Reset eye glow
        robotEyes.forEach(eye => {
            eye.style.boxShadow = '0 0 10px #2CDCDC, inset 0 0 5px rgba(255, 255, 255, 0.8)';
        });
    });
    
    // Add click interaction
    robotContainer.addEventListener('click', function() {
        // Create jumping effect
        robotContainer.classList.add('robot-jump');
        
        // Change message text temporarily
        const originalText = robotMessage.textContent;
        const messages = ["HELLO!", "HI THERE!", "WELCOME!", "JOIN US!"];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        robotMessage.textContent = randomMessage;
        robotMessage.style.backgroundColor = '#6C63FF';
        robotMessage.style.background = 'linear-gradient(135deg, #FF5678, #d43c5d)';
        robotMessage.style.color = 'white';
        
        // Update message bubble arrow color
        const style = document.createElement('style');
        style.textContent = '.robot-message:after { border-color: transparent transparent transparent #d43c5d !important; }';
        document.head.appendChild(style);
        
        // Create a burst of sparkles
        createSparkleExplosion(robotSparkles);
        
        // Reset after animation
        setTimeout(function() {
            robotContainer.classList.remove('robot-jump');
            setTimeout(function() {
                robotMessage.textContent = originalText;
                robotMessage.style.background = 'linear-gradient(135deg, #6C63FF, #4e46c8)';
                robotMessage.style.color = 'white';
                document.head.removeChild(style);
            }, 1000);
        }, 500);
    });
    
    // Add jumping animation CSS
    const jumpStyle = document.createElement('style');
    jumpStyle.innerHTML = `
        @keyframes robot-jump {
            0%, 100% {
                transform: translateY(-50%);
            }
            50% {
                transform: translateY(-70%) rotate(-5deg);
            }
        }
        
        .robot-jump {
            animation: robot-jump 0.5s ease-out !important;
        }
    `;
    document.head.appendChild(jumpStyle);
    
    // Occasionally make the robot do random movements
    setInterval(function() {
        if (Math.random() > 0.7) { // 30% chance to do a random action
            // Random actions
            const actions = [
                function() { // Jump
                    robotContainer.classList.add('robot-jump');
                    createSparkleExplosion(robotSparkles, 5);
                    setTimeout(function() {
                        robotContainer.classList.remove('robot-jump');
                    }, 500);
                },
                function() { // Wave
                    const rightArm = document.querySelector('.robot-arm.right');
                    const originalAnimation = rightArm.style.animation;
                    rightArm.style.animation = 'none';
                    rightArm.style.transform = 'rotate(45deg)';
                    
                    setTimeout(function() {
                        rightArm.style.transform = 'rotate(-45deg)';
                        setTimeout(function() {
                            rightArm.style.transform = 'rotate(45deg)';
                            setTimeout(function() {
                                rightArm.style.transform = '';
                                rightArm.style.animation = originalAnimation;
                            }, 300);
                        }, 300);
                    }, 300);
                },
                function() { // Blink rapidly
                    robotEyes.forEach(eye => {
                        const originalAnimation = eye.style.animation;
                        eye.style.animation = 'blink 0.2s 3';
                        
                        setTimeout(function() {
                            eye.style.animation = originalAnimation;
                        }, 600);
                    });
                },
                function() { // Show message
                    const originalAnimation = robotMessage.style.animation;
                    robotMessage.style.animation = 'none';
                    robotMessage.style.opacity = '1';
                    robotMessage.style.transform = 'scale(1) translateX(0)';
                    
                    // Random tech terms
                    const techTerms = ["TECH", "CODE", "AI", "ROBOT", "BYTE", "DATA"];
                    robotMessage.textContent = techTerms[Math.floor(Math.random() * techTerms.length)];
                    
                    setTimeout(function() {
                        robotMessage.textContent = "BROWSE";
                        robotMessage.style.animation = originalAnimation;
                    }, 1500);
                }
            ];
            
            // Perform a random action
            const randomAction = Math.floor(Math.random() * actions.length);
            actions[randomAction]();
        }
    }, 5000); // Check every 5 seconds
}

// Create initial sparkles
function createSparkles(container) {
    if (!container) return;
    
    // Create 10 sparkles
    for (let i = 0; i < 10; i++) {
        createSparkle(container);
    }
}

// Create a single sparkle
function createSparkle(container) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    
    // Random positions around the robot
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Random color
    const colors = ['#6C63FF', '#2CDCDC', '#FF5678', '#FFDD55'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Random delay
    const delay = Math.random() * 5;
    const duration = Math.random() * 2 + 1;
    
    // Apply styles
    sparkle.style.left = `${posX}%`;
    sparkle.style.top = `${posY}%`;
    sparkle.style.color = color;
    sparkle.style.animationDelay = `${delay}s`;
    sparkle.style.animationDuration = `${duration}s`;
    
    container.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
        container.removeChild(sparkle);
        createSparkle(container);
    }, (delay + duration) * 1000);
}

// Create more sparkles on hover
function createMoreSparkles(container) {
    if (!container) return;
    
    // Create 5 additional sparkles
    for (let i = 0; i < 5; i++) {
        createSparkle(container);
    }
}

// Create a burst of sparkles on click/jump
function createSparkleExplosion(container, count = 15) {
    if (!container) return;
    
    // Create a burst of sparkles
    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // Position in center
        const posX = 50 + (Math.random() * 60 - 30);
        const posY = 50 + (Math.random() * 60 - 30);
        
        // Random color
        const colors = ['#6C63FF', '#2CDCDC', '#FF5678', '#FFDD55', '#FFF'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Quicker animation
        const duration = Math.random() * 1 + 0.5;
        
        // Apply styles
        sparkle.style.left = `${posX}%`;
        sparkle.style.top = `${posY}%`;
        sparkle.style.color = color;
        sparkle.style.animationDuration = `${duration}s`;
        sparkle.style.width = `${Math.random() * 5 + 3}px`;
        sparkle.style.height = `${Math.random() * 5 + 3}px`;
        
        container.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            if (container.contains(sparkle)) {
                container.removeChild(sparkle);
            }
        }, duration * 1000);
    }
} 