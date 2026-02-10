import React, { useState, useEffect } from 'react';
import { Ship, Package, Clock, AlertTriangle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import WorldMap from './WorldMap';
import { spendData, carrierPerformance, exceptions } from '../data/dummyData';

const formatCurrency = (val) => {
  if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
  return `$${val}`;
};

const KPICard = ({ icon: Icon, label, value, trend, trendValue, subtext, delay = 0 }) => {
  const [displayed, setDisplayed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDisplayed(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div className="bg-white rounded-lg p-4 border-l-4 border-mgh-cyan shadow-sm animate-fade-in" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2 mb-2">
          <Icon size={20} strokeWidth={2} className="text-mgh-blue" />
          <span className="font-barlow font-bold text-xs uppercase tracking-wider text-mgh-charcoal">
            {label}
          </span>
        </div>
        {trend && (
          <div className={`flex items-center gap-0.5 text-xs font-barlow ${
            trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-mgh-grey'
          }`}>
            {trend === 'up' ? <TrendingUp size={14} /> : trend === 'down' ? <TrendingDown size={14} /> : <Minus size={14} />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      <div className={`font-mono font-bold text-3xl text-mgh-blue ${displayed ? 'animate-count-up' : 'opacity-0'}`}>
        {value}
      </div>
      <p className="font-barlow text-xs text-mgh-grey mt-1">{subtext}</p>
    </div>
  );
};

const priorityStyles = {
  critical: { bg: 'bg-red-500', text: 'CRITICAL', border: 'border-red-500' },
  warning: { bg: 'bg-amber-500', text: 'WARNING', border: 'border-amber-500' },
  info: { bg: 'bg-mgh-cyan', text: 'INFO', border: 'border-mgh-cyan' },
};

const Dashboard = ({ showToast }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Title */}
      <div>
        <h1 className="font-oswald font-semibold text-2xl uppercase text-mgh-blue tracking-wide">
          Dashboard
        </h1>
        <p className="font-barlow text-sm text-mgh-grey">Good morning, Inditex Group — here's your supply chain at a glance</p>
      </div>

      {/* Row 1: KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard
          icon={Ship}
          label="Active Shipments"
          value="1,247"
          trend="up"
          trendValue="12% vs last month"
          subtext="842 Ocean · 289 Air · 116 Truck"
          delay={0}
        />
        <KPICard
          icon={Clock}
          label="On-Time Delivery"
          value="94.2%"
          trend="up"
          trendValue="2.1% vs last month"
          subtext="Target: 95%"
          delay={100}
        />
        <KPICard
          icon={Package}
          label="POs in Transit"
          value="3,891"
          trend={null}
          trendValue="—"
          subtext="Worth $48.2M retail value"
          delay={200}
        />
        <KPICard
          icon={AlertTriangle}
          label="Exceptions Active"
          value="23"
          trend="down"
          trendValue="8 vs last week"
          subtext="5 Critical · 11 Warning · 7 Info"
          delay={300}
        />
      </div>

      {/* Row 2: Map + Exceptions — aligned heights */}
      <div className="grid grid-cols-5 gap-4" style={{ height: 420 }}>
        <div className="col-span-3 bg-white rounded-lg shadow-sm p-4 h-full">
          <WorldMap />
        </div>
        <div className="col-span-2 bg-white rounded-lg shadow-sm p-4 h-full overflow-y-auto">
          <h2 className="font-oswald font-semibold text-base uppercase text-mgh-blue tracking-wide mb-3">
            Action Items
          </h2>
          <div className="space-y-3">
            {exceptions.map((item, i) => {
              const style = priorityStyles[item.priority];
              return (
                <div
                  key={i}
                  className={`border-l-3 ${style.border} pl-3 py-2 animate-fade-in`}
                  style={{ borderLeftWidth: '3px', animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`${style.bg} text-white text-[10px] font-barlow font-bold px-2 py-0.5 rounded`}>
                      {style.text}
                    </span>
                  </div>
                  <p className="font-barlow text-sm text-mgh-charcoal font-bold">{item.title}</p>
                  <p className="font-barlow text-xs text-mgh-grey mt-0.5">{item.details}</p>
                  <div className="flex gap-2 mt-2">
                    {item.actions.map((action, j) => (
                      <button
                        key={j}
                        onClick={() => showToast(`${action} — action initiated`)}
                        className="text-[11px] font-barlow font-bold text-mgh-blue border border-mgh-blue/30 px-2 py-1 rounded hover:bg-mgh-blue hover:text-white transition-colors"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 3: Charts */}
      <div className="grid grid-cols-2 gap-4">
        {/* Freight Spend */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="font-oswald font-semibold text-base uppercase text-mgh-blue tracking-wide mb-4">
            Freight Spend (Last 6 Months)
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={spendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F4F4F4" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: 'Barlow Condensed', fill: '#2A2A38' }} />
              <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 11, fontFamily: 'Space Mono', fill: '#B2B8BF' }} />
              <Tooltip
                formatter={(val) => formatCurrency(val)}
                contentStyle={{ fontFamily: 'Barlow Condensed', fontSize: 13, borderRadius: 8, borderColor: '#B2B8BF' }}
              />
              <Legend wrapperStyle={{ fontFamily: 'Barlow Condensed', fontSize: 12 }} />
              <Bar dataKey="ocean" name="Ocean" stackId="a" fill="#34328F" radius={[0, 0, 0, 0]} />
              <Bar dataKey="air" name="Air" stackId="a" fill="#00D4FF" />
              <Bar dataKey="truck" name="Truck" stackId="a" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Carrier Performance */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="font-oswald font-semibold text-base uppercase text-mgh-blue tracking-wide mb-4">
            On-Time Performance by Carrier
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={carrierPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F4F4F4" />
              <XAxis dataKey="week" tick={{ fontSize: 12, fontFamily: 'Barlow Condensed', fill: '#2A2A38' }} />
              <YAxis domain={[80, 100]} tick={{ fontSize: 11, fontFamily: 'Space Mono', fill: '#B2B8BF' }} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                formatter={(val) => `${val}%`}
                contentStyle={{ fontFamily: 'Barlow Condensed', fontSize: 13, borderRadius: 8, borderColor: '#B2B8BF' }}
              />
              <Legend wrapperStyle={{ fontFamily: 'Barlow Condensed', fontSize: 12 }} />
              <Line type="monotone" dataKey="maersk" name="Maersk" stroke="#34328F" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="msc" name="MSC" stroke="#082567" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="cosco" name="COSCO" stroke="#00D4FF" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="hapagLloyd" name="Hapag-Lloyd" stroke="#B2B8BF" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
