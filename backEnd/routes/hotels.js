const express = require('express');
const router = express.Router();
const {createHotel, updateHotel, deleteHotel, getHotel, getHotels, countByCity, countByType, getHotelRooms} = require("../controllers/hotel")
const { verifyAdmin }= require('../utils/verifyToken')

// create hotel
router.post("/",verifyAdmin, createHotel )

// update hotel

router.put("/:id",verifyAdmin, updateHotel)

  // delete
  router.delete("/:id",verifyAdmin, deleteHotel)

    // Get hotel
router.get("/find/:id", getHotel)

// Get all
router.get("/", getHotels)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/room/:id", getHotelRooms);


module.exports = router


