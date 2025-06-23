import ProductDashboard from "./products/ProductDashboard";
import Dashboard from './pages/Dashboard';
import OverviewTab from './pages/dashboard/OverviewTab';
import ServicesTab from './pages/dashboard/ServivesTab';
import BookingsTab from './pages/dashboard/BookingsTab';
import AnalyticsTab from './pages/dashboard/AnalyticsTab';
import SettingsTab from './pages/dashboard/SettingsTab';
import CarWashHomePage from './pages/CarWashHomePage';
import AuthPage from './pages/AuthPage';
import AdminDashboard from './pages/AdminDashboard';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CarWashHomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/product" element={<ProductDashboard />} />
        <Route path="/dashboard/lavage" element={<Dashboard />}>
          <Route index element={<OverviewTab />} />
          <Route path="overview" element={<OverviewTab />} />
          <Route path="services" element={<ServicesTab />} />
          <Route path="bookings" element={<BookingsTab />} />
          <Route path="analytics" element={<AnalyticsTab />} />
          <Route path="settings" element={<SettingsTab />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

