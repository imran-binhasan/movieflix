import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { icons } from '@/constants/icons'


const MovieCard = ({ id, title, poster_path, vote_average, release_date, popularity }: Movie) => {
    return (
        <Link href={`/movie/${id}`} asChild>
            <TouchableOpacity className='w-[30%]'>
                <Image
                    source={{ uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : `https://placehold.co/600x400/1a1a1a/ffffff.png` }}
                    className='w-full h-52 rounded-lg' resizeMode='cover' />
                <Text className='text-gray-400 mt-1 text-sm font-medium'>{title}</Text>
                <View className='flex-row items-center justify-start gap-x-2'>
                    <View className='flex-row items-center gap-x-1 justify-start'>
                        <Image source={icons.star} className='w-4 h-4' />
                        <Text className='text-xs text-gray-400'>{Math.round(vote_average)}</Text>
                    </View>
                    <Text className='text-light-300 text-xs'>{release_date.split('-')[0]}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    )
}

export default MovieCard

const styles = StyleSheet.create({})