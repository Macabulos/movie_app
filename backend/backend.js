const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fetch = require('node-fetch'); // Use node-fetch for API calls

const app = express();
const port = 3001;

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests

// Authentication Endpoints

// Register Endpoint
app.post('/register', async (req, res) => {
  const { username, email, password, age, gender, country } = req.body;
  if (!username || !email || !password || !age || !gender || !country) {
    return res.status(400).send('All fields are required');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // Simulate a successful registration
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error hashing password');
  }
});

// Login Endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Simulate user authentication
  const mockUser = { id: 1, username: 'testUser', email: 'test@example.com', password: '$2b$10$abcdef' };

  bcrypt.compare(password, mockUser.password, (err, isValid) => {
    if (err || !isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: mockUser.id, email: mockUser.email }, 'secret_key', { expiresIn: '1h' });
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: mockUser.id,
        username: mockUser.username,
        email: mockUser.email,
      },
    });
  });
});

// Middleware for Protected Routes (Token Verification)
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ message: 'Authorization header is required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'secret_key');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Fetch Movies from External API
app.get('/api/videos', async (req, res) => {
  const apiKey = '863a66b1b194d42146a0f662ff918286'; // Replace with your actual TMDB API key
  const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      const videos = data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, // Construct the full image URL
        overview: movie.overview,
      }));

      res.json(videos);
    } else {
      res.status(response.status).json({ message: data.status_message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching videos');
  }
});

// Protected Example Endpoint
app.get('/api/protected', verifyToken, (req, res) => {
  res.status(200).send('You have accessed a protected route');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
