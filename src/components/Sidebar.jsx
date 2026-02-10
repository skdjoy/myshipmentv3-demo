import React from 'react';
import {
  LayoutDashboard, Package, Ship, ClipboardList, FileText,
  DollarSign, Leaf, Bot, Settings, ChevronLeft, ChevronRight
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'purchaseOrders', label: 'Purchase Orders', icon: Package },
  { id: 'shipments', label: 'Shipment Tracker', icon: Ship },
  { id: 'booking', label: 'Booking Engine', icon: ClipboardList },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'finance', label: 'Finance', icon: DollarSign },
  { id: 'sustainability', label: 'Sustainability', icon: Leaf },
  { id: 'askMGH', label: 'Ask MGH', icon: Bot },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const Sidebar = ({ activeView, onNavigate, collapsed, onToggle }) => {
  return (
    <div
      className={`h-screen bg-mgh-blue flex flex-col transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Header */}
      <div className="px-4 py-5 flex items-center gap-3 border-b border-white/10">
        {!collapsed && (
          <span className="font-barlow text-white text-lg tracking-wide">
            myshipment
          </span>
        )}
        {collapsed && (
          <div className="mx-auto">
            <span className="font-barlow text-white text-lg font-bold">m</span>
          </div>
        )}
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
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                isActive
                  ? 'bg-mgh-navy border-l-3 border-mgh-cyan text-white'
                  : 'text-white/70 hover:bg-white/5 hover:text-white border-l-3 border-transparent'
              }`}
              style={{ borderLeftWidth: '3px' }}
            >
              <Icon size={20} strokeWidth={2} className="flex-shrink-0" />
              {!collapsed && (
                <span className="font-barlow font-bold text-sm uppercase tracking-wide">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="p-3 text-white/50 hover:text-white border-t border-white/10 flex items-center justify-center"
      >
        {collapsed ? <ChevronRight size={18} strokeWidth={2} /> : <ChevronLeft size={18} strokeWidth={2} />}
      </button>
    </div>
  );
};

export default Sidebar;
