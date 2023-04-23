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
    price: {
      type: Number,
      required: [true, 'Pls provide a price'],
      default: 0
    },
    guestNo: {
      type: Number
    },
    bedroomNo: {
      type: Number
    },
    bedNo: {
      type: Number
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

