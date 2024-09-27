import { DrawerContentComponentProps } from "@react-navigation/drawer";
import React from "react";
import { Image, View, Text} from "react-native";
import { Avatar } from "./avatar";

export function DrawerContent( drawerProps : DrawerContentComponentProps) {{
    return (
        <View className="flex-1 bg-blue-50/5 overflow-hidden">
            <View>
                <Avatar/>
            </View>
        </View>
    );
}}