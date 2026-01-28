import { motion } from 'framer-motion';
import TerminalSection from '../sections/TerminalSection';

const TerminalPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="page-container"
        >
            <div style={{ paddingTop: '80px' }}>
                <TerminalSection />
            </div>
        </motion.div>
    );
};

export default TerminalPage;
