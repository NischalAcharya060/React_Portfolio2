// src/components/Skills.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    FaReact,
    FaNodeJs,
    FaJs,
    FaPython,
    FaAws,
    FaGitAlt,
    FaDocker,
    FaVuejs,
    FaPhp,
    FaDatabase,
    FaMobile,
    FaCloud,
    FaRocket,
    FaCode, FaServer
} from 'react-icons/fa';
import {
    SiNextdotjs,
    SiTailwindcss,
    SiMongodb,
    SiExpress,
    SiPostgresql,
    SiTypescript,
    SiRedis,
    SiKubernetes
} from 'react-icons/si';

const AnimatedProgressBar = ({ level, color, delay = 0 }) => {
    const [animatedLevel, setAnimatedLevel] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedLevel(level);
        }, 300 + delay);
        return () => clearTimeout(timer);
    }, [level, delay]);

    return (
        <div className="progress-container">
            <div
                className="progress-background"
                style={{
                    backgroundColor: 'var(--surface-color)'
                }}
            >
                <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${animatedLevel}%` }}
                    transition={{
                        duration: 1.5,
                        delay: delay / 1000,
                        ease: "easeOut"
                    }}
                    style={{
                        backgroundColor: color,
                    }}
                />
            </div>
        </div>
    );
};

const SkillCard = ({ skill, index, isInView }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={isInView ? {
                opacity: 1,
                y: 0,
                scale: 1
            } : {
                opacity: 0,
                y: 50,
                scale: 0.9
            }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut"
            }}
            whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.2 }
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <Card
                className="h-100 border-0 skill-card position-relative overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, var(--card-bg), var(--surface-color))',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                }}
            >
                {/* Animated Background Effect */}
                <motion.div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        background: `linear-gradient(135deg, ${skill.color}15, transparent 50%)`,
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 0.3s ease'
                    }}
                />

                {/* Glow Effect */}
                <motion.div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        background: `radial-gradient(circle at center, ${skill.color}10 0%, transparent 70%)`,
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 0.3s ease'
                    }}
                />

                <Card.Body className="p-4 position-relative">
                    {/* Skill Icon */}
                    <motion.div
                        className="skill-icon-container mb-3"
                        animate={isHovered ? {
                            scale: 1.2,
                            rotate: [0, -5, 5, 0]
                        } : {
                            scale: 1,
                            rotate: 0
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <div
                            className="icon-wrapper rounded-3 p-3"
                            style={{
                                background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}10)`,
                                border: `1px solid ${skill.color}30`,
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <skill.icon
                                size={28}
                                color={skill.color}
                            />
                        </div>
                    </motion.div>

                    {/* Skill Name */}
                    <h5 className="fw-bold mb-3" style={{ color: 'var(--text-color)' }}>
                        {skill.name}
                    </h5>

                    {/* Progress Section */}
                    <div className="skill-progress">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="text-muted small text-uppercase fw-semibold">
                                Proficiency
                            </span>
                            <motion.span
                                className="fw-bold"
                                style={{ color: skill.color }}
                                animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                            >
                                {skill.level}%
                            </motion.span>
                        </div>

                        <AnimatedProgressBar
                            level={skill.level}
                            color={skill.color}
                            delay={index * 100}
                        />
                    </div>

                    {/* Experience Level */}
                    <motion.div
                        className="experience-level mt-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0.7 }}
                    >
                        <span
                            className="badge rounded-pill px-3 py-2"
                            style={{
                                backgroundColor: `${skill.color}15`,
                                color: skill.color,
                                border: `1px solid ${skill.color}30`,
                                fontSize: '0.75rem',
                                fontWeight: 600
                            }}
                        >
                            {skill.experience}
                        </span>
                    </motion.div>
                </Card.Body>
            </Card>
        </motion.div>
    );
};

const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, threshold: 0.1 });

    const skillCategories = [
        {
            title: "Frontend",
            icon: FaCode,
            skills: [
                { name: 'React', level: 90, icon: FaReact, color: '#61DAFB', experience: '3+ Years' },
                { name: 'Vue.js', level: 80, icon: FaVuejs, color: '#4FC08D', experience: '2+ Years' },
                { name: 'TypeScript', level: 85, icon: SiTypescript, color: '#3178C6', experience: '2+ Years' },
                { name: 'Next.js', level: 75, icon: SiNextdotjs, color: '#000000', experience: '1+ Year' },
                { name: 'Tailwind CSS', level: 88, icon: SiTailwindcss, color: '#06B6D4', experience: '2+ Years' }
            ]
        },
        {
            title: "Backend",
            icon: FaServer,
            skills: [
                { name: 'Node.js', level: 85, icon: FaNodeJs, color: '#339933', experience: '3+ Years' },
                { name: 'Python', level: 75, icon: FaPython, color: '#3776AB', experience: '2+ Years' },
                { name: 'PHP', level: 70, icon: FaPhp, color: '#777BB4', experience: '2+ Years' },
                { name: 'Express.js', level: 82, icon: SiExpress, color: '#000000', experience: '3+ Years' },
                { name: 'PostgreSQL', level: 78, icon: SiPostgresql, color: '#4169E1', experience: '2+ Years' }
            ]
        },
        {
            title: "Tools & DevOps",
            icon: FaRocket,
            skills: [
                { name: 'AWS', level: 70, icon: FaAws, color: '#FF9900', experience: '2+ Years' },
                { name: 'Docker', level: 65, icon: FaDocker, color: '#2496ED', experience: '1+ Year' },
                { name: 'Kubernetes', level: 60, icon: SiKubernetes, color: '#326CE5', experience: '1+ Year' },
                { name: 'Git', level: 85, icon: FaGitAlt, color: '#F05032', experience: '3+ Years' },
                { name: 'Redis', level: 72, icon: SiRedis, color: '#DC382D', experience: '1+ Year' }
            ]
        }
    ];

    const [activeCategory, setActiveCategory] = useState(0);

    return (
        <section
            id="skills"
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
                        top: '10%',
                        left: '10%',
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
                        bottom: '20%',
                        right: '10%',
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
                    <span className="section-badge">Skills</span>
                    <h2 className="display-4 fw-bold mb-3">
                        Technical
                        <span className="gradient-text"> Expertise</span>
                    </h2>
                    <p className="lead text-muted max-w-600 mx-auto">
                        A comprehensive overview of my technical skills and proficiency levels across different domains
                    </p>
                </motion.div>

                {/* Category Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-center mb-5"
                >
                    <div className="category-tabs d-flex flex-wrap justify-content-center gap-3">
                        {skillCategories.map((category, index) => (
                            <motion.button
                                key={category.title}
                                onClick={() => setActiveCategory(index)}
                                className={`category-tab ${activeCategory === index ? 'active' : ''}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <category.icon className="me-2" size={16} />
                                {category.title}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Skills Grid */}
                <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Row className="g-4">
                        {skillCategories[activeCategory].skills.map((skill, index) => (
                            <Col key={skill.name} xl={4} lg={6} md={6}>
                                <SkillCard
                                    skill={skill}
                                    index={index}
                                    isInView={isInView}
                                />
                            </Col>
                        ))}
                    </Row>
                </motion.div>
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

                    .category-tabs {
                        gap: 1rem;
                    }

                    .category-tab {
                        padding: 0.75rem 1.5rem;
                        border: 2px solid var(--border-color);
                        background: transparent;
                        color: var(--text-muted);
                        border-radius: 50px;
                        font-weight: 600;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                    }

                    .category-tab.active {
                        background: var(--primary-color);
                        border-color: var(--primary-color);
                        color: white;
                    }

                    .category-tab:not(.active):hover {
                        border-color: var(--primary-color);
                        color: var(--primary-color);
                        background: rgba(var(--primary-rgb), 0.1);
                    }

                    .skill-card {
                        transition: all 0.3s ease;
                        border: 1px solid var(--border-color);
                    }

                    .skill-card:hover {
                        border-color: var(--primary-color);
                        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    }

                    .progress-container {
                        width: 100%;
                        background: var(--surface-color);
                        border-radius: 10px;
                        overflow: hidden;
                        position: relative;
                    }

                    .progress-background {
                        width: 100%;
                        height: 8px;
                        border-radius: 10px;
                        overflow: hidden;
                        position: relative;
                    }

                    .progress-fill {
                        height: 100%;
                        border-radius: 10px;
                        position: relative;
                        transition: width 1.5s ease-in-out;
                    }

                    .progress-fill::after {
                        content: '';
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        width: 20px;
                        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                        animation: shimmer 2s infinite;
                    }

                    @keyframes shimmer {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(400%); }
                    }

                    .icon-wrapper {
                        transition: all 0.3s ease;
                    }

                    .skill-card:hover .icon-wrapper {
                        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                    }
                `}
            </style>
        </section>
    );
};

export default Skills;