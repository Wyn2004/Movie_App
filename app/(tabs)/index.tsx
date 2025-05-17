/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import { fetchMovies } from "@/services/api";
import { useRouter } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import MovieCard from "@/components/MovieCard";
import { fetchTrendingMovies } from "@/services/appWrite";
import MovieCardTrending from "@/components/MovieCardTrending";

export default function Index() {
  const router = useRouter();
  const isFocused = useIsFocused();

  const {
    data: trendingMovies,
    error: trendingMoviesError,
    fetchData: fetchTrendingData,
  } = useFetch(() => fetchTrendingMovies());

  useEffect(() => {
    if (isFocused) {
      fetchTrendingData();
    }
  }, [isFocused]);

  const {
    data: movies,
    isLoading: movieLoading,
    error: movieError,
  } = useFetch(() => fetchMovies({ query: "" }));

  const handleSearch = () => {
    router.push("/search");
  };

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {movieLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000fff"
            className="mt-10 self-center"
          />
        ) : movieError || trendingMoviesError ? (
          <Text className="text-white">Error: {movieError}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={handleSearch}
              placeholder="Search through 300+ movies online"
            />
            <>
              {trendingMovies && trendingMovies?.length > 0 && (
                <>
                  <Text className="text-white font-bold text-lg mt-5 mb-3">
                    Popular Movies
                  </Text>
                  <FlatList
                    data={trendingMovies}
                    keyExtractor={(item) => item.movie_id + ""}
                    renderItem={({ item, index }) => (
                      <MovieCardTrending
                        movie_id={item.movie_id.toString()}
                        title={item.title}
                        poster_url={item.poster_url}
                        index={index}
                      />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View className="w-8" />}
                    className="mb-5"
                  />
                </>
              )}
              <Text className="text-white font-bold text-lg mt-5 mb-3">
                Latest Movies
              </Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 24,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
