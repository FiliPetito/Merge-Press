import {TranslateLabel} from "@/constants/TranslateLabel";

export type SelectComponetType = {
    labelCode : TranslateLabel
    keyValueList : KeyValueType[]
    selectedValue : string
    onChange : (value : string) => void
    isActive? : boolean
}

export type KeyValueType = {
    key : string,
    value : string
}