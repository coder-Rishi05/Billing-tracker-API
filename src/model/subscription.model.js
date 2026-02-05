import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "active",     // paid & usable
        "past_due",   // payment failed, retry ongoing
        "paused",     // user paused
        "cancelled",  // manual or retry exceeded
        "expired",    // autoRenew=false + period end
      ],
      default: "active",
      index: true,
      message:`{VALUE} is not suitable status`,
    },

    currentPeriodStart: {
      type: Date,
      required: true,
    },

    currentPeriodEnd: {
      type: Date,
      required: true,
      index: true,
    },

    autoRenew: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
