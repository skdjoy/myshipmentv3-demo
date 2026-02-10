import React from 'react';
import { DollarSign, FileText, AlertTriangle, TrendingDown } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { invoices, landedCost } from '../data/dummyData';

const Finance = ({ showToast }) => {
  const kpis = [
    { icon: DollarSign, label: 'Freight Spend MTD', value: '$4,127,000' },
    { icon: FileText, label: 'Outstanding Invoices', value: '$892,400', sub: '12 invoices' },
    { icon: TrendingDown, label: 'Avg Cost per TEU', value: '$2,340' },
    { icon: AlertTriangle, label: 'Disputes Open', value: '3', sub: '$14,200 total' },
  ];

  const pieData = landedCost.map(lc => ({
    name: lc.component,
    value: lc.total,
    color: lc.color,
  }));

  const totalLanded = landedCost.reduce((sum, lc) => sum + lc.total, 0);

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="font-oswald font-semibold text-2xl uppercase text-mgh-blue tracking-wide">
          Finance
        </h1>
        <p className="font-barlow text-sm text-mgh-grey">Freight spend analytics, invoice reconciliation, and landed cost visibility</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white rounded-lg p-4 border-l-4 border-mgh-cyan shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={18} strokeWidth={2} className="text-mgh-blue" />
                <span className="font-barlow font-bold text-xs uppercase tracking-wider text-mgh-charcoal">{kpi.label}</span>
              </div>
              <div className="font-mono font-bold text-2xl text-mgh-blue">{kpi.value}</div>
              {kpi.sub && <p className="font-barlow text-xs text-mgh-grey mt-0.5">{kpi.sub}</p>}
            </div>
          );
        })}
      </div>

      {/* Invoice Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-mgh-light">
          <h2 className="font-oswald font-semibold text-base uppercase text-mgh-blue tracking-wide">
            Invoice Reconciliation
          </h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-mgh-blue text-white">
              {['Invoice ID', 'Carrier', 'Amount', '3-Way Match', 'Status', 'Due Date', 'Action'].map(h => (
                <th key={h} className="px-4 py-3 text-left font-barlow font-bold text-xs uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b border-mgh-light hover:bg-mgh-light/50 transition-colors">
                <td className="px-4 py-3 font-barlow text-sm font-bold text-mgh-blue">{inv.id}</td>
                <td className="px-4 py-3 font-barlow text-sm">{inv.carrier}</td>
                <td className="px-4 py-3 font-mono text-sm font-bold">${inv.amount.toLocaleString()}</td>
                <td className="px-4 py-3 font-mono text-sm">{inv.matchRate}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-barlow font-bold ${
                    inv.approved ? 'bg-green-100 text-green-700' :
                    inv.status.includes('Discrepancy') ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {inv.status}
                  </span>
                  {inv.discrepancy && (
                    <p className="text-[10px] font-barlow text-red-500 mt-0.5">{inv.discrepancy}</p>
                  )}
                </td>
                <td className="px-4 py-3 font-barlow text-sm">{inv.dueDate}</td>
                <td className="px-4 py-3">
                  {!inv.approved && (
                    <button
                      onClick={() => showToast(`Invoice ${inv.id} sent for review`)}
                      className="text-[11px] font-barlow font-bold text-mgh-blue border border-mgh-blue/30 px-2 py-1 rounded hover:bg-mgh-blue hover:text-white transition-colors"
                    >
                      Review
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Landed Cost Calculator */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-5">
          <h2 className="font-oswald font-semibold text-base uppercase text-mgh-blue tracking-wide mb-4">
            Landed Cost Calculator
          </h2>
          <p className="font-barlow text-xs text-mgh-grey mb-3">SKU: WLB-SS26-0042 — Women's Linen Blazer</p>
          <table className="w-full">
            <thead>
              <tr className="border-b border-mgh-grey/20">
                <th className="text-left py-2 font-barlow font-bold text-xs uppercase text-mgh-charcoal">Cost Component</th>
                <th className="text-right py-2 font-barlow font-bold text-xs uppercase text-mgh-charcoal">Per Unit</th>
                <th className="text-right py-2 font-barlow font-bold text-xs uppercase text-mgh-charcoal">Total (8,000)</th>
              </tr>
            </thead>
            <tbody>
              {landedCost.map((lc, i) => (
                <tr key={i} className="border-b border-mgh-light/50">
                  <td className="py-2 font-barlow text-sm text-mgh-charcoal">{lc.component}</td>
                  <td className="py-2 text-right font-mono text-sm">${lc.perUnit.toFixed(2)}</td>
                  <td className="py-2 text-right font-mono text-sm">${lc.total.toLocaleString()}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-mgh-blue">
                <td className="py-2 font-barlow font-bold text-sm text-mgh-blue">Total Landed Cost</td>
                <td className="py-2 text-right font-mono font-bold text-sm text-mgh-blue">$44.82</td>
                <td className="py-2 text-right font-mono font-bold text-sm text-mgh-blue">${totalLanded.toLocaleString()}</td>
              </tr>
              <tr>
                <td className="py-1 font-barlow text-sm text-mgh-grey">Retail Price</td>
                <td className="py-1 text-right font-mono text-sm">$129.00</td>
                <td className="py-1 text-right font-mono text-sm text-mgh-grey">—</td>
              </tr>
              <tr>
                <td className="py-1 font-barlow font-bold text-sm text-green-600">Gross Margin</td>
                <td className="py-1 text-right font-mono font-bold text-sm text-green-600">65.3%</td>
                <td className="py-1 text-right font-mono text-sm text-mgh-grey">—</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Donut Chart */}
        <div className="bg-white rounded-lg shadow-sm p-5">
          <h2 className="font-oswald font-semibold text-base uppercase text-mgh-blue tracking-wide mb-4">
            Cost Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val) => `$${val.toLocaleString()}`}
                contentStyle={{ fontFamily: 'Barlow Condensed', fontSize: 13, borderRadius: 8, borderColor: '#B2B8BF' }}
              />
              <Legend
                wrapperStyle={{ fontFamily: 'Barlow Condensed', fontSize: 11 }}
                formatter={(value) => <span className="text-mgh-charcoal">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Finance;
