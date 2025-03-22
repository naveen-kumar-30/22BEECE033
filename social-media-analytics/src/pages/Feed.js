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
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3001/api/posts/feed?page=1"
        );
        const latestPosts = response.data.data.posts
          .slice(0, 5)
          .map((post, index) => ({
            ...post,
            image: `https://picsum.photos/200/300?random=${index + 11}`,
          }));
        setPosts(latestPosts);
        setError(null);
      } catch (error) {
        setError("Failed to load feed. Please try again later.");
        console.error("Error fetching latest posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
    const interval = setInterval(fetchLatestPosts, 5000);
    return () => clearInterval(interval);
  }, []);

  const cachedPosts = useMemo(() => posts, [posts]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Live Feed
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
        <AnimatePresence>
          {cachedPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }} 
            >
              <Card
                sx={{
                  mb: 2,
                  transition: "box-shadow 0.3s ease", 
                  "&:hover": {
                    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)", 
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
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </Container>
  );
}

export default Feed;
