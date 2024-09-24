import { Pressable } from "react-native";
import { MaterialIcons} from '@expo/vector-icons';
import React from "react";
export function MenuButton() { 
    return (
        <Pressable>
            <MaterialIcons name="menu" size={30} color="#ef4444" />
        </Pressable>
    )
}