import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';
import AdminProductEdit from './pages/AdminProductEdit';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
      <div className="font-sans text-foreground bg-background min-h-screen flex flex-col">
        {/* We want to hide Navbar and Footer on Checkout page for a cleaner look, but for simplicity we will keep them or render conditionally */}
        <Routes>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={
            <>
              <Navbar onCartClick={() => setIsCartOpen(true)} />
              <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
              
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/about" element={<div className="py-20 text-center font-serif text-3xl">About Us - Coming Soon</div>} />
                  
                  {/* Admin Routes */}
                  <Route path="" element={<AdminRoute />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/product/:id/edit" element={<AdminProductEdit />} />
                  </Route>
                </Routes>
              </main>

              <Footer />
            </>
          } />
        </Routes>
      </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
