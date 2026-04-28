import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { categories, reviews, images } from '../data/mockData';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  const newArrivals = products.filter(p => p.isNewArrival);
  const bestSellers = products.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={images.hero} 
            alt="Hero Lifestyle" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
        >
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 tracking-tight">Wear Your Story.</h1>
          <p className="text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto">
            Discover our new collection of premium, thoughtfully designed pieces that move with you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/shop" className="bg-white text-black px-8 py-4 font-medium min-w-[200px] hover:bg-gray-100 transition-colors">
              Shop Now
            </Link>
            <Link to="/shop?category=collections" className="border border-white text-white px-8 py-4 font-medium min-w-[200px] hover:bg-white hover:text-black transition-colors">
              Explore Collections
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Marquee Ticker */}
      <div className="bg-foreground text-background py-3 overflow-hidden whitespace-nowrap">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="inline-block"
        >
          <span className="text-sm font-medium uppercase tracking-wider mx-8">New Arrivals</span>
          <span className="text-sm font-medium uppercase tracking-wider mx-8">•</span>
          <span className="text-sm font-medium uppercase tracking-wider mx-8">Free Shipping on Orders over ₹999</span>
          <span className="text-sm font-medium uppercase tracking-wider mx-8">•</span>
          <span className="text-sm font-medium uppercase tracking-wider mx-8">Easy Returns</span>
          <span className="text-sm font-medium uppercase tracking-wider mx-8">•</span>
          <span className="text-sm font-medium uppercase tracking-wider mx-8">Trending Now</span>
          {/* Duplicate for seamless loop */}
          <span className="text-sm font-medium uppercase tracking-wider mx-8">New Arrivals</span>
          <span className="text-sm font-medium uppercase tracking-wider mx-8">•</span>
          <span className="text-sm font-medium uppercase tracking-wider mx-8">Free Shipping on Orders over ₹999</span>
          <span className="text-sm font-medium uppercase tracking-wider mx-8">•</span>
          <span className="text-sm font-medium uppercase tracking-wider mx-8">Easy Returns</span>
          <span className="text-sm font-medium uppercase tracking-wider mx-8">•</span>
          <span className="text-sm font-medium uppercase tracking-wider mx-8">Trending Now</span>
        </motion.div>
      </div>

      {/* Category Grid */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {categories.map((cat, idx) => (
            <Link key={cat.id} to={cat.link} className="group relative aspect-square overflow-hidden block">
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">{cat.name}</h3>
                <span className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 border-b border-white pb-1 font-medium text-sm flex items-center">
                  Shop Now <ArrowRight size={16} className="ml-2" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals - Horizontal Scroll */}
      <section className="py-20 bg-gray-50 pl-4 md:pl-8 overflow-hidden">
        <div className="flex justify-between items-end pr-4 md:pr-8 max-w-7xl mx-auto mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">New Arrivals</h2>
          <Link to="/shop?sort=newest" className="font-medium hover:text-accent transition-colors border-b border-black pb-1 mb-2 hidden md:inline-block">
            View All
          </Link>
        </div>
        <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar gap-6 pr-4 md:pr-8">
          {newArrivals.map(product => (
            <div key={product._id || product.id} className="min-w-[280px] md:min-w-[320px] snap-start">
              <ProductCard product={product} />
            </div>
          ))}
          {/* Duplicate products for demo scroll width */}
          {newArrivals.map(product => (
             <div key={`${product._id || product.id}-dup`} className="min-w-[280px] md:min-w-[320px] snap-start">
               <ProductCard product={product} />
             </div>
          ))}
        </div>
      </section>

      {/* Brand Story Split */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/5] overflow-hidden"
          >
            <img src={images.editorial} alt="Brand Story" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Crafted with intention.</h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              We believe in creating pieces that transcend seasons. Every garment is meticulously designed with premium fabrics, focusing on sustainable practices and ethical production.
            </p>
            <p className="text-gray-600 mb-10 text-lg leading-relaxed">
              Our aesthetic is rooted in simplicity, quality, and timeless elegance. We are more than a brand; we are a lifestyle.
            </p>
            <Link to="/about" className="self-start border border-foreground text-foreground px-8 py-4 font-medium hover:bg-foreground hover:text-background transition-colors">
              About Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Best Sellers</h2>
          <p className="text-gray-500">Our most loved pieces, chosen by you.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {bestSellers.map(product => (
            <div key={product._id || product.id} className="relative">
              <div className="absolute top-3 left-3 bg-accent text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider z-10 flex items-center">
                <Star size={10} className="mr-1 fill-current" /> {product.salesCount} Sold
              </div>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="w-full bg-accent text-white py-16 md:py-24 px-4 text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Mid-Season Sale</h2>
        <p className="text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto">
          Up to 50% off selected items. The offer ends in 48 hours. Don't miss out on refreshing your wardrobe.
        </p>
        <div className="flex justify-center space-x-4 mb-10 text-2xl md:text-3xl font-serif font-bold">
          <div className="flex flex-col items-center"><span className="bg-white/20 px-4 py-2 rounded-lg">48</span><span className="text-xs uppercase mt-2 font-sans font-medium tracking-wider">Hours</span></div>
          <div className="flex flex-col items-center"><span className="bg-white/20 px-4 py-2 rounded-lg">30</span><span className="text-xs uppercase mt-2 font-sans font-medium tracking-wider">Mins</span></div>
          <div className="flex flex-col items-center"><span className="bg-white/20 px-4 py-2 rounded-lg">15</span><span className="text-xs uppercase mt-2 font-sans font-medium tracking-wider">Secs</span></div>
        </div>
        <Link to="/shop?category=sale" className="bg-white text-accent px-8 py-4 font-medium hover:bg-gray-100 transition-colors inline-block">
          Shop The Sale
        </Link>
      </section>

      {/* Instagram UGC Grid */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto w-full text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">@BRAND</h2>
        <p className="text-gray-500 mb-10">Tag us to be featured on our page.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-10">
          {[...Array(6)].map((_, i) => (
             <a href="#" key={i} className="group relative aspect-square overflow-hidden block">
               <img src={categories[i % 6].image} alt="UGC" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <Star className="text-white fill-current" size={24} />
               </div>
             </a>
          ))}
        </div>
        <a href="#" className="font-medium hover:text-accent transition-colors border-b border-black pb-1">
          Follow us on Instagram
        </a>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 px-4 md:px-8 text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-16">Loved by many.</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map(review => (
            <motion.div 
              key={review.id}
              whileHover={{ y: -10 }}
              className="bg-white p-8 shadow-sm flex flex-col items-center text-center"
            >
              <div className="flex text-yellow-400 mb-6">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} className="fill-current" />)}
              </div>
              <p className="text-gray-600 italic mb-8 flex-grow">"{review.text}"</p>
              <div className="flex items-center space-x-4">
                <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                <span className="font-medium text-sm">{review.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
