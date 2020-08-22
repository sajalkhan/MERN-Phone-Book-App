const mongooose = require('mongoose');

//contact schema
const contactSchema = mongooose.Schema({
    name:{
        type: String,
        require:true
    },
    phone:{
        type: String,
        require: true,
        unique: true
    }
});

const contact = module.exports = mongooose.model('ContactInfo',contactSchema);
