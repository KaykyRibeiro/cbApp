import { View, Text } from 'react-native';
import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight;

import { MenuButton } from '../../components/menu-button';
import { Avatar } from '../../components/avatar';
import { CardServic } from '../../components/cardServic';
import { CardServicAtraso } from '../../components/cardServicAtraso';
import { FlatList } from 'react-native-gesture-handler';
import { CARDS } from '../../utils/cards';

import { CardDataProps } from '../../utils/cards';
import { filterConfig } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon';
import React from 'react';

type CardServicProps = {
  data: CardDataProps
}

// Função para verificar se o card está atrasado
const isCardLate = (endDate: string) => {
  const [day, month, year] = endDate.split('/').map(Number);
  const cardEndDate = new Date(year, month - 1, day); // Mês é 0 indexado no JS
  const today = new Date();

  // Retorna true se a data de término do card já passou
  return cardEndDate < today;
};

const lateAndInProgressCards = CARDS.filter(
  card => isCardLate(card.end) && card.andamento === true
);

const inProgressAndNotLateCards = CARDS.filter(
  card => !isCardLate(card.end) && card.andamento === true
);
export default function Home({ data }: CardServicProps) {
  const filteredCards = CARDS.filter(card => card.andamento === true);
  return (
    <View className='flex-1 p-4 bg-white'>
      <View className='w-full h-auto flex-row items-center justify-between' style={{ paddingTop: statusBarHeight + 10 }}>
        <MenuButton />
        <Avatar source={require('../../assets/logo-cb.png')} size='medium' />
      </View>
      {lateAndInProgressCards.length > 0 ? (
        <View>
          <View className='mt-5 border-b border-red-300'>
            <View className='flex flex-row justify-between items-center mx-5 mb-2'>
              <Text className='text-sm font-bold color-red-500'>
                Serviços em ATRASO!
              </Text>
            </View>
          </View>
          <FlatList
            data={lateAndInProgressCards}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <CardServicAtraso data={item} />}
          />
        </View>
      ) : null}


      <View
        className='mt-5 border-b border-gray-300'
      >
        <View className='flex flex-row justify-between items-center mx-5 mb-2'>
          <Text className='text-sm font-bold color-gray-500'>
            Serviços em andamento
          </Text>
        </View>
      </View>
      {inProgressAndNotLateCards.length > 0 && (
        <View>
          <FlatList
            data={inProgressAndNotLateCards}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <CardServic data={item} />}
          >
          </FlatList>
        </View>
      )}
    </View>
  );
}