// ======================
// PORTFOLIO CHATBOT v2.0
// ======================

// DOM Elements
const chatbot = {
    toggle: document.querySelector('.chatbot-toggle'),
    container: document.querySelector('.chatbot-container'),
    close: document.querySelector('.chatbot-close'),
    input: document.querySelector('.chatbot-input input'),
    send: document.querySelector('.chatbot-send'),
    messages: document.querySelector('.chatbot-messages')
  };
  
  // Configuration
  const config = {
    botName: "Yashwanth's Assistant",
    defaultDelay: 800,
    typingSpeed: 20,
    storageKey: 'portfolio_chat_history'
  };
  
  // Enhanced Responses Database
  const responses = {
    greetings: [
      "Hey there! 👋 How can I help?",
      "Hi! Ask me about my work, projects, or skills.",
      "Hello! I'm here to talk about web dev and design."
    ],
    skills: {
      technical: "I specialize in <strong>React</strong>, <strong>Node.js</strong>, and <strong>TypeScript</strong>. Proficient in responsive design, REST APIs, and modern CSS.",
      casual: "I build stuff with cool tech like React and Node! 😄 What specifically interests you?",
      followUp: "Want details about <strong>frontend</strong> or <strong>backend</strong> skills?"
    },
    projects: {
      technical: "Recent work includes: <br>- <strong>E-commerce platform</strong> (React + Stripe)<br>- <strong>Task manager</strong> (MERN stack)<br>- <strong>Portfolio CMS</strong> (Next.js + Sanity)",
      casual: "Made some fun projects! � From online stores to custom dashboards. Check my Projects section!",
      followUp: "Should I share <strong>code samples</strong> or <strong>deployment details</strong>?"
    },
    contact: {
      technical: "For professional inquiries:<br><strong>Email:</strong> contact@yashwanth.com<br><strong>Phone:</strong> +1 (234) 567-8900",
      casual: "Hit me up at 📧 contact@yashwanth.com or call ☎️ +1 (234) 567-8900!",
      followUp: "Prefer <strong>LinkedIn</strong> or <strong>email</strong>?"
    },
    fallback: [
      "I'm not sure I understand. Try asking about my <strong>skills</strong>, <strong>projects</strong>, or how to <strong>contact</strong> me!",
      "Hmm, I'm still learning! Maybe ask differently? 😅"
    ]
  };
  
  // Chatbot State
  const state = {
    isTyping: false,
    conversation: []
  };
  
  // ======================
  // CORE FUNCTIONS
  // ======================
  
  // Initialize chatbot
  function init() {
    loadHistory();
    addBotMessage(getRandomResponse('greetings'));
    setupEventListeners();
  }
  
  // Set up event listeners
  function setupEventListeners() {
    chatbot.toggle.addEventListener('click', toggleChat);
    chatbot.close.addEventListener('click', closeChat);
    chatbot.send.addEventListener('click', sendUserMessage);
    chatbot.input.addEventListener('keypress', (e) => e.key === 'Enter' && sendUserMessage());
    
    // Auto-focus input when chat opens
    chatbot.toggle.addEventListener('click', () => {
      setTimeout(() => chatbot.input.focus(), 300);
    });
  }
  
  // Toggle chat visibility
  function toggleChat() {
    chatbot.container.classList.toggle('active');
    animateChatToggle();
  }
  
  function animateChatToggle() {
    if (chatbot.container.classList.contains('active')) {
      chatbot.container.style.transform = 'translateY(0)';
      chatbot.container.style.opacity = '1';
    } else {
      chatbot.container.style.transform = 'translateY(20px)';
      chatbot.container.style.opacity = '0';
    }
  }
  
  function closeChat() {
    chatbot.container.classList.remove('active');
    animateChatToggle();
  }
  
  // ======================
  // MESSAGE HANDLING
  // ======================
  
  // Send user message
  function sendUserMessage() {
    const message = chatbot.input.value.trim();
    if (!message || state.isTyping) return;
  
    addMessage(message, 'user');
    chatbot.input.value = '';
    saveToHistory(message, 'user');
    
    setTimeout(() => processUserInput(message), 500);
  }
  
  // Process user input
  function processUserInput(input) {
    const intent = detectIntent(input);
    const tone = detectTone(input);
    
    state.isTyping = true;
    showTypingIndicator();
    
    setTimeout(() => {
      state.isTyping = false;
      removeTypingIndicator();
      
      const response = generateResponse(intent, tone);
      addBotMessage(response.message);
      saveToHistory(response.message, 'bot');
      
      if (response.followUp) {
        setTimeout(() => {
          addBotMessage(response.followUp);
          saveToHistory(response.followUp, 'bot');
        }, 1000);
      }
    }, calculateTypingDelay(input));
  }
  
  // Add message to UI
  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender}-message`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    
    chatbot.messages.appendChild(messageDiv);
    scrollToBottom();
    
    // Add animation
    messageDiv.style.animation = `fadeInUp 0.3s ease-out`;
  }
  
  // Add bot message with typing effect
  function addBotMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chatbot-message bot-message';
    messageDiv.innerHTML = `<p>${text}</p>`;
    
    chatbot.messages.appendChild(messageDiv);
    scrollToBottom();
  }
  
  // ======================
  // INTELLIGENCE LAYER
  // ======================
  
  // Detect user intent
  function detectIntent(input) {
    input = input.toLowerCase();
    
    if (/(hi|hello|hey)/i.test(input)) return 'greetings';
    if (/(skill|tech|stack|framework|library)/i.test(input)) return 'skills';
    if (/(project|work|portfolio|built)/i.test(input)) return 'projects';
    if (/(contact|reach|email|phone|call)/i.test(input)) return 'contact';
    
    return 'fallback';
  }
  
  // Detect conversation tone
  function detectTone(input) {
    const hasEmoji = /(\p{Emoji}|\uFE0F)/gu.test(input);
    const casualWords = ['cool', 'awesome', 'hey', 'hi', 'fun', '?', '!'];
    const isCasual = casualWords.some(word => input.includes(word)) || hasEmoji;
    
    const techWords = ['stack', 'framework', 'library', 'API', 'how to', 'build'];
    const isTechnical = techWords.some(word => input.includes(word)) && !hasEmoji;
    
    return isTechnical ? 'technical' : isCasual ? 'casual' : 'neutral';
  }
  
  // Generate appropriate response
  function generateResponse(intent, tone) {
    if (intent === 'greetings') {
      return { 
        message: getRandomResponse('greetings') 
      };
    }
    
    if (responses[intent]) {
      return {
        message: responses[intent][tone] || responses[intent].technical,
        followUp: responses[intent].followUp
      };
    }
    
    return { 
      message: getRandomResponse('fallback') 
    };
  }
  
  // ======================
  // UTILITIES
  // ======================
  
  function getRandomResponse(category) {
    if (Array.isArray(responses[category])) {
      return responses[category][Math.floor(Math.random() * responses[category].length)];
    }
    return responses.fallback[0];
  }
  
  function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'chatbot-message bot-message typing-indicator';
    indicator.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
    chatbot.messages.appendChild(indicator);
    scrollToBottom();
  }
  
  function removeTypingIndicator() {
    const indicator = document.querySelector('.typing-indicator');
    if (indicator) indicator.remove();
  }
  
  function calculateTypingDelay(text) {
    const baseDelay = config.defaultDelay;
    const lengthDelay = Math.min(text.length * config.typingSpeed, 2000);
    return baseDelay + lengthDelay;
  }
  
  function scrollToBottom() {
    chatbot.messages.scrollTop = chatbot.messages.scrollHeight;
  }
  
  // ======================
  // PERSISTENCE
  // ======================
  
  function saveToHistory(message, sender) {
    state.conversation.push({ sender, message, timestamp: new Date().toISOString() });
    localStorage.setItem(config.storageKey, JSON.stringify(state.conversation));
  }
  
  function loadHistory() {
    const saved = localStorage.getItem(config.storageKey);
    if (saved) {
      state.conversation = JSON.parse(saved);
      state.conversation.forEach(msg => {
        addMessage(msg.message, msg.sender);
      });
    }
  }
  
  // ======================
  // INITIALIZATION
  // ======================
  
  // Start the chatbot
  document.addEventListener('DOMContentLoaded', init);