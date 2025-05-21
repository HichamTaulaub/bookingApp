const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  roomIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
  roomNumbers: [{ type: Number }], // Store actual room numbers
  dates: [{ type: Date }],
}, { timestamps: true });

module.exports = mongoose.model("Reservation", ReservationSchema);
