import Dashboard from './pages/Dashboard';
import OverviewTab from './pages/dashboard/OverviewTab';
import ServicesTab from './pages/dashboard/ServivesTab';
import BookingsTab from './pages/dashboard/BookingsTab';
import AnalyticsTab from './pages/dashboard/AnalyticsTab';
import SettingsTab from './pages/dashboard/SettingsTab';
import CarWashHomePage from './pages/CarWashHomePage';
import AuthPage from './pages/AuthPage';
import PublicServicesPage from './pages/PublicServicesPage'; // adapte le chemin

import LoginPagePrestataire from './components/Auth/LoginPageProvider';
import LoginPageProduct from './components/Auth/LoginPageProduct';
// import LoginPageClient from './components/Auth/LoginPageClient';
import RegisterPage from './components/Auth/RegisterPage';
import ProfileSelection from './components/Auth/ChoseProfile';

import AdminLayout from './admin/AdminLayout';
import DashboardAdmin from './admin/DashboardAdmin';
import AllUsers from './admin/AllUsers';

import Layout from './products/Layout';
import AddProduct from './products/AddProduct';
import ProductsTable from './products/ProductsTable';
import StatsGrid from './products/StatsGrid';
import EditProduct from './products/Update';
import ShowProduct from './products/ShowProduct';

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'sonner';

function App() {
  return (
    <Router>
      <Toaster position="top-center" richColors />
      {/* le reste de ton app */}

      <Routes>

        {/* Page d'accueil */}
        <Route path="/" element={<CarWashHomePage />} />

        {/* ✅ Routes d'authentification principales */}
        <Route path="/choose-profile" element={<ProfileSelection />} />

        {/* Authentification avec routes imbriquées */}
        <Route path="/auth" element={<AuthPage />} >
          <Route index element={<ProfileSelection />} />
          <Route path="register/:profile" element={<RegisterPage />} />
        </Route>

        <Route path="/services" element={<PublicServicesPage />} />


        {/* ✅ Redirections propres */}
        <Route path="/login" element={<Navigate to="/auth/login/provider" replace />} />
        {/* <Route path="/register/:profile" element={<Navigate to="/auth/register/:profile" replace />} /> */}

        {/* ✅ Routes de login spécifiques pour chaque profil */}
        <Route path="/auth/login/provider" element={<LoginPagePrestataire />} />
        {/* <Route path="/auth/login/client" element={<LoginPage />} /> */}
        <Route path="/auth/login/product" element={<LoginPageProduct />} />
        {/*<Route path="/auth/login/client" element={<LoginPageClient />} />  */}


        {/* ✅ Route de login générale (peut rediriger vers le choix) */}
        <Route path="/auth/login" element={<LoginPagePrestataire />} />


        {/* Dashboard Prestataire */}
        <Route path="/dashboard/provider" element={<Dashboard />}>
          <Route index element={<OverviewTab />} />
          <Route path="overview" element={<OverviewTab />} />
          <Route path="services" element={<ServicesTab />} />
          <Route path="bookings" element={<BookingsTab />} />
          <Route path="analytics" element={<AnalyticsTab />} />
          <Route path="settings" element={<SettingsTab />} />
        </Route>


        {/* Dashboard Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardAdmin />} />
          <Route path="users" element={<AllUsers />} />
          {/* <Route path="providers" element={<Providers />} />
          <Route path="products" element={<Products />} /> */}
        </Route>


        {/* ✅ Dashboard Client (à créer si nécessaire) */}
        <Route path="/dashboard/client" element={<div>Dashboard Client - À créer</div>} />

        {/* Produits (alias pour product) */}
        <Route path="/dashboard/product" element={<Layout />}>
          <Route index element={<StatsGrid />} />                      {/* Default page */}
          <Route path="product" element={<ProductsTable />} />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="editproduct/:id" element={<EditProduct />} />
          <Route path="Sproduct/:id" element={<ShowProduct />} />
          {/* Add more nested routes here if needed */}
        </Route>

        {/* ✅ Route 404 */}
        <Route path="*" element={<div>Page non trouvée</div>} />

      </Routes>
    </Router>
  );
}

export default App;
