var express = require('express');
var router = express.Router();
var contact_model = require('../Models/Contact');
const contactSchema = require('../Validation/contactInfoSchema');
const contactInfoValidation = require('../Validation/ContactValidation');

/**
 * Get all Contact
 */
router.get('/', async (req, res) => {

    try {
        const getData = await contact_model.find((err, data) => {

            if (err) return console.log(err);
            res.send(data);
        });
    } catch (err) {

    }

});

/**
 * add new Contact
 */
router.post('/addnewContact', contactInfoValidation(contactSchema.contactInfo,'body'), async (req, res) => {

    var name = req.body.name;
    var phone = req.body.phone;

    contact_model.findOne({phone: phone} , (err, data)=>{
        if(data)
        {
            res.send({
                message: `${phone} number exists, choose another number`,
                error: true,
                data: data
            })
        }
        else
        {
            var contat = new contact_model({
                name: name,
                phone: phone
            });
        
            contat.save((err) => {
                res.send(contat);
            })
        }
    })

});

/**
 * Post edit contact 
 */
router.put('/editContact', contactInfoValidation(contactSchema.contactInfo2, 'body'), async (req, res) => {

    var name = req.body.name;
    var phone = req.body.phone;
    var id = req.body.id;

    try {
        contact_model.findById(id, (err, data) => {

            if (err) return console.log('edit contact error ' + err);

            if (data.name == name && data.phone == phone) {
                res.json({
                    message: 'Contact Information is Already exists!',
                    data: req.body
                });
            }
            else {

                // just assign value so it will update
                data.name = name;
                data.phone = phone;

                data.save((err) => {
                    if (err) return console.log(err);
                    res.send({
                        message: 'Contact Updated Successfully!',
                        data: data
                    });
                });
            }
        });
    } catch (err) {

    }
});

/**
 * post Delete contact 
 */
router.post('/DeleteContact', async (req, res) => {

    try {

        await contact_model.findByIdAndDelete(req.body.id, (err) => {
            if (err) return console.log(err);
            
            res.send({
                message: 'Contact Deleted Successfully!'
            })
        });
    } catch (err) {
        console.log('error on delete function ' + err);
    }
});

router.post('/searchContact', contactInfoValidation(contactSchema.contactInfo3, 'body'), async (req, res) => {

    var phone = req.body.phone;
    if (!phone) {
        //res.redirect('/');
    }
    else
    {
        try {
            await contact_model.find({ phone: phone }, (err, data) => {
                if (err) return console.log('search '+err);
                
                if(data)
                {
                    res.render('contactPage', {
                        info: data,
                        name: data.name,
                        phone: data.phone,
                        id: data._id
                    });
                } 
                else 
                {
                    //req.flash('warning',`${phone} number not found!`);
                    res.redirect('/');
                }
            });
        }
        catch (err) {
    
        }
    }
});

module.exports = router;