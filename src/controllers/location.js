/* eslint-disable no-underscore-dangle */
import locationService from '../services/locationService';
import Util from '../helpers/utils';

const util = new Util();

export default class locations {
  static async createLocation(req, res) {
    try {
      const location = {
        location_id: req.body.location_id,
        name: req.body.name,
      };
      const newLocation = await locationService.createlocation(location);
      util.setSuccess(
        200,
        res.__('You have successfuly created a location'),
        newLocation,
      );
      return util.send(res);
    } catch (error) {
      util.setError(500, res.__('There was an error while creating location'));
      return util.send(res);
    }
  }

  static async getLocations(req, res) {
    try {
      const locationss = await locationService.getlocation();
      util.setSuccess(
        200,
        res.__('You have successfuly fetched all the available locations'),
        locationss,
      );
      util.send(res);
    } catch (error) {
      util.setError(
        500,
        res.__('There was an error while fetching all locations'),
      );
      util.send(res);
    }
  }

  static async deleteLocations(req, res) {
    try {
      const { id } = req.params;
      const location = await locationService.findById(id);
      if (location) {
        const update = await locationService.deletelocation(id);
        if (update) {
          util.setSuccess(200, res.__('You have removed a location!'));
          util.send(res);
        }
        util.setError(500, res.__('Failed to delete location'));
        util.send(res);
      }
      util.setError(404, res.__('There is no such location to delete'));
      util.send(res);
    } catch (error) {
      util.setError(
        500,
        res.__('There was an error while deleting a location'),
      );
      util.send(res);
    }
  }

  static async updateLocation(req, res) {
    try {
      const { id, name } = req.params;
      const doesLocationExist = await locationService.findById(id);
      if (doesLocationExist) {
        const updateLocation = await locationService.updateAtt(
          { id },
          { name },
        );
        if (updateLocation) {
          util.setSuccess(200, res.__('Location updated!'));
          util.send(res);
        }
        util.setError(500, res.__('Failed to update location'));
        util.send(res);
      } else {
        util.setError(404, res.__('That location does not exist'));
        util.send(res);
      }
    } catch (error) {
      util.setError(
        500,
        res.__('There was an error while updating a location'),
      );
      util.send(res);
    }
  }
}
