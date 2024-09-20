import { Pressable, View, Image, Text } from 'react-native';
import { Ionicons, Feather, FontAwesome6, Entypo   } from '@expo/vector-icons';
export function Navbar() {
 return (
    <View 
      className='bg-white flex flex-row justify-between items-center w-full h-28 px-8 pb-1 shadow-md shadow-blue-500/40' 
    >
      <Pressable className='flex justify-center items-center mx-2'>
        <Ionicons name="home" size={24} color="#dc2626"/>
        <Text className='color-red-700'>
          Inicio
        </Text>
      </Pressable>
      <Pressable className='flex justify-center items-center mx-2'>
        <FontAwesome6 name="magnifying-glass" size={24} color="#9ca3af"/>
        <Text className='color-gray-500'>
          Pesquisa
        </Text>
      </Pressable>
      <Pressable className='flex justify-center items-center mx-2'>
        <Entypo name="shop" size={24} color="#9ca3af"/>
        <Text className='color-gray-500'>
          Gerencia
        </Text>
      </Pressable>
    </View>
  );
}