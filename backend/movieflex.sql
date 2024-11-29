
-- Table: Users
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    age INT,
    gender ENUM('Male', 'Female', 'Other'),
    country VARCHAR(100),
    registration_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table: Movies
CREATE TABLE Movies (
    movie_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_date DATE,
    director VARCHAR(100),
    cast JSON, -- To store multiple actors efficiently
    language VARCHAR(50)
);

-- Table: User_Ratings
CREATE TABLE User_Ratings (
    rating_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    movie_id INT,
    rating TINYINT CHECK (rating BETWEEN 1 AND 5),
    review TEXT,
    rating_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id) ON DELETE CASCADE
);

-- Table: Genres
CREATE TABLE Genres (
    genre_id INT AUTO_INCREMENT PRIMARY KEY,
    genre_name VARCHAR(50) NOT NULL UNIQUE
);

-- Table: Movie_Genres
CREATE TABLE Movie_Genres (
    movie_genre_id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT,
    genre_id INT,
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES Genres(genre_id) ON DELETE CASCADE
);

-- Table: Recommendations
CREATE TABLE Recommendations (
    recommendation_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    movie_id INT,
    algorithm_used VARCHAR(50), -- Indicates the method (e.g., Collaborative Filtering)
    recommendation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id) ON DELETE CASCADE
);

-- Table: Viewing_History
CREATE TABLE Viewing_History (
    viewing_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    movie_id INT,
    viewing_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    watch_duration INT CHECK (watch_duration >= 0), -- Duration in minutes
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id) ON DELETE CASCADE
);
