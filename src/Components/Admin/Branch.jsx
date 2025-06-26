import React from 'react';
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const Branch = () => {
  return (
    <Box p={3}>
      <Typography variant="h5" mb={3}>Branch Management</Typography>
      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>School Name</TableCell>
              <TableCell>School Location</TableCell>
              <TableCell>Contact Person</TableCell>
              <TableCell>Contact Number</TableCell>
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

export default Branch;
