import { View, Text, ImageBackground, Pressable } from "react-native";
import React, { useContext, useEffect } from "react";
import meditationImages from "@/constants/meditation-images";
import LinearLayout from "@/components/LinearLayout";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams, useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { Audio } from "expo-av";
import { AUDIO_FILES, MEDITATION_DATA } from "@/constants/meditation-data";
import { TimerContext } from "@/context/TimerContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Meditate = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { duration: secondsRemaining, setDuration } = useContext(TimerContext);
  // const [secondsRemaining, setSecondsRemaining] = React.useState(10);
  const [isMeditating, setMeditating] = React.useState(false);
  const [audioSound, setAudioSound] = React.useState<Audio.Sound>();
  const [isPlayingAudio, setPlayingAudio] = React.useState(false);

  React.useEffect(() => {
    let timerId: NodeJS.Timeout;

    // Exit early when we reach 0
    if (secondsRemaining === 0) {
      setMeditating(false);
      return;
    }

    if (isMeditating) {
      // Save the interval ID to clear it when the component unmounts
      timerId = setTimeout(() => {
        setDuration(secondsRemaining - 1);
      }, 1000);
    }

    // Clear timeout if the component is unmounted or the time left changes
    return () => {
      clearTimeout(timerId);
    };
  }, [secondsRemaining, isMeditating]);

  async function toggleMeditationSessionStatus() {
    if (secondsRemaining === 0) setDuration(10);

    setMeditating(!isMeditating);

    await togglePlayPause();
  }

  const togglePlayPause = async () => {
    const sound = audioSound ? audioSound : await playSound();

    const status = await sound?.getStatusAsync();

    if (status?.isLoaded && !isPlayingAudio) {
      await sound?.playAsync();
      setPlayingAudio(true);
    } else {
      await sound?.pauseAsync();
      setPlayingAudio(false);
    }
  };

  const playSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;

    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);
    setAudioSound(sound);
    return sound;
  };

  const handleAdjustDuration = () => {
    if (isMeditating) {
      setMeditating(false);
    }
    router.push("/(modals)/adjust-meditation-duration");
  };

  // Format the timeLeft to ensure two digits are displayed
  const formattedTimeMinutes = String(
    Math.floor(secondsRemaining / 60)
  ).padStart(2, "0");
  const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, "0");

  useEffect(() => {
    const retrieveDuration = async () => {
      try {
        const savedDuration = await AsyncStorage.getItem("meditationDuration");
        if (savedDuration) {
          setDuration(Number(savedDuration));
        } else {
          setDuration(10);
        }
      } catch (error) {
        console.error("Failed to retrieve duration from storage", error);
      }
    };

    retrieveDuration();
  }, [setDuration]);

  return (
    <View className="flex-1">
      <ImageBackground
        source={meditationImages[Number(id) - 1]}
        resizeMode="cover"
        className="flex-1"
      >
        <LinearLayout colors={["transparent", "rgba(0, 0, 0, 0.8)"]}>
          <Pressable
            onPress={() => router.back()}
            className="absolute top-6 left-6 z-10"
          >
            <AntDesign name="leftcircleo" size={24} color="white" />
          </Pressable>
          <View className="flex-1 justify-center">
            <View className="mx-auto bg-neutral-200 rounded-full w-60 h-60 justify-center items-center">
              <Text className="text-4xl text-cyan-500 font-rmono">
                {formattedTimeMinutes}:{formattedTimeSeconds}
              </Text>
            </View>
          </View>
          <View className="mb-5">
            <CustomButton
              title="Adjust Duration"
              onPress={handleAdjustDuration}
            />
            <CustomButton
              title={isMeditating ? "Pause" : "Start"}
              onPress={toggleMeditationSessionStatus}
              containerStyle="mt-4"
            />
          </View>
        </LinearLayout>
      </ImageBackground>
    </View>
  );
};

export default Meditate;
