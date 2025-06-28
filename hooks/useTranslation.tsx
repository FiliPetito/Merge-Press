import { useState, useEffect, useCallback } from 'react';
import i18n, { changeLanguage as i18nChangeLanguage, setI18nConfig } from '@/utils/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Language = 'en' | 'it';
type TranslateOptions = {
    defaultValue?: string;
    count?: number;
    scope?: string;
    [key: string]: any;
};

// Creiamo un sistema di eventi personalizzato
const listeners = new Set<() => void>();

// Funzione per notificare il cambio lingua
const notifyLanguageChange = () => {
    listeners.forEach(listener => listener());
};

// Override della funzione di cambio lingua
export const extendedChangeLanguage = async (lang: Language) => {
    await AsyncStorage.setItem('user-language', lang);
    i18n.locale = lang;
    notifyLanguageChange();
};

export const useTranslation = () => {
    const [currentLocale, setCurrentLocale] = useState<Language>(i18n.locale as Language);

    useEffect(() => {
        // Inizializza la configurazione i18n
        setI18nConfig().then(() => {
            setCurrentLocale(i18n.locale as Language);
        });
        
        // Registra il listener
        const listener = () => {
            setCurrentLocale(i18n.locale as Language);
        };
        
        listeners.add(listener);
        
        return () => {
            listeners.delete(listener);
        };
    }, []);

    const t = useCallback((key: string, options?: TranslateOptions) => {
        try {
            return i18n.t(key, options);
        } catch (error) {
            console.error(`Errore di traduzione per la chiave "${key}":`, error);
            return key; // Fallback alla chiave in caso di errore
        }
    }, []);

    const changeLanguage = useCallback(async (lang: Language) => {
        try {
            await extendedChangeLanguage(lang);
        } catch (error) {
            console.error('Errore durante il cambio de lingua:', error);
        }
    }, []);

    const formatWithValues = useCallback((key: string, values?: Record<string, any>) => {
        try {
            return i18n.t(key, { ...values });
        } catch (error) {
            console.error(`Errore di formattazione per la chiave "${key}":`, error);
            return key;
        }
    }, []);

    return {
        t,
        formatWithValues,
        locale: currentLocale,
        changeLanguage,
        supportedLanguages: ['en', 'it'] as const
    };
};