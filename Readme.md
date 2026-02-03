# Billing API

“Ye system businesses ko recurring payments, user access control aur billing lifecycle automate karne me help karta hai.”

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