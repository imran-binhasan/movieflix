import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { getMovieLists } from '@/services/api'
import useFetch from '@/services/useFetch'
import { useRouter } from 'expo-router'
import React from 'react'
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'

const index = () => {
  const router = useRouter();

  const { data: movies, loading: moviesLoading, error: moviesError, refetch } = useFetch(() => getMovieLists({ query: '' }))
  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='w-full z-0 absolute' />
      <ScrollView className='flex-1 px-4' showsVerticalScrollIndicator={false} contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}>
        <Image source={icons.logo} className='w-12 h-10 mx-auto mt-20 mb-5' />


        {moviesLoading ? (<ActivityIndicator size="large" color="#0000ff" className='mt-10 self-center' />)
          : moviesError ? (
            <Text>Error: {moviesError}</Text>)
            : (<View className='flex-1 mt-5'>
              <SearchBar onPress={() => router.push('/search')} placeholder="Search for Movies, TV Shows..." />
              <>
                <Text className='text-llg text-gray-400 font-medium mt-5 mb-3'>Latest Movies</Text>
                <FlatList 
                data={movies} 
                renderItem={({item}) => (
                <MovieCard {...item}/>)}
                keyExtractor={(item)=> item.id}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: 'flex-start',
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                scrollEnabled={false}
                />
              </>
            </View>)}
      </ScrollView>
    </View>
  )
}

export default index;