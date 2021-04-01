/* eslint-disable no-underscore-dangle */
import accomodationService from '../services/accomodationServices';
import Util from '../helpers/utils';
import { uploadToCloud } from '../helpers/cloud';

const util = new Util();

export default class Accomodations {
  static async createAccomodations(req, res) {
    try {
      const accomodationImage = await uploadToCloud(req.file, res);
      const accomodation = {
        name: req.body.name,
        description: req.body.description,
        location_id: req.body.location_id,
        facilities: req.body.facilities,
        cost: req.body.cost,
        capacity: req.body.capacity,
        roomsLeft: req.body.roomsLeft,
        averageRating: req.body.averageRating,
        image: accomodationImage.url,
      };
      const newAccomodation = await accomodationService.create(accomodation);
      util.setSuccess(
        201,
        res.__('You have successfully created an accomodation'),
        newAccomodation,
      );
      util.send(res);
    } catch (error) {
      util.setError(
        500,
        res.__('There was an error while creating accomodation'),
      );
      util.send(res);
    }
  }

  static async getAccomodations(req, res) {
    try {
      const accomodations = await accomodationService.getAccomodations();
      util.setSuccess(
        200,
        res.__('All available accomodations'),
        accomodations,
      );
      util.send(res);
    } catch (error) {
      util.setError(
        500,
        res.__('There was an error while fetching accomodations'),
      );
      util.send(res);
    }
  }

  static async getAccomBylocatonId(req, res) {
    try {
      // eslint-disable-next-line camelcase
      const { location_id } = req.params;
      const accomodation = await accomodationService.findByProp({
        location_id,
      });
      util.setSuccess(
        200,
        res.__('Successfully fetched an accomodation'),
        accomodation,
      );
      util.send(res);
    } catch (error) {
      util.setError(
        500,
        res.__('There was an error while fetching accomodation'),
      );
      util.send(res);
    }
  }

  static async deleteAcoomodations(req, res) {
    try {
      const { accomodation } = req.params;
      const takeOutAccomodation = await accomodationService.deleteAccomodation(
        accomodation,
      );
      if (takeOutAccomodation) {
        util.setSuccess(200, res.__('You deleted an accomodation'));
        util.send(res);
      } else {
        util.setError(200, res.__('There is nothing to delete'));
        util.send(res);
      }
    } catch (error) {
      util.setError(
        500,
        res.__('There was an error while deleting an accomodation'),
      );
      util.send(res);
    }
  }

  static async updateAccomodation(req, res) {
    try {
      const accomodationImage = await uploadToCloud(req.file, res);
      const { id } = req.params;
      const updated = await accomodationService.updateAtt(
        {
          name: req.body.name,
          description: req.body.description,
          location_id: req.body.location_id,
          facilities: req.body.facilities,
          cost: req.body.cost,
          capacity: req.body.capacity,
          roomsLeft: req.body.roomsLeft,
          averageRating: req.body.averageRating,
          image: accomodationImage.url,
        },
        { id },
      );
      if (updated) {
        util.setSuccess(
          200,
          res.__('You have successfuly updated an accomodation'),
        );
        util.send(res);
      }
    } catch (error) {
      util.setError(500, res.__('There an error while updating accomadation'));
      util.send(res);
    }
  }
}
