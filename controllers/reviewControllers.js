const Review = require('./../models/reviewModel')
const catchAsyncError = require('../utils/catchAsyncError');



const getAllReviews = catchAsyncError(async (req, res, next) => {
    const reviews = await Review.find()
    res.status(200).json({
        status: 'success',
        results: reviews.length,
        data: {
            reviews: reviews
        }
    })
})

const createNewReview = catchAsyncError(async (req, res, next) => {

    // allow nested routes
    //  here  tour id will come from URL and user id will come from currently logged in user 

    if (!req.body.tour) req.body.tour = req.params.tourId
    if (!req.body.user) req.body.user = req.user.id


    const newReview = await Review.create(req.body)
    res.status(201).json({
        status: 'success',
        data: {
            reviews: newReview
        }
    })
})

module.exports = {
    getAllReviews,
    createNewReview
}





