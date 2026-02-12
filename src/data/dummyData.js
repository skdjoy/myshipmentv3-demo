export const purchaseOrders = [
  {
    poNumber: "PO-2026-44918",
    supplier: "Jiangsu Garments Co.",
    origin: "Shanghai, CN",
    items: "Men's Cotton Crew Tee (4 colors)",
    totalUnits: 25000,
    exFactory: "2026-02-20",
    status: "In Production",
    progress: 65,
    milestones: {
      poReceived: "2026-01-05",
      fabricSourced: "2026-01-12",
      cuttingStarted: "2026-01-20",
      sewingStarted: "2026-02-01",
      qcPassed: null,
      packed: null,
      shipped: null
    },
    season: "SS26",
    value: 187500,
    lineItems: [
      { sku: "SK-MC-001", style: "M-TEE-CR", color: "White", size: "M", quantity: 10000, cartonQty: 200 },
      { sku: "SK-MC-002", style: "M-TEE-CR", color: "Navy", size: "L", quantity: 8000, cartonQty: 160 },
      { sku: "SK-MC-003", style: "M-TEE-CR", color: "Black", size: "S", quantity: 7000, cartonQty: 140 }
    ]
  },
  {
    poNumber: "PO-2026-44919",
    supplier: "Pham Textiles Ltd.",
    origin: "Ho Chi Minh City, VN",
    items: "Women's Linen Blazer",
    totalUnits: 8000,
    exFactory: "2026-02-15",
    status: "QC Passed",
    progress: 85,
    milestones: {
      poReceived: "2025-12-20",
      fabricSourced: "2025-12-28",
      cuttingStarted: "2026-01-05",
      sewingStarted: "2026-01-15",
      qcPassed: "2026-02-05",
      packed: null,
      shipped: null
    },
    season: "SS26",
    value: 320000,
    lineItems: [
      { sku: "SK-WL-001", style: "W-BLZ-LN", color: "Beige", size: "38", quantity: 4000, cartonQty: 400 },
      { sku: "SK-WL-002", style: "W-BLZ-LN", color: "Olive", size: "40", quantity: 4000, cartonQty: 400 }
    ]
  },
  {
    poNumber: "PO-2026-44920",
    supplier: "BDG Knitwear",
    origin: "Dhaka, BD",
    items: "Kids Fleece Hoodie (6 sizes)",
    totalUnits: 40000,
    exFactory: "2026-03-01",
    status: "Fabric Sourced",
    progress: 30,
    milestones: {
      poReceived: "2026-01-10",
      fabricSourced: "2026-01-28",
      cuttingStarted: null,
      sewingStarted: null,
      qcPassed: null,
      shipped: null
    },
    season: "SS26",
    value: 480000,
    lineItems: [
      { sku: "SK-KH-001", style: "K-HD-FL", color: "Red", size: "6Y", quantity: 20000, cartonQty: 1000 },
      { sku: "SK-KH-002", style: "K-HD-FL", color: "Blue", size: "8Y", quantity: 20000, cartonQty: 1000 }
    ]
  },
  {
    poNumber: "PO-2026-44921",
    supplier: "Pham Textiles Ltd.",
    origin: "Ho Chi Minh City, VN",
    items: "Women's Silk Scarf Collection",
    totalUnits: 15000,
    exFactory: "2026-02-22",
    status: "Cutting Started",
    progress: 45,
    milestones: {
      poReceived: "2026-01-02",
      fabricSourced: "2026-01-15",
      cuttingStarted: "2026-02-01",
      sewingStarted: null,
      qcPassed: null,
      packed: null,
      shipped: null
    },
    season: "SS26",
    value: 225000,
    lineItems: [
      { sku: "SK-WS-001", style: "W-SCF-SL", color: "Floral", size: "One Size", quantity: 15000, cartonQty: 150 }
    ]
  },

  {
    poNumber: "PO-2025-43210",
    supplier: "Shenzen Electronics",
    origin: "Shenzhen, CN",
    items: "Smart Watch Band (3 variants)",
    totalUnits: 50000,
    exFactory: "2026-01-10",
    status: "Delivered",
    progress: 100,
    milestones: {
      poReceived: "2025-10-01",
      fabricSourced: "2025-10-10",
      cuttingStarted: "2025-10-20",
      sewingStarted: "2025-11-01",
      qcPassed: "2025-12-15",
      packed: "2025-12-20",
      shipped: "2026-01-12"
    },
    season: "SS26",
    value: 750000
  },
  {
    poNumber: "PO-2026-44950",
    supplier: "Jiangsu Garments Co.",
    origin: "Shanghai, CN",
    items: "Women's Yoga Leggings",
    totalUnits: 12000,
    exFactory: "2026-03-10",
    status: "Fabric Sourced",
    progress: 30,
    milestones: {
      poReceived: "2026-02-01",
      fabricSourced: "2026-02-10",
      cuttingStarted: null,
      sewingStarted: null,
      qcPassed: null,
      packed: null,
      shipped: null
    },
    season: "SS26",
    value: 120000,
    lineItems: [
      { sku: "SK-YL-001", style: "W-LEG-YG", color: "Black", size: "S", quantity: 4000, cartonQty: 200 },
      { sku: "SK-YL-002", style: "W-LEG-YG", color: "Black", size: "M", quantity: 4000, cartonQty: 200 },
      { sku: "SK-YL-003", style: "W-LEG-YG", color: "Black", size: "L", quantity: 4000, cartonQty: 200 }
    ]
  },
  {
    poNumber: "PO-2026-44951",
    supplier: "Jiangsu Garments Co.",
    origin: "Shanghai, CN",
    items: "Men's Performance Shorts",
    totalUnits: 15000,
    exFactory: "2026-03-15",
    status: "PO Received",
    progress: 10,
    milestones: {
      poReceived: "2026-02-05",
      fabricSourced: null,
      cuttingStarted: null,
      sewingStarted: null,
      qcPassed: null,
      packed: null,
      shipped: null
    },
    season: "SS26",
    value: 135000,
    lineItems: [
      { sku: "SK-MS-001", style: "M-SH-PF", color: "Grey", size: "M", quantity: 5000, cartonQty: 250 },
      { sku: "SK-MS-002", style: "M-SH-PF", color: "Grey", size: "L", quantity: 5000, cartonQty: 250 },
      { sku: "SK-MS-003", style: "M-SH-PF", color: "Navy", size: "M", quantity: 5000, cartonQty: 250 }
    ]
  },
  {
    poNumber: "PO-2026-44952",
    supplier: "Jiangsu Garments Co.",
    origin: "Shanghai, CN",
    items: "Kids' Graphic Tees",
    totalUnits: 20000,
    exFactory: "2026-03-20",
    status: "PO Received",
    progress: 5,
    milestones: {
      poReceived: "2026-02-08",
      fabricSourced: null,
      cuttingStarted: null,
      sewingStarted: null,
      qcPassed: null,
      packed: null,
      shipped: null
    },
    season: "SS26",
    value: 100000,
    lineItems: [
      { sku: "SK-KT-001", style: "K-TEE-GR", color: "White", size: "4Y", quantity: 5000, cartonQty: 250 },
      { sku: "SK-KT-002", style: "K-TEE-GR", color: "Blue", size: "6Y", quantity: 5000, cartonQty: 250 },
      { sku: "SK-KT-003", style: "K-TEE-GR", color: "Red", size: "8Y", quantity: 5000, cartonQty: 250 },
      { sku: "SK-KT-004", style: "K-TEE-GR", color: "Green", size: "10Y", quantity: 5000, cartonQty: 250 }
    ]
  }
];

export const shipments = [
  {
    id: "SHP-2026-00891",
    bookingRef: "BK-2024-8801",
    container: "MSCU7294561",
    vessel: "MSC Olivia",
    carrier: "MSC",
    origin: "Shanghai",
    destination: "Rotterdam",
    departure: "2026-01-28",
    carrierETA: "2026-02-25",
    mghPredictedETA: "2026-03-02",
    status: "In Transit",
    exception: "DELAYED — Suez Canal congestion",
    containers: 3,
    teus: 6,
    weight: "42,800 kg",
    po: "PO-2025-43205",
    commodity: "Men's Down Jacket",
    units: 12000
  },
  {
    id: "SHP-2026-00847",
    bookingRef: "BK-2024-8756",
    container: "TCLU9087234",
    vessel: "Maersk Elba",
    carrier: "Maersk",
    origin: "Ho Chi Minh City",
    destination: "Los Angeles",
    departure: "2026-02-01",
    carrierETA: "2026-02-18",
    mghPredictedETA: "2026-02-18",
    status: "In Transit",
    exception: null,
    containers: 2,
    teus: 4,
    weight: "28,100 kg",
    po: "PO-2026-44919",
    commodity: "Women's Linen Blazer",
    units: 8000
  },
  {
    id: "SHP-2026-00903",
    bookingRef: "BK-2024-8812",
    container: "CMAU4521890",
    vessel: "COSCO Shipping Leo",
    carrier: "COSCO",
    origin: "Dhaka",
    destination: "Hamburg",
    departure: "2026-02-10",
    carrierETA: "2026-03-14",
    mghPredictedETA: "2026-03-16",
    status: "At Origin",
    exception: "WARNING — Pending ISF filing",
    containers: 1,
    teus: 2,
    weight: "18,400 kg",
    po: "PO-2026-44920",
    commodity: "Kids Fleece Hoodie",
    units: 15000
  },
  {
    id: "SHP-2026-00778",
    bookingRef: "BK-2024-8690",
    container: "HLCU2034567",
    vessel: "Hapag-Lloyd Berlin Express",
    carrier: "Hapag-Lloyd",
    origin: "Mumbai",
    destination: "New York",
    departure: "2026-01-15",
    carrierETA: "2026-02-08",
    mghPredictedETA: "2026-02-08",
    status: "Customs",
    exception: null,
    containers: 1,
    teus: 2,
    weight: "15,600 kg",
    po: "PO-2025-43190",
    commodity: "Cotton Bedding Set",
    units: 5000
  },
  {
    id: "SHP-2026-00812",
    bookingRef: "BK-2024-8721",
    container: "EGLV3456789",
    vessel: "Evergreen Ever Ace",
    carrier: "Evergreen",
    origin: "Shanghai",
    destination: "Felixstowe",
    departure: "2026-01-22",
    carrierETA: "2026-02-20",
    mghPredictedETA: "2026-02-24",
    status: "In Transit",
    exception: "DELAYED — Port congestion at Felixstowe",
    containers: 4,
    teus: 8,
    weight: "55,200 kg",
    po: "PO-2025-43198",
    commodity: "Seasonal Footwear Collection",
    units: 20000
  }
];

export const documents = [
  { name: "Bill of Lading — MSCU7294561", type: "B/L", shipment: "SHP-2026-00891", date: "2026-01-28", status: "Final", aiExtracted: true },
  { name: "Commercial Invoice — PO-2026-44919", type: "Invoice", shipment: "SHP-2026-00847", date: "2026-02-01", status: "Draft — Pending Review", aiExtracted: false },
  { name: "Packing List — BK-2024-8756", type: "Packing", shipment: "SHP-2026-00847", date: "2026-02-01", status: "Final", aiExtracted: true },
  { name: "Certificate of Origin — PO-2026-44918", type: "Certificate", shipment: null, date: "2026-02-05", status: "Pending Supplier Upload", aiExtracted: false },
  { name: "ISF Filing — BK-2024-8812", type: "Customs", shipment: "SHP-2026-00903", date: null, status: "OVERDUE — Due in 48hrs", aiExtracted: false },
  { name: "Phytosanitary Certificate — MSCU7294561", type: "Certificate", shipment: "SHP-2026-00891", date: null, status: "MISSING — Customs Hold", aiExtracted: false },
];

export const invoices = [
  { id: "INV-2026-0891", amount: 127400, status: "Auto-Approved", matchRate: "100%", dueDate: "2026-02-28", carrier: "MSC", approved: true },
  { id: "INV-2026-0847", amount: 84200, status: "Auto-Approved", matchRate: "100%", dueDate: "2026-03-05", carrier: "Maersk", approved: true },
  { id: "INV-2026-0812", amount: 212800, status: "Discrepancy Flagged", matchRate: "94%", dueDate: "2026-02-20", carrier: "Evergreen", approved: false, discrepancy: "Unquoted detention charge of $1,200" },
  { id: "INV-2026-0778", amount: 45600, status: "Pending Review", matchRate: "—", dueDate: "2026-03-10", carrier: "Hapag-Lloyd", approved: false },
  { id: "INV-2026-0903", amount: 38900, status: "Auto-Approved", matchRate: "100%", dueDate: "2026-03-15", carrier: "COSCO", approved: true },
];

export const spendData = [
  { month: "Sep", ocean: 2800000, air: 420000, truck: 180000 },
  { month: "Oct", ocean: 3100000, air: 510000, truck: 195000 },
  { month: "Nov", ocean: 3400000, air: 890000, truck: 210000 },
  { month: "Dec", ocean: 2900000, air: 1200000, truck: 240000 },
  { month: "Jan", ocean: 3200000, air: 680000, truck: 220000 },
  { month: "Feb", ocean: 2100000, air: 390000, truck: 160000 },
];

export const carrierPerformance = [
  { week: "W1", maersk: 96, msc: 91, cosco: 88, hapagLloyd: 94 },
  { week: "W2", maersk: 95, msc: 89, cosco: 90, hapagLloyd: 92 },
  { week: "W3", maersk: 94, msc: 92, cosco: 85, hapagLloyd: 93 },
  { week: "W4", maersk: 97, msc: 90, cosco: 87, hapagLloyd: 95 },
  { week: "W5", maersk: 93, msc: 88, cosco: 91, hapagLloyd: 94 },
  { week: "W6", maersk: 96, msc: 93, cosco: 89, hapagLloyd: 96 },
];

export const emissionsData = [
  { lane: "SHA→RTD", co2: 1840, shipments: 247 },
  { lane: "HCM→LAX", co2: 1120, shipments: 134 },
  { lane: "DAC→HAM", co2: 890, shipments: 89 },
  { lane: "BOM→NYC", co2: 520, shipments: 42 },
  { lane: "JKT→FXT", co2: 521, shipments: 67 },
];

export const modeEmissions = [
  { mode: "Ocean", value: 3200, color: "#34328F" },
  { mode: "Air", value: 1400, color: "#EF4444" },
  { mode: "Road", value: 291, color: "#F59E0B" },
];

export const landedCost = [
  { component: "FOB Product Cost", perUnit: 38.50, total: 308000, color: "#34328F" },
  { component: "Ocean Freight", perUnit: 1.05, total: 8400, color: "#082567" },
  { component: "Origin Handling (MGH)", perUnit: 0.22, total: 1760, color: "#00D4FF" },
  { component: "Customs Duty (12%)", perUnit: 4.62, total: 36960, color: "#F59E0B" },
  { component: "Insurance", perUnit: 0.08, total: 640, color: "#B2B8BF" },
  { component: "Destination Drayage", perUnit: 0.35, total: 2800, color: "#2A2A38" },
];

export const tradeLanes = [
  { from: "Shanghai", to: "Rotterdam", shipments: 247, onTime: 96, avgTransit: 28, status: "green" },
  { from: "HCMC", to: "Los Angeles", shipments: 134, onTime: 91, avgTransit: 22, status: "amber" },
  { from: "Dhaka", to: "Hamburg", shipments: 89, onTime: 88, avgTransit: 32, status: "amber" },
  { from: "Mumbai", to: "New York", shipments: 42, onTime: 97, avgTransit: 26, status: "green" },
  { from: "Jakarta", to: "Felixstowe", shipments: 67, onTime: 79, avgTransit: 35, status: "red" },
];

export const exceptions = [
  {
    priority: "critical",
    title: 'Vessel "MSC Olivia" delayed 6 days at Suez Canal',
    details: "Affects: 12 containers · 3 POs · Est. value $2.1M",
    actions: ["View Details", "See AI Recommendations"]
  },
  {
    priority: "critical",
    title: "Customs hold on container MSCU7294561 at Rotterdam",
    details: "Reason: Missing phytosanitary certificate",
    actions: ["Upload Document", "Contact Customs Broker"]
  },
  {
    priority: "warning",
    title: "ISF filing deadline in 48hrs for 5 US-bound shipments",
    details: "Booking refs: BK-2024-8812 through BK-2024-8816",
    actions: ["File Now"]
  },
  {
    priority: "warning",
    title: 'Supplier "Pham Textiles" CRD slipped 4 days on PO-44921',
    details: "New CRD: Feb 18 → Feb 22 · Impacts season launch",
    actions: ["Acknowledge", "Escalate to Buyer"]
  },
  {
    priority: "info",
    title: "3 bookings pending your approval",
    details: "Total value: $127,400 · Submitted by: Transport Planning Team",
    actions: ["Review & Approve"]
  }
];

export const chatResponses = [
  {
    keywords: ["status", "SHP-", "PO-", "where is", "track", "SHP-2026-00891"],
    response: {
      type: "text_with_card",
      text: "Here's the latest on shipment SHP-2026-00891:",
      card: {
        title: "SHP-2026-00891 — MSC Olivia",
        fields: [
          { label: "Status", value: "In Transit", badge: "warning" },
          { label: "Container", value: "MSCU7294561" },
          { label: "Route", value: "Shanghai → Rotterdam" },
          { label: "Departed", value: "Jan 28, 2026" },
          { label: "Carrier ETA", value: "Feb 25, 2026" },
          { label: "MGH AI ETA", value: "Mar 2, 2026", highlight: true },
          { label: "Linked PO", value: "PO-2025-43205" },
          { label: "Commodity", value: "Men's Down Jacket — 12,000 units" }
        ],
        alert: "This shipment is experiencing a 5-day delay due to Suez Canal congestion. 48 vessels currently in queue."
      }
    }
  },
  {
    keywords: ["TAT", "turnaround", "transit time", "average time", "Shanghai to Rotterdam"],
    response: {
      type: "text_with_chart",
      text: "Here's the transit time analysis for Shanghai → Rotterdam (Q1 2026):",
      summary: "The average door-to-door TAT this quarter is **31.4 days**, which is 2.1 days longer than Q4 2025 (29.3 days). The increase is primarily due to Suez Canal congestion in January-February.",
      chart: {
        type: "bar",
        data: [
          { month: "Oct 25", tat: 28.5 },
          { month: "Nov 25", tat: 29.1 },
          { month: "Dec 25", tat: 30.2 },
          { month: "Jan 26", tat: 32.8 },
          { month: "Feb 26", tat: 30.1 }
        ],
        xKey: "month",
        yKey: "tat",
        yLabel: "Days",
        color: "#34328F"
      },
      breakdown: "Breakdown: Origin handling 3.2 days | Ocean transit 24.8 days | Destination clearance 3.4 days"
    }
  },
  {
    keywords: ["delay", "anticipated delay", "late", "behind schedule", "PO-2026-44918"],
    response: {
      type: "text_with_card",
      text: "I've analyzed PO-2026-44918 (Jiangsu Garments Co. — Men's Cotton Crew Tee). Here's my assessment:",
      card: {
        title: "PO-2026-44918 — Delay Risk Analysis",
        fields: [
          { label: "Current Status", value: "In Production (65% complete)" },
          { label: "Ex-Factory Date", value: "Feb 20, 2026" },
          { label: "Projected Completion", value: "Feb 24, 2026", highlight: true },
          { label: "Delay Risk", value: "MEDIUM — 4 days", badge: "warning" },
          { label: "Root Cause", value: "QC bottleneck at sewing stage; factory running at 112% capacity" },
          { label: "Impact", value: "May miss vessel MSC Clara (ETD Feb 26). Next available: Mar 2 (+4 days)" }
        ],
        alert: "Recommended Action: Request supplier to prioritize this PO for overtime production. Estimated overtime cost: $2,400. This would recover 3 of the 4 delay days."
      }
    }
  },
  {
    keywords: ["at risk", "exception", "risk", "Chittagong", "which shipments"],
    response: {
      type: "text_with_table",
      text: "I found 3 shipments originating from Chittagong (CGP) with active risk flags:",
      table: {
        headers: ["Shipment", "Vessel", "ETA", "Risk", "Issue"],
        rows: [
          ["SHP-2026-00903", "COSCO Shipping Leo", "Mar 16 (+2d)", "HIGH", "Port congestion + pending ISF"],
          ["SHP-2026-00945", "Wan Hai 512", "Mar 22", "MEDIUM", "Vessel schedule change, 1 transshipment added"],
          ["SHP-2026-00961", "Maersk Seletar", "Mar 28", "MEDIUM", "Factory CRD slipped 3 days, may miss cutoff"]
        ]
      },
      followUp: "Would you like me to show recommended actions for each?"
    }
  },
  {
    keywords: ["container utilization", "optimization", "compare", "utilization"],
    response: {
      type: "text_with_chart",
      text: "Here's the container utilization comparison across your top 3 trade lanes for Q1 2026:",
      chart: {
        type: "grouped_bar",
        data: [
          { lane: "SHA→RTD", currentUtil: 89, targetUtil: 92, lastQuarter: 85 },
          { lane: "HCM→LAX", currentUtil: 94, targetUtil: 92, lastQuarter: 91 },
          { lane: "DAC→HAM", currentUtil: 78, targetUtil: 92, lastQuarter: 82 }
        ],
        bars: [
          { key: "currentUtil", label: "Current Q1", color: "#34328F" },
          { key: "targetUtil", label: "Target", color: "#00D4FF" },
          { key: "lastQuarter", label: "Last Quarter", color: "#B2B8BF" }
        ],
        xKey: "lane",
        yLabel: "Utilization %"
      },
      summary: "**Key Insights:**\n\nHCM→LAX is exceeding target at 94% (+2% above target) — excellent consolidation by origin team\n\nSHA→RTD improved from 85% to 89% but still 3% below target\n\nDAC→HAM dropped from 82% to 78% — investigate. Potential savings: ~$34,000/month if brought to target",
      followUp: "Would you like me to drill into the Dhaka-Hamburg lane to identify specific consolidation opportunities?"
    }
  },
  {
    keywords: ["on-time", "delivery performance", "this month vs", "OTD", "performance comparison"],
    response: {
      type: "text_with_chart",
      text: "Here's your on-time delivery performance breakdown:",
      chart: {
        type: "grouped_bar",
        data: [
          { carrier: "Maersk", thisMonth: 96, lastMonth: 93 },
          { carrier: "MSC", thisMonth: 91, lastMonth: 88 },
          { carrier: "COSCO", thisMonth: 85, lastMonth: 90 },
          { carrier: "Hapag-Lloyd", thisMonth: 94, lastMonth: 92 },
          { carrier: "Evergreen", thisMonth: 79, lastMonth: 86 }
        ],
        bars: [
          { key: "thisMonth", label: "Feb 2026", color: "#34328F" },
          { key: "lastMonth", label: "Jan 2026", color: "#B2B8BF" }
        ],
        xKey: "carrier",
        yLabel: "OTD %"
      },
      summary: "**Overall OTD: 94.2%** (up 2.1% from January's 92.1%)\n\n**Best Performer:** Maersk at 96% (+3% improvement)\n\n**Biggest Concern:** Evergreen dropped to 79% (-7%) — related to Felixstowe port congestion affecting 4 shipments\n\n**COSCO** also declined 5% — Suez Canal delays are the primary cause\n\nRecommendation: Consider routing 2 upcoming Evergreen bookings to Maersk for the Felixstowe lane until congestion clears."
    }
  }
];

export const suggestedQuestions = [
  {
    icon: "Ship",
    label: "Shipment Status",
    query: "What is the current status of shipment SHP-2026-00891?"
  },
  {
    icon: "Clock",
    label: "Turnaround Time",
    query: "What is the average TAT for the Shanghai to Rotterdam lane this quarter?"
  },
  {
    icon: "AlertTriangle",
    label: "Delay Alerts",
    query: "Are there any anticipated delays on PO-2026-44918?"
  },
  {
    icon: "AlertCircle",
    label: "At-Risk Shipments",
    query: "Which shipments from POL Chittagong are currently at risk?"
  },
  {
    icon: "BarChart3",
    label: "Container Optimization",
    query: "Compare container utilization rates across our top 3 trade lanes"
  },
  {
    icon: "TrendingUp",
    label: "KPI Summary",
    query: "Show me on-time delivery performance comparison: this month vs last month"
  }
];
