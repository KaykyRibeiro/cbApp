import React from 'react';
import { Drawer } from 'expo-router/drawer';
export default function DrawerLayout() {
    return (
        <Drawer 
        defaultStatus='open'
        screenOptions={{
            headerShown: false,
            drawerStyle: {
                width: "75%",
            },
        }}
        >
            <Drawer.Screen name='(tabs)'/>
        </Drawer>
    );
}