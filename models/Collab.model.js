//DO import needed modules
const { Schema, model } = require("mongoose");

//DO define Schema
const collabSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      unique: true,
    },
    registerUrl: {
      type: String,
    },
    logo: {
      type: String,
    },
    visibility: {
      type: Boolean,
      default: false,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

//DO define Model
const CollabModel = model("Collab", collabSchema);

//DO export module
module.exports = CollabModel;