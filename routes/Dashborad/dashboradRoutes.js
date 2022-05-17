const router = require('express').Router();
const {category_add} = require('../../controller/Dashborad/categoryController')

router.post('/add-category',category_add)

module.exports = router;