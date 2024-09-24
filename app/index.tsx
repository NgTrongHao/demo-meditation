import { View, Text, ImageBackground, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import LinearLayout from "@/components/LinearLayout";

const App = () => {
  const router = useRouter();
  return (
    <View className="flex-1">
      <ImageBackground
        source={require("../assets/meditation-images/beach.webp")}
        resizeMode="cover"
        className="flex-1"
      >
        <LinearLayout colors={["rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.8)"]}>
          <SafeAreaView className="flex-1 mx-5 my-8 justify-between">
            <View>
              <Text className="text-center text-white font-bold text-2xl">
                Home Screen
              </Text>
              <Text className="text-center text-white text-lg">
                Welcome to the Home Screen
              </Text>
            </View>
            <View>
              <CustomButton
                onPress={() => router.push("/nature-meditate")}
                title="Press Me"
              />
            </View>
          </SafeAreaView>
        </LinearLayout>
      </ImageBackground>
    </View>
  );
};

export default App;
