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

export default function Settings() {
    const [selectedTheme, setSelectedTheme] = useState(ThemeS.instance.getTheme);
    const { t, locale, changeLanguage } = useTranslation();


    // Spostiamo initiateTheme in un useEffect
    useEffect(() => {
        initiateTheme();
        setI18nConfig();
    }, []);


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
              onChange={(value) => changeLanguage(value as 'en' | 'it')}
          />

          {/*  Tema (Select) */}
          <SelectComponet
              labelCode={TranslateLabel.themeLabel}
              keyValueList={ThemeList}
              selectedValue={selectedTheme}
              onChange={(value) => setSelectedTheme(value as ThemeType)}
          />

          {/*  Dimensione carattere (Select) */}
          <SelectComponet
              labelCode={TranslateLabel.fontLabel}
              keyValueList={[]}
              selectedValue={''}
              onChange={() => console.error("Not implemented yet")}
          />

          {/*  Accesso alla telecamera (Toggle) */}
          <SwitchComponent labelCode={TranslateLabel.cameraAccessLabel} status={true} onChange={() => console.error("Not implemented yet")}/>

          {/*  Accesso alla memoria interna (Toggle) */}
          <SwitchComponent labelCode={TranslateLabel.storageAccessLabel} status={true} onChange={() => console.error("Not implemented yet")}/>

          {/*  Folder di default (Input: ReadOnly) */}
          <InputComponent labelCode={TranslateLabel.defaultFolderLabel} type={'default'} value={'/'} onChange={() => console.error("Not implemented yet")} isReadOnly={true} />

          {/*  Nome di default (Input) */}
          <InputComponent labelCode={TranslateLabel.defaultFileNameLabel} type={'default'} value={''} onChange={() => console.error("Not implemented yet")} isReadOnly={false} />

          {/*  Compressione (Select) */}
          <SelectComponet
              labelCode={TranslateLabel.defaultCompressionLabel}
              keyValueList={CompressionList}
              selectedValue={selectedTheme}
              onChange={() => console.error("Not implemented yet")}
          />

          {/*  Aprire il file alla creazione (Toggle) */}
          <SwitchComponent labelCode={TranslateLabel.openPdfOnSaveLabel} status={true} onChange={() => console.error("Not implemented yet")}/>


      </View>
    );
}