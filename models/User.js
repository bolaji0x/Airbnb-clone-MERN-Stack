const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Pls provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Pls Provide a valid email'
        }
    },
    name: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Pls provide a name'],
        maxlength: [20, 'name can not be more than 20 characters'],
        minlength: 3,
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'Pls provide a  last name'],
      maxlength: [20, 'name can not be more than 20 characters'],
      minlength: 3,
  },
    password: {
      type: String,
      required: [true, 'Pls input your password'],
      minlength: 5
    },
    address: {
        type: String,
        trim: true,
        maxlength: 20,
        default: 'my city',
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    }
    
})

UserSchema.pre('save', async function () {
    // console.log(this.modifiedPaths())
    if (!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })
  
  UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, role: this.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    })
  }
  
  UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
  }

  module.exports = mongoose.model('User', UserSchema)