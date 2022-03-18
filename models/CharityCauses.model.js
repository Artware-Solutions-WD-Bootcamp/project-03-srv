const { Schema, model } = require("mongoose");

const charityCausesSchema = new Schema(
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

const CharityCausesModel = model("CharityCause", charityCausesSchema);

module.exports = CharityCausesModel;
