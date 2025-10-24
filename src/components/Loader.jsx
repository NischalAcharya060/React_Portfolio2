// src/components/Loader.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onLoadingComplete }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    const loadingTexts = [
        "Crafting digital experiences...",
        "Loading awesome content...",
        "Initializing creativity...",
        "Almost there...",
        "Final touches..."
    ];

    // Advanced progress simulation with realistic timing
    const simulateProgress = useCallback(() => {
        const steps = [
            { progress: 10, delay: 300 },
            { progress: 25, delay: 400 },
            { progress: 45, delay: 500 },
            { progress: 65, delay: 600 },
            { progress: 80, delay: 700 },
            { progress: 90, delay: 800 },
            { progress: 95, delay: 900 },
            { progress: 98, delay: 1000 },
            { progress: 100, delay: 500 }
        ];

        let currentStep = 0;

        const executeStep = () => {
            if (currentStep < steps.length) {
                const step = steps[currentStep];
                setTimeout(() => {
                    setProgress(step.progress);
                    currentStep++;
                    executeStep();
                }, step.delay);
            }
        };

        executeStep();
    }, []);

    // Text animation with smooth transitions
    useEffect(() => {
        setIsMounted(true);

        const textInterval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % loadingTexts.length);
        }, 2000);

        return () => clearInterval(textInterval);
    }, [loadingTexts.length]);

    // Typewriter effect with improved timing
    useEffect(() => {
        setCurrentText('');
        let currentIndex = 0;
        const fullText = loadingTexts[textIndex];

        const typeInterval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setCurrentText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typeInterval);
            }
        }, 40);

        return () => clearInterval(typeInterval);
    }, [textIndex, loadingTexts]);

    // Main loading sequence
    useEffect(() => {
        simulateProgress();

        const totalTimer = setTimeout(() => {
            setIsLoading(false);
            setTimeout(() => {
                if (onLoadingComplete) {
                    onLoadingComplete();
                }
            }, 800);
        }, 4500);

        return () => {
            clearTimeout(totalTimer);
        };
    }, [onLoadingComplete, simulateProgress]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1]
            }
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            transition: {
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1]
            }
        }
    };

    const logoVariants = {
        hidden: {
            scale: 0.8,
            opacity: 0,
            rotateY: 90
        },
        visible: {
            scale: 1,
            opacity: 1,
            rotateY: 0,
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 12,
                duration: 1.2
            }
        }
    };

    const floatingOrbits = [
        { size: 120, duration: 15, color: 'rgba(102, 126, 234, 0.15)', delay: 0 },
        { size: 200, duration: 20, color: 'rgba(118, 75, 162, 0.12)', delay: 0.2 },
        { size: 280, duration: 25, color: 'rgba(79, 70, 229, 0.1)', delay: 0.4 },
        { size: 360, duration: 30, color: 'rgba(59, 130, 246, 0.08)', delay: 0.6 }
    ];

    const particleConfigs = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: Math.random() * 5 + 2,
        duration: 4 + Math.random() * 3,
        delay: Math.random() * 2,
        color: [
            'rgba(102, 126, 234, 0.8)',
            'rgba(118, 75, 162, 0.8)',
            'rgba(79, 70, 229, 0.8)',
            'rgba(59, 130, 246, 0.8)'
        ][i % 4],
        path: {
            y: [0, -80 - Math.random() * 100, 0],
            x: [0, (Math.random() - 0.5) * 60, 0]
        }
    }));

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="loader-container"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {/* Animated Gradient Background */}
                    <div className="gradient-background">
                        <motion.div
                            className="gradient-layer-1"
                            animate={{
                                background: [
                                    'radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.15) 0%, transparent 50%)',
                                    'radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.15) 0%, transparent 50%)',
                                    'radial-gradient(circle at 40% 40%, rgba(79, 70, 229, 0.15) 0%, transparent 50%)',
                                    'radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.15) 0%, transparent 50%)'
                                ]
                            }}
                            transition={{ duration: 8, repeat: Infinity }}
                        />
                        <motion.div
                            className="gradient-layer-2"
                            animate={{
                                background: [
                                    'radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                                    'radial-gradient(circle at 20% 20%, rgba(102, 126, 234, 0.1) 0%, transparent 50%)',
                                    'radial-gradient(circle at 60% 60%, rgba(118, 75, 162, 0.1) 0%, transparent 50%)',
                                    'radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
                                ]
                            }}
                            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                        />
                    </div>

                    {/* Animated Background Orbits */}
                    <div className="orbits-container">
                        {floatingOrbits.map((orbit, index) => (
                            <motion.div
                                key={index}
                                className="orbit"
                                style={{
                                    width: orbit.size,
                                    height: orbit.size,
                                    border: `1.5px solid ${orbit.color}`,
                                }}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: 1,
                                    opacity: 1,
                                    rotate: 360,
                                }}
                                transition={{
                                    rotate: {
                                        duration: orbit.duration,
                                        repeat: Infinity,
                                        ease: "linear"
                                    },
                                    scale: {
                                        duration: 1,
                                        delay: orbit.delay
                                    },
                                    opacity: {
                                        duration: 1,
                                        delay: orbit.delay
                                    }
                                }}
                            />
                        ))}
                    </div>

                    {/* Central Content */}
                    <div className="loader-content">
                        {/* Animated Logo with Holographic Effect */}
                        <motion.div
                            className="logo-container"
                            variants={logoVariants}
                        >
                            <motion.div
                                className="logo-circle"
                                animate={{
                                    rotate: [0, 180, 360],
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{
                                    rotate: {
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "linear"
                                    },
                                    scale: {
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <span className="logo-text">N</span>

                                {/* Holographic Effect Layers */}
                                <motion.div
                                    className="holographic-layer-1"
                                    animate={{
                                        rotate: [0, 360],
                                        opacity: [0.3, 0.6, 0.3],
                                    }}
                                    transition={{
                                        rotate: {
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "linear"
                                        },
                                        opacity: {
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }
                                    }}
                                />
                                <motion.div
                                    className="holographic-layer-2"
                                    animate={{
                                        rotate: [360, 0],
                                        opacity: [0.2, 0.4, 0.2],
                                    }}
                                    transition={{
                                        rotate: {
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "linear"
                                        },
                                        opacity: {
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }
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
                                transition={{
                                    delay: 0.3,
                                    duration: 0.8,
                                    ease: [0.25, 0.1, 0.25, 1]
                                }}
                            >
                                Nischal
                                <motion.span
                                    className="accent-dot"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [1, 0.7, 1]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    .
                                </motion.span>
                                Acharya
                            </motion.h1>

                            <motion.p
                                className="loader-subtitle"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 0.9, y: 0 }}
                                transition={{
                                    delay: 0.5,
                                    duration: 0.8,
                                    ease: [0.25, 0.1, 0.25, 1]
                                }}
                            >
                                Full Stack Developer & Digital Creator
                            </motion.p>

                            {/* Animated Loading Text */}
                            <motion.div
                                className="loading-text-container"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                            >
                                <span className="loading-text">
                                    {currentText}
                                    <motion.span
                                        className="cursor"
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{
                                            duration: 0.8,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        ▊
                                    </motion.span>
                                </span>
                            </motion.div>
                        </div>

                        {/* Advanced Progress Bar */}
                        <motion.div
                            className="progress-section"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
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
                                    transition={{ delay: 1, duration: 0.5 }}
                                />
                                <motion.div
                                    className="progress-fill"
                                    style={{ scaleX: progress / 100 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 15
                                    }}
                                >
                                    <motion.div
                                        className="progress-shine"
                                        animate={{
                                            x: ['-100%', '200%'],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            repeatDelay: 1
                                        }}
                                    />
                                </motion.div>

                                {/* Progress Particles */}
                                {progress > 0 && progress < 100 && (
                                    <motion.div
                                        className="progress-particles"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        {[...Array(3)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="progress-particle"
                                                animate={{
                                                    y: [0, -10, 0],
                                                    opacity: [0, 1, 0],
                                                    scale: [0.5, 1, 0.5],
                                                }}
                                                transition={{
                                                    duration: 1.5,
                                                    repeat: Infinity,
                                                    delay: i * 0.3,
                                                    ease: "easeOut"
                                                }}
                                                style={{
                                                    left: `${progress}%`,
                                                    background: `rgba(102, 126, 234, ${0.8 - i * 0.2})`
                                                }}
                                            />
                                        ))}
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Floating Particles */}
                    <div className="particles-container">
                        {particleConfigs.map((particle) => (
                            <motion.div
                                key={particle.id}
                                className="particle"
                                animate={{
                                    y: particle.path.y,
                                    x: particle.path.x,
                                    opacity: [0, 1, 0],
                                    scale: [0, 1, 0],
                                }}
                                transition={{
                                    duration: particle.duration,
                                    repeat: Infinity,
                                    delay: particle.delay,
                                    ease: "easeInOut"
                                }}
                                style={{
                                    width: particle.size,
                                    height: particle.size,
                                    background: particle.color,
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                            />
                        ))}
                    </div>

                    {/* Corner Accents with Animation */}
                    <motion.div
                        className="corner-accent top-left"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    />
                    <motion.div
                        className="corner-accent top-right"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                    />
                    <motion.div
                        className="corner-accent bottom-left"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                    />
                    <motion.div
                        className="corner-accent bottom-right"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 }}
                    />

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
                            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                            overflow: hidden;
                            perspective: 1000px;
                        }

                        .gradient-background {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            overflow: hidden;
                        }

                        .gradient-layer-1,
                        .gradient-layer-2 {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
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
                            filter: blur(0.5px);
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
                            width: 140px;
                            height: 140px;
                            border-radius: 50%;
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #4f46e5 100%);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin: 0 auto;
                            position: relative;
                            overflow: hidden;
                            box-shadow: 
                                0 0 60px rgba(102, 126, 234, 0.4),
                                inset 0 0 60px rgba(255, 255, 255, 0.1);
                        }

                        .logo-text {
                            font-size: 3.5rem;
                            font-weight: 800;
                            color: white;
                            position: relative;
                            z-index: 3;
                            text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
                        }

                        .holographic-layer-1,
                        .holographic-layer-2 {
                            position: absolute;
                            top: -50%;
                            left: -50%;
                            width: 200%;
                            height: 200%;
                            background: conic-gradient(
                                from 0deg,
                                transparent,
                                rgba(255,255,255,0.1),
                                transparent,
                                rgba(255,255,255,0.1),
                                transparent
                            );
                            border-radius: 50%;
                        }

                        .holographic-layer-2 {
                            background: conic-gradient(
                                from 180deg,
                                transparent,
                                rgba(255,255,255,0.05),
                                transparent,
                                rgba(255,255,255,0.05),
                                transparent
                            );
                        }

                        .text-content {
                            margin-bottom: 3rem;
                        }

                        .loader-title {
                            font-size: 4rem;
                            font-weight: 800;
                            margin-bottom: 1rem;
                            background: linear-gradient(135deg, #ffffff 0%, #c0c0c0 100%);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                            background-clip: text;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 0.5rem;
                        }

                        .accent-dot {
                            color: #667eea;
                            -webkit-text-fill-color: #667eea;
                            display: inline-block;
                        }

                        .loader-subtitle {
                            font-size: 1.4rem;
                            color: rgba(255, 255, 255, 0.9);
                            font-weight: 400;
                            margin-bottom: 2rem;
                            letter-spacing: 0.5px;
                        }

                        .loading-text-container {
                            height: 28px;
                            margin-bottom: 1rem;
                        }

                        .loading-text {
                            font-size: 1.1rem;
                            color: rgba(255, 255, 255, 0.8);
                            font-family: 'Monaco', 'Consolas', 'JetBrains Mono', monospace;
                            letter-spacing: 0.5px;
                        }

                        .cursor {
                            color: #667eea;
                            margin-left: 4px;
                            font-weight: 300;
                        }

                        .progress-section {
                            width: 450px;
                            max-width: 90%;
                            margin: 0 auto;
                        }

                        .progress-info {
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 0.75rem;
                            font-size: 0.95rem;
                            color: rgba(255, 255, 255, 0.8);
                            font-weight: 500;
                        }

                        .progress-bar-container {
                            width: 100%;
                            height: 8px;
                            background: rgba(255, 255, 255, 0.08);
                            border-radius: 12px;
                            overflow: hidden;
                            position: relative;
                            backdrop-filter: blur(10px);
                        }

                        .progress-track {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: rgba(255, 255, 255, 0.03);
                            transform-origin: left;
                        }

                        .progress-fill {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: linear-gradient(90deg, #667eea, #764ba2, #4f46e5, #667eea);
                            background-size: 200% 100%;
                            border-radius: 12px;
                            transform-origin: left;
                            overflow: hidden;
                            animation: gradientShift 3s ease infinite;
                        }

                        .progress-shine {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 30%;
                            height: 100%;
                            background: linear-gradient(
                                90deg,
                                transparent,
                                rgba(255, 255, 255, 0.6),
                                transparent
                            );
                            transform: skewX(-20deg);
                        }

                        .progress-particles {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            pointer-events: none;
                        }

                        .progress-particle {
                            position: absolute;
                            width: 4px;
                            height: 4px;
                            border-radius: 50%;
                            pointer-events: none;
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
                            filter: blur(0.5px);
                            will-change: transform, opacity;
                        }

                        .corner-accent {
                            position: absolute;
                            width: 120px;
                            height: 120px;
                            border: 2px solid rgba(102, 126, 234, 0.15);
                            border-radius: 24px;
                            backdrop-filter: blur(10px);
                        }

                        .corner-accent::before {
                            content: '';
                            position: absolute;
                            top: -2px;
                            left: -2px;
                            right: -2px;
                            bottom: -2px;
                            background: linear-gradient(45deg, transparent, rgba(102, 126, 234, 0.1), transparent);
                            border-radius: 24px;
                            animation: shine 3s ease-in-out infinite;
                        }

                        .corner-accent.top-left {
                            top: 30px;
                            left: 30px;
                            border-right: none;
                            border-bottom: none;
                        }

                        .corner-accent.top-right {
                            top: 30px;
                            right: 30px;
                            border-left: none;
                            border-bottom: none;
                        }

                        .corner-accent.bottom-left {
                            bottom: 30px;
                            left: 30px;
                            border-right: none;
                            border-top: none;
                        }

                        .corner-accent.bottom-right {
                            bottom: 30px;
                            right: 30px;
                            border-left: none;
                            border-top: none;
                        }

                        @keyframes gradientShift {
                            0%, 100% { background-position: 0% 50%; }
                            50% { background-position: 100% 50%; }
                        }

                        @keyframes shine {
                            0%, 100% { opacity: 0; }
                            50% { opacity: 1; }
                        }

                        @media (max-width: 768px) {
                            .loader-title {
                                font-size: 3rem;
                            }
                            
                            .logo-circle {
                                width: 120px;
                                height: 120px;
                            }
                            
                            .logo-text {
                                font-size: 3rem;
                            }

                            .loader-subtitle {
                                font-size: 1.2rem;
                            }

                            .progress-section {
                                width: 350px;
                            }

                            .corner-accent {
                                width: 80px;
                                height: 80px;
                            }
                        }

                        @media (max-width: 480px) {
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
                                width: 280px;
                            }

                            .corner-accent {
                                width: 60px;
                                height: 60px;
                            }
                        }

                        @media (max-width: 320px) {
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
                        }
                    `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Loader;