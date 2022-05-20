const categoryModel = require('../../models/categoryModel')
module.exports.category_add = async (req, res, next) => {
    const { categoryName, categoryDescription } = req.body;

    const error = {};
    if (!categoryName) {
        error.categoryName = 'please provide your  category Name'
    }
    if (!categoryDescription) {
        error.categoryDescription = 'please provide your category Description'
    }
    if (Object.keys(error).length === 0) {
        const categorySulg = categoryName.trim().split(' ').join('-')
        try {
            const checkCategory = await categoryModel.findOne({
                categorySulg
            })
            if (checkCategory) {
                res.status(400).json({
                    errorMessage:
                        { error: 'Already added category' }
                })

            } else {
                await categoryModel.create({
                    categoryName: categoryName.trim(),
                    categorySulg,
                    categoryDescription
                })
                res.status(200).json({
                    successMessage: 'Category added successfully'
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

module.exports.category_get = async (req, res) => {
    const { page, searchValue } = req.query;
    const perPage = 3;
    const skipPage = parseInt(page - 1)*perPage;
    if (searchValue === 'undefined' || !searchValue) {
        try {
            const categoryCount = await categoryModel.find({}).countDocuments();
           const getCategory =await categoryModel.find({}).skip(skipPage).limit(perPage).sort({cateatedAt:1})
           res.status(200).json({
               allCategory: getCategory,
               perPage,
               categoryCount
        })
         
        } catch (error) {
            res.status(500).json({
                errorMessage:
                    { error: 'Internal Error' }
            })
        }
    }else{
        try {
            const categoryCount = await categoryModel.find({})
           let getCategory = await categoryModel.find({})
           getCategory = getCategory.filter(category => category.categoryName.toUpperCase().indexOf(searchValue.toUpperCase()>1)
            )
           res.status(200).json({
               allCategory: getCategory,
               perPage,
               categoryCount
        })
         
        } catch (error) {
            res.status(500).json({
                errorMessage:
                    { error: 'Internal Error' }
            })
        }  
    }
}