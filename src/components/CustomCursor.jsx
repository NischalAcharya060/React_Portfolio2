// src/components/CustomCursor.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import './css/CustomCursor.css';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
    const [cursorVariant, setCursorVariant] = useState('default');
    const [isVisible, setIsVisible] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if mobile device
    const checkMobile = useCallback(() => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isSmallScreen = window.innerWidth <= 768;
        return isTouchDevice || isSmallScreen;
    }, []);

    // Throttled mouse move handler
    const handleMouseMove = useCallback((e) => {
        setMousePosition({
            x: e.clientX,
            y: e.clientY
        });
    }, []);

    const handleMouseEnter = useCallback(() => setIsVisible(true), []);
    const handleMouseLeave = useCallback(() => setIsVisible(false), []);
    const handleMouseDown = useCallback(() => setIsClicking(true), []);
    const handleMouseUp = useCallback(() => setIsClicking(false), []);

    // Optimized hover detection
    const handleElementHover = useCallback((e) => {
        if (isMobile) return;

        const element = e.target;
        const tagName = element.tagName.toLowerCase();
        const className = element.className || '';

        if (tagName === 'a' || element.getAttribute('role') === 'button') {
            if (className.includes('btn-primary') || className.includes('primary')) {
                setCursorVariant('primary-button');
            } else {
                setCursorVariant('link');
            }
        } else if (tagName === 'button') {
            setCursorVariant('button');
        } else if (tagName === 'input' || tagName === 'textarea') {
            setCursorVariant('text');
        } else if (tagName === 'img') {
            setCursorVariant('image');
        } else if (className.includes('social')) {
            setCursorVariant('social');
        } else {
            setCursorVariant('hover');
        }
    }, [isMobile]);

    const handleElementLeave = useCallback(() => {
        if (isMobile) return;
        setCursorVariant('default');
    }, [isMobile]);

    useEffect(() => {
        // Check if mobile on mount
        setIsMobile(checkMobile());

        // If mobile, don't setup cursor events
        if (checkMobile()) {
            return;
        }

        // Throttle variables for desktop
        let animationFrameId;
        let lastCall = 0;
        const throttleDelay = 16; // ~60fps

        const throttledMouseMove = (e) => {
            const now = Date.now();
            if (now - lastCall < throttleDelay) {
                return;
            }
            lastCall = now;

            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }

            animationFrameId = requestAnimationFrame(() => {
                handleMouseMove(e);
            });
        };

        // Add event listeners for desktop
        document.addEventListener('mousemove', throttledMouseMove, { passive: true });
        document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
        document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
        document.addEventListener('mousedown', handleMouseDown, { passive: true });
        document.addEventListener('mouseup', handleMouseUp, { passive: true });

        // Optimized hover detection
        const addHoverEffects = () => {
            const interactiveElements = document.querySelectorAll(
                'button, a, input, textarea, select, [role="button"], [onclick], .interactive, .btn, .social-link'
            );

            interactiveElements.forEach(element => {
                element.addEventListener('mouseenter', handleElementHover, { passive: true });
                element.addEventListener('mouseleave', handleElementLeave, { passive: true });
            });
        };

        addHoverEffects();

        // Debounced DOM observer
        let observerTimeout;
        const observer = new MutationObserver(() => {
            clearTimeout(observerTimeout);
            observerTimeout = setTimeout(addHoverEffects, 100);
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: false,
            characterData: false
        });

        return () => {
            if (checkMobile()) return;

            document.removeEventListener('mousemove', throttledMouseMove);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);

            const interactiveElements = document.querySelectorAll(
                'button, a, input, textarea, select, [role="button"], [onclick], .interactive, .btn, .social-link'
            );
            interactiveElements.forEach(element => {
                element.removeEventListener('mouseenter', handleElementHover);
                element.removeEventListener('mouseleave', handleElementLeave);
            });

            observer.disconnect();
            clearTimeout(observerTimeout);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [checkMobile, handleMouseMove, handleMouseEnter, handleMouseLeave, handleMouseDown, handleMouseUp, handleElementHover, handleElementLeave]);

    // Simplified cursor variants
    const cursorVariants = {
        default: {
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 800,
                damping: 35,
                mass: 0.5,
                restDelta: 0.001
            }
        },
        hover: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 1.3,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 600,
                damping: 30,
                mass: 0.5
            }
        },
        link: {
            x: mousePosition.x - 14,
            y: mousePosition.y - 14,
            scale: 1.2,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 700,
                damping: 35,
                mass: 0.5
            }
        },
        button: {
            x: mousePosition.x - 15,
            y: mousePosition.y - 15,
            scale: 1.4,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 650,
                damping: 30,
                mass: 0.5
            }
        },
        'primary-button': {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 1.5,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 600,
                damping: 25,
                mass: 0.5
            }
        },
        text: {
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
            scale: 0.8,
            opacity: 0.7,
            transition: {
                type: "spring",
                stiffness: 900,
                damping: 40,
                mass: 0.5
            }
        },
        image: {
            x: mousePosition.x - 18,
            y: mousePosition.y - 18,
            scale: 1.6,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 550,
                damping: 25,
                mass: 0.5
            }
        },
        social: {
            x: mousePosition.x - 13,
            y: mousePosition.y - 13,
            scale: 1.3,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 700,
                damping: 35,
                mass: 0.5
            }
        }
    };

    // Don't render cursor on mobile devices
    if (isMobile) {
        return null;
    }

    return (
        <motion.div
            className="custom-cursor-optimized"
            animate={cursorVariant}
            variants={cursorVariants}
            style={{
                opacity: isVisible ? 1 : 0,
                scale: isClicking ? 0.9 : cursorVariants[cursorVariant]?.scale || 1,
                backgroundColor: getCursorColor(cursorVariant),
                borderColor: getBorderColor(cursorVariant)
            }}
        />
    );
};

// Helper functions for cursor colors
const getCursorColor = (variant) => {
    const colors = {
        default: 'rgba(255, 255, 255, 0.95)',
        hover: 'rgba(59, 130, 246, 0.9)',
        link: 'rgba(139, 92, 246, 0.9)',
        button: 'rgba(16, 185, 129, 0.9)',
        'primary-button': 'rgba(59, 130, 246, 0.9)',
        text: 'rgba(107, 114, 128, 0.8)',
        image: 'rgba(245, 158, 11, 0.9)',
        social: 'rgba(236, 72, 153, 0.9)'
    };
    return colors[variant] || colors.default;
};

const getBorderColor = (variant) => {
    const colors = {
        default: 'rgba(59, 130, 246, 0.6)',
        hover: 'rgba(255, 255, 255, 0.9)',
        link: 'rgba(255, 255, 255, 0.9)',
        button: 'rgba(255, 255, 255, 0.9)',
        'primary-button': 'rgba(255, 255, 255, 0.9)',
        text: 'rgba(255, 255, 255, 0.6)',
        image: 'rgba(255, 255, 255, 0.9)',
        social: 'rgba(255, 255, 255, 0.9)'
    };
    return colors[variant] || colors.default;
};

export default React.memo(CustomCursor);