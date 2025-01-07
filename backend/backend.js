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
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your React app's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow necessary HTTP methods
  credentials: true,
};
app.use(cors(corsOptions)); // Apply CORS options here

app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Replace with your MySQL root password
  database: 'movieflex',
});

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
  const { username, email, password, age, gender, country } = req.body;

  if (!username || !email || !password || !age || !gender || !country) {
    return res.status(400).send('All fields are required');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, email, password, age, gender, country) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [username, email, hashedPassword, age, gender, country], (err) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).send('Email already exists');
        }
        return res.status(500).send('Error registering user');
      }
      res.status(201).send('User registered successfully');
    });
  } catch (error) {
    res.status(500).send('Error hashing password');
  }
});

// Login Endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Error logging in' });
    }

    if (results.length === 0) {
      console.warn('User not found for email:', email);
      return res.status(404).json({ message: 'User not found' });
    }

    const user = results[0];
    try {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        console.warn('Invalid password for email:', email);
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.user_id, email: user.email },
        'secret_key',
        { expiresIn: '1h' }
      );

      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user.user_id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (compareError) {
      console.error('Error comparing passwords:', compareError);
      res.status(500).json({ message: 'Error during authentication' });
    }
  });
});

// Middleware for Protected Routes
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

// Example Protected Endpoint
app.get('/api/protected', verifyToken, (req, res) => {
  res.status(200).send('You have accessed a protected route');
});

// Fetch Movie Data from TMDB API
app.get('/movies/now_playing', (req, res) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer 863a66b1b194d42146a0f662ff918286`, // Replace YOUR_ACCESS_TOKEN with your TMDB API token
    },
  };

  fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
    .then((response) => response.json())
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ error: 'Failed to fetch movies', details: err.message }));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
