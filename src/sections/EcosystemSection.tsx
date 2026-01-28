import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n';
import { SearchIcon } from '../components/Icons';
import './EcosystemSection.css';

interface Node {
    id: string;
    name: string;
    type: 'core' | 'infrastructure' | 'dapps' | 'validators';
    x: number;
    y: number;
    connections: string[];
}

const EcosystemSection = () => {
    const [activeNode, setActiveNode] = useState<string | null>('TAI_CORE_01');
    const { t } = useTranslation();

    const nodes: Node[] = [
        { id: 'TAI_CORE_01', name: 'TAI_CORE_01', type: 'core', x: 50, y: 50, connections: ['ORACLE_01', 'VAULT_01', 'LP_01'] },
        { id: 'ORACLE_01', name: 'ORACLE_NET', type: 'infrastructure', x: 25, y: 30, connections: ['TAI_CORE_01'] },
        { id: 'VAULT_01', name: 'VESTING', type: 'infrastructure', x: 75, y: 25, connections: ['TAI_CORE_01'] },
        { id: 'LP_01', name: 'STAKING_POOL', type: 'dapps', x: 20, y: 70, connections: ['TAI_CORE_01'] },
        { id: 'DEX_01', name: 'FIXED_STAKING', type: 'dapps', x: 80, y: 65, connections: ['TAI_CORE_01'] },
        { id: 'VALIDATOR_01', name: 'COMMUNITY', type: 'validators', x: 60, y: 80, connections: ['TAI_CORE_01'] },
    ];

    const filters = [
        t.ecosystem.filters.all,
        t.ecosystem.filters.infra,
        t.ecosystem.filters.dapps,
        t.ecosystem.filters.validators
    ];
    const [activeFilter, setActiveFilter] = useState(filters[0]);

    const nodeInfo = {
        name: t.ecosystem.nodeTitle,
        description: t.ecosystem.nodeDescription,
        strength: '98.4%',
        connections: '1,240',
    };

    return (
        <section id="ecosystem" className="ecosystem-section">
            {/* Header */}
            <div className="ecosystem-header">
                <div className="header-nav">
                    <a href="#" className="nav-item">{t.ecosystem.categories.ecosystem}</a>
                    <a href="#" className="nav-item">{t.ecosystem.categories.staking}</a>
                    <a href="#" className="nav-item">{t.ecosystem.categories.governance}</a>
                    <a href="#" className="nav-item">{t.ecosystem.categories.docs}</a>
                </div>
                <div className="header-actions">
                    <div className="search-box">
                        <SearchIcon size={14} className="search-icon" />
                        <input type="text" placeholder={t.ecosystem.searchPlaceholder} />
                    </div>
                    <a
                        href="https://app.taiprotocol.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-punk btn-punk-filled"
                    >
                        {t.nav.launchApp}
                    </a>
                </div>
            </div>

            <div className="ecosystem-container">
                {/* Left - Title & Neural Web */}
                <div className="ecosystem-main">
                    <motion.div
                        className="ecosystem-title-block"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="ecosystem-title">
                            {t.ecosystem.title}<br />
                            <span className="title-accent">{t.ecosystem.titleAccent}</span>
                        </h2>
                        <p className="ecosystem-subtitle">{t.ecosystem.statusLabel}</p>
                    </motion.div>

                    {/* Neural Web Visualization */}
                    <div className="neural-web">
                        <svg viewBox="0 0 100 100" className="web-svg">
                            {/* Connection Lines */}
                            {nodes.map(node =>
                                node.connections.map(connId => {
                                    const targetNode = nodes.find(n => n.id === connId);
                                    if (!targetNode) return null;
                                    return (
                                        <line
                                            key={`${node.id}-${connId}`}
                                            x1={node.x}
                                            y1={node.y}
                                            x2={targetNode.x}
                                            y2={targetNode.y}
                                            stroke="rgba(173, 255, 47, 0.3)"
                                            strokeWidth="0.3"
                                            strokeDasharray="2,2"
                                        />
                                    );
                                })
                            )}

                            {/* Nodes */}
                            {nodes.map(node => (
                                <g
                                    key={node.id}
                                    className={`node-group ${activeNode === node.id ? 'active' : ''}`}
                                    onClick={() => setActiveNode(node.id)}
                                >
                                    <circle
                                        cx={node.x}
                                        cy={node.y}
                                        r={node.type === 'core' ? 4 : 2}
                                        fill={node.type === 'core' ? 'var(--color-acid-green)' : 'rgba(173, 255, 47, 0.5)'}
                                        className="node-dot"
                                    />
                                    {activeNode === node.id && (
                                        <>
                                            <rect
                                                x={node.x - 12}
                                                y={node.y + 5}
                                                width="24"
                                                height="6"
                                                fill="none"
                                                stroke="var(--color-acid-green)"
                                                strokeWidth="0.3"
                                            />
                                            <text
                                                x={node.x}
                                                y={node.y + 9.5}
                                                textAnchor="middle"
                                                fill="var(--color-acid-green)"
                                                fontSize="2.5"
                                                fontFamily="var(--font-mono)"
                                            >
                                                {node.name}
                                            </text>
                                        </>
                                    )}
                                </g>
                            ))}
                        </svg>
                    </div>

                    {/* Filters */}
                    <div className="ecosystem-filters">
                        {filters.map(filter => (
                            <button
                                key={filter}
                                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                                onClick={() => setActiveFilter(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="ecosystem-stats">
                        <span className="stat-item">● {t.ecosystem.stats.setLoad}: 64.7 KB/S</span>
                        <span className="stat-item">{t.ecosystem.stats.blockHeight}: 19,462,082</span>
                        <span className="stat-item">{t.ecosystem.stats.activeVectors}: 8,442</span>
                    </div>
                </div>

                {/* Right - Node Info Panel */}
                <motion.div
                    className="node-info-panel"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="panel-header">
                        <span className="panel-badge">{t.ecosystem.activeNode}</span>
                        <button className="panel-close">×</button>
                    </div>

                    <h3 className="panel-title">{nodeInfo.name}</h3>
                    <p className="panel-description">{nodeInfo.description}</p>

                    <div className="panel-stats">
                        <div className="panel-stat">
                            <span className="stat-label">{t.ecosystem.strength}</span>
                            <span className="stat-value">{nodeInfo.strength}</span>
                        </div>
                        <div className="panel-stat">
                            <span className="stat-label">{t.ecosystem.connections}</span>
                            <span className="stat-value">{nodeInfo.connections}</span>
                        </div>
                    </div>

                    <div className="panel-input">
                        <input type="text" placeholder={t.ecosystem.dataStream} />
                        <span className="input-indicator">●</span>
                    </div>

                    <Link to="/whitepaper" className="btn-manifest">
                        {t.ecosystem.viewWhitepaper}
                    </Link>
                </motion.div>
            </div>

            {/* Footer Stats */}
            <div className="ecosystem-footer">
                <span>{t.ecosystem.terms}</span>
                <span>V 1.0_STABLE</span>
            </div>
        </section>
    );
};

export default EcosystemSection;
