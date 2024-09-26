import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export function FloatBtn() {
    return (
        <View className="absolute bottom-10 right-8  ">
            <TouchableOpacity >
                <View className="rounded-full border-2 border-blue-500  ">
                    <MaterialIcons name="add" size={40} color="#3b82f6" />
                </View>
            </TouchableOpacity>
        </View>

    )
}