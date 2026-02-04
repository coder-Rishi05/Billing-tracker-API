import mongoose from "mongoose";

const paymentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    // 💱 Currency support
    currency: {
      type: String,
      enum: ["INR", "USD"],
      default: "INR",
    },

    // 🔄 Payment ka actual state
    status: {
      type: String,
      enum: ["created", "pending", "succeeded", "failed", "refunded"],
      default: "created",
      index: true,
    },
    provider: {
      type: String,
      enum: ["stripe", "razorpay"],
      required: true,
    },
    providerPaymentId: {
      type: String,
      index: true,
    },
    failureReason: {
      type: String,
    },
    attemptNumber: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

const Payment = new mongoose.model("payment", paymentSchema);

export default Payment;
