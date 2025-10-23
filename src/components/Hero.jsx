// src/components/Hero.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
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
    FaWordpress
} from 'react-icons/fa';

const Hero = () => {
    const [currentRole, setCurrentRole] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const [displayText, setDisplayText] = useState('');
    const [showCursor, setShowCursor] = useState(true);

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
        { Icon: FaTwitter, href: 'https://x.com/Nischal79783380', label: 'Twitter', color: '#1DA1F2' },
        { Icon: FaFacebook, href: 'https://www.facebook.com/Nischal.Acharya.58760', label: 'Facebook', color: '#1877F2' },
        { Icon: FaEnvelope, href: 'mailto:Nischal060@gmail.com', label: 'Email', color: '#D44638' }
    ];

    const skills = [
        { icon: FaCode, label: 'Frontend', description: 'React, Vue, JavaScript' },
        { icon: FaServer, label: 'Backend', description: 'Node.js, Python, PHP' },
        { icon: FaWordpress, label: 'WordPress', description: 'Custom Themes & Plugins' },
        { icon: FaRocket, label: 'Freelance', description: '5+ Projects Delivered' }
    ];

    const resumeFile = '/resume/Nischal_Acharya_CV.pdf';
    const resumeFileName = 'Nischal_Acharya_CV.pdf';

    const handleDownloadResume = () => {
        // Create a temporary anchor element
        const link = document.createElement('a');
        link.href = resumeFile;
        link.download = resumeFileName;
        document.body.appendChild(link);

        // Trigger the download
        link.click();

        // Clean up
        document.body.removeChild(link);

        // Optional: Add analytics or tracking here
        console.log('Resume download initiated');
    };

    // Alternative method using fetch for better error handling
    const handleDownloadResumeWithFetch = async () => {
        try {
            const response = await fetch(resumeFile);
            if (!response.ok) {
                throw new Error('Failed to fetch resume');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = resumeFileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            console.log('Resume downloaded successfully');
        } catch (error) {
            console.error('Error downloading resume:', error);
            // Fallback: Open in new tab if download fails
            window.open(resumeFile, '_blank');
        }
    };

    useEffect(() => {
        // Typewriter effect
        const currentRoleText = roles[currentRole];
        let charIndex = 0;

        const typeWriter = () => {
            if (charIndex < currentRoleText.length) {
                setDisplayText(currentRoleText.substring(0, charIndex + 1));
                charIndex++;
                setTimeout(typeWriter, 100);
            } else {
                setIsTyping(false);
                setTimeout(() => {
                    setIsTyping(true);
                    setCurrentRole((prev) => (prev + 1) % roles.length);
                    setDisplayText('');
                }, 2000);
            }
        };

        const timer = setTimeout(typeWriter, 500);
        return () => clearTimeout(timer);
    }, [currentRole]);

    useEffect(() => {
        // Cursor blink effect
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        return () => clearInterval(cursorInterval);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80;
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.15
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
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section
            id="home"
            className="hero-section min-vh-100 d-flex align-items-center position-relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, var(--background-color) 0%, var(--surface-color) 100%)',
                paddingTop: '6rem'
            }}
        >
            {/* Animated Gradient Background */}
            <motion.div
                className="hero-background"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(45deg, var(--primary-color) 0%, var(--secondary-color) 25%, var(--background-color) 50%, var(--primary-color) 75%, var(--secondary-color) 100%)',
                    backgroundSize: '400% 400%',
                    opacity: 0.03,
                    zIndex: -1
                }}
                animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Floating Particles */}
            <div className="floating-particles">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="floating-particle"
                        style={{
                            position: 'absolute',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${Math.random() * 4 + 2}px`,
                            height: `${Math.random() * 4 + 2}px`,
                            background: 'var(--primary-color)',
                            borderRadius: '50%',
                            opacity: 0.3,
                        }}
                        animate={{
                            y: [-10, 10, -10],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 2
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
                                <div style={{
                                    position: 'relative',
                                    width: '150px',
                                    height: '150px',
                                    borderRadius: '50%',
                                    padding: '4px',
                                    background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))'
                                }}>
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
                                    <div style={{
                                        position: 'absolute',
                                        top: '-2px',
                                        left: '-2px',
                                        right: '-2px',
                                        bottom: '-2px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                                        filter: 'blur(10px)',
                                        opacity: 0.5,
                                        zIndex: -1,
                                        animation: 'glow 3s ease-in-out infinite alternate'
                                    }} />
                                    <motion.div
                                        style={{
                                            position: 'absolute',
                                            bottom: '10px',
                                            right: '10px',
                                            width: '12px',
                                            height: '12px',
                                            background: '#00ff88',
                                            border: '2px solid var(--background-color)',
                                            borderRadius: '50%',
                                            boxShadow: '0 0 10px #00ff88'
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
                                </div>
                            </motion.div>

                            {/* Main Heading */}
                            <motion.div variants={itemVariants} className="mb-4">
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

                            {/* Animated Role Text */}
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
                                        marginBottom: '0.5rem'
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
                                                transition: 'opacity 0.3s ease'
                                            }}>
                                                |
                                            </span>
                                        </span>
                                    </h2>
                                    <div style={{
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
                                        backdropFilter: 'blur(10px)'
                                    }}>
                                        <FaPlay size={12} />
                                        <span>Available for work</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Description */}
                            <motion.div variants={itemVariants} className="mb-5">
                                <p style={{
                                    fontSize: '1.2rem',
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
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button
                                            size="lg"
                                            style={{
                                                background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                                                border: 'none',
                                                color: 'white',
                                                padding: '1rem 2rem',
                                                borderRadius: '50px',
                                                fontWeight: 600
                                            }}
                                            onClick={() => scrollToSection('projects')}
                                        >
                                            <FaCode className="me-2" />
                                            View My Work
                                        </Button>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            style={{
                                                background: 'transparent',
                                                border: '2px solid var(--primary-color)',
                                                color: 'var(--primary-color)',
                                                padding: '1rem 2rem',
                                                borderRadius: '50px',
                                                fontWeight: 600
                                            }}
                                            onClick={() => scrollToSection('contact')}
                                        >
                                            <FaRocket className="me-2" />
                                            Start Project
                                        </Button>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            style={{
                                                background: 'transparent',
                                                border: '2px solid var(--border-color)',
                                                color: 'var(--text-muted)',
                                                padding: '1rem 2rem',
                                                borderRadius: '50px',
                                                fontWeight: 600
                                            }}
                                            onClick={handleDownloadResume}
                                        >
                                            <FaDownload className="me-2" />
                                            Download CV
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
                                        gap: '1rem',
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
                                                    width: '50px',
                                                    height: '50px',
                                                    borderRadius: '50%',
                                                    background: 'var(--card-bg)',
                                                    border: '1px solid var(--border-color)',
                                                    textDecoration: 'none',
                                                    color: 'var(--text-muted)',
                                                    position: 'relative',
                                                    overflow: 'hidden'
                                                }}
                                                whileHover={{
                                                    scale: 1.2,
                                                    y: -5,
                                                    color: social.color
                                                }}
                                                whileTap={{ scale: 0.9 }}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{
                                                    delay: 1 + index * 0.1,
                                                    type: "spring",
                                                    stiffness: 200
                                                }}
                                                aria-label={social.label}
                                            >
                                                <social.Icon size={20} />
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </Col>
                </Row>

                {/* Scroll Indicator */}
                {/*<motion.div*/}
                {/*    style={{*/}
                {/*        position: 'absolute',*/}
                {/*        bottom: '2rem',*/}
                {/*        left: '50%',*/}
                {/*        transform: 'translateX(-50%)',*/}
                {/*        zIndex: 10*/}
                {/*    }}*/}
                {/*    initial={{ opacity: 0, y: 20 }}*/}
                {/*    animate={{ opacity: 1, y: 0 }}*/}
                {/*    transition={{ delay: 2.5 }}*/}
                {/*>*/}
                {/*    <motion.button*/}
                {/*        onClick={() => scrollToSection('about')}*/}
                {/*        style={{*/}
                {/*            background: 'transparent',*/}
                {/*            border: 'none',*/}
                {/*            color: 'var(--text-muted)',*/}
                {/*            display: 'flex',*/}
                {/*            flexDirection: 'column',*/}
                {/*            alignItems: 'center',*/}
                {/*            gap: '0.5rem',*/}
                {/*            cursor: 'pointer'*/}
                {/*        }}*/}
                {/*        whileHover={{ y: 5 }}*/}
                {/*        whileTap={{ scale: 0.9 }}*/}
                {/*        aria-label="Scroll to about section"*/}
                {/*    >*/}
                {/*        <motion.div*/}
                {/*            animate={{ y: [0, 10, 0] }}*/}
                {/*            transition={{*/}
                {/*                duration: 2,*/}
                {/*                repeat: Infinity,*/}
                {/*                ease: "easeInOut"*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            <FaChevronDown size={20} />*/}
                {/*        </motion.div>*/}
                {/*        <span style={{*/}
                {/*            fontSize: '0.8rem',*/}
                {/*            textTransform: 'uppercase',*/}
                {/*            letterSpacing: '2px',*/}
                {/*            fontWeight: 500*/}
                {/*        }}>Explore More</span>*/}
                {/*    </motion.button>*/}
                {/*</motion.div>*/}
            </Container>

            {/* Add the glow animation to your global CSS */}
            <style>
                {`
                    @keyframes glow {
                        from { opacity: 0.3; }
                        to { opacity: 0.7; }
                    }
                    
                    .hero-section {
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .floating-particles {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        pointer-events: none;
                        z-index: -1;
                    }
                `}
            </style>
        </section>
    );
};

export default Hero;