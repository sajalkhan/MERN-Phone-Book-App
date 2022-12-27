const joi = require('joi');

const schema = {
    contactInfo: {
        name: joi.string().max(20).required(),
        phone: joi.string().regex(/(^(\+8801|8801|01|008801|880-1))[1|3-9]{1}(\d){8}$/).required()
    },
    contactInfo2: {
        name: joi.string().max(20).required(),
        phone: joi.string().regex(/(^(\+8801|8801|01|008801|880-1))[1|3-9]{1}(\d){8}$/).required(),
        id: joi.string().required()
    },
    contactInfo3: {
        phone: joi.string().regex(/(^(\+8801|8801|01|008801|880-1))[1|3-9]{1}(\d){8}$/).required()
    }
}

module.exports = schema;