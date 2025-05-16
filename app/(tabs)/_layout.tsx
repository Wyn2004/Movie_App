import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

const _Layout = () => {
  const TabBarIcon = ({
    focused,
    icon,
    label,
  }: {
    focused: boolean;
    icon: any;
    label: string;
  }) => {
    if (focused) {
      return (
        <ImageBackground
          source={images.highlight}
          className="flex flex-row items-center justify-center rounded-full w-full flex-1 min-w-28 min-h-16 mt-4 overflow-hidden"
        >
          <Image source={icon} tintColor="#151312" className="size-6" />
          <Text className="text-secondary text-base font-semibold ml-2">
            {label}
          </Text>
        </ImageBackground>
      );
    }
    return (
      <View className="flex flex-row items-center justify-center rounded-full w-full flex-1 min-w-28 min-h-14 mt-4 overflow-hidden">
        <Image source={icon} tintColor="#A8B5DB" className="size-5" />
      </View>
    );
  };
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#151312",
          borderRadius: 50,
          height: 52,
          marginHorizontal: 20,
          marginBottom: 36,
          overflow: "hidden",
          position: "absolute",
          borderColor: "0f0d23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => {
            return (
              <TabBarIcon focused={focused} icon={icons.home} label="Home" />
            );
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ focused }) => {
            return (
              <TabBarIcon
                focused={focused}
                icon={icons.search}
                label="Search"
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,
          title: "Saved",
          tabBarIcon: ({ focused }) => {
            return (
              <TabBarIcon focused={focused} icon={icons.save} label="Saved" />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused }) => {
            return (
              <TabBarIcon
                focused={focused}
                icon={icons.person}
                label="Profile"
              />
            );
          },
        }}
      />
    </Tabs>
  );
};

export default _Layout;

const styles = StyleSheet.create({});
