import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "./../context/ShopContext";
import { ChevronDown } from "lucide-react";
import Title from "./../components/Title";
import ProductItem from "./../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  // -------------------------
  // CATEGORY FILTER TOGGLE
  // -------------------------
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  // -------------------------
  // SUBCATEGORY FILTER TOGGLE
  // -------------------------
  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  // -------------------------
  // APPLY FILTERS
  // -------------------------
  const applyFilter = () => {
    if (!products || products.length === 0) return;

    let copy = [...products];

    // 🔍 Search filter
    if (showSearch && search) {
      copy = copy.filter((item) =>
        item?.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 📌 Category filter
    if (category.length > 0) {
      copy = copy.filter((item) => category.includes(item.category));
    }

    // 📌 SubCategory filter
    if (subCategory.length > 0) {
      copy = copy.filter((item) =>
        subCategory.includes(item.subCategory || item.subCategory)
      );
    }

    setFilterProducts(copy);
  };

  // -------------------------
  // SORT PRODUCTS
  // -------------------------
  const sortProduct = () => {
    let sorted = [...filterProducts];

    switch (sortType) {
      case "low-hight":
        sorted.sort((a, b) => a.price - b.price);
        break;

      case "hight-low":
        sorted.sort((a, b) => b.price - a.price);
        break;

      default:
        return applyFilter();
    }

    setFilterProducts(sorted);
  };

  // -------------------------
  // USE EFFECTS
  // -------------------------
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch , products]);

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-10 border-t pt-5">
      {/* LEFT FILTERS */}
      <div className="w-full sm:w-60 sm:min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <ChevronDown
            className={`h-4 sm:hidden transition-transform duration-300 ${
              showFilter ? "rotate-180" : "rotate-0"
            }`}
          />
        </p>

        {/* CATEGORY FILTER */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-4 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Men"
                onChange={toggleCategory}
              />
              Men
            </label>

            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Women"
                onChange={toggleCategory}
              />
              Women
            </label>

            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Kids"
                onChange={toggleCategory}
              />
              Kids
            </label>
          </div>
        </div>

        {/* TYPE (SUBCATEGORY) FILTER */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Topwear"
                onChange={toggleSubCategory}
              />
              Top Wear
            </label>

            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Bottom"
                onChange={toggleSubCategory}
              />
              Bottom Wear
            </label>

            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Winterwear"
                onChange={toggleSubCategory}
              />
              Winter Wear
            </label>
          </div>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4 mt-1">
          <Title text1="ALL" text2="COLLECTIONS" />

          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by : Relevant</option>
            <option value="low-hight">Sort by : Low to High</option>
            <option value="hight-low">Sort by : High to Low</option>
          </select>
        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item) => {
            const img = item?.image?.[0] ?? item?.image ?? "/placeholder.png";

            return (
              <ProductItem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                image={img}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Collection;
