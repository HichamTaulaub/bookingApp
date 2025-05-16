const User = require("../models/User");


const createUser = async (req, res, next) => {
  try {
    // Hash the password before saving
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // Create the new user
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
};


//update
const updateUser = async (req,res,next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
             {$set: req.body},
             {new: true}
        ) 
         res.status(200).json(updatedUser)
      } catch (err) {
          next(err)
      }
}
// delete 
const deleteUser = async (req,res,next) => {

    try {
       await User.findByIdAndDelete(req.params.id) 
       res.status(200).json('User deleted')
    } catch (err) {
        next(err)
    }
}
//get User

const getUser = async (req,res,next) =>{

    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}
// GET ALL UserS
const getUserS = async (req,res,next) =>{

    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}

module.exports = { updateUser, deleteUser, getUser, getUserS, createUser}