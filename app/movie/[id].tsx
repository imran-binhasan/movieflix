import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import useFetch from '@/services/useFetch';
import { getMovieDetail } from '@/services/api';
import { icons } from '@/constants/icons';


const MovieDetails = () => {

  const { id } = useLocalSearchParams();
  const { data: movieDetail, loading: movieLoading, error: moviesError } = useFetch(() => getMovieDetail(id as string));


  return (
    <View className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View>
          <Image source={{ uri: movieDetail?.poster_path ? `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image' }} className='w-full h-[500px]' resizeMode='cover' />
          <TouchableOpacity className='absolute bottom-5 right-5 size-14 bg-white rounded-full items-center justify-center'>
            <Image source={icons.play} className='w-6 h-7 ml-1' resizeMode='stretch' />
          </TouchableOpacity>
        </View>

        <View className='flex-col items-start justify-center px-5 mt-6'>
          <Text className='text-2xl font-medium text-light-200'>
            {movieDetail?.title}
          </Text>
          <View className='flex-row items-center  gap-2'>
            <Text className='text-gray-300 mt-3 text-xl'>
              {movieDetail?.release_date.split('-')[0]}
            </Text>
            <Text className='text-gray-300 mt-3 text-xl'>
              &#8226;
            </Text>
            <Text className='text-gray-300 mt-3 text-xl'>
              {movieDetail?.runtime}m
            </Text>
          </View>

                    <View className='flex-row items-center  gap-2'>
            <Text className='text-gray-300 mt-3 text-xl'>
              {movieDetail?.release_date.split('-')[0]}
            </Text>
            <Text className='text-gray-300 mt-3 text-xl'>
              &#8226;
            </Text>
            <Text className='text-gray-300 mt-3 text-xl'>
              {movieDetail?.runtime}m
            </Text>
          </View>
        
        </View>
      </ScrollView>
    </View>
  )
}

export default MovieDetails

const styles = StyleSheet.create({})