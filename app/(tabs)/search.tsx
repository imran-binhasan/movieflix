import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import useFetch from '@/services/useFetch'
import { getMovieLists } from '@/services/api'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'

const search = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const { data: movies, loading: moviesLoading, error: moviesError, refetch, reset } = useFetch(() => getMovieLists({ query: searchQuery }), false); 

  useEffect(() => {

    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await refetch();
      } else {
        reset();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute z-0 w-full' />
      <FlatList
        data={movies} renderItem={
          ({ item }) => <MovieCard {...item} />
        }
        numColumns={3}
        keyExtractor={(item) => item.id}
        className='px-5 my-24'
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 20,
          paddingRight: 5,
          marginVertical: 20,
        }}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListHeaderComponent={
          <>
            <View className='w-full justify-center flex-row mt-10'>
              <Image source={icons.logo} className='w-12 h-10' />
            </View>
            <View className='my-5'>
              <SearchBar 
              placeholder='Search for Movies, TV Shows...' 
              value={searchQuery} 
              onChangeText={(text: string) => setSearchQuery(text)} />
            </View>
            {moviesLoading && (
              <ActivityIndicator size="large" color="#0000ff" className='mt-10 self-center' />
            )}

            {moviesError && (
              <Text className='text-center text-red-400 my-4'>Error: {moviesError}</Text>
            )}

            {!moviesLoading && !moviesError &&  searchQuery.trim() !== '' && movies?.length > 0 && (
              <Text className=' text-gray-400 my-4'>
                Search Results for {' '}
                <Text className='text-accent font-medium'>{searchQuery}</Text>
                </Text>
            )}

          </>
        }
      />
    </View>
  )
}

export default search

const styles = StyleSheet.create({})