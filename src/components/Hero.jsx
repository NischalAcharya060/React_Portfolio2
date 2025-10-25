// src/components/Hero.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Container, Row, Col, Button, Spinner, Toast } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaChevronDown,
    FaGithub,
    FaLinkedin,
    FaEnvelope,
    FaInstagram,
    FaTwitter,
    FaFacebook,
    FaDownload,
    FaPlay,
    FaCode,
    FaServer,
    FaRocket,
    FaWordpress,
    FaCheck,
    FaStar
} from 'react-icons/fa';

const Hero = () => {
    const [currentRole, setCurrentRole] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [downloadState, setDownloadState] = useState('idle'); // 'idle', 'downloading', 'completed'
    const sectionRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    const cursorIntervalRef = useRef(null);

    const roles = [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "WordPress Developer",
        "Freelancer",
    ];

    const socialLinks = [
        { Icon: FaGithub, href: 'https://github.com/NischalAcharya060', label: 'GitHub', color: '#333' },
        { Icon: FaLinkedin, href: 'https://www.linkedin.com/in/nischal-acharya101/', label: 'LinkedIn', color: '#0077B5' },
        { Icon: FaInstagram, href: 'https://www.instagram.com/its_nischalacharya/', label: 'Instagram', color: '#E4405F' },
        { Icon: FaTwitter, href: 'https://x.com/nischalacharya_', label: 'Twitter', color: '#1DA1F2' },
        { Icon: FaFacebook, href: 'https://www.facebook.com/GrdhRavan', label: 'Facebook', color: '#1877F2' },
        { Icon: FaEnvelope, href: 'mailto:Nischal060@gmail.com', label: 'Email', color: '#D44638' }
    ];

    // Memoized scroll function
    const scrollToSection = useCallback((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80;
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }, []);

    // Optimized download function
    const handleDownloadResume = useCallback(async () => {
        setDownloadState('downloading');

        try {
            // Simulate download process
            await new Promise(resolve => setTimeout(resolve, 1500));

            const link = document.createElement('a');
            link.href = '/resume/Nischal_Acharya_CV.pdf';
            link.download = 'Nischal_Acharya_CV.pdf';
            link.style.display = 'none';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setDownloadState('completed');

            // Reset after 3 seconds
            setTimeout(() => {
                setDownloadState('idle');
            }, 3000);

        } catch (error) {
            console.error('Download failed:', error);
            setDownloadState('idle');
            // Fallback: open in new tab
            window.open('/resume/Nischal_Acharya_CV.pdf', '_blank');
        }
    }, []);

    // Optimized mouse move handler
    const handleMouseMove = useCallback((e) => {
        if (!sectionRef.current) return;

        const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setMousePosition({ x, y });
    }, []);

    // Optimized typewriter effect with proper cleanup
    useEffect(() => {
        let currentText = '';
        let currentIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const type = () => {
            const fullText = roles[currentRole];

            if (isDeleting) {
                // Deleting text
                currentText = fullText.substring(0, currentIndex - 1);
                currentIndex--;
                typingSpeed = 50;
            } else {
                // Typing text
                currentText = fullText.substring(0, currentIndex + 1);
                currentIndex++;
                typingSpeed = 100;
            }

            setDisplayText(currentText);

            if (!isDeleting && currentIndex === fullText.length) {
                // Pause at end
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && currentIndex === 0) {
                // Move to next role
                isDeleting = false;
                setCurrentRole((prev) => (prev + 1) % roles.length);
                typingSpeed = 500;
            }

            typingTimeoutRef.current = setTimeout(type, typingSpeed);
        };

        typingTimeoutRef.current = setTimeout(type, 1000);

        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, [currentRole, roles.length]);

    // Optimized cursor effect
    useEffect(() => {
        cursorIntervalRef.current = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530);

        return () => {
            if (cursorIntervalRef.current) {
                clearInterval(cursorIntervalRef.current);
            }
        };
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            if (cursorIntervalRef.current) {
                clearInterval(cursorIntervalRef.current);
            }
        };
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.08
            }
        }
    };

    const itemVariants = {
        hidden: {
            y: 30,
            opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const floatingVariants = {
        float: {
            y: [-8, 8, -8],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    // Optimized particles data - pre-calculated for performance
    const particles = useRef(
        Array.from({ length: 15 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            size: Math.random() * 4 + 2,
            duration: 6 + Math.random() * 4,
            delay: Math.random() * 2,
            color: i % 3 === 0 ? 'var(--primary-color)' : i % 3 === 1 ? 'var(--secondary-color)' : 'var(--accent-color)'
        }))
    ).current;

    const shapes = useRef(
        Array.from({ length: 5 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            size: Math.random() * 100 + 50,
            duration: 12 + Math.random() * 8,
            delay: Math.random() * 3
        }))
    ).current;

    return (
        <section
            ref={sectionRef}
            id="home"
            className="hero-section min-vh-100 d-flex align-items-center position-relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, var(--background-color) 0%, var(--surface-color) 100%)',
                paddingTop: '6rem'
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Optimized Background */}
            <motion.div
                className="hero-background"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                                rgba(100, 100, 255, 0.08) 0%, 
                                rgba(255, 100, 255, 0.04) 30%, 
                                transparent 70%)`,
                    opacity: isHovered ? 1 : 0.7,
                    transition: 'opacity 0.2s ease',
                    zIndex: -2
                }}
            />

            {/* Static Gradient Overlay */}
            <div
                className="animated-gradient"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(45deg, var(--primary-color) 0%, var(--secondary-color) 50%, var(--primary-color) 100%)',
                    backgroundSize: '200% 200%',
                    opacity: 0.02,
                    zIndex: -1
                }}
            />

            {/* Optimized Particles */}
            <div className="floating-particles">
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="floating-particle"
                        style={{
                            position: 'absolute',
                            left: `${particle.left}%`,
                            top: `${particle.top}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            background: particle.color,
                            borderRadius: '50%',
                            opacity: 0.3,
                        }}
                        animate={{
                            y: [-10, 10, -10],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: particle.delay
                        }}
                    />
                ))}
            </div>

            {/* Optimized Shapes */}
            <div className="floating-shapes">
                {shapes.map((shape) => (
                    <motion.div
                        key={shape.id}
                        style={{
                            position: 'absolute',
                            left: `${shape.left}%`,
                            top: `${shape.top}%`,
                            width: `${shape.size}px`,
                            height: `${shape.size}px`,
                            background: `rgba(100, 100, 255, 0.02)`,
                            borderRadius: '30%',
                            filter: 'blur(15px)',
                        }}
                        animate={{
                            y: [-50, 50, -50],
                            x: shape.id % 2 === 0 ? [-25, 25, -25] : [25, -25, 25],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: shape.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: shape.delay
                        }}
                    />
                ))}
            </div>

            <Container>
                <Row className="align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
                    <Col xl={10} className="text-center">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Profile Image */}
                            <motion.div
                                variants={itemVariants}
                                className="mb-4"
                                style={{ display: 'flex', justifyContent: 'center' }}
                            >
                                <motion.div
                                    style={{
                                        position: 'relative',
                                        width: '160px',
                                        height: '160px',
                                        borderRadius: '50%',
                                        padding: '3px',
                                        background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                                    }}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <img
                                        src="/api/placeholder/profile.jpeg"
                                        alt="Nischal Acharya"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            border: '3px solid var(--background-color)'
                                        }}
                                    />
                                    <motion.div
                                        style={{
                                            position: 'absolute',
                                            bottom: '12px',
                                            right: '12px',
                                            width: '14px',
                                            height: '14px',
                                            background: '#00ff88',
                                            border: '2px solid var(--background-color)',
                                            borderRadius: '50%',
                                        }}
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [0.7, 1, 0.7]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity
                                        }}
                                    />
                                </motion.div>
                            </motion.div>

                            {/* Main Heading */}
                            <motion.div variants={itemVariants} className="mb-3">
                                <h1 style={{
                                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                                    fontWeight: 800,
                                    lineHeight: 1.1,
                                    marginBottom: '1rem'
                                }}>
                                    Hi, I'm{' '}
                                    <span style={{
                                        background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text'
                                    }}>
                                        Nischal Acharya
                                    </span>
                                </h1>
                            </motion.div>

                            {/* Optimized Role Text */}
                            <motion.div variants={itemVariants} className="mb-4">
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}>
                                    <h2 style={{
                                        fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                                        fontWeight: 600,
                                        color: 'var(--text-color)',
                                        marginBottom: '0.5rem',
                                        minHeight: '60px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <span style={{
                                            fontFamily: "'Monaco', 'Consolas', monospace",
                                            background: 'linear-gradient(135deg, var(--text-color), var(--text-muted))',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text'
                                        }}>
                                            {displayText}
                                            <span style={{
                                                color: 'var(--primary-color)',
                                                fontWeight: 300,
                                                opacity: showCursor ? 1 : 0,
                                                transition: 'opacity 0.1s ease'
                                            }}>
                                                |
                                            </span>
                                        </span>
                                    </h2>
                                    <motion.div
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            background: 'rgba(0, 255, 136, 0.1)',
                                            color: '#00ff88',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '25px',
                                            fontSize: '0.9rem',
                                            fontWeight: 500,
                                            border: '1px solid rgba(0, 255, 136, 0.2)',
                                        }}
                                        variants={floatingVariants}
                                        animate="float"
                                    >
                                        <FaPlay size={12} />
                                        <span>Available for work</span>
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Description */}
                            <motion.div variants={itemVariants} className="mb-5">
                                <p style={{
                                    fontSize: '1.1rem',
                                    lineHeight: 1.6,
                                    color: 'var(--text-muted)',
                                    maxWidth: '600px',
                                    margin: '0 auto'
                                }}>
                                    I'm a passionate developer from <span style={{
                                    color: 'var(--primary-color)',
                                    fontWeight: 600
                                }}>Gauradaha-Jhapa, Nepal</span>,
                                    specializing in creating digital experiences that blend creativity with functionality.
                                </p>
                            </motion.div>

                            {/* Action Buttons */}
                            <motion.div
                                variants={itemVariants}
                                className="mb-5"
                            >
                                <div className="d-flex gap-3 justify-content-center flex-wrap">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Button
                                            size="lg"
                                            style={{
                                                background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                                                border: 'none',
                                                color: 'white',
                                                padding: '0.875rem 1.75rem',
                                                borderRadius: '50px',
                                                fontWeight: 600,
                                                minWidth: '160px'
                                            }}
                                            onClick={() => scrollToSection('projects')}
                                        >
                                            <FaCode className="me-2" />
                                            View My Work
                                        </Button>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            style={{
                                                background: 'transparent',
                                                border: '2px solid var(--primary-color)',
                                                color: 'var(--primary-color)',
                                                padding: '0.875rem 1.75rem',
                                                borderRadius: '50px',
                                                fontWeight: 600,
                                                minWidth: '160px'
                                            }}
                                            onClick={() => scrollToSection('contact')}
                                        >
                                            <FaRocket className="me-2" />
                                            Start Project
                                        </Button>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            style={{
                                                background: 'transparent',
                                                border: `2px solid ${
                                                    downloadState === 'completed'
                                                        ? '#00ff88'
                                                        : downloadState === 'downloading'
                                                            ? 'var(--primary-color)'
                                                            : 'var(--border-color)'
                                                }`,
                                                color: downloadState === 'completed' ? '#00ff88' : 'var(--text-muted)',
                                                padding: '0.875rem 1.75rem',
                                                borderRadius: '50px',
                                                fontWeight: 600,
                                                minWidth: '160px',
                                                position: 'relative',
                                                overflow: 'hidden'
                                            }}
                                            onClick={handleDownloadResume}
                                            disabled={downloadState === 'downloading'}
                                        >
                                            {downloadState === 'downloading' ? (
                                                <>
                                                    <Spinner
                                                        animation="border"
                                                        size="sm"
                                                        className="me-2"
                                                        style={{ width: '1rem', height: '1rem' }}
                                                    />
                                                    Downloading...
                                                </>
                                            ) : downloadState === 'completed' ? (
                                                <>
                                                    <FaCheck className="me-2" />
                                                    Downloaded!
                                                </>
                                            ) : (
                                                <>
                                                    <FaDownload className="me-2" />
                                                    Download CV
                                                </>
                                            )}
                                        </Button>
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Social Links */}
                            <motion.div variants={itemVariants}>
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{
                                        color: 'var(--text-muted)',
                                        fontSize: '0.9rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px',
                                        fontWeight: 500,
                                        marginBottom: '1rem'
                                    }}>Follow my journey</p>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: '0.75rem',
                                        flexWrap: 'wrap'
                                    }}>
                                        {socialLinks.map((social, index) => (
                                            <motion.a
                                                key={social.label}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: '48px',
                                                    height: '48px',
                                                    borderRadius: '50%',
                                                    background: 'var(--card-bg)',
                                                    border: '1px solid var(--border-color)',
                                                    textDecoration: 'none',
                                                    color: 'var(--text-muted)',
                                                }}
                                                whileHover={{
                                                    scale: 1.15,
                                                    y: -3,
                                                    color: social.color,
                                                    borderColor: social.color,
                                                }}
                                                whileTap={{ scale: 0.95 }}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{
                                                    delay: 1 + index * 0.08,
                                                    type: "spring",
                                                    stiffness: 300,
                                                    damping: 20
                                                }}
                                                aria-label={social.label}
                                            >
                                                <social.Icon size={18} />
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                        </motion.div>
                    </Col>
                </Row>
            </Container>

            {/* Download Success Toast */}
            <AnimatePresence>
                {downloadState === 'completed' && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.8 }}
                        style={{
                            position: 'fixed',
                            bottom: '2rem',
                            right: '2rem',
                            background: 'var(--card-bg)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '12px',
                            padding: '1rem 1.5rem',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                        >
                            <FaCheck style={{ color: '#00ff88', fontSize: '1.25rem' }} />
                        </motion.div>
                        <div>
                            <div style={{ fontWeight: 600, color: 'var(--text-color)' }}>
                                Download Complete!
                            </div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                CV downloaded successfully
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>
                {`
                    .hero-section {
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .floating-particles, .floating-shapes {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        pointer-events: none;
                        z-index: -1;
                    }
                    
                    /* Optimize animations for performance */
                    @media (prefers-reduced-motion: reduce) {
                        .floating-particles,
                        .floating-shapes,
                        .animated-gradient {
                            display: none;
                        }
                        
                        * {
                            animation-duration: 0.01ms !important;
                            animation-iteration-count: 1 !important;
                            transition-duration: 0.01ms !important;
                        }
                    }
                `}
            </style>
        </section>
    );
};

export default Hero;