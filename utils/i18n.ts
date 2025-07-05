// i18n.ts
import * as Localization from 'expo-localization';
import {I18n} from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from '@/locales/en';
import it from '@/locales/it';
import {getLocales} from "expo-localization";

const translations = {
    en: en,
    it: it,
};

const i18n = new I18n(translations);

i18n.enableFallback = true;


export const setI18nConfig = async () => {
    try {
        const storedLanguage = await AsyncStorage.getItem('MergePress_language');

        if (storedLanguage === null) {
            i18n.locale = <string>getLocales()[0].languageCode;
            await AsyncStorage.setItem('MergePress_language', <string>getLocales()[0].languageCode);
        }else{
            i18n.locale = storedLanguage || Localization.locale.split('-')[0];
        }

    } catch (e) {
        console.error("Error setting i18n config:", e);
    }
};

export const changeLanguage = async (lang: 'en' | 'it') => {
    await AsyncStorage.setItem('MergePress_language', lang);
    i18n.locale = lang;

    setI18nConfig()
};

export default i18n;
