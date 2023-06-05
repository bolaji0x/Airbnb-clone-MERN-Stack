const express = require('express');
const router = express.Router();

const {
  getAllBookings,
  getSingleBooking,
  getCurrentUserBookings,
  createBooking,
  updateBooking,
  getHostBookings,
} = require('../controllers/bookingController');

const {auth} = require('../middleware/auth.js');

router.route('/').post(auth, createBooking).get(auth, getAllBookings);

router.route('/showAllMyBookings').get(auth, getCurrentUserBookings);
router.route('/showHostBookings').get(auth, getHostBookings);

router
  .route('/:id')
  .get(auth, getSingleBooking)
  .patch(auth, updateBooking);

module.exports = router;
