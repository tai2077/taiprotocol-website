import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState, ReactNode, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n';
import { ChartIcon, NetworkIcon, ChainIcon, LightningIcon } from '../components/Icons';
import './HeroSection.css';

// Constants
const PARTICLE_COUNT = 20;
const MAX_ANIMATION_DELAY_S = 5;
const MIN_ANIMATION_DURATION_S = 3;
const ANIMATION_DURATION_RANGE_S = 4;

const HeroSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { t } = useTranslation();

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Memoize stats to prevent recreation on every render
    const stats = useMemo<{ label: string; value: string; icon: ReactNode; suffix?: string }[]>(() => [
        { label: 'TVL', value: '$42,069', icon: <ChartIcon size={14} /> },
        { label: t.hero.stats.nodesOnline, value: '1,337', icon: <NetworkIcon size={14} /> },
        { label: t.hero.stats.blockHeight, value: '840,000', icon: <ChainIcon size={14} /> },
        { label: t.hero.stats.uptime, value: '99.9%', suffix: t.hero.stats.unstoppable, icon: <LightningIcon size={14} /> },
    ], [t.hero.stats.nodesOnline, t.hero.stats.blockHeight, t.hero.stats.uptime, t.hero.stats.unstoppable]);

    // Pre-generate particle styles to avoid Math.random() on every render
    const particleStyles = useMemo(() =>
        Array.from({ length: PARTICLE_COUNT }, () => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * MAX_ANIMATION_DELAY_S}s`,
            animationDuration: `${MIN_ANIMATION_DURATION_S + Math.random() * ANIMATION_DURATION_RANGE_S}s`
        }))
    , []);

    return (
        <section id="hero" className="hero-section" ref={sectionRef}>
            {/* Animated Background */}
            <motion.div className="hero-bg" style={{ y: backgroundY }}>
                <div className="grid-overlay"></div>
                <div
                    className="glow-orb orb-1"
                    style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
                ></div>
                <div
                    className="glow-orb orb-2"
                    style={{ transform: `translate(${-mousePosition.x * 0.5}px, ${-mousePosition.y * 0.5}px)` }}
                ></div>
                <div className="glow-orb orb-3"></div>

                {/* Floating particles */}
                <div className="particles">
                    {particleStyles.map((style, i) => (
                        <div
                            key={i}
                            className="particle"
                            style={style}
                        ></div>
                    ))}
                </div>
            </motion.div>

            <motion.div className="hero-container" style={{ opacity }}>
                <div className="hero-content">
                    {/* Left Side - Manifesto */}
                    <motion.div
                        className="hero-left"
                        initial={{ opacity: 0, x: -80 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <motion.div
                            className="hero-badge"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <span className="badge-dot"></span>
                            <span>{t.hero.protocolLive}</span>
                        </motion.div>

                        <h1 className="hero-title">
                            <motion.span
                                className="title-line"
                                initial={{ opacity: 0, y: 60 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {t.hero.title}
                            </motion.span>
                            <motion.span
                                className="title-line title-accent glitch"
                                data-text={t.hero.titleGradient}
                                initial={{ opacity: 0, y: 60 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {t.hero.titleGradient}
                            </motion.span>
                        </h1>

                        <motion.div
                            className="hero-manifesto"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                        >
                            <h2 className="manifesto-title">
                                {t.hero.subtitle}
                                <br />
                                <span className="text-gradient">{t.hero.subtitleGradient}</span>
                            </h2>
                            <p className="manifesto-text">
                                {t.hero.description}
                            </p>
                            <div className="hero-cta-group">
                                <motion.a
                                    href="https://app.taiprotocol.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-punk btn-punk-filled btn-punk-lg hero-cta"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {t.hero.ctaPrimary}
                                    <span className="cta-arrow">→</span>
                                </motion.a>
                                <Link to="/terminal">
                                    <motion.span
                                        className="btn-punk btn-punk-lg"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {t.hero.ctaSecondary}
                                    </motion.span>
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Anti-Grid Protocol */}
                    <motion.div
                        className="hero-right"
                        initial={{ opacity: 0, x: 80 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="anti-grid-card">
                            <div className="card-glow"></div>
                            <div className="card-header">
                                <motion.span
                                    className="card-badge"
                                    animate={{ rotate: [-1, 1, -1] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    {t.hero.manifestoTitle}
                                </motion.span>
                            </div>

                            <h3 className="card-title">
                                <span className="title-prefix">///</span>
                                {t.hero.antiGridTitle}
                            </h3>

                            <div className="protocol-rules">
                                {t.hero.manifestoItems.map((rule, index) => (
                                    <motion.div
                                        key={index}
                                        className="rule"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.8 + index * 0.15, duration: 0.5 }}
                                    >
                                        <span className="rule-number">{index + 1}.</span>
                                        <span className="rule-text">{rule}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="circuit-visual">
                                <svg viewBox="0 0 200 200" className="circuit-svg">
                                    <defs>
                                        <filter id="glow">
                                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                                            <feMerge>
                                                <feMergeNode in="coloredBlur" />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>
                                    </defs>
                                    <g filter="url(#glow)">
                                        <rect x="70" y="70" width="60" height="60" fill="none" stroke="#adff2f" strokeWidth="1.5" />
                                        <rect x="80" y="80" width="40" height="40" fill="none" stroke="#adff2f" strokeWidth="0.5" opacity="0.5" />
                                        <line x1="100" y1="0" x2="100" y2="70" stroke="#adff2f" strokeWidth="0.5" strokeDasharray="4,4">
                                            <animate attributeName="stroke-dashoffset" from="0" to="8" dur="1s" repeatCount="indefinite" />
                                        </line>
                                        <line x1="100" y1="130" x2="100" y2="200" stroke="#adff2f" strokeWidth="0.5" strokeDasharray="4,4">
                                            <animate attributeName="stroke-dashoffset" from="0" to="8" dur="1s" repeatCount="indefinite" />
                                        </line>
                                        <line x1="0" y1="100" x2="70" y2="100" stroke="#adff2f" strokeWidth="0.5" strokeDasharray="4,4">
                                            <animate attributeName="stroke-dashoffset" from="0" to="8" dur="1s" repeatCount="indefinite" />
                                        </line>
                                        <line x1="130" y1="100" x2="200" y2="100" stroke="#adff2f" strokeWidth="0.5" strokeDasharray="4,4">
                                            <animate attributeName="stroke-dashoffset" from="0" to="8" dur="1s" repeatCount="indefinite" />
                                        </line>
                                        <circle cx="100" cy="100" r="6" fill="#adff2f">
                                            <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
                                            <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                                        </circle>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Stats Bar */}
                <motion.div
                    className="hero-stats"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="stat-item"
                            whileHover={{ scale: 1.05, y: -2 }}
                            transition={{ duration: 0.2 }}
                        >
                            <span className="stat-icon">{stat.icon}</span>
                            <span className="stat-label">{stat.label}:</span>
                            <span className="stat-value">{stat.value}</span>
                            {stat.suffix && <span className="stat-suffix">{stat.suffix}</span>}
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >
                <div className="scroll-line"></div>
                <span className="scroll-text">{t.hero.scrollDown}</span>
            </motion.div>
        </section>
    );
};

export default HeroSection;
