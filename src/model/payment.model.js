import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
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

    currency: {
      type: String,
      enum: ["INR", "USD"],
      default: "INR",
    },

    // Payment lifecycle
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

    // 🔁 Retry support (simple, V1-safe)
    retryCount: {
      type: Number,
      default: 0,
    },

    nextRetryAt: {
      type: Date,
      index: true,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
