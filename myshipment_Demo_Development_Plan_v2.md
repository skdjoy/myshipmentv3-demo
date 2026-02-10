# MGH Group — myshipment Portal: Demo Build Specification

## Purpose of This Document

This is a complete development specification for building a **demo/presentation version** of MGH Group's **"myshipment"** buyer logistics portal. It is intended to be fed directly to an AI coding assistant (e.g., Claude, Cursor, Copilot) to produce a fully functional, visually polished, single-page React application suitable for presenting to senior management. All data is dummy/hardcoded. No backend is required.

---

## 1. PROJECT OVERVIEW

### What We're Building
A **React-based interactive demo portal** called **"myshipment"** — MGH Group's next-generation buyer-facing supply chain visibility and management platform. This demo showcases the key capabilities described in MGH's digital transformation roadmap, using realistic dummy data for a fictional client ("Inditex" as the logged-in buyer).

### Demo Objective
Convince management that this portal will:
- Differentiate MGH from competitors (Flexport, Forto, Maersk, DHL)
- Shift MGH's value proposition from "freight forwarder" to "supply chain orchestrator"
- Provide end-to-end visibility from factory floor to store door ("Glass Pipeline")
- Offer AI-powered insights via the "Ask MGH" chatbot

### Tech Stack
- **React** (single `.jsx` file with default export)
- **Tailwind CSS** (utility classes only — no compiler, use pre-defined classes)
- **Recharts** for charts (`import { LineChart, BarChart, PieChart, ... } from "recharts"`)
- **Lucide React** for icons (`import { Ship, Package, Globe, ... } from "lucide-react"`)
- **No external API calls** — all data is hardcoded
- **No localStorage/sessionStorage** — use React state only

---

## 2. DESIGN DIRECTION — BASED ON OFFICIAL MGH BRAND GUIDELINE

**CRITICAL: The design MUST follow MGH's official brand guideline. Every color, font, and icon choice below is derived from the brand book. Do not deviate.**

### Color Palette (Exact Brand Colors)

**Primary Colors (60% usage — dominant across the UI):**
| Role | HEX | RGB | Usage |
|------|-----|-----|-------|
| **MGH Blue** (Primary) | `#34328F` | 52, 50, 143 | Sidebar background, headings, primary buttons, active states, icon color. This is THE brand color. |
| **MGH Dark Navy** | `#082567` | 8, 37, 103 | Secondary dark backgrounds, hover states, deep accents |

**Secondary Colors (30% usage — contrast and structure):**
| Role | HEX | RGB | Usage |
|------|-----|-----|-------|
| **White** | `#FFFFFF` | 255, 255, 255 | Card backgrounds, text on dark backgrounds, primary contrast color |
| **Light Grey** | `#F4F4F4` | 244, 244, 244 | Page background, surface color for content areas |
| **Medium Grey** | `#B2B8BF` | 178, 184, 191 | Borders, dividers, secondary text, disabled states, the three lines in the logo |
| **Charcoal** | `#2A2A38` | 42, 42, 56 | Body text on light backgrounds |

**Accent Colors (10% usage — sparingly for emphasis):**
| Role | HEX | RGB | Usage |
|------|-----|-----|-------|
| **Cyan** | `#00D4FF` | 0, 212, 255 | Accent highlights, active indicators, links, data visualization accent, notification badges |
| **Green** | `#27B373` | 39, 179, 115 | **Sustainability section ONLY** — charts, badges, and CTAs within the Sustainability view. Do NOT use elsewhere. |

**Semantic Colors (for status indicators only — not brand colors):**
| Role | HEX | Usage |
|------|-----|-------|
| Warning Amber | `#F59E0B` | Warning badges, at-risk status |
| Danger Red | `#EF4444` | Critical alerts, overdue items, error states |
| Success Green | `#22C55E` | On-time status, approved items, success toasts |

**Brand Gradients (for decorative/header elements only):**
Use these gradient combinations from the brand book for decorative panels, hero sections, or the sidebar header:
- `#34328F` → `#082567` (Blue to Dark Navy)
- `#34328F` → `#00D4FF` (Blue to Cyan)
- `#34328F` → `#B2B8BF` (Blue to Grey)
- `#B2B8BF` → `#F4F4F4` (Grey to Light — subtle surface gradients)

```css
/* CSS variable definitions */
:root {
  --mgh-blue: #34328F;
  --mgh-dark-navy: #082567;
  --mgh-grey: #B2B8BF;
  --mgh-charcoal: #2A2A38;
  --mgh-light-grey: #F4F4F4;
  --mgh-cyan: #00D4FF;
  --mgh-green: #27B373;  /* sustainability only */
  --mgh-white: #FFFFFF;
}
```

### Typography

The MGH brand uses **Thunder Semi Bold LC** for headlines and **D-DIN Condensed** for subheadings/body. Since these are custom fonts not available on Google Fonts CDN, use the closest web-safe alternatives:

| Brand Font | Web Alternative | Google Fonts Import | Usage |
|---|---|---|---|
| **Thunder Semi Bold LC** (H1/H2, all caps) | **Oswald SemiBold** | `Oswald:wght@600` | Section headings, page titles, KPI labels. Always **UPPERCASE**. |
| **D-DIN Condensed Bold** (Subheadings) | **Barlow Condensed Bold** | `Barlow+Condensed:wght@700` | Subheadings, table headers, navigation labels. UPPERCASE. |
| **D-DIN Condensed Regular** (Body) | **Barlow Condensed Regular** | `Barlow+Condensed:wght@400` | Body text, table data, descriptions, form labels. Normal case. |
| KPI/Data numbers | **Space Mono** | `Space+Mono:wght@400;700` | Large KPI values, monetary figures, percentages — for data emphasis. |

```html
<style>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@600&family=Barlow+Condensed:wght@400;700&family=Space+Mono:wght@400;700&display=swap');
</style>
```

**Font sizing hierarchy (brand guideline recommends 15pt gaps):**
- Page title (H1): 28-32px, Oswald SemiBold, UPPERCASE, color `#34328F`
- Section heading (H2): 20-24px, Oswald SemiBold, UPPERCASE, color `#34328F`
- Subheading: 16-18px, Barlow Condensed Bold, UPPERCASE, color `#2A2A38`
- Body: 14-15px, Barlow Condensed Regular, normal case, color `#2A2A38`
- Small/Caption: 12px, Barlow Condensed Regular, color `#B2B8BF`
- KPI Values: 28-36px, Space Mono Bold, color `#34328F` or `#FFFFFF` on dark

### MGH Logo (SVG Implementation)

The MGH logo consists of bold uppercase "MGH" text with **three horizontal parallel lines** extending from the left edge of the "M". The lines are grey (`#B2B8BF`) and the text is MGH Blue (`#34328F`) on light backgrounds, or all white (`#FFFFFF`) on dark backgrounds.

**Implement the logo as an inline SVG component:**
```jsx
const MGHLogo = ({ variant = "blue", size = 32 }) => {
  const textColor = variant === "white" ? "#FFFFFF" : "#34328F";
  const lineColor = variant === "white" ? "#FFFFFF" : "#B2B8BF";
  // Three horizontal lines to the LEFT of bold "MGH" text
  // Lines should be evenly spaced, aligned to the vertical center of the text
  // The lines extend about 72% of the text height to the left
  return (
    <svg>
      {/* Three horizontal lines */}
      <line stroke={lineColor} strokeWidth={2} ... />
      <line stroke={lineColor} strokeWidth={2} ... />
      <line stroke={lineColor} strokeWidth={2} ... />
      {/* Bold "MGH" text - use Oswald or a bold condensed font */}
      <text fill={textColor} fontFamily="Oswald, sans-serif" fontWeight="600">MGH</text>
    </svg>
  );
};
```

**Logo usage rules:**
- On the sidebar (dark `#34328F` background) → use **white** variant
- On the main content area (light `#F4F4F4` background) → use **blue & grey** variant
- Always maintain clear space around the logo equal to the height of the "G" character
- Never alter, rotate, stretch, or recolor the logo

### Iconography Rules (Brand Guideline)

**CRITICAL: Follow the brand book's icon rules strictly.**
- ✅ **Use outline-style icons ONLY** (not filled/solid)
- ✅ Use **straight corners** (set `strokeLinecap="square"` and `strokeLinejoin="miter"` where possible)
- ✅ Maintain consistent stroke weight (2px recommended)
- ✅ Default icon color: `#34328F` (MGH Blue) on light backgrounds, `#FFFFFF` on dark
- ❌ Do NOT use filled/solid icon variants
- ❌ Do NOT use rounded corner icons unless absolutely necessary
- ❌ Do NOT use colors other than MGH Blue for icons (except white on dark backgrounds)

Lucide React icons default to outline style which is compliant. Set `strokeWidth={2}` consistently.

### Layout
- **Sidebar navigation** (collapsible) with `#34328F` (MGH Blue) background and white text/icons
- **Main content area** with `#F4F4F4` (Light Grey) background
- **Cards** on `#FFFFFF` with subtle border `#B2B8BF` at 20% opacity or `shadow-sm`
- Dense but breathable. No wasted space.

### Branding
- Company name: **MGH** (with the three-line logo)
- Platform name: **myshipment** (always lowercase, one word)
- The sidebar header should show the MGH logo (white variant) with "myshipment" written below or beside it in Barlow Condensed Regular, white, lowercase
- Tagline (optional, for hero areas): "From Factory Floor to Store Door"

---

## 3. APPLICATION STRUCTURE

### Navigation (Left Sidebar)
The sidebar should have these navigation items, each leading to a different view. Use React `useState` to manage the active view. The sidebar background is `#34328F` (MGH Blue). Active item has a `#082567` (Dark Navy) background or a left border accent in `#00D4FF` (Cyan). Icons and text are white.

```
📊  Dashboard          (default view)
📦  Purchase Orders
🚢  Shipment Tracker
📋  Booking Engine
📄  Documents
💰  Finance
🌱  Sustainability
🤖  Ask MGH            ← NEW: AI Chatbot page
⚙️  Settings           (non-functional, just a placeholder)
```

Use these Lucide icons (outline style, strokeWidth={2}):
- Dashboard: `LayoutDashboard`
- Purchase Orders: `Package`
- Shipment Tracker: `Ship`
- Booking Engine: `ClipboardList`
- Documents: `FileText`
- Finance: `DollarSign`
- Sustainability: `Leaf`
- Ask MGH: `MessageSquare` or `Bot`
- Settings: `Settings`

### Top Bar
- Left: MGH logo (blue & grey variant on light background) + "**myshipment**" in Barlow Condensed Regular, `#34328F`
- Center: Global search bar (non-functional, styled input with `Search` icon). Border color `#B2B8BF`, focus ring `#34328F`
- Right: Notification bell (`Bell` icon in `#34328F`) with cyan badge showing "3", User avatar circle with "IA" initials (background `#34328F`, text white), dropdown showing "Inditex Group — Western Region" in `#2A2A38`

---

## 4. VIEW-BY-VIEW SPECIFICATION WITH DUMMY DATA

---

### VIEW 1: DASHBOARD ("Morning Coffee" Control Tower)

This is the hero view. It must impress immediately. It gives a logistics director a 5-minute overview of their entire supply chain.

#### Row 1: KPI Summary Cards (4 cards in a row)
| KPI | Value | Trend | Sub-text |
|-----|-------|-------|----------|
| Active Shipments | 1,247 | ↑ 12% vs last month | 842 Ocean · 289 Air · 116 Truck |
| On-Time Delivery | 94.2% | ↑ 2.1% vs last month | Target: 95% |
| POs in Transit | 3,891 | — | Worth $48.2M retail value |
| Exceptions Active | 23 | ↓ 8 vs last week | 5 Critical · 11 Warning · 7 Info |

Each card should have:
- Large bold number in **Space Mono Bold**, color `#34328F`
- Trend arrow with color (green `#22C55E` up, red `#EF4444` down)
- Lucide outline icon on the left, color `#34328F`
- Subtle left-border accent in `#00D4FF` (Cyan)
- Card background `#FFFFFF`, heading label in Barlow Condensed Bold UPPERCASE `#2A2A38`

#### Row 2: Two columns

**Left Column (60% width): Global Shipment Map**
Since we can't use a real map library, create a **stylized world map visualization** using an SVG or a simplified representation:
- Show a dark `#082567` rectangle representing the world
- Plot 6-8 animated dots/circles representing shipment clusters at key locations
- Use colored dots: Green `#22C55E` (on-time), Amber `#F59E0B` (at risk), Red `#EF4444` (delayed)
- Show curved animated lines (trade lanes) in `#00D4FF` connecting:
  - Shanghai → Rotterdam (thick line, label: "247 shipments")
  - Ho Chi Minh → Los Angeles (medium line, label: "134 shipments")
  - Dhaka → Hamburg (medium line, label: "89 shipments")
  - Mumbai → New York (thin line, label: "42 shipments")
- Include a simple legend at the bottom

**Alternative approach if SVG map is too complex:** Create a **Trade Lane Table** with status indicators instead:
| Trade Lane | Active Shipments | On-Time % | Avg Transit | Status |
|---|---|---|---|---|
| Shanghai → Rotterdam | 247 | 96% | 28 days | 🟢 |
| HCMC → Los Angeles | 134 | 91% | 22 days | 🟡 |
| Dhaka → Hamburg | 89 | 88% | 32 days | 🟡 |
| Mumbai → New York | 42 | 97% | 26 days | 🟢 |
| Jakarta → Felixstowe | 67 | 79% | 35 days | 🔴 |

**Right Column (40% width): Action Items / Exceptions Ticker**
A scrollable list of action items requiring attention. Each item has an icon, priority badge, and action button.

```
🔴 CRITICAL — Vessel "MSC Olivia" delayed 6 days at Suez Canal
   Affects: 12 containers · 3 POs · Est. value $2.1M
   [View Details] [See AI Recommendations]

🔴 CRITICAL — Customs hold on container MSCU7294561 at Rotterdam
   Reason: Missing phytosanitary certificate
   [Upload Document] [Contact Customs Broker]

🟡 WARNING — ISF filing deadline in 48hrs for 5 US-bound shipments
   Booking refs: BK-2024-8812 through BK-2024-8816
   [File Now]

🟡 WARNING — Supplier "Pham Textiles" CRD slipped 4 days on PO-44921
   New CRD: Feb 18 → Feb 22 · Impacts season launch
   [Acknowledge] [Escalate to Buyer]

🟢 INFO — 3 bookings pending your approval
   Total value: $127,400 · Submitted by: Transport Planning Team
   [Review & Approve]
```

Priority badges: CRITICAL = `#EF4444` background, WARNING = `#F59E0B`, INFO = `#00D4FF`

#### Row 3: Two charts side by side

**Left: Freight Spend (Last 6 Months) — Bar Chart using Recharts**
```javascript
const spendData = [
  { month: "Sep", ocean: 2800000, air: 420000, truck: 180000 },
  { month: "Oct", ocean: 3100000, air: 510000, truck: 195000 },
  { month: "Nov", ocean: 3400000, air: 890000, truck: 210000 },
  { month: "Dec", ocean: 2900000, air: 1200000, truck: 240000 },
  { month: "Jan", ocean: 3200000, air: 680000, truck: 220000 },
  { month: "Feb", ocean: 2100000, air: 390000, truck: 160000 },
];
```
Stacked bar chart. Format Y-axis as "$X.XM". Colors: Ocean=`#34328F`, Air=`#00D4FF`, Truck=`#F59E0B`.

**Right: On-Time Performance by Carrier — Line Chart using Recharts**
```javascript
const carrierPerformance = [
  { week: "W1", maersk: 96, msc: 91, cosco: 88, hapagLloyd: 94 },
  { week: "W2", maersk: 95, msc: 89, cosco: 90, hapagLloyd: 92 },
  { week: "W3", maersk: 94, msc: 92, cosco: 85, hapagLloyd: 93 },
  { week: "W4", maersk: 97, msc: 90, cosco: 87, hapagLloyd: 95 },
  { week: "W5", maersk: 93, msc: 88, cosco: 91, hapagLloyd: 94 },
  { week: "W6", maersk: 96, msc: 93, cosco: 89, hapagLloyd: 96 },
];
```
Multi-line chart. Colors: Maersk=`#34328F`, MSC=`#082567`, COSCO=`#00D4FF`, Hapag=`#B2B8BF`. Y-axis: 80-100%.

---

### VIEW 2: PURCHASE ORDERS

This view demonstrates MGH's USP — upstream PO visibility that competitors lack.

#### Top: Filter Bar
Row of filter pills/dropdowns (all functional with React state):
- Status: `All | Open | In Production | Ready to Ship | In Transit | Delivered`
- Supplier: `All | Pham Textiles | Jiangsu Garments | BDG Knitwear | Shenzen Electronics`
- Season: `All | SS26 | AW25 | SS25`

Active filter pill: background `#34328F`, text white. Inactive: background `#FFFFFF`, border `#B2B8BF`, text `#2A2A38`.

#### PO Table
Columns: PO Number, Supplier, Origin, Items, Total Units, Ex-Factory Date, Status, Shipping Progress

```javascript
const purchaseOrders = [
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
    value: 187500
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
    value: 320000
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
      packed: null,
      shipped: null
    },
    season: "SS26",
    value: 480000
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
    value: 225000
  },
  {
    poNumber: "PO-2025-43205",
    supplier: "Jiangsu Garments Co.",
    origin: "Shanghai, CN",
    items: "Men's Down Jacket",
    totalUnits: 12000,
    exFactory: "2025-12-01",
    status: "In Transit",
    progress: 95,
    milestones: {
      poReceived: "2025-09-15",
      fabricSourced: "2025-09-25",
      cuttingStarted: "2025-10-05",
      sewingStarted: "2025-10-20",
      qcPassed: "2025-11-15",
      packed: "2025-11-20",
      shipped: "2025-12-03"
    },
    season: "AW25",
    value: 540000
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
  }
];
```

#### PO Detail Expansion (when clicking a row)
When a PO row is clicked, expand to show:
1. **Visual Milestone Tracker** — A horizontal stepper/progress bar showing: PO Received → Fabric Sourced → Cutting → Sewing → QC Passed → Packed → Shipped. Completed steps: `#34328F` fill. Current step: pulsing `#00D4FF` glow. Future steps: `#B2B8BF` grey.
2. **Split Shipment Info** (if applicable): "This PO is shipping in 2 consignments: 15,000 units on BK-2024-8801 (Feb 20) and 10,000 units on BK-2024-8805 (Feb 25)"
3. **Vendor Scorecard Mini** — Small badges: "Booking Accuracy: 96%" · "Doc Timeliness: 88%" · "CRD Adherence: 91%"

---

### VIEW 3: SHIPMENT TRACKER (Global Control Tower)

#### Top: Status Summary Chips
Clickable filter chips showing counts. Active: `#34328F` bg, white text. Inactive: `#FFFFFF` bg, `#2A2A38` text, border `#B2B8BF`.
`All (1,247) | In Transit (892) | At Origin (198) | Customs (47) | Delivered (94) | Exception (16)`

#### Shipment Table
```javascript
const shipments = [
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
```

#### Shipment Detail Expansion
When a shipment row is clicked, expand to show:

1. **Tracking Timeline** — Vertical timeline with completed/pending milestones. Completed dot: `#34328F`. Active: `#00D4FF` pulsing. Pending: `#B2B8BF`.
   - ✅ Booking Confirmed — Jan 20
   - ✅ Cargo Received at Origin Warehouse — Jan 25
   - ✅ Customs Cleared (Origin) — Jan 27
   - ✅ Vessel Departed Shanghai — Jan 28
   - ⏳ In Transit (Day 12 of 28)
   - ⬜ Arrive Rotterdam — Carrier ETA: Feb 25 | **MGH AI ETA: Mar 2** ⚠️
   - ⬜ Customs Clearance (Destination)
   - ⬜ Final Delivery to DC

2. **AI ETA Insight Box** (highlighted with `#00D4FF` left border, light `#00D4FF` at 10% opacity background):
   "MGH AI predicts arrival 5 days later than carrier ETA. Reason: Suez Canal queue currently 48 vessels deep. Historical average queue clearance: 3.2 days. Weather advisory: Moderate headwinds in Mediterranean."

3. **AI Recommendation Panel** (the "Robo-Advisor"):
   Show 3 option cards:
   - **Option A: Wait** — No additional cost. New delivery to DC: Mar 8. Risk: Misses spring launch window by 3 days.
   - **Option B: Expedite via Air** — Cost: $18,400. Delivery to DC: Feb 18. 12,000 units arrive on time for launch.
   - **Option C: Split Shipment** — Air-freight 3,000 critical units ($4,600). Sea-freight remaining 9,000 units. Partial stock available for launch day.

---

### VIEW 4: BOOKING ENGINE

This view demonstrates the "Expedia-like" booking experience with Smart Options.

#### Booking Form (top section)
A clean form with:
- Origin: Dropdown (Shanghai, Ho Chi Minh City, Dhaka, Mumbai, Jakarta)
- Destination: Dropdown (Rotterdam, Hamburg, Los Angeles, New York, Felixstowe)
- Cargo Type: FCL 20' / FCL 40' / FCL 40'HC / LCL
- Weight: Input field (pre-filled: "22,400 kg")
- Ready Date: Date picker (pre-filled: "2026-02-15")
- Linked PO: Dropdown (PO-2026-44919)
- **[Search Routes]** button — background `#34328F`, text white, hover `#082567`

Form inputs: border `#B2B8BF`, focus ring `#34328F`, label text Barlow Condensed Bold UPPERCASE `#2A2A38`.

#### Route Options (shown after "search")
Display 3 cards side by side — the Green/Fast/Saver options:

**🌱 GREEN Option**
- Carrier: Maersk (Biofuel blend)
- Route: HCMC → Singapore → Rotterdam (1 transshipment)
- Transit: 32 days
- ETD: Feb 18 → ETA: Mar 22
- Price: $3,850 per 40'HC
- CO2: 1.2 tonnes (42% less than average)
- Reliability Index: 94% ██████████░
- Badge: "LOWEST EMISSIONS" — `#27B373` background

**⚡ FAST Option**
- Carrier: Hapag-Lloyd Express
- Route: HCMC → Rotterdam (Direct)
- Transit: 24 days
- ETD: Feb 16 → ETA: Mar 12
- Price: $4,600 per 40'HC
- CO2: 2.1 tonnes
- Reliability Index: 91% █████████░░
- Badge: "FASTEST" — `#00D4FF` background

**💰 SAVER Option**
- Carrier: COSCO
- Route: HCMC → Port Klang → Piraeus → Rotterdam (2 transshipments)
- Transit: 38 days
- ETD: Feb 20 → ETA: Mar 30
- Price: $2,950 per 40'HC
- CO2: 1.8 tonnes
- Reliability Index: 86% ████████░░░
- Badge: "BEST VALUE" — `#34328F` background

Each card should have a **[Book Now]** button (`#34328F` bg) that triggers a success toast: "Booking confirmed! Ref: BK-2024-8830. Awaiting buyer approval."

#### Below Route Options: Real-Time Surcharge Breakdown
Small collapsible panel:
```
Base Ocean Freight:          $2,200
Bunker Adjustment (BAF):     $480
Peak Season Surcharge (PSS): $350
Currency Adjustment (CAF):   $120
Terminal Handling (THC):     $290
Documentation Fee:           $45
──────────────────────────
Total per 40'HC:             $3,485
```

---

### VIEW 5: DOCUMENTS (AI-Powered Document Hub)

#### Document Categories (tab bar)
`All | Bills of Lading | Commercial Invoices | Packing Lists | Certificates | Customs Filings`

Active tab: bottom border `#34328F`, text `#34328F` bold. Inactive: text `#B2B8BF`.

#### Document Table
```javascript
const documents = [
  { name: "Bill of Lading — MSCU7294561", type: "B/L", shipment: "SHP-2026-00891", date: "2026-01-28", status: "Final", aiExtracted: true },
  { name: "Commercial Invoice — PO-2026-44919", type: "Invoice", shipment: "SHP-2026-00847", date: "2026-02-01", status: "Draft — Pending Review", aiExtracted: false },
  { name: "Packing List — BK-2024-8756", type: "Packing", shipment: "SHP-2026-00847", date: "2026-02-01", status: "Final", aiExtracted: true },
  { name: "Certificate of Origin — PO-2026-44918", type: "Certificate", shipment: null, date: "2026-02-05", status: "Pending Supplier Upload", aiExtracted: false },
  { name: "ISF Filing — BK-2024-8812", type: "Customs", shipment: "SHP-2026-00903", date: null, status: "⚠️ OVERDUE — Due in 48hrs", aiExtracted: false },
  { name: "Phytosanitary Certificate — MSCU7294561", type: "Certificate", shipment: "SHP-2026-00891", date: null, status: "❌ MISSING — Customs Hold", aiExtracted: false },
];
```

Each row shows: Lucide outline `FileText` icon, Name, Shipment link, Date, Status badge (color-coded), AI badge (`#00D4FF` pill "AI Extracted") if data was auto-extracted via OCR.

#### AI-OCR Feature Highlight
Include a prominent card/banner at the top with a gradient left border (`#34328F` → `#00D4FF`):
> **🤖 AI Document Processing Active**
> 847 documents auto-processed this month. 12,400 data fields extracted with 99.2% accuracy. Average processing time: 4.3 seconds per document.
> Fields extracted: Weights, Seal Numbers, HTS Codes, Consignee Details, Port Codes

---

### VIEW 6: FINANCE

#### Top KPI Row (4 cards)
| KPI | Value |
|-----|-------|
| Freight Spend MTD | $4,127,000 |
| Outstanding Invoices | $892,400 (12 invoices) |
| Average Cost per TEU | $2,340 |
| Disputes Open | 3 ($14,200 total) |

#### Invoice Table
```javascript
const invoices = [
  { id: "INV-2026-0891", amount: 127400, status: "Auto-Approved ✅", matchRate: "100%", dueDate: "2026-02-28", carrier: "MSC" },
  { id: "INV-2026-0847", amount: 84200, status: "Auto-Approved ✅", matchRate: "100%", dueDate: "2026-03-05", carrier: "Maersk" },
  { id: "INV-2026-0812", amount: 212800, status: "⚠️ Discrepancy Flagged", matchRate: "94%", dueDate: "2026-02-20", carrier: "Evergreen", discrepancy: "Unquoted detention charge of $1,200" },
  { id: "INV-2026-0778", amount: 45600, status: "Pending Review", matchRate: "—", dueDate: "2026-03-10", carrier: "Hapag-Lloyd" },
  { id: "INV-2026-0903", amount: 38900, status: "Auto-Approved ✅", matchRate: "100%", dueDate: "2026-03-15", carrier: "COSCO" },
];
```

#### Landed Cost Calculator (lower section)
Show a sample breakdown for one SKU:

**SKU: WLB-SS26-0042 — Women's Linen Blazer**
| Cost Component | Per Unit | Total (8,000 units) |
|---|---|---|
| FOB Product Cost | $38.50 | $308,000 |
| Ocean Freight | $1.05 | $8,400 |
| Origin Handling (MGH) | $0.22 | $1,760 |
| Customs Duty (12%) | $4.62 | $36,960 |
| Insurance | $0.08 | $640 |
| Destination Drayage | $0.35 | $2,800 |
| **Total Landed Cost** | **$44.82** | **$358,560** |
| Retail Price | $129.00 | — |
| **Gross Margin** | **65.3%** | — |

Use a donut/pie chart (Recharts PieChart) to visualize the cost breakdown. Colors: FOB=`#34328F`, Freight=`#082567`, Handling=`#00D4FF`, Duty=`#F59E0B`, Insurance=`#B2B8BF`, Drayage=`#2A2A38`.

---

### VIEW 7: SUSTAINABILITY (CSRD Reporting)

**IMPORTANT: This is the ONLY view where `#27B373` (MGH Green) may be used as an accent color, per the brand guideline's rule: "This color is only to be used for designs related to sustainability."**

#### Top KPI Row
| KPI | Value |
|-----|-------|
| Total CO2e (YTD) | 4,891 tonnes |
| Avg. Emission Intensity | 42.3 gCO2/tonne-km |
| Offsets Purchased | 1,200 tonnes (24.5%) |
| GLEC Accredited | ✅ Yes |

KPI card accents use `#27B373` left border here instead of `#00D4FF`.

#### Emissions by Trade Lane (Bar Chart — Recharts)
```javascript
const emissionsData = [
  { lane: "SHA→RTD", co2: 1840, shipments: 247 },
  { lane: "HCM→LAX", co2: 1120, shipments: 134 },
  { lane: "DAC→HAM", co2: 890, shipments: 89 },
  { lane: "BOM→NYC", co2: 520, shipments: 42 },
  { lane: "JKT→FXT", co2: 521, shipments: 67 },
];
```
Horizontal bar chart, sorted by emissions. Bar color: `#27B373`. Show gCO2e per tonne-km as a secondary metric.

#### Emissions by Transport Mode (Donut Chart)
```javascript
const modeEmissions = [
  { mode: "Ocean", value: 3200, color: "#34328F" },
  { mode: "Air", value: 1400, color: "#EF4444" },
  { mode: "Road", value: 291, color: "#F59E0B" },
];
```

#### Carbon Offset CTA
A prominent card with `#27B373` left border:
> **Offset your remaining 3,691 tonnes**
> Cost: $73,820 (est. $20/tonne) via Gold Standard verified credits
> Projects: Renewable Energy — Vietnam Wind Farm, Reforestation — Bangladesh Mangrove
> **[Purchase Offsets]** (bg `#27B373`) **[Download CSRD Report]** (bg `#34328F`)

---

### VIEW 8: ASK MGH (AI-Powered Chatbot) — NEW

This is a **dedicated full-page ChatGPT-style interface** where buyers can ask natural language questions about their shipments, POs, delays, KPIs, and exceptions. It demonstrates MGH's AI capabilities and provides instant insights without navigating multiple views.

#### Layout Structure
- **Full width of the main content area** (sidebar remains visible)
- Clean, minimal, conversation-focused layout
- Vertically centered chat container with max-width ~800px
- Background: `#F4F4F4` (Light Grey)

#### Header Section (when chat is empty / initial state)
When no messages exist yet, show a welcome screen:

```
[MGH Logo — blue variant, centered]

ASK MGH
Your AI-Powered Supply Chain Assistant

Ask me anything about your shipments, purchase orders,
delays, exceptions, and performance metrics.
```

Title "ASK MGH" in Oswald SemiBold UPPERCASE, `#34328F`, 28px.
Subtitle in Barlow Condensed Regular, `#B2B8BF`, 16px.

#### Suggested Question Chips (shown on empty state)
Below the welcome text, display clickable suggested question chips arranged in a 2-column grid. Clicking a chip auto-populates the input and sends the message.

```javascript
const suggestedQuestions = [
  {
    icon: "Ship",         // Lucide icon name
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
```

Each chip: `#FFFFFF` background, border `#B2B8BF`, rounded-lg. Lucide outline icon in `#34328F`. Text in Barlow Condensed Regular `#2A2A38`. Hover: border `#34328F`, subtle shadow.

#### Chat Message Bubbles

**User messages:** Right-aligned, `#34328F` background, white text, rounded-lg with bottom-right corner sharp.

**MGH AI messages:** Left-aligned, `#FFFFFF` background, `#2A2A38` text, rounded-lg with bottom-left corner sharp. Has a small MGH logo avatar (16px) to the left.

#### Chat Input Bar (fixed at bottom of chat container)
- Full-width input field with placeholder: "Ask about shipments, POs, delays, KPIs..."
- Right side: Send button (arrow icon) with `#34328F` background, white icon
- Input border: `#B2B8BF`, focus: `#34328F`
- Subtle shadow on the input container

#### Pre-scripted Conversations (Hardcoded Demo Responses)

Since this is a demo with no real AI backend, implement a pattern-matching system that detects keywords in the user's message and returns hardcoded responses. Use `setTimeout` with 800-1500ms delay to simulate "thinking" (show a typing indicator with three pulsing dots in `#34328F`).

**Conversation 1: Shipment/PO Status**
```javascript
// Trigger keywords: "status", "SHP-", "PO-", "where is", "track"
{
  userMessage: "What is the current status of shipment SHP-2026-00891?",
  aiResponse: {
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
        { label: "MGH AI ETA", value: "Mar 2, 2026 ⚠️", highlight: true },
        { label: "Linked PO", value: "PO-2025-43205" },
        { label: "Commodity", value: "Men's Down Jacket — 12,000 units" }
      ],
      alert: "⚠️ This shipment is experiencing a 5-day delay due to Suez Canal congestion. 48 vessels currently in queue."
    }
  }
}
```

**Conversation 2: Turnaround Time (TAT)**
```javascript
// Trigger keywords: "TAT", "turnaround", "transit time", "average time"
{
  userMessage: "What is the average TAT for the Shanghai to Rotterdam lane this quarter?",
  aiResponse: {
    type: "text_with_chart",
    text: "Here's the transit time analysis for Shanghai → Rotterdam (Q1 2026):",
    summary: "The average door-to-door TAT this quarter is **31.4 days**, which is 2.1 days longer than Q4 2025 (29.3 days). The increase is primarily due to Suez Canal congestion in January-February.",
    chart: {
      type: "bar",  // Render a Recharts BarChart inline in the chat bubble
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
}
```

**Conversation 3: Delay Inquiry**
```javascript
// Trigger keywords: "delay", "anticipated delay", "late", "behind schedule"
{
  userMessage: "Are there any anticipated delays on PO-2026-44918?",
  aiResponse: {
    type: "text_with_card",
    text: "I've analyzed PO-2026-44918 (Jiangsu Garments Co. — Men's Cotton Crew Tee). Here's my assessment:",
    card: {
      title: "PO-2026-44918 — Delay Risk Analysis",
      fields: [
        { label: "Current Status", value: "In Production (65% complete)" },
        { label: "Ex-Factory Date", value: "Feb 20, 2026" },
        { label: "Projected Completion", value: "Feb 24, 2026 ⚠️", highlight: true },
        { label: "Delay Risk", value: "MEDIUM — 4 days", badge: "warning" },
        { label: "Root Cause", value: "QC bottleneck at sewing stage; factory running at 112% capacity" },
        { label: "Impact", value: "May miss vessel MSC Clara (ETD Feb 26). Next available: Mar 2 (+4 days)" }
      ],
      alert: "⚠️ Recommended Action: Request supplier to prioritize this PO for overtime production. Estimated overtime cost: $2,400. This would recover 3 of the 4 delay days."
    }
  }
}
```

**Conversation 4: Exception/At-Risk Shipments**
```javascript
// Trigger keywords: "at risk", "exception", "risk", "Chittagong", "which shipments"
{
  userMessage: "Which shipments from POL Chittagong are currently at risk?",
  aiResponse: {
    type: "text_with_table",
    text: "I found 3 shipments originating from Chittagong (CGP) with active risk flags:",
    table: {
      headers: ["Shipment", "Vessel", "ETA", "Risk", "Issue"],
      rows: [
        ["SHP-2026-00903", "COSCO Shipping Leo", "Mar 16 (+2d)", "🔴 HIGH", "Port congestion + pending ISF"],
        ["SHP-2026-00945", "Wan Hai 512", "Mar 22", "🟡 MEDIUM", "Vessel schedule change, 1 transshipment added"],
        ["SHP-2026-00961", "Maersk Seletar", "Mar 28", "🟡 MEDIUM", "Factory CRD slipped 3 days, may miss cutoff"]
      ]
    },
    followUp: "The highest priority is SHP-2026-00903 — the ISF filing is overdue and US Customs may impose a $5,000 penalty. Would you like me to show recommended actions for each?"
  }
}
```

**Conversation 5: KPI — Container Optimization Comparison (with Chart)**
```javascript
// Trigger keywords: "container utilization", "optimization", "compare", "KPI", "comparison"
{
  userMessage: "Compare container utilization rates across our top 3 trade lanes",
  aiResponse: {
    type: "text_with_chart",
    text: "Here's the container utilization comparison across your top 3 trade lanes for Q1 2026:",
    chart: {
      type: "grouped_bar",  // Grouped bar chart
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
    summary: "**Key Insights:**\n• HCM→LAX is exceeding target at 94% (+2% above target) — excellent consolidation by origin team\n• SHA→RTD improved from 85% to 89% but still 3% below target\n• DAC→HAM dropped from 82% to 78% — ⚠️ investigate. LCL volumes may benefit from consolidation. Potential savings: ~$34,000/month if brought to target",
    followUp: "Would you like me to drill into the Dhaka-Hamburg lane to identify specific consolidation opportunities?"
  }
}
```

**Conversation 6: On-Time Delivery Comparison (with Chart)**
```javascript
// Trigger keywords: "on-time", "delivery performance", "this month vs", "OTD"
{
  userMessage: "Show me on-time delivery performance comparison: this month vs last month",
  aiResponse: {
    type: "text_with_chart",
    text: "Here's your on-time delivery performance breakdown:",
    chart: {
      type: "side_by_side_bar",
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
    summary: "**Overall OTD: 94.2%** (↑ 2.1% from January's 92.1%)\n\n• **Best Performer:** Maersk at 96% (+3% improvement)\n• **Biggest Concern:** Evergreen dropped to 79% (−7%) — related to Felixstowe port congestion affecting 4 shipments\n• **COSCO** also declined 5% — Suez Canal delays are the primary cause\n\n💡 Recommendation: Consider routing 2 upcoming Evergreen bookings to Maersk for the Felixstowe lane until congestion clears."
  }
}
```

**Fallback Response (for unrecognized queries):**
```javascript
{
  aiResponse: {
    type: "text",
    text: "I can help you with questions about:\n\n• **Shipment & PO status** — \"What's the status of SHP-2026-00891?\"\n• **Transit times & TAT** — \"Average TAT for Shanghai-Rotterdam?\"\n• **Delay analysis** — \"Any anticipated delays on PO-2026-44918?\"\n• **Exceptions & risk** — \"Which shipments from Chittagong are at risk?\"\n• **KPI comparisons** — \"Compare container utilization across trade lanes\"\n• **Performance metrics** — \"Show OTD comparison: this month vs last\"\n\nTry one of these, or ask me anything about your supply chain!"
  }
}
```

#### Chat UI Rendering Rules

1. **Text responses:** Render as markdown-like formatted text. Support **bold** and line breaks. Color `#2A2A38`.

2. **Cards:** Render as a structured card inside the AI message bubble. Card has `#FFFFFF` background, border `#B2B8BF`, rounded corners. Field labels in Barlow Condensed Bold UPPERCASE `#B2B8BF`, values in Barlow Condensed Regular `#2A2A38`. Alert/warning text in a box with `#F59E0B` left border.

3. **Tables:** Render as a clean, compact table inside the chat bubble. Header row: background `#34328F`, text white. Body: alternating `#FFFFFF` and `#F4F4F4`.

4. **Charts:** Render Recharts charts **directly inside the AI message bubble**. Chart width: 100% of message bubble (max ~500px). Height: 200-250px. This is the key visual differentiator — charts appearing inline in chat responses.

5. **Typing indicator:** Three dots pulsing in sequence (`#34328F` color), shown for 800-1500ms before AI response appears.

6. **Message timestamps:** Small, `#B2B8BF`, 11px, below each message bubble.

7. **Follow-up prompts:** After AI responses that include `followUp` text, show it as a clickable chip below the message in `#00D4FF` text that, when clicked, sends that as a new user message.

---

## 5. INTERACTIVE BEHAVIORS

### Global Behaviors
1. **Sidebar collapse:** Clicking a hamburger icon collapses the sidebar to icon-only mode
2. **Toast notifications:** When any action button is clicked (Book Now, Approve, Upload, etc.), show a brief success toast at the top-right. Toast background: `#34328F`, text white, with `#00D4FF` accent line at top.
3. **Table row expansion:** PO and Shipment tables should expand rows on click to show detail panels
4. **Filter interactivity:** All filter dropdowns/chips should actually filter the displayed data using React state
5. **Tab switching:** All tab bars should work and show appropriate filtered content
6. **Number formatting:** All currency values formatted with `$` and commas. Large numbers abbreviated (e.g., "$4.1M"). Percentages to one decimal.
7. **Status badges:** Color-coded pills — green `#22C55E` for on-time/approved, amber `#F59E0B` for warning/pending, red `#EF4444` for critical/overdue, `#00D4FF` for info/in-transit
8. **Ask MGH chat:** Input sends messages, pattern-matched responses appear after typing indicator delay, charts render inline

### Animations (keep subtle and professional)
- Cards fade-in on view switch (simple opacity transition)
- Progress bars animate on first render
- KPI numbers should appear to count up briefly on load
- Hover effects on table rows (subtle `#F4F4F4` background highlight)
- Chat typing indicator: three dots with staggered pulse animation
- Chat messages slide in from bottom with opacity transition

---

## 6. RESPONSIVE NOTES

This is primarily for **desktop/laptop presentation to management** (1280px+ screens). Optimize for that. The sidebar should be visible by default. If viewport is less than 1024px, collapse sidebar automatically. Tables can scroll horizontally on smaller screens.

---

## 7. WHAT TO SKIP (Out of Scope for Demo)

- No real backend / API calls
- No real AI/LLM integration for Ask MGH (all responses are hardcoded pattern-matched)
- No authentication / login screen (assume already logged in)
- No real map library (use styled SVG or table alternative)
- No file upload functionality (just styled buttons)
- No real-time data / WebSockets
- No settings page content (just show "Settings — Coming Soon")
- No mobile-responsive design (desktop presentation only)
- No dark mode toggle

---

## 8. QUALITY CHECKLIST

Before considering the build complete, verify:
- [ ] All **8 views** render and are navigable via sidebar (Dashboard, POs, Shipments, Booking, Documents, Finance, Sustainability, **Ask MGH**)
- [ ] Dashboard KPIs, charts, and exception list display correctly
- [ ] PO table filters work and rows expand to show milestones
- [ ] Shipment table shows AI ETA vs carrier ETA discrepancy
- [ ] Booking engine shows 3 route options with clear differentiation
- [ ] Documents view shows AI-OCR banner and status badges
- [ ] Finance view shows invoice reconciliation and landed cost breakdown
- [ ] Sustainability view shows emissions charts and offset CTA (uses `#27B373` green)
- [ ] **Ask MGH page renders with welcome screen and suggested question chips**
- [ ] **Clicking a suggested question sends it and shows a hardcoded AI response**
- [ ] **At least 3 different query types produce chart-in-chat responses**
- [ ] **Typing indicator appears before AI responses**
- [ ] All charts render with Recharts (no errors)
- [ ] Color palette matches MGH brand: `#34328F` dominant, `#082567` accents, `#00D4FF` highlights, `#F4F4F4` surfaces
- [ ] Typography uses Oswald (headings, UPPERCASE) + Barlow Condensed (body) + Space Mono (KPI data)
- [ ] MGH logo renders correctly with three grey lines + blue text
- [ ] Icons are all outline style (Lucide defaults), consistent strokeWidth={2}
- [ ] Platform name "myshipment" appears correctly in sidebar header and top bar
- [ ] Toast notifications appear on button clicks
- [ ] No console errors

---

## 9. FINAL NOTE TO THE AI BUILDER

This is a **management presentation demo**. Visual polish and data richness matter more than code architecture. Prioritize:
1. **WOW factor on the Dashboard** — This is the first thing management sees
2. **The AI ETA vs Carrier ETA insight** — This is the key differentiator story
3. **The 3-option booking engine** — This shows the "Expedia-like" UX vision
4. **Ask MGH chatbot with inline charts** — This demonstrates AI-first approach. The charts appearing inside chat bubbles is the money shot.
5. **Brand compliance** — Use `#34328F` (MGH Blue) as the dominant color everywhere. The portal must FEEL like an MGH product, not a generic SaaS app.

Build this as a single React component (`.jsx` file) with a default export. All state management via `useState` and `useReducer`. All data hardcoded. Make it exceptional.
