import {SettingsS} from "@/entity/singleton/SettingsS";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 *  Metodo per preparare tutti i settaggi salvati in locale
 */
export async function prepareSettings() {
    let settings: SettingsS = SettingsS.instance;

    const camera = await AsyncStorage.getItem(STORAGE_KEYS.CAMERA);
    settings.setCameraAccess = camera === 'true';

    const openPdf = await AsyncStorage.getItem(STORAGE_KEYS.OPEN_PDF);
    settings.setOpenPdfOnSave = openPdf === 'true';

    const fileName = await AsyncStorage.getItem(STORAGE_KEYS.FILE_NAME);
    settings.setDefaultFileName = fileName ?? 'MergePress_';

    const compression = await AsyncStorage.getItem(STORAGE_KEYS.COMPRESSION);
    settings.setDefaultCompression = compression ?? '';

    const font = await AsyncStorage.getItem(STORAGE_KEYS.FONT);
    settings.setFontDimension = font ? parseInt(font) : 16;

    const lang = await AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE);
    settings.setLanguage = lang ?? 'en';
}
/**
 *  Metodo per salvare tutti i settaggi salvati in locale
 * @param settings
 */
export async function saveSettings(settings: SettingsS) {
    await AsyncStorage.setItem(STORAGE_KEYS.CAMERA, settings.getCameraAccess.toString());
    await AsyncStorage.setItem(STORAGE_KEYS.OPEN_PDF, settings.getOpenPdfOnSave.toString());
    await AsyncStorage.setItem(STORAGE_KEYS.FILE_NAME, settings.getDefaultFileName);
    await AsyncStorage.setItem(STORAGE_KEYS.COMPRESSION, settings.getDefaultCompression);
    await AsyncStorage.setItem(STORAGE_KEYS.FONT, settings.getFontDimension.toString());
    await AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, settings.getLanguage);
}

/**
 * Chiavi per salvare i dati
 */
const STORAGE_KEYS = {
    CAMERA: 'MergePress_cameraAccess',
    OPEN_PDF: 'MergePress_openPdfOnSave',
    FILE_NAME: 'MergePress_defaultFileName',
    COMPRESSION: 'MergePress_defaultCompression',
    FONT: 'MergePress_fontDimension',
    LANGUAGE: 'MergePress_language',
}

