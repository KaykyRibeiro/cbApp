import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

export function FloatBtn() {
    const router = useRouter();

  // Função para navegar para a tela "Form"
  const handlePress = () => {
    router.push('../form'); // Navega para a tela 'Form'
  };
    return (
        <View className="absolute bottom-10 right-8  ">
            <TouchableOpacity onPress={handlePress}  >
                <View className="rounded-full border-2 border-blue-500  ">
                    <MaterialIcons name="add" size={40} color="#3b82f6" />
                </View>
            </TouchableOpacity>
        </View>

    )
}