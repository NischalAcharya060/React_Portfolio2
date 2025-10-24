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
    FaEnvelope,
    FaCode,
    FaRocket,
    FaRegSmile,
    FaMapMarkerAlt
} from 'react-icons/fa';

const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
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
            color: '#333333'
        },
        {
            icon: FaLinkedin,
            href: 'https://www.linkedin.com/in/nischal-acharya101/',
            label: 'LinkedIn',
            color: '#0077B5'
        },
        {
            icon: FaTwitter,
            href: 'https://x.com/nischalacharya_',
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

    const services = [
        'Web Development',
        'Mobile Applications',
        'UI/UX Design',
        'API Development',
        'DevOps & Cloud',
        'Technical Consulting'
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
        <footer className="footer-section">
            {/* Background Pattern */}
            <div className="footer-background">
                <div className="bg-pattern primary-pattern" />
                <div className="bg-pattern secondary-pattern" />
            </div>

            <Container>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, threshold: 0.1 }}
                >
                    {/* Main Footer Content */}
                    <Row className="footer-content">
                        {/* Brand Section */}
                        <Col lg={4} className="brand-section">
                            <motion.div variants={itemVariants}>
                                <div className="brand-header">
                                    <FaCode className="brand-icon" />
                                    <h5 className="brand-title">Nischal Acharya</h5>
                                </div>
                                <p className="brand-description">
                                    Full-stack developer passionate about creating digital experiences
                                    that make a difference. Let's build something amazing together!
                                </p>
                                <div className="social-links">
                                    {socialLinks.map((social, index) => (
                                        <motion.a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-icon"
                                            whileHover={{
                                                scale: 1.1,
                                                y: -3,
                                                color: social.color,
                                                borderColor: social.color,
                                                background: `${social.color}15`
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
                        <Col lg={2} md={6} className="links-section">
                            <motion.div variants={itemVariants}>
                                <h6 className="section-title">Quick Links</h6>
                                <ul className="links-list">
                                    {quickLinks.map((link, index) => (
                                        <motion.li
                                            key={link.name}
                                            className="link-item"
                                            whileHover={{ x: 5 }}
                                        >
                                            <a
                                                href={link.href}
                                                className="link-text"
                                            >
                                                {link.name}
                                            </a>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </Col>

                        {/* Services */}
                        <Col lg={3} md={6} className="services-section">
                            <motion.div variants={itemVariants}>
                                <h6 className="section-title">Services</h6>
                                <ul className="services-list">
                                    {services.map((service, index) => (
                                        <motion.li
                                            key={service}
                                            className="service-item"
                                            whileHover={{ x: 5 }}
                                        >
                                            <FaRocket className="service-icon" />
                                            <span className="service-text">{service}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </Col>

                        {/* Contact Info */}
                        <Col lg={3} md={6}>
                            <motion.div variants={itemVariants}>
                                <h6 className="section-title">Let's Talk</h6>
                                <div className="contact-info">
                                    <div className="contact-item">
                                        <FaEnvelope className="contact-icon" />
                                        <div className="contact-details">
                                            <div className="contact-label">Email</div>
                                            <a
                                                href="mailto:Nischal060@gmail.com"
                                                className="contact-value"
                                            >
                                                Nischal060@gmail.com
                                            </a>
                                        </div>
                                    </div>
                                    <div className="contact-item">
                                        <FaMapMarkerAlt className="contact-icon" />
                                        <div className="contact-details">
                                            <div className="contact-label">Location</div>
                                            <div className="contact-text">Gauradaha-Jhapa, Nepal</div>
                                        </div>
                                    </div>
                                    <div className="contact-item">
                                        <FaRegSmile className="contact-icon" />
                                        <div className="contact-details">
                                            <div className="contact-label">Status</div>
                                            <div className="contact-text">Available for work</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Col>
                    </Row>

                    {/* Bottom Bar */}
                    <motion.div
                        variants={itemVariants}
                        className="footer-bottom"
                    >
                        <Row className="bottom-content">
                            <Col md={6} className="copyright-section">
                                <p className="copyright-text">
                                    © {currentYear} Nischal Acharya. Crafted with{' '}
                                    <motion.span
                                        whileHover={{ scale: 1.3 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <FaHeart className="heart-icon" />
                                    </motion.span>
                                </p>
                            </Col>

                            <Col md={6} className="cta-section">
                                <div className="cta-content">
                                    <motion.div
                                        className="cta-text"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <span className="cta-message">Ready to start your project?</span>
                                        <motion.a
                                            href="#contact"
                                            className="cta-button"
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
                        className="back-to-top"
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

            <style jsx>{`
                .footer-section {
                    background: linear-gradient(135deg, 
                        var(--surface-color) 0%, 
                        var(--background-color) 100%);
                    border-top: 1px solid var(--border-color);
                    position: relative;
                    overflow: hidden;
                }

                .footer-background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0.05;
                    pointer-events: none;
                }

                .bg-pattern {
                    position: absolute;
                    border-radius: 50%;
                }

                .primary-pattern {
                    top: 10%;
                    left: 10%;
                    width: 100px;
                    height: 100px;
                    background: radial-gradient(circle, var(--primary-color) 0%, transparent 70%);
                }

                .secondary-pattern {
                    bottom: 20%;
                    right: 15%;
                    width: 150px;
                    height: 150px;
                    background: radial-gradient(circle, var(--secondary-color) 0%, transparent 70%);
                }

                .footer-content {
                    padding: var(--spacing-2xl) 0;
                }

                /* Brand Section */
                .brand-section {
                    margin-bottom: var(--spacing-xl);
                }

                @media (min-width: 992px) {
                    .brand-section {
                        margin-bottom: 0;
                    }
                }

                .brand-header {
                    display: flex;
                    align-items: center;
                    margin-bottom: var(--spacing-md);
                }

                .brand-icon {
                    font-size: var(--font-size-xl);
                    color: var(--primary-color);
                    margin-right: var(--spacing-md);
                }

                .brand-title {
                    font-size: var(--font-size-lg);
                    font-weight: 700;
                    color: var(--text-color);
                    margin: 0;
                }

                .brand-description {
                    color: var(--text-muted);
                    line-height: 1.6;
                    margin-bottom: var(--spacing-lg);
                }

                .social-links {
                    display: flex;
                    gap: var(--spacing-md);
                }

                .social-icon {
                    width: 45px;
                    height: 45px;
                    background: var(--card-bg);
                    border: 1px solid var(--border-color);
                    color: var(--text-muted);
                    border-radius: var(--radius-lg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    transition: all var(--transition-base);
                }

                /* Links Section */
                .links-section,
                .services-section,
                .contact-section {
                    margin-bottom: var(--spacing-xl);
                }

                @media (min-width: 768px) {
                    .links-section,
                    .services-section,
                    .contact-section {
                        margin-bottom: 0;
                    }
                }

                .section-title {
                    font-size: var(--font-size-base);
                    font-weight: 700;
                    color: var(--text-color);
                    margin-bottom: var(--spacing-lg);
                }

                .links-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .link-item {
                    margin-bottom: var(--spacing-sm);
                }

                .link-text {
                    color: var(--text-muted);
                    text-decoration: none;
                    transition: color var(--transition-base);
                    font-size: var(--font-size-sm);
                }

                .link-text:hover {
                    color: var(--primary-color);
                }

                /* Services Section */
                .services-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .service-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: var(--spacing-sm);
                }

                .service-icon {
                    font-size: var(--font-size-xs);
                    color: var(--primary-color);
                    margin-right: var(--spacing-sm);
                    flex-shrink: 0;
                }

                .service-text {
                    color: var(--text-muted);
                    font-size: var(--font-size-sm);
                }

                /* Contact Section */
                .contact-info {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-md);
                }

                .contact-item {
                    display: flex;
                    align-items: flex-start;
                }

                .contact-icon {
                    font-size: var(--font-size-sm);
                    color: var(--primary-color);
                    margin-right: var(--spacing-md);
                    margin-top: 2px;
                    flex-shrink: 0;
                }

                .contact-details {
                    flex: 1;
                }

                .contact-label {
                    font-size: var(--font-size-xs);
                    color: var(--text-muted);
                    margin-bottom: var(--spacing-xs);
                }

                .contact-value {
                    color: var(--text-color);
                    text-decoration: none;
                    font-size: var(--font-size-sm);
                    font-weight: 500;
                    transition: color var(--transition-base);
                }

                .contact-value:hover {
                    color: var(--primary-color);
                }

                .contact-text {
                    color: var(--text-muted);
                    font-size: var(--font-size-sm);
                }

                /* Footer Bottom */
                .footer-bottom {
                    border-top: 1px solid var(--border-color);
                    padding-top: var(--spacing-lg);
                }

                .bottom-content {
                    align-items: center;
                }

                .copyright-section {
                    text-align: center;
                    margin-bottom: var(--spacing-md);
                }

                @media (min-width: 768px) {
                    .copyright-section {
                        text-align: left;
                        margin-bottom: 0;
                    }
                }

                .copyright-text {
                    color: var(--text-muted);
                    margin: 0;
                    font-size: var(--font-size-sm);
                }

                .heart-icon {
                    color: #e25555;
                    display: inline-block;
                    margin: 0 2px;
                }

                .cta-section {
                    text-align: center;
                }

                @media (min-width: 768px) {
                    .cta-section {
                        text-align: right;
                    }
                }

                .cta-content {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: var(--spacing-md);
                }

                @media (min-width: 768px) {
                    .cta-content {
                        justify-content: flex-end;
                    }
                }

                .cta-text {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                    color: var(--text-muted);
                    font-size: var(--font-size-sm);
                }

                .cta-message {
                    white-space: nowrap;
                }

                .cta-button {
                    background: var(--gradient-primary);
                    border: none;
                    color: white;
                    border-radius: 50px;
                    font-weight: 500;
                    padding: var(--spacing-sm) var(--spacing-lg);
                    font-size: var(--font-size-sm);
                    text-decoration: none;
                    transition: all var(--transition-base);
                    white-space: nowrap;
                }

                .cta-button:hover {
                    text-decoration: none;
                    color: white;
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-lg);
                }

                /* Back to Top Button */
                .back-to-top {
                    width: 50px;
                    height: 50px;
                    background: var(--gradient-primary);
                    border: none;
                    border-radius: 50%;
                    color: white;
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    z-index: 1000;
                    box-shadow: var(--shadow);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all var(--transition-base);
                    cursor: pointer;
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .footer-content {
                        padding: var(--spacing-xl) 0;
                    }

                    .back-to-top {
                        bottom: 20px;
                        right: 20px;
                        width: 45px;
                        height: 45px;
                    }

                    .cta-text {
                        flex-direction: column;
                        gap: var(--spacing-sm);
                        text-align: center;
                    }

                    .social-links {
                        justify-content: center;
                    }

                    .brand-header {
                        justify-content: center;
                        text-align: center;
                    }

                    .brand-description {
                        text-align: center;
                    }
                }

                @media (max-width: 576px) {
                    .footer-content {
                        padding: var(--spacing-lg) 0;
                    }

                    .section-title {
                        text-align: center;
                    }

                    .links-list,
                    .services-list {
                        text-align: center;
                    }

                    .contact-item {
                        justify-content: center;
                        text-align: center;
                    }

                    .cta-content {
                        flex-direction: column;
                        gap: var(--spacing-sm);
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;