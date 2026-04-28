import { useState } from 'react';
import { Filter, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { products } from '../data/mockData';

const Shop = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('Newest');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row">
      
      {/* Mobile Filter Toggle */}
      <div className="md:hidden flex justify-between items-center mb-6">
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center text-sm font-medium border border-gray-200 px-4 py-2"
        >
          <Filter size={16} className="mr-2" /> Filters
        </button>
        <div className="flex items-center text-sm">
          <span className="text-gray-500 mr-2">Sort by:</span>
          <select 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-transparent font-medium focus:outline-none"
          >
            <option>Newest</option>
            <option>Price Low-High</option>
            <option>Price High-Low</option>
            <option>Most Popular</option>
          </select>
        </div>
      </div>

      {/* Filter Sidebar / Drawer */}
      <AnimatePresence>
        {(isFilterOpen || window.innerWidth >= 768) && (
          <>
            {/* Mobile Overlay */}
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-[100] md:hidden"
                onClick={() => setIsFilterOpen(false)}
              />
            )}

            <motion.div
              initial={isFilterOpen ? { x: '-100%' } : false}
              animate={isFilterOpen ? { x: 0 } : false}
              exit={isFilterOpen ? { x: '-100%' } : false}
              transition={{ type: 'tween', duration: 0.3 }}
              className={`
                ${isFilterOpen ? 'fixed inset-y-0 left-0 w-[80%] max-w-sm bg-white z-[110] p-6 overflow-y-auto' : 'hidden'}
                md:block md:w-64 md:flex-shrink-0 md:pr-8 md:sticky md:top-24 md:h-[calc(100vh-6rem)] md:overflow-y-auto hide-scrollbar
              `}
            >
              <div className="flex justify-between items-center mb-8 md:hidden">
                <h2 className="font-serif text-2xl font-bold">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-8 border-b border-gray-100 pb-8">
                <h3 className="font-medium mb-4 flex justify-between items-center">
                  Category <ChevronDown size={16} className="text-gray-400" />
                </h3>
                <ul className="space-y-3">
                  {['All', 'Men', 'Women', 'Kids', 'Ethnic Wear', 'Western'].map((cat, i) => (
                    <li key={i}>
                      <label className="flex items-center text-sm text-gray-600 hover:text-black cursor-pointer">
                        <input type="checkbox" className="mr-3 accent-black" defaultChecked={i===0} />
                        {cat}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Size */}
              <div className="mb-8 border-b border-gray-100 pb-8">
                <h3 className="font-medium mb-4 flex justify-between items-center">
                  Size <ChevronDown size={16} className="text-gray-400" />
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size, i) => (
                    <button key={i} className={`border py-2 text-xs font-medium transition-colors ${i===2 ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-600 hover:border-black'}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="mb-8 border-b border-gray-100 pb-8">
                <h3 className="font-medium mb-4 flex justify-between items-center">
                  Color <ChevronDown size={16} className="text-gray-400" />
                </h3>
                <div className="flex flex-wrap gap-3">
                  {['#111111', '#FFFFFF', '#8FA691', '#C19A6B', '#D8A7A7', '#1E3A8A'].map((color, i) => (
                    <button 
                      key={i} 
                      className="w-6 h-6 rounded-full border border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-medium mb-4 flex justify-between items-center">
                  Price Range <ChevronDown size={16} className="text-gray-400" />
                </h3>
                <input type="range" min="0" max="10000" className="w-full accent-black mb-4" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>₹0</span>
                  <span>₹10,000+</span>
                </div>
              </div>

              {isFilterOpen && (
                <button className="w-full bg-black text-white py-4 font-medium" onClick={() => setIsFilterOpen(false)}>
                  Apply Filters
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1">
        {/* Desktop Header */}
        <div className="hidden md:flex justify-between items-center mb-8">
          <h1 className="font-serif text-3xl font-bold">All Products</h1>
          <div className="flex items-center text-sm">
            <span className="text-gray-500 mr-2">Sort by:</span>
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-transparent font-medium focus:outline-none cursor-pointer"
            >
              <option>Newest</option>
              <option>Price Low-High</option>
              <option>Price High-Low</option>
              <option>Most Popular</option>
            </select>
          </div>
        </div>
        
        {/* Active Filters */}
        <div className="hidden md:flex flex-wrap gap-2 mb-8">
          <span className="bg-gray-100 px-3 py-1 text-xs font-medium flex items-center rounded-full">
            Category: All <X size={12} className="ml-2 cursor-pointer" />
          </span>
          <button className="text-xs text-gray-500 underline ml-2">Clear all</button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          {products.map(product => (
            <ProductCard key={`${product.id}-dup`} product={{...product, id: product.id + 'dup'}} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-16 flex justify-center items-center space-x-2">
          <button className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-black transition-colors">&lt;</button>
          <button className="w-10 h-10 border border-black bg-black text-white flex items-center justify-center font-medium">1</button>
          <button className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-black transition-colors font-medium">2</button>
          <button className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-black transition-colors font-medium">3</button>
          <span className="px-2">...</span>
          <button className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-black transition-colors">&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
