import {useColorScheme} from 'react-native';
import {ThemeS} from "@/entity/singleton/ThemeS";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from 'react';
import {ThemeType} from "@/constants/Theme";

export const initiateTheme = async () => {
    const themeI = ThemeS.instance;

    if(themeI.getTheme === 'notSetted'){
        let storedTheme = await AsyncStorage.getItem('user-theme') as ThemeType;

        if (storedTheme === null) {
            storedTheme = 'automatic' as ThemeType;
            await AsyncStorage.setItem('user-theme', storedTheme);
        }
        themeI.setTheme = storedTheme;
    }
}

export const useTheme = (styleLight: object, styleDark: object, styleCustom: object) => {
    const colorScheme = useColorScheme();
    const themeI = ThemeS.instance;
    const [, forceUpdate] = useState({});

    useEffect(() => {
        const unsubscribe = themeI.subscribe(() => {
            forceUpdate({});
        });
        return () => unsubscribe();
    }, []);

    if (themeI.getTheme === 'light') return styleLight;
    if (themeI.getTheme === 'dark') return styleDark;
    if (themeI.getTheme === 'custom') return styleCustom;
    if (themeI.getTheme === 'automatic') {
        return colorScheme === 'dark' ? styleDark : styleLight;
    }
    return styleLight;
};

export const getThemeColor = () => {
    const colorScheme = useColorScheme();
    const themeI = ThemeS.instance;
    
    if (themeI.getTheme === 'light') return '#ffffff';
    if (themeI.getTheme === 'dark') return '#ffffff';
    if (themeI.getTheme === 'custom') return '#ffffff';
    if (themeI.getTheme === 'automatic') {
        return colorScheme === 'dark' ? '#ffffff' : '#b4b4b4';
    }
    return '#b4b4b4';
};

export const setThemeStyle = async (theme: ThemeType) => {
    const themeI = ThemeS.instance;
    await AsyncStorage.setItem('user-theme', theme);
    themeI.setTheme = theme;
};