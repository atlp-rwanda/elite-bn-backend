/*eslint-disable */
import express from 'express';
import bookingController from '../../../controllers/booking';
import authorize from '../../../middlewares/userAuthorization';
import rate from '../../../controllers/rateAndReviewController';
import BookingValidator from '../../../middlewares/validators/bookingValidator';
import ratingValidator from '../../../middlewares/validators/ratings'
const router = express();

router.post('/rate', ratingValidator.validate, ratingValidator.sendToken,BookingValidator.doesAccomodationExists, authorize.userAuthorize, rate.addReview);

export default router;
