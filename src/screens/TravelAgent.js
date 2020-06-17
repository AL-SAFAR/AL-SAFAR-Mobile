import React from "react";
import { View, SafeAreaView, Text, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Agent from "./components/Travel/Agent";
import { globalStyles } from "../../styles/global";

const TravelAgent = ({ navigation }) => {
  const agents = [
    {
      id: 1,
      companyUri:
        "https://images.unsplash.com/photo-1503971090465-19d3c80f81f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=845&q=80",
      Location: "Lahore",
      companyName: "Pak Travellers",
      intro:
        "Among the most popular sights are the Lahore Fort, adjacent to the Walled City, and home to the Sheesh Mahal, the Alamgiri Gate, the Naulakha pavilion, and the Moti Masjid.Among the most popular sights are the Lahore Fort, adjacent to the Walled City, and home to the Sheesh Mahal, the Alamgiri Gate, the Naulakha pavilion, and the Moti Masjid.Among the most popular sights are the Lahore Fort, adjacent to the Walled City, and home to the Sheesh Mahal, the Alamgiri Gate, the Naulakha pavilion, and the Moti Masjid.Among the most popular sights are the Lahore Fort, adjacent to the Walled City, and home to the Sheesh Mahal, the Alamgiri Gate, the Naulakha pavilion, and the Moti Masjid.Among the most popular sights are the Lahore Fort, adjacent to the Walled City, and home to the Sheesh Mahal, the Alamgiri Gate, the Naulakha pavilion, and the Moti Masjid.",
      packages: {
        silver: [
          "3star Hotel",
          "Bus Tour",
          "Dinner",
          "Breakfast",
          "3 days plan",
        ],
        gold: [
          "3star Hotel",
          "Economy Car Tour",
          "Dinner",
          "Breakfast",
          "3 days plan",
          "Murree Trip",
        ],
        diamond: [
          "5star Hotel",
          "Luxury Car",
          "Dinner",
          "Lunch",
          "Breakfast",
          "3 days plan",
        ],
      },
    },
    {
      id: 2,
      companyUri:
        "https://images.unsplash.com/photo-1503971090465-19d3c80f81f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=845&q=80",
      Location: "Lahore",
      companyName: "Pak Travellers",
      intro:
        "Among the most popular sights are the Lahore Fort, adjacent to the Walled City, and home to the Sheesh Mahal, the Alamgiri Gate, the Naulakha pavilion, and the Moti Masjid.",
      packages: {
        silver: [
          "3star Hotel",
          "Bus Tour",
          "Dinner",
          "Breakfast",
          "3 days plan",
        ],
        gold: [
          "3star Hotel",
          "Economy Car Tour",
          "Dinner",
          "Breakfast",
          "3 days plan",
          "Murree Trip",
        ],
        diamond: [
          "5star Hotel",
          "Luxury Car",
          "Dinner",
          "Lunch",
          "Breakfast",
          "3 days plan",
        ],
      },
    },
    {
      id: 3,
      companyUri:
        "https://images.unsplash.com/photo-1503971090465-19d3c80f81f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=845&q=80",
      Location: "Lahore",
      companyName: "Pak Travellers",
      intro:
        "Among the most popular sights are the Lahore Fort, adjacent to the Walled City, and home to the Sheesh Mahal, the Alamgiri Gate, the Naulakha pavilion, and the Moti Masjid.",
      packages: {
        silver: [
          "3star Hotel",
          "Bus Tour",
          "Dinner",
          "Breakfast",
          "3 days plan",
        ],
        gold: [
          "3star Hotel",
          "Economy Car Tour",
          "Dinner",
          "Breakfast",
          "3 days plan",
          "Murree Trip",
        ],
        diamond: [
          "5star Hotel",
          "Luxury Car",
          "Dinner",
          "Lunch",
          "Breakfast",
          "3 days plan",
        ],
      },
    },
    {
      id: 4,
      companyUri:
        "https://images.unsplash.com/photo-1503971090465-19d3c80f81f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=845&q=80",
      Location: "Lahore",
      companyName: "Pak Travellers",
      intro:
        "Among the most popular sights are the Lahore Fort, adjacent to the Walled City, and home to the Sheesh Mahal, the Alamgiri Gate, the Naulakha pavilion, and the Moti Masjid.",
      packages: {
        silver: [
          "3star Hotel",
          "Bus Tour",
          "Dinner",
          "Breakfast",
          "3 days plan",
        ],
        gold: [
          "3star Hotel",
          "Economy Car Tour",
          "Dinner",
          "Breakfast",
          "3 days plan",
          "Murree Trip",
        ],
        diamond: [
          "5star Hotel",
          "Luxury Car",
          "Dinner",
          "Lunch",
          "Breakfast",
          "3 days plan",
        ],
      },
    },
  ];
  const renderAgents = () => {
    return agents.map((agent) => {
      return <Agent key={agent.id} agent={agent} navigation={navigation} />;
    });
  };
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <Text
          style={{
            paddingHorizontal: 20,
            marginVertical: 10,
            fontSize: 24,
            fontWeight: "700",
          }}
        >
          Travel Agent
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          {renderAgents()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TravelAgent;
