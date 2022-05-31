const router = require('express').Router();
const {category_add,category_get,category_delete,edit_category,category_update} = require('../../controller/Dashborad/categoryController')
const {tag_add,tag_get,tag_delete,edit_tag,tag_update} = require('../../controller/Dashborad/tagController')
const {get_tag_category,add_artical} = require('../../controller/Dashborad/articalController')
const {admin_middleware} = require('../../middlewar/authMiddlewar')
// category route

router.post('/add-category',admin_middleware,category_add)
router.get('/get-category',admin_middleware,category_get)
router.delete('/delete-category/:categoryId',admin_middleware,category_delete)
router.get('/edit-category/:categorySulg',admin_middleware,edit_category);
router.patch('/update-category/:categoryId',admin_middleware, category_update);

// tag route
router.post('/add-tag',admin_middleware,tag_add)
router.get('/get-tag',admin_middleware,tag_get)
router.delete('/delete-tag/:tagId',admin_middleware,tag_delete)
router.get('/edit-tag/:tagSulg',admin_middleware,edit_tag);
router.patch('/update-tag/:tagId',admin_middleware, tag_update);

//artical route............

router.get('/get-tag-category',admin_middleware, get_tag_category);
router.post('/add-artical',admin_middleware, add_artical);

module.exports = router;