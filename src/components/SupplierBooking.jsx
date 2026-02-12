import React, { useState, useEffect } from 'react';
import { Package, Upload, Calendar, Search, Check, AlertCircle, ChevronDown, ChevronUp, Info, Edit2 } from 'lucide-react';
import { purchaseOrders } from '../data/dummyData';

const SupplierBooking = ({ showToast }) => {
    const supplierPOs = purchaseOrders.filter(po => po.supplier === 'Jiangsu Garments Co.');

    // State for Line Item Selection
    // Structure: { 'PO-123': ['SKU-001', 'SKU-002'] }
    const [selectedItems, setSelectedItems] = useState({});
    const [expandedPOs, setExpandedPOs] = useState({});
    const [editedQuantities, setEditedQuantities] = useState({});

    // State for HBL Details
    const [hblDetails, setHblDetails] = useState({
        consignee: '',
        buyer: '',
        localBuyingHouse: '',
        notifyParty: '',
        shipperBank: '',
        buyerBank: '',
        termsOfShipment: 'FOB',
        freightMode: 'Freight Collect',
        commercialInvoiceNo: '',
        commercialInvoiceDate: '',
        expNo: '',
        expDate: '',
        lcScPoNo: '',
        freightPayableAt: 'Destination',
        descriptionOfGoods: '',
        shippingMarks: '',
        placeOfReceipt: '',
        portOfLoading: '',
        portOfDischarge: '',
        placeOfDelivery: '',
        handoverDate: ''
    });

    const [grossWeight, setGrossWeight] = useState('');
    const [volume, setVolume] = useState('');
    const [files, setFiles] = useState({ packingList: null, invoice: null });

    // Auto-fill HBL details when a PO is selected
    useEffect(() => {
        const selectedPONumbers = Object.keys(selectedItems);
        if (selectedPONumbers.length > 0) {
            // Logic to fill data only if it's not already filled (or always overwrite if that's preferred behavior)
            // For this demo, we'll populate if the main fields are empty
            if (!hblDetails.consignee) {
                setHblDetails(prev => ({
                    ...prev,
                    consignee: 'SPORTS DIRECT.COM\nUnit A, Brook Park East\nShirebrook, NG20 8RY\nUnited Kingdom',
                    buyer: 'SPORTS DIRECT.COM',
                    localBuyingHouse: 'Dhaka Sourcing International',
                    notifyParty: 'Global Freight Systems UK Ltd.\nUnit 4, Heathrow Logistics Park',
                    placeOfReceipt: 'Shanghai, CN (CFS)',
                    portOfLoading: 'Shanghai',
                    portOfDischarge: 'Felixstowe',
                    placeOfDelivery: 'Felixstowe',
                    shippingMarks: 'S/D (As per PO)'
                }));
            }
        }
    }, [selectedItems, hblDetails.consignee]);

    // Helper to toggle PO expansion
    const toggleExpand = (poNumber) => {
        setExpandedPOs(prev => ({ ...prev, [poNumber]: !prev[poNumber] }));
    };

    // Helper to check if all items in a PO are selected
    const isPOFullySelected = (po) => {
        const selected = selectedItems[po.poNumber] || [];
        return po.lineItems && selected.length === po.lineItems.length;
    };

    // Toggle selection for an entire PO
    const togglePOSelection = (po) => {
        const isSelected = isPOFullySelected(po);
        const newSelectedItems = { ...selectedItems };

        if (isSelected) {
            delete newSelectedItems[po.poNumber];
        } else {
            newSelectedItems[po.poNumber] = po.lineItems.map(item => item.sku);
        }
        setSelectedItems(newSelectedItems);

        // Auto-fill Description of Goods based on selection
        updateDescriptionOfGoods(newSelectedItems);
    };

    // Toggle selection for a single line item
    const toggleLineItem = (poNumber, sku) => {
        const currentSelected = selectedItems[poNumber] || [];
        let newSelected;

        if (currentSelected.includes(sku)) {
            newSelected = currentSelected.filter(id => id !== sku);
        } else {
            newSelected = [...currentSelected, sku];
        }

        const newSelectedItems = { ...selectedItems, [poNumber]: newSelected };
        if (newSelected.length === 0) delete newSelectedItems[poNumber];

        setSelectedItems(newSelectedItems);
        updateDescriptionOfGoods(newSelectedItems);
    };

    // Auto-generate goods description
    const updateDescriptionOfGoods = (selection) => {
        const descriptions = [];
        Object.keys(selection).forEach(poNum => {
            const po = supplierPOs.find(p => p.poNumber === poNum);
            if (po && selection[poNum].length > 0) {
                descriptions.push(`${po.items} (PO: ${poNum})`);
            }
        });
        setHblDetails(prev => ({ ...prev, descriptionOfGoods: descriptions.join('\n') }));
    };

    const handleFileChange = (type, e) => {
        if (e.target.files[0]) {
            setFiles(prev => ({ ...prev, [type]: e.target.files[0] }));
            showToast(`${type === 'packingList' ? 'Packing List' : 'Invoice'} uploaded successfully`);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(selectedItems).length === 0) {
            showToast('Please select at least one line item');
            return;
        }
        if (!hblDetails.handoverDate) {
            showToast('Please select a Cargo Handover Date');
            return;
        }

        setTimeout(() => {
            showToast(`Booking request submitted! HBL Draft generated.`);
            // Reset logic could go here
        }, 1000);
    };

    return (
        <div className="space-y-4 md:space-y-6 animate-fade-in pb-20 md:pb-0">
            <div>
                <h1 className="font-oswald font-semibold text-2xl uppercase text-mgh-blue tracking-wide">
                    Supplier Booking
                </h1>
                <p className="font-barlow text-sm text-mgh-grey">Select items, provide HBL details, and submit booking</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT COLUMN: PO & Line Item Selection */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white rounded-lg shadow-sm p-4 md:p-5">
                        <h3 className="font-barlow font-bold text-base text-mgh-charcoal mb-4 flex items-center gap-2">
                            <Package size={18} className="text-mgh-blue" />
                            Select Items for Booking
                        </h3>

                        <div className="space-y-3">
                            {supplierPOs.map(po => {
                                const isExpanded = expandedPOs[po.poNumber];
                                const isFull = isPOFullySelected(po);
                                const selectionCount = (selectedItems[po.poNumber] || []).length;

                                return (
                                    <div key={po.poNumber} className={`border rounded-lg transition-all ${selectionCount > 0 ? 'border-mgh-blue bg-mgh-blue/5' : 'border-mgh-grey/20'}`}>
                                        {/* PO Header */}
                                        <div className="p-3 md:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                                            <div className="flex items-center gap-3 w-full">
                                                <div
                                                    onClick={() => togglePOSelection(po)}
                                                    className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center cursor-pointer transition-colors ${isFull ? 'bg-mgh-blue border-mgh-blue text-white' :
                                                        selectionCount > 0 ? 'bg-mgh-blue/50 border-mgh-blue text-white' : 'border-mgh-grey/40 bg-white'
                                                        }`}
                                                >
                                                    {selectionCount > 0 && <Check size={12} strokeWidth={3} />}
                                                </div>
                                                <div className="flex-1 cursor-pointer" onClick={() => toggleExpand(po.poNumber)}>
                                                    <div className="flex justify-between items-center">
                                                        <p className="font-barlow font-bold text-sm text-mgh-blue">{po.poNumber}</p>
                                                        <div className="md:hidden">
                                                            {isExpanded ? <ChevronUp size={16} className="text-mgh-grey" /> : <ChevronDown size={16} className="text-mgh-grey" />}
                                                        </div>
                                                    </div>
                                                    <p className="font-barlow text-xs text-mgh-charcoal mt-0.5">{po.items}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between md:justify-end gap-4 pl-8 md:pl-0">
                                                <span className="bg-mgh-light text-mgh-charcoal text-[10px] font-bold px-2 py-0.5 rounded">
                                                    {po.season}
                                                </span>
                                                <div
                                                    onClick={() => toggleExpand(po.poNumber)}
                                                    className="hidden md:flex items-center gap-1 text-xs text-mgh-grey hover:text-mgh-blue cursor-pointer"
                                                >
                                                    {selectionCount} / {po.lineItems?.length || 0} items
                                                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Expandable Line Items */}
                                        {isExpanded && po.lineItems && (
                                            <div className="border-t border-mgh-grey/20 p-3 bg-white/50 space-y-2">
                                                {po.lineItems.map(item => (
                                                    <div key={item.sku} className="flex items-center gap-3 p-2 hover:bg-white rounded border border-transparent hover:border-mgh-grey/10">
                                                        <div
                                                            onClick={() => toggleLineItem(po.poNumber, item.sku)}
                                                            className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center cursor-pointer ${(selectedItems[po.poNumber] || []).includes(item.sku)
                                                                ? 'bg-mgh-blue border-mgh-blue text-white'
                                                                : 'border-mgh-grey/40 bg-white'
                                                                }`}
                                                        >
                                                            {(selectedItems[po.poNumber] || []).includes(item.sku) && <Check size={10} strokeWidth={3} />}
                                                        </div>
                                                        <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-2 text-xs font-barlow items-center">
                                                            <span className="text-mgh-charcoal font-medium col-span-2 md:col-span-1">{item.sku}</span>
                                                            <span className="text-mgh-grey">{item.color} - {item.size}</span>

                                                            <div className="flex items-center gap-1 col-span-1 md:col-span-1">
                                                                <span className="text-mgh-grey">Qty:</span>
                                                                <input
                                                                    type="text"
                                                                    defaultValue={item.quantity}
                                                                    className="w-16 border rounded px-1 py-0.5 text-right focus:border-mgh-blue outline-none"
                                                                />
                                                            </div>
                                                            <div className="flex items-center gap-1 col-span-1 md:col-span-1">
                                                                <span className="text-mgh-grey">Ctn:</span>
                                                                <input
                                                                    type="text"
                                                                    defaultValue={item.cartonQty}
                                                                    className="w-12 border rounded px-1 py-0.5 text-right focus:border-mgh-blue outline-none"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* HBL Details Form */}
                    <div className="bg-white rounded-lg shadow-sm p-4 md:p-5">
                        <h3 className="font-barlow font-bold text-base text-mgh-charcoal mb-4">
                            Bill of Lading Details & Shipping Instructions
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <InputGroup label="Consignee/Buyer" value={hblDetails.consignee} disabled />
                                <InputGroup label="Notify Party" value={hblDetails.notifyParty} onChange={v => setHblDetails({ ...hblDetails, notifyParty: v })} />
                                <InputGroup label="Local Buying House" value={hblDetails.localBuyingHouse} onChange={v => setHblDetails({ ...hblDetails, localBuyingHouse: v })} />
                                <InputGroup label="Place of Receipt" value={hblDetails.placeOfReceipt} onChange={v => setHblDetails({ ...hblDetails, placeOfReceipt: v })} />
                                <InputGroup label="Port of Loading" value={hblDetails.portOfLoading} onChange={v => setHblDetails({ ...hblDetails, portOfLoading: v })} />
                            </div>

                            <div className="space-y-4">
                                <InputGroup label="Port of Discharge" value={hblDetails.portOfDischarge} onChange={v => setHblDetails({ ...hblDetails, portOfDischarge: v })} />
                                <InputGroup label="Place of Delivery" value={hblDetails.placeOfDelivery} onChange={v => setHblDetails({ ...hblDetails, placeOfDelivery: v })} />
                                <InputGroup label="Shipper's Bank" placeholder="Bank Name & Address" value={hblDetails.shipperBank} onChange={v => setHblDetails({ ...hblDetails, shipperBank: v })} />
                                <InputGroup label="Buyer's Bank" placeholder="Issuing Bank Name" value={hblDetails.buyerBank} onChange={v => setHblDetails({ ...hblDetails, buyerBank: v })} />

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase text-mgh-charcoal mb-1">Terms</label>
                                        <select
                                            value={hblDetails.termsOfShipment}
                                            onChange={e => setHblDetails({ ...hblDetails, termsOfShipment: e.target.value })}
                                            className="w-full border border-mgh-grey/30 rounded px-2 py-2 text-xs font-barlow focus:border-mgh-blue outline-none"
                                        >
                                            <option>FOB</option><option>CIF</option><option>EXW</option><option>DDP</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase text-mgh-charcoal mb-1">Freight Mode</label>
                                        <select
                                            value={hblDetails.freightMode}
                                            onChange={e => setHblDetails({ ...hblDetails, freightMode: e.target.value })}
                                            className="w-full border border-mgh-grey/30 rounded px-2 py-2 text-xs font-barlow focus:border-mgh-blue outline-none"
                                        >
                                            <option>Freight Collect</option><option>Freight Prepaid</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-mgh-light grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-[10px] font-bold uppercase text-mgh-charcoal mb-1">Description of Goods</label>
                                <textarea
                                    rows={3}
                                    value={hblDetails.descriptionOfGoods}
                                    onChange={e => setHblDetails({ ...hblDetails, descriptionOfGoods: e.target.value })}
                                    className="w-full border border-mgh-grey/30 rounded px-3 py-2 text-xs font-barlow focus:border-mgh-blue outline-none"
                                />
                            </div>
                            <InputGroup label="Shipping Marks" value={hblDetails.shippingMarks} onChange={v => setHblDetails({ ...hblDetails, shippingMarks: v })} />
                            <InputGroup label="Commercial Invoice No." value={hblDetails.commercialInvoiceNo} onChange={v => setHblDetails({ ...hblDetails, commercialInvoiceNo: v })} />
                            <InputGroup label="Invoice Date" type="date" value={hblDetails.commercialInvoiceDate} onChange={v => setHblDetails({ ...hblDetails, commercialInvoiceDate: v })} />
                            <InputGroup label="EXP Number" value={hblDetails.expNo} onChange={v => setHblDetails({ ...hblDetails, expNo: v })} />
                            <InputGroup label="EXP Date" type="date" value={hblDetails.expDate} onChange={v => setHblDetails({ ...hblDetails, expDate: v })} />
                            <InputGroup label="LC / SC / PO Number" value={hblDetails.lcScPoNo} onChange={v => setHblDetails({ ...hblDetails, lcScPoNo: v })} />
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Summary & Uploads */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm p-5 sticky top-6">
                        <h3 className="font-barlow font-bold text-base text-mgh-charcoal mb-4">
                            Booking Summary
                        </h3>

                        <div className="space-y-4">
                            <div className="bg-mgh-light/30 rounded p-3 mb-4">
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-mgh-grey">POs Selected:</span>
                                    <span className="font-bold text-mgh-blue">{Object.keys(selectedItems).length}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-mgh-grey">Line Items:</span>
                                    <span className="font-bold text-mgh-blue">
                                        {Object.values(selectedItems).flat().length}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-barlow font-bold uppercase text-mgh-charcoal mb-1">
                                    Cargo Handover Date <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={hblDetails.handoverDate}
                                        onChange={(e) => setHblDetails({ ...hblDetails, handoverDate: e.target.value })}
                                        className="w-full border border-mgh-grey/30 rounded px-3 py-2 text-sm font-barlow focus:outline-none focus:border-mgh-blue"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <InputGroup label="Gross Weight (Kg)" value={grossWeight} onChange={setGrossWeight} />
                                <InputGroup label="Volume (CBM)" value={volume} onChange={setVolume} />
                            </div>

                            <div className="pt-4 border-t border-mgh-light space-y-3">
                                <p className="text-xs font-barlow font-bold uppercase text-mgh-charcoal">Required Documents</p>
                                <FileUpload id="packingList" label="Packing List" file={files.packingList} onChange={(e) => handleFileChange('packingList', e)} />
                                <FileUpload id="invoice" label="Commercial Invoice" file={files.invoice} onChange={(e) => handleFileChange('invoice', e)} />
                            </div>

                            <button
                                type="submit"
                                disabled={Object.keys(selectedItems).length === 0}
                                className={`w-full py-3 rounded-lg font-barlow font-bold text-sm uppercase tracking-wider transition-all shadow-sm mt-4
                  ${Object.keys(selectedItems).length > 0
                                        ? 'bg-mgh-blue text-white hover:bg-mgh-navy hover:shadow-md'
                                        : 'bg-mgh-grey/30 text-mgh-grey cursor-not-allowed'
                                    }`}
                            >
                                Submit Booking
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

// Sub-components for cleaner code
const InputGroup = ({ label, value, onChange, type = "text", disabled = false, placeholder = "" }) => (
    <div>
        <label className="block text-[10px] font-bold uppercase text-mgh-charcoal mb-1">{label}</label>
        {type === 'textarea' ? (
            <textarea
                rows={3}
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full border border-mgh-grey/30 rounded px-2 py-2 text-xs font-barlow focus:border-mgh-blue outline-none"
                disabled={disabled}
            />
        ) : (
            <input
                type={type}
                value={value}
                onChange={e => onChange && onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                className={`w-full border border-mgh-grey/30 rounded px-2 py-2 text-xs font-barlow focus:border-mgh-blue outline-none ${disabled ? 'bg-mgh-light text-mgh-grey' : ''}`}
            />
        )}
    </div>
);

const FileUpload = ({ id, label, file, onChange }) => (
    <div className="border border-dashed border-mgh-grey/40 rounded-lg p-3 hover:bg-mgh-light/20 transition-colors">
        <input type="file" id={id} className="hidden" onChange={onChange} />
        <label htmlFor={id} className="flex items-center gap-3 cursor-pointer">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${file ? 'bg-green-100 text-green-600' : 'bg-mgh-light text-mgh-grey'}`}>
                {file ? <Check size={16} /> : <Upload size={16} />}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-mgh-charcoal truncate">
                    {file ? file.name : `Upload ${label}`}
                </p>
                <p className="text-[10px] text-mgh-grey">PDF or Excel</p>
            </div>
        </label>
    </div>
);

export default SupplierBooking;
