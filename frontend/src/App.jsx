import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './products/Layout';
import AddProduct from './products/AddProduct';
import ProductsTable from './products/ProductsTable';
import StatsGrid from './products/StatsGrid';
import EditProduct from './products/Update';
import ShowProduct from './products/ShowProduct';

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
            <Route path="/editproduct/:id" element={<EditProduct />} />
            <Route path="/product/:id" element={<ShowProduct />} />


          </Route>
        </Routes>
      </Router>
    </>
  );
}
