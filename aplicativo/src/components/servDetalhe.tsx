import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
            <Text className='text-lg color-red-500 font-semibold'>{data.end}</Text>
        ) : data.in_progress ? (
            <Text className='text-lg color-blue-500 font-normal'>{data.end}</Text>
        ) : (
            <Text className='text-lg color-gray-500 font-normal'>{data.end}</Text>
        )}
    </View>
);

const renderDiscription = ({ data }: CardServicProps) => (
    <View>
        {data.descricao != '' && (
            <>
                <Text className='text-semibold font-body color-gray-500'>Descrição:</Text>
                <Text className='text-md color-gray-600'> {data.descricao}</Text>
            </>

        )}
    </View>

)

const deletServic = async (e: any) => {

}

const concluiServic = ({ data }: CardServicProps) => (
    data.in_progress = false
)

export default function ServDetalhe({ data }: CardServicProps) {
    return (
        <>
            <View className='flex justify-between bg-gray-50 p-5 mt-4 border-b border-gray-300'>
                <Text className='text-2xl font-subtitle'>{data.veiculoModelo} {data.veiculoCor} {data.veiculoAno}</Text>
                <View className='flex flex-col gap-2 p-2'>
                    <Text className='font-body color-gray-600'>Tipo de serviço: </Text>
                    <Text className='text-semibold color-gray-600'>{data.tipoServico}</Text>
                    <Text className='text-md color-gray-600'>{renderDiscription({ data })}</Text>
                    <View className='flex flex-row justify-between mt-5'>
                        <View className='flex justify-start'>
                            <Text className='text-md color-gray-600'>Data de início:</Text>
                            <Text>{data.date}</Text>
                        </View>
                        <View className='flex justify-start'>
                            <Text className='text-body color-gray-600 font-semibold'>Data de término: </Text>
                            <Text >{renderHeader({ data })}</Text>
                        </View>
                    </View>
                    <View className='flex justify-end items-end mt-2'>
                        <Text className='text-md font-body color-blue-950'>Preço: R$ {data.precoServico},00</Text>
                    </View>
                </View>
            </View>
            <View className='w-80 h-auto absolute bottom-10 flex flex-row justify-between mx-16'>
                <TouchableOpacity onPress={deletServic}>
                    <Text className='text-md font-semibold color-red-800 border border-red-400 rounded-lg px-3 py-2'>Deletar</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text className='text-md font-semibold color-blue-900 border border-blue-800 rounded-lg px-3 py-2'>Concluir</Text>
                </TouchableOpacity>
            </View>
        </>

    );
}
