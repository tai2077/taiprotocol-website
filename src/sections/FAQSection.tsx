import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useTranslation } from '../i18n';
import { TerminalIcon, UserIcon } from '../components/Icons';
import './FAQSection.css';

interface FAQItem {
    question: string;
    answer: string;
    codeSnippet?: string;
}

const FAQSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [activeQuestion, setActiveQuestion] = useState<number | null>(0);
    const [chatInput, setChatInput] = useState('');
    const { t } = useTranslation();

    const faqItems: FAQItem[] = t.faq.items;

    const stats = {
        tvl: '$420,690,000',
        rebels: '13,337'
    };

    return (
        <section id="faq" className="faq-section" ref={sectionRef}>
            {/* Gradient Background */}
            <div className="faq-gradient-bg"></div>

            {/* Glitch Header */}
            <div className="faq-header">
                <motion.div
                    className="header-content"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <span className="header-badge">
                        <span className="badge-dot"></span>
                        {t.faq.accessGranted}
                    </span>
                    <h2 className="faq-title">
                        <span className="title-white">{t.faq.title}</span>
                        <br />
                        <span className="title-green glitch" data-text={t.faq.titleAccent}>{t.faq.titleAccent}</span>
                    </h2>
                </motion.div>
            </div>

            {/* Stats Bar */}
            <motion.div
                className="faq-stats"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="stat-block">
                    <span className="stat-label">{t.faq.stats.tvl}</span>
                    <div className="stat-row">
                        <span className="stat-value">{stats.tvl}</span>
                        <span className="stat-delta">(+5.0%)</span>
                    </div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-block">
                    <span className="stat-label">{t.faq.stats.rebels}</span>
                    <div className="stat-row">
                        <span className="stat-value">{stats.rebels}</span>
                        <span className="stat-status">{t.faq.stats.online}</span>
                    </div>
                </div>
            </motion.div>

            <div className="faq-container">
                {/* Welcome Message */}
                <motion.div
                    className="chat-message system-message"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="message-avatar">
                        <TerminalIcon size={20} />
                    </div>
                    <div className="message-body">
                        <div className="message-header">
                            <span className="sender">TAI_CORE_V1</span>
                            <span className="timestamp">{t.faq.chat.now}</span>
                        </div>
                        <div className="message-content">
                            <p>
                                {t.faq.chat.welcome}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Command Input */}
                <motion.div
                    className="chat-input-container"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <span className="prompt-symbol">&gt;</span>
                    <input
                        type="text"
                        className="chat-input"
                        placeholder={t.faq.chat.placeholder}
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                    />
                    <button className="btn-execute">{t.faq.chat.execute}</button>
                </motion.div>

                {/* FAQ Items as Chat */}
                <div className="faq-list">
                    {faqItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className="faq-item"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        >
                            {/* Question (User message) */}
                            <div
                                className={`chat-message user-message ${activeQuestion === index ? 'active' : ''}`}
                                onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
                            >
                                <div className="message-body">
                                    <div className="message-content">
                                        <p>{item.question}</p>
                                    </div>
                                    <span className="expand-icon">{activeQuestion === index ? '−' : '+'}</span>
                                </div>
                                <div className="message-avatar">
                                    <UserIcon size={18} />
                                </div>
                            </div>

                            {/* Answer (System message) */}
                            <AnimatePresence>
                                {activeQuestion === index && (
                                    <motion.div
                                        className="chat-message system-message answer"
                                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                        animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="message-avatar">
                                            <TerminalIcon size={20} />
                                        </div>
                                        <div className="message-body">
                                            <div className="message-header">
                                                <span className="sender">TAI_CORE_V1</span>
                                                <span className="timestamp">{t.faq.chat.justNow}</span>
                                            </div>
                                            <div className="message-content">
                                                <p>{item.answer}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="cta-block"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1 }}
                >
                    <div className="cta-glow"></div>
                    <div className="cta-content">
                        <span className="cta-badge">{t.faq.cta.badge}</span>
                        <h3 className="cta-title">{t.faq.cta.title}</h3>
                        <p className="cta-subtitle">
                            {t.faq.cta.subtitle}
                        </p>
                        <div className="cta-form">
                            <input type="email" placeholder="your@email.com_" className="email-input" />
                            <motion.button
                                className="btn-punk btn-punk-filled"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {t.faq.cta.connect}
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQSection;
