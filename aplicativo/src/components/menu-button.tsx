import { Pressable } from "react-native";
import { MaterialIcons} from '@expo/vector-icons';
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import React from "react";
export function MenuButton() { 
    const navigation = useNavigation();
    const toggleMenu = () => navigation.dispatch(DrawerActions.toggleDrawer());
        
    
    return (
        <Pressable onPress={toggleMenu}>
            <MaterialIcons name="menu" size={30} color="#ef4444" />
        </Pressable>
    )
}