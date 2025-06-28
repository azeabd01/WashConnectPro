import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Trash2, Eye, Edit, Star, Package, AlertCircle, Filter, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';


export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchTerm, setSearchTerm] = useState('');
  const [stockFilter, setStockFilter] = useState('all'); // all, inStock, outOfStock


  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`http://localhost:3000/api/products?page=${page}&limit=5`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError('Failed to load products');
        setLoading(false);
      });
  }, [page]);

  const confirmDelete = async () => {
    const toastId = toast.loading('Deleting...');
    try {
      const res = await fetch(`http://localhost:3000/api/products/${deleteId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Delete failed');

      setProducts(prev => prev.filter(p => p._id !== deleteId));
      toast.success('Deleted successfully!', { id: toastId });
    } catch (err) {
      toast.error('Error deleting product', { id: toastId });
    } finally {
      setDeleteId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12 text-red-600">
        <AlertCircle className="w-5 h-5 mr-2" />
        <span>{error}</span>
      </div>
    );
  }

  const filteredProducts = products.filter(product => {
    const matchName = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStock =
      stockFilter === 'all'
        ? true
        : stockFilter === 'inStock'
          ? product.inStock === true
          : product.inStock === false;

    return matchName && matchStock;
  });

  return (
    <div className="relative">
      <Toaster position="bottom-right" />
      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-10 bg-opacity-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-title"
        >
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center">
            <h2 id="delete-title" className="text-lg font-semibold mb-2">Delete Product</h2>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Products</h3>
            <div className="flex items-center space-x-3">
              {/* <div className="flex flex-wrap gap-4 mb-4 items-center"> */}
                <input
                  type="text"
                  placeholder="Search by name"
                  className="border px-3 py-1 rounded w-60"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                  className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value)}
                >
                  <option  value="all">All Stock</option>
                  <option value="inStock">In Stock</option>
                  <option value="outOfStock">Out of Stock</option>
                </select>
              {/* </div> */}

            
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                <Link to="/addproduct" >
                  Add Product</Link>

              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"> In Stock</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map(product => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{product.price}</td>
                
                
                  <td className="px-6 py-4 text-gray-700">{product.stock}</td>

                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${product.inStock
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-gray-700">{product.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        className="text-gray-400 hover:text-blue-600 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        title="View product"
                      >
                        <Link to={`/product/${product._id}`} className="text-gray-400 hover:text-blue-600 p-1">
                          <Eye className="w-4 h-4" />
                        </Link>
                      </button>
                      <button
                        className="text-gray-400 hover:text-green-600 p-1 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        title="Edit product"
                      >
                        <Link to={`/editproduct/${product._id}`}>
                          <Edit className="w-4 h-4" />
                        </Link>
                      </button>
                      <button
                        className="text-gray-400 hover:text-red-600 p-1 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                        onClick={() => setDeleteId(product._id)}
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        <div className="flex justify-end mb-4 mr-2">
  <button
    onClick={() => {
      setSearchTerm('');
      setStockFilter('all');
    }}
    className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
  >
    Reset Filters
  </button>
</div>

        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center py-4 space-x-2">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Previous
        </button>

        <span className="px-4 py-2 text-sm font-medium bg-blue-50 text-blue-700 rounded">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}