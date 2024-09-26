import { useEffect, useState } from 'react';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Search } from '../../../components/search';
import { CardHistorico } from '../../../components/cardHistorico';

export default function Historico() {
  return (
    <View className='flex-1 bg-white p-4'>
      <Search />
      <Text className='color-gray-700 font-semibold text-sm mt-4'>
        Histórico de serviços
      </Text>
      <ScrollView className='shadow-md w-full h-full bg-blue-50/30 rounded-md p-1'>
        <CardHistorico />
      </ScrollView>
    </View>
  );
}