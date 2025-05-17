import { images } from "@/constants/images";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import MovieCardSaved from "@/components/MovieCardSaved";
import EmptySaved from "@/components/EmptySaved";
import { fetchSavedMovies } from "@/services/appWrite";
import useFetch from "@/hooks/useFetch";
import { useIsFocused } from "@react-navigation/native";

const Saved = () => {
  const [filterActive, setFilterActive] = useState(false);
  const isFocused = useIsFocused();

  const {
    data: moviesSaved,
    isLoading,
    fetchData,
  } = useFetch(() => fetchSavedMovies(), true);

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  if (isLoading) return <ActivityIndicator />;

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full" />
      <SafeAreaView className="flex-1">
        <View className="px-5 flex-row items-center justify-between mt-4">
          <Text className="text-white text-2xl font-bold">My Watchlist</Text>
          <TouchableOpacity
            className="bg-light-300/20 p-2 rounded-full"
            onPress={() => setFilterActive(!filterActive)}
          >
            <Feather
              name={filterActive ? "filter" : "sliders"}
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>

        {moviesSaved && moviesSaved.length === 0 ? (
          <EmptySaved />
        ) : (
          <FlatList
            data={moviesSaved}
            renderItem={({ item }) => (
              <MovieCardSaved item={item} reFetch={() => fetchData()} />
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ padding: 20 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

export default Saved;
