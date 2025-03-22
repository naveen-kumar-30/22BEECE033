import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";

const randomImages = [
  "https://picsum.photos/200/300?random=1",
  "https://picsum.photos/200/300?random=2",
  "https://picsum.photos/200/300?random=3",
  "https://picsum.photos/200/300?random=4",
  "https://picsum.photos/200/300?random=5",
];

function TopUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3001/api/users/top");
        const topUsers = Object.entries(response.data.data.users).map(
          ([id, data], index) => ({
            id,
            name: data.name || data, // Fallback if just name is provided
            postCount: data.postCount || 0,
            image: randomImages[index % randomImages.length],
          })
        );
        setUsers(topUsers);
        setError(null);
      } catch (error) {
        setError("Failed to load top users. Please try again later.");
        console.error("Error fetching top users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopUsers();
  }, []);

  const cachedUsers = useMemo(() => users, [users]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Top Users by Post Count
      </Typography>
      {loading && (
        <CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {!loading && !error && (
        <Grid container spacing={3}>
          {cachedUsers.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card
                sx={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition
                  "&:hover": {
                    transform: "translateY(-5px)", // Lift the card slightly
                    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)", // Add shadow on hover
                  },
                }}
              >
                <CardContent sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={user.image}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                  <div>
                    <Typography variant="h6">{user.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      User ID: {user.id}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      Posts: {user.postCount}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default TopUsers;
