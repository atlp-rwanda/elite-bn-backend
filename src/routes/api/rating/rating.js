/*eslint-disable */
import express from 'express';
import bookingController from '../../../controllers/booking';
import authorize from '../../../middlewares/userAuthorization';
import RatingsController from '../../../controllers/rateAndReviewController';
import BookingValidator from '../../../middlewares/validators/bookingValidator';
import ratingValidator from '../../../middlewares/validators/ratings'
const router = express();

router.post('/rate', ratingValidator.validate, ratingValidator.sendToken,BookingValidator.doesAccomodationExists, authorize.userAuthorize, RatingsController.addRating);

export default router;
