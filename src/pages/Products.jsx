  import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
 
const API_URL = 'http://localhost:5000';
function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('')

  useEffect(() => { //why useEffect
 const fetchProducts = async () => {
  try{
    const response = await fetch(`${API_URL}/api/products`);
    const data = await response.json();
    if(!response.ok) throw new Error(data.message || 'Failed to fetch products');
    setProducts(data);
  } catch (err){
    setError(err.message)
  } finally{
    setLoading(false)
  }
  }
  fetchProducts();
 }, [] //occurs/runs once
);
if (loading) {
  return <p>Loading products...</p>;
}
if (error) return <p>Error: {error}</p>


return(
  <div className="Products">
    <header className="fifth">
      <h1>AccountHub</h1>
      <nav className="nav">
         <Link to='/Dashboard'>Dashboard</Link>
         <Link to='/Products'>Products</Link>
         <Link to= '/Settings'>Settings</Link>
         <Link to="/Addproduct">Add Product +</Link>
         <Link to= '/my-products'>MyProducts</Link>
      </nav>
    </header>
    <div className= 'Add'>
    <h2 className="hh">Product Page</h2>
    <Link to="/Addproduct">+ Add Product</Link>
    </div>
   { products.length === 0 ? (
    <div>
    <p>No products available.</p>

    </div>
   ) : (
    <div className="products-grid">
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
            <Link to={`edit-product`}></Link>
          </div>
        </div>
      
    ))
    }
    </div>
  )
   }

  </div>
)
}
export default Products;
 /*
 const API_URL = 'http://localhost:5000';
const [products, setProducts] = useState([])
const [error, setError] = useState('')
const [loading, setLoading] = useState(true)
useEffect(() async => {
  try{
    const response = await fetch`${API_URL}/api/products`}
  })






 */