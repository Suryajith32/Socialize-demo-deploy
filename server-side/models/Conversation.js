const mongoose = require('mongoose')

const ConversationSchema = new mongoose.Schema(
    {
    members:{
        type:Array
    },
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "message",
    },
 },
{timestamps:true}
);

module.exports=mongoose.model('conversation',ConversationSchema)