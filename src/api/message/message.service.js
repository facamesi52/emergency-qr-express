const Message = require('./message.model')
const createMessage = async (data) => {
    try {
        const message = await Message.create(data)
        return message
    } catch (error) {
        throw new Error(error)
    }
    }

    module.exports = {
        createMessage,
    }