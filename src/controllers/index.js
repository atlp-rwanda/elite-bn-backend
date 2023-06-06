/*eslint-disable */
import Util from '../helpers/utils';

const util = new Util();

const sendWelcome = (req, res) => {
  util.setSuccess(200, res.__('Welcome to Barefoot Nomad Travel app'));
  return util.send(res);
};

export default sendWelcome;
