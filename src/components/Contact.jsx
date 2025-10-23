// src/components/Contact.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    FaPaperPlane,
    FaCheck,
    FaSpinner
} from 'react-icons/fa';

// Import data from external file
import { contactInfo, socialLinks, formFields } from '../data/contact.js';

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
            className="contact-section section-padding position-relative overflow-hidden"
        >
            {/* Background Elements */}
            <div className="background-elements">
                <motion.div
                    className="bg-blob primary-blob"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.03, 0.05, 0.03],
                        x: [0, 20, 0]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="bg-blob secondary-blob"
                    animate={{
                        scale: [1.1, 1, 1.1],
                        opacity: [0.04, 0.02, 0.04],
                        y: [0, -15, 0]
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
            </div>

            {/* Floating Elements */}
            <motion.div
                className="floating-element primary-float"
                variants={floatingVariants}
                animate="float"
            />
            <motion.div
                className="floating-element secondary-float"
                variants={floatingVariants}
                animate="float"
                transition={{ delay: 1 }}
            />

            <Container>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="section-header text-center mb-6"
                >
                    <motion.span
                        className="section-badge"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        Let's Connect
                    </motion.span>
                    <h2 className="section-title gradient-heading mb-4">
                        Get In
                        <span className="gradient-text"> Touch</span>
                    </h2>
                    <p className="section-subtitle">
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
                                <div className="contact-info-card">
                                    <h4 className="contact-info-title">Contact Information</h4>
                                    <p className="contact-info-description">
                                        Feel free to reach out through any of these channels. I typically respond within 24 hours.
                                    </p>

                                    <div className="contact-methods">
                                        {contactInfo.map((info, index) => (
                                            <motion.a
                                                key={info.label}
                                                href={info.href}
                                                target={info.href.startsWith('http') ? '_blank' : '_self'}
                                                rel={info.href.startsWith('http') ? 'noopener noreferrer' : ''}
                                                className="contact-method"
                                                whileHover={{
                                                    x: 10,
                                                    borderColor: info.color,
                                                    boxShadow: `0 5px 15px ${info.color}20`
                                                }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <div
                                                    className="contact-icon"
                                                    style={{
                                                        background: `${info.color}15`,
                                                        color: info.color,
                                                        border: `1px solid ${info.color}30`
                                                    }}
                                                >
                                                    <info.icon size={20} />
                                                </div>
                                                <div className="contact-details">
                                                    <h6 className="contact-label">{info.label}</h6>
                                                    <p className="contact-value">{info.value}</p>
                                                    <small className="contact-description">{info.description}</small>
                                                </div>
                                            </motion.a>
                                        ))}
                                    </div>

                                    {/* Social Links */}
                                    <div className="social-section">
                                        <h6 className="social-title">Follow My Journey</h6>
                                        <div className="social-links">
                                            {socialLinks.map((social) => (
                                                <motion.a
                                                    key={social.label}
                                                    href={social.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="social-link"
                                                    style={{
                                                        border: `1px solid ${social.color}30`,
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
                                                        className="social-icon"
                                                        style={{ color: social.color }}
                                                    />
                                                    <div className="social-info">
                                                        <div className="social-label">{social.label}</div>
                                                        <div className="social-username">{social.username}</div>
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
                                <div className="contact-form-card">
                                    <h4 className="form-title">Send Me a Message</h4>

                                    <AnimatePresence>
                                        {submitStatus === 'success' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                            >
                                                <Alert className="success-alert">
                                                    <FaCheck className="alert-icon" />
                                                    Thank you! Your message has been sent successfully.
                                                </Alert>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <Form onSubmit={handleSubmit}>
                                        <Row className="g-4">
                                            {formFields.map((field) => (
                                                <Col key={field.name} {...field.grid}>
                                                    <Form.Group>
                                                        <Form.Label className="form-label">
                                                            {field.label}
                                                        </Form.Label>
                                                        <motion.div
                                                            whileFocus={{ scale: 1.02 }}
                                                        >
                                                            <Form.Control
                                                                as={field.type === 'textarea' ? 'textarea' : 'input'}
                                                                type={field.type}
                                                                name={field.name}
                                                                value={formData[field.name]}
                                                                onChange={handleChange}
                                                                required={field.required}
                                                                placeholder={field.placeholder}
                                                                rows={field.rows}
                                                                className="form-control-modern"
                                                                onFocus={() => setActiveField(field.name)}
                                                                onBlur={() => setActiveField(null)}
                                                                style={{
                                                                    resize: field.type === 'textarea' ? 'vertical' : 'none'
                                                                }}
                                                            />
                                                        </motion.div>
                                                    </Form.Group>
                                                </Col>
                                            ))}

                                            <Col xs={12}>
                                                <motion.div
                                                    className="form-submit"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <Button
                                                        type="submit"
                                                        size="lg"
                                                        disabled={isSubmitting}
                                                        className="submit-button"
                                                    >
                                                        {isSubmitting ? (
                                                            <>
                                                                <FaSpinner className="spinner-icon" />
                                                                Sending Message...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FaPaperPlane className="button-icon" />
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

            <style jsx>{`
                .contact-section {
                    background: linear-gradient(135deg, 
                        var(--background-color) 0%, 
                        var(--surface-color) 50%, 
                        var(--background-color) 100%);
                    position: relative;
                    overflow: hidden;
                }

                .background-elements {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                }

                .bg-blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(40px);
                }

                .primary-blob {
                    top: 10%;
                    right: 5%;
                    width: 300px;
                    height: 300px;
                    background: radial-gradient(circle, var(--primary-color) 0%, transparent 70%);
                }

                .secondary-blob {
                    bottom: 20%;
                    left: 5%;
                    width: 200px;
                    height: 200px;
                    background: radial-gradient(circle, var(--secondary-color) 0%, transparent 70%);
                }

                .floating-element {
                    position: absolute;
                    border-radius: 50%;
                    opacity: 0.1;
                }

                .primary-float {
                    top: 20%;
                    left: 10%;
                    width: 40px;
                    height: 40px;
                    background: var(--primary-color);
                }

                .secondary-float {
                    bottom: 30%;
                    right: 15%;
                    width: 30px;
                    height: 30px;
                    background: var(--secondary-color);
                }

                .section-header {
                    position: relative;
                    z-index: 2;
                }

                .section-badge {
                    display: inline-block;
                    background: linear-gradient(135deg, 
                        rgba(var(--primary-rgb), 0.15) 0%, 
                        rgba(var(--secondary-rgb), 0.15) 100%);
                    color: var(--primary-color);
                    padding: var(--spacing-sm) var(--spacing-xl);
                    border-radius: 50px;
                    font-size: var(--font-size-sm);
                    font-weight: 600;
                    margin-bottom: var(--spacing-lg);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    border: 1px solid rgba(var(--primary-rgb), 0.2);
                    backdrop-filter: blur(10px);
                    cursor: default;
                }

                .section-title {
                    font-size: var(--font-size-4xl);
                    font-weight: 800;
                    margin-bottom: var(--spacing-md);
                    background: linear-gradient(135deg, var(--text-color) 0%, var(--text-muted) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .gradient-text {
                    background: var(--gradient-primary);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .section-subtitle {
                    font-size: var(--font-size-lg);
                    color: var(--text-muted);
                    max-width: 600px;
                    margin: 0 auto;
                    line-height: 1.7;
                }

                /* Contact Info Card */
                .contact-info-card {
                    background: var(--card-bg);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-xl);
                    padding: var(--spacing-xl);
                    backdrop-filter: blur(10px);
                    transition: all var(--transition-base);
                    height: 100%;
                }

                .contact-info-card:hover {
                    border-color: var(--primary-color);
                    box-shadow: var(--shadow-xl);
                }

                .contact-info-title {
                    font-size: var(--font-size-xl);
                    font-weight: 700;
                    color: var(--text-color);
                    margin-bottom: var(--spacing-md);
                }

                .contact-info-description {
                    color: var(--text-muted);
                    margin-bottom: var(--spacing-xl);
                    line-height: 1.6;
                }

                .contact-methods {
                    margin-bottom: var(--spacing-2xl);
                }

                .contact-method {
                    display: flex;
                    align-items: center;
                    padding: var(--spacing-md);
                    border-radius: var(--radius-lg);
                    background: var(--surface-color);
                    border: 1px solid var(--border-color);
                    transition: all var(--transition-base);
                    text-decoration: none;
                    margin-bottom: var(--spacing-md);
                }

                .contact-method:hover {
                    text-decoration: none;
                }

                .contact-icon {
                    width: 50px;
                    height: 50px;
                    border-radius: var(--radius-lg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: var(--spacing-md);
                    flex-shrink: 0;
                    transition: all var(--transition-base);
                }

                .contact-details {
                    flex-grow: 1;
                }

                .contact-label {
                    font-size: var(--font-size-base);
                    font-weight: 700;
                    color: var(--text-color);
                    margin-bottom: var(--spacing-xs);
                }

                .contact-value {
                    font-size: var(--font-size-sm);
                    font-weight: 600;
                    color: var(--text-color);
                    margin-bottom: var(--spacing-xs);
                }

                .contact-description {
                    font-size: var(--font-size-xs);
                    color: var(--text-muted);
                }

                /* Social Section */
                .social-section {
                    margin-top: var(--spacing-xl);
                }

                .social-title {
                    font-size: var(--font-size-base);
                    font-weight: 700;
                    color: var(--text-color);
                    margin-bottom: var(--spacing-md);
                }

                .social-links {
                    display: flex;
                    flex-wrap: wrap;
                    gap: var(--spacing-sm);
                }

                .social-link {
                    display: flex;
                    align-items: center;
                    padding: var(--spacing-md);
                    border-radius: var(--radius-lg);
                    background: var(--surface-color);
                    color: var(--text-color);
                    text-decoration: none;
                    flex-grow: 1;
                    min-width: 140px;
                    transition: all var(--transition-base);
                }

                .social-link:hover {
                    text-decoration: none;
                    color: var(--text-color);
                }

                .social-icon {
                    margin-right: var(--spacing-sm);
                    flex-shrink: 0;
                }

                .social-info {
                    text-align: left;
                }

                .social-label {
                    font-size: var(--font-size-sm);
                    font-weight: 600;
                }

                .social-username {
                    font-size: var(--font-size-xs);
                    color: var(--text-muted);
                }

                /* Contact Form Card */
                .contact-form-card {
                    background: var(--card-bg);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-xl);
                    padding: var(--spacing-xl);
                    backdrop-filter: blur(10px);
                    transition: all var(--transition-base);
                    height: 100%;
                }

                .contact-form-card:hover {
                    border-color: var(--primary-color);
                    box-shadow: var(--shadow-xl);
                }

                .form-title {
                    font-size: var(--font-size-xl);
                    font-weight: 700;
                    color: var(--text-color);
                    margin-bottom: var(--spacing-lg);
                }

                .success-alert {
                    background: rgba(34, 197, 94, 0.1);
                    border: 1px solid rgba(34, 197, 94, 0.3);
                    color: var(--success-color);
                    border-radius: var(--radius-lg);
                    margin-bottom: var(--spacing-lg);
                }

                .alert-icon {
                    margin-right: var(--spacing-sm);
                }

                .form-label {
                    font-size: var(--font-size-sm);
                    font-weight: 600;
                    color: var(--text-color);
                    margin-bottom: var(--spacing-sm);
                }

                .form-control-modern {
                    background: var(--surface-color);
                    border: 2px solid var(--border-color);
                    border-radius: var(--radius-lg);
                    padding: var(--spacing-md);
                    color: var(--text-color);
                    transition: all var(--transition-base);
                    font-size: var(--font-size-base);
                }

                .form-control-modern:focus {
                    background: var(--surface-color);
                    border-color: var(--primary-color);
                    box-shadow: 0 0 0 0.2rem rgba(var(--primary-rgb), 0.1);
                    color: var(--text-color);
                }

                .form-control-modern::placeholder {
                    color: var(--text-muted);
                    opacity: 0.7;
                }

                .form-submit {
                    text-align: center;
                }

                @media (min-width: 768px) {
                    .form-submit {
                        text-align: left;
                    }
                }

                .submit-button {
                    background: var(--gradient-primary);
                    border: none;
                    color: white;
                    border-radius: 50px;
                    font-weight: 600;
                    padding: var(--spacing-md) var(--spacing-xl);
                    font-size: var(--font-size-base);
                    transition: all var(--transition-base);
                }

                .submit-button:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-lg);
                }

                .submit-button:disabled {
                    opacity: 0.7;
                    transform: none;
                    cursor: not-allowed;
                }

                .button-icon {
                    margin-right: var(--spacing-sm);
                }

                .spinner-icon {
                    margin-right: var(--spacing-sm);
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .section-title {
                        font-size: var(--font-size-3xl);
                    }

                    .contact-info-card,
                    .contact-form-card {
                        padding: var(--spacing-lg);
                    }

                    .social-link {
                        min-width: calc(50% - var(--spacing-sm));
                    }
                }

                @media (max-width: 576px) {
                    .section-title {
                        font-size: var(--font-size-2xl);
                    }

                    .contact-method {
                        padding: var(--spacing-sm);
                    flex-direction: column;
                        text-align: center;
                    }

                    .contact-icon {
                        margin-right: 0;
                        margin-bottom: var(--spacing-sm);
                    }

                    .social-link {
                        min-width: 100%;
                    }

                    .contact-info-card,
                    .contact-form-card {
                        padding: var(--spacing-md);
                    }
                }
            `}</style>
        </section>
    );
};

export default Contact;