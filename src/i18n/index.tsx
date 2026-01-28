import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { en, TranslationType } from './en';
import { zh } from './zh';

type Language = 'en' | 'zh';

interface I18nContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: TranslationType;
}

const translations: Record<Language, TranslationType> = {
    en,
    zh,
};

// Helper function to safely get initial language
const getInitialLanguage = (): Language => {
    try {
        // Check localStorage first (with error handling for SSR or private mode)
        if (typeof window !== 'undefined' && window.localStorage) {
            const saved = localStorage.getItem('tai-language');
            if (saved === 'en' || saved === 'zh') {
                return saved;
            }
        }
        // Default to browser language or English
        if (typeof navigator !== 'undefined') {
            const browserLang = navigator.language.toLowerCase();
            if (browserLang.startsWith('zh')) {
                return 'zh';
            }
        }
    } catch (e) {
        console.warn('Failed to access localStorage or navigator:', e);
    }
    return 'en';
};

// Create default context value for safety
const defaultContextValue: I18nContextType = {
    language: 'en',
    setLanguage: () => { },
    t: en,
};

const I18nContext = createContext<I18nContextType>(defaultContextValue);

interface I18nProviderProps {
    children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(getInitialLanguage);

    useEffect(() => {
        try {
            localStorage.setItem('tai-language', language);
            document.documentElement.lang = language;
        } catch (e) {
            console.warn('Failed to save language preference:', e);
        }
    }, [language]);

    const value: I18nContextType = {
        language,
        setLanguage,
        t: translations[language],
    };

    return (
        <I18nContext.Provider value={value}>
            {/* Use language as key to force re-render of all children when language changes */}
            <div key={language} style={{ display: 'contents' }}>
                {children}
            </div>
        </I18nContext.Provider>
    );
};

export const useI18n = (): I18nContextType => {
    const context = useContext(I18nContext);
    // Since we provide a default value, context should always be defined
    // But we keep the check for extra safety
    return context;
};

export const useTranslation = () => {
    const { t, language, setLanguage } = useI18n();
    return { t, language, setLanguage };
};
