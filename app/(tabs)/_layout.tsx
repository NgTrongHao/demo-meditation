import React from "react";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tabs.Screen
        name="nature-meditate"
        options={{
          tabBarLabel: "Meditate",
          tabBarIcon: ({ color }) => (
            <AntDesign name="picture" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="affirmation"
        options={{
          tabBarLabel: "Affirmation",
          tabBarIcon: ({ color }) => (
            <Entypo name="open-book" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
