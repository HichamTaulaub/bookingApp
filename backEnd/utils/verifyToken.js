
// const User = require('../models/User');
// const createError = require('../utils/error')
// const jwt = require('jsonwebtoken')

//  const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;
//   if (!token) {
//     return next(createError(401, "You are not authenticated!"));
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return next(createError(403, "Token is not valid!"));
//     req.user = user;
//     next();
//   });

//   // const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//   //   req.user = user;
//   //   next();
//   // });

// };

//  const verifyUser = (req, res, next) => {
//   verifyToken(req, res, next, () => {
//     if (req.user.id === req.params.id || req.user.isAdmin) {
//       next();
//     } else {
//       return next(createError(403, "You are not authorized!"));
//     }
//   });
// };

//  const verifyAdmin = async(req, res, next) => {
//   verifyToken(req, res, next, () => {
//     console.log(req)
//     if (req.user.isAdmin) {
//       next();
//     } else {
//       return next(createError(403, "You are not authorized!"));
//     }
//   });
//   console.log('Hello One')

//   verifyToken(req, res, next, () => {
//     if(req.user.isAdmin) {
//       console.log('Yes')
//     }else {
//       console.log('no')
//     }
//   })

//   console.log('Hello Two')
  
// };
// module.exports = {verifyToken, verifyUser, verifyAdmin}
const createError = require('../utils/error');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user)
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

module.exports = { verifyToken, verifyUser, verifyAdmin };