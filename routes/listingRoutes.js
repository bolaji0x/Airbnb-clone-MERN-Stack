const express = require('express')
const router = express.Router()

const {
    createListing,
    getCurrentUserListings,
    updateListing,
    upload,
    deleteListing,
    getAllListings,
    getSingleListing
} = require('../controllers/listingController.js')

const { auth } = require('../middleware/auth')


router.route('/all').get(getAllListings)
router.route('/').post(auth, upload.array('images'), createListing).get(auth, getCurrentUserListings)
router.route('/:id').get(getSingleListing)
router.route('/:id').put(auth, upload.array('images'), updateListing);
router.route('/:id').delete(auth, deleteListing);

module.exports = router

