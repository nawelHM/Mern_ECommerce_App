import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "./../context/ShopContext";
import { Star } from "lucide-react";
import RelatedProducts from './../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = () => {
    products.forEach((item) => {
      if (item._id === String(productId)) {
        setProductData(item);
        setImage(Array.isArray(item.image) ? item.image[0] : item.image);
        console.log("Product Data:", item); // Vérifie ce que tu reçois
      }
    });
  };

  useEffect(() => {
    if (products && products.length > 0) {
      fetchProductData();
    }
  }, [productId, products]);

  // Crée un tableau sécurisé pour les tailles
  const sizesArray = Array.isArray(productData?.size)
    ? productData.size
    : Array.isArray(productData?.sizes)
    ? productData.sizes
    : [];

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">

      {/* PRODUCT DATA */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">

        {/* IMAGES SECTION */}
        <div className="flex-1 flex sm:h-[500px] h-auto gap-3 sm:flex-row">

          {/* Miniatures */}
          <div className="flex sm:flex-col h-full overflow-x-auto sm:overflow-y-auto 
                          justify-between sm:justify-normal sm:w-[18.7%] w-full gap-2">
            {(Array.isArray(productData.image) ? productData.image : [productData.image]).map((item, index) => (
              <img
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                onClick={() => setImage(item)}
              />
            ))}
          </div>

          {/* Grande image */}
          <div className="w-full sm:w-[80%] h-full">
            <img className="w-full h-full object-cover" src={image} alt="" />
          </div>
        </div>

        {/* DETAILS */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <Star className="w-5 h-5" />
            <Star className="w-5 h-5" />
            <p className="pl-2">(122)</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>

          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {sizesArray.length > 0 ? (
                sizesArray.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-black bg-gray-200' : ''}`}
                  >
                    {item}
                  </button>
                ))
              ) : (
                <p className="text-gray-400">No sizes available</p>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              if (!size) return alert("Please select a size");
              addToCart(productData._id, size);
            }}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description and review section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 boerder px-6 py-6 text-sm text-gray-500">
          <p>
            Un site e-commerce représente aujourd’hui bien plus qu’un simple endroit où acheter ou vendre en ligne...
          </p>
          <p>
            En général, un site e-commerce présente une large variété de produits ou de services accompagnés de descriptions détaillées...
          </p>
        </div>
      </div>

      {/* Display related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
