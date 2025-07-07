import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    stock: 0,
    inStock: true,
    rating: 0
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          toast.error('Please login first');
          navigate('/login');
          return;
        }

        const res = await fetch(`http://localhost:3000/api/products/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to fetch product');
        }

        const data = await res.json();
        setProduct({
          name: data.name || '',
          price: data.price || '',
          description: data.description || '',
          image: data.image || '',
          stock: data.stock || 0,
          inStock: data.inStock || true,
          rating: data.rating || 0
        });
      } catch (err) {
        console.error('Error fetching product:', err);
        toast.error(err.message || 'Error loading product');
        navigate('/dashboard/product/product');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!product.name.trim()) {
      toast.error('Product name is required');
      return;
    }
    
    if (!product.price || parseFloat(product.price) <= 0) {
      toast.error('Valid price is required');
      return;
    }

    setUpdating(true);
    const toastId = toast.loading("Updating product...");

    try {
      const token = localStorage.getItem('token');
      
      const updateData = {
        name: product.name.trim(),
        price: parseFloat(product.price),
        description: product.description.trim(),
        image: product.image.trim(),
        stock: parseInt(product.stock) || 0,
        inStock: Boolean(product.inStock)
      };

      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || 'Update failed');
      }

      toast.success(responseData.message || "Product updated successfully", { id: toastId });
      navigate('/dashboard/product/product');
    } catch (err) {
      console.error('Update error:', err);
      toast.error(err.message || "Failed to update product", { id: toastId });
    } finally {
      setUpdating(false);
    }
  };

 

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-6">
        <div className="text-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow rounded">


      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div >
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name *
          </label>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={updating}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price * ($)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            name="price"
            placeholder="0.00"
            value={product.price}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={updating}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Product description..."
            value={product.description}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            disabled={updating}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            placeholder="https://example.com/image.jpg"
            value={product.image}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={updating}
          />
          {product.image && (
            <div className="mt-2">
              <img
                src={product.image}
                alt="Product preview"
                className="w-20 h-20 object-cover rounded border"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock Quantity
          </label>
          <input
            type="number"
            min="0"
            name="stock"
            placeholder="0"
            value={product.stock}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={updating}
          />
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="inStock"
              checked={product.inStock}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              disabled={updating}
            />
            <span className="text-sm font-medium text-gray-700">Available in Stock</span>
          </label>
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={updating}
          >
            {updating ? 'Updating...' : 'Update Product'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/dashboard/product/product')}
            className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            disabled={updating}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}