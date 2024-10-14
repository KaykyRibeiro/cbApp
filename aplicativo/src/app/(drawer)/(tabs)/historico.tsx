import { useEffect, useState } from 'react';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Search } from '../../../components/search';
import { CardHistorico } from '../../../components/cardHistorico';
import { Card } from '../(tabs)/index';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';

export default function Historico() {

  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    // Função para buscar os dados da API
    const fetchCards = async () => {
      try {
        const response = await axios.get('https://cbappservice-99860148466.us-central1.run.app/services/get'); // Altere a URL para seu backend real
        setCards(response.data);
      } catch (error) {
        console.error('Erro ao buscar os dados', error);
      }
    };

    fetchCards();
  }, []);

  const noProgressCard = cards.filter(
    card => card.in_progress === false 
  );

  return (
    <View className='flex-1 bg-white p-4'>
      <Search />
      <Text className='color-gray-700 font-semibold text-sm mt-4'>
        Histórico de serviços
      </Text>
      <View className='shadow-md w-full h-full bg-blue-50/30 rounded-md p-1'>
        {noProgressCard.length > 0 && (
          <View>
            <FlatList
              data={noProgressCard}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <CardHistorico data={item} />}
            />
          </View>
        )}
      </View>
    </View>
  );
}

