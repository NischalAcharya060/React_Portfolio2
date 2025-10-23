// src/components/Contact.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    FaPaperPlane,
    FaCheck,
    FaExclamationTriangle,
    FaSpinner
} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';
import { contactInfo, socialLinks, formFields } from '../data/contact.js';

const SERVICE_ID = 'service_elk86vl';
const TEMPLATE_ID = 'template_864nhk9';
const PUBLIC_KEY = '-qiVxTcSYDKmI-Zkf';
const RECAPTCHA_SITE_KEY = '6Leu0q4nAAAAAA6B5LZvGfCbM432JKOtvgCtiUCO';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, threshold: 0.1 });
    const recaptchaRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeField, setActiveField] = useState(null);
    const [recaptchaToken, setRecaptchaToken] = useState(null);

    // Custom toast styles
    const toastStyle = {
        success: {
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)'
        },
        error: {
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(239, 68, 68, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)'
        },
        warning: {
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)'
        },
        info: {
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            color: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)'
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRecaptchaChange = (token) => {
        setRecaptchaToken(token);
        if (token) {
            // Clear any previous warnings when user completes reCAPTCHA
            toast.dismiss();
        }
    };

    const showSuccessToast = () => {
        toast.success(
            <div className="toast-content">
                <div className="toast-icon">
                    <FaCheck size={20} />
                </div>
                <div className="toast-message">
                    <div className="toast-title">Message Sent Successfully!</div>
                    <div className="toast-description">
                        Thank you! I'll get back to you within 24 hours.
                    </div>
                </div>
            </div>,
            {
                style: toastStyle.success,
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                icon: false
            }
        );
    };

    const showErrorToast = () => {
        toast.error(
            <div className="toast-content">
                <div className="toast-icon">
                    <FaExclamationTriangle size={20} />
                </div>
                <div className="toast-message">
                    <div className="toast-title">Failed to Send Message</div>
                    <div className="toast-description">
                        Please try again later or contact me directly.
                    </div>
                </div>
            </div>,
            {
                style: toastStyle.error,
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                icon: false
            }
        );
    };

    const showWarningToast = (message) => {
        toast.warning(
            <div className="toast-content">
                <div className="toast-icon">
                    <FaExclamationTriangle size={20} />
                </div>
                <div className="toast-message">
                    <div className="toast-title">Action Required</div>
                    <div className="toast-description">
                        {message}
                    </div>
                </div>
            </div>,
            {
                style: toastStyle.warning,
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                icon: false
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields
        if (!formData.name || !formData.email || !formData.message) {
            showWarningToast('Please fill in all required fields.');
            return;
        }

        if (!recaptchaToken) {
            showWarningToast('Please complete the reCAPTCHA verification.');
            return;
        }

        setIsSubmitting(true);

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject || 'New Message from Portfolio',
            message: formData.message,
            'g-recaptcha-response': recaptchaToken
        };

        try {
            await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

            // Show success toast
            showSuccessToast();

            // Reset form
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Reset reCAPTCHA
            if (recaptchaRef.current) {
                recaptchaRef.current.reset();
                setRecaptchaToken(null);
            }

        } catch (error) {
            console.error('EmailJS Error:', error);

            // Show error toast
            showErrorToast();

            // Reset reCAPTCHA on error too
            if (recaptchaRef.current) {
                recaptchaRef.current.reset();
                setRecaptchaToken(null);
            }
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
            {/* Toast Container */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                style={{
                    zIndex: 9999,
                    marginTop: '80px' // Adjust based on your navbar height
                }}
            />

            {/* Background elements remain the same */}
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

                        <Col lg={7}>
                            <motion.div variants={itemVariants}>
                                <div className="contact-form-card">
                                    <h4 className="form-title">Send Me a Message</h4>

                                    <Form onSubmit={handleSubmit}>
                                        <Row className="g-4">
                                            {formFields.map((field) => (
                                                <Col key={field.name} {...field.grid}>
                                                    <Form.Group>
                                                        <Form.Label className="form-label">
                                                            {field.label}
                                                            {field.required && <span className="text-danger"> *</span>}
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
                                                <div className="recaptcha-container">
                                                    <ReCAPTCHA
                                                        ref={recaptchaRef}
                                                        sitekey={RECAPTCHA_SITE_KEY}
                                                        onChange={handleRecaptchaChange}
                                                    />
                                                </div>
                                            </Col>

                                            <Col xs={12}>
                                                <motion.div
                                                    className="form-submit"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <Button
                                                        type="submit"
                                                        size="lg"
                                                        disabled={isSubmitting || !recaptchaToken}
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

                /* Toast Custom Styles */
                .toast-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .toast-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.2);
                    flex-shrink: 0;
                }

                .toast-message {
                    flex: 1;
                }

                .toast-title {
                    font-weight: 600;
                    font-size: 14px;
                    margin-bottom: 2px;
                }

                .toast-description {
                    font-size: 12px;
                    opacity: 0.9;
                }

                /* Rest of your existing CSS styles remain the same */
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

                .recaptcha-container {
                    margin-bottom: var(--spacing-xl);
                    display: flex;
                    justify-content: center;
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