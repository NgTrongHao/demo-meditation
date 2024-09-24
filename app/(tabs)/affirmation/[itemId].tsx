import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { GalleryPreviewData } from "@/constants/models/AffirmationCategory";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";
import LinearLayout from "@/components/LinearLayout";
import AntDesign from "@expo/vector-icons/AntDesign";

const AffirmationPractice = () => {
  const { itemId } = useLocalSearchParams();
  const router = useRouter();
  const [affirmation, setAffirmation] = useState<GalleryPreviewData>();
  const [sentences, setSentences] = useState<string[]>([]);

  useEffect(() => {
    for (let idx = 0; idx < AFFIRMATION_GALLERY.length; idx++) {
      const affirmationData = AFFIRMATION_GALLERY[idx].data;
      const found = affirmationData.find(
        (affirmation) => affirmation.id === Number(itemId)
      );
      if (found) {
        setAffirmation(found);
        const affirmationArray = found.text.split(".");

        //Remove the last element if it's empty string
        if (affirmationArray[affirmationArray.length - 1] === "") {
          affirmationArray.pop();
        }

        setSentences(affirmationArray);

        break;
      }
    }
  }, [itemId]);

  return (
    <View className="flex-1">
      <ImageBackground
        source={affirmation?.image}
        resizeMode="cover"
        className="flex-1"
      >
        <LinearLayout colors={["rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.8)"]}>
          <Pressable
            onPress={() => router.back()}
            className="absolute top-8 left-6 z-10"
          >
            <AntDesign name="back" size={24} color="white" />
          </Pressable>
          <ScrollView className="flex-1 mx-5 my-8">
            <View className="h-full justify-center mb-12">
              <View className="h-4/5justify-center">
              {sentences.map((sentence, idx) => (
                <Text key={idx} className="text-center text-white text-xl mb-12">
                  {sentence}.
                </Text>
              ))}
              </View>
            </View>
          </ScrollView>
        </LinearLayout>
      </ImageBackground>
    </View>
  );
};

export default AffirmationPractice;
