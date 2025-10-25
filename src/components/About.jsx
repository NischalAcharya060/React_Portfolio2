// src/components/About.jsx
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    FaDownload,
    FaCode,
    FaRocket,
    FaAward,
    FaProjectDiagram,
    FaUsers,
    FaCalendarAlt
} from 'react-icons/fa';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, threshold: 0.2 });

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
        { icon: FaAward, value: '2+', label: 'Years Experience' },
        { icon: FaProjectDiagram, value: '20+', label: 'Projects Completed' },
        { icon: FaUsers, value: '15+', label: 'Happy Clients' },
        { icon: FaCalendarAlt, value: '100%', label: 'Meeting Deadlines' }
    ];

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
            className="about-section section-padding position-relative overflow-hidden"
        >
            {/* Background Elements */}
            <div className="background-elements">
                <div className="bg-blob primary-blob" />
                <div className="bg-blob secondary-blob" />
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
                        className="section-header text-center mb-6"
                    >
                        <motion.span
                            className="section-badge"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            About Me
                        </motion.span>
                        <h2 className="section-title gradient-heading mb-4">
                            Crafting Digital
                            <span className="gradient-text"> Experiences</span>
                        </h2>
                        <p className="section-subtitle">
                            Passionate full-stack developer with 2+ years of experience creating
                            innovative digital solutions that drive business success
                        </p>
                    </motion.div>

                    <Row className="align-items-center gy-5">
                        {/* Profile Image Column */}
                        <Col lg={5} className="profile-column">
                            <motion.div
                                variants={itemVariants}
                                className="profile-container"
                            >
                                <div className="profile-image-wrapper">
                                    <img
                                        src="/api/placeholder/profile.jpeg"
                                        alt="Nischal Acharya"
                                        className="profile-image"
                                    />
                                    {/* Floating Elements */}
                                    <motion.div
                                        className="floating-element primary-float"
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
                                        <FaCode size={24} />
                                    </motion.div>
                                    <motion.div
                                        className="floating-element secondary-float"
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
                                        <FaRocket size={24} />
                                    </motion.div>
                                </div>
                            </motion.div>
                        </Col>

                        {/* Content Column */}
                        <Col lg={7}>
                            <motion.div variants={itemVariants}>
                                {/* Stats Grid */}
                                <Row className="stats-grid">
                                    {stats.map((stat, index) => (
                                        <Col key={index} sm={6}>
                                            <motion.div
                                                className="stat-card"
                                                whileHover={{ scale: 1.05, y: -5 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <stat.icon
                                                    size={32}
                                                    className="stat-icon"
                                                />
                                                <h4 className="stat-value">{stat.value}</h4>
                                                <p className="stat-label">{stat.label}</p>
                                            </motion.div>
                                        </Col>
                                    ))}
                                </Row>

                                {/* Bio Text */}
                                <div className="bio-section">
                                    <p className="bio-text">
                                        I'm a passionate full-stack developer from <strong>Gauradaha-Jhapa, Nepal</strong>,
                                        specializing in creating digital experiences that blend cutting-edge technology
                                        with beautiful design.
                                    </p>
                                    <p className="bio-text">
                                        My expertise spans across modern web technologies, cloud platforms, and
                                        agile development methodologies. I believe in writing clean, maintainable
                                        code and creating user-centric solutions that solve real-world problems.
                                    </p>
                                    <p className="bio-text">
                                        When I'm not coding, you'll find me exploring new technologies, contributing
                                        to open-source projects, or sharing knowledge with the developer community.
                                    </p>
                                </div>
                            </motion.div>
                        </Col>
                    </Row>
                </motion.div>
            </Container>

            <style jsx>{`
                .about-section {
                    background: linear-gradient(135deg,
                    var(--background-color) 0%,
                    var(--surface-color) 50%,
                    var(--background-color) 100%);
                    position: relative;
                    overflow: hidden;
                }

                .background-elements {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                }

                .bg-blob {
                    position: absolute;
                    border-radius: 50%;
                    opacity: 0.03;
                }

                .primary-blob {
                    top: 10%;
                    right: 5%;
                    width: 300px;
                    height: 300px;
                    background: radial-gradient(circle, var(--primary-color) 0%, transparent 70%);
                }

                .secondary-blob {
                    bottom: 20%;
                    left: 5%;
                    width: 200px;
                    height: 200px;
                    background: radial-gradient(circle, var(--secondary-color) 0%, transparent 70%);
                }

                .section-header {
                    position: relative;
                    z-index: 2;
                }

                .section-badge {
                    display: inline-block;
                    background: linear-gradient(135deg,
                    rgba(var(--primary-rgb), 0.15) 0%,
                    rgba(var(--secondary-rgb), 0.15) 100%);
                    color: var(--primary-color);
                    padding: var(--spacing-sm) var(--spacing-xl);
                    border-radius: 50px;
                    font-size: var(--font-size-sm);
                    font-weight: 600;
                    margin-bottom: var(--spacing-lg);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    border: 1px solid rgba(var(--primary-rgb), 0.2);
                    backdrop-filter: blur(10px);
                    cursor: default;
                }

                .section-title {
                    font-size: var(--font-size-4xl);
                    font-weight: 800;
                    margin-bottom: var(--spacing-md);
                    background: linear-gradient(135deg, var(--text-color) 0%, var(--text-muted) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .gradient-text {
                    background: var(--gradient-primary);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .section-subtitle {
                    font-size: var(--font-size-lg);
                    color: var(--text-muted);
                    max-width: 600px;
                    margin: 0 auto;
                    line-height: 1.7;
                }

                /* Profile Section */
                .profile-column {
                    margin-bottom: var(--spacing-xl);
                }

                @media (min-width: 992px) {
                    .profile-column {
                        margin-bottom: 0;
                    }
                }

                .profile-container {
                    position: relative;
                    text-align: center;
                }

                @media (min-width: 992px) {
                    .profile-container {
                        text-align: left;
                    }
                }

                .profile-image-wrapper {
                    position: relative;
                    padding: var(--spacing-md);
                    background: var(--gradient-primary);
                    border-radius: var(--radius-2xl);
                    display: inline-block;
                }

                .profile-image {
                    border-radius: var(--radius-xl);
                    box-shadow: var(--shadow-xl);
                    position: relative;
                    z-index: 2;
                    width: 100%;
                    max-width: 400px;
                    height: auto;
                }

                .floating-element {
                    position: absolute;
                    width: 60px;
                    height: 60px;
                    border-radius: var(--radius-lg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: var(--shadow-lg);
                    z-index: 3;
                    color: white;
                }

                .primary-float {
                    top: 20%;
                    right: -20px;
                    background: var(--primary-color);
                }

                .secondary-float {
                    bottom: 30%;
                    left: -20px;
                    background: var(--secondary-color);
                }

                /* Stats Grid */
                .stats-grid {
                    margin-bottom: var(--spacing-xl);
                }

                .stat-card {
                    background: var(--card-bg);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-lg);
                    padding: var(--spacing-lg);
                    text-align: center;
                    transition: all var(--transition-base);
                    backdrop-filter: blur(10px);
                }

                .stat-card:hover {
                    border-color: var(--primary-color);
                    box-shadow: var(--shadow-lg);
                }

                .stat-icon {
                    color: var(--primary-color);
                    margin-bottom: var(--spacing-sm);
                }

                .stat-value {
                    font-size: var(--font-size-2xl);
                    font-weight: 800;
                    color: var(--text-color);
                    margin-bottom: var(--spacing-xs);
                }

                .stat-label {
                    color: var(--text-muted);
                    font-size: var(--font-size-sm);
                    margin: 0;
                }

                /* Bio Section */
                .bio-section {
                    margin-bottom: var(--spacing-xl);
                }

                .bio-text {
                    color: var(--text-color);
                    line-height: 1.7;
                    margin-bottom: var(--spacing-md);
                }

                .bio-text strong {
                    color: var(--primary-color);
                }

                /* Action Buttons */
                .action-buttons {
                    display: flex;
                    flex-wrap: wrap;
                    gap: var(--spacing-md);
                }

                .primary-button {
                    background: var(--gradient-primary);
                    border: none;
                    color: white;
                    padding: var(--spacing-md) var(--spacing-xl);
                    border-radius: var(--radius-lg);
                    font-weight: 600;
                    font-size: var(--font-size-base);
                    transition: all var(--transition-base);
                }

                .primary-button:hover {
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-lg);
                }

                .outline-button {
                    border: 2px solid var(--primary-color);
                    color: var(--primary-color);
                    background: transparent;
                    padding: var(--spacing-md) var(--spacing-xl);
                    border-radius: var(--radius-lg);
                    font-weight: 600;
                    font-size: var(--font-size-base);
                    transition: all var(--transition-base);
                }

                .outline-button:hover {
                    background: var(--primary-color);
                    color: white;
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-lg);
                }

                .button-icon {
                    margin-right: var(--spacing-sm);
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .section-title {
                        font-size: var(--font-size-3xl);
                    }

                    .stats-grid {
                        margin-bottom: var(--spacing-lg);
                    }

                    .stat-card {
                        padding: var(--spacing-md);
                    }

                    .floating-element {
                        width: 50px;
                        height: 50px;
                    }

                    .primary-float {
                        right: -10px;
                    }

                    .secondary-float {
                        left: -10px;
                    }

                    .action-buttons {
                        justify-content: center;
                    }
                }

                @media (max-width: 576px) {
                    .section-title {
                        font-size: var(--font-size-2xl);
                    }

                    .profile-image-wrapper {
                        padding: var(--spacing-sm);
                    }

                    .primary-button,
                    .outline-button {
                        width: 100%;
                        justify-content: center;
                    }
                }
            `}</style>
        </section>
    );
};

export default About;