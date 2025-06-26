import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 🔁 Load cart on mount
  
  useEffect(() => {
    const fetchCart = async () => {
      const student = JSON.parse(localStorage.getItem('student'));
      if (!student?.email) return;

      try {
        const res = await axios.get(  `http://localhost:4000/api/cart?email=${student.email}&studentType=${student.studentType}`);
        console.log("🔄 Fetching cart for student:", student.email);
        
        console.log('🛒 Cart Items in frontend (from MongoDB):', res.data);
        setCartItems(res.data);
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    };

    fetchCart();
  }, []);

  // ➕ Add to cart by name (product details come from backend)
 const addToCart = async (product, quantity = 1) => {
  const student = JSON.parse(localStorage.getItem('student'));
  if (!student?.email) return;

  try {
    // ✅ Parse base64 and contentType from product.image
    const base64 = product.image.split(',')[1];
    const contentType = product.image.split(';')[0].split(':')[1];

    // ✅ Post to backend
    const res = await axios.post('http://localhost:4000/api/cart', {
      email: student.email,
      name: product.name,
      price: product.price,
      discountedPrice: product.discountedPrice,
      quantity: quantity,
      image: {
        data: base64,
        contentType: contentType
      }
    });

    console.log('✅ Added to cart:', res.data);

    // ✅ Optionally update local cart items immediately
    setCartItems(prev => [...prev, res.data.newItem]); // if you return newItem from backend
  } catch (err) {
    console.error('❌ Failed to add to cart:', err);
  }
};

  // ❌ Remove item by name
  const removeFromCart = async (productName) => {
    const student = JSON.parse(localStorage.getItem('student'));
    if (!student?.email) return;

    try {
      const res = await axios.delete('http://localhost:4000/api/cart/remove', {
        data: { email: student.email, productName }
      });

      setCartItems(res.data);
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  // 🔄 Update quantity (frontend only)
  const updateQuantity = (name, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
