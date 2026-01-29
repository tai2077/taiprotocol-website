import { useState, useEffect, Suspense, lazy, CSSProperties, memo } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './styles/globals.css';
import { I18nProvider } from './i18n';
import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';
import ErrorBoundary from './components/ErrorBoundary';
import FooterSection from './sections/FooterSection';
import SmoothScroll from './components/SmoothScroll';

// Constants
const INITIAL_LOADING_DELAY_MS = 2200;

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const ProtocolPage = lazy(() => import('./pages/ProtocolPage'));
const EcosystemPage = lazy(() => import('./pages/EcosystemPage'));
const WhitepaperPage = lazy(() => import('./pages/WhitepaperPage'));

// Memoized styles to prevent recreation
const pageLoaderStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    color: 'rgba(173, 255, 47, 0.5)',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px'
};

// Simple loading fallback - memoized
const PageLoader = memo(() => (
    <div style={pageLoaderStyles}>
        LOADING...
    </div>
));
PageLoader.displayName = 'PageLoader';

// Animated Routes wrapper with Suspense
const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Suspense fallback={<PageLoader />}>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={
                        <ErrorBoundary>
                            <HomePage />
                        </ErrorBoundary>
                    } />
                    <Route path="/protocol" element={
                        <ErrorBoundary>
                            <ProtocolPage />
                        </ErrorBoundary>
                    } />
                    <Route path="/ecosystem" element={
                        <ErrorBoundary>
                            <EcosystemPage />
                        </ErrorBoundary>
                    } />
                    <Route path="/whitepaper" element={
                        <ErrorBoundary>
                            <WhitepaperPage />
                        </ErrorBoundary>
                    } />
                </Routes>
            </Suspense>
        </AnimatePresence>
    );
};

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), INITIAL_LOADING_DELAY_MS);
        return () => clearTimeout(timer);
    }, []);

    return (
        <I18nProvider>
            <SmoothScroll />
            <Router>
                <div className="app noise-bg scanline-overlay">
                    {isLoading && <LoadingScreen />}

                    <Header />

                    <main>
                        <AnimatedRoutes />
                    </main>

                    <ErrorBoundary>
                        <FooterSection />
                    </ErrorBoundary>
                </div>
            </Router>
        </I18nProvider>
    );
}

export default App;
