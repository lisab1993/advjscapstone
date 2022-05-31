const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const storySchema = Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    private: {
      type: Boolean,
      required: true,
      default: false,
    },
    ripsAllowed: {
      type: Number,
      required: true,
    },
    storyPremise: {
      type: String,
      required: true,
    },
    theme: {
        type: ObjectId,
        ref: "Theme"
    }
  },
  {
    toObject: {
      virtuals: true,
    },
  }
);


const Story = mongoose.model("Story", storySchema);
module.exports = Story;
