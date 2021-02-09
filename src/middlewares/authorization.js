import jwt from 'jsonwebtoken';
import Util from '../helpers/utils';
import userService from '../services/userService';

const util = new Util();

const decodeToken = async (token) => { await jwt.verify(token, process.env.PRIVATE_KEY); };

const isAuthenticated = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    const decoded = await decodeToken(authToken);
    const loggedIn = await userService.findByProp({ authToken });
    if (!loggedIn[0]) {
      const Error = 'Login first To continue';
      util.setError(401, Error);
      return util.send(res);
    }
    req.userInfo = decoded;
    next();
  } catch (error) {
    util.setError(500, error.message);
    return util.send(res);
  }
};

export default isAuthenticated;