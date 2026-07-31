import React, { useState, useMemo } from "react";
import {
  Search, Bell, Settings as SettingsIcon, ChevronDown, Plus, SlidersHorizontal,
  LayoutGrid, List, MoreHorizontal, Menu, X, LayoutDashboard, Package, ShoppingBag,
  Megaphone, BarChart3, ChevronLeft, ChevronRight, Palette, Code2, LayoutTemplate,
  Music, BookOpen, Shapes, Sliders, Boxes, ArrowLeft, UploadCloud, FileUp, Calendar,
  DollarSign, ShoppingCart, Users, Tag, Mail, TrendingUp, Eye, RotateCcw, Download,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";

/* ---------------------------------- data ---------------------------------- */

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "products", label: "Products", icon: Package },
  { key: "orders", label: "Orders", icon: ShoppingBag },
  { key: "marketing", label: "Marketing", icon: Megaphone },
  { key: "analytics", label: "Analytics", icon: BarChart3 },
];

const PRODUCTS = [
  { id: 1, name: "UI Kit Pro", category: "Design Assets", price: 49, status: "Best Seller", icon: Palette, gradient: "from-violet-500 to-fuchsia-500" },
  { id: 2, name: "React Masterclass", category: "Course", price: 129, status: "New", icon: Code2, gradient: "from-sky-500 to-cyan-400" },
  { id: 3, name: "Notion Template Pack", category: "Templates", price: 19, status: "Available", icon: LayoutTemplate, gradient: "from-emerald-500 to-teal-400" },
  { id: 4, name: "SoundWave Presets", category: "Audio", price: 35, status: "Available", icon: Music, gradient: "from-orange-500 to-amber-400" },
  { id: 5, name: "Photoshop Actions Bundle", category: "Design Assets", price: 29, status: "Limited", icon: Sliders, gradient: "from-purple-500 to-indigo-500" },
  { id: 6, name: "SaaS Landing Page Kit", category: "Templates", price: 59, status: "Best Seller", icon: LayoutTemplate, gradient: "from-blue-500 to-indigo-400" },
  { id: 7, name: "Icon Library 5000+", category: "Design Assets", price: 39, status: "Available", icon: Shapes, gradient: "from-pink-500 to-rose-400" },
  { id: 8, name: "Copywriting Ebook", category: "Ebook", price: 15, status: "New", icon: BookOpen, gradient: "from-amber-500 to-yellow-400" },
];

const TOP_PRODUCTS = [
  { ...PRODUCTS[0], sales: 214, revenue: 10486 },
  { ...PRODUCTS[5], sales: 176, revenue: 10384 },
  { ...PRODUCTS[1], sales: 96, revenue: 12384 },
  { ...PRODUCTS[2], sales: 244, revenue: 4636 },
];

const ORDERS = [
  { id: "#ORD-1042", customer: "Sofia Martins", product: "UI Kit Pro", date: "Jul 28, 2026", amount: 49, status: "Paid" },
  { id: "#ORD-1041", customer: "Lucas Andrade", product: "React Masterclass", date: "Jul 27, 2026", amount: 129, status: "Paid" },
  { id: "#ORD-1040", customer: "Bianca Rocha", product: "Notion Template Pack", date: "Jul 27, 2026", amount: 19, status: "Pending" },
  { id: "#ORD-1039", customer: "Diego Ferreira", product: "SoundWave Presets", date: "Jul 26, 2026", amount: 35, status: "Refunded" },
  { id: "#ORD-1038", customer: "Helena Costa", product: "SaaS Landing Page Kit", date: "Jul 25, 2026", amount: 59, status: "Paid" },
  { id: "#ORD-1037", customer: "Rafael Souza", product: "Icon Library 5000+", date: "Jul 24, 2026", amount: 39, status: "Paid" },
  { id: "#ORD-1036", customer: "Camila Lopes", product: "Copywriting Ebook", date: "Jul 23, 2026", amount: 15, status: "Pending" },
  { id: "#ORD-1035", customer: "Pedro Nogueira", product: "Photoshop Actions Bundle", date: "Jul 22, 2026", amount: 29, status: "Refunded" },
];

const CAMPAIGNS = [
  { name: "Back to School Sale", type: "Discount", status: "Active", reach: "12.4k", performance: "+18% CTR" },
  { name: "New Course Launch", type: "Email", status: "Scheduled", reach: "8.1k", performance: "Starts Aug 3" },
  { name: "Summer Bundle Banner", type: "Banner", status: "Active", reach: "24.6k", performance: "+9% CTR" },
  { name: "Loyalty Reminder", type: "Email", status: "Ended", reach: "5.2k", performance: "22% opened" },
];

const DISCOUNT_CODES = [
  { code: "SUMMER20", discount: "20% off", uses: 184, expires: "Aug 31, 2026" },
  { code: "WELCOME10", discount: "10% off", uses: 512, expires: "No expiry" },
  { code: "VIP30", discount: "30% off", uses: 47, expires: "Sep 15, 2026" },
];

const REVENUE_DATA = [
  { month: "Feb", revenue: 4200 },
  { month: "Mar", revenue: 5100 },
  { month: "Apr", revenue: 4800 },
  { month: "May", revenue: 6200 },
  { month: "Jun", revenue: 7100 },
  { month: "Jul", revenue: 8450 },
];

const CATEGORY_DATA = [
  { category: "Design Assets", sales: 420 },
  { category: "Templates", sales: 310 },
  { category: "Course", sales: 180 },
  { category: "Ebook", sales: 140 },
  { category: "Audio", sales: 95 },
];

const TRAFFIC_DATA = [
  { name: "Organic Search", value: 42 },
  { name: "Social Media", value: 28 },
  { name: "Direct", value: 18 },
  { name: "Referral", value: 12 },
];
const TRAFFIC_COLORS = ["#6366f1", "#8b5cf6", "#0ea5e9", "#f59e0b"];

const STATUS_STYLES = {
  Available: "bg-emerald-50 text-emerald-700",
  "Best Seller": "bg-violet-50 text-violet-700",
  Limited: "bg-amber-50 text-amber-700",
  New: "bg-sky-50 text-sky-700",
};
const STATUS_DOT = {
  Available: "bg-emerald-500",
  "Best Seller": "bg-violet-500",
  Limited: "bg-amber-500",
  New: "bg-sky-500",
};

const ORDER_STATUS_STYLES = { Paid: "bg-emerald-50 text-emerald-700", Pending: "bg-amber-50 text-amber-700", Refunded: "bg-rose-50 text-rose-700" };
const ORDER_STATUS_DOT = { Paid: "bg-emerald-500", Pending: "bg-amber-500", Refunded: "bg-rose-500" };

const inputClass = "w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-100";

/* ------------------------------ shared bits ------------------------------ */

function Badge({ status }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[status]}`} />
      {status}
    </span>
  );
}

function OrderStatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${ORDER_STATUS_STYLES[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${ORDER_STATUS_DOT[status]}`} />
      {status}
    </span>
  );
}

function Cover({ product, className }) {
  const Icon = product.icon;
  return (
    <div className={`flex items-center justify-center rounded-xl bg-gradient-to-br ${product.gradient} ${className}`}>
      <Icon className="text-white/90" strokeWidth={1.5} size={"40%"} />
    </div>
  );
}

function Panel({ children, className = "" }) {
  return <div className={`rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 ${className}`}>{children}</div>;
}

function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="font-display text-lg font-bold text-slate-900 sm:text-xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, delta, positive = true, color }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${color}`}>
          <Icon size={17} />
        </div>
        {delta && <span className={`text-xs font-medium ${positive ? "text-emerald-600" : "text-rose-600"}`}>{delta}</span>}
      </div>
      <p className="font-display mt-3 text-xl font-bold text-slate-900 sm:text-2xl">{value}</p>
      <p className="mt-0.5 text-xs text-slate-400">{label}</p>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-slate-900" : "bg-slate-200"}`}
      aria-pressed={checked}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

function ProductCardGrid({ product }) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md sm:p-5">
      <Cover product={product} className="mb-4 aspect-square w-full" />
      <div className="mb-1 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-slate-900 sm:text-base">{product.name}</h3>
          <p className="mt-0.5 text-xs text-slate-400">{product.category}</p>
        </div>
        <span className="shrink-0 text-sm font-semibold text-slate-900 sm:text-base">${product.price}</span>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
        <Badge status={product.status} />
        <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600" aria-label="More options">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </div>
  );
}

function ProductCardList({ product }) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3 transition-shadow hover:shadow-md sm:p-4">
      <Cover product={product} className="h-14 w-14 shrink-0 sm:h-16 sm:w-16" />
      <div className="min-w-[10rem] flex-1">
        <h3 className="truncate text-sm font-semibold text-slate-900 sm:text-base">{product.name}</h3>
        <p className="mt-0.5 text-xs text-slate-400">{product.category}</p>
      </div>
      <Badge status={product.status} />
      <span className="w-16 text-right text-sm font-semibold text-slate-900 sm:text-base">${product.price}</span>
      <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600" aria-label="More options">
        <MoreHorizontal size={18} />
      </button>
    </div>
  );
}

/* --------------------------------- shell --------------------------------- */

function TopBar({ page, navigate, menuOpen, setMenuOpen }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate("dashboard")} className="flex shrink-0 items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-500">
            <Boxes className="text-white" size={18} strokeWidth={2} />
          </div>
          <span className="font-display text-lg font-extrabold tracking-tight">Vaultify</span>
        </button>

        <nav className="hidden flex-1 items-center justify-center lg:flex">
          <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1">
            {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => navigate(key)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors xl:px-4 ${
                  page === key ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Icon size={15} />
                <span className="hidden xl:inline">{label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 md:flex md:w-48 lg:w-64">
            <Search size={15} className="shrink-0 text-slate-400" />
            <input placeholder="Search anything..." className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none" />
          </div>
          <button className="hidden rounded-full p-2 text-slate-500 hover:bg-slate-100 sm:flex" aria-label="Notifications">
            <Bell size={18} />
          </button>
          <button onClick={() => navigate("settings")} className={`hidden rounded-full p-2 hover:bg-slate-100 sm:flex ${page === "settings" ? "bg-slate-100 text-slate-900" : "text-slate-500"}`} aria-label="Settings">
            <SettingsIcon size={18} />
          </button>
          <button onClick={() => navigate("profile")} aria-label="Profile" className={`h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-amber-400 to-pink-500 ${page === "profile" ? "ring-2 ring-slate-900 ring-offset-2" : ""}`} />
          <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden">
          <div className="mb-3 flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 md:hidden">
            <Search size={15} className="text-slate-400" />
            <input placeholder="Search anything..." className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none" />
          </div>
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => navigate(key)}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium ${
                  page === key ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
            <div className="mt-1 flex gap-1 border-t border-slate-100 pt-2">
              <button onClick={() => navigate("settings")} className={`flex flex-1 items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium ${page === "settings" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"}`}>
                <SettingsIcon size={16} /> Settings
              </button>
              <button onClick={() => navigate("profile")} className={`flex flex-1 items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium ${page === "profile" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"}`}>
                <Users size={16} /> Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* --------------------------------- pages --------------------------------- */

function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <Panel>
        <PageHeader
          title="Welcome back, Marina"
          subtitle="Here's how your store is performing today."
          actions={
            <button className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
              <Calendar size={15} /> Last 7 months
            </button>
          }
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard icon={DollarSign} label="Total Revenue" value="$35,850" delta="+12.4%" color="bg-indigo-50 text-indigo-600" />
          <StatCard icon={ShoppingCart} label="Total Sales" value="342" delta="+8.1%" color="bg-emerald-50 text-emerald-600" />
          <StatCard icon={Package} label="Active Products" value="128" delta="+3 new" color="bg-amber-50 text-amber-600" />
          <StatCard icon={Users} label="Customers" value="1,204" delta="+5.6%" color="bg-violet-50 text-violet-600" />
        </div>
      </Panel>

      <Panel>
        <h2 className="font-display mb-4 text-base font-semibold text-slate-900">Revenue overview</h2>
        <div className="h-64 w-full sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REVENUE_DATA} margin={{ left: -20, right: 10 }}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }} />
              <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={2} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel>
          <h2 className="font-display mb-4 text-base font-semibold text-slate-900">Top products</h2>
          <div className="flex flex-col gap-3">
            {TOP_PRODUCTS.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <Cover product={p} className="h-11 w-11 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900">{p.name}</p>
                  <p className="text-xs text-slate-400">{p.sales} sales</p>
                </div>
                <span className="text-sm font-semibold text-slate-900">${p.revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <h2 className="font-display mb-4 text-base font-semibold text-slate-900">Recent orders</h2>
          <div className="flex flex-col gap-3">
            {ORDERS.slice(0, 4).map((o) => (
              <div key={o.id} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900">{o.customer}</p>
                  <p className="text-xs text-slate-400">{o.product}</p>
                </div>
                <OrderStatusBadge status={o.status} />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function ProductsPage({ onAdd }) {
  const [query, setQuery] = useState("");
  const [view, setView] = useState("grid");
  const [perPage, setPerPage] = useState(8);
  const [page, setPage] = useState(1);
  const [perPageOpen, setPerPageOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <Panel>
      <PageHeader
        title="Product List"
        subtitle="Track downloads, licenses, and restocking of digital goods."
        actions={
          <>
            <button onClick={onAdd} className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-slate-800">
              <Plus size={16} /> Add Product
            </button>
            <button className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
              <SlidersHorizontal size={15} /> Filter
            </button>
            <div className="flex items-center gap-1 rounded-xl border border-slate-200 p-1">
              <button onClick={() => setView("grid")} className={`rounded-lg p-1.5 ${view === "grid" ? "bg-slate-900 text-white" : "text-slate-400 hover:bg-slate-50"}`} aria-label="Grid view">
                <LayoutGrid size={16} />
              </button>
              <button onClick={() => setView("list")} className={`rounded-lg p-1.5 ${view === "list" ? "bg-slate-900 text-white" : "text-slate-400 hover:bg-slate-50"}`} aria-label="List view">
                <List size={16} />
              </button>
            </div>
          </>
        }
      />

      <div className="mb-5 flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 sm:max-w-xs">
        <Search size={15} className="text-slate-400" />
        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          placeholder="Search products..."
          className="w-full bg-transparent text-sm focus:outline-none"
        />
      </div>

      {paginated.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 py-16 text-center">
          <p className="font-display text-base font-semibold text-slate-700">No products match "{query}"</p>
          <p className="mt-1 text-sm text-slate-400">Try a different name or category.</p>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {paginated.map((p) => <ProductCardGrid key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {paginated.map((p) => <ProductCardList key={p.id} product={p} />)}
        </div>
      )}

      <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-5 sm:flex-row">
        <div className="relative">
          <button onClick={() => setPerPageOpen((v) => !v)} className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">
            Show: {perPage} <ChevronDown size={14} />
          </button>
          {perPageOpen && (
            <div className="absolute bottom-full z-10 mb-1 w-24 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
              {[4, 8, 12].map((n) => (
                <button key={n} onClick={() => { setPerPage(n); setPage(1); setPerPageOpen(false); }} className="block w-full rounded-md px-2 py-1.5 text-left text-sm text-slate-600 hover:bg-slate-50">
                  {n} items
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50 disabled:opacity-40" aria-label="Previous page">
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} className={`h-8 w-8 rounded-lg text-sm font-medium ${currentPage === i + 1 ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"}`}>
              {i + 1}
            </button>
          ))}
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50 disabled:opacity-40" aria-label="Next page">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </Panel>
  );
}

function AddProductPage({ onBack }) {
  const [form, setForm] = useState({ name: "", category: "Design Assets", price: "", description: "", tags: "", status: "Draft" });
  const [saved, setSaved] = useState(false);
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col gap-6">
      <button onClick={onBack} className="flex w-fit items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900">
        <ArrowLeft size={15} /> Back to products
      </button>
      <form onSubmit={handleSave} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel className="flex flex-col gap-5 lg:col-span-2">
          <div>
            <h1 className="font-display text-lg font-bold text-slate-900 sm:text-xl">Add Product</h1>
            <p className="mt-1 text-sm text-slate-400">Fill in the details of your new digital product.</p>
          </div>
          <Field label="Product name">
            <input required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Minimal UI Kit" className={inputClass} />
          </Field>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Category">
              <select value={form.category} onChange={(e) => update("category", e.target.value)} className={inputClass}>
                {["Design Assets", "Templates", "Course", "Ebook", "Audio"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Price (USD)">
              <input required type="number" min="0" value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="49" className={inputClass} />
            </Field>
          </div>
          <Field label="Description">
            <textarea rows={5} value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="What's included, license terms, formats..." className={inputClass} />
          </Field>
          <Field label="Tags">
            <input value={form.tags} onChange={(e) => update("tags", e.target.value)} placeholder="figma, ui-kit, dark-mode" className={inputClass} />
          </Field>
        </Panel>

        <div className="flex flex-col gap-6">
          <Panel>
            <h2 className="font-display mb-3 text-sm font-semibold text-slate-900">Cover art</h2>
            <div className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-slate-300">
              <UploadCloud size={22} />
              <span className="text-xs">Click or drag file</span>
            </div>
          </Panel>
          <Panel>
            <h2 className="font-display mb-3 text-sm font-semibold text-slate-900">Delivery file</h2>
            <div className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-6 text-slate-400 hover:border-slate-300">
              <FileUp size={18} />
              <span className="text-xs">Upload .zip, .pdf...</span>
            </div>
          </Panel>
          <Panel>
            <h2 className="font-display mb-3 text-sm font-semibold text-slate-900">Status</h2>
            <div className="flex gap-2">
              {["Draft", "Published"].map((s) => (
                <button type="button" key={s} onClick={() => update("status", s)} className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium ${form.status === s ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                  {s}
                </button>
              ))}
            </div>
            <button type="submit" className="mt-4 w-full rounded-xl bg-slate-900 py-2.5 text-sm font-medium text-white hover:bg-slate-800">
              Save product
            </button>
            {saved && <p className="mt-2 text-center text-xs font-medium text-emerald-600">Product saved successfully.</p>}
          </Panel>
        </div>
      </form>
    </div>
  );
}

function OrdersPage() {
  const [query, setQuery] = useState("");
  const filtered = ORDERS.filter((o) => o.customer.toLowerCase().includes(query.toLowerCase()) || o.id.toLowerCase().includes(query.toLowerCase()));

  return (
    <Panel>
      <PageHeader
        title="Orders"
        subtitle="All customer purchases and their delivery status."
        actions={
          <>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2">
              <Search size={15} className="text-slate-400" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search orders..." className="w-32 bg-transparent text-sm focus:outline-none sm:w-44" />
            </div>
            <button className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
              <Download size={15} /> Export
            </button>
          </>
        }
      />

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
              <th className="pb-3 font-medium">Order</th>
              <th className="pb-3 font-medium">Customer</th>
              <th className="pb-3 font-medium">Product</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Amount</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="border-b border-slate-50 last:border-0">
                <td className="py-3 font-medium text-slate-900">{o.id}</td>
                <td className="py-3 text-slate-600">{o.customer}</td>
                <td className="py-3 text-slate-600">{o.product}</td>
                <td className="py-3 text-slate-400">{o.date}</td>
                <td className="py-3 font-medium text-slate-900">${o.amount}</td>
                <td className="py-3"><OrderStatusBadge status={o.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 md:hidden">
        {filtered.map((o) => (
          <div key={o.id} className="rounded-2xl border border-slate-200 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">{o.id}</span>
              <OrderStatusBadge status={o.status} />
            </div>
            <p className="text-sm text-slate-600">{o.customer}</p>
            <p className="text-xs text-slate-400">{o.product}</p>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
              <span>{o.date}</span>
              <span className="text-sm font-semibold text-slate-900">${o.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function MarketingPage() {
  return (
    <div className="flex flex-col gap-6">
      <Panel>
        <PageHeader
          title="Marketing"
          subtitle="Campaigns, discounts and promotions for your store."
          actions={
            <button className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-slate-800">
              <Plus size={15} /> New Campaign
            </button>
          }
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard icon={Megaphone} label="Active Campaigns" value="6" color="bg-indigo-50 text-indigo-600" />
          <StatCard icon={Tag} label="Discount Codes" value="14" color="bg-amber-50 text-amber-600" />
          <StatCard icon={Mail} label="Subscribers" value="3,842" color="bg-sky-50 text-sky-600" />
          <StatCard icon={TrendingUp} label="Conversion Rate" value="4.8%" delta="+0.6%" color="bg-emerald-50 text-emerald-600" />
        </div>
      </Panel>

      <Panel>
        <h2 className="font-display mb-4 text-base font-semibold text-slate-900">Campaigns</h2>
        <div className="flex flex-col gap-3">
          {CAMPAIGNS.map((c) => (
            <div key={c.name} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 p-4">
              <div className="min-w-[10rem]">
                <p className="text-sm font-medium text-slate-900">{c.name}</p>
                <p className="text-xs text-slate-400">{c.type}</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${c.status === "Active" ? "bg-emerald-50 text-emerald-700" : c.status === "Scheduled" ? "bg-sky-50 text-sky-700" : "bg-slate-100 text-slate-500"}`}>
                {c.status}
              </span>
              <span className="text-sm text-slate-500">{c.reach} reach</span>
              <span className="text-sm font-medium text-slate-900">{c.performance}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel>
        <h2 className="font-display mb-4 text-base font-semibold text-slate-900">Discount codes</h2>
        <div className="flex flex-col gap-3">
          {DISCOUNT_CODES.map((d) => (
            <div key={d.code} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 p-4">
              <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-xs font-semibold text-slate-700">{d.code}</span>
              <span className="text-sm text-slate-600">{d.discount}</span>
              <span className="text-sm text-slate-400">{d.uses} uses</span>
              <span className="text-sm text-slate-400">Expires {d.expires}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <Panel>
        <PageHeader title="Analytics" subtitle="Understand how customers find and buy your products." />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard icon={Eye} label="Total Views" value="48.2k" delta="+14%" color="bg-indigo-50 text-indigo-600" />
          <StatCard icon={TrendingUp} label="Conversion Rate" value="4.8%" delta="+0.6%" color="bg-emerald-50 text-emerald-600" />
          <StatCard icon={DollarSign} label="Avg Order Value" value="$68" delta="+$4" color="bg-amber-50 text-amber-600" />
          <StatCard icon={RotateCcw} label="Refund Rate" value="1.2%" delta="-0.3%" color="bg-rose-50 text-rose-600" />
        </div>
      </Panel>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <h2 className="font-display mb-4 text-base font-semibold text-slate-900">Sales by category</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CATEGORY_DATA} margin={{ left: -20, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="category" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} interval={0} angle={-15} textAnchor="end" height={50} />
                <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }} />
                <Bar dataKey="sales" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel>
          <h2 className="font-display mb-4 text-base font-semibold text-slate-900">Traffic sources</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={TRAFFIC_DATA} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {TRAFFIC_DATA.map((d, i) => <Cell key={i} fill={TRAFFIC_COLORS[i % TRAFFIC_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            {TRAFFIC_DATA.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: TRAFFIC_COLORS[i % TRAFFIC_COLORS.length] }} />
                {d.name}
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

const SETTINGS_TABS = ["General", "Store", "Payments", "Notifications"];

function SettingsPage() {
  const [tab, setTab] = useState("General");
  const [notif, setNotif] = useState({ orders: true, marketing: false, product: true, security: true });

  return (
    <Panel>
      <PageHeader title="Settings" subtitle="Manage your account, store and payment preferences." />
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex gap-2 overflow-x-auto lg:w-48 lg:flex-col lg:overflow-visible">
          {SETTINGS_TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`shrink-0 rounded-xl px-3.5 py-2 text-left text-sm font-medium ${tab === t ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="flex-1 border-t border-slate-100 pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          {tab === "General" && (
            <div className="flex max-w-lg flex-col gap-5">
              <Field label="Store name"><input defaultValue="Vaultify Studio" className={inputClass} /></Field>
              <Field label="Support email"><input defaultValue="support@vaultify.store" className={inputClass} /></Field>
              <Field label="Timezone">
                <select className={inputClass}>
                  <option>GMT-3 (Brasília)</option>
                  <option>GMT-5 (New York)</option>
                  <option>GMT+0 (London)</option>
                </select>
              </Field>
              <button className="mt-2 w-fit rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800">Save changes</button>
            </div>
          )}
          {tab === "Store" && (
            <div className="flex max-w-lg flex-col gap-5">
              <Field label="Storefront URL"><input defaultValue="vaultify.store/marina" className={inputClass} /></Field>
              <Field label="Currency">
                <select className={inputClass}>
                  <option>USD ($)</option>
                  <option>BRL (R$)</option>
                  <option>EUR (€)</option>
                </select>
              </Field>
              <Field label="Language">
                <select className={inputClass}>
                  <option>Portuguese (BR)</option>
                  <option>English (US)</option>
                </select>
              </Field>
              <button className="mt-2 w-fit rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800">Save changes</button>
            </div>
          )}
          {tab === "Payments" && (
            <div className="flex max-w-lg flex-col gap-5">
              <Field label="Payout method">
                <div className="flex gap-2">
                  {["Bank transfer", "PayPal"].map((m) => (
                    <button key={m} type="button" className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">{m}</button>
                  ))}
                </div>
              </Field>
              <Field label="Bank account"><input placeholder="•••• •••• •••• 4821" className={inputClass} /></Field>
              <Field label="Tax ID"><input placeholder="000.000.000-00" className={inputClass} /></Field>
              <button className="mt-2 w-fit rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800">Save changes</button>
            </div>
          )}
          {tab === "Notifications" && (
            <div className="flex max-w-lg flex-col gap-4">
              {[
                { key: "orders", label: "New orders", desc: "Get notified when a customer buys a product." },
                { key: "marketing", label: "Marketing tips", desc: "Occasional emails to help grow your store." },
                { key: "product", label: "Product updates", desc: "News about Vaultify features." },
                { key: "security", label: "Security alerts", desc: "Sign-ins and account changes." },
              ].map((n) => (
                <div key={n.key} className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 p-4">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{n.label}</p>
                    <p className="text-xs text-slate-400">{n.desc}</p>
                  </div>
                  <Toggle checked={notif[n.key]} onChange={(v) => setNotif((s) => ({ ...s, [n.key]: v }))} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Panel>
  );
}

function ProfilePage() {
  return (
    <div className="flex flex-col gap-6">
      <Panel className="overflow-hidden !p-0">
        <div className="h-28 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 sm:h-36" />
        <div className="px-4 pb-6 sm:px-6">
          <div className="-mt-10 flex flex-col items-start gap-4 sm:-mt-12 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <div className="h-20 w-20 shrink-0 rounded-2xl bg-gradient-to-br from-amber-400 to-pink-500 ring-4 ring-white sm:h-24 sm:w-24" />
              <div className="pb-1">
                <h1 className="font-display text-lg font-bold text-slate-900 sm:text-xl">Marina Duarte</h1>
                <p className="text-sm text-slate-400">Digital Products Seller · @marina.duarte</p>
              </div>
            </div>
            <button className="rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">Edit profile</button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[["Products", "24"], ["Total Sales", "1,204"], ["Rating", "4.9"], ["Member since", "2023"]].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-slate-100 p-4 text-center">
                <p className="font-display text-lg font-bold text-slate-900">{value}</p>
                <p className="text-xs text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      <Panel>
        <h2 className="font-display mb-4 text-base font-semibold text-slate-900">About</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Full name"><input defaultValue="Marina Duarte" className={inputClass} /></Field>
          <Field label="Username"><input defaultValue="marina.duarte" className={inputClass} /></Field>
          <Field label="Email"><input defaultValue="marina@vaultify.store" className={inputClass} /></Field>
          <Field label="Website"><input defaultValue="marinaduarte.design" className={inputClass} /></Field>
          <div className="sm:col-span-2">
            <Field label="Bio"><textarea rows={4} defaultValue="I design and sell UI kits, templates and courses for makers and startups." className={inputClass} /></Field>
          </div>
        </div>
        <button className="mt-5 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800">Save changes</button>
      </Panel>
    </div>
  );
}

/* ---------------------------------- app ----------------------------------- */

export default function VaultifyApp() {
  const [page, setPage] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (p) => { setPage(p); setMenuOpen(false); };
  const activeNavKey = page === "add-product" ? "products" : page;

  let content;
  switch (page) {
    case "dashboard": content = <DashboardPage />; break;
    case "products": content = <ProductsPage onAdd={() => navigate("add-product")} />; break;
    case "add-product": content = <AddProductPage onBack={() => navigate("products")} />; break;
    case "orders": content = <OrdersPage />; break;
    case "marketing": content = <MarketingPage />; break;
    case "analytics": content = <AnalyticsPage />; break;
    case "settings": content = <SettingsPage />; break;
    case "profile": content = <ProfilePage />; break;
    default: content = <DashboardPage />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif; }
      `}</style>
      <TopBar page={activeNavKey} navigate={navigate} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {content}
      </main>
    </div>
  );
}
