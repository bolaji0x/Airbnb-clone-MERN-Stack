const express = require('express');
const router = express.Router();

const {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
  getHostBookings,
} = require('../controllers/orderController');

const {auth} = require('../middleware/auth.js');

router.route('/').post(auth, createOrder).get(auth, getAllOrders);

router.route('/showAllMyOrders').get(auth, getCurrentUserOrders);
router.route('/showHostBookings').get(auth, getHostBookings);

router
  .route('/:id')
  .get(auth, getSingleOrder)
  .patch(auth, updateOrder);

module.exports = router;
