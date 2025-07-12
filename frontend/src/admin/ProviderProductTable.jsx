import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function ProviderProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/api/admin/provider-products?page=${currentPage}&limit=${itemsPerPage}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setTotal(data.total || 0);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch provider products:', err);
        setLoading(false);
      });
  }, [currentPage]);

  const toggleStatus = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/admin/provider-products/${id}/status`, {
        method: 'PATCH',
      });
      const data = await res.json();
      setProducts(prev =>
        prev.map(p => (p._id === id ? { ...p, status: data.product.status } : p))
      );
    } catch (err) {
      console.error('Failed to toggle status', err);
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Status', 'Created At'];
    const rows = products.map(p => [
      p.name,
      p.email,
      p.phone || '—',
      p.status,
      new Date(p.createdAt).toLocaleDateString()
    ]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'provider_products.csv';
    a.click();
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Name', 'Email', 'Phone', 'Status', 'Created At']],
      body: products.map(p => [
        p.name,
        p.email,
        p.phone || '—',
        p.status,
        new Date(p.createdAt).toLocaleDateString()
      ])
    });
    doc.save('provider_products.pdf');
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <span className="text-blue-600">Loading products...</span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Provider Products</h2>

      <div className="flex justify-end mb-4 gap-2">
        <button onClick={exportToCSV} className="bg-blue-500 text-white px-3 py-1 rounded">Export CSV</button>
        <button onClick={exportToPDF} className="bg-red-500 text-white px-3 py-1 rounded">Export PDF</button>
      </div>

      <table className="w-full table-auto text-sm text-left border">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Created</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod, index) => (
            <tr key={prod._id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
              <td className="px-4 py-2">{prod.name}</td>
              <td className="px-4 py-2">{prod.email}</td>
              <td className="px-4 py-2">{prod.phone || '—'}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => toggleStatus(prod._id)}
                  className={`px-2 py-1 rounded text-sm ${prod.status === 'active' ? 'bg-green-200' : 'bg-gray-300'}`}
                >
                  {prod.status}
                </button>
              </td>
              <td className="px-4 py-2">{new Date(prod.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex gap-2 flex-wrap">
        {Array.from({ length: Math.ceil(total / itemsPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
