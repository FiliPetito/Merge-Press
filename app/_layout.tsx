import { Stack } from "expo-router";
import { useTranslation } from "@/hooks/useTranslation";
import { getThemeColor } from "@/hooks/useTheme";
import { PdfModalProvider } from '@/contexts/PdfModalContext';  // Importa il provider

export default function RootLayout() {
    const { t } = useTranslation();

    return (
        <PdfModalProvider>
            <Stack>
                <Stack.Screen 
                    name="index" 
                    options={{ headerShown: false }} 
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
            </Stack>
        </PdfModalProvider>
    );
}