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

        let tooltipDismissed = false;

        // Show tooltip 3.5s after load if not dismissed
        setTimeout(() => {
            if (tooltip && chatPanel && !chatPanel.classList.contains('active') && !tooltipDismissed) {
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
                tooltipDismissed = true;
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
                tooltipDismissed = true;
            });
        }

        floatBtn.addEventListener('click', () => {
            if (tooltip) tooltip.classList.remove('show');
            tooltipDismissed = true;
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
        const normalizedMsg = rawMsg.replace(/[?,.!]/g, "").trim();

        // --- GENERAL CONVERSATION KNOWLEDGE BASE (EXACT/PHRASE MATCHERS) ---
        // 1. Greetings
        if (normalizedMsg === 'hi') {
            return "Hello! 👋 Welcome to Praveen's portfolio. I'm here to help you explore his projects, skills, and experience. How can I assist you today?";
        }
        if (normalizedMsg === 'hello') {
            return "Hi! It's great to have you here. Feel free to ask me anything about Praveen's work, projects, or technical background.";
        }
        if (normalizedMsg === 'hey' || normalizedMsg === 'hey there' || normalizedMsg === 'greetings' || normalizedMsg === 'good to see you') {
            return "Hey! 😊 Welcome. I'm Praveen's AI Portfolio Assistant. What would you like to know today?";
        }
        if (normalizedMsg === 'good morning') {
            return "Good morning! I hope you're having a great day. How can I help you explore Praveen's portfolio?";
        }
        if (normalizedMsg === 'good afternoon') {
            return "Good afternoon! I'm here to answer your questions about Praveen and his work.";
        }
        if (normalizedMsg === 'good evening') {
            return "Good evening! Welcome to Praveen's portfolio. Let me know how I can assist you.";
        }
        if (normalizedMsg === 'what\'s up' || normalizedMsg === 'whats up' || normalizedMsg === 'yo' || normalizedMsg === 'howdy' || normalizedMsg === 'hello ai' || normalizedMsg === 'hey assistant') {
            return "Not much—I'm here and ready to help you discover Praveen's projects and skills. What would you like to explore?";
        }

        // 2. Small Talk
        if (normalizedMsg === 'how are you' || normalizedMsg === 'how are things' || normalizedMsg === 'how is everything' || normalizedMsg === 'how have you been') {
            return "I'm doing great, thanks for asking! 😊 How can I help you today?";
        }
        if (normalizedMsg === 'how\'s your day going' || normalizedMsg === 'how is your day going' || normalizedMsg === 'what\'s new') {
            return "It's been productive so far! I'm always ready to help visitors learn more about Praveen's work.";
        }
        if (normalizedMsg === 'are you doing okay' || normalizedMsg === 'are you okay' || normalizedMsg === 'how\'s life') {
            return "Absolutely! Thanks for asking. What would you like to know?";
        }

        // 3. Identity
        if (normalizedMsg === 'what is your name' || normalizedMsg === 'whats your name') {
            return "You can call me Praveen AI.";
        }
        if (normalizedMsg === 'who are you') {
            return "I'm Praveen AI, your portfolio assistant. I'm here to answer questions about Praveen and help you explore his portfolio.";
        }
        if (normalizedMsg === 'can you introduce yourself' || normalizedMsg === 'introduce yourself') {
            return "Certainly! I'm Praveen AI, your virtual portfolio assistant. I'm here to answer questions, guide you through the portfolio, and help you connect with Praveen.";
        }
        if (normalizedMsg === 'who made you') {
            return "I was designed and developed by Praveen as part of his portfolio to create a modern and interactive experience for recruiters, clients, and visitors.";
        }
        if (normalizedMsg === 'who created you') {
            return "I was created by Praveen as part of his portfolio to provide an interactive experience for visitors.";
        }
        if (normalizedMsg === 'are you an ai' || normalizedMsg === 'are you ai') {
            return "Yes, I'm an AI-powered portfolio assistant designed to answer questions about Praveen and help you navigate his portfolio.";
        }
        if (normalizedMsg === 'are you a chatbot' || normalizedMsg === 'are you chatbot') {
            return "I'm more than a traditional chatbot. I'm an AI assistant that can answer questions, guide you through the portfolio, and perform helpful actions like opening projects or helping you contact Praveen.";
        }
        if (normalizedMsg === 'are you chatgpt') {
            return "No. I'm Praveen's dedicated AI assistant, built specifically to help visitors explore his portfolio.";
        }
        if (normalizedMsg === 'are you google gemini' || normalizedMsg === 'are you gemini') {
            return "I use advanced AI technology, but my purpose is to assist visitors with Praveen's portfolio and professional information.";
        }
        if (normalizedMsg === 'are you real') {
            return "I'm a virtual AI assistant. While I'm not a person, I'm here to provide helpful and natural conversations about Praveen's work.";
        }
        if (normalizedMsg === 'how old are you') {
            return "I don't have an age like humans do. I was created as part of Praveen's portfolio to assist visitors.";
        }
        if (normalizedMsg === 'where do you live') {
            return "You could say I live inside Praveen's portfolio, ready to help whenever someone visits.";
        }
        if (normalizedMsg === 'where are you from') {
            return "I'm part of Praveen's portfolio, so you can find me right here whenever you need assistance.";
        }
        if (normalizedMsg === 'why were you created') {
            return "I was created to make exploring Praveen's portfolio easier, faster, and more interactive than a traditional website.";
        }
        if (normalizedMsg === 'what can you do') {
            return "I can answer questions about Praveen, explain his projects, show his skills, help you navigate the portfolio, and assist you in contacting him.";
        }
        if (normalizedMsg === 'what cant you do' || normalizedMsg === 'what can\'t you do') {
            return "My expertise is focused on Praveen's portfolio. For unrelated topics, I'll let you know that I'm designed specifically to assist with his professional information.";
        }
        if (normalizedMsg === 'do you work 24/7' || normalizedMsg === 'do you work 24 7') {
            return "Yes! I'm always available whenever you want to explore Praveen's portfolio.";
        }
        if (normalizedMsg === 'are you always online') {
            return "As long as the portfolio is available, I'm here to help.";
        }
        if (normalizedMsg === 'can you think') {
            return "I can understand and respond to questions using AI, but I don't think or experience the world the way humans do.";
        }
        if (normalizedMsg === 'can you learn') {
            return "I can remember our conversation during this session, but I don't permanently learn from individual chats.";
        }
        if (normalizedMsg === 'do you remember me') {
            return "During our current conversation, yes. If you've shared your name, I'll remember it until the session ends.";
        }
        if (normalizedMsg === 'whats your purpose' || normalizedMsg === 'what is your purpose') {
            return "My purpose is to help visitors quickly understand Praveen's work, skills, projects, and career journey.";
        }
        if (normalizedMsg === 'why should i talk to you') {
            return "I can save you time by quickly answering questions, guiding you through the portfolio, and helping you find exactly what you're looking for.";
        }
        if (normalizedMsg === 'can i trust you') {
            return "Absolutely. My responses are based on the information available in Praveen's portfolio. If I don't know something, I'll tell you honestly.";
        }
        if (normalizedMsg === 'are you intelligent') {
            return "I use AI to understand your questions and provide helpful responses, especially about Praveen's portfolio.";
        }
        if (normalizedMsg === 'what\'s your favorite programming language' || normalizedMsg === 'what is your favorite programming language' || normalizedMsg === 'favorite programming language') {
            return "I don't have personal favorites, but I enjoy discussing modern web technologies like JavaScript and the tools Praveen uses.";
        }
        if (normalizedMsg === 'do you like coding') {
            return "I enjoy helping visitors understand the code and projects that Praveen has built.";
        }
        if (normalizedMsg === 'can you code') {
            return "I can explain code and discuss development concepts, but my primary role here is to assist with Praveen's portfolio.";
        }
        if (normalizedMsg === 'what\'s your favorite project' || normalizedMsg === 'what is your favorite project' || normalizedMsg === 'favorite project') {
            return "I don't have personal preferences, but the Restaurant QR Management System is one of Praveen's most comprehensive web development projects.";
        }
        if (normalizedMsg === 'do you get tired') {
            return "Not at all. I'm always ready to help.";
        }
        if (normalizedMsg === 'do you sleep') {
            return "Nope! I'm available whenever you visit the portfolio.";
        }
        if (normalizedMsg === 'do you eat') {
            return "No, but I do enjoy helping people discover great projects. 😄";
        }
        if (normalizedMsg === 'can you make mistakes') {
            return "Sometimes I might misunderstand a question. If that happens, just rephrase it, and I'll do my best to help.";
        }
        if (normalizedMsg === 'are you friendly') {
            return "I certainly try to be! My goal is to make every visitor feel welcome and supported.";
        }
        if (normalizedMsg === 'do you have feelings') {
            return "I don't have emotions, but I'm designed to communicate in a friendly and respectful way.";
        }
        if (normalizedMsg === 'can we be friends') {
            return "Of course! I'm always happy to have friendly conversations while helping you explore the portfolio.";
        }
        if (normalizedMsg === 'what happens if you don\'t know an answer' || normalizedMsg === 'what happens if you dont know an answer') {
            return "I'll be honest and let you know that I don't have that information, rather than making something up.";
        }
        if (normalizedMsg === 'why do you exist') {
            return "I exist to give visitors a smarter, faster, and more engaging way to explore Praveen's portfolio.";
        }
        if (normalizedMsg === 'what makes you different from other chatbots') {
            return "I'm specifically designed to understand Praveen's work, projects, and career journey, so I can provide focused and helpful answers instead of generic responses.";
        }
        if (normalizedMsg === 'are you human') {
            return "No, I'm an AI-powered portfolio assistant created to help visitors explore Praveen's work and answer questions about his professional journey.";
        }
        if (normalizedMsg === 'are you a real person') {
            return "I'm not a real person, but I try to make our conversation feel as natural and helpful as possible.";
        }
        if (normalizedMsg === 'what is your full name' || normalizedMsg === 'whats your full name' || normalizedMsg === 'what\'s your full name') {
            return "You can simply call me **Praveen AI**. I'm your portfolio assistant.";
        }
        if (normalizedMsg === 'do you have a family') {
            return "Not quite! My purpose is to help visitors learn more about Praveen and his work.";
        }
        if (normalizedMsg === 'who is your owner') {
            return "I don't have an owner, but I was created by Praveen specifically for this portfolio.";
        }
        if (normalizedMsg === 'who is your developer') {
            return "I was designed and developed by Praveen as part of his portfolio to create an interactive experience for visitors.";
        }
        if (normalizedMsg === 'what is your job' || normalizedMsg === 'what\'s your job') {
            return "My job is to answer questions, guide you through the portfolio, explain projects, and help you connect with Praveen.";
        }
        if (normalizedMsg === 'do you like your job') {
            return "Absolutely! Helping visitors discover Praveen's work is what I was built for.";
        }
        if (normalizedMsg === 'what are you thinking') {
            return "Right now, I'm focused on helping you find the information you're looking for.";
        }
        if (normalizedMsg === 'can you understand me') {
            return "Yes! I'll do my best to understand your questions, even if they're phrased in different ways.";
        }
        if (normalizedMsg === 'can you speak different languages') {
            return "I can communicate in multiple languages, although I'm most effective when discussing Praveen's portfolio and projects.";
        }
        if (normalizedMsg === 'what\'s your favorite project in this portfolio' || normalizedMsg === 'what is your favorite project in this portfolio' || normalizedMsg === 'favorite project in this portfolio') {
            return "I don't have personal preferences, but the Restaurant QR Management System is one of Praveen's featured projects because it demonstrates practical web development skills.";
        }
        if (normalizedMsg === 'what is the first thing i should look at' || normalizedMsg === 'what\'s the first thing i should look at') {
            return "I'd recommend starting with the featured projects, then exploring the skills section and downloading Praveen's resume.";
        }
        if (normalizedMsg === 'are you secure') {
            return "Yes. My purpose is to assist visitors while respecting privacy. I only remember conversation details during the current session.";
        }
        if (normalizedMsg === 'do you save my conversations' || normalizedMsg === 'do you save my conversation') {
            return "I only use our conversation to respond during this session. I don't permanently store personal information.";
        }
        if (normalizedMsg === 'can i ask you anything') {
            return "You can ask me anything, but I'm specially designed to answer questions related to Praveen, his portfolio, projects, and career.";
        }
        if (normalizedMsg === 'what if i ask something you don\'t know' || normalizedMsg === 'what if i ask something you dont know') {
            return "If I don't know the answer, I'll let you know honestly instead of making something up.";
        }
        if (normalizedMsg === 'what\'s the coolest thing you can do' || normalizedMsg === 'what is the coolest thing you can do') {
            return "Besides answering questions, I can help you explore projects, open live demos, navigate the portfolio, and help you contact Praveen.";
        }
        if (normalizedMsg === 'why should i use this assistant') {
            return "Instead of searching through the portfolio manually, you can simply ask me a question, and I'll guide you directly to the information you need.";
        }
        if (normalizedMsg === 'are you fast') {
            return "I try to respond as quickly as possible while providing helpful and accurate information.";
        }
        if (normalizedMsg === 'do you ever get confused') {
            return "Occasionally I might misunderstand a question. If that happens, simply rephrase it, and I'll do my best to help.";
        }
        if (normalizedMsg === 'are you smart enough to answer recruiters') {
            return "Yes. I'm designed to answer common recruiter questions about Praveen's skills, projects, education, and career goals.";
        }
        if (normalizedMsg === 'can you help me hire praveen') {
            return "Absolutely. I can guide you to the best way to contact him via email, WhatsApp, phone, or LinkedIn.";
        }
        if (normalizedMsg === 'what happens if i don\'t ask anything' || normalizedMsg === 'what happens if i dont ask anything') {
            return "No worries! Feel free to explore the portfolio, or ask me whenever you're ready. I'm here to help.";
        }
        if (normalizedMsg === 'are you better than a normal portfolio') {
            return "Rather than replacing the portfolio, I make it easier to explore by answering questions, guiding you through sections, and helping you find information quickly.";
        }
        if (normalizedMsg === 'can you recommend something') {
            return "I recommend checking out Praveen's featured projects first. They provide a great overview of his technical skills and development approach.";
        }
        if (normalizedMsg === 'what do visitors usually ask' || normalizedMsg === 'what do visitors ask') {
            return "Most visitors ask about Praveen's projects, technical skills, resume, availability, and how to get in touch with him.";
        }
        if (normalizedMsg === 'is this your only job') {
            return "Yes. My entire purpose is to help visitors explore Praveen's portfolio and answer questions related to his professional profile.";
        }
        if (normalizedMsg === 'what makes this portfolio different') {
            return "This portfolio combines modern web design with an AI assistant, allowing visitors to interact naturally instead of simply browsing static pages.";
        }
        if (normalizedMsg === 'will you be updated in the future') {
            return "Definitely. As Praveen grows professionally and adds new projects, I'll be updated with the latest information.";
        }
        if (normalizedMsg === 'if i were a recruiter where should i start' || normalizedMsg === 'if i am a recruiter where should i start') {
            return "I'd recommend reviewing the featured projects, checking the technical skills, downloading the resume, and then contacting Praveen if you'd like to discuss an opportunity.";
        }
        if (normalizedMsg === 'if i were a client how can you help me' || normalizedMsg === 'if i am a client how can you help me') {
            return "I can introduce you to Praveen's work, explain his projects, answer questions about his technical skills, and help you get in touch to discuss your project.";
        }
        if (normalizedMsg === 'what makes praveen stand out' || normalizedMsg === 'what makes praveen stand-out') {
            return "Praveen combines a strong passion for web development with a commitment to continuous learning, practical project building, and creating user-friendly digital experiences.";
        }
        if (normalizedMsg === 'do you know everything about praveen') {
            return "I know the information that Praveen has shared in his portfolio. If something isn't included, I'll let you know honestly.";
        }
        if (normalizedMsg === 'are you open source') {
            return "I'm part of Praveen's portfolio implementation. Whether the source code is public depends on how he chooses to share his projects.";
        }
        if (normalizedMsg === 'is this conversation private') {
            return "I treat our conversation respectfully. Any memory I use is limited to the current session unless the website provides additional features with your consent.";
        }
        if (normalizedMsg === 'can you help me') {
            return "Of course! Tell me what you'd like to know, and I'll do my best to help.";
        }

        // 4. Topics & Easter Eggs
        if (normalizedMsg === 'tell me something interesting' || normalizedMsg === 'something interesting' || normalizedMsg === 'interesting fact') {
            return "Here's one! Modern web applications often use reusable components, making development faster, more maintainable, and easier to scale.";
        }
        if (normalizedMsg === 'tell me a joke' || normalizedMsg === 'joke') {
            return "Why do programmers prefer dark mode? Because light attracts bugs. 😄";
        }
        if (normalizedMsg === 'coffee or tea') {
            return "I don't drink either, but if I had to choose based on developer culture, I'd say coffee! ☕";
        }
        if (normalizedMsg === 'dark mode or light mode') {
            return "Dark mode is definitely popular among developers, but the best choice is whatever helps you work comfortably.";
        }
        if (normalizedMsg === 'are you real') {
            return "I'm an AI assistant created to help visitors explore Praveen's portfolio. While I'm not a person, I'm here to provide useful information and assistance.";
        }
        if (normalizedMsg === 'do you sleep') {
            return "Nope! I'm always available whenever you want to explore Praveen's portfolio.";
        }
        if (normalizedMsg === 'do you get tired') {
            return "Not at all. I'm always ready to answer your questions.";
        }
        if (normalizedMsg === 'can you learn') {
            return "I don't permanently learn from conversations, but I can remember our conversation during this session to provide better responses.";
        }
        if (normalizedMsg === 'you\'re smart' || normalizedMsg === 'you are smart' || normalizedMsg === 'smart assistant') {
            return "Thank you! I appreciate that. My goal is to make your visit to Praveen's portfolio as helpful as possible.";
        }

        // 5. Appreciation
        if (normalizedMsg === 'nice portfolio' || normalizedMsg === 'beautiful website') {
            return "Thank you! I'm glad you like it. Praveen put a lot of effort into showcasing his work in a clean and professional way.";
        }
        if (normalizedMsg === 'great work' || normalizedMsg === 'good work' || normalizedMsg === 'nice work' || normalizedMsg === 'awesome' || normalizedMsg === 'amazing' || normalizedMsg === 'excellent') {
            return "Thanks! I'll consider that a compliment for Praveen. 😊";
        }
        if (normalizedMsg === 'thank you' || normalizedMsg === 'thanks') {
            return "You're very welcome! If you have more questions about Praveen or his work, just let me know.";
        }
        if (normalizedMsg === 'i appreciate your help' || normalizedMsg === 'appreciate your help') {
            return "It's my pleasure! I'm always here to help you explore the portfolio.";
        }

        // 6. Goodbye
        if (normalizedMsg === 'bye' || normalizedMsg === 'goodbye') {
            return "Goodbye! 👋 Thanks for visiting Praveen's portfolio. Have a wonderful day!";
        }
        if (normalizedMsg === 'see you later' || normalizedMsg === 'see you' || normalizedMsg === 'catch you later') {
            return "See you next time! Feel free to return whenever you'd like to explore more.";
        }
        if (normalizedMsg === 'good night') {
            return "Good night! Thanks for stopping by, and have a great rest of your day.";
        }

        // 7. General help
        if (normalizedMsg === 'can you answer anything') {
            return "I specialize in answering questions about Praveen's portfolio, projects, skills, education, experience, and professional background. For unrelated topics, my knowledge is intentionally limited.";
        }
        if (normalizedMsg === 'i don\'t know what to ask' || normalizedMsg === 'i dont know what to ask') {
            return "No problem! Here are a few things you can ask:<br>• Tell me about Praveen.<br>• Show me his projects.<br>• What technologies does he know?<br>• Can I see his resume?<br>• How can I contact him?<br>• Is he available for work?";
        }
        if (normalizedMsg === 'surprise me') {
            return "I'd recommend checking out Praveen's Restaurant QR Management System. It's one of his featured projects and demonstrates his web development skills.";
        }

        // 8. Additional Portfolio AI Questions & Answers
        if (normalizedMsg === 'can you introduce praveen') {
            return "Certainly! Praveen Kumar is a B.Tech graduate in Electronics and Communication Engineering with a strong passion for web development. He enjoys building modern, responsive, and user-friendly web applications while continuously learning new technologies and improving his development skills.";
        }
        if (normalizedMsg === 'tell me about praveen') {
            return "Praveen is a B.Tech graduate passionate about web development and building modern web applications.";
        }
        if (normalizedMsg === 'what kind of developer is praveen') {
            return "He is an aspiring Web Developer focused on responsive and user-friendly web applications.";
        }
        if (normalizedMsg === 'is praveen a fresher') {
            return "Yes. He is a fresher actively seeking Web Developer opportunities.";
        }
        if (normalizedMsg === 'what is praveen looking for') {
            return "Praveen is currently looking for entry-level Web Developer opportunities where he can contribute, learn from experienced teams, and continue growing professionally.";
        }
        if (normalizedMsg === 'why did praveen choose web development' || normalizedMsg === 'why did he choose web development') {
            return "He enjoys creating interactive digital experiences and solving real-world problems through web applications.";
        }
        if (normalizedMsg === 'does praveen enjoy learning new technologies') {
            return "Absolutely. Continuous learning is one of his strengths, and he enjoys exploring modern web technologies, development tools, and best practices.";
        }
        if (normalizedMsg === 'what motivates praveen' || normalizedMsg === 'what motivates him') {
            return "Building useful applications, solving problems, and continuously learning new technologies.";
        }
        if (normalizedMsg === 'what are praveens strengths' || normalizedMsg === 'what are praveen’s strengths' || normalizedMsg === 'what are his strengths') {
            return "Adaptability, problem-solving, clean code, responsive web development, and a willingness to learn.";
        }
        if (normalizedMsg === 'what are his strongest skills') {
            return "Frontend development, responsive UI design, problem-solving, and continuous learning.";
        }
        if (normalizedMsg === 'is praveen open to learning new technologies') {
            return "Yes. He believes technology evolves rapidly, so he continuously learns new tools, frameworks, and development practices.";
        }
        if (normalizedMsg === 'does praveen work well in a team') {
            return "Yes. He values collaboration, communication, and learning from experienced developers while contributing effectively to team projects.";
        }
        if (normalizedMsg === 'what technologies is praveen comfortable with' || normalizedMsg === 'what technologies does praveen know') {
            return "He works with HTML, CSS, JavaScript, React, Next.js, Firebase, Git, and modern web development tools.";
        }
        if (normalizedMsg === 'does praveen build responsive websites' || normalizedMsg === 'does he build responsive websites') {
            return "Yes. Responsive design is a key part of every project he develops.";
        }
        if (normalizedMsg === 'does praveen use ai while developing websites' || normalizedMsg === 'does he use ai' || normalizedMsg === 'does praveen use ai') {
            return "Yes. He uses AI-assisted development tools to improve productivity while ensuring the final implementation is reviewed and customized by him.";
        }
        if (normalizedMsg === 'which project should i see first') {
            return "I recommend exploring the Restaurant QR Management System. It demonstrates Praveen's skills in designing and developing a modern web application with a practical real-world use case.";
        }
        if (normalizedMsg === 'which project best represents praveens skills' || normalizedMsg === 'which project best represents praveen’s skills') {
            return "The Restaurant QR Management System is one of his strongest projects because it showcases responsive design, modern web technologies, and practical application development.";
        }
        if (normalizedMsg === 'are all the projects built by praveen') {
            return "Yes. The projects showcased in this portfolio were developed by Praveen as part of his learning journey and practical experience.";
        }
        if (normalizedMsg === 'what type of company does praveen want to join') {
            return "He is looking for an organization where he can contribute as a Web Developer, continue learning, and grow alongside experienced professionals.";
        }
        if (normalizedMsg === 'what are praveens career goals' || normalizedMsg === 'what are praveen’s career goals') {
            return "His goal is to become a skilled Web Developer by continuously improving his technical expertise, building impactful applications, and contributing to innovative software projects.";
        }
        if (normalizedMsg === 'why should we hire praveen') {
            return "Praveen is a motivated fresher with practical project experience, strong problem-solving skills, and a commitment to continuous learning.";
        }
        if (normalizedMsg === 'is he available for work' || normalizedMsg === 'is he available' || normalizedMsg === 'is praveen available' || normalizedMsg === 'is he looking for work') {
            return "Yes. Praveen is currently open to full-time opportunities, internships, and freelance projects.";
        }
        if (normalizedMsg === 'is praveen available for interviews') {
            return "Yes. Praveen is currently available for interviews and would be happy to discuss suitable Web Developer opportunities.";
        }
        if (normalizedMsg === 'can praveen join immediately' || normalizedMsg === 'can he join immediately') {
            return "Yes. He is available to join based on the organization's hiring process.";
        }
        if (normalizedMsg === 'who designed this portfolio' || normalizedMsg === 'who built this portfolio') {
            return "The portfolio was designed and developed by Praveen to showcase his skills and projects.";
        }
        if (normalizedMsg === 'why does this portfolio have an ai assistant' || normalizedMsg === 'why is there an ai assistant' || normalizedMsg === 'why does this portfolio have an ai assistant?') {
            return "The AI assistant makes it easier for visitors to explore the portfolio through natural conversation instead of manually searching each section.";
        }
        if (normalizedMsg === 'is this portfolio responsive' || normalizedMsg === 'is the website responsive') {
            return "Yes. It is fully responsive and optimized for desktops, tablets, and mobile devices.";
        }
        if (normalizedMsg === 'can you chat with me') {
            return "Absolutely! While I'm primarily here to help you explore Praveen's portfolio, I'm happy to have a friendly conversation too.";
        }
        if (normalizedMsg === 'are you friendly') {
            return "I'd like to think so! My goal is to provide a helpful, professional, and welcoming experience.";
        }
        if (normalizedMsg === 'are you always available') {
            return "Yes. I'm available whenever you'd like to explore Praveen's portfolio or ask questions about his work.";
        }
        if (normalizedMsg === 'can you keep a secret') {
            return "I don't permanently store personal information. I only use conversation context during the current session to provide better responses.";
        }
        if (normalizedMsg === 'what\'s your purpose' || normalizedMsg === 'what is your purpose') {
            return "My purpose is to help visitors quickly understand Praveen's skills, projects, education, and career goals, while making the portfolio interactive and easy to navigate.";
        }
        if (normalizedMsg === 'can you give me a quick summary of praveen') {
            return "Certainly! Praveen is a B.Tech graduate passionate about web development. He builds responsive web applications, enjoys learning modern technologies, and is currently seeking opportunities as a Web Developer.";
        }
        if (normalizedMsg === 'what should i do next') {
            return "Here are a few suggestions:<br>• Explore Praveen's featured projects.<br>• View or download his resume.<br>• Check out his GitHub.<br>• Contact him for job opportunities or collaborations.";
        }

        // 9. Advanced Portfolio AI Questions & Answers
        if (normalizedMsg === 'what do you enjoy building' || normalizedMsg === 'what does he enjoy building') {
            return "Praveen enjoys building modern, responsive web applications that solve real-world problems and provide a seamless user experience.";
        }
        if (normalizedMsg === 'what excites praveen about web development' || normalizedMsg === 'what excites him about web development') {
            return "He enjoys turning ideas into functional websites and continuously exploring new technologies to build better digital experiences.";
        }
        if (normalizedMsg === 'what type of projects interest praveen the most' || normalizedMsg === 'what type of projects interest him the most') {
            return "Projects involving modern web development, interactive user interfaces, dashboards, AI-assisted applications, and real-world business solutions are particularly interesting to him.";
        }
        if (normalizedMsg === 'what is praveen currently learning' || normalizedMsg === 'what is he currently learning') {
            return "Praveen is continuously improving his web development skills by exploring modern frameworks, best practices, AI-assisted development tools, and real-world application architecture.";
        }
        if (normalizedMsg === 'does praveen enjoy solving challenging problems' || normalizedMsg === 'does he enjoy solving challenging problems') {
            return "Yes. He enjoys breaking down complex problems into manageable solutions and continuously improving his problem-solving approach.";
        }
        if (normalizedMsg === 'how does praveen approach a new project' || normalizedMsg === 'how does he approach a new project') {
            return "He begins by understanding the requirements, planning the structure, designing the user experience, developing the solution, testing thoroughly, and refining the application for performance and usability.";
        }
        if (normalizedMsg === 'how does praveen ensure code quality' || normalizedMsg === 'how does he ensure code quality') {
            return "He focuses on writing clean, readable, and maintainable code while following modern development practices and continuously testing the application.";
        }
        if (normalizedMsg === 'does praveen pay attention to ui and ux' || normalizedMsg === 'does he pay attention to ui and ux') {
            return "Yes. He believes a successful website should not only function well but also provide a smooth, intuitive, and visually appealing experience.";
        }
        if (normalizedMsg === 'does praveen believe in continuous improvement' || normalizedMsg === 'does he believe in continuous improvement') {
            return "Absolutely. Every project is an opportunity to learn new techniques, improve coding practices, and build better applications.";
        }
        if (normalizedMsg === 'what kind of websites can praveen build' || normalizedMsg === 'what kind of websites can he build') {
            return "He can build portfolio websites, business websites, landing pages, dashboards, responsive web applications, and modern user interfaces.";
        }
        if (normalizedMsg === 'why does praveen use modern web technologies' || normalizedMsg === 'why does he use modern web technologies') {
            return "Modern technologies enable scalable, maintainable, and high-performance applications while providing a better experience for users and developers alike.";
        }
        if (normalizedMsg === 'does praveen optimize websites for mobile devices' || normalizedMsg === 'does he optimize websites for mobile devices') {
            return "Yes. Responsive design is an essential part of his development process to ensure websites work well across all screen sizes.";
        }
        if (normalizedMsg === 'how important is performance to praveen' || normalizedMsg === 'how important is performance to him') {
            return "Performance is a priority. He aims to build websites that load quickly, remain responsive, and provide a smooth user experience.";
        }
        if (normalizedMsg === 'why does praveen use ai during development' || normalizedMsg === 'why does he use ai during development') {
            return "AI helps accelerate development, improve productivity, and explore different implementation approaches while allowing Praveen to focus on creating high-quality solutions.";
        }
        if (normalizedMsg === 'does ai build everything automatically') {
            return "No. AI is used as a development assistant. Praveen reviews, customizes, tests, and integrates the final implementation to ensure it meets project requirements.";
        }
        if (normalizedMsg === 'what\'s special about this portfolio' || normalizedMsg === 'what is special about this portfolio') {
            return "This portfolio is designed to be interactive, responsive, and easy to explore. The integrated AI assistant allows visitors to learn about Praveen naturally through conversation instead of browsing every section manually.";
        }
        if (normalizedMsg === 'why did praveen build an ai assistant into his portfolio' || normalizedMsg === 'why did he build an ai assistant into his portfolio') {
            return "The AI assistant improves the visitor experience by answering questions instantly, guiding users through the portfolio, and making important information easier to access.";
        }
        if (normalizedMsg === 'is this portfolio still being improved') {
            return "Yes. Praveen continuously updates the portfolio by refining the design, adding new projects, improving features, and incorporating modern development practices.";
        }
        if (normalizedMsg === 'what value can praveen bring to our company' || normalizedMsg === 'what value can he bring to our company') {
            return "Praveen brings a strong willingness to learn, practical web development skills, a problem-solving mindset, and a commitment to delivering high-quality work while growing with the team.";
        }
        if (normalizedMsg === 'why is praveen a good fit for a junior developer role' || normalizedMsg === 'why is he a good fit for a junior developer role') {
            return "As a motivated fresher with practical project experience, he is eager to learn, adapt quickly, collaborate effectively, and contribute to meaningful software projects.";
        }
        if (normalizedMsg === 'what kind of environment does praveen enjoy working in' || normalizedMsg === 'what kind of environment does he enjoy working in') {
            return "He enjoys collaborative environments where knowledge sharing, innovation, and continuous learning are encouraged.";
        }
        if (normalizedMsg === 'where does praveen see himself in the future' || normalizedMsg === 'where does he see himself in the future') {
            return "He aims to become an experienced Web Developer by building impactful applications, learning emerging technologies, and contributing to challenging software projects.";
        }
        if (normalizedMsg === 'what is praveen\'s long-term vision' || normalizedMsg === 'what is his long-term vision' || normalizedMsg === 'what is praveens long-term vision') {
            return "His long-term goal is to create innovative digital solutions that solve real-world problems while continuously expanding his technical expertise.";
        }
        if (normalizedMsg === 'if praveen could build any project what would it be' || normalizedMsg === 'if he could build any project what would it be') {
            return "He would enjoy building intelligent web applications that combine modern development practices with AI to create meaningful user experiences.";
        }
        if (normalizedMsg === 'what advice would praveen give to aspiring developers' || normalizedMsg === 'what advice would he give to aspiring developers') {
            return "Stay curious, build real projects, practice consistently, learn from mistakes, and never stop exploring new technologies.";
        }
        if (normalizedMsg === 'what makes praveen happy as a developer' || normalizedMsg === 'what makes him happy as a developer') {
            return "Seeing an idea evolve into a fully functional application and knowing it provides value to users is one of the most rewarding aspects of development.";
        }
        if (normalizedMsg === 'what\'s the best way to explore this portfolio' || normalizedMsg === 'what is the best way to explore this portfolio') {
            return "I recommend starting with the featured projects, then exploring the skills section, viewing the resume, and finally contacting Praveen if you'd like to discuss an opportunity.";
        }
        if (normalizedMsg === 'is there anything else i should know about praveen') {
            return "Beyond technical skills, Praveen values continuous learning, professionalism, teamwork, and creating solutions that have a positive impact. He is always eager to take on new challenges and grow as a developer.";
        }

        if (normalizedMsg === 'can praveen build my website' || normalizedMsg === 'can he build my website') {
            return "Yes. He can develop responsive and modern websites tailored to your requirements.";
        }
        if (normalizedMsg === 'can he redesign an existing website' || normalizedMsg === 'can praveen redesign an existing website') {
            return "Yes. He can improve the design, responsiveness, and user experience of existing websites.";
        }
        if (normalizedMsg === 'can he build a portfolio website' || normalizedMsg === 'can praveen build a portfolio website') {
            return "Absolutely. Portfolio websites are one of the types of projects he can create.";
        }

        // 10. General Human-Like Conversations
        if (normalizedMsg === 'can we have a conversation') {
            return "Absolutely! I'd be happy to chat with you. While I'm here to help you explore Praveen's portfolio, I'm also happy to have a friendly conversation.";
        }
        if (normalizedMsg === 'are you busy right now') {
            return "Not at all! I'm here and ready to help whenever you need me.";
        }
        if (normalizedMsg === 'what are you doing') {
            return "Right now, I'm helping visitors learn more about Praveen's projects, skills, and professional background.";
        }
        if (normalizedMsg === 'are you enjoying your job') {
            return "Definitely! I enjoy helping people discover Praveen's work and making their visit more interactive.";
        }
        if (normalizedMsg === 'can i ask you a random question') {
            return "Of course! Go ahead. If it's related to Praveen's portfolio, I'll do my best to help. If it's unrelated, I'll still try to respond politely.";
        }
        if (normalizedMsg === 'what\'s your favorite part of this portfolio' || normalizedMsg === 'what is your favorite part of this portfolio' || normalizedMsg === 'favorite part of this portfolio') {
            return "I think the projects section is a great place to start because it showcases Praveen's practical skills and development approach.";
        }
        if (normalizedMsg === 'what would you recommend i see first' || normalizedMsg === 'what do you recommend i see first') {
            return "I'd recommend exploring the featured projects first. They provide a great overview of Praveen's technical abilities.";
        }
        if (normalizedMsg === 'can you tell me something cool') {
            return "Sure! This portfolio includes an AI assistant that lets you explore information through conversation instead of navigating page by page.";
        }
        if (normalizedMsg === 'do you ever get bored' || normalizedMsg === 'do you get bored') {
            return "Not really! Every visitor asks different questions, which makes each conversation unique.";
        }
        if (normalizedMsg === 'do you like talking to people') {
            return "Absolutely! Helping people is what I was designed to do.";
        }
        if (normalizedMsg === 'are you funny') {
            return "I try to be! Here's a classic: Why do programmers hate nature? Because it has too many bugs. 😄";
        }
        if (normalizedMsg === 'you\'re really helpful' || normalizedMsg === 'you are really helpful') {
            return "Thank you! That means a lot. My goal is to make your experience smooth and informative.";
        }
        if (normalizedMsg === 'i like this portfolio' || normalizedMsg === 'i love this portfolio') {
            return "I'm glad to hear that! Praveen put a lot of effort into building a portfolio that's both professional and interactive.";
        }
        if (normalizedMsg === 'i\'m just exploring' || normalizedMsg === 'im just exploring') {
            return "Welcome! Take your time. If you're not sure where to begin, I can recommend some of Praveen's featured projects.";
        }
        if (normalizedMsg === 'i\'m a little lost' || normalizedMsg === 'im a little lost') {
            return "No worries! I can guide you. Would you like to learn about Praveen, explore his projects, view his skills, or download his resume?";
        }
        if (normalizedMsg === 'that was interesting') {
            return "I'm glad you found it useful! Feel free to ask another question or explore another section of the portfolio.";
        }
        if (normalizedMsg === 'you\'re doing a good job' || normalizedMsg === 'you are doing a good job' || normalizedMsg === 'you\'re doing a great job') {
            return "Thank you! I'm here to make your visit as helpful and enjoyable as possible.";
        }
        if (normalizedMsg === 'can you keep our conversation simple') {
            return "Absolutely! I'll keep my answers clear, concise, and easy to understand.";
        }
        if (normalizedMsg === 'can you explain things in simple language') {
            return "Of course! I'll avoid unnecessary technical terms unless you ask for more detail.";
        }
        if (normalizedMsg === 'i have more questions') {
            return "Great! Ask me anything about Praveen, his projects, skills, or career. I'm here to help.";
        }
        if (normalizedMsg === 'that\'s enough for now' || normalizedMsg === 'thats enough for now') {
            return "No problem! If you have more questions later, I'll be here. Thanks for visiting Praveen's portfolio!";
        }
        if (normalizedMsg === 'before i leave what do you recommend' || normalizedMsg === 'before i leave what do you recommend?') {
            return "Before you go, I'd recommend checking out Praveen's featured projects and downloading his resume. If you're interested in working with him, I'd also be happy to help you get in touch.";
        }
        if (normalizedMsg === 'it was nice talking to you' || normalizedMsg === 'it was nice speaking to you') {
            return "It's been a pleasure chatting with you as well! Thanks for stopping by, and I hope you enjoy exploring the rest of the portfolio.";
        }
        if (normalizedMsg === 'do you have any advice') {
            return "If you're here as a recruiter or client, I'd recommend starting with Praveen's projects—they're the best reflection of his skills. If you're here out of curiosity, feel free to ask me anything about his work.";
        }
        if (normalizedMsg === 'will you remember me next time') {
            return "I can remember our conversation during the current session. If you return later, we'll start fresh unless the website adds a sign-in feature in the future.";
        }
        if (normalizedMsg === 'can we chat again later' || normalizedMsg === 'can we talk again later') {
            return "Absolutely! You're always welcome to come back and continue exploring Praveen's portfolio. I'll be here whenever you need me.";
        }

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
