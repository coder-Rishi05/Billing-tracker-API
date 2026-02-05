import Payment from "../models/Payment.js";
import Subscription from "../models/Subscription.js";
// import crypto from "crypto"; // real project me signature ke liye

export const handlePaymentWebhook = async (req, res) => {
  try {
    // 1️⃣ Verify signature (pseudo – real logic gateway specific hota hai)
    const signatureIsValid = true; // assume verified
    if (!signatureIsValid) {
      return res.status(400).send("Invalid signature");
    }

    // 2️⃣ Extract event data
    const { event, paymentId, reason } = req.body;

    // 3️⃣ Find payment
    const payment = await Payment.findOne({
      providerPaymentId: paymentId,
    });

    // 4️⃣ If payment not found, safely ignore
    if (!payment) {
      return res.status(200).send("Payment not found, ignored");
    }

    // 5️⃣ Duplicate webhook protection (idempotency)
    if (payment.status === "succeeded" || payment.status === "failed") {
      return res.status(200).send("Already processed");
    }

    // 6️⃣ Load related subscription
    const subscription = await Subscription.findById(payment.subscription);

    if (!subscription) {
      return res.status(200).send("Subscription not found");
    }

    // 7️⃣ Handle SUCCESS case
    if (event === "payment.succeeded") {
      payment.status = "succeeded";
      await payment.save();

      // Extend subscription period
      const currentEnd = new Date(subscription.currentPeriodEnd);
      currentEnd.setMonth(currentEnd.getMonth() + 1); // monthly example

      subscription.currentPeriodEnd = currentEnd;
      subscription.status = "active";

      await subscription.save();
    }

    // 8️⃣ Handle FAILURE case
    if (event === "payment.failed") {
      payment.status = "failed";
      payment.failureReason = reason || "UNKNOWN";
      await payment.save();

      subscription.status = "past_due";
      await subscription.save();
    }

    // 9️⃣ Always respond 200 to gateway
    return res.status(200).send("OK");
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(500).send("Server error");
  }
};
