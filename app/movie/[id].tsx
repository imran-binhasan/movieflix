import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import useFetch from '@/services/useFetch';
import { getMovieDetail } from '@/services/api';
import { icons } from '@/constants/icons';
import { Linking } from 'react-native';

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movieDetail } = useFetch(() =>
    getMovieDetail(id as string)
  );

  if (!movieDetail) return null;

  return (
    <View className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ paddingBottom: 48 }}>
        {/* Poster */}
        <View>
          <Image
            source={{
              uri: movieDetail.poster_path
                ? `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Image',
            }}
            className="w-full h-[500px]"
            resizeMode="cover"
          />

          {/* Play Button */}
          <TouchableOpacity className="absolute bottom-6 right-6 w-14 h-14 bg-white rounded-full items-center justify-center">
            <Image
              source={icons.play}
              className="w-6 h-6 ml-1"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View className="px-5 mt-6 gap-5">
          {/* Title */}
          <Text className="text-2xl font-medium text-white">
            {movieDetail.title}
          </Text>

          {/* Year • Runtime */}
          <View className="flex-row items-center gap-2">
            <Text className="text-gray-400">
              {movieDetail.release_date?.split('-')[0]}
            </Text>
            <Text className="text-gray-400">•</Text>
            <Text className="text-gray-400">
              {movieDetail.runtime
                ? `${Math.floor(movieDetail.runtime / 60)}h ${
                    movieDetail.runtime % 60
                  }m`
                : 'N/A'}
            </Text>
          </View>

          {/* Rating */}
          <View className="flex-row">
            <View className="flex-row items-center bg-dark-100 px-3 py-1.5 rounded-lg">
              <Image
                source={icons.star}
                className="w-4 h-4"
                resizeMode="contain"
              />
              <Text className="text-white font-semibold ml-2">
                {movieDetail.vote_average.toFixed(1)}
              </Text>
              <Text className="text-gray-300">/10</Text>
              <Text className="text-gray-300 ml-2">
                ({Math.round(movieDetail.vote_count)}K)
              </Text>
            </View>
          </View>

          {/* Overview */}
          <View className="gap-2">
            <Text className="text-lg font-semibold text-light-200">
              Overview
            </Text>
            <Text className="text-gray-300 leading-6">
              {movieDetail.overview}
            </Text>
          </View>

          {/* Release Date & Status */}
          <View className="flex-row justify-between mt-2">
            <View className="gap-1">
              <Text className="text-gray-400 text-sm">
                Release date
              </Text>
              <Text className="text-light-200">
                {movieDetail.release_date} (Worldwide)
              </Text>
            </View>

            <View className="gap-1">
              <Text className="text-gray-400 text-sm">Status</Text>
              <Text className="text-light-200">
                {movieDetail.status}
              </Text>
            </View>
          </View>

          {/* Genres */}
          <View className="gap-2">
            <Text className="text-gray-400 text-sm">Genres</Text>
            <View className="flex-row flex-wrap gap-2">
              {movieDetail.genres.map((genre) => (
                <View
                  key={genre.id}
                  className="bg-dark-100 px-3 py-1 rounded-md"
                >
                  <Text className="text-light-200 text-sm">
                    {genre.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Countries */}
          <View className="gap-2">
            <Text className="text-gray-400 text-sm">Countries</Text>
            <Text className="text-light-200 leading-6">
              {movieDetail.production_countries
                .map((c) => c.name)
                .join('  •  ')}
            </Text>
          </View>

          {/* Budget & Revenue */}
          <View className="flex-row justify-between mt-2">
            <View className="gap-1">
              <Text className="text-gray-400 text-sm">Budget</Text>
              <Text className="text-light-200">
                {movieDetail.budget
                  ? `$${(movieDetail.budget / 1_000_000).toFixed(
                      1
                    )} million`
                  : 'N/A'}
              </Text>
            </View>

            <View className="gap-1">
              <Text className="text-gray-400 text-sm">Revenue</Text>
              <Text className="text-light-200">
                {movieDetail.revenue
                  ? `$${(movieDetail.revenue / 1_000_000).toFixed(
                      0
                    )} Million`
                  : 'N/A'}
              </Text>
            </View>
          </View>

          {/* Tagline */}
          {movieDetail.tagline && (
            <View className="gap-2">
              <Text className="text-gray-400 text-sm">Tagline</Text>
              <Text className="text-light-200 italic">
                {movieDetail.tagline}
              </Text>
            </View>
          )}

          {/* Production Companies */}
          <View className="gap-2">
            <Text className="text-gray-400 text-sm">
              Production Companies
            </Text>
            <Text className="text-light-200 leading-6">
              {movieDetail.production_companies
                .map((company) => company.name)
                .join('  •  ')}
            </Text>
          </View>

          {/* Visit Homepage */}
          {movieDetail?.homepage && (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() =>
                Linking.openURL(movieDetail?.homepage as string)
              }
              className="mt-6 bg-light-100 py-3 rounded-lg flex-row items-center justify-center gap-2"
            >
              <Text className="text-primary font-semibold text-base">
                Visit Homepage
              </Text>
              <Text className="text-primary text-lg">→</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({});
