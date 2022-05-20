const router = require('express').Router();
const {category_add,category_get,category_delete,edit_category} = require('../../controller/Dashborad/categoryController')
const {admin_middleware} = require('../../middlewar/authMiddlewar')

router.post('/add-category',admin_middleware,category_add)
router.get('/get-category',admin_middleware,category_get)
router.delete('/delete-category/:categoryId',admin_middleware,category_delete)
router.get('/edit-category/:categorySulg',admin_middleware,edit_category)

module.exports = router;