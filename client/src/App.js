import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const user = localStorage.getItem('user');
  
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={!user ? <Login/> : <Navigate to='/' />} />
          <Route path='/register' element={!user ? <Register/> : <Navigate to='/' />} />
          <Route path='/' element={user ? <Home /> : <Navigate to='/login' /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
