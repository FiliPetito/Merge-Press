import {SelectComponetType} from "@/types/SelectComponetType";
import {Text, View} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {initiateTheme} from "@/hooks/useTheme";
import {useEffect} from "react";
import {useTranslation} from "@/hooks/useTranslation";
import {setI18nConfig} from "@/utils/i18n";

/**
 * Select Custom component auto translated with i18n
 * @param labelCode code of the label (optional)
 * @param selectedValue value of the selected item
 * @param keyValueList list of item to select
 * @param onChange callback function
 * @param isActive dummy (optional, defaults to true)
 * @constructor
 */

const SelectComponet = ({labelCode, selectedValue, keyValueList, onChange, isActive = true} : SelectComponetType) => {
    const {t} = useTranslation();

    // Spostiamo initiateTheme in un useEffect
    useEffect(() => {
        initiateTheme();
        setI18nConfig();
        console
    }, []);

    return (
        <View>
            <Text>{t(labelCode)}</Text>

            <Picker
                selectedValue={selectedValue}
                onValueChange={onChange}
            >
                {keyValueList.map((item, index) => (
                    <Picker.Item
                        key={index}
                        label={t(item.value)}
                        value={item.key}
                    />
                ))}

            </Picker>
        </View>
    );
};
export default SelectComponet;