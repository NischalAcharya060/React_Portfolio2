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
import SpotifyNowPlaying from "./SpotifyNowPlaying.jsx";

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
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
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

            <Container className="position-relative z-2">
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
                            whileHover={{ scale: 1.05 }}
                        >
                            About Me
                        </motion.span>
                        <h2 className="section-title mt-3 mb-3">
                            Crafting Digital{' '}
                            <span className="gradient-text">Experiences</span>
                        </h2>
                        <p className="section-subtitle mx-auto">
                            Passionate full-stack developer with 2+ years of experience creating
                            innovative digital solutions that drive business success.
                        </p>
                    </motion.div>

                    <Row className="align-items-center gy-5">
                        {/* LEFT COLUMN: Profile Image + Spotify */}
                        <Col lg={5} className="profile-column d-flex flex-column align-items-center">
                            <motion.div
                                variants={itemVariants}
                                className="profile-container mb-4"
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

                                    {/* Floating Icons */}
                                    <motion.div
                                        className="floating-element primary-float"
                                        animate={{ y: [-8, 8, -8] }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <FaCode size={18} />
                                    </motion.div>

                                    <motion.div
                                        className="floating-element secondary-float"
                                        animate={{ y: [8, -8, 8] }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 1.5
                                        }}
                                    >
                                        <FaRocket size={18} />
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Spotify Component - Centered and matched width */}
                            <motion.div
                                variants={itemVariants}
                                className="spotify-wrapper"
                            >
                                <SpotifyNowPlaying/>
                            </motion.div>
                        </Col>

                        {/* RIGHT COLUMN: Stats + Bio */}
                        <Col lg={7}>
                            <motion.div variants={itemVariants} className="content-wrapper">
                                {/* Stats Grid */}
                                <Row className="stats-grid g-3 mb-4">
                                    {stats.map((stat, index) => (
                                        <Col key={index} xs={6} sm={6}>
                                            <motion.div
                                                className="stat-card h-100"
                                                whileHover={{ scale: 1.02, y: -5 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <stat.icon size={24} className="stat-icon" />
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
                                        code and creating user-centric solutions.
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
                    background: var(--background-color, #0f0f0f);
                    position: relative;
                    padding: 5rem 0;
                    overflow: hidden;
                }

                .z-2 { z-index: 2; }

                /* Background Blobs */
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
                    opacity: 0.04;
                    filter: blur(60px);
                }

                .primary-blob {
                    top: -10%;
                    right: -5%;
                    width: 400px;
                    height: 400px;
                    background: var(--primary-color, #6366f1);
                }

                .secondary-blob {
                    bottom: -10%;
                    left: -5%;
                    width: 300px;
                    height: 300px;
                    background: var(--secondary-color, #a855f7);
                }

                /* Header Styles */
                .section-header {
                    position: relative;
                    z-index: 2;
                }

                .section-badge {
                    display: inline-block;
                    background: rgba(var(--primary-rgb, 99, 102, 241), 0.1);
                    color: var(--primary-color, #6366f1);
                    padding: 0.5rem 1.25rem;
                    border-radius: 2rem;
                    font-size: 0.85rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    border: 1px solid rgba(var(--primary-rgb, 99, 102, 241), 0.2);
                }

                .section-title {
                    font-size: clamp(2rem, 5vw, 2.75rem);
                    font-weight: 800;
                    color: var(--text-color, #ffffff);
                    line-height: 1.2;
                }

                .gradient-text {
                    background: linear-gradient(135deg, var(--primary-color, #6366f1) 0%, var(--secondary-color, #a855f7) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    display: inline-block;
                }

                .section-subtitle {
                    font-size: clamp(1rem, 2.5vw, 1.1rem);
                    color: var(--text-muted, #9ca3af);
                    max-width: 650px;
                    line-height: 1.6;
                }

                /* Profile Image Styles */
                .profile-container {
                    position: relative;
                    width: 100%;
                    max-width: 400px;
                    display: flex;
                    justify-content: center;
                }

                .profile-image-wrapper {
                    position: relative;
                    padding: 10px;
                    background: linear-gradient(135deg, rgba(var(--primary-rgb, 99, 102, 241), 0.3), rgba(var(--secondary-rgb, 168, 85, 247), 0.3));
                    border-radius: 2rem;
                    width: 100%;
                }

                .profile-image {
                    border-radius: 1.5rem;
                    width: 100%;
                    height: auto;
                    aspect-ratio: 1/1;
                    object-fit: cover;
                    display: block;
                    background: #1a1a1a;
                }

                .spotify-wrapper {
                    width: 100%;
                    max-width: 400px;
                }

                /* Floating Icons */
                .floating-element {
                    position: absolute;
                    width: 45px;
                    height: 45px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                    z-index: 3;
                    color: white;
                    backdrop-filter: blur(5px);
                }

                .primary-float {
                    top: 15%;
                    right: -15px;
                    background: var(--primary-color, #6366f1);
                }

                .secondary-float {
                    bottom: 15%;
                    left: -15px;
                    background: var(--secondary-color, #a855f7);
                }

                /* Stats Cards */
                .stat-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 1rem;
                    padding: 1.5rem 1rem;
                    text-align: center;
                    transition: all 0.3s ease;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .stat-card:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(var(--primary-rgb, 99, 102, 241), 0.3);
                    transform: translateY(-5px);
                }

                .stat-icon {
                    color: var(--primary-color, #6366f1);
                    margin-bottom: 0.75rem;
                }

                .stat-value {
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: var(--text-color, #fff);
                    margin-bottom: 0.25rem;
                }

                .stat-label {
                    color: var(--text-muted, #9ca3af);
                    font-size: 0.85rem;
                    margin: 0;
                    font-weight: 500;
                }

                /* Bio Text */
                .bio-text {
                    color: var(--text-muted, #d1d5db);
                    line-height: 1.8;
                    margin-bottom: 1rem;
                    font-size: 1.05rem;
                }

                .bio-text strong {
                    color: var(--text-color, #fff);
                    font-weight: 600;
                }

                /* Responsive Adjustments */
                @media (max-width: 991px) {
                    .profile-column {
                        margin-bottom: 1rem;
                    }
                }

                @media (max-width: 576px) {
                    .about-section {
                        padding: 3rem 0;
                    }

                    .profile-container, .spotify-wrapper {
                        max-width: 320px;
                    }

                    .floating-element {
                        width: 36px;
                        height: 36px;
                    }

                    .primary-float { right: -5px; }
                    .secondary-float { left: -5px; }

                    .stat-card {
                        padding: 1rem 0.5rem;
                    }

                    .stat-value {
                        font-size: 1.25rem;
                    }

                    .bio-text {
                        font-size: 0.95rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default React.memo(About);