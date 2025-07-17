import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-gray-300 py-8 mt-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div>
          <h4 className="text-white font-bold mb-3">Company</h4>
          <ul>
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:underline">
                Careers
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3">Shop</h4>
          <ul>
            <li>
              <Link to="/collections" className="hover:underline">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/categories/tiles" className="hover:underline">
                Tile Types
              </Link>
            </li>
            <li>
              <Link to="/categories/new" className="hover:underline">
                New Arrivals
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3">Resources</h4>
          <ul>
            <li>
              <Link to="/blog" className="hover:underline">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:underline">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/help" className="hover:underline">
                Help Center
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3">Legal</h4>
          <ul>
            <li>
              <Link to="/terms" className="hover:underline">
                Terms
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:underline">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-xs text-center mt-8 text-gray-500">
        © {new Date().getFullYear()} Jalisco Tile. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
