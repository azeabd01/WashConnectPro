// import { useState } from 'react';
// import toast from 'react-hot-toast';

// export default function AddProduct({ onSuccess }) {
//   const [form, setForm] = useState({
//     name: '',
//     description: '',
//     price: '',
//     image: '',
//     stock: '',
//     inStock: true
//   });

//   const handleChange = e => {
//     const { name, value, type, checked } = e.target;
//     setForm(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();

//     if (!form.name || !form.price) {
//       toast.error('Name and price are required');
//       return;
//     }
//     const toastId = toast.loading('Adding product...');
//     try {
//       const productData = {
//         ...form,
//         price: parseFloat(form.price),
//         stock: parseInt(form.stock) || 0
//       };
//       const token = localStorage.getItem('token');
//       const res = await fetch('http://localhost:3000/api/products', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
        
//         body: JSON.stringify(productData)
//       });

//       if (!res.ok) throw new Error('Failed to add');

//       const data = await res.json();
//       toast.success('Product added!', { id: toastId });
//       onSuccess?.(data); // optional callback to refresh product list
//     } catch (err) {
//       toast.error('Error adding product', { id: toastId });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4 max-w-xl mx-auto">
//       <h2 className="text-xl font-semibold">Add New Product</h2>

//       <input
//         name="name"
//         placeholder="Product Name"
//         value={form.name}
//         onChange={handleChange}
//         className="w-full border border-gray-300 rounded px-3 py-2"
//         required
//       />

//       <input
//         name="description"
//         placeholder="Description"
//         value={form.description}
//         onChange={handleChange}
//         className="w-full border border-gray-300 rounded px-3 py-2"
//       />

//       <input
//         name="price"
//         type="number"
//         placeholder="Price"
//         value={form.price}
//         onChange={handleChange}
//         className="w-full border border-gray-300 rounded px-3 py-2"
//         required
//       />

//       <input
//         name="image"
//         placeholder="Image URL"
//         value={form.image}
//         onChange={handleChange}
//         className="w-full border border-gray-300 rounded px-3 py-2"
//       />


//       <input
//         name="stock"
//         type="number"
//         placeholder="Stock"
//         value={form.stock}
//         onChange={handleChange}
//         className="w-full border border-gray-300 rounded px-3 py-2"
//       />

//       <label className="flex items-center">
//         <input
//           name="inStock"
//           type="checkbox"
//           checked={form.inStock}
//           onChange={handleChange}
//           className="mr-2"
//         />
//         In Stock
//       </label>

//       <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//         Save Product
//       </button>
//     </form>
//   );
// }

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AddProduct({ onSuccess }) {
  const navigate = useNavigate(); // redirect after success
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    stock: '',
    inStock: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Frontend Validation
    if (!form.name.trim()) return toast.error('Product name is required');
    if (form.name.length < 3) return toast.error('Product name must be at least 3 characters');
    if (!form.price || parseFloat(form.price) <= 0) return toast.error('Enter a valid price greater than 0');
    if (form.image && !/^https?:\/\/.+\.(jpg|jpeg|png|webp|svg)$/.test(form.image)) {
      return toast.error('Enter a valid image URL (jpg, png, etc)');
    }

    const toastId = toast.loading('Adding product...');
    try {
      const token = localStorage.getItem('token');
      const productData = {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock) || 0
      };

      const res = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to add');
      }

      const data = await res.json();
      toast.success('Product added successfully!', { id: toastId });

      // ✅ Optional callback or redirect
      if (onSuccess) {
        onSuccess(data); // parent can reload products
      } else {
        navigate('/dashboard/product/product'); // redirect to product table
      }
    } catch (err) {
      toast.error(err.message || 'Error adding product', { id: toastId });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4 max-w-xl mx-auto">
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
