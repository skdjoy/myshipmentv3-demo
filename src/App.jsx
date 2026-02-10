import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Toast from './components/Toast';
import Dashboard from './components/Dashboard';
import PurchaseOrders from './components/PurchaseOrders';
import ShipmentTracker from './components/ShipmentTracker';
import BookingEngine from './components/BookingEngine';
import Documents from './components/Documents';
import Finance from './components/Finance';
import Sustainability from './components/Sustainability';
import AskMGH from './components/AskMGH';
import { Settings } from 'lucide-react';

const App = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false); // New state for mobile
  const [toast, setToast] = useState(null);

  // Handle resize for desktop collapse
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileSidebarOpen(false); // Reset mobile state on desktop
        if (window.innerWidth < 1280) {
          setSidebarCollapsed(true);
        } else {
          setSidebarCollapsed(false);
        }
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showToast = useCallback((message) => {
    setToast(message);
  }, []);

  const handleNavigate = (viewId) => {
    setActiveView(viewId);
    setMobileSidebarOpen(false); // Close mobile sidebar on navigation
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard showToast={showToast} />;
      case 'purchaseOrders':
        return <PurchaseOrders showToast={showToast} />;
      case 'shipments':
        return <ShipmentTracker showToast={showToast} />;
      case 'booking':
        return <BookingEngine showToast={showToast} />;
      case 'documents':
        return <Documents showToast={showToast} />;
      case 'finance':
        return <Finance showToast={showToast} />;
      case 'sustainability':
        return <Sustainability showToast={showToast} />;
      case 'askMGH':
        return <AskMGH />;
      case 'settings':
        return (
          <div className="flex flex-col items-center justify-center h-96 animate-fade-in">
            <Settings size={48} strokeWidth={1.5} className="text-mgh-grey mb-4" />
            <h1 className="font-oswald font-semibold text-2xl uppercase text-mgh-blue">Settings</h1>
            <p className="font-barlow text-mgh-grey mt-2">Coming Soon</p>
          </div>
        );
      default:
        return <Dashboard showToast={showToast} />;
    }
  };

  return (
    <div className="flex h-screen bg-mgh-light overflow-hidden">
      {/* Sidebar - Passed mobile props */}
      <Sidebar
        activeView={activeView}
        onNavigate={handleNavigate}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <TopBar onMenuClick={() => setMobileSidebarOpen(true)} />
        <main className={`flex-1 overflow-y-auto ${activeView === 'askMGH' ? '' : 'p-4 md:p-6'}`}>
          {renderView()}
        </main>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default App;
