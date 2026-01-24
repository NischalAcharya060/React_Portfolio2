// src/components/About.jsx
import React, { useRef, useMemo } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { motion, useInView } from 'framer-motion';
import {
    FaCode,
    FaRocket,
    FaAward,
    FaProjectDiagram,
    FaUsers,
    FaCalendarAlt,
    FaFilePdf,
    FaExternalLinkAlt
} from 'react-icons/fa';
import SpotifyNowPlaying from "./SpotifyNowPlaying.jsx";

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, threshold: 0.1 });

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

    const stats = useMemo(() => [
        { icon: FaAward, value: '2+', label: 'Years Experience' },
        { icon: FaProjectDiagram, value: '20+', label: 'Projects Completed' },
        { icon: FaUsers, value: '15+', label: 'Happy Clients' },
        { icon: FaCalendarAlt, value: '100%', label: 'Meeting Deadlines' }
    ], []);

    const atsCvLink = "https://drive.google.com/file/d/13Hpnc1T2HXvxL-lyV54t3M7jbtFD3tC3/view?usp=sharing";
    const normalCvLink = "https://drive.google.com/file/d/1koGD_UgyC7B-edJr0ODyna0KpFiOQ70n/view?usp=sharing";

    return (
        <section
            id="about"
            ref={ref}
            className="about-section position-relative overflow-hidden"
        >
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

                            <motion.div
                                variants={itemVariants}
                                className="spotify-wrapper"
                            >
                                <SpotifyNowPlaying/>
                            </motion.div>
                        </Col>

                        <Col lg={7}>
                            <motion.div variants={itemVariants} className="content-wrapper">
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

                                <div className="bio-section mb-4">
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

                                <div className="cv-buttons-section mt-5">
                                    <div className="cv-header d-flex align-items-center mb-3">
                                        <FaFilePdf className="me-2" style={{ color: '#FF6B6B', fontSize: '1.25rem' }} />
                                        <h4 className="mb-0" style={{ color: 'var(--text-color, #fff)' }}>
                                            View My Resume
                                        </h4>
                                    </div>
                                    <p className="mb-4" style={{ fontSize: '0.9rem'}}>
                                        Choose the resume format that best suits your needs
                                    </p>

                                    <div className="d-flex flex-wrap gap-3">
                                        <motion.div
                                            whileHover={{ scale: 1.03, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <button
                                                className="cv-btn cv-btn-primary"
                                                onClick={() => window.open(normalCvLink, "_blank")}
                                            >
                                                <FaFilePdf className="me-2" />
                                                View Standard CV
                                                <FaExternalLinkAlt className="ms-2" size={12} />
                                            </button>
                                        </motion.div>

                                        <motion.div
                                            whileHover={{ scale: 1.03, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <button
                                                className="cv-btn cv-btn-secondary"
                                                onClick={() => window.open(atsCvLink, "_blank")}
                                            >
                                                <FaFilePdf className="me-2" />
                                                View ATS Optimized CV
                                                <FaExternalLinkAlt className="ms-2" size={12} />
                                            </button>
                                        </motion.div>
                                    </div>

                                    <div className="cv-tips mt-3">
                                        <div className="row g-2">
                                            <div className="col-md-6">
                                                <div className="d-flex align-items-center" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                                    <div className="tip-dot me-2" style={{ backgroundColor: 'var(--primary-color)' }} />
                                                    <span>Standard CV: Visual & detailed</span>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="d-flex align-items-center" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                                    <div className="tip-dot me-2" style={{ backgroundColor: '#10B981' }} />
                                                    <span>ATS CV: Keyword optimized</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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

                .cv-buttons-section {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 16px;
                    padding: 2rem;
                    transition: all 0.3s ease;
                }

                .cv-buttons-section:hover {
                    background: rgba(255, 255, 255, 0.03);
                    border-color: rgba(var(--primary-rgb, 99, 102, 241), 0.2);
                }

                .cv-btn {
                    padding: 0.875rem 1.75rem;
                    border-radius: 12px;
                    border: none;
                    font-weight: 600;
                    font-size: 0.95rem;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    min-width: 200px;
                }

                .cv-btn-primary {
                    background: linear-gradient(135deg, var(--primary-color, #6366f1), var(--secondary-color, #a855f7));
                    color: white;
                    box-shadow: 0 4px 15px rgba(var(--primary-rgb, 99, 102, 241), 0.2);
                }

                .cv-btn-primary:hover {
                    background: linear-gradient(135deg, var(--primary-color-dark, #4f46e5), var(--secondary-color-dark, #9333ea));
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(var(--primary-rgb, 99, 102, 241), 0.3);
                }

                .cv-btn-secondary {
                    background: linear-gradient(135deg, #10B981, #059669);
                    color: white;
                    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.2);
                }

                .cv-btn-secondary:hover {
                    background: linear-gradient(135deg, #0DA271, #047857);
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
                }

                .tip-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    display: inline-block;
                }

                @media (max-width: 991px) {
                    .profile-column {
                        margin-bottom: 1rem;
                    }
                }

                @media (max-width: 768px) {
                    .cv-buttons-section {
                        padding: 1.5rem;
                    }

                    .cv-btn {
                        min-width: 100%;
                    }

                    .d-flex.flex-wrap {
                        flex-direction: column;
                        gap: 1rem !important;
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

                    .cv-buttons-section {
                        padding: 1.25rem;
                    }

                    .cv-btn {
                        padding: 0.75rem 1.5rem;
                        font-size: 0.9rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default React.memo(About);