// src/components/NotFound.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    FaHome,
    FaEnvelope,
    FaCode,
    FaArrowLeft,
    FaRocket,
    FaGhost
} from 'react-icons/fa';

const NotFound = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    const floatingVariants = {
        float: {
            y: [-20, 20, -20],
            rotate: [0, 5, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const particleVariants = {
        float: {
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            transition: {
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
            }
        }
    };

    // Floating particles data
    const particles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
        size: Math.random() * 4 + 2
    }));

    return (
        <div className="not-found-container">
            {/* Animated Background */}
            <div className="background-elements">
                <motion.div
                    className="bg-blob primary-blob"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.03, 0.06, 0.03],
                        x: [0, 30, 0]
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
                        scale: [1.2, 1, 1.2],
                        opacity: [0.04, 0.02, 0.04],
                        y: [0, -20, 0]
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
            </div>

            {/* Floating Particles */}
            <div className="particles-container">
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="particle"
                        variants={particleVariants}
                        animate="float"
                        style={{
                            left: `${particle.left}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <motion.div
                className="not-found-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Animated 404 Number */}
                <motion.div
                    className="error-number-container"
                    variants={itemVariants}
                >
                    <motion.div
                        className="error-number"
                        animate={{
                            scale: [1, 1.05, 1],
                            rotate: [0, -2, 2, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        4
                    </motion.div>
                    <motion.div
                        className="error-ghost"
                        variants={floatingVariants}
                        animate="float"
                    >
                        <FaGhost className="ghost-icon" />
                    </motion.div>
                    <motion.div
                        className="error-number"
                        animate={{
                            scale: [1, 1.05, 1],
                            rotate: [0, 2, -2, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                        }}
                    >
                        4
                    </motion.div>
                </motion.div>

                {/* Error Message */}
                <motion.div
                    className="error-message"
                    variants={itemVariants}
                >
                    <motion.h1
                        className="error-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        Oops! Page Not Found
                    </motion.h1>
                    <motion.p
                        className="error-description"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        The page you're looking for seems to have vanished into the digital void.
                        It might have been moved, deleted, or never existed in the first place.
                    </motion.p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    className="action-buttons"
                    variants={itemVariants}
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link to="/" className="btn primary-btn">
                            <FaHome className="btn-icon" />
                            Back to Home
                        </Link>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link to="/projects" className="btn secondary-btn">
                            <FaCode className="btn-icon" />
                            View Projects
                        </Link>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link to="/contact" className="btn outline-btn">
                            <FaEnvelope className="btn-icon" />
                            Get in Touch
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                    className="quick-stats"
                    variants={itemVariants}
                >
                    <div className="stat-item">
                        <motion.div
                            className="stat-number"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.2, type: "spring" }}
                        >
                            404
                        </motion.div>
                        <div className="stat-label">Error Code</div>
                    </div>

                    <div className="stat-item">
                        <motion.div
                            className="stat-number"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.4, type: "spring" }}
                        >
                            ∞
                        </motion.div>
                        <div className="stat-label">Possibilities</div>
                    </div>

                    <div className="stat-item">
                        <motion.div
                            className="stat-number"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.6, type: "spring" }}
                        >
                            100%
                        </motion.div>
                        <div className="stat-label">Working Pages</div>
                    </div>
                </motion.div>

                {/* Fun Message */}
                <motion.div
                    className="fun-message"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                >
                    <motion.div
                        className="rocket-container"
                        animate={{
                            y: [0, -10, 0],
                            x: [0, 5, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <FaRocket className="rocket-icon" />
                    </motion.div>
                    <p>Don't worry, even rockets get lost sometimes! 🚀</p>
                </motion.div>
            </motion.div>

            <style jsx>{`
                .not-found-container {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                    color: white;
                    font-family: 'Inter', sans-serif;
                    padding: 2rem;
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
                    filter: blur(60px);
                }

                .primary-blob {
                    top: 20%;
                    right: 10%;
                    width: 400px;
                    height: 400px;
                    background: radial-gradient(circle, var(--primary-color) 0%, transparent 70%);
                }

                .secondary-blob {
                    bottom: 20%;
                    left: 10%;
                    width: 300px;
                    height: 300px;
                    background: radial-gradient(circle, var(--secondary-color) 0%, transparent 70%);
                }

                .particles-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                }

                .particle {
                    position: absolute;
                    background: rgba(102, 126, 234, 0.6);
                    border-radius: 50%;
                    bottom: 0;
                }

                .not-found-content {
                    text-align: center;
                    z-index: 10;
                    max-width: 800px;
                    width: 100%;
                }

                .error-number-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 2rem;
                    margin-bottom: 3rem;
                }

                .error-number {
                    font-size: 8rem;
                    font-weight: 900;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    line-height: 1;
                }

                .error-ghost {
                    font-size: 4rem;
                    color: #667eea;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .ghost-icon {
                    filter: drop-shadow(0 0 20px rgba(102, 126, 234, 0.5));
                }

                .error-message {
                    margin-bottom: 3rem;
                }

                .error-title {
                    font-size: 2.5rem;
                    font-weight: 700;
                    margin-bottom: 1.5rem;
                    background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .error-description {
                    font-size: 1.2rem;
                    line-height: 1.6;
                    color: rgba(255, 255, 255, 0.8);
                    max-width: 600px;
                    margin: 0 auto;
                }

                .action-buttons {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    flex-wrap: wrap;
                    margin-bottom: 4rem;
                }

                .btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 1rem 2rem;
                    border-radius: 50px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                }

                .primary-btn {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
                }

                .secondary-btn {
                    background: rgba(255, 255, 255, 0.1);
                    color: white;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(10px);
                }

                .outline-btn {
                    background: transparent;
                    color: #667eea;
                    border: 2px solid #667eea;
                }

                .btn:hover {
                    text-decoration: none;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
                }

                .btn-icon {
                    font-size: 1rem;
                }

                .quick-stats {
                    display: flex;
                    justify-content: center;
                    gap: 3rem;
                    margin-bottom: 3rem;
                    flex-wrap: wrap;
                }

                .stat-item {
                    text-align: center;
                }

                .stat-number {
                    font-size: 2.5rem;
                    font-weight: 800;
                    color: #667eea;
                    margin-bottom: 0.5rem;
                }

                .stat-label {
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.7);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .fun-message {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 1rem;
                }

                .rocket-container {
                    font-size: 1.5rem;
                    color: #667eea;
                }

                .rocket-icon {
                    filter: drop-shadow(0 0 10px rgba(102, 126, 234, 0.5));
                }

                @media (max-width: 768px) {
                    .not-found-container {
                        padding: 1rem;
                    }

                    .error-number {
                        font-size: 5rem;
                    }

                    .error-ghost {
                        font-size: 3rem;
                    }

                    .error-number-container {
                        gap: 1rem;
                    }

                    .error-title {
                        font-size: 2rem;
                    }

                    .error-description {
                        font-size: 1rem;
                    }

                    .action-buttons {
                        flex-direction: column;
                        align-items: center;
                    }

                    .btn {
                        width: 200px;
                        justify-content: center;
                    }

                    .quick-stats {
                        gap: 2rem;
                    }

                    .stat-number {
                        font-size: 2rem;
                    }
                }

                @media (max-width: 480px) {
                    .error-number {
                        font-size: 4rem;
                    }

                    .error-ghost {
                        font-size: 2.5rem;
                    }

                    .error-title {
                        font-size: 1.8rem;
                    }

                    .quick-stats {
                        gap: 1.5rem;
                    }

                    .stat-number {
                        font-size: 1.8rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default NotFound;