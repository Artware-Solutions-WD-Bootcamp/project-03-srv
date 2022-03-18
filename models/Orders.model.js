const { Schema, model } = require("mongoose");

const ordersSchema = Schema(
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

const OrdersModel = model("Order", ordersSchema);

module.exports = OrdersModel;
