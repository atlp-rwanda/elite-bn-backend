import Util from '../helpers/utils';
import userServices from '../services/userService';
import sendEmail from '../services/emailService';
import emailTemplate from '../services/template/sendEmail';
import passwordTemplate from '../services/template/passwordTemplate';
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
    // forget password

    static forgetpassword = async (req, res) => {
        const {email}=req.body;
        try{
            
            const generateToken = (payloads) => {
                const token = jwt.sign(payloads, process.env.PRIVATE_KEY, { expiresIn: '1d' });
                  return token;
            };
            const token=generateToken({email});

            const subject = 'Reset Password for Barefoot Nomad';
            const url=`${process.env.PASSWORD_RESET_URL}`;
            sendEmail(passwordTemplate(token, url, email), subject, email);
            const message = `Dear , A reset Password has been sent to you email please go and click the link.`;
            const data = {
                id: email,
                token
            };
            util.setSuccess(200, message, data);
            return util.send(res);
        }catch(error){
          util.setError(500,error.message);
          return util.send(res);
    }
  }

  // reset password

  static resetpassword = async(req,res) =>{
    const token = req.params.newToken;
    try{
        const  decodeToken = (token) => {
            const payload = jwt.verify(token, process.env.PRIVATE_KEY);
            return payload;
          };
        const user = decodeToken(token);
        const exists = await userServices.findByEmail(user.email);
        
        
        const password = req.body;
        
        if (password) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            await exists.update( {password: hash });
            return res.status(200).json({message:'password was reseted successful'});
        }
      }catch(error) {
          return res.status(500).json({message: error.message});
      }       
  }
}
    module.exports = User;