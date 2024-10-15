import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; // Alterar para useLocalSearchParams
import React from 'react';

export default function Detalhes() {
  const { cardData } = useLocalSearchParams(); // Alterar para useLocalSearchParams

  // Parse do cardData de volta para objeto
  const card = JSON.parse(cardData as string);

  return (
    <View className='p-4'>
      <Text className='text-2xl font-bold'>{card.veiculoModelo} {card.veiculoCor}</Text>
      <Text className='text-lg'>{card.tipoServico}</Text>
      <Text className='text-lg'>Preço: R$ {card.precoServico}</Text>
      <Text className='text-lg'>Data de início: {card.date}</Text>
      <Text className='text-lg'>Data de término: {card.end}</Text>
      <Text className='text-lg'>Descrição: {card.descricao}</Text>
    </View>
  );
}
