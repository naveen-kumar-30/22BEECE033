import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#e8ecef", // White background
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontFamily: "'Poppins', sans-serif", // Modern font
            fontWeight: 600,
            color: "#1a73e8", // Google Blue for the title
            letterSpacing: "0.5px", // Slightly spaced letters
          }}
        >
          Social Media Analytics
        </Typography>
        <Button
          component={Link}
          to="/"
          sx={{
            color: "#5f6368", // Dark gray text
            margin: "0 8px", // Spacing between buttons
            padding: "8px 16px", // Padding for better click area
            fontFamily: "'Roboto', sans-serif", // Modern font
            fontWeight: 500,
            borderRadius: "8px", // Rounded corners
            transition: "all 0.3s ease", // Smooth transition
            "&:hover": {
              backgroundColor: "#1a73e8", // Google Blue on hover
              color: "#ffffff", // White text on hover
              transform: "translateY(-2px)", // Slight lift on hover
              boxShadow: "0px 4px 15px rgba(26, 115, 232, 0.3)", // Shadow on hover
            },
          }}
        >
          Top Users
        </Button>
        <Button
          component={Link}
          to="/trending"
          sx={{
            color: "#5f6368", // Dark gray text
            margin: "0 8px", // Spacing between buttons
            padding: "8px 16px", // Padding for better click area
            fontFamily: "'Roboto', sans-serif", // Modern font
            fontWeight: 500,
            borderRadius: "8px", // Rounded corners
            transition: "all 0.3s ease", // Smooth transition
            "&:hover": {
              backgroundColor: "#1a73e8", // Google Blue on hover
              color: "#ffffff", // White text on hover
              transform: "translateY(-2px)", // Slight lift on hover
              boxShadow: "0px 4px 15px rgba(26, 115, 232, 0.3)", // Shadow on hover
            },
          }}
        >
          Trending Posts
        </Button>
        <Button
          component={Link}
          to="/feed"
          sx={{
            color: "#5f6368", // Dark gray text
            margin: "0 8px", // Spacing between buttons
            padding: "8px 16px", // Padding for better click area
            fontFamily: "'Roboto', sans-serif", // Modern font
            fontWeight: 500,
            borderRadius: "8px", // Rounded corners
            transition: "all 0.3s ease", // Smooth transition
            "&:hover": {
              backgroundColor: "#1a73e8", // Google Blue on hover
              color: "#ffffff", // White text on hover
              transform: "translateY(-2px)", // Slight lift on hover
              boxShadow: "0px 4px 15px rgba(26, 115, 232, 0.3)", // Shadow on hover
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
