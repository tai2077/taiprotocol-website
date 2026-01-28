import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from '../i18n';
import './ComparisonSection.css';

const ComparisonSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const { t } = useTranslation();

    // Traditional vs PoM comparison based on whitepaper
    const comparisonData = {
        traditional: {
            title: t.comparison.traditional.title,
            features: [
                { label: t.comparison.categories.unlock, value: t.comparison.traditional.unlock, status: 'bad' },
                { label: t.comparison.categories.rounds, value: t.comparison.traditional.rounds, status: 'bad' },
                { label: t.comparison.categories.circuit, value: t.comparison.traditional.circuit, status: 'bad' },
                { label: t.comparison.categories.constraint, value: t.comparison.traditional.constraint, status: 'bad' },
                { label: t.comparison.categories.alignment, value: t.comparison.traditional.alignment, status: 'bad' },
            ]
        },
        tai: {
            title: t.comparison.tai.title,
            features: [
                { label: t.comparison.categories.unlock, value: t.comparison.tai.unlock, status: 'good' },
                { label: t.comparison.categories.rounds, value: t.comparison.tai.rounds, status: 'good' },
                { label: t.comparison.categories.circuit, value: t.comparison.tai.circuit, status: 'good' },
                { label: t.comparison.categories.constraint, value: t.comparison.tai.constraint, status: 'good' },
                { label: t.comparison.categories.alignment, value: t.comparison.tai.alignment, status: 'good' },
            ]
        }
    };

    // Key stats from whitepaper
    const keyStats = [
        { label: t.comparison.stats.totalSupply, value: '100B', unit: t.comparison.stats.unit.tai },
        { label: t.comparison.stats.unlockRounds, value: '18', unit: t.comparison.stats.unit.rounds },
        { label: t.comparison.stats.consensusPeriod, value: '72', unit: t.comparison.stats.unit.hours },
        { label: t.comparison.stats.finalTarget, value: '$1.98', unit: t.comparison.stats.unit.empty },
    ];

    return (
        <section id="comparison" className="comparison-section" ref={sectionRef}>
            {/* Header */}
            <div className="comparison-header">
                <motion.div
                    className="header-content"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <span className="status-badge">
                        <span className="badge-dot"></span>
                        {t.comparison.statusLabel}
                    </span>
                    <h2 className="section-title">
                        <span className="title-white">{t.comparison.title}</span>
                        <span className="title-accent">{t.comparison.titleAccent}</span>
                        <span className="title-gradient">{t.comparison.titleEnd}</span>
                    </h2>
                    <p className="section-subtitle">
                        {t.hero.description}
                    </p>
                </motion.div>
            </div>

            {/* Key Stats Bar */}
            <motion.div
                className="stats-bar"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                {keyStats.map((stat, index) => (
                    <div key={index} className="stat-block">
                        <span className="stat-value">{stat.value}</span>
                        <span className="stat-unit">{stat.unit}</span>
                        <span className="stat-label">{stat.label}</span>
                    </div>
                ))}
            </motion.div>

            {/* Comparison Tables */}
            <div className="comparison-container">
                {/* Traditional Side */}
                <motion.div
                    className="comparison-card traditional"
                    initial={{ opacity: 0, x: -40 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="card-header">
                        <span className="card-icon">✗</span>
                        <h3>{comparisonData.traditional.title}</h3>
                    </div>
                    <div className="card-body">
                        {comparisonData.traditional.features.map((feature, index) => (
                            <div key={index} className="feature-row">
                                <span className="feature-label">{feature.label}</span>
                                <span className={`feature-value ${feature.status}`}>{feature.value}</span>
                            </div>
                        ))}
                    </div>
                    <div className="card-footer bad">
                        {t.comparison.footerBad}
                    </div>
                </motion.div>

                {/* VS Divider */}
                <motion.div
                    className="vs-divider"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 }}
                >
                    <span>VS</span>
                </motion.div>

                {/* TAI Side */}
                <motion.div
                    className="comparison-card tai"
                    initial={{ opacity: 0, x: 40 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="card-header">
                        <span className="card-icon">◆</span>
                        <h3>{comparisonData.tai.title}</h3>
                    </div>
                    <div className="card-body">
                        {comparisonData.tai.features.map((feature, index) => (
                            <div key={index} className="feature-row">
                                <span className="feature-label">{feature.label}</span>
                                <span className={`feature-value ${feature.status}`}>{feature.value}</span>
                            </div>
                        ))}
                    </div>
                    <div className="card-footer good">
                        {t.comparison.footerGood}
                    </div>
                </motion.div>
            </div>

            {/* Bottom Quote */}
            <motion.div
                className="bottom-quote"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
            >
                <p>
                    {t.comparison.quote}
                </p>
            </motion.div>
        </section>
    );
};

export default ComparisonSection;
