import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '../i18n';
import './ProtocolSection.css';

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
    const { language } = useTranslation();
    const [selectedRound, setSelectedRound] = useState(0);
    const [hoveredRound, setHoveredRound] = useState<number | null>(null);

    const formatPrice = (price: number) => {
        if (price < 0.01) return `$${price.toFixed(5)}`;
        if (price < 1) return `$${price.toFixed(4)}`;
        return `$${price.toFixed(2)}`;
    };

    const getPhaseLabel = (phase: string) => {
        const labels: Record<string, { zh: string; en: string }> = {
            genesis: { zh: '创世', en: 'Genesis' },
            growth: { zh: '增长期', en: 'Growth' },
            expansion: { zh: '扩张期', en: 'Expansion' },
            maturity: { zh: '成熟期', en: 'Maturity' },
        };
        return labels[phase]?.[language] || phase;
    };

    const getPhaseColor = (phase: string) => {
        const colors: Record<string, string> = {
            genesis: '#adff2f',
            growth: '#00ff88',
            expansion: '#00d4ff',
            maturity: '#ff6b6b',
        };
        return colors[phase] || '#adff2f';
    };

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
                    transition={{ duration: 0.8 }}
                >
                    <div className="hero-badge">
                        <span className="badge-dot"></span>
                        <span>{language === 'zh' ? '革命性代币标准' : 'REVOLUTIONARY TOKEN STANDARD'}</span>
                    </div>
                    <h1 className="hero-title">
                        <span className="title-line">{language === 'zh' ? '市场' : 'PROOF'}</span>
                        <span className="title-line gradient">{language === 'zh' ? '证明' : 'OF MARKET'}</span>
                    </h1>
                    <p className="hero-subtitle">
                        {language === 'zh'
                            ? '价格是唯一的解锁钥匙。不是时间，不是 VC 投票，而是市场参与者用真金白银投票形成的价格共识。'
                            : 'Price is the only key to unlock. Not time, not VC votes, but price consensus formed by market participants voting with real money.'}
                    </p>
                    <div className="hero-quote">
                        <span className="quote-mark">"</span>
                        <span className="quote-text">
                            {language === 'zh' ? '代码比人性更安全' : 'Code is safer than human nature'}
                        </span>
                        <span className="quote-mark">"</span>
                    </div>
                </motion.div>

                {/* Key Stats */}
                <motion.div
                    className="hero-stats"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="stat-item">
                        <span className="stat-value">100B</span>
                        <span className="stat-label">{language === 'zh' ? '总供应量' : 'Total Supply'}</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-value">18</span>
                        <span className="stat-label">{language === 'zh' ? '解锁轮次' : 'Unlock Rounds'}</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-value">72h</span>
                        <span className="stat-label">{language === 'zh' ? '共识期' : 'Consensus Period'}</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-value">{totalGrowth}×</span>
                        <span className="stat-label">{language === 'zh' ? '总增长' : 'Total Growth'}</span>
                    </div>
                </motion.div>
            </div>

            {/* Mechanism Flow */}
            <div className="mechanism-section">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h2 className="section-title">
                        <span className="title-icon">◆</span>
                        {language === 'zh' ? 'PoM 机制流程' : 'PoM MECHANISM FLOW'}
                    </h2>
                </motion.div>

                <motion.div
                    className="mechanism-flow"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <div className="flow-step">
                        <div className="step-number">01</div>
                        <div className="step-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M3 17l6-6 4 4 8-8" />
                                <path d="M17 7h4v4" />
                            </svg>
                        </div>
                        <h3>{language === 'zh' ? '价格达标' : 'Price Target'}</h3>
                        <p>{language === 'zh' ? '市场价格达到当前轮次目标' : 'Market price reaches current round target'}</p>
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
                        <h3>{language === 'zh' ? '72小时共识' : '72h Consensus'}</h3>
                        <p>{language === 'zh' ? '价格必须维持在目标之上' : 'Price must stay above target'}</p>
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
                        <h3>{language === 'zh' ? '自动解锁' : 'Auto Unlock'}</h3>
                        <p>{language === 'zh' ? '合约自动分发 50亿 TAI' : 'Contract auto-distributes 5B TAI'}</p>
                    </div>
                    <div className="flow-reset">
                        <div className="reset-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                            </svg>
                        </div>
                        <div className="reset-text">
                            <strong>{language === 'zh' ? '熔断机制' : 'Circuit Breaker'}</strong>
                            <span>{language === 'zh' ? '价格跌破目标，计时器归零' : 'Price drops below target, timer resets'}</span>
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
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <h2 className="section-title">
                        <span className="title-icon">◆</span>
                        {language === 'zh' ? '18轮价格里程碑' : '18-ROUND PRICE MILESTONES'}
                    </h2>
                    <p className="section-subtitle">
                        {language === 'zh'
                            ? `从 $0.00008 到 $1.98 — ${totalGrowth}倍增长`
                            : `From $0.00008 to $1.98 — ${totalGrowth}× growth`}
                    </p>
                </motion.div>

                {/* Visual Timeline */}
                <motion.div
                    className="rounds-timeline"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.7 }}
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
                            <span>{language === 'zh' ? '创世' : 'Genesis'}</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-dot growth"></span>
                            <span>{language === 'zh' ? '增长期 (×2.0)' : 'Growth (×2.0)'}</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-dot expansion"></span>
                            <span>{language === 'zh' ? '扩张期 (×1.8)' : 'Expansion (×1.8)'}</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-dot maturity"></span>
                            <span>{language === 'zh' ? '成熟期 (×1.5)' : 'Maturity (×1.5)'}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Selected Round Detail */}
                <motion.div
                    className="round-detail"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <div className="detail-card">
                        <div className="detail-header">
                            <span className="detail-round">
                                {language === 'zh' ? '轮次' : 'ROUND'} {unlockRounds[selectedRound].round}
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
                                <span className="meta-label">{language === 'zh' ? '增长倍数' : 'Multiplier'}</span>
                                <span className="meta-value">{unlockRounds[selectedRound].multiplier}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">{language === 'zh' ? '解锁量' : 'Unlock Amount'}</span>
                                <span className="meta-value">5B TAI</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">{language === 'zh' ? '共识期' : 'Consensus'}</span>
                                <span className="meta-value">72h</span>
                            </div>
                        </div>
                        {selectedRound > 0 && (
                            <div className="detail-distribution">
                                <span className="dist-title">{language === 'zh' ? '分配明细' : 'Distribution'}</span>
                                <div className="dist-items">
                                    <div className="dist-item">
                                        <span className="dist-label">{language === 'zh' ? '社区' : 'Community'}</span>
                                        <span className="dist-value">1.4B</span>
                                    </div>
                                    <div className="dist-item">
                                        <span className="dist-label">{language === 'zh' ? '团队' : 'Team'}</span>
                                        <span className="dist-value">2.0B</span>
                                    </div>
                                    <div className="dist-item">
                                        <span className="dist-label">{language === 'zh' ? '固定质押' : 'Fixed Staking'}</span>
                                        <span className="dist-value">1.0B</span>
                                    </div>
                                    <div className="dist-item">
                                        <span className="dist-label">{language === 'zh' ? '质押奖励' : 'Staking Rewards'}</span>
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
                    transition={{ duration: 0.6, delay: 0.9 }}
                >
                    <h2 className="section-title">
                        <span className="title-icon">◆</span>
                        {language === 'zh' ? '传统模式 vs TAI PoM' : 'TRADITIONAL vs TAI PoM'}
                    </h2>
                </motion.div>

                <motion.div
                    className="comparison-grid"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.0 }}
                >
                    {/* Traditional */}
                    <div className="comparison-card traditional">
                        <div className="card-header">
                            <span className="card-icon">✗</span>
                            <h3>{language === 'zh' ? '传统时间解锁' : 'Traditional Time-Lock'}</h3>
                        </div>
                        <div className="card-body">
                            <div className="compare-row">
                                <span className="row-label">{language === 'zh' ? '解锁条件' : 'Unlock Condition'}</span>
                                <span className="row-value bad">{language === 'zh' ? '时间流逝' : 'Time passes'}</span>
                            </div>
                            <div className="compare-row">
                                <span className="row-label">{language === 'zh' ? '解锁轮次' : 'Unlock Rounds'}</span>
                                <span className="row-value bad">1-4</span>
                            </div>
                            <div className="compare-row">
                                <span className="row-label">{language === 'zh' ? '熔断机制' : 'Circuit Breaker'}</span>
                                <span className="row-value bad">{language === 'zh' ? '无' : 'None'}</span>
                            </div>
                            <div className="compare-row">
                                <span className="row-label">{language === 'zh' ? '团队约束' : 'Team Constraint'}</span>
                                <span className="row-value bad">{language === 'zh' ? '弱' : 'Weak'}</span>
                            </div>
                            <div className="compare-row">
                                <span className="row-label">{language === 'zh' ? '利益一致性' : 'Alignment'}</span>
                                <span className="row-value bad">{language === 'zh' ? '低' : 'Low'}</span>
                            </div>
                        </div>
                        <div className="card-footer bad">
                            {language === 'zh' ? '92% 项目使用此模式' : '92% projects use this model'}
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
                                <span className="row-label">{language === 'zh' ? '解锁条件' : 'Unlock Condition'}</span>
                                <span className="row-value good">{language === 'zh' ? '价格目标 + 72h' : 'Price + 72h'}</span>
                            </div>
                            <div className="compare-row">
                                <span className="row-label">{language === 'zh' ? '解锁轮次' : 'Unlock Rounds'}</span>
                                <span className="row-value good">18</span>
                            </div>
                            <div className="compare-row">
                                <span className="row-label">{language === 'zh' ? '熔断机制' : 'Circuit Breaker'}</span>
                                <span className="row-value good">{language === 'zh' ? '自动重置' : 'Auto Reset'}</span>
                            </div>
                            <div className="compare-row">
                                <span className="row-label">{language === 'zh' ? '团队约束' : 'Team Constraint'}</span>
                                <span className="row-value good">{language === 'zh' ? '强' : 'Strong'}</span>
                            </div>
                            <div className="compare-row">
                                <span className="row-label">{language === 'zh' ? '利益一致性' : 'Alignment'}</span>
                                <span className="row-value good">{language === 'zh' ? '极高' : 'Very High'}</span>
                            </div>
                        </div>
                        <div className="card-footer good">
                            {language === 'zh' ? '无业绩，无流动性' : 'No performance, no liquidity'}
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
                    transition={{ duration: 0.6, delay: 1.1 }}
                >
                    <h2 className="rules-title">
                        {language === 'zh' ? '铁律' : 'IRON RULES'}
                    </h2>
                    <div className="rules-grid">
                        <div className="rule-card">
                            <div className="rule-icon">
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13" />
                                </svg>
                            </div>
                            <h3>{language === 'zh' ? '代码即法律' : 'Code is Law'}</h3>
                            <p>{language === 'zh' ? '智能合约是唯一的裁判，没有后门，没有例外' : 'Smart contract is the only judge, no backdoors, no exceptions'}</p>
                        </div>
                        <div className="rule-card">
                            <div className="rule-icon">
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <rect x="3" y="11" width="18" height="11" rx="2" />
                                    <path d="M7 11V7a5 5 0 0110 0v4" />
                                </svg>
                            </div>
                            <h3>{language === 'zh' ? '无业绩无流动性' : 'No Performance, No Liquidity'}</h3>
                            <p>{language === 'zh' ? '价格不达标，一枚代币都流不出' : 'Price not met, not a single token flows out'}</p>
                        </div>
                        <div className="rule-card">
                            <div className="rule-icon">
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                                    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                                </svg>
                            </div>
                            <h3>{language === 'zh' ? '链上透明' : 'On-chain Transparency'}</h3>
                            <p>{language === 'zh' ? '所有规则写在合约里，任何人可验证' : 'All rules in contract, verifiable by anyone'}</p>
                        </div>
                        <div className="rule-card">
                            <div className="rule-icon">
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 6v6l4 2" />
                                    <path d="M16 8l2-2M8 8L6 6M16 16l2 2M8 16l-2 2" />
                                </svg>
                            </div>
                            <h3>{language === 'zh' ? '市场证明' : 'Market Proof'}</h3>
                            <p>{language === 'zh' ? '真金白银的价格共识，不是 VC 投票' : 'Real money price consensus, not VC votes'}</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* CTA */}
            <motion.div
                className="protocol-cta"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 }}
            >
                <a href="/whitepaper" className="cta-button primary">
                    {language === 'zh' ? '阅读白皮书' : 'Read Whitepaper'}
                </a>
                <a href="https://app.tai.lat" target="_blank" rel="noopener noreferrer" className="cta-button secondary">
                    {language === 'zh' ? '启动应用' : 'Launch App'}
                </a>
            </motion.div>
        </section>
    );
};

export default ProtocolSection;
