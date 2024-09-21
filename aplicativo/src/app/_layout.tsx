import "../styles/global.css";
import {Slot} from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { 
    useFonts,
    kanit_400Regular,
    kanit_500Medium,
    kanit_700Bold
} from "@expo-google-fonts/kanit"

export default function RootLayout(){
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <Slot />
        </GestureHandlerRootView>
    )
}