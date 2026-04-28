import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group flex flex-col relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-4">
        {product.isNewArrival && (
          <div className="absolute top-3 left-3 bg-white text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider z-10">
            New
          </div>
        )}
        <button className="absolute top-3 right-3 text-foreground hover:text-accent z-10 transition-colors bg-white/50 p-1.5 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100">
          <Heart size={18} />
        </button>

        <Link to={`/product/${product._id || product.id}`}>
          <img 
            src={isHovered && product.images?.[1] ? product.images[1] : (product.images?.[0] || product.image || '/placeholder.jpg')} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button 
              className="w-full bg-foreground text-background py-3 text-sm font-medium hover:bg-accent transition-colors"
              onClick={(e) => {
                e.preventDefault();
                addToCart(product, 1, product.sizes?.[0] || '', product.colors?.[0] || '');
                alert('Added to cart!');
              }}
            >
              Quick Add
            </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <Link to={`/product/${product._id || product.id}`} className="text-sm font-medium hover:text-accent transition-colors">
            {product.name}
          </Link>
        </div>
        <div className="flex items-center space-x-2 text-sm mb-3">
          <span className="font-semibold">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-foreground/50 line-through text-xs">₹{product.originalPrice}</span>
          )}
        </div>
        
        {/* Color Swatches */}
        <div className="flex space-x-1.5 mt-auto">
          {product.colors && product.colors.map((color, index) => (
            <div 
              key={index}
              className={`w-4 h-4 rounded-full border border-gray-200 cursor-pointer ${index === 0 ? 'ring-1 ring-offset-2 ring-foreground' : ''}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
