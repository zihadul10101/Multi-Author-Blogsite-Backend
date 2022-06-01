const categoryModel = require('../../models/categoryModel');
const tagModel = require('../../models/tagModel');
const formidable = require('formidable');
const { article_validator } = require('../../validator/validator')

module.exports.get_tag_category = async (req, res) => {

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
module.exports.add_artical = (req, res) => {
    const formDataHendle = formidable({
        multiples: true
    });
    formDataHendle.parse(req, (err, fields, files) => {
        if (!err) {
            const { title, category, slug, tag, text } = fields;  
            const validate= article_validator( fields, files)
            console.log(validate)
        }
    })
}