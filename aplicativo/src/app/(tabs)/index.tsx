import { View, Text } from 'react-native';
import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight;

import { MenuButton } from '../../components/menu-button';
import { Avatar } from '../../components/avatar';

export default function Home() {
 return (
   <View className='flex-1 p-4 bg-white'>
    <View className='w-full h-auto flex-row items-center justify-between' style={{ paddingTop: statusBarHeight + 10}}>
      <MenuButton />
      <Avatar source={{ uri: 'https://github.com/orodrigo.png'}} size='small'/>
    </View>
   </View>
  );
}