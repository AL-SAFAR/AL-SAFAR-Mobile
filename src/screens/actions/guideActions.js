import {
  GET_GUIDES,
  SET_LOADING,
  GET_GUIDE_BOOKINGS,
  GUIDES_ERROR,
} from "./types";
import { BASE_URL, APP_COMMISSION } from "../../../key.json";
import { AsyncStorage } from "react-native";
import moment from "moment";
import StripeClient from "./StripeClient";
import axios from "axios";
const testApiKey = "pk_test_E4kJlHrPZzpKcJzBXxf1KywE00ItkELuMe";
//Get techs from server
export const getGuides = () => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch(`${BASE_URL}/guide/guidedetails`);
    const data = await res.json();
    dispatch({
      type: GET_GUIDES,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: GUIDES_ERROR,
    //   payload: err.response.s,
    // });
  }
};
//charging customer
export const chargeCustomer = (payload) => async (dispatch) => {
  try {
    let usertoken = await AsyncStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": usertoken,
        "Access-Control-Allow-Origin": "*",
      },
    };
    const { paymentDetails, guide } = payload;
    const { expiry, cvc, number } = paymentDetails;
    let startDate = moment(payload.startDate, "DD-MM-YYYY");
    let endDate = moment(payload.endDate, "DD-MM-YYYY");
    let dateDiff = endDate.diff(startDate, "days");
    let totolCharges = payload.serviceCharges * dateDiff;
    let USDamount = totolCharges / 160;
    let PKRamount = totolCharges;
    // console.log(charges);
    let Expires = expiry.split("/");
    let exp_month = parseInt(Expires[0]);
    let exp_year = parseInt(Expires[1]);
    // console.log("month: " + exp_month + " year: " + exp_year);
    let GuideProfile = guide;
    let stripe = new StripeClient(testApiKey);
    const token = await stripe.tokenizeCard({
      number: number,
      expMonth: exp_month,
      expYear: exp_year,
      cvc: cvc,
    });
    const cardTokenId = token.id;
    // console.log(cardTokenId);
    return AsyncStorage.getItem("user").then((res) => {
      let LoggedInUser = JSON.parse(res);
      // console.log(LoggedInUser);
      console.log(LoggedInUser.email);
      let serverResponse = axios
        .post(
          `${BASE_URL}/payment/checkcustomer`,
          { CustomerEmail: LoggedInUser.email },
          config
        )
        .then(async (CustomerExists) => {
          let Customer = null;
          let CustomerID = null;
          // console.log("CHECKED CUSTOMER=");
          // console.log(CustomerExists.data);
          CustomerExists = CustomerExists.data;
          if (CustomerExists.hasOwnProperty("NOTFOUND")) {
            // Create a Customer
            Customer = await axios.post(
              `${BASE_URL}/payment/createCustomer`,
              {
                name: LoggedInUser.name,
                email: LoggedInUser.email,
                description: "Customer" + LoggedInUser.name + "was Created",
              },
              config
            );
            CustomerID = Customer.data;
          } else {
            CustomerID;
            // Customer Exits
            Customer = CustomerExists;
            // console.log("THE CURRENT CUSTOMER=");
            // console.log(Customer.id);
            CustomerID = Customer.id;
          }
          // console.log("CUSTOMERS ID=");
          // console.log(CustomerID);
          // Charge Customer
          const res = await axios.post(
            `${BASE_URL}/payment/charge`,
            {
              TokenID: cardTokenId,
              CustomerID,
              Amount: USDamount,
            },
            config
          );
          // console.log(res.data);
          let TrasactionID = res.data.confirm.id;
          let ComissionPercentage = APP_COMMISSION;
          let Comission = PKRamount * (ComissionPercentage / 100);
          // console.log("GuideProfile=");
          // console.log(GuideProfile);
          let savePaymentData = {
            Comission: Comission,
            TrasactionID: TrasactionID,
            amount: PKRamount,
            Email: GuideProfile.email,
            typeOfSP: "guide",
          };
          let savePaymentResp = await axios.post(
            `${BASE_URL}/payment/savePayment`,
            savePaymentData,
            config
          );
          // console.log(savePaymentResp);
          let PaymentID = savePaymentResp.data.resp._id;
          // console.log("GuideID: " + GuideProfile._id);
          let BookingData = {
            GuideID: GuideProfile._id,
            PaymentID: PaymentID,
            startDate: payload.startDate,
            endDate: payload.endDate,
          };
          let BookingResp = await axios.post(
            `${BASE_URL}/guide/guideBooking`,
            BookingData,
            config
          );
          // console.log(BookingResp);
          return true;
        })
        .catch((error) => {
          console.error(error);
          return false;
        });
      return serverResponse;
    });
  } catch (error) {
    console.log("Error Occured");
    console.log(error);
  }
};

//get Guide Bookings
export const getGuideBookings = () => async (dispatch) => {
  setLoading();

  let usertoken = await AsyncStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": usertoken,
      "Access-Control-Allow-Origin": "*",
    },
  };

  axios.get(`${BASE_URL}/users/guidebookings`, config).then((payload) => {
    dispatch({
      type: GET_GUIDE_BOOKINGS,
      payload: payload.data,
    });

    // console.log(payload);
  });
};
//set laoding true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
