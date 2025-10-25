import {
    FaReact,
    FaNodeJs,
    FaJs,
    FaPython,
    FaAws,
    FaGitAlt,
    FaDocker,
    FaVuejs,
    FaCloud,
    FaRocket,
    FaCode,
    FaServer,
    FaHtml5,
    FaCss3Alt
} from 'react-icons/fa';
import {
    SiNextdotjs,
    SiTailwindcss,
    SiMongodb,
    SiExpress,
    SiPostgresql,
    SiTypescript,
    SiLaravel,
    SiMysql,
    SiFirebase,
    SiFigma,
    SiAdobexd
} from 'react-icons/si';

export const skillCategories = [
    {
        id: 1,
        title: "Frontend Development",
        icon: FaCode,
        description: "Modern frontend technologies and frameworks",
        skills: [
            {
                name: 'React',
                level: 40,
                icon: FaReact,
                color: '#61DAFB',
                experience: '2+ Years',
                description: 'Building dynamic and responsive user interfaces'
            },
            {
                name: 'Vue.js',
                level: 20,
                icon: FaVuejs,
                color: '#4FC08D',
                experience: '1+ Years',
                description: 'Progressive framework for building user interfaces'
            },
            {
                name: 'TypeScript',
                level: 10,
                icon: SiTypescript,
                color: '#3178C6',
                experience: '1+ Years',
                description: 'Typed JavaScript for better development experience'
            },
            {
                name: 'Next.js',
                level: 10,
                icon: SiNextdotjs,
                color: '#000000',
                experience: '1+ Year',
                description: 'React framework for production-grade applications'
            },
            {
                name: 'Tailwind CSS',
                level: 40,
                icon: SiTailwindcss,
                color: '#06B6D4',
                experience: '2+ Years',
                description: 'Utility-first CSS framework for rapid UI development'
            },
            {
                name: 'JavaScript',
                level: 60,
                icon: FaJs,
                color: '#F7DF1E',
                experience: '4+ Years',
                description: 'Core programming language for web development'
            },
            {
                name: 'HTML',
                level: 80,
                icon: FaHtml5,
                color: '#E34F26',
                experience: '4+ Years',
                description: 'Semantic markup and accessible document structure'
            },
            {
                name: 'CSS',
                level: 70,
                icon: FaCss3Alt,
                color: '#1572B6',
                experience: '4+ Years',
                description: 'Styling, layouts, responsive design and animations'
            }
        ]
    },
    {
        id: 2,
        title: "Backend Development",
        icon: FaServer,
        description: "Server-side technologies and database management",
        skills: [
            {
                name: 'Node.js',
                level: 20,
                icon: FaNodeJs,
                color: '#339933',
                experience: '1+ Years',
                description: 'JavaScript runtime for building scalable server-side applications'
            },
            {
                name: 'Python',
                level: 20,
                icon: FaPython,
                color: '#3776AB',
                experience: '2+ Years',
                description: 'Versatile programming language for backend and data processing'
            },
            {
                name: 'PHP/Laravel',
                level: 70,
                icon: SiLaravel,
                color: '#FF2D20',
                experience: '2+ Years',
                description: 'PHP framework for elegant web applications'
            },
            {
                name: 'Express.js',
                level: 10,
                icon: SiExpress,
                color: '#000000',
                experience: '1+ Years',
                description: 'Minimal and flexible Node.js web application framework'
            },
            {
                name: 'PostgreSQL',
                level: 40,
                icon: SiPostgresql,
                color: '#4169E1',
                experience: '2+ Years',
                description: 'Powerful, open-source object-relational database system'
            },
            {
                name: 'MongoDB',
                level: 20,
                icon: SiMongodb,
                color: '#47A248',
                experience: '1+ Years',
                description: 'NoSQL database for modern applications'
            }
        ]
    },
    {
        id: 3,
        title: "Tools & DevOps",
        icon: FaRocket,
        description: "Development tools and deployment technologies",
        skills: [
            {
                name: 'AWS',
                level: 20,
                icon: FaAws,
                color: '#FF9900',
                experience: '2+ Years',
                description: 'Cloud computing services and infrastructure'
            },
            {
                name: 'Docker',
                level: 20,
                icon: FaDocker,
                color: '#2496ED',
                experience: '1+ Year',
                description: 'Containerization platform for application deployment'
            },
            {
                name: 'Git',
                level: 70,
                icon: FaGitAlt,
                color: '#F05032',
                experience: '3+ Years',
                description: 'Version control system for collaborative development'
            },
            {
                name: 'Firebase',
                level: 40,
                icon: SiFirebase,
                color: '#FFCA28',
                experience: '2+ Year',
                description: 'Backend-as-a-service for mobile and web apps'
            }
        ]
    },
    {
        id: 4,
        title: "Additional Technologies",
        icon: FaCloud,
        description: "Other technologies and tools in my toolkit",
        skills: [
            {
                name: 'MySQL',
                level: 75,
                icon: SiMysql,
                color: '#4479A1',
                experience: '2+ Years',
                description: 'Relational database management system'
            },
            {
                name: 'Figma',
                level: 40,
                icon: SiFigma,
                color: '#F24E1E',
                experience: '2+ Years',
                description: 'Collaborative interface design tool'
            },
            {
                name: 'Adobe XD',
                level: 20,
                icon: SiAdobexd,
                color: '#FF61F6',
                experience: '1+ Years',
                description: 'Vector-based design tool for web and mobile apps'
            }
        ]
    }
];

export const skillsStats = {
    totalSkills: 21,
    yearsExperience: '2+',
    projectsCompleted: '20+',
    technologiesMastered: '4+'
};