import { motion } from 'framer-motion';
import { useTranslation } from '../i18n';
import HeroSection from '../sections/HeroSection';
import MarqueeStrip from '../components/MarqueeStrip';

const HomePage = () => {
    const { t } = useTranslation();

    const marqueeItems = t.marquee.home;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <HeroSection />
            <MarqueeStrip
                items={marqueeItems}
                variant="green"
                speed={25}
            />
        </motion.div>
    );
};

export default HomePage;
