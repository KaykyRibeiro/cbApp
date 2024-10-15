// app/login.tsx
import React, { useState } from 'react';
import { View, Text, Pressable, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (user === 'admin' && password === 'admin') {
      // Salva as informações do usuário
      await AsyncStorage.setItem('user', JSON.stringify({ user }));
      
      // Redireciona para a tela de detalhes
      router.push('/(drawer)/(tabs)');
    } else {
      alert('Insira dados válidos!');
    }
  };

  return (
    <View style={{ flex: 1 }} className='flex justify-center items-center'>
      <View className="flex justify-center items-center rounded-lg h-auto shadow-xl bg-white p-3">
        <Image source={require('../assets/logo-cb.png')} className='w-24 h-24 rounded'/>
        <TextInput 
          className="w-80 h-12 border-b border-gray-300 rounded-md px-4 mb-4" 
          placeholder="User"
          onChangeText={setUser}
        />
        <TextInput 
          className="w-80 h-12 border-b border-gray-300 rounded-md px-4" 
          placeholder="Senha" 
          secureTextEntry={true}
          onChangeText={setPassword}
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
