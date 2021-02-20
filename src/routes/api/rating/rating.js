/*eslint-disable */
import express from 'express';
import authorize from '../../../middlewares/userAuthorization';
import UserAuthentication from '../../../middlewares/auth';
import RatingsController from '../../../controllers/rateAndReviewController';
import ratingValidator from '../../../middlewares/validators/ratings';
const router = express();

router.post('/rate', ratingValidator.validate, ratingValidator.sendToken,ratingValidator.doesAccomodationExists, authorize.userAuthorize, RatingsController.rateAccomodation);
router.get('/rateReviews', ratingValidator.sendToken, RatingsController.getRating);
export default router;
