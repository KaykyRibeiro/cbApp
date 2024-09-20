import React from 'react';
import Constants from 'expo-constants';
import { Ionicons, Feather, AntDesign  } from '@expo/vector-icons';
import { View, Text, ScrollView, StatusBar, Pressable } from 'react-native';


import { Header } from '@/src/components/header';
import { Navbar } from '@/src/components/navbar';
import { CardServic } from '@/src/components/cardServic';
import { ViewAtraso } from '@/src/components/viewAtraso';
import { CardServicExp } from '@/src/components/cardServicExp';

const statusBarHeight = Constants.statusBarHeight;

export function Home() {
 return (
  <View style={{ flex: 1 }}>
    <Header/>
    <ViewAtraso/>
    <CardServicExp/>
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
      </View>
    </View>

    <CardServic/>
    
   </ScrollView>
   <Pressable className="absolute bottom-32 right-5 m-5 rounded-full border-blue-300 shadow-md shoadow-blue-500/40">
      <AntDesign name="pluscircle" size={45} color="#60a5fa"/>
    </Pressable>
    <Navbar/>
  </View>  
  );
}