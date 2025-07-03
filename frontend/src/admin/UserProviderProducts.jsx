import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Check, 
  X, 
  Clock, 
  Star, 
  User, 
  Package, 
  AlertTriangle,
  Calendar,
  ChevronDown,
  MoreHorizontal,
  Edit,
  MessageSquare
} from 'lucide-react';

const UserProviderProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('submittedDate');
  const [sortOrder, setSortOrder] = useState('desc');

  const categories = [
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Sports',
    'Books',
    'Health & Beauty',
    'Food & Beverages',
    'Automotive'
  ];

  const userProducts = [
    {
      id: 1,
      productName: 'Wireless Gaming Mouse',
      description: 'High-precision wireless gaming mouse with RGB lighting and 12000 DPI sensor',
      category: 'Electronics',
      price: 79.99,
      images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop'],
      user: {
        id: 101,
        name: 'John Smith',
        email: 'john.smith@email.com',
        avatar: 'JS',
        providerStatus: 'Verified'
      },
      providerInfo: {
        companyName: 'TechGear Solutions',
        businessType: 'Retailer',
        location: 'New York, USA',
        phone: '+1 (555) 123-4567',
        website: 'www.techgearsolutions.com'
      },
      status: 'Pending Review',
      submittedDate: '2024-06-28T10:30:00Z',
      reviewedDate: null,
      stockQuantity: 150,
      specifications: {
        brand: 'TechGear',
        model: 'GM-X1',
        warranty: '2 years',
        weight: '95g'
      },
      adminNotes: ''
    },
    {
      id: 2,
      productName: 'Organic Cotton T-Shirt',
      description: 'Sustainable organic cotton t-shirt available in multiple colors and sizes',
      category: 'Clothing',
      price: 24.99,
      images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop'],
      user: {
        id: 102,
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        avatar: 'SJ',
        providerStatus: 'New'
      },
      providerInfo: {
        companyName: 'EcoFashion Co',
        businessType: 'Manufacturer',
        location: 'Los Angeles, USA',
        phone: '+1 (555) 987-6543',
        website: 'www.ecofashion.com'
      },
      status: 'Approved',
      submittedDate: '2024-06-25T14:15:00Z',
      reviewedDate: '2024-06-26T09:20:00Z',
      stockQuantity: 500,
      specifications: {
        material: '100% Organic Cotton',
        sizes: 'XS-XXL',
        colors: '8 colors available',
        care: 'Machine washable'
      },
      adminNotes: 'Good quality product, approved for listing'
    },
    {
      id: 3,
      productName: 'Smart Home Security Camera',
      description: '4K WiFi security camera with night vision and motion detection',
      category: 'Electronics',
      price: 149.99,
      images: ['https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop'],
      user: {
        id: 103,
        name: 'Mike Chen',
        email: 'mike.chen@email.com',
        avatar: 'MC',
        providerStatus: 'Verified'
      },
      providerInfo: {
        companyName: 'SecureHome Tech',
        businessType: 'Distributor',
        location: 'San Francisco, USA',
        phone: '+1 (555) 456-7890',
        website: 'www.securehometech.com'
      },
      status: 'Rejected',
      submittedDate: '2024-06-22T11:45:00Z',
      reviewedDate: '2024-06-23T16:30:00Z',
      stockQuantity: 75,
      specifications: {
        resolution: '4K Ultra HD',
        connectivity: 'WiFi 6',
        storage: 'Cloud + Local',
        features: 'Night Vision, Motion Detection'
      },
      adminNotes: 'Missing required certifications for electronic devices'
    },
    {
      id: 4,
      productName: 'Yoga Mat Premium',
      description: 'Non-slip yoga mat made from eco-friendly materials',
      category: 'Sports',
      price: 39.99,
      images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop'],
      user: {
        id: 104,
        name: 'Emma Wilson',
        email: 'emma.w@email.com',
        avatar: 'EW',
        providerStatus: 'New'
      },
      providerInfo: {
        companyName: 'ZenFit Supplies',
        businessType: 'Retailer',
        location: 'Austin, USA',
        phone: '+1 (555) 321-0987',
        website: 'www.zenfitsupplies.com'
      },
      status: 'Pending Review',
      submittedDate: '2024-06-27T13:20:00Z',
      reviewedDate: null,
      stockQuantity: 200,
      specifications: {
        dimensions: '183cm x 61cm x 6mm',
        material: 'TPE Eco-friendly',
        weight: '1.2kg',
        features: 'Non-slip, Lightweight'
      },
      adminNotes: ''
    },
    {
      id: 5,
      productName: 'Bluetooth Speaker Portable',
      description: 'Waterproof portable speaker with 20-hour battery life',
      category: 'Electronics',
      price: 89.99,
      images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop'],
      user: {
        id: 105,
        name: 'David Brown',
        email: 'david.brown@email.com',
        avatar: 'DB',
        providerStatus: 'Verified'
      },
      providerInfo: {
        companyName: 'AudioMax Electronics',
        businessType: 'Manufacturer',
        location: 'Chicago, USA',
        phone: '+1 (555) 654-3210',
        website: 'www.audiomax.com'
      },
      status: 'Under Review',
      submittedDate: '2024-06-26T16:10:00Z',
      reviewedDate: null,
      stockQuantity: 120,
      specifications: {
        battery: '20 hours playback',
        connectivity: 'Bluetooth 5.0',
        waterproof: 'IPX7 rated',
        power: '20W output'
      },
      adminNotes: 'Technical review in progress'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved': return <Check className="w-4 h-4" />;
      case 'Rejected': return <X className="w-4 h-4" />;
      case 'Pending Review': return <Clock className="w-4 h-4" />;
      case 'Under Review': return <Eye className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getProviderStatusColor = (status) => {
    switch (status) {
      case 'Verified': return 'bg-green-100 text-green-800';
      case 'New': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProducts = userProducts.filter(product => {
    const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.providerInfo.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'submittedDate':
        aValue = new Date(a.submittedDate);
        bValue = new Date(b.submittedDate);
        break;
      case 'productName':
        aValue = a.productName.toLowerCase();
        bValue = b.productName.toLowerCase();
        break;
      case 'price':
        aValue = a.price;
        bValue = b.price;
        break;
      default:
        aValue = a[sortBy];
        bValue = b[sortBy];
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const stats = [
    { 
      label: 'Total Submissions', 
      value: userProducts.length, 
      icon: Package, 
      color: 'text-blue-600' 
    },
    { 
      label: 'Pending Review', 
      value: userProducts.filter(p => p.status === 'Pending Review').length, 
      icon: Clock, 
      color: 'text-yellow-600' 
    },
    { 
      label: 'Approved', 
      value: userProducts.filter(p => p.status === 'Approved').length, 
      icon: Check, 
      color: 'text-green-600' 
    },
    { 
      label: 'Rejected', 
      value: userProducts.filter(p => p.status === 'Rejected').length, 
      icon: X, 
      color: 'text-red-600' 
    }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleApprove = (productId) => {
    console.log('Approving product:', productId);
  };

  const handleReject = (productId) => {
    console.log('Rejecting product:', productId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">User Provider Products</h1>
                <p className="text-gray-600">Review and manage products submitted by users as providers</p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Advanced Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search products, users, or companies..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <select
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="Pending Review">Pending Review</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>

                {/* Category Filter */}
                <div className="relative">
                  <select
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              <div className="text-sm text-gray-600">
                Showing {sortedProducts.length} of {userProducts.length} submissions
              </div>
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="space-y-6">
          {sortedProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.productName}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.productName}</h3>
                        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Package className="w-4 h-4" />
                            {product.category}
                          </span>
                          <span className="font-medium text-gray-900">${product.price}</span>
                          <span>Stock: {product.stockQuantity}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                          {getStatusIcon(product.status)}
                          {product.status}
                        </span>
                      </div>
                    </div>

                    {/* Provider & User Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          User Information
                        </h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
                              {product.user.avatar}
                            </div>
                            <span className="font-medium">{product.user.name}</span>
                            <span className={`px-2 py-0.5 text-xs rounded-full ${getProviderStatusColor(product.user.providerStatus)}`}>
                              {product.user.providerStatus}
                            </span>
                          </div>
                          <div className="text-gray-600">{product.user.email}</div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Provider Information</h4>
                        <div className="space-y-1 text-sm">
                          <div className="font-medium">{product.providerInfo.companyName}</div>
                          <div className="text-gray-600">{product.providerInfo.businessType}</div>
                          <div className="text-gray-600">{product.providerInfo.location}</div>
                          <div className="text-gray-600">{product.providerInfo.phone}</div>
                        </div>
                      </div>
                    </div>

                    {/* Submission Details */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Submitted: {formatDate(product.submittedDate)}
                        </span>
                        {product.reviewedDate && (
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            Reviewed: {formatDate(product.reviewedDate)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Admin Notes */}
                    {product.adminNotes && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-yellow-800">Admin Notes</p>
                            <p className="text-sm text-yellow-700">{product.adminNotes}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t border-gray-200">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      {product.status === 'Pending Review' && (
                        <>
                          <button 
                            onClick={() => handleApprove(product.id)}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                          >
                            <Check className="w-4 h-4" />
                            Approve
                          </button>
                          <button 
                            onClick={() => handleReject(product.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                          >
                            <X className="w-4 h-4" />
                            Reject
                          </button>
                        </>
                      )}
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Message User
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 bg-white px-6 py-3 border border-gray-200 rounded-lg flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedProducts.length}</span> of{' '}
            <span className="font-medium">{userProducts.length}</span> submissions
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProviderProducts;