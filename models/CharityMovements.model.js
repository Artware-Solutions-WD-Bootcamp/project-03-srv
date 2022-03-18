const { Schema, model } = require("mongoose");

const charityMovementsSchema = new Schema(
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

const CharityMovementsModel = model("CharityMovement", charityMovementsSchema);

module.exports = CharityMovementsModel;
