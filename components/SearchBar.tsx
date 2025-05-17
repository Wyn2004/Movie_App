import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants/icons";

interface SearchProps {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({
  placeholder,
  onPress,
  value,
  onChangeText,
}: SearchProps) => {
  return (
    <View className="flex-row items-center justify-center gap-4 rounded-full bg-dark-300 px-4 py-2">
      <Image
        source={icons.search}
        className="size-5"
        tintColor="#AB8BFF"
        resizeMode="contain"
      />
      <TextInput
        placeholder={placeholder}
        className="text-light-100 text-md flex-1 "
        onPress={onPress}
        value={value}
        placeholderTextColor="#a8b5db"
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchBar;
