import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import moment from "moment";
// import NumericInput from "react-native-numeric-input";
import { Root, Popup } from "popup-ui"; // import { reduxForm } from "redux-form";
import { globalStyles } from "../../../../styles/global";
import { DatePicker } from "native-base";
import { CreditCardInput } from "react-native-credit-card-input";
import { connect } from "react-redux";
import { chargeCustomer } from "../../actions/guideActions";
const { width, height } = Dimensions.get("window");
import PropTypes from "prop-types";
import BookingProcessing from "../layout/BookingProcessing";
const GuideBookingForm = ({
  setModalOpen,
  serviceCharges,
  chargeCustomer,
  guide,
  currentGuide,
}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  // const [processing, setProcessing] = useState(false);
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
    } else {
      // console.log(form.valid);
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
    if (startDate && endDate && paymentDetails) {
      let bookdetails = {
        startDate,
        endDate,
        paymentDetails,
        serviceCharges,
        guide: currentGuide,
      };
      // console.log(bookdetails);
      // setProcessing(true);
      chargeCustomer(bookdetails).then((res) => {
        // setProcessing(false);
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
          Popup.show({
            type: "Danger",
            title: "Booking failed",
            textBody: "Sorry No rooms available try another Hotel",
            buttontext: "Try again",
            callback: () => Popup.hide(),
          });
        }
      });
    } else if (startDate || endDate || paymentDetails) {
      Popup.show({
        type: "Warning",
        title: "Fields Incomplete",
        textBody: "Please Fill All the fields",
        buttontext: "Continue",
        callback: () => Popup.hide(),
      });
    } else {
      Popup.show({
        type: "Danger",
        title: "Booking failed",
        textBody: "Sorry No rooms available try another Hotel",
        buttontext: "Try again",
        callback: () => Popup.hide(),
      });
    }
  };
  return (
    <Root>
      {/* {processing ? (
        <BookingProcessing />
      ) : ( */}
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
                  setStartDate(date);
                  console.log(date);
                }}
                disabled={false}
              />
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
                placeHolderText="Stay ends On"
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "black" }}
                onDateChange={(date) => {
                  setEndDate(date);
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
            {/* <Button
              style={{ marginTop: 10 }}
              title="Confirm Booking"
              color="#0099ff"
              // onPress={() =>
              // }
              onPress={handleSubmit}
            /> */}
          </View>
        </View>
      </ScrollView>
      {/* )} */}
    </Root>
  );
};

GuideBookingForm.propTypes = {
  chargeCustomer: PropTypes.func.isRequired,
  guide: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  guide: state.guide,
  //   receiver: navigation.getParam("receivingUser"),
});

export default connect(mapStateToProps, { chargeCustomer })(GuideBookingForm);
