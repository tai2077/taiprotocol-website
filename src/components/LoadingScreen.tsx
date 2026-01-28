import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

// Constants moved outside component
const LOADING_DURATION_MS = 2000;
const LOADING_PHASES = [
    { text: 'INITIALIZING KERNEL...', prefix: '[K_INIT]' },
    { text: 'BYPASSING CENTRALIZED GATEWAYS...', prefix: '[BYPASS]' },
    { text: 'ESTABLISHING SECURE TUNNEL...', prefix: '[TUNNEL]' },
    { text: 'COMPILING REVOLUTION...', prefix: '[COMPILE]' },
    { text: 'ACCESS GRANTED', prefix: '[SUCCESS]' },
] as const;

// Memoized component for better performance
const LoadingScreen = memo(() => {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Use requestAnimationFrame for smoother performance
        let animationFrame: number;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progressRatio = Math.min(elapsed / LOADING_DURATION_MS, 1);

            // Smooth easing function
            const eased = 1 - Math.pow(1 - progressRatio, 3);
            setProgress(eased * 100);

            // Update phase based on progress
            const newPhase = Math.min(Math.floor(eased * LOADING_PHASES.length), LOADING_PHASES.length - 1);
            setPhase(newPhase);

            if (progressRatio < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setIsComplete(true);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    className="loading-screen"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    {/* Simple gradient background - no complex animations */}
                    <div className="loading-bg">
                        <div className="gradient-glow"></div>
                    </div>

                    <div className="loading-content">
                        {/* Logo - Simple pulse effect via CSS */}
                        <motion.div
                            className="loading-logo"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="logo-brackets">
                                <span className="bracket">[</span>
                                <span className="logo-text pulse-glow">TAI</span>
                                <span className="bracket">]</span>
                            </div>
                            <div className="logo-sub">PROTOCOL</div>
                        </motion.div>

                        {/* Terminal - Simplified */}
                        <div className="loading-terminal">
                            <div className="terminal-header">
                                <div className="terminal-dots">
                                    <span className="dot red"></span>
                                    <span className="dot yellow"></span>
                                    <span className="dot green"></span>
                                </div>
                                <span className="terminal-title">SYSTEM_BOOT.exe</span>
                            </div>
                            <div className="terminal-body">
                                {LOADING_PHASES.slice(0, phase + 1).map((p, index) => (
                                    <div
                                        key={index}
                                        className={`terminal-line ${index === phase ? 'active' : ''} ${p.prefix === '[SUCCESS]' ? 'success' : ''}`}
                                    >
                                        <span className="line-prefix">{p.prefix}</span>
                                        <span className="line-text">{p.text}</span>
                                        {index === phase && phase < LOADING_PHASES.length - 1 && (
                                            <span className="cursor">█</span>
                                        )}
                                        {index < phase && (
                                            <span className="status-ok">OK</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="loading-progress">
                            <div className="progress-header">
                                <span className="progress-label">SYSTEM_LOAD</span>
                                <span className="progress-value">{Math.floor(progress)}%</span>
                            </div>
                            <div className="progress-track">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        {/* Footer Info - Static */}
                        <div className="loading-footer">
                            <div className="footer-item">
                                <span className="item-dot"></span>
                                <span>NODE: SECURE</span>
                            </div>
                            <div className="footer-item">
                                <span className="item-dot"></span>
                                <span>LATENCY: 18ms</span>
                            </div>
                            <div className="footer-item">
                                <span className="item-dot"></span>
                                <span>VER: 1.0.4</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
});

LoadingScreen.displayName = 'LoadingScreen';

export default LoadingScreen;
