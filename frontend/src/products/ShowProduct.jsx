import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, Star } from 'lucide-react';
import ProductRating from './ProductRating';

export default function ShowProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch product');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Product not found');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-md">
      <Link to="/dashboard/product/product" className="text-blue-600 flex items-center mb-4 hover:underline">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-lg"
        />
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-lg font-semibold mb-2 text-green-600">${product.price}</p>
          <p className="mb-2 text-gray-600">Stock: {product.stock}</p>
          <p className={`inline-block px-3 py-1 rounded-full text-sm font-medium 
            ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </p>
              <div className="text-sm text-gray-400 flex items-center  ">
                    <Star size={14} className="text-yellow-500" />
                    Note: {product.rating?.toFixed(1) || 0} / 5
                  </div>

        </div>
      </div>
    </div>
  );
}
