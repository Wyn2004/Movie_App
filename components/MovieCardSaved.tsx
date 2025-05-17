import { Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { Feather } from "@expo/vector-icons";
import { unsaveMovie } from "@/services/appWrite";

export interface MovieCardSavedProps {
  poster_url: string;
  title: string;
  year: string;
  rating: number;
  id: number;
}
const MovieCardSaved = ({
  item,
  reFetch,
}: {
  item: MovieCardSavedProps;
  reFetch: () => Promise<void>;
}) => {
  const handleRemoveMovie = async () => {
    await unsaveMovie(item.id.toString());
    await reFetch();
  };

  return (
    <TouchableOpacity className="flex-row bg-dark-100/80 rounded-xl mb-4 overflow-hidden">
      <Image
        source={{ uri: item.poster_url }}
        className="w-24 h-36"
        resizeMode="cover"
      />
      <View className="p-3 flex-1 justify-between">
        <View>
          <Text className="text-white font-bold text-lg" numberOfLines={1}>
            {item.title}
          </Text>
          <View className="flex-row items-center mt-1">
            <Text className="text-light-300 text-sm">{item.year}</Text>
            <View className="flex-row items-center ml-3">
              <Image source={icons.star} className="w-3 h-3 mr-1" />
              <Text className="text-light-200 text-sm">
                {Math.round(item.rating)}/10
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row justify-between items-center mt-2">
          <TouchableOpacity
            className="bg-accent/20 rounded-full p-2"
            onPress={() => {
              /* Play movie */
            }}
          >
            <Feather name="play" size={16} color="#ABABFF" />
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-light-300/10 rounded-full p-2"
            onPress={handleRemoveMovie}
          >
            <Feather name="trash-2" size={16} color="#A8B5DB" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCardSaved;
