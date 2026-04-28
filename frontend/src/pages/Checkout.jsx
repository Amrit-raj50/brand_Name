import { useState, useEffect } from 'react';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const [step, setStep] = useState(2);
  const { cartItems, cartSubtotal, clearCart } = useCart();
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '', address: '', city: '', postalCode: '', country: 'India'
  });

  const taxes = Math.round(cartSubtotal * 0.18); // 18% GST example
  const total = cartSubtotal + taxes;

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/shop');
    }
  }, [cartItems, navigate]);

  // Load Razorpay Script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => { resolve(true); };
      script.onerror = () => { resolve(false); };
      document.body.appendChild(script);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header / Progress */}
        <div className="text-center mb-10">
          <Link to="/" className="font-serif text-3xl font-bold inline-block mb-6">BRAND.</Link>
          <div className="flex items-center justify-center space-x-4 text-sm font-medium">
            <span className="text-black">Cart</span>
            <ChevronRight size={14} className="text-gray-400" />
            <span className={step >= 2 ? "text-black" : "text-gray-400"}>Shipping</span>
            <ChevronRight size={14} className="text-gray-400" />
            <span className={step >= 3 ? "text-black" : "text-gray-400"}>Payment</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Form Area */}
          <div className="lg:w-3/5">
            <div className="bg-white p-8 shadow-sm rounded-lg mb-6">
              <h2 className="font-serif text-xl font-bold mb-6">Contact Information</h2>
              <input type="email" placeholder="Email Address" className="w-full p-3 border border-gray-200 rounded-md mb-4 focus:outline-none focus:border-black" />
              <label className="flex items-center text-sm text-gray-600">
                <input type="checkbox" className="mr-2 accent-black" /> Email me with news and offers
              </label>
            </div>

            <div className="bg-white p-8 shadow-sm rounded-lg">
              <h2 className="font-serif text-xl font-bold mb-6">Shipping Address</h2>
              <div className="mb-4">
                <input 
                  type="text" placeholder="Full Name" 
                  className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:border-black" 
                  value={shippingAddress.fullName}
                  onChange={(e) => setShippingAddress({...shippingAddress, fullName: e.target.value})}
                />
              </div>
              <input 
                type="text" placeholder="Address" 
                className="w-full p-3 border border-gray-200 rounded-md mb-4 focus:outline-none focus:border-black" 
                value={shippingAddress.address}
                onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input 
                  type="text" placeholder="City" 
                  className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:border-black" 
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                />
                <select className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:border-black bg-white">
                  <option>State</option>
                  <option>Maharashtra</option>
                  <option>Delhi</option>
                  <option>Karnataka</option>
                </select>
                <input 
                  type="text" placeholder="PIN Code" 
                  className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:border-black" 
                  value={shippingAddress.postalCode}
                  onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <Link to="/shop" className="text-sm font-medium hover:text-accent">&lt; Return to cart</Link>
                <button 
                  className="bg-black text-white px-8 py-4 font-medium rounded-md hover:bg-gray-800 transition-colors"
                  onClick={async () => {
                    if (!userInfo) {
                      alert("Please login to place an order");
                      navigate('/login');
                      return;
                    }
                    if (!shippingAddress.fullName || !shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode) {
                      alert("Please fill in all shipping details");
                      return;
                    }

                    const res = await loadRazorpayScript();
                    if (!res) {
                      alert("Razorpay SDK failed to load. Are you online?");
                      return;
                    }

                    try {
                      const API_URL = import.meta.env.VITE_API_URL || '';
                      
                      // 1. Create Order Document in DB
                      const orderRes = await fetch(`${API_URL}/api/orders`, {
                        method: 'POST',
                        headers: { 
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${userInfo.token}`
                        },
                        body: JSON.stringify({
                          orderItems: cartItems,
                          shippingAddress,
                          paymentMethod: "Razorpay",
                          itemsPrice: cartSubtotal,
                          shippingPrice: 0,
                          totalPrice: total
                        })
                      });
                      const createdOrder = await orderRes.json();

                      // 2. Create Razorpay Order
                      const rzpOrderRes = await fetch(`${API_URL}/api/orders/create-razorpay-order`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ amount: total })
                      });
                      const rzpOrder = await rzpOrderRes.json();

                      // 3. Open Razorpay Checkout
                      const options = {
                        key: "rzp_test_placeholder", // Replace with real key ID later
                        amount: rzpOrder.amount,
                        currency: "INR",
                        name: "BRAND.",
                        description: "Payment for your order",
                        order_id: rzpOrder.id,
                        handler: async function (response) {
                          // 4. Verify Payment
                          const verifyRes = await fetch(`${API_URL}/api/orders/verify-payment`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              razorpay_order_id: response.razorpay_order_id,
                              razorpay_payment_id: response.razorpay_payment_id,
                              razorpay_signature: response.razorpay_signature,
                              orderId: createdOrder._id
                            })
                          });
                          
                          if (verifyRes.ok) {
                            alert('Payment successful and order placed!');
                            clearCart();
                            navigate('/'); // Temporary, replace with tracking page later
                          } else {
                            alert('Payment verification failed!');
                          }
                        },
                        prefill: {
                          name: shippingAddress.fullName,
                          email: userInfo.email,
                        },
                        theme: { color: "#000000" }
                      };

                      const paymentObject = new window.Razorpay(options);
                      paymentObject.open();

                    } catch (e) {
                      console.error(e);
                      alert('Something went wrong during checkout.');
                    }
                  }}
                >
                  Pay with Razorpay
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-2/5">
            <div className="bg-white p-8 shadow-sm rounded-lg sticky top-6">
              <h2 className="font-serif text-xl font-bold mb-6">Order Summary</h2>
              
              {cartItems.map((item) => (
                <div key={item.uniqueId} className="flex space-x-4 mb-6 border-b border-gray-100 pb-6">
                  <div className="w-16 h-20 bg-gray-100 rounded relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{item.qty}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item.size || 'N/A'} / {item.color || 'N/A'}</p>
                  </div>
                  <span className="text-sm font-medium">₹{item.price * item.qty}</span>
                </div>
              ))}

              <div className="flex mb-6 border-b border-gray-100 pb-6">
                <input type="text" placeholder="Discount code" className="flex-1 p-3 border border-gray-200 rounded-l-md focus:outline-none focus:border-black" />
                <button className="bg-gray-200 text-gray-700 px-4 font-medium rounded-r-md hover:bg-gray-300">Apply</button>
              </div>

              <div className="space-y-3 mb-6 border-b border-gray-100 pb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{cartSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated taxes (18% GST)</span>
                  <span className="font-medium">₹{taxes}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="text-lg font-medium">Total</span>
                <div className="text-right">
                  <span className="text-xs text-gray-500 mr-2">INR</span>
                  <span className="text-2xl font-bold">₹{total}</span>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <ShieldCheck size={16} /> <span>Secure Checkout</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
