import {KeyValueType} from "@/types/SelectComponetType";

export enum TranslateLabel {
    themeLabel = 'themeLabel',
    languageLabel = 'languageLabel',
    versionLabel = 'versionLabel',
    fontLabel = 'fontLabel',
    cameraAccessLabel = 'cameraAccessLabel',
    defaultCompressionLabel = 'defaultCompressionLabel',
    openPdfOnSaveLabel = 'openPdfOnSaveLabel',
    defaultFileNameLabel = 'defaultFileNameLabel',
}


/**
 *  Lista delle lingue disponibili
 */
export const LanguageList : KeyValueType[] = [
    {
        key : "en",
        value : "englishKey"
    },
    {
        key : "it",
        value : "italianKey"
    }
]