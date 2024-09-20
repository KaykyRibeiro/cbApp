import { Pressable, View, Image, Text } from 'react-native';

export function Navbar() {
 return (
    <View 
      className='bg-white flex flex-row justify-between items-center w-full h-28 px-8 pb-1 shadow-md shadow-blue-500/40' 
    >
      <Pressable className='flex justify-center items-center mx-2'>
        <Image/>
        <Text className='color-red-700'>
          Inicio
        </Text>
      </Pressable>
      <Pressable className='flex justify-center items-center mx-2'>
        <Image/>
        <Text className='color-red-700'>
          Pesquisa
        </Text>
      </Pressable>
      <Pressable className='flex justify-center items-center mx-2'>
        <Image/>
        <Text className='color-red-700'>
          Gerencia
        </Text>
      </Pressable>
    </View>
  );
}