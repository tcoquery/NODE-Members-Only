const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {type: String, required: true, maxLength: 100},
    text: {type: String, required: true, maxLength: 500},
    created_at: { type: Date, default: Date.now },
    user: {type: Schema.Types.ObjectId, ref: "User"}
  }
);

//Export model
module.exports = mongoose.model('Post', PostSchema);
