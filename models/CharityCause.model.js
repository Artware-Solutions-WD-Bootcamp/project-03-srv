//DO import needed modules
const { Schema, model } = require("mongoose");

//DO define Schema
const charityCauseSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    url: {
      type: String,
    },
    logo: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    visible: {
      type: Boolean,
      default: true,
    },
    assignedAmount: {
      type: Number,
    },
    deliveryProof: {
      type: String,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

//DO define Model
const CharityCauseModel = model("CharityCause", charityCauseSchema);

//DO export module
module.exports = CharityCauseModel;
