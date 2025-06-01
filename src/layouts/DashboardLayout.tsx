import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from '../components/topnav';
import SideNav from '../components/sidenav';
import AddButton from '../components/addbutton';

const DashboardLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Top Navigation */}
      <TopNav />

      <div className="flex flex-1">
        {/* Side Navigation */}
        <SideNav />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto bg-black text-white">
          <Outlet />
        </main>
      </div>

      {/* Floating Add Button */}
      <AddButton />
    </div>
  );
};

export default DashboardLayout; 