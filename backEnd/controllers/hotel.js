const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

// Create
const createHotel = async (req,res,next) => {

  const newHotel = new Hotel(req.body) 
try {
   const savedHotel = await newHotel.save() 
   res.status(200).json(savedHotel)
} catch (err) {
    next(err);
}
}
//update
const updateHotel = async (req,res,next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,
             {$set: req.body},
             {new: true}
        ) 
         res.status(200).json(updatedHotel)
      } catch (err) {
          next(err)
      }
}
// delete 
const deleteHotel = async (req,res,next) => {

    try {
       await Hotel.findByIdAndDelete(req.params.id) 
       res.status(200).json('hotel deleted')
    } catch (err) {
        next(err)
    }
}
//get hotel

const getHotel = async (req,res,next) =>{

    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (err) {
        next(err)
    }
}



// GET ALL HOTELS
const getHotels = async (req, res, next) => {
    const { min, max, limit, ...others } = req.query;
    try {
      const hotels = await Hotel.find({
        ...others,
        cheapestPrice: { $gt: min | 1, $lt: max || 999 },
      }).limit(limit);

      
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  };
// countbycity
const countByCity = async (req,res,next) =>{
   const cities = req.query.cities.split(',')
    try {
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}

// countbyType
const countByType = async (req, res, next) => {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "hotel" });
      const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
      const resortCount = await Hotel.countDocuments({ type: "resort" });
      const villaCount = await Hotel.countDocuments({ type: "villa" });
      const cabinCount = await Hotel.countDocuments({ type: "cabin" });
  
      res.status(200).json([
        { type: "hotel", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "villas", count: villaCount },
        { type: "cabins", count: cabinCount },
      ]);


    } catch (err) {
      next(err);
    }
  };
 // a function to get a hotelroom by its id
  const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };

  const getOnlyHotels = async (req,res,next) =>{

    try {
        const hotelss = await Hotel.find({ type: "hotel"})
        res.status(200).json(hotelss)
    } catch (err) {
        next(err)
    }
}

  const getOnlyCabins = async (req,res,next) =>{

    try {
        const hotelss = await Hotel.find({ type: "cabin"})
        res.status(200).json(hotelss)
    } catch (err) {
        next(err)
    }
}

  const getOnlyApartments = async (req,res,next) =>{

    try {
        const hotelss = await Hotel.find({ type: "apartment"})
        res.status(200).json(hotelss)
    } catch (err) {
        next(err)
    }
}

  const getOnlyResorts = async (req,res,next) =>{

    try {
        const hotelss = await Hotel.find({ type: "resort"})
        res.status(200).json(hotelss)
    } catch (err) {
        next(err)
    }
}

  const getOnlyVillas = async (req,res,next) =>{

    try {
        const hotelss = await Hotel.find({ type: "villa"})
        res.status(200).json(hotelss)
    } catch (err) {
        next(err)
    }
}

module.exports = {createHotel, updateHotel, deleteHotel,
   getHotel, getHotels, countByCity,
    countByType, getHotelRooms
    , getOnlyHotels
    , getOnlyApartments
    , getOnlyResorts
    , getOnlyVillas
    , getOnlyCabins}