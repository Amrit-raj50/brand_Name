import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Minus, Plus, Heart, Ruler, RefreshCcw, Truck } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarProducts, setSimilarProducts] = useState([]);
  
  const [activeTab, setActiveTab] = useState('description');
  const [activeImage, setActiveImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${API_URL}/api/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
        setActiveImage(data.images?.[0] || '');
        setSelectedColor(data.colors?.[0] || '');
        
        // Fetch similar products
        const similarRes = await fetch(`${API_URL}/api/products`);
        if (similarRes.ok) {
          const allData = await similarRes.json();
          setSimilarProducts(allData.slice(0, 4));
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-24 text-center">Loading...</div>;
  if (!product) return <div className="max-w-7xl mx-auto px-4 py-24 text-center">Product not found</div>;

  const images = product.images?.length > 0 ? product.images : ['/placeholder.jpg'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="text-xs text-gray-500 mb-8 flex items-center space-x-2">
        <Link to="/" className="hover:text-black">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-black">Women</Link>
        <span>/</span>
        <span className="text-black">{product.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 mb-20">
        {/* Product Images */}
        <div className="lg:w-3/5 flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:h-[600px] hide-scrollbar w-full md:w-24 flex-shrink-0">
            {images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(img)}
                className={`flex-shrink-0 aspect-[3/4] w-20 md:w-full overflow-hidden border-2 ${activeImage === img ? 'border-black' : 'border-transparent'}`}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 bg-gray-100 aspect-[3/4] md:h-[600px] overflow-hidden group cursor-crosshair">
            <img 
              src={activeImage} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-150 origin-center" 
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-2/5 flex flex-col">
          <h1 className="font-serif text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-current" />)}
            </div>
            <a href="#reviews" className="text-sm text-gray-500 underline">124 Reviews</a>
          </div>
          
          <div className="text-2xl font-medium mb-6">
            ₹{product.price}
            {product.originalPrice && <span className="text-gray-400 line-through text-lg ml-3">₹{product.originalPrice}</span>}
          </div>

          <p className="text-gray-600 mb-8 text-sm leading-relaxed">
            A minimalist essential designed for effortless styling. Made from premium, breathable fabric, it offers a relaxed yet tailored fit. Perfect for transitioning between seasons with ease.
          </p>

          {/* Color Selection */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium">Color: <span className="text-gray-500 font-normal">Selected</span></span>
            </div>
            <div className="flex space-x-3">
              {product.colors?.map((color, i) => (
                <button 
                  key={i} 
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border ${selectedColor === color ? 'ring-2 ring-offset-2 ring-black' : 'border-gray-200'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium">Size</span>
              <button className="text-xs text-gray-500 underline flex items-center hover:text-black">
                <Ruler size={12} className="mr-1" /> Size Guide
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                <button 
                  key={size} 
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 text-sm font-medium border transition-colors ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-800 hover:border-black'} ${size === 'XL' ? 'opacity-50 cursor-not-allowed line-through' : ''}`}
                  disabled={size === 'XL'}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Actions */}
          <div className="flex space-x-4 mb-8">
            <div className="flex items-center border border-gray-200 w-32 justify-between">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 text-gray-500 hover:text-black"><Minus size={18}/></button>
              <span className="font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 text-gray-500 hover:text-black"><Plus size={18}/></button>
            </div>
            <button 
              onClick={() => {
                addToCart(product, quantity, selectedSize, selectedColor);
                alert('Added to cart!');
              }}
              className="flex-1 bg-black text-white font-medium hover:bg-gray-800 transition-colors"
            >
              Add to Cart
            </button>
            <button className="p-3 border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors">
              <Heart size={24} />
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col space-y-3 mb-8 py-6 border-y border-gray-100">
            <div className="flex items-center text-sm text-gray-600">
              <Truck size={18} className="mr-3" /> Free Shipping on orders over ₹999
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <RefreshCcw size={18} className="mr-3" /> 7-Day Easy Returns & Exchanges
            </div>
          </div>

          {/* Details Accordion / Tabs */}
          <div>
            <div className="flex border-b border-gray-200 mb-4 space-x-8">
              {['description', 'details', 'shipping'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-sm font-medium capitalize ${activeTab === tab ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-600 leading-relaxed min-h-[100px]">
              {activeTab === 'description' && <p>This premium garment is designed for versatility. Features a relaxed silhouette, dropped shoulders, and functional pockets. Crafted from eco-friendly materials to ensure comfort without compromising style.</p>}
              {activeTab === 'details' && <ul className="list-disc pl-5 space-y-1"><li>100% Organic Cotton</li><li>Machine wash cold</li><li>Do not bleach</li><li>Made in India</li></ul>}
              {activeTab === 'shipping' && <p>Standard delivery within 3-5 business days. Express shipping options available at checkout.</p>}
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Like */}
      <div className="py-12 border-t border-gray-100">
        <h2 className="font-serif text-3xl font-bold mb-10 text-center">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {similarProducts.map(prod => (
            <ProductCard key={prod._id || prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
