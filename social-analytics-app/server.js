const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const CONFIG = {
    port: 3001,
    currentTime: '2025-03-22 07:02:49',
    currentUser: 'naveenkumar830'
};

const mockData = JSON.parse(fs.readFileSync('social_media_mock_data.json', 'utf-8'));

app.get('/api/users', (req, res) => {
    res.json({
        timestamp: CONFIG.currentTime,
        user: CONFIG.currentUser,
        data: { users: mockData.users }
    });
});

app.get('/api/users/:userId/posts', (req, res) => {
    const { userId } = req.params;
    const user = mockData.users[userId];
    
    if (user) {
        res.json({
            timestamp: CONFIG.currentTime,
            user: CONFIG.currentUser,
            data: { posts: user.posts }
        });
    } else {
        res.status(404).json({
            timestamp: CONFIG.currentTime,
            user: CONFIG.currentUser,
            error: 'User not found'
        });
    }
});

app.get('/api/posts/:postId/comments', (req, res) => {
    const { postId } = req.params;
    let comments = [];

    for (const user of Object.values(mockData.users)) {
        for (const post of user.posts) {
            if (post.id == postId) {
                comments = post.comments;
                break;
            }
        }
    }

    res.json({
        timestamp: CONFIG.currentTime,
        user: CONFIG.currentUser,
        data: { comments }
    });
});

app.get('/api/users/top', (req, res) => {
    const topUsers = mockData.stats.topUsers;

    res.json({
        timestamp: CONFIG.currentTime,
        user: CONFIG.currentUser,
        data: { users: topUsers }
    });
});

app.get('/api/posts/trending', (req, res) => {
    const trendingPosts = mockData.trending.posts;

    res.json({
        timestamp: CONFIG.currentTime,
        user: CONFIG.currentUser,
        data: { posts: trendingPosts }
    });
});

app.get('/api/posts/feed', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;
    const start = (page - 1) * pageSize;
    const paginatedPosts = mockData.feed.latest.slice(start, start + pageSize);

    res.json({
        timestamp: CONFIG.currentTime,
        user: CONFIG.currentUser,
        data: {
            posts: paginatedPosts,
            hasMore: start + pageSize < mockData.feed.latest.length,
            page,
            totalPosts: mockData.feed.latest.length
        }
    });
});

app.listen(CONFIG.port, () => {
    console.log(`Server running on port ${CONFIG.port}`);
});