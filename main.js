// Quantum State Observer (without floating effects)
class QuantumObserver {
  constructor() {
    this.state = 0;
    this.entanglementFactor = 0;
    this.quantumElements = [];
    this.initialize();
  }

  initialize() {
    this.setupRootVariables();
    this.setupQuantumElements();
    this.setupEventListeners();
  }

  setupRootVariables() {
    document.documentElement.style.setProperty('--quantum-state', this.state);
    document.documentElement.style.setProperty('--quantum-entanglement', this.entanglementFactor);
  }

  setupQuantumElements() {
    this.quantumElements = [
      ...document.querySelectorAll('[data-quantum]'),
      ...document.querySelectorAll('.btn, .nav-link, .social-link')
    ];
  }

  setupEventListeners() {
    // Quantum entanglement on mouse movement
    document.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      this.state = x;
      this.entanglementFactor = y;
      this.updateQuantumState();
    });

    // Quantum collapse on interaction
    this.quantumElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.entanglementFactor = 1;
        this.updateQuantumState();
      });

      el.addEventListener('mouseleave', () => {
        this.entanglementFactor = 0;
        this.updateQuantumState();
      });
    });
  }

  updateQuantumState() {
    document.documentElement.style.setProperty('--quantum-state', this.state);
    document.documentElement.style.setProperty('--quantum-entanglement', this.entanglementFactor);
  }
}

// Simplified Cursor (without particles)
class QuantumCursor {
  constructor() {
    this.cursor = document.querySelector('.custom-cursor');
    this.pos = { x: -100, y: -100 };
    this.init();
  }

  init() {
    this.addEventListeners();
    this.animate();
  }

  addEventListeners() {
    document.addEventListener('mousemove', (e) => {
      this.pos.x = e.clientX;
      this.pos.y = e.clientY;
    });

    document.querySelectorAll('a, button, [data-cursor="hover"]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.cursor.classList.add('active');
      });
      
      el.addEventListener('mouseleave', () => {
        this.cursor.classList.remove('active');
      });
    });
  }

  animate() {
    // Smooth cursor movement
    this.cursor.style.left = `${this.pos.x}px`;
    this.cursor.style.top = `${this.pos.y}px`;
    
    requestAnimationFrame(() => this.animate());
  }
}

// Quantum Text Animator (kept as it doesn't involve floating)
class QuantumTextAnimator {
  constructor() {
    this.textElements = document.querySelectorAll('[data-quantum-text]');
    this.init();
  }

  init() {
    this.textElements.forEach(el => {
      const originalText = el.textContent;
      el.dataset.originalText = originalText;
      el.addEventListener('mouseenter', () => this.animateText(el));
      el.addEventListener('mouseleave', () => this.resetText(el));
    });
  }

  animateText(el) {
    const originalText = el.dataset.originalText;
    let iterations = 0;
    const interval = setInterval(() => {
      el.textContent = originalText
        .split('')
        .map((letter, index) => {
          if (index < iterations || letter === ' ') {
            return letter;
          }
          return this.getRandomChar();
        })
        .join('');
      
      if (iterations >= originalText.length) clearInterval(interval);
      iterations += 1 / 2;
    }, 30);
  }

  resetText(el) {
    el.textContent = el.dataset.originalText;
  }

  getRandomChar() {
    const chars = '01!@#$%^&*()_+-=[]{}|;:,.<>?/';
    return chars[Math.floor(Math.random() * chars.length)];
  }
}

// Quantum Typing Effect (kept as it doesn't involve floating)
class QuantumTyping {
  constructor() {
    this.textElements = document.querySelectorAll('[data-typing-effect]');
    this.init();
  }

  init() {
    this.textElements.forEach(el => {
      const texts = JSON.parse(el.dataset.typingEffect);
      this.animateText(el, texts);
    });
  }

  animateText(el, texts) {
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    
    const type = () => {
      const currentText = texts[currentTextIndex];
      
      if (isDeleting) {
        el.textContent = currentText.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingSpeed = 50;
      } else {
        el.textContent = currentText.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingSpeed = 150;
      }
      
      if (!isDeleting && currentCharIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000;
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % texts.length;
        typingSpeed = 500;
      }
      
      setTimeout(type, typingSpeed + Math.random() * 100);
    };
    
    type();
  }
}

// Initialize remaining effects
document.addEventListener('DOMContentLoaded', () => {
  new QuantumObserver();
  new QuantumCursor();
  new QuantumTextAnimator();
  new QuantumTyping();
  
  // Quantum scroll effect
  const scrollElements = document.querySelectorAll('[data-quantum-scroll]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.dataset.quantumCollapsed = entry.isIntersecting ? 'true' : 'false';
    });
  }, { threshold: 0.1 });
  
  scrollElements.forEach(el => observer.observe(el));
});
class ProfessionalTypingAnimation {
  constructor() {
    this.titles = [
      "Web Developer",
      "UI/UX Designer",
      "Frontend Engineer",
      "Digital Creator",
      "Full Stack Developer",
      "Mobile App Developer",
      "Creative Coder"
    ];
    this.currentIndex = 0;
    this.textElement = document.querySelector('.typing-text');
    this.cursorElement = document.querySelector('.text-cursor');
    this.colors = [
      '#6e45e2', // purple
      '#ff7e5f', // orange
      '#88d3ce', // teal
      '#f8b400', // yellow
      '#e84a5f', // red
      '#2dde98', // green
      '#3d7ea6'  // blue
    ];
    this.init();
  }

  init() {
    this.typeText();
    this.animateCursor();
    this.setupHoverEffects();
  }

  typeText() {
    let currentTitle = this.titles[this.currentIndex];
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    let pauseBetween = 2000;

    const type = () => {
      // Set text color based on current title
      this.textElement.style.color = this.colors[this.currentIndex];
      
      if (isDeleting) {
        this.textElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        this.textElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
      }

      // Add glitch effect randomly during typing
      if (Math.random() > 0.9 && !isDeleting) {
        this.applyGlitchEffect();
      }

      if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        typingSpeed = pauseBetween; // Pause before deleting
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        this.currentIndex = (this.currentIndex + 1) % this.titles.length;
        currentTitle = this.titles[this.currentIndex];
        typingSpeed = 150;
      }

      setTimeout(type, typingSpeed);
    };

    type();
  }

  animateCursor() {
    setInterval(() => {
      if (this.cursorElement) {
        this.cursorElement.classList.toggle('blink');
      }
    }, 500);
  }

  setupHoverEffects() {
    if (this.textElement) {
      this.textElement.addEventListener('mouseover', () => {
        this.textElement.style.transform = 'scale(1.05)';
        this.textElement.style.transition = 'transform 0.3s ease-in-out';
      });

      this.textElement.addEventListener('mouseout', () => {
        this.textElement.style.transform = 'scale(1)';
      });
    }
  }

  applyGlitchEffect() {
    const originalText = this.textElement.textContent;
    const glitchChars = ['@', '#', '$', '%', '&', '*'];
    const randomIndex = Math.floor(Math.random() * originalText.length);
    const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];

    const glitchedText = originalText.substring(0, randomIndex) + randomChar + originalText.substring(randomIndex + 1);

    this.textElement.textContent = glitchedText;

    setTimeout(() => {
      this.textElement.textContent = originalText;
    }, 100);
  }
}

// Initialize the animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ProfessionalTypingAnimation();
});
