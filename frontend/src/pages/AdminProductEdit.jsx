import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        
        if (res.ok) {
          setName(data.name);
          setPrice(data.price);
          setImage(data.images?.[0] || '');
          setCategory(data.category);
          setCountInStock(data.countInStock);
          setDescription(data.description);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          name,
          price,
          images: [image],
          category,
          countInStock,
          description,
        }),
      });

      if (res.ok) {
        navigate('/admin/dashboard');
      } else {
        const data = await res.json();
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/admin/dashboard" className="text-sm font-medium hover:text-gray-600 mb-6 inline-block">
        &lt; Back to Dashboard
      </Link>
      
      <div className="bg-white p-8 shadow-sm border border-gray-100">
        <h1 className="font-serif text-3xl font-bold mb-8">Edit Product</h1>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 focus:outline-none focus:border-black"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Count In Stock</label>
                <input
                  type="number"
                  required
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full p-3 border border-gray-300 focus:outline-none focus:border-black"
                placeholder="/images/sample.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 focus:outline-none focus:border-black"
              />
            </div>

            <button
              type="submit"
              disabled={updating}
              className="w-full bg-black text-white py-4 font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {updating ? 'Updating...' : 'Update Product'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminProductEdit;
