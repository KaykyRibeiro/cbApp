import React from 'react';
import Constants from 'expo-constants';
import { Ionicons, Feather } from '@expo/vector-icons';
import { View, Text, ScrollView, StatusBar, Pressable } from 'react-native';


import { Header } from '@/src/components/header';
import { Navbar } from '@/src/components/navbar';
import { CardServic } from '@/src/components/cardServic';

const statusBarHeight = Constants.statusBarHeight;

export function Home() {
 return (
  <>
  <Header/>
  <ScrollView
     style={{ flex: 1 }}
     className=' w-full h-full'
     showsVerticalScrollIndicator={false}
   >
    <View 
      className='mt-2 border-b border-gray-300'
    >
      <View className='flex flex-row justify-between items-center mx-5 mb-2'>
        <Text className='text-sm font-bold color-gray-500'>
          Serviços em andamento
        </Text>
      <Pressable>
        <Feather name="plus" size={20} color="gray" />
      </Pressable>
      </View>
    </View>

    <CardServic/>

   </ScrollView>
    <Navbar/>
  </>
  
  );
}