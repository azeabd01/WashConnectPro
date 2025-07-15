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
    category: '',
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
    if (!form.category) return toast.error('Please select a category');
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
        navigate('/dashboard/product'); // redirect to product table
      }
    } catch (err) {
      toast.error(err.message || 'Error adding product', { id: toastId });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold">Ajouter Nouveau Produit</h2>

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
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded px-3 py-2"
      >
        <option value="">Sélectionner une catégorie</option>
        <option value="soin">Soin</option>
        <option value="accessoire">Accessoire</option>
        <option value="entretien">Entretien</option>
        <option value="other">Autre</option>
//       </select>
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
        En stock
      </label>

      <button type="submit" className="px-4 py-2 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded hover:bg-blue-700">
        Enregistrer le produit
      </button>
    </form>
  );
}

// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// export default function AddProduct({ onSuccess }) {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: '',
//     description: '',
//     price: '',
//     image: '',
//     stock: '',
//     inStock: true,
//     // providerId: '',
//     // providerProductId: '',
//     category: ''
//   });

//   // const [providers, setProviders] = useState([]);
//   // const [providerProducts, setProviderProducts] = useState([]);

//   // Fetch providers on mount
//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     const fetchProviders = async () => {
//       try {
//         const res = await fetch('http://localhost:3000/api/providers', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         const data = await res.json();
//         setProviders(data.providers || []);
//       } catch (err) {
//         console.error('Error fetching providers:', err);
//       }
//     };

//     fetchProviders();
//   }, []);

//   // Fetch provider products when providerId changes
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!form.providerId) return;

//     const fetchProviderProducts = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:3000/api/providers/${form.providerId}/products`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           }
//         );
//         const data = await res.json();
//         setProviderProducts(data.products || []);
//       } catch (err) {
//         console.error('Error fetching provider products:', err);
//       }
//     };

//     fetchProviderProducts();
//   }, [form.providerId]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (!form.name.trim()) return toast.error('Product name is required');
//     if (form.name.length < 3) return toast.error('Name must be at least 3 characters');
//     if (!form.category) return toast.error('Please select a category');
//     // if (!form.providerId) return toast.error('Please select a provider');
//     // if (!form.providerProductId) return toast.error('Please select a provider product');
//     if (!form.price || parseFloat(form.price) <= 0) return toast.error('Enter valid price');
//     if (form.image && !/^https?:\/\/.+\.(jpg|jpeg|png|webp|svg)$/.test(form.image)) {
//       return toast.error('Enter a valid image URL');
//     }

//     const toastId = toast.loading('Adding product...');

//     try {
//       const token = localStorage.getItem('token');

//       const productData = {
//         ...form,
//         price: parseFloat(form.price),
//         stock: parseInt(form.stock) || 0
//       };

//       const res = await fetch('http://localhost:3000/api/products', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(productData)
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || 'Failed to add product');
//       }

//       const data = await res.json();
//       toast.success('Product added!', { id: toastId });

//       if (onSuccess) {
//         onSuccess(data);
//       } else {
//         navigate('/dashboard/product/product');
//       }
//     } catch (err) {
//       toast.error(err.message || 'Add failed', { id: toastId });
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

//       <textarea
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

//       <select
//         name="category"
//         value={form.category}
//         onChange={handleChange}
//         required
//         className="w-full border border-gray-300 rounded px-3 py-2"
//       >
//         <option value="">Select Category</option>
//         <option value="soin">Soin</option>
//         <option value="accessoire">Accessoire</option>
//         <option value="entretien">Entretien</option>
//         <option value="other">Other</option>
//       </select>

//       {/* <select
//         name="providerId"
//         value={form.providerId}
//         onChange={handleChange}
//         required
//         className="w-full border border-gray-300 rounded px-3 py-2"
//       >
//         <option value="">Select Provider</option>
//         {providers.map((provider) => (
//           <option key={provider._id} value={provider._id}>
//             {provider.businessName}
//           </option>
//         ))}
//       </select> */}

//       {/* <select
//         name="providerProductId"
//         value={form.providerProductId}
//         onChange={handleChange}
//         required
//         className="w-full border border-gray-300 rounded px-3 py-2"
//       >
//         <option value="">Select Provider Product</option>
//         {providerProducts.map((p) => (
//           <option key={p._id} value={p._id}>
//             {p.name}
//           </option>
//         ))}
//       </select> */}

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

//       <button type="submit" className="px-4 py-2 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded hover:bg-blue-700">
//         Save Product
//       </button>
//     </form>
//   );
// }

