/*eslint-disable */
import Joi from 'joi';

const RatingsValidationSchema = Joi.object({
    accommodationId: Joi.number().required(),
    rating: Joi.number().required(),
    review: Joi.string()
});

export default RatingsValidationSchema;