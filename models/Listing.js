const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema(
  {
    images: [
      {
        type: String,
        required: true
      },
    ],
    title: {
      type: String,
      required: [true, 'Please provide title'],
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
    },
    address: {
      type: String,
      required: [true, 'Please provide address'],
    },
    price: {
      type: Number,
      required: [true, 'Pls provide a price'],
      default: 0
    },
    guestNo: {
      type: Number,
      required: [true, 'Pls provide number of guests'],
      default: 0
    },
    bedroomNo: {
      type: Number,
      required: [true, 'Pls provide number of bedrooms'],
      default: 0
    },
    bedNo: {
      type: Number,
      required: [true, 'Pls provide number of beds'],
      default: 0
    
    },
    checkinTime: {
      type: Date,
      required: [true, 'Pls provide check in time'],
    },
    checkoutTime: {
      type: Date,
      required: [true, 'Pls provide check out time'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model('Listing', ListingSchema)

