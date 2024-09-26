import { View, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight;
export function Search() {
 return (
   <View className='w-full flex-row border border-slate-500 h-14 rounded-full items-center gap-2 px-4 bg-transparent ' style={{ marginTop: statusBarHeight + 20}}>
    <Feather name='search' size={24} color='#64748b'/>
    <TextInput placeholder='Procurar...' className='w-full h-full flex-1 bg-transparent'/>
   </View>
  );
}