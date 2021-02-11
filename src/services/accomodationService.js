import database from '../database/models';

const { Accommodations, Rooms } = database;


export default class AccommodationService {
  

  static async getAccommodation(params) {
    try {
      return await Accommodations.findOne({
        d
      });
    } catch (error) {
      throw error;
    }
  }


}
 
