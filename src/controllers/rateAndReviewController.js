/*eslint-disable */
import Util from '../helpers/utils';
import RatingService from '../services/ratingService';

const util = new Util();
 class ReviewController {
  
  static rateAccomodation = async(req, res, next)=> {
    try{
      const ratingInformation = req.body;
      ratingInformation.userId = req.userId;
      const rateAcc = await RatingService.addRating(ratingInformation);
      util.setSuccess(200, 'Rate succesfully added');
      return util.send(res);
    }catch(error){
      util.setError(400, error.message);
      return util.send(res);
    }
  }

 static getRating =async (req, res)=>{
  try{
    const getRate = await RatingService.getRating();
    if(getRate){
      util.setSuccess(200,'Rating and Reviews',getRate);
      return util.send(res);
    }
    util.setError(401, error.message);
  }catch(error){
    util.setError(500,error.message);
    return util.send(res);
  }
 }

}
export default ReviewController;

