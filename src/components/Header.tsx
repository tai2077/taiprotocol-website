import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../i18n';
import { GlobeIcon } from './Icons';
import './Header.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(true);
    const { t, language, setLanguage } = useTranslation();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (!mobile) {
                setIsMobileMenuOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const navItems = [
        { label: t.nav.home, path: '/' },
        { label: t.nav.protocol, path: '/protocol' },
        { label: t.nav.terminal, path: '/terminal' },
        { label: t.nav.ecosystem, path: '/ecosystem' },
        { label: t.nav.whitepaper, path: '/whitepaper' },
    ];

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'zh' : 'en');
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            <motion.header
                className={`header ${isScrolled ? 'scrolled' : ''}`}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="header-container">
                    <Link to="/" className="header-logo">
                        <div className="logo-icon-wrapper">
                            <span className="logo-icon">◆</span>
                        </div>
                        <span className="logo-text">TAI_PROTOCOL</span>
                        {!isMobile && <span className="logo-version">V1</span>}
                    </Link>

                    {!isMobile && (
                        <nav className="header-nav">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                                >
                                    <span className="nav-link-text">{item.label}</span>
                                </Link>
                            ))}
                        </nav>
                    )}

                    {!isMobile && (
                        <div className="header-actions">
                            <button
                                className="language-toggle"
                                onClick={toggleLanguage}
                                title={language === 'en' ? '切换到中文' : 'Switch to English'}
                            >
                                <GlobeIcon size={14} className="lang-icon" />
                                <span className="lang-text">{language === 'en' ? '中文' : 'EN'}</span>
                            </button>

                            <div className="status-indicator">
                                <span className="status-dot"></span>
                                <span className="status-text">{t.header.mainnet}</span>
                            </div>
                            <motion.a
                                href="https://app.taiprotocol.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-punk btn-punk-filled"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {t.nav.launchApp}
                            </motion.a>
                        </div>
                    )}

                    {isMobile && (
                        <div className="mobile-header-actions">
                            <button
                                className="language-toggle-mobile"
                                onClick={toggleLanguage}
                            >
                                {language === 'en' ? '中' : 'EN'}
                            </button>

                            <button
                                className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                <span className="hamburger-line"></span>
                                <span className="hamburger-line"></span>
                                <span className="hamburger-line"></span>
                            </button>
                        </div>
                    )}
                </div>
            </motion.header>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            className="mobile-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.div
                            className="mobile-menu"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        >
                            <div className="mobile-menu-header">
                                <span className="mobile-menu-title">{t.header.navigation}</span>
                                <button
                                    className="mobile-close"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    ✕
                                </button>
                            </div>

                            <nav className="mobile-nav">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.path}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            to={item.path}
                                            className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <span className="mobile-nav-index">{String(index + 1).padStart(2, '0')}</span>
                                            <span className="mobile-nav-text">{item.label}</span>
                                            <span className="mobile-nav-arrow">→</span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            <div className="mobile-menu-footer">
                                <motion.a
                                    href="https://app.taiprotocol.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-punk btn-punk-filled mobile-cta"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    {t.nav.launchApp}
                                </motion.a>

                                <div className="mobile-status">
                                    <span className="status-dot"></span>
                                    <span>{t.header.mainnetActive}</span>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
