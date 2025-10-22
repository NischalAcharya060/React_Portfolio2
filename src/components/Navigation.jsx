// src/components/Navigation.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaCode, FaHome, FaUser, FaTools, FaProjectDiagram, FaBriefcase, FaEnvelope } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import './css/Navigation.css';

const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isDark, toggleTheme } = useTheme();
    const navRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setScrolled(scrollY > 50);

            const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const navItems = [
        { name: 'Home', href: '#home', icon: FaHome },
        { name: 'About', href: '#about', icon: FaUser },
        { name: 'Skills', href: '#skills', icon: FaTools },
        { name: 'Projects', href: '#projects', icon: FaProjectDiagram },
        { name: 'Experience', href: '#experience', icon: FaBriefcase },
        { name: 'Contact', href: '#contact', icon: FaEnvelope }
    ];

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            const offset = 80; // Account for fixed navbar height
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
        setIsMobileMenuOpen(false);
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
        hidden: { y: -20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };

    const mobileMenuVariants = {
        closed: {
            opacity: 0,
            scale: 0.95,
            transition: {
                duration: 0.2
            }
        },
        open: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3,
                staggerChildren: 0.1
            }
        }
    };

    const mobileItemVariants = {
        closed: { x: -50, opacity: 0 },
        open: { x: 0, opacity: 1 }
    };

    return (
        <>
            <Navbar
                ref={navRef}
                expand="lg"
                fixed="top"
                className={`modern-navbar ${scrolled ? 'navbar-scrolled' : ''} ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}
            >
                <Container>
                    {/* Animated Logo */}
                    <motion.div
                        className="navbar-brand-container"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Navbar.Brand
                            href="#home"
                            className="fw-bold gradient-text logo-text"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection('#home');
                            }}
                        >
                            <motion.div
                                className="logo-icon"
                                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <FaCode />
                            </motion.div>
                            <span className="logo-name">Nischal Acharya</span>
                            <motion.div
                                className="logo-underline"
                                initial={{ scaleX: 0 }}
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </Navbar.Brand>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="nav-items-desktop"
                        >
                            <Nav className="align-items-center">
                                {navItems.map((item) => (
                                    <motion.div
                                        key={item.name}
                                        variants={itemVariants}
                                        className="nav-item-wrapper"
                                    >
                                        <Nav.Link
                                            href={item.href}
                                            className={`nav-link-custom ${
                                                activeSection === item.name.toLowerCase() ? 'active' : ''
                                            }`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                scrollToSection(item.href);
                                            }}
                                        >
                                            <motion.div
                                                className="nav-link-content"
                                                whileHover={{ y: -2 }}
                                                whileTap={{ y: 0 }}
                                            >
                                                <item.icon className="nav-icon" />
                                                <span className="nav-text">{item.name}</span>
                                                {activeSection === item.name.toLowerCase() && (
                                                    <motion.div
                                                        layoutId="activeIndicator"
                                                        className="nav-active-indicator"
                                                        initial={false}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 500,
                                                            damping: 30
                                                        }}
                                                    />
                                                )}
                                            </motion.div>
                                        </Nav.Link>
                                    </motion.div>
                                ))}

                                {/* Theme Toggle */}
                                <motion.div variants={itemVariants}>
                                    <motion.button
                                        className="theme-toggle-btn"
                                        onClick={toggleTheme}
                                        whileHover={{
                                            scale: 1.1,
                                            rotate: 180,
                                            transition: { duration: 0.3 }
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                        animate={{
                                            rotate: isDark ? 180 : 0
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            type: "spring",
                                            stiffness: 100
                                        }}
                                    >
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={isDark ? 'sun' : 'moon'}
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                exit={{ scale: 0, rotate: 180 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {isDark ? <FaSun /> : <FaMoon />}
                                            </motion.div>
                                        </AnimatePresence>
                                    </motion.button>
                                </motion.div>
                            </Nav>
                        </motion.div>
                    </Navbar.Collapse>

                    {/* Mobile Menu Toggle */}
                    <motion.button
                        className="mobile-toggle-btn"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Toggle menu"
                    >
                        <motion.div
                            className="hamburger"
                            animate={isMobileMenuOpen ? "open" : "closed"}
                        >
                            <motion.span
                                variants={{
                                    closed: { rotate: 0, y: 0 },
                                    open: { rotate: 45, y: 7 }
                                }}
                            />
                            <motion.span
                                variants={{
                                    closed: { opacity: 1 },
                                    open: { opacity: 0 }
                                }}
                            />
                            <motion.span
                                variants={{
                                    closed: { rotate: 0, y: 0 },
                                    open: { rotate: -45, y: -7 }
                                }}
                            />
                        </motion.div>
                    </motion.button>
                </Container>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            className="mobile-menu-overlay"
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={mobileMenuVariants}
                        >
                            <motion.div className="mobile-menu-content">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        variants={mobileItemVariants}
                                        custom={index}
                                    >
                                        <Nav.Link
                                            href={item.href}
                                            className={`mobile-nav-link ${
                                                activeSection === item.name.toLowerCase() ? 'active' : ''
                                            }`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                scrollToSection(item.href);
                                            }}
                                        >
                                            <motion.div
                                                className="mobile-link-content"
                                                whileHover={{ x: 10 }}
                                                whileTap={{ x: 0 }}
                                            >
                                                <item.icon className="mobile-nav-icon" />
                                                <span>{item.name}</span>
                                                <motion.div
                                                    className="mobile-active-indicator"
                                                    animate={{
                                                        scale: activeSection === item.name.toLowerCase() ? 1 : 0
                                                    }}
                                                    transition={{ duration: 0.2 }}
                                                />
                                            </motion.div>
                                        </Nav.Link>
                                    </motion.div>
                                ))}

                                {/* Mobile Theme Toggle */}
                                <motion.div
                                    variants={mobileItemVariants}
                                    className="mobile-theme-toggle"
                                >
                                    <motion.button
                                        className="mobile-theme-btn"
                                        onClick={toggleTheme}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={isDark ? 'sun-mobile' : 'moon-mobile'}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {isDark ? <FaSun /> : <FaMoon />}
                                            </motion.div>
                                        </AnimatePresence>
                                        <span>Switch to {isDark ? 'Light' : 'Dark'} Mode</span>
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Scroll Progress Bar */}
                <motion.div
                    className="scroll-progress-bar"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: scrolled ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        transformOrigin: 'left',
                        background: `linear-gradient(90deg, var(--primary-color), var(--secondary-color))`
                    }}
                />
            </Navbar>
        </>
    );
};

export default Navigation;