// src/components/About.jsx
import React, { useRef, useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion, useInView } from 'framer-motion';
import {
    FaCode,
    FaRocket,
    FaAward,
    FaProjectDiagram,
    FaUsers,
    FaCalendarAlt
} from 'react-icons/fa';
import LastFMNowPlaying from "./LastFMNowPlaying.jsx";

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, threshold: 0.1 });

    // Memoized animation variants
    const containerVariants = useMemo(() => ({
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }), []);

    const itemVariants = useMemo(() => ({
        hidden: {
            y: 40,
            opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    }), []);

    // Memoized stats data
    const stats = useMemo(() => [
        { icon: FaAward, value: '2+', label: 'Years Experience' },
        { icon: FaProjectDiagram, value: '20+', label: 'Projects Completed' },
        { icon: FaUsers, value: '15+', label: 'Happy Clients' },
        { icon: FaCalendarAlt, value: '100%', label: 'Meeting Deadlines' }
    ], []);

    return (
        <section
            id="about"
            ref={ref}
            className="about-section position-relative overflow-hidden"
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
                        className="section-header text-center mb-5"
                    >
                        <motion.span
                            className="section-badge"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            About Me
                        </motion.span>
                        <h2 className="section-title mb-3">
                            Crafting Digital
                            <span className="gradient-text"> Experiences</span>
                        </h2>
                        <p className="section-subtitle">
                            Passionate full-stack developer with 2+ years of experience creating
                            innovative digital solutions that drive business success
                        </p>
                    </motion.div>

                    <Row className="align-items-center gy-4">
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
                                        loading="lazy"
                                        width={400}
                                        height={400}
                                    />
                                    {/* Floating Elements */}
                                    <motion.div
                                        className="floating-element primary-float"
                                        animate={{
                                            y: [-8, 8, -8],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <FaCode size={16} />
                                    </motion.div>
                                    <motion.div
                                        className="floating-element secondary-float"
                                        animate={{
                                            y: [8, -8, 8],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 1.5
                                        }}
                                    >
                                        <FaRocket size={16} />
                                    </motion.div>
                                </div>
                            </motion.div>
                        </Col>

                        {/* Content Column */}
                        <Col lg={7}>
                            <motion.div variants={itemVariants}>
                                {/* Stats Grid */}
                                <Row className="stats-grid mb-4">
                                    {stats.map((stat, index) => (
                                        <Col key={index} xs={6} className="mb-3">
                                            <motion.div
                                                className="stat-card"
                                                whileHover={{ scale: 1.02, y: -2 }}
                                                transition={{ type: "spring", stiffness: 400 }}
                                            >
                                                <stat.icon
                                                    size={24}
                                                    className="stat-icon"
                                                />
                                                <h4 className="stat-value">{stat.value}</h4>
                                                <p className="stat-label">{stat.label}</p>
                                            </motion.div>
                                        </Col>
                                    ))}
                                </Row>

                                {/* Bio Text */}
                                <div className="bio-section mb-4">
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

                                {/* LastFM Now Playing */}
                                <LastFMNowPlaying />
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
                    padding: 5rem 0;
                }

                .background-elements {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 0;
                }

                .bg-blob {
                    position: absolute;
                    border-radius: 50%;
                    opacity: 0.03;
                    filter: blur(40px);
                }

                .primary-blob {
                    top: 10%;
                    right: 5%;
                    width: 300px;
                    height: 300px;
                    background: var(--primary-color);
                }

                .secondary-blob {
                    bottom: 20%;
                    left: 5%;
                    width: 200px;
                    height: 200px;
                    background: var(--secondary-color);
                }

                .section-header {
                    position: relative;
                    z-index: 1;
                }

                .section-badge {
                    display: inline-block;
                    background: rgba(var(--primary-rgb), 0.1);
                    color: var(--primary-color);
                    padding: 0.5rem 1.5rem;
                    border-radius: 2rem;
                    font-size: 0.875rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    border: 1px solid rgba(var(--primary-rgb), 0.2);
                    backdrop-filter: blur(10px);
                }

                .section-title {
                    font-size: clamp(2rem, 5vw, 2.5rem);
                    font-weight: 800;
                    margin-bottom: 1rem;
                    color: var(--text-color);
                    line-height: 1.2;
                }

                .gradient-text {
                    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    display: block;
                }

                .section-subtitle {
                    font-size: clamp(1rem, 2.5vw, 1.125rem);
                    color: var(--text-muted);
                    max-width: 600px;
                    margin: 0 auto;
                    line-height: 1.6;
                }

                /* Profile Section */
                .profile-column {
                    margin-bottom: 2rem;
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

                .profile-image-wrapper {
                    position: relative;
                    padding: 1rem;
                    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
                    border-radius: 2rem;
                    display: inline-block;
                    max-width: min(100%, 400px);
                }

                .profile-image {
                    border-radius: 1.25rem;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    height: auto;
                    display: block;
                }

                .floating-element {
                    position: absolute;
                    width: 40px;
                    height: 40px;
                    border-radius: 0.75rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                    z-index: 2;
                    color: white;
                }

                .primary-float {
                    top: 20%;
                    right: -12px;
                    background: var(--primary-color);
                }

                .secondary-float {
                    bottom: 30%;
                    left: -12px;
                    background: var(--secondary-color);
                }

                /* Stats Grid */
                .stats-grid {
                    margin-bottom: 2rem;
                }

                .stat-card {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 0.75rem;
                    padding: 1.25rem 1rem;
                    text-align: center;
                    transition: all 0.2s ease;
                    backdrop-filter: blur(10px);
                    height: 100%;
                }

                .stat-card:hover {
                    border-color: var(--primary-color);
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
                }

                .stat-icon {
                    color: var(--primary-color);
                    margin-bottom: 0.5rem;
                }

                .stat-value {
                    font-size: 1.375rem;
                    font-weight: 800;
                    color: var(--text-color);
                    margin-bottom: 0.25rem;
                    line-height: 1;
                }

                .stat-label {
                    color: var(--text-muted);
                    font-size: 0.8125rem;
                    margin: 0;
                    line-height: 1.3;
                }

                /* Bio Section */
                .bio-section {
                    margin-bottom: 2rem;
                }

                .bio-text {
                    color: var(--text-color);
                    line-height: 1.7;
                    margin-bottom: 1rem;
                    font-size: 1rem;
                }

                .bio-text strong {
                    color: var(--primary-color);
                    font-weight: 600;
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .about-section {
                        padding: 3rem 0;
                    }

                    .section-badge {
                        padding: 0.375rem 1.25rem;
                        font-size: 0.8rem;
                    }

                    .stats-grid {
                        margin-bottom: 1.5rem;
                    }

                    .stat-card {
                        padding: 1rem 0.75rem;
                    }

                    .stat-value {
                        font-size: 1.25rem;
                    }

                    .floating-element {
                        width: 36px;
                        height: 36px;
                    }

                    .primary-float {
                        right: -8px;
                    }

                    .secondary-float {
                        left: -8px;
                    }

                    .profile-image-wrapper {
                        padding: 0.75rem;
                        border-radius: 1.5rem;
                        max-width: min(100%, 300px);
                        margin: 0 auto;
                        display: block;
                        text-align: center;
                        width: fit-content;
                        position: relative;
                        left: 50%;
                        transform: translateX(-50%);
                    }

                    .profile-image {
                        border-radius: 1rem;
                        width: 100%;
                        max-width: 280px;
                        height: auto;
                    }
                }

                @media (max-width: 576px) {
                    .about-section {
                        padding: 2rem 0;
                    }

                    .section-title {
                        font-size: 1.75rem;
                    }

                    .bio-text {
                        font-size: 0.95rem;
                        text-align: left;
                        line-height: 1.6;
                    }

                    .stat-card {
                        padding: 0.875rem 0.5rem;
                        border-radius: 0.5rem;
                        min-height: 100px;
                    }

                    .stat-icon {
                        margin-bottom: 0.375rem;
                    }

                    .stat-value {
                        font-size: 1.125rem;
                    }

                    .stat-label {
                        font-size: 0.75rem;
                    }
                }

                @media (max-width: 480px) {
                    .profile-image-wrapper {
                        max-width: min(100%, 260px);
                        padding: 0.5rem;
                    }

                    .floating-element {
                        width: 32px;
                        height: 32px;
                    }

                    .primary-float,
                    .secondary-float {
                        display: none; /* Hide on very small screens */
                    }

                    .stats-grid .col-6 {
                        padding-left: 0.375rem;
                        padding-right: 0.375rem;
                    }
                }

                /* Reduced motion for accessibility */
                @media (prefers-reduced-motion: reduce) {
                    .floating-element {
                        animation: none;
                    }

                    .stat-card:hover {
                        transform: none;
                    }
                }
            `}</style>
        </section>
    );
};

export default React.memo(About);