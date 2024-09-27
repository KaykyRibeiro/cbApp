import { DrawerContentComponentProps } from "@react-navigation/drawer";
import React from "react";
import { Image, View, Text, ScrollView } from "react-native";
import DrawerBtn from "./drawer-btn";
import { CustomOptions } from "../types/navigation";

export function DrawerContent(drawerProps: DrawerContentComponentProps) {
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
                                return (
                                    <View key={route.key}>
                                        <DrawerBtn
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

                </ScrollView>
            </View>
        );
    }
}