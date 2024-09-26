import { useEffect, useState } from 'react';
import React from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

export interface Card {
  id: string;
  name_car: string;
  type_service: string;
  price_service: number;
  date: string;
  end: string;
  image: string;
  in_progress: boolean;
}

export default function Historico() {

  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    // Função para buscar os dados da API
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://192.168.56.1:3000/services/get'); // Altere a URL para seu backend real
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
    <View className='flex-1 items-center justify-center'>
      <Text>Historico</Text>
    </View>
  );
}