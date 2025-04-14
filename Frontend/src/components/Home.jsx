import React from 'react'
import { useState,useEffect } from 'react';
import './home.css'
const Home = () => {
  const [Products,setProduct]=useState([])
  const [showUpdateForm, setShowUpdateForm] = useState(false);
const [productToEdit, setProductToEdit] = useState(null);

const handleUpdateClick = (product) => {
  setProductToEdit(product);
  setShowUpdateForm(true);
};

useEffect(() => {
  if (showUpdateForm) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}, [showUpdateForm]);


  const handleGetProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const response = await res.json();
      console.log(response.products);
  
      if (response.success === true) {
        setProduct(response.products)
        // You can use response.products here
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products');
    }
  };

  const handleDeleteProduct =async(id)=>{
    try{
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const response = await res.json();
      console.log(response);
      if (response.success) {
        alert('Product deleted successfully');
        // Optionally refetch the product list or remove it from state
      } else {
        alert('Failed to delete product');
      }
    }
    catch(error){
      console.log("Error",error)
    }
  }

  const handleUpdateProduct= async(id)=>{
    if (!productToEdit.Name || !productToEdit.Image || isNaN(productToEdit.Price)) {
      return alert("Please fill all fields correctly.");
    }

    try{
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(productToEdit)
      });
  
      const response = await res.json();
      console.log(response);
      if (response.success) {
        alert('Product updated successfully');
        handleGetProducts(); // Refresh list
        setShowUpdateForm(false);
      } else {
        alert('Failed to update product');
      }
    }
    catch(error){
      console.log("Error",error)
    }
  }

  useEffect(() => {
    handleGetProducts();
  }, []);

  useEffect(() => {
    if (showUpdateForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showUpdateForm]);

  
  return (

     

    <div className='home'>
       {showUpdateForm && (
  <div className="overlay">
    <div className="update-modal">
      <h2>Update Product</h2>
      <input
        type="text"
        name="Name"
        value={productToEdit.Name}
        onChange={(e) => setProductToEdit({ ...productToEdit, Name: e.target.value })}
      />
      <input
        type="number"
        name="Price"
        value={productToEdit.Price}
        onChange={(e) => setProductToEdit({ ...productToEdit, Price: e.target.value })}
      />
      <input
        type="text"
        name="Image"
        value={productToEdit.Image}
        onChange={(e) => setProductToEdit({ ...productToEdit, Image: e.target.value })}
      />
      <div className="modal-buttons">
        <button onClick={() => handleUpdateProduct(productToEdit._id)}>Update</button>
        <button onClick={() => setShowUpdateForm(false)}>Cancel</button>
      </div>
    </div>
  </div>
    )}


       {
        Products.map((product)=>{
          return(
            <div className="productCard" key={product._id}>
              <img src={product.Image} alt=""  className='image'/>
              <div className='info'><h1>{product.Name}</h1> <p>{product.Price}</p></div>
              <div className="changes">
              <button onClick={()=>{handleDeleteProduct(product._id)}}>Delete</button>
              <button onClick={() => handleUpdateClick(product)}>Update</button>
              </div>
            </div>
          )
        })
       }
    </div>
  )
}

export default Home
