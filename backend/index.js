const express = require('express');
const app = express();
require('dotenv').config();
const cors = require("cors");
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));

app.use(express.urlencoded({ extended: true }));

const bookRoutes = require('./src/books/book.route');
const userRoutes = require('./src/users/user.route');
const orderRoutes = require('./src/orders/order.route');
const paymentRoutes = require("./src/stripe/stripe.route");


app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);


async function main() {
    await mongoose.connect(process.env.DB_URL);

    app.get('/', (req, res) => { 
        res.send('Hello World!'); 
    });
}

main().then(() => console.log("MongoDB connected successfully")).catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
