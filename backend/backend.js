const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001;

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from 'uploads' folder

// Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Replace with your MySQL root password
  database: 'movieflex',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Authentication Endpoints

// Register Endpoint
app.post('/register', async (req, res) => {
  const { name, email, password, age, gender, country } = req.body; // Include additional user fields
  if (!name || !email || !password || !age || !gender || !country) {
    return res.status(400).send('All fields are required');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, email, password, age, gender, country) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [name, email, hashedPassword, age, gender, country], (err) => {
      if (err) {
        console.error(err);
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).send('Email already exists');
        }
        res.status(500).send('Error registering user');
      } else {
        res.status(201).send('User registered successfully');
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error hashing password');
  }
});

// Login Endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error logging in');
    } else if (results.length === 0) {
      res.status(404).send('User not found');
    } else {
      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        res.status(401).send('Invalid credentials');
      } else {
        const token = jwt.sign({ id: user.user_id }, 'secret_key', { expiresIn: '1h' });
        res.status(200).json({ token, message: 'Login successful' });
      }
    }
  });
});

// Video Fetch Endpoint
// Video Fetch Endpoint
app.get('/api/videos', (req, res) => {
  const query = 'SELECT movie_id, title, video_link, release_date FROM movies'; // Fetch relevant columns
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching videos');
    } else {
      const videos = results.map((video) => ({
        id: video.movie_id,
        title: video.title,
        release_date: video.release_date, // Include release date directly
        video_link: `http://localhost:${port}/uploads/${video.video_link}`, // Construct the full video URL
      }));
      res.json(videos);
    }
  });
});



// Middleware for Protected Routes (Token Verification)
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send('Token is required');
  }

  try {
    const decoded = jwt.verify(token, 'secret_key');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send('Invalid or expired token');
  }
};

// Protected Example Endpoint
app.get('/api/protected', verifyToken, (req, res) => {
  res.status(200).send('You have accessed a protected route');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
