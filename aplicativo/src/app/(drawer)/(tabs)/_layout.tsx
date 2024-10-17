import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarStyle: {
                backgroundColor: '#fff',
                minHeight: 75,
                paddingBottom: 10,
            },
            tabBarActiveTintColor: '#dc2626',
            tabBarInactiveTintColor: '#9ca3af',
            tabBarLabelStyle: {
                fontSize: 15,  // Tamanho da fonte maior
                fontWeight: 'semibold',  // Se você quiser deixar em negrito
            },
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    tabBarLabel: 'Início',
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons name="home" size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="historico"
                options={{
                    tabBarLabel: 'Histórico',
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons name="search" size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="gerencia"
                options={{
                    tabBarLabel: 'Gerência',
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons name="work" size={size} color={color} />
                    )
                }}
            />
        </Tabs>
    )
}