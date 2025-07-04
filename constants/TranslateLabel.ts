import {KeyValueType} from "@/types/SelectComponetType";

export enum TranslateLabel {
    themeLabel = 'themeLabel',
    languageLabel = 'languageLabel',
    versionLabel = 'versionLabel',
    fontLabel = 'fontLabel',
    cameraAccessLabel = 'cameraAccessLabel',
    storageAccessLabel = 'storageAccessLabel',
    defaultCompressionLabel = 'defaultCompressionLabel',
    openPdfOnSaveLabel = 'openPdfOnSaveLabel',
    defaultFolderLabel = 'defaultFolderLabel',
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