// src/components/Navigation.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaSun, FaMoon, FaCode, FaHome, FaUser, FaTools, FaProjectDiagram, FaBriefcase, FaEnvelope, FaBlog,
    FaAward
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const { isDark, toggleTheme } = useTheme();
    const navRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setScrolled(scrollY > 50);

            // Calculate scroll progress
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const progress = (scrollY / documentHeight) * 100;
            setScrollProgress(progress);

            const sections = ['home', 'about', 'skills', 'projects', 'experience', 'blog', 'contact'];
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
        { name: 'Home', href: '#home', icon: FaHome, id: 'home' },
        { name: 'About', href: '#about', icon: FaUser, id: 'about' },
        { name: 'Skills', href: '#skills', icon: FaTools, id: 'skills' },
        { name: 'Projects', href: '#projects', icon: FaProjectDiagram, id: 'projects' },
        { name: 'Experience', href: '#experience', icon: FaBriefcase, id: 'experience' },
        { name: 'Certification', href: '#certification', icon: FaAward, id: 'certification' },
        { name: 'Blog', href: '#blog', icon: FaBlog, id: 'blog' },
        { name: 'Contact', href: '#contact', icon: FaEnvelope, id: 'contact' }
    ];

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            const offset = 80;
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
                className={`custom-navbar ${scrolled ? 'scrolled' : ''}`}
            >
                <Container>
                    {/* Animated Logo */}
                    <motion.div
                        className="logo-container"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Navbar.Brand
                            href="#home"
                            className="navbar-brand-custom"
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
                            <span className="logo-text">Nischal Acharya</span>
                            <motion.div
                                className="logo-underline"
                                initial={{ scaleX: 0 }}
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </Navbar.Brand>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <Navbar.Collapse in={true} className="desktop-navigation">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <Nav className="nav-links-container">
                                {navItems.map((item) => (
                                    <motion.div
                                        key={item.name}
                                        variants={itemVariants}
                                        className="nav-item-wrapper"
                                    >
                                        <Nav.Link
                                            href={item.href}
                                            className={`nav-link-custom ${activeSection === item.id ? 'active' : ''} ${isDark ? 'dark-mode' : ''}`}
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
                                                <item.icon className={`nav-link-icon ${activeSection === item.id ? 'active-icon' : ''}`} />
                                                <span className={`nav-link-text ${activeSection === item.id ? 'active-text' : ''}`}>
                                                    {item.name}
                                                </span>
                                                {activeSection === item.id && (
                                                    <motion.div
                                                        layoutId="activeIndicator"
                                                        className="active-indicator"
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
                                <motion.div variants={itemVariants} className="theme-toggle-wrapper">
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
                                        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                                    >
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={isDark ? 'sun' : 'moon'}
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                exit={{ scale: 0, rotate: 180 }}
                                                transition={{ duration: 0.3 }}
                                                className="theme-icon"
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
                            className="hamburger-menu"
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
                    {/* Scroll Progress Bar */}
                    <motion.div
                        className="scroll-progress-bar"
                        style={{
                            width: `${scrollProgress}%`,
                            opacity: scrollProgress > 0 ? 1 : 0
                        }}
                        initial={false}
                        transition={{ duration: 0.1 }}
                    />
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
                                            className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''} ${isDark ? 'dark-mode' : ''}`}
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
                                                <item.icon className={`mobile-nav-icon ${activeSection === item.id ? 'active-icon' : ''}`} />
                                                <span className={`mobile-nav-text ${activeSection === item.id ? 'active-text' : ''}`}>
                                                    {item.name}
                                                </span>
                                                <motion.div
                                                    className="mobile-active-indicator"
                                                    animate={{
                                                        scale: activeSection === item.id ? 1 : 0
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
                                    className="mobile-theme-section"
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
                                                className="mobile-theme-icon"
                                            >
                                                {isDark ? <FaSun /> : <FaMoon />}
                                            </motion.div>
                                        </AnimatePresence>
                                        <span className="mobile-theme-label">
                                            Switch to {isDark ? 'Light' : 'Dark'} Mode
                                        </span>
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Navbar>

            <style jsx>{`
                .custom-navbar {
                    background: var(--navbar-bg);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid var(--border-color);
                    transition: all var(--transition-base);
                    padding: 0.75rem 0;
                    z-index: 1030;
                }

                .custom-navbar.scrolled {
                    background: var(--navbar-bg-scrolled);
                    box-shadow: var(--shadow);
                }

                /* Scroll Progress Bar */
                .scroll-progress-bar {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    height: 3px;
                    background: var(--gradient-primary);
                    z-index: 1031;
                    transition: width 0.1s ease;
                    border-radius: 0 2px 2px 0;
                    box-shadow: 0 0 10px rgba(var(--primary-rgb), 0.5);
                }

                /* Logo Styles */
                .logo-container {
                    display: flex;
                    align-items: center;
                }

                .navbar-brand-custom {
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    color: var(--text-color);
                    font-weight: 700;
                    font-size: 1.25rem;
                    position: relative;
                    padding: 0.5rem 0;
                    margin: 0;
                    cursor: pointer;
                }

                .navbar-brand-custom:hover {
                    text-decoration: none;
                    color: var(--text-color);
                }

                .logo-icon {
                    font-size: 1.5rem;
                    color: var(--primary-color);
                    margin-right: 0.5rem;
                    display: flex;
                    align-items: center;
                }

                .logo-text {
                    background: var(--gradient-primary);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .logo-underline {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: var(--gradient-primary);
                    transform-origin: left;
                }

                /* Desktop Navigation */
                .desktop-navigation {
                    flex-grow: 0;
                }

                .nav-links-container {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin: 0;
                }

                .nav-item-wrapper {
                    position: relative;
                }

                .nav-link-custom {
                    color: var(--text-muted);
                    text-decoration: none;
                    padding: 0.5rem 1rem;
                    border-radius: var(--radius-lg);
                    transition: all var(--transition-base);
                    position: relative;
                    border: none;
                    background: transparent;
                }

                .nav-link-custom:hover {
                    color: var(--primary-color);
                    background: rgba(var(--primary-rgb), 0.05);
                }

                /* Active state for light mode */
                .nav-link-custom.active:not(.dark-mode) {
                    color: var(--primary-color);
                    background: rgba(var(--primary-rgb), 0.1);
                }

                /* Active state for dark mode - White text with gradient background */
                .nav-link-custom.active.dark-mode {
                    color: white !important;
                    background: var(--gradient-primary) !important;
                    box-shadow: 0 4px 15px rgba(var(--primary-rgb), 0.3);
                }

                /* Active text in dark mode */
                .nav-link-custom.active.dark-mode .nav-link-text.active-text {
                    color: white !important;
                }

                /* Active icon in dark mode */
                .nav-link-custom.active.dark-mode .nav-link-icon.active-icon {
                    color: white !important;
                }

                .nav-link-content {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    position: relative;
                    z-index: 2;
                }

                .nav-link-icon {
                    font-size: 0.875rem;
                    flex-shrink: 0;
                    transition: color var(--transition-base);
                }

                .nav-link-text {
                    font-weight: 500;
                    font-size: 0.875rem;
                    white-space: nowrap;
                    transition: color var(--transition-base);
                }

                .active-indicator {
                    position: absolute;
                    bottom: -2px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 30px;
                    height: 2px;
                    background: var(--gradient-primary);
                    border-radius: var(--radius-sm);
                }

                /* Hide active indicator in dark mode when using gradient background */
                .nav-link-custom.active.dark-mode .active-indicator {
                    display: none;
                }

                /* Theme Toggle */
                .theme-toggle-wrapper {
                    margin-left: 0.5rem;
                }

                .theme-toggle-btn {
                    width: 45px;
                    height: 45px;
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--border-color);
                    background: var(--card-bg);
                    color: var(--text-muted);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all var(--transition-base);
                    cursor: pointer;
                    padding: 0;
                }

                .theme-toggle-btn:hover {
                    border-color: var(--primary-color);
                    color: var(--primary-color);
                    background: rgba(var(--primary-rgb), 0.05);
                }

                .theme-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                /* Mobile Toggle */
                .mobile-toggle-btn {
                    width: 45px;
                    height: 45px;
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--border-color);
                    background: var(--card-bg);
                    color: var(--text-color);
                    display: none;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 4px;
                    cursor: pointer;
                    transition: all var(--transition-base);
                    padding: 0;
                }

                .mobile-toggle-btn:hover {
                    border-color: var(--primary-color);
                    color: var(--primary-color);
                }

                .hamburger-menu {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    width: 20px;
                }

                .hamburger-menu span {
                    display: block;
                    height: 2px;
                    background: currentColor;
                    border-radius: 2px;
                    transition: all var(--transition-base);
                }

                /* Mobile Menu Overlay */
                .mobile-menu-overlay {
                    position: fixed;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    height: calc(100vh - 100%);
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(10px);
                    z-index: 1040;
                }

                .mobile-menu-content {
                    background: var(--card-bg);
                    border-top: 1px solid var(--border-color);
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    height: 100%;
                    overflow-y: auto;
                }

                .mobile-nav-link {
                    color: var(--text-color);
                    text-decoration: none;
                    padding: 1rem 0;
                    border-bottom: 1px solid var(--border-color);
                    transition: all var(--transition-base);
                    border: none;
                    background: transparent;
                }

                .mobile-nav-link:hover,
                .mobile-nav-link.active {
                    color: var(--primary-color);
                    text-decoration: none;
                }

                /* Mobile active state for dark mode */
                .mobile-nav-link.active.dark-mode {
                    color: white !important;
                    background: var(--gradient-primary) !important;
                    border-radius: var(--radius-lg);
                    padding: 1rem;
                    margin: 0 -1rem;
                    border-bottom: none;
                }

                .mobile-nav-link.active.dark-mode .mobile-nav-text.active-text {
                    color: white !important;
                }

                .mobile-nav-link.active.dark-mode .mobile-nav-icon.active-icon {
                    color: white !important;
                }

                .mobile-link-content {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    position: relative;
                }

                .mobile-nav-icon {
                    font-size: 1.25rem;
                    color: var(--primary-color);
                    width: 24px;
                    flex-shrink: 0;
                    transition: color var(--transition-base);
                }

                .mobile-nav-text {
                    font-weight: 500;
                    font-size: 1.125rem;
                    flex: 1;
                    transition: color var(--transition-base);
                }

                .mobile-active-indicator {
                    width: 6px;
                    height: 6px;
                    background: var(--primary-color);
                    border-radius: 50%;
                    margin-left: auto;
                }

                /* Hide mobile indicator in dark mode when using gradient background */
                .mobile-nav-link.active.dark-mode .mobile-active-indicator {
                    display: none;
                }

                .mobile-theme-section {
                    margin-top: auto;
                    padding-top: 1.5rem;
                    border-top: 1px solid var(--border-color);
                }

                .mobile-theme-btn {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    width: 100%;
                    padding: 1rem;
                    background: var(--surface-color);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-lg);
                    color: var(--text-color);
                    transition: all var(--transition-base);
                    cursor: pointer;
                    border: none;
                }

                .mobile-theme-btn:hover {
                    border-color: var(--primary-color);
                    color: var(--primary-color);
                }

                .mobile-theme-icon {
                    font-size: 1.25rem;
                    display: flex;
                    align-items: center;
                }

                .mobile-theme-label {
                    font-weight: 500;
                    font-size: 1rem;
                }

                /* Responsive Design */
                @media (max-width: 991px) {
                    .desktop-navigation {
                        display: none;
                    }

                    .mobile-toggle-btn {
                        display: flex;
                    }

                    .nav-links-container {
                        flex-direction: column;
                        gap: 0.5rem;
                    }

                    .nav-link-custom {
                        padding: 1rem 1.5rem;
                    }
                }

                @media (max-width: 576px) {
                    .logo-text {
                        font-size: 1rem;
                        display: inline-block;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        max-width: 150px;
                    }

                    .logo-icon {
                        font-size: 1.25rem;
                        margin-right: 0.5rem;
                    }

                    .mobile-menu-content {
                        padding: 1.5rem;
                    }

                    .mobile-nav-link {
                        padding: 1rem 0;
                    }

                    .mobile-nav-text {
                        font-size: 1rem;
                    }
                }
            `}</style>
        </>
    );
};

export default Navigation;