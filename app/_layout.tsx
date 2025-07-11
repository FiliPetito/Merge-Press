import {router, Stack} from "expo-router";
import { useTranslation } from "@/hooks/useTranslation";
import { getThemeColor } from "@/hooks/useTheme";
import { PdfModalProvider } from '@/contexts/PdfModalContext';
import {Ionicons} from "@expo/vector-icons";
import {TouchableOpacity} from "react-native";  // Importa il provider

export default function RootLayout() {
    const { t } = useTranslation();

    return (
        <PdfModalProvider>
            <Stack
                screenOptions = {{
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerRight:() => (
                        <TouchableOpacity
                            onPress={() => {
                                router.push('/(tabs)/settings');
                            }}
                            style={{
                                width: 35,
                                height: 35,
                                padding: 5,
                                marginRight: 15,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}

                        >
                            <Ionicons name="settings" size={24} color="white" />
                        </TouchableOpacity>
                    )}}
            >
                <Stack.Screen
                    name="index"
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    name="(tabs)/mergePdf"
                    options={{
                        title: t('mergePdf'),
                        headerTintColor: getThemeColor(),
                        headerStyle: { backgroundColor: '#14B4A9'}
                    }}
                />
                <Stack.Screen
                    name="(tabs)/createPdfModal"
                    options={{
                        presentation: 'transparentModal',
                        headerShown: false,
                        animation: 'slide_from_bottom',
                    }}
                />

                <Stack.Screen
                    name="(tabs)/infoModal"
                    options={{
                        presentation: 'transparentModal',
                        headerShown: false,
                        animation: 'fade_from_bottom',
                    }}
                />
                <Stack.Screen name="(tabs)/settings" options={{ headerShown: true, headerTitle: 'Settings', headerRight: () => null}} />
            </Stack>
        </PdfModalProvider>
    );
}