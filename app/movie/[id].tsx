import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import useFetch from "@/hooks/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants/icons";
import MovieInfo from "@/components/MovieInfo";
import { saveMovie } from "@/services/appWrite";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: movieDetail, isLoading } = useFetch(() =>
    fetchMovieDetails({ movieId: id.toString() })
  );

  const handleSaveMovie = async (movie: Movie) => {
    await saveMovie(movie);
  };

  if (isLoading)
    return (
      <SafeAreaView className="bg-primary flex-1">
        <ActivityIndicator />
      </SafeAreaView>
    );

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View className="relative mb-5">
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movieDetail?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
          <View className="absolute -bottom-12 right-1 flex-row space-x-3 justify-between w-full p-5">
            <TouchableOpacity className="rounded-full size-14 bg-white flex items-center justify-center">
              <Image
                source={icons.play}
                className="w-6 h-7 ml-1"
                resizeMode="stretch"
              />
            </TouchableOpacity>

            <TouchableOpacity
              className="rounded-full size-14 bg-accent flex items-center justify-center"
              onPress={() => handleSaveMovie(movieDetail as unknown as Movie)}
            >
              <Image source={icons.save} className="w-6 h-6" tintColor="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">
            {movieDetail?.title}
          </Text>

          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movieDetail?.release_date?.split("-")[0]} •
            </Text>
            <Text className="text-light-200 text-sm">
              {movieDetail?.runtime}m
            </Text>
          </View>

          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />

            <Text className="text-white font-bold text-sm">
              {Math.round(movieDetail?.vote_average ?? 0)}/10
            </Text>

            <Text className="text-light-200 text-sm">
              ({movieDetail?.vote_count} votes)
            </Text>
          </View>

          <MovieInfo label="Overview" value={movieDetail?.overview} />
          <MovieInfo
            label="Genres"
            value={movieDetail?.genres?.map((g) => g.name).join(" • ") || "N/A"}
          />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${(movieDetail?.budget ?? 0) / 1_000_000} million`}
            />

            <MovieInfo
              label="Revenue"
              value={`$${Math.round(
                (movieDetail?.revenue ?? 0) / 1_000_000
              )} million`}
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={
              movieDetail?.production_companies
                ?.map((c) => c.name)
                .join(" • ") || "N/A"
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
