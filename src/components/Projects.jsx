// src/components/Projects.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    FaGithub,
    FaExternalLinkAlt,
    FaEye,
    FaCode,
    FaStar,
    FaServer,
    FaMobileAlt,
    FaGlobe,
    FaDesktop,
    FaRocket,
    FaToolbox,
    FaLayerGroup,
    FaChevronDown,
    FaChevronUp
} from 'react-icons/fa';

// Import data from external file
import { projects, categories } from '../data/projects.js';

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, threshold: 0.1 });
    const [filter, setFilter] = useState('all');
    const [hoveredProject, setHoveredProject] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [visibleCount, setVisibleCount] = useState(6);

    // Icon mapping
    const iconMap = {
        FaRocket,
        FaDesktop,
        FaServer,
        FaCode,
        FaMobileAlt,
        FaGlobe,
        FaToolbox,
        FaLayerGroup
    };

    // Sort projects by year (latest first) and then by ID (latest first)
    const sortedProjects = [...projects].sort((a, b) => {
        if (b.year !== a.year) {
            return b.year - a.year; // Sort by year descending (latest first)
        }
        return b.id - a.id; // Then by ID descending (latest first)
    });

    // Calculate counts for categories
    const categoriesWithCounts = categories.map(category => ({
        ...category,
        count: category.key === 'all'
            ? sortedProjects.length
            : sortedProjects.filter(p => p.category === category.key).length,
        iconComponent: iconMap[category.icon]
    }));

    const filteredProjects = filter === 'all'
        ? sortedProjects
        : sortedProjects.filter(project => project.category === filter);

    // Check if current category has more than 6 projects
    const hasMoreProjects = filteredProjects.length > visibleCount;

    // Get projects to display (limited to visibleCount)
    const displayedProjects = hasMoreProjects
        ? filteredProjects.slice(0, visibleCount)
        : filteredProjects;

    // Toggle expanded state for categories
    const toggleExpanded = () => {
        if (hasMoreProjects) {
            setVisibleCount(filteredProjects.length);
        } else {
            setVisibleCount(6);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: {
            y: 40,
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

    // Reset visible count when filter changes
    React.useEffect(() => {
        setVisibleCount(6);
    }, [filter]);

    return (
        <section
            id="projects"
            ref={ref}
            className="projects-section section-padding position-relative overflow-hidden"
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
                        Portfolio Showcase
                    </motion.span>
                    <h2 className="section-title gradient-heading mb-4">
                        My Creative
                        <span className="gradient-text"> Projects</span>
                    </h2>
                    <p className="section-subtitle">
                        A curated collection of my work demonstrating technical expertise,
                        innovative solutions, and passion for creating exceptional digital experiences
                    </p>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="filters-container mb-6"
                >
                    <div className="category-filters">
                        {categoriesWithCounts.map(category => {
                            const IconComponent = category.iconComponent;
                            return (
                                <motion.button
                                    key={category.key}
                                    whileHover={{
                                        scale: 1.05,
                                        y: -2,
                                        transition: { type: "spring", stiffness: 400, damping: 10 }
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setFilter(category.key)}
                                    className={`category-filter ${filter === category.key ? 'active' : ''}`}
                                    initial={false}
                                >
                                    <IconComponent className="filter-icon" size={16} />
                                    <span className="filter-label">{category.label}</span>
                                    <span className="filter-count">{category.count}</span>
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>

                <div style={{ height: '2rem', width: '100%' }}></div>

                {/* Projects Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="projects-grid-container"
                >
                    <AnimatePresence mode="popLayout">
                        <Row className="g-4" key={filter}>
                            {displayedProjects.map((project, index) => (
                                <Col key={project.id} xl={4} lg={6} md={6}>
                                    <motion.div
                                        variants={itemVariants}
                                        layout
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        whileHover={{ y: -8 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        onHoverStart={() => setHoveredProject(project.id)}
                                        onHoverEnd={() => setHoveredProject(null)}
                                    >
                                        <Card className="project-card">
                                            {/* Featured Badge */}
                                            {project.featured && (
                                                <div className="featured-badge-container">
                                                    <Badge className="featured-badge">
                                                        <FaStar className="featured-icon" />
                                                        Featured
                                                    </Badge>
                                                </div>
                                            )}

                                            {/* Status Badge */}
                                            <div className="status-badge-container">
                                                <Badge className={`status-badge ${project.status}`}>
                                                    {project.status === 'completed' ? '🚀 Live' : '🛠️ In Progress'}
                                                </Badge>
                                            </div>

                                            {/* Project Image */}
                                            <div className="project-image-container">
                                                <motion.img
                                                    src={project.image}
                                                    alt={project.alt || project.title}
                                                    className="project-image"
                                                    whileHover={{ scale: 1.08 }}
                                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                                />

                                                {/* Gradient Overlay */}
                                                <div className="image-overlay" />

                                                {/* Action Buttons */}
                                                <motion.div
                                                    className="action-buttons"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    whileHover={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <motion.a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="action-btn code-btn"
                                                        whileHover={{ scale: 1.1, y: -2 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        <FaGithub size={18} />
                                                    </motion.a>
                                                    <motion.a
                                                        href={project.live}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="action-btn live-btn"
                                                        whileHover={{ scale: 1.1, y: -2 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        <FaExternalLinkAlt size={16} />
                                                    </motion.a>
                                                </motion.div>
                                            </div>

                                            <Card.Body className="project-content">
                                                {/* Year Badge */}
                                                <div className="year-badge-container">
                                                    <Badge className="year-badge">
                                                        {project.year}
                                                    </Badge>
                                                </div>

                                                <h5 className="project-title">
                                                    {project.title}
                                                </h5>

                                                <p className="project-description">
                                                    {project.description}
                                                </p>

                                                {/* Technologies */}
                                                <div className="technologies-container">
                                                    <div className="tech-tags">
                                                        {project.technologies.map((tech, techIndex) => (
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

                                                {/* Action Buttons */}
                                                <div className="project-actions">
                                                    <motion.a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-outline code-button"
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        <FaCode className="btn-icon" />
                                                        Code
                                                    </motion.a>
                                                    <motion.a
                                                        href={project.live}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-primary demo-button"
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        <FaEye className="btn-icon" />
                                                        Demo
                                                    </motion.a>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </motion.div>
                                </Col>
                            ))}
                        </Row>
                    </AnimatePresence>

                    {/* View More / View Less Button */}
                    {hasMoreProjects || visibleCount > 6 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-center mt-5"
                        >
                            <motion.button
                                onClick={toggleExpanded}
                                className="view-more-btn"
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 10px 30px rgba(var(--primary-rgb), 0.3)"
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {hasMoreProjects ? (
                                    <>
                                        <FaChevronDown className="me-2" />
                                        View More Projects ({filteredProjects.length - visibleCount} more)
                                    </>
                                ) : (
                                    <>
                                        <FaChevronUp className="me-2" />
                                        View Less
                                    </>
                                )}
                            </motion.button>
                        </motion.div>
                    ) : null}

                    {/* Empty State */}
                    {filteredProjects.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="empty-state text-center"
                        >
                            <div className="empty-content">
                                <FaCode className="empty-icon" />
                                <h5 className="empty-title">No projects found</h5>
                                <p className="empty-description">
                                    Try selecting a different category to see more projects
                                </p>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </Container>

            <style jsx>{`
                .projects-section {
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

                .filters-container {
                    position: relative;
                    z-index: 2;
                }

                .category-filters {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 0.8rem;
                }

                .category-filter {
                    padding: 0.8rem 1.6rem;
                    border: 1.5px solid var(--border-color);
                    background: var(--card-bg);
                    color: var(--text-muted);
                    border-radius: 12px;
                    font-weight: 600;
                    font-size: 0.9rem;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    backdrop-filter: blur(10px);
                    position: relative;
                    overflow: hidden;
                }

                .category-filter::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg,
                    transparent,
                    rgba(var(--primary-rgb), 0.1),
                    transparent);
                    transition: left 0.6s;
                }

                .category-filter:hover::before {
                    left: 100%;
                }

                .category-filter.active {
                    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                    border-color: transparent;
                    color: white;
                    box-shadow: 0 8px 32px rgba(var(--primary-rgb), 0.2);
                }

                .category-filter:not(.active):hover {
                    border-color: var(--primary-color);
                    color: var(--primary-color);
                    background: rgba(var(--primary-rgb), 0.05);
                }

                .filter-icon {
                    flex-shrink: 0;
                }

                .filter-count {
                    background: rgba(255, 255, 255, 0.15);
                    color: inherit;
                    border-radius: 20px;
                    padding: 0.2rem 0.6rem;
                    font-size: 0.75rem;
                    font-weight: 700;
                    min-width: 24px;
                    text-align: center;
                }

                .projects-info {
                    background: rgba(var(--surface-color), 0.5);
                    padding: 1rem 1.5rem;
                    border-radius: 12px;
                    border: 1px solid var(--border-color);
                    backdrop-filter: blur(10px);
                }

                .projects-count {
                    color: var(--text-color);
                    font-weight: 600;
                    font-size: 0.9rem;
                }

                .sort-info {
                    color: var(--text-muted);
                    font-size: 0.8rem;
                    font-style: italic;
                }

                .project-card {
                    background: var(--card-bg);
                    border: 1px solid var(--border-color);
                    border-radius: 16px;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    backdrop-filter: blur(10px);
                    position: relative;
                    height: 100%;
                }

                .project-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg,
                    transparent,
                    var(--primary-color),
                    transparent);
                    opacity: 0;
                    transition: opacity 0.4s;
                }

                .project-card:hover {
                    border-color: var(--primary-color);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                    transform: translateY(-5px);
                }

                .project-card:hover::before {
                    opacity: 1;
                }

                .featured-badge-container {
                    position: absolute;
                    top: 12px;
                    left: 12px;
                    z-index: 3;
                }

                .featured-badge {
                    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    border: none;
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.3);
                }

                .featured-icon {
                    font-size: 0.7rem;
                }

                .status-badge-container {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    z-index: 3;
                }

                .status-badge {
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    border: none;
                    backdrop-filter: blur(10px);
                }

                .status-badge.completed {
                    background: rgba(34, 197, 94, 0.15);
                    color: #ffffff;
                    border: 1px solid rgba(34, 197, 94, 0.3);
                }

                .status-badge.in-progress {
                    background: rgba(234, 179, 8, 0.15);
                    color: #eab308;
                    border: 1px solid rgba(234, 179, 8, 0.3);
                }

                .project-image-container {
                    position: relative;
                    height: 220px;
                    overflow: hidden;
                    background: var(--surface-color);
                }

                .project-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .image-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(to bottom,
                    transparent 0%,
                    rgba(0, 0, 0, 0.1) 100%);
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                .project-card:hover .image-overlay {
                    opacity: 1;
                }

                .action-buttons {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    display: flex;
                    gap: 0.8rem;
                    z-index: 2;
                }

                .action-btn {
                    width: 44px;
                    height: 44px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transition: all 0.3s ease;
                }

                .code-btn {
                    background: rgba(255, 255, 255, 0.95);
                    color: #1a1a1a;
                }

                .live-btn {
                    background: var(--primary-color);
                    color: white;
                }

                .action-btn:hover {
                    transform: scale(1.1);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
                }

                .project-content {
                    padding: 1.5rem;
                    position: relative;
                }

                .year-badge-container {
                    position: absolute;
                    top: -12px;
                    right: 1.5rem;
                }

                .year-badge {
                    background: var(--surface-color);
                    color: #ffffff;
                    padding: 0.4rem 0.8rem;
                    border-radius: 8px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    border: 1px solid var(--border-color);
                    backdrop-filter: blur(10px);
                }

                .project-title {
                    color: var(--text-color);
                    font-weight: 700;
                    font-size: 1.2rem;
                    margin-bottom: 0.8rem;
                    line-height: 1.4;
                }

                .project-description {
                    color: var(--text-muted);
                    font-size: 0.9rem;
                    line-height: 1.6;
                    margin-bottom: 1.2rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .technologies-container {
                    margin-bottom: 1.5rem;
                }

                .tech-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }

                .tech-tag {
                    background: rgba(var(--primary-rgb), 0.1);
                    color: var(--primary-color);
                    padding: 0.3rem 0.7rem;
                    border-radius: 8px;
                    font-size: 0.75rem;
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

                .project-actions {
                    display: flex;
                    gap: 0.8rem;
                }

                .btn {
                    flex: 1;
                    padding: 0.7rem 1rem;
                    border-radius: 10px;
                    font-weight: 600;
                    font-size: 0.85rem;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    transition: all 0.3s ease;
                    border: 1.5px solid transparent;
                }

                .btn-outline {
                    background: transparent;
                    color: var(--primary-color);
                    border-color: var(--primary-color);
                }

                .btn-outline:hover {
                    background: var(--primary-color);
                    color: white;
                    transform: translateY(-1px);
                    box-shadow: 0 6px 20px rgba(var(--primary-rgb), 0.3);
                }

                .btn-primary {
                    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                    color: white;
                    border: none;
                }

                .btn-primary:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 6px 20px rgba(var(--primary-rgb), 0.4);
                }

                .btn-icon {
                    font-size: 0.8rem;
                }

                .view-more-btn {
                    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 12px;
                    font-weight: 600;
                    font-size: 1rem;
                    display: inline-flex;
                    align-items: center;
                    transition: all 0.3s ease;
                    box-shadow: 0 8px 25px rgba(var(--primary-rgb), 0.2);
                }

                .view-more-btn:hover {
                    transform: translateY(-2px);
                }

                .empty-state {
                    padding: 4rem 2rem;
                }

                .empty-content {
                    opacity: 0.6;
                }

                .empty-icon {
                    font-size: 4rem;
                    color: var(--text-muted);
                    margin-bottom: 1rem;
                }

                .empty-title {
                    color: var(--text-muted);
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                }

                .empty-description {
                    color: var(--text-muted);
                    font-size: 0.9rem;
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .section-title {
                        font-size: 2.2rem;
                    }

                    .category-filters {
                        gap: 0.5rem;
                    }

                    .category-filter {
                        padding: 0.6rem 1.2rem;
                        font-size: 0.8rem;
                    }

                    .project-image-container {
                        height: 200px;
                    }

                    .project-content {
                        padding: 1.2rem;
                    }

                    .projects-info {
                        padding: 0.8rem 1rem;
                    }

                    .projects-count,
                    .sort-info {
                        font-size: 0.8rem;
                    }
                }

                @media (max-width: 576px) {
                    .section-title {
                        font-size: 1.8rem;
                    }

                    .category-filters {
                        justify-content: flex-start;
                        overflow-x: auto;
                        padding-bottom: 0.5rem;
                    }

                    .project-actions {
                        flex-direction: column;
                    }

                    .btn {
                        width: 100%;
                    }

                    .projects-info {
                        flex-direction: column;
                        gap: 0.5rem;
                        text-align: center;
                    }
                }
            `}</style>
        </section>
    );
};

export default Projects;