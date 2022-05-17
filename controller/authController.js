const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminModel = require('../models/adminModel')
module.exports.admin_login = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    const error = {}

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
                    const token = jwt.sign({
                        id: getAdmin._id,
                        name: getAdmin.adminname,
                        role: getAdmin.role,
                        image: getAdmin.image,
                    }, 'zihadulid', { expiresIn: '7d' });

                    return res.status(200).cookie("blog_token", token, {
                        expires: new Date(
                            Date.now() + 7 * 24 * 60 * 60 * 1000
                        ),
                        httpOnly: true
                    }).json({
                        successMessage: 'Congratulations Login successful',
                        token: token
                    });
                }
                else {
                    return res.status(404).json({ errorMessage: { error: "Password does not match" } });
                }
            } else {
                return res.status(404).json({ errorMessage: { error: 'Email does not exist' } });
            }
        } catch (error) {
            return res.status(500).json({ errorMessage: { error: 'Server error' } });

        }
    }
}