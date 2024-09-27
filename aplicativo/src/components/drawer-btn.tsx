import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, PressableProps, View, Text } from 'react-native';
import clsx from 'clsx';

export type IconNameProps = keyof typeof MaterialIcons.glyphMap;

type DrawerBtnProps = PressableProps & {
    title: string;
    isFocused: boolean;
    isDividir: boolean;
    iconName: IconNameProps;
}
export default function DrawerBtn({title, isDividir, isFocused, iconName, ...rest}: DrawerBtnProps) {
    return (
        <>
            <Pressable className={clsx('py-2 w-full', {
                "border-b border-blue-300": isDividir,
            }, {
                "bg-blue-50": !isFocused,
            })}
            {...rest}
            >
                <View className={clsx("flex flex-row items-center gap-4 h-14 px-6 -ml-2",)}>
                    <MaterialIcons
                        name={iconName}
                        size={28}
                        color={isFocused ? "#4b5563": "#3b82f6" } />
                    <Text className={clsx("text-gray-500 font-subtitle text-base flex-1", {
                        "text-blue-600": isFocused,
                    })}>
                        {title}
                    </Text>
                </View>
            </Pressable>
            <Pressable className={clsx('py-2 w-full', {
                "border-b border-red-400 ": isDividir,
            }, {
                "bg-red-50": !isFocused,
            })}>
                <View className={clsx("flex flex-row items-center gap-4 h-14 px-6 -ml-2",)}>
                    <MaterialIcons name="exit-to-app" size={30} color="#ef4444" />
                    <Text className={clsx("text-red-700 font-subtitle text-base flex-1", {
                        "text-red-800": isFocused,
                    })}>
                        Sair
                    </Text>
                </View>
            </Pressable>
        </>
    );
}