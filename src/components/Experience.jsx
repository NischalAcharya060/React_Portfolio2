// src/components/Experience.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    FaBriefcase,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaRocket,
    FaAward,
    FaCode,
    FaUsers,
    FaChartLine,
    FaExternalLinkAlt,
    FaChevronDown
} from 'react-icons/fa';

const Experience = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, threshold: 0.1 });
    const [activeCompany, setActiveCompany] = useState(0);
    const [expandedItems, setExpandedItems] = useState({});

    const experiences = [
        {
            id: 1,
            role: 'Senior Full-Stack Developer',
            company: 'Tech Solutions Inc.',
            duration: '2022 - Present',
            location: 'New York, NY',
            type: 'Full-time',
            description: 'Lead development of enterprise web applications using React, Node.js, and cloud technologies. Mentor junior developers and implement best practices across multiple projects.',
            achievements: [
                'Improved application performance by 40% through code optimization and caching strategies',
                'Led a team of 4 developers on a major e-commerce platform serving 10k+ daily users',
                'Implemented CI/CD pipelines reducing deployment time by 60% and improving release frequency',
                'Architected microservices infrastructure handling 1M+ API requests daily',
                'Mentored 3 junior developers, improving team productivity by 25%'
            ],
            technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'MongoDB', 'Redis'],
            companyLogo: '/api/placeholder/60/60',
            projects: 15,
            teamSize: 8
        },
        {
            id: 2,
            role: 'Full-Stack Developer',
            company: 'Digital Innovations LLC',
            duration: '2020 - 2022',
            location: 'Remote',
            type: 'Full-time',
            description: 'Developed and maintained multiple client projects using modern web technologies. Collaborated with designers and project managers to deliver high-quality solutions.',
            achievements: [
                'Built 10+ successful web applications for clients across various industries',
                'Reduced page load times by 50% across all projects through optimization',
                'Implemented responsive designs for mobile-first approach, improving mobile engagement by 35%',
                'Integrated third-party APIs and payment systems for e-commerce platforms',
                'Conducted code reviews and established coding standards'
            ],
            technologies: ['React', 'Vue.js', 'Express.js', 'PostgreSQL', 'Firebase', 'Stripe'],
            companyLogo: '/api/placeholder/60/60',
            projects: 12,
            teamSize: 6
        },
        {
            id: 3,
            role: 'Frontend Developer',
            company: 'Web Creations Agency',
            duration: '2019 - 2020',
            location: 'Boston, MA',
            type: 'Full-time',
            description: 'Focused on creating responsive and interactive user interfaces using React and modern CSS frameworks. Worked closely with UX/UI designers.',
            achievements: [
                'Developed 15+ responsive websites with modern design patterns',
                'Improved user engagement by 25% through UI/UX enhancements and A/B testing',
                'Collaborated with backend team on RESTful API integration and optimization',
                'Implemented component libraries reducing development time by 30%',
                'Optimized websites for SEO, improving search rankings by 40%'
            ],
            technologies: ['React', 'JavaScript', 'SASS', 'Material-UI', 'GraphQL', 'Jest'],
            companyLogo: '/api/placeholder/60/60',
            projects: 18,
            teamSize: 4
        },
        {
            id: 4,
            role: 'Junior Web Developer',
            company: 'StartUp Ventures',
            duration: '2018 - 2019',
            location: 'San Francisco, CA',
            type: 'Full-time',
            description: 'Started my career building websites and learning full-stack development fundamentals. Gained experience in agile methodologies and team collaboration.',
            achievements: [
                'Built first commercial web applications from concept to deployment',
                'Learned and implemented agile development methodologies in team environment',
                'Contributed to open-source projects and internal tool development',
                'Participated in code reviews and continuous integration processes',
                'Developed responsive websites for various small business clients'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'jQuery'],
            companyLogo: '/api/placeholder/60/60',
            projects: 8,
            teamSize: 3
        }
    ];

    const toggleExpanded = (id) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: {
            y: 60,
            opacity: 0,
            scale: 0.95
        },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const timelineVariants = {
        hidden: {
            scaleY: 0,
            opacity: 0
        },
        visible: {
            scaleY: 1,
            opacity: 1,
            transition: {
                duration: 1.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <section
            id="experience"
            ref={ref}
            className="section-padding position-relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, var(--background-color) 0%, var(--surface-color) 100%)'
            }}
        >
            {/* Background Elements */}
            <div className="position-absolute top-0 start-0 w-100 h-100">
                <motion.div
                    style={{
                        position: 'absolute',
                        top: '20%',
                        right: '10%',
                        width: '200px',
                        height: '200px',
                        background: 'radial-gradient(circle, var(--primary-color) 0%, transparent 70%)',
                        opacity: 0.03,
                        borderRadius: '50%'
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.03, 0.05, 0.03]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    style={{
                        position: 'absolute',
                        bottom: '30%',
                        left: '5%',
                        width: '150px',
                        height: '150px',
                        background: 'radial-gradient(circle, var(--secondary-color) 0%, transparent 70%)',
                        opacity: 0.03,
                        borderRadius: '50%'
                    }}
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.05, 0.03, 0.05]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
            </div>

            <Container>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-5"
                >
                    <span className="section-badge">Career Journey</span>
                    <h2 className="display-4 fw-bold mb-3">
                        Professional
                        <span className="gradient-text"> Experience</span>
                    </h2>
                    <p className="lead text-muted max-w-600 mx-auto">
                        My career progression and the milestones I've achieved along the way
                    </p>
                </motion.div>

                <Row className="justify-content-center">
                    <Col xl={10}>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="timeline-container position-relative"
                        >
                            {/* Timeline Line */}
                            <motion.div
                                className="timeline-line position-absolute start-0 top-0 h-100"
                                style={{
                                    width: '2px',
                                    background: 'linear-gradient(to bottom, var(--primary-color), var(--secondary-color))',
                                    left: '30px',
                                    zIndex: 1
                                }}
                                variants={timelineVariants}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                            />

                            {experiences.map((exp, index) => (
                                <motion.div
                                    key={exp.id}
                                    variants={itemVariants}
                                    className="timeline-item mb-5 position-relative"
                                >
                                    {/* Timeline Dot */}
                                    <motion.div
                                        className="timeline-dot position-absolute rounded-circle"
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                                            border: '4px solid var(--background-color)',
                                            left: '20px',
                                            top: '30px',
                                            zIndex: 2
                                        }}
                                        whileHover={{ scale: 1.3 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    />

                                    <motion.div
                                        className="timeline-content ms-5 ps-4"
                                        whileHover={{
                                            y: -5,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        <div
                                            className="experience-card p-4 rounded-4 position-relative overflow-hidden"
                                            style={{
                                                background: 'linear-gradient(135deg, var(--card-bg), var(--surface-color))',
                                                backdropFilter: 'blur(10px)',
                                                border: '1px solid var(--border-color)',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => toggleExpanded(exp.id)}
                                        >
                                            {/* Background Pattern */}
                                            <div
                                                className="position-absolute top-0 end-0 w-50 h-100 opacity-10"
                                                style={{
                                                    background: `linear-gradient(45deg, transparent, ${exp.id === 1 ? 'var(--primary-color)' : exp.id === 2 ? 'var(--secondary-color)' : exp.id === 3 ? '#ff6b6b' : '#4ecdc4'})`,
                                                    clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)'
                                                }}
                                            />

                                            <div className="position-relative z-2">
                                                {/* Header Section */}
                                                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4">
                                                    <div className="d-flex align-items-start gap-3 mb-3 mb-md-0">
                                                        <div className="company-logo-container">
                                                            <img
                                                                src={exp.companyLogo}
                                                                alt={exp.company}
                                                                className="company-logo rounded-3"
                                                                style={{
                                                                    width: '60px',
                                                                    height: '60px',
                                                                    objectFit: 'cover',
                                                                    border: '2px solid var(--border-color)'
                                                                }}
                                                            />
                                                        </div>
                                                        <div>
                                                            <h5 className="fw-bold mb-1" style={{ color: 'var(--text-color)' }}>
                                                                {exp.role}
                                                            </h5>
                                                            <div className="d-flex align-items-center gap-2 flex-wrap">
                                                                <span className="company-name fw-semibold" style={{ color: 'var(--primary-color)' }}>
                                                                    {exp.company}
                                                                </span>
                                                                <Badge
                                                                    className="type-badge"
                                                                    style={{
                                                                        backgroundColor: 'rgba(var(--primary-rgb), 0.1)',
                                                                        color: 'var(--primary-color)',
                                                                        fontSize: '0.75rem'
                                                                    }}
                                                                >
                                                                    {exp.type}
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <Badge
                                                        className="duration-badge align-self-start"
                                                        style={{
                                                            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                                                            color: 'white',
                                                            fontSize: '0.8rem',
                                                            fontWeight: 600,
                                                            padding: '0.5rem 1rem'
                                                        }}
                                                    >
                                                        <FaCalendarAlt className="me-1" size={12} />
                                                        {exp.duration}
                                                    </Badge>
                                                </div>

                                                {/* Meta Information */}
                                                <div className="d-flex align-items-center gap-4 mb-3 flex-wrap">
                                                    <div className="d-flex align-items-center gap-2 text-muted">
                                                        <FaMapMarkerAlt size={14} />
                                                        <span>{exp.location}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-2 text-muted">
                                                        <FaCode size={14} />
                                                        <span>{exp.projects} Projects</span>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-2 text-muted">
                                                        <FaUsers size={14} />
                                                        <span>Team: {exp.teamSize}</span>
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                <p className="mb-4" style={{ lineHeight: '1.6' }}>
                                                    {exp.description}
                                                </p>

                                                {/* Technologies */}
                                                <div className="mb-4">
                                                    <h6 className="fw-semibold mb-2 text-muted">Technologies Used:</h6>
                                                    <div className="d-flex flex-wrap gap-2">
                                                        {exp.technologies.map((tech, techIndex) => (
                                                            <motion.span
                                                                key={tech}
                                                                className="tech-tag"
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                transition={{ delay: techIndex * 0.1 }}
                                                                whileHover={{ scale: 1.1 }}
                                                            >
                                                                {tech}
                                                            </motion.span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Expandable Achievements */}
                                                <AnimatePresence>
                                                    {expandedItems[exp.id] && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            <h6 className="fw-semibold mb-3 text-muted d-flex align-items-center gap-2">
                                                                <FaAward style={{ color: 'var(--primary-color)' }} />
                                                                Key Achievements
                                                            </h6>
                                                            <ul className="achievements-list">
                                                                {exp.achievements.map((achievement, idx) => (
                                                                    <motion.li
                                                                        key={idx}
                                                                        className="mb-2 d-flex align-items-start"
                                                                        initial={{ opacity: 0, x: -20 }}
                                                                        animate={{ opacity: 1, x: 0 }}
                                                                        transition={{ delay: idx * 0.1 }}
                                                                    >
                                                                        <span
                                                                            className="achievement-bullet me-3 mt-1 flex-shrink-0"
                                                                            style={{
                                                                                color: 'var(--primary-color)',
                                                                                fontSize: '6px'
                                                                            }}
                                                                        >
                                                                            ●
                                                                        </span>
                                                                        <span style={{ lineHeight: '1.5' }}>{achievement}</span>
                                                                    </motion.li>
                                                                ))}
                                                            </ul>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                                {/* Expand Button */}
                                                <motion.div
                                                    className="text-center mt-3"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <button
                                                        className="expand-btn btn btn-sm"
                                                        style={{
                                                            background: 'transparent',
                                                            border: '1px solid var(--border-color)',
                                                            color: 'var(--text-muted)',
                                                            borderRadius: '50px',
                                                            padding: '0.5rem 1.5rem'
                                                        }}
                                                    >
                                                        <FaChevronDown
                                                            size={12}
                                                            className={`me-2 transition-rotate ${expandedItems[exp.id] ? 'rotated' : ''}`}
                                                        />
                                                        {expandedItems[exp.id] ? 'Show Less' : 'View Achievements'}
                                                    </button>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </Col>
                </Row>
            </Container>

            <style>
                {`
                    .section-badge {
                        display: inline-block;
                        background: rgba(var(--primary-rgb), 0.1);
                        color: var(--primary-color);
                        padding: 0.5rem 1.5rem;
                        border-radius: 50px;
                        font-size: 0.9rem;
                        font-weight: 600;
                        margin-bottom: 1rem;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    }

                    .max-w-600 {
                        max-width: 600px;
                    }

                    .timeline-container {
                        padding-left: 30px;
                    }

                    .experience-card {
                        transition: all 0.3s ease;
                    }

                    .experience-card:hover {
                        border-color: var(--primary-color);
                        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    }

                    .company-logo-container {
                        flex-shrink: 0;
                    }

                    .tech-tag {
                        background: var(--surface-color);
                        color: var(--text-color);
                        padding: 0.4rem 0.8rem;
                        border-radius: 50px;
                        font-size: 0.8rem;
                        font-weight: 500;
                        border: 1px solid var(--border-color);
                        transition: all 0.3s ease;
                    }

                    .tech-tag:hover {
                        background: var(--primary-color);
                        color: white;
                        border-color: var(--primary-color);
                    }

                    .achievements-list {
                        list-style: none;
                        padding-left: 0;
                    }

                    .achievement-bullet {
                        flex-shrink: 0;
                    }

                    .expand-btn {
                        transition: all 0.3s ease;
                    }

                    .expand-btn:hover {
                        border-color: var(--primary-color);
                        color: var(--primary-color);
                    }

                    .transition-rotate {
                        transition: transform 0.3s ease;
                    }

                    .transition-rotate.rotated {
                        transform: rotate(180deg);
                    }

                    .type-badge {
                        font-size: 0.7rem;
                        padding: 0.25rem 0.5rem;
                    }

                    @media (max-width: 768px) {
                        .timeline-container {
                            padding-left: 20px;
                        }
                        
                        .timeline-line {
                            left: 15px;
                        }
                        
                        .timeline-dot {
                            left: 10px;
                        }
                        
                        .timeline-content {
                            margin-left: 2rem;
                            padding-left: 1rem;
                        }
                    }
                `}
            </style>
        </section>
    );
};

export default Experience;