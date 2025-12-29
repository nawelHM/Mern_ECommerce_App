import React, { useContext } from "react";
import { ShopContext } from "./../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  console.log("🟢 ProductItem received props:", {
    id,
    image,
    name,
    price
  });

  return (
    <Link
      className="text-gray-700 cursor-pointer"
      to={`/product/${id}`}
      onClick={() => console.log("👉 Clicked product with ID:", id)}
    >
      <div className="overflow-hidden">
        <img 
          className="hover:scale-110 transition ease-in-out"
          src={image}
          alt=""
          onClick={() => console.log("🖼️ Clicked image of:", id)}
        />
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
