import React from "react";
import { Dimensions, Text, StyleSheet, Image } from "react-native";
import { View, Button } from "native-base";
const { width, height } = Dimensions.get("window");

// import styles from "./DriveFoundStyles.js";
const DriverFound = ({ driverInfo, getDriverLocation }) => {
  const { name, vehicle, profilePic } = driverInfo || {};
  return (
    <View style={styles.findDriverContainer}>
      <View style={styles.content}>
        <Text style={{ color: "#fff" }}>YAY Driver Found!</Text>
        <Image
          resizeMode="cover"
          style={styles.driverPic}
          source={{ uri: profilePic }}
        />
        <View style={styles.driverInfo}>
          <Text style={styles.quotationMarkLeft}>""</Text>
          <View style={styles.driverBio}>
            <Text style={styles.bioText}>Hi my name is</Text>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.bioText}>and I am 0.2km away.</Text>
          </View>
          <Text style={styles.quotationMarkRight}>""</Text>
        </View>
        <View style={styles.vehicleDetails}>
          <Text style={styles.vehicleText}>Vehicle Plate number:</Text>
          <Text style={styles.vehicleNumber}>
            {vehicle && vehicle.plateNumber}
          </Text>
          <Button style={styles.nextBtn} onPress={() => getDriverLocation()}>
            <Text style={styles.nextBtnText}>Next</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  findDriverContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    height: height,
    width: width,
    opacity: 0.9,
    right: 0,
  },
  content: {
    position: "absolute",
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  driverPic: {
    borderColor: "#fff",
    borderWidth: 1,
    height: 100,
    width: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  quotationMarkLeft: {
    color: "#0099ff",
    fontSize: 32,
    textAlign: "left",
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 10,
    // fontFamily: "Arial",
  },
  quotationMarkRight: {
    color: "#0099ff",
    fontSize: 32,
    textAlign: "right",
    fontWeight: "bold",
    marginBottom: 10,
    marginRight: 10,
    // fontFamily: "Arial",
  },
  driverInfo: {
    backgroundColor: "#fff",
    width: width * 0.9,
    borderRadius: 7,
    marginTop: 15,
  },
  driverBio: {
    width: width * 0.9,
    borderRadius: 7,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  bioText: {
    color: "#000",
    fontSize: 20,
  },
  nameText: {
    color: "#0099ff",
    fontSize: 32,
    textAlign: "center",
  },
  tabText: {
    fontSize: 12,
  },
  subTabText: {
    fontSize: 8,
  },
  driverFoundText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 15,
    marginTop: 15,
  },
  vehicleDetails: {
    marginTop: 15,
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  nextBtn: {
    marginTop: 10,
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "transparent",
  },
  nextBtnText: {
    color: "#ffffff",
  },
  vehicleText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
  },
  vehicleNumber: {
    marginTop: 10,
    color: "#ffffff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default DriverFound;
