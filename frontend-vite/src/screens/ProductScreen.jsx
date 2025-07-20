import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { fetchProductById } from '../redux/slices/productDetailsSlice';

function ProductScreen() {
  const dispatch = useDispatch();
  const { slug } = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductById(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (product?.imageGallery) {
      setSelectedImage(product.imageGallery);
    }
  }, [product]);

  if (loading) {
    return <div className="p-6 text-gray-500">Loading product...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  if (!product) {
    return <div className="p-6 text-red-500">Product not found.</div>;
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        slug: product.slug,
        name: product.name,
        image: product.imageGallery,
        price: product?.pricing?.perBox || 0,
        qty: quantity,
      })
    );
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT COLUMN - IMAGE GALLERY */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex md:flex-col gap-4">
            {[
              product.imageGallery,
              product.imageGallery,
              product.imageGallery,
            ].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Thumbnail ${i + 1}`}
                className="w-16 h-16 object-cover border cursor-pointer hover:border-black"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
          <div className="flex-1">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-auto object-cover border"
            />
          </div>
        </div>

        {/* RIGHT COLUMN - PRODUCT INFO */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="text-sm text-gray-500">
            #SKU123456 &nbsp; | &nbsp; Coverage: 21.53 sq. ft./box
          </div>

          <div className="text-2xl font-bold text-gray-800">
            ${product?.pricing?.perBox?.toFixed(2) || '—'}/box
          </div>
          <div className="text-sm text-gray-500">
            ${product?.pricing?.perSqFt?.toFixed(2) || '—'}/sq. ft.
          </div>

          {/* Color Picker Mockup */}
          <div>
            <div className="text-sm font-semibold mb-1">Color</div>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded border cursor-pointer flex items-center justify-center">
                <div className="w-6 h-6 bg-gray-300 rounded" title="Blanco" />
              </div>
              <div className="w-10 h-10 rounded border cursor-pointer flex items-center justify-center">
                <div className="w-6 h-6 bg-black rounded" title="Negro" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <label htmlFor="quantity" className="text-sm font-semibold">
              Boxes
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 border border-gray-300 px-2 py-1 rounded"
            />
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <button
              onClick={handleAddToCart}
              className="bg-gray-800 text-white py-2 rounded hover:bg-black"
            >
              Add to Cart
            </button>
            <button className="border border-gray-800 py-2 rounded hover:bg-gray-100">
              Add Sample – ${product?.pricing?.sample?.toFixed(2) || '—'}
            </button>
          </div>

          <p className="text-gray-600 text-sm mt-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Add your
            product description here.
          </p>

          <div className="text-sm text-gray-500 mt-4 underline cursor-pointer hover:text-black">
            View in Tile Visualizer
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductScreen;
