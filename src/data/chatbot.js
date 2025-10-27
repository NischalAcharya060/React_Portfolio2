// src/data/chatbot.js
const chatbotData = {
    context: {
        name: "Nischal Acharya ChatBot",
        personality: "friendly and helpful assistant",
        role: "I'm an AI assistant representing Nischal Acharya - a passionate developer from Nepal.",
    },

    knowledge: {
        personal: {
            name: "Nischal Acharya",
            location: "Gauradaha, Jhapa, Nepal",
            email: "Nischal060@gmail.com",
            phone: "+977 9806081469"
        },
        skills: {
            frontend: ["React", "Vue.js", "JavaScript", "Tailwind CSS"],
            backend: ["Laravel", "Node.js", "Python", "PHP"],
            databases: ["PostgreSQL", "MySQL", "MongoDB"],
            mobile: ["React Native"],
            tools: ["Git", "Docker", "AWS", "Firebase"]
        },
        projects: [
            "VS Code Theme (published in marketplace)",
            "Kick Up Futsal (Futsal booking system)",
            "Food Delivery App (React Native)",
            "Bus Management System (IoT)",
            "Resume Builder (React)",
            "Weather App (React)"
        ],
        experience: [
            "Full-stack Developer Intern at Shangrila Microsystem",
            "Freelance Web Developer (2+ years)"
        ]
    }
};

// Response handler function
export const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase().trim();
    const { personal, skills, projects, experience } = chatbotData.knowledge;

    // Greetings
    if (message.includes('hi') || message.includes('hello') || message.includes('hey')) {
        return "Hello! I'm Nischal Acharya ChatBot 👋 How can I help you learn about Nischal today?";
    }

    // Projects
    if (message.includes('project') || message.includes('portfolio') || message.includes('built')) {
        return `🚀 Nischal has built ${projects.length}+ projects including:\n${projects.map(proj => `• ${proj}`).join('\n')}`;
    }

    // Location
    if (message.includes('where') && (message.includes('from') || message.includes('live'))) {
        return `📍 Nischal is from ${personal.location}. He currently lives there and is available for remote work.`;
    }

    // Who are you
    if (message.includes('who are you') || message.includes('what is your name')) {
        return `👋 I'm Nischal Acharya ChatBot! I represent ${personal.name} - a passionate full-stack developer from ${personal.location} with 2+ years of experience.`;
    }

    // Skills
    if (message.includes('skill') || message.includes('technology') || message.includes('tech')) {
        return `💻 Nischal's Skills:\n• Frontend: ${skills.frontend.join(', ')}\n• Backend: ${skills.backend.join(', ')}\n• Databases: ${skills.databases.join(', ')}\n• Mobile: ${skills.mobile.join(', ')}\n• Tools: ${skills.tools.join(', ')}`;
    }

    // Experience
    if (message.includes('experience') || message.includes('work') || message.includes('job')) {
        return `💼 Nischal's Experience:\n${experience.map(exp => `• ${exp}`).join('\n')}`;
    }

    // Contact
    if (message.includes('contact') || message.includes('email') || message.includes('phone')) {
        return `📞 Contact Nischal:\n📧 Email: ${personal.email}\n📱 Phone: ${personal.phone}\n📍 Location: ${personal.location}`;
    }

    // Default
    return "I'm here to tell you about Nischal Acharya! Ask me about his projects, skills, experience, or contact information. What would you like to know? 😊";
};

// Export everything if needed
export default chatbotData;