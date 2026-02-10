import React from 'react';
import { Leaf, Globe, Award, CheckCircle } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { emissionsData, modeEmissions } from '../data/dummyData';

const Sustainability = ({ showToast }) => {
  const kpis = [
    { icon: Globe, label: 'Total CO2e (YTD)', value: '4,891', unit: 'tonnes' },
    { icon: Leaf, label: 'Avg. Emission Intensity', value: '42.3', unit: 'gCO2/tonne-km' },
    { icon: Award, label: 'Offsets Purchased', value: '1,200', unit: 'tonnes (24.5%)' },
    { icon: CheckCircle, label: 'GLEC Accredited', value: 'Yes', unit: 'Framework compliant' },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="font-oswald font-semibold text-2xl uppercase text-mgh-blue tracking-wide">
          Sustainability
        </h1>
        <p className="font-barlow text-sm text-mgh-grey">CSRD emissions reporting and carbon offset management</p>
      </div>

      {/* KPI Cards — green accent */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white rounded-lg p-4 border-l-4 border-[#27B373] shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={18} strokeWidth={2} className="text-mgh-blue" />
                <span className="font-barlow font-bold text-xs uppercase tracking-wider text-mgh-charcoal">{kpi.label}</span>
              </div>
              <div className="font-mono font-bold text-2xl text-mgh-blue">{kpi.value}</div>
              <p className="font-barlow text-xs text-mgh-grey mt-0.5">{kpi.unit}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Emissions by Trade Lane */}
        <div className="bg-white rounded-lg shadow-sm p-5">
          <h2 className="font-oswald font-semibold text-base uppercase text-mgh-blue tracking-wide mb-4">
            Emissions by Trade Lane
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={emissionsData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F4F4F4" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fontFamily: 'Space Mono', fill: '#B2B8BF' }} tickFormatter={(v) => `${v}t`} />
              <YAxis type="category" dataKey="lane" tick={{ fontSize: 12, fontFamily: 'Barlow Condensed', fill: '#2A2A38' }} width={70} />
              <Tooltip
                formatter={(val, name) => [`${val} tonnes CO2e`, name === 'co2' ? 'Emissions' : name]}
                contentStyle={{ fontFamily: 'Barlow Condensed', fontSize: 13, borderRadius: 8, borderColor: '#B2B8BF' }}
              />
              <Bar dataKey="co2" fill="#27B373" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Emissions by Mode */}
        <div className="bg-white rounded-lg shadow-sm p-5">
          <h2 className="font-oswald font-semibold text-base uppercase text-mgh-blue tracking-wide mb-4">
            Emissions by Transport Mode
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={modeEmissions}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={95}
                paddingAngle={3}
                dataKey="value"
                label={({ mode, value }) => `${mode}: ${value}t`}
              >
                {modeEmissions.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val) => `${val} tonnes CO2e`}
                contentStyle={{ fontFamily: 'Barlow Condensed', fontSize: 13, borderRadius: 8, borderColor: '#B2B8BF' }}
              />
              <Legend
                wrapperStyle={{ fontFamily: 'Barlow Condensed', fontSize: 12 }}
                formatter={(value) => <span className="text-mgh-charcoal">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Carbon Offset CTA */}
      <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-[#27B373]">
        <h3 className="font-barlow font-bold text-base text-mgh-charcoal mb-2">
          Offset your remaining 3,691 tonnes
        </h3>
        <p className="font-barlow text-sm text-mgh-grey mb-1">
          Cost: <span className="font-mono font-bold text-mgh-charcoal">$73,820</span> (est. $20/tonne) via Gold Standard verified credits
        </p>
        <p className="font-barlow text-sm text-mgh-grey mb-4">
          Projects: Renewable Energy — Vietnam Wind Farm, Reforestation — Bangladesh Mangrove
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => showToast('Carbon offset purchase initiated — pending finance approval')}
            className="bg-[#27B373] text-white px-5 py-2 rounded-lg font-barlow font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity w-full sm:w-auto"
          >
            Purchase Offsets
          </button>
          <button
            onClick={() => showToast('CSRD Report download initiated')}
            className="bg-mgh-blue text-white px-5 py-2 rounded-lg font-barlow font-bold text-sm uppercase tracking-wider hover:bg-mgh-navy transition-colors w-full sm:w-auto"
          >
            Download CSRD Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sustainability;
