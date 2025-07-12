// //   import { useEffect, useState } from 'react';

// // import { 
// //   Search, 
// //   Filter, 
// //   Eye, 
// //   Check, 
// //   X, 
// //   Clock, 
// //   Star, 
// //   User, 
// //   Package, 
// //   AlertTriangle,
// //   Calendar,
// //   ChevronDown,
// //   MoreHorizontal,
// //   Edit,
// //   MessageSquare
// // } from 'lucide-react';

// // const UserProviderProducts = () => {
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [selectedStatus, setSelectedStatus] = useState('all');
// //   const [selectedCategory, setSelectedCategory] = useState('all');
// //   const [sortBy, setSortBy] = useState('submittedDate');
// //   const [sortOrder, setSortOrder] = useState('desc');

// //   const [userProducts, setUserProducts] = useState([]);
// // const [loading, setLoading] = useState(true);
// // const [error, setError] = useState(null);


// //   const categories = [
// //     'Electronics',
// //     'Clothing',
// //     'Home & Garden',
// //     'Sports',
// //     'Books',
// //     'Health & Beauty',
// //     'Food & Beverages',
// //     'Automotive'
// //   ];



// // useEffect(() => {
// //   fetch('http://localhost:3000/api/admin/provider-products')
// //     .then((res) => {
// //       if (!res.ok) throw new Error('Failed to fetch products');
// //       return res.json();
// //     })
// //     .then((data) => {
// //       setUserProducts(data);
// //       setLoading(false);
// //     })
// //     .catch((err) => {
// //       console.error(err);
// //       setError('Failed to load provider products');
// //       setLoading(false);
// //     });
// // }, []);

// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case 'Approved': return 'bg-green-100 text-green-800';
// //       case 'Rejected': return 'bg-red-100 text-red-800';
// //       case 'Pending Review': return 'bg-yellow-100 text-yellow-800';
// //       case 'Under Review': return 'bg-blue-100 text-blue-800';
// //       default: return 'bg-gray-100 text-gray-800';
// //     }
// //   };

// //   const getStatusIcon = (status) => {
// //     switch (status) {
// //       case 'Approved': return <Check className="w-4 h-4" />;
// //       case 'Rejected': return <X className="w-4 h-4" />;
// //       case 'Pending Review': return <Clock className="w-4 h-4" />;
// //       case 'Under Review': return <Eye className="w-4 h-4" />;
// //       default: return <Clock className="w-4 h-4" />;
// //     }
// //   };

// //   const getProviderStatusColor = (status) => {
// //     switch (status) {
// //       case 'Verified': return 'bg-green-100 text-green-800';
// //       case 'New': return 'bg-blue-100 text-blue-800';
// //       default: return 'bg-gray-100 text-gray-800';
// //     }
// //   };

// //   const filteredProducts = userProducts.filter(product => {
// //   const productName = product.productName?.toLowerCase() || '';
// //   const userName = product.user?.name?.toLowerCase() || '';
// //   const companyName = product.providerInfo?.companyName?.toLowerCase() || '';
// //   const search = searchTerm.toLowerCase();

// //   const matchesSearch =
// //     productName.includes(search) ||
// //     userName.includes(search) ||
// //     companyName.includes(search);

// //   const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
// //   const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

// //   return matchesSearch && matchesStatus && matchesCategory;
// // });

// //   const sortedProducts = [...filteredProducts].sort((a, b) => {
// //     let aValue, bValue;
    
// //     switch (sortBy) {
// //       case 'submittedDate':
// //         aValue = new Date(a.submittedDate);
// //         bValue = new Date(b.submittedDate);
// //         break;
// //       case 'productName':
// //         aValue = a.productName.toLowerCase();
// //         bValue = b.productName.toLowerCase();
// //         break;
// //       case 'price':
// //         aValue = a.price;
// //         bValue = b.price;
// //         break;
// //       default:
// //         aValue = a[sortBy];
// //         bValue = b[sortBy];
// //     }
    
// //     if (sortOrder === 'asc') {
// //       return aValue > bValue ? 1 : -1;
// //     } else {
// //       return aValue < bValue ? 1 : -1;
// //     }
// //   });

// //   const stats = [
// //     { 
// //       label: 'Total Submissions', 
// //       value: userProducts.length, 
// //       icon: Package, 
// //       color: 'text-blue-600' 
// //     },
// //     { 
// //       label: 'Pending Review', 
// //       value: userProducts.filter(p => p.status === 'Pending Review').length, 
// //       icon: Clock, 
// //       color: 'text-yellow-600' 
// //     },
// //     { 
// //       label: 'Approved', 
// //       value: userProducts.filter(p => p.status === 'Approved').length, 
// //       icon: Check, 
// //       color: 'text-green-600' 
// //     },
// //     { 
// //       label: 'Rejected', 
// //       value: userProducts.filter(p => p.status === 'Rejected').length, 
// //       icon: X, 
// //       color: 'text-red-600' 
// //     }
// //   ];

// //   const formatDate = (dateString) => {
// //     return new Date(dateString).toLocaleDateString('en-US', {
// //       year: 'numeric',
// //       month: 'short',
// //       day: 'numeric',
// //       hour: '2-digit',
// //       minute: '2-digit'
// //     });
// //   };

// //   const handleApprove = (productId) => {
// //     console.log('Approving product:', productId);
// //   };

// //   const handleReject = (productId) => {
// //     console.log('Rejecting product:', productId);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Header */}
// //       <div className="bg-white shadow-sm border-b border-gray-200">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="py-6">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <h1 className="text-2xl font-bold text-gray-900">User Provider Products</h1>
// //                 <p className="text-gray-600">Review and manage products submitted by users as providers</p>
// //               </div>
// //               <div className="flex gap-3">
// //                 <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
// //                   <Filter className="w-4 h-4" />
// //                   Advanced Filters
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         {/* Stats */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// //           {stats.map((stat, index) => (
// //             <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// //               <div className="flex items-center">
// //                 <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
// //                   <stat.icon className="w-6 h-6" />
// //                 </div>
// //                 <div className="ml-4">
// //                   <p className="text-sm font-medium text-gray-600">{stat.label}</p>
// //                   <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Filters */}
// //         <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
// //           <div className="p-4">
// //             <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
// //               <div className="flex flex-col sm:flex-row gap-4 flex-1">
// //                 {/* Search */}
// //                 <div className="relative flex-1 max-w-md">
// //                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// //                   <input
// //                     type="text"
// //                     placeholder="Search products, users, or companies..."
// //                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                     value={searchTerm}
// //                     onChange={(e) => setSearchTerm(e.target.value)}
// //                   />
// //                 </div>

// //                 {/* Status Filter */}
// //                 <div className="relative">
// //                   <select
// //                     className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                     value={selectedStatus}
// //                     onChange={(e) => setSelectedStatus(e.target.value)}
// //                   >
// //                     <option value="all">All Status</option>
// //                     <option value="Pending Review">Pending Review</option>
// //                     <option value="Under Review">Under Review</option>
// //                     <option value="Approved">Approved</option>
// //                     <option value="Rejected">Rejected</option>
// //                   </select>
// //                   <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
// //                 </div>

// //                 {/* Category Filter */}
// //                 <div className="relative">
// //                   <select
// //                     className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                     value={selectedCategory}
// //                     onChange={(e) => setSelectedCategory(e.target.value)}
// //                   >
// //                     <option value="all">All Categories</option>
// //                     {categories.map(category => (
// //                       <option key={category} value={category}>{category}</option>
// //                     ))}
// //                   </select>
// //                   <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
// //                 </div>
// //               </div>

// //               <div className="text-sm text-gray-600">
// //                 Showing {sortedProducts.length} of {userProducts.length} submissions
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Products List */}
// //         <div className="space-y-6">
// //           {sortedProducts.map(product => (
// //             <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
// //               <div className="p-6">
// //                 <div className="flex flex-col lg:flex-row gap-6">
// //                   {/* Product Image */}
// //                   <div className="flex-shrink-0">
// //                     <img
// //                       src={product.images[0]}
// //                       alt={product.productName}
// //                       className="w-32 h-32 object-cover rounded-lg"
// //                     />
// //                   </div>

// //                   {/* Product Details */}
// //                   <div className="flex-1 min-w-0">
// //                     <div className="flex items-start justify-between mb-4">
// //                       <div>
// //                         <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.productName}</h3>
// //                         <p className="text-gray-600 text-sm mb-2">{product.description}</p>
// //                         <div className="flex items-center gap-4 text-sm text-gray-500">
// //                           <span className="flex items-center gap-1">
// //                             <Package className="w-4 h-4" />
// //                             {product.category}
// //                           </span>
// //                           <span className="font-medium text-gray-900">${product.price}</span>
// //                           <span>Stock: {product.stockQuantity}</span>
// //                         </div>
// //                       </div>
// //                       <div className="flex items-center gap-2">
// //                         <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
// //                           {getStatusIcon(product.status)}
// //                           {product.status}
// //                         </span>
// //                       </div>
// //                     </div>

// //                     {/* Provider & User Info */}
// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
// //                       <div className="bg-gray-50 rounded-lg p-4">
// //                         <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
// //                           <User className="w-4 h-4" />
// //                           User Information
// //                         </h4>
// //                         <div className="space-y-1 text-sm">
// //                           <div className="flex items-center gap-2">
// //                             <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
// //                               {product.user.avatar}
// //                             </div>
// //                             <span className="font-medium">{product.user.name}</span>
// //                             <span className={`px-2 py-0.5 text-xs rounded-full ${getProviderStatusColor(product.user.providerStatus)}`}>
// //                               {product.user.providerStatus}
// //                             </span>
// //                           </div>
// //                           <div className="text-gray-600">{product.user.email}</div>
// //                         </div>
// //                       </div>

// //                       <div className="bg-gray-50 rounded-lg p-4">
// //                         <h4 className="font-medium text-gray-900 mb-2">Provider Information</h4>
// //                         <div className="space-y-1 text-sm">
// //                           <div className="font-medium">{product.providerInfo.companyName}</div>
// //                           <div className="text-gray-600">{product.providerInfo.businessType}</div>
// //                           <div className="text-gray-600">{product.providerInfo.location}</div>
// //                           <div className="text-gray-600">{product.providerInfo.phone}</div>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     {/* Submission Details */}
// //                     <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
// //                       <div className="flex items-center gap-4">
// //                         <span className="flex items-center gap-1">
// //                           <Calendar className="w-4 h-4" />
// //                           Submitted: {formatDate(product.submittedDate)}
// //                         </span>
// //                         {product.reviewedDate && (
// //                           <span className="flex items-center gap-1">
// //                             <Eye className="w-4 h-4" />
// //                             Reviewed: {formatDate(product.reviewedDate)}
// //                           </span>
// //                         )}
// //                       </div>
// //                     </div>

// //                     {/* Admin Notes */}
// //                     {product.adminNotes && (
// //                       <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
// //                         <div className="flex items-start gap-2">
// //                           <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
// //                           <div>
// //                             <p className="text-sm font-medium text-yellow-800">Admin Notes</p>
// //                             <p className="text-sm text-yellow-700">{product.adminNotes}</p>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     )}

// //                     {/* Actions */}
// //                     <div className="flex gap-2 pt-4 border-t border-gray-200">
// //                       <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
// //                         <Eye className="w-4 h-4" />
// //                         View Details
// //                       </button>
// //                       {product.status === 'Pending Review' && (
// //                         <>
// //                           <button 
// //                             onClick={() => handleApprove(product.id)}
// //                             className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
// //                           >
// //                             <Check className="w-4 h-4" />
// //                             Approve
// //                           </button>
// //                           <button 
// //                             onClick={() => handleReject(product.id)}
// //                             className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
// //                           >
// //                             <X className="w-4 h-4" />
// //                             Reject
// //                           </button>
// //                         </>
// //                       )}
// //                       <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
// //                         <MessageSquare className="w-4 h-4" />
// //                         Message User
// //                       </button>
// //                       <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
// //                         <Edit className="w-4 h-4" />
// //                         Edit
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Pagination */}
// //         <div className="mt-8 bg-white px-6 py-3 border border-gray-200 rounded-lg flex items-center justify-between">
// //           <div className="text-sm text-gray-700">
// //             Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedProducts.length}</span> of{' '}
// //             <span className="font-medium">{userProducts.length}</span> submissions
// //           </div>
// //           <div className="flex gap-2">
// //             <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
// //               Previous
// //             </button>
// //             <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
// //               1
// //             </button>
// //             <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
// //               Next
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UserProviderProducts;
// import { useEffect, useState } from 'react';

// import { 
//   Search, 
//   Filter, 
//   Eye, 
//   Check, 
//   X, 
//   Clock, 
//   Star, 
//   User, 
//   Package, 
//   AlertTriangle,
//   Calendar,
//   ChevronDown,
//   MoreHorizontal,
//   Edit,
//   MessageSquare
// } from 'lucide-react';

// const UserProviderProducts = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('all');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [sortBy, setSortBy] = useState('submittedDate');
//   const [sortOrder, setSortOrder] = useState('desc');
//   const [userProducts, setUserProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const categories = [
//     'Electronics',
//     'Clothing',
//     'Home & Garden',
//     'Sports',
//     'Books',
//     'Health & Beauty',
//     'Food & Beverages',
//     'Automotive'
//   ];

//   useEffect(() => {
//     fetch('http://localhost:3000/api/admin/provider-products')
//       .then((res) => {
//         if (!res.ok) throw new Error('Failed to fetch products');
//         return res.json();
//       })
//       .then((data) => {
//         setUserProducts(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setError('Failed to load provider products');
//         setLoading(false);
//       });
//   }, []);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Approved': return 'bg-green-100 text-green-800';
//       case 'Rejected': return 'bg-red-100 text-red-800';
//       case 'Pending Review': return 'bg-yellow-100 text-yellow-800';
//       case 'Under Review': return 'bg-blue-100 text-blue-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'Approved': return <Check className="w-4 h-4" />;
//       case 'Rejected': return <X className="w-4 h-4" />;
//       case 'Pending Review': return <Clock className="w-4 h-4" />;
//       case 'Under Review': return <Eye className="w-4 h-4" />;
//       default: return <Clock className="w-4 h-4" />;
//     }
//   };

//   const getProviderStatusColor = (status) => {
//     switch (status) {
//       case 'Verified': return 'bg-green-100 text-green-800';
//       case 'New': return 'bg-blue-100 text-blue-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const filteredProducts = userProducts.filter(product => {
//     const productName = product.productName?.toLowerCase() || '';
//     const userName = product.user?.name?.toLowerCase() || '';
//     const companyName = product.providerInfo?.companyName?.toLowerCase() || '';
//     const search = searchTerm.toLowerCase();

//     const matchesSearch =
//       productName.includes(search) ||
//       userName.includes(search) ||
//       companyName.includes(search);

//     const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
//     const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

//     return matchesSearch && matchesStatus && matchesCategory;
//   });

//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     let aValue, bValue;

//     switch (sortBy) {
//       case 'submittedDate':
//         aValue = new Date(a.submittedDate);
//         bValue = new Date(b.submittedDate);
//         break;
//       case 'productName':
//         aValue = a.productName?.toLowerCase() || '';
//         bValue = b.productName?.toLowerCase() || '';
//         break;
//       case 'price':
//         aValue = a.price || 0;
//         bValue = b.price || 0;
//         break;
//       default:
//         aValue = a[sortBy] || '';
//         bValue = b[sortBy] || '';
//     }

//     if (sortOrder === 'asc') {
//       return aValue > bValue ? 1 : -1;
//     } else {
//       return aValue < bValue ? 1 : -1;
//     }
//   });

//   const stats = [
//     { label: 'Total Submissions', value: userProducts.length, icon: Package, color: 'text-blue-600' },
//     { label: 'Pending Review', value: userProducts.filter(p => p.status === 'Pending Review').length, icon: Clock, color: 'text-yellow-600' },
//     { label: 'Approved', value: userProducts.filter(p => p.status === 'Approved').length, icon: Check, color: 'text-green-600' },
//     { label: 'Rejected', value: userProducts.filter(p => p.status === 'Rejected').length, icon: X, color: 'text-red-600' }
//   ];

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const handleApprove = (productId) => {
//     console.log('Approving product:', productId);
//   };

//   const handleReject = (productId) => {
//     console.log('Rejecting product:', productId);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="py-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">User Provider Products</h1>
//                 <p className="text-gray-600">Review and manage products submitted by users as providers</p>
//               </div>
//               <div className="flex gap-3">
//                 <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
//                   <Filter className="w-4 h-4" />
//                   Advanced Filters
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {stats.map((stat, index) => (
//             <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//               <div className="flex items-center">
//                 <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
//                   <stat.icon className="w-6 h-6" />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-600">{stat.label}</p>
//                   <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
//           <div className="p-4">
//             <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
//               <div className="flex flex-col sm:flex-row gap-4 flex-1">
//                 {/* Search */}
//                 <div className="relative flex-1 max-w-md">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   <input
//                     type="text"
//                     placeholder="Search products, users, or companies..."
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>

//                 {/* Status Filter */}
//                 <div className="relative">
//                   <select
//                     className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     value={selectedStatus}
//                     onChange={(e) => setSelectedStatus(e.target.value)}
//                   >
//                     <option value="all">All Status</option>
//                     <option value="Pending Review">Pending Review</option>
//                     <option value="Under Review">Under Review</option>
//                     <option value="Approved">Approved</option>
//                     <option value="Rejected">Rejected</option>
//                   </select>
//                   <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
//                 </div>

//                 {/* Category Filter */}
//                 <div className="relative">
//                   <select
//                     className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     value={selectedCategory}
//                     onChange={(e) => setSelectedCategory(e.target.value)}
//                   >
//                     <option value="all">All Categories</option>
//                     {categories.map(category => (
//                       <option key={category} value={category}>{category}</option>
//                     ))}
//                   </select>
//                   <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
//                 </div>
//               </div>

//               <div className="text-sm text-gray-600">
//                 Showing {sortedProducts.length} of {userProducts.length} submissions
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Products List */}
//         <div className="space-y-6">
//           {sortedProducts.map(product => (
//             <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//               <div className="p-6">
//                 <div className="flex flex-col lg:flex-row gap-6">
//                   {/* Product Image */}
//                   <div className="flex-shrink-0">
//                     <img
//                       src={product.images[0]}
//                       alt={product.productName}
//                       className="w-32 h-32 object-cover rounded-lg"
//                     />
//                   </div>

//                   {/* Product Details */}
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-start justify-between mb-4">
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.productName}</h3>
//                         <p className="text-gray-600 text-sm mb-2">{product.description}</p>
//                         <div className="flex items-center gap-4 text-sm text-gray-500">
//                           <span className="flex items-center gap-1">
//                             <Package className="w-4 h-4" />
//                             {product.category}
//                           </span>
//                           <span className="font-medium text-gray-900">${product.price}</span>
//                           <span>Stock: {product.stockQuantity}</span>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
//                           {getStatusIcon(product.status)}
//                           {product.status}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Provider & User Info */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                       <div className="bg-gray-50 rounded-lg p-4">
//                         <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
//                           <User className="w-4 h-4" />
//                           User Information
//                         </h4>
//                         <div className="space-y-1 text-sm">
//                           <div className="flex items-center gap-2">
//                             <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
//                               {product.user.avatar}
//                             </div>
//                             <span className="font-medium">{product.user.name}</span>
//                             <span className={`px-2 py-0.5 text-xs rounded-full ${getProviderStatusColor(product.user.providerStatus)}`}>
//                               {product.user.providerStatus}
//                             </span>
//                           </div>
//                           <div className="text-gray-600">{product.user.email}</div>
//                         </div>
//                       </div>

//                       <div className="bg-gray-50 rounded-lg p-4">
//                         <h4 className="font-medium text-gray-900 mb-2">Provider Information</h4>
//                         <div className="space-y-1 text-sm">
//                           <div className="font-medium">{product.providerInfo.companyName}</div>
//                           <div className="text-gray-600">{product.providerInfo.businessType}</div>
//                           <div className="text-gray-600">{product.providerInfo.location}</div>
//                           <div className="text-gray-600">{product.providerInfo.phone}</div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Submission Details */}
//                     <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
//                       <div className="flex items-center gap-4">
//                         <span className="flex items-center gap-1">
//                           <Calendar className="w-4 h-4" />
//                           Submitted: {formatDate(product.submittedDate)}
//                         </span>
//                         {product.reviewedDate && (
//                           <span className="flex items-center gap-1">
//                             <Eye className="w-4 h-4" />
//                             Reviewed: {formatDate(product.reviewedDate)}
//                           </span>
//                         )}
//                       </div>
//                     </div>

//                     {/* Admin Notes */}
//                     {product.adminNotes && (
//                       <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
//                         <div className="flex items-start gap-2">
//                           <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
//                           <div>
//                             <p className="text-sm font-medium text-yellow-800">Admin Notes</p>
//                             <p className="text-sm text-yellow-700">{product.adminNotes}</p>
//                           </div>
//                         </div>
//                       </div>
//                     )}

//                     {/* Actions */}
//                     <div className="flex gap-2 pt-4 border-t border-gray-200">
//                       <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
//                         <Eye className="w-4 h-4" />
//                         View Details
//                       </button>
//                       {product.status === 'Pending Review' && (
//                         <>
//                           <button 
//                             onClick={() => handleApprove(product.id)}
//                             className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
//                           >
//                             <Check className="w-4 h-4" />
//                             Approve
//                           </button>
//                           <button 
//                             onClick={() => handleReject(product.id)}
//                             className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
//                           >
//                             <X className="w-4 h-4" />
//                             Reject
//                           </button>
//                         </>
//                       )}
//                       <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
//                         <MessageSquare className="w-4 h-4" />
//                         Message User
//                       </button>
//                       <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
//                         <Edit className="w-4 h-4" />
//                         Edit
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className="mt-8 bg-white px-6 py-3 border border-gray-200 rounded-lg flex items-center justify-between">
//           <div className="text-sm text-gray-700">
//             Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedProducts.length}</span> of{' '}
//             <span className="font-medium">{userProducts.length}</span> submissions
//           </div>
//           <div className="flex gap-2">
//             <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
//               Previous
//             </button>
//             <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
//               1
//             </button>
//             <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProviderProducts;
import { useEffect, useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Check, 
  X, 
  Clock, 
  User, 
  Package, 
  AlertTriangle,
  Calendar,
  ChevronDown,
  Edit,
  MessageSquare,
  Loader2
} from 'lucide-react';

const UserProviderProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('submittedDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [userProducts, setUserProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Mock data for demonstration
  const mockProducts = [
    {
      id: 1,
      productName: "Wireless Bluetooth Headphones",
      description: "High-quality wireless headphones with noise cancellation",
      category: "Electronics",
      price: 129.99,
      stockQuantity: 50,
      status: "Pending Review",
      images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop"],
      user: {
        name: "John Smith",
        email: "john.smith@email.com",
        avatar: "JS",
        providerStatus: "New"
      },
      providerInfo: {
        companyName: "Tech Solutions Inc",
        businessType: "Electronics Retailer",
        location: "New York, NY",
        phone: "+1 (555) 123-4567"
      },
      submittedDate: "2024-01-15T10:30:00Z",
      reviewedDate: null,
      adminNotes: null
    },
    {
      id: 2,
      productName: "Organic Cotton T-Shirt",
      description: "Sustainable organic cotton t-shirt in various colors",
      category: "Clothing",
      price: 24.99,
      stockQuantity: 100,
      status: "Approved",
      images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop"],
      user: {
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        avatar: "SJ",
        providerStatus: "Verified"
      },
      providerInfo: {
        companyName: "Green Fashion Co",
        businessType: "Clothing Manufacturer",
        location: "Los Angeles, CA",
        phone: "+1 (555) 987-6543"
      },
      submittedDate: "2024-01-10T14:20:00Z",
      reviewedDate: "2024-01-12T09:15:00Z",
      adminNotes: null
    },
    {
      id: 3,
      productName: "Smart Home Security Camera",
      description: "WiFi-enabled security camera with mobile app control",
      category: "Electronics",
      price: 89.99,
      stockQuantity: 25,
      status: "Rejected",
      images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop"],
      user: {
        name: "Mike Davis",
        email: "mike.davis@email.com",
        avatar: "MD",
        providerStatus: "New"
      },
      providerInfo: {
        companyName: "Security Plus LLC",
        businessType: "Security Equipment",
        location: "Chicago, IL",
        phone: "+1 (555) 456-7890"
      },
      submittedDate: "2024-01-08T16:45:00Z",
      reviewedDate: "2024-01-11T11:30:00Z",
      adminNotes: "Product specifications do not meet our quality standards. Please provide updated documentation."
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Replace this with actual API call
        // const response = await fetch('http://localhost:3000/api/admin/provider-products');
        // if (!response.ok) throw new Error('Failed to fetch products');
        // const data = await response.json();
        
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUserProducts(mockProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load provider products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
    const productName = product.productName?.toLowerCase() || '';
    const userName = product.user?.name?.toLowerCase() || '';
    const companyName = product.providerInfo?.companyName?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();

    const matchesSearch = !search || 
      productName.includes(search) ||
      userName.includes(search) ||
      companyName.includes(search);

    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case 'submittedDate':
        aValue = new Date(a.submittedDate || 0);
        bValue = new Date(b.submittedDate || 0);
        break;
      case 'productName':
        aValue = (a.productName || '').toLowerCase();
        bValue = (b.productName || '').toLowerCase();
        break;
      case 'price':
        aValue = a.price || 0;
        bValue = b.price || 0;
        break;
      default:
        aValue = a[sortBy] || '';
        bValue = b[sortBy] || '';
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const stats = [
    { label: 'Total Submissions', value: userProducts.length, icon: Package, color: 'text-blue-600' },
    { label: 'Pending Review', value: userProducts.filter(p => p.status === 'Pending Review').length, icon: Clock, color: 'text-yellow-600' },
    { label: 'Approved', value: userProducts.filter(p => p.status === 'Approved').length, icon: Check, color: 'text-green-600' },
    { label: 'Rejected', value: userProducts.filter(p => p.status === 'Rejected').length, icon: X, color: 'text-red-600' }
  ];

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const handleApprove = async (productId) => {
    try {
      console.log('Approving product:', productId);
      // Add your approval logic here
      // const response = await fetch(`/api/admin/products/${productId}/approve`, { method: 'POST' });
      // if (!response.ok) throw new Error('Failed to approve product');
      // Refresh the products list
    } catch (error) {
      console.error('Error approving product:', error);
    }
  };

  const handleReject = async (productId) => {
    try {
      console.log('Rejecting product:', productId);
      // Add your rejection logic here
      // const response = await fetch(`/api/admin/products/${productId}/reject`, { method: 'POST' });
      // if (!response.ok) throw new Error('Failed to reject product');
      // Refresh the products list
    } catch (error) {
      console.error('Error rejecting product:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading provider products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Products</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
        {sortedProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={product.images?.[0] || '/placeholder-image.png'}
                        alt={product.productName || 'Product'}
                        className="w-32 h-32 object-cover rounded-lg bg-gray-100"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIGZpbGw9IiNGM0Y0RjYiLz48cGF0aCBkPSJNNDggNDhIMTI4VjEyOEg0OFY0OFoiIGZpbGw9IiNFNUU3RUIiLz48cGF0aCBkPSJNNjQgNzJMNzYgNjBMOTYgODBMOTYgOTZINjRWNzJaIiBmaWxsPSIjRDFENUREIi8+PC9zdmc+';
                        }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.productName || 'Unnamed Product'}</h3>
                          <p className="text-gray-600 text-sm mb-2">{product.description || 'No description available'}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Package className="w-4 h-4" />
                              {product.category || 'Uncategorized'}
                            </span>
                            <span className="font-medium text-gray-900">${product.price || 0}</span>
                            <span>Stock: {product.stockQuantity || 0}</span>
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
                                {product.user?.avatar || 'U'}
                              </div>
                              <span className="font-medium">{product.user?.name || 'Unknown User'}</span>
                              <span className={`px-2 py-0.5 text-xs rounded-full ${getProviderStatusColor(product.user?.providerStatus)}`}>
                                {product.user?.providerStatus || 'Unknown'}
                              </span>
                            </div>
                            <div className="text-gray-600">{product.user?.email || 'No email'}</div>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">Provider Information</h4>
                          <div className="space-y-1 text-sm">
                            <div className="font-medium">{product.providerInfo?.companyName || 'Unknown Company'}</div>
                            <div className="text-gray-600">{product.providerInfo?.businessType || 'Unknown Type'}</div>
                            <div className="text-gray-600">{product.providerInfo?.location || 'Unknown Location'}</div>
                            <div className="text-gray-600">{product.providerInfo?.phone || 'No phone'}</div>
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
        )}

        {/* Pagination */}
        {sortedProducts.length > 0 && (
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
        )}
      </div>
    </div>
  );
};

export default UserProviderProducts;