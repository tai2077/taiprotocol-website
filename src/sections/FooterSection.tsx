import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n';
import { TwitterIcon, TelegramIcon, MediumIcon, GithubIcon } from '../components/Icons';
import './FooterSection.css';

// Real social links - moved outside component as constants
const SOCIAL_LINKS = {
    twitter: 'https://x.com/TAIProtocol',
    telegram: 'https://t.me/taitoken',
    medium: 'https://medium.com/@taiprotocol',
    github: 'https://github.com/taiprotocol',
} as const;

const FooterSection = () => {
    const currentYear = new Date().getFullYear();
    const { t, language } = useTranslation();

    // Memoize footer links to prevent recreation on every render
    const footerLinks = useMemo(() => ({
        protocol: [
            { label: 'Github', href: SOCIAL_LINKS.github },
            { label: language === 'zh' ? '白皮书' : 'Whitepaper', href: '/whitepaper', internal: true },
            { label: language === 'zh' ? '合约地址' : 'Contract_Addr', href: 'https://tonviewer.com/EQDrjcL2uTkVEj2tmH9wbf83ZrO5wFbgIOApyIVr223RcgpL' },
        ],
        ecosystem: [
            { label: 'X (Twitter)', href: SOCIAL_LINKS.twitter, icon: <TwitterIcon size={14} /> },
            { label: 'Telegram', href: SOCIAL_LINKS.telegram, icon: <TelegramIcon size={14} /> },
            { label: 'Medium', href: SOCIAL_LINKS.medium, icon: <MediumIcon size={14} /> },
        ],
        resources: [
            { label: language === 'zh' ? '白皮书' : 'Whitepaper', href: '/whitepaper', internal: true },
        ],
    }), [language]);

    // Memoize social icons
    const socialIcons = useMemo(() => [
        { name: 'X', icon: <TwitterIcon size={18} />, href: SOCIAL_LINKS.twitter },
        { name: 'Telegram', icon: <TelegramIcon size={18} />, href: SOCIAL_LINKS.telegram },
        { name: 'Medium', icon: <MediumIcon size={18} />, href: SOCIAL_LINKS.medium },
        { name: 'Github', icon: <GithubIcon size={18} />, href: SOCIAL_LINKS.github },
    ], []);

    return (
        <footer className="footer-section">
            <div className="footer-border-top"></div>

            <div className="footer-container">
                {/* Left - Logo & Description */}
                <div className="footer-brand">
                    <div className="footer-logo">
                        <div className="logo-icon-wrapper">
                            <span className="logo-icon">◆</span>
                        </div>
                        <span className="logo-text">TAI PROTOCOL</span>
                    </div>
                    <p className="footer-tagline">{t.footer.tagline}</p>
                    <p className="footer-description">
                        {t.footer.description}
                    </p>

                    {/* Social Icons */}
                    <div className="social-links">
                        {socialIcons.map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label={social.name}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Middle - Links */}
                <div className="footer-links">
                    <div className="link-group">
                        <span className="group-title">
                            {language === 'zh' ? '代码库' : 'CODEBASE'}
                        </span>
                        {footerLinks.protocol.map((link, i) => (
                            link.internal ? (
                                <Link key={i} to={link.href} className="footer-link">
                                    {link.label}
                                    <span className="link-arrow">→</span>
                                </Link>
                            ) : (
                                <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="footer-link">
                                    {link.label}
                                    <span className="link-arrow">→</span>
                                </a>
                            )
                        ))}
                    </div>
                    <div className="link-group">
                        <span className="group-title">
                            {language === 'zh' ? '社区' : 'COMMUNITY'}
                        </span>
                        {footerLinks.ecosystem.map((link, i) => (
                            <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="footer-link">
                                <span className="link-icon">{link.icon}</span>
                                {link.label}
                                <span className="link-arrow">↗</span>
                            </a>
                        ))}
                    </div>
                    <div className="link-group">
                        <span className="group-title">
                            {language === 'zh' ? '资源' : 'RESOURCES'}
                        </span>
                        {footerLinks.resources.map((link, i) => (
                            link.internal ? (
                                <Link key={i} to={link.href} className="footer-link">
                                    {link.label}
                                    <span className="link-arrow">→</span>
                                </Link>
                            ) : (
                                <a key={i} href={link.href} className="footer-link">
                                    {link.label}
                                    <span className="link-arrow">→</span>
                                </a>
                            )
                        ))}
                    </div>
                </div>

                {/* Right - Status */}
                <div className="footer-status">
                    <div className="status-card">
                        <span className="status-label">{t.footer.verifiedBy}</span>
                        <span className="status-value">CHAOS</span>
                    </div>
                    <div className="network-status">
                        <span className="status-dot"></span>
                        <span className="network-text">{t.footer.systemStatus}</span>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <div className="bottom-container">
                    <span className="copyright">
                        {t.footer.copyright.replace('{year}', String(currentYear))}
                    </span>
                    <div className="bottom-links">
                        <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer">{t.footer.links.changelog}</a>
                    </div>
                    <span className="version">
                        <span className="version-dot"></span>
                        {t.footer.version}
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;
