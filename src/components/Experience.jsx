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
    FaChevronDown,
    FaLaptopCode,
    FaStar,
    FaGitAlt,
    FaUserTie
} from 'react-icons/fa';

// Import data
import { experiences, experienceStats } from '../data/experience.js';

const Experience = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, threshold: 0.1 });
    const [expandedItems, setExpandedItems] = useState({});

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
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: {
            y: 50,
            opacity: 0,
            scale: 0.95
        },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1]
            }
        }
    };

    const statsVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                delay: 0.5
            }
        }
    };

    const getRoleIcon = (role) => {
        switch (role.toLowerCase()) {
            case 'internship':
                return FaUserTie;
            case 'freelance':
                return FaLaptopCode;
            case 'volunteer':
                return FaGitAlt;
            default:
                return FaBriefcase;
        }
    };

    return (
        <section
            id="experience"
            ref={ref}
            className="experience-section section-padding position-relative overflow-hidden"
        >
            {/* Animated Background Elements */}
            <div className="background-elements">
                <motion.div
                    className="bg-blob primary-blob"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.03, 0.05, 0.03],
                        x: [0, 20, 0]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="bg-blob secondary-blob"
                    animate={{
                        scale: [1.1, 1, 1.1],
                        opacity: [0.04, 0.02, 0.04],
                        y: [0, -15, 0]
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
                <motion.div
                    className="bg-blob accent-blob"
                    animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.02, 0.04, 0.02],
                        rotate: [0, 5, 0]
                    }}
                    transition={{
                        duration: 9,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />
            </div>

            <Container>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="section-header text-center mb-6"
                >
                    <motion.span
                        className="section-badge"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        Career Journey
                    </motion.span>
                    <h2 className="section-title gradient-heading mb-4">
                        Professional
                        <span className="gradient-text"> Experience</span>
                    </h2>
                    <p className="section-subtitle">
                        My journey through various roles and projects that shaped my skills and expertise
                    </p>
                </motion.div>

                {/* Experience Stats */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="experience-stats mb-6"
                >
                    <Row className="g-4">
                        <Col lg={3} md={6}>
                            <motion.div
                                variants={statsVariants}
                                className="stat-card text-center"
                            >
                                <div className="stat-icon years">
                                    <FaCalendarAlt size={24} />
                                </div>
                                <h3 className="stat-value">{experienceStats.totalYears}</h3>
                                <p className="stat-label">Years Experience</p>
                            </motion.div>
                        </Col>
                        <Col lg={3} md={6}>
                            <motion.div
                                variants={statsVariants}
                                className="stat-card text-center"
                            >
                                <div className="stat-icon projects">
                                    <FaCode size={24} />
                                </div>
                                <h3 className="stat-value">{experienceStats.completedProjects}</h3>
                                <p className="stat-label">Projects Completed</p>
                            </motion.div>
                        </Col>
                        <Col lg={3} md={6}>
                            <motion.div
                                variants={statsVariants}
                                className="stat-card text-center"
                            >
                                <div className="stat-icon clients">
                                    <FaUsers size={24} />
                                </div>
                                <h3 className="stat-value">{experienceStats.happyClients}</h3>
                                <p className="stat-label">Happy Clients</p>
                            </motion.div>
                        </Col>
                        <Col lg={3} md={6}>
                            <motion.div
                                variants={statsVariants}
                                className="stat-card text-center"
                            >
                                <div className="stat-icon technologies">
                                    <FaLaptopCode size={24} />
                                </div>
                                <h3 className="stat-value">{experienceStats.technologies}</h3>
                                <p className="stat-label">Technologies</p>
                            </motion.div>
                        </Col>
                    </Row>
                </motion.div>

                {/* Timeline */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="timeline-container"
                >
                    <div className="timeline">
                        {experiences.map((exp, index) => {
                            const RoleIcon = getRoleIcon(exp.type);
                            return (
                                <motion.div
                                    key={exp.id}
                                    variants={itemVariants}
                                    className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                                >
                                    {/* Timeline Content */}
                                    <motion.div
                                        className="timeline-content"
                                        whileHover={{
                                            y: -5,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        <div className="experience-card">
                                            {/* Card Header */}
                                            <div className="card-header">
                                                <div className="company-info">
                                                    <div className="company-logo">
                                                        <RoleIcon size={24} />
                                                    </div>
                                                    <div className="company-details">
                                                        <h4 className="role-title">{exp.role}</h4>
                                                        <div className="company-meta">
                                                            <span className="company-name">{exp.company}</span>
                                                            <Badge className="role-type">{exp.type}</Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="duration-badge">
                                                    <FaCalendarAlt className="me-2" size={12} />
                                                    {exp.duration}
                                                </div>
                                            </div>

                                            {/* Card Body */}
                                            <div className="card-body">
                                                <div className="experience-meta">
                                                    <div className="meta-item">
                                                        <FaMapMarkerAlt size={14} />
                                                        <span>{exp.location}</span>
                                                    </div>
                                                    <div className="meta-item">
                                                        <FaCode size={14} />
                                                        <span>{exp.projects} Projects</span>
                                                    </div>
                                                    <div className="meta-item">
                                                        <FaUsers size={14} />
                                                        <span>Team: {exp.teamSize}</span>
                                                    </div>
                                                </div>

                                                <p className="experience-description">
                                                    {exp.description}
                                                </p>

                                                {/* Technologies */}
                                                <div className="technologies-section">
                                                    <h6>Technologies Used</h6>
                                                    <div className="tech-tags">
                                                        {exp.technologies.map((tech, techIndex) => (
                                                            <motion.span
                                                                key={tech}
                                                                className="tech-tag"
                                                                initial={{ scale: 0, opacity: 0 }}
                                                                animate={{ scale: 1, opacity: 1 }}
                                                                transition={{
                                                                    delay: techIndex * 0.1,
                                                                    type: "spring",
                                                                    stiffness: 500
                                                                }}
                                                                whileHover={{
                                                                    scale: 1.05,
                                                                    y: -1,
                                                                    transition: { duration: 0.2 }
                                                                }}
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
                                                            className="achievements-section"
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            <h6 className="achievements-title">
                                                                <FaAward className="me-2" />
                                                                Key Achievements
                                                            </h6>
                                                            <ul className="achievements-list">
                                                                {exp.achievements.map((achievement, idx) => (
                                                                    <motion.li
                                                                        key={idx}
                                                                        className="achievement-item"
                                                                        initial={{ opacity: 0, x: -20 }}
                                                                        animate={{ opacity: 1, x: 0 }}
                                                                        transition={{ delay: idx * 0.1 }}
                                                                    >
                                                                        <span className="achievement-bullet">●</span>
                                                                        <span>{achievement}</span>
                                                                    </motion.li>
                                                                ))}
                                                            </ul>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            {/* Expand Button */}
                                            <motion.div
                                                className="card-footer"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <button
                                                    className="expand-btn"
                                                    onClick={() => toggleExpanded(exp.id)}
                                                >
                                                    <FaChevronDown
                                                        className={`expand-icon ${expandedItems[exp.id] ? 'expanded' : ''}`}
                                                        size={14}
                                                    />
                                                    {expandedItems[exp.id] ? 'Show Less' : 'View Achievements'}
                                                </button>
                                            </motion.div>
                                        </div>
                                    </motion.div>

                                    {/* Timeline Dot */}
                                    <div className="timeline-dot">
                                        <div className="dot-inner"></div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </Container>

            <style jsx>{`
                .experience-section {
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
                    filter: blur(40px);
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
                    width: 250px;
                    height: 250px;
                    background: radial-gradient(circle, var(--secondary-color) 0%, transparent 70%);
                }

                .accent-blob {
                    top: 60%;
                    right: 15%;
                    width: 200px;
                    height: 200px;
                    background: radial-gradient(circle, var(--accent-color) 0%, transparent 70%);
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
                    padding: 0.6rem 1.8rem;
                    border-radius: 50px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                    text-transform: uppercase;
                    letter-spacing: 1.2px;
                    border: 1px solid rgba(var(--primary-rgb), 0.2);
                    backdrop-filter: blur(10px);
                    cursor: default;
                }

                .section-title {
                    font-size: 3rem;
                    font-weight: 800;
                    margin-bottom: 1rem;
                    background: linear-gradient(135deg, var(--text-color) 0%, var(--text-muted) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .gradient-text {
                    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .section-subtitle {
                    font-size: 1.1rem;
                    color: var(--text-muted);
                    max-width: 600px;
                    margin: 0 auto;
                    line-height: 1.7;
                }

                /* Experience Stats */
                .experience-stats {
                    position: relative;
                    z-index: 2;
                }

                .stat-card {
                    background: var(--card-bg);
                    border: 1px solid var(--border-color);
                    border-radius: 16px;
                    padding: 2rem 1rem;
                    backdrop-filter: blur(10px);
                    transition: all 0.3s ease;
                }

                .stat-card:hover {
                    border-color: var(--primary-color);
                    transform: translateY(-5px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                }

                .stat-icon {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1rem;
                    background: rgba(var(--primary-rgb), 0.1);
                    color: var(--primary-color);
                }

                .stat-icon.years { background: rgba(34, 197, 94, 0.1); color: #22c55e; }
                .stat-icon.projects { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
                .stat-icon.clients { background: rgba(168, 85, 247, 0.1); color: #a855f7; }
                .stat-icon.technologies { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }

                .stat-value {
                    font-size: 2.5rem;
                    font-weight: 800;
                    color: var(--text-color);
                    margin-bottom: 0.5rem;
                }

                .stat-label {
                    color: var(--text-muted);
                    font-weight: 600;
                    margin: 0;
                }

                /* Timeline */
                .timeline-container {
                    position: relative;
                    z-index: 2;
                }

                .timeline {
                    position: relative;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .timeline::before {
                    content: '';
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 2px;
                    height: 100%;
                    background: linear-gradient(to bottom, 
                        transparent, 
                        var(--primary-color), 
                        var(--secondary-color), 
                        transparent);
                }

                .timeline-item {
                    position: relative;
                    margin-bottom: 4rem;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }

                .timeline-item.left {
                    justify-content: flex-start;
                    padding-right: 50%;
                }

                .timeline-item.right {
                    justify-content: flex-end;
                    padding-left: 50%;
                }

                .timeline-content {
                    width: 90%;
                    max-width: 500px;
                }

                .experience-card {
                    background: var(--card-bg);
                    border: 1px solid var(--border-color);
                    border-radius: 20px;
                    overflow: hidden;
                    backdrop-filter: blur(10px);
                    transition: all 0.3s ease;
                    position: relative;
                }

                .experience-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .experience-card:hover::before {
                    opacity: 1;
                }

                .experience-card:hover {
                    border-color: var(--primary-color);
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
                    transform: translateY(-5px);
                }

                .card-header {
                    padding: 1.5rem 1.5rem 1rem;
                    border-bottom: 1px solid var(--border-color);
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: 1rem;
                }

                .company-info {
                    display: flex;
                    align-items: flex-start;
                    gap: 1rem;
                    flex: 1;
                }

                .company-logo {
                    width: 50px;
                    height: 50px;
                    border-radius: 12px;
                    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    flex-shrink: 0;
                }

                .company-details {
                    flex: 1;
                }

                .role-title {
                    font-size: 1.3rem;
                    font-weight: 700;
                    color: var(--text-color);
                    margin-bottom: 0.5rem;
                    line-height: 1.3;
                }

                .company-meta {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    flex-wrap: wrap;
                }

                .company-name {
                    color: var(--primary-color);
                    font-weight: 600;
                    font-size: 1rem;
                }

                .role-type {
                    background: rgba(var(--primary-rgb), 0.1);
                    color: var(--text-color);
                    border: none;
                    font-size: 0.75rem;
                    font-weight: 600;
                    padding: 0.3rem 0.8rem;
                    border-radius: 20px;
                }

                .duration-badge {
                    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 25px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    flex-shrink: 0;
                }

                .card-body {
                    padding: 1.5rem;
                }

                .experience-meta {
                    display: flex;
                    gap: 1.5rem;
                    margin-bottom: 1.2rem;
                    flex-wrap: wrap;
                }

                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--text-muted);
                    font-size: 0.9rem;
                }

                .experience-description {
                    color: var(--text-color);
                    line-height: 1.7;
                    margin-bottom: 1.5rem;
                    font-size: 0.95rem;
                }

                .technologies-section {
                    margin-bottom: 1.5rem;
                }

                .technologies-section h6 {
                    color: var(--text-muted);
                    font-weight: 600;
                    margin-bottom: 0.8rem;
                    font-size: 0.9rem;
                }

                .tech-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }

                .tech-tag {
                    background: rgba(var(--primary-rgb), 0.1);
                    color: var(--primary-color);
                    padding: 0.4rem 0.8rem;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    border: 1px solid rgba(var(--primary-rgb), 0.2);
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                }

                .tech-tag:hover {
                    background: var(--primary-color);
                    color: white;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.3);
                }

                .achievements-section {
                    margin-top: 1.5rem;
                    padding-top: 1.5rem;
                    border-top: 1px solid var(--border-color);
                }

                .achievements-title {
                    color: var(--text-color);
                    font-weight: 600;
                    margin-bottom: 1rem;
                    display: flex;
                    align-items: center;
                    font-size: 1rem;
                }

                .achievements-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .achievement-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.8rem;
                    margin-bottom: 0.8rem;
                    color: var(--text-color);
                    line-height: 1.5;
                }

                .achievement-bullet {
                    color: var(--primary-color);
                    font-size: 8px;
                    margin-top: 0.5rem;
                    flex-shrink: 0;
                }

                .card-footer {
                    padding: 1rem 1.5rem;
                    border-top: 1px solid var(--border-color);
                    text-align: center;
                }

                .expand-btn {
                    background: transparent;
                    border: 1px solid var(--border-color);
                    color: var(--text-muted);
                    padding: 0.7rem 1.5rem;
                    border-radius: 25px;
                    font-weight: 600;
                    font-size: 0.9rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    margin: 0 auto;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .expand-btn:hover {
                    border-color: var(--primary-color);
                    color: var(--primary-color);
                    background: rgba(var(--primary-rgb), 0.05);
                }

                .expand-icon {
                    transition: transform 0.3s ease;
                }

                .expand-icon.expanded {
                    transform: rotate(180deg);
                }

                .timeline-dot {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 20px;
                    height: 20px;
                    background: var(--background-color);
                    border: 3px solid var(--primary-color);
                    border-radius: 50%;
                    z-index: 2;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .dot-inner {
                    width: 8px;
                    height: 8px;
                    background: var(--primary-color);
                    border-radius: 50%;
                }

                /* Responsive Design */
                @media (max-width: 992px) {
                    .timeline::before {
                        left: 30px;
                    }

                    .timeline-item {
                        justify-content: flex-start !important;
                        padding: 0 0 0 60px !important;
                    }

                    .timeline-dot {
                        left: 20px;
                    }

                    .timeline-content {
                        width: 100%;
                    }
                }

                @media (max-width: 768px) {
                    .section-title {
                        font-size: 2.2rem;
                    }

                    .card-header {
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .duration-badge {
                        align-self: flex-start;
                    }

                    .experience-meta {
                        gap: 1rem;
                    }

                    .company-info {
                        flex-direction: column;
                        gap: 0.8rem;
                    }

                    .company-logo {
                        width: 40px;
                        height: 40px;
                    }

                    .role-title {
                        font-size: 1.1rem;
                    }
                }

                @media (max-width: 576px) {
                    .section-title {
                        font-size: 1.8rem;
                    }

                    .stat-card {
                        padding: 1.5rem 0.5rem;
                    }

                    .stat-value {
                        font-size: 2rem;
                    }

                    .card-body,
                    .card-header,
                    .card-footer {
                        padding: 1rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default Experience;