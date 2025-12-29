import { createContext, useState, useEffect } from "react";
import { Search } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        console.log(`Adding to cart: itemId=${itemId}, size=${size}`);
        if (!size) {
            toast.error('Select Product Size Please');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        console.log('Updated local cart:', cartData);
        setCartItems(cartData);

        if (token) {
            try {
                const response = await axios.post(
                    backendUrl + "/api/cart/add",
                    { itemId, size },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                console.log('Server response (addToCart):', response.data);
            } catch (error) {
                console.error('Error adding to cart:', error);
                toast.error(error.message);
            }
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.error('Error counting cart item:', error);
                }
            }
        }
        console.log('Total cart count:', totalCount);
        return totalCount;
    };

    const updateQuantity = async (itemId, size, quantity) => {
        console.log(`Updating quantity: itemId=${itemId}, size=${size}, quantity=${quantity}`);
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if (token) {
            try {
                const response = await axios.post(
                    backendUrl + '/api/cart/update',
                    { itemId, size, quantity },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                console.log('Server response (updateQuantity):', response.data);
            } catch (error) {
                console.error('Error updating quantity:', error);
                toast.error(error.message);
            }
        }
    };

    const getCartAmount = () => {
        let total = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                const item = products.find(p => p._id === itemId);
                const qty = cartItems[itemId][size];

                if (item) {
                    total += item.price * qty;
                    console.log(`Adding ${qty} x ${item.name} (${item.price}) = ${qty * item.price}`);
                } else {
                    console.warn(`Product not found for cart ID: ${itemId}`);
                }
            }
        }
        console.log('Total cart amount:', total);
        return total;
    };

   const getUserCart = async (token) => {
    console.log('Fetching user cart...');
    try {
        const response = await axios.post(
            backendUrl + '/api/cart/get',
            {}, // body vide
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        console.log('User cart response:', response.data);
        if (response.data.success) {
            setCartItems(response.data.cartData);
        }
    } catch (error) {
        console.error('Error fetching user cart:', error);
        toast.error(error.message);
    }
};


    const getProductsData = async () => {
        console.log('Fetching products data...');
        try {
            const response = await axios.get(backendUrl + "/api/product/list");
            console.log('Products response:', response.data);
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getProductsData();
    }, []);

   useEffect(() => {
    if (!token && localStorage.getItem('token')) {
        const savedToken = localStorage.getItem('token');
        console.log('Token found in localStorage:', savedToken);
        setToken(savedToken);
        getUserCart(savedToken); // 🔥 UTILISE savedToken
    }
}, []);


    const value = {
        products,
        currency,
        delivery_fee,
        Search, setSearch,
        showSearch, setShowSearch,
        cartItems, setCartItems, addToCart,
        getCartCount, updateQuantity, getCartAmount, navigate,
        backendUrl, token, setToken , 
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
