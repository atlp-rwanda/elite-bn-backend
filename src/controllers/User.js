import Util from '../helpers/utils';
import userServices from '../services/userService';
import sendEmail from '../services/emailService';
import emailTemplate from '../services/template/sendEmail';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

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
            const {id, firstName, lastName, email,roleId} = userDetails.dataValues;
            const response = {
                id,
                fullName: `${firstName} ${lastName}`,
                email,
                roleId
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
    static async findById (req,res) {
        const userId = req.params.id;
        
        try {
            const user = await userServices.findById(userId);
            util.setSuccess(200, user)
            util.send (res)
        } catch (error) {
            util.setError(500,error.message)
            util.send(res)
        }
    }
    static changeRole = async (req, res) =>{
        try {
            const { id } = req.params;
            const user = await userServices.findById(id);
            if(user){
                const update = await userServices.updateAtt({
                    roleId: req.body.roleId,
                  }, { id });
      
                  util.setSuccess('200', 'user role successfully changed');
                  return util.send(res);
            }

            util.setError(404, 'user not found');
            util.send(res);
        } catch (error) {
            util.setError(500,error.message)
            util.send(res)
        }
    }
    static deleteUser = async (req,res) =>{
        try {
        const { id } = req.params;
            const user = await userServices.findById(id);
            if(user){
                const update = await userServices.deleteById(id);
      
                  util.setSuccess('200', 'user successfully deleted');
                  return util.send(res);
            }

            util.setError(404, 'user not found');
            util.send(res);
        } catch (error) {
            util.setError(500,error.message)
            util.send(res)
        }
    }
}
    module.exports = User;