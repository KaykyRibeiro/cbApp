import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function Login() {
  const [inputUser, setInputUser] = useState(''); // Estado para armazenar o valor inserido pelo usuário
  const [inputPassword, setInputPassword] = useState(''); // Estado para armazenar a senha inserida
  const [apiUsers, setApiUsers] = useState([]); // Estado para armazenar os dados retornados da API
  const router = useRouter();

  useEffect(() => {
    // Função para buscar os dados da API
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://cbappservice-99860148466.us-central1.run.app/user/get'); // URL ajustada para buscar a tabela de usuários
        setApiUsers(response.data);
      } catch (error) {
        console.error('Erro ao buscar os dados dos usuários', error);
      }
    };

    fetchUsers();
  }, []);

  const handleLogin = async () => {
    // Verifica se o usuário inserido existe na lista de usuários retornada pela API e se a senha está correta
    const userFound = apiUsers.find(
      (user: { nomeUsuario: string; senha: string }) => 
        user.nomeUsuario === inputUser && user.senha === inputPassword
    );

    if (userFound) {
      // Salva as informações do usuário
      await AsyncStorage.setItem('user', JSON.stringify({ inputUser }));

      // Redireciona para a tela de detalhes
      router.push('/(drawer)/(tabs)');
    } else {
      alert('Insira dados válidos!');
    }
  };

  return (
    <View style={{ flex: 1 }} className='flex justify-center items-center'>
      <View className="flex justify-center items-center rounded-lg h-auto shadow-xl bg-white p-3">
        <Image source={require('../assets/logo-cb.png')} className='w-24 h-24 rounded' />
        <TextInput
          className="w-80 h-12 border-b border-gray-300 rounded-md px-4 mb-4"
          placeholder="User"
          value={inputUser}
          onChangeText={setInputUser} // Atualiza o estado com o valor inserido pelo usuário
        />
        <TextInput
          className="w-80 h-12 border-b border-gray-300 rounded-md px-4"
          placeholder="Senha"
          secureTextEntry={true}
          value={inputPassword}
          onChangeText={setInputPassword} // Atualiza o estado com a senha inserida
        />
        <View className='flex justify-start w-80 px-2'>
          <Pressable>
            <Text className='text-[10px] color-blue-400'>Esqueceu a senha?</Text>
          </Pressable>
        </View>
        <Pressable
          className='mt-6 border border-gray-400 w-52 p-1 justify-center items-center rounded-lg'
          onPress={handleLogin}
        >
          <Text className='font-semibold color-gray-500'>Entrar</Text>
        </Pressable>
      </View>
    </View>
  );
}
