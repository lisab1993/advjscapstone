const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const pageSchema = Schema(
    {
        type: {
            type: String,
            required: true
        },
        story: {
            type: ObjectId,
            required: true,
            ref: "Story"
        },
        body: {
            type: String,
            required: true
        },
        optionOne: {
            type: String,
            required: true
        },
        optionTwo: {
            type: String,
            required: true
        },
        optionOneImpact: {
            type: Number,
            required: true
        },
        optionTwoImpact: {
            type: Number,
            required: true
        },
    }
)

  
  const Page = mongoose.model("Page", pageSchema);
  module.exports = Page;