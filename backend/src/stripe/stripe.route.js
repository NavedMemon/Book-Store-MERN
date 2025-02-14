// const express = require("express");
// const router = express.Router();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const Order = require("../orders/order.model");

// router.post("/create-payment-intent", async (req, res) => {
//     try {
//         const { amount } = req.body;

//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: amount * 100, // Convert to cents
//             currency: "usd",
//             payment_method_types: ["card"],
//         });

//         res.json({ clientSecret: paymentIntent.client_secret });
//     } catch (error) {
//         console.error("Error creating payment intent:", error);
//         res.status(500).json({ error: error.message });
//     }
// });

// // router.post("/confirm-order", async (req, res) => {
// //     try {
// //         const { name, email, address, phone, productIds, totalPrice, paymentIntentId } = req.body;

// //         // Step 1: Verify the Payment Intent
// //         const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

// //         if (paymentIntent.status !== "succeeded") {
// //             return res.status(400).json({ error: "Payment not completed" });
// //         }

// //         // Step 2: Save the Order in MongoDB
// //         const newOrder = new Order({
// //             name,
// //             email,
// //             address,
// //             phone,
// //             productIds,
// //             totalPrice,
// //             paymentStatus: "Paid",
// //         });

// //         await newOrder.save();

// //         res.json({ message: "Order placed successfully" });
// //     } catch (error) {
// //         console.error("Error confirming order:", error);
// //         res.status(500).json({ error: error.message });
// //     }
// // }); 


// // Confirm and store order in DB
// router.post("/confirm-order", authMiddleware, async (req, res) => {
//     try {
//         const { paymentIntentId, orderDetails } = req.body;

//         if (!paymentIntentId) {
//             return res.status(400).json({ msg: "Payment Intent ID is required" });
//         }

//         // Confirm payment with Stripe
//         const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

//         if (paymentIntent.status !== "succeeded") {
//             return res.status(400).json({ msg: "Payment not completed" });
//         }

//         // Save order to MongoDB
//         const newOrder = new Order({
//             user: req.user.id, // Authenticated user
//             items: orderDetails.items,
//             totalAmount: orderDetails.totalAmount,
//             address: orderDetails.address,
//             paymentIntentId: paymentIntent.id,
//             status: "Paid",
//         });

//         await newOrder.save();

//         res.status(201).json({ msg: "Order confirmed and saved", order: newOrder });
//     } catch (error) {
//         console.error("Error confirming order:", error);
//         res.status(500).json({ msg: "Internal server error" });
//     }
// });


// module.exports = router;


const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("../orders/order.model");

// Create Payment Intent
router.post("/create-payment-intent", async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: "usd",
            payment_method_types: ["card"],
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).json({ error: error.message });
    }
});

// Confirm Payment & Store Order
router.post("/confirm-order", async (req, res) => {
    try {
        const { paymentIntentId, ...orderData } = req.body;

        if (!paymentIntentId) {
            return res.status(400).json({ msg: "Payment Intent ID is required" });
        }

        // Verify payment with Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status !== "succeeded") {
            return res.status(400).json({ msg: "Payment not completed" });
        }

        // Save order in MongoDB
        const newOrder = new Order({
            name: orderData.name,
            email: orderData.email,
            address: orderData.address,
            phone: orderData.phone,
            productIds: orderData.productIds,
            totalPrice: orderData.totalPrice,
            paymentIntentId: paymentIntent.id,
            paymentStatus: "Paid",
        });

        await newOrder.save();

        res.status(201).json({ msg: "Order confirmed and saved", order: newOrder });
    } catch (error) {
        console.error("Error confirming order:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

module.exports = router;
