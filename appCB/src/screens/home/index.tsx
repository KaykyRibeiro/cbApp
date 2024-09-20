import React from 'react';
import Constants from 'expo-constants';
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
      className='flex flex-row justify-between items-center mx-5 p-2 border-b-2 border-gray-300'
    >
      <Text>
        Serviços em andamento
      </Text>
      <Pressable>
        <Text>
          Icon
        </Text>
      </Pressable>
    </View>

    <CardServic/>

   </ScrollView>
    <Navbar/>
  </>
  
  );
}