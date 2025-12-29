import React, { useState, useMemo, useRef, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
    FaCertificate, FaCalendarAlt, FaExternalLinkAlt, FaGraduationCap,
    FaAws, FaGoogle, FaMicrosoft, FaPython, FaReact, FaCode,
    FaRobot, FaCloud, FaChevronDown, FaChevronUp, FaAward
} from 'react-icons/fa';

import { certifications, certificationCategories, certificationStats } from '../data/certifications.js';

const Certifications = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, threshold: 0.1 });
    const [filter, setFilter] = useState('all');
    const [visibleCount, setVisibleCount] = useState(6);
    const [expandedId, setExpandedId] = useState(null);

    const filteredCerts = useMemo(() => {
        if (filter === 'all') return certifications;
        if (filter === 'Web Development') {
            return certifications.filter(c => ['Web Development', 'Frontend Development', 'Backend Development'].includes(c.category));
        }
        return certifications.filter(c => c.category === filter);
    }, [filter]);

    const getIcon = (title, issuer) => {
        const text = (title + issuer).toLowerCase();
        if (text.includes('aws')) return FaAws;
        if (text.includes('google')) return FaGoogle;
        if (text.includes('microsoft') || text.includes('azure')) return FaMicrosoft;
        if (text.includes('python')) return FaPython;
        if (text.includes('react')) return FaReact;
        if (text.includes('ai') || text.includes('intelligence')) return FaRobot;
        if (text.includes('cloud')) return FaCloud;
        return FaAward;
    };

    const getTypeStyle = (type) => {
        switch(type?.toLowerCase()) {
            case 'badge': return { color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)' };
            case 'skill badge': return { color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)' };
            default: return { color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' };
        }
    };

    return (
        <section id="certification" ref={ref} className="cert-section section-padding">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-5"
                >
                    <span className="badge-premium">Credentials</span>
                    <h2 className="title-main">Professional <span className="text-gradient">Certifications</span></h2>
                </motion.div>

                {/* Filter Row */}
                <div className="filter-wrapper mb-5">
                    {certificationCategories.map(cat => (
                        <button
                            key={cat.key}
                            className={`filter-tab ${filter === cat.key ? 'active' : ''}`}
                            onClick={() => { setFilter(cat.key); setVisibleCount(6); }}
                        >
                            {cat.label} <span className="count">{cat.count}</span>
                        </button>
                    ))}
                </div>

                <Row className="g-4">
                    <AnimatePresence mode='popLayout'>
                        {filteredCerts.slice(0, visibleCount).map((cert) => {
                            const Icon = getIcon(cert.title, cert.issuer);
                            const style = getTypeStyle(cert.type);
                            const isExpanded = expandedId === cert.id;

                            return (
                                <Col key={cert.id} lg={4} md={6}>
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="cert-card"
                                    >
                                        <div className="cert-card-top">
                                            <div className="icon-box" style={{ background: style.color }}>
                                                <Icon size={22} color="white" />
                                            </div>
                                            <span className="type-tag" style={{ color: style.color, background: style.bg }}>
                                                {cert.type}
                                            </span>
                                        </div>

                                        <div className="cert-card-body">
                                            <h4 className="cert-title">{cert.title}</h4>
                                            <p className="cert-issuer"><FaGraduationCap className="me-2"/>{cert.issuer}</p>

                                            <div className="skills-row">
                                                {cert.skills.map(s => <span key={s} className="skill-pill">{s}</span>)}
                                            </div>

                                            <AnimatePresence>
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="expanded-info"
                                                    >
                                                        <p className="desc">{cert.description}</p>
                                                        <div className="meta-box">
                                                            <p><strong>ID:</strong> {cert.credentialId}</p>
                                                            <p><strong>Platform:</strong> {cert.platform}</p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        <div className="cert-card-footer">
                                            <span className="date"><FaCalendarAlt className="me-2"/>{cert.issueDate}</span>
                                            <div className="actions">
                                                <button onClick={() => setExpandedId(isExpanded ? null : cert.id)} className="btn-circle">
                                                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                                                </button>
                                                <a href={cert.verifyUrl || cert.viewurl} target="_blank" rel="noreferrer" className="btn-circle primary">
                                                    <FaExternalLinkAlt />
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Col>
                            );
                        })}
                    </AnimatePresence>
                </Row>

                {filteredCerts.length > visibleCount && (
                    <div className="text-center mt-5">
                        <button className="btn-load-more" onClick={() => setVisibleCount(filteredCerts.length)}>
                            View All Credentials
                        </button>
                    </div>
                )}
            </Container>

            <style jsx>{`
                .cert-section { background: var(--background-color); position: relative; }
                
                .badge-premium {
                    background: rgba(var(--primary-rgb), 0.1);
                    color: var(--primary-color);
                    padding: 6px 16px;
                    border-radius: 50px;
                    font-weight: 700;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .title-main { font-size: 2.5rem; font-weight: 800; margin-top: 15px; color: var(--text-color); }
                .text-gradient { background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

                .filter-wrapper { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
                .filter-tab {
                    padding: 8px 20px;
                    border-radius: 50px;
                    border: 1px solid var(--border-color);
                    background: var(--card-bg);
                    color: var(--text-muted);
                    font-weight: 600;
                    transition: 0.3s;
                }
                .filter-tab.active { background: var(--primary-color); color: white; border-color: var(--primary-color); box-shadow: 0 8px 15px rgba(var(--primary-rgb), 0.2); }
                .count { font-size: 0.7rem; opacity: 0.7; margin-left: 5px; }

                .cert-card {
                    background: var(--card-bg);
                    border: 1px solid var(--border-color);
                    border-radius: 20px;
                    height: 100%;
                    padding: 24px;
                    transition: 0.3s;
                    display: flex;
                    flex-direction: column;
                }
                .cert-card:hover { transform: translateY(-8px); border-color: var(--primary-color); box-shadow: var(--shadow-lg); }

                .cert-card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
                .icon-box { width: 45px; height: 45px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
                .type-tag { font-size: 0.7rem; font-weight: 800; padding: 4px 12px; border-radius: 50px; text-transform: uppercase; }

                .cert-title { font-size: 1.15rem; font-weight: 700; color: var(--text-color); margin-bottom: 8px; line-height: 1.4; }
                .cert-issuer { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 15px; }
                
                .skills-row { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 15px; }
                .skill-pill { font-size: 0.7rem; background: var(--background-color); padding: 3px 10px; border-radius: 6px; border: 1px solid var(--border-color); color: var(--text-muted); }

                .expanded-info { border-top: 1px dashed var(--border-color); margin-top: 15px; padding-top: 15px; }
                .desc { font-size: 0.85rem; color: var(--text-muted); line-height: 1.6; }
                .meta-box { background: var(--background-color); padding: 10px; border-radius: 10px; font-size: 0.75rem; margin-top: 10px; }

                .cert-card-footer { margin-top: auto; padding-top: 20px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); }
                .date { font-size: 0.8rem; font-weight: 600; color: var(--text-muted); }
                .actions { display: flex; gap: 8px; }
                .btn-circle { width: 35px; height: 35px; border-radius: 50%; border: 1px solid var(--border-color); background: none; color: var(--text-color); display: flex; align-items: center; justify-content: center; transition: 0.2s; }
                .btn-circle.primary { background: var(--primary-color); color: white; border: none; }
                .btn-circle:hover { transform: scale(1.1); }

                .btn-load-more { padding: 12px 35px; border-radius: 50px; background: var(--gradient-primary); color: white; border: none; font-weight: 700; box-shadow: 0 10px 20px rgba(var(--primary-rgb), 0.2); transition: 0.3s; }
                .btn-load-more:hover { transform: translateY(-3px); box-shadow: 0 15px 25px rgba(var(--primary-rgb), 0.3); }

                @media (max-width: 768px) {
                    .filter-wrapper { justify-content: flex-start; overflow-x: auto; padding-bottom: 10px; }
                    .title-main { font-size: 1.8rem; }
                }
            `}</style>
        </section>
    );
};

export default Certifications;