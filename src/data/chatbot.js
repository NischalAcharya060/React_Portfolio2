// src/data/chatbot.js

const knowledge = {
    personal: {
        name: "Nischal Acharya",
        location: "Gauradaha, Jhapa, Nepal",
        email: "Nischal060@gmail.com",
        phone: "+977 9806081469",
        hobbies: ["coding", "learning new technologies", "building projects", "problem solving"],
        passions: ["web development", "mobile apps", "IoT projects", "open source"],
    },
    skills: {
        frontend: ["React", "Vue.js", "JavaScript", "TypeScript", "Next.js", "Tailwind CSS", "HTML5", "CSS3"],
        backend: ["Laravel", "Node.js", "Python", "Express.js", "PHP"],
        databases: ["PostgreSQL", "MySQL", "MongoDB", "SQL", "Supabase"],
        mobile: ["React Native", "Expo"],
        tools: ["Git", "Docker", "AWS", "Firebase", "Figma", "VS Code"],
        other: ["REST APIs", "IoT", "Arduino", "Google APIs", "AI Integration", "Chrome Extensions", "UI/UX Design"],
    },
    projects: [
        {
            name: "VS Code Theme",
            description: "A custom VS Code theme published on the VS Code Marketplace.",
            tech: "VS Code Extension",
            status: "Published ✅",
        },
        {
            name: "Kick Up Futsal",
            description: "A full futsal court booking system built with Laravel.",
            tech: "Laravel, PHP, MySQL",
            status: "Completed",
        },
        {
            name: "Food Delivery App",
            description: "A mobile food delivery app built with React Native and Firebase.",
            tech: "React Native, Expo, Firebase",
            status: "Completed",
        },
        {
            name: "Bus Management System",
            description: "An IoT project using Arduino and sensors to manage bus tracking.",
            tech: "Arduino, IoT, Sensors",
            status: "Completed",
        },
        {
            name: "Resume Builder",
            description: "A React app that helps you build a professional resume.",
            tech: "React, JavaScript",
            status: "Completed",
        },
    ],
    experience: [
        {
            role: "Full-stack Developer Intern",
            company: "Shangrila Microsystem",
            duration: "3 months",
            description: "Worked with Laravel and Vue.js to build and maintain web applications.",
        },
        {
            role: "Freelance Web Developer",
            company: "Self-Employed",
            duration: "2+ years",
            description: "Built 20+ projects for clients across web, mobile, and IoT domains.",
        },
    ],
    education: {
        degree: "BSc (Hons) Computing",
        institution: "Itahari International College",
        university: "London Metropolitan University",
        status: "Currently pursuing",
        goal: "Planning to study abroad for higher education",
    },
};

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const contains = (msg, keywords) => keywords.some((k) => msg.includes(k));

const responses = {
    greeting: () => pick([
        "Hey there! 👋 I'm Nischal's AI assistant. Ask me anything about his skills, projects, or how to reach him!",
        "Hello! 😊 Welcome to Nischal's portfolio. What would you like to know?",
        "Hi! Great to see you here. 🚀 I can tell you all about Nischal's work.",
        "Namaste! 🙏 I'm Nischal's personal assistant. Feel free to ask about his work!",
        "Hlo! 👋 Ready to explore some cool projects? Just ask!",
        "Hyy! 😊 How can I help you today?"
    ]),

    farewell: () => pick([
        "Bye! 👋 Thanks for stopping by. Have a great day!",
        "Goodbye! 😊 Feel free to come back if you have more questions.",
        "See ya! 🚀 It was fun chatting with you!",
        "Okk bye! Take care! ✨",
        "Byee! Catch you later!"
    ]),

    casualOk: () => pick([
        "Okk! 👍 What else would you like to know?",
        "Got it! 😊",
        "Cool! 🚀",
        "Alright! Let me know if there's anything else.",
        "Nice! 😄"
    ]),

    howAreYou: () => pick([
        "Doing great, thanks for asking! 😄 Always happy to talk about Nischal's work.",
        "I'm fantastic! Ready to help you explore Nischal's portfolio.",
        "I'm running smooth — no bugs today! 😂 How can I help you?"
    ]),

    whoAreYou: () =>
        `I'm the AI assistant representing **Nischal Acharya** — a passionate full-stack developer from Nepal. 🇳🇵`,

    about: () =>
        `👨‍💻 **Nischal Acharya** is a passionate full-stack developer from **${knowledge.personal.location}**.\n\nHe is currently pursuing his **${knowledge.education.degree}** at ${knowledge.education.institution}.`,

    skills: () =>
        `💻 Here's Nischal's tech stack:\n\n` +
        `🎨 **Frontend:** ${knowledge.skills.frontend.join(", ")}\n` +
        `⚙️ **Backend:** ${knowledge.skills.backend.join(", ")}\n` +
        `🗄️ **Databases:** ${knowledge.skills.databases.join(", ")}\n` +
        `📱 **Mobile:** ${knowledge.skills.mobile.join(", ")}\n` +
        `🛠️ **Tools:** ${knowledge.skills.tools.join(", ")}\n` +
        `🔧 **Other:** ${knowledge.skills.other.join(", ")}`,

    projects: () => {
        const list = knowledge.projects
            .map((p) => `🔹 **${p.name}** — ${p.description}\n   _Tech: ${p.tech}_`)
            .join("\n\n");
        return `🚀 Here are some of Nischal's projects:\n\n${list}`;
    },

    experience: () => {
        const list = knowledge.experience
            .map((e) => `💼 **${e.role}** at ${e.company} _(${e.duration})_\n   ${e.description}`)
            .join("\n\n");
        return `Here's Nischal's professional journey so far:\n\n${list}`;
    },

    education: () =>
        `🎓 Nischal is currently pursuing a **${knowledge.education.degree}** at **${knowledge.education.institution}**.`,

    contact: () =>
        `📬 Want to reach Nischal?\n\n` +
        `📧 **Email:** ${knowledge.personal.email}\n` +
        `📱 **Phone:** ${knowledge.personal.phone}\n` +
        `📍 **Location:** ${knowledge.personal.location}`,

    hobbies: () =>
        `Outside of work, Nischal enjoys:\n\n` +
        `🎯 ${knowledge.personal.hobbies.join("\n🎯 ")}`,

    goals: () =>
        `🌟 Nischal's goals:\n\n` +
        `✈️ Study abroad for higher education\n` +
        `🏗️ Build impactful software products\n` +
        `🤖 Work on AI-integrated applications`,

    thanks: () => pick([
        "You're welcome! 😊",
        "No problem at all! 👍",
        "Glad I could help! 🌟",
        "Anytime! 😄"
    ]),

    unknown: () => pick([
        "Hmm, I'm not sure about that one! 🤔",
        "I didn't quite catch that! Could you rephrase? 😊",
        "Try asking about Nischal's skills, projects, or experience!"
    ]),
};

export const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase().trim();

    if (contains(msg, ["hi", "hello", "hlw", "hlo", "hey", "namaste", "yo", "hyy", "hii"])) {
        return responses.greeting();
    }

    if (contains(msg, ["bye", "byee", "goodbye", "see ya", "tata"])) {
        return responses.farewell();
    }

    if (msg === "ok" || msg === "okk" || msg === "kk" || msg === "okay" || msg === "alright" || msg === "nice") {
        return responses.casualOk();
    }

    if (msg === "nothing" || msg === "none") {
        return "No problem! Let me know if you have any questions later. 😊";
    }

    if (contains(msg, ["how are you", "how r u", "how you doing"])) {
        return responses.howAreYou();
    }

    if (contains(msg, ["who are you", "your name", "introduce"])) {
        return responses.whoAreYou();
    }

    if (contains(msg, ["about", "who is nischal"])) {
        return responses.about();
    }

    if (contains(msg, ["thank", "thanks", "ty"])) {
        return responses.thanks();
    }

    if (contains(msg, ["project", "portfolio", "work"])) {
        return responses.projects();
    }

    if (contains(msg, ["skill", "stack", "language", "tech"])) {
        return responses.skills();
    }

    if (contains(msg, ["experience", "job", "intern"])) {
        return responses.experience();
    }

    if (contains(msg, ["education", "college", "degree"])) {
        return responses.education();
    }

    if (contains(msg, ["contact", "email", "phone", "number", "reach", "call"])) {
        return responses.contact();
    }

    if (contains(msg, ["hobby", "interest", "passion"])) {
        return responses.hobbies();
    }

    if (contains(msg, ["goal", "future", "plan"])) {
        return responses.goals();
    }

    return responses.unknown();
};

export default { getBotResponse };