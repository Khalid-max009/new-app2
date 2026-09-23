import {useState} from 'react';
import { Link } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';
function Settings(){
const {user, updateProfile, updatePassword, logout} = useAuth();
const [name, setName] = useState(user?.name || '');
const [email, setEmail] = useState(user?.email);
const [profileMessage, setProfileMessage] = useState('');  
const [currentPassword, setCurrentPassword] = useState( '');
const [profileLoading, setProfileLoading] = useState(false);
const [passwordError, setPasswordError] = useState('');
const [newPassword, setNewPassword ] = useState('');
const [profileError, setProfileError] = useState('');
const [passwordLoading, setPasswordLoading] = useState(false);
const [comfirmPassword, setComfirmPassword] = useState('');
const handleProfileSubmit = async (e) => {
  e.preventDefault();
  setProfileError('');
  setProfileLoading(true);
  setProfileMessage('');
  
  try {
    await updateProfile(name, email)
    setProfileMessage('Profile updated Sucessfully')
  } catch (err){
    setProfileError(err.message)
    
  }
  finally{
    setProfileLoading(false)
  }

}
const handlePaswordSubmit = async(e) => {
  e.preventDefault()
  setPasswordError('')
  setPasswordLoading(true)
  if(newPassword != comfirmPassword){setPasswordError('new password and comfirm password do not match'); 
    return;
  }

  try{
    await updatePassword(currentPassword, newPassword)
    setCurrentPassword('')
    setNewPassword('')
 
  }
  catch(err){
    setPasswordError(err.message)
  }
  finally {
   setPasswordLoading(false)
  }
  
}
return(
  <div className='Setting'>
   <h2>Settings</h2>
   <form onSubmit={handleProfileSubmit} className='profileSubmit'>
    <h3>Update Profile</h3>
    {profileMessage && <p className='success'>{profileMessage}</p>}
    {profileError && <p className='error'>{profileError}</p>}
    <div className='ii'>
      <label>Name:</label>
      <input
      type='name'
      placeholder='John Doe'
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
    </div>
    <div className='ii'>
      <label>Email:</label>
      <input
      type='email'
      placeholder='example@email.com'
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      />
      </div>
      <button type='submit' disabled={profileLoading}>
        {profileLoading ? 'Updating Profile...' : 'Update Profile'}
      </button>
   </form>
    
    <form onSubmit={handlePaswordSubmit} className='passwordSubmit'>
      <h3>Update Password</h3>
      {passwordError && <p className='error'>{passwordError}</p>}
      <div className='iii'>
        <label>current password:</label>
        <input
        type='password'
        placeholder='......'
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>

       <div className='iii'>
        <label>New password:</label>
        <input
        type='password'
        placeholder='......'
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      
       <div className='iii'>
        <label>Comfirm password:</label>
        <input
        type='password'
        placeholder='......'
        value={comfirmPassword}
        onChange={(e) => setComfirmPassword(e.target.value)}
        />
      </div>

    <button type='submit' disabled={passwordLoading}>
      {passwordLoading ? 'Updating Password...' : 'Update Password'}
     
    </button>
     <Link to="/dashboard">Back to Dashboard</Link>
    {passwordError && <p className='error'>{passwordError}</p>}
 
    </form>
    
      
    </div>
 
)
};

export default Settings;