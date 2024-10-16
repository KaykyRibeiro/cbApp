import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '../app/(drawer)/(tabs)';

type CardServicProps = {
    data: Card
}

const isCardLate = (endDate: any) => {
    const [day, month, year] = endDate.split('/').map(Number);
    const cardEndDate = new Date(year, month - 1, day); // Mês é 0 indexado no JS
    const today = new Date();

    // Retorna true se a data de término do card já passou
    return cardEndDate < today;
}

const lateAndInProgressCards = () => (
    (data: { end: any; in_progress: boolean; }) => isCardLate(data.end) && data.in_progress === true
);

const renderHeader = ({ data }: CardServicProps) => (
    <View>
        {isCardLate(data.end) && data.in_progress ? (
            <Text className='text-lg color-red-500 font-semibold'>Data de término: {data.end}</Text>
        ) : data.in_progress ? (
            <Text className='text-lg color-blue-500 font-normal'>Data de término: {data.end}</Text>
        ) : (
            <Text className='text-lg color-gray-500 font-normal'>Data de término: {data.end}</Text>
        )}
    </View>
);

export default function ServDetalhe({ data }: CardServicProps) {
    return (
        <View className='flex justify-between bg-gray-50 p-4 mt-4 border-b border-gray-300'>
            <Text className='text-2xl font-bold'>{data.veiculoModelo} {data.veiculoCor} {data.veiculoAno}</Text>
            <Text className='text-lg'>{data.tipoServico}</Text>
            <Text className='text-lg'>Preço: R$ {data.precoServico}</Text>
            <Text className='text-lg'>Data de início: {data.date}</Text>
            <Text>{renderHeader({data})}</Text>
            <Text className='text-lg'>Descrição: {data.descricao}</Text>
        </View>
    );
}
