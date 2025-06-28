import { Stack } from "expo-router";
import {Theme} from "@/services/Settings/settings";

export default function RootLayout() {
  return

    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack> ;
}
