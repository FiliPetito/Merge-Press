import { StyleSheet } from 'react-native';
import {KeyValueType} from "@/types/SelectComponetType";

//TODO : The custome theme is in working progress

export const Theme = StyleSheet.create({

    //  Light Theme

    LightBaseContainer: {
        backgroundColor: "#fff",
    },

    //  Dark Theme

    DarkBaseContainer: {
        backgroundColor: "#2f2f2f",
    },


    //  Custom

    CustomBaseContainer: {
        backgroundColor: "#ababab"
    }
});


/**
 *  Lista dei temi disponibili
 */
export const ThemeList : KeyValueType[] = [
    {
        key : "light",
        value : "lightTheme"
    },
    {
        key : "dark",
        value : "darkTheme"
    },
    {
        key : "custom",
        value : "customTheme"
    },
    {
        key : "automatic",
        value : "automaticTheme"
    }
]

export type ThemeType = 'light' | 'dark' | 'custom' | 'automatic' | 'notSetted';