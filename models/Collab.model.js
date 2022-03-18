const { Schema, model } = require("mongoose");

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

const CollabModel = model("Collab", collabSchema);

module.exports = CollabModel;
