const categoryModel = require('../../models/categoryModel');
const tagModel = require('../../models/tagModel');
const formidable = require('formidable');
const { article_validator } = require('../../validator/validator')
const fs = require('fs');

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
    const { adminId, adminName } = req;
    // console.log(adminName)
    formDataHendle.parse(req, (err, fields, files) => {
        if (!err) {
            const { title, category, slug, tag, text } = fields;

            const validate = article_validator(fields, files)
            if (!validate.validated) {
                const categoryName = category.split('-').join(' ');
                const tagName = tag.split('-').join(' ');
                files.image.originalFilename = Date.now() + files.image.originalFilename;
                // console.log(files.image.originalFilename)
                const uploadPath = __dirname + `../../../../frontend/public/articalImage/${files.image.originalFilename}`;
                // console.log(uploadPath)
                fs.copyFile(files.image.filepath, uploadPath, error => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('file updated successfully')
                    }
                })
            } else {
                res.status(400).json({ errorMessage: validate.error })
            }
        }
    })
}