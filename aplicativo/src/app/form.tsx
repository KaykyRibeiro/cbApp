import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { Avatar } from '../components/avatar';
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import clsx from 'clsx';

const statusBarHeight = Constants.statusBarHeight;

export default function Form() {
  const router = useRouter();

  // Função para navegar para outra tela
  const handlePress = () => {
    router.push('/(drawer)/(tabs)'); // Navega para a tela correta
  };

  // Estado para armazenar os valores selecionados
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Função para atualizar o array de itens selecionados com o valor da checkbox
  const handleCheckBoxPress = (value: string) => {
    if (selectedItems.includes(value)) {
      setSelectedItems(selectedItems.filter(item => item !== value)); // Remove o valor se já estiver no array
    } else {
      setSelectedItems([...selectedItems, value]); // Adiciona o valor se não estiver no array
    }
  };

  return (
    <View className='flex-1 p-4 bg-white'>
      <View className='w-full h-auto flex-row items-center justify-between' style={{ paddingTop: statusBarHeight + 10 }}>
        <Pressable onPress={handlePress}>
          <MaterialIcons name="arrow-back" size={30} color="#4b5563" />
        </Pressable>
        <Text className='text-xl color-blue-950'>Cadastro de Serviço</Text>
        <Avatar source={require('../assets/logo-cb.png')} size='small' />
      </View>

      <View className='flex-1 mt-10 items-center'>
        <View className='w-96 h-auto flex-row items-center justify-between'>
          <Text className='text-sm font-semibold color-gray-600'>Categorias</Text>
          <Text className='text-sm font-semibold color-gray-600'>Etapa 1 de 3</Text>
        </View>

        <View className='w-96 h-outo shadow-sm bg-white rounded-lg p-4 mt-2'>
          <Text className='text-lg'>Selecione a(s) categoria(s) do serviço:</Text>
          <View className='w-full h-auto flex flex-col mt-3'>
            {/* Checkbox 1 */}
            <TouchableOpacity
              onPress={() => handleCheckBoxPress('higienizacao')}
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
            >
              <MaterialIcons
                name={selectedItems.includes('higienizacao') ? 'check-box' : 'check-box-outline-blank'} size={24}
                color={selectedItems.includes('higienizacao') ? '#2563eb' : '#f87171'} />
              <Text
                className='text-md font-semibold color-gray-600 ml-2'
              >
                Higienização Interna
              </Text>
            </TouchableOpacity>

            {/* Checkbox 2 */}
            <TouchableOpacity
              onPress={() => handleCheckBoxPress('limpeza')}
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
            >
              <MaterialIcons
                name={selectedItems.includes('limpeza') ? 'check-box' : 'check-box-outline-blank'} size={24}
                color={selectedItems.includes('limpeza') ? '#2563eb' : '#f87171'} />
              <Text
                className='text-md font-semibold color-gray-600 ml-2'
              >
                Limpeza Interna
              </Text>
            </TouchableOpacity>

            {/* Checkbox 3 */}
            <TouchableOpacity
              onPress={() => handleCheckBoxPress('pinturaCompleta')}
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
            >
              <MaterialIcons
                name={selectedItems.includes('pinturaCompleta') ? 'check-box' : 'check-box-outline-blank'} size={24}
                color={selectedItems.includes('pinturaCompleta') ? '#2563eb' : '#f87171'} />
              <Text
                className='text-md font-semibold color-gray-600 ml-2'
              >
                Pintura Completa
              </Text>
            </TouchableOpacity>

            {/* Checkbox 4 */}
            <TouchableOpacity
              onPress={() => handleCheckBoxPress('pinturaEspecifica')}
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
            >
              <MaterialIcons
                name={selectedItems.includes('pinturaEspecifica') ? 'check-box' : 'check-box-outline-blank'} size={24}
                color={selectedItems.includes('pinturaEspecifica') ? '#2563eb' : '#f87171'} />
              <Text
                className='text-md font-semibold color-gray-600 ml-2'
              >
                Pintura Especifica
              </Text>
            </TouchableOpacity>

            {/* Checkbox 5 */}
            <TouchableOpacity
              onPress={() => handleCheckBoxPress('polimentoComercial')}
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
            >
              <MaterialIcons
                name={selectedItems.includes('polimentoComercial') ? 'check-box' : 'check-box-outline-blank'} size={24}
                color={selectedItems.includes('polimentoComercial') ? '#2563eb' : '#f87171'} />
              <Text
                className='text-md font-semibold color-gray-600 ml-2'
              >
                Polimento Comercial
              </Text>
            </TouchableOpacity>

            {/* Checkbox 6 */}
            <TouchableOpacity
              onPress={() => handleCheckBoxPress('polimentoTecnico')}
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
            >
              <MaterialIcons
                name={selectedItems.includes('polimentoTecnico') ? 'check-box' : 'check-box-outline-blank'} size={24}
                color={selectedItems.includes('polimentoTecnico') ? '#2563eb' : '#f87171'} />
              <Text
                className='text-md font-semibold color-gray-600 ml-2'
              >
                Polimento Técnico
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className='w-full h-auto absolute bottom-10 flex flex-row justify-center gap-40'>
          <TouchableOpacity onPress={handlePress}>
            <Text className='text-md font-semibold color-gray-600 border border-gray-500 rounded-lg px-3 py-2'>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={console.log(selectedItems)}>
            <Text className='text-md font-semibold color-blue-900 border border-blue-800 rounded-lg px-3 py-2'>Prosseguir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
