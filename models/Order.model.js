//DO import needed modules
const { Schema, model } = require("mongoose");

//DO define Schema
const orderSchema = Schema(
  {
    ownerID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    collabID: {
      type: Schema.Types.ObjectId,
      ref: "Collab",
    },
    date: {
      type: Date,
      required: true,
    },
    orderRef: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    orderStatus: {
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

//DO define Model
const OrderModel = model("Order", orderSchema);

//DO export module
module.exports = OrderModel;
