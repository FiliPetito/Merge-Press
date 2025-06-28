import {Button, Text, View} from "react-native";
import {initiateTheme, setThemeStyle, useTheme} from "@/hooks/useTheme";
import {Theme} from "@/constants/Theme";
import {Picker} from "@react-native-picker/picker";
import {useEffect, useState} from "react";
import {ThemeS, ThemeType} from "@/entity/singleton/ThemeS";

export default function Index() {
    const [selectedTheme, setSelectedTheme] = useState(ThemeS.instance.getTheme);

    // Spostiamo initiateTheme in un useEffect
    useEffect(() => {
        initiateTheme();
    }, []);

    const theme = useTheme(
        Theme.LightBaseContainer, 
        Theme.DarkBaseContainer, 
        Theme.DarkBaseContainer
    );

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
            <Text>Edit app/index.tsx to edit this screen.</Text>
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
        </View>
    );
}