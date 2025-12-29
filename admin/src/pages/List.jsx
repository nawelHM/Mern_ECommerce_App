import React,{useState , useEffect} from 'react'
import { backendUrl , currency} from './../App';
import  axios  from 'axios';
import { toast } from 'react-toastify';

function List({token}) {

  const [list,setList] =useState([]);

  const fetchList = async () =>{
    try {
      const response = await axios.get(
  backendUrl + "/api/product/list",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

if (response.data.products) {
  setList(response.data.products);
}else{
  toast.error(response.data.message)
}

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  const removeProduct = async (id) => {
  console.log("Remove ID:", id);
  console.log("Token:", token);
  console.log("Backend URL:", backendUrl);

  try {
    const response = await axios.post(
      `${backendUrl}/api/product/remove`,
      { id },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(response.data);
    if (response.data.success) {
      setList(prev => prev.filter(item => item._id !== id));
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message || "Removal failed");
    }
  } catch (error) {
    console.error(error.response?.data || error.message);
    toast.error(error.response?.data?.message || error.message || "An error occurred");
  }
};

useEffect(() => {
  fetchList();
}, []);

  return (
    <>
    <p className="mb-2">All Products List</p>
    <div className="flex flex-col gap-2">
      {/* ------------List Table Title -------- */}
      <div className="hidden md:grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
      <b >Image</b>
      <b>Name</b>
      <b>Category</b>
      <b>Price</b>
      <b className="text-center">Action</b>
      </div>

      {/* -----product list ----- */ }
      {
        list.map((item,index)=>(
          <div key={index} className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm">
          <img className="w-12" src={item.image[0]} alt="" />
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>{currency}{item.price}</p>
          <p className="text-right md:text-center cursor-pointer text-lg" onClick={()=>removeProduct(item._id)}>X</p>
          </div>

        ))
      }

    </div>

    
    </>
  )
}

export default List