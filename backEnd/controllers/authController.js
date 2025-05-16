
const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const  creatError  = require('../utils/error');


const register = async (req,res,next)=>{
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(req.body.password, salt)

    const newUser = new User({
      ...req.body,
      password: hashed
    })
    await newUser.save()
    res.status(200).json("user cretaed")
  } catch (err) {
    next(err)
  }
}

const login = async (req,res,next)=>{
  try {
 const user = await User.findOne({username:req.body.username})
 if(!user) return next(creatError(404, "User not found"))
  const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
if(!isPasswordCorrect) return next(creatError(400, "incorrect Username or Password "))

 const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET);

  const {password, isAdmin, ...otherDetails} = user._doc

  
res.cookie("access_token", token, {
  httpOnly: true,
  secure: false,        // set to true only with HTTPS
  sameSite: "Lax",      // or 'None' if testing cross-site with HTTPS
});

      res.status(200).json({ details: {...otherDetails }, isAdmin: user.isAdmin, token });
  } catch (err) {
    next(err)
  }
}

const logout = async (req, res, next) => {
  try {
    // Clear the HTTP-only cookie
    res.clearCookie("access_token");
    
    res.status(200).json({ message: "Successfully logged out" });
  } catch (err) {
    next(err);
  }
};

// Add to your exports
module.exports = { register, login, logout };
