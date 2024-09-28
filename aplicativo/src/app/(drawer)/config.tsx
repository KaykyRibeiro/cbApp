import React from 'react';
import { View, Text } from 'react-native';
import { MenuButton } from '../../components/menu-button';
import { Avatar } from '../../components/avatar';
import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight;
export default function Config() {
 return (
   <View className='flex-1 p-4 bg-white'>
        <View className='w-full h-auto flex-row items-center justify-between' style={{ paddingTop: statusBarHeight + 10 }}>
                <MenuButton />
                <Avatar source={require('../../assets/logo-cb.png')} size='medium' />
            </View>
        <Text>Configurações</Text>
    </View>
  );
}