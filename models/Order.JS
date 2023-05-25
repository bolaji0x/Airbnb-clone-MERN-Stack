const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema(
  {
    tax: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
      default: 'pending',
    },
    checkinTime: { type: Date, required: [true, 'Pls provide check in time'] },
    checkoutTime: { type: Date, required: [true, 'Pls provide check out time']},
    guestNo: { type: Number,required: [true, 'Pls provide number of guests'], default: 0},
    listingId: {
      type: mongoose.Types.ObjectId,
      ref: 'Listing',
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
