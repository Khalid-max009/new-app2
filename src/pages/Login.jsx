 import { Link, useNavigate } from "react-router-dom";
import {useAuth} from '../context/AuthContext';
import { useState } from 'react'
 function Login(){
    
const navigate = useNavigate();
const { login } = useAuth();

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
     setError('');
    setLoading(true);
    try{
await login(email, password);
navigate('/dashboard');
} catch (err) {
  setError(err.message)
  } finally {
   setLoading(false)
  }
   
 


  }
  return (
    <div className="content">
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="second">
          <label>Email:</label>
          <input
            placeholder='example@gmail.com'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="second">
          <label>Password:</label>
          <input
            placeholder='......'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p  style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Logging In..." : "Login"}
        </button>
        <Link to="/signup">Don't have an account? Sign Up</Link>
      </form>
    </div>
  )
}
export default Login;