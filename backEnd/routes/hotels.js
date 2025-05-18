const express = require('express');
const router = express.Router();
const {createHotel, updateHotel, deleteHotel,
      getHotel, getHotels, countByCity,
      countByType, getHotelRooms
    , getOnlyHotels
    , getOnlyApartments
    , getOnlyResorts
    , getOnlyVillas
    , getOnlyCabins} = require("../controllers/hotel")
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
router.get("/hotel", getOnlyHotels);
router.get("/apartments", getOnlyApartments);
router.get("/resorts", getOnlyResorts);
router.get("/cabins", getOnlyCabins);
router.get("/villas", getOnlyVillas);


module.exports = router


