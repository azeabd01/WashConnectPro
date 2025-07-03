import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function AddProduct({ onSuccess }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    stock: '',
    category: '',
    inStock: true
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const toastId = toast.loading('Adding product...');
    try {
      const res = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error('Failed to add');

      const data = await res.json();
      toast.success('Product added!', { id: toastId });
      onSuccess?.(data); // optional callback to refresh product list
    } catch (err) {
      toast.error('Error adding product', { id: toastId });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4 max-w-xl mx-auto">
       <Toaster position="bottom-right" />

      <h2 className="text-xl font-semibold">Add New Product</h2>

      <input
        name="name"
        placeholder="Product Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2"
        required
      />

      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />

      <input
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2"
        required
      />

      <input
        name="image"
        placeholder="Image URL"
        value={form.image}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />

      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />

      <input
        name="stock"
        type="number"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />

      <label className="flex items-center">
        <input
          name="inStock"
          type="checkbox"
          checked={form.inStock}
          onChange={handleChange}
          className="mr-2"
        />
        In Stock
      </label>

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Save Product
      </button>
    </form>
  );
}
