const categoryModel = require('../../models/categoryModel');
const tagModel = require('../../models/tagModel');

module.exports.get_tag_category = async (req, res) => {
    console.log(req);
    try {
        const allTag = await tagModel.find({});
        const allCategory = await categoryModel.find({});
        res.status(200).json({ allCategory, allTag })
    } catch (error) {
        res.status(500).json({
            errorMessage: {
                error: 'Internal server error'
            }
        })
    }
}