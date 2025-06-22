import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './products/Layout';
import AddProduct from './products/AddProduct';
import ProductsTable from './products/ProductsTable';
import StatsGrid from './products/StatsGrid';

export default function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<StatsGrid />} />
            <Route path="product" element={<ProductsTable />} />
            <Route path="addproduct" element={<AddProduct />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
