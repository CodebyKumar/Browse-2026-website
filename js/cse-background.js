// BROWSE 2025 - CSE Background Animations

document.addEventListener('DOMContentLoaded', function() {
    // Create background container if it doesn't exist
    let cseBackground = document.querySelector('.cse-background');
    if (!cseBackground) {
        cseBackground = document.createElement('div');
        cseBackground.className = 'cse-background';
        document.body.appendChild(cseBackground);
    }
    
    // Initialize all animations
    initBinaryRain(cseBackground);
    initCircuitBoard(cseBackground);
    initCodeSnippets(cseBackground);
    initHeroMatrixEffect();
});

// Binary Rain Animation
function initBinaryRain(container) {
    const binaryContainer = document.createElement('div');
    binaryContainer.className = 'binary-rain';
    container.appendChild(binaryContainer);
    
    // Binary characters
    const binaryChars = ['0', '1'];
    
    // Create binary drops
    const dropCount = Math.min(window.innerWidth / 25, 60); // Responsive number of drops
    
    for (let i = 0; i < dropCount; i++) {
        const drop = document.createElement('div');
        drop.className = 'binary-drop';
        
        // Generate binary string
        let binaryString = '';
        const length = Math.floor(Math.random() * 10) + 5;
        for (let j = 0; j < length; j++) {
            binaryString += binaryChars[Math.floor(Math.random() * binaryChars.length)];
        }
        
        // Random position, speed, and delay
        const posX = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 15;
        
        // Apply styles and content
        drop.textContent = binaryString;
        drop.style.left = `${posX}%`;
        drop.style.animationDuration = `${duration}s`;
        drop.style.animationDelay = `${delay}s`;
        
        binaryContainer.appendChild(drop);
    }
}

// Circuit Board Animation
function initCircuitBoard(container) {
    const circuitContainer = document.createElement('div');
    circuitContainer.className = 'circuit-board';
    container.appendChild(circuitContainer);
    
    // Create nodes (connection points)
    const nodeCount = Math.min(window.innerWidth / 80, 25); // Responsive number of nodes
    const nodes = [];
    
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'circuit-node';
        
        // Random position
        const posX = Math.random() * 98 + 1;
        const posY = Math.random() * 98 + 1;
        
        // Apply styles
        node.style.left = `${posX}%`;
        node.style.top = `${posY}%`;
        
        circuitContainer.appendChild(node);
        nodes.push({element: node, x: posX, y: posY});
        
        // Create pulsing effect
        createCircuitPulse(circuitContainer, posX, posY);
    }
    
    // Connect nodes with circuit lines
    for (let i = 0; i < nodes.length; i++) {
        // Connect to 2-3 nearby nodes
        const connectionCount = Math.floor(Math.random() * 2) + 2;
        
        // Sort by distance to find closest nodes
        const sortedNodes = [...nodes].filter(n => n !== nodes[i])
            .sort((a, b) => {
                const distA = Math.sqrt(Math.pow(a.x - nodes[i].x, 2) + Math.pow(a.y - nodes[i].y, 2));
                const distB = Math.sqrt(Math.pow(b.x - nodes[i].x, 2) + Math.pow(b.y - nodes[i].y, 2));
                return distA - distB;
            });
        
        // Connect to closest nodes
        for (let j = 0; j < Math.min(connectionCount, sortedNodes.length); j++) {
            createCircuitLine(circuitContainer, nodes[i], sortedNodes[j]);
        }
    }
}

function createCircuitLine(container, source, target) {
    const line = document.createElement('div');
    line.className = 'circuit-line';
    
    // Calculate position, length and angle
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    
    // Apply styles
    line.style.width = `${length}%`;
    line.style.height = '1px';
    line.style.left = `${source.x}%`;
    line.style.top = `${source.y}%`;
    line.style.transform = `rotate(${angle}deg)`;
    
    container.appendChild(line);
}

function createCircuitPulse(container, x, y) {
    const pulse = document.createElement('div');
    pulse.className = 'circuit-pulse';
    
    // Position
    pulse.style.left = `${x}%`;
    pulse.style.top = `${y}%`;
    
    // Animation timing
    const delay = Math.random() * 15;
    pulse.style.animationDelay = `${delay}s`;
    
    container.appendChild(pulse);
}

// Floating Code Snippets Animation
function initCodeSnippets(container) {
    const snippetsContainer = document.createElement('div');
    snippetsContainer.className = 'code-snippets';
    container.appendChild(snippetsContainer);
    
    // Code snippet templates
    const codeSnippets = [
        "function algorithm() {\n  let data = [];\n  return process(data);\n}",
        "class Neural {\n  constructor() {\n    this.weights = [];\n  }\n}",
        "for (let i = 0; i < n; i++) {\n  if (array[i] > max) {\n    max = array[i];\n  }\n}",
        "const result = await fetch('/api/data');\nconst json = await result.json();",
        "#include <iostream>\nint main() {\n  std::cout << \"Hello\";\n  return 0;\n}",
        "def machine_learning():\n  model = train(data)\n  return model.predict()",
        "import tensorflow as tf\nmodel = tf.keras.Sequential()",
        "SELECT * FROM users\nWHERE active = 1\nORDER BY name",
        "public static void main(String[] args) {\n  System.out.println(\"Java\");\n}"
    ];
    
    // Create floating code blocks
    const blockCount = Math.min(Math.max(window.innerWidth / 500, 2), 5); // Responsive number of blocks
    
    for (let i = 0; i < blockCount; i++) {
        const block = document.createElement('div');
        block.className = 'code-block';
        
        // Random snippet
        const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        
        // Random position and animation
        const posX = Math.random() * 70 + 15;
        const posY = Math.random() * 70 + 15;
        const duration = Math.random() * 30 + 20;
        const delay = Math.random() * 15;
        
        // Apply styles and content
        block.textContent = snippet;
        block.style.left = `${posX}%`;
        block.style.top = `${posY}%`;
        block.style.animationDuration = `${duration}s`;
        block.style.animationDelay = `${delay}s`;
        
        snippetsContainer.appendChild(block);
    }
}

// Special Hero Section Matrix Effect
function initHeroMatrixEffect() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.className = 'hero-matrix-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.15';
    canvas.style.pointerEvents = 'none';
    
    // Insert canvas as first child of hero section
    heroSection.insertBefore(canvas, heroSection.firstChild);
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    }
    
    // Initial size
    resizeCanvas();
    
    // Resize on window resize
    window.addEventListener('resize', resizeCanvas);
    
    // Matrix animation
    const ctx = canvas.getContext('2d');
    
    // Characters for matrix effect
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    // Column settings
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array to track y position of each column
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -100); // Start above visible area
    }
    
    // Draw function
    function draw() {
        // Translucent background to create fade effect
        ctx.fillStyle = 'rgba(13, 13, 18, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Text style
        ctx.fillStyle = '#0f0';
        ctx.font = `${fontSize}px monospace`;
        
        // Loop through each column
        for (let i = 0; i < drops.length; i++) {
            // Choose a random character
            const char = chars[Math.floor(Math.random() * chars.length)];
            
            // Draw the character
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            
            // Move the drop down
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        
        requestAnimationFrame(draw);
    }
    
    draw();
} 