import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Divider,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from './CartContext';

const AddCart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

 const getImageUrl = (image) => {
  if (!image?.data || !image?.contentType) return '';
  const base64 = Buffer.from(image.data.data).toString('base64');
  return `data:${image.contentType};base64,${base64}`;
};
  const handleQuantityChange = (name, newQty) => {
    const quantity = parseInt(newQty);
    if (!isNaN(quantity) && quantity > 0) {
      updateQuantity(name, quantity);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        🛒 Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography>No items in cart.</Typography>
      ) : (
        <Grid container spacing={3}>
          {cartItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {item.image && (
                  <CardMedia
                    component="img"
                    height="180"
                    image={getImageUrl(item.image)}
                    alt={item.name}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack spacing={1}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography>Price: ₹{item.price}</Typography>
                    {item.discountedPrice && (
                      <Typography color="green">
                        Discounted: ₹{item.discountedPrice}
                      </Typography>
                    )}

                    <TextField
                      label="Quantity"
                      type="number"
                      size="small"
                      value={item.quantity || 1}
                      onChange={(e) =>
                        handleQuantityChange(item.name, e.target.value)
                      }
                      inputProps={{ min: 1 }}
                      sx={{ width: 100 }}
                    />

                    <Divider />

                    <IconButton
                      color="error"
                      onClick={() => removeFromCart(item.name)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default AddCart;
