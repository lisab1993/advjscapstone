const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const pageSchema = Schema(
    {
        pageNumber: {
            type: Number,
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
        //one of these is the correct answer, the other rips a page. If the boolean is true, it's a ripped page
        optionOneImpact: {
            type: Boolean,
            required: true
        },
        optionTwoImpact: {
            type: Boolean,
            required: true
        },
    }
)

  
  const Page = mongoose.model("Page", pageSchema);
  module.exports = Page;