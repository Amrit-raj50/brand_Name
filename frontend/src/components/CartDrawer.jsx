import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, cartSubtotal } = useCart();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[100]"
            onClick={onClose}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-background z-[110] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-serif text-2xl font-bold">Your Cart</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col space-y-6">
              {cartItems.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  Your cart is empty.
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.uniqueId} className="flex space-x-4">
                    <div className="w-24 h-32 bg-gray-100 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-sm font-medium">{item.name}</h3>
                          <p className="text-xs text-gray-500 mt-1">Size: {item.size || 'N/A'} | Color: {item.color || 'N/A'}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.uniqueId)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div className="mt-auto flex justify-between items-center">
                        <div className="flex items-center border border-gray-200">
                          <button 
                            onClick={() => updateQuantity(item.uniqueId, item.qty - 1)}
                            className="px-2 py-1 text-gray-500 hover:text-black"
                          ><Minus size={14}/></button>
                          <span className="text-sm px-2">{item.qty}</span>
                          <button 
                            onClick={() => updateQuantity(item.uniqueId, item.qty + 1)}
                            className="px-2 py-1 text-gray-500 hover:text-black"
                          ><Plus size={14}/></button>
                        </div>
                        <span className="font-medium text-sm">₹{item.price * item.qty}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 p-6 bg-gray-50">
              <div className="flex justify-between items-center mb-6">
                <span className="font-medium">Subtotal</span>
                <span className="font-semibold text-lg">₹{cartSubtotal}</span>
              </div>
              <p className="text-xs text-gray-500 mb-4 text-center">Shipping & taxes calculated at checkout</p>
              <Link 
                to="/checkout" 
                onClick={(e) => {
                  if (cartItems.length === 0) {
                    e.preventDefault();
                    alert('Your cart is empty!');
                  } else {
                    onClose();
                  }
                }} 
                className="block w-full text-center bg-foreground text-background py-4 font-medium hover:bg-accent transition-colors"
              >
                Checkout
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
