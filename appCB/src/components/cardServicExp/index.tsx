import { Pressable, View, Text, Image } from 'react-native';

export function CardServicExp() {
 return (
    <Pressable
        className='bg-white h-auto rounded-lg m-5 px-2 py-1 flex flex-row justify-start shadow-lg shadow-red-500/40 border-b border-red-400 '
    >
      <View className='mr-2 flex justify-center items-center'>
        <Image
          className='w-16 h-16 rounded-full bg-black'
        />
      </View>
      <View className='flex flex-grow justify-start gap-2'>
        <View>
          <Text className='text-xl font-semibold'>Celta vermelho 2009</Text>
          <Text className='text-sm color-slate-500'>Pintura, polimento e Limpez interna</Text>
        </View>
        <View className='flex flex-row justify-start items-center'>
          <Text className='text-md color-red-500'>20/12/2024</Text>
          <Text className='mx-2'>até</Text>
          <Text className='text-md color-red-500'>01/01/2025</Text>
        </View>
      </View>
      
        
    </Pressable>
  );
}