const express = require("express");
const router = express.Router();

// Mete kle sekrè Stripe ou a (Li soti nan fichye .env ou a)
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { items } = req.body;

    // Fòmate pwodwi yo pou Stripe ka konprann yo
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        // Stripe kalkile an santim (cents), donk fòk nou miltipliye pa 100
        unit_amount: Math.round(item.price * 100), 
      },
      quantity: item.quantity,
    }));

    // Kreye sesyon peman an
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment", // "payment" pou yon sèl fwa. Pou abònman li t ap "subscription"
      success_url: "https://rcglobal.netlify.app/?success=true",
      cancel_url: "https://rcglobal.netlify.app/?canceled=true",
    });

    // Voye lyen peman an bay fwonend lan
    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;