/*eslint-disable */
import express from 'express';
import authorize from '../../../middlewares/userAuthorization';
import UserAuthentication from '../../../middlewares/auth';
import RatingsController from '../../../controllers/rateAndReviewController';
import ratingValidator from '../../../middlewares/validators/ratings';
const router = express();

router.post('/rate', ratingValidator.validate, authorize.userAuthorize, ratingValidator.sendToken,ratingValidator.doesAccomodationExists, RatingsController.rateAccomodation);
router.put('/review/:id', RatingsController.addReviews);
router.get('/rateReviews', RatingsController.getRating);
export default router;
