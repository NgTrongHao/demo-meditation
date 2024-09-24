import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import React from "react";

import { MEDITATION_DATA } from "@/constants/meditation-data";
import meditationImages from "@/constants/meditation-images";
import LinearLayout from "@/components/LinearLayout";
import { router } from "expo-router";

const NatureMeditate = () => {
  return (
    <View className="flex-1">
      <LinearLayout colors={["#161b2e", "#0a4d4a", "#766e67"]}>
        <View className="mb-4">
          <Text className="text-gray-200 mb-3 font-semibold text-4xl text-left">
            NatureMeditate
          </Text>
          <Text className="text-indigo-100 text-base font-medium">
            Start your meditation practice today
          </Text>
        </View>
        <View className="h-full pb-20">
          <FlatList
            data={MEDITATION_DATA}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => router.push(`/meditate/${item.id}`)}
                className="h-48 my-3 rounded-md overflow-hidden object-cover"
              >
                <Text>{item.title}</Text>
                <ImageBackground
                  source={meditationImages[item.id - 1]}
                  className="flex-1 rounded-lg justify-center"
                  resizeMode="cover"
                >
                  <Text className="text-white text-center text-2xl font-semibold">
                    {item.title}
                  </Text>
                </ImageBackground>
              </Pressable>
            )}
          />
        </View>
      </LinearLayout>
    </View>
  );
};

export default NatureMeditate;
