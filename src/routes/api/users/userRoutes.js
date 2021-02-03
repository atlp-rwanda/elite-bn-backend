/*eslint-disable */
import express from 'express';
import validateUserData from '../../../middlewares/validators/UserValidator'; 
import UserController from '../../../controllers/user';
import passport from '../../../database/config/passportSetup'; 
import Social from '../../../controllers/socialAuth';
import authorize from '../../../middlewares/userAuthorization';

const router = express.Router();
router.post('/signup', validateUserData.createUser, validateUserData.verifyIfEmailisAvailable ,UserController.signUp);
router.post('/signin', validateUserData.validateUserSigninData, validateUserData.verifySignin, UserController.signIn)
router.get('/verifyEmail/:token', validateUserData.verificationValidation ,UserController.accountVerification);
router.get('/auth/google/callback', passport.authenticate('google'), Social.Oauth);
router.get('/oauth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/oauth/facebook/', passport.authenticate('facebook', {scope: ['public_profile', 'email']}));
router.get('/facebook/callback', passport.authenticate('facebook'), Social.Oauth);
router.patch('/updateRole/:id', authorize.userAuthorize, UserController.changeRole);
router.delete('/delete/:id', authorize.userAuthorize, UserController.deleteUser)
export default router;

