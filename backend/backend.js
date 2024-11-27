const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse incoming JSON requests

// Serve static video files
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Ensure videos are served from 'uploads' folder

// Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Replace with your MySQL root password
  database: 'video_app',
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
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, hashedPassword], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error registering user');
    } else {
      res.status(201).send('User registered');
    }
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

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
        const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });
        res.status(200).json({ token, message: 'Login successful' });
      }
    }
  });
});

// Video Fetch Endpoint
// Video Fetch Endpoint
app.get('/api/videos', (req, res) => {
  db.query('SELECT * FROM videos', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching videos');
    } else {
      // Assuming the 'video_link' column stores just the filename (e.g., 'video1.mp4')
      const videos = results.map(video => ({
        ...video,
        video_link: `http://localhost:${port}/uploads/${video.video_link}`, // Construct the full video URL
      }));
      res.json(videos); // Send the videos with the correct video link
    }
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
