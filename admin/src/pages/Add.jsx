import React, {useState} from 'react'
import upload from '../assets/upload_area.png'
import axios from "axios"
import { backendUrl } from './../App';
import { toast } from 'react-toastify';

function Add({token}) {
  const [image1,setImage1]=useState(false);
  const [image2,setImage2]=useState(false);
  const [image3,setImage3]=useState(false);
  const [image4,setImage4]=useState(false);

  const [name,setName]=useState('');
  const [description,setDescription]=useState('');
  const [price,setPrice]=useState('');
  const [category,setCategory]=useState('Women');
  const [subCategory,setSubCategory]=useState('Topwear');
  const [bestSeller,setBestseller]=useState(false);
  const [sizes,setSizes]=useState([]);

  // Debug: log checkbox value whenever it changes
  const handleBestSellerChange = (e) => {
    console.log("Checkbox checked:", e.target.checked);
    setBestseller(e.target.checked);
  }

  const onSubmitHandler = async (e) =>{
    e.preventDefault();

    // Debug: log state before sending
    console.log("Submitting product with bestSeller =", bestSeller);

    try {
      const formData = new FormData();
      formData.append("name",name);
      formData.append("description",description);
      formData.append("price",price);
      formData.append("category",category);
      formData.append("subCategory",subCategory);
      formData.append("bestSeller", bestSeller ? "true" : "false");

      formData.append("sizes",JSON.stringify(sizes));

      image1 && formData.append("image1",image1);
      image2 && formData.append("image2",image2);
      image3 && formData.append("image3",image3);
      image4 && formData.append("image4",image4);

      // Debug: log FormData contents
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response from backend:", response.data);

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setBestseller(false)
        setSizes([])
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
        {/* Image Uploads */}
        <div>
          <p className="mb-2">Upload Image</p>
          <div className="flex gap-2">
            <label htmlFor="image1">
              <img className="w-20 " src={!image1 ? upload : URL.createObjectURL(image1)} alt="" /> 
              <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden />
            </label>
            <label htmlFor="image2">
              <img className=" w-20" src={!image2 ? upload : URL.createObjectURL(image2)} alt="" /> 
              <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden />
            </label>
            <label htmlFor="image3">
              <img className="w-20 " src={!image3 ? upload : URL.createObjectURL(image3)} alt="" /> 
              <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden />
            </label>
            <label htmlFor="image4">
              <img className="w-20 " src={!image4 ? upload : URL.createObjectURL(image4)} alt="" /> 
              <input  onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden />
            </label>
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full">
          <p className="mb-2">Product name</p>
          <input onChange={(e)=>setName(e.target.value)} value={name} className="w-full max-w-[500px] px-3 py-2" type="text" placeholder="Type here"  required/>
        </div>
        <div className="w-full">
          <p className="mb-2">Product description</p>
          <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className="w-full max-w-[500px] px-3 py-2" type="text" placeholder="Write the description here"  required/>
        </div>

        {/* Category & Price */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div>
            <p className="mb-2">Product category </p>
            <select onChange={(e)=>setCategory(e.target.value)}  className="w-full px-3 py-2" >
              <option value="Women">Women</option>
              <option value="Men">Men</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div>
            <p className="mb-2">Sub category </p>
            <select className="w-full px-3 py-2"  onChange={(e)=>setSubCategory(e.target.value)}>
              <option value="Topwear">Top wear</option>
              <option value="Bottomwear">Bottom wear</option>
              <option value="Winterwear">Winter wear</option>
            </select>
          </div>
          <div>
            <p className="mb-2">Product Price</p>
            <input onChange={(e)=>setPrice(e.target.value) } value={price} className="w-full px-3 py-2 sm:w-[120px]" type="Number" placeholder="25" />
          </div>
        </div>

        {/* Sizes */}
        <div >
          <p className="mb-2">Product Sizes</p>
          <div className="flex gap-3">
            {["S","M","L","XL","XXL"].map((size) => (
              <div key={size} onClick={()=>setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev ,size])}>
                <p className={`${sizes.includes(size) ? "bg-purple-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>{size}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bestseller */}
        <div className="flex gap-2 mt-2">
          <input
            type="checkbox"
            id="bestSeller"
            checked={bestSeller}
            onChange={handleBestSellerChange}
          />
          <label className="cursor-pointer" htmlFor="bestSeller">Add to Bestseller</label>
        </div>

        <button type="submit" className="w-28 py-3 mt-4 bg-black text-white ">ADD</button>
      </form>
    </div>
  )
}

export default Add;
