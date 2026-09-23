import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = "http://localhost:5000";
function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState( '');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  useEffect(()=>{
    const fetchProduct = async() => {
      
      try{
      const token = localStorage.getItem('token')
      if(!token){
        throw new Error('You are not logged in. Please log in again.')
      }
      const {data} = await axios.get(`${API_URL}/api/products/${id}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
      setPrice(data.price||'')
      setCategory(data.category||'')
      setImage(data.image||'')
      setDescription(data.description || '')
      setStock(data.stock|| '')
      setName(data.name || '')
    } catch (error) {
        setError(error.response?.data?.message || error.message || 'Failed to load your products')
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()

  },[id])
     
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try{
      const token = localStorage.getItem('token')
      if(!token){
        throw new Error('You are not logged in. Please log in again.')
      }
       await axios.put(
        `${API_URL}/api/products/${id}`,
        {
          name,
          category,
          price: Number(price),
          stock: Number(stock),
          description,
          image,
        },    {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      navigate('/my-products')
      
    }
    catch (error) {
        setError(error.response?.data?.message || error.message || 'Failed to load your products')
      } finally {
        setSaving(false)
      }
    
  }
  if(error){return (<p>{error}</p>)}
  if(loading){return(<p>{loading}</p>)}
  return(
    <div className="editProduct">
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
        <button type="submit" disabled={saving}>
          {saving ? 'saving...' : 'Save Product'}
        </button>
      </form>
    </div>
  );
  
}

export default EditProduct