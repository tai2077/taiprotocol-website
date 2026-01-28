import { motion } from 'framer-motion';
import EcosystemSection from '../sections/EcosystemSection';
import FAQSection from '../sections/FAQSection';

const EcosystemPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="page-container"
        >
            <div style={{ paddingTop: '80px' }}>
                <EcosystemSection />
                <FAQSection />
            </div>
        </motion.div>
    );
};

export default EcosystemPage;
