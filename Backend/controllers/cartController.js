import userModel from './../models/userModel.js';

// add product to user cart
const addToCart = async (req, res) => {
  try {
    const userId = req.body.userId || req.userId; // ✅ FIX (no structure change)
    const { itemId, size } = req.body;

    console.log("=== ADD TO CART ===");
    console.log("userId:", userId);
    console.log("itemId:", itemId);
    console.log("size:", size);

    if (!userId) {
      console.log("❌ userId is missing");
      return res.json({ success: false, message: "User ID missing" });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      console.log("❌ User not found");
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1;
    } else {
      cartData[itemId][size] = 1;
    }

    console.log("Updated cartData:", cartData);

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: 'Added To Cart' });

  } catch (error) {
    console.log("ADD TO CART ERROR:", error);
    res.json({ success: false, message: error.message });
  }
};

// update product cart
const updateCart = async (req, res) => {
  try {
    const userId = req.body.userId || req.userId;
    const { itemId, size, quantity } = req.body;

    console.log("=== UPDATE CART ===");
    console.log({ userId, itemId, size, quantity });

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = quantity;

    console.log("Updated cartData:", cartData);

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: 'Cart updated' });

  } catch (error) {
    console.log("UPDATE CART ERROR:", error);
    res.json({ success: false, message: error.message });
  }
};

// get user cart data
const getUserCart = async (req, res) => {
  try {
    const userId = req.body.userId || req.userId;

    console.log("=== GET USER CART ===");
    console.log("userId:", userId);

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    console.log("cartData:", cartData);

    res.json({ success: true, cartData });

  } catch (error) {
    console.log("GET CART ERROR:", error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
