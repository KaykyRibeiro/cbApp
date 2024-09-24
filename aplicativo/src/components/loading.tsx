import React from 'react';
import { ActivityIndicator } from 'react-native';

export function Loading() {
 return (
   <ActivityIndicator size={50} className='flex-1 bg-white color-blue-500 justify-center items-center' />
  );
}