import { View, Pressable, Text, Image } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight;

export function Header() {
 return (
    <View 
        className='bg-white flex flex-row justify-between items-center w-full mb-4 px-4 pb-1 shadow-lg shadow-blue-500/40' 
        style={{ paddingTop: statusBarHeight + 10}}
    >
        <Image 
            source={require('../../assets/logo-cb.png')} 
            className='w-12 h-12 rounded'
        />
        <Pressable>
            <Image 
                source={require('../../assets/perfil.png')} 
                className='w-12 h-12 rounded-full'
            />
        </Pressable>
    </View>
  );
}