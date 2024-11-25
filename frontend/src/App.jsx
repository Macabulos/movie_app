import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/login';
import Register from './pages/Register/register';
import Home from './pages/Home/home';

function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;


// import React from 'react'
// import Home from './pages/Home/home'
// import { Routes, Route } from 'react-router-dom'
// import Login from './pages/Login/login'
// import Register from './pages/Login/register'



// const App = () => {
//   return (
//     <div>
//       <Routes>
        
//         <Route path='/login' element={<Login/>}/>
//         <Route path='/register' element={<Register/>}/>
//         <Route path='/' element={<Home/>}/>
//       </Routes>
 
//     </div>
//   )
// }

// export default App
