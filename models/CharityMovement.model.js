//DO import needed modules
const { Schema, model } = require("mongoose");

//DO define Schema
const charityMovementSchema = new Schema(
  {
    ownerID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    charityID: {
      type: Schema.Types.ObjectId,
      ref: "CharityCauses",
    },
    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    charityStatus: {
      type: String,
      enum: ["new", "processing", "approved"],
      default: "new",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

//DO export module
const CharityMovementModel = model("CharityMovement", charityMovementSchema);

module.exports = CharityMovementModel;
