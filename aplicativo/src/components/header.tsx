import { View } from 'react-native';
import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight;

import { Avatar } from './avatar';
import { MenuButton } from './menu-button';
export function Header() {
 return (
   <View className='w-full h-auto flex-row items-center justify-between' style={{ paddingTop: statusBarHeight + 10}}>
    <MenuButton />
    <Avatar />
   </View>
  );
}