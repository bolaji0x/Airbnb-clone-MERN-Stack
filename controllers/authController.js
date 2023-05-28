const User = require ('../models/User.js')
const { StatusCodes } = require ('http-status-codes')
const { BadRequestError, UnAuthenticatedError } = require ('../errors/index.js')
const {attachCookie} = require('../utils/attachCookie.js')
const Token = require('../models/Token');

const register = async (req, res) => {
  const { name, email, lastName, password, role } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError('please provide all values');
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use');
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const userRole = role || (isFirstAccount ? 'admin' : 'user');

  const user = await User.create({ name, email, password, lastName, role: userRole });

  const existingToken = user.createJWT()

  // create refresh token
  let refreshToken = '';
  refreshToken = existingToken.refreshToken;
  attachCookie({ res, accessToken: existingToken, refreshToken });

  res.status(StatusCodes.CREATED).json({
    user: {
        name: user.name,
        email: user.email,
        lastName: user.lastName,
        address: user.address, 
        role: user.role
    },
    address: user.address
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide all values');
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }
  const existingToken = user.createJWT()

  // create refresh token
  let refreshToken = '';

  refreshToken = existingToken.refreshToken;
  attachCookie({ res, accessToken: existingToken, refreshToken });
  user.password = undefined
  res.status(StatusCodes.OK).json({ user, address: user.address })
};

const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user, location: user.location });
};

const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

module.exports = { 
  register,
  login,
  getCurrentUser,
  logout
}
