// pages/Dashboard.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

import OverviewTab from './dashboard/OverviewTab';
import ServicesTab from './dashboard/ServivesTab';
import BookingsTab from './dashboard/BookingsTab';
import AnalyticsTab from './dashboard/AnalyticsTab';
import SettingsTab from './dashboard/SettingsTab';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <OverviewTab />;
            case 'services':
                return <ServicesTab />;
            case 'bookings':
                return <BookingsTab />;
            case 'analytics':
                return <AnalyticsTab />;
            case 'settings':
                return <SettingsTab />;
            default:
                return <OverviewTab />;
        }
    };

    return (
        <div className="flex">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <main className="flex-1 bg-gray-100 min-h-screen">
                <Header />
                <div className="p-6 space-y-6">
                    {/* {renderContent()} */}
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;