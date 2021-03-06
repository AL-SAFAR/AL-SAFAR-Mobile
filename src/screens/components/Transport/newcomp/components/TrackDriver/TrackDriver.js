import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, Platform } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Constants from "expo-constants";
import store from "../../../../../../../store";
import {
  getCurrentLocation,
  getDriverInfo,
  getDriverLocation,
  getDistanceFromDriver,
} from "../../../../../actions/trackDriverAction";
import MapTrack from "./MapTrack";
import DriverFound from "./DriverFound";
import DriverFooterProfile from "./DriverFooterProfile";
import DriverOnTheWayFooter from "./DriverOnTheWayFooter";
const carMarker = require("../../../../../../../assets/car.png");
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full width
const socket = store.getSocket();

const TrackDriver = ({
  navigation,
  transport: { selectedAddress },
  trackDriver: {
    region,
    driverInfo,
    driverLocation,
    showDriverFound,
    showCarMarker,
    distanceFromDriver,
  },
  getCurrentLocation,
  getDriverInfo,
  getDriverLocation,
  getDistanceFromDriver,
}) => {
  useEffect(() => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      seterrorMessage(
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
    } else {
      getCurrentLocation();
    }
  }, []);

  useEffect(() => {
    // getCurrentLocation();
    getDriverInfo();
  }, []);
  const [durationDistance, setDurationDistance] = useState({
    duration: 0,
    distance: 0,
  });
  useEffect(() => {
    socket.on("resetPassenger", (reset) => {
      console.log(reset);
      store.dispatch({ type: "RESET_PASSENGER" });
      store.dispatch({ type: "CLEAR_STATE" });
      navigation.navigate("DrawerNavigation");
    });
  });

  useEffect(() => {
    if (driverLocation !== {}) {
      getDistanceFromDriver(durationDistance);
    }
    console.log(durationDistance);
    // console.log("counter updated");
  }, [durationDistance]);

  // region = {
  //   latitude: 33.628171,
  //   longitude: 73.062621,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.051862500000000006,
  // };
  return (
    <View style={styles.container}>
      {region && (
        <MapTrack
          driverLocation={driverLocation}
          selectedAddress={selectedAddress}
          region={region}
          showCarMarker={showCarMarker}
          carMarker={carMarker}
          setDurationDistance={setDurationDistance}
        />
      )}
      <DriverOnTheWayFooter
        driverInfo={driverInfo}
        distanceFromDriver={distanceFromDriver}
      />
      <DriverFooterProfile navigation={navigation} driverInfo={driverInfo} />

      {showDriverFound && (
        <DriverFound
          driverInfo={driverInfo}
          getDriverLocation={getDriverLocation}
        />
      )}
    </View>
  );
};
const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // marginTop: StatusBar.currentHeight,
    height: height - 70,
  },
};
TrackDriver.propTypes = {
  getCurrentLocation: PropTypes.func.isRequired,
  getDriverInfo: PropTypes.func.isRequired,
  transport: PropTypes.object.isRequired,
  trackDriver: PropTypes.object.isRequired,
  getDriverLocation: PropTypes.func.isRequired,
  getDistanceFromDriver: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  transport: state.transport,
  trackDriver: state.trackDriver,
});

export default connect(mapStateToProps, {
  getCurrentLocation,
  getDriverInfo,
  getDistanceFromDriver,
  getDriverLocation,
})(TrackDriver);
