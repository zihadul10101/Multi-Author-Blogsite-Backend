const validator = require('validator');
const bcrypt = require('bcrypt');
const adminModel = require('../models/adminModel')
module.exports.admin_login = async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;

    const error = {

    }

    if (email && !validator.isEmail(email)) {
        error.email = 'please provide your valid email'
    }
    if (!email) {
        error.email = 'please provide your  email'
    }
    if (!password) {
        error.password = 'please provide your password'
    }
    if (Object.keys(error).length > 0) {
        return res.status(400).json({ errorMessage: error })
    } else {
        try {
            const getAdmin = await adminModel.findOne({ email }).select('+password');
            // console.log(getAdmin);
            if (getAdmin) {
                const matchPassword = await bcrypt.compare(password, getAdmin.password);
                // console.log(matchPassword);
                if (matchPassword) {

                }
                else {
                    return res.status(404).json({ errorMessage: 'Password does not exist' });

                }
            } else {
                return res.status(404).json({ errorMessage: 'Email does not exist' });
            }
        } catch (error) {
            console.log(error);
        }
    }
}