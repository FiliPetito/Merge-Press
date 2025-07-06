/**
 *  Classe che tiene salvati tutte le impostazioni da usare all'interno dell'app
 */

export class SettingsS {
    private static _instance: SettingsS;
    private _language: string = '';
    private _fontDimension: number = 0;
    private _cameraAccess: boolean = false;
    private _defaultCompression: string = '';
    private _openPdfOnSave: boolean = false;
    private _defaultFileName: string = 'MergePress_';

    private constructor() {}

    public static get instance(): SettingsS {
        if (!this._instance) {
            this._instance = new SettingsS();
        }
        return this._instance;
    }

    public get getLanguage(): string {
        return this._language;
    }
    public set setLanguage(language: string) {
        this._language = language;
    }
    public get getFontDimension(): number {
        return this._fontDimension;
    }
    public set setFontDimension(fontDimension: number) {
        this._fontDimension = fontDimension;
    }
    public get getCameraAccess(): boolean {
        return this._cameraAccess;
    }
    public set setCameraAccess(cameraAccess: boolean) {
        this._cameraAccess = cameraAccess;
    }
    public get getDefaultCompression(): string {
        return this._defaultCompression;
    }
    public set setDefaultCompression(defaultCompression: string) {
        this._defaultCompression = defaultCompression;
    }
    public get getOpenPdfOnSave(): boolean {
        return this._openPdfOnSave;
    }
    public set setOpenPdfOnSave(openPdfOnSave: boolean) {
        this._openPdfOnSave = openPdfOnSave;
    }
    public get getDefaultFileName(): string {
        return this._defaultFileName;
    }
    public set setDefaultFileName(defaultFileName: string) {
        this._defaultFileName = defaultFileName;
    }
}