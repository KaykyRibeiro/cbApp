import { Pressable, View, Text } from 'react-native';

export function CardServic() {
 return (
    <Pressable
        className='bg-white h-auto rounded-lg m-5 px-2 py-1 flex justify-start'
    >
        <Text className='text-xl font-semibold'>Celta vermelho 2009</Text>
        <Text className='text-sm color-slate-500'>Pintura, polimento e Limpez interna</Text>
    </Pressable>
  );
}