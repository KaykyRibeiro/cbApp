import { View, Text, FlatList } from 'react-native';
import Constants from 'expo-constants';
import { MenuButton } from '../../../components/menu-button';
import { Avatar } from '../../../components/avatar';
import { CardServic } from '../../../components/cardServic';
import { CardServicAtraso } from '../../../components/cardServicAtraso';
import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';
import { FloatBtn } from '../../../components/float-btn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const statusBarHeight = Constants.statusBarHeight;

export interface Card {
    id: string;
    clienteNome: string;
    telefone: string;
    veiculoModelo: string;
    veiculoAno: string;
    veiculoCor: string;
    tipoServico: string;
    precoServico: number;
    descricao: string;
    date: string;
    end: string;
    image: string;
    in_progress: Boolean;
}

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkLoginStatus = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
                // Se o usuário estiver logado, atualizamos o estado para renderizar a página principal
                setIsLoggedIn(true);
            } else {
                // Se não estiver logado, redireciona para a página de login
                router.replace('/login');
            }
        };

        checkLoginStatus();
    }, []);

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

    // Função para verificar se o card está atrasado
    const isCardLate = (endDate: any) => {
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

    const renderHeader = () => (
        <View>
            {lateAndInProgressCards.length > 0 && (
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
                        scrollEnabled={false} // Desabilita a rolagem desse FlatList
                    />
                </View>
            )}

            <View className='mt-5 border-b border-gray-300'>
                <View className='flex flex-row justify-between items-center mx-5 mb-2'>
                    <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 14 }}>
                        Serviços em andamento
                    </Text>
                </View>
            </View>
        </View>
    );

    return (
        <View className='flex-1 p-4 bg-white'>
            <View className='w-full h-auto flex-row items-center justify-between' style={{ paddingTop: statusBarHeight + 10 }}>
                <MenuButton />
                <Avatar source={require('../../../assets/logo-cb.png')} size='medium' />
            </View>
            <FlatList
                data={inProgressAndNotLateCards}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <CardServic data={item} />}
                ListHeaderComponent={renderHeader}
            />
            <FloatBtn />
        </View>
    );
}