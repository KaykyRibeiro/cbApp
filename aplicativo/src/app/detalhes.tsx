import { View, Text, FlatList, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router'; // Alterar para useLocalSearchParams
import React from 'react';
import { Avatar } from '../components/avatar';
import { MenuButton } from '../components/menu-button';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';
import ServDetalhe from '../components/servDetalhe';

const statusBarHeight = Constants.statusBarHeight;

export default function Detalhes() {
  const { cardData } = useLocalSearchParams(); // Alterar para useLocalSearchParams

  // Parse do cardData de volta para objeto
  const card = JSON.parse(cardData as string);
  const prazoStatus = JSON.parse(cardData as string).in_progress;
  const dataEnd = JSON.parse(cardData as string).end;
  // Função para verificar se o card está atrasado
  const isCardLate = (endDate: any) => {
    const [day, month, year] = endDate.split('/').map(Number);
    const cardEndDate = new Date(year, month - 1, day); // Mês é 0 indexado no JS
    const today = new Date();

    // Retorna true se a data de término do card já passou
    return cardEndDate < today;
  }

  const lateAndInProgressCards = () => (
    (card: { end: any; in_progress: boolean; }) => isCardLate(card.end) && card.in_progress === true
  );
  const handlePress = () => {
    router.push("/(drawer)/(tabs)"); // Corrigido para React Navigation
  };

  const renderHeader = () => (
    <View>
      {isCardLate(dataEnd) && prazoStatus ? (
        <View className='border-b border-red-300'>
          <Text className='text-lg color-red-500 font-semibold'>EM ATRASO!</Text>
        </View>
      ) : prazoStatus ? (
        <View className='border-b border-blue-300'>
          <Text className='text-lg color-blue-500 font-medium'>Em Andamento</Text>
        </View>
      ) : (
        <View className='border-b border-gray-300'>
          <Text className='text-lg color-gray-500 font-medium'>Concluido</Text>
        </View>
      )}
    </View>
  );

  return (
    <View className='flex-1 p-4 bg-white'>
      <View className='w-full h-auto flex-row items-center justify-between' style={{ paddingTop: statusBarHeight + 10 }}>
        <Pressable onPress={handlePress}>
          <MaterialIcons name="arrow-back" size={30} color="#4b5563" />
        </Pressable>
        <Text>{renderHeader()}</Text>
        <Avatar source={require('../assets/logo-cb.png')} size='small' />
      </View>
      <ServDetalhe data={card} />
    </View>

  );
}
