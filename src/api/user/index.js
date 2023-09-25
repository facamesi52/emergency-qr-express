const router = require('express').Router();
const { createUserController, listUsersController, showUserController, updateUserController, deleteUserController, } = require('./user.controller');

router.route('/').post(createUserController)
router.route('/').get(listUsersController)
router.route('/:id').get(showUserController)
router.route('/:id').put(updateUserController)
router.route('/:id').delete(deleteUserController)
module.exports = router;