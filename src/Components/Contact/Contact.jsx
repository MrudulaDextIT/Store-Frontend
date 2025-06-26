import React from "react";
import "./Contact.css";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";

const Contact = () => {
  return (
    <Box
      sx={{
        my: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Centers horizontally
        textAlign: "center", // Aligns text in the center
        px: 2, // Adds padding on smaller screens
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
        Contact My Store
      </Typography>
      <Typography sx={{ maxWidth: "700px", mb: 4 }}>
        We would love to hear from you! If you have any questions, feedback, or need assistance with your order, feel
        free to reach out. Our team is here to help and ensure you have the best shopping experience. Your satisfaction
        is our priority.
      </Typography>

      <Box
        sx={{
          width: { xs: "90%", sm: "80%", md: "600px" }, // Responsive width
          maxWidth: "100%",
        }}
      >
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
          <Table aria-label="contact table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ bgcolor: "#6A1B9A", color: "white", fontSize: "18px" }} align="center">
                  Contact Details
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <SupportAgentIcon sx={{ color: "red", mr: 1 }} /> 18-000-0000 (Toll-Free)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <MailIcon sx={{ color: "blue", mr: 1 }} /> help@mystore.com
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <CallIcon sx={{ color: "green", mr: 1 }} /> 7525966545
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Contact;
