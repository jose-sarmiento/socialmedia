const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
    {
        from: {},
        to: { 
            type: Schema.Types.ObjectId,
            required:true
        },
        'type': {
            type: String,
            required: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        createdAt: { type: Date, default: Date.now },
    });

module.exports = mongoose.model("Notification", notificationSchema);
