const Message = require('./message.model')
const User = require('../user/user.model')
const { createMessage } = require('./message.service')
const createMessageController = async (req,res) => {
    try {
        const { userId } = req.params
        const { messageText, emailMessage } = req.body

        const user = await User.findById(userId)
        if(!user){
            throw new Error('User not found')
        }

        const newMessage ={
            messageText, emailMessage, user: userId
        }
        const message = await createMessage(newMessage)
        user.messages.unshift(message)
        await user.save({ validateBeforeSave: false})

        res.status(201).json({message: 'message created', data: message})
    } catch (error) {
        res.status(400).json({ message: 'Message could not created', data: error.message })
    }
}
module.exports= {
    createMessageController,
}