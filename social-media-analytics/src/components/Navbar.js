import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#e8ecef", 
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)", 
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontFamily: "'Poppins', sans-serif", 
            fontWeight: 600,
            color: "#1a73e8", 
            letterSpacing: "0.5px",
          }}
        >
          Social Media Analytics
        </Typography>
        <Button
          component={Link}
          to="/"
          sx={{
            color: "#5f6368", 
            margin: "0 8px", 
            padding: "8px 16px", 
            fontFamily: "'Roboto', sans-serif", 
            fontWeight: 500,
            borderRadius: "8px", 
            transition: "all 0.3s ease", 
            "&:hover": {
              backgroundColor: "#1a73e8", 
              color: "#ffffff", 
              transform: "translateY(-2px)", 
              boxShadow: "0px 4px 15px rgba(26, 115, 232, 0.3)", 
            },
          }}
        >
          Top Users
        </Button>
        <Button
          component={Link}
          to="/trending"
          sx={{
            color: "#5f6368", 
            margin: "0 8px", 
            padding: "8px 16px", 
            fontFamily: "'Roboto', sans-serif", 
            fontWeight: 500,
            borderRadius: "8px", 
            transition: "all 0.3s ease", 
            "&:hover": {
              backgroundColor: "#1a73e8", 
              color: "#ffffff", 
              transform: "translateY(-2px)", 
              boxShadow: "0px 4px 15px rgba(26, 115, 232, 0.3)", 
            },
          }}
        >
          Trending Posts
        </Button>
        <Button
          component={Link}
          to="/feed"
          sx={{
            color: "#5f6368", 
            margin: "0 8px", 
            padding: "8px 16px", 
            fontFamily: "'Roboto', sans-serif", 
            fontWeight: 500,
            borderRadius: "8px", 
            transition: "all 0.3s ease", 
            "&:hover": {
              backgroundColor: "#1a73e8", 
              color: "#ffffff", 
              transform: "translateY(-2px)", 
              boxShadow: "0px 4px 15px rgba(26, 115, 232, 0.3)", 
            },
          }}
        >
          Feed
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
