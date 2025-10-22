// src/components/Projects.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
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
    FaMobile,
    FaDesktop,
    FaRocket
} from 'react-icons/fa';
import { SiFrontendmentor } from 'react-icons/si';

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, threshold: 0.1 });
    const [filter, setFilter] = useState('all');
    const [hoveredProject, setHoveredProject] = useState(null);

    const projects = [
        {
            id: 1,
            title: 'Modern E-Commerce Platform',
            description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB featuring real-time inventory, payment processing, and admin dashboard.',
            image: '/api/placeholder/400/250',
            technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'JWT'],
            github: 'https://github.com',
            live: 'https://example.com',
            category: 'fullstack',
            featured: true,
            status: 'completed',
            year: '2024'
        },
        {
            id: 2,
            title: 'TaskFlow - Productivity App',
            description: 'A collaborative task management application with real-time updates, drag & drop functionality, and team collaboration features.',
            image: '/api/placeholder/400/250',
            technologies: ['React', 'Firebase', 'Material-UI', 'Framer Motion', 'Chart.js'],
            github: 'https://github.com',
            live: 'https://example.com',
            category: 'frontend',
            featured: true,
            status: 'completed',
            year: '2024'
        },
        {
            id: 3,
            title: 'API Gateway Microservice',
            description: 'A scalable microservices architecture with API gateway, service discovery, and load balancing for high-traffic applications.',
            image: '/api/placeholder/400/250',
            technologies: ['Node.js', 'Docker', 'Redis', 'Kubernetes', 'Nginx'],
            github: 'https://github.com',
            live: 'https://example.com',
            category: 'backend',
            featured: false,
            status: 'completed',
            year: '2023'
        },
        {
            id: 4,
            title: 'Portfolio Platform',
            description: 'A modern portfolio platform with CMS integration, blog functionality, and contact management system.',
            image: '/api/placeholder/400/250',
            technologies: ['Next.js', 'Tailwind CSS', 'Sanity CMS', 'Vercel'],
            github: 'https://github.com',
            live: 'https://example.com',
            category: 'frontend',
            featured: false,
            status: 'completed',
            year: '2023'
        },
        {
            id: 5,
            title: 'Real-time Chat Application',
            description: 'A real-time messaging application with rooms, file sharing, and end-to-end encryption using Socket.io.',
            image: '/api/placeholder/400/250',
            technologies: ['React', 'Socket.io', 'Express', 'MongoDB', 'JWT'],
            github: 'https://github.com',
            live: 'https://example.com',
            category: 'fullstack',
            featured: true,
            status: 'completed',
            year: '2024'
        },
        {
            id: 6,
            title: 'AI-Powered Analytics Dashboard',
            description: 'Business intelligence dashboard with AI-powered insights, real-time data visualization, and predictive analytics.',
            image: '/api/placeholder/400/250',
            technologies: ['React', 'Python', 'FastAPI', 'D3.js', 'PostgreSQL'],
            github: 'https://github.com',
            live: 'https://example.com',
            category: 'fullstack',
            featured: false,
            status: 'in-progress',
            year: '2024'
        }
    ];

    const categories = [
        { key: 'all', label: 'All Projects', icon: FaRocket, count: projects.length },
        { key: 'frontend', label: 'Frontend', icon: FaDesktop, count: projects.filter(p => p.category === 'frontend').length },
        { key: 'backend', label: 'Backend', icon: FaServer, count: projects.filter(p => p.category === 'backend').length },
        { key: 'fullstack', label: 'Full Stack', icon: FaCode, count: projects.filter(p => p.category === 'fullstack').length }
    ];

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(project => project.category === filter);

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
            scale: 0.9
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

    return (
        <section
            id="projects"
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
                        right: '5%',
                        width: '300px',
                        height: '300px',
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
                        left: '5%',
                        width: '200px',
                        height: '200px',
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
                    <span className="section-badge">Portfolio</span>
                    <h2 className="display-4 fw-bold mb-3">
                        Featured
                        <span className="gradient-text"> Projects</span>
                    </h2>
                    <p className="lead text-muted max-w-600 mx-auto">
                        A collection of my recent work showcasing innovative solutions and cutting-edge technologies
                    </p>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-center mb-5"
                >
                    <div className="category-filters d-flex flex-wrap justify-content-center gap-3">
                        {categories.map(category => (
                            <motion.button
                                key={category.key}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setFilter(category.key)}
                                className={`category-filter ${filter === category.key ? 'active' : ''}`}
                            >
                                <category.icon className="me-2" size={16} />
                                {category.label}
                                <span className="filter-count">{category.count}</span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <AnimatePresence mode="wait">
                        <Row className="g-4" key={filter}>
                            {filteredProjects.map((project, index) => (
                                <Col key={project.id} xl={4} lg={6}>
                                    <motion.div
                                        variants={itemVariants}
                                        layout
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        onHoverStart={() => setHoveredProject(project.id)}
                                        onHoverEnd={() => setHoveredProject(null)}
                                    >
                                        <Card
                                            className="h-100 border-0 project-card position-relative overflow-hidden"
                                            style={{
                                                background: 'linear-gradient(135deg, var(--card-bg), var(--surface-color))',
                                                backdropFilter: 'blur(10px)',
                                                transition: 'all 0.3s ease',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {/* Featured Badge */}
                                            {project.featured && (
                                                <div className="position-absolute top-3 start-3 z-3">
                                                    <Badge
                                                        className="featured-badge px-3 py-2"
                                                        style={{
                                                            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                                                            color: 'white',
                                                            fontSize: '0.75rem',
                                                            fontWeight: 600
                                                        }}
                                                    >
                                                        <FaStar className="me-1" size={12} />
                                                        Featured
                                                    </Badge>
                                                </div>
                                            )}

                                            {/* Status Badge */}
                                            <div className="position-absolute top-3 end-3 z-3">
                                                <Badge
                                                    className={`status-badge px-3 py-2 ${
                                                        project.status === 'completed' ? 'completed' : 'in-progress'
                                                    }`}
                                                >
                                                    {project.status === 'completed' ? '✅ Live' : '🚧 In Progress'}
                                                </Badge>
                                            </div>

                                            {/* Project Image */}
                                            <div
                                                className="project-image-container position-relative overflow-hidden"
                                                style={{ height: '240px' }}
                                            >
                                                <motion.img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="card-img-top h-100 w-100"
                                                    style={{
                                                        objectFit: 'cover',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    whileHover={{ scale: 1.1 }}
                                                />

                                                {/* Overlay with Actions */}
                                                <motion.div
                                                    className="project-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                                                    initial={{ opacity: 0 }}
                                                    whileHover={{ opacity: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <div className="action-buttons d-flex gap-3">
                                                        <motion.a
                                                            href={project.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="action-btn github-btn"
                                                            whileHover={{ scale: 1.1, y: -2 }}
                                                            whileTap={{ scale: 0.9 }}
                                                        >
                                                            <FaGithub size={20} />
                                                        </motion.a>
                                                        <motion.a
                                                            href={project.live}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="action-btn live-btn"
                                                            whileHover={{ scale: 1.1, y: -2 }}
                                                            whileTap={{ scale: 0.9 }}
                                                        >
                                                            <FaExternalLinkAlt size={20} />
                                                        </motion.a>
                                                    </div>
                                                </motion.div>
                                            </div>

                                            <Card.Body className="p-4 position-relative">
                                                {/* Year Badge */}
                                                <div className="position-absolute top-0 end-4 transform-translate-y">
                                                    <Badge
                                                        className="year-badge px-3 py-2"
                                                        style={{
                                                            backgroundColor: 'var(--surface-color)',
                                                            color: 'var(--text-muted)',
                                                            fontSize: '0.75rem',
                                                            fontWeight: 600
                                                        }}
                                                    >
                                                        {project.year}
                                                    </Badge>
                                                </div>

                                                <h5 className="fw-bold mb-3" style={{ color: 'var(--text-color)' }}>
                                                    {project.title}
                                                </h5>

                                                <p className="text-muted mb-4" style={{ lineHeight: '1.6' }}>
                                                    {project.description}
                                                </p>

                                                {/* Technologies */}
                                                <div className="technologies-container mb-4">
                                                    <div className="d-flex flex-wrap gap-2">
                                                        {project.technologies.map((tech, techIndex) => (
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

                                                {/* Action Buttons */}
                                                <div className="d-flex gap-3">
                                                    <motion.a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2 flex-1 justify-content-center"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <FaCode size={14} />
                                                        Source Code
                                                    </motion.a>
                                                    <motion.a
                                                        href={project.live}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-primary-gradient btn-sm d-flex align-items-center gap-2 flex-1 justify-content-center"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <FaEye size={14} />
                                                        Live Demo
                                                    </motion.a>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </motion.div>
                                </Col>
                            ))}
                        </Row>
                    </AnimatePresence>

                    {/* Empty State */}
                    {filteredProjects.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-5"
                        >
                            <div className="empty-state">
                                <FaCode size={64} className="text-muted mb-3" />
                                <h5 className="text-muted">No projects found</h5>
                                <p className="text-muted">Try selecting a different category</p>
                            </div>
                        </motion.div>
                    )}
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

                    .category-filters {
                        gap: 1rem;
                    }

                    .category-filter {
                        padding: 0.75rem 1.5rem;
                        border: 2px solid var(--border-color);
                        background: transparent;
                        color: var(--text-muted);
                        border-radius: 50px;
                        font-weight: 600;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        position: relative;
                    }

                    .category-filter.active {
                        background: var(--primary-color);
                        border-color: var(--primary-color);
                        color: white;
                    }

                    .category-filter:not(.active):hover {
                        border-color: var(--primary-color);
                        color: var(--primary-color);
                        background: rgba(var(--primary-rgb), 0.1);
                    }

                    .filter-count {
                        background: rgba(255,255,255,0.2);
                        color: inherit;
                        border-radius: 50px;
                        padding: 0.25rem 0.5rem;
                        font-size: 0.75rem;
                        margin-left: 0.5rem;
                    }

                    .project-card {
                        transition: all 0.3s ease;
                        border: 1px solid var(--border-color);
                    }

                    .project-card:hover {
                        border-color: var(--primary-color);
                        box-shadow: 0 20px 40px rgba(0,0,0,0.15);
                        transform: translateY(-5px);
                    }

                    .project-image-container {
                        overflow: hidden;
                    }

                    .project-overlay {
                        background: rgba(0,0,0,0.8);
                        backdrop-filter: blur(5px);
                    }

                    .action-btn {
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        text-decoration: none;
                        transition: all 0.3s ease;
                    }

                    .github-btn {
                        background: white;
                        color: #333;
                    }

                    .live-btn {
                        background: var(--primary-color);
                        color: white;
                    }

                    .action-btn:hover {
                        transform: scale(1.1);
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

                    .btn-primary-gradient {
                        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                        border: none;
                        color: white;
                        border-radius: 50px;
                        font-weight: 600;
                    }

                    .status-badge.completed {
                        background: rgba(34, 197, 94, 0.1);
                        color: #22c55e;
                        border: 1px solid rgba(34, 197, 94, 0.3);
                    }

                    .status-badge.in-progress {
                        background: rgba(234, 179, 8, 0.1);
                        color: #eab308;
                        border: 1px solid rgba(234, 179, 8, 0.3);
                    }

                    .transform-translate-y {
                        transform: translateY(-50%);
                    }

                    .empty-state {
                        opacity: 0.5;
                    }
                `}
            </style>
        </section>
    );
};

export default Projects;