import React, { useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../../styles/global";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { HistoryCard } from "./components/History/HistoryCard";
const BookingHistory = ({ navigation }) => {
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require("../../assets/History.png")}
          style={{
            width: undefined,
            // resizeMode: "cover",
            height: 135,
          }}
        >
          <View style={globalStyles.titleBar}>
            <TouchableOpacity
              onPress={() => navigation.navigate("HomeNavigation")}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  backgroundColor: "black",
                }}
              >
                <Ionicons
                  name="ios-arrow-back"
                  size={24}
                  color="#fff"
                ></Ionicons>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View
          style={{
            flex: 1,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={styles.heading}>Trip History</Text>
          <HistoryCard
            icon="car"
            type="car"
            heading="Car Bookings"
            gradient={["#0B486B", "#F56217"]}
            navigation={navigation}
          />
          <HistoryCard
            icon="hotel"
            type="hotel"
            heading="Hotel Bookings"
            gradient={["#1D2671", "#C33764"]}
            navigation={navigation}
          />
          <HistoryCard
            icon="mountain"
            type="guide"
            heading="Guide Bookings"
            gradient={["#283c86", "#45a247"]}
            navigation={navigation}
          />
          <HistoryCard
            icon="user-tie"
            type="agent"
            heading="Agent Bookings"
            gradient={["#333333", "#e9d362"]}
            navigation={navigation}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  heading: {
    fontSize: 32,
    fontWeight: "700",
    color: "#0099ff",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
});
export default BookingHistory;
