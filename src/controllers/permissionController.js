/* eslint-disable no-underscore-dangle */
import Util from '../helpers/utils';
import permissionServices from '../services/permissionServices';

const util = new Util();
export default class Permission {
  static async createPermission(req, res) {
    try {
      const { permissionName } = req.body;
      const createdPermission = await permissionServices.createPermission({
        permissionName,
      });
      util.setSuccess(200, res.__('Permission created'), createdPermission);
      return util.send(res);
    } catch (error) {
      util.setError(
        500,
        res.__('There was an error while creating a permission'),
      );
      return util.send(res);
    }
  }

  static async getAllPermission(req, res) {
    try {
      const permissions = await permissionServices.getAllPermissions();
      util.setSuccess(200, res.__('all permissions'), permissions);
      return util.send(res);
    } catch (error) {
      util.setError(500, res.__('Unable to retrieve all permissions'));
      return util.send(res);
    }
  }

  static async findPermissionById(req, res) {
    try {
      const { id } = req.params;
      const singlePermission = await permissionServices.findPermissionById(id);
      util.setSuccess(
        200,
        res.__('Successfully fetched permission'),
        singlePermission,
      );
      return util.send(res);
    } catch (error) {
      util.setError(
        500,
        res.__('There was an error while fetching a permission'),
      );
      return util.send(res);
    }
  }

  static async updatePermission(req, res) {
    try {
      const { permissionName } = req.body;
      const { id } = req.params;
      const updatedPermission = await permissionServices.updatePerm(
        { permissionName },
        { id },
      );
      util.setSuccess(
        200,
        res.__('Permission updated successfuly', updatedPermission),
      );
      return util.send(res);
    } catch (error) {
      util.setError(
        500,
        res.__('There was an error while updating permission'),
      );
      return util.send(res);
    }
  }

  static async deletePermission(req, res) {
    try {
      const { id } = req.params;
      const deletedPermission = await permissionServices.deletePermission(id);
      util.setSuccess(
        200,
        res.__('Permission deleted successfully'),
        deletedPermission,
      );
      return util.send(res);
    } catch (error) {
      util.setError(
        500,
        res.__('There was an error while deleting permission'),
      );
      return util.send(res);
    }
  }
}
