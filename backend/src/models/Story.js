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
      default: false,
    },
    anonymous: {
      type: Boolean,
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
      ref: "Theme",
    },
    complete: {
      type: Boolean
    }
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

storySchema.virtual("pages", {
  ref: "Page",
  localField: "_id",
  foreignField: "story",
  justOne: false, //create a list of pages related to a story
});

const Story = mongoose.model("Story", storySchema);
module.exports = Story;
