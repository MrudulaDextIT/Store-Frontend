import React, { useState } from "react";
import "./Form.css";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
// import axios from "axios";

const Form = () => {
  
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
  
    // Web3Forms Submission
    formData.append("access_key", "3e1f94c4-7c10-402f-b482-71ea3f80f815");
  
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
  
    try {
      // Send data to Web3Forms
      const web3Response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      }).then((res) => res.json());
  
      if (web3Response.success) {
        console.log("✅ Web3Forms Submission Success!");
      } else {
        console.error("❌ Web3Forms Submission Failed!");
      }
  
      // Send data to MongoDB (Backend)
      const res = await fetch("http://localhost:4000/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json,
      });
      // console.log("HIIII");
      const data = await res.json();
      // console.log("HIIII");
      // console.log(json);
      if (res.ok) {
        Swal.fire({
          title: "Thank You!",
          text: "Your order has been placed successfully!",
          icon: "success",
        });
  
        
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          category: "",
          product: "",
          quantity: 1,
          paymentMethod: "UPI",
        });
      } else {
        throw new Error(data.error || "Something went wrong!");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
    }
  };
  


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    category: "",
    product: "",
    quantity: 1,
    paymentMethod: "UPI",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      let formattedValue = value.replace(/\D/g, "");
      if (formattedValue.startsWith("0")) {
        formattedValue = formattedValue.slice(0, 11);
      } else {
        formattedValue = formattedValue.slice(0, 10);
      }
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("http://localhost:4000/users", formData)
  //     .then((res) => {
  //       console.log(res.data);
  //       navigate("/"); // Redirect to Home after submission
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <div className="form-container">
      <h2>Place Your Order</h2>
      
      <form onSubmit={onSubmit}>
        <label>Name</label>
        <input
          type="text"
          name= 'name'
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />

        <label>Email</label>
        <input
          type="email"
          name= 'email'
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <label>Phone</label>
        <input
          type="tel"
          name= 'phone'
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          required
        />

        <label>Shipping Address</label>
        <textarea
          name= 'address'
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your full address"
          required
        ></textarea>

        <label>Category</label>
        <select name= 'category' value={formData.category} onChange={handleChange}>
          <option>Books</option>
          <option>Pens</option>
          <option>Pencils</option>
          <option>Colors</option>
        </select>

        <label>Product Name</label>
        <input
          type="text"
          name= 'product'
          value={formData.product}
          onChange={handleChange}
          placeholder="Enter product name"
          required
        />

        <label>Quantity</label>
        <input
          type="number"
          name= 'quantity'
          value={formData.quantity}
          onChange={handleChange}
          min="1"
          placeholder="Enter quantity"
          required
        />

        <label>Payment Method</label>
        <div className="radio-group">
          <input
            type="radio"
            name= 'paymentMethod'
            value="UPI"
            checked={formData.paymentMethod === "UPI"}
            onChange={handleChange}
          />{" "}
          UPI
          <input
            type="radio"
            name='paymentMethod'
            value="Card"
            checked={formData.paymentMethod === "Card"}
            onChange={handleChange}
          />{" "}
          Credit/Debit Card
          <input
            type="radio"
            name= 'paymentMethod'
            value="COD"
            checked={formData.paymentMethod === "COD"}
            onChange={handleChange}
          />{" "}
          Cash on Delivery
        </div>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Form;
