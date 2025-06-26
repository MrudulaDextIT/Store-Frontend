import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Navbar from "../Navbar/Navbar";
import { Button } from "@mui/material";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* <Navbar /> */}
      <div className="Home">
        <h1>
          <span>Welcome to Alex Store</span>
        </h1>
        <h2>Your One-Stop Shop for Stationery & Books!</h2>
        <p>
          At Alex, we bring you a wide range of high-quality books, pens,
          pencils, colors, and more! Whether you're a student, an artist, or a
          professional, we have the perfect stationery to fuel your creativity
          and productivity.
        </p>
        <div className="Home-action">
          <Button   variant="outlined"  sx={{ bgcolor: "#B923E1", color: "white" }} onClick={() => navigate("/form")}>
            Your Order
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;