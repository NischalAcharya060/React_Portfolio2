// src/components/Footer.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaHeart,
    FaArrowUp,
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaInstagram,
    FaFacebook,
    FaEnvelope,
    FaCode,
    FaRocket,
    FaRegSmile, FaMapMarkerAlt
} from 'react-icons/fa';

const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        // Show back-to-top button when scrolling down
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const quickLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Experience', href: '#experience' },
        { name: 'Contact', href: '#contact' }
    ];

    const socialLinks = [
        {
            icon: FaGithub,
            href: 'https://github.com/NischalAcharya060',
            label: 'GitHub',
            color: '#333'
        },
        {
            icon: FaLinkedin,
            href: 'https://www.linkedin.com/in/nischal-acharya101/',
            label: 'LinkedIn',
            color: '#0077B5'
        },
        {
            icon: FaTwitter,
            href: 'https://x.com/Nischal79783380',
            label: 'Twitter',
            color: '#1DA1F2'
        },
        {
            icon: FaInstagram,
            href: 'https://www.instagram.com/its_nischalacharya/',
            label: 'Instagram',
            color: '#E4405F'
        },
        {
            icon: FaEnvelope,
            href: 'mailto:Nischal060@gmail.com',
            label: 'Email',
            color: '#D44638'
        }
    ];

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
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <footer
            className="position-relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, var(--surface-color) 0%, var(--background-color) 100%)',
                borderTop: '1px solid var(--border-color)'
            }}
        >
            {/* Background Pattern */}
            <div className="position-absolute top-0 start-0 w-100 h-100 opacity-5">
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    width: '100px',
                    height: '100px',
                    background: 'radial-gradient(circle, var(--primary-color) 0%, transparent 70%)',
                    borderRadius: '50%'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '20%',
                    right: '15%',
                    width: '150px',
                    height: '150px',
                    background: 'radial-gradient(circle, var(--secondary-color) 0%, transparent 70%)',
                    borderRadius: '50%'
                }} />
            </div>

            <Container>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, threshold: 0.1 }}
                >
                    {/* Main Footer Content */}
                    <Row className="py-5 gy-4">
                        {/* Brand Section */}
                        <Col lg={4} className="mb-4 mb-lg-0">
                            <motion.div variants={itemVariants}>
                                <div className="d-flex align-items-center mb-3">
                                    <FaCode
                                        size={28}
                                        className="me-3"
                                        style={{ color: 'var(--primary-color)' }}
                                    />
                                    <h5 className="fw-bold mb-0" style={{ color: 'var(--text-color)' }}>
                                        Nischal Acharya
                                    </h5>
                                </div>
                                <p className="text-muted mb-4" style={{ lineHeight: '1.6' }}>
                                    Full-stack developer passionate about creating digital experiences
                                    that make a difference. Let's build something amazing together!
                                </p>
                                <div className="d-flex gap-3">
                                    {socialLinks.map((social, index) => (
                                        <motion.a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-icon d-flex align-items-center justify-content-center rounded-3"
                                            style={{
                                                width: '45px',
                                                height: '45px',
                                                background: 'var(--card-bg)',
                                                border: `1px solid var(--border-color)`,
                                                color: 'var(--text-muted)',
                                                textDecoration: 'none',
                                                transition: 'all 0.3s ease'
                                            }}
                                            whileHover={{
                                                scale: 1.1,
                                                y: -3,
                                                color: social.color,
                                                borderColor: social.color,
                                                background: `${social.color}10`
                                            }}
                                            whileTap={{ scale: 0.9 }}
                                            variants={itemVariants}
                                            aria-label={social.label}
                                        >
                                            <social.icon size={18} />
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        </Col>

                        {/* Quick Links */}
                        <Col lg={2} md={6} className="mb-4 mb-md-0">
                            <motion.div variants={itemVariants}>
                                <h6 className="fw-bold mb-3" style={{ color: 'var(--text-color)' }}>
                                    Quick Links
                                </h6>
                                <ul className="list-unstyled">
                                    {quickLinks.map((link, index) => (
                                        <motion.li
                                            key={link.name}
                                            className="mb-2"
                                            whileHover={{ x: 5 }}
                                        >
                                            <a
                                                href={link.href}
                                                className="text-muted text-decoration-none hover-primary"
                                                style={{ transition: 'color 0.3s ease' }}
                                            >
                                                {link.name}
                                            </a>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </Col>

                        {/* Services */}
                        <Col lg={3} md={6} className="mb-4 mb-md-0">
                            <motion.div variants={itemVariants}>
                                <h6 className="fw-bold mb-3" style={{ color: 'var(--text-color)' }}>
                                    Services
                                </h6>
                                <ul className="list-unstyled">
                                    {[
                                        'Web Development',
                                        'Mobile Applications',
                                        'UI/UX Design',
                                        'API Development',
                                        'DevOps & Cloud',
                                        'Technical Consulting'
                                    ].map((service, index) => (
                                        <motion.li
                                            key={service}
                                            className="mb-2 d-flex align-items-center"
                                            whileHover={{ x: 5 }}
                                        >
                                            <FaRocket
                                                size={12}
                                                className="me-2"
                                                style={{ color: 'var(--primary-color)' }}
                                            />
                                            <span className="text-muted">{service}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </Col>

                        {/* Contact Info */}
                        <Col lg={3} md={6}>
                            <motion.div variants={itemVariants}>
                                <h6 className="fw-bold mb-3" style={{ color: 'var(--text-color)' }}>
                                    Let's Talk
                                </h6>
                                <div className="contact-info">
                                    <div className="d-flex align-items-center mb-3">
                                        <FaEnvelope
                                            size={16}
                                            className="me-3"
                                            style={{ color: 'var(--primary-color)' }}
                                        />
                                        <div>
                                            <div className="small text-muted">Email</div>
                                            <a
                                                href="mailto:Nischal060@gmail.com"
                                                className="text-decoration-none hover-primary"
                                            >
                                                Nischal060@gmail.com
                                            </a>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <FaMapMarkerAlt
                                            size={16}
                                            className="me-3"
                                            style={{ color: 'var(--primary-color)' }}
                                        />
                                        <div>
                                            <div className="small text-muted">Location</div>
                                            <div className="text-muted">Gauradaha-Jhapa, Nepal</div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <FaRegSmile
                                            size={16}
                                            className="me-3"
                                            style={{ color: 'var(--primary-color)' }}
                                        />
                                        <div>
                                            <div className="small text-muted">Status</div>
                                            <div className="text-muted">Available for work</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Col>
                    </Row>

                    {/* Bottom Bar */}
                    <motion.div
                        variants={itemVariants}
                        className="border-top pt-4"
                        style={{ borderColor: 'var(--border-color) !important' }}
                    >
                        <Row className="align-items-center">
                            <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
                                <p className="mb-0 text-muted">
                                    © {currentYear} Nischal Acharya. Crafted with{' '}
                                    <motion.span
                                        whileHover={{ scale: 1.3 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <FaHeart
                                            size={14}
                                            style={{
                                                color: '#e25555',
                                                display: 'inline-block',
                                                margin: '0 2px'
                                            }}
                                        />
                                    </motion.span>{' '}
                                </p>
                            </Col>

                            <Col md={6} className="text-center text-md-end">
                                <div className="d-flex justify-content-center justify-content-md-end align-items-center gap-3">
                                    <motion.div
                                        className="d-flex align-items-center text-muted"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <span className="me-2">Ready to start your project?</span>
                                        <motion.a
                                            href="#contact"
                                            className="btn btn-sm btn-primary rounded-pill px-3"
                                            style={{
                                                background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                                                border: 'none',
                                                color: 'white',
                                                fontWeight: '500'
                                            }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Get In Touch
                                        </motion.a>
                                    </motion.div>
                                </div>
                            </Col>
                        </Row>
                    </motion.div>
                </motion.div>
            </Container>

            {/* Back to Top Button */}
            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0, y: 20 }}
                        onClick={scrollToTop}
                        className="back-to-top btn btn-primary rounded-circle position-fixed d-flex align-items-center justify-content-center"
                        style={{
                            width: '50px',
                            height: '50px',
                            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                            border: 'none',
                            bottom: '30px',
                            right: '30px',
                            zIndex: 1000,
                            boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                        }}
                        whileHover={{
                            scale: 1.1,
                            y: -3,
                            boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
                        }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Back to top"
                    >
                        <FaArrowUp size={18} />
                    </motion.button>
                )}
            </AnimatePresence>

            <style>
                {`
                    .hover-primary:hover {
                        color: var(--primary-color) !important;
                    }

                    .social-icon {
                        transition: all 0.3s ease !important;
                    }

                    .back-to-top {
                        transition: all 0.3s ease !important;
                    }

                    @media (max-width: 768px) {
                        .back-to-top {
                            bottom: 20px;
                            right: 20px;
                            width: 45px;
                            height: 45px;
                        }
                    }

                    .contact-info a {
                        color: var(--text-color);
                        transition: color 0.3s ease;
                    }

                    .contact-info a:hover {
                        color: var(--primary-color);
                    }
                `}
            </style>
        </footer>
    );
};

export default Footer;