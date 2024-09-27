import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { DrawerContent } from '../../components/drawer-content';
import { CustomOptions } from '../../types/navigation';

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
        drawerContent={(props) => <DrawerContent {...props}/>}
        >
            <Drawer.Screen name='(tabs)' options={{title: "Configuração", iconName: "settings", isDividir: true} as CustomOptions}/>
        </Drawer>
    );
}