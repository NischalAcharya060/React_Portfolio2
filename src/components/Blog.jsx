// src/components/Blog.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaCalendar, FaClock, FaArrowRight, FaTimes, FaChevronDown } from 'react-icons/fa';
import { blogPosts } from '../data/blog';
import { useTheme } from '../context/ThemeContext';

const Blog = () => {
    const [selectedPost, setSelectedPost] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [visiblePosts, setVisiblePosts] = useState(4);
    const { isDark } = useTheme();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, threshold: 0.1 });

    const handleReadMore = (post) => {
        setSelectedPost(post);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPost(null);
    };

    const handleShowMore = () => {
        setVisiblePosts(prev => prev + 4);
    };

    // Sort the blog posts by date in descending order (latest first)
    const sortedPosts = [...blogPosts].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    const displayedPosts = sortedPosts.slice(0, visiblePosts);
    const hasMorePosts = visiblePosts < blogPosts.length;

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
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <section
            id="blog"
            ref={ref}
            className="blog-section section-padding position-relative overflow-hidden"
        >
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
                        Insights & Stories
                    </motion.span>
                    <h2 className="section-title gradient-heading mb-4">
                        Latest
                        <span className="gradient-text"> Blog Posts</span>
                    </h2>
                    <p className="section-subtitle">
                        Thoughts, experiences, and insights from my journey in tech and beyond
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="blog-container"
                >
                    <Row>
                        <AnimatePresence>
                            {displayedPosts.map((post) => (
                                <Col lg={6} key={post.id} className="mb-4">
                                    <motion.div
                                        variants={itemVariants}
                                        layout
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        whileHover={{ y: -5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Card className={`blog-card h-100 ${isDark ? 'dark-mode' : ''}`}>
                                            <Card.Body className="d-flex flex-column">
                                                <div className="blog-category mb-3">
                                                    <span className={`category-badge ${isDark ? 'dark-mode' : ''}`}>
                                                        {post.category}
                                                    </span>
                                                </div>

                                                <Card.Title className={`blog-title mb-3 ${isDark ? 'dark-mode' : ''}`}>
                                                    {post.title}
                                                </Card.Title>

                                                <Card.Text className={`blog-excerpt mb-3 flex-grow-1 ${isDark ? 'dark-mode' : ''}`}>
                                                    {post.excerpt}
                                                </Card.Text>

                                                <div className="blog-meta mb-3">
                                                    <div className={`meta-item ${isDark ? 'dark-mode' : ''}`}>
                                                        <FaCalendar className="meta-icon" />
                                                        <span>{post.date}</span>
                                                    </div>
                                                    <div className={`meta-item ${isDark ? 'dark-mode' : ''}`}>
                                                        <FaClock className="meta-icon" />
                                                        <span>{post.readTime}</span>
                                                    </div>
                                                </div>

                                                <motion.button
                                                    className={`read-more-btn ${isDark ? 'dark-mode' : ''}`}
                                                    onClick={() => handleReadMore(post)}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Read More <FaArrowRight />
                                                </motion.button>
                                            </Card.Body>
                                        </Card>
                                    </motion.div>
                                </Col>
                            ))}
                        </AnimatePresence>
                    </Row>
                </motion.div>

                {hasMorePosts && (
                    <Row className="justify-content-center mt-4">
                        <Col lg={6} className="text-center">
                            <motion.button
                                className={`show-more-btn ${isDark ? 'dark-mode' : ''}`}
                                onClick={handleShowMore}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                Show More Articles
                                <FaChevronDown className="ms-2" />
                            </motion.button>
                        </Col>
                    </Row>
                )}

                {visiblePosts >= blogPosts.length && visiblePosts > 4 && (
                    <Row className="justify-content-center mt-2">
                        <Col lg={6} className="text-center">
                            <motion.button
                                className={`show-less-btn ${isDark ? 'dark-mode' : ''}`}
                                onClick={() => setVisiblePosts(4)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                Show Less
                            </motion.button>
                        </Col>
                    </Row>
                )}
            </Container>

            <Modal
                show={showModal}
                onHide={handleCloseModal}
                size="lg"
                centered
                className={`blog-modal ${isDark ? 'dark-mode' : ''}`}
            >
                {selectedPost && (
                    <>
                        <Modal.Header className={`blog-modal-header ${isDark ? 'dark-mode' : ''}`}>
                            <Modal.Title className={`blog-modal-title ${isDark ? 'dark-mode' : ''}`}>
                                {selectedPost.title}
                            </Modal.Title>
                            <motion.button
                                className={`close-btn ${isDark ? 'dark-mode' : ''}`}
                                onClick={handleCloseModal}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaTimes />
                            </motion.button>
                        </Modal.Header>
                        <Modal.Body className={`blog-modal-body ${isDark ? 'dark-mode' : ''}`}>
                            <div className="modal-meta mb-4">
                                <div className={`meta-item ${isDark ? 'dark-mode' : ''}`}>
                                    <FaCalendar className="meta-icon" />
                                    <span>{selectedPost.date}</span>
                                </div>
                                <div className={`meta-item ${isDark ? 'dark-mode' : ''}`}>
                                    <FaClock className="meta-icon" />
                                    <span>{selectedPost.readTime}</span>
                                </div>
                                <div className={`meta-item ${isDark ? 'dark-mode' : ''}`}>
                                    <span className={`category-badge ${isDark ? 'dark-mode' : ''}`}>
                                        {selectedPost.category}
                                    </span>
                                </div>
                            </div>

                            <div
                                className={`blog-full-content ${isDark ? 'dark-mode' : ''}`}
                                dangerouslySetInnerHTML={{ __html: selectedPost.fullContent }}
                            />
                        </Modal.Body>
                    </>
                )}
            </Modal>

            <style jsx>{`
                .blog-section {
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

                .blog-container {
                    position: relative;
                    z-index: 2;
                }

                .blog-card {
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-xl);
                    background: var(--card-bg);
                    transition: all var(--transition-base);
                    box-shadow: var(--shadow);
                    padding: 1.5rem;
                    backdrop-filter: blur(10px);
                }

                .blog-card.dark-mode {
                    background: var(--card-bg);
                    border-color: var(--border-color);
                    box-shadow: var(--shadow-lg);
                }

                .blog-card:hover {
                    box-shadow: var(--shadow-xl);
                    border-color: var(--primary-color);
                    transform: translateY(-5px);
                }

                .blog-card.dark-mode:hover {
                    border-color: var(--primary-color);
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
                }

                .category-badge {
                    background: var(--gradient-primary);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: var(--radius-lg);
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .category-badge.dark-mode {
                    background: var(--gradient-primary);
                    box-shadow: 0 4px 15px rgba(var(--primary-rgb), 0.3);
                }

                .blog-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    line-height: 1.4;
                    color: var(--text-color);
                }

                .blog-title.dark-mode {
                    color: #ffffff;
                }

                .blog-excerpt {
                    color: var(--text-muted);
                    line-height: 1.6;
                    font-size: 0.95rem;
                }

                .blog-excerpt.dark-mode {
                    color: #b0b0b0;
                }

                .blog-meta {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                }

                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.875rem;
                    color: var(--text-muted);
                }

                .meta-item.dark-mode {
                    color: #a0a0a0;
                }

                .meta-icon {
                    font-size: 0.75rem;
                    color: var(--primary-color);
                }

                .read-more-btn {
                    background: var(--gradient-primary);
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: var(--radius-lg);
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    cursor: pointer;
                    transition: all var(--transition-base);
                    align-self: flex-start;
                }

                .read-more-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-lg);
                }

                .read-more-btn.dark-mode {
                    background: var(--gradient-primary);
                    box-shadow: 0 4px 15px rgba(var(--primary-rgb), 0.3);
                }

                .read-more-btn.dark-mode:hover {
                    box-shadow: 0 6px 20px rgba(var(--primary-rgb), 0.4);
                }

                .show-more-btn {
                    background: transparent;
                    color: var(--primary-color);
                    border: 2px solid var(--primary-color);
                    padding: 1rem 2rem;
                    border-radius: var(--radius-lg);
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all var(--transition-base);
                    width: 100%;
                    max-width: 300px;
                    margin: 0 auto;
                }

                .show-more-btn:hover {
                    background: var(--primary-color);
                    color: white;
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-lg);
                }

                .show-more-btn.dark-mode {
                    color: var(--primary-color);
                    border-color: var(--primary-color);
                    background: transparent;
                }

                .show-more-btn.dark-mode:hover {
                    background: var(--primary-color);
                    color: white;
                    box-shadow: 0 6px 20px rgba(var(--primary-rgb), 0.4);
                }

                .show-less-btn {
                    background: transparent;
                    color: var(--text-muted);
                    border: 1px solid var(--border-color);
                    padding: 0.75rem 1.5rem;
                    border-radius: var(--radius-lg);
                    font-weight: 600;
                    cursor: pointer;
                    transition: all var(--transition-base);
                }

                .show-less-btn:hover {
                    background: var(--surface-color);
                    color: var(--text-color);
                }

                .show-less-btn.dark-mode {
                    color: #a0a0a0;
                    border-color: var(--border-color);
                    background: transparent;
                }

                .show-less-btn.dark-mode:hover {
                    background: rgba(255, 255, 255, 0.05);
                    color: #ffffff;
                }

                .blog-modal :global(.modal-content) {
                    border: none;
                    border-radius: var(--radius-xl);
                    background: var(--card-bg);
                    color: var(--text-color);
                }

                .blog-modal.dark-mode :global(.modal-content) {
                    background: #1a1a1a;
                    border: 1px solid #2d2d2d;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
                }

                .blog-modal-header {
                    border-bottom: 1px solid var(--border-color);
                    padding: 1.5rem 2rem;
                }

                .blog-modal-header.dark-mode {
                    border-bottom-color: #2d2d2d;
                    background: #1a1a1a;
                }

                .blog-modal-title {
                    font-weight: 700;
                    font-size: 1.5rem;
                    color: var(--text-color);
                    margin: 0;
                    flex: 1;
                }

                .blog-modal-title.dark-mode {
                    color: #ffffff;
                }

                .close-btn {
                    background: none;
                    border: none;
                    color: var(--text-muted);
                    font-size: 1.25rem;
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: var(--radius-md);
                    transition: all var(--transition-base);
                }

                .close-btn:hover {
                    background: rgba(var(--primary-rgb), 0.1);
                    color: var(--primary-color);
                }

                .close-btn.dark-mode {
                    color: #a0a0a0;
                }

                .close-btn.dark-mode:hover {
                    background: rgba(var(--primary-rgb), 0.2);
                    color: var(--primary-color);
                }

                .blog-modal-body {
                    padding: 2rem;
                }

                .blog-modal-body.dark-mode {
                    background: #1a1a1a;
                }

                .modal-meta {
                    display: flex;
                    gap: 1.5rem;
                    align-items: center;
                    flex-wrap: wrap;
                }

                .blog-full-content {
                    line-height: 1.8;
                }

                .blog-full-content h2 {
                    color: var(--text-color);
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    font-size: 1.5rem;
                }

                .blog-full-content.dark-mode h2 {
                    color: #ffffff;
                }

                .blog-full-content h3 {
                    color: var(--text-color);
                    margin-top: 1.5rem;
                    margin-bottom: 0.75rem;
                    font-size: 1.25rem;
                }

                .blog-full-content.dark-mode h3 {
                    color: #ffffff;
                }

                .blog-full-content p {
                    margin-bottom: 1rem;
                    color: var(--text-muted);
                }

                .blog-full-content.dark-mode p {
                    color: #b0b0b0;
                }

                .blog-full-content ul {
                    margin-bottom: 1rem;
                    padding-left: 1.5rem;
                }

                .blog-full-content li {
                    margin-bottom: 0.5rem;
                    color: var(--text-muted);
                }

                .blog-full-content.dark-mode li {
                    color: #b0b0b0;
                }

                .blog-full-content pre {
                    background: var(--surface-color);
                    padding: 1rem;
                    border-radius: var(--radius-lg);
                    overflow-x: auto;
                    margin: 1rem 0;
                    border: 1px solid var(--border-color);
                }

                .blog-full-content.dark-mode pre {
                    background: #2d2d2d;
                    border-color: #3d3d3d;
                    color: #e0e0e0;
                }

                .blog-full-content code {
                    background: var(--surface-color);
                    padding: 0.2rem 0.4rem;
                    border-radius: var(--radius-sm);
                    font-size: 0.875rem;
                    color: var(--primary-color);
                }

                .blog-full-content.dark-mode code {
                    background: #2d2d2d;
                    color: var(--primary-color);
                }

                @media (max-width: 768px) {
                    .section-title {
                        font-size: var(--font-size-3xl);
                    }

                    .blog-card {
                        padding: 1rem;
                    }

                    .blog-title {
                        font-size: 1.1rem;
                    }

                    .blog-modal-header {
                        padding: 1rem 1.5rem;
                    }

                    .blog-modal-title {
                        font-size: 1.25rem;
                    }

                    .blog-modal-body {
                        padding: 1.5rem;
                    }

                    .modal-meta {
                        gap: 1rem;
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .show-more-btn {
                        padding: 0.75rem 1.5rem;
                        font-size: 0.9rem;
                    }
                }

                @media (max-width: 576px) {
                    .section-title {
                        font-size: var(--font-size-2xl);
                    }

                    .blog-meta {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 0.5rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default Blog;