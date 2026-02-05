import Payment from "../models/Payment.js";
import Subscription from "../models/Subscription.js";

export const handlePaymentWebhook = async (req, res) => {
  try {
    // 1️⃣ Verify webhook signature (gateway specific in real life)
    const signatureIsValid = true;
    if (!signatureIsValid) {
      return res.status(400).send("Invalid signature");
    }

    // 2️⃣ Extract event data
    const { event, paymentId, reason } = req.body;

    // 3️⃣ Find payment
    const payment = await Payment.findOne({
      providerPaymentId: paymentId,
    });

    if (!payment) {
      return res.status(200).send("Payment not found, ignored");
    }

    // 4️⃣ Idempotency protection
    if (payment.status === "succeeded" || payment.status === "failed") {
      return res.status(200).send("Already processed");
    }

    // 5️⃣ Load subscription
    const subscription = await Subscription.findById(payment.subscription);
    if (!subscription) {
      return res.status(200).send("Subscription not found");
    }

    // ✅ SUCCESS
    if (event === "payment.succeeded") {
      payment.status = "succeeded";
      payment.retryCount = 0;
      payment.nextRetryAt = null;
      payment.lastRetryAt = null;
      await payment.save();

      // Safe period extension
      const now = new Date();
      const baseDate =
        subscription.currentPeriodEnd > now
          ? subscription.currentPeriodEnd
          : now;

      const newEnd = new Date(baseDate);
      newEnd.setMonth(newEnd.getMonth() + 1); // monthly example

      subscription.currentPeriodEnd = newEnd;
      subscription.status = "active";
      await subscription.save();
    }

    // ❌ FAILURE (retry will be handled by cron)
    if (event === "payment.failed") {
      payment.status = "failed";
      payment.failureReason = reason || "UNKNOWN";
      payment.retryCount += 1;
      payment.lastRetryAt = new Date();
      payment.nextRetryAt = new Date(
        Date.now() + 24 * 60 * 60 * 1000, // retry after 24h
      );

      await payment.save();

      subscription.status = "past_due";
      await subscription.save();
    }

    // 6️⃣ Always acknowledge webhook
    return res.status(200).send("OK");
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(500).send("Server error");
  }
};
