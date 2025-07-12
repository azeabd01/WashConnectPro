import { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import {autoTable} from 'jspdf-autotable';

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const itemsPerPage = 12;

  useEffect(() => {
    setLoading(true);

    const params = new URLSearchParams();
    params.append('page', currentPage);
    params.append('limit', itemsPerPage);
    params.append('role', 'client'); // Always filter for clients

    fetch(`http://localhost:3000/api/admin`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then(data => {
        setUsers(data.users || []);
        setTotalUsers(data.total || 0);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load users');
        setLoading(false);
      });
  }, [currentPage]);

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Created At'];
    const rows = users.map(user => [
      user.name,
      user.email,
      new Date(user.createdAt).toLocaleDateString()
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'clients.csv');
    document.body.appendChild(link);
    link.click();
  };

const exportToPDF = () => {
  const doc = new jsPDF();
  autoTable(doc, {
    head: [['Name', 'Email', 'Created At']],
    body: users.map(user => [
      user.name,
      user.email,
      new Date(user.createdAt).toLocaleDateString()
    ])
  });
  doc.save('clients.pdf');
};


  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-blue-600">Loading clients...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center text-red-600 py-12">
        <AlertCircle className="w-5 h-5 mr-2" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Clients</h2>

      <div className="flex justify-end mb-4 gap-2">
        <button onClick={exportToCSV} className="bg-blue-500 text-white px-3 py-1 rounded">Export CSV</button>
        <button onClick={exportToPDF} className="bg-red-500 text-white px-3 py-1 rounded">Export PDF</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-50 uppercase text-gray-500 border-b">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Created At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="px-4 py-3">{user.name || '—'}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex gap-2 flex-wrap">
        {Array.from({ length: Math.ceil(totalUsers / itemsPerPage) }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
