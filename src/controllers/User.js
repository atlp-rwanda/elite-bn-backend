import Util from '../helpers/utils';
import userServices from '../services/userService';
import sendEmail from '../services/emailService';
import emailTemplate from '../services/template/sendEmail';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { uploadToCloud } from '../helpers/cloud';

dotenv.config();

const util = new Util();

class User {
    static signUp = async (req, res) => {
        const {
            email,
            firstName,
            password,
            lastName
        } = req.body;
        const newUser = {
            email,
            password: await bcrypt.hash(password, 10),
            firstName,
            lastName
        };

        const createdUser = await userServices.createuser(newUser);
        const createdUserDetails = createdUser.dataValues;

        const token = jwt.sign({
            id: createdUserDetails.id,
            email: createdUserDetails.email
        }, process.env.PRIVATE_KEY, {
            expiresIn: '7d'
        });
        const subject = 'Verify email for Barefoot Nomad';

        sendEmail(emailTemplate(token, createdUserDetails.firstName), subject, email);
        const message = `Dear ${createdUserDetails.firstName} , A verification email has been sent to you email please go and confirm that email.`;
        const data = {
            id: createdUserDetails.id,
            email: createdUserDetails.email,
            token,
        };
        util.setSuccess(201, message, data);
        return util.send(res);


    }

    static accountVerification = async (req, res) => {
        try {
            const {
                token
            } = req.params;
            const decodeToken = jwt.verify(token, process.env.PRIVATE_KEY);
            await userServices.updateAtt({
                isVerified: true
            }, {
                email: decodeToken.email
            });
            const message = 'Account was succesfully verified';
            util.setSuccess(200, message);
            return util.send(res);
        } catch (error) {
            util.setError(410, error);
            return util.send(res);
        }

    }
    static signIn = async (req, res) => {
        try {
            const userDetails = req.user;
            const {id, firstName, lastName, email} = userDetails.dataValues;
            const response = {
                id,
                fullName: `${firstName} ${lastName}`,
                email
            }
            const accessToken = jwt.sign(response, process.env.PRIVATE_KEY, { expiresIn: '7d' });
            await userServices.updateAtt({token:accessToken}, { id: response.id});
            const data = {
                token: accessToken,
                userInfo: response,
            }
            util.setSuccess(200, 'You have successfully signed in', data);
            return util.send(res)
        } catch (err) {
            util.setError(500, err.message);
            return util.send(res);
        }
    }
    static async updateProfile(req, res) {
        try {
         const profileImage = await uploadToCloud(req.file, res);
          const { id } = req.userData;
     
          const userExist = await userServices.findById(id);
          if (userExist) {
            const update = await userServices.updateAtt({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              preferedLanguage: req.body.preferedLanguage,
              profilePicture: profileImage.url,
              officeAddres: req.body.officeAddres,
            }, { id });
          
            util.setSuccess('200', 'user profile updated');
            return util.send(res);
          }
          util.setError(404, 'The user doesn\'t exist');
          return util.send(res);
        } catch (error) {
          util.setError(500, error.message);
          return util.send(res);
        }
      }
      static async getProfile(req, res) {
        try {
          const { id } = req.params;
          const {
            firstName, lastName, email,role, profilePicture, preferedLanguage, officeAddres,
          } = await userServices.findById(id);
    
          const userdata = {
            firstName, lastName, email,role, profilePicture, preferedLanguage, officeAddres,
          };
          const message = 'profile details displayed successfully!';
          util.setSuccess(200, message, userdata);
          return util.send(res);
        } catch (error) {
          util.setError(500, 'can\'t retrieve the data');
          return util.send(res);
        }
      }
    

}
    module.exports = User;