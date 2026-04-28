import { useState } from 'react';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const [step, setStep] = useState(2); // 1: Cart, 2: Shipping, 3: Payment

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
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input type="text" placeholder="First Name" className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:border-black" />
                <input type="text" placeholder="Last Name" className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:border-black" />
              </div>
              <input type="text" placeholder="Address" className="w-full p-3 border border-gray-200 rounded-md mb-4 focus:outline-none focus:border-black" />
              <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full p-3 border border-gray-200 rounded-md mb-4 focus:outline-none focus:border-black" />
              <div className="grid grid-cols-3 gap-4 mb-4">
                <input type="text" placeholder="City" className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:border-black" />
                <select className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:border-black bg-white">
                  <option>State</option>
                  <option>Maharashtra</option>
                  <option>Delhi</option>
                  <option>Karnataka</option>
                </select>
                <input type="text" placeholder="PIN Code" className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:border-black" />
              </div>
              <input type="tel" placeholder="Phone" className="w-full p-3 border border-gray-200 rounded-md mb-8 focus:outline-none focus:border-black" />
              
              <div className="flex justify-between items-center">
                <Link to="/shop" className="text-sm font-medium hover:text-accent">&lt; Return to cart</Link>
                <button 
                  className="bg-black text-white px-8 py-4 font-medium rounded-md hover:bg-gray-800 transition-colors"
                  onClick={async () => {
                    try {
                      const res = await fetch('/api/orders', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          orderItems: [{ name: "Test Product", qty: 1, image: "/placeholder.jpg", price: 3499, size: "M", color: "Sage", product: "60d21b4667d0d8992e610c85" }],
                          shippingAddress: { fullName: "Test User", address: "123 Test St", city: "City", postalCode: "12345", country: "India" },
                          paymentMethod: "Card",
                          itemsPrice: 3499,
                          shippingPrice: 0,
                          totalPrice: 3679
                        })
                      });
                      if (res.ok) alert('Order placed successfully (Simulated backend post)!');
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-2/5">
            <div className="bg-white p-8 shadow-sm rounded-lg sticky top-6">
              <h2 className="font-serif text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="flex space-x-4 mb-6 border-b border-gray-100 pb-6">
                <div className="w-16 h-20 bg-gray-100 rounded relative">
                  <img src="file:///C:/Users/sawan/.gemini/antigravity/brain/cee405a3-c1c9-47d5-80a1-cfea2939c496/prod_1_1777373064688.png" className="w-full h-full object-cover rounded" />
                  <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">Sage Green Minimalist Jacket</h3>
                  <p className="text-xs text-gray-500">M / Sage</p>
                </div>
                <span className="text-sm font-medium">₹3499</span>
              </div>

              <div className="flex mb-6 border-b border-gray-100 pb-6">
                <input type="text" placeholder="Discount code" className="flex-1 p-3 border border-gray-200 rounded-l-md focus:outline-none focus:border-black" />
                <button className="bg-gray-200 text-gray-700 px-4 font-medium rounded-r-md hover:bg-gray-300">Apply</button>
              </div>

              <div className="space-y-3 mb-6 border-b border-gray-100 pb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹3499</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-600">Calculated at next step</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated taxes</span>
                  <span className="font-medium">₹180</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="text-lg font-medium">Total</span>
                <div className="text-right">
                  <span className="text-xs text-gray-500 mr-2">INR</span>
                  <span className="text-2xl font-bold">₹3679</span>
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
