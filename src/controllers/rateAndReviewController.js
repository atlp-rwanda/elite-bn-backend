/*eslint-disable */
import Util from '../helpers/utils';
import ReviewService from '../services/reviewService';
import AccommodationService from '../services/accomodationServices';


 class ReviewController {
  
  static addReview = async(req, res, next)=> {
    try {
      const rawData = req.body;

      rawData.accommodation = parseInt(req.params.id, 10);
      rawData.user = req.user.id;
      const details = await AccommodationService.getAccommodation({ id: rawData.accommodation });
      if (!details) {
        return Util.setError("Accommodation doesn't exist");
      }
      const addedReview = await ReviewService.addFeeback(rawData);
      return Util.setSuccess(201, 'Feedback added successfully', addedReview);
    } catch (error) {
      return next(error);
    }
  }

  
  static addRating = async(req, res, next)=>{
    try {
      const accommodation = await AccommodationService.getAccommodation({ id: req.params.id });

      if (!accommodation) return Util.setError('Accommodation not found');

      const data = {
        userId: req.user.id,
        accommodationId: req.params.id,
        rating: req.body.rating
      };

      const ratings = await ReviewService.updateOrCreate(data);
      return Util.setSuccess(201, 'Rating added successfully', data);
    } catch (error) {
      return next(error);
    }
  }

}
export default ReviewController;

