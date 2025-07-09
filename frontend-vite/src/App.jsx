import { Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen.jsx';
import ProductScreen from './screens/ProductScreen.jsx';

function App() {
  return (
    <div className="container mx-auto px-4">
      <header className="p-4 bg-gray-100 shadow-md mb-6">
        <Link to="/" className="text-2xl font-bold font-sans text-slate-gray">
          Jalisco Tile
        </Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:slug" element={<ProductScreen />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
