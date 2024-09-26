import { View, Text } from 'react-native';
import Constants from 'expo-constants';
import { MenuButton } from '../../../components/menu-button';
import { Avatar } from '../../../components/avatar';
import { CardServic } from '../../../components/cardServic';
import { CardServicAtraso } from '../../../components/cardServicAtraso';
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';
import { FloatBtn } from '../../../components/float-btn';

const statusBarHeight = Constants.statusBarHeight;

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

export default function Home() {

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

    // Função para verificar se o card está atrasado
    const isCardLate = (endDate:any) => {
        const [day, month, year] = endDate.split('/').map(Number);
        const cardEndDate = new Date(year, month - 1, day); // Mês é 0 indexado no JS
        const today = new Date();

        // Retorna true se a data de término do card já passou
        return cardEndDate < today;
    };

    const lateAndInProgressCards = cards.filter(
        card => isCardLate(card.end) && card.in_progress === true
    );

    const inProgressAndNotLateCards = cards.filter(
        card => !isCardLate(card.end) && card.in_progress === true
    );

    return (
        <View className='flex-1 p-4 bg-white'>
            <View className='w-full h-auto flex-row items-center justify-between' style={{ paddingTop: statusBarHeight + 10 }}>
                <MenuButton />
                <Avatar source={require('../../../assets/logo-cb.png')} size='medium' />
            </View>

            {lateAndInProgressCards.length > 0 ? (
                <View>
                    <View className='mt-5 border-b border-red-300'>
                        <View className='flex flex-row justify-between items-center mx-5 mb-2'>
                            <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 14 }}>
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

            <View className='mt-5 border-b border-gray-300'>
                <View className='flex flex-row justify-between items-center mx-5 mb-2'>
                    <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 14 }}>
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
                    />
                </View>
            )}

            <FloatBtn />
        </View>
    );
}
