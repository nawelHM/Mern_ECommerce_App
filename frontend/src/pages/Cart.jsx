import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from './../context/ShopContext';
import Title from './../components/Title';
import { Trash2 } from "lucide-react";
import CartTotal from './../components/CartTotal';

const Cart = () => {
  const { products: productData, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
  if (productData.length > 0) {
    console.log("==== useEffect: cartItems loaded ====");
    console.log("cartItems:", cartItems);

    const tempData = [];
    for (const productId in cartItems) {
      console.log("Processing Product ID in cartItems:", productId);
      for (const size in cartItems[productId]) {
        const quantity = cartItems[productId][size];
        console.log("Size:", size, "Quantity:", quantity);
        if (quantity > 0) {
          tempData.push({ id: productId, size, quantity });
        }
      }
    }
    console.log("Prepared cartData array:", tempData);
    setCartData(tempData);
  }
}, [cartItems, productData]); // <-- updated here


  if (!productData || productData.length === 0) {
    return <p className="p-4">Loading products...</p>;
  }

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.map((item, index) => {
          console.log("==== Rendering cart item ====");
          console.log("Cart item:", item);

          // FIX: Convert MongoDB _id to string for comparison
          const product = productData.find(p => String(p._id) === item.id);

          console.log("Cart item id:", item.id);
          console.log("All product IDs in productData:", productData.map(p => String(p._id)));
          console.log("Product found in productData:", product);

          if (!product) {
            console.warn(`Product not found for ID: ${item.id}`);
            return (
              <div key={index} className="py-4 border-t border-b text-gray-700">
                <p>Product not found for ID: {item.id}</p>
              </div>
            );
          }

          const productImage = product.image?.[0] || '/placeholder.png';

          return (
            <div key={index} className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
              <div className="flex items-start gap-6">
                <img className="w-20" src={productImage} alt={product.name} />

                <div>
                  <p className="text-xs sm:text-lg font-medium">{product.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>{currency}{product.price}</p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                  </div>
                </div>
              </div>

              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (!val || val < 1) return;
                  updateQuantity(item.id, item.size, val);
                }}
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
              />

              <Trash2
                onClick={() => updateQuantity(item.id, item.size, 0)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                size={20}
                color="red"
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate('/place-order')}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
