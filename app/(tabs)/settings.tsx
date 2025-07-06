import {Switch, Text, View} from "react-native";
import {useTranslation} from "@/hooks/useTranslation";
import {Picker} from "@react-native-picker/picker";
import {ThemeS} from "@/entity/singleton/ThemeS";
import {initiateTheme, setThemeStyle, useTheme} from "@/hooks/useTheme";
import {useEffect, useState} from "react";
import {setI18nConfig} from "@/utils/i18n";
import {Theme, ThemeList, ThemeType} from "@/constants/Theme";
import SelectComponet from "@/components/SelectComponet";
import {LanguageList, TranslateLabel} from "@/constants/TranslateLabel";
import {CompressionList} from "@/constants/CompressionList";
import {SwitchComponent} from "@/components/SwitchComponent";
import {InputComponent} from "@/components/InputComponent";
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import {saveSettings} from "@/services/settings";
import {useSettings} from "@/hooks/useSettings";


export default function Settings() {
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const { settings, update } = useSettings();
    const [selectedTheme, setSelectedTheme] = useState(ThemeS.instance.getTheme);
    const { t, locale, changeLanguage } = useTranslation();

    //TODO : Caricamento dei settings (da implementare nella pagina di inizio?)

    //TODO : Salvataggio di tutti i cambiamenti quando si esce dalla pagina (o ad ogni modifica)

    // Spostiamo initiateTheme in un useEffect
    useEffect(() => {
        initiateTheme();
        setI18nConfig();
        checkCameraPermission();
    }, []);
    
    const checkCameraPermission = async () => {
        const { status } = await ImagePicker.getCameraPermissionsAsync();
        setHasCameraPermission(status === 'granted');
    };

    const toggleCameraPermission = async () => {
        const { status, canAskAgain } = await ImagePicker.requestCameraPermissionsAsync();
        const granted = status === 'granted';
        setHasCameraPermission(granted);

        if (!granted && !canAskAgain) {
            Toast.show({
                type: 'info',
                text1: 'Permesso negato',
                text2: 'Apri le impostazioni per abilitare la fotocamera',
            });
        } else {
            Toast.show({
                type: granted ? 'success' : 'error',
                text1: 'Fotocamera',
                text2: granted
                    ? 'Apri le impostazioni per disabilitare la fotocamera'
                    : 'Permesso non concesso',
            });
        }
    };

    const showToast = () => {
        Toast.show({
            type: 'info',
            text1: t('messageSaved'),
        });
    }

    const theme = useTheme(
        Theme.LightBaseContainer,
        Theme.DarkBaseContainer,
        Theme.DarkBaseContainer
    )

    return (
      <View>
          {/*  Versione   */}

          <Text>{t('versionLabel')} : 1.0.0</Text>

          {/*  Lingua (Select) */}
          <SelectComponet
              labelCode={TranslateLabel.languageLabel}
                keyValueList={LanguageList}
              selectedValue={locale}
              onChange={(value) => {
                  changeLanguage(value as 'en' | 'it')
                  showToast()
              }}
          />

          {/*  Tema (Select) */}
          <SelectComponet
              labelCode={TranslateLabel.themeLabel}
              keyValueList={ThemeList}
              selectedValue={selectedTheme}
              onChange={(value) => {
                  setSelectedTheme(value as ThemeType)
                  showToast()
              }}
          />

          {/*  Dimensione carattere (Select) */}
          <SelectComponet
              labelCode={TranslateLabel.fontLabel}
              keyValueList={[]}
              selectedValue={settings.getFontDimension.toString()}
              onChange={(val) => {
                  settings.setFontDimension = Number(val);
                  update();
                  saveSettings(settings);
                  showToast()
              }}
          />

          {/* Accesso alla telecamera (Toggle) */}
          <SwitchComponent
              labelCode={TranslateLabel.cameraAccessLabel}
              status={hasCameraPermission === true}
              onChange={() => {
                  toggleCameraPermission
              }}
          />

          {/*  Nome di default (Input) */}
          <InputComponent
              labelCode={TranslateLabel.defaultFileNameLabel}
              type={'default'}
              value={settings.getDefaultFileName}
              onChange={(val) => {
                  settings.setDefaultFileName = val;
                  update();
                  saveSettings(settings);
                  showToast()
              }}
              isReadOnly={false}
          />

          {/*  Compressione (Select) */}
          <SelectComponet
              labelCode={TranslateLabel.defaultCompressionLabel}
              keyValueList={CompressionList}
              selectedValue={settings.getDefaultCompression}
              onChange={(val) => {
                  settings.setDefaultCompression = val;
                  update();
                  saveSettings(settings);
                  showToast()
              }}
          />

          {/*  Aprire il file alla creazione (Toggle) */}
          <SwitchComponent
              labelCode={TranslateLabel.openPdfOnSaveLabel}
              status={settings.getOpenPdfOnSave}
              onChange={(val) => {
                  settings.setOpenPdfOnSave = val;
                  update();
                  saveSettings(settings);
                  showToast()
              }}
          />

          <Toast />
      </View>
    );
}