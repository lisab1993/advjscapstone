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
    },
    bookImage: {
      type: String,
    },
    premiseBackground: {
      type: String,
    },
    winningBackground: {
      type: String,
    },
    losingBackground: {
      type: String,
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
