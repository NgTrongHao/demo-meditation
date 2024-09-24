import { View, Text, Pressable } from "react-native";
import React from "react";
import LinearLayout from "@/components/LinearLayout";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { TimerContext } from "@/context/TimerContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AdjustMeditationDuration = () => {
  const { setDuration } = React.useContext(TimerContext);

  const handlePress = async (duration: number) => {
    setDuration(duration);
    await AsyncStorage.setItem("meditationDuration", String(duration));
    router.back();
  };

  return (
    <View className="flex-1 relative">
      <LinearLayout colors={["#161b2e", "#0a4d4a", "#766e67"]}>
        <Pressable
          onPress={() => router.back()}
          className="absolute top-6 left-6 z-10"
        >
          <AntDesign name="leftcircleo" size={24} color="white" />
        </Pressable>
        <View className="justify-center h-4/5">
          <Text className="text-white text-center font-bold mb-8 text-2xl">
            Adjust Meditation Duration
          </Text>
          <View>
            <CustomButton
              title="10 seconds"
              onPress={() => handlePress(10)}
              containerStyle="mb-5"
            />
            <CustomButton
              title="1 minute"
              onPress={() => handlePress(60)}
              containerStyle="mb-5"
            />
            <CustomButton
              title="5 minutes"
              onPress={() => handlePress(5 * 60)}
              containerStyle="mb-5"
            />
            <CustomButton
              title="10 minutes"
              onPress={() => handlePress(10 * 60)}
              containerStyle="mb-5"
            />
          </View>
        </View>
      </LinearLayout>
    </View>
  );
};

export default AdjustMeditationDuration;
