import {Text, TextInput, View} from "react-native";
import {TranslateLabel} from "@/constants/TranslateLabel";
import {useTranslation} from "@/hooks/useTranslation";

type InputComponentType = {
    labelCode : TranslateLabel,
    type : string,
    value : string,
    onChange : (value : string) => void,
    isActive? : boolean
    isReadOnly : boolean
}

export const InputComponent = ({labelCode, type, value, onChange, isActive, isReadOnly} : InputComponentType) => {
    const { t } = useTranslation();

    return(
        <View>
            <Text>{t(labelCode)}</Text>
            <TextInput value={value} onChangeText={onChange} readOnly={isReadOnly}/>
        </View>
    );
}