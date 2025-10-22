// src/components/About.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    FaDownload,
    FaCode,
    FaPalette,
    FaMobile,
    FaRocket,
    FaAward,
    FaProjectDiagram,
    FaUsers,
    FaCalendarAlt
} from 'react-icons/fa';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, threshold: 0.2 });
    const [activeTab, setActiveTab] = useState('skills');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
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

    const stats = [
        { icon: FaAward, value: '3+', label: 'Years Experience' },
        { icon: FaProjectDiagram, value: '50+', label: 'Projects Completed' },
        { icon: FaUsers, value: '30+', label: 'Happy Clients' },
        { icon: FaCalendarAlt, value: '100%', label: 'Meeting Deadlines' }
    ];

    const skills = [
        { name: 'Frontend Development', level: 90, color: 'var(--primary-color)' },
        { name: 'Backend Development', level: 85, color: 'var(--secondary-color)' },
        { name: 'UI/UX Design', level: 75, color: '#ff6b6b' },
        { name: 'Mobile Development', level: 70, color: '#4ecdc4' },
        { name: 'DevOps & Cloud', level: 65, color: '#45b7d1' }
    ];

    const technologies = {
        frontend: ['React', 'Vue.js', 'TypeScript', 'Next.js', 'Tailwind CSS'],
        backend: ['Node.js', 'Python', 'PHP', 'Express.js', 'MongoDB'],
        tools: ['Git', 'Docker', 'AWS', 'Figma', 'Webpack']
    };

    const handleDownloadResume = () => {
        const resumeFile = '/resume/Nischal_Acharya_Resume.pdf';
        const link = document.createElement('a');
        link.href = resumeFile;
        link.download = 'Nischal_Acharya_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section
            id="about"
            ref={ref}
            className="section-padding position-relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, var(--background-color) 0%, var(--surface-color) 100%)'
            }}
        >
            {/* Background Elements */}
            <div className="position-absolute top-0 start-0 w-100 h-100">
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    right: '5%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, var(--primary-color) 0%, transparent 70%)',
                    opacity: 0.03,
                    borderRadius: '50%'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '5%',
                    width: '200px',
                    height: '200px',
                    background: 'radial-gradient(circle, var(--secondary-color) 0%, transparent 70%)',
                    opacity: 0.03,
                    borderRadius: '50%'
                }} />
            </div>

            <Container>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {/* Section Header */}
                    <motion.div
                        variants={itemVariants}
                        className="text-center mb-5"
                    >
                        <span className="section-badge">About Me</span>
                        <h2 className="display-4 fw-bold mb-3">
                            Crafting Digital
                            <span className="gradient-text"> Experiences</span>
                        </h2>
                        <p className="lead text-muted max-w-600 mx-auto">
                            Passionate full-stack developer with 3+ years of experience creating
                            innovative digital solutions that drive business success
                        </p>
                    </motion.div>

                    <Row className="align-items-center gy-5">
                        {/* Profile Image Column */}
                        <Col lg={5} className="mb-4 mb-lg-0">
                            <motion.div
                                variants={itemVariants}
                                className="position-relative"
                            >
                                <div className="profile-image-container">
                                    <img
                                        src="/api/placeholder/profile.jpeg"
                                        alt="Nischal Acharya"
                                        className="profile-image img-fluid rounded-4"
                                    />
                                    {/* Floating Elements */}
                                    <motion.div
                                        className="floating-card"
                                        style={{
                                            top: '20%',
                                            right: '-20px',
                                            background: 'var(--primary-color)'
                                        }}
                                        animate={{
                                            y: [-10, 10, -10],
                                            rotate: [0, 5, 0]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <FaCode size={24} color="white" />
                                    </motion.div>
                                    <motion.div
                                        className="floating-card"
                                        style={{
                                            bottom: '30%',
                                            left: '-20px',
                                            background: 'var(--secondary-color)'
                                        }}
                                        animate={{
                                            y: [10, -10, 10],
                                            rotate: [0, -5, 0]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 1
                                        }}
                                    >
                                        <FaRocket size={24} color="white" />
                                    </motion.div>
                                </div>
                            </motion.div>
                        </Col>

                        {/* Content Column */}
                        <Col lg={7}>
                            <motion.div variants={itemVariants}>
                                {/* Stats Grid */}
                                <Row className="g-3 mb-5">
                                    {stats.map((stat, index) => (
                                        <Col key={index} sm={6}>
                                            <motion.div
                                                className="stat-card text-center p-3 rounded-4"
                                                whileHover={{ scale: 1.05, y: -5 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <stat.icon
                                                    size={32}
                                                    className="mb-2"
                                                    style={{ color: 'var(--primary-color)' }}
                                                />
                                                <h4 className="fw-bold mb-1">{stat.value}</h4>
                                                <p className="text-muted small mb-0">{stat.label}</p>
                                            </motion.div>
                                        </Col>
                                    ))}
                                </Row>

                                {/* Bio Text */}
                                <div className="mb-5">
                                    <p className="mb-3">
                                        I'm a passionate full-stack developer from <strong>Gauradaha-Jhapa, Nepal</strong>,
                                        specializing in creating digital experiences that blend cutting-edge technology
                                        with beautiful design.
                                    </p>
                                    <p className="mb-3">
                                        My expertise spans across modern web technologies, cloud platforms, and
                                        agile development methodologies. I believe in writing clean, maintainable
                                        code and creating user-centric solutions that solve real-world problems.
                                    </p>
                                    <p>
                                        When I'm not coding, you'll find me exploring new technologies, contributing
                                        to open-source projects, or sharing knowledge with the developer community.
                                    </p>
                                </div>

                                {/* Skills & Technologies Tabs */}
                                <div className="mb-4">
                                    <div className="d-flex gap-2 mb-4">
                                        {['skills', 'technologies'].map((tab) => (
                                            <button
                                                key={tab}
                                                onClick={() => setActiveTab(tab)}
                                                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                                            >
                                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                            </button>
                                        ))}
                                    </div>

                                    {activeTab === 'skills' && (
                                        <div className="skills-container">
                                            {skills.map((skill, index) => (
                                                <div key={index} className="skill-item mb-3">
                                                    <div className="d-flex justify-content-between mb-2">
                                                        <span className="fw-semibold">{skill.name}</span>
                                                        <span className="text-muted">{skill.level}%</span>
                                                    </div>
                                                    <div className="progress" style={{ height: '8px', backgroundColor: 'var(--border-color)' }}>
                                                        <motion.div
                                                            className="progress-bar rounded-pill"
                                                            style={{ backgroundColor: skill.color }}
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${skill.level}%` }}
                                                            transition={{ duration: 1.5, delay: index * 0.2 }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {activeTab === 'technologies' && (
                                        <div className="technologies-grid">
                                            {Object.entries(technologies).map(([category, items]) => (
                                                <div key={category} className="tech-category mb-3">
                                                    <h6 className="text-uppercase fw-bold mb-2 text-muted">
                                                        {category}
                                                    </h6>
                                                    <div className="d-flex flex-wrap gap-2">
                                                        {items.map((tech, index) => (
                                                            <motion.span
                                                                key={tech}
                                                                className="tech-tag"
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                transition={{ delay: index * 0.1 }}
                                                                whileHover={{ scale: 1.1 }}
                                                            >
                                                                {tech}
                                                            </motion.span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="d-flex flex-wrap gap-3">
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button
                                            size="lg"
                                            className="btn-primary-gradient"
                                            onClick={handleDownloadResume}
                                        >
                                            <FaDownload className="me-2" />
                                            Download Resume
                                        </Button>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            className="btn-outline-primary"
                                            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                                        >
                                            Let's Talk
                                        </Button>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </Col>
                    </Row>
                </motion.div>
            </Container>

            <style>
                {`
                    .section-badge {
                        display: inline-block;
                        background: rgba(var(--primary-rgb), 0.1);
                        color: var(--primary-color);
                        padding: 0.5rem 1rem;
                        border-radius: 50px;
                        font-size: 0.9rem;
                        font-weight: 600;
                        margin-bottom: 1rem;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    }

                    .profile-image-container {
                        position: relative;
                        padding: 15px;
                        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                        border-radius: 20px;
                        display: inline-block;
                    }

                    .profile-image {
                        border-radius: 15px;
                        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                        position: relative;
                        z-index: 2;
                    }

                    .floating-card {
                        position: absolute;
                        width: 60px;
                        height: 60px;
                        border-radius: 15px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                        z-index: 3;
                    }

                    .stat-card {
                        background: var(--card-bg);
                        border: 1px solid var(--border-color);
                        transition: all 0.3s ease;
                    }

                    .stat-card:hover {
                        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                        border-color: var(--primary-color);
                    }

                    .tab-button {
                        padding: 0.75rem 1.5rem;
                        border: none;
                        background: transparent;
                        color: var(--text-muted);
                        border-radius: 50px;
                        font-weight: 600;
                        transition: all 0.3s ease;
                    }

                    .tab-button.active {
                        background: var(--primary-color);
                        color: white;
                    }

                    .tab-button:not(.active):hover {
                        background: var(--surface-color);
                        color: var(--text-color);
                    }

                    .tech-tag {
                        background: var(--surface-color);
                        color: var(--text-color);
                        padding: 0.5rem 1rem;
                        border-radius: 50px;
                        font-size: 0.9rem;
                        font-weight: 500;
                        border: 1px solid var(--border-color);
                        transition: all 0.3s ease;
                    }

                    .tech-tag:hover {
                        background: var(--primary-color);
                        color: white;
                        border-color: var(--primary-color);
                    }

                    .btn-primary-gradient {
                        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                        border: none;
                        color: white;
                        padding: 0.75rem 2rem;
                        border-radius: 50px;
                        font-weight: 600;
                    }

                    .btn-outline-primary {
                        border: 2px solid var(--primary-color);
                        color: var(--primary-color);
                        background: transparent;
                        padding: 0.75rem 2rem;
                        border-radius: 50px;
                        font-weight: 600;
                    }

                    .btn-outline-primary:hover {
                        background: var(--primary-color);
                        color: white;
                    }

                    .max-w-600 {
                        max-width: 600px;
                    }

                    .progress-bar {
                        transition: width 1.5s ease-in-out;
                    }
                `}
            </style>
        </section>
    );
};

export default About;