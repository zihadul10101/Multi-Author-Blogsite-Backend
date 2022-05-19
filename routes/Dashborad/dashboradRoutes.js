const router = require('express').Router();
const {category_add,category_get} = require('../../controller/Dashborad/categoryController')
const {admin_middleware} = require('../../middlewar/authMiddlewar')

router.post('/add-category',admin_middleware,category_add)
router.get('/get-category',admin_middleware,category_get)

module.exports = router;