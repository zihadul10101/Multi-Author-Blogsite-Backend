const tagModel = require('../../models/tagModel')
module.exports.tag_add = async (req, res, next) => {
    const { tagName, tagDescription } = req.body;
console.log(tagName);
    const error = {};
    if (!tagName) {
        error.tagName = 'please provide your  tag Name'
    }
    if (!tagDescription) {
        error.tagDescription = 'please provide your tag Description'
    }
    if (Object.keys(error).length === 0) {
        const tagSulg = tagName.trim().split(' ').join('-')
        try {
            const checkTag = await tagModel.findOne({
                tagSulg
            })
            if (checkTag) {
                res.status(400).json({
                    errorMessage:
                        { error: 'Already added tag' }
                })

            } else {
                await tagModel.create({
                    tagName: tagName.trim(),
                    tagSulg,
                    tagDescription
                })
                res.status(200).json({
                    successMessage: 'Tag added successfully'
                })
            }
        } catch (error) {
            res.status(500).json({
                errorMessage:
                    { error: 'Internal Error' }
            })
        }
    } else {
        res.status(400).json({ errorMessage: error })

    }
}

module.exports.tag_get = async (req, res) => {
    const { page, searchValue } = req.query;
    const perPage = 3;
    const skipPage = parseInt(page - 1) * perPage;
    if (searchValue === 'undefined' || !searchValue) {
        try {
            const tagCount = await tagModel.find({}).countDocuments();
            const getTag = await tagModel.find({}).skip(skipPage).limit(perPage).sort({ cateatedAt: 1 })
            res.status(200).json({
                allTag: getTag,
                perPage,
                tagCount
            })

        } catch (error) {
            res.status(500).json({
                errorMessage:
                    { error: 'Internal Error' }
            })
        }
    } else {
        try {
            const tagCount = await tagModel.find({})
            let getTag = await tagModel.find({})
            getTag = getTag.filter(tag => tag.tagName.toUpperCase().indexOf(searchValue.toUpperCase() > 1)
            )
            res.status(200).json({
                allTag: getTag,
                perPage,
                tagCount
            })

        } catch (error) {
            res.status(500).json({
                errorMessage:
                    { error: 'Internal Error' }
            })
        }
    }
}
module.exports.tag_delete = async (req, res) => {
    const tagId = req.params.tagId
    try {
        const tagDelete = await tagModel.findByIdAndDelete(tagId);
        res.status(200).json({
            successMessage: 'tag deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            errorMessage:
                { error: 'Internal Error' }
        })
    }
}
module.exports.edit_tag = async (req, res) => {

    const tagSulg = req.params.tagSulg

    try {
        const editTag = await tagModel.findOne({ tagSulg });
        res.status(200).json({
            editTag
        })
    } catch (error) {
        res.status(500).json({
            errorMessage:
                { error: 'Internal Error' }
        })
    }
}
module.exports.tag_update = async (req, res) => {

    const { tagId } = req.params;
    const {tagName, tagDescription } = req.body;
    const error = {};

    if (!tagName) {
        error.tagName = 'Please provide tag name';
    }
    if (!tagDescription) {
        error.tagDescription = 'Please provide tag description'
    }
    if (Object.keys(error).length == 0) {
        const tagSlug = tagName.trim().split(' ').join('-');
        try {
            await tagModel.findByIdAndUpdate(tagId, {
                tagName: tagName.trim(),
                tagSlug,
                tagDescription
            })
            res.status(200).json({
                successMessage: 'Tag update successfull'
            })
        } catch (error) {
            res.status(500).json({
                errorMessage: {
                    error: 'Internal server error'
                }
            })
        }
    } else {
        res.status(400).json({ errorMessage: error });
    }
}



