const Joi = require('joi');

const contactInfoValidation = (schema, property) => {

    return (req, res, next)=> {

        const { error } = Joi.validate(req[property], schema);
        const valid = error == null;
        
        if (valid) 
        {
          next();
        }
        else 
        {
            res.json({
                message: 'please Enter a valid BD phone number',
                error: true,
                data: req[property]
            });
        }

    }
}

module.exports = contactInfoValidation;