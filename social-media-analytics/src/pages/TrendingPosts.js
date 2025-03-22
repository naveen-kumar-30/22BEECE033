import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";

function TrendingPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3001/api/posts/trending"
        );
        const trendingPosts = response.data.data.posts.map((post, index) => ({
          ...post,
          commentCount: post.commentCount || 0,
          image: `https://picsum.photos/200/300?random=${index + 6}`,
        }));
        setPosts(trendingPosts);
        setError(null);
      } catch (error) {
        setError("Failed to load trending posts. Please try again later.");
        console.error("Error fetching trending posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingPosts();
  }, []);

  const cachedPosts = useMemo(() => posts, [posts]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Trending Posts
      </Typography>
      {loading && (
        <CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {!loading &&
        !error &&
        cachedPosts.map((post) => (
          <Card
            key={post.id}
            sx={{
              mb: 2,
              transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition
              "&:hover": {
                transform: "translateY(-5px)", // Lift the card slightly
                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)", // Add shadow on hover
              },
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={post.image}
              alt="Post image"
            />
            <CardContent>
              <Typography variant="h6">{post.content}</Typography>
              <Typography variant="body2" color="text.secondary">
                Post ID: {post.id} | User ID: {post.userid}
              </Typography>
              <Typography variant="body2" color="primary">
                Comments: {post.commentCount}
              </Typography>
            </CardContent>
          </Card>
        ))}
    </Container>
  );
}

export default TrendingPosts;
