import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Dashboard() {
const {user, logout } = useAuth();
return(
  <div className="box">
    <header>
      <div>AccountHub</div>
       <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/settings">Settings</Link>
         </nav>
        <div> <button className="ari" onClick={logout}>Logout</button>
        </div>
    </header>
    <main>
      <div className="fir">
        <h2>Welcome, {user?.name}</h2>
        <p>Here's an overreview of your account</p>
      </div>
      <div className="sec">
        <div className="secin">
          <h2>Email</h2>
          <p>{user?.email}</p>
        </div>
         <div className="secin">
          <h2>MEMBER SINCE</h2>
          <p>Just now</p>
        </div>
        <div className="secin">
          <h2>Account Status</h2>
          <p>Active</p>
        </div>
      </div>
      <div className="last">
        <h3>Quick Actions</h3>
        <div className="inner">
          <button className="fools">Edit Profile</button>
          <button className="fools">Change Password</button>
        </div>
      </div>
    </main>

  </div>
)
}
export default Dashboard