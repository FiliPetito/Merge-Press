import {Button, Text, View} from "react-native";
import {initiateTheme, setThemeStyle, useTheme} from "@/hooks/useTheme";
import {Theme, ThemeType} from "@/constants/Theme";
import {Picker} from "@react-native-picker/picker";
import {useEffect, useState} from "react";
import {ThemeS} from "@/entity/singleton/ThemeS";
import {useTranslation} from "@/hooks/useTranslation";
import {setI18nConfig} from "@/utils/i18n";
import CardComponent from "@/components/CardComponent";
import {Theme} from "@/style/Theme";
import Toast from "react-native-toast-message";
import {prepareSettings} from "@/services/settings";

export default function Index() {

    const [selectedTheme, setSelectedTheme] = useState(ThemeS.instance.getTheme);
    const { t, locale, changeLanguage } = useTranslation();


    // Spostiamo initiateTheme in un useEffect
    useEffect(() => {
        initiateTheme();
        setI18nConfig();
        prepareSettings();
    }, []);


    const theme = useTheme(
        Theme.LightBaseContainer, 
        Theme.DarkBaseContainer, 
        Theme.DarkBaseContainer
    );

    // @ts-ignore
    return (
        <View
            style={[
                theme,
                {
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }
            ]}
        >

            <CardComponent cardType={'merge'}/>

            <Text>{t('welcome')}</Text>
            <Button title={"Testata"} onPress={() => {}} />

            <Picker
                style={{
                    width: 200,
                    backgroundColor: 'white',
                    marginVertical: 10
                }}
                selectedValue={ThemeS.instance.getTheme}
                onValueChange={(itemValue) => {
                    setSelectedTheme(itemValue);
                    setThemeStyle(itemValue as ThemeType);
                }}
            >
                <Picker.Item label="Dark" value="dark" />
                <Picker.Item label="Light" value="light" />
                <Picker.Item label="Custom" value="custom" />
                <Picker.Item label="Automatic" value="automatic" />
            </Picker>

            <Picker
                style={{
                    width: 200,
                    backgroundColor: 'white',
                    marginVertical: 10
                }}
                selectedValue={locale}
                onValueChange={(itemValue) => {
                    changeLanguage(itemValue as 'en' | 'it')
                }}
            >
                <Picker.Item label={t("italian")} value="it" />
                <Picker.Item label={t("english")} value="en" />
            </Picker>

        </View>
    );
}