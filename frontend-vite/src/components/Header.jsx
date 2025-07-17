import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="p-4 bg-gray-100 shadow-md mb-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold font-sans text-slate-gray">
        Jalisco Tile
      </Link>
      <nav className="flex gap-4 items-center text-sm">
        {/* <Link to="/blog" className="hover:underline text-slate-700">Blog</Link> */}
        <Link
          to="/cart"
          className="bg-slate-800 text-white px-3 py-1 rounded hover:bg-black"
        >
          View Cart
        </Link>
      </nav>
    </header>
  );
};

export default Header;
