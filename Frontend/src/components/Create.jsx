import React, { useState } from 'react'
import './create.css'
const Create = () => {
  const [newProduct,setProduct]=useState({
    Name:"",
    Price:'',
    Image:""
  })
  
  const handleChange=(e)=>{
   setProduct((newProduct)=>({
     ...newProduct,
     [e.target.name]:e.target.value
   }))
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
      const res=await fetch('http://localhost:5000/api/products',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          ...newProduct,
          Price: Number(newProduct.Price),
        })
      })
      const responce=await res.json();
      console.log(responce);
      if( responce.success===true){
       alert("Product Created Successfully")
      }
      else {
        alert('Failed to create product');
      }
    
  }
  return (
    <div className="create">
      <h1>Add Product</h1>
      <form className='create-form'>
         <input type="text" name='Name' placeholder='Product Name' value={newProduct.Name} onChange={handleChange} />
         <input type="number" name='Price' placeholder='Price' value={newProduct.Price} onChange={handleChange}/>
         <input type="text" name='Image' placeholder='Image URL' value={newProduct.Image} onChange={handleChange} />
         <button type='submit' onClick={handleSubmit}>Add Product</button>
      </form>
    </div>
  )
}

export default Create
