import { View, Text } from 'react-native';
import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight;

import { MenuButton } from '../../components/menu-button';
import { Avatar } from '../../components/avatar';
import { CardServic } from '../../components/cardServic';

export default function Home() {
  return (
    <View className='flex-1 p-4 bg-white'>
      <View className='w-full h-auto flex-row items-center justify-between' style={{ paddingTop: statusBarHeight + 10 }}>
        <MenuButton />
        <Avatar source={{ uri: 'https://github.com/orodrigo.png' }} size='small' />
      </View>
      <View>
        <View
          className='mt-5 border-b border-gray-300'
        >
          <View className='flex flex-row justify-between items-center mx-5 mb-2'>
            <Text className='text-sm font-bold color-gray-500'>
              Serviços em andamento
            </Text>
          </View>
        </View>
      </View>
      <View>
        <CardServic />
      </View>
    </View>
  );
}