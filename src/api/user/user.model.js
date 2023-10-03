const {Schema, model} = require('mongoose')

const userSchema = new Schema(
    {
        email:{
            type: String,
            required: [true, 'userMail is required']
        },
        _id:{
            type: String,
            required: [true, 'userId is required']
        },
        userName: String,
        messages: {
            type: [{type: Schema.Types.ObjectId,
            ref: 'message'
            }],
            required: false
        },
        
    },

    {
        timestamps: true,
        versionKey: false,
    }
)

const User = model('user', userSchema)
module.exports = User