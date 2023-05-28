const Order = require('../models/Order');
const Listing = require('../models/Listing');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');




const createOrder = async (req, res) => {
  const { listingId, status, checkinTime, checkoutTime, guestNo } = req.body;
  const listing = await Listing.findById(listingId);

  if (!listing) {
    return res.status(400).json({ msg: "This listing does not exist." });
  }

  const price = listing.price;
  const checkin = new Date(checkinTime);
  const checkout = new Date(checkoutTime);
  const stayDuration = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24)); // Convert to days

  const subtotal = price * guestNo * stayDuration;
  let tax = 0.075 * subtotal;
  tax = Math.min(tax, 999).toFixed(3);
  const total = Number(subtotal) + Number(tax);

  const order = await Order.create({
    createdBy: req.user.userId,
    listingId,
    tax,
    total,
    subtotal,
    status,
    checkinTime,
    checkoutTime,
    guestNo
  });

  res.status(StatusCodes.CREATED).json({ order });
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({})
  res.status(StatusCodes.OK).json({ orders, totalOrders: orders.length });
};

const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId }).populate('createdBy');
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
  }
  //checkPermissions(req.user, order.createdBy);
  res.status(StatusCodes.OK).json({ order });
};


const getCurrentUserOrders = async (req, res) => {
  const { sort } = req.query
  const queryObject = {
    createdBy: req.user.userId,
  };
  
  // NO AWAIT

  let result = Order.find(queryObject)
    .populate('createdBy', '_id username email');
    

  // chain sort conditions

  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }

  // setup pagination
  const page = Number(req.query.page) * 1 || 1;
  const limit = Number(req.query.limit) * 1 || 6;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const orders = await result;

  const totalOrders = await Order.countDocuments(queryObject);
  res.status(StatusCodes.OK).json({ orders, totalOrders })
  
};


const getHostBookings = async (req, res) => {
  
  const orders = await Order.find({ createdBy: req.user.userId }).populate('listingId', null, { createdBy: req.user.userId });
  
 
  

  res.status(StatusCodes.OK).json({ orders, totalOrders: orders.length });
};


const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;

  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
  }
  checkPermissions(req.user, order.createdBy);

  
  order.status = 'paid';
  await order.save();

  res.status(StatusCodes.OK).json({ order });
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  getHostBookings,
  createOrder,
  updateOrder,
};
