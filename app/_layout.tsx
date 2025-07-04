import {router, Stack} from "expo-router";
import {TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";

export default function RootLayout() {
  return(
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
            <Stack.Screen name="index" options={{ headerShown: true, headerTitle: 'Home' }} />
            <Stack.Screen name="(tabs)/settings" options={{ headerShown: true, headerTitle: 'Settings', headerRight: () => null}} />
      </Stack>);
}
