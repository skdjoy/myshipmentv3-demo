import React, { useState, useMemo } from 'react';
import { FileText, Bot, Upload, Download } from 'lucide-react';
import { documents } from '../data/dummyData';

const categories = ['All', 'B/L', 'Invoice', 'Packing', 'Certificate', 'Customs'];

const statusStyle = (status) => {
  if (status === 'Final') return 'bg-green-100 text-green-700';
  if (status.includes('OVERDUE')) return 'bg-red-100 text-red-700';
  if (status.includes('MISSING')) return 'bg-red-100 text-red-700';
  if (status.includes('Pending')) return 'bg-amber-100 text-amber-700';
  if (status.includes('Draft')) return 'bg-blue-100 text-blue-700';
  return 'bg-gray-100 text-gray-600';
};

const Documents = ({ showToast }) => {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = useMemo(() => {
    if (activeTab === 'All') return documents;
    return documents.filter(d => d.type === activeTab);
  }, [activeTab]);

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="font-oswald font-semibold text-2xl uppercase text-mgh-blue tracking-wide">
          Documents
        </h1>
        <p className="font-barlow text-sm text-mgh-grey">AI-powered document hub — automated processing and compliance tracking</p>
      </div>

      {/* AI-OCR Banner */}
      <div className="bg-white rounded-lg shadow-sm p-5 border-l-4"
        style={{ borderImage: 'linear-gradient(to bottom, #34328F, #00D4FF) 1' }}
      >
        <div className="flex items-start gap-3">
          <Bot size={24} strokeWidth={2} className="text-mgh-blue flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-barlow font-bold text-sm text-mgh-blue uppercase">
              AI Document Processing Active
            </h3>
            <p className="font-barlow text-sm text-mgh-charcoal mt-1">
              <span className="font-mono font-bold">847</span> documents auto-processed this month.{' '}
              <span className="font-mono font-bold">12,400</span> data fields extracted with{' '}
              <span className="font-mono font-bold text-green-600">99.2%</span> accuracy.
              Average processing time: <span className="font-mono font-bold">4.3 seconds</span> per document.
            </p>
            <p className="font-barlow text-xs text-mgh-grey mt-1">
              Fields extracted: Weights, Seal Numbers, HTS Codes, Consignee Details, Port Codes
            </p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex border-b border-mgh-grey/20">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2.5 font-barlow text-sm transition-colors ${
              activeTab === cat
                ? 'text-mgh-blue font-bold border-b-2 border-mgh-blue'
                : 'text-mgh-grey hover:text-mgh-charcoal'
            }`}
          >
            {cat === 'All' ? 'All Documents' : cat === 'B/L' ? 'Bills of Lading' : cat === 'Invoice' ? 'Commercial Invoices' : cat === 'Packing' ? 'Packing Lists' : cat === 'Certificate' ? 'Certificates' : 'Customs Filings'}
          </button>
        ))}
      </div>

      {/* Document Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-mgh-blue text-white">
              {['', 'Document Name', 'Type', 'Shipment', 'Date', 'Status', 'AI', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-left font-barlow font-bold text-xs uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((doc, i) => (
              <tr key={i} className="border-b border-mgh-light hover:bg-mgh-light/50 transition-colors">
                <td className="px-4 py-3">
                  <FileText size={16} strokeWidth={2} className="text-mgh-blue" />
                </td>
                <td className="px-4 py-3 font-barlow text-sm font-bold text-mgh-charcoal">{doc.name}</td>
                <td className="px-4 py-3 font-barlow text-xs text-mgh-grey">{doc.type}</td>
                <td className="px-4 py-3 font-barlow text-sm text-mgh-blue font-bold">{doc.shipment || '—'}</td>
                <td className="px-4 py-3 font-barlow text-sm">{doc.date || '—'}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-barlow font-bold ${statusStyle(doc.status)}`}>
                    {doc.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {doc.aiExtracted && (
                    <span className="bg-mgh-cyan/10 text-mgh-cyan text-[10px] font-barlow font-bold px-2 py-0.5 rounded">
                      AI Extracted
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {doc.status.includes('MISSING') || doc.status.includes('Pending Supplier') ? (
                      <button
                        onClick={() => showToast(`Upload initiated for: ${doc.name}`)}
                        className="text-mgh-blue hover:text-mgh-navy"
                      >
                        <Upload size={14} strokeWidth={2} />
                      </button>
                    ) : (
                      <button
                        onClick={() => showToast(`Downloading: ${doc.name}`)}
                        className="text-mgh-blue hover:text-mgh-navy"
                      >
                        <Download size={14} strokeWidth={2} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Documents;
