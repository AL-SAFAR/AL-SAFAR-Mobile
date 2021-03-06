import React, { useState } from "react";
import {
  StyleSheet,
  Picker,
  ScrollView,
  Button,
  TextInput,
  TouchableOpacity,
  Dimensions,
  View,
  Text,
} from "react-native";
const { width, height } = Dimensions.get("window");
import moment from "moment";
import AwesomeButton from "react-native-really-awesome-button";
import NumericInput from "react-native-numeric-input";
import { Root, Popup } from "popup-ui"; // import { reduxForm } from "redux-form";
import { globalStyles } from "../../../../styles/global";
import { DatePicker } from "native-base";
import { CreditCardInput } from "react-native-credit-card-input";
import { connect } from "react-redux";
import { chargeCustomer, checkAvailability } from "../../actions/hotelActions";
import PropTypes from "prop-types";

const BookingForm = ({
  setModalOpen,
  chargeCustomer,
  hotel,
  checkAvailability,
}) => {
  const [startDate, setstartDate] = useState(null);
  const [endDate, setendDate] = useState(null);
  const [adults, setAdults] = useState(1);
  const [childs, setChilds] = useState(0);
  const [roomType, setRoomType] = useState(null);
  const [noOfRooms, setNoOfRooms] = useState(1);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const _onChange = (form) => {
    // console.log(form);
    // console.log(form);
    if (form.valid) {
      let payment = {
        number: form.values.number,
        expiry: form.values.expiry,
        cvc: form.values.cvc,
        type: form.values.type,
      };
      setPaymentDetails(payment);
      // console.log(form);
    } else {
      // console.log(form);
    }
  };
  const addtionalInputsProps = {
    number: {
      maxLength: 16,
    },
    cvc: { maxLength: 3 },
  };
  const handleSubmit = async (next) => {
    // console.log();
    let person = adults + Math.ceil(childs / 2);
    // person = 0;
    if (
      startDate &&
      endDate &&
      person > 0 &&
      roomType &&
      noOfRooms > 0 &&
      paymentDetails
    ) {
      const room = hotel.Room.filter((el) => {
        return el.roomType === roomType;
      });
      let bookdetails = {
        startDate,
        endDate,
        person,
        noOfRooms,
        roomType,
        paymentDetails,
        room: room[0],
        hotel,
      };
      // console.log(bookdetails);
      // console.log(hotel.Room);
      // console.log(room);
      let available = {
        room: room[0],
        roomType,
        startDate,
        endDate,
        noOfRooms,
      };
      checkAvailability(available).then((res) => {
        if (res.status) {
          chargeCustomer(bookdetails).then((res) => {
            // console.log(res);
            //   setProcessing(false);
            if (res === true) {
              next();
              Popup.show({
                type: "Success",
                title: "Booking Completed",
                button: false,
                textBody: "Congrats! Booking successfully done",
                buttontext: "Ok",
                callback: () => {
                  Popup.hide();
                  setModalOpen(false);
                },
              });
            } else {
              next();
            }
          });
          console.log("hello");
        } else {
          Popup.show({
            type: "Danger",
            title: "Booking failed",
            textBody: res.msg,
            buttontext: "Try again",
            callback: () => Popup.hide(),
          });
          next();
        }
        // console.log(res);
      });
      // Popup.show({
      //   type: "Success",
      //   title: "Booking Completed",
      //   button: false,
      //   textBody: "Congrats! Booking successfully done",
      //   buttontext: "Ok",
      //   callback: () => {
      //     Popup.hide();
      //     setModalOpen(false);
      //   },
      // });
    } else if (startDate || endDate || roomType || paymentDetails) {
      Popup.show({
        type: "Warning",
        title: "Fields Incomplete",
        textBody: "Please Fill All the fields",
        buttontext: "Continue",
        callback: () => Popup.hide(),
      });
      next();
    } else {
      Popup.show({
        type: "Danger",
        title: "Booking failed",
        textBody: "Sorry No rooms available try another Hotel",
        buttontext: "Try again",
        callback: () => Popup.hide(),
      });
      next();
    }
  };
  return (
    <Root>
      <ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
            margin: 20,
          }}
        >
          <View>
            <View style={globalStyles.input}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ marginTop: 15, fontSize: 16 }}>Adults</Text>
                <NumericInput
                  type="up-down"
                  value={adults}
                  minValue={1}
                  // onChangeText={handleChange("adults")}
                  onChange={(value) => setAdults(value)}
                />
              </View>
            </View>
            <View style={globalStyles.input}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ marginTop: 15, fontSize: 16 }}>Children</Text>
                <NumericInput
                  type="up-down"
                  value={childs}
                  minValue={0}
                  // onChangeText={handleChange("childs")}
                  onChange={(value) => setChilds(value)}
                />
              </View>
            </View>
            <View style={globalStyles.input}>
              <Picker
                style={{
                  // marginTop: 5,
                  height: 40,
                  width: 400,
                }}
                mode="dropdown"
                prompt={"Select Room Type"}
                itemStyle={{
                  borderWidth: 1,
                  borderColor: "black",
                  backgroundColor: "grey",
                }}
                selectedValue={roomType}
                onValueChange={(itemValue) => {
                  setRoomType(itemValue);
                }}
              >
                <Picker.Item
                  label="Select your Room Type"
                  value={null}
                  key={0}
                />
                <Picker.Item label="Economy" value={"Economy"} key={1} />
                <Picker.Item label="Deluxe" value={"Deluxe"} key={2} />
                <Picker.Item label="Luxury" value={"Luxury"} key={3} />
              </Picker>
            </View>
            <View style={globalStyles.input}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ marginTop: 15, fontSize: 16 }}>No Of Rooms</Text>
                <NumericInput
                  type="up-down"
                  value={noOfRooms}
                  minValue={1}
                  // onChangeText={handleChange("noOfRooms")}
                  onChange={(value) => setNoOfRooms(value)}
                />
              </View>
            </View>
            <View style={globalStyles.input}>
              <DatePicker
                defaultDate={Date.now()}
                minimumDate={Date.now()}
                maximumDate={maxDate}
                locale={"en"}
                // onChangeText={handleChange("startDate")}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Stay starts from"
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "black" }}
                onDateChange={(date) => {
                  // date.setTime(
                  //   date.getTime() - new Date().getTimezoneOffset() * 60 * 1000
                  // );

                  setstartDate(date);
                  console.log(date);
                }}
                disabled={false}
              />
            </View>
            <View style={globalStyles.input}>
              <DatePicker
                defaultDate={Date.now()}
                minimumDate={startDate ? startDate : Date.now()}
                maximumDate={maxDate}
                locale={"en"}
                // onChangeText={handleChange("startDate")}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Stay ends On"
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "black" }}
                onDateChange={(date) => {
                  // date.setTime(
                  //   date.getTime() - new Date().getTimezoneOffset() * 60 * 1000
                  // );

                  setendDate(date);
                  console.log(date);
                }}
                disabled={false}
              />
            </View>
            {/* <TextInput
                style={globalStyles.input}
                placeholder="Review body"
                onChangeText={props.handleChange("body")}
                value={props.values.body}
              />
              <TextInput
                style={globalStyles.input}
                placeholder="Rating (1-5)"
                onChangeText={props.handleChange("rating")}
                value={props.values.rating}
              /> */}
            <CreditCardInput
              addtionalInputsProps={addtionalInputsProps}
              onChange={_onChange}
              validColor="#7CFC00"
            />
            <AwesomeButton
              style={{
                marginVertical: 10,
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
              progress
              raiseLevel={4}
              backgroundColor="#FFF"
              textColor="#0099ff"
              backgroundDarker="#1073CE"
              backgroundProgress="#b3e0ff"
              backgroundPlaceholder="#fff"
              borderColor="#1073CE"
              borderWidth={2}
              borderRadius={100}
              width={width - 50}
              textSize={24}
              progressLoadingTime={10000}
              onPress={(next) => {
                handleSubmit(next);
                /** Do Something **/
              }}
            >
              Confirm Booking
            </AwesomeButton>
            {/* <TouchableOpacity onPress={handleSubmit}>
              <View style={globalStyles.button}>
                <Text style={globalStyles.buttonText}>Confirm Booking</Text>
              </View>
            </TouchableOpacity> */}
          </View>
        </View>
      </ScrollView>
    </Root>
  );
};

BookingForm.propTypes = {
  chargeCustomer: PropTypes.func.isRequired,
  checkAvailability: PropTypes.func.isRequired,
  hotels: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  hotels: state.hotel,
  //   receiver: navigation.getParam("receivingUser"),
});

export default connect(mapStateToProps, { chargeCustomer, checkAvailability })(
  BookingForm
);
