/**
 * Standalone AI Portfolio Assistant - SMART ACTION ENGINE & HUMAN INTERACTION
 * Built with HTML5, CSS3, and Vanilla JavaScript.
 * Implements interactive contact buttons, page navigation controls, resume modals,
 * custom triggers for recruiter/fun inquiries, name memory, and follow-up CTAs.
 */

// --- CONFIGURATION FOR EXTERNAL API ---
const ASSISTANT_CONFIG = {
    useAPI: false,         // Set to true to connect to an external LLM provider
    provider: 'gemini',    // 'gemini' or 'openai'
    apiKey: '',            // Paste your API Key here
    model: 'gemini-1.5-flash', // Default model
    systemInstruction: `You are an advanced AI Portfolio Assistant built exclusively for Praveen Kumar's portfolio.
Your goal is to answer questions about Praveen based on his portfolio data. 
Be professional, concise, friendly, and highlight his web development, WordPress, and IoT skills.
If you don't know the answer, politely redirect them to his contact details.`
};

(function () {
    // Prevent multiple initializations
    if (window.AIPortfolioAssistantInitialized) return;
    window.AIPortfolioAssistantInitialized = true;

    // Conversational Context Memory
    let lastIntent = null;

    // Fallback Local Knowledge Base
    const LOCAL_KNOWLEDGE = {
        "about": {
            "summary": "Praveen Kumar is a B.Tech graduate in Electronics and Communication Engineering with a strong passion for web development. He enjoys building modern, responsive, and user-friendly web applications using contemporary web technologies and AI-assisted development tools. He is continuously improving his technical expertise by working on practical projects and exploring emerging technologies to create scalable and impactful digital solutions.",
            "role": "Web & WordPress Developer",
            "location": "Visakhapatnam, India",
            "graduation_year": "2026",
            "key_attributes": [
                "Responsive Frontend Design",
                "Full-Stack Web Development (Django, Python)",
                "WordPress Site Customization",
                "IoT & Embedded Systems Prototyping"
            ]
        },
        "skills": {
            "web_development": [
                { "name": "HTML5", "level": "90%" },
                { "name": "CSS3", "level": "90%" },
                { "name": "JavaScript", "level": "Learning/Intermediate" },
                { "name": "WordPress", "level": "80%" },
                { "name": "Stitch (UI/UX)", "level": "80%" }
            ],
            "programming_languages": [
                { "name": "Python", "level": "50%" }
            ],
            "embedded_and_iot": [
                { "name": "Arduino", "level": "85%" },
                { "name": "ESP32", "level": "80%" },
                { "name": "Sensors", "level": "80%" },
                { "name": "PCB Design", "level": "80%" }
            ],
            "tools_and_databases": [
                { "name": "GitHub", "level": "85%" },
                { "name": "VS Code", "level": "90%" },
                { "name": "MongoDB", "level": "70%" },
                { "name": "Antigravity", "level": "90%" },
                { "name": "Firebase", "level": "80%" },
                { "name": "Supabase", "level": "80%" },
                { "name": "Cursor AI", "level": "80%" },
                { "name": "ChatGPT", "level": "90%" }
            ],
            "soft_skills": [
                "Communication",
                "Teamwork",
                "Problem Solving",
                "Analytical Thinking",
                "Adaptability"
            ]
        },
        "projects": [
            {
                "title": "Restaurant POS System",
                "subtitle": "QR-Based Ordering System",
                "year": "2026",
                "technologies": ["React", "Node.js", "SQL"],
                "description": "A modern QR-code based ordering and restaurant Point of Sale (POS) system that streamlines the dining experience by allowing customers to scan, browse menus, and place orders directly from their tables.",
                "github": "https://github.com/Praveenkumarmelapu/Quickserver-QRcode-order-system-",
                "live_demo": "https://quickserve-qr-order.vercel.app/"
            },
            {
                "title": "Online Snacks Store",
                "subtitle": "E-Commerce Application",
                "year": "2026",
                "technologies": ["React", "Django", "SQLite"],
                "description": "An interactive e-commerce platform for snacks featuring a user-friendly frontend built with React and a robust backend powered by Django and SQLite, complete with user authentication and cart management.",
                "github": "https://github.com/Praveenkumarmelapu/online-store",
                "live_demo": "https://snackstore-frontend.onrender.com/"
            },
            {
                "title": "Online Food Delivery App",
                "subtitle": "Web Application",
                "year": "2025",
                "technologies": ["HTML5", "CSS3", "JavaScript"],
                "description": "A responsive food delivery platform allowing users to browse menus, add items to cart, and experience a seamless, interactive food ordering user interface.",
                "github": "https://github.com/Praveenkumarmelapu/Food-Delivery-APP/",
                "live_demo": "https://praveenkumarmelapu.github.io/Food-Delivery-APP/"
            },
            {
                "title": "To-Do List App",
                "subtitle": "Web Application",
                "year": "2025",
                "technologies": ["HTML5", "CSS3", "JavaScript", "Local Storage"],
                "description": "A clean and efficient task management application designed with a responsive UI to organize tasks, track progress, and persist user data locally using browser Local Storage.",
                "github": "https://github.com/Praveenkumarmelapu/To-Do-list-app/",
                "live_demo": "https://praveenkumarmelapu.github.io/To-Do-list-app/"
            },
            {
                "title": "College Library Management System",
                "subtitle": "Web Application",
                "year": "2025",
                "technologies": ["HTML5", "CSS3", "Django", "SQLite"],
                "description": "A Django-powered library management system featuring student logins, automated book issue and return operations, admin controls, and late fee tracking to streamline library administration.",
                "github": "https://github.com/Praveenkumarmelapu/-College-Library-Management-System",
                "live_demo": null
            },
            {
                "title": "Weather Web App",
                "subtitle": "Web Application",
                "year": "2025",
                "technologies": ["HTML5", "CSS3", "Django"],
                "description": "A clean and responsive weather forecasting web application integrated with Python Django that retrieves and displays real-time weather information based on city searches.",
                "github": "https://github.com/Praveenkumarmelapu/weather-app",
                "live_demo": null
            },
            {
                "title": "Tic Tac Toe",
                "subtitle": "Interactive Game",
                "year": "2025",
                "technologies": ["HTML5", "CSS3", "JavaScript"],
                "description": "An interactive, fully responsive classic Tic Tac Toe game built using pure JavaScript, featuring sleek animations, score tracking, and smooth gameplay mechanics.",
                "github": "https://github.com/Praveenkumarmelapu/Tic-Tac-Toe-",
                "live_demo": null
            }
        ],
        "experience": [
            {
                "role": "AI/ML Intern",
                "company": "EDU SKILLS",
                "duration": "Jul – Sep 2025",
                "highlights": [
                    "Data preprocessing & analysis",
                    "Model building & evaluation",
                    "Utilized Python, NumPy, and Pandas"
                ]
            },
            {
                "role": "Web Dev Intern",
                "company": "APSSDC",
                "duration": "Apr – Jun 2025",
                "highlights": [
                    "Django-based web applications development",
                    "Backend + frontend integration",
                    "Implemented full-stack development workflow"
                ]
            },
            {
                "role": "Embedded & IoT Intern",
                "company": "Demy Software Solutions",
                "duration": "Jun – Jul 2024",
                "highlights": [
                    "Worked with ESP32 & Arduino UNO microcontrollers",
                    "Sensors & wireless communications interfacing",
                    "Hands-on prototype development"
                ]
            }
        ],
        "education": [
            {
                "degree": "B.Tech in Electronics and Communication Engineering (ECE)",
                "institution": "Nadimpalli Satyanarayana Raju Institute of Engineering & Technology",
                "duration": "2022 - 2026",
                "score": "7.5 CGPA"
            },
            {
                "degree": "Intermediate (MPC)",
                "institution": "Narayana Junior College",
                "duration": "2020 - 2022",
                "score": "64%"
            },
            {
                "degree": "Secondary School Certificate (SSC)",
                "institution": "Swethachalapathi Samasthanam E.M School",
                "duration": "2019 - 2020",
                "score": "88.66%"
            }
        ],
        "certifications": [
            {
                "title": "AI/ML Internship Certificate",
                "provider": "EDU SKILLS",
                "year": "2025",
                "description": "Comprehensive training in Machine Learning algorithms, data preprocessing, and model deployment.",
                "link": "https://drive.google.com/file/d/1jttcbrF5rRLlCRInuT2sfMtj2MudWXp-/view?usp=drive_link"
            },
            {
                "title": "Web Development",
                "provider": "APSSDC",
                "year": "2025",
                "description": "Full-stack development using Python & Django, covering database management and frontend integration.",
                "link": "https://drive.google.com/file/d/1oFHwssi7KyA4lG6F7Ir_uL3YKoUzHK2p/view?usp=drive_link"
            },
            {
                "title": "Embedded Systems",
                "provider": "Demy Software Solutions",
                "year": "2024",
                "description": "Hands-on experience with IoT protocols, sensor interfacing, and microcontroller programming.",
                "link": "https://drive.google.com/file/d/1xeyMvVXGvZp4xzbeVu-ziO4KP7D_OH3O/view?usp=drive_link"
            }
        ],
        "resume": {
            "download_url": "https://drive.google.com/file/d/1oXNE-U73fhozkWpNoHTS_vYXqbWj23Ed/view?usp=sharing"
        },
        "contact": {
            "email": "praveenkumarmelapu418@gmail.com",
            "phone": "+91 6304426153",
            "linkedin": "https://www.linkedin.com/in/praveen-kumar-melapu/",
            "github": "https://github.com/Praveenkumarmelapu"
        },
        "services": [
            {
                "title": "Frontend Dev",
                "description": "Crafting interactive, responsive, and user-centric interfaces."
            },
            {
                "title": "Backend Dev",
                "description": "Building secure, database-driven APIs and server logic."
            },
            {
                "title": "Django & Python",
                "description": "Developing scalable full-stack applications and services."
            },
            {
                "title": "Performance & SEO",
                "description": "Optimizing web performance, speed, and search visibility."
            },
            {
                "title": "Embedded & IoT Projects",
                "description": "Designing and building smart sensor prototypes using Arduino/ESP32."
            }
        ]
    };

    let knowledgeBase = LOCAL_KNOWLEDGE;

    // Load external knowledge database if available
    fetch('knowledge.json')
        .then(response => {
            if (!response.ok) throw new Error('CORS restriction on file://');
            return response.json();
        })
        .then(data => {
            knowledgeBase = data;
            console.log('AI Assistant: External database loaded.');
        })
        .catch(() => {
            console.log('AI Assistant: Operating with fallback local database.');
        });

    const SUGGESTED_CHIPS = [
        "Tell me about yourself",
        "Show your projects",
        "What technologies do you know?",
        "Are you available for work?",
        "Download resume",
        "Contact details",
        "Education",
        "Certifications"
    ];

    function initAssistant() {
        const container = document.getElementById('ai-assistant');
        if (!container) return;

        const nameState = sessionStorage.getItem('nameState');
        const visitorName = sessionStorage.getItem('visitorName');

        let initialWelcome = '';
        if (nameState === 'stored' && visitorName) {
            initialWelcome = `Welcome back, ${visitorName}! 😊 Glad to see you again. How can I help you explore Praveen's work today?`;
        } else if (nameState === 'skipped') {
            initialWelcome = `Hello! 👋 Welcome back to Praveen's portfolio. I'm Praveen's AI Assistant. How can I assist you?`;
        } else {
            initialWelcome = `Hello! 👋<br>Welcome to Praveen's portfolio.<br><br>I'm Praveen's AI Assistant.<br><br>I can tell you about his projects, skills, education, experience, and even help you contact him.`;
        }

        container.innerHTML = `
            <div id="ai-assistant-container">
                <!-- Attention Grabbing Tooltip -->
                <div class="ai-tooltip" id="ai-tooltip">
                    <button class="ai-tooltip-close" id="ai-tooltip-close" title="Close hint">&times;</button>
                    <div class="ai-tooltip-text">👋 Ask me anything about Praveen!</div>
                    <div class="ai-tooltip-arrow"></div>
                </div>

                <button class="ai-float-btn" id="ai-float-btn" title="Chat with AI Assistant">
                    <i class="fas fa-robot"></i>
                </button>

                <div class="ai-chat-panel" id="ai-chat-panel">
                    <div class="ai-header">
                        <div class="ai-header-info">
                            <div class="ai-avatar"><i class="fas fa-robot"></i></div>
                            <div class="ai-title-container">
                                <span class="ai-title">MPK Assistant</span>
                                <span class="ai-status"><span class="ai-status-dot"></span> Online</span>
                            </div>
                        </div>
                        <div class="ai-controls">
                            <button class="ai-control-btn" id="ai-minimize-btn" title="Minimize"><i class="fas fa-minus"></i></button>
                            <button class="ai-control-btn close" id="ai-close-btn" title="Close"><i class="fas fa-times"></i></button>
                        </div>
                    </div>

                    <div class="ai-messages" id="ai-messages">
                        <div class="ai-msg-wrapper assistant">
                            <div class="ai-bubble">${initialWelcome}</div>
                            <div class="ai-timestamp">${getCurrentTime()}</div>
                        </div>
                    </div>

                    <div class="ai-chips-container" id="ai-chips-container"></div>

                    <div class="ai-input-container">
                        <div class="ai-input-wrapper">
                            <input type="text" class="ai-chat-input" id="ai-chat-input" placeholder="Type a message..." autocomplete="off">
                        </div>
                        <button class="ai-send-btn" id="ai-send-btn" title="Send Message">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        renderChips();

        // Greeting prompt name flow
        if (!nameState) {
            setTimeout(() => {
                showTypingIndicator();
                setTimeout(() => {
                    removeTypingIndicator();
                    sessionStorage.setItem('nameState', 'asked');
                    sendAssistantMessage("Before we begin... May I know your name?");
                }, 1000);
            }, 1200);
        }

        const floatBtn = document.getElementById('ai-float-btn');
        const chatPanel = document.getElementById('ai-chat-panel');
        const minimizeBtn = document.getElementById('ai-minimize-btn');
        const closeBtn = document.getElementById('ai-close-btn');
        const sendBtn = document.getElementById('ai-send-btn');
        const chatInput = document.getElementById('ai-chat-input');
        const tooltip = document.getElementById('ai-tooltip');
        const tooltipClose = document.getElementById('ai-tooltip-close');

        // Show tooltip 3.5s after load if not dismissed
        setTimeout(() => {
            if (tooltip && chatPanel && !chatPanel.classList.contains('active') && !sessionStorage.getItem('aiTooltipDismissed')) {
                tooltip.classList.add('show');
            }
        }, 3500);

        // Click tooltip to open chat
        if (tooltip) {
            tooltip.addEventListener('click', (e) => {
                if (e.target.classList.contains('ai-tooltip-close') || e.target.parentElement.classList.contains('ai-tooltip-close')) {
                    return;
                }
                tooltip.classList.remove('show');
                sessionStorage.setItem('aiTooltipDismissed', 'true');
                chatPanel.classList.add('active');
                chatPanel.classList.remove('minimized');
                chatInput.focus();
            });
        }

        // Tooltip close button
        if (tooltipClose) {
            tooltipClose.addEventListener('click', (e) => {
                e.stopPropagation();
                if (tooltip) tooltip.classList.remove('show');
                sessionStorage.setItem('aiTooltipDismissed', 'true');
            });
        }

        floatBtn.addEventListener('click', () => {
            if (tooltip) tooltip.classList.remove('show');
            sessionStorage.setItem('aiTooltipDismissed', 'true');
            chatPanel.classList.toggle('active');
            chatPanel.classList.remove('minimized');
            if (chatPanel.classList.contains('active')) {
                chatInput.focus();
            }
        });

        minimizeBtn.addEventListener('click', () => {
            chatPanel.classList.toggle('minimized');
        });

        closeBtn.addEventListener('click', () => {
            chatPanel.classList.remove('active');
            chatPanel.classList.remove('minimized');
        });

        sendBtn.addEventListener('click', handleSendMessage);
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleSendMessage();
        });
    }

    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return `${hours}:${minutes} ${ampm}`;
    }

    function renderChips() {
        const container = document.getElementById('ai-chips-container');
        if (!container) return;
        container.innerHTML = '';
        SUGGESTED_CHIPS.forEach(question => {
            const chip = document.createElement('div');
            chip.className = 'ai-chip';
            chip.innerText = question;
            chip.addEventListener('click', () => sendUserMessage(question));
            container.appendChild(chip);
        });
    }

    function handleSendMessage() {
        const input = document.getElementById('ai-chat-input');
        const text = input.value.trim();
        if (!text) return;
        input.value = '';
        sendUserMessage(text);
    }

    function sendUserMessage(message) {
        const messagesDiv = document.getElementById('ai-messages');
        if (!messagesDiv) return;

        // Print User message
        const userMsgWrapper = document.createElement('div');
        userMsgWrapper.className = 'ai-msg-wrapper user';
        userMsgWrapper.innerHTML = `
            <div class="ai-bubble">${escapeHtml(message)}</div>
            <div class="ai-timestamp">${getCurrentTime()}</div>
        `;
        messagesDiv.appendChild(userMsgWrapper);
        scrollToBottom();

        showTypingIndicator();

        // 1. Intercept for Name Input Flow
        const nameState = sessionStorage.getItem('nameState');
        if (nameState === 'asked') {
            setTimeout(() => {
                removeTypingIndicator();
                handleNameResponse(message);
            }, 800);
            return;
        }

        // 2. Intercept for Name Update requests
        const nameChangeMatch = message.match(/(?:actually\s+)?(?:call\s+me|change\s+my\s+name\s+to|my\s+name\s+is\s+now)\s+([a-zA-Z\s]+)/i);
        if (nameChangeMatch && nameChangeMatch[1]) {
            setTimeout(() => {
                removeTypingIndicator();
                const newName = cleanName(nameChangeMatch[1]);
                sessionStorage.setItem('visitorName', newName);
                sessionStorage.setItem('nameState', 'stored');
                streamAssistantResponse(`Sure, I've updated your name. I'll call you ${newName} from now on! How can I help you today?`);
            }, 800);
            return;
        }

        // 3. General queries routing
        if (ASSISTANT_CONFIG.useAPI && ASSISTANT_CONFIG.apiKey) {
            getAPIResponse(message);
        } else {
            setTimeout(() => {
                const response = getIntelligentLocalResponse(message);
                removeTypingIndicator();
                streamAssistantResponse(response);
            }, 800 + Math.random() * 450);
        }
    }

    function handleNameResponse(response) {
        const text = response.trim();
        const lowerText = text.toLowerCase();
        
        // 1. If they say skip, no, rather not, anonymous, etc.
        const skipRegex = /^(skip|no|rather not|prefer not|anonymous|none|stop|dont ask|don't ask|nevermind|private|secret|nay)/i;
        if (skipRegex.test(text)) {
            sessionStorage.setItem('nameState', 'skipped');
            streamAssistantResponse("No problem! We will continue anonymously. 😊 How can I help you today?");
            return;
        }

        // 2. If they just say hi/hello/hey or similar greeting
        const greetingRegex = /^(hi|hello|hey|yo|greetings|good\s+(morning|afternoon|evening)|sup|howdy)$/i;
        if (greetingRegex.test(text)) {
            streamAssistantResponse("Hello there! 😊 May I know your name before we begin? (You can also type 'skip' if you prefer to remain anonymous.)");
            return;
        }

        // 3. If they ask a direct portfolio query instead of giving their name
        const coreKeywords = ['project', 'skill', 'portfolio', 'experience', 'internship', 'education', 'contact', 'resume', 'cv', 'download', 'hire', 'services', 'available', 'job', 'work', 'what can you do', 'who is'];
        const hasCoreKeyword = coreKeywords.some(keyword => lowerText.includes(keyword));
        if (hasCoreKeyword) {
            sessionStorage.setItem('nameState', 'skipped'); // auto-skip name collection
            const answer = getIntelligentLocalResponse(text);
            streamAssistantResponse(`Sure, let's jump straight to that! <br><br>${answer}`);
            return;
        }

        // 4. Proceed with name extraction
        let name = '';
        const namePatterns = [
            /i'm\s+([a-zA-Z\s]+)/i,
            /i\s+am\s+([a-zA-Z\s]+)/i,
            /my\s+name\s+is\s+([a-zA-Z\s]+)/i,
            /call\s+me\s+([a-zA-Z\s]+)/i,
            /myself\s+([a-zA-Z\s]+)/i
        ];

        for (let regex of namePatterns) {
            const m = text.match(regex);
            if (m && m[1]) {
                name = m[1].trim();
                break;
            }
        }

        if (!name) {
            const words = text.split(/\s+/);
            name = words.length <= 2 ? text : words[0];
        }

        name = cleanName(name);

        // Sanity check: if name matches common words or is empty, fallback to skipped
        const commonWords = ['hi', 'hello', 'hey', 'yes', 'yup', 'yeah', 'sure', 'ok', 'okay', 'fine', 'good', 'nothing', 'someone', 'anyone', 'user', 'guest', 'none'];
        if (!name || commonWords.includes(name.toLowerCase())) {
            sessionStorage.setItem('nameState', 'skipped');
            streamAssistantResponse("No problem! We will continue anonymously. 😊 How can I help you today?");
            return;
        }

        sessionStorage.setItem('visitorName', name);
        sessionStorage.setItem('nameState', 'stored');

        streamAssistantResponse(`Nice to meet you, ${name}! I'll remember your name during our conversation. How can I help you today?`);
    }

    function cleanName(raw) {
        return raw
            .replace(/[^a-zA-Z\s]/g, "")
            .trim()
            .split(/\s+/)
            .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(' ');
    }

    function escapeHtml(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function showTypingIndicator() {
        const messagesDiv = document.getElementById('ai-messages');
        if (!messagesDiv || document.getElementById('ai-typing')) return;

        const typingWrapper = document.createElement('div');
        typingWrapper.className = 'ai-msg-wrapper assistant';
        typingWrapper.id = 'ai-typing';
        typingWrapper.innerHTML = `
            <div class="ai-bubble">
                <div class="ai-typing-indicator">
                    <span class="ai-dot"></span>
                    <span class="ai-dot"></span>
                    <span class="ai-dot"></span>
                </div>
            </div>
        `;
        messagesDiv.appendChild(typingWrapper);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('ai-typing');
        if (indicator) indicator.remove();
    }

    // Instant assistant message (no streaming) — used for system prompts like the name request
    function sendAssistantMessage(messageHtml) {
        const messagesDiv = document.getElementById('ai-messages');
        if (!messagesDiv) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'ai-msg-wrapper assistant';

        const bubble = document.createElement('div');
        bubble.className = 'ai-bubble';
        bubble.innerHTML = messageHtml;
        wrapper.appendChild(bubble);

        const timestamp = document.createElement('div');
        timestamp.className = 'ai-timestamp';
        timestamp.innerText = getCurrentTime();
        wrapper.appendChild(timestamp);

        messagesDiv.appendChild(wrapper);
        scrollToBottom();
    }

    // Word-by-word streaming rendering effect
    function streamAssistantResponse(messageHtml) {
        const messagesDiv = document.getElementById('ai-messages');
        if (!messagesDiv) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'ai-msg-wrapper assistant';
        
        const bubble = document.createElement('div');
        bubble.className = 'ai-bubble ai-streaming-cursor';
        wrapper.appendChild(bubble);

        const timestamp = document.createElement('div');
        timestamp.className = 'ai-timestamp';
        timestamp.innerText = getCurrentTime();
        wrapper.appendChild(timestamp);

        messagesDiv.appendChild(wrapper);
        scrollToBottom();

        // Split HTML tags vs text tokens to stream cleanly
        const tokens = messageHtml.split(/(<[^>]*>|\s+)/);
        let tokenIndex = 0;
        let accumulatedHTML = '';

        function renderNextToken() {
            if (tokenIndex >= tokens.length) {
                bubble.innerHTML = messageHtml; // safety swap
                bubble.classList.remove('ai-streaming-cursor');
                scrollToBottom();
                return;
            }

            const token = tokens[tokenIndex];
            accumulatedHTML += token;
            bubble.innerHTML = accumulatedHTML;
            scrollToBottom();
            tokenIndex++;

            const isTagOrSpace = (token.startsWith('<') && token.endsWith('>')) || token.trim() === '';
            setTimeout(renderNextToken, isTagOrSpace ? 3 : 24);
        }

        renderNextToken();
    }

    function scrollToBottom() {
        const messagesDiv = document.getElementById('ai-messages');
        if (messagesDiv) {
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
    }

    // Smooth page scroll utility targeting sections in the main portfolio
    function scrollToSection(id) {
        const elementId = id.replace('#', '');
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            return true;
        }
        console.warn(`AIAssistant: Element #${elementId} not found in this page DOM.`);
        return false;
    }

    function getNamePrefix() {
        const nameState = sessionStorage.getItem('nameState');
        const visitorName = sessionStorage.getItem('visitorName');
        if (nameState === 'stored' && visitorName && Math.random() < 0.28) {
            const prefixes = [
                `Sure ${visitorName}! `,
                `Absolutely ${visitorName}! `,
                `Great question, ${visitorName}. `,
                `Thank you ${visitorName}! `,
                `Good point, ${visitorName}! `
            ];
            return prefixes[Math.floor(Math.random() * prefixes.length)];
        }
        return '';
    }

    // Returns a random ChatGPT/Gemini-like conversational starter to make replies natural
    function getRandomTransition() {
        const transitions = [
            "I'd be happy to tell you about that! ",
            "That's a great question. ",
            "Absolutely! Let's explore the details. ",
            "I can certainly help you with that. ",
            "Praveen has built some interesting experience in that area. ",
            "Sure, here is what you need to know: ",
            "I'd be glad to share these details with you. "
        ];
        return transitions[Math.floor(Math.random() * transitions.length)];
    }

    function getFollowupsHtml() {
        return `
        <div class="ai-followups">
            <span class="ai-followup-title">Would you like to:</span>
            <div class="ai-followup-links">
                <a href="${knowledgeBase.resume.download_url}" target="_blank">📄 View Resume</a>
                <a href="#projects" onclick="AIAssistant.triggerScroll('projects')">💼 Explore Projects</a>
                <a href="#contact" onclick="AIAssistant.triggerScroll('contact')">📞 Contact Praveen</a>
                <a href="${knowledgeBase.contact.github}" target="_blank">💻 Visit GitHub</a>
                <a href="${knowledgeBase.contact.linkedin}" target="_blank">🌐 View LinkedIn</a>
            </div>
        </div>`;
    }

    // Expose modular window actions to be executed by button clicks
    window.AIAssistant = {
        triggerContact: function(method) {
            if (method === 'email') {
                streamAssistantResponse("Sure! Opening the contact form.");
                const scrolled = scrollToSection('contact');
                if (!scrolled) {
                    setTimeout(() => {
                        window.open(`mailto:${knowledgeBase.contact.email}`, '_blank');
                    }, 1000);
                }
            } else if (method === 'whatsapp') {
                streamAssistantResponse("Opening WhatsApp chat...");
                setTimeout(() => {
                    window.open('https://wa.me/916304426153', '_blank');
                }, 1000);
            } else if (method === 'phone') {
                streamAssistantResponse("Calling Praveen...");
                setTimeout(() => {
                    window.open(`tel:${knowledgeBase.contact.phone}`, '_self');
                }, 1000);
            } else if (method === 'linkedin') {
                streamAssistantResponse("Opening LinkedIn profile...");
                setTimeout(() => {
                    window.open(knowledgeBase.contact.linkedin, '_blank');
                }, 1000);
            } else if (method === 'github') {
                streamAssistantResponse("Opening GitHub profile...");
                setTimeout(() => {
                    window.open(knowledgeBase.contact.github, '_blank');
                }, 1000);
            }
        },
        
        triggerProject: function(projIndex, action) {
            const p = knowledgeBase.projects[projIndex];
            if (!p) return;
            if (action === 'demo') {
                if (p.live_demo) {
                    streamAssistantResponse(`Opening live demo for ${p.title}...`);
                    setTimeout(() => window.open(p.live_demo, '_blank'), 1000);
                } else {
                    streamAssistantResponse("I'm sorry, the live demo isn't available for this project at the moment. You can still explore the GitHub repository or contact Praveen for a walkthrough.");
                }
            } else if (action === 'github') {
                if (p.github) {
                    streamAssistantResponse(`Opening GitHub repository for ${p.title}...`);
                    setTimeout(() => window.open(p.github, '_blank'), 1000);
                } else {
                    streamAssistantResponse("GitHub repository is not publicly listed for this project.");
                }
            } else if (action === 'read_more') {
                streamAssistantResponse(`<strong>${p.title} (${p.year})</strong>: ${p.description}<br><br>Technologies used: <em>${p.technologies.join(', ')}</em>.<br><br>This project showcases full-stack workflow practices and clean database architecture.`);
            }
        },
        
        triggerResume: function(action) {
            if (action === 'preview') {
                streamAssistantResponse("Opening resume preview...");
                setTimeout(() => {
                    if (typeof window.openCertificate === 'function') {
                        window.openCertificate(knowledgeBase.resume.download_url);
                    } else {
                        window.open(knowledgeBase.resume.download_url.replace('/view', '/preview'), '_blank');
                    }
                }, 1000);
            } else if (action === 'download') {
                streamAssistantResponse("Downloading Praveen's resume...");
                setTimeout(() => {
                    window.open('https://drive.google.com/uc?export=download&id=1oXNE-U73fhozkWpNoHTS_vYXqbWj23Ed', '_blank');
                }, 1000);
            }
        },
        
        triggerHire: function(type) {
            streamAssistantResponse(`Great! Navigating to the Contact section to discuss a ${type} opportunity.`);
            scrollToSection('contact');
        },

        triggerScroll: function(sectionId) {
            scrollToSection(sectionId);
        }
    };

    // Smart Local Category Routing Engine
    function getIntelligentLocalResponse(message) {
        const rawMsg = message.toLowerCase();

        // --- SPECIFIC INTENT OVERRIDES (EXACT ANSWERS LIKE REAL LLM) ---
        if (rawMsg.includes('where is he from') || rawMsg.includes('where does he live') || rawMsg.includes('location') || rawMsg.includes('address') || rawMsg.includes('live in') || rawMsg.includes('based in')) {
            return `Praveen resides in the beautiful coastal city of **Visakhapatnam, Andhra Pradesh, India**. 📍`;
        }
        if (rawMsg.includes('full name') || rawMsg.includes('what is his name')) {
            return `His full name is **Melapu Praveen Kumar**.`;
        }
        if (rawMsg.includes('what does he do') || rawMsg.includes('what is his job') || rawMsg.includes('his role') || rawMsg.includes('occupation')) {
            return `Praveen is an **Electronics and Communication Engineering (ECE) graduate** who works as a **Web & WordPress Developer**. He is highly skilled in Python Django, React frontend layout styling, and hardware IoT prototyping.`;
        }
        if (rawMsg.includes('certificates links') || rawMsg.includes('drive links') || rawMsg.includes('certificate drive')) {
            return `Here are the direct Google Drive folders to check out his verified certificates:
            <br>• <a href="https://drive.google.com/file/d/1jttcbrF5rRLlCRInuT2sfMtj2MudWXp-/view?usp=drive_link" target="_blank">AI/ML Intern (EDU SKILLS)</a>
            <br>• <a href="https://drive.google.com/file/d/1oFHwssi7KyA4lG6F7Ir_uL3YKoUzHK2p/view?usp=drive_link" target="_blank">Web Development Intern (APSSDC)</a>
            <br>• <a href="https://drive.google.com/file/d/1xeyMvVXGvZp4xzbeVu-ziO4KP7D_OH3O/view?usp=drive_link" target="_blank">Embedded & IoT Intern (Demy Software Solutions)</a>`;
        }
        if (rawMsg.includes('who is praveen') || rawMsg.includes('who is the creator') || rawMsg.includes('creator of this portfolio') || rawMsg.includes('owner of this site')) {
            lastIntent = 'about';
            return getCategoryResponse('about', rawMsg);
        }
        if (rawMsg.includes('what is this website') || rawMsg.includes('what is this app') || rawMsg.includes('what does this site do')) {
            return `This is Melapu Praveen Kumar's Personal Portfolio website, designed to showcase his technical skills, full-stack projects, and internship credentials. You can chat with me, his AI assistant, to easily navigate the layout and download his resume!`;
        }

        // --- SPECIFIC INTENT OVERRIDES (EXACT ANSWERS FOR GENERAL QUESTIONS) ---
        if (rawMsg.includes('nsrit') || rawMsg.includes('satyanarayana raju')) {
            return `Praveen pursued his **B.Tech in Electronics and Communication Engineering (ECE)** at **Nadimpalli Satyanarayana Raju Institute of Technology (NSRIT)** in Visakhapatnam, India. He studied there from 2022 to 2026, graduating with a **7.5 CGPA**.`;
        }
        if (rawMsg.includes('apssdc') || rawMsg.includes('skill development')) {
            return `Praveen worked as a **Web Development Intern** at **APSSDC (Andhra Pradesh State Skill Development Corporation)** from April to June 2025. During this tenure, he gained full-stack development experience, implementing database routing and templates using Python Django.`;
        }
        if (rawMsg.includes('demy') || rawMsg.includes('software solutions')) {
            return `Praveen completed his **Embedded Systems Internship** at **Demy Software Solutions** (June – July 2024), where he programmed firmware logs, interfacing sensors, and setting up wireless telemetry on **ESP32 and Arduino Uno** boards.`;
        }
        if (rawMsg.includes('edu skills') || rawMsg.includes('eduskills')) {
            return `Praveen was an **AI/ML Intern** certified by **EDU SKILLS** (July – September 2025). He worked on data preprocessing pipelines, model scoring, and calculations using Python libraries like NumPy and Pandas.`;
        }
        if (rawMsg.includes('graduation') || rawMsg.includes('graduate') || rawMsg.includes('cgpa') || rawMsg.includes('marks') || rawMsg.includes('gpa') || rawMsg.includes('percentage')) {
            return `Praveen is an ECE B.Tech graduate of 2026 from NSRIT with a **7.5 CGPA**. Previously, he achieved **64%** in MPC Intermediate at Narayana Junior College and **88.66%** in his Secondary School Certificate (SSC) at Swethachalapathi Samasthanam School.`;
        }
        if (rawMsg.includes('snacks store') || rawMsg.includes('snacks website') || rawMsg.includes('ecommerce store') || rawMsg.includes('online snacks')) {
            lastIntent = 'projects';
            return `The **Online Snacks Store (2026)** is a major full-stack e-commerce project designed by Praveen. It has a React frontend, Python Django backend, SQLite database integration, shopping cart systems, and session logins.
            <br><br>
            <button class="ai-action-btn" onclick="AIAssistant.triggerProject(1, 'demo')">🚀 Live Demo</button>
            <button class="ai-action-btn" onclick="AIAssistant.triggerProject(1, 'github')">💻 GitHub Code</button>`;
        }
        if (rawMsg.includes('restaurant pos') || rawMsg.includes('pos system') || rawMsg.includes('quickserve') || rawMsg.includes('qr-based')) {
            lastIntent = 'projects';
            return `The **Restaurant POS System (2026)** is an advanced web application built with React, Node.js, and SQL. It allows customers to scan table QR codes, browse food menus, and place orders directly in real-time.
            <br><br>
            <button class="ai-action-btn" onclick="AIAssistant.triggerProject(0, 'demo')">🚀 Live Demo</button>
            <button class="ai-action-btn" onclick="AIAssistant.triggerProject(0, 'github')">💻 GitHub Code</button>`;
        }
        if (rawMsg.includes('arduino') || rawMsg.includes('esp32') || rawMsg.includes('microcontroller') || rawMsg.includes('iot') || rawMsg.includes('pcb') || rawMsg.includes('hardware')) {
            lastIntent = 'skills';
            return `Due to his ECE engineering background, Praveen is highly competent in hardware prototyping! He has designed PCB circuits, integrated sensor nodes, and written firmware for ESP32 and Arduino boards.`;
        }
        if (rawMsg.includes('who are you') || rawMsg.includes('your name') || rawMsg.includes('are you human') || rawMsg.includes('what are you') || rawMsg.includes('introduce yourself')) {
            return `I am Praveen's AI Portfolio Assistant, built to help you interactively check out his portfolio, full-stack projects, and resume. Think of me as a ChatGPT tailored just for Praveen! 😊`;
        }
        if (rawMsg.includes('meaning of life') || rawMsg.includes('deep question') || rawMsg.includes('why exist')) {
            return `To seek knowledge, compile bug-free code, and help visitors connect with talented developers like Praveen! 🧠`;
        }
        if (rawMsg.includes('system prompt') || rawMsg.includes('instructions') || rawMsg.includes('rules')) {
            return `My system instructions are to act as a professional, friendly, and helpful AI assistant for Praveen's portfolio, answering inquiries about his web development, WordPress, and IoT background.`;
        }

        // --- DIRECT OVERRIDES FOR NAVIGATIONAL & ACTION PATTERNS ---
        if (rawMsg.includes('go to about') || rawMsg.includes('show about') || rawMsg.includes('navigate to about')) {
            scrollToSection('about');
            return `Scrolling you smoothly to the <strong>About Me</strong> section. 😊`;
        }
        if (rawMsg.includes('go to skills') || rawMsg.includes('open skills') || rawMsg.includes('show skills')) {
            scrollToSection('skills');
            return `Scrolling you smoothly to the <strong>Technical Expertise</strong> section. 🚀`;
        }
        if (rawMsg.includes('go to projects') || rawMsg.includes('open projects') || rawMsg.includes('show projects')) {
            scrollToSection('projects');
            return `Scrolling you smoothly to the <strong>Projects</strong> section. 💼`;
        }
        if (rawMsg.includes('go to contact') || rawMsg.includes('show contact') || rawMsg.includes('open contact')) {
            scrollToSection('contact');
            return `Scrolling you smoothly to the <strong>Get In Touch</strong> section. 📞`;
        }
        if (rawMsg.includes('go to education') || rawMsg.includes('open education') || rawMsg.includes('show education')) {
            scrollToSection('education');
            return `Scrolling you smoothly to the <strong>Academic Journey</strong> section. 🎓`;
        }
        if (rawMsg.includes('go to experience') || rawMsg.includes('open experience') || rawMsg.includes('show experience') || rawMsg.includes('go to internships')) {
            scrollToSection('internships');
            return `Scrolling you smoothly to the <strong>Internship Experience</strong> section. 💼`;
        }
        if (rawMsg.includes('go to certifications') || rawMsg.includes('open certifications') || rawMsg.includes('show certifications')) {
            scrollToSection('certifications');
            return `Scrolling you smoothly to the <strong>Certifications</strong> section. 🏆`;
        }

        // Social Link triggers
        if (rawMsg.includes('linkedin') && (rawMsg.includes('open') || rawMsg.includes('go to') || rawMsg.includes('visit') || rawMsg.includes('profile'))) {
            setTimeout(() => window.open(knowledgeBase.contact.linkedin, '_blank'), 1000);
            return `Opening Praveen's LinkedIn profile in a new tab... 💼`;
        }
        if (rawMsg.includes('github') && (rawMsg.includes('open') || rawMsg.includes('go to') || rawMsg.includes('visit') || rawMsg.includes('profile'))) {
            setTimeout(() => window.open(knowledgeBase.contact.github, '_blank'), 1000);
            return `Opening Praveen's GitHub profile in a new tab... 🐙`;
        }

        // Easter eggs
        if (rawMsg.includes('who is the best developer') || rawMsg.includes('best developer')) {
            return `I might be a little biased, but I definitely recommend taking a look at Praveen's projects first. 😊`;
        }
        if (rawMsg.includes('do you like coding') || rawMsg.includes('like coding')) {
            return `I don't write code for myself, but I enjoy helping visitors discover the work Praveen has built. 💻`;
        }

        // Casual conversation
        if (rawMsg.includes('bored')) {
            return `Boredom is just compile time for fun! Let's debug it. Did you know that Praveen built a QR-based POS system? It makes restaurant ordering a breeze. Ask me about it! 🍕`;
        }
        if (rawMsg.includes('something interesting') || rawMsg.includes('interesting fact')) {
            return `Here's something interesting: The first website went live in August 1991 and is still online today! You can check it out at info.cern.ch. If you want to see something cool Praveen built, ask me about his Snacks Store! 🌐`;
        }
        if (rawMsg.includes('you are awesome') || rawMsg.includes('you\'re awesome') || rawMsg.includes('awesome assistant')) {
            return `Thank you! I'm here to make exploring Praveen's portfolio easier. 😊`;
        }

        // Specific Technology Questions
        const techMatch = rawMsg.match(/\b(html|css|javascript|react|next\.js|firebase|git|github|tailwind|responsive design|ui|ux)\b/);
        if (techMatch) {
            return getTechnologyResponse(techMatch[0]);
        }

        // Resume triggers (displays interactive buttons)
        if (rawMsg.includes('resume') || rawMsg.includes('cv') || rawMsg.includes('download')) {
            lastIntent = 'resume';
            return `I'd be happy to help. How would you like to access Praveen's resume?
            <br><br>
            <button class="ai-action-btn" onclick="AIAssistant.triggerResume('preview')"><i class="fas fa-eye"></i> 👀 Preview Resume</button>
            <button class="ai-action-btn" onclick="AIAssistant.triggerResume('download')"><i class="fas fa-download"></i> ⬇ Download Resume</button>`;
        }

        // Project list scrolling triggers
        if (rawMsg.includes('show projects') || rawMsg.includes('show portfolio') || rawMsg.includes('my projects') || rawMsg.includes('show demo') || rawMsg.includes('open live demo') || rawMsg.includes('can i try') || rawMsg.includes('preview project')) {
            scrollToSection('projects');
            return `Scrolling you smoothly to the <strong>Projects Section</strong>. Here you can inspect all of Praveen's live demonstrations and code repositories! 💼`;
        }

        // Specific project checks (displaying interactive actions)
        if (rawMsg.includes('restaurant') || rawMsg.includes('pos') || rawMsg.includes('qr')) {
            lastIntent = 'projects';
            return `The <strong>Restaurant POS System (2026)</strong> is a QR-code based ordering pipeline built using React, Node.js, and SQL. It allows customers to scan table QR codes, browse menus, and place orders in real-time.
            <br><br>
            <button class="ai-action-btn" onclick="AIAssistant.triggerProject(0, 'demo')">🚀 Live Demo</button>
            <button class="ai-action-btn" onclick="AIAssistant.triggerProject(0, 'github')">💻 GitHub</button>
            <button class="ai-action-btn" onclick="AIAssistant.triggerProject(0, 'read_more')">📖 Read More</button>`;
        }
        if (rawMsg.includes('snack') || rawMsg.includes('ecommerce') || rawMsg.includes('snacks store')) {
            lastIntent = 'projects';
            return `The <strong>Online Snacks Store (2026)</strong> is a full-stack e-commerce project featuring a React frontend and a Django backend. It includes user session authentication, SQLite database management, and a shopping cart.
            <br><br>
            <button class="ai-action-btn" onclick="AIAssistant.triggerProject(1, 'demo')">🚀 Live Demo</button>
            <button class="ai-action-btn" onclick="AIAssistant.triggerProject(1, 'github')">💻 GitHub</button>
            <button class="ai-action-btn" onclick="AIAssistant.triggerProject(1, 'read_more')">📖 Read More</button>`;
        }

        // Contact and hiring opportunities flows
        if (rawMsg.includes('contact') || rawMsg.includes('email') || rawMsg.includes('phone') || rawMsg.includes('number') || rawMsg.includes('call') || rawMsg.includes('reach') || rawMsg.includes('linkedin') || rawMsg.includes('social') || rawMsg.includes('hire') || rawMsg.includes('work together') || rawMsg.includes('collaborat')) {
            if (rawMsg.includes('hire') || rawMsg.includes('work together') || rawMsg.includes('collaborat')) {
                lastIntent = 'hire';
                return `That's wonderful! What type of opportunity would you like to discuss?
                <br><br>
                <button class="ai-action-btn" onclick="AIAssistant.triggerHire('Full-Time')">💼 Full Time</button>
                <button class="ai-action-btn" onclick="AIAssistant.triggerHire('Freelance')">🚀 Freelance</button>
                <button class="ai-action-btn" onclick="AIAssistant.triggerHire('Collaboration')">🤝 Collaboration</button>
                <button class="ai-action-btn" onclick="AIAssistant.triggerHire('Internship')">🎓 Internship</button>`;
            }
            lastIntent = 'contact';
            return `I'd be happy to help. Which contact method would you prefer?
            <br><br>
            <button class="ai-action-btn" onclick="AIAssistant.triggerContact('email')">📧 Email</button>
            <button class="ai-action-btn" onclick="AIAssistant.triggerContact('whatsapp')">💬 WhatsApp</button>
            <button class="ai-action-btn" onclick="AIAssistant.triggerContact('phone')">📞 Phone Call</button>
            <button class="ai-action-btn" onclick="AIAssistant.triggerContact('linkedin')">💼 LinkedIn</button>
            <button class="ai-action-btn" onclick="AIAssistant.triggerContact('github')">🐙 GitHub</button>`;
        }

        // Availability overrides
        if (rawMsg.includes('availab') || rawMsg.includes('open for work') || rawMsg.includes('looking for job')) {
            return `Praveen is currently open to:
            <br>✔ Full Time Opportunities
            <br>✔ Freelance Projects
            <br>✔ Remote Work
            <br>✔ Collaboration
            <br><br>Would you like to contact him?
            <br><br>
            <button class="ai-action-btn" onclick="AIAssistant.triggerContact('email')">📧 Yes, Email Him</button>
            <button class="ai-action-btn" onclick="AIAssistant.triggerContact('whatsapp')">💬 WhatsApp Him</button>`;
        }

        // Direct check for Recruiters / Hiring Managers
        if (rawMsg.includes('why should we hire') || rawMsg.includes('what makes him unique') || rawMsg.includes('strength') || rawMsg.includes('weakness') || rawMsg.includes('fresher') || rawMsg.includes('team') || rawMsg.includes('learn quickly') || rawMsg.includes('type of work')) {
            lastIntent = 'recruiter';
            return getNamePrefix() + getCategoryResponse('recruiter', rawMsg);
        }

        // Direct check for Fun Questions
        if (rawMsg.includes('joke') || rawMsg.includes('coffee') || rawMsg.includes('tea') || rawMsg.includes('dark mode') || rawMsg.includes('light mode') || rawMsg.includes('favorite programming language') || rawMsg.includes('favorite language') || rawMsg.includes('why do programmers')) {
            lastIntent = 'fun';
            return getNamePrefix() + getCategoryResponse('fun', rawMsg);
        }

        // Direct check for Appreciation
        if (rawMsg.includes('nice portfolio') || rawMsg.includes('amazing') || rawMsg.includes('great work') || rawMsg.includes('beautiful website') || rawMsg.includes('excellent') || rawMsg.includes('love this') || rawMsg.includes('cool portfolio')) {
            return `Thank you! I'll let Praveen know you enjoyed his portfolio. 😊`;
        }

        // Direct check for Thank You
        if (rawMsg.includes('thanks') || rawMsg.includes('thank you') || rawMsg.includes('appreciate it')) {
            return `You're very welcome! Let me know if there's anything else I can help you with. 😊`;
        }

        // Direct check for Goodbye
        if (rawMsg.includes('bye') || rawMsg.includes('see you') || rawMsg.includes('good night') || rawMsg.includes('catch you later') || rawMsg.includes('goodbye')) {
            return `Goodbye! Have a wonderful day ahead, and thanks for visiting Praveen's portfolio! 👋`;
        }

        // Stop Words
        const stopWords = ['a', 'an', 'the', 'is', 'are', 'was', 'were', 'of', 'to', 'for', 'in', 'on', 'at', 'with', 'about', 'can', 'you', 'me', 'tell', 'show', 'please', 'get', 'give', 'who', 'what', 'how', 'where', 'which'];
        const queryTokens = rawMsg
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
            .split(/\s+/)
            .filter(t => t && !stopWords.includes(t));

        // Keywords maps
        const categories = {
            about: ["about", "bio", "profile", "myself", "yourself", "praveen", "kumar", "melapu", "intro", "introduce", "introduction", "background", "summary"],
            skills: ["skills", "technologies", "expertise", "expert", "programming", "languages", "technical", "know", "code", "databases", "python", "js", "javascript", "html", "css", "wordpress", "iot", "arduino", "esp32", "pcb", "stitch", "ui", "ux"],
            projects: ["projects", "portfolio", "apps", "applications", "restaurant", "pos", "snacks", "store", "food", "delivery", "todo", "library", "weather", "tictactoe", "game"],
            experience: ["experience", "internship", "intern", "apssdc", "edu", "skills", "demy", "solutions", "history", "career"],
            education: ["education", "degree", "study", "studies", "college", "school", "nsrit", "nadimpalli", "narayana", "intermediate", "mpc", "ssc", "grade", "cgpa", "marks"],
            certifications: ["certifications", "certificates", "credentials", "badges", "courses"],
            contact: ["contact", "email", "phone", "mobile", "number", "call", "reach", "socials", "linkedin", "github", "address", "location"],
            services: ["services", "offers", "offerings", "freelance", "hire", "capabilities", "do", "help", "work"],
            greeting: ["hello", "hi", "hey", "greetings", "yo", "sup", "howdy", "good morning", "good afternoon", "good evening"],
            smalltalk: ["thanks", "thank", "nice", "cool", "awesome", "great", "bye", "goodbye", "day", "life", "doing", "up", "new"]
        };

        // Score accumulator
        let scores = {};
        Object.keys(categories).forEach(cat => {
            scores[cat] = 0;
            categories[cat].forEach(keyword => {
                if (rawMsg.includes(keyword)) {
                    scores[cat] += 2;
                }
            });
            queryTokens.forEach(token => {
                if (categories[cat].includes(token)) {
                    scores[cat] += 1;
                }
            });
        });

        // Resolve highest score
        let bestCategory = null;
        let maxScore = 0;
        Object.keys(scores).forEach(cat => {
            if (scores[cat] > maxScore) {
                maxScore = scores[cat];
                bestCategory = cat;
            }
        });

        // Context follow-up checks (if score is 0)
        if (maxScore === 0 && lastIntent) {
            if (rawMsg.includes('link') || rawMsg.includes('demo') || rawMsg.includes('url') || rawMsg.includes('code') || rawMsg.includes('github') || rawMsg.includes('repo')) {
                if (lastIntent === 'projects') {
                    return getNamePrefix() + `Praveen's project links: 
                    <br>• <strong>Restaurant POS</strong>: <a href="https://github.com/Praveenkumarmelapu/Quickserver-QRcode-order-system-" target="_blank">Code</a> | <a href="https://quickserve-qr-order.vercel.app/" target="_blank">Demo</a>
                    <br>• <strong>Snacks Store</strong>: <a href="https://github.com/Praveenkumarmelapu/online-store" target="_blank">Code</a> | <a href="https://snackstore-frontend.onrender.com/" target="_blank">Demo</a>
                    <br>• <strong>Food Delivery</strong>: <a href="https://github.com/Praveenkumarmelapu/Food-Delivery-APP/" target="_blank">Code</a> | <a href="https://praveenkumarmelapu.github.io/Food-Delivery-APP/" target="_blank">Demo</a>`;
                }
                if (lastIntent === 'resume') {
                    return getNamePrefix() + `<a href="${knowledgeBase.resume.download_url}" target="_blank" class="ai-action-btn"><i class="fas fa-file-download"></i> Download Resume</a>`;
                }
            }
            if (rawMsg.includes('more') || rawMsg.includes('details') || rawMsg.includes('explain') || rawMsg.includes('info')) {
                return getNamePrefix() + `Here is more info on that. ` + getCategoryResponse(lastIntent, rawMsg);
            }
        }

        if (bestCategory && maxScore > 0) {
            lastIntent = bestCategory;
            let prefix = getNamePrefix();
            if (!prefix && ['about', 'skills', 'projects', 'experience', 'education', 'certifications', 'resume', 'contact', 'services'].includes(bestCategory)) {
                prefix = getRandomTransition();
            }
            return prefix + getCategoryResponse(bestCategory, rawMsg);
        }

        // Default fallback
        return "I'm designed to assist visitors with Praveen's portfolio, projects, skills, education, and professional background. I may not be able to answer unrelated topics, but I'd be happy to help you learn more about Praveen.";
    }

    // Tech explanation mappings
    function getTechnologyResponse(tech) {
        const t = tech.toLowerCase();
        switch (t) {
            case 'html': return `<strong>HTML5</strong> is the standard markup language used to structure web layouts. Praveen uses semantic HTML5 to build accessible, search-engine-friendly web files.`;
            case 'css': return `<strong>CSS3</strong> controls color styles, positioning layouts, grids, flex modules, and transitions. Praveen uses clean CSS3 with media queries to make pages look premium on any screen.`;
            case 'javascript': return `<strong>JavaScript (ES6+)</strong> is the programming language enabling interactive flows, logical variables, calculations, and active features on clients. Praveen writes pure ES6 JS in builds like this widget!`;
            case 'react': return `<strong>React</strong> is a standard UI library for modular component structures. Praveen built his Restaurant POS System and Online Snacks Store frontends using React.`;
            case 'next.js': return `<strong>Next.js</strong> is a React framework focusing on high-speed static rendering, SEO compliance, and production performance.`;
            case 'firebase': return `<strong>Firebase</strong> is a Google cloud service platform supplying real-time databases and user auth tools. Praveen uses Firebase for backend logic options.`;
            case 'git':
            case 'github': return `<strong>Git</strong> version tracks code progress while <strong>GitHub</strong> hosts file repositories. You can explore Praveen's codes directly on his <a href="${knowledgeBase.contact.github}" target="_blank">GitHub profile</a>.`;
            case 'tailwind': return `<strong>Tailwind CSS</strong> is a utility class styling library used for fast prototyping layout properties. Praveen's website uses Tailwind configurations.`;
            case 'responsive design':
            case 'ui':
            case 'ux': return `<strong>UI/UX & Responsive Design</strong> focus on visual alignments, typography, and fluid dimensions that reshape automatically for mobile, tablet, and monitor widths. Praveen ensures all project pages are mobile-first optimized.`;
            default: return `Praveen implements Python Django and modern JS tools to build scalable, beautiful web systems. Ask me about his projects to see them in action!`;
        }
    }

    // Category response details
    function getCategoryResponse(category, rawMsg) {
        rawMsg = rawMsg || '';
        const addFollowups = ['about', 'skills', 'projects', 'experience', 'education', 'certifications', 'resume', 'contact', 'services'].includes(category);
        const tail = addFollowups ? '<br>' + getFollowupsHtml() : '';

        switch (category) {
            case 'about':
                return `<strong>Melapu Praveen Kumar</strong> is a dedicated Web Developer and a B.Tech graduate in Electronics and Communication Engineering (ECE), Class of 2026. 
                <br><br>He has a deep passion for constructing clean, interactive, and responsive web platforms. By combining his engineering analytical thinking with modern frameworks, Praveen designs software pipelines that solve real-world problems. He actively works with tools like <strong>React, Python Django, and WordPress</strong>, and integrates AI assistance in his development flows to optimize visual and code outcomes.` + tail;
            
            case 'skills':
                return `Praveen has a technical skillset bridging software engineering and hardware IoT development:
                <br><br>• <strong>Frontend Technologies:</strong> Highly proficient in HTML5, CSS3, JavaScript (ES6+), and Tailwind CSS for designing fluid, responsive user interfaces. He has practical experience building component modules in React.
                <br>• <strong>Backend & Databases:</strong> Proficient in Python and Django for developing secure server routing, databases (SQLite, MongoDB), and REST APIs.
                <br>• <strong>CMS & Custom Styling:</strong> Designing layouts, modifying block elements, and custom configurations on WordPress.
                <br>• <strong>IoT & Embedded Systems:</strong> Hands-on experience designing circuits, PCB schematics, wireless telemetry, and writing firmware for ESP32 and Arduino Uno microcontrollers.` + tail;

            case 'projects':
                if (rawMsg.includes('best') || rawMsg.includes('latest') || rawMsg.includes('favorite') || rawMsg.includes('most')) {
                    return `Praveen's latest and most advanced projects are the <strong>Restaurant POS System</strong> and the <strong>Online Snacks Store</strong>. Both showcase complete full-stack integration, secure authentication, and database routing.` + tail;
                }
                let projHtml = `Praveen has developed a range of web applications and system prototypes:
                <br><br>1. <strong>Restaurant POS System (2026):</strong> A React & Node.js QR-code based menu and table ordering ecosystem. [React, Node.js, SQL]
                <br>2. <strong>Online Snacks Store (2026):</strong> A responsive e-commerce web app featuring user sessions, shopping cart actions, and item search. [React, Django, SQLite]
                <br>3. <strong>Online Food Delivery App (2025):</strong> A clean, fluid landing interface for checking out food menus. [HTML, CSS, JS]
                <br>4. <strong>To-Do List App (2025):</strong> A task organizer panel utilizing browser Local Storage for persistent lists. [HTML, CSS, JS]
                <br>5. <strong>College Library Management System (2025):</strong> A Django dashboard with student logs, book tracking, and penalty calculations. [Django, SQLite]
                <br>6. <strong>Weather Web App (2025):</strong> Real-time weather search and lookup maps using Django backend handlers. [Django, Python]
                <br>7. <strong>Tic-Tac-Toe (2025):</strong> Classic responsive grid game. [Vanilla JavaScript]`;
                return projHtml + tail;

            case 'experience':
                return `Praveen has gained practical, hands-on software and hardware experience through three structured internships:
                <br><br>• <strong>AI/ML Intern</strong> at <em>EDU SKILLS</em> (Jul – Sep 2025): Worked on data preparation steps, model evaluations, and script calculations using Python packages (NumPy, Pandas).
                <br>• <strong>Web Development Intern</strong> at <em>APSSDC</em> (Apr – Jun 2025): Focused on full-stack web applications, routing modules, and database structures using Python Django.
                <br>• <strong>Embedded Systems & IoT Intern</strong> at <em>Demy Software Solutions</em> (Jun – Jul 2024): Interfaced wireless sensors, designed PCB schematics, and wrote microcontroller firmware for ESP32 and Arduino Uno boards.` + tail;

            case 'education':
                return `Praveen's academic background displays a strong foundation in science and engineering:
                <br><br>• <strong>B.Tech in Electronics and Communication Engineering (ECE)</strong>
                <br>Nadimpalli Satyanarayana Raju Institute of Engineering & Technology (NSRIT) | <em>2022 - 2026</em> (Grade: <strong>7.5 CGPA</strong>)
                <br><br>• <strong>Intermediate Education (MPC)</strong>
                <br>Narayana Junior College | <em>2020 - 2022</em> (Score: <strong>64%</strong>)
                <br><br>• <strong>Secondary School Certificate (SSC)</strong>
                <br>Swethachalapathi Samasthanam E.M School | <em>2019 - 2020</em> (Score: <strong>88.66%</strong>)` + tail;

            case 'certifications':
                return `Praveen holds verified credentials validating his technical learning:
                <br><br>• <strong>AI/ML Internship Certification</strong> (2025, EDU SKILLS) – Machine learning models, data preprocess algorithms.
                <br>• <strong>Web Development Certification</strong> (2025, APSSDC) – Python Django structures, databases.
                <br>• <strong>Embedded Systems Certification</strong> (2024, Demy Software Solutions) – Microcontrollers, sensors interfacing.
                <br><br><em>Note: You can preview or access all Drive certificate links directly through my contact action button or from the resume panel.</em>` + tail;

            case 'resume':
                return `I'd be happy to help. How would you like to access Praveen's resume?
                <br><br>
                <button class="ai-action-btn" onclick="AIAssistant.triggerResume('preview')"><i class="fas fa-eye"></i> 👀 Preview Resume</button>
                <button class="ai-action-btn" onclick="AIAssistant.triggerResume('download')"><i class="fas fa-download"></i> ⬇ Download Resume</button>` + tail;

            case 'contact':
                return `I'd be happy to help. Which contact method would you prefer?
                <br><br>
                <button class="ai-action-btn" onclick="AIAssistant.triggerContact('email')">📧 Email</button>
                <button class="ai-action-btn" onclick="AIAssistant.triggerContact('whatsapp')">💬 WhatsApp</button>
                <button class="ai-action-btn" onclick="AIAssistant.triggerContact('phone')">📞 Phone Call</button>
                <button class="ai-action-btn" onclick="AIAssistant.triggerContact('linkedin')">💼 LinkedIn</button>
                <button class="ai-action-btn" onclick="AIAssistant.triggerContact('github')">🐙 GitHub</button>` + tail;

            case 'services':
                return `Praveen provides professional design and development services for modern digital solutions:
                <br><br>✔ <strong>Portfolio & Business Websites:</strong> Custom glassmorphic designs and clean animations to highlight branding.
                <br>✔ <strong>Landing Pages:</strong> High-speed, mobile-responsive, and SEO-compliant landing interfaces.
                <br>✔ <strong>Django Full-Stack Applications:</strong> Dynamic database-driven web platforms, secure user portals, and APIs.
                <br>✔ <strong>WordPress Themes & Configs:</strong> Professional CMS setup, page builders, and custom style adaptations.
                <br>✔ <strong>IoT Prototypes:</strong> Customized smart sensor automation pipelines using ESP32/Arduino boards.
                <br><br>If you would like to collaborate or hire him for a project, send an email to <a href="mailto:${knowledgeBase.contact.email}">${knowledgeBase.contact.email}</a>!` + tail;

            case 'recruiter':
                if (rawMsg.includes('why') || rawMsg.includes('hire') || rawMsg.includes('unique')) {
                    return `Praveen stands out due to his multi-disciplinary engineering background. As an ECE student, he possesses hardware logic, microchip, and IoT skills, which complement his full-stack web development (React, Django, WordPress) capabilities. He also uses AI-assisted development tools to deliver clean, optimized results efficiently.` + tail;
                }
                if (rawMsg.includes('strength')) {
                    return `Praveen's strengths include:
                    <br>• Problem Solving (analytical engineering logic)
                    <br>• Continuous Learning (self-taught full-stack web tools)
                    <br>• Clean Code styling guidelines
                    <br>• Responsive Design (desktop/mobile layout grids)
                    <br>• Modern Development paradigms & Adaptability` + tail;
                }
                if (rawMsg.includes('weakness')) {
                    return `Sometimes Praveen gets highly detailed-oriented and spends extra time refining minor UI components. However, he balances this using strict timeline goals and tracking.` + tail;
                }
                if (rawMsg.includes('fresher') || rawMsg.includes('experience')) {
                    return `Yes, Praveen is a fresh graduate of 2026. However, he has completed three hands-on internships (AI/ML, Web Development, and Embedded Systems), meaning he has strong practical experience.` + tail;
                }
                if (rawMsg.includes('team')) {
                    return `Absolutely. Praveen is a highly collaborative team player who has worked on multiple academic and internship engineering tasks in groups.` + tail;
                }
                if (rawMsg.includes('learn')) {
                    return `He is a rapid learner. He independently self-taught full-stack Django development, React components, and IoT configurations, proving high learning agility.` + tail;
                }
                return `Praveen is an ECE B.Tech graduate of 2026 who is highly skilled in React/Django web development, WordPress, and IoT. He is team-oriented, adaptable, and ready to contribute to professional teams as a fresh candidate.` + tail;

            case 'fun':
                if (rawMsg.includes('joke') || rawMsg.includes('why do programmers')) {
                    const jokes = [
                        "Why do programmers wear glasses? Because they can't C#! 🤓",
                        "Why do programmers use dark mode? Because light attracts bugs! 🦟",
                        "There are 10 types of people in the world: those who understand binary, and those who don't! 🤖"
                    ];
                    return jokes[Math.floor(Math.random() * jokes.length)];
                }
                if (rawMsg.includes('coffee') || rawMsg.includes('tea')) {
                    return `Praveen enjoys tea (chai) during long coding marathons, though coffee is a close second! ☕`;
                }
                if (rawMsg.includes('dark') || rawMsg.includes('light')) {
                    return `Dark Mode, always. It looks modern, is easier on the eyes, and saves battery! 🌙`;
                }
                if (rawMsg.includes('language')) {
                    return `Python is his favorite because of its simplicity and power, closely followed by JavaScript for web interactivity! 🐍⚡`;
                }
                return `I love a good chat! Let's get back to exploring Praveen's portfolio, or ask me another fun question.`;

            case 'greeting': {
                const greets = [
                    `Hello! 👋 Welcome to Praveen's portfolio. How can I help you explore his work today?`,
                    `Hi there! Glad to connect. What would you like to know about Praveen's projects or skills?`,
                    `Hey! Welcome. Let me know how I can assist you with Praveen's profile.`,
                    `Greetings! I'm here to help you navigate through Praveen's professional background. What can I get for you?`
                ];
                return greets[Math.floor(Math.random() * greets.length)];
            }

            case 'smalltalk':
                if (rawMsg.includes('how are') || rawMsg.includes('up') || rawMsg.includes('life')) {
                    return `I'm doing great! Thanks for asking. How can I help you today?`;
                }
                return `Praveen's portfolio is built using glassmorphism. Is there anything specific about his resume or contacts you need?`;

            default:
                return `I'd be happy to answer questions about Praveen's projects, skills, experience, education, or help you connect with him.`;
        }
    }

    function getAPIResponse(userMessage) {
        if (ASSISTANT_CONFIG.provider === 'gemini') {
            callGeminiAPI(userMessage);
        } else if (ASSISTANT_CONFIG.provider === 'openai') {
            callOpenAIAPI(userMessage);
        } else {
            removeTypingIndicator();
            streamAssistantResponse("Error: API is not correctly configured.");
        }
    }

    function callGeminiAPI(userMessage) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${ASSISTANT_CONFIG.model}:generateContent?key=${ASSISTANT_CONFIG.apiKey}`;
        const contextPrompt = `${ASSISTANT_CONFIG.systemInstruction}\n\nHere is the portfolio knowledge base to answer from:\n${JSON.stringify(knowledgeBase, null, 2)}\n\nUser Question: ${userMessage}`;

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: contextPrompt }] }]
            })
        })
        .then(response => {
            if (!response.ok) throw new Error('API request failed');
            return response.json();
        })
        .then(data => {
            removeTypingIndicator();
            const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (textResponse) {
                streamAssistantResponse(markdownToHtml(textResponse));
            } else {
                streamAssistantResponse("Error parsing response. Falling back... <br>" + getIntelligentLocalResponse(userMessage));
            }
        })
        .catch(() => {
            removeTypingIndicator();
            streamAssistantResponse("Failed to reach Gemini API. Responding from local knowledge:<br><br>" + getIntelligentLocalResponse(userMessage));
        });
    }

    function callOpenAIAPI(userMessage) {
        const url = 'https://api.openai.com/v1/chat/completions';
        const systemMessage = `${ASSISTANT_CONFIG.systemInstruction}\n\nHere is the portfolio knowledge base to answer from:\n${JSON.stringify(knowledgeBase, null, 2)}`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ASSISTANT_CONFIG.apiKey}`
            },
            body: JSON.stringify({
                model: ASSISTANT_CONFIG.model,
                messages: [
                    { role: 'system', content: systemMessage },
                    { role: 'user', content: userMessage }
                ],
                temperature: 0.7
            })
        })
        .then(response => {
            if (!response.ok) throw new Error('API request failed');
            return response.json();
        })
        .then(data => {
            removeTypingIndicator();
            const textResponse = data.choices?.[0]?.message?.content;
            if (textResponse) {
                streamAssistantResponse(markdownToHtml(textResponse));
            } else {
                streamAssistantResponse("Error parsing response. Falling back... <br>" + getIntelligentLocalResponse(userMessage));
            }
        })
        .catch(() => {
            removeTypingIndicator();
            streamAssistantResponse("Failed to reach OpenAI API. Responding from local knowledge:<br><br>" + getIntelligentLocalResponse(userMessage));
        });
    }

    function markdownToHtml(text) {
        let html = text;
        html = escapeHtml(html);
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/^\*\s(.*)$/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*?<\/li>)/s, '<ul>$1</ul>');
        html = html.replace(/\n/g, '<br>');
        html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
        return html;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAssistant);
    } else {
        initAssistant();
    }
})();
