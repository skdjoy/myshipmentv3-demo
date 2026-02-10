import React from 'react';
import {
  LayoutDashboard, Package, Ship, ClipboardList, FileText,
  DollarSign, Leaf, Bot, Settings, ChevronLeft, ChevronRight
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'askMGH', label: 'MGH ASK™', icon: Bot },
  { id: 'purchaseOrders', label: 'Purchase Orders', icon: Package },
  { id: 'shipments', label: 'Shipment Tracker', icon: Ship },
  { id: 'booking', label: 'Booking Engine', icon: ClipboardList },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'finance', label: 'Finance', icon: DollarSign },
  { id: 'sustainability', label: 'Sustainability', icon: Leaf },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const Sidebar = ({ activeView, onNavigate, collapsed, onToggle, mobileOpen, onMobileClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onMobileClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 h-screen bg-mgh-blue flex flex-col transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'
          } ${collapsed ? 'lg:w-16' : 'lg:w-60'} w-64 shadow-xl lg:shadow-none`}
      >
        {/* Header */}
        <div className="px-4 py-5 flex items-center justify-between border-b border-white/10 h-14 lg:h-auto">
          <div className="flex items-center gap-3">
            {(!collapsed || mobileOpen) && (
              <span className="font-barlow text-white text-lg tracking-wide">
                myshipment
              </span>
            )}
            {collapsed && !mobileOpen && (
              <div className="mx-auto">
                <span className="font-barlow text-white text-lg font-bold">m</span>
              </div>
            )}
          </div>
          {/* Mobile Close Button */}
          <button onClick={onMobileClose} className="lg:hidden text-white/70 hover:text-white">
            <ChevronLeft size={20} />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${isActive
                    ? 'bg-mgh-navy border-l-3 border-mgh-cyan text-white'
                    : 'text-white/70 hover:bg-white/5 hover:text-white border-l-3 border-transparent'
                  }`}
                style={{ borderLeftWidth: '3px' }}
              >
                <Icon size={20} strokeWidth={2} className="flex-shrink-0" />
                {(!collapsed || mobileOpen) && (
                  <span className="font-barlow font-bold text-sm uppercase tracking-wide">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Collapse Toggle (Desktop Only) */}
        <button
          onClick={onToggle}
          className="hidden lg:flex p-3 text-white/50 hover:text-white border-t border-white/10 items-center justify-center"
        >
          {collapsed ? <ChevronRight size={18} strokeWidth={2} /> : <ChevronLeft size={18} strokeWidth={2} />}
        </button>
      </div>
    </>
  );
};

export default Sidebar;
