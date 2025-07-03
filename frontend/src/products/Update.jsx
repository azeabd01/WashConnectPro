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
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        toast.error('Error loading product');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Updating product...");

    try {
      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (!res.ok) throw new Error("Update failed");

      toast.success("Product updated", { id: toastId });
      navigate('/dashboard/product/product');
    } catch (err) {
      toast.error("Failed to update", { id: toastId });
    }
  };

  if (loading) return <p className="text-center py-6">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={product.stock}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="inStock"
            checked={product.inStock}
            onChange={handleChange}
          />
          <span>In Stock</span>
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
