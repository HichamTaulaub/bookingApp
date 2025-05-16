const express = require('express');
const router = express.Router();
const {createRoom, updateRoom, deleteRoom, getRoom, getRooms, updateRoomAvailability} = require('../controllers/room')
const { verifyAdmin }= require('../utils/verifyToken')
// create Room
router.post("/:hotelid",verifyAdmin, createRoom )

// update Room

router.put("/:id",verifyAdmin, updateRoom)
router.put("/availability/:id", updateRoomAvailability)

  // delete
  router.delete("/:id",verifyAdmin, deleteRoom)

    // Get Room
router.get("/:id", getRoom)

// Get all
router.get("/", getRooms)

module.exports = router