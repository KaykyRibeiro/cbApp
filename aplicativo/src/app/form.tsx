import React, { useState } from 'react';
import { View, Text, Pressable, TouchableOpacity, Alert, TextInput } from 'react-native';
import { Avatar } from '../components/avatar';
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';

const statusBarHeight = Constants.statusBarHeight;

export default function Form() {
  // Estado para armazenar os valores dos campos de texto da Etapa 2
  const [formData, setFormData] = useState({
    clienteNome: '',
    telefone: '',
    veiculoModelo: '',
    veiculoAno: '',
    veiculoCor: '',
    tipoServico: '',
    precoServico: '',
    descricao: '',
    date: '',
    end: '',
    image: '',
    in_progress: ''
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const response = await fetch('http://192.168.56.1:3000/services/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    console.log(result);
  };

  // Hook para navegar entre telas
  const router = useRouter();

  // Estado para armazenar os itens selecionados
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Estado para controlar os passos
  const [step, setStep] = useState(1);

  // Função para navegar entre telas
  const handlePress = () => {
    Alert.alert(
      'Descartar Cadastro',
      'Tem certeza que deseja descartar o cadastro?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            router.push("/(drawer)/(tabs)"); // Corrigido para React Navigation
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Função para lidar com seleção de itens (checkboxes)
  const handleCheckBoxPress = (value: string) => {
    if (selectedItems.includes(value)) {
      setSelectedItems(selectedItems.filter(item => item !== value));
    } else {
      setSelectedItems([...selectedItems, value]);
    }
  };

  // Função para avançar para o próximo passo
  const nextStep = () => {
    if (step === 1) {
      if (selectedItems.length === 0) {
        Alert.alert('Erro', 'Selecione pelo menos uma categoria de serviço.');
        return;
      }
    }
    if (step === 2) {
      const { clienteNome, telefone, veiculoModelo, veiculoAno, veiculoCor } = formData;
      if (!clienteNome || !telefone || !veiculoModelo || !veiculoAno || !veiculoCor) {
        Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
        return;
      }
    }
    if (step < 3) {
      setStep(step + 1);
    }
  };

  // Função para voltar ao passo anterior
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Função para atualizar o estado com os dados do formulário
  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
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
      {step === 1 && (
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
              <Text className='text-md font-semibold color-red-600 border border-red-500 rounded-lg px-3 py-2'>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={nextStep}>
              <Text className='text-md font-semibold color-blue-900 border border-blue-800 rounded-lg px-3 py-2'>Prosseguir</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {step === 2 && (
        <View className='flex-1 mt-10 items-center'>
          <View className='w-96 h-auto flex-row items-center justify-between'>
            <Text className='text-sm font-semibold color-gray-600'>Dados</Text>
            <Text className='text-sm font-semibold color-gray-600'>Etapa 2 de 3</Text>
          </View>

          <View className='w-96 h-outo shadow-sm bg-white rounded-lg p-4 mt-2'>
            <View className='w-full h-auto flex flex-col mt-3'>
              <Text className='text-lg'>Informe os dados do cliente:</Text>
              <TextInput
                placeholder='Nome do cliente:'
                className='w-full h-12 mb-2 bg-transparent border-b border-gray-300'
                value={formData.clienteNome}
                onChangeText={(value) => handleInputChange('clienteNome', value)}
              />
              <TextInput
                placeholder='Telefone:'
                className='w-full h-12 bg-transparent border-b border-gray-300'
                value={formData.telefone}
                onChangeText={(value) => handleInputChange('telefone', value)}
              />

              <Text className='text-lg mt-8'>Informe os dados do veículo:</Text>
              <TextInput
                placeholder='Modelo:'
                className='w-full h-12 mb-2 bg-transparent border-b border-gray-300'
                value={formData.veiculoModelo}
                onChangeText={(value) => handleInputChange('veiculoModelo', value)}
              />
              <View className='flex flex-row justify-between mb-2'>
                <TextInput
                  placeholder='Ano:'
                  className='w-40 h-12 bg-transparent border-b border-gray-300'
                  value={formData.veiculoAno}
                  onChangeText={(value) => handleInputChange('veiculoAno', value)}
                />
                <TextInput
                  placeholder='Cor:'
                  className='w-40 h-12 bg-transparent border-b border-gray-300'
                  value={formData.veiculoCor}
                  onChangeText={(value) => handleInputChange('veiculoCor', value)}
                />
              </View>
            </View>
          </View>

          <View className='w-full h-auto absolute bottom-10 flex flex-row justify-center gap-40'>
            <TouchableOpacity onPress={prevStep}>
              <Text className='text-md font-semibold color-gray-600 border border-gray-500 rounded-lg px-3 py-2'>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={nextStep}>
              <Text className='text-md font-semibold color-blue-900 border border-blue-800 rounded-lg px-3 py-2'>Prosseguir</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {step === 3 && (
        <View className='flex-1 mt-10 items-center'>
          <View className='w-96 h-auto flex-row items-center justify-between'>
            <Text className='text-sm font-semibold color-gray-600'>Informações do Serviço</Text>
            <Text className='text-sm font-semibold color-gray-600'>Etapa 3 de 3</Text>
          </View>

          <View className='w-96 h-outo shadow-sm bg-white rounded-lg p-4 mt-2'>
            <Text className='text-lg'>Insira as informações do(s) serviço(s):</Text>
            <View className='w-full h-auto flex flex-col mt-3'>
              {/* Exibir input específico para 'higienizacao' */}
              {selectedItems.includes('higienizacao') && (
                <TextInput
                  placeholder='Detalhes sobre a Higienização Interna:'
                  className='w-full h-12 mb-2 bg-transparent border-b border-gray-300'
                  value={formData.descricao}
                  onChangeText={(value) => handleInputChange('descricao', value)}
                />
              )}

              {/* Exibir input específico para 'limpeza' */}
              {selectedItems.includes('limpeza') && (
                <TextInput
                  placeholder='Detalhes sobre a Limpeza Interna:'
                  className='w-full h-12 mb-2 bg-transparent border-b border-gray-300'
                  value={formData.descricao}
                  onChangeText={(value) => handleInputChange('descricao', value)}
                />
              )}

              {/* Exibir input específico para 'pinturaCompleta' */}
              {selectedItems.includes('pinturaCompleta') && (
                <TextInput
                  placeholder='Detalhes sobre a Pintura Completa:'
                  className='w-full h-12 mb-2 bg-transparent border-b border-gray-300'
                  value={formData.descricao}
                  onChangeText={(value) => handleInputChange('descricao', value)}
                />
              )}

              {/* Exibir input específico para 'pinturaEspecifica' */}
              {selectedItems.includes('pinturaEspecifica') && (
                <TextInput
                  placeholder='Detalhes sobre a Pintura Específica:'
                  className='w-full h-12 mb-2 bg-transparent border-b border-gray-300'
                  value={formData.descricao}
                  onChangeText={(value) => handleInputChange('descricao', value)}
                />
              )}

              {/* Exibir input específico para 'polimentoComercial' */}
              {selectedItems.includes('polimentoComercial') && (
                <TextInput
                  placeholder='Detalhes sobre o Polimento Comercial:'
                  className='w-full h-12 mb-2 bg-transparent border-b border-gray-300'
                  value={formData.descricao}
                  onChangeText={(value) => handleInputChange('descricao', value)}
                />
              )}

              {/* Exibir input específico para 'polimentoTecnico' */}
              {selectedItems.includes('polimentoTecnico') && (
                <TextInput
                  placeholder='Detalhes sobre o Polimento Técnico:'
                  className='w-full h-12 mb-2 bg-transparent border-b border-gray-300'
                  value={formData.descricao}
                  onChangeText={(value) => handleInputChange('descricao', value)}
                />
              )}

            </View>
          </View>

          <View className='w-full h-auto absolute bottom-10 flex flex-row justify-center gap-40'>
            <TouchableOpacity onPress={prevStep}>
              <Text className='text-md font-semibold color-gray-600 border border-gray-500 rounded-lg px-3 py-2'>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit}>
              <Text className='text-md font-semibold color-blue-900 border border-blue-800 rounded-lg px-3 py-2'>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
