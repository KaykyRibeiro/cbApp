import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Pressable, View, Image, Text } from 'react-native';

import { Avatar } from './avatar';
import React from 'react';
import { Card } from '../app/(drawer)/(tabs)';

interface CardServicProps {
  data: Card; // Tipando a prop data como o tipo Card
}

export function CardServic({ data }: CardServicProps) {
  return (
    <Pressable
      className='bg-white h-auto rounded-lg my-3 mx-1 px-2 py-1 flex flex-row justify-start shadow-sm shadow-blue-500/40 border-b border-blue-300 '
    >
      <View className='mr-2 flex justify-center items-center'>
        <Avatar src={data.image} />
      </View>
      <View className='flex flex-grow justify-start gap-2'>
        <View>
          <Text className='text-xl font-semibold'>{data.name_car}</Text>
          <Text className='text-sm color-slate-500 font-semibold' numberOfLines={1} lineBreakMode='tail' >{data.type_service}</Text>
          <Text className='text-sm color-slate-500 ' numberOfLines={1} lineBreakMode='tail' >R$:{data.price_service},00</Text>
        </View>
        <View className='flex flex-row justify-start items-center'>
          <Text className='text-md color-blue-500'>{data.date}</Text>
          <Text className='mx-2'>até</Text>
          <Text className='text-md color-blue-500'>{data.end}</Text>
        </View>
      </View>


    </Pressable>
  )
}