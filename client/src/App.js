import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={!isLoggedIn ? <Login/> : <Navigate to='/' />} />
          <Route path='/register' element={!isLoggedIn ? <Register/> : <Navigate to='/' />} />
          <Route path='/' element={isLoggedIn ? <Home /> : <Navigate to='/login' /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
