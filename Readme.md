# Billing API

This backend system handles subscription lifecycle, recurring payments, user access control, and billing automation similar to platforms like Netflix or Amazon Prime.
```sh
src/
 ├── models/
 │    ├── user.model.js
 │    ├── plan.model.js
 │    ├── subscription.model.js
 │    └── payment.model.js
 ├── controllers/
 ├── routes/
 ├── services/   (later for billing logic)
 ├── middlewares/
 └── utils/

``` 
separate business logic from controllers early to avoid fat controllers later.
