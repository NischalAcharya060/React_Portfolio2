// src/components/Loader.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onLoadingComplete }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [textIndex, setTextIndex] = useState(0);

    const loadingTexts = [
        "Crafting digital experiences...",
        "Loading awesome content...",
        "Initializing creativity...",
        "Almost there..."
    ];

    useEffect(() => {
        // Text animation
        const textInterval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % loadingTexts.length);
        }, 1500);

        return () => clearInterval(textInterval);
    }, []);

    useEffect(() => {
        // Typewriter effect for current text
        let currentIndex = 0;
        const fullText = loadingTexts[textIndex];

        const typeInterval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setCurrentText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typeInterval);
            }
        }, 50);

        return () => clearInterval(typeInterval);
    }, [textIndex]);

    useEffect(() => {
        // Simulate loading progress with more realistic increments
        const progressSteps = [0, 15, 40, 65, 85, 95, 100];
        let currentStep = 0;

        const progressInterval = setInterval(() => {
            if (currentStep < progressSteps.length) {
                setProgress(progressSteps[currentStep]);
                currentStep++;
            } else {
                clearInterval(progressInterval);
            }
        }, 400);

        // Simulate total loading time
        const timer = setTimeout(() => {
            setIsLoading(false);
            if (onLoadingComplete) {
                onLoadingComplete();
            }
        }, 3500);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(timer);
        };
    }, [onLoadingComplete]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            scale: 1.1,
            transition: {
                duration: 0.8,
                ease: "easeInOut"
            }
        }
    };

    const logoVariants = {
        hidden: {
            scale: 0.5,
            opacity: 0,
            rotateY: 180
        },
        visible: {
            scale: 1,
            opacity: 1,
            rotateY: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 1.5
            }
        }
    };

    const particleContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const particleVariants = {
        hidden: {
            opacity: 0,
            scale: 0,
            y: 100
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    const floatingOrbits = [
        { size: 120, duration: 20, color: 'rgba(102, 126, 234, 0.1)' },
        { size: 200, duration: 25, color: 'rgba(118, 75, 162, 0.08)' },
        { size: 280, duration: 30, color: 'rgba(79, 70, 229, 0.06)' }
    ];

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="loader-container"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {/* Animated Background Orbits */}
                    <div className="orbits-container">
                        {floatingOrbits.map((orbit, index) => (
                            <motion.div
                                key={index}
                                className="orbit"
                                style={{
                                    width: orbit.size,
                                    height: orbit.size,
                                    border: `2px solid ${orbit.color}`,
                                }}
                                animate={{
                                    rotate: 360,
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    rotate: {
                                        duration: orbit.duration,
                                        repeat: Infinity,
                                        ease: "linear"
                                    },
                                    scale: {
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                            />
                        ))}
                    </div>

                    {/* Central Content */}
                    <div className="loader-content">
                        {/* Animated Logo */}
                        <motion.div
                            className="logo-container"
                            variants={logoVariants}
                        >
                            <motion.div
                                className="logo-circle"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 180, 360],
                                    boxShadow: [
                                        '0 0 50px rgba(102, 126, 234, 0.3)',
                                        '0 0 80px rgba(102, 126, 234, 0.5)',
                                        '0 0 50px rgba(102, 126, 234, 0.3)'
                                    ],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <span className="logo-text">N</span>
                                <motion.div
                                    className="logo-glow"
                                    animate={{
                                        opacity: [0.3, 0.8, 0.3],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            </motion.div>
                        </motion.div>

                        {/* Text Content */}
                        <div className="text-content">
                            <motion.h1
                                className="loader-title"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            >
                                Nischal<span className="accent-text">.</span>Acharya
                            </motion.h1>

                            <motion.p
                                className="loader-subtitle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.8 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                            >
                                Full Stack Developer & Digital Creator
                            </motion.p>

                            {/* Animated Loading Text */}
                            <motion.div
                                className="loading-text-container"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                            >
                                <span className="loading-text">
                                    {currentText}
                                    <motion.span
                                        className="cursor"
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 0.8, repeat: Infinity }}
                                    >
                                        |
                                    </motion.span>
                                </span>
                            </motion.div>
                        </div>

                        {/* Advanced Progress Bar */}
                        <motion.div
                            className="progress-section"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5 }}
                        >
                            <div className="progress-info">
                                <span className="progress-label">Loading Portfolio</span>
                                <span className="progress-percent">
                                    {Math.min(Math.round(progress), 100)}%
                                </span>
                            </div>
                            <div className="progress-bar-container">
                                <motion.div
                                    className="progress-track"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 1.6, duration: 0.5 }}
                                />
                                <motion.div
                                    className="progress-fill"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: progress / 100 }}
                                    transition={{
                                        delay: 1.6,
                                        duration: 0.8,
                                        ease: "easeOut"
                                    }}
                                >
                                    <motion.div
                                        className="progress-glow"
                                        animate={{
                                            x: ['-100%', '100%'],
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Advanced Particles */}
                    <motion.div
                        className="particles-container"
                        variants={particleContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {[...Array(25)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="particle"
                                variants={particleVariants}
                                animate={{
                                    y: [0, -100, 0],
                                    x: [0, Math.random() * 50 - 25, 0],
                                    opacity: [0, 1, 0],
                                    scale: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                    ease: "easeInOut"
                                }}
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    width: `${Math.random() * 4 + 2}px`,
                                    height: `${Math.random() * 4 + 2}px`,
                                    background: i % 3 === 0 ? '#667eea' : i % 3 === 1 ? '#764ba2' : '#4f46e5',
                                }}
                            />
                        ))}
                    </motion.div>

                    {/* Corner Accents */}
                    <div className="corner-accent top-left" />
                    <div className="corner-accent top-right" />
                    <div className="corner-accent bottom-left" />
                    <div className="corner-accent bottom-right" />

                    <style jsx>{`
                        .loader-container {
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            z-index: 9999;
                            color: white;
                            font-family: 'Inter', sans-serif;
                            overflow: hidden;
                        }

                        .orbits-container {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                        }

                        .orbit {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            border-radius: 50%;
                            border-style: dashed;
                        }

                        .loader-content {
                            text-align: center;
                            z-index: 10;
                            position: relative;
                        }

                        .logo-container {
                            margin-bottom: 3rem;
                        }

                        .logo-circle {
                            width: 120px;
                            height: 120px;
                            border-radius: 50%;
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #4f46e5 100%);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin: 0 auto;
                            position: relative;
                            overflow: hidden;
                        }

                        .logo-text {
                            font-size: 3rem;
                            font-weight: 800;
                            color: white;
                            position: relative;
                            z-index: 2;
                        }

                        .logo-glow {
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
                            border-radius: 50%;
                        }

                        .text-content {
                            margin-bottom: 3rem;
                        }

                        .loader-title {
                            font-size: 3.5rem;
                            font-weight: 800;
                            margin-bottom: 1rem;
                            background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                            background-clip: text;
                        }

                        .accent-text {
                            color: #667eea;
                            -webkit-text-fill-color: #667eea;
                        }

                        .loader-subtitle {
                            font-size: 1.3rem;
                            color: rgba(255, 255, 255, 0.8);
                            font-weight: 400;
                            margin-bottom: 2rem;
                        }

                        .loading-text-container {
                            height: 24px;
                            margin-bottom: 1rem;
                        }

                        .loading-text {
                            font-size: 1rem;
                            color: rgba(255, 255, 255, 0.7);
                            font-family: 'Monaco', 'Consolas', monospace;
                        }

                        .cursor {
                            color: #667eea;
                            margin-left: 2px;
                        }

                        .progress-section {
                            width: 400px;
                            max-width: 90%;
                            margin: 0 auto;
                        }

                        .progress-info {
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 0.5rem;
                            font-size: 0.9rem;
                            color: rgba(255, 255, 255, 0.7);
                        }

                        .progress-bar-container {
                            width: 100%;
                            height: 6px;
                            background: rgba(255, 255, 255, 0.1);
                            border-radius: 10px;
                            overflow: hidden;
                            position: relative;
                        }

                        .progress-track {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: rgba(255, 255, 255, 0.05);
                            transform-origin: left;
                        }

                        .progress-fill {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: linear-gradient(90deg, #667eea, #764ba2, #4f46e5);
                            border-radius: 10px;
                            transform-origin: left;
                            overflow: hidden;
                        }

                        .progress-glow {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 50%;
                            height: 100%;
                            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                            transform: skewX(-20deg);
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
                            border-radius: 50%;
                            pointer-events: none;
                        }

                        .corner-accent {
                            position: absolute;
                            width: 100px;
                            height: 100px;
                            border: 2px solid rgba(102, 126, 234, 0.1);
                            border-radius: 20px;
                        }

                        .corner-accent.top-left {
                            top: 20px;
                            left: 20px;
                            border-right: none;
                            border-bottom: none;
                        }

                        .corner-accent.top-right {
                            top: 20px;
                            right: 20px;
                            border-left: none;
                            border-bottom: none;
                        }

                        .corner-accent.bottom-left {
                            bottom: 20px;
                            left: 20px;
                            border-right: none;
                            border-top: none;
                        }

                        .corner-accent.bottom-right {
                            bottom: 20px;
                            right: 20px;
                            border-left: none;
                            border-top: none;
                        }

                        @media (max-width: 768px) {
                            .loader-title {
                                font-size: 2.5rem;
                            }
                            
                            .logo-circle {
                                width: 100px;
                                height: 100px;
                            }
                            
                            .logo-text {
                                font-size: 2.5rem;
                            }

                            .loader-subtitle {
                                font-size: 1.1rem;
                            }

                            .progress-section {
                                width: 300px;
                            }

                            .corner-accent {
                                width: 60px;
                                height: 60px;
                            }
                        }

                        @media (max-width: 480px) {
                            .loader-title {
                                font-size: 2rem;
                            }
                            
                            .logo-circle {
                                width: 80px;
                                height: 80px;
                            }
                            
                            .logo-text {
                                font-size: 2rem;
                            }

                            .progress-section {
                                width: 250px;
                            }
                        }
                    `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Loader;