const Booking = require('../models/Booking');
const Listing = require('../models/Listing');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');


const createBooking = async (req, res) => {
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

  const booking = await Booking.create({
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

  res.status(StatusCodes.CREATED).json({ booking });
};

const getAllBookings = async (req, res) => {
  const bookings = await Booking.find({})
  res.status(StatusCodes.OK).json({ bookings, totalBookings: bookings.length });
};

const getSingleBooking = async (req, res) => {
  const { id: bookingId } = req.params;
  const booking = await Booking.findOne({ _id: bookingId }).populate('createdBy');
  if (!booking) {
    throw new CustomError.NotFoundError(`No booking with id : ${bookingId}`);
  }
  checkPermissions(req.user, booking.createdBy);
  res.status(StatusCodes.OK).json({ booking });
};


const getCurrentUserBookings = async (req, res) => {
  const { sort } = req.query
  const queryObject = {
    createdBy: req.user.userId,
  };
  
  // NO AWAIT

  let result = Booking.find(queryObject)
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

  const bookings = await result;

  const totalBookings = await Booking.countDocuments(queryObject);
  res.status(StatusCodes.OK).json({ bookings, totalBookings })
  
};



const getHostBookings = async (req, res) => {
  
  const userId = req.user.userId; // Assuming you have user authentication and can access the user's ID
  try {
    const listingIds = await Listing.getListingIdsByUser(userId);

    // Find all bookings where the listing's createdBy field is not the current user's ID
    const bookings = await Booking.find({
      createdBy: { $ne: userId },
      listingId: { $in: listingIds },
    }).populate('listingId');

    res.status(200).json({ bookings, totalBookings: bookings.length });
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    res.status(500).json({ error: 'Failed to retrieve bookings' });
  }
};

/*
const getHostBookings = async (req, res) => {
  const { sort } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };

  let result = Booking.find(queryObject).populate('listingId', null, { createdBy: req.user.userId });

  // Chain sort conditions
  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }

  // Setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const bookings = await result;
  const totalBookings = await Booking.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalBookings / limit);
  res.status(StatusCodes.OK).json({ bookings, totalBookings, numOfPages });
};
*/
const updateBooking = async (req, res) => {
  const { id: bookingId } = req.params;

  const booking = await Booking.findOne({ _id: bookingId });
  if (!booking) {
    throw new CustomError.NotFoundError(`No booking with id : ${bookingId}`);
  }
  checkPermissions(req.user, booking.createdBy);

  
  booking.status = 'paid';
  await booking.save();

  res.status(StatusCodes.OK).json({ booking });
};

module.exports = {
  getAllBookings,
  getSingleBooking,
  getCurrentUserBookings,
  getHostBookings,
  createBooking,
  updateBooking
};
