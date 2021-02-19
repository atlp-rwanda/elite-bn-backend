/*eslint-disable */
import RatingsValidationSchema from '../../helpers/validateSchemas/ratings';
import Util from '../../helpers/utils';
import jwt from 'jsonwebtoken';

const util = new Util();
class ratingsValidation{
    static validate = (req, res, next)=>{
        const {error} = RatingsValidationSchema.validate(req.body);
        if(error){
            util.setError(400, error.message);
            return util.send(res);
        }else{
            next();
        }
    }
    static sendToken = (req, res, next)=>{
        try{
            const UserId = await jwt.verify(req.headers['authorization'].split(' ')[1], process.env.PRIVATE_KEY).id;
            req.userId = UserId;
            next();
        }catch(error){
            util.setError(400, error.message);
            return util.send(res);
        } 
    }
    
}
export default ratingsValidation;