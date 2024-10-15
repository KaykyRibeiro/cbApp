import { DrawerContentComponentProps } from "@react-navigation/drawer";
import React from "react";
import { Image, View, Text, ScrollView, Pressable } from "react-native";
import DrawerBtn from "./drawer-btn";
import { CustomOptions } from "../types/navigation";
import clsx from "clsx";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router'; // Usando o expo-router para redirecionar

export function DrawerContent(drawerProps: DrawerContentComponentProps) {
    const router = useRouter(); // Instância do router do expo-router

    // Função para realizar o logout
    const handleLogout = async () => {
        try {
            // Remover dados do usuário do AsyncStorage
            await AsyncStorage.removeItem('user');

            // Redirecionar para a tela de login
            router.replace('/login');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };
    {
        return (
            <View className="flex-1 bg-blue-50/5 overflow-hidden">
                <View className="mt-20 w-full border-b border-blue-200 flex items-center">
                    <Image source={require("../../assets/images/logo-cb.png")} className="w-28 h-28" />
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{
                    paddingBottom: 42
                }}>
                    <View className="mt-2">
                        {
                            drawerProps.state.routes.map((route, index) => {
                                const isFocused = drawerProps.state.index === index;
                                const options = drawerProps.descriptors[route.key].options as CustomOptions;
                                if (options.title === undefined) {
                                    return;
                                }

                                const onPress = () => {
                                    const event = drawerProps.navigation.emit({
                                        type: "drawerItemPress",
                                        canPreventDefault: true,
                                        target: route.key,
                                    })
                                    if (!isFocused && !event.defaultPrevented) {
                                        drawerProps.navigation.navigate(route.name, route.params);
                                    }
                                }


                                return (
                                    <View key={route.key}>
                                        <DrawerBtn
                                            onPress={onPress}
                                            title={options.title}
                                            iconName={options.iconName}
                                            isDividir={options.isDividir || false}
                                            isFocused={isFocused}
                                        />
                                    </View>
                                )
                            })
                        }
                    </View>
                    {/* Botão de logout */}
                    <Pressable
                        onPress={handleLogout} // Chama a função de logout
                        className='py-2 w-full'>
                        <View className={clsx("flex flex-row items-center gap-4 h-14 px-6 -ml-2",)}>
                            <MaterialIcons name="exit-to-app" size={25} color="#ef4444" />
                            <Text className="text-red-600 font-subtitle text-base flex-1">
                                Sair
                            </Text>
                        </View>
                    </Pressable>

                </ScrollView>
            </View>
        );
    }
}