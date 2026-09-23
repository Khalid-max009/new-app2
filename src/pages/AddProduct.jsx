import {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
function AddProduct() {
  const [name, setName] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

   
    try{
      const token = localStorage.getItem('token');
      if(!token){
        throw new Error('You are not logged in. Please log in again ')
      }
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: JSON.stringify({ name, stock, price, category, description, image }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Failed to add product');
      } else {
        navigate('/products');
      }
    } catch (error) {
      setError('An error occurred while adding the product');
    } finally {
      setLoading(false);
    }
  }
  return(//images are uploaded on cloudinary, so the image field is a string that contains the url of the image
    <div className='Addproduct'>
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
      <div className= 'sixth'>
        <h1>Create Product</h1>
        <Link to='/product'>⬅️Back to Products</Link>
      </div>
      <form onSubmit={handleSubmit} className='form'>
        <div className='ben'>
          <label>Product Name:</label>
          <input
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className='ben'>
          <label>Category *</label>
          <input
            type="text"
            placeholder="Electronics, Clothing.."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className='ben'>
          <label>Prices ($)*</label>
          <input
            type="number"
            placeholder="0.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className='ben'>
          <label>Stock*</label>
          <input
            type="number"
            placeholder="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
          
   
        <div className='ben'>
          <label>Description:</label>
          <textarea
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className='ben'>
          <label>Image URL:</label>
          <input
            type="text"
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  )
}
export default AddProduct;