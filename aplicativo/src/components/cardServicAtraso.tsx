import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Pressable, View, Image, Text } from 'react-native';

import { Avatar } from './avatar';
import { Card } from '../app/(drawer)/(tabs)';
import React from 'react';

type CardServicProps = {
  data: Card
}

export function CardServicAtraso({ data }: CardServicProps) {
  return (
    <Pressable
      className='bg-white h-auto rounded-lg my-3 mx-1 px-2 py-1 flex flex-row justify-start shadow-sm shadow-red-500/50 border-b border-red-400 '
    >
      <View className='mr-2 flex justify-center items-center'>
        <Avatar src={data.image} />
      </View>
      <View className='flex flex-grow justify-start gap-2'>
        <View>
          <Text className='text-xl font-semibold'>{data.veiculoModelo} {data.veiculoCor} {data.veiculoAno}</Text>
          <Text className='text-sm color-slate-500 font-semibold' numberOfLines={1} lineBreakMode='tail' >{data.tipoServico}</Text>
          <Text className='text-sm color-slate-500' numberOfLines={1} lineBreakMode='tail' >R$:{data.precoServico},00</Text>
        </View>
        <View className='flex flex-row justify-start items-center'>
          <Text className='text-md color-red-500'>{data.date}</Text>
          <Text className='mx-2'>até</Text>
          <Text className='text-md color-red-500'>{data.end}</Text>
        </View>
      </View>


    </Pressable>
  );
}