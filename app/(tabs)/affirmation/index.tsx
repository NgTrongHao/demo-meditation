import { View, Text, ScrollView } from "react-native";
import React from "react";
import LinearLayout from "@/components/LinearLayout";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";
import GuidedAffirmationGallery from "@/components/GuidedAffirmationGallery";

const Affirmation = () => {
  return (
    <View className="flex-1">
      <LinearLayout colors={["#2e1f58", "#54426b", "#a790af"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="text-zinc-100 text-3xl font-bold">
            Change your beliefs with affirmation
          </Text>
          <View>
            {AFFIRMATION_GALLERY.map((gallery) => (
              <GuidedAffirmationGallery
                key={gallery.title}
                title={gallery.title}
                previews={gallery.data}
              />
            ))}
          </View>
        </ScrollView>
      </LinearLayout>
    </View>
  );
};

export default Affirmation;
