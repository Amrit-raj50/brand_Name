import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1 */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">BRAND.</h3>
            <p className="text-background/70 text-sm mb-6 leading-relaxed">
              Wear your story. Crafted with care, designed for life.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-background/70 hover:text-accent transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="text-background/70 hover:text-accent transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="text-background/70 hover:text-accent transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/shop" className="text-background/70 hover:text-white transition-colors text-sm">Shop All</Link></li>
              <li><Link to="/shop?category=men" className="text-background/70 hover:text-white transition-colors text-sm">Men</Link></li>
              <li><Link to="/shop?category=women" className="text-background/70 hover:text-white transition-colors text-sm">Women</Link></li>
              <li><Link to="/about" className="text-background/70 hover:text-white transition-colors text-sm">About Us</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">Help</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-background/70 hover:text-white transition-colors text-sm">Customer Service</a></li>
              <li><a href="#" className="text-background/70 hover:text-white transition-colors text-sm">Track Order</a></li>
              <li><a href="#" className="text-background/70 hover:text-white transition-colors text-sm">Returns & Exchanges</a></li>
              <li><a href="#" className="text-background/70 hover:text-white transition-colors text-sm">Size Guide</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">Newsletter</h4>
            <p className="text-background/70 text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex border-b border-background/30 pb-2">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="bg-transparent border-none outline-none text-sm w-full text-white placeholder:text-background/50"
              />
              <button type="submit" className="text-sm font-medium hover:text-accent uppercase transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-background/50 text-xs mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} BRAND. All rights reserved.
          </p>
          <div className="flex space-x-3 opacity-50">
            {/* Payment Icons Simulation */}
            <div className="h-6 w-10 bg-white/20 rounded"></div>
            <div className="h-6 w-10 bg-white/20 rounded"></div>
            <div className="h-6 w-10 bg-white/20 rounded"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
