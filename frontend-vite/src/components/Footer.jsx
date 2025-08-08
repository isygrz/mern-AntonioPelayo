import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { footer } = useSelector((state) => state.footer || {});

  if (!footer) return null;

  return (
    <footer className="bg-neutral-900 text-gray-300 py-8 mt-20 px-4">
      <div className="max-w-6xl mx-auto text-sm text-center md:text-left">
        {footer?.links && footer.links.length > 0 ? (
          <ul className="flex flex-col md:flex-row justify-center md:justify-start gap-4 md:gap-8">
            {footer.links.map((link) => (
              <li key={link._id}>
                <Link
                  to={`/${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  className="hover:underline hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-400">
            No footer content available.
          </div>
        )}
      </div>

      <div className="text-xs text-center mt-8 text-gray-500">
        © {new Date().getFullYear()} Jalisco Tile. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
