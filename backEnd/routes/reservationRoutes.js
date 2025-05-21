// const express = require("express");
// const router = express.Router();
// const Reservation = require("../models/Reservation");

// // Create reservation
// router.post("/", async (req, res) => {
//   try {
//     const newRes = new Reservation(req.body);
//     const saved = await newRes.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Get user's reservations
// router.get("/:userId", async (req, res) => {
//   try {
//     const reservations = await Reservation.find({ userId: req.params.userId }).populate("hotelId roomIds");
//     res.status(200).json(reservations);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Delete reservation
// router.delete("/:id", async (req, res) => {
//   try {
//     await Reservation.findByIdAndDelete(req.params.id);
//     res.status(200).json("Reservation cancelled.");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;
const express = require("express");
const Reservation = require("../models/Reservation");
const Room = require("../models/Room");
const router = express.Router();

// Create a new reservation
router.post("/", async (req, res) => {
  try {
    const { userId, hotelId, roomIds, dates } = req.body;

    const reservedRooms = await Promise.all(
      roomIds.map(async (roomId) => {
        const room = await Room.findOne({ "roomNumbers._id": roomId });
        const roomObj = room.roomNumbers.find((r) => r._id.toString() === roomId);
        return roomObj?.number;
      })
    );

    const newReservation = new Reservation({
      userId,
      hotelId,
      roomIds,
      roomNumbers: reservedRooms,
      dates,
    });

    await newReservation.save();
    res.status(200).json(newReservation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Cancel a reservation
router.delete("/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json("Reservation not found");

    await Promise.all(
      reservation.roomIds.map((roomId) => {
        return Room.findOneAndUpdate(
          { "roomNumbers._id": roomId },
          {
            $pull: {
              "roomNumbers.$.unvailableDates": { $in: reservation.dates },
            },
          }
        );
      })
    );

    await Reservation.findByIdAndDelete(req.params.id);
    res.status(200).json("Reservation cancelled");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get reservations for a user
router.get("/:userId", async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.params.userId }).populate("hotelId", "name");
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

