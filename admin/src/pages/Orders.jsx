import React, { useState, useEffect } from "react";
import { backendUrl  , currency} from "./../App";
import axios from "axios";
import { toast } from "react-toastify";
import parcel_icon from "../assets/parcel_icon.svg";
function Orders({ token }) {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const res = await axios.get(backendUrl + "/api/order/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

const statusHandler = async (event , orderId)=>{
  try {
  const response = await axios.post(backendUrl + "/api/order/status", { orderId, status: event.target.value }, { headers: { Authorization: `Bearer ${token}` } });
  if(response.data.success){
    await fetchAllOrders()
  }

  } catch (error) {
    console.log(error)
    toast.error(error.message);
  }
}

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-300 p-5 md:p-8 my-4 text-xs sm:text-sm text-gray-700">

            <img className="w-12" src={parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}> {item.name} x {item.quantity}<span>{item.size}</span> </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}> {item.name} x {item.quantity} <span>{item.size}</span> , </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <p>{order.address.street + " , "}</p>
                <p>
                  {order.address.city + " , " +  order.address.state + " , " + order.address.country + " , " + order.address.zipcode}
                </p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
              <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
                <p className="mt-3">Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className="text-sm sm:text-[15px]">{currency} {order.amount}</p>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className="p-2 font-semibold">
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          
        ))}
      </div>
    </div>
  );
}

export default Orders;
