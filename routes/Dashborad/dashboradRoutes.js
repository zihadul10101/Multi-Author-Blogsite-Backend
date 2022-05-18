const router = require('express').Router();
const {category_add} = require('../../controller/Dashborad/categoryController')
const {admin_middleware} = require('../../middlewar/authMiddlewar')

router.post('/add-category',admin_middleware,category_add)

module.exports = router;