import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onCartClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Promo Bar */}
      <div className="bg-foreground text-background text-xs font-medium text-center py-2 px-4 uppercase tracking-wider">
        Free shipping on orders above ₹999
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="font-serif text-2xl font-bold tracking-tighter">
                BRAND.
              </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors">Home</Link>
              <Link to="/shop" className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors">Shop</Link>
              <Link to="/shop?category=collections" className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors">Collections</Link>
              <Link to="/about" className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors">About</Link>
              <Link to="/shop?category=sale" className="text-accent font-medium text-sm hover:text-accentDark transition-colors">Sale</Link>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              <button className="text-foreground/80 hover:text-foreground transition-colors hidden sm:block">
                <Search size={20} />
              </button>
              <button className="text-foreground/80 hover:text-foreground transition-colors hidden sm:block">
                <Heart size={20} />
              </button>
              <button 
                className="text-foreground/80 hover:text-foreground transition-colors relative"
                onClick={onCartClick}
              >
                <ShoppingBag size={20} />
                <span className="absolute -top-1 -right-2 bg-accent text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  2
                </span>
              </button>
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-foreground/80 hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60]"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-background z-[70] flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-foreground/10">
                <span className="font-serif text-xl font-bold">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col p-4 space-y-6">
                <Link to="/" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link to="/shop" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
                <Link to="/shop?category=collections" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Collections</Link>
                <Link to="/about" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                <Link to="/shop?category=sale" className="text-lg font-medium text-accent" onClick={() => setIsMobileMenuOpen(false)}>Sale</Link>
              </div>
              <div className="mt-auto p-4 border-t border-foreground/10 flex space-x-6">
                <Search size={24} className="text-foreground/70" />
                <Heart size={24} className="text-foreground/70" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
