import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '../i18n';
import { AlertIcon } from '../components/Icons';
import './TerminalSection.css';

// Constants
const LOG_INTERVAL_MS = 600;

const TerminalSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [currentCommand, setCurrentCommand] = useState('');
    const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
    const terminalBodyRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();

    // Memoize log messages to prevent recreation on every render
    const logMessages = useMemo(() => [
        t.terminal.rootCompiling + ' ' + t.terminal.ok,
        t.terminal.rootDecrypting + ' ' + t.terminal.done,
        t.terminal.voidBypassing + ' ' + t.terminal.pending,
    ], [t.terminal.rootCompiling, t.terminal.ok, t.terminal.rootDecrypting, t.terminal.done, t.terminal.voidBypassing, t.terminal.pending]);

    // Memoize chain data
    const chainData = useMemo(() => [
        { timestamp: '14:22:01.441', method: 'MINT_TAI', hash: '0x7cc2...a2e4', status: t.terminal.status.confirmed, statusColor: 'green' },
        { timestamp: '14:21:58.338', method: 'STAKE_LP', hash: '0x3ab1...f1a9', status: t.terminal.status.pending, statusColor: 'yellow' },
        { timestamp: '14:21:45.829', method: 'LIQUIDATE', hash: '0x92f6...0a42', status: t.terminal.status.confirmed, statusColor: 'green' },
        { timestamp: '14:21:38.221', method: 'BURN_DEBT', hash: '0x114f...e990', status: t.terminal.status.reverted, statusColor: 'red' },
    ], [t.terminal.status.confirmed, t.terminal.status.pending, t.terminal.status.reverted]);

    useEffect(() => {
        if (!isInView) return;

        let index = 0;
        const interval = setInterval(() => {
            if (index < logMessages.length) {
                const message = logMessages[index];
                if (message) {
                    setTerminalLogs(prev => [...prev, message]);
                }
                index++;
            } else {
                clearInterval(interval);
            }
        }, LOG_INTERVAL_MS);

        return () => clearInterval(interval);
    }, [isInView, logMessages]);

    useEffect(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
    }, [terminalLogs]);

    // Memoize handleCommand to prevent recreation on every render
    const handleCommand = useCallback(() => {
        if (currentCommand.trim()) {
            setTerminalLogs(prev => [...prev, `> ${currentCommand}`, '[SYS] Command executed.']);
            setCurrentCommand('');
        }
    }, [currentCommand]);

    // Memoize key handler
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand();
        }
    }, [handleCommand]);

    return (
        <section id="terminal" className="terminal-section" ref={sectionRef}>
            {/* Background Effects */}
            <div className="terminal-bg">
                <div className="matrix-rain"></div>
            </div>

            <div className="terminal-container">
                {/* Left Stats Panel */}
                <motion.div
                    className="stats-panel"
                    initial={{ opacity: 0, x: -60 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="tai-logo-large">
                        <div className="logo-brackets">
                            <span className="bracket-left">[</span>
                            <span className="logo-text">{t.terminal.title}</span>
                            <span className="bracket-right">]</span>
                        </div>
                        <div className="logo-sub">{t.terminal.subtitle}</div>
                    </div>

                    <div className="stat-cards">
                        <motion.div
                            className="stat-card"
                            whileHover={{ scale: 1.02, y: -2 }}
                        >
                            <span className="stat-label">{t.terminal.tvlLabel}</span>
                            <span className="stat-value">$124.5M</span>
                        </motion.div>
                        <motion.div
                            className="stat-card"
                            whileHover={{ scale: 1.02, y: -2 }}
                        >
                            <span className="stat-label">{t.terminal.priceLabel}</span>
                            <span className="stat-value">$0.00008</span>
                            <span className="stat-delta positive">{t.terminal.currentRound}: 0</span>
                        </motion.div>
                    </div>

                    <div className="yield-card">
                        <div className="yield-glow"></div>
                        <span className="yield-label">{t.terminal.fixedStakingYield}</span>
                        <span className="yield-value">200%</span>
                        <span className="yield-sub">{t.terminal.total18Change}</span>
                    </div>

                    <div className="health-monitor">
                        <div className="monitor-header">
                            <span className="monitor-icon">◆</span>
                            <span>{t.terminal.systemHealthMonitor}</span>
                        </div>
                        <div className="monitor-bar">
                            <div className="bar-label">{t.terminal.liquidityDepth}</div>
                            <div className="bar-track">
                                <motion.div
                                    className="bar-fill"
                                    initial={{ width: 0 }}
                                    animate={isInView ? { width: '98.3%' } : {}}
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                            </div>
                            <span className="bar-value">98.3%</span>
                        </div>
                        <div className="monitor-bar">
                            <div className="bar-label">{t.terminal.collateralRatio}</div>
                            <div className="bar-track">
                                <motion.div
                                    className="bar-fill"
                                    initial={{ width: 0 }}
                                    animate={isInView ? { width: '100%' } : {}}
                                    transition={{ duration: 1, delay: 0.7 }}
                                />
                            </div>
                            <span className="bar-value">112%</span>
                        </div>
                    </div>

                    <div className="warning-alert">
                        <AlertIcon size={16} className="alert-icon" />
                        <span className="alert-text">
                            {t.terminal.oracleAlert}
                        </span>
                    </div>
                </motion.div>

                {/* Right Terminal Panel */}
                <motion.div
                    className="main-terminal"
                    initial={{ opacity: 0, x: 60 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* Terminal Header */}
                    <div className="terminal-header">
                        <div className="terminal-dots">
                            <span className="dot red"></span>
                            <span className="dot yellow"></span>
                            <span className="dot green"></span>
                        </div>
                        <span className="terminal-title">{t.terminal.bashTitle}</span>
                        <div className="terminal-actions">
                            <span className="action-btn">−</span>
                            <span className="action-btn">□</span>
                            <span className="action-btn">×</span>
                        </div>
                    </div>

                    {/* Terminal Content */}
                    <div className="terminal-content" ref={terminalBodyRef}>
                        <div className="terminal-intro">
                            <p>TAI Protocol Terminal [Version 1.0.4]</p>
                            <p>(c) {new Date().getFullYear()} TAI Labs. {t.terminal.copyright}</p>
                            <p className="intro-blank"></p>
                        </div>

                        <div className="terminal-command">
                            <span className="prompt">{t.terminal.commandPrefix}</span>
                            <span className="command">./init_handshake --force</span>
                        </div>
                        <div className="terminal-output">
                            <p>&gt;&gt; {t.terminal.connectingLayer2}</p>
                            <p>&gt;&gt; {t.terminal.authWallet} 0x71...a2e</p>
                            <p className="success">{t.terminal.handshakeComplete}</p>
                        </div>

                        <div className="terminal-command">
                            <span className="prompt">{t.terminal.commandPrefix}</span>
                            <span className="command">{t.terminal.statusCommand}</span>
                        </div>
                        <div className="terminal-output">
                            <p>{t.terminal.vaultsActive} 1,402</p>
                            <p>{t.terminal.totalDebt} 45,000,000 TAI</p>
                            <p>{t.terminal.stabilityFee} 2.5%</p>
                        </div>

                        {/* Live Logs */}
                        <div className="live-logs">
                            {terminalLogs.map((log, index) => (
                                <motion.p
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={log?.includes('OK') || log?.includes('DONE') || log?.includes('完成') ? 'log-success' : log?.includes('PENDING') || log?.includes('RUNNING') || log?.includes('等待') ? 'log-pending' : ''}
                                >
                                    {log}
                                </motion.p>
                            ))}
                        </div>

                        <div className="terminal-command active">
                            <span className="prompt">{t.terminal.commandPrefix}</span>
                            <input
                                type="text"
                                className="command-input"
                                placeholder={t.terminal.enterCommand}
                                value={currentCommand}
                                onChange={(e) => setCurrentCommand(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <div className="input-actions">
                                <button className="btn-help">{t.terminal.help}</button>
                                <button className="btn-execute" onClick={handleCommand}>{t.terminal.execute}</button>
                            </div>
                        </div>
                    </div>

                    {/* Chain Data Stream */}
                    <div className="chain-data">
                        <div className="chain-header">
                            <span className="chain-icon">■</span>
                            <span className="chain-title">{t.terminal.rawChainDataStream}</span>
                            <span className="chain-meta">{t.terminal.syncingBlock}: 43942821</span>
                        </div>
                        <div className="chain-table">
                            <div className="table-header">
                                <span>{t.terminal.headers.timestamp}</span>
                                <span>{t.terminal.headers.method}</span>
                                <span>{t.terminal.headers.hash}</span>
                                <span>{t.terminal.headers.status}</span>
                            </div>
                            {chainData.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="table-row"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                >
                                    <span className="col-timestamp">{item.timestamp}</span>
                                    <span className={`col-method method-${item.method.toLowerCase().replace('_', '-')}`}>{item.method}</span>
                                    <span className="col-hash">{item.hash}</span>
                                    <span className={`col-status status-${item.statusColor}`}>
                                        <span className="status-dot-small"></span>
                                        {item.status}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Stats */}
            <motion.div
                className="terminal-footer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 }}
            >
                <div className="footer-stat">
                    <span className="footer-label">{t.terminal.taiPrice}</span>
                    <span className="footer-value">$0.00008</span>
                    <span className="footer-delta">{t.terminal.genesis}</span>
                </div>
                <div className="footer-divider"></div>
                <div className="footer-stat">
                    <span className="footer-label">{t.terminal.round1Target}</span>
                    <span className="footer-value">$0.00016</span>
                </div>
                <div className="footer-divider"></div>
                <div className="footer-stat">
                    <span className="footer-label">{t.terminal.oracleStatus}</span>
                    <span className="footer-value">{t.terminal.status.active}</span>
                    <span className="footer-status">{t.terminal.status.healthy}</span>
                </div>
                <div className="footer-divider"></div>
                <div className="footer-stat">
                    <span className="footer-label">{t.terminal.currentRound}:</span>
                    <span className="footer-value">0 / 18</span>
                </div>
            </motion.div>
        </section>
    );
};

export default TerminalSection;
