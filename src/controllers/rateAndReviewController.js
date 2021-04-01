/*eslint-disable */
import Util from '../helpers/utils';
import RatingService from '../services/ratingService';
import ReviewService from '../services/reviewService';

const util = new Util();
class ReviewController {
  static rateAccomodation = async (req, res, next) => {
    try {
      const ratingInformation = req.body;
      ratingInformation.userId = req.userId;
      const rateAcc = await RatingService.addRating(ratingInformation);
      util.setSuccess(200, res.__('Rate succesfully added'));
      return util.send(res);
    } catch (error) {
      util.setError(
        500,
        res.__('There was an error while rating an accomodation'),
      );
      return util.send(res);
    }
  };

  static reviewAccomodation = async (req, res, next) => {
    try {
      const reviewInformation = req.body;
      reviewInformation.userId = req.userId;
      const reviweAcc = await ReviewService.addReview(reviewInformation);
      util.setSuccess(200, res.__('written review succesfully added'));
      return util.send(res);
    } catch (error) {
      util.setError(
        500,
        res.__('There was an error while reviewing accomodation'),
      );
      return util.send(res);
    }
  };
  static getRating = async (req, res) => {
    try {
      const getRate = await RatingService.getRating();

      if (!getRate) {
        util.setError(404, res.__('This Rate not found'));
      }

      util.setSuccess(200, res.__('Successfully fetched a rating', getRate));
      return util.send(res);
    } catch (error) {
      util.setError(500, res.__('There was an error while fetching Ratings'));
      return util.send(res);
    }
  };
  static getReview = async (req, res) => {
    try {
      const getReview = await ReviewService.getReview();
      if (!getReview) {
        util.setError(404, res.__('This Review not found'));
      }

      util.setSuccess(200, res.__('Successfully fetched a review', getReview));
    } catch (error) {
      util.setError(500, res.__('There was an error while fecting a review'));
      return util.send(res);
    }
  };
}
export default ReviewController;
