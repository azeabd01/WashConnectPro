

import { useState, useEffect } from 'react';
import { DollarSign, ArrowLeft, Star, Filter, Warehouse } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductRating from './ProductRating';

const API_URL = 'http://localhost:3000/api/public/products';

const fetchPublicProducts = async (category = null) => {
  const url = category && category !== 'all'
    ? `${API_URL}?category=${category}`
    : API_URL;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Erreur lors du chargement des produits');
  const data = await res.json();
  return data.products;
};

const PublicProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: 'all', label: 'Tous les produits' },
    { value: 'soin', label: 'Soins voiture' },
    { value: 'accessoire', label: 'Accessoires' },
    { value: 'entretien', label: 'Entretien' }
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, products]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const productsData = await fetchPublicProducts();
      setProducts(productsData || []);
    } catch (error) {
      console.error('Erreur chargement produits :', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    if (selectedCategory === 'all') {
      setFiltered(products);
    } else {
      setFiltered(products.filter(p => p.category === selectedCategory));
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const getCategoryColor = (cat) => {
    const map = {
      soin: 'bg-green-100 text-green-800',
      accessoire: 'bg-yellow-100 text-yellow-800',
      entretien: 'bg-purple-100 text-purple-800'
    };
    return map[cat] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header + back */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-blue-600 font-semibold">
          <ArrowLeft size={18} /> Retour à l'accueil
        </button>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-14 text-center">
        <h1 className="text-4xl font-bold">Boutique Automobile</h1>
        <p className="text-blue-100 mt-2">Découvrez nos produits de qualité pour votre véhicule</p>
        <p className="text-blue-200 mt-1">{filtered.length} produits disponibles</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter size={18} className="text-gray-600" />
            <h3 className="text-lg font-semibold">Filtrer par catégorie</h3>
          </div>
          <div className="flex gap-3 flex-wrap">
            {categories.map(c => (
              <button
                key={c.value}
                onClick={() => handleCategoryChange(c.value)}
                className={`px-4 py-2 rounded-full font-medium transition ${selectedCategory === c.value
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'bg-white border border-gray-300 text-gray-700'
                  }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin h-10 w-10 border-2 border-b-teal-600 rounded-full mx-auto"></div>
            <p className="text-gray-500 mt-4">Chargement des produits...</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(product => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col justify-between"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${getCategoryColor(product.category)}`}>
                    {product.category}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">{product.description || 'Produit automobile'}</p>

                <div className="flex items-center justify-between mb-2">
                  <div className="text-green-700 flex items-center gap-1 font-bold text-lg">
                    <DollarSign size={20} />
                    {product.price} MAD
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Warehouse size={16} />
                    {product.stock} en stock
                  </div>
                </div>

                <div className="text-sm text-gray-400 flex items-center gap-1">
          {/* <ProductRating productId={product._id} onRated={(newRating) => setProduct(prev => ({ ...prev, rating: newRating }))} /> */}
<div className="text-sm text-gray-400 flex items-center gap-1">
  <Star size={14} className="text-yellow-500" />
  Note: {product.rating?.toFixed(1) || 0} / 5
</div>

              

                </div>

                <button className="mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 rounded-lg font-medium hover:scale-105 transition">
                  Ajouter au panier
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600">Aucun produit disponible pour cette catégorie</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicProductsPage;