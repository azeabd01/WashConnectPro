
import { 
  BarChart3, 
  Package, 
  Users, 
  TrendingUp, 
  Settings, 
  Bell, 
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  ShoppingCart,
  DollarSign,
  Star,
  Menu,
  X
} from 'lucide-react';
import { useEffect, useState } from 'react';
export default function ProductsTable() {
   const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);
    if (loading) return <p>Loading products...</p>;
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Products</h3>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                      <Package className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </div>
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td> */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.inStock}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    product.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    {product.rating}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-blue-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-green-600">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
