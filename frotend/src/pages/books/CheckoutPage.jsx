import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { useCreateOrderMutation } from "../../redux/features/orders/ordersApi";
import { clearCart } from "../../redux/features/cart/cartSlice";

const stripePromise = loadStripe("pk_test_51QryW2CtMTYxQGTEhNrwDNEiYaXHVVynpLurIFujS7Jy1mRXtS4puKvyQ7gPAXHjYm8PCrT6l33CAfGQNTPjYZVC00AkAxNWEM");

const CheckoutForm = ({ orderData }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    // const handlePayment = async (event) => {
    //     event.preventDefault();
    //     if (!stripe || !elements) return;

    //     const { error, paymentIntent } = await stripe.confirmCardPayment(orderData.clientSecret, {
    //         payment_method: {
    //             card: elements.getElement(CardElement),
    //         },
    //     });

    //     if (error) {
    //         Swal.fire("Payment failed", error.message, "error");
    //     } else if (paymentIntent.status === "succeeded") {
    //         // Store order in MongoDB
    //         const response = await fetch("http://localhost:5000/api/payments/confirm-order", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ ...orderData, paymentIntentId: paymentIntent.id }),
    //         });

    //         if (response.ok) {
    //             Swal.fire("Order placed!", "Payment successful", "success");
    //             dispatch(clearCart());
    //             navigate("/orders");
    //         } else {
    //             Swal.fire("Error", "Failed to save order", "error");
    //         }
    //     }
    // };


    const handlePayment = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;
    
        const { error, paymentIntent } = await stripe.confirmCardPayment(orderData.clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });
    
        if (error) {
            Swal.fire("Payment failed", error.message, "error");
        } else if (paymentIntent.status === "succeeded") {
            // try {
                const response = await fetch("http://localhost:5000/api/payments/confirm-order", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...orderData, paymentIntentId: paymentIntent.id }),
                });
    
                const data = await response.json();
    
                if (response.ok) {
                    Swal.fire("Order placed!", "Payment successful", "success");
                    dispatch(clearCart());
                    navigate("/orders");
                }
                //  else {
                //     Swal.fire("Error", data.msg || "Failed to save order", "error");
                // }
            // } catch (error) {
            //     Swal.fire("Error", "Something went wrong", "error");
            // }
        }
    };
    


    return (
        <form onSubmit={handlePayment}>
            <CardElement />
            <button type="submit" disabled={!stripe} className="bg-blue-500 text-white py-2 px-4 mt-4 rounded">
                Pay ₹{orderData.totalPrice}
            </button>
        </form>
    );
};

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState(null);
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        if (cartItems.length === 0) {
            Swal.fire("Your cart is empty!", "", "warning");
            return;
        }

        const order = {
            name: data.name,
            email: currentUser?.email,
            address: {
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode,
            },
            phone: data.phone,
            productIds: cartItems.map((item) => item?._id),
            totalPrice: totalPrice,
        };

        try {
            const response = await fetch("http://localhost:5000/api/payments/create-payment-intent", { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: totalPrice }),
            });
            
            

            const paymentData = await response.json();
            setOrderData({ ...order, clientSecret: paymentData.clientSecret });
        } catch (error) {
            Swal.fire("Error", "Failed to initiate payment", "error");
        }
    };

    return (
        <section>
            <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <h2 className="font-semibold text-xl text-gray-600 mb-2">Checkout</h2>
                    <p className="text-gray-500 mb-6">Total Price: ₹{totalPrice}</p>

                    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 grid-cols-1 lg:grid-cols-3">
                            <div className="lg:col-span-2">
                                <input {...register("name", { required: true })} placeholder="Full Name" />
                                <input type="text" defaultValue={currentUser?.email} disabled />
                                <input {...register("phone", { required: true })} placeholder="Phone Number" />
                                <input {...register("city", { required: true })} placeholder="City" />
                                <input {...register("country", { required: true })} placeholder="Country" />
                                <input {...register("state", { required: true })} placeholder="State" />
                                <input {...register("zipcode", { required: true })} placeholder="Zipcode" />
                            </div>
                            <div className="md:col-span-5 text-right">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Proceed to Payment</button>
                            </div>
                        </form>
                    </div>

                    {orderData && (
                        <Elements stripe={stripePromise}>
                            <CheckoutForm orderData={orderData} />
                        </Elements>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CheckoutPage;
