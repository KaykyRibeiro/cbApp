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
                "bg-blue-50": isFocused,
            })}
            {...rest}
            >
                <View className={clsx("flex flex-row items-center gap-4 h-14 px-6 -ml-2",)}>
                    <MaterialIcons
                        name={iconName}
                        size={25}
                        color={isFocused ? "#3b82f6" : "#4b5563" } />
                    <Text className={clsx("text-gray-500 font-subtitle text-base flex-1", {
                        "text-blue-700/80": isFocused,
                    })}>
                        {title}
                    </Text>
                </View>
            </Pressable>
            
        </>
    );
}