import React, { useState } from 'react';
import { Search, Leaf, Zap, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';

const routeOptions = [
  {
    type: 'green',
    icon: Leaf,
    badge: 'LOWEST EMISSIONS',
    badgeColor: 'bg-[#27B373]',
    carrier: 'Maersk (Biofuel blend)',
    route: 'HCMC → Singapore → Rotterdam (1 transshipment)',
    transit: '32 days',
    etd: 'Feb 18',
    eta: 'Mar 22',
    price: '$3,850',
    co2: '1.2 tonnes (42% less than average)',
    reliability: 94,
  },
  {
    type: 'fast',
    icon: Zap,
    badge: 'FASTEST',
    badgeColor: 'bg-mgh-cyan',
    carrier: 'Hapag-Lloyd Express',
    route: 'HCMC → Rotterdam (Direct)',
    transit: '24 days',
    etd: 'Feb 16',
    eta: 'Mar 12',
    price: '$4,600',
    co2: '2.1 tonnes',
    reliability: 91,
  },
  {
    type: 'saver',
    icon: DollarSign,
    badge: 'BEST VALUE',
    badgeColor: 'bg-mgh-blue',
    carrier: 'COSCO',
    route: 'HCMC → Port Klang → Piraeus → Rotterdam (2 transshipments)',
    transit: '38 days',
    etd: 'Feb 20',
    eta: 'Mar 30',
    price: '$2,950',
    co2: '1.8 tonnes',
    reliability: 86,
  },
];

const surcharges = [
  { label: 'Base Ocean Freight', amount: '$2,200' },
  { label: 'Bunker Adjustment (BAF)', amount: '$480' },
  { label: 'Peak Season Surcharge (PSS)', amount: '$350' },
  { label: 'Currency Adjustment (CAF)', amount: '$120' },
  { label: 'Terminal Handling (THC)', amount: '$290' },
  { label: 'Documentation Fee', amount: '$45' },
];

const BookingEngine = ({ showToast }) => {
  const [showResults, setShowResults] = useState(false);
  const [showSurcharges, setShowSurcharges] = useState(false);
  const [origin, setOrigin] = useState('Ho Chi Minh City');
  const [destination, setDestination] = useState('Rotterdam');
  const [cargoType, setCargoType] = useState("FCL 40'HC");
  const [weight, setWeight] = useState('22,400 kg');
  const [readyDate, setReadyDate] = useState('2026-02-15');
  const [linkedPO, setLinkedPO] = useState('PO-2026-44919');

  const origins = ['Shanghai', 'Ho Chi Minh City', 'Dhaka', 'Mumbai', 'Jakarta'];
  const destinations = ['Rotterdam', 'Hamburg', 'Los Angeles', 'New York', 'Felixstowe'];
  const cargoTypes = ["FCL 20'", "FCL 40'", "FCL 40'HC", "LCL"];
  const pos = ['PO-2026-44918', 'PO-2026-44919', 'PO-2026-44920', 'PO-2026-44921'];

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="font-oswald font-semibold text-2xl uppercase text-mgh-blue tracking-wide">
          Booking Engine
        </h1>
        <p className="font-barlow text-sm text-mgh-grey">Compare routes, rates, and emissions — book with confidence</p>
      </div>

      {/* Booking Form */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="font-barlow font-bold text-xs uppercase text-mgh-charcoal block mb-1">Origin</label>
            <select value={origin} onChange={e => setOrigin(e.target.value)} className="w-full border border-mgh-grey/40 rounded-lg px-3 py-2 text-sm font-barlow focus:outline-none focus:ring-2 focus:ring-mgh-blue/30 focus:border-mgh-blue">
              {origins.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="font-barlow font-bold text-xs uppercase text-mgh-charcoal block mb-1">Destination</label>
            <select value={destination} onChange={e => setDestination(e.target.value)} className="w-full border border-mgh-grey/40 rounded-lg px-3 py-2 text-sm font-barlow focus:outline-none focus:ring-2 focus:ring-mgh-blue/30 focus:border-mgh-blue">
              {destinations.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="font-barlow font-bold text-xs uppercase text-mgh-charcoal block mb-1">Cargo Type</label>
            <select value={cargoType} onChange={e => setCargoType(e.target.value)} className="w-full border border-mgh-grey/40 rounded-lg px-3 py-2 text-sm font-barlow focus:outline-none focus:ring-2 focus:ring-mgh-blue/30 focus:border-mgh-blue">
              {cargoTypes.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="font-barlow font-bold text-xs uppercase text-mgh-charcoal block mb-1">Weight</label>
            <input value={weight} onChange={e => setWeight(e.target.value)} className="w-full border border-mgh-grey/40 rounded-lg px-3 py-2 text-sm font-barlow focus:outline-none focus:ring-2 focus:ring-mgh-blue/30 focus:border-mgh-blue" />
          </div>
          <div>
            <label className="font-barlow font-bold text-xs uppercase text-mgh-charcoal block mb-1">Ready Date</label>
            <input type="date" value={readyDate} onChange={e => setReadyDate(e.target.value)} className="w-full border border-mgh-grey/40 rounded-lg px-3 py-2 text-sm font-barlow focus:outline-none focus:ring-2 focus:ring-mgh-blue/30 focus:border-mgh-blue" />
          </div>
          <div>
            <label className="font-barlow font-bold text-xs uppercase text-mgh-charcoal block mb-1">Linked PO</label>
            <select value={linkedPO} onChange={e => setLinkedPO(e.target.value)} className="w-full border border-mgh-grey/40 rounded-lg px-3 py-2 text-sm font-barlow focus:outline-none focus:ring-2 focus:ring-mgh-blue/30 focus:border-mgh-blue">
              {pos.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>
        <button
          onClick={() => setShowResults(true)}
          className="mt-4 bg-mgh-blue text-white px-6 py-2.5 rounded-lg font-barlow font-bold text-sm uppercase tracking-wider hover:bg-mgh-navy transition-colors flex items-center gap-2"
        >
          <Search size={16} strokeWidth={2} />
          Search Routes
        </button>
      </div>

      {/* Route Options */}
      {showResults && (
        <div className="grid grid-cols-3 gap-4 animate-fade-in">
          {routeOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <div key={opt.type} className="bg-white rounded-lg shadow-sm p-5 border border-mgh-grey/10 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <Icon size={24} strokeWidth={2} className="text-mgh-blue" />
                  <span className={`${opt.badgeColor} text-white text-[10px] font-barlow font-bold px-2 py-0.5 rounded`}>
                    {opt.badge}
                  </span>
                </div>
                <h3 className="font-barlow font-bold text-base text-mgh-charcoal mb-3">{opt.carrier}</h3>
                <div className="space-y-2 text-sm font-barlow">
                  <p className="text-mgh-grey">Route: <span className="text-mgh-charcoal">{opt.route}</span></p>
                  <p className="text-mgh-grey">Transit: <span className="font-bold text-mgh-charcoal">{opt.transit}</span></p>
                  <p className="text-mgh-grey">ETD: {opt.etd} → ETA: {opt.eta}</p>
                  <p className="text-mgh-grey">CO2: <span className="text-mgh-charcoal">{opt.co2}</span></p>
                  <div className="pt-1">
                    <p className="text-mgh-grey text-xs">Reliability Index: {opt.reliability}%</p>
                    <div className="w-full h-2 bg-mgh-light rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-mgh-blue rounded-full transition-all duration-1000" style={{ width: `${opt.reliability}%` }} />
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-mgh-light flex items-center justify-between">
                  <span className="font-mono font-bold text-xl text-mgh-blue">{opt.price}</span>
                  <span className="text-[10px] font-barlow text-mgh-grey">per {cargoType}</span>
                </div>
                <button
                  onClick={() => showToast(`Booking confirmed! Ref: BK-2024-8830. Awaiting buyer approval.`)}
                  className="w-full mt-3 bg-mgh-blue text-white py-2 rounded-lg font-barlow font-bold text-sm uppercase tracking-wider hover:bg-mgh-navy transition-colors"
                >
                  Book Now
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Surcharge Breakdown */}
      {showResults && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <button
            onClick={() => setShowSurcharges(!showSurcharges)}
            className="w-full px-5 py-3 flex items-center justify-between hover:bg-mgh-light/50 transition-colors"
          >
            <span className="font-barlow font-bold text-sm uppercase text-mgh-charcoal">
              Real-Time Surcharge Breakdown
            </span>
            {showSurcharges ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {showSurcharges && (
            <div className="px-5 pb-4 animate-fade-in">
              <div className="space-y-2 font-mono text-sm">
                {surcharges.map((s, i) => (
                  <div key={i} className="flex justify-between py-1">
                    <span className="text-mgh-charcoal">{s.label}</span>
                    <span className="text-mgh-charcoal">{s.amount}</span>
                  </div>
                ))}
                <div className="border-t border-mgh-grey/30 pt-2 flex justify-between font-bold">
                  <span className="text-mgh-blue">Total per {cargoType}</span>
                  <span className="text-mgh-blue">$3,485</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingEngine;
