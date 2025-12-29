import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// ================================
// PLACE ORDER — CASH ON DELIVERY
// ================================
const placeOrder = async (req, res) => {
    try {
        
        const {userId, items, amount, address } = req.body;

        const orderData = new orderModel({
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        });
        const newOrder = new orderModel(orderData)
        await orderData.save();

        // vider le panier après commande
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order placed successfully" });

    } catch (error) {
        console.log("PLACE ORDER ERROR:", error);
        res.json({ success: false, message: error.message });
    }
};

// ================================
// PLACE ORDER — STRIPE
// ================================
const placeOrderStripe = async (req, res) => {
    try {
        const userId = req.userId;
        const { items, amount, address } = req.body;

        const order = new orderModel({
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: true,
            date: Date.now()
        });

        await order.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Stripe payment successful" });

    } catch (error) {
        console.log("STRIPE ORDER ERROR:", error);
        res.json({ success: false, message: error.message });
    }
};

// ================================
// PLACE ORDER — RAZORPAY
// ================================
const placeOrderRazorpay = async (req, res) => {
    try {
        const userId = req.userId;
        const { items, amount, address } = req.body;

        const order = new orderModel({
            userId,
            items,
            amount,
            address,
            paymentMethod: "Razorpay",
            payment: true,
            date: Date.now()
        });

        await order.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Razorpay payment successful" });

    } catch (error) {
        console.log("RAZORPAY ORDER ERROR:", error);
        res.json({ success: false, message: error.message });
    }
};

// ================================
// ALL ORDERS — ADMIN
// ================================
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.log("ALL ORDERS ERROR:", error);
    res.json({ success: false, message: error.message });
  }
};

// ================================
// USER ORDERS — FRONTEND
// ================================
const userOrders = async (req, res) => {
  try {
    const userId = req.userId; // string
    const orders = await orderModel.find({ userId }).sort({ date: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.log("USER ORDERS ERROR:", error);
    res.json({ success: false, message: error.message });
  }
};

// ================================
// UPDATE ORDER STATUS — ADMIN
// ================================
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        await orderModel.findByIdAndUpdate(orderId, { status });

        res.json({ success: true, message: "Order status updated" });

    } catch (error) {
        console.log("UPDATE STATUS ERROR:", error);
        res.json({ success: false, message: error.message });
    }
};

export {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus
};
