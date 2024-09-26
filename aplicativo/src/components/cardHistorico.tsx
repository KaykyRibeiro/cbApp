import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Pressable, View, Image, Text } from 'react-native';

import { Avatar } from './avatar';
import React from 'react';
import { Card } from '../app/(drawer)/(tabs)';

interface CardServicProps {
  data: Card; // Tipando a prop data como o tipo Card
}

export function CardHistorico({data}: CardServicProps) {
  return (
        <Pressable
          className='bg-white h-auto rounded-lg mb-2 px-2 py-1 flex flex-row justify-start border-b border-blue-300 '
        >
          <View className='mr-2 flex justify-center items-center'>
            <Avatar/>
          </View>
          <View className='flex flex-grow justify-start gap-2'>
            <View>
              <Text className='text-xl font-semibold'>aaaa</Text>
              <Text className='text-sm color-slate-500' numberOfLines={1} lineBreakMode='tail' >a</Text>
            </View>
            <View className='flex flex-row justify-end items-center'>
              <Text className='mx-2'>Finalizado em </Text>
              <Text className='text-md color-blue-500'>a</Text>
            </View>
          </View>


        </Pressable>
  )
}