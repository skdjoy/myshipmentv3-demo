import React, { useState, useMemo } from 'react';
import { Package, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { purchaseOrders } from '../data/dummyData';

const milestoneLabels = [
  { key: 'poReceived', label: 'PO Received' },
  { key: 'fabricSourced', label: 'Fabric Sourced' },
  { key: 'cuttingStarted', label: 'Cutting' },
  { key: 'sewingStarted', label: 'Sewing' },
  { key: 'qcPassed', label: 'QC Passed' },
  { key: 'packed', label: 'Packed' },
  { key: 'shipped', label: 'Shipped' },
];

const statusColors = {
  'In Production': 'bg-blue-100 text-blue-700',
  'QC Passed': 'bg-green-100 text-green-700',
  'Fabric Sourced': 'bg-yellow-100 text-yellow-700',
  'Cutting Started': 'bg-orange-100 text-orange-700',
  'In Transit': 'bg-cyan-100 text-cyan-700',
  'Delivered': 'bg-green-100 text-green-700',
};

const PurchaseOrders = ({ showToast }) => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [supplierFilter, setSupplierFilter] = useState('All');
  const [seasonFilter, setSeasonFilter] = useState('All');
  const [expandedRow, setExpandedRow] = useState(null);

  const statuses = ['All', 'In Production', 'QC Passed', 'Fabric Sourced', 'Cutting Started', 'In Transit', 'Delivered'];
  const suppliers = ['All', ...new Set(purchaseOrders.map(p => p.supplier))];
  const seasons = ['All', ...new Set(purchaseOrders.map(p => p.season))];

  const filtered = useMemo(() => {
    return purchaseOrders.filter(po => {
      if (statusFilter !== 'All' && po.status !== statusFilter) return false;
      if (supplierFilter !== 'All' && po.supplier !== supplierFilter) return false;
      if (seasonFilter !== 'All' && po.season !== seasonFilter) return false;
      return true;
    });
  }, [statusFilter, supplierFilter, seasonFilter]);

  const FilterPill = ({ label, options, value, onChange }) => (
    <div className="flex items-center gap-1.5">
      <span className="font-barlow font-bold text-xs uppercase text-mgh-charcoal">{label}:</span>
      <div className="flex gap-1 flex-wrap">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-2.5 py-1 text-xs font-barlow rounded transition-colors ${value === opt
              ? 'bg-mgh-blue text-white'
              : 'bg-white text-mgh-charcoal border border-mgh-grey/40 hover:border-mgh-blue'
              }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="font-oswald font-semibold text-2xl uppercase text-mgh-blue tracking-wide">
          Purchase Orders
        </h1>
        <p className="font-barlow text-sm text-mgh-grey">Track production progress from factory floor to shipment</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 space-y-3">
        <FilterPill label="Status" options={statuses} value={statusFilter} onChange={setStatusFilter} />
        <FilterPill label="Supplier" options={suppliers} value={supplierFilter} onChange={setSupplierFilter} />
        <FilterPill label="Season" options={seasons} value={seasonFilter} onChange={setSeasonFilter} />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-mgh-blue text-white">
              {['PO Number', 'Supplier', 'Origin', 'Items', 'Units', 'Ex-Factory', 'Status', 'Progress'].map(h => (
                <th key={h} className="px-4 py-3 text-left font-barlow font-bold text-xs uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((po) => (
              <React.Fragment key={po.poNumber}>
                <tr
                  onClick={() => setExpandedRow(expandedRow === po.poNumber ? null : po.poNumber)}
                  className="border-b border-mgh-light hover:bg-mgh-light/50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 font-barlow text-sm font-bold text-mgh-blue">{po.poNumber}</td>
                  <td className="px-4 py-3 font-barlow text-sm">{po.supplier}</td>
                  <td className="px-4 py-3 font-barlow text-sm">{po.origin}</td>
                  <td className="px-4 py-3 font-barlow text-sm max-w-[200px] truncate">{po.items}</td>
                  <td className="px-4 py-3 font-mono text-sm">{po.totalUnits.toLocaleString()}</td>
                  <td className="px-4 py-3 font-barlow text-sm">{po.exFactory}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-barlow font-bold ${statusColors[po.status] || 'bg-gray-100 text-gray-600'}`}>
                      {po.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-mgh-light rounded-full overflow-hidden">
                        <div
                          className="h-full bg-mgh-blue rounded-full transition-all duration-1000"
                          style={{ width: `${po.progress}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs text-mgh-grey">{po.progress}%</span>
                      {expandedRow === po.poNumber ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </div>
                  </td>
                </tr>

                {/* Expanded Detail */}
                {expandedRow === po.poNumber && (
                  <tr>
                    <td colSpan={8} className="bg-mgh-light/50 px-6 py-5 animate-fade-in">
                      {/* Milestone Stepper */}
                      <h4 className="font-barlow font-bold text-xs uppercase text-mgh-charcoal mb-4">
                        Production Milestones
                      </h4>
                      <div className="flex items-center gap-0 overflow-x-auto py-4 px-1 lg:pb-0">
                        {milestoneLabels.map((m, i) => {
                          const date = po.milestones[m.key];
                          const isComplete = !!date;
                          const nextKey = milestoneLabels[i + 1]?.key;
                          const isCurrent = isComplete && nextKey && !po.milestones[nextKey];
                          return (
                            <div key={m.key} className="flex items-center flex-1 min-w-[100px]">
                              <div className="flex flex-col items-center flex-none w-auto mx-auto px-2 relative z-10">
                                <div
                                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${isComplete
                                    ? isCurrent
                                      ? 'bg-mgh-cyan text-white animate-glow ring-4 ring-mgh-cyan/20'
                                      : 'bg-mgh-blue text-white'
                                    : 'bg-mgh-grey/30 text-mgh-grey'
                                    }`}
                                >
                                  {isComplete ? <Check size={14} strokeWidth={3} /> : i + 1}
                                </div>
                                <span className="font-barlow text-[10px] mt-2 text-center text-mgh-charcoal whitespace-nowrap">
                                  {m.label}
                                </span>
                                {date && (
                                  <span className="font-barlow text-[9px] text-mgh-grey mt-0.5">{date}</span>
                                )}
                              </div>
                              {i < milestoneLabels.length - 1 && (
                                <div className={`flex-1 h-0.5 mx-[-10px] z-0 ${isComplete && !isCurrent ? 'bg-mgh-blue' : 'bg-mgh-grey/30'}`} />
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Vendor Scorecard */}
                      <div className="mt-5 flex flex-wrap gap-3">
                        <span className="bg-mgh-blue/10 text-mgh-blue px-3 py-1 rounded text-xs font-barlow font-bold">
                          Booking Accuracy: 96%
                        </span>
                        <span className="bg-mgh-blue/10 text-mgh-blue px-3 py-1 rounded text-xs font-barlow font-bold">
                          Doc Timeliness: 88%
                        </span>
                        <span className="bg-mgh-blue/10 text-mgh-blue px-3 py-1 rounded text-xs font-barlow font-bold">
                          CRD Adherence: 91%
                        </span>
                      </div>

                      {/* Value */}
                      <p className="mt-3 font-barlow text-xs text-mgh-grey">
                        PO Value: <span className="font-mono font-bold text-mgh-charcoal">${po.value.toLocaleString()}</span>
                        {' · '}Season: <span className="font-bold text-mgh-charcoal">{po.season}</span>
                      </p>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-8 text-center font-barlow text-mgh-grey">No purchase orders match your filters.</div>
        )}
      </div>
    </div>
  );
};

export default PurchaseOrders;
