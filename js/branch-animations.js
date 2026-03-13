// BROWSE 2025 - Branch-specific Animations

document.addEventListener('DOMContentLoaded', function() {
    initBranchAnimations();
});

function initBranchAnimations() {
    // Initialize all branch animations
    createCodeParticles();
    createNetworkLines();
    createAppWindows();
    createDataVisualizations();
    createNeuralNetwork();
}

// CSE Animation - Code Particles
function createCodeParticles() {
    const codeContainer = document.querySelector('.code-particles');
    if (!codeContainer) return;
    
    // Code snippets for particles
    const codeSnippets = [
        "for (i=0; i<n; i++)",
        "if (x > y) return true;",
        "while (node != null)",
        "class Program {}",
        "function main() {",
        "return new Promise();",
        "const data = [];",
        "import java.util.*;",
        "public static void",
        "#include <stdio.h>",
        "var result = 0;",
        "try { } catch { }",
        "async/await",
        "let array = [1,2,3];",
        "System.out.println()",
        "cout << \"Hello\";",
        "SELECT * FROM",
        "def process():",
    ];
    
    // Create code particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'code-particle';
        
        // Random position, speed, and snippet
        const posX = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 10;
        const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        
        // Apply styles and content
        particle.textContent = snippet;
        particle.style.left = `${posX}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        codeContainer.appendChild(particle);
    }
}

// ISE Animation - Network Lines
function createNetworkLines() {
    const networkContainer = document.querySelector('.network-lines');
    if (!networkContainer) return;
    
    // Create network lines
    for (let i = 0; i < 10; i++) {
        const line = document.createElement('div');
        line.className = 'network-line';
        
        // Random position, length, rotation and animation
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const length = Math.random() * 100 + 50;
        const rotation = Math.random() * 360;
        const duration = Math.random() * 3 + 2;
        
        // Apply styles
        line.style.left = `${posX}%`;
        line.style.top = `${posY}%`;
        line.style.width = `${length}px`;
        line.style.transform = `rotate(${rotation}deg)`;
        line.style.animationDuration = `${duration}s`;
        
        networkContainer.appendChild(line);
        
        // Add traveling dots on the line
        createNetworkDots(line, rotation, length, duration);
    }
}

function createNetworkDots(line, rotation, length, lineDuration) {
    const networkContainer = document.querySelector('.network-lines');
    if (!networkContainer) return;
    
    // Create 1-3 dots per line
    const dotCount = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'network-dot';
        
        // Position and animation
        const lineRect = line.getBoundingClientRect();
        const containerRect = networkContainer.getBoundingClientRect();
        
        const startX = (lineRect.left - containerRect.left);
        const startY = (lineRect.top - containerRect.top);
        
        const dotDuration = Math.random() * 2 + 2;
        const dotDelay = Math.random() * 5;
        
        // Apply styles
        dot.style.left = `${startX}px`;
        dot.style.top = `${startY}px`;
        dot.style.transform = `rotate(${rotation}deg)`;
        dot.style.animationDuration = `${dotDuration}s`;
        dot.style.animationDelay = `${dotDelay}s`;
        
        networkContainer.appendChild(dot);
    }
}

// MCA Animation - App Windows
function createAppWindows() {
    const appContainer = document.querySelector('.app-windows');
    if (!appContainer) return;
    
    // App icons - using emoji to represent different applications
    const appIcons = ['📊', '📱', '💻', '🔍', '📈', '📝', '🔐', '🌐', '📁', '📷'];
    
    // Create floating app windows
    for (let i = 0; i < 12; i++) {
        const appWindow = document.createElement('div');
        appWindow.className = 'app-window';
        
        // Add icon
        const icon = document.createElement('div');
        icon.textContent = appIcons[Math.floor(Math.random() * appIcons.length)];
        icon.style.fontSize = '24px';
        icon.style.textAlign = 'center';
        icon.style.lineHeight = '60px';
        
        // Random position and animation
        const posX = Math.random() * 90 + 5;
        const posY = Math.random() * 90 + 5;
        const duration = Math.random() * 6 + 4;
        const delay = Math.random() * 5;
        
        // Apply styles
        appWindow.style.left = `${posX}%`;
        appWindow.style.top = `${posY}%`;
        appWindow.style.animationDuration = `${duration}s`;
        appWindow.style.animationDelay = `${delay}s`;
        
        appWindow.appendChild(icon);
        appContainer.appendChild(appWindow);
    }
}

// AI&DS Animation - Data Visualization
function createDataVisualizations() {
    const dataContainer = document.querySelector('.data-viz');
    if (!dataContainer) return;
    
    // Create data bars
    const barCount = 30;
    
    for (let i = 0; i < barCount; i++) {
        const bar = document.createElement('div');
        bar.className = 'data-bar';
        
        // Position and animation
        const posX = (i / barCount) * 100;
        const duration = Math.random() * 2 + 1;
        const delay = Math.random() * 3;
        
        // Apply styles
        bar.style.left = `${posX}%`;
        bar.style.animationDuration = `${duration}s`;
        bar.style.animationDelay = `${delay}s`;
        
        dataContainer.appendChild(bar);
    }
}

// AI&ML Animation - Neural Network
function createNeuralNetwork() {
    const neuralContainer = document.querySelector('.neural-network');
    if (!neuralContainer) return;
    
    // Create neurons (nodes)
    const neuronCount = 15;
    const neurons = [];
    
    for (let i = 0; i < neuronCount; i++) {
        const neuron = document.createElement('div');
        neuron.className = 'neuron';
        
        // Random position
        const posX = Math.random() * 90 + 5;
        const posY = Math.random() * 90 + 5;
        
        // Apply styles
        neuron.style.left = `${posX}%`;
        neuron.style.top = `${posY}%`;
        
        neuralContainer.appendChild(neuron);
        neurons.push({element: neuron, x: posX, y: posY});
    }
    
    // Connect neurons with synapses
    for (let i = 0; i < neurons.length; i++) {
        // Connect each neuron to 2-4 others
        const connectionCount = Math.floor(Math.random() * 3) + 2;
        
        for (let j = 0; j < connectionCount; j++) {
            // Pick a random target neuron (not itself)
            let targetIndex;
            do {
                targetIndex = Math.floor(Math.random() * neurons.length);
            } while (targetIndex === i);
            
            const source = neurons[i];
            const target = neurons[targetIndex];
            
            createSynapse(neuralContainer, source, target);
        }
    }
}

function createSynapse(container, source, target) {
    const synapse = document.createElement('div');
    synapse.className = 'synapse';
    
    // Calculate position and length
    const sourceRect = source.element.getBoundingClientRect();
    const targetRect = target.element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    const startX = source.x;
    const startY = source.y;
    const endX = target.x;
    const endY = target.y;
    
    // Calculate length and angle
    const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
    
    // Animation
    const duration = Math.random() * 3 + 2;
    
    // Apply styles
    synapse.style.left = `${startX}%`;
    synapse.style.top = `${startY}%`;
    synapse.style.width = `${length}%`;
    synapse.style.transform = `rotate(${angle}deg)`;
    synapse.style.animationDuration = `${duration}s`;
    
    container.appendChild(synapse);
} 