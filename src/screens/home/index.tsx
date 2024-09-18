import { Header } from '@/src/components/header';
import { View, Text, ScrollView, StatusBar } from 'react-native';


import Constants from 'expo-constants';
import React from 'react';

const statusBarHeight = Constants.statusBarHeight;

export function Home() {
 return (
  <ScrollView
     style={{ flex: 1 }}
     className='bg-white'
     showsVerticalScrollIndicator={false}
   >
     <View className='w-full' >
       <Header/>
     </View>
   </ScrollView>
  );
}