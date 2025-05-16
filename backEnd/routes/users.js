const express = require('express');
const router = express.Router();
const { updateUser, deleteUser, getUser, getUserS, createUser} = require("../controllers/user")
const {verifyAdmin} = require('../utils/verifyToken')

// router.get('/checkauth', verifyToken, (req,res,next)=>{
//     res.send('welcome')
// })
// router.get('/checkuser/:id', verifyUser , (req,res,next)=>{
//     res.send('welcome user ')
// })
// router.get('/checkadmin/:id', verifyAdmin , (req,res,next)=>{
//     res.send('welcome admin')
// })
router.post("/", verifyAdmin, createUser);
// update User

router.put("/:id",verifyAdmin, updateUser)

  // delete
  router.delete("/:id",verifyAdmin, deleteUser)

    // Get User
router.get("/:id",verifyAdmin, getUser)

// Get all
router.get("/",verifyAdmin, getUserS)


module.exports = router