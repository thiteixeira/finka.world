const stripe = require("stripe")("sk_test_key");
const express = require("express");
const app = express();
app.use(express.static("public"));

const DOMAIN_NAME = "http://localhost:3000/checkout";

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // TODO: replace this with the `price` of the product you want to sell
        // price: '{{PRICE_ID}}',
        // quanity: 1,
      },
    ],
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `{YOUR_DOMAIN}?canceled=true`,
  });
  res.redirect(303, session.url);
});

app.listen(4242, () => console.log("Running on port 4242"));
