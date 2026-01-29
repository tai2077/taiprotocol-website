import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n';
import './EcosystemSection.css';

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
                    >
                        <h2 className="ecosystem-title">
                            {language === 'zh' ? 'TAI 生态系统' : 'TAI ECOSYSTEM'}<br />
                            <span className="title-accent">{language === 'zh' ? '合约架构' : 'CONTRACT ARCHITECTURE'}</span>
                        </h2>
                        <p className="ecosystem-subtitle">
                            {language === 'zh' ? '10个智能合约 · TON主网部署 · 完全去中心化' : '10 Smart Contracts · TON Mainnet · Fully Decentralized'}
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
                        <button
                            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('all')}
                        >
                            {language === 'zh' ? '全部' : 'ALL'}
                        </button>
                        <button
                            className={`filter-btn ${activeFilter === 'infrastructure' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('infrastructure')}
                        >
                            {language === 'zh' ? '基础设施' : 'INFRA'}
                        </button>
                        <button
                            className={`filter-btn ${activeFilter === 'staking' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('staking')}
                        >
                            {language === 'zh' ? '质押' : 'STAKING'}
                        </button>
                        <button
                            className={`filter-btn ${activeFilter === 'governance' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('governance')}
                        >
                            {language === 'zh' ? '治理' : 'GOVERNANCE'}
                        </button>
                        <button
                            className={`filter-btn ${activeFilter === 'dapps' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('dapps')}
                        >
                            {language === 'zh' ? '应用' : 'DAPPS'}
                        </button>
                    </div>
                </div>

                {/* Right - Node Info Panel */}
                <motion.div
                    className="node-info-panel"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    key={activeNode}
                >
                    <div className="panel-header">
                        <span className="panel-badge">{language === 'zh' ? '合约详情' : 'CONTRACT DETAILS'}</span>
                    </div>

                    <h3 className="panel-title">{activeNodeData?.name || 'TaiToken'}</h3>
                    <p className="panel-description">{activeDescription}</p>

                    <div className="panel-address">
                        <span className="address-label">{language === 'zh' ? '合约地址' : 'Address'}:</span>
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
                            <span className="stat-label">{language === 'zh' ? '类型' : 'Type'}</span>
                            <span className="stat-value">{activeNodeData?.type.toUpperCase()}</span>
                        </div>
                        <div className="panel-stat">
                            <span className="stat-label">{language === 'zh' ? '连接数' : 'Connections'}</span>
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
                >
                    <h3 className="feature-title">
                        <span className="feature-icon">◆</span>
                        {language === 'zh' ? '质押机制' : 'STAKING MECHANISM'}
                    </h3>
                    <div className="staking-cards">
                        <div className="staking-card">
                            <div className="card-header">
                                <span className="card-badge">{language === 'zh' ? '灵活质押' : 'FLEXIBLE'}</span>
                            </div>
                            <div className="card-value">6%</div>
                            <div className="card-label">{language === 'zh' ? '每轮收益' : 'Per Round'}</div>
                            <ul className="card-features">
                                <li>{language === 'zh' ? '无锁定期' : 'No lock-up period'}</li>
                                <li>{language === 'zh' ? '随时提取' : 'Withdraw anytime'}</li>
                                <li>{language === 'zh' ? '每轮限额 1000亿 TAI' : '100B TAI limit per round'}</li>
                            </ul>
                        </div>
                        <div className="staking-card featured">
                            <div className="card-header">
                                <span className="card-badge">{language === 'zh' ? '固定质押' : 'FIXED'}</span>
                            </div>
                            <div className="card-value">200%</div>
                            <div className="card-label">{language === 'zh' ? '总收益' : 'Total Yield'}</div>
                            <ul className="card-features">
                                <li>{language === 'zh' ? '本金第12轮解锁' : 'Principal unlocks at Round 12'}</li>
                                <li>{language === 'zh' ? '收益第18轮解锁' : 'Rewards unlock at Round 18'}</li>
                                <li>{language === 'zh' ? '总限额 900亿 TAI' : '90B TAI total limit'}</li>
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
                >
                    <h3 className="feature-title">
                        <span className="feature-icon">◆</span>
                        {language === 'zh' ? '治理机制' : 'GOVERNANCE'}
                    </h3>
                    <div className="governance-info">
                        <div className="governance-card">
                            <h4>{language === 'zh' ? '市场证明 (PoM)' : 'Proof of Market (PoM)'}</h4>
                            <p>
                                {language === 'zh'
                                    ? 'TAI Protocol 的治理由市场价格共识驱动。代码即法律，价格是唯一的钥匙。'
                                    : 'TAI Protocol governance is driven by market price consensus. Code is law, price is the only key.'}
                            </p>
                            <div className="governance-rules">
                                <div className="rule">
                                    <span className="rule-icon">$1.0</span>
                                    <span className="rule-text">
                                        {language === 'zh' ? '团队/基金池提取门槛' : 'Team/Fund withdrawal threshold'}
                                    </span>
                                </div>
                                <div className="rule">
                                    <span className="rule-icon">72h</span>
                                    <span className="rule-text">
                                        {language === 'zh' ? '价格共识期' : 'Price consensus period'}
                                    </span>
                                </div>
                                <div className="rule">
                                    <span className="rule-icon">18</span>
                                    <span className="rule-text">
                                        {language === 'zh' ? '解锁轮次' : 'Unlock rounds'}
                                    </span>
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
                >
                    <h3 className="feature-title">
                        <span className="feature-icon">◆</span>
                        {language === 'zh' ? '生态应用' : 'ECOSYSTEM APPS'}
                    </h3>
                    <div className="apps-showcase">
                        <a
                            href="https://app.tai.lat"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="app-card"
                        >
                            <div className="app-logo">
                                <img src="/faleme-logo.svg" alt="发了么" />
                            </div>
                            <div className="app-info">
                                <h4 className="app-name">
                                    {language === 'zh' ? '发了么 (TAI Wealth Node)' : 'TAI Wealth Node'}
                                </h4>
                                <p className="app-description">
                                    {language === 'zh'
                                        ? '游戏化的加密货币财富管理平台。设定目标、追踪进度、赢取奖励。'
                                        : 'Gamified crypto wealth management platform. Set goals, track progress, earn rewards.'}
                                </p>
                                <div className="app-tags">
                                    <span className="app-tag">{language === 'zh' ? '财富管理' : 'Wealth'}</span>
                                    <span className="app-tag">{language === 'zh' ? '游戏化' : 'Gamified'}</span>
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
                <span>{language === 'zh' ? 'TON 主网' : 'TON MAINNET'}</span>
                <span>V 1.0_STABLE</span>
            </div>
        </section>
    );
};

export default EcosystemSection;
