import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from '@/redux/slices/productSlice';
import { useEffect, useState } from 'react';
import EditProductModal from '@/components/admin/EditProductModal';

export default function ProductManager() {
  const dispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  const [searchQuery, setSearchQuery] = useState('');
  const [badgeFilter, setBadgeFilter] = useState('all');
  const [sortOption, setSortOption] = useState('name-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleCreate = async () => {
    const { payload: newProduct } = await dispatch(createProduct());
    if (newProduct) {
      setEditProduct(newProduct);
      setIsEditOpen(true);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setIsEditOpen(true);
  };

  const handleModalSave = (updatedProduct) => {
    dispatch(updateProduct(updatedProduct));
    setIsEditOpen(false);
    setEditProduct(null);
  };

  const handleModalClose = () => {
    setIsEditOpen(false);
    setEditProduct(null);
  };

  // 🔍 Filtering + sorting
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) =>
      badgeFilter === 'all'
        ? true
        : product.badge?.toLowerCase() === badgeFilter
    )
    .sort((a, b) => {
      if (sortOption === 'name-asc') return a.name.localeCompare(b.name);
      if (sortOption === 'name-desc') return b.name.localeCompare(a.name);
      if (sortOption === 'price-asc')
        return (a.pricing?.perBox ?? 0) - (b.pricing?.perBox ?? 0);
      if (sortOption === 'price-desc')
        return (b.pricing?.perBox ?? 0) - (a.pricing?.perBox ?? 0);
      return 0;
    });

  // 🔢 Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Product Manager</h1>
        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Create Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name"
          className="border px-3 py-2 rounded w-full md:w-1/3"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          value={badgeFilter}
          onChange={(e) => {
            setBadgeFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-3 py-2 rounded"
        >
          <option value="all">All Badges</option>
          <option value="new">New</option>
          <option value="sale">Sale</option>
          <option value="limited">Limited</option>
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="name-asc">Sort: Name A-Z</option>
          <option value="name-desc">Sort: Name Z-A</option>
          <option value="price-asc">Sort: Price Low-High</option>
          <option value="price-desc">Sort: Price High-Low</option>
        </select>
      </div>

      {/* Product Grid */}
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProducts.map((product) => (
              <div
                key={product._id}
                className="border border-slate-300 rounded-lg shadow-sm p-4"
              >
                <h2 className="font-semibold mb-2">{product.name}</h2>
                <p className="text-sm text-slate-600 mb-2">
                  ${product?.pricing?.perBox?.toFixed(2) ?? 'N/A'} /box
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    aria-label={`Edit ${product.name}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    aria-label={`Delete ${product.name}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-1 rounded bg-slate-200 hover:bg-slate-300 disabled:opacity-50"
                disabled={currentPage === 1}
                aria-label="Previous Page"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 hover:bg-slate-200'
                    }`}
                    aria-label={`Go to page ${page}`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-1 rounded bg-slate-200 hover:bg-slate-300 disabled:opacity-50"
                disabled={currentPage === totalPages}
                aria-label="Next Page"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Edit Modal */}
      <EditProductModal
        isOpen={isEditOpen}
        onClose={handleModalClose}
        product={editProduct}
        onSave={handleModalSave}
      />
    </div>
  );
}
