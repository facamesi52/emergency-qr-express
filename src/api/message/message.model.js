const {Schema, model} = require('mongoose')

const messageSchema = new Schema(
    {
        messageText:{
            type: String,
            required : [true, 'messageText is required ']
        },
        emailMessage:{
            type: String,
            required: [false, 'emailMessage is not required']
        },
        user:{
            type: Schema.Types.String, 
            ref: 'user',
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
)
const Message = model('message', messageSchema)
module.exports = Message