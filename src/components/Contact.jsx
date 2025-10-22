// src/components/Contact.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaLinkedin,
    FaGithub,
    FaTwitter,
    FaInstagram,
    FaFacebook,
    FaPaperPlane,
    FaCheck,
    FaWhatsapp,
    FaTelegram
} from 'react-icons/fa';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, threshold: 0.1 });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [activeField, setActiveField] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: FaEnvelope,
            label: 'Email',
            value: 'Nischal060@gmail.com',
            href: 'mailto:Nischal060@gmail.com',
            color: '#D44638',
            description: 'Send me an email anytime'
        },
        {
            icon: FaPhone,
            label: 'Phone',
            value: '+977 9842000000',
            href: 'tel:+9779842000000',
            color: '#25D366',
            description: 'Mon - Fri, 9AM - 6PM'
        },
        {
            icon: FaMapMarkerAlt,
            label: 'Location',
            value: 'Gauradaha-Jhapa, Nepal',
            href: 'https://maps.google.com/?q=Gauradaha-Jhapa,Nepal',
            color: '#FF6B6B',
            description: 'Available for remote work'
        },
        {
            icon: FaWhatsapp,
            label: 'WhatsApp',
            value: '+977 9842000000',
            href: 'https://wa.me/9779842000000',
            color: '#25D366',
            description: 'Quick response guaranteed'
        }
    ];

    const socialLinks = [
        {
            icon: FaGithub,
            href: 'https://github.com/NischalAcharya060',
            label: 'GitHub',
            color: '#333',
            username: '@NischalAcharya060'
        },
        {
            icon: FaLinkedin,
            href: 'https://www.linkedin.com/in/nischal-acharya101/',
            label: 'LinkedIn',
            color: '#0077B5',
            username: '@nischal-acharya101'
        },
        {
            icon: FaTwitter,
            href: 'https://x.com/Nischal79783380',
            label: 'Twitter',
            color: '#1DA1F2',
            username: '@Nischal79783380'
        },
        {
            icon: FaInstagram,
            href: 'https://www.instagram.com/its_nischalacharya/',
            label: 'Instagram',
            color: '#E4405F',
            username: '@its_nischalacharya'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: {
            y: 60,
            opacity: 0,
            scale: 0.95
        },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const floatingVariants = {
        float: {
            y: [-10, 10, -10],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <section
            id="contact"
            ref={ref}
            className="section-padding position-relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, var(--background-color) 0%, var(--surface-color) 100%)'
            }}
        >
            {/* Background Elements */}
            <div className="position-absolute top-0 start-0 w-100 h-100">
                <motion.div
                    style={{
                        position: 'absolute',
                        top: '10%',
                        right: '5%',
                        width: '300px',
                        height: '300px',
                        background: 'radial-gradient(circle, var(--primary-color) 0%, transparent 70%)',
                        opacity: 0.03,
                        borderRadius: '50%'
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.03, 0.05, 0.03]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    style={{
                        position: 'absolute',
                        bottom: '20%',
                        left: '5%',
                        width: '200px',
                        height: '200px',
                        background: 'radial-gradient(circle, var(--secondary-color) 0%, transparent 70%)',
                        opacity: 0.03,
                        borderRadius: '50%'
                    }}
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.05, 0.03, 0.05]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
            </div>

            {/* Floating Elements */}
            <motion.div
                className="position-absolute"
                style={{
                    top: '20%',
                    left: '10%',
                    width: '40px',
                    height: '40px',
                    background: 'var(--primary-color)',
                    borderRadius: '50%',
                    opacity: 0.1
                }}
                variants={floatingVariants}
                animate="float"
            />
            <motion.div
                className="position-absolute"
                style={{
                    bottom: '30%',
                    right: '15%',
                    width: '30px',
                    height: '30px',
                    background: 'var(--secondary-color)',
                    borderRadius: '50%',
                    opacity: 0.1
                }}
                variants={floatingVariants}
                animate="float"
                transition={{ delay: 1 }}
            />

            <Container>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-5"
                >
                    <span className="section-badge">Let's Connect</span>
                    <h2 className="display-4 fw-bold mb-3">
                        Get In
                        <span className="gradient-text"> Touch</span>
                    </h2>
                    <p className="lead text-muted max-w-600 mx-auto">
                        Ready to bring your ideas to life? Let's discuss your project and create something amazing together.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <Row className="g-5">
                        {/* Contact Information */}
                        <Col lg={5}>
                            <motion.div variants={itemVariants}>
                                <div className="contact-info-card p-4 rounded-4 h-100"
                                     style={{
                                         background: 'linear-gradient(135deg, var(--card-bg), var(--surface-color))',
                                         backdropFilter: 'blur(10px)',
                                         border: '1px solid var(--border-color)'
                                     }}
                                >
                                    <h4 className="fw-bold mb-4">Contact Information</h4>
                                    <p className="text-muted mb-4">
                                        Feel free to reach out through any of these channels. I typically respond within 24 hours.
                                    </p>

                                    <div className="contact-methods">
                                        {contactInfo.map((info, index) => (
                                            <motion.a
                                                key={info.label}
                                                href={info.href}
                                                target={info.href.startsWith('http') ? '_blank' : '_self'}
                                                rel={info.href.startsWith('http') ? 'noopener noreferrer' : ''}
                                                className="contact-method d-flex align-items-center p-3 rounded-3 mb-3 text-decoration-none"
                                                style={{
                                                    background: 'var(--surface-color)',
                                                    border: '1px solid var(--border-color)',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                whileHover={{
                                                    x: 10,
                                                    borderColor: info.color,
                                                    boxShadow: `0 5px 15px ${info.color}20`
                                                }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <div
                                                    className="contact-icon d-flex align-items-center justify-content-center rounded-3 me-3 flex-shrink-0"
                                                    style={{
                                                        width: '50px',
                                                        height: '50px',
                                                        background: `${info.color}15`,
                                                        color: info.color,
                                                        border: `1px solid ${info.color}30`
                                                    }}
                                                >
                                                    <info.icon size={20} />
                                                </div>
                                                <div className="flex-grow-1">
                                                    <h6 className="fw-bold mb-1" style={{ color: 'var(--text-color)' }}>
                                                        {info.label}
                                                    </h6>
                                                    <p className="mb-1" style={{ color: 'var(--text-color)', fontWeight: '500' }}>
                                                        {info.value}
                                                    </p>
                                                    <small className="text-muted">{info.description}</small>
                                                </div>
                                            </motion.a>
                                        ))}
                                    </div>

                                    {/* Social Links */}
                                    <div className="mt-5">
                                        <h6 className="fw-bold mb-3">Follow My Journey</h6>
                                        <div className="social-links d-flex flex-wrap gap-2">
                                            {socialLinks.map((social) => (
                                                <motion.a
                                                    key={social.label}
                                                    href={social.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="social-link d-flex align-items-center p-3 rounded-3 text-decoration-none flex-grow-1"
                                                    style={{
                                                        background: 'var(--surface-color)',
                                                        border: `1px solid ${social.color}30`,
                                                        color: 'var(--text-color)',
                                                        minWidth: '140px'
                                                    }}
                                                    whileHover={{
                                                        scale: 1.05,
                                                        background: `${social.color}10`,
                                                        borderColor: social.color
                                                    }}
                                                    whileTap={{ scale: 0.95 }}
                                                    aria-label={social.label}
                                                >
                                                    <social.icon
                                                        size={20}
                                                        className="me-2 flex-shrink-0"
                                                        style={{ color: social.color }}
                                                    />
                                                    <div className="text-start">
                                                        <div className="fw-semibold small">{social.label}</div>
                                                        <div className="text-muted extra-small">{social.username}</div>
                                                    </div>
                                                </motion.a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Col>

                        {/* Contact Form */}
                        <Col lg={7}>
                            <motion.div variants={itemVariants}>
                                <div className="contact-form-card p-4 p-lg-5 rounded-4 h-100"
                                     style={{
                                         background: 'linear-gradient(135deg, var(--card-bg), var(--surface-color))',
                                         backdropFilter: 'blur(10px)',
                                         border: '1px solid var(--border-color)'
                                     }}
                                >
                                    <h4 className="fw-bold mb-4">Send Me a Message</h4>

                                    <AnimatePresence>
                                        {submitStatus === 'success' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                            >
                                                <Alert
                                                    variant="success"
                                                    className="d-flex align-items-center"
                                                    style={{
                                                        background: 'rgba(34, 197, 94, 0.1)',
                                                        border: '1px solid rgba(34, 197, 94, 0.3)',
                                                        color: '#16a34a'
                                                    }}
                                                >
                                                    <FaCheck className="me-2" />
                                                    Thank you! Your message has been sent successfully.
                                                </Alert>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <Form onSubmit={handleSubmit}>
                                        <Row className="g-4">
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label className="fw-semibold mb-2">
                                                        Full Name *
                                                    </Form.Label>
                                                    <motion.div
                                                        whileFocus={{ scale: 1.02 }}
                                                    >
                                                        <Form.Control
                                                            type="text"
                                                            name="name"
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                            required
                                                            placeholder="Enter your full name"
                                                            className="form-control-modern"
                                                            onFocus={() => setActiveField('name')}
                                                            onBlur={() => setActiveField(null)}
                                                        />
                                                    </motion.div>
                                                </Form.Group>
                                            </Col>

                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label className="fw-semibold mb-2">
                                                        Email Address *
                                                    </Form.Label>
                                                    <motion.div
                                                        whileFocus={{ scale: 1.02 }}
                                                    >
                                                        <Form.Control
                                                            type="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            required
                                                            placeholder="your.email@example.com"
                                                            className="form-control-modern"
                                                            onFocus={() => setActiveField('email')}
                                                            onBlur={() => setActiveField(null)}
                                                        />
                                                    </motion.div>
                                                </Form.Group>
                                            </Col>

                                            <Col xs={12}>
                                                <Form.Group>
                                                    <Form.Label className="fw-semibold mb-2">
                                                        Subject *
                                                    </Form.Label>
                                                    <motion.div
                                                        whileFocus={{ scale: 1.02 }}
                                                    >
                                                        <Form.Control
                                                            type="text"
                                                            name="subject"
                                                            value={formData.subject}
                                                            onChange={handleChange}
                                                            required
                                                            placeholder="What's this about?"
                                                            className="form-control-modern"
                                                            onFocus={() => setActiveField('subject')}
                                                            onBlur={() => setActiveField(null)}
                                                        />
                                                    </motion.div>
                                                </Form.Group>
                                            </Col>

                                            <Col xs={12}>
                                                <Form.Group>
                                                    <Form.Label className="fw-semibold mb-2">
                                                        Your Message *
                                                    </Form.Label>
                                                    <motion.div
                                                        whileFocus={{ scale: 1.02 }}
                                                    >
                                                        <Form.Control
                                                            as="textarea"
                                                            rows={6}
                                                            name="message"
                                                            value={formData.message}
                                                            onChange={handleChange}
                                                            required
                                                            placeholder="Tell me about your project, ideas, or questions..."
                                                            className="form-control-modern"
                                                            onFocus={() => setActiveField('message')}
                                                            onBlur={() => setActiveField(null)}
                                                            style={{ resize: 'vertical' }}
                                                        />
                                                    </motion.div>
                                                </Form.Group>
                                            </Col>

                                            <Col xs={12}>
                                                <motion.div
                                                    className="text-center text-md-start"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <Button
                                                        type="submit"
                                                        size="lg"
                                                        disabled={isSubmitting}
                                                        className="btn-primary-gradient px-5 py-3"
                                                    >
                                                        {isSubmitting ? (
                                                            <>
                                                                <div className="spinner-border spinner-border-sm me-2" role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>
                                                                Sending Message...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FaPaperPlane className="me-2" />
                                                                Send Message
                                                            </>
                                                        )}
                                                    </Button>
                                                </motion.div>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </motion.div>
                        </Col>
                    </Row>
                </motion.div>
            </Container>

            <style>
                {`
                    .section-badge {
                        display: inline-block;
                        background: rgba(var(--primary-rgb), 0.1);
                        color: var(--primary-color);
                        padding: 0.5rem 1.5rem;
                        border-radius: 50px;
                        font-size: 0.9rem;
                        font-weight: 600;
                        margin-bottom: 1rem;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    }

                    .max-w-600 {
                        max-width: 600px;
                    }

                    .contact-method {
                        transition: all 0.3s ease;
                    }

                    .contact-method:hover {
                        text-decoration: none;
                    }

                    .form-control-modern {
                        background: var(--surface-color);
                        border: 2px solid var(--border-color);
                        border-radius: 12px;
                        padding: 0.75rem 1rem;
                        color: var(--text-color);
                        transition: all 0.3s ease;
                    }

                    .form-control-modern:focus {
                        background: var(--surface-color);
                        border-color: var(--primary-color);
                        box-shadow: 0 0 0 0.2rem rgba(var(--primary-rgb), 0.1);
                        color: var(--text-color);
                    }

                    .btn-primary-gradient {
                        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                        border: none;
                        color: white;
                        border-radius: 50px;
                        font-weight: 600;
                        transition: all 0.3s ease;
                    }

                    .btn-primary-gradient:hover:not(:disabled) {
                        transform: translateY(-2px);
                        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                    }

                    .btn-primary-gradient:disabled {
                        opacity: 0.7;
                        transform: none;
                    }

                    .social-links {
                        gap: 0.75rem;
                    }

                    .social-link {
                        transition: all 0.3s ease;
                        text-decoration: none;
                    }

                    .extra-small {
                        font-size: 0.7rem;
                    }

                    .contact-info-card,
                    .contact-form-card {
                        transition: all 0.3s ease;
                    }

                    .contact-info-card:hover,
                    .contact-form-card:hover {
                        border-color: var(--primary-color);
                        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    }

                    @media (max-width: 768px) {
                        .social-link {
                            min-width: calc(50% - 0.75rem) !important;
                        }
                    }

                    @media (max-width: 576px) {
                        .social-link {
                            min-width: 100% !important;
                        }
                    }
                `}
            </style>
        </section>
    );
};

export default Contact;