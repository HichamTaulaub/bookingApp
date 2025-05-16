require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/users');
const hotelsRoutes = require('./routes/hotels');
const roomsRoutes = require('./routes/rooms');
const cors = require('cors');
const cookieParser = require('cookie-parser')


const app = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173","http://localhost:5174" ], // frontend URL
  credentials: true,              // allow cookies
}));
app.use(cookieParser())



const connect = async () => {
  try {

     await mongoose.connect(process.env.MONGO_URI)
     console.log("connected to mongoDB")

  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
   console.log("connected to backend") 
})


app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/hotels', hotelsRoutes);
app.use('/api/rooms', roomsRoutes);

app.use((err, req, res, next)=>{
 const errorStatus = err.status || 500;
 const errorMessage = err.message || "something wrong";
 return res.status(errorStatus).json({
success : false,
status: errorStatus,
message: errorMessage,
stack: err.stack
 })
})

app.listen(process.env.PORT, () => {
   connect()
   console.log('Connected to backend')

})



// mongoose.connect(process.env.MONGO_URI)
//   .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
//   .catch(err => console.log(err));