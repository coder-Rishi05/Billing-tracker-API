# Subscription / Billing Management Backend API

## Day 1 – System Design & Architecture Foundation

### 🎯 Goal of Day 1

Day 1 ka primary goal **coding start karna nahi**, balki ek **production-grade subscription system ka mental model aur architecture design karna** tha.

Is phase ka focus tha:

* Subscription system ka end-to-end flow samajhna
* Core entities identify karna
* Subscription lifecycle clearly define karna
* Interview-level architectural decisions lena

> **Philosophy:** Pehle socho, phir code likho.

---

## 📌 What is a Subscription System?

A subscription system is a **state-driven backend system** where:

* Users subscribe to a plan
* Payments happen on a recurring basis
* Access depends on subscription state and time

**Key difference:**

* One-time payment → event-based
* Subscription → long-running state machine

---

## 🧩 Core Entities Identified

### 1. User

Represents an authenticated customer of the system.

---

### 2. Plan

Defines *what is being sold*.

**Responsibilities:**

* Price definition
* Billing interval (monthly/yearly)
* Feature set

> Plan kabhi expire nahi hota — **subscription expire hoti hai**.

---

### 3. Subscription (Most Important Entity)

Represents the relationship between **User** and **Plan** along with lifecycle data.

**Key responsibilities:**

* Track current billing period
* Maintain subscription status
* Control user access

**Common states:**

* active
* paused
* cancelled
* expired

---

### 4. Payment

Represents a historical payment record.

**Important rule:**

* Payments are immutable (kabhi delete nahi hote)
* Used for audits, refunds, and reconciliation

---

## 🔄 Subscription Lifecycle (High-Level)

1. User selects a plan
2. Subscription is created with status = `active`
3. Payment is attempted
4. If payment succeeds → access granted till period end
5. On period expiry:

   * autoRenew = true → next payment attempt
   * autoRenew = false → subscription expires

> Expiry check runtime par hoti hai, cron se pehle nahi.

---

## 🏗️ Architectural Decisions (Day 1)

### ✅ Auth First

Subscription hamesha authenticated user ke saath linked hoti hai.

---

### ✅ No Payment Gateway on Day 1

Payment providers (Stripe/Razorpay) ko baad me integrate karenge.

Reason:

* Core business logic pe focus
* External dependency se pehle system stable banana

---

### ✅ Status + Time Based Access Control

Access ka rule simple rakha gaya:

* Subscription status must be `active`
* Current period end must be greater than current time

---

## 📂 Planned Folder Structure

```
src/
 ├── models/
 ├── controllers/
 ├── routes/
 ├── services/
 ├── middlewares/
 └── utils/
```

> Business logic ko controllers se alag rakhna early-stage decision tha.

---

## ✅ Day 1 Outcomes

* Subscription system ka clear mental model
* Core entities & relationships finalized
* Lifecycle clearly defined
* Access control logic decided
* Scalable foundation ready

---

## 🚀 Next Step (Day 2)

Day 2 me hum:

* Plan schema design
* Subscription schema design
* Fields, indexes, and interview-grade justification

---

**Status:** Day 1 completed successfully ✅
