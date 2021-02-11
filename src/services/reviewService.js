import database from '../models';

const { Reviews, Ratings } = database; 
/*remember to create Reviews model*/

export default class ReviewService {
  
  static async addReview(review) {
    try {
      return await Reviews.create(review);
    } catch (error) {
      throw error;
    }
  }

  
  static async updateOrCreate(data) {
    try {
      let rating = await this.getUserAccommodationRating(data.userId, data.accommodationId);

      if (rating === null) return await Ratings.create(data);

      rating = await Ratings.update({ rating: data.rating }, { where: { id: rating.id } });
      return rating;
    } catch (error) {
      throw error;
    }
  }

  
  static async getUserAccommodationRating(userId, accommodationId) {
    try {
      const rating = await Ratings.findOne({ where: { userId, accommodationId } });
      return rating;
    } catch (error) {
      throw error;
    }
  }

  
  static async getAccommodationRating(accommodationId) {
    try {
      const accommRating = await Ratings.findAll({
        where: { accommodationId }
      });
      return accommRating;
    } catch (error) {
      throw error;
    }
  }

  
  static async deleteRating(ratingId) {
    try {
      return await Ratings.destroy({ where: { id: ratingId } });
    } catch (error) {
      throw error;
    }
  }
}
 
