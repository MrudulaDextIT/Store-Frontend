import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Grid,
  Box,
  CircularProgress,
  Alert,
  Button,
  Stack,
} from '@mui/material';
import { useCart } from './Cart/CartContext';
import AddCart from './Cart/AddCart';
import { useNavigate } from 'react-router-dom';


const OrderBooks = () => {
 const { addToCart } = useCart();

const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // const { addToCart } = useCart(); 

  
  // Load student from localStorage
  useEffect(() => {
    const storedStudent = JSON.parse(localStorage.getItem('student'));
    if (storedStudent) {
      setStudent(storedStudent);
    } else {
      setError('No student data found.');
      setLoading(false);
    }
  }, []);

  // Fetch books for student
  useEffect(() => {
    const fetchProducts = async () => {
      if (!student) {
        setError('Invalid student profile.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const params = {};
        if (student.college) {
          params.degree = student.degree;
          params.stream = student.stream;
          params.classYear = student.year;
          params.studentType = 'college';
        } else if (student.schoolName) {
          params.className = student.class;
          params.studentType = 'school';
        }

        const res = await axios.get('http://localhost:4000/api/products', { params });
        setProducts(res.data);
      } catch (err) {
        console.error('❌ Error fetching products:', err);
        setError('Failed to load books. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (student) fetchProducts();
  }, [student]);

 const handleAddToCart = (product) => {
    addToCart(product, 1);
    console.log('🛒 Added to cart:', product.name);

    navigate('/student/cart/AddCart'); // Navigate to cart page after adding
  };

  const handleBuyNow = (product) => {
    AddCart(product);
    // Optionally: navigate('/student/cart') or order page
    console.log('💳 Buy Now:', product.name);
  };

  // useNavigate(() => { 


  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Available Books
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={3}>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card>
                {product.image && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                  />
                )}
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography>Price: ₹{product.price}</Typography>
                  <Typography>Quantity: {product.quantity}</Typography>

                  {/* Buttons */}
                  <Stack direction="row" spacing={2} mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                    {/* <Button
                      variant="outlined"
                      color="success"
                      fullWidth
                      onClick={() => handleBuyNow(product)}
                    >
                      Buy Now
                    </Button> */}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography>No books found for your profile.</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default OrderBooks;
