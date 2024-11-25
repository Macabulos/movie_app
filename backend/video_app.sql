-- Create the database
CREATE DATABASE IF NOT EXISTS video_app;

-- Use the database
USE video_app;

-- Create the 'videos' table
CREATE TABLE IF NOT EXISTS videos (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- Unique ID for each video
    name VARCHAR(255) NOT NULL,         -- Name of the video
    video_link TEXT NOT NULL,           -- URL or file path for the video
    description TEXT,                   -- Description of the video
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for when the video was added
);

CREATE DATABASE user_management;

USE user_management;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
