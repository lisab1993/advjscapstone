const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const themeSchema = Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    backgroundImage: {
      type: String,
      required: true,
    },
    bookImage: {
      type: String,
      required: true,
    },
    pageImage: {
      type: String,
      required: true,
    },
    winningBackground: {
      type: String,
      required: true,
    },
    losingBackground: {
      type: String,
      required: true,
    },
  },
  {
    toObject: {
      virtuals: true,
    },
  }
);



const Theme = mongoose.model("Theme", themeSchema);
module.exports = Theme;
