import './MarqueeStrip.css';

interface MarqueeStripProps {
    items?: string[];
    direction?: 'left' | 'right';
    speed?: number;
    variant?: 'green' | 'pink' | 'mixed';
}

const MarqueeStrip = ({
    items = ['CODE IS LAW', 'NO GODS NO MASTERS', 'PROOF OF MARKET', '0% HUMAN BIAS', 'PERMISSIONLESS'],
    direction = 'left',
    speed = 25,
    variant = 'green'
}: MarqueeStripProps) => {
    // Repeat items more for seamless loop
    const repeatedItems = [...items, ...items, ...items, ...items, ...items, ...items];

    return (
        <div className={`marquee-strip marquee-${variant}`}>
            <div
                className={`marquee-track ${direction === 'right' ? 'marquee-reverse' : ''}`}
                style={{
                    animationDuration: `${speed}s`
                }}
            >
                {repeatedItems.map((item, index) => (
                    <span key={index} className="marquee-item">
                        <span className="marquee-text">{item}</span>
                        <span className="marquee-separator">◆</span>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default MarqueeStrip;
