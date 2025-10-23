// src/components/Skills.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

// Import data from external file
import { skillCategories, skillsStats } from '../data/skills.js';

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
            <div className="progress-background">
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
            <Card className="skill-card">
                {/* Animated Background Effect */}
                <motion.div
                    className="skill-background"
                    style={{
                        background: `linear-gradient(135deg, ${skill.color}15, transparent 50%)`,
                        opacity: isHovered ? 1 : 0,
                    }}
                />

                {/* Glow Effect */}
                <motion.div
                    className="skill-glow"
                    style={{
                        background: `radial-gradient(circle at center, ${skill.color}10 0%, transparent 70%)`,
                        opacity: isHovered ? 1 : 0,
                    }}
                />

                <Card.Body className="skill-card-body">
                    {/* Skill Icon */}
                    <motion.div
                        className="skill-icon-container"
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
                            className="icon-wrapper"
                            style={{
                                background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}10)`,
                                border: `1px solid ${skill.color}30`,
                            }}
                        >
                            <skill.icon
                                size={28}
                                color={skill.color}
                            />
                        </div>
                    </motion.div>

                    {/* Skill Name */}
                    <h5 className="skill-name">
                        {skill.name}
                    </h5>

                    {/* Skill Description */}
                    <motion.p
                        className="skill-description"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                            opacity: isHovered ? 1 : 0.7,
                            height: 'auto'
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {skill.description}
                    </motion.p>

                    {/* Progress Section */}
                    <div className="skill-progress">
                        <div className="progress-header">
                            <span className="progress-label">
                                Proficiency
                            </span>
                            <motion.span
                                className="progress-percentage"
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
                        className="experience-level"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0.7 }}
                    >
                        <span
                            className="experience-badge"
                            style={{
                                backgroundColor: `${skill.color}15`,
                                color: skill.color,
                                border: `1px solid ${skill.color}30`,
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
    const [activeCategory, setActiveCategory] = useState(0);

    return (
        <section
            id="skills"
            ref={ref}
            className="skills-section section-padding position-relative overflow-hidden"
        >
            {/* Background Elements */}
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
                        Technical Skills
                    </motion.span>
                    <h2 className="section-title gradient-heading mb-4">
                        My Technical
                        <span className="gradient-text"> Expertise</span>
                    </h2>
                    <p className="section-subtitle">
                        A comprehensive overview of my technical skills and proficiency levels across different domains
                    </p>
                </motion.div>

                {/* Skills Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="skills-stats mb-6"
                >
                    <Row className="g-4">
                        <Col lg={3} md={6}>
                            <div className="stat-card text-center">
                                <div className="stat-icon total-skills">
                                    <span className="stat-number">{skillsStats.totalSkills}</span>
                                </div>
                                <p className="stat-label">Total Skills</p>
                            </div>
                        </Col>
                        <Col lg={3} md={6}>
                            <div className="stat-card text-center">
                                <div className="stat-icon years-exp">
                                    <span className="stat-number">{skillsStats.yearsExperience}</span>
                                </div>
                                <p className="stat-label">Years Experience</p>
                            </div>
                        </Col>
                        <Col lg={3} md={6}>
                            <div className="stat-card text-center">
                                <div className="stat-icon projects">
                                    <span className="stat-number">{skillsStats.projectsCompleted}</span>
                                </div>
                                <p className="stat-label">Projects Completed</p>
                            </div>
                        </Col>
                        <Col lg={3} md={6}>
                            <div className="stat-card text-center">
                                <div className="stat-icon technologies">
                                    <span className="stat-number">{skillsStats.technologiesMastered}</span>
                                </div>
                                <p className="stat-label">Technologies Mastered</p>
                            </div>
                        </Col>
                    </Row>
                </motion.div>

                {/* Category Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="category-tabs-container mb-6"
                >
                    <div className="category-tabs">
                        {skillCategories.map((category, index) => {
                            const CategoryIcon = category.icon;
                            return (
                                <motion.button
                                    key={category.id}
                                    onClick={() => setActiveCategory(index)}
                                    className={`category-tab ${activeCategory === index ? 'active' : ''}`}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <CategoryIcon className="tab-icon" size={18} />
                                    <span className="tab-label">{category.title}</span>
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Category Description */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="category-description text-center mb-5"
                >
                    <p className="category-desc-text">
                        {skillCategories[activeCategory].description}
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
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

            <style jsx>{`
                .skills-section {
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
                    left: 10%;
                    width: 200px;
                    height: 200px;
                    background: radial-gradient(circle, var(--primary-color) 0%, transparent 70%);
                }

                .secondary-blob {
                    bottom: 20%;
                    right: 10%;
                    width: 150px;
                    height: 150px;
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

                /* Skills Stats */
                .skills-stats {
                    position: relative;
                    z-index: 2;
                }

                .stat-card {
                    background: var(--card-bg);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-lg);
                    padding: var(--spacing-lg);
                    backdrop-filter: blur(10px);
                    transition: all var(--transition-base);
                }

                .stat-card:hover {
                    border-color: var(--primary-color);
                    transform: translateY(-5px);
                    box-shadow: var(--shadow-lg);
                }

                .stat-icon {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto var(--spacing-md);
                    background: rgba(var(--primary-rgb), 0.1);
                    color: var(--primary-color);
                    font-weight: 700;
                }

                .stat-icon.total-skills { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
                .stat-icon.years-exp { background: rgba(34, 197, 94, 0.1); color: #22c55e; }
                .stat-icon.projects { background: rgba(168, 85, 247, 0.1); color: #a855f7; }
                .stat-icon.technologies { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }

                .stat-number {
                    font-size: 1.8rem;
                    font-weight: 800;
                }

                .stat-label {
                    color: var(--text-muted);
                    font-weight: 600;
                    margin: 0;
                    font-size: var(--font-size-sm);
                }

                /* Category Tabs */
                .category-tabs-container {
                    position: relative;
                    z-index: 2;
                }

                .category-tabs {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: var(--spacing-md);
                }

                .category-tab {
                    padding: var(--spacing-md) var(--spacing-xl);
                    border: 2px solid var(--border-color);
                    background: var(--card-bg);
                    color: var(--text-muted);
                    border-radius: var(--radius-lg);
                    font-weight: 600;
                    font-size: var(--font-size-sm);
                    transition: all var(--transition-base);
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                    backdrop-filter: blur(10px);
                }

                .category-tab.active {
                    background: var(--gradient-primary);
                    border-color: transparent;
                    color: white;
                    box-shadow: var(--shadow);
                }

                .category-tab:not(.active):hover {
                    border-color: var(--primary-color);
                    color: var(--primary-color);
                    background: rgba(var(--primary-rgb), 0.05);
                }

                .tab-icon {
                    flex-shrink: 0;
                }

                /* Category Description */
                .category-description {
                    position: relative;
                    z-index: 2;
                }

                .category-desc-text {
                    color: var(--text-muted);
                    font-size: var(--font-size-base);
                    font-style: italic;
                    max-width: 600px;
                    margin: 0 auto;
                }

                /* Skill Card */
                .skill-card {
                    background: var(--card-bg);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-xl);
                    overflow: hidden;
                    backdrop-filter: blur(10px);
                    transition: all var(--transition-base);
                    position: relative;
                    height: 100%;
                }

                .skill-card:hover {
                    border-color: var(--primary-color);
                    box-shadow: var(--shadow-xl);
                    transform: translateY(-5px);
                }

                .skill-background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    transition: opacity var(--transition-base);
                }

                .skill-glow {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    transition: opacity var(--transition-base);
                }

                .skill-card-body {
                    padding: var(--spacing-lg);
                    position: relative;
                    z-index: 2;
                }

                .skill-icon-container {
                    margin-bottom: var(--spacing-md);
                    text-align: center;
                }

                .icon-wrapper {
                    border-radius: var(--radius-lg);
                    padding: var(--spacing-md);
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    transition: all var(--transition-base);
                }

                .skill-card:hover .icon-wrapper {
                    box-shadow: var(--shadow);
                }

                .skill-name {
                    font-size: var(--font-size-lg);
                    font-weight: 700;
                    color: var(--text-color);
                    margin-bottom: var(--spacing-sm);
                    text-align: center;
                }

                .skill-description {
                    color: var(--text-muted);
                    font-size: var(--font-size-sm);
                    line-height: 1.5;
                    margin-bottom: var(--spacing-lg);
                    text-align: center;
                    min-height: 40px;
                }

                .skill-progress {
                    margin-bottom: var(--spacing-md);
                }

                .progress-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: var(--spacing-sm);
                }

                .progress-label {
                    color: var(--text-muted);
                    font-size: var(--font-size-xs);
                    font-weight: 600;
                    text-transform: uppercase;
                }

                .progress-percentage {
                    font-weight: 700;
                    font-size: var(--font-size-sm);
                }

                .progress-container {
                    width: 100%;
                    background: var(--surface-color);
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                }

                .progress-background {
                    width: 100%;
                    height: 8px;
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                    position: relative;
                }

                .progress-fill {
                    height: 100%;
                    border-radius: var(--radius-lg);
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

                .experience-level {
                    text-align: center;
                }

                .experience-badge {
                    padding: var(--spacing-xs) var(--spacing-md);
                    border-radius: 20px;
                    font-size: var(--font-size-xs);
                    font-weight: 600;
                    backdrop-filter: blur(10px);
                }

                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(400%); }
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .section-title {
                        font-size: var(--font-size-3xl);
                    }

                    .category-tabs {
                        gap: var(--spacing-sm);
                    }

                    .category-tab {
                        padding: var(--spacing-sm) var(--spacing-md);
                        font-size: var(--font-size-xs);
                    }

                    .stat-card {
                        padding: var(--spacing-md);
                    }

                    .stat-icon {
                        width: 60px;
                        height: 60px;
                    }

                    .stat-number {
                        font-size: 1.5rem;
                    }
                }

                @media (max-width: 576px) {
                    .section-title {
                        font-size: var(--font-size-2xl);
                    }

                    .category-tabs {
                        flex-direction: column;
                        align-items: center;
                    }

                    .category-tab {
                        width: 100%;
                        max-width: 250px;
                        justify-content: center;
                    }

                    .skill-card-body {
                        padding: var(--spacing-md);
                    }
                }
            `}</style>
        </section>
    );
};

export default Skills;