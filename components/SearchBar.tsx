import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

type Props = {
    onPress?: () => void;
    placeholder: string;
}

const SearchBar = ({onPress, placeholder}: Props) => {
    return (
        <View className='flex-row bg-dark-200 px-5 py-2.5 gap-2 justify-between items-center rounded-full'>
            <Image source={icons.search} className='size-5' resizeMode='contain' tintColor='#ab8bff'/>
            <TextInput
             onPress={onPress}
             placeholder={placeholder}
             value=''
             onChangeText={()=>{}}
             placeholderTextColor="#a8b5db"
             className='flex-1 text-white'
            />
        </View>
    )
}

export default SearchBar