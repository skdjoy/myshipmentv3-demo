import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';

const TopBar = ({ onMenuClick }) => {
  return (
    <div className="h-14 bg-white border-b border-mgh-grey/20 flex items-center justify-between px-4 lg:px-6">
      {/* Left: Brand / Menu */}
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden text-mgh-blue hover:text-mgh-navy">
          <Menu size={24} strokeWidth={2} />
        </button>
        <span className="font-barlow text-mgh-blue text-lg font-bold tracking-wide lg:hidden">
          myshipment
        </span>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search size={16} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-mgh-grey" />
          <input
            type="text"
            placeholder="Search shipments, POs, containers..."
            className="w-full pl-9 pr-4 py-2 text-sm font-barlow border border-mgh-grey/40 rounded-lg bg-mgh-light focus:outline-none focus:ring-2 focus:ring-mgh-blue/30 focus:border-mgh-blue placeholder:text-mgh-grey"
          />
        </div>
      </div>

      {/* Right: Notifications + User */}
      <div className="flex items-center gap-4">
        <button className="relative text-mgh-blue hover:text-mgh-navy">
          <Bell size={20} strokeWidth={2} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-mgh-cyan text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-mgh-blue flex items-center justify-center">
            <span className="text-white text-xs font-barlow font-bold">IA</span>
          </div>
          <div className="hidden lg:block">
            <p className="text-xs font-barlow font-bold text-mgh-charcoal leading-none">Inditex Group</p>
            <p className="text-[11px] font-barlow text-mgh-grey leading-none mt-0.5">Western Region</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
