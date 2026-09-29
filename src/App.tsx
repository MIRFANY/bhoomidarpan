import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  ArrowUp,
  BarChart3,
  Bell,
  Bot,
  Check,
  ChevronDown,
  ChevronRight,
  Database,
  Eye,
  EyeOff,
  Facebook,
  FileText,
  FolderOpen,
  Handshake,
  House,
  IndianRupee,
  Instagram,
  Layers,
  LayoutDashboard,
  Lock,
  Mail,
  Map as MapIcon,
  MapPin,
  Menu,
  MessageSquareText,
  Network,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Sprout,
  Users,
  Youtube,
  X,
} from 'lucide-react';

type View = 'home' | 'login' | 'dashboard';
type IconType = typeof FileText;

const LOGIN_BG = '/images/hero-background.jpeg';
const MAP_BG =
  'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1400&q=80';

const credentials = {
  username: 'vikas.patil@nashik.gov.in',
  password: 'NLA@District2026',
};

const sidebarItems = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Projects', icon: FolderOpen },
  { label: 'Land Parcels', icon: MapPin },
  { label: 'Approvals', icon: ShieldCheck },
  { label: 'Compensation', icon: IndianRupee },
  { label: 'R&R', icon: House },
  { label: 'Documents', icon: FileText },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'Reports', icon: Layers },
  { label: 'Settings', icon: Settings },
];

const kpiCards = [
  { icon: FolderOpen, label: 'Total Projects', value: '48', sub: '12 in progress', tone: 'blue' },
  { icon: Sprout, label: 'Land Acquired', value: '9,482 acres', sub: '76% of proposed', tone: 'green' },
  { icon: IndianRupee, label: 'Compensation Disbursed', value: '₹ 1,256 Cr', sub: '81% of assessed', tone: 'purple' },
  { icon: Users, label: 'Affected Families', value: '8,421', sub: '6,102 compensated', tone: 'orange' },
  { icon: House, label: 'R&R Completed', value: '68%', sub: '2,148 / 3,156', tone: 'red' },
];

const progressSteps = [
  { title: 'Project Proposal', status: 'done' as const, meta: 'Completed · 12 Jan 2026' },
  { title: 'Verification & Scrutiny', status: 'done' as const, meta: 'Completed · 28 Jan 2026' },
  { title: 'State Approval', status: 'active' as const, meta: 'In Progress' },
  { title: 'Notification', status: 'pending' as const, meta: 'Pending' },
  { title: 'Award Declaration', status: 'pending' as const, meta: 'Pending' },
  { title: 'Compensation', status: 'pending' as const, meta: 'Pending' },
  { title: 'Possession', status: 'pending' as const, meta: 'Pending' },
  { title: 'R&R', status: 'pending' as const, meta: 'Pending' },
];

const stateProgress = [
  { label: 'Maharashtra', value: 82, color: 'bg-emerald-500' },
  { label: 'Gujarat', value: 74, color: 'bg-blue-500' },
  { label: 'Rajasthan', value: 69, color: 'bg-orange-400' },
  { label: 'Madhya Pradesh', value: 63, color: 'bg-violet-400' },
  { label: 'Uttar Pradesh', value: 56, color: 'bg-slate-400' },
];

const activities = [
  { label: 'Compensation disbursed for Village Kanhe', time: '2 hours ago', color: 'bg-emerald-500' },
  { label: 'State approval pending for NH-60 Project', time: 'Today, 11:30 AM', color: 'bg-red-500' },
  { label: 'Document verified: Award Notice', time: 'Today, 09:15 AM', color: 'bg-emerald-500' },
  { label: 'New parcel added in Survey No. 231', time: 'Yesterday, 05:45 PM', color: 'bg-blue-500' },
  { label: 'R&R survey scheduled for Sinnar block', time: 'Yesterday, 02:10 PM', color: 'bg-orange-400' },
];

const alerts = [
  { count: '12', label: 'Approvals Overdue' },
  { count: '7', label: 'Compensation Delays' },
  { count: '3', label: 'R&R Milestones Missed' },
  { count: '14', label: 'Documents Pending Verification' },
];

const loginFeatures: { icon: IconType; title: string; text: string; tone: string }[] = [
  { icon: ShieldCheck, title: 'Secure Access', text: 'Role-based authentication.', tone: 'blue' },
  { icon: Database, title: 'Integrated Data', text: 'Unified land records & documents.', tone: 'green' },
  { icon: Network, title: 'Multi-Department', text: 'Central, State & District coordination.', tone: 'orange' },
  { icon: BarChart3, title: 'Real-time Monitoring', text: 'Track progress and key metrics.', tone: 'purple' },
];

const chatSuggestions = [
  'Project status',
  'Pending approvals',
  'Compensation summary',
  'Policy guidelines',
  'Generate reports',
  'Analyze delays',
];

const chatTools = [
  'Summarize Document',
  'Compare Land Records',
  'Explain Policy',
  'Analyze Project Risk',
  'Generate Meeting Notes',
];

const pendingApprovals = [
  { no: 'APP-24081', project: 'NH-60 Widening', type: 'State Approval', since: '18 Mar 2026', days: 9, tone: 'red' },
  { no: 'APP-24064', project: 'Sinnar Industrial', type: 'Award Review', since: '21 Mar 2026', days: 6, tone: 'orange' },
  { no: 'APP-24052', project: 'Igatpuri Bypass', type: 'Compensation', since: '24 Mar 2026', days: 3, tone: 'yellow' },
  { no: 'APP-24041', project: 'Metro Depot Site', type: 'Notification', since: '25 Mar 2026', days: 2, tone: 'green' },
];

type ChatMessage =
  | { id: string; role: 'bot' | 'user'; kind: 'text'; text: string }
  | { id: string; role: 'bot'; kind: 'approvals' };

function Emblem({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="30" stroke="#0b3b82" strokeWidth="2.5" />
      <path d="M20 44h24M24 44V28l8-10 8 10v16M28 44v-8h8v8" stroke="#0b3b82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="22" r="2.5" fill="#0b3b82" />
      <path d="M18 20c4-6 10-8 14-8s10 2 14 8" stroke="#c45c26" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ToneIcon({ icon: Icon, tone, size = 22 }: { icon: IconType; tone: string; size?: number }) {
  const tones: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-emerald-50 text-emerald-600',
    purple: 'bg-violet-50 text-violet-600',
    orange: 'bg-orange-50 text-orange-500',
    red: 'bg-red-50 text-red-500',
  };
  return (
    <div className={`kpi-icon ${tones[tone] ?? tones.blue}`}>
      <Icon size={size} strokeWidth={1.8} />
    </div>
  );
}

function BrandBlock() {
  return (
    <div className="min-w-0 text-left">
      <p className="text-[17px] font-bold leading-tight text-[#123a7c]">BhoomiDarpan</p>
      <p className="mt-0.5 text-[11px] text-slate-500">Transparent · Efficient · Data-Driven Land Acquisition</p>
    </div>
  );
}

function PublicHeader({ onNav, onLogin }: { onNav?: (label: string) => void; onLogin?: () => void }) {
  const items = ['Home', 'About', 'How It Works', 'Projects', 'Contact'];
  return (
    <header className="relative z-20 border-b border-white/60 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <BrandBlock />
        <nav className="hidden items-center gap-6 lg:flex">
          {items.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onNav?.(item)}
              className="text-[13px] font-semibold text-slate-600 transition hover:text-[#0b3b82]"
            >
              {item}
            </button>
          ))}
          {onLogin && <button type="button" onClick={onLogin} className="rounded-lg bg-[#0b3b82] px-4 py-2 text-[12px] font-semibold text-white shadow-sm transition hover:bg-[#092e67]">Officer Login</button>}
        </nav>
        {onLogin && <button type="button" onClick={onLogin} className="rounded-lg bg-[#0b3b82] px-3 py-2 text-[12px] font-semibold text-white lg:hidden">Login</button>}
      </div>
    </header>
  );
}

function PublicFooter() {
  const partnerTiles = [
    { title: 'Digital India', detail: 'Power to Empower' },
    { title: 'india.gov.in', detail: 'National Portal of India' },
    { title: 'myGov', detail: 'Meri Sarkar' },
    { title: 'NMDS', detail: 'National Metadata Structure' },
  ];

  return <footer className="public-footer">
    <div className="partner-strip"><button type="button" className="partner-arrow" aria-label="Previous partners">‹</button><div className="partner-grid">{partnerTiles.map((tile) => <div key={tile.title} className="partner-tile"><strong>{tile.title}</strong><span>{tile.detail}</span></div>)}</div><button type="button" className="partner-arrow" aria-label="Next partners">›</button></div>
    <div className="footer-main"><div><h2>Useful Links</h2><div className="footer-links"><button type="button">› Archives</button><button type="button">› Website Policies</button><button type="button">› Related Links</button><button type="button">› Sitemap</button><button type="button">› Help</button><button type="button">› Contact Us</button><button type="button">› Feedback</button></div></div><div className="footer-social"><h2>Subscribe for Update</h2><div className="social-icons"><button type="button" aria-label="X social link">X</button><button type="button" aria-label="YouTube social link"><Youtube size={19} /></button><button type="button" aria-label="Facebook social link"><Facebook size={19} /></button><button type="button" aria-label="Instagram social link"><Instagram size={19} /></button></div><p>Last Updated On: 29.09.2026</p></div></div>
    <button type="button" className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><ArrowUp size={20} /></button>
  </footer>;
}

function HomePage({ onLogin }: { onLogin: () => void }) {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <div className="min-h-screen bg-[#eef3f8]">
      <PublicHeader onLogin={onLogin} onNav={(label) => scrollTo(label === 'Home' ? 'home-top' : label === 'About' ? 'about' : 'services')} />
      <main id="home-top">
        <section className="relative min-h-[calc(100vh-72px)] overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${LOGIN_BG})` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/20" />
          <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-[1440px] items-center px-5 py-16 sm:px-8 lg:px-10">
            <div className="max-w-2xl">
              <div className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.08em] text-[#56708f]"><span className="h-[3px] w-9 bg-[#f39b3a]" />Digital land governance</div>
              <h1 className="text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#123e7e] sm:text-6xl">BhoomiDarpan</h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#38547d]">A secure, integrated platform for transparent land acquisition, compensation tracking, approvals, and rehabilitation across India.</p>
              <div className="mt-8 flex flex-wrap gap-3"><button type="button" onClick={onLogin} className="rounded-lg bg-[#0b3b82] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#092e67]">Officer Login <ArrowRight className="ml-2 inline" size={16} /></button><button type="button" onClick={() => scrollTo('services')} className="rounded-lg border border-[#174d9d] bg-white/80 px-6 py-3 text-sm font-semibold text-[#0b3b82]">Explore Platform</button></div>
            </div>
          </div>
        </section>
        <section id="about" className="mx-auto max-w-6xl px-5 py-16 sm:px-8"><div className="grid gap-5 md:grid-cols-3"><div className="card p-5"><ShieldCheck className="text-blue-600" /><h2 className="mt-4 font-bold text-[#123e7e]">Secure Access</h2><p className="mt-2 text-sm text-slate-500">Role-based access for authorized departments and agencies.</p></div><div className="card p-5"><Database className="text-emerald-600" /><h2 className="mt-4 font-bold text-[#123e7e]">Integrated Records</h2><p className="mt-2 text-sm text-slate-500">Unified project, parcel, document, and compensation records.</p></div><div className="card p-5"><BarChart3 className="text-violet-600" /><h2 className="mt-4 font-bold text-[#123e7e]">Real-time Monitoring</h2><p className="mt-2 text-sm text-slate-500">Track progress, approvals, risks, and key milestones.</p></div></div></section>
        <section id="services" className="bg-white px-5 py-16 text-center"><h2 className="text-2xl font-bold text-[#123e7e]">One platform for every stakeholder</h2><p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">Connect Central Ministries, State Governments, District Authorities, and Implementing Agencies through one transparent workflow.</p></section>
      </main>
      <PublicFooter />
    </div>
  );
}

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState(credentials.username);
  const [password, setPassword] = useState(credentials.password);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (username.trim() === credentials.username && password === credentials.password) {
      setError('');
      onLogin();
      return;
    }
    setError('Invalid credentials. Use the demo District Administrator account.');
  };

  return (
    <div className="min-h-screen bg-[#eef3f8]">
      <PublicHeader />
      <section className="relative min-h-[calc(100vh-72px)] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${LOGIN_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/35" />
        <div className="relative mx-auto grid max-w-[1440px] gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-10 lg:py-14">
          <div className="max-w-[640px]">
            <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.08em] text-[#56708f]">
              <span className="h-[3px] w-9 bg-[#f39b3a]" />
              Secure Access for Authorized Users
            </div>
            <h1 className="text-4xl font-bold leading-[1.12] tracking-[-0.03em] text-[#123e7e] sm:text-[42px]">
              BhoomiDarpan
            </h1>
            <p className="mt-4 max-w-[540px] text-[15px] leading-7 text-[#38547d]">
              A secure and integrated platform for Central Ministries, State Governments, District Authorities and Implementing Agencies to manage land acquisition projects.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {loginFeatures.map((feature) => (
                <div key={feature.title} className="min-w-0">
                  <ToneIcon icon={feature.icon} tone={feature.tone} size={20} />
                  <h3 className="mt-3 text-[13px] font-bold text-[#123e7e]">{feature.title}</h3>
                  <p className="mt-1 text-[12px] leading-5 text-slate-500">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={submit} className="mx-auto w-full max-w-[420px] rounded-2xl border border-[#dce6f2] bg-white p-6 shadow-[0_18px_50px_rgba(15,45,90,0.16)] sm:p-7">
            <div className="mb-5 flex flex-col items-center text-center">
              <Emblem size={48} />
              <p className="mt-2 text-[10px] font-semibold leading-4 text-slate-500">
                Government of India
                <br />
                Ministry of Rural Development
                <br />
                Department of Land Resources
              </p>
              <h2 className="mt-4 text-2xl font-bold text-[#123e7e]">Officer Login</h2>
              <p className="mt-1 text-sm text-slate-500">Access your BhoomiDarpan account</p>
            </div>

            <label className="block text-[12px] font-semibold text-slate-600">
              Official Email / User ID
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-[#d7e2ef] bg-[#f8fbff] px-3 py-2.5 focus-within:border-[#0b3b82]">
                <Mail size={16} className="text-slate-400" />
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  placeholder="name@gov.in / employee ID"
                  autoComplete="username"
                  required
                />
              </div>
            </label>

            <label className="mt-4 block text-[12px] font-semibold text-slate-600">
              Password
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-[#d7e2ef] bg-[#f8fbff] px-3 py-2.5 focus-within:border-[#0b3b82]">
                <Lock size={16} className="text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="text-slate-400" aria-label="Toggle password">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>

            <div className="mt-2 flex justify-end">
              <button type="button" className="text-[12px] font-semibold text-[#1456c0]">
                Forgot Password?
              </button>
            </div>

            {error && (
              <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-[12px] font-semibold text-red-600" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0b3b82] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#092e67]"
            >
              Login <ArrowRight size={16} />
            </button>

            <div className="my-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              <span className="h-px flex-1 bg-slate-200" />
              Or login with
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="rounded-lg border border-[#d7e2ef] px-3 py-2.5 text-[12px] font-bold text-[#0b3b82]">
                NIC
              </button>
              <button type="button" className="rounded-lg border border-[#d7e2ef] px-3 py-2.5 text-[12px] font-bold text-[#0b3b82]">
                Digital India
              </button>
            </div>

            <div className="mt-5 flex items-start gap-2 rounded-lg bg-[#eef5ff] px-3 py-3 text-[11px] leading-4 text-[#2f5f9b]">
              <Lock size={14} className="mt-0.5 shrink-0" />
              This is a secure Government of India portal. Unauthorized access is prohibited.
            </div>

            <p className="mt-4 text-center text-[10px] text-slate-400">
              Demo: {credentials.username} / {credentials.password}
            </p>
          </form>
        </div>
      </section>
      <PublicFooter />
    </div>
  );
}

function DashboardShell({ onLogout }: { onLogout: () => void }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [filters, setFilters] = useState({ state: 'Maharashtra', district: 'Nashik', project: 'All Projects', period: 'Last 6 Months' });
  const [zoom, setZoom] = useState(1);
  const [notice, setNotice] = useState('');
  const updateFilter = (key: keyof typeof filters, value: string) => setFilters((current) => ({ ...current, [key]: value }));
  const showNotice = (text: string) => { setNotice(text); window.setTimeout(() => setNotice(''), 2200); };

  return (
    <div className="flex min-h-screen bg-[#f4f7fb]">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[232px] flex-col bg-[#0b3b82] text-white transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4">
          <Emblem size={34} />
          <div>
            <p className="text-[11px] font-bold leading-tight">BhoomiDarpan</p>
            <p className="text-[10px] text-blue-100">Land Governance</p>
          </div>
          <button type="button" className="ml-auto rounded p-1 lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {sidebarItems.map((item) => (
            <button key={item.label} type="button" onClick={() => { setActiveSection(item.label); setSidebarOpen(false); showNotice(`${item.label} section selected`); }} className={`sidebar-item ${activeSection === item.label ? 'active' : ''}`}>
              <item.icon size={17} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-white/10 px-4 py-4">
          <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="flex h-full w-full">
              <span className="w-1/3 bg-[#ff9933]" />
              <span className="w-1/3 bg-white" />
              <span className="w-1/3 bg-[#138808]" />
            </div>
          </div>
          <p className="text-[11px] font-semibold text-blue-100">Digital Land Governance</p>
        </div>
      </aside>

      {sidebarOpen && <button type="button" className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close overlay" />}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-[64px] items-center gap-3 border-b border-[#e2eaf3] bg-white px-4 sm:px-6">
          <button type="button" className="rounded-lg border border-[#d7e2ef] p-2 text-[#0b3b82] lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Menu size={18} />
          </button>
          <div className="hidden items-center gap-2 md:flex">
            <Emblem size={30} />
            <div className="leading-tight">
              <p className="text-[11px] font-bold text-[#123e7e]">BhoomiDarpan</p>
              <p className="text-[10px] text-slate-500">District Operations Console</p>
            </div>
          </div>
          <div className="ml-auto flex max-w-md flex-1 items-center gap-2 rounded-lg border border-[#d7e2ef] bg-[#f8fbff] px-3 py-2">
            <Search size={15} className="text-slate-400" />
            <input className="w-full bg-transparent text-[13px] outline-none placeholder:text-slate-400" placeholder="Search projects, parcels, documents..." />
          </div>
          <button type="button" onClick={() => showNotice('You have 5 notifications')} className="relative rounded-lg border border-[#d7e2ef] p-2 text-slate-600" aria-label="Notifications">
            <Bell size={17} />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">5</span>
          </button>
          <button type="button" onClick={onLogout} className="flex items-center gap-2 rounded-lg border border-[#d7e2ef] px-2 py-1.5 text-left">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0b3b82] text-[11px] font-bold text-white">DA</div>
            <div className="hidden leading-tight sm:block">
              <p className="text-[12px] font-bold text-[#123e7e]">District Administrator</p>
              <p className="text-[10px] text-slate-500">Nashik, Maharashtra</p>
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </button>
        </header>

        <main className="flex-1 overflow-x-hidden p-4 sm:p-6">
          <div className="mb-5 flex flex-wrap items-start justify-end gap-4">
            <div className="flex flex-wrap gap-2">
              <label className="filter-chip"><span>State</span><select value={filters.state} onChange={(event) => updateFilter('state', event.target.value)} aria-label="Filter by state"><option>Maharashtra</option><option>Gujarat</option><option>Rajasthan</option></select><ChevronDown size={14} /></label>
              <label className="filter-chip"><span>District</span><select value={filters.district} onChange={(event) => updateFilter('district', event.target.value)} aria-label="Filter by district"><option>Nashik</option><option>Pune</option><option>Nagpur</option></select><ChevronDown size={14} /></label>
              <label className="filter-chip"><span>Project</span><select value={filters.project} onChange={(event) => updateFilter('project', event.target.value)} aria-label="Filter by project"><option>All Projects</option><option>NH-60 Widening</option><option>Sinnar Industrial</option></select><ChevronDown size={14} /></label>
              <label className="filter-chip"><span>Period</span><select value={filters.period} onChange={(event) => updateFilter('period', event.target.value)} aria-label="Filter by period"><option>Last 6 Months</option><option>Last 12 Months</option><option>Year to Date</option></select><ChevronDown size={14} /></label>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {kpiCards.map((item) => (
              <div key={item.label} className="card flex items-center gap-3 p-4">
                <ToneIcon icon={item.icon} tone={item.tone} />
                <div className="min-w-0">
                  <p className="text-[11px] text-slate-500">{item.label}</p>
                  <p className="truncate text-[20px] font-bold text-[#123e7e]">{item.value}</p>
                  <p className="text-[10px] text-slate-400">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-[1.55fr_1fr]">
            <section className="card p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="flex items-center gap-2 text-sm font-bold text-[#123e7e]">
                  <MapIcon size={17} /> Land Acquisition Map – Nashik District
                </h2>
                <button type="button" onClick={() => showNotice('Opening the full Nashik district map')} className="text-xs font-semibold text-[#1456c0]">
                  View Full Map <ArrowRight size={12} className="inline" />
                </button>
              </div>
              <div className="relative h-[340px] overflow-hidden rounded-xl bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(8,40,28,0.18), rgba(8,40,28,0.18)), url(${MAP_BG})`, backgroundSize: `${zoom * 100}% auto` }}>
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 400" preserveAspectRatio="none" aria-hidden="true">
                  <polygon points="120,80 220,60 280,140 180,190" fill="rgba(34,197,94,0.45)" stroke="#16a34a" strokeWidth="2" />
                  <polygon points="300,90 420,70 460,170 320,200" fill="rgba(250,204,21,0.4)" stroke="#ca8a04" strokeWidth="2" />
                  <polygon points="480,100 600,80 640,180 500,210" fill="rgba(59,130,246,0.4)" stroke="#2563eb" strokeWidth="2" />
                  <polygon points="180,230 300,210 340,300 200,330" fill="rgba(249,115,22,0.4)" stroke="#ea580c" strokeWidth="2" />
                  <polygon points="380,240 520,220 560,320 400,340" fill="rgba(239,68,68,0.4)" stroke="#dc2626" strokeWidth="2" />
                </svg>

                <div className="absolute left-3 top-3 overflow-hidden rounded-md bg-white text-sm font-bold text-slate-600 shadow">
                  <button type="button" onClick={() => setZoom((value) => Math.min(value + 0.2, 2))} className="block w-9 py-1.5 hover:bg-slate-50">+</button>
                  <div className="border-t border-slate-200" />
                  <button type="button" onClick={() => setZoom((value) => Math.max(value - 0.2, 0.8))} className="block w-9 py-1.5 hover:bg-slate-50">−</button>
                </div>

                <div className="absolute right-3 top-3 rounded-lg bg-white/95 p-3 text-[11px] text-slate-600 shadow">
                  <p className="mb-2 font-bold text-slate-700">Parcel Status</p>
                  <p className="mb-1"><i className="dot bg-green-500" />Acquired</p>
                  <p className="mb-1"><i className="dot bg-yellow-400" />Under Acquisition</p>
                  <p className="mb-1"><i className="dot bg-blue-500" />Compensation Pending</p>
                  <p className="mb-1"><i className="dot bg-orange-400" />R&amp;R Pending</p>
                  <p><i className="dot bg-red-500" />Disputed</p>
                </div>

              </div>
            </section>

            <div className="space-y-4">
              <section className="card p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-sm font-bold text-[#123e7e]">
                    <Activity size={17} /> Acquisition Progress – NH-60 Project
                  </h2>
                  <button type="button" onClick={() => showNotice('Acquisition progress details selected')} className="text-xs font-semibold text-[#1456c0]">View Details →</button>
                </div>
                <div className="space-y-0">
                  {progressSteps.map((step) => (
                    <div key={step.title} className="flex items-start gap-3 border-l-2 border-[#dbe7f5] py-2 pl-4 text-xs last:border-transparent">
                      <span
                        className={`-ml-[23px] mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-white ${
                          step.status === 'done'
                            ? 'bg-emerald-500'
                            : step.status === 'active'
                              ? 'pulse-dot bg-blue-500'
                              : 'bg-slate-300'
                        }`}
                      >
                        {step.status === 'done' ? <Check size={10} /> : null}
                      </span>
                      <span className="font-semibold text-slate-700">{step.title}</span>
                      <span className="ml-auto text-[10px] text-slate-400">{step.meta}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="overflow-hidden rounded-xl border border-[#f0c9c9] bg-gradient-to-br from-[#fff7f7] to-white p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-sm font-bold text-[#123e7e]">
                    <Sparkles size={16} className="text-violet-500" /> AI Risk Analysis
                  </h2>
                  <span className="rounded-md bg-red-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">HIGH</span>
                </div>
                <p className="text-[12px] text-slate-600">
                  Delay Risk · Predicted Delay: <b className="text-red-600">32 days</b>
                </p>
                <ul className="mt-3 space-y-1.5 text-[12px] text-slate-600">
                  <li className="flex items-start gap-2"><AlertTriangle size={13} className="mt-0.5 text-red-500" /> Compensation pending for 18 parcels</li>
                  <li className="flex items-start gap-2"><AlertTriangle size={13} className="mt-0.5 text-red-500" /> 3 approvals overdue at State level</li>
                  <li className="flex items-start gap-2"><AlertTriangle size={13} className="mt-0.5 text-orange-500" /> Seasonal monsoon window approaching</li>
                </ul>
                <button type="button" onClick={() => showNotice('AI risk analysis opened')} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0b3b82] px-4 py-2.5 text-[12px] font-semibold text-white">
                  View Analysis <ArrowRight size={14} />
                </button>
              </section>
            </div>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <Panel title="State-wise Land Acquisition Progress">
              {stateProgress.map((row) => (
                <div key={row.label} className="mb-3 flex items-center gap-3 text-xs text-slate-600">
                  <span className="w-[108px] shrink-0">{row.label}</span>
                  <div className="h-2 flex-1 rounded-full bg-slate-100">
                    <div className={`h-2 rounded-full ${row.color}`} style={{ width: `${row.value}%` }} />
                  </div>
                  <b className="w-8 text-right text-slate-700">{row.value}%</b>
                </div>
              ))}
            </Panel>

            <Panel title="Recent Activities">
              {activities.map((item) => (
                <div key={item.label} className="mb-4 flex gap-3 text-xs last:mb-0">
                  <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${item.color}`} />
                  <div>
                    <p className="font-semibold text-slate-700">{item.label}</p>
                    <p className="mt-1 text-[10px] text-slate-400">{item.time}</p>
                  </div>
                </div>
              ))}
            </Panel>

            <Panel title="Attention Required">
              {alerts.map((item) => (
                <div key={item.label} className="mb-2 flex items-center justify-between rounded-lg bg-red-50 px-3 py-2.5 text-xs last:mb-0">
                  <b className="text-lg text-red-500">{item.count}</b>
                  <span className="mx-3 flex-1 text-slate-600">{item.label}</span>
                  <ArrowRight size={14} className="text-red-400" />
                </div>
              ))}
            </Panel>
          </div>
        </main>
      </div>

      <AiChatbot open={chatOpen} setOpen={setChatOpen} />
      {notice && <div role="status" className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-[#0b3b82] px-5 py-3 text-sm font-semibold text-white shadow-xl">{notice}</div>}
    </div>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="card p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold text-[#123e7e]">{title}</h2>
        <ChevronRight size={15} className="text-blue-500" />
      </div>
      {children}
    </section>
  );
}

function DayBadge({ days, tone }: { days: number; tone: string }) {
  const tones: Record<string, string> = {
    red: 'bg-red-100 text-red-700',
    orange: 'bg-orange-100 text-orange-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    green: 'bg-emerald-100 text-emerald-700',
  };
  return <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${tones[tone]}`}>{days}d</span>;
}

function AiChatbot({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'bot',
      kind: 'text',
      text: 'Hello! I’m your BhoomiDarpan AI Assistant. Ask about projects, approvals, compensation, or land records.',
    },
  ]);

  const showSuggestions = useMemo(() => messages.length <= 1, [messages.length]);

  const pushApprovals = () => {
    setMessages((current) => [
      ...current,
      { id: `u-${Date.now()}`, role: 'user', kind: 'text', text: 'Show me pending approvals in Nashik district' },
      { id: `b-${Date.now()}-t`, role: 'bot', kind: 'text', text: 'Found 4 pending approvals in Nashik district. Sorted by delay severity:' },
      { id: `b-${Date.now()}-a`, role: 'bot', kind: 'approvals' },
    ]);
  };

  const send = (event?: FormEvent) => {
    event?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    const lower = trimmed.toLowerCase();
    if (lower.includes('pending') || lower.includes('approval')) {
      setInput('');
      setMessages((current) => [...current, { id: `u-${Date.now()}`, role: 'user', kind: 'text', text: trimmed }]);
      window.setTimeout(() => {
        setMessages((current) => [
          ...current,
          { id: `b-${Date.now()}-t`, role: 'bot', kind: 'text', text: 'Found 4 pending approvals in Nashik district. Sorted by delay severity:' },
          { id: `b-${Date.now()}-a`, role: 'bot', kind: 'approvals' },
        ]);
      }, 350);
      return;
    }
    setMessages((current) => [
      ...current,
      { id: `u-${Date.now()}`, role: 'user', kind: 'text', text: trimmed },
      {
        id: `b-${Date.now()}`,
        role: 'bot',
        kind: 'text',
        text: 'I can help with project status, pending approvals, compensation summaries, and policy guidance. Try “Show me pending approvals in Nashik district”.',
      },
    ]);
    setInput('');
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#0b3b82] px-4 py-3 text-sm font-semibold text-white shadow-xl"
        >
          <Bot size={18} /> AI Assistant
        </button>
      )}

      {open && (
        <section className="fixed bottom-4 right-4 z-50 flex h-[min(640px,calc(100vh-2rem))] w-[min(420px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-[#d7e2ef] bg-white shadow-[0_20px_60px_rgba(15,45,90,0.25)]">
          <div className="flex items-center gap-3 bg-[#0b3b82] px-4 py-3 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
              <Bot size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold">BhoomiDarpan AI Assistant <span className="ml-1 rounded bg-white/20 px-1.5 py-0.5 text-[9px] font-semibold uppercase">Beta</span></p>
              <p className="truncate text-[11px] text-blue-100">Your intelligent land governance assistant</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-full p-1 hover:bg-white/15" aria-label="Close chatbot">
              <X size={18} />
            </button>
          </div>

          <div className="chat-scroll flex-1 space-y-3 overflow-y-auto bg-[#f7faff] p-4">
            {messages.map((message) => {
              if (message.kind === 'text') {
                return (
                  <div
                    key={message.id}
                    className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-[12px] leading-5 ${
                      message.role === 'user'
                        ? 'ml-auto bg-[#0b3b82] text-white'
                        : 'bg-white text-slate-700 shadow-sm ring-1 ring-[#e4ecf6]'
                    }`}
                  >
                    {message.text}
                  </div>
                );
              }

              return (
                <div key={message.id} className="space-y-3">
                  <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-[#e4ecf6]">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-left text-[10px]">
                        <thead className="bg-[#eef4fb] text-slate-500">
                          <tr>
                            <th className="px-2.5 py-2 font-semibold">Application No.</th>
                            <th className="px-2.5 py-2 font-semibold">Project</th>
                            <th className="px-2.5 py-2 font-semibold">Type</th>
                            <th className="px-2.5 py-2 font-semibold">Pending Since</th>
                            <th className="px-2.5 py-2 font-semibold">Days</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pendingApprovals.map((row) => (
                            <tr key={row.no} className="border-t border-[#eef2f7] text-slate-700">
                              <td className="px-2.5 py-2 font-semibold">{row.no}</td>
                              <td className="px-2.5 py-2">{row.project}</td>
                              <td className="px-2.5 py-2">{row.type}</td>
                              <td className="px-2.5 py-2">{row.since}</td>
                              <td className="px-2.5 py-2"><DayBadge days={row.days} tone={row.tone} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" className="flex items-center gap-2 rounded-xl bg-white px-3 py-3 text-left text-[11px] font-semibold text-[#123e7e] shadow-sm ring-1 ring-[#e4ecf6]">
                      <FileText size={16} className="text-violet-500" /> Generate Report
                    </button>
                    <button type="button" className="flex items-center gap-2 rounded-xl bg-white px-3 py-3 text-left text-[11px] font-semibold text-[#123e7e] shadow-sm ring-1 ring-[#e4ecf6]">
                      <MapIcon size={16} className="text-emerald-500" /> Visualize on Map
                    </button>
                  </div>
                </div>
              );
            })}

            {showSuggestions && (
              <div className="flex flex-wrap gap-2 pt-1">
                {chatSuggestions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      if (item === 'Pending approvals') pushApprovals();
                      else {
                        setMessages((current) => [
                          ...current,
                          { id: `u-${Date.now()}`, role: 'user', kind: 'text', text: item },
                          {
                            id: `b-${Date.now()}`,
                            role: 'bot',
                            kind: 'text',
                            text: `Here’s a quick overview for “${item}”. Ask for pending approvals to see a live table of delayed applications.`,
                          },
                        ]);
                      }
                    }}
                    className="rounded-full border border-[#c9daf0] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#1456c0]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={send} className="border-t border-[#e2eaf3] bg-white p-3">
            <div className="flex items-center gap-2 rounded-xl border border-[#d7e2ef] bg-[#f8fbff] px-3 py-2">
              <MessageSquareText size={15} className="text-slate-400" />
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-transparent text-[12px] outline-none placeholder:text-slate-400"
                placeholder="Ask anything about projects, land records, compensation..."
              />
              <button type="submit" className="rounded-lg bg-[#0b3b82] p-2 text-white" aria-label="Send">
                <Send size={14} />
              </button>
            </div>
            <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
              {chatTools.map((tool) => (
                <button
                  key={tool}
                  type="button"
                  className="shrink-0 rounded-full bg-[#eef4fb] px-2.5 py-1 text-[10px] font-semibold text-[#34557a]"
                >
                  {tool}
                </button>
              ))}
            </div>
          </form>
        </section>
      )}
    </>
  );
}

function App() {
  const [view, setView] = useState<View>('home');

  if (view === 'home') {
    return <HomePage onLogin={() => setView('login')} />;
  }

  if (view === 'login') {
    return <LoginPage onLogin={() => setView('dashboard')} />;
  }

  return <DashboardShell onLogout={() => setView('login')} />;
}

export default App;
