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

const {auth, authorizePermissions} = require('../middleware/auth.js');

router
  .route('/')
  .post(auth, createOrder)
  .get([auth, authorizePermissions('admin')], getAllOrders);

router.route('/showAllMyOrders').get(auth, getCurrentUserOrders);
router.route('/showSellerOrders').get(auth, getHostBookings);

router
  .route('/:id')
  .get([auth, authorizePermissions('admin')], getSingleOrder)
  .patch([auth, authorizePermissions('admin')], updateOrder);

module.exports = router;
