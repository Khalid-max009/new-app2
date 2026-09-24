import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Dashboard() {
const {user, logout } = useAuth();
return(
  <div className="box">
    <header className="third">
      <div>AccountHub</div>
       <nav className="fourth">
        <Link to="/product">Products</Link>
        <Link to="/settings">Settings</Link>
        <Link to= '/my-products'>MyProducts</Link>
        <Link to= '/carts'>Carts</Link>
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
          <Link to = '/settings' className="fools">Edit Profile</Link>
          <Link to = '/settings' className="fools">Change Password</Link>
        </div>
      </div>
    </main>

  </div>
)
}
export default Dashboard