import { Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";
const EmptySaved = () => {
  const router = useRouter();
  return (
    <Animated.View
      entering={FadeInDown.delay(300).duration(500)}
      className="flex justify-center items-center flex-1 flex-col gap-5 px-6"
    >
      <View className="bg-light-300/20 p-8 rounded-full mb-2">
        <Image source={icons.save} className="w-12 h-12" tintColor="#fff" />
      </View>
      <Text className="text-white text-xl font-bold text-center">
        Your Watchlist is Empty
      </Text>
      <Text className="text-gray-400 text-base text-center">
        Save your favorite movies to watch later
      </Text>
      <TouchableOpacity
        className="bg-accent py-3 px-8 rounded-full mt-4"
        onPress={() => router.push("/")}
      >
        <Text className="text-white font-bold">Discover Movies</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default EmptySaved;
