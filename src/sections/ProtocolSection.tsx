import { useState, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '../i18n';
import './ProtocolSection.css';

// Standard easing curve
const EASE_CURVE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// 18-round unlock data
const unlockRounds = [
    { round: 0, price: 0.00008, phase: 'genesis', multiplier: '-' },
    { round: 1, price: 0.00016, phase: 'growth', multiplier: '2.0×' },
    { round: 2, price: 0.00032, phase: 'growth', multiplier: '2.0×' },
    { round: 3, price: 0.00064, phase: 'growth', multiplier: '2.0×' },
    { round: 4, price: 0.00128, phase: 'growth', multiplier: '2.0×' },
    { round: 5, price: 0.00256, phase: 'growth', multiplier: '2.0×' },
    { round: 6, price: 0.00512, phase: 'growth', multiplier: '2.0×' },
    { round: 7, price: 0.009216, phase: 'expansion', multiplier: '1.8×' },
    { round: 8, price: 0.016589, phase: 'expansion', multiplier: '1.8×' },
    { round: 9, price: 0.02986, phase: 'expansion', multiplier: '1.8×' },
    { round: 10, price: 0.053748, phase: 'expansion', multiplier: '1.8×' },
    { round: 11, price: 0.096746, phase: 'expansion', multiplier: '1.8×' },
    { round: 12, price: 0.174143, phase: 'expansion', multiplier: '1.8×' },
    { round: 13, price: 0.261214, phase: 'maturity', multiplier: '1.5×' },
    { round: 14, price: 0.391821, phase: 'maturity', multiplier: '1.5×' },
    { round: 15, price: 0.587731, phase: 'maturity', multiplier: '1.5×' },
    { round: 16, price: 0.881597, phase: 'maturity', multiplier: '1.5×' },
    { round: 17, price: 1.322395, phase: 'maturity', multiplier: '1.5×' },
    { round: 18, price: 1.983593, phase: 'maturity', multiplier: '1.5×' },
];

const ProtocolSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const { t } = useTranslation();
    const [selectedRound, setSelectedRound] = useState(0);
    const [hoveredRound, setHoveredRound] = useState<number | null>(null);

    const formatPrice = useCallback((price: number) => {
        if (price < 0.01) return `$${price.toFixed(5)}`;
        if (price < 1) return `$${price.toFixed(4)}`;
        return `$${price.toFixed(2)}`;
    }, []);

    const getPhaseLabel = useCallback((phase: string) => {
        const phaseKey = phase as keyof typeof t.unlockRounds.phases;
        return t.unlockRounds.phases[phaseKey] || phase;
    }, [t.unlockRounds.phases]);

    const getPhaseColor = useCallback((phase: string) => {
        const colors: Record<string, string> = {
            genesis: '#adff2f',
            growth: '#00ff88',
            expansion: '#00d4ff',
            maturity: '#ff6b6b',
        };
        return colors[phase] || '#adff2f';
    }, []);

    // Calculate total growth
    const totalGrowth = (unlockRounds[18].price / unlockRounds[0].price).toFixed(0);

    return (
        <section id="protocol" className="protocol-section" ref={sectionRef}>
            {/* Hero Section */}
            <div className="protocol-hero">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: EASE_CURVE }}
                >
                    <div className="hero-badge">
                        <span className="badge-dot"></span>
                        <span>{t.protocol.badge}</span>
                    </div>
                    <h1 className="hero-title">
                        <span className="title-line">{t.protocol.heroTitle}</span>
                        <span className="title-line gradient">{t.protocol.heroTitleGradient}</span>
                    </h1>
                    <p className="hero-subtitle">
                        {t.protocol.heroSubtitle}
                    </p>
                    <div className="hero-quote">
                        <span className="quote-mark">"</span>
                        <span className="quote-text">
                            {t.protocol.heroQuote}
                        </span>
                        <span className="quote-mark">"</span>
                    </div>
                </motion.div>

                {/* Key Stats */}
                <motion.div
                    className="hero-stats"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3, ease: EASE_CURVE }}
                >
                    <div className="stat-item">
                        <span className="stat-value">100B</span>
                        <span className="stat-label">{t.protocol.stats.totalSupply}</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-value">18</span>
                        <span className="stat-label">{t.protocol.stats.unlockRounds}</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-value">72h</span>
                        <span className="stat-label">{t.protocol.stats.consensusPeriod}</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-value">{totalGrowth}×</span>
                        <span className="stat-label">{t.protocol.stats.totalGrowth}</span>
                    </div>
                </motion.div>
            </div>

            {/* Mechanism Flow */}
            <div className="mechanism-section">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4, ease: EASE_CURVE }}
                >
                    <h2 className="section-title">
                        <span className="title-icon">◆</span>
                        {t.protocol.mechanism.title}
                    </h2>
                </motion.div>

                <motion.div
                    className="mechanism-flow"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5, ease: EASE_CURVE }}
                >
                    <div className="flow-step">
                        <div className="step-number">01</div>
                        <div className="step-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M3 17l6-6 4 4 8-8" />
                                <path d="M17 7h4v4" />
                            </svg>
                        </div>
                        <h3>{t.protocol.mechanism.step1Title}</h3>
                        <p>{t.protocol.mechanism.step1Desc}</p>
                    </div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-step">
                        <div className="step-number">02</div>
                        <div className="step-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 6v6l4 2" />
                            </svg>
                        </div>
                        <h3>{t.protocol.mechanism.step2Title}</h3>
                        <p>{t.protocol.mechanism.step2Desc}</p>
                    </div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-step highlight">
                        <div className="step-number">03</div>
                        <div className="step-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="3" y="11" width="18" height="11" rx="2" />
                                <path d="M7 11V7a5 5 0 0110 0v4" />
                            </svg>
                        </div>
                        <h3>{t.protocol.mechanism.step3Title}</h3>
                        <p>{t.protocol.mechanism.step3Desc}</p>
                    </div>
                    <div className="flow-reset">
                        <div className="reset-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                            </svg>
                        </div>
                        <div className="reset-text">
                            <strong>{t.protocol.mechanism.circuitBreaker}</strong>
                            <span>{t.protocol.mechanism.circuitBreakerDesc}</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* 18 Rounds Timeline */}
            <div className="rounds-section">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6, ease: EASE_CURVE }}
                >
                    <h2 className="section-title">
                        <span className="title-icon">◆</span>
                        {t.protocol.rounds.title}
                    </h2>
                    <p className="section-subtitle">
                        {t.protocol.rounds.subtitle.replace('{growth}', totalGrowth)}
                    </p>
                </motion.div>

                {/* Visual Timeline */}
                <motion.div
                    className="rounds-timeline"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.7, ease: EASE_CURVE }}
                >
                    <div className="timeline-track">
                        {unlockRounds.map((round, index) => (
                            <div
                                key={round.round}
                                className={`timeline-node ${round.phase} ${selectedRound === index ? 'selected' : ''} ${hoveredRound === index ? 'hovered' : ''}`}
                                style={{ '--phase-color': getPhaseColor(round.phase) } as React.CSSProperties}
                                onClick={() => setSelectedRound(index)}
                                onMouseEnter={() => setHoveredRound(index)}
                                onMouseLeave={() => setHoveredRound(null)}
                            >
                                <div className="node-dot"></div>
                                <div className="node-label">{round.round}</div>
                            </div>
                        ))}
                    </div>

                    {/* Phase Legend */}
                    <div className="phase-legend">
                        <div className="legend-item">
                            <span className="legend-dot genesis"></span>
                            <span>{t.unlockRounds.phases.genesis}</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-dot growth"></span>
                            <span>{t.unlockRounds.phases.growth} (×2.0)</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-dot expansion"></span>
                            <span>{t.unlockRounds.phases.expansion} (×1.8)</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-dot maturity"></span>
                            <span>{t.unlockRounds.phases.maturity} (×1.5)</span>
                        </div>
                    </div>
                </motion.div>

                {/* Selected Round Detail */}
                <motion.div
                    className="round-detail"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8, ease: EASE_CURVE }}
                >
                    <div className="detail-card">
                        <div className="detail-header">
                            <span className="detail-round">
                                {t.protocol.rounds.roundLabel} {unlockRounds[selectedRound].round}
                            </span>
                            <span
                                className="detail-phase"
                                style={{ color: getPhaseColor(unlockRounds[selectedRound].phase) }}
                            >
                                {getPhaseLabel(unlockRounds[selectedRound].phase)}
                            </span>
                        </div>
                        <div className="detail-price">
                            {formatPrice(unlockRounds[selectedRound].price)}
                        </div>
                        <div className="detail-meta">
                            <div className="meta-item">
                                <span className="meta-label">{t.protocol.rounds.multiplier}</span>
                                <span className="meta-value">{unlockRounds[selectedRound].multiplier}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">{t.protocol.rounds.unlockAmount}</span>
                                <span className="meta-value">5B TAI</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">{t.protocol.rounds.consensus}</span>
                                <span className="meta-value">72h</span>
                            </div>
                        </div>
                        {selectedRound > 0 && (
                            <div className="detail-distribution">
                                <span className="dist-title">{t.protocol.rounds.distribution}</span>
                                <div className="dist-items">
                                    <div className="dist-item">
                                        <span className="dist-label">{t.protocol.rounds.community}</span>
                                        <span className="dist-value">1.4B</span>
                                    </div>
                                    <div className="dist-item">
                                        <span className="dist-label">{t.protocol.rounds.team}</span>
                                        <span className="dist-value">2.0B</span>
                                    </div>
                                    <div className="dist-item">
                                        <span className="dist-label">{t.protocol.rounds.fixedStaking}</span>
                                        <span className="dist-value">1.0B</span>
                                    </div>
                                    <div className="dist-item">
                                        <span className="dist-label">{t.protocol.rounds.stakingRewards}</span>
                                        <span className="dist-value">0.6B</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Comparison Section */}
            <div className="comparison-section">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.9, ease: EASE_CURVE }}
                >
                    <h2 className="section-title">
                        <span className="title-icon">◆</span>
                        {t.protocol.comparison.title}
                    </h2>
                </motion.div>

                <motion.div
                    className="comparison-grid"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.0, ease: EASE_CURVE }}
                >
                    {/* Traditional */}
                    <div className="comparison-card traditional">
                        <div className="card-header">
                            <span className="card-icon">✗</span>
                            <h3>{t.protocol.comparison.traditional}</h3>
                        </div>
                        <div className="card-body">
                            <div className="compare-row">
                                <span className="row-label">{t.protocol.comparison.unlockCondition}</span>
                                <span className="row-value bad">{t.protocol.comparison.timePasses}</span>
                            </div>
                            <div className="compare-row">
                                <span className="row-label">{t.protocol.stats.unlockRounds}</span>
                                <span className="row-value bad">1-4</span>
                            </div>
                            <div className="compare-row">
                                <span className="row-label">{t.protocol.comparison.circuitBreaker}</span>
                                <span className="row-value bad">{t.protocol.comparison.none}</span>
                            </div>
                            <div className="compare-row">
                                <span className="row-label">{t.protocol.comparison.teamConstraint}</span>
                                <span className="row-value bad">{t.protocol.comparison.weak}</span>
                            </div>
                            <div className="compare-row">
                                <span className="row-label">{t.protocol.comparison.alignment}</span>
                                <span className="row-value bad">{t.protocol.comparison.low}</span>
                            </div>
                        </div>
                        <div className="card-footer bad">
                            {t.protocol.comparison.traditionalFooter}
                        </div>
                    </div>

                    {/* VS */}
                    <div className="vs-badge">VS</div>

                    {/* TAI */}
                    <div className="comparison-card tai">
                        <div className="card-header">
                            <span className="card-icon">◆</span>
                            <h3>TAI PoM</h3>
                        </div>
                        <div className="card-body">
                            <div className="compare-row">
                                <span className="row-label">{t.protocol.comparison.unlockCondition}</span>
                                <span className="row-value good">{t.protocol.comparison.priceTarget}</span>
                            </div>
                            <div className="compare-row">
                                <span className="row-label">{t.protocol.stats.unlockRounds}</span>
                                <span className="row-value good">18</span>
                            </div>
                            <div className="compare-row">
                                <span className="row-label">{t.protocol.comparison.circuitBreaker}</span>
                                <span className="row-value good">{t.protocol.comparison.autoReset}</span>
                            </div>
                            <div className="compare-row">
                                <span className="row-label">{t.protocol.comparison.teamConstraint}</span>
                                <span className="row-value good">{t.protocol.comparison.strong}</span>
                            </div>
                            <div className="compare-row">
                                <span className="row-label">{t.protocol.comparison.alignment}</span>
                                <span className="row-value good">{t.protocol.comparison.veryHigh}</span>
                            </div>
                        </div>
                        <div className="card-footer good">
                            {t.protocol.comparison.taiFooter}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Iron Rules */}
            <div className="rules-section">
                <motion.div
                    className="rules-container"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.1, ease: EASE_CURVE }}
                >
                    <h2 className="rules-title">
                        {t.protocol.rules.title}
                    </h2>
                    <div className="rules-grid">
                        <div className="rule-card">
                            <div className="rule-icon">
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13" />
                                </svg>
                            </div>
                            <h3>{t.protocol.rules.codeIsLaw}</h3>
                            <p>{t.protocol.rules.codeIsLawDesc}</p>
                        </div>
                        <div className="rule-card">
                            <div className="rule-icon">
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <rect x="3" y="11" width="18" height="11" rx="2" />
                                    <path d="M7 11V7a5 5 0 0110 0v4" />
                                </svg>
                            </div>
                            <h3>{t.protocol.rules.noPerformance}</h3>
                            <p>{t.protocol.rules.noPerformanceDesc}</p>
                        </div>
                        <div className="rule-card">
                            <div className="rule-icon">
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                                    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                                </svg>
                            </div>
                            <h3>{t.protocol.rules.onChain}</h3>
                            <p>{t.protocol.rules.onChainDesc}</p>
                        </div>
                        <div className="rule-card">
                            <div className="rule-icon">
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 6v6l4 2" />
                                    <path d="M16 8l2-2M8 8L6 6M16 16l2 2M8 16l-2 2" />
                                </svg>
                            </div>
                            <h3>{t.protocol.rules.marketProof}</h3>
                            <p>{t.protocol.rules.marketProofDesc}</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* CTA */}
            <motion.div
                className="protocol-cta"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2, ease: EASE_CURVE }}
            >
                <a href="/whitepaper" className="cta-button primary">
                    {t.protocol.cta.whitepaper}
                </a>
                <a href="https://app.tai.lat" target="_blank" rel="noopener noreferrer" className="cta-button secondary">
                    {t.protocol.cta.launchApp}
                </a>
            </motion.div>
        </section>
    );
};

export default ProtocolSection;
