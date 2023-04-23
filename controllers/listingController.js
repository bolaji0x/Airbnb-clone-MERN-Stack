const Listing = require('../models/Listing');
const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes')
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const checkPermissions = require('../utils/checkPermissions')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_HOST,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ dest: 'uploads/' });

const createListing = async (req, res) => {
    const { title, description, price } = req.body;
    const images = [];
    if (!title || !description || !price || !images) {
      throw new CustomError.BadRequestError('Please provide all values');
    }
    // Upload images to Cloudinary
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path);
      images.push(result.secure_url);
    }

    // Create new listing in database
    const listing = new Listing({
      title,
      description,
      price,
      images,
      createdBy: req.user.userId
    });
    await listing.save();
    res.status(StatusCodes.CREATED).json({ listing });
   
};

const getAllListings = async (req, res) => {
  const { sort, search } = req.query
  
  const queryObject = {};
  if (search) {
    queryObject.title = { $regex: search, $options: 'i' };
  }

  let result = Listing.find(queryObject).populate('createdBy', '_id username')
  
    if (sort === 'latest') {
        result = result.sort('-createdAt')
    }
    if (sort === 'oldest') {
      result = result.sort('createdAt')
    }
    
    // setup pagination
    const page = Number(req.query.page) * 1 || 1;
    const limit = Number(req.query.limit) * 1 || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const listings = await result;

    const totalListings = await Listing.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalListings / limit);
    res.status(StatusCodes.OK).json({ listings, totalListings, numOfPages })

}


const getSingleListing = async (req, res) => {
  const {id: listingId} = req.params
  const listing = await Listing.findOne({ _id: listingId }).populate('createdBy', '_id username images')


  if (!listing) {
    throw new CustomError.NotFoundError(`No listing with id : ${listingId}`);
  }

  res.status(StatusCodes.OK).json({ listing });    
}



const updateListing = async (req, res) => {
  const { id: listingId } = req.params;
  const { title, description, price } = req.body;
  const images = [];

  if (!title || !description || !price) {
    throw new CustomError.BadRequestError('Please provide all values');
  }
  // Upload new images to Cloudinary
  for (const file of req.files) {
    const result = await cloudinary.uploader.upload(file.path);
    images.push(result.secure_url);
  }

  // Update existing listing in database
  const listing = await Listing.findOne({_id: listingId});

  if (!listing) {
    throw new CustomError.NotFoundError(`No Listing with id :${listingId}`)
  }

  listing.title = title;
  listing.description = description;
  listing.price = price;
  listing.images = [...listing.images, ...images]; // Concatenate old and new images
  checkPermissions(req.user, listing.createdBy);

  await listing.save();

  res.status(StatusCodes.OK).json({ listing });;
}

const deleteListing = async (req, res) => {
  const { id: listingId } = req.params;

  // Delete images from Cloudinary
  const listing = await Listing.findOne({ _id: listingId });

  if (!listing) {
    throw new CustomError.NotFoundError(`No Listing with id :${listingId}`)
  }

  for (const imageUrl of listing.images) {
    const publicId = imageUrl.split('/').slice(-1)[0].split('.')[0];
    await cloudinary.uploader.destroy(publicId);
  }

  checkPermissions(req.user, listing.createdBy);

  // Delete listing from database
  await listing.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! Listing removed' })
}


module.exports = { 
  createListing,
  getAllListings,
  getSingleListing,
  updateListing,
  deleteListing, 
  upload 
};
