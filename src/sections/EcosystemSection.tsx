import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n';
import './EcosystemSection.css';

// Standard easing curve
const EASE_CURVE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Real contract data from mainnet
const CONTRACTS = [
    {
        id: 'TaiToken',
        name: 'TaiToken',
        type: 'core' as const,
        address: 'EQDrjcL2uTkVEj2tmH9wbf83ZrO5wFbgIOApyIVr223RcgpL',
        x: 50,
        y: 40,
        connections: ['SimpleOracle', 'VestingContract', 'StakingPool', 'FixedStaking', 'SaleContract'],
    },
    {
        id: 'SimpleOracle',
        name: 'SimpleOracle',
        type: 'infrastructure' as const,
        address: 'EQAolJtP02gG6KMr9f_JbTR8CC1yK9BGTjEv1HqGIdhvnpQT',
        x: 25,
        y: 25,
        connections: ['TaiToken', 'VestingContract'],
    },
    {
        id: 'VestingContract',
        name: 'VestingContract',
        type: 'infrastructure' as const,
        address: 'EQC_rE2HuzK3OvHd5qhxZdm0xzVCa0kOR64ggf50dioQCRpw',
        x: 75,
        y: 20,
        connections: ['TaiToken', 'SimpleOracle'],
    },
    {
        id: 'StakingPool',
        name: 'StakingPool',
        type: 'staking' as const,
        address: 'EQBG-U5Aiz_IoGt8Wlgzqn_ELeL6zoyUlhiONviLQX2oQLyu',
        x: 20,
        y: 55,
        connections: ['TaiToken'],
    },
    {
        id: 'FixedStaking',
        name: 'FixedStaking',
        type: 'staking' as const,
        address: 'EQDAIPbwnvMcWsbrXcRVOT1EYFhkIoIcFXIfy2C07wXyIf9m',
        x: 80,
        y: 55,
        connections: ['TaiToken'],
    },
    {
        id: 'FundPool',
        name: 'FundPool',
        type: 'governance' as const,
        address: 'EQAod212MMyb64KE5FIlG6Idkfx56OlkWpEJMSRv0t2Qfirm',
        x: 35,
        y: 75,
        connections: ['TaiToken', 'SimpleOracle'],
    },
    {
        id: 'TeamVault',
        name: 'TeamVault',
        type: 'governance' as const,
        address: 'EQCU9_m0V1Z8Pn96EFEbdli6WEcY99yRipUO3C-Fg97TYYX9',
        x: 65,
        y: 75,
        connections: ['TaiToken', 'SimpleOracle'],
    },
    {
        id: 'SaleContract',
        name: 'SaleContract',
        type: 'dapps' as const,
        address: 'EQBzd6g1X2N712Kv9-guQb1sO4VsN9qG2tGtHimePHpTmkIu',
        x: 15,
        y: 85,
        connections: ['TaiToken', 'MarketingVault'],
    },
    {
        id: 'MarketingVault',
        name: 'MarketingVault',
        type: 'dapps' as const,
        address: 'EQCCqb7hWjt7MyFMP6hb0AmryMUyhCqd5WVa_2KJAjxA-n9f',
        x: 50,
        y: 90,
        connections: ['SaleContract'],
    },
    {
        id: 'CommunityDev',
        name: 'CommunityDev',
        type: 'governance' as const,
        address: 'EQCeUAIpYVaA_4Dl1wVmCBm6xTVZxxnOBHZnSap2ZFB6xEHQ',
        x: 85,
        y: 85,
        connections: ['TaiToken'],
    },
];

type ContractType = 'core' | 'infrastructure' | 'staking' | 'governance' | 'dapps';

const EcosystemSection = () => {
    const [activeNode, setActiveNode] = useState<string>('TaiToken');
    const [activeFilter, setActiveFilter] = useState<string>('all');
    const { t, language } = useTranslation();

    // Contract descriptions
    const contractDescriptions: Record<string, { en: string; zh: string }> = useMemo(() => ({
        TaiToken: {
            en: 'TAI Token - The core token of TAI Protocol. Total supply: 100 billion TAI. Non-mintable after deployment.',
            zh: 'TAI 代币 - TAI Protocol 的核心代币。总供应量：1000亿 TAI。部署后不可增发。',
        },
        SimpleOracle: {
            en: 'Price Oracle - Provides real-time TAI price feed for unlock conditions. Connected to DEX liquidity pools.',
            zh: '价格预言机 - 为解锁条件提供实时 TAI 价格。连接 DEX 流动性池。',
        },
        VestingContract: {
            en: '18-Round Vesting - Price-based unlock system. Each round releases 5B TAI when price target is met and maintained for 72 hours.',
            zh: '18轮解锁合约 - 基于价格的解锁系统。每轮在价格达标并维持72小时后释放50亿 TAI。',
        },
        StakingPool: {
            en: 'Flexible Staking - 6% rewards per round. No lock-up period. Maximum 100B TAI per round.',
            zh: '灵活质押池 - 每轮6%收益。无锁定期。每轮最高1000亿 TAI。',
        },
        FixedStaking: {
            en: 'Fixed Staking - 200% total yield. Principal unlocks at Round 12, rewards at Round 18. Total limit: 90B TAI.',
            zh: '固定质押 - 总收益200%。本金在第12轮解锁，收益在第18轮解锁。总限额：900亿 TAI。',
        },
        FundPool: {
            en: 'Fund Pool - Protocol treasury. Withdrawal only allowed when TAI price reaches $1.0 or above.',
            zh: '基金池 - 协议金库。仅当 TAI 价格达到 $1.0 或以上时才能提取。',
        },
        TeamVault: {
            en: 'Team Vault - Team allocation. Same $1.0 price threshold as FundPool. Aligns team interests with holders.',
            zh: '团队金库 - 团队分配。与基金池相同的 $1.0 价格门槛。使团队利益与持有者一致。',
        },
        SaleContract: {
            en: 'Sale Contract - Token sale with task rewards. Supports invite codes and referral bonuses.',
            zh: '销售合约 - 带任务奖励的代币销售。支持邀请码和推荐奖励。',
        },
        MarketingVault: {
            en: 'Marketing Vault - Rewards distribution for marketing tasks and early buyer incentives.',
            zh: '营销金库 - 营销任务和早期购买者激励的奖励分发。',
        },
        CommunityDev: {
            en: 'Community Development - Funds for ecosystem growth, partnerships, and community initiatives.',
            zh: '社区发展 - 用于生态系统增长、合作伙伴关系和社区计划的资金。',
        },
    }), []);

    // Filter nodes based on active filter
    const filteredNodes = useMemo(() => {
        if (activeFilter === 'all') return CONTRACTS;
        const filterMap: Record<string, ContractType[]> = {
            infrastructure: ['core', 'infrastructure'],
            staking: ['staking'],
            governance: ['governance'],
            dapps: ['dapps'],
        };
        const types = filterMap[activeFilter] || [];
        return CONTRACTS.filter(node => types.includes(node.type));
    }, [activeFilter]);

    // Get active node info
    const activeNodeData = useMemo(() => {
        return CONTRACTS.find(n => n.id === activeNode);
    }, [activeNode]);

    const activeDescription = useMemo(() => {
        const desc = contractDescriptions[activeNode];
        return desc ? (language === 'zh' ? desc.zh : desc.en) : '';
    }, [activeNode, language, contractDescriptions]);

    // Scroll to section
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="ecosystem" className="ecosystem-section">
            {/* Header */}
            <div className="ecosystem-header">
                <div className="header-nav">
                    <button onClick={() => scrollToSection('ecosystem-overview')} className="nav-item">
                        {t.ecosystem.categories.ecosystem}
                    </button>
                    <button onClick={() => scrollToSection('staking-section')} className="nav-item">
                        {t.ecosystem.categories.staking}
                    </button>
                    <button onClick={() => scrollToSection('governance-section')} className="nav-item">
                        {t.ecosystem.categories.governance}
                    </button>
                    <a
                        href="/whitepaper"
                        className="nav-item"
                    >
                        {t.ecosystem.categories.docs} →
                    </a>
                </div>
                <div className="header-actions">
                    <a
                        href="https://app.tai.lat"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-punk btn-punk-filled"
                    >
                        {t.nav.launchApp}
                    </a>
                </div>
            </div>

            {/* Ecosystem Overview */}
            <div id="ecosystem-overview" className="ecosystem-container">
                {/* Left - Title & Neural Web */}
                <div className="ecosystem-main">
                    <motion.div
                        className="ecosystem-title-block"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ ease: EASE_CURVE }}
                    >
                        <h2 className="ecosystem-title">
                            {t.ecosystemPage.title}<br />
                            <span className="title-accent">{t.ecosystemPage.titleAccent}</span>
                        </h2>
                        <p className="ecosystem-subtitle">
                            {t.ecosystemPage.subtitle}
                        </p>
                    </motion.div>

                    {/* Neural Web Visualization */}
                    <div className="neural-web">
                        <svg viewBox="0 0 100 100" className="web-svg">
                            {/* Connection Lines */}
                            {filteredNodes.map(node =>
                                node.connections.map(connId => {
                                    const targetNode = CONTRACTS.find(n => n.id === connId);
                                    if (!targetNode) return null;
                                    if (!filteredNodes.find(n => n.id === connId)) return null;
                                    return (
                                        <line
                                            key={`${node.id}-${connId}`}
                                            x1={node.x}
                                            y1={node.y}
                                            x2={targetNode.x}
                                            y2={targetNode.y}
                                            stroke={activeNode === node.id || activeNode === connId
                                                ? 'rgba(173, 255, 47, 0.6)'
                                                : 'rgba(173, 255, 47, 0.2)'}
                                            strokeWidth={activeNode === node.id || activeNode === connId ? '0.5' : '0.3'}
                                            strokeDasharray="2,2"
                                        />
                                    );
                                })
                            )}

                            {/* Nodes */}
                            {filteredNodes.map(node => (
                                <g
                                    key={node.id}
                                    className={`node-group ${activeNode === node.id ? 'active' : ''}`}
                                    onClick={() => setActiveNode(node.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <circle
                                        cx={node.x}
                                        cy={node.y}
                                        r={node.type === 'core' ? 5 : 3}
                                        fill={activeNode === node.id
                                            ? 'var(--color-acid-green)'
                                            : node.type === 'core'
                                                ? 'rgba(173, 255, 47, 0.8)'
                                                : 'rgba(173, 255, 47, 0.5)'}
                                        className="node-dot"
                                    />
                                    <text
                                        x={node.x}
                                        y={node.y - 6}
                                        textAnchor="middle"
                                        fill={activeNode === node.id ? 'var(--color-acid-green)' : 'rgba(173, 255, 47, 0.7)'}
                                        fontSize="2.5"
                                        fontFamily="var(--font-mono)"
                                    >
                                        {node.name}
                                    </text>
                                </g>
                            ))}
                        </svg>
                    </div>

                    {/* Filters */}
                    <div className="ecosystem-filters">
                        <motion.button
                            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('all')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {t.ecosystemPage.filters.all}
                        </motion.button>
                        <motion.button
                            className={`filter-btn ${activeFilter === 'infrastructure' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('infrastructure')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {t.ecosystemPage.filters.infra}
                        </motion.button>
                        <motion.button
                            className={`filter-btn ${activeFilter === 'staking' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('staking')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {t.ecosystemPage.filters.staking}
                        </motion.button>
                        <motion.button
                            className={`filter-btn ${activeFilter === 'governance' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('governance')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {t.ecosystemPage.filters.governance}
                        </motion.button>
                        <motion.button
                            className={`filter-btn ${activeFilter === 'dapps' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('dapps')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {t.ecosystemPage.filters.dapps}
                        </motion.button>
                    </div>
                </div>

                {/* Right - Node Info Panel */}
                <motion.div
                    className="node-info-panel"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ ease: EASE_CURVE }}
                    key={activeNode}
                >
                    <div className="panel-header">
                        <span className="panel-badge">{t.ecosystemPage.contractDetails}</span>
                    </div>

                    <h3 className="panel-title">{activeNodeData?.name || 'TaiToken'}</h3>
                    <p className="panel-description">{activeDescription}</p>

                    <div className="panel-address">
                        <span className="address-label">{t.ecosystemPage.address}:</span>
                        <a
                            href={`https://tonviewer.com/${activeNodeData?.address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="address-value"
                        >
                            {activeNodeData?.address.slice(0, 8)}...{activeNodeData?.address.slice(-6)} ↗
                        </a>
                    </div>

                    <div className="panel-stats">
                        <div className="panel-stat">
                            <span className="stat-label">{t.ecosystemPage.type}</span>
                            <span className="stat-value">{activeNodeData?.type.toUpperCase()}</span>
                        </div>
                        <div className="panel-stat">
                            <span className="stat-label">{t.ecosystemPage.connections}</span>
                            <span className="stat-value">{activeNodeData?.connections.length || 0}</span>
                        </div>
                    </div>

                    <Link to="/whitepaper" className="btn-manifest">
                        {t.ecosystem.viewWhitepaper}
                    </Link>
                </motion.div>
            </div>

            {/* Staking Section */}
            <div id="staking-section" className="ecosystem-feature-section">
                <motion.div
                    className="feature-content"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ease: EASE_CURVE }}
                >
                    <h3 className="feature-title">
                        <span className="feature-icon">◆</span>
                        {t.ecosystemPage.staking.title}
                    </h3>
                    <div className="staking-cards">
                        <div className="staking-card">
                            <div className="card-header">
                                <span className="card-badge">{t.ecosystemPage.staking.flexible}</span>
                            </div>
                            <div className="card-value">6%</div>
                            <div className="card-label">{t.ecosystemPage.staking.perRound}</div>
                            <ul className="card-features">
                                <li>{t.ecosystemPage.staking.noLockup}</li>
                                <li>{t.ecosystemPage.staking.withdrawAnytime}</li>
                                <li>{t.ecosystemPage.staking.flexibleLimit}</li>
                            </ul>
                        </div>
                        <div className="staking-card featured">
                            <div className="card-header">
                                <span className="card-badge">{t.ecosystemPage.staking.fixed}</span>
                            </div>
                            <div className="card-value">200%</div>
                            <div className="card-label">{t.ecosystemPage.staking.totalYield}</div>
                            <ul className="card-features">
                                <li>{t.ecosystemPage.staking.principalUnlock}</li>
                                <li>{t.ecosystemPage.staking.rewardsUnlock}</li>
                                <li>{t.ecosystemPage.staking.fixedLimit}</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Governance Section */}
            <div id="governance-section" className="ecosystem-feature-section">
                <motion.div
                    className="feature-content"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ease: EASE_CURVE }}
                >
                    <h3 className="feature-title">
                        <span className="feature-icon">◆</span>
                        {t.ecosystemPage.governance.title}
                    </h3>
                    <div className="governance-info">
                        <div className="governance-card">
                            <h4>{t.ecosystemPage.governance.pomTitle}</h4>
                            <p>{t.ecosystemPage.governance.pomDesc}</p>
                            <div className="governance-rules">
                                <div className="rule">
                                    <span className="rule-icon">$1.0</span>
                                    <span className="rule-text">{t.ecosystemPage.governance.withdrawThreshold}</span>
                                </div>
                                <div className="rule">
                                    <span className="rule-icon">72h</span>
                                    <span className="rule-text">{t.ecosystemPage.governance.consensusPeriod}</span>
                                </div>
                                <div className="rule">
                                    <span className="rule-icon">18</span>
                                    <span className="rule-text">{t.ecosystemPage.governance.unlockRounds}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Apps Showcase Section */}
            <div id="apps-section" className="ecosystem-feature-section">
                <motion.div
                    className="feature-content"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ease: EASE_CURVE }}
                >
                    <h3 className="feature-title">
                        <span className="feature-icon">◆</span>
                        {t.ecosystemPage.apps.title}
                    </h3>
                    <div className="apps-showcase">
                        <a
                            href="https://app.tai.lat"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="app-card"
                        >
                            <div className="app-logo">
                                <img src="/faleme-logo.jpg" alt="发了么" />
                            </div>
                            <div className="app-info">
                                <h4 className="app-name">{t.ecosystemPage.apps.falemeTitle}</h4>
                                <p className="app-description">{t.ecosystemPage.apps.falemeDesc}</p>
                                <div className="app-tags">
                                    <span className="app-tag">{t.ecosystemPage.apps.tagWealth}</span>
                                    <span className="app-tag">{t.ecosystemPage.apps.tagGamified}</span>
                                    <span className="app-tag">DeFi</span>
                                </div>
                            </div>
                            <span className="app-arrow">→</span>
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Footer */}
            <div className="ecosystem-footer">
                <span>{t.ecosystemPage.footer.mainnet}</span>
                <span>V 1.0_STABLE</span>
            </div>
        </section>
    );
};

export default EcosystemSection;
