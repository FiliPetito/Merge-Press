import {useState} from "react";
import {SettingsS} from "@/entity/singleton/SettingsS";

export function useSettings() {
    const [, forceUpdate] = useState(0);
    const settings = SettingsS.instance;

    const update = () => forceUpdate(n => n + 1);

    return { settings, update };
}