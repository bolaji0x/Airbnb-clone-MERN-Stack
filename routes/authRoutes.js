const express = require('express')
const router = express.Router()

const rateLimiter = require('express-rate-limit')

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many requests from this IP, please try again after 15 minutes',
})

const { 
  register,
  login,
  getCurrentUser,
  logout
} = require('../controllers/authController.js')

const {auth} = require('../middleware/auth.js');

router.route('/register').post(register)
router.route('/login').post(login)

router.get('/logout', logout);

router.route('/getCurrentUser').get(auth, getCurrentUser);


module.exports = router
