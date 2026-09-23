import {Link} from 'react-router-dom';
function NavBar(){
  return(
      <header className='aain'>
        <div >
          <h2>AccountHub</h2>
        </div>
        <nav className='nav'>
          <Link to='/Dashboard'>Dashboard</Link>
          <Link to='/Products'>Products</Link>
          <Link to= '/Settings'>Settings</Link>
        </nav>
      </header>
  )
}
export default NavBar