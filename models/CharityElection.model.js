//DO import needed modules
const { Schema, model } = require("mongoose");

//DO define Schema
const charityElectionSchema = new Schema(
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

//DO define Model
const CharityElectionModel = model("CharityElection", charityElectionSchema);

//DO export module
module.exports = CharityElectionModel;
