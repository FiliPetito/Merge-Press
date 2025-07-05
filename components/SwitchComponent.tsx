import {Switch, Text, View} from "react-native";
import {TranslateLabel} from "@/constants/TranslateLabel";
import {useTranslation} from "@/hooks/useTranslation";

type SwitchComponentType = {
    labelCode : TranslateLabel,
    onChange : (value : boolean) => void,
    status : boolean,
    isActive? : boolean
}

export const SwitchComponent = ({labelCode, status, onChange, isActive} : SwitchComponentType) => {

    const { t } = useTranslation();

    return(
        <View>
            <Text>{t(labelCode)}</Text>
            <Switch value={status} onValueChange={onChange}/>
        </View>
    );
}