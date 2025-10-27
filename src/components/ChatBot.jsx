// src/components/Chatbot.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaUser, FaComments } from 'react-icons/fa';
import { getBotResponse } from '/src/data/chatbot.js';
import { useTheme } from '../context/ThemeContext';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const { isDark } = useTheme();

    // Initial greeting
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const greeting = getBotResponse('hello');
            setMessages([{ text: greeting, isBot: true }]);
        }
    }, [isOpen, messages.length]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        // Add user message
        const userMessage = { text: inputMessage, isBot: false };
        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        // Simulate typing delay
        setTimeout(() => {
            const botResponse = getBotResponse(inputMessage);
            setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000);
    };

    const quickQuestions = [
        "What are your skills?",
        "Tell me about your projects",
        "What's your experience?",
        "How can I contact you?",
        "Where are you from?"
    ];

    const handleQuickQuestion = (question) => {
        setInputMessage(question);
        // Auto-send after setting the question
        setTimeout(() => {
            const userMessage = { text: question, isBot: false };
            setMessages(prev => [...prev, userMessage]);
            setIsTyping(true);

            setTimeout(() => {
                const botResponse = getBotResponse(question);
                setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
                setIsTyping(false);
            }, 1000 + Math.random() * 1000);
        }, 100);
    };

    return (
        <>
            {/* Floating Chat Button */}
            <motion.button
                className={`chatbot-toggle ${isDark ? 'dark-mode' : ''}`}
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <FaComments size={20} />
                <span className="pulse-dot"></span>
            </motion.button>

            {/* Chat Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={`chatbot-modal ${isDark ? 'dark-mode' : ''}`}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        {/* Chat Header */}
                        <div className={`chat-header ${isDark ? 'dark-mode' : ''}`}>
                            <div className="chat-title">
                                <div className="bot-avatar">
                                    <img
                                        src="/api/placeholder/profile.jpeg"
                                        alt="Nischal Acharya"
                                        className="avatar-image"
                                    />
                                </div>
                                <div>
                                    <h4>Nischal Acharya</h4>
                                    <span className="status">Online • AI Assistant</span>
                                </div>
                            </div>
                            <motion.button
                                className="close-btn"
                                onClick={() => setIsOpen(false)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaTimes size={16} />
                            </motion.button>
                        </div>

                        {/* Chat Messages */}
                        <div className="chat-messages">
                            {messages.map((message, index) => (
                                <motion.div
                                    key={index}
                                    className={`message ${message.isBot ? 'bot-message' : 'user-message'}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="message-avatar">
                                        {message.isBot ? (
                                            <img
                                                src="/api/placeholder/profile.jpeg"
                                                alt="Nischal Acharya"
                                                className="bot-avatar-image"
                                            />
                                        ) : (
                                            <FaUser size={14} />
                                        )}
                                    </div>
                                    <div className="message-content">
                                        {message.text.split('\n').map((line, i) => (
                                            <p key={i}>{line}</p>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div
                                    className="message bot-message typing-indicator"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <div className="message-avatar">
                                        <img
                                            src="/api/placeholder/profile.jpeg"
                                            alt="Nischal Acharya"
                                            className="bot-avatar-image"
                                        />
                                    </div>
                                    <div className="message-content">
                                        <div className="typing-dots">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Questions */}
                        {messages.length <= 2 && (
                            <div className="quick-questions">
                                <p>Quick questions you can ask:</p>
                                <div className="question-chips">
                                    {quickQuestions.map((question, index) => (
                                        <motion.button
                                            key={index}
                                            className="question-chip"
                                            onClick={() => handleQuickQuestion(question)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            {question}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Chat Input */}
                        <form onSubmit={handleSendMessage} className="chat-input-form">
                            <div className="input-container">
                                <input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    placeholder="Ask me about Nischal's skills, projects, or experience..."
                                    className="chat-input"
                                />
                                <motion.button
                                    type="submit"
                                    className="send-btn"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    disabled={!inputMessage.trim()}
                                >
                                    <FaPaperPlane size={16} />
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .chatbot-toggle {
                    position: fixed;
                    bottom: 6rem;
                    right: 2rem;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: var(--gradient-primary);
                    color: white;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: var(--shadow-xl);
                    z-index: 1000;
                    transition: all var(--transition-base);
                }

                .chatbot-toggle.dark-mode {
                    box-shadow: 0 8px 30px rgba(var(--primary-rgb), 0.3);
                }

                .chatbot-toggle:hover {
                    transform: scale(1.1);
                    box-shadow: 0 12px 40px rgba(var(--primary-rgb), 0.4);
                }

                .pulse-dot {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 12px;
                    height: 12px;
                    background: #10b981;
                    border-radius: 50%;
                    border: 2px solid white;
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0% { transform: scale(0.8); opacity: 1; }
                    50% { transform: scale(1.2); opacity: 0.7; }
                    100% { transform: scale(0.8); opacity: 1; }
                }

                .chatbot-modal {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    width: 400px;
                    height: 600px;
                    background: var(--card-bg);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-xl);
                    box-shadow: var(--shadow-2xl);
                    display: flex;
                    flex-direction: column;
                    z-index: 1001;
                    overflow: hidden;
                }

                .chatbot-modal.dark-mode {
                    background: #1a1a1a;
                    border-color: #2d2d2d;
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
                }

                .chat-header {
                    padding: 1.5rem;
                    border-bottom: 1px solid var(--border-color);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: var(--surface-color);
                }

                .chat-header.dark-mode {
                    background: #2d2d2d;
                    border-color: #3d3d3d;
                }

                .message-avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    overflow: hidden;
                }

                .bot-avatar-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 50%;
                    border: 2px solid var(--primary-color);
                }

                .user-message .message-avatar {
                    background: var(--surface-color);
                    color: var(--text-color);
                    border: 1px solid var(--border-color);
                }

                .bot-message .message-avatar {
                    border: 2px solid var(--primary-color);
                }

                .avatar-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 50%;
                }

                .chat-title {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .chat-title h4 {
                    margin: 0;
                    color: var(--text-color);
                    font-weight: 600;
                }

                .status {
                    font-size: 0.75rem;
                    color: var(--text-muted);
                }

                .bot-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: var(--gradient-primary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                }

                .close-btn {
                    background: none;
                    border: none;
                    color: var(--text-muted);
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: var(--radius-md);
                    transition: all var(--transition-base);
                }

                .close-btn:hover {
                    background: rgba(var(--primary-rgb), 0.1);
                    color: var(--primary-color);
                }

                .chat-messages {
                    flex: 1;
                    padding: 1rem;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .message {
                    display: flex;
                    gap: 0.75rem;
                    align-items: flex-start;
                }

                .user-message {
                    flex-direction: row-reverse;
                }

                .message-avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .bot-message .message-avatar {
                    background: var(--gradient-primary);
                    color: white;
                }

                .user-message .message-avatar {
                    background: var(--surface-color);
                    color: var(--text-color);
                    border: 1px solid var(--border-color);
                }

                .message-content {
                    max-width: 70%;
                    padding: 0.75rem 1rem;
                    border-radius: var(--radius-lg);
                    font-size: 0.875rem;
                    line-height: 1.4;
                }

                .bot-message .message-content {
                    background: var(--surface-color);
                    color: var(--text-color);
                    border: 1px solid var(--border-color);
                }

                .user-message .message-content {
                    background: var(--gradient-primary);
                    color: white;
                }

                .typing-indicator .message-content {
                    background: transparent;
                    border: none;
                    padding: 0.5rem 1rem;
                }

                .typing-dots {
                    display: flex;
                    gap: 4px;
                }

                .typing-dots span {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: var(--text-muted);
                    animation: typing 1.4s infinite ease-in-out;
                }

                .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
                .typing-dots span:nth-child(2) { animation-delay: -0.16s; }

                @keyframes typing {
                    0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
                    40% { transform: scale(1); opacity: 1; }
                }

                .quick-questions {
                    padding: 1rem;
                    border-top: 1px solid var(--border-color);
                    background: var(--surface-color);
                }

                .quick-questions p {
                    margin: 0 0 0.75rem 0;
                    font-size: 0.875rem;
                    color: var(--text-muted);
                    font-weight: 500;
                }

                .question-chips {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .question-chip {
                    background: transparent;
                    border: 1px solid var(--border-color);
                    color: var(--text-color);
                    padding: 0.5rem 0.75rem;
                    border-radius: var(--radius-lg);
                    font-size: 0.8rem;
                    cursor: pointer;
                    transition: all var(--transition-base);
                    text-align: left;
                }

                .question-chip:hover {
                    border-color: var(--primary-color);
                    color: var(--primary-color);
                    background: rgba(var(--primary-rgb), 0.05);
                }

                .chat-input-form {
                    padding: 1rem;
                    border-top: 1px solid var(--border-color);
                }

                .input-container {
                    display: flex;
                    gap: 0.5rem;
                    align-items: center;
                }

                .chat-input {
                    flex: 1;
                    padding: 0.75rem 1rem;
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-lg);
                    background: var(--surface-color);
                    color: var(--text-color);
                    font-size: 0.875rem;
                    transition: all var(--transition-base);
                }

                .chat-input:focus {
                    outline: none;
                    border-color: var(--primary-color);
                    box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
                }

                .send-btn {
                    width: 44px;
                    height: 44px;
                    border-radius: var(--radius-lg);
                    background: var(--gradient-primary);
                    color: white;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all var(--transition-base);
                }

                .send-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .send-btn:not(:disabled):hover {
                    transform: scale(1.05);
                    box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.3);
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .chatbot-toggle {
                        bottom: 5rem;
                        right: 1rem;
                        width: 50px;
                        height: 50px;
                    }

                    .chatbot-modal {
                        width: calc(100vw - 2rem);
                        height: 70vh;
                        bottom: 1rem;
                        right: 1rem;
                        left: 1rem;
                    }
                }

                @media (max-width: 480px) {
                    .chatbot-modal {
                        height: 80vh;
                    }

                    .message-content {
                        max-width: 85%;
                    }
                }
            `}</style>
        </>
    );
};

export default Chatbot;