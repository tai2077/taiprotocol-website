import { motion } from 'framer-motion';
import ProtocolSection from '../sections/ProtocolSection';

const ProtocolPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="page-container"
        >
            <ProtocolSection />
        </motion.div>
    );
};

export default ProtocolPage;
