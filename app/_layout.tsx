import { Stack } from "expo-router";
import {useTranslation} from "@/hooks/useTranslation";
import {getThemeColor, useTheme} from "@/hooks/useTheme";
import {Theme} from "@/style/Theme";

export default function RootLayout() {

    const { t } = useTranslation();

    return<Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)/mergePdf"  options={{ title: t('mergePdf'),
            headerTintColor: getThemeColor(),
            headerStyle: { backgroundColor:  '#14B4A9'}}} />
    </Stack>;
}
