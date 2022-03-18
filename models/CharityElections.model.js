const { Schema, model } = require("mongoose");

const charityElectionsSchema = new Schema(
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
    points: {
      type: Number,
      required: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const CharityElectionsModel = model("CharityElection", charityElectionsSchema);

module.exports = CharityElectionsModel;
