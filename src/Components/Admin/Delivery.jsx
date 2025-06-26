import React from 'react';
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const Delivery = () => {
  return (
    <Box p={3}>
      <Typography variant="h5" mb={3}>Delivery Management</Typography>
      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order Number</TableCell>
              <TableCell>School Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Delivery Status</TableCell>
              <TableCell>Payment Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Dynamic rows */}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default Delivery;
