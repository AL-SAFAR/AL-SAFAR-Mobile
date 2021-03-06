const mongoose = require("mongoose");

const GuideBookingSchema = mongoose.Schema({
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "payment",
  },
  guideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "guide",
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
  },
  status: {
    type: String,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  cancelDate: {
    type: Date,
  },
  starRating: {
    type: Number,
  },
  feedback: {
    type: String,
  },
});

module.exports = mongoose.model("guideBooking", GuideBookingSchema);
