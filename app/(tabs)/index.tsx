import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import { fetchMovies } from "@/services/api";
import { useRouter } from "expo-router";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

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
        ) : movieError ? (
          <Text>Error: {movieError}</Text>
        ) : (
          <View className="flex-1 justify-between items-center">
            <SearchBar
              onPress={handleSearch}
              placeholder="Search through 300+ movies online"
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
