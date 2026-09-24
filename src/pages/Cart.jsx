import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
const API_URL = 'http://localhost:5000'
function Cart(){
const [cart, setCart] = useState({items: []})
const [error, setError] = useState('')
const [loading, setLoading] = useState(true)
const token = localStorage.getItem('token')
const  fetchCart = async () => {
  try{
    const { data } = await axios.get(`${API_URL}/api/cart`, {
      headers:{
      Authorization: `Bearer ${token}`
      },
    });
    setCart(data)
  }
  catch(error){
    setError(error.response?.data?.message || 'Failed to load cart')
  }
  finally{
    setLoading(false)
  }
}
//useEffect for fetching once,
useEffect(()=>{
  fetchCart()
}, [])

const handleQty = async (productId, qty, stock) => {
  if (qty < 1)return;
  if (qty > stock){
    setError(`Only ${stock} in stock`);
    return;
  }
  setError('');
  try{
    const {data} = await axios.put(`${API_URL}/api/cart/items/${productId}`,
      {qty},
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    );
    setCart(data)
  }catch(error){
    setError(error.response?.data?.message || 'Failed to add stock')
  }
  finally{
    setLoading(false)
  }

}
const handleRemove = async (productId)=> {
  setError('')
  try{
    const {data} = await axios.delete(`${API_URL}/api/cart/items/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    );
    setCart(data);
  } catch(error){
    setError(error.response?.data?.message || 'Failed to remove item')
  } finally{
    setLoading(false)
  }
}
const handleClear = async ()=>{
  if(!window.confirm('empty your cart?')) return;
  setError('');
  try{
    const {data} = await axios.delete(`${API_URL}/api/cart`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    setCart(data)
    
  }
  catch(error){
    setError(error.response?.data?.message || 'Failed to clear cart')
  }
   
};

if(loading) return<div>Loading cart</div>

const items = cart.items || [];
const subtotal = items.reduce((sum, item )=>{
  const price = item.product?.price || 0
  return sum + price * item.qty
}, 0)



return(
  <div className='Cart'>
    <header className="third">
      <div>AccountHub</div>
       <nav className="fourth">
        <Link to="/product">Products</Link>
        <Link to="/settings">Settings</Link>
        <Link to= '/my-products'>MyProducts</Link>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to = '/carts'>Cart</Link>
         </nav>

         
    </header>
    <div className='mee'>
      <h1>My Cart</h1>
      <button onClick={handleClear}>Clear</button>
    </div>
    <div>

      {error && <p>{error}</p>}
    </div>
      {items.length === 0 ?(
        <div>
        <p>Your Cart is empty</p>
        <Link to='/product'>Browse product</Link>
        </div>
      ): (
        <div className='Layout'>
      {items.map((e)=>{
        
          <div className='produc'>
            <img src={e.img} alt='e.name'/>
            <h2>{e.name}</h2>
            <p>{e.category}</p>
            <h1>${e.price}</h1>
            <p>{e.qty} in stock</p>
            <div>
              <button onClick={handleRemove}>-</button>
              <p>{e.qty}</p>
              <button >+</button>
            </div>
            <p>Line: </p>
            <button onClick={handleRemove}>Remove</button>
          </div>
        
      })}
    </div>
      )}
  
    
    </div>


)
}
export default Cart
