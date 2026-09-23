import {useState, useEffect} from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
const API_URL = "http://localhost:5000";
function MyProducts (){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingID, setDeletingID] = useState(null);
  useEffect(  () => {
    const fetchMyProducts = async () =>{
      try{
        const token = localStorage.getItem('token')
        if(!token){throw new Error('You are not logged in')}
        const {data} = await axios.get(`${API_URL}/api/products/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        setProducts(data)
      } catch (error) {
        setError(error.response?.data?.message || error.message || 'Failed to load your products')
      } finally {
        setLoading(false)
      }
    };
    fetchMyProducts();


  }, [])
  const handleDelete = async (productID) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this file forever?'
    );
    if(!confirmed) return;
    setDeletingID(productID)
    setError('');

    try{
      const response = await fetch(`${API_URL}/api/products/${productID}`,{
        method: 'DELETE',
      })
      const data = await res.json();
      if(!res.ok){
        throw new Error(data.message|| 'Failed to delete product')
      }
      //Remove the product from the UI using filter
      setProducts((prev)=> prev.filter((p) => p._id !== productId))
    } catch(err){
      setError(err.message)
    } finally{
      setDeletingID(null)
    }

  }

  if(loading){ return <p>Loading...</p>}
  if(error){return <p>Error: {error}</p>}
  return(
    <div className='MyProducts'>
       
      <main>
         {products.map((product) => (
      
        <div key={product._id} className="product-card">
        
          <img src={product.image} alt={product.name} />
          <div className="product-details">
            <h3 style={{   fontWeight: 'bold', fontSize: '24px'}}>{product.name}</h3>
            <p>Stock: {product.stock}</p>
            <p style={{color: 'green', fontWeight: 'bold', fontSize: '24px'}}>Price: ${product.price.toFixed(2)}</p>
            <p style={{  fontSize: '16px'}}>Category: {product.category}</p>
          
            {product.stock === 0 ? (
              <p>Out of Stock</p>
            ) : (
              <p>In Stock</p>
            )}
          <div>
          <Link to= {`/edit-product/${product._id}`} style={{textDecoration: 'none'}}>Edit Product</Link>
          <button
          onClick={()=> handleDelete(product._id)}
          disabled={deletingID === product._id}

          >{deletingID=== product._id ? 'Deleting..': 'Delete'}</button>

          </div>
          <Link to='/addProduct'>Add product+</Link>
          </div>
             
          
        </div>
      
    ))
    }
      </main>
    </div>
  )
}
export default MyProducts
