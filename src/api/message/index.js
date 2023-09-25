const router = require('express').Router();
const { createMessageController } = require('./message.controller')

router.route('/:userId').post(createMessageController)


module.exports = router;