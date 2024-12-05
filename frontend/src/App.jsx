import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/login';
import Register from './pages/Register/register';
import Home from './pages/Home/home';
import Categories from './pages/Category/category'; // Import Categories page
import Favorites from './pages/Favorites/favorites';   // Import Favorites page
import Profile from './pages/Profile/profile';         // Import Profile page

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Navigate to="/login" replace />} /> {/* Default route */}
      </Routes>
    </div>
  );
}

export default App;
