import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import 'react-datepicker/dist/react-datepicker.css';

// Pages principales
import CarWashHomePage from './pages/CarWashHomePage';
import AuthPage from './pages/AuthPage';
import PublicServicesPage from './pages/PublicServicesPage'; // adapte le chemin

// Authentification
import LoginPagePrestataire from './components/Auth/LoginPageProvider';
import LoginPageProduct from './components/Auth/LoginPageProduct';
import LoginPageClient from './components/Auth/LoginPageClient';
import RegisterPage from './components/Auth/RegisterPage';
import ProfileSelection from './components/Auth/ChoseProfile';

// Dashboard Prestataire
import Dashboard from './pages/Dashboard';
import OverviewTab from './pages/dashboard/OverviewTab';
import ServicesTab from './pages/dashboard/ServivesTab';
import BookingsTab from './pages/dashboard/BookingsTab';
import AnalyticsTab from './pages/dashboard/AnalyticsTab';
import SettingsTab from './pages/dashboard/SettingsTab';

// Dashboard Admin
import AdminLayout from './admin/AdminLayout';
import DashboardAdmin from './admin/DashboardAdmin';
import AllUsers from './admin/AllUsers';
import UserProviderProducts from "./admin/UserProviderProducts";

// Produits
import Layout from './products/Layout';
import AddProduct from './products/AddProduct';
import ProductsTable from './products/ProductsTable';
// import StatsGrid from './products/StatsGrid';
import EditProduct from './products/Update';
import ShowProduct from './products/ShowProduct';
import ProductAnalytics from "./products/ProductAnalytics";
import ProviderLavage from './admin/ProviderLavage';
import PublicProductsPage from './products/PublicProductsPage';
import ProviderStats from './products/StatsGrid';
import  { jwtDecode }  from 'jwt-decode'; // make sure it's installed

// Clients
import ClientDashboard from './pages/ClientDashboard/ClientDashboard';
import ReservationsTab from './pages/ClientDashboard/Clientcomponents/ReservationsTab';
import ProvidersTab from './pages/ClientDashboard/Clientcomponents/ProvidersTab';
import HistoryTab from './pages/ClientDashboard/Clientcomponents/HistoryTab';
import ProfileTab from './pages/ClientDashboard/Clientcomponents/ProfileTab';

// Clients additionnel
import Customers from "./customers/Customers";

function App() {

  const token = localStorage.getItem('token');
const decoded = token ? jwtDecode(token) : null;
const providerId = decoded?.id;
  return (
    <Router>
      <Toaster position="top-center" richColors />

      <Routes>

        {/* Page d'accueil */}
        <Route path="/" element={<CarWashHomePage />} />

        {/* Routes d'authentification principales */}
        <Route path="/choose-profile" element={<ProfileSelection />} />

        {/* Authentification imbriquée */}
        <Route path="/auth" element={<AuthPage />} >
          <Route index element={<ProfileSelection />} />
          <Route path="register/:profile" element={<RegisterPage />} />
        </Route>

        <Route path="/services" element={<PublicServicesPage />} />
        <Route path="/products" element={<PublicProductsPage />} />

        {/* Redirections propres */}
        <Route path="/login" element={<Navigate to="/auth/login/provider" replace />} />

        {/* Routes de login spécifiques */}
        <Route path="/auth/login/provider" element={<LoginPagePrestataire />} />
        <Route path="/auth/login/client" element={<LoginPageClient />} />
        <Route path="/auth/login/product" element={<LoginPageProduct />} />

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
          <Route path="providers" element={<ProviderLavage />} />
          <Route path="UserProviderProducts" element={<UserProviderProducts />} />
        </Route>

        {/* Dashboard Client avec sous-routes */}
        <Route path="/dashboard/client/*" element={<ClientDashboard />}>
          <Route index element={<Navigate to="reservations" replace />} />
          <Route path="reservations" element={<ReservationsTab />} />
          <Route path="providers" element={<ProvidersTab />} />
          <Route path="history" element={<HistoryTab />} />
          <Route path="profile" element={<ProfileTab />} />
        </Route>

        {/* Produits */}
        <Route path="/dashboard/product" element={<Layout />}>
          {/* <Route index element={<ProviderStats />} />                       */}
          <Route index element={<ProviderStats providerId={providerId} />} />

          <Route path="product" element={<ProductsTable />} />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="editproduct/:id" element={<EditProduct />} />
          <Route path="product/:id" element={<ShowProduct />} />
          <Route path="customers" element={<Customers />} />
          <Route path="analytics" element={<ProductAnalytics />} />
        </Route>

        {/* Route 404 */}
        <Route path="*" element={<div>Page non trouvée</div>} />

      </Routes>
    </Router>
  );
}

export default App;
