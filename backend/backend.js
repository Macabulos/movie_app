const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Replace with your MySQL root password
  database: 'video_app', // Adjust to the correct database for videos if needed
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// **Authentication Endpoints**

// Register Endpoint
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, hashedPassword], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error registering user');
    } else {
      res.status(201).send('User registered');
    }
  });
});

// Login Endpoint
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


// **Video Fetch Endpoint**

// Get Videos Endpoint
app.get('/api/videos', (req, res) => {
  db.query('SELECT * FROM videos', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching videos');
    } else {
      res.json(results);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
