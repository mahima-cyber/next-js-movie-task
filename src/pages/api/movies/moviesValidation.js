import Joi from 'joi';

const moviesValidation = Joi.object({
    title: Joi.string().required(),
    year: Joi.string().required()
}).options({ abortEarly: false })

export default moviesValidation;