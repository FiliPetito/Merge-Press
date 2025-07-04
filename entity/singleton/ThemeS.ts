import {ThemeType} from "@/constants/Theme";

type ThemeListener = () => void;

export class ThemeS {
    private static _instance: ThemeS;
    private _theme: ThemeType = "notSetted";
    private listeners: Set<ThemeListener> = new Set();

    private constructor() {}

    public static get instance(): ThemeS {
        if (!this._instance) {
            this._instance = new ThemeS();
        }
        return this._instance;
    }

    public subscribe(listener: ThemeListener): () => void {
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        };
    }

    private notifyListeners(): void {
        this.listeners.forEach(listener => listener());
    }

    public set setTheme(theme: ThemeType) {
        this._theme = theme;
        this.notifyListeners();
    }

    public get getTheme(): ThemeType {
        return this._theme;
    }
}
