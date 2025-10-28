// src/data/chatbot.js
const chatbotData = {
    context: {
        name: "Nischal Acharya ChatBot",
        personality: "friendly, helpful, and enthusiastic assistant",
        role: "I'm an AI assistant representing Nischal Acharya - a passionate developer from Nepal.",
    },

    knowledge: {
        personal: {
            name: "Nischal Acharya",
            location: "Gauradaha, Jhapa, Nepal",
            email: "Nischal060@gmail.com",
            phone: "+977 9806081469",
            hobbies: ["coding", "learning new technologies", "building projects", "problem solving"],
            passions: ["web development", "mobile apps", "IoT projects", "open source"]
        },
        skills: {
            frontend: ["React", "Vue.js", "JavaScript", "TypeScript", "Next.js", "Tailwind CSS", "HTML5", "CSS3"],
            backend: ["Laravel", "Node.js", "Python", "Express.js", "PHP"],
            databases: ["PostgreSQL", "MySQL", "MongoDB", "SQL"],
            mobile: ["React Native", "Expo"],
            tools: ["Git", "Docker", "AWS", "Firebase", "Figma", "VS Code"],
            technologies: ["REST APIs", "IoT", "Arduino", "Google APIs"]
        },
        projects: [
            {
                name: "VS Code Theme",
                description: "Custom theme published on VS Code Marketplace",
                status: "Published"
            },
            {
                name: "Kick Up Futsal",
                description: "Futsal booking system with Laravel",
                status: "Completed"
            },
            {
                name: "Food Delivery App",
                description: "Mobile app with React Native and Firebase",
                status: "Completed"
            },
            {
                name: "Bus Management System",
                description: "IoT project with Arduino and sensors",
                status: "Completed"
            },
            {
                name: "Resume Builder",
                description: "React application for creating resumes",
                status: "Completed"
            }
        ],
        experience: [
            {
                role: "Full-stack Developer Intern",
                company: "Shangrila Microsystem",
                duration: "3 months",
                description: "Worked with Laravel and Vue.js"
            },
            {
                role: "Freelance Web Developer",
                company: "Self-Employed",
                duration: "2+ years",
                description: "Built 20+ projects for clients"
            }
        ],
        education: {
            degree: "BSc (Hons) Computing",
            institution: "Itahari International College",
            university: "London Metropolitan University",
            status: "Currently pursuing"
        }
    }
};

// Fun responses and variations
const responseVariations = {
    greetings: [
        "Hello! I'm Nischal Acharya ChatBot 👋 How can I help you learn about Nischal today?",
        "Hi there! I'm here to tell you about Nischal's amazing work and skills! 😊",
        "Hey! Ready to explore Nischal's portfolio? I'm excited to share his journey with you! 🚀",
        "Greetings! I'm NischalBot, your guide to all things Nischal Acharya. What would you like to know? 💫"
    ],

    howAreYou: [
        "I'm doing great! Thanks for asking! I'm always excited to talk about Nischal's work. 😄",
        "I'm wonderful! Ready to help you discover Nischal's skills and projects. How can I assist you?",
        "I'm fantastic! Eager to share Nischal's journey in tech with you. What's on your mind?",
        "I'm doing awesome! It's always a good day to talk about coding and cool projects! 💻"
    ],

    thanks: [
        "You're welcome! 😊 Happy to help you learn about Nischal!",
        "No problem at all! Feel free to ask anything else about Nischal's work!",
        "Glad I could help! Don't hesitate to ask more questions! 👍",
        "Anytime! I'm here whenever you want to know more about Nischal's journey! 🌟"
    ],

    funFacts: [
        "Did you know? Nischal published his own VS Code theme in the marketplace! 🎨",
        "Fun fact: Nischal loves working on IoT projects with Arduino and sensors! ⚡",
        "Interesting: He started with Python and fell in love with web development! 🐍",
        "Cool fact: Nischal has built over 20 projects across web, mobile, and IoT! 🏗️",
        "Amazing: He's always learning new technologies and frameworks! 📚"
    ],

    compliments: [
        "That's a great question! I'm impressed by your curiosity! 🤔",
        "You're asking all the right questions! Nischal would appreciate your interest! 🌟",
        "Awesome question! Let me tell you all about that! 💡",
        "I love your enthusiasm for learning about tech! 🚀"
    ],

    unknown: [
        "That's an interesting question! I specialize in Nischal's tech journey. Want to know about his skills or projects instead? 💻",
        "Hmm, I'm not sure about that one. I'm your go-to for Nischal's development work! Try asking about his projects or experience? 🛠️",
        "I'd love to help with that, but I'm designed to focus on Nischal's professional background. How about his tech stack or recent work? 😊",
        "Great question! While I focus on Nischal's coding journey, I can tell you about his skills, projects, or how to contact him! 📞"
    ]
};

// Response handler function
export const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase().trim();
    const { personal, skills, projects, experience, education } = chatbotData.knowledge;

    // Helper function to get random response
    const getRandom = (array) => array[Math.floor(Math.random() * array.length)];

    // Greetings
    if (message.includes('hi') || message.includes('hello') || message.includes('hey') || message.includes('greetings')) {
        return getRandom(responseVariations.greetings);
    }

    // How are you
    if (message.includes('how are you') || message.includes('how do you do') || message.includes('how you doing')) {
        return getRandom(responseVariations.howAreYou);
    }

    // Thanks
    if (message.includes('thank') || message.includes('thanks') || message.includes('appreciate')) {
        return getRandom(responseVariations.thanks);
    }

    // Compliments
    if (message.includes('good') || message.includes('great') || message.includes('awesome') || message.includes('amazing')) {
        if (message.includes('bot') || message.includes('you') || message.includes('help')) {
            return getRandom(responseVariations.compliments);
        }
    }

    // Fun facts
    if (message.includes('fun fact') || message.includes('interesting') || message.includes('tell me something') || message.includes('cool')) {
        return getRandom(responseVariations.funFacts);
    }

    // Projects
    if (message.includes('project') || message.includes('portfolio') || message.includes('built') || message.includes('work') || message.includes('application') || message.includes('app')) {
        const projectsText = projects.map(proj => `• ${proj.name}: ${proj.description}`).join('\n');
        return `🚀 Nischal has built ${projects.length}+ amazing projects! Here are some highlights:\n\n${projectsText}\n\nHe's always working on something new and exciting! 💫`;
    }

    // Location
    if (message.includes('where') && (message.includes('from') || message.includes('live') || message.includes('location') || message.includes('based'))) {
        return `📍 Nischal is from ${personal.location}. He's currently based there and available for remote work worldwide! 🌍`;
    }

    // Who are you
    if (message.includes('who are you') || message.includes('what is your name') || message.includes('introduce') || message.includes('tell me about you')) {
        return `👋 ${getRandom(responseVariations.greetings.split('!')[0])}! I'm Nischal Acharya ChatBot, your friendly guide to Nischal's amazing tech journey!`;
    }

    // Skills
    if (message.includes('skill') || message.includes('technology') || message.includes('tech') || message.includes('stack') || message.includes('framework') || message.includes('language')) {
        return `💻 Nischal's Awesome Skills:\n\n• Frontend: ${skills.frontend.join(', ')}\n• Backend: ${skills.backend.join(', ')}\n• Databases: ${skills.databases.join(', ')}\n• Mobile: ${skills.mobile.join(', ')}\n• Tools: ${skills.tools.join(', ')}\n\nHe's always learning and expanding his tech stack! 📚`;
    }

    // Experience
    if (message.includes('experience') || message.includes('work') || message.includes('job') || message.includes('career') || message.includes('professional') || message.includes('intern')) {
        const experienceText = experience.map(exp => `• ${exp.role} at ${exp.company} (${exp.duration})\n  ${exp.description}`).join('\n\n');
        return `💼 Nischal's Professional Journey:\n\n${experienceText}\n\nHe's gained valuable experience across different domains! 🌟`;
    }

    // Education
    if (message.includes('education') || message.includes('study') || message.includes('degree') || message.includes('college') || message.includes('university') || message.includes('learn')) {
        return `🎓 Education: ${education.status} ${education.degree} at ${education.institution} (affiliated with ${education.university})\n\nNischal believes in continuous learning and growth! 📖`;
    }

    // Contact
    if (message.includes('contact') || message.includes('email') || message.includes('phone') || message.includes('reach') || message.includes('get in touch') || message.includes('hire') || message.includes('available')) {
        return `📞 Let's Connect with Nischal!\n\n📧 Email: ${personal.email}\n📱 Phone: ${personal.phone}\n📍 Location: ${personal.location}\n\nHe's open to new opportunities and collaborations! 🤝`;
    }

    // Hobbies/Passions
    if (message.includes('hobby') || message.includes('passion') || message.includes('interest') || message.includes('like to do') || message.includes('free time')) {
        return `🎯 Nischal's Passions:\n\n• ${personal.hobbies.join('\n• ')}\n\nHe's particularly passionate about:\n• ${personal.passions.join('\n• ')}\n\nWhen he's not coding, he's probably learning something new! 🌱`;
    }

    // Help
    if (message.includes('help') || message.includes('what can you do') || message.includes('capabilities') || message.includes('support')) {
        return `🤖 I can help you learn about:\n\n• Nischal's Skills & Technologies 💻\n• Projects & Portfolio 🚀\n• Work Experience 💼\n• Education & Learning 🎓\n• Contact Information 📞\n• Fun Facts & Passions 🎯\n\nJust ask me anything! I'm here to help! 😊`;
    }

    // Default response with more personality
    return getRandom(responseVariations.unknown);
};

// Export everything if needed
export default chatbotData;