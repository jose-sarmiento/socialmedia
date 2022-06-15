const mongoose = require("mongoose");

const { Schema } = mongoose;

const notificationSchema = new Schema(
  {
    from: {},
    to: {
      type: Schema.Types.ObjectId,
      required: true
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
