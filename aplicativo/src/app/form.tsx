import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, TouchableOpacity, Alert, TextInput, Image } from 'react-native';
import { Avatar } from '../components/avatar';
import { MaterialIcons } from '@expo/vector-icons';
import Constants, { AppOwnership } from 'expo-constants';
import { useRouter } from 'expo-router';
import moment from 'moment';

const statusBarHeight = Constants.statusBarHeight;

export default function Form() {

  const [valor, setValor] = useState('');
  const [prazo, setPrazo] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataTermino, setDataTermino] = useState('');
  // Estado para armazenar os itens selecionados
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedItemsCar, setSelectedItemsCar] = useState<string[]>([]);

  const [selectedOptionPorta, setSelectedOptionPorta] = useState('');
  const optionsPorta = ['Sim', 'Não']; // Suas opções de Radio Button

  const [selectedOptionRoda, setSelectedOptionRoda] = useState('');
  const optionsRoda = ['Sim', 'Não']; // Suas opções de Radio Button

  const [selectedOptionCor, setSelectedOptionCor] = useState('');
  const optionsCor = ['Sim', 'Não']; // Suas opções de Radio Button

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
    date: moment(new Date()).format('DD/MM/YYYY'),
    end: '',
    image: 'https://i.imgur.com/EdIV8pO.jpeg',
    in_progress: true
  });
  // Hook para navegar entre telas
  const router = useRouter();

  // Estado para controlar os passos
  const [step, setStep] = useState(1);


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (selectedItems.includes("pinturaEspecifica")) {
      if (selectedItemsCar.length === 0) {
        Alert.alert('Erro', 'Selecione pelo menos uma parte do carro.');
        return;
      }
      if (selectedOptionPorta === "" && selectedOptionRoda === "") {
        Alert.alert('Erro', 'Informe as opções complementares.');
        return;
      }
    }
    if (selectedItems.includes("pinturaCompleta")) {
      if (selectedOptionPorta === "" && selectedOptionRoda === "" && selectedOptionCor === "") {
        Alert.alert('Erro', 'Informe as opções complementares.');
        return;
      }
    } else if (prazo === "" && valor === "") {
      Alert.alert('Erro', 'Informe o prazo e o valor.');
      return;
    } 
    
      const response = await fetch('https://cbappservice-99860148466.us-central1.run.app/services/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);
      router.push("/(drawer)/(tabs)"); // Corrigido para React Navigation
    


  };

  const handleVerifyCarParts = () => {
    const carParts = selectedItemsCar.join(', ')

    let desc = carParts

    if (selectedOptionPorta == 'Sim') {
      desc += ", Vão de porta"
    }

    if (selectedOptionRoda == 'Sim') {
      desc += ", Pintura de roda"
    }

    if (selectedOptionCor == 'Sim') {
      desc += ", Mudança de cor"
    }

    handleInputChange('descricao', desc)
    console.log(desc);
  }


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
      console.log(selectedItems)
    } else {
      setSelectedItems([...selectedItems, value]);
    }
  };

  // Função para lidar com seleção de itens (checkboxes)
  const handleCheckBoxPressCar = (value: string) => {
    if (selectedItemsCar.includes(value)) {
      // Se já está selecionado, remove
      setSelectedItemsCar(selectedItemsCar.filter((item) => item !== value));
    } else {
      // Caso contrário, adiciona
      setSelectedItemsCar([...selectedItemsCar, value]);
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

    const allItems = selectedItems.join(', ');
    handleInputChange('tipoServico', allItems);
    console.log(allItems);

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

  // Função para verificar se é fim de semana e ajustar a data para o próximo dia útil
  const ajustarParaProximoDiaUtil = (data: Date) => {
    let diaDaSemana = data.getDay(); // 0 = domingo, 6 = sábado
    if (diaDaSemana === 6) {
      // Se for sábado, adicionar 2 dias para chegar na segunda
      data.setDate(data.getDate() + 2);
    } else if (diaDaSemana === 0) {
      // Se for domingo, adicionar 1 dia para chegar na segunda
      data.setDate(data.getDate() + 1);
    }
    return data;
  };

  // Função para calcular a data de início e término do prazo
  const calcularDatas = () => {
    const prazoEmNumero = parseInt(prazo, 10);

    if (!isNaN(prazoEmNumero)) {
      const hoje = new Date();
      let dataCalculada = new Date(hoje);

      let diasUteisContados = 0;
      while (diasUteisContados < prazoEmNumero) {
        dataCalculada.setDate(dataCalculada.getDate() + 1);

        // Ignora finais de semana
        if (dataCalculada.getDay() !== 0 && dataCalculada.getDay() !== 6) {
          diasUteisContados++;
        }
      }

      // Ajustar o início e o término para dias úteis
      const dataAjustada = ajustarParaProximoDiaUtil(dataCalculada);

      setDataInicio(moment(hoje).format('DD/MM/YYYY')); // Data atual como início
      setDataTermino(moment(dataAjustada).format('DD/MM/YYYY')); // Data ajustada como término

      handleInputChange('end', moment(dataAjustada).format('DD/MM/YYYY'))
    }
  };

  // Função para formatar o valor como moeda brasileira
  const formatarValor = (valor: string) => {
    // Remove tudo que não é número
    let valorNumerico = valor.replace(/\D/g, '');

    // Formatar o valor em reais usando Intl
    let valorFormatado = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(parseFloat(valorNumerico) / 100); // Dividido por 100 para considerar casas decimais

    let valorFinal = parseFloat(valorNumerico) / 100

    let valorFinalFormatado = valorFinal.toString()

    handleInputChange('precoServico', valorFinalFormatado)

    return valorFormatado;

  };

  // Função para atualizar o valor no estado e formatá-lo
  const handleValorChange = (valor: string) => {
    setValor(formatarValor(valor));
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

              {/* Exibir input específico para 'pinturaCompleta' */}
              {selectedItems.includes('pinturaCompleta') && (
                <View className='my-3'>
                  <Text className='text-sm color-blue-900 font-semibold'>Informações sobre a Pintura Completa:</Text>

                  <View className='flex flex-col gap-2 mt-2'>
                    <View className='flex flex-col items-center mt-3'>
                      <Text className='text-md color-slate-800'>Vão de porta:</Text>
                      <View className='flex flex-row items-center gap-5 mt-2'>
                        {optionsPorta.map((option, index) => (
                          <TouchableOpacity
                            key={index}
                            className='flex flex-row items-start  mb-2 '

                            onPress={() => setSelectedOptionPorta(option)}
                          >
                            {/* O círculo do radio button */}
                            <View
                              className='h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center mr-2'
                            >
                              {selectedOptionPorta === option ? (
                                <View
                                  className='h-3 w-3 rounded-full  bg-blue-500 '
                                />
                              ) : null}
                            </View>

                            {/* O texto do radio button */}
                            <Text className='text-base color-slate-700'>{option}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                    <View className='flex flex-col items-center mt-3'>
                      <Text className='text-md color-slate-800'>Pintura de roda:</Text>
                      <View className='flex flex-row items-center gap-5 mt-2'>
                        {optionsRoda.map((option, index) => (
                          <TouchableOpacity
                            key={index}
                            className='flex flex-row items-start  mb-2 '
                            onPress={() => setSelectedOptionRoda(option)}
                          >
                            {/* O círculo do radio button */}
                            <View
                              className='h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center mr-2'
                            >
                              {selectedOptionRoda === option ? (
                                <View
                                  className='h-3 w-3 rounded-full  bg-blue-500 '
                                />
                              ) : null}
                            </View>

                            {/* O texto do radio button */}
                            <Text className='text-base color-slate-700'>{option}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                    <View className=' w-auto flex flex-row items-center justify-center gap-10'>
                      <View className='flex flex-col items-center mt-3'>
                        <Text className='text-md color-slate-800'>Mudança de cor:</Text>
                        <View className='flex flex-row items-center gap-5 mt-2'>
                          {optionsCor.map((option, index) => (
                            <TouchableOpacity
                              key={index}
                              className='flex flex-row items-start  mb-2 '
                              onPress={() => {
                                setSelectedOptionCor(option)
                              }}
                            >
                              {/* O círculo do radio button */}
                              <View
                                className='h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center mr-2'
                              >
                                {selectedOptionCor === option ? (
                                  <View
                                    className='h-3 w-3 rounded-full  bg-blue-500 '
                                  />
                                ) : null}
                              </View>

                              {/* O texto do radio button */}
                              <Text className='text-base color-slate-700'>{option}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>
                      {selectedOptionCor === 'Sim' && (
                        <View>
                          <TextInput
                            placeholder='Informe a cor:'
                            className='w-full h-12 mb-2 bg-transparent border-b border-blue-400'
                            value={formData.descricao}
                            onChangeText={(value) => handleInputChange('descricao', value)}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                </View>

              )}

              {/* Exibir input específico para 'pinturaEspecifica' */}
              {selectedItems.includes('pinturaEspecifica') && (
                <View className='my-3'>
                  <Text className='text-sm color-blue-900 font-semibold mb-3'>Informações sobre a Pintura Especifica:</Text>
                  <View className='flex flex-row justify-center items-center gap-4'>
                    <View className='flex flex-col justify-between h-28 mt-4'>
                      {/* Checkbox para-choque-traseiro */}
                      <View className={`border w-20 h-10 items-center ${selectedItemsCar.includes('Parachoque Traseiro') ? 'border-blue-500' : 'border-transparent'}`}>
                        <TouchableOpacity
                          onPress={() => handleCheckBoxPressCar('Parachoque Traseiro')}
                        >

                          <Image source={require('../assets/para-choque-traseirio.png')} className='w-16 h-10' />

                        </TouchableOpacity>
                      </View>

                      {/* Checkbox para-choque-dianteiro */}
                      <View className={`border w-20 h-10 items-center ${selectedItemsCar.includes('Parachoque Dianteiro') ? 'border-blue-500' : 'border-transparent'}`}>
                        <TouchableOpacity
                          onPress={() => handleCheckBoxPressCar('Parachoque Dianteiro')}
                        >

                          <Image source={require('../assets/para_choque-traseiro.png')} className='w-16 h-10' />

                        </TouchableOpacity>
                      </View>
                    </View>

                    <View className='flex flex-col gap-2'>
                      <View className='flex flex-row justify-center'>
                        {/* Checkbox para-lama-traseiro-direito */}
                        <View className={`border w-12 h-12 pt-0.5 ${selectedItemsCar.includes('Paralama Tras L/D') ? 'border-blue-500' : 'border-transparent'}`}>
                          <TouchableOpacity
                            onPress={() => handleCheckBoxPressCar('Paralama Tras L/D')}
                          >

                            <Image source={require('../assets/para_lama-traseiro-direito.png')} className='w-11 h-12' />

                          </TouchableOpacity>
                        </View>

                        {/* Checkbox porta-traseira-direito */}
                        <View className={`border w-12 h-12 ${selectedItemsCar.includes('Porta Tras L/D') ? 'border-blue-500' : 'border-transparent'}`}>
                          <TouchableOpacity
                            onPress={() => handleCheckBoxPressCar('Porta Tras L/D')}
                          >

                            <Image source={require('../assets/porta-traseira-direita.png')} className='w-11 h-12' />

                          </TouchableOpacity>
                        </View>

                        {/* Checkbox porta-frontal-direito */}
                        <View className={`border w-12 h-12 ${selectedItemsCar.includes('Porta Diant L/D') ? 'border-blue-500' : 'border-transparent'}`}>
                          <TouchableOpacity
                            onPress={() => handleCheckBoxPressCar('Porta Diant L/D')}
                          >

                            <Image source={require('../assets/porta-dianteira-direita.png')} className='w-11 h-12' />

                          </TouchableOpacity>
                        </View>

                        {/* Checkbox para-lama-frontal-direito */}
                        <View className={`border w-12 h-12 ${selectedItemsCar.includes('Paralama Diant L/D') ? 'border-blue-500' : 'border-transparent'}`}>
                          <TouchableOpacity
                            onPress={() => handleCheckBoxPressCar('Paralama Diant L/D')}
                          >

                            <Image source={require('../assets/para_lama-dianteiro-direito.png')} className='w-12 h-12' />

                          </TouchableOpacity>
                        </View>
                      </View>

                      <View className='flex flex-row justify-center mt-4'>
                        {/* Checkbox para-lama-dianteiro-esquerdo */}
                        <View className={`border w-12 h-12 ${selectedItemsCar.includes('Paralama Diant L/E') ? 'border-blue-500' : 'border-transparent'}`}>
                          <TouchableOpacity
                            onPress={() => handleCheckBoxPressCar('Paralama Diant L/E')}
                          >

                            <Image source={require('../assets/para_lama-dianteiro-esquerdo.png')} className='w-11 h-12' />

                          </TouchableOpacity>
                        </View>

                        {/* Checkbox porta-dianteira-esquerda */}
                        <View className={`border w-12 h-12 ${selectedItemsCar.includes('Porta Diant L/E') ? 'border-blue-500' : 'border-transparent'}`}>
                          <TouchableOpacity
                            onPress={() => handleCheckBoxPressCar('Porta Diant L/E')}
                          >

                            <Image source={require('../assets/porta-dianteira-esquerda.png')} className='w-11 h-12' />

                          </TouchableOpacity>
                        </View>

                        {/* Checkbox porta-traseira-esquerda */}
                        <View className={`border w-12 h-12 ${selectedItemsCar.includes('Porta Tras L/E') ? 'border-blue-500' : 'border-transparent'}`}>
                          <TouchableOpacity
                            onPress={() => handleCheckBoxPressCar('Porta Tras L/E')}
                          >

                            <Image source={require('../assets/porta-traseira-esquerda.png')} className='w-11 h-12' />

                          </TouchableOpacity>
                        </View>

                        {/* Checkbox para-lama-traseiro-esquerdo */}
                        <View className={`border w-12 h-12 pt-0.5 ${selectedItemsCar.includes('Paralama Tras L/E') ? 'border-blue-500' : 'border-transparent'}`}>
                          <TouchableOpacity
                            onPress={() => handleCheckBoxPressCar('Paralama Tras L/E')}
                          >

                            <Image source={require('../assets/para_lama-traseiro-esquerdo.png')} className='w-11 h-12' />

                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    <View className='flex flex-col justify-center items-center gap-2'>
                      {/* Checkbox capo */}
                      <View className={`border w-16 h-12 items-center ${selectedItemsCar.includes('capo') ? 'border-blue-500' : 'border-transparent'}`}>
                        <TouchableOpacity
                          onPress={() => handleCheckBoxPressCar('capo')}
                        >

                          <Image source={require('../assets/capo.png')} className='w-16 h-10' />

                        </TouchableOpacity>
                      </View>

                      {/* Checkbox capo */}
                      <View className={`border w-14 h-14 items-center ${selectedItemsCar.includes('teto') ? 'border-blue-500' : 'border-transparent'}`}>
                        <TouchableOpacity
                          onPress={() => handleCheckBoxPressCar('teto')}
                        >

                          <Image source={require('../assets/teto.png')} className='w-14 h-14' />

                        </TouchableOpacity>
                      </View>

                      {/* Checkbox porta-malas */}
                      <View className={`border w-16 h-8 items-center ${selectedItemsCar.includes('Porta Malas') ? 'border-blue-500' : 'border-transparent'}`}>
                        <TouchableOpacity
                          onPress={() => handleCheckBoxPressCar('Porta Malas')}
                        >

                          <Image source={require('../assets/porta-malas.png')} className='w-16 h-8' />

                        </TouchableOpacity>
                      </View>

                    </View>
                  </View>
                  <View className='flex flex-row justify-center gap-16 mt-2'>
                    <View className='flex flex-col items-center mt-3'>
                      <Text className='text-md color-slate-800'>Vão de porta:</Text>
                      <View className='flex flex-row items-center gap-5 mt-2'>
                        {optionsPorta.map((option, index) => (
                          <TouchableOpacity
                            key={index}
                            className='flex flex-row items-start  mb-2 '
                            onPress={() => {
                              setSelectedOptionPorta(option)
                            }
                            }
                          >
                            {/* O círculo do radio button */}
                            <View
                              className='h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center mr-2'
                            >
                              {selectedOptionPorta === option ? (
                                <View
                                  className='h-3 w-3 rounded-full  bg-blue-500 '
                                />
                              ) : null}
                            </View>

                            {/* O texto do radio button */}
                            <Text className='text-base color-slate-700'>{option}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                    <View className='flex flex-col items-center mt-3'>
                      <Text className='text-md color-slate-800'>Pintura de roda:</Text>
                      <View className='flex flex-row items-center gap-5 mt-2'>
                        {optionsRoda.map((option, index) => (
                          <TouchableOpacity
                            key={index}
                            className='flex flex-row items-start  mb-2 '
                            onPress={() => {
                              setSelectedOptionRoda(option)
                            }}
                          >
                            {/* O círculo do radio button */}
                            <View
                              className='h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center mr-2'
                            >
                              {selectedOptionRoda === option ? (
                                <View
                                  className='h-3 w-3 rounded-full  bg-blue-500 '
                                />
                              ) : null}
                            </View>

                            {/* O texto do radio button */}
                            <Text className='text-base color-slate-700'>{option}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  </View>

                </View>

              )}

              <Text className='text-sm color-blue-950 font-semibold mt-5 pt-2 border-t border-red-200'>Informações complementares:</Text>
              <View className='flex flex-row justify-between'>
                <TextInput
                  placeholder='Prazo (dias úteis):'
                  value={prazo}
                  onChangeText={setPrazo}
                  onBlur={calcularDatas} // Chama a função quando o usuário para de digitar
                  keyboardType='numeric'
                  className='w-36 h-12 mb-2 bg-transparent border-b border-gray-300'
                />
                <View className='mr-4'>
                  <TextInput
                    placeholder='Início'
                    value={dataInicio} // Preenche com a data de início calculada
                    editable={false} // Impedir que o usuário edite diretamente
                    className='w-28 h-12 mb-2 bg-transparent border-b border-blue-300 color-blue-950'
                  />
                  <TextInput
                    placeholder='Término'
                    value={dataTermino} // Preenche com a data de término calculada
                    editable={false} // Impedir que o usuário edite diretamente
                    className='w-28 h-12 mb-2 bg-transparent border-b border-blue-300 color-blue-950'
                  />
                </View>
              </View>
              <View className='mt-8 pt-3 border-t border-red-200'>
                <TextInput
                  placeholder="Valor do serviço:"
                  value={valor}
                  onChangeText={handleValorChange}
                  onPress={handleVerifyCarParts}
                  keyboardType="numeric" // Permite apenas números
                  className="w-full h-12 mb-2 bg-transparent border-b border-blue-300"
                />
              </View>

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
