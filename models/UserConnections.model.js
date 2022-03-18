const { Schema, model } = require("mongoose");

const userConnectionsSchema = new Schema(
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

const UserConnectionsModel = model("UserConnection", userConnectionsSchema);

module.exports = UserConnectionsModel;
