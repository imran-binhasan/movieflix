import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'


const MovieCard = ({ id, title, poster_path, vote_average, vote_count, video, release_date, popularity }: Movie) => {
    return (
        <Link href={`/movie/${id}`} asChild>
            <TouchableOpacity className='w-[30%]'>
                <Image 
                source={{ uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : `https://placehold.co/600x400/1a1a1a/ffffff.png` }} 
                className='w-full h-52 rounded-lg' resizeMode='cover' />
                <Text className='text-gray-400 mt-1 text-sm font-medium'>{title}</Text>
            </TouchableOpacity>
        </Link>
    )
}

export default MovieCard

const styles = StyleSheet.create({})