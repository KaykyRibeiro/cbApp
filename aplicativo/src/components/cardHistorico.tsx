import { Pressable, View, Image, Text } from 'react-native';
import { Avatar } from './avatar';
import React from 'react';
import { Card } from '../app/(drawer)/(tabs)';
import clsx from 'clsx';

interface CardServicProps {
  data: Card; // Tipando a prop data como o tipo Card
}

export function CardHistorico({data}: CardServicProps) {
  const isDividir = true;
  return (
        <Pressable
          className={clsx('bg-white h-auto rounded-lg mb-2 px-2 py-1 flex flex-row justify-start  ', {
            'border-b border-blue-300' : isDividir,
          })}
        >
          <View className='mr-2 flex justify-center items-center'>
            <Avatar src={data.image}/>
          </View>
          <View className='flex flex-grow justify-start gap-2'>
            <View>
              <Text className='text-xl font-semibold'>{data.veiculoModelo} {data.veiculoCor} {data.veiculoAno}</Text>
              <Text className='text-sm color-slate-500' numberOfLines={1} lineBreakMode='tail'>{data.tipoServico}</Text>
              <Text className='text-sm color-slate-500 font-light' numberOfLines={1} lineBreakMode='tail' >{data.descricao}</Text>
            </View>
            <View className='flex flex-row justify-end items-center'>
              <Text className='mx-2'>Finalizado em {data.end}</Text>
            </View>
          </View>


        </Pressable>
  )
}