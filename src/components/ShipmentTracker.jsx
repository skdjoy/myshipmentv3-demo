import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Check, Clock, AlertTriangle, Plane, Ship as ShipIcon, Truck } from 'lucide-react';
import { shipments } from '../data/dummyData';

const statusCounts = {
  'All': shipments.length,
  'Shipped': shipments.filter(s => s.status === 'Shipped').length,
  'At Origin': shipments.filter(s => s.status === 'At Origin').length,
  'Customs': shipments.filter(s => s.status === 'Customs').length,
  'Delivered': shipments.filter(s => s.status === 'Delivered').length,
  'Exception': shipments.filter(s => s.exception).length,
};

const ShipmentTracker = ({ showToast }) => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [expandedRow, setExpandedRow] = useState(null);

  const filtered = useMemo(() => {
    if (statusFilter === 'All') return shipments;
    if (statusFilter === 'Exception') return shipments.filter(s => s.exception);
    return shipments.filter(s => s.status === statusFilter);
  }, [statusFilter]);

  const timelineForShipment = (shp) => {
    const steps = [
      { label: 'Booking Confirmed', date: 'Jan 20', done: true },
      { label: 'Cargo Received at Origin Warehouse', date: 'Jan 25', done: true },
      { label: 'Customs Cleared (Origin)', date: 'Jan 27', done: true },
      { label: `Vessel Departed ${shp.origin}`, date: shp.departure.slice(5), done: true },
      { label: 'Shipped', date: shp.status === 'Shipped' ? 'Current' : null, done: shp.status === 'Shipped' || shp.status === 'Customs' || shp.status === 'Delivered', current: shp.status === 'Shipped' },
      { label: `Arrive ${shp.destination}`, date: `Carrier: ${shp.carrierETA.slice(5)} | MGH AI: ${shp.mghPredictedETA.slice(5)}`, done: shp.status === 'Customs' || shp.status === 'Delivered', hasWarning: shp.carrierETA !== shp.mghPredictedETA },
      { label: 'Customs Clearance (Destination)', date: null, done: shp.status === 'Delivered' },
      { label: 'Final Delivery to DC', date: null, done: shp.status === 'Delivered' },
    ];
    return steps;
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="font-oswald font-semibold text-2xl uppercase text-mgh-blue tracking-wide">
          Shipment Tracker
        </h1>
        <p className="font-barlow text-sm text-mgh-grey">Global control tower — real-time visibility across all shipments</p>
      </div>

      {/* Status Chips */}
      <div className="flex gap-2 flex-wrap">
        {Object.entries(statusCounts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 rounded-lg text-sm font-barlow font-bold transition-colors ${statusFilter === status
              ? 'bg-mgh-blue text-white'
              : 'bg-white text-mgh-charcoal border border-mgh-grey/40 hover:border-mgh-blue'
              }`}
          >
            {status} ({count})
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="bg-mgh-blue text-white">
              {['Shipment ID', 'Vessel', 'Carrier', 'Route', 'Carrier ETA', 'MGH AI ETA', 'Status', 'Exception'].map(h => (
                <th key={h} className="px-3 py-3 text-left font-barlow font-bold text-xs uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(shp => (
              <React.Fragment key={shp.id}>
                <tr
                  onClick={() => setExpandedRow(expandedRow === shp.id ? null : shp.id)}
                  className="border-b border-mgh-light hover:bg-mgh-light/50 cursor-pointer transition-colors"
                >
                  <td className="px-3 py-3 font-barlow text-sm font-bold text-mgh-blue">{shp.id}</td>
                  <td className="px-3 py-3 font-barlow text-sm">{shp.vessel}</td>
                  <td className="px-3 py-3 font-barlow text-sm">{shp.carrier}</td>
                  <td className="px-3 py-3 font-barlow text-sm">{shp.origin} → {shp.destination}</td>
                  <td className="px-3 py-3 font-mono text-sm">{shp.carrierETA}</td>
                  <td className={`px-3 py-3 font-mono text-sm font-bold ${shp.carrierETA !== shp.mghPredictedETA ? 'text-amber-600' : 'text-green-600'}`}>
                    {shp.mghPredictedETA}
                    {shp.carrierETA !== shp.mghPredictedETA && ' ⚠️'}
                  </td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-barlow font-bold ${shp.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                      shp.status === 'At Origin' ? 'bg-yellow-100 text-yellow-700' :
                        shp.status === 'Customs' ? 'bg-purple-100 text-purple-700' :
                          'bg-green-100 text-green-700'
                      }`}>
                      {shp.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 font-barlow text-xs">
                    {shp.exception ? (
                      <span className={`${shp.exception.includes('DELAYED') ? 'text-red-500' : 'text-amber-500'} font-bold`}>
                        {shp.exception}
                      </span>
                    ) : (
                      <span className="text-mgh-grey">—</span>
                    )}
                    {expandedRow === shp.id ? <ChevronUp size={14} className="inline ml-2" /> : <ChevronDown size={14} className="inline ml-2" />}
                  </td>
                </tr>

                {/* Expanded Detail */}
                {expandedRow === shp.id && (
                  <tr>
                    <td colSpan={8} className="bg-mgh-light/50 px-6 py-5 animate-fade-in">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Timeline */}
                        <div className="col-span-1">
                          <h4 className="font-barlow font-bold text-xs uppercase text-mgh-charcoal mb-3">
                            Tracking Timeline
                          </h4>
                          <div className="space-y-0">
                            {timelineForShipment(shp).map((step, i) => (
                              <div key={i} className="flex gap-3">
                                <div className="flex flex-col items-center">
                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${step.done
                                    ? step.current
                                      ? 'bg-mgh-cyan animate-glow'
                                      : 'bg-mgh-blue'
                                    : 'bg-mgh-grey/30'
                                    }`}>
                                    {step.done && !step.current && <Check size={10} strokeWidth={3} className="text-white" />}
                                    {step.current && <Clock size={10} strokeWidth={2} className="text-white" />}
                                  </div>
                                  {i < 7 && <div className={`w-0.5 h-6 ${step.done ? 'bg-mgh-blue' : 'bg-mgh-grey/30'}`} />}
                                </div>
                                <div className="pb-3">
                                  <p className={`font-barlow text-xs ${step.done ? 'text-mgh-charcoal font-bold' : 'text-mgh-grey'}`}>
                                    {step.label}
                                    {step.hasWarning && ' ⚠️'}
                                  </p>
                                  {step.date && (
                                    <p className="font-barlow text-[10px] text-mgh-grey">{step.date}</p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* AI ETA Insight */}
                        {shp.carrierETA !== shp.mghPredictedETA && (
                          <div className="col-span-1">
                            <div className="border-l-4 border-mgh-cyan bg-mgh-cyan/5 rounded-r-lg p-4">
                              <h4 className="font-barlow font-bold text-xs uppercase text-mgh-blue mb-2">
                                AI ETA Insight
                              </h4>
                              <p className="font-barlow text-xs text-mgh-charcoal leading-relaxed">
                                MGH AI predicts arrival{' '}
                                <span className="font-bold text-amber-600">
                                  {Math.round((new Date(shp.mghPredictedETA) - new Date(shp.carrierETA)) / (1000 * 60 * 60 * 24))} days later
                                </span>{' '}
                                than carrier ETA. Reason: Suez Canal queue currently 48 vessels deep. Historical average queue clearance: 3.2 days. Weather advisory: Moderate headwinds in Mediterranean.
                              </p>
                            </div>

                            {/* Shipment Details */}
                            <div className="mt-3 space-y-1">
                              <p className="font-barlow text-xs text-mgh-grey">
                                Container: <span className="font-bold text-mgh-charcoal">{shp.container}</span>
                              </p>
                              <p className="font-barlow text-xs text-mgh-grey">
                                TEUs: <span className="font-mono font-bold text-mgh-charcoal">{shp.teus}</span> · Weight: <span className="font-bold text-mgh-charcoal">{shp.weight}</span>
                              </p>
                              <p className="font-barlow text-xs text-mgh-grey">
                                Linked PO: <span className="font-bold text-mgh-blue">{shp.po}</span>
                              </p>
                              <p className="font-barlow text-xs text-mgh-grey">
                                Commodity: <span className="font-bold text-mgh-charcoal">{shp.commodity}</span> — {shp.units.toLocaleString()} units
                              </p>
                            </div>
                          </div>
                        )}

                        {/* AI Recommendations */}
                        {shp.carrierETA !== shp.mghPredictedETA && (
                          <div className="col-span-1">
                            <h4 className="font-barlow font-bold text-xs uppercase text-mgh-charcoal mb-3">
                              AI Recommendations
                            </h4>
                            <div className="space-y-2">
                              {[
                                { label: 'Option A: Wait', desc: 'No additional cost. New delivery to DC: Mar 8. Risk: Misses spring launch window by 3 days.', cost: '$0' },
                                { label: 'Option B: Expedite via Air', desc: `Cost: $18,400. Delivery to DC: Feb 18. ${shp.units.toLocaleString()} units arrive on time for launch.`, cost: '$18,400' },
                                { label: 'Option C: Split Shipment', desc: 'Air-freight 3,000 critical units ($4,600). Sea-freight remaining units. Partial stock available for launch day.', cost: '$4,600' },
                              ].map((opt, i) => (
                                <div key={i} className="bg-white border border-mgh-grey/20 rounded-lg p-3">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="font-barlow font-bold text-xs text-mgh-blue">{opt.label}</span>
                                    <span className="font-mono text-xs text-mgh-charcoal">{opt.cost}</span>
                                  </div>
                                  <p className="font-barlow text-[11px] text-mgh-grey leading-relaxed">{opt.desc}</p>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); showToast(`${opt.label} selected for ${shp.id}`); }}
                                    className="mt-2 text-[10px] font-barlow font-bold text-mgh-blue border border-mgh-blue/30 px-2 py-0.5 rounded hover:bg-mgh-blue hover:text-white transition-colors"
                                  >
                                    Select
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* For shipments without ETA discrepancy */}
                        {shp.carrierETA === shp.mghPredictedETA && (
                          <div className="lg:col-span-2">
                            <div className="border-l-4 border-green-500 bg-green-50 rounded-r-lg p-4">
                              <h4 className="font-barlow font-bold text-xs uppercase text-green-700 mb-2">
                                On Track
                              </h4>
                              <p className="font-barlow text-xs text-mgh-charcoal">
                                This shipment is on schedule. MGH AI ETA matches carrier ETA. No action required.
                              </p>
                            </div>
                            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                              <p className="font-barlow text-xs text-mgh-grey">
                                Container: <span className="font-bold text-mgh-charcoal">{shp.container}</span>
                              </p>
                              <p className="font-barlow text-xs text-mgh-grey">
                                TEUs: <span className="font-mono font-bold text-mgh-charcoal">{shp.teus}</span> · Weight: <span className="font-bold text-mgh-charcoal">{shp.weight}</span>
                              </p>
                              <p className="font-barlow text-xs text-mgh-grey">
                                Linked PO: <span className="font-bold text-mgh-blue">{shp.po}</span>
                              </p>
                              <p className="font-barlow text-xs text-mgh-grey">
                                Commodity: <span className="font-bold text-mgh-charcoal">{shp.commodity}</span> — {shp.units.toLocaleString()} units
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShipmentTracker;
