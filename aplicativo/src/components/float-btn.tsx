import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export function FloatBtn() {
    return (
        <View className="rounded-full absolute bottom-10 right-8 border-2 border-blue-500  ">
            <TouchableOpacity >
                <MaterialIcons name="add" size={40} color="#3b82f6" />
            </TouchableOpacity>
        </View>

    )
}