import { motion } from 'framer-motion';
import { useTranslation } from '../i18n';
import { ClockIcon, DollarIcon, SwordsIcon, TrendingUpIcon, TimerIcon, UnlockIcon, CircuitBreakerIcon } from '../components/Icons';
import './WhitepaperPage.css';

// Real unlock rounds data from contracts
const unlockRounds = [
    { round: 0, price: 0.00008, phase: 'genesis', growth: '-' },
    { round: 1, price: 0.00016, phase: 'growth', growth: '2.0×' },
    { round: 2, price: 0.00032, phase: 'growth', growth: '2.0×' },
    { round: 3, price: 0.00064, phase: 'growth', growth: '2.0×' },
    { round: 4, price: 0.00128, phase: 'growth', growth: '2.0×' },
    { round: 5, price: 0.00256, phase: 'growth', growth: '2.0×' },
    { round: 6, price: 0.00512, phase: 'growth', growth: '2.0×' },
    { round: 7, price: 0.009216, phase: 'expansion', growth: '1.8×' },
    { round: 8, price: 0.016589, phase: 'expansion', growth: '1.8×' },
    { round: 9, price: 0.029860, phase: 'expansion', growth: '1.8×' },
    { round: 10, price: 0.053748, phase: 'expansion', growth: '1.8×' },
    { round: 11, price: 0.096746, phase: 'expansion', growth: '1.8×' },
    { round: 12, price: 0.174143, phase: 'expansion', growth: '1.8×' },
    { round: 13, price: 0.261214, phase: 'maturity', growth: '1.5×' },
    { round: 14, price: 0.391821, phase: 'maturity', growth: '1.5×' },
    { round: 15, price: 0.587731, phase: 'maturity', growth: '1.5×' },
    { round: 16, price: 0.881597, phase: 'maturity', growth: '1.5×' },
    { round: 17, price: 1.322395, phase: 'maturity', growth: '1.5×' },
    { round: 18, price: 1.983593, phase: 'maturity', growth: '1.5×' },
];

// Real contract addresses from mainnet
const contractAddresses = {
    mainnet: [
        { name: 'TaiToken', address: 'EQDrjcL2uTkVEj2tmH9wbf83ZrO5wFbgIOApyIVr223RcgpL' },
        { name: 'SimpleOracle', address: 'EQAolJtP02gG6KMr9f_JbTR8CC1yK9BGTjEv1HqGIdhvnpQT' },
        { name: 'VestingContract', address: 'EQC_rE2HuzK3OvHd5qhxZdm0xzVCa0kOR64ggf50dioQCRpw' },
        { name: 'FundPool', address: 'EQAod212MMyb64KE5FIlG6Idkfx56OlkWpEJMSRv0t2Qfirm' },
        { name: 'StakingPool', address: 'EQBG-U5Aiz_IoGt8Wlgzqn_ELeL6zoyUlhiONviLQX2oQLyu' },
        { name: 'FixedStaking', address: 'EQDAIPbwnvMcWsbrXcRVOT1EYFhkIoIcFXIfy2C07wXyIf9m' },
        { name: 'CommunityDevelopment', address: 'EQCeUAIpYVaA_4Dl1wVmCBm6xTVZxxnOBHZnSap2ZFB6xEHQ' },
        { name: 'TeamVault', address: 'EQCU9_m0V1Z8Pn96EFEbdli6WEcY99yRipUO3C-Fg97TYYX9' },
        { name: 'SaleContract', address: 'EQBzd6g1X2N712Kv9-guQb1sO4VsN9qG2tGtHimePHpTmkIu' },
        { name: 'MarketingVault', address: 'EQCCqb7hWjt7MyFMP6hb0AmryMUyhCqd5WVa_2KJAjxA-n9f' },
    ],
};

const WhitepaperPage = () => {
    const { language } = useTranslation();

    const getPhaseLabel = (phase: string) => {
        const phases: Record<string, string> = language === 'zh'
            ? { genesis: '创世', growth: '增长期', expansion: '扩张期', maturity: '成熟期' }
            : { genesis: 'Genesis', growth: 'Growth', expansion: 'Expansion', maturity: 'Maturity' };
        return phases[phase] || phase;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="whitepaper-page"
        >
            <div className="whitepaper-container">
                {/* Header */}
                <header className="whitepaper-header">
                    <div className="whitepaper-badge">PROOF OF MARKET</div>
                    <h1 className="whitepaper-title">
                        {language === 'zh' ? 'TAI Protocol 白皮书' : 'TAI Protocol Whitepaper'}
                    </h1>
                    <p className="whitepaper-subtitle">
                        {language === 'zh'
                            ? '市场证明（PoM）的黎明 — 以结果为锚的价值协议'
                            : 'The Dawn of Proof of Market — A Value Protocol Anchored by Results'}
                    </p>
                    <div className="whitepaper-quote">
                        "{language === 'zh' ? '代码比人性更安全' : 'Code is Safer Than Human Nature'}"
                    </div>
                </header>

                {/* Abstract */}
                <section className="whitepaper-section">
                    <h2 className="section-title">
                        <span className="section-number">01</span>
                        {language === 'zh' ? '摘要' : 'Abstract'}
                    </h2>
                    <div className="section-content">
                        <p>
                            {language === 'zh'
                                ? 'TAI Protocol 引入市场证明（Proof of Market, PoM）标准：市场价格共识是代币解锁的唯一钥匙。没有业绩的流动性是伪财富。'
                                : 'TAI Protocol introduces the Proof of Market (PoM) standard: market price consensus is the only key to unlock tokens. Liquidity without performance is false wealth.'}
                        </p>
                        <div className="highlight-box">
                            <strong>NO PERFORMANCE, NO LIQUIDITY.</strong>
                        </div>
                    </div>
                </section>

                {/* Pain Points */}
                <section className="whitepaper-section">
                    <h2 className="section-title">
                        <span className="section-number">02</span>
                        {language === 'zh' ? '行业痛点：时间解锁的三宗罪' : 'Industry Pain Points: Three Sins of Time-Based Unlock'}
                    </h2>
                    <div className="section-content">
                        <div className="pain-points-grid">
                            <div className="pain-point-card">
                                <div className="pain-icon"><ClockIcon size={24} /></div>
                                <h4>{language === 'zh' ? '时间是唯一变量' : 'Time is the Only Variable'}</h4>
                                <p>{language === 'zh'
                                    ? '6个月悬崖期 + 24-48个月线性解锁，零业绩照样解锁'
                                    : '6-month cliff + 24-48 month linear unlock, zero performance still unlocks'}</p>
                            </div>
                            <div className="pain-point-card">
                                <div className="pain-icon"><DollarIcon size={24} /></div>
                                <h4>{language === 'zh' ? 'VC 套利周期' : 'VC Arbitrage Cycle'}</h4>
                                <p>{language === 'zh'
                                    ? '种子轮 $0.001 → TGE $0.10 → 解锁抛售 → 散户接盘'
                                    : 'Seed $0.001 → TGE $0.10 → Unlock Dump → Retail Bags'}</p>
                            </div>
                            <div className="pain-point-card">
                                <div className="pain-icon"><SwordsIcon size={24} /></div>
                                <h4>{language === 'zh' ? '利益错位' : 'Misaligned Interests'}</h4>
                                <p>{language === 'zh'
                                    ? '团队急于解锁套现 vs 持有者期望价格上涨，零和博弈'
                                    : 'Team eager to cash out vs Holders expecting price rise, zero-sum game'}</p>
                            </div>
                        </div>
                        <div className="stat-box">
                            <span className="stat-number">92%</span>
                            <span className="stat-label">
                                {language === 'zh'
                                    ? '的项目使用纯时间解锁'
                                    : 'of projects use pure time-based unlock'}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Solution: PoM */}
                <section className="whitepaper-section">
                    <h2 className="section-title">
                        <span className="section-number">03</span>
                        {language === 'zh' ? '解决方案：市场证明（PoM）' : 'Solution: Proof of Market (PoM)'}
                    </h2>
                    <div className="section-content">
                        <div className="pom-flow">
                            <div className="flow-step">
                                <div className="step-icon"><TrendingUpIcon size={24} /></div>
                                <div className="step-content">
                                    <h4>{language === 'zh' ? '价格达到目标' : 'Price Reaches Target'}</h4>
                                    <p>{language === 'zh' ? '计时器启动' : 'Timer starts'}</p>
                                </div>
                            </div>
                            <div className="flow-arrow">→</div>
                            <div className="flow-step">
                                <div className="step-icon"><TimerIcon size={24} /></div>
                                <div className="step-content">
                                    <h4>{language === 'zh' ? '72小时共识期' : '72-Hour Consensus Period'}</h4>
                                    <p>{language === 'zh' ? '价格维持在目标之上' : 'Price maintains above target'}</p>
                                </div>
                            </div>
                            <div className="flow-arrow">→</div>
                            <div className="flow-step">
                                <div className="step-icon"><UnlockIcon size={24} /></div>
                                <div className="step-content">
                                    <h4>{language === 'zh' ? '解锁执行' : 'Unlock Executes'}</h4>
                                    <p>{language === 'zh' ? '合约自动分发 50亿 TAI' : 'Contract auto-distributes 5B TAI'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="circuit-breaker">
                            <div className="breaker-icon"><CircuitBreakerIcon size={24} /></div>
                            <div className="breaker-content">
                                <h4>{language === 'zh' ? '熔断机制' : 'Circuit Breaker'}</h4>
                                <p>{language === 'zh'
                                    ? '价格跌破目标，计时器归零。价格不达标，一枚代币都流不出。'
                                    : 'Price drops below target, timer resets to zero. No performance, not a single token flows out.'}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 18-Round Schedule */}
                <section className="whitepaper-section">
                    <h2 className="section-title">
                        <span className="section-number">04</span>
                        {language === 'zh' ? '18轮递减增长率模型' : '18-Round Decreasing Growth Model'}
                    </h2>
                    <div className="section-content">
                        <div className="rounds-summary">
                            <div className="summary-item growth-phase">
                                <span className="phase-label">{language === 'zh' ? '增长期' : 'Growth'}</span>
                                <span className="phase-rounds">1-6</span>
                                <span className="phase-mult">×2.0</span>
                            </div>
                            <div className="summary-item expansion-phase">
                                <span className="phase-label">{language === 'zh' ? '扩张期' : 'Expansion'}</span>
                                <span className="phase-rounds">7-12</span>
                                <span className="phase-mult">×1.8</span>
                            </div>
                            <div className="summary-item maturity-phase">
                                <span className="phase-label">{language === 'zh' ? '成熟期' : 'Maturity'}</span>
                                <span className="phase-rounds">13-18</span>
                                <span className="phase-mult">×1.5</span>
                            </div>
                        </div>

                        <div className="rounds-table-container">
                            <table className="rounds-table">
                                <thead>
                                    <tr>
                                        <th>{language === 'zh' ? '轮次' : 'Round'}</th>
                                        <th>{language === 'zh' ? '目标价格' : 'Target Price'}</th>
                                        <th>{language === 'zh' ? '阶段' : 'Phase'}</th>
                                        <th>{language === 'zh' ? '增长' : 'Growth'}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {unlockRounds.map((round) => (
                                        <tr key={round.round} className={`phase-${round.phase}`}>
                                            <td className="round-num">{round.round}</td>
                                            <td className="round-price">${round.price.toFixed(6)}</td>
                                            <td className="round-phase">{getPhaseLabel(round.phase)}</td>
                                            <td className="round-growth">{round.growth}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="growth-highlight">
                            <span className="from-price">$0.00008</span>
                            <span className="arrow">→</span>
                            <span className="to-price">$1.98</span>
                            <span className="multiplier">= 24,750×</span>
                        </div>
                    </div>
                </section>

                {/* Tokenomics */}
                <section className="whitepaper-section">
                    <h2 className="section-title">
                        <span className="section-number">05</span>
                        {language === 'zh' ? '代币经济学' : 'Tokenomics'}
                    </h2>
                    <div className="section-content">
                        <div className="token-info-grid">
                            <div className="token-info-item">
                                <span className="info-label">{language === 'zh' ? '代币名称' : 'Token Name'}</span>
                                <span className="info-value">TAI</span>
                            </div>
                            <div className="token-info-item">
                                <span className="info-label">{language === 'zh' ? '代币标准' : 'Token Standard'}</span>
                                <span className="info-value">TON Jetton (TEP-74)</span>
                            </div>
                            <div className="token-info-item">
                                <span className="info-label">{language === 'zh' ? '总供应量' : 'Total Supply'}</span>
                                <span className="info-value">100,000,000,000 (100B)</span>
                            </div>
                            <div className="token-info-item">
                                <span className="info-label">{language === 'zh' ? '增发' : 'Minting'}</span>
                                <span className="info-value">{language === 'zh' ? '不可增发' : 'Non-mintable'}</span>
                            </div>
                        </div>

                        <h3 className="subsection-title">
                            {language === 'zh' ? '分配结构' : 'Distribution Structure'}
                        </h3>
                        <div className="distribution-grid">
                            <div className="dist-item">
                                <span className="dist-percent">90%</span>
                                <span className="dist-label">VestingContract</span>
                                <span className="dist-desc">{language === 'zh' ? '18轮价格解锁' : '18-round price unlock'}</span>
                            </div>
                            <div className="dist-item">
                                <span className="dist-percent">8%</span>
                                <span className="dist-label">{language === 'zh' ? '公开销售' : 'Public Sale'}</span>
                                <span className="dist-desc">SaleContract</span>
                            </div>
                            <div className="dist-item">
                                <span className="dist-percent">1.5%</span>
                                <span className="dist-label">{language === 'zh' ? '市场营销' : 'Marketing'}</span>
                                <span className="dist-desc">MarketingVault</span>
                            </div>
                            <div className="dist-item">
                                <span className="dist-percent">0.5%</span>
                                <span className="dist-label">{language === 'zh' ? '测试与储备' : 'Testing & Reserve'}</span>
                                <span className="dist-desc">{language === 'zh' ? '技术测试' : 'Technical testing'}</span>
                            </div>
                        </div>

                        <h3 className="subsection-title">
                            {language === 'zh' ? '每轮解锁分配（50亿 TAI/轮）' : 'Per-Round Unlock Distribution (5B TAI/round)'}
                        </h3>
                        <div className="unlock-distribution">
                            <div className="unlock-item team">
                                <span className="unlock-amount">20B</span>
                                <span className="unlock-label">TeamVault (40%)</span>
                            </div>
                            <div className="unlock-item community">
                                <span className="unlock-amount">14B</span>
                                <span className="unlock-label">Community (28%)</span>
                            </div>
                            <div className="unlock-item fixed">
                                <span className="unlock-amount">10B</span>
                                <span className="unlock-label">FixedStaking (20%)</span>
                            </div>
                            <div className="unlock-item staking">
                                <span className="unlock-amount">6B</span>
                                <span className="unlock-label">StakingPool (12%)</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contract Addresses */}
                <section className="whitepaper-section">
                    <h2 className="section-title">
                        <span className="section-number">06</span>
                        {language === 'zh' ? '主网合约地址' : 'Mainnet Contract Addresses'}
                    </h2>
                    <div className="section-content">
                        <div className="contracts-list">
                            {contractAddresses.mainnet.map((contract) => (
                                <div key={contract.name} className="contract-item">
                                    <span className="contract-name">{contract.name}</span>
                                    <a
                                        href={`https://tonviewer.com/${contract.address}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="contract-address"
                                    >
                                        {contract.address}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Vision */}
                <section className="whitepaper-section vision-section">
                    <h2 className="section-title">
                        <span className="section-number">07</span>
                        {language === 'zh' ? '愿景' : 'Vision'}
                    </h2>
                    <div className="section-content">
                        <div className="vision-quote">
                            <p>
                                {language === 'zh'
                                    ? '比特币证明了"去中心化货币"。以太坊证明了"不可篡改的代码"。'
                                    : 'Bitcoin proved "decentralized currency". Ethereum proved "immutable code".'}
                            </p>
                            <p className="vision-highlight">
                                {language === 'zh'
                                    ? 'TAI 将证明："按结果分配财富"是 Web3 的终极正义。'
                                    : 'TAI will prove: "distributing wealth by results" is the ultimate justice of Web3.'}
                            </p>
                        </div>
                        <div className="final-quote">
                            <span className="quote-text">CODE IS THE ONLY TEAM.</span>
                        </div>
                    </div>
                </section>
            </div>
        </motion.div>
    );
};

export default WhitepaperPage;
