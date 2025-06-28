import { Text, View } from "react-native";
import {Link} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {Theme} from "@/services/Settings/settings";

export default function Index() {


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
        <Link href="/details">View details</Link>
    </View>
  );
}
