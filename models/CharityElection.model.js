//DO import needed modules
const { Schema, model } = require("mongoose");

//DO define Schema
const charityElectionSchema = new Schema(
  {
    ownerID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    charityID: {
      type: Schema.Types.ObjectId,
      ref: "Charity",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    points: {
      type: Number,
      required: true,
      maximum: 10,
      description: "must be an integer in [ 1, 10 ] and is required"
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
