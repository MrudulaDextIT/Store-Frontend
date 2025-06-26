import React from "react"; 
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import Swal from 'sweetalert2'

const EditOrder = () => {
  const { id } = useParams();         
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    product: "",
    quantity: "",
    paymentMethod: "",
  });

  useEffect(() => {
    fetch(`http://localhost:4000/get-data/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.log(err));
  }, [id]);

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


  const handleUpdate = (e) => {
    e.preventDefault();
  
    fetch(`http://localhost:4000/update-form-data/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        
        navigate("/list");
      })
      .catch((err) => console.log(err));
      Swal.fire({
        title: " Edited!",
        text: "Successfully!",
        icon: "success"
      });
  };
  

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Edit Order
      </Typography>

      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <form onSubmit={handleUpdate}>
          <TextField  
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Phone"
            name="phone"
            fullWidth
            margin="normal"
            value={formData.phone}
            onChange={handleChange}
            error={formData.phone.length > 10}
            helperText={
              formData.phone.length > 10
                ? "Phone number cannot exceed 10 digits"
                : ""
            }
          />
          <TextField
            label="Product"
            name="product"
            fullWidth
            margin="normal"
            value={formData.product}
            onChange={handleChange}
          />
          <TextField
            label="Quantity"
            name="quantity"
            fullWidth
            margin="normal"
            value={formData.quantity}
            onChange={handleChange}
          />
          <TextField
            label="Payment Method"
            name="paymentMethod"
            fullWidth
            margin="normal"
            value={formData.paymentMethod}
            onChange={handleChange}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Update Order
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default EditOrder;
