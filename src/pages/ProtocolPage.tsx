import { motion } from 'framer-motion';
import { useTranslation } from '../i18n';
import ComparisonSection from '../sections/ComparisonSection';
import MarqueeStrip from '../components/MarqueeStrip';

const ProtocolPage = () => {
    const { t } = useTranslation();

    const marqueeItems = t.marquee.protocol;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="page-container"
        >
            <div style={{ paddingTop: '80px' }}>
                {/* Top Marquee - CODE IS LAW */}
                <MarqueeStrip
                    items={marqueeItems}
                    variant="green"
                    speed={20}
                    direction="left"
                />

                {/* Main Content */}
                <ComparisonSection />

                {/* Bottom Marquee */}
                <MarqueeStrip
                    items={t.marquee.bottom}
                    variant="pink"
                    speed={25}
                    direction="right"
                />
            </div>
        </motion.div>
    );
};

export default ProtocolPage;
