import {useState} from 'react';
import {  Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
 function Signup (){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {signup} = useAuth();
  const navigate = useNavigate();
 const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("1. HANDLE SUBMIT STARTED");

  setError('');
  setLoading(true);

  try {
    console.log("2. ABOUT TO CALL SIGNUP");

    await signup(name, email, password);

    console.log("3. SIGNUP SUCCEEDED");

    navigate('/dashboard');

  } catch (err) {

    console.log("4. SIGNUP FAILED:", err);
    console.log("5. ERROR MESSAGE:", err.message);

    setError(err.message);
    setLoading(false);
  }
};
return (
  <div className='container'>
    <h2>SignUp Page</h2>
    <form onSubmit={handleSubmit}>
    <div className='first'>
      <label>Name:</label>
      <input
        placeholder='Enter your name'
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
    <div className='first'>
      <label>Email:</label>
      <input
        placeholder='example@gmail.com'
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      </div>
      <div className='first'>
      <label>Password:</label>
      <input
        placeholder='......'
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    
    <button  type ="submit" disabled={loading}>
      {loading? "Signing Up..." : "Sign Up"}

    </button>
    {error && <p className='error'>{error}</p>}
    <Link to="/login">Already have an account? Login</Link>
 </form>
  </div>
)
};



export default Signup;