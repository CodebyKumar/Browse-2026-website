// BROWSE 2025 - Chatbot Functionality

document.addEventListener('DOMContentLoaded', function() {
    initChatbot();
});

function initChatbot() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeChat = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');

    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', function() {
        chatbotContainer.classList.toggle('active');
        // If activating chatbot, add welcome message if it's the first time
        if (chatbotContainer.classList.contains('active') && chatMessages.children.length === 0) {
            addBotMessage("Hello! I'm BROWSE Assistant. How can I help you with information about BROWSE 2025?");
        }
    });

    // Close chat function
    closeChat.addEventListener('click', function() {
        chatbotContainer.classList.remove('active');
    });

    // Handle chat form submission
    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const message = userInput.value.trim();
        if (message !== '') {
            // Add user message to chat
            addUserMessage(message);
            // Clear input
            userInput.value = '';
            // Process message and get response
            processMessage(message);
        }
    });

    // Function to add bot message to chat
    function addBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message bot-message';
        messageElement.innerHTML = `
            <div class="avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
                <span class="timestamp">${getCurrentTime()}</span>
            </div>
        `;
        chatMessages.appendChild(messageElement);
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Add typing animation
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(20px)';
        setTimeout(() => {
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0)';
        }, 100);
    }

    // Function to add user message to chat
    function addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message user-message';
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
                <span class="timestamp">${getCurrentTime()}</span>
            </div>
            <div class="avatar">
                <i class="fas fa-user"></i>
            </div>
        `;
        chatMessages.appendChild(messageElement);
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Get current time in HH:MM format
    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        return hours + ':' + minutes + ' ' + ampm;
    }

    // Process user message and generate response
    function processMessage(message) {
        // Show typing indicator
        showTypingIndicator();
        
        // Set timeout to simulate processing time
        setTimeout(() => {
            // Remove typing indicator
            removeTypingIndicator();
            
            // Get response based on user's message
            const response = getBotResponse(message);
            
            // Add bot response
            addBotMessage(response);
        }, 1000);
    }

    // Show bot is typing indicator
    function showTypingIndicator() {
        const typingElement = document.createElement('div');
        typingElement.className = 'chat-message bot-message typing-indicator';
        typingElement.innerHTML = `
            <div class="avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></p>
            </div>
        `;
        chatMessages.appendChild(typingElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Get bot response based on user message
    function getBotResponse(message) {
        message = message.toLowerCase();
        
        // Check for keywords in the message
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! How can I assist you with BROWSE 2025?";
        } 
        else if (message.includes('event') || message.includes('events')) {
            return "BROWSE 2025 features several exciting events including Byte Surge (programming contest), Cyber Etymology, Technical Quiz, Life Extension (gaming), Prastuti (paper presentation), and Tech Innovate. Which event would you like to know more about?";
        }
        else if (message.includes('byte surge') || message.includes('programming')) {
            return "Byte Surge is our premier programming contest that challenges participants to solve complex algorithmic problems within a time limit. It's a great opportunity to showcase your coding skills!";
        }
        else if (message.includes('cyber etymology')) {
            return "Cyber Etymology explores the derivation of technical terms from their origins. It's a fascinating word-based challenge that tests your knowledge of technology terminology.";
        }
        else if (message.includes('quiz')) {
            return "The Technical Quiz tests your knowledge on various IT aspects including programming, hardware, networking, and current tech trends. It's a multi-round competition with exciting prizes!";
        }
        else if (message.includes('life extension') || message.includes('gaming') || message.includes('game')) {
            return "Life Extension is our gaming contest that combines strategy, skill, and quick thinking in a competitive environment. Both casual and hardcore gamers are welcome to participate!";
        }
        else if (message.includes('prastuti') || message.includes('paper')) {
            return "Prastuti is our technical paper presentation event where participants can present their innovative research work to a panel of expert judges. It's a great platform to showcase your academic and research skills.";
        }
        else if (message.includes('tech innovate') || message.includes('innovation')) {
            return "Tech Innovate challenges participants to showcase innovative solutions to real-world problems. This creativity challenge encourages thinking outside the box!";
        }
        else if (message.includes('register') || message.includes('registration') || message.includes('sign up')) {
            return "You can register for BROWSE 2025 by filling out the registration form in the Register section of our website. The registration fee is ₹500 per team. You can also register instantly by scanning the QR code provided.";
        }
        else if (message.includes('fee') || message.includes('cost') || message.includes('price')) {
            return "The registration fee for BROWSE 2025 is ₹500 per team. This covers participation in any one event of your choice.";
        }
        else if (message.includes('date') || message.includes('when')) {
            return "BROWSE 2025 will be held on July 15th, 2025 at Siddaganga Institute of Technology, Tumakuru, Karnataka.";
        }
        else if (message.includes('location') || message.includes('venue') || message.includes('where')) {
            return "BROWSE 2025 will take place at Siddaganga Institute of Technology, B.H. Road, Tumakuru-572103, Karnataka, India.";
        }
        else if (message.includes('contact') || message.includes('help') || message.includes('support')) {
            return "For any queries or assistance, you can contact the BROWSE 2025 team at browse2025@sit.ac.in or call +91 9876543210. You can also visit the Contact section on our website for more details.";
        }
        else if (message.includes('prize') || message.includes('win') || message.includes('award')) {
            return "BROWSE 2025 offers exciting prizes for all events! Winners can receive cash prizes, tech gadgets, certificates, and opportunities for internships with our sponsor companies. The total prize pool is worth over ₹1,00,000!";
        }
        else if (message.includes('schedule') || message.includes('time') || message.includes('program')) {
            return "The schedule for BROWSE 2025 is: 8:00 AM - Registration, 9:00 AM - Inauguration, 10:00 AM - Technical Quiz, 11:30 AM - Cyber Etymology, 1:00 PM - Lunch Break, 2:00 PM - Byte Surge, 3:30 PM - Prastuti, 5:00 PM - Awards Ceremony. Check the Schedule section for more details!";
        }
        else if (message.includes('sponsor')) {
            return "BROWSE 2025 is proudly sponsored by several leading technology companies. You can find more information about our sponsors in the Sponsors section of the website. If you're interested in becoming a sponsor, please contact us!";
        }
        else if (message.includes('accommodation') || message.includes('stay')) {
            return "Limited accommodation facilities are available for outstation participants on a first-come, first-served basis. Please mention your accommodation requirements while registering. Additional charges may apply.";
        }
        else if (message.includes('food') || message.includes('lunch') || message.includes('refreshment')) {
            return "Lunch and refreshments will be provided to all registered participants on the event day. The lunch break is scheduled from 1:00 PM to 2:00 PM.";
        }
        else if (message.includes('certificate')) {
            return "All participants will receive a digital participation certificate. Winners and runners-up will receive special merit certificates during the awards ceremony.";
        }
        else if (message.includes('team') || message.includes('group') || message.includes('individual')) {
            return "Team size requirements vary by event. Byte Surge and Technical Quiz allow teams of 2 members. Prastuti allows teams of up to 3 members. Life Extension can be individual or teams of 2. Cyber Etymology is an individual event. Please check the specific event details for more information.";
        }
        else if (message.includes('thank')) {
            return "You're welcome! If you have any other questions about BROWSE 2025, feel free to ask. I'm here to help!";
        }
        else if (message.includes('bye') || message.includes('goodbye')) {
            return "Goodbye! Thank you for your interest in BROWSE 2025. Feel free to return if you have more questions!";
        }
        else {
            return "I'm not sure I understand that query. Could you please rephrase or ask about events, registration, venue, schedule, or contact information for BROWSE 2025?";
        }
    }
} 