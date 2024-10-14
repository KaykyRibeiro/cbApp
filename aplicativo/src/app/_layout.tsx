import "../styles/global.css";
import {Slot} from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { 
    useFonts,
    Kanit_400Regular,
    Kanit_500Medium,
    Kanit_700Bold
} from "@expo-google-fonts/kanit"
import { Loading } from "../components/loading";
import React from "react";

export default function RootLayout(){
    const [fontsLoaded] = useFonts({
        Kanit_400Regular,
        Kanit_500Medium,
        Kanit_700Bold
    })
    if(!fontsLoaded){
        return <Loading />
    }
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <Slot />
        </GestureHandlerRootView>
    )
}

