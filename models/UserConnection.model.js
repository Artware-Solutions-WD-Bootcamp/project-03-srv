//DO import needed modules
const { Schema, model } = require("mongoose");

//DO define Schema
const userConnectionSchema = new Schema(
  {
    ownerID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    collabID: {
      type: Schema.Types.ObjectId,
      ref: "Collab",
    },
    memberRef: {
      type: String,
      required: true
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

//DO define Model
const UserConnectionModel = model("UserConnection", userConnectionSchema);

//DO export module
module.exports = UserConnectionModel;
