import { View, Text } from 'react-native';

export function ViewAtraso() {
 return (
    <View className='my-2 border-b border-red-300'>
        <View className='flex flex-row justify-between items-center mx-5 mb-2'>
        <Text className='text-sm font-bold color-red-500'>
          Serviços em ATRASO!
        </Text>
      </View>
    </View>
  );
}