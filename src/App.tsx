import { createContext, useContext, useMemo, useState, type FormEvent, type ReactNode } from 'react';
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
type Language = 'en' | 'hi';
type StakeholderRole = 'Central Ministry' | 'State Government' | 'District Administration' | 'Implementing Agency';
type IconType = typeof FileText;

const translations = {
  en: {
    platform: 'BhoomiDarpan',
    tagline: 'Transparent · Efficient · Data-Driven Land Acquisition',
    home: 'Home', about: 'About', howItWorks: 'How It Works', projects: 'Projects', contact: 'Contact',
    officerLogin: 'Officer Login', login: 'Login', explore: 'Explore Platform',
    digitalGovernance: 'Digital land governance',
    heroText: 'A secure, integrated platform for transparent land acquisition, compensation tracking, approvals, and rehabilitation across India.',
    secureAccess: 'Secure Access', integratedRecords: 'Integrated Records', realTime: 'Real-time Monitoring',
    stakeholderPlatform: 'One platform for every stakeholder',
    loginAccess: 'Access your BhoomiDarpan account', officialId: 'Official Email / User ID', password: 'Password', forgot: 'Forgot Password?',
    signIn: 'Login', secureNotice: 'This is a secure Government of India portal. Unauthorized access is prohibited.',
    dashboard: 'Dashboard', landParcels: 'Land Parcels', approvals: 'Approvals', compensation: 'Compensation', documents: 'Documents', analytics: 'Analytics', reports: 'Reports', settings: 'Settings', rr: 'R&R',
    state: 'State', district: 'District', project: 'Project', period: 'Period', allProjects: 'All Projects', lastSixMonths: 'Last 6 Months',
    map: 'Land Acquisition Map – Nashik District', fullMap: 'View Full Map', parcelStatus: 'Parcel Status', acquired: 'Acquired', underAcquisition: 'Under Acquisition', compensationPending: 'Compensation Pending', rrPending: 'R&R Pending', disputed: 'Disputed',
    progress: 'Acquisition Progress – NH-60 Project', viewDetails: 'View Details →', risk: 'AI Risk Analysis', viewAnalysis: 'View Analysis',
    assistant: 'BhoomiDarpan AI Assistant', online: 'Your intelligent land governance assistant',
  },
  hi: {
    platform: 'भूमि दर्पण',
    tagline: 'पारदर्शी · कुशल · डेटा-संचालित भूमि अधिग्रहण',
    home: 'मुख्य पृष्ठ', about: 'परिचय', howItWorks: 'यह कैसे काम करता है', projects: 'परियोजनाएँ', contact: 'संपर्क',
    officerLogin: 'अधिकारी लॉगिन', login: 'लॉगिन', explore: 'प्लेटफ़ॉर्म देखें',
    digitalGovernance: 'डिजिटल भूमि प्रशासन',
    heroText: 'भारत में पारदर्शी भूमि अधिग्रहण, मुआवज़ा निगरानी, अनुमोदन और पुनर्वास के लिए सुरक्षित एकीकृत प्लेटफ़ॉर्म।',
    secureAccess: 'सुरक्षित पहुँच', integratedRecords: 'एकीकृत रिकॉर्ड', realTime: 'रियल-टाइम निगरानी',
    stakeholderPlatform: 'हर हितधारक के लिए एक प्लेटफ़ॉर्म',
    loginAccess: 'अपने भूमि दर्पण खाते में प्रवेश करें', officialId: 'आधिकारिक ईमेल / उपयोगकर्ता आईडी', password: 'पासवर्ड', forgot: 'पासवर्ड भूल गए?',
    signIn: 'लॉगिन', secureNotice: 'यह भारत सरकार का सुरक्षित पोर्टल है। अनधिकृत प्रवेश प्रतिबंधित है।',
    dashboard: 'डैशबोर्ड', landParcels: 'भूमि पार्सल', approvals: 'अनुमोदन', compensation: 'मुआवज़ा', documents: 'दस्तावेज़', analytics: 'विश्लेषण', reports: 'रिपोर्ट', settings: 'सेटिंग्स', rr: 'पुनर्वास',
    state: 'राज्य', district: 'जिला', project: 'परियोजना', period: 'अवधि', allProjects: 'सभी परियोजनाएँ', lastSixMonths: 'पिछले 6 महीने',
    map: 'भूमि अधिग्रहण मानचित्र – नासिक जिला', fullMap: 'पूरा मानचित्र देखें', parcelStatus: 'पार्सल स्थिति', acquired: 'अधिग्रहित', underAcquisition: 'अधिग्रहणाधीन', compensationPending: 'मुआवज़ा लंबित', rrPending: 'पुनर्वास लंबित', disputed: 'विवादित',
    progress: 'अधिग्रहण प्रगति – NH-60 परियोजना', viewDetails: 'विवरण देखें →', risk: 'AI जोखिम विश्लेषण', viewAnalysis: 'विश्लेषण देखें',
    assistant: 'भूमि दर्पण AI सहायक', online: 'आपका बुद्धिमान भूमि प्रशासन सहायक',
  },
} as const;

type TranslationKey = keyof typeof translations.en;
const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void }>({ language: 'en', setLanguage: () => undefined });
const useLanguage = () => { const context = useContext(LanguageContext); return { ...context, t: (key: TranslationKey) => translations[context.language][key] }; };

const LOGIN_BG = '/images/hero-background.jpeg';
const LOGIN_PAGE_BG = '/images/rashtrapati-bhavan.jpg';
const LOGIN_VIDEO = '/images/background-video.mp4';
const MAP_BG =
  'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1400&q=80';

const stakeholderAccounts: Record<StakeholderRole, { username: string; password: string; label: string; initials: string }> = {
  'Central Ministry': { username: 'rohit.sharma@dolr.gov.in', password: 'NLA@Central2026', label: 'Central Ministry Officer', initials: 'CM' },
  'State Government': { username: 'anita.deshmukh@maharashtra.gov.in', password: 'NLA@State2026', label: 'State Government Officer', initials: 'SG' },
  'District Administration': { username: 'vikas.patil@nashik.gov.in', password: 'NLA@District2026', label: 'District Administrator', initials: 'DA' },
  'Implementing Agency': { username: 'projectoffice@nhai.gov.in', password: 'NLA@Agency2026', label: 'Implementing Agency Officer', initials: 'IA' },
};

const roleNavigation: Record<StakeholderRole, string[]> = {
  'Central Ministry': ['Dashboard', 'Projects', 'Approvals', 'Notifications', 'Awards', 'Analytics', 'Reports', 'Documents', 'Settings', 'DPR Assessment'],
  'State Government': ['Dashboard', 'Projects', 'Approvals', 'Notifications', 'Awards', 'Compensation', 'Analytics', 'Reports', 'Documents', 'Settings', 'DPR Assessment'],
  'District Administration': ['Dashboard', 'Projects', 'Approvals', 'Notifications', 'Awards', 'Compensation', 'Land Parcels', 'R&R', 'Documents', 'Analytics', 'Reports', 'Settings', 'DPR Assessment'],
  'Implementing Agency': ['Dashboard', 'Projects', 'Land Parcels', 'Compensation', 'R&R', 'Documents', 'Reports', 'DPR Assessment'],
};

const sidebarItems = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Projects', icon: FolderOpen },
  { label: 'Land Parcels', icon: MapPin },
  { label: 'Approvals', icon: ShieldCheck },
  { label: 'Notifications', icon: Bell },
  { label: 'Awards', icon: ShieldCheck },
  { label: 'Compensation', icon: IndianRupee },
  { label: 'R&R', icon: House },
  { label: 'Documents', icon: FileText },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'Reports', icon: Layers },
  { label: 'Settings', icon: Settings },
  { label: 'DPR Assessment', icon: FileText },
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
  const { language, t } = useLanguage();
  return (
    <div className="min-w-0 text-left">
      <p className="brand-name text-[17px] font-bold leading-tight"><span className="brand-bhoomi">{language === 'hi' ? 'भूमि' : 'Bhoomi'}</span><span className="brand-darpan">{language === 'hi' ? ' दर्पण' : 'Darpan'}</span></p>
      <p className="mt-0.5 text-[11px] text-slate-500">{t('tagline')}</p>
    </div>
  );
}

function PublicHeader({ onNav, onLogin }: { onNav?: (label: string) => void; onLogin?: () => void }) {
  const { language, setLanguage, t } = useLanguage();
  const items = ['Home', 'About', 'How It Works', 'Projects', 'Contact'];
  const labels = [t('home'), t('about'), t('howItWorks'), t('projects'), t('contact')];
  return (
    <header className="public-navbar z-20 rounded-2xl border border-white/45 bg-white/35 shadow-[0_12px_30px_rgba(15,45,90,0.1)] backdrop-blur-xl">
      <div className="mx-auto flex min-h-[72px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <BrandBlock />
        <nav className="hidden items-center gap-6 lg:flex">
          {items.map((item, index) => (
            <button
              key={item}
              type="button"
              onClick={() => onNav?.(item)}
              className="text-[13px] font-semibold text-slate-600 transition hover:text-[#0b3b82]"
            >
              {labels[index]}
            </button>
          ))}
          <select aria-label="Language" value={language} onChange={(event) => setLanguage(event.target.value as Language)} className="rounded-lg border border-[#d7e2ef] bg-white px-2 py-2 text-[12px] font-semibold text-[#0b3b82]"><option value="en">EN</option><option value="hi">हिंदी</option></select>
          {onLogin && <button type="button" onClick={onLogin} className="rounded-lg bg-[#0b3b82] px-4 py-2 text-[12px] font-semibold text-white shadow-sm transition hover:bg-[#092e67]">{t('officerLogin')}</button>}
        </nav>
        <div className="flex items-center gap-2 lg:hidden"><select aria-label="Language" value={language} onChange={(event) => setLanguage(event.target.value as Language)} className="rounded-lg border border-[#d7e2ef] bg-white px-2 py-2 text-[12px] font-semibold text-[#0b3b82]"><option value="en">EN</option><option value="hi">हिंदी</option></select>{onLogin && <button type="button" onClick={onLogin} className="rounded-lg bg-[#0b3b82] px-3 py-2 text-[12px] font-semibold text-white">{t('login')}</button>}</div>
      </div>
    </header>
  );
}

function PublicFooter() {
  return <footer className="public-footer">
    <div className="footer-government-bar">Government of India <span>|</span> Ministry of Rural Development</div>
    <div className="footer-content"><div className="footer-about"><div className="footer-brand-mark"><span>B</span></div><h2><span className="brand-bhoomi">Bhoomi</span><span className="brand-darpan">Darpan</span></h2><p className="footer-subtitle">Land Governance Platform</p><p className="footer-description">Enabling transparent land acquisition, coordinated governance, and data-driven infrastructure development across India.</p><p className="footer-contact"><MapPin size={15} /> Vigyan Bhawan Annexe, New Delhi - 110011</p><p className="footer-contact"><Mail size={15} /> support@bhoomidarpan.gov.in</p><p className="footer-contact"><MessageSquareText size={15} /> +91-11-23093000</p></div><div className="footer-column"><h3>Quick Links</h3><button type="button">Dashboard</button><button type="button">DPR Assessment</button><button type="button">Reports &amp; Analytics</button><button type="button">Project Management</button><button type="button">Help &amp; Support</button></div><div className="footer-column"><h3>Government Resources</h3><button type="button">India.gov.in ↗</button><button type="button">Digital India ↗</button><button type="button">MyGov.in ↗</button><button type="button">Open Data Portal ↗</button><button type="button">PM-JAY ↗</button></div><div className="footer-column"><h3>Land Governance</h3><button type="button">Central Ministries ↗</button><button type="button">State Governments ↗</button><button type="button">District Authorities ↗</button><button type="button">Implementing Agencies ↗</button><button type="button">About BhoomiDarpan</button></div></div>
    <div className="footer-bottom"><span>© 2026 BhoomiDarpan, Government of India. All rights reserved.</span><div><button type="button">Privacy Policy</button><button type="button">Terms of Service</button><button type="button">Accessibility</button><button type="button">Site Map</button></div></div>
    <button type="button" className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><ArrowUp size={20} /></button>
  </footer>;
}

function HomePage({ onLogin }: { onLogin: () => void }) {
  const { t } = useLanguage();
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <div className="min-h-screen bg-[#eef3f8]">
      <PublicHeader onLogin={onLogin} onNav={(label) => scrollTo(label === 'Home' ? 'home-top' : label === 'About' ? 'about' : 'services')} />
      <main id="home-top">
        <section className="relative min-h-[560px] overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${LOGIN_BG})` }} />
          <video className="absolute inset-0 h-full w-full object-cover" src={LOGIN_VIDEO} autoPlay muted loop playsInline poster={LOGIN_BG} aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/20" />
          <div className="relative mx-auto flex min-h-[560px] max-w-[1440px] items-center px-5 py-12 sm:px-8 lg:px-10">
            <div className="max-w-2xl">
              <div className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.08em] text-[#56708f]"><span className="h-[3px] w-9 bg-[#f39b3a]" />{t('digitalGovernance')}</div>
              <h1 className="text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#123e7e] sm:text-6xl">{t('platform')}</h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#38547d]">{t('heroText')}</p>
              <div className="mt-8 flex flex-wrap gap-3"><button type="button" onClick={onLogin} className="rounded-lg bg-[#0b3b82] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#092e67]">{t('officerLogin')} <ArrowRight className="ml-2 inline" size={16} /></button><button type="button" onClick={() => scrollTo('services')} className="rounded-lg border border-[#174d9d] bg-white/80 px-6 py-3 text-sm font-semibold text-[#0b3b82]">{t('explore')}</button></div>
            </div>
          </div>
        </section>
        <section id="about" className="mx-auto max-w-6xl px-5 py-16 sm:px-8"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"><div className="card p-5"><ShieldCheck className="text-blue-600" /><h2 className="mt-4 font-bold text-[#123e7e]">Secure Access</h2><p className="mt-2 text-sm text-slate-500">Role-based access for authorized departments and agencies.</p></div><div className="card p-5"><Database className="text-emerald-600" /><h2 className="mt-4 font-bold text-[#123e7e]">Integrated Records</h2><p className="mt-2 text-sm text-slate-500">Unified project, parcel, document, and compensation records.</p></div><div className="card p-5"><BarChart3 className="text-violet-600" /><h2 className="mt-4 font-bold text-[#123e7e]">Real-time Monitoring</h2><p className="mt-2 text-sm text-slate-500">Track progress, approvals, risks, and key milestones.</p></div><div className="card p-5"><MapIcon className="text-orange-500" /><h2 className="mt-4 font-bold text-[#123e7e]">GIS Land Mapping</h2><p className="mt-2 text-sm text-slate-500">Geo-tag parcels and visualize project boundaries on interactive maps.</p></div><div className="card p-5"><Activity className="text-red-500" /><h2 className="mt-4 font-bold text-[#123e7e]">Compensation Tracking</h2><p className="mt-2 text-sm text-slate-500">Monitor assessment, approvals, disbursement, and payment status.</p></div><div className="card p-5"><Users className="text-green-600" /><h2 className="mt-4 font-bold text-[#123e7e]">R&amp;R Monitoring</h2><p className="mt-2 text-sm text-slate-500">Track affected families, rehabilitation packages, and resettlement milestones.</p></div><div className="card p-5"><FileText className="text-blue-600" /><h2 className="mt-4 font-bold text-[#123e7e]">Document Management</h2><p className="mt-2 text-sm text-slate-500">Maintain secure files with version control and audit-ready history.</p></div><div className="card p-5"><Network className="text-teal-600" /><h2 className="mt-4 font-bold text-[#123e7e]">Automated Workflows</h2><p className="mt-2 text-sm text-slate-500">Route proposals, approvals, notifications, and awards to the right authority.</p></div><div className="card p-5"><Sparkles className="text-violet-600" /><h2 className="mt-4 font-bold text-[#123e7e]">Predictive Insights</h2><p className="mt-2 text-sm text-slate-500">Identify delays, risks, and milestone issues before they affect delivery.</p></div></div></section>
        <section id="services" className="bg-white px-5 py-16 text-center"><h2 className="text-2xl font-bold text-[#123e7e]">{t('stakeholderPlatform')}</h2><p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">Connect Central Ministries, State Governments, District Authorities, and Implementing Agencies through one transparent workflow.</p></section>
      </main>
      <PublicFooter />
    </div>
  );
}

function LoginPage({ onLogin }: { onLogin: (role: StakeholderRole) => void }) {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [role, setRole] = useState<StakeholderRole>('District Administration');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const changeRole = (nextRole: StakeholderRole) => {
    setRole(nextRole);
    setUsername('');
    setPassword('');
    setError('');
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const account = stakeholderAccounts[role];
    if (username.trim() === account.username && password === account.password) {
      setError('');
      onLogin(role);
      return;
    }
    setError('The credentials could not be verified for the selected stakeholder role.');
  };

  return (
    <div className="min-h-screen bg-[#eef3f8]">
      <PublicHeader />
      <section className="relative min-h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${LOGIN_PAGE_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/35" />
        <div className="relative mx-auto grid max-w-[1440px] gap-10 px-5 pb-10 pt-32 sm:px-8 sm:pt-36 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-10 lg:py-14 lg:pt-32">
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
              <h2 className="mt-4 text-2xl font-bold text-[#123e7e]">{t('officerLogin')}</h2>
              <p className="mt-1 text-sm text-slate-500">{t('loginAccess')}</p>
            </div>

            <label className="block text-[12px] font-semibold text-slate-600">
              Stakeholder Role
              <select value={role} onChange={(event) => changeRole(event.target.value as StakeholderRole)} className="mt-2 w-full rounded-lg border border-[#d7e2ef] bg-[#f8fbff] px-3 py-2.5 text-sm outline-none focus:border-[#0b3b82]">
                {(Object.keys(stakeholderAccounts) as StakeholderRole[]).map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>

            <label className="mt-4 block text-[12px] font-semibold text-slate-600">
              {t('officialId')}
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
              {t('password')}
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
                {t('forgot')}
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
              {t('signIn')} <ArrowRight size={16} />
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
              {t('secureNotice')}
            </div>

          </form>
        </div>
      </section>
      <PublicFooter />
    </div>
  );
}

type ProposalRecord = { name: string; agency: string; state: string; district: string; category: string; area: string; families: string; status: string; reference: string; submittedAt: string };

function ProposalWorkspace({ showNotice, onSubmitted }: { showNotice: (text: string) => void; onSubmitted: (proposal: ProposalRecord) => void }) {
  const [status, setStatus] = useState('Draft');
  const [form, setForm] = useState({ name: '', agency: '', state: 'Maharashtra', district: 'Nashik', category: 'Highway', area: '', families: '' });
  const updateField = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const saveDraft = () => { setStatus('Draft'); showNotice('Proposal saved as draft'); };
  const submitProposal = (event: FormEvent) => { event.preventDefault(); const proposal = { ...form, status: 'Submitted for Verification', reference: `BD-${Date.now().toString().slice(-6)}`, submittedAt: new Date().toLocaleDateString('en-IN') }; setStatus(proposal.status); onSubmitted(proposal); showNotice(`Proposal ${proposal.reference} submitted for verification`); };

  return <section className="space-y-5">
    <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Project workspace</p><h1 className="mt-1 text-2xl font-bold text-[#123e7e]">Submit Project Proposal</h1><p className="mt-1 text-sm text-slate-500">Create and route a land acquisition proposal for digital scrutiny.</p></div><span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">Status: {status}</span></div>
    <form onSubmit={submitProposal} className="card p-5 sm:p-6"><div className="grid gap-4 md:grid-cols-2"><label className="text-xs font-semibold text-slate-600 md:col-span-2">Project name<input required value={form.name} onChange={(event) => updateField('name', event.target.value)} className="mt-2 w-full rounded-lg border border-[#d7e2ef] bg-[#f8fbff] px-3 py-2.5 text-sm outline-none focus:border-blue-500" placeholder="e.g. NH-60 Widening Project" /></label><label className="text-xs font-semibold text-slate-600">Implementing agency<input required value={form.agency} onChange={(event) => updateField('agency', event.target.value)} className="mt-2 w-full rounded-lg border border-[#d7e2ef] bg-[#f8fbff] px-3 py-2.5 text-sm outline-none focus:border-blue-500" placeholder="Department or agency name" /></label><label className="text-xs font-semibold text-slate-600">Project category<select value={form.category} onChange={(event) => updateField('category', event.target.value)} className="mt-2 w-full rounded-lg border border-[#d7e2ef] bg-[#f8fbff] px-3 py-2.5 text-sm outline-none"><option>Highway</option><option>Railway</option><option>Irrigation</option><option>Industrial Corridor</option><option>Renewable Energy</option><option>Urban Development</option></select></label><label className="text-xs font-semibold text-slate-600">State<select value={form.state} onChange={(event) => updateField('state', event.target.value)} className="mt-2 w-full rounded-lg border border-[#d7e2ef] bg-[#f8fbff] px-3 py-2.5 text-sm outline-none"><option>Maharashtra</option><option>Gujarat</option><option>Rajasthan</option><option>Madhya Pradesh</option></select></label><label className="text-xs font-semibold text-slate-600">District<input required value={form.district} onChange={(event) => updateField('district', event.target.value)} className="mt-2 w-full rounded-lg border border-[#d7e2ef] bg-[#f8fbff] px-3 py-2.5 text-sm outline-none" /></label><label className="text-xs font-semibold text-slate-600">Land required (acres)<input required type="number" min="0" value={form.area} onChange={(event) => updateField('area', event.target.value)} className="mt-2 w-full rounded-lg border border-[#d7e2ef] bg-[#f8fbff] px-3 py-2.5 text-sm outline-none" /></label><label className="text-xs font-semibold text-slate-600">Estimated affected families<input required type="number" min="0" value={form.families} onChange={(event) => updateField('families', event.target.value)} className="mt-2 w-full rounded-lg border border-[#d7e2ef] bg-[#f8fbff] px-3 py-2.5 text-sm outline-none" /></label></div><label className="mt-4 block text-xs font-semibold text-slate-600">Proposal documents<input type="file" multiple className="mt-2 block w-full rounded-lg border border-dashed border-[#b9cbe0] bg-[#f8fbff] px-3 py-3 text-xs text-slate-500" /></label><div className="mt-6 flex flex-wrap justify-end gap-3"><button type="button" onClick={saveDraft} className="rounded-lg border border-[#0b3b82] px-4 py-2.5 text-sm font-semibold text-[#0b3b82]">Save Draft</button><button type="submit" className="rounded-lg bg-[#0b3b82] px-4 py-2.5 text-sm font-semibold text-white">Submit for Verification <ArrowRight className="ml-1 inline" size={15} /></button></div></form>
  </section>;
}

function VerificationWorkspace({ proposal, showNotice, onUpdate }: { proposal: ProposalRecord | null; showNotice: (text: string) => void; onUpdate: (status: string) => void }) {
  const [remarks, setRemarks] = useState('');
  const updateStatus = (status: string) => { onUpdate(status); showNotice(`Proposal ${proposal?.reference ?? ''} marked ${status.toLowerCase()}`); };
  if (!proposal) return <section className="card p-8 text-center"><ShieldCheck className="mx-auto text-blue-600" size={36} /><h1 className="mt-4 text-xl font-bold text-[#123e7e]">Verification Queue</h1><p className="mt-2 text-sm text-slate-500">No proposals are waiting for verification.</p></section>;
  return <section className="space-y-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Verification workspace</p><h1 className="mt-1 text-2xl font-bold text-[#123e7e]">Review Project Proposal</h1><p className="mt-1 text-sm text-slate-500">Reference: {proposal.reference} · Submitted {proposal.submittedAt}</p></div><span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-700">{proposal.status}</span></div><div className="card p-5"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><div><p className="text-xs text-slate-500">Project</p><p className="mt-1 font-bold text-[#123e7e]">{proposal.name}</p></div><div><p className="text-xs text-slate-500">Implementing agency</p><p className="mt-1 font-semibold text-slate-700">{proposal.agency}</p></div><div><p className="text-xs text-slate-500">Category</p><p className="mt-1 font-semibold text-slate-700">{proposal.category}</p></div><div><p className="text-xs text-slate-500">Location</p><p className="mt-1 font-semibold text-slate-700">{proposal.district}, {proposal.state}</p></div><div><p className="text-xs text-slate-500">Land required</p><p className="mt-1 font-semibold text-slate-700">{proposal.area} acres</p></div><div><p className="text-xs text-slate-500">Affected families</p><p className="mt-1 font-semibold text-slate-700">{proposal.families}</p></div></div><label className="mt-6 block text-xs font-semibold text-slate-600">Review remarks<textarea value={remarks} onChange={(event) => setRemarks(event.target.value)} rows={4} className="mt-2 w-full rounded-lg border border-[#d7e2ef] bg-[#f8fbff] px-3 py-2.5 text-sm outline-none focus:border-blue-500" placeholder="Add verification remarks or required corrections" /></label><div className="mt-5 flex flex-wrap justify-end gap-3"><button type="button" onClick={() => updateStatus('Sent Back for Correction')} className="rounded-lg border border-orange-400 px-4 py-2.5 text-sm font-semibold text-orange-700">Send Back</button><button type="button" onClick={() => updateStatus('Rejected')} className="rounded-lg border border-red-400 px-4 py-2.5 text-sm font-semibold text-red-600">Reject</button><button type="button" onClick={() => updateStatus('Verified')} className="rounded-lg bg-[#0b3b82] px-4 py-2.5 text-sm font-semibold text-white">Approve Verification <Check className="ml-1 inline" size={15} /></button></div></div></section>;
}

type NotificationRecord = { number: string; date: string; type: string; villages: string; parcels: string; status: string };

function NotificationWorkspace({ proposal, showNotice, onIssued }: { proposal: ProposalRecord | null; showNotice: (text: string) => void; onIssued: (notification: NotificationRecord) => void }) {
  const [status, setStatus] = useState('Draft');
  const [form, setForm] = useState({ number: '', date: '', type: 'Preliminary Notification', villages: '', parcels: '' });
  const updateField = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const issueNotification = (event: FormEvent) => { event.preventDefault(); const notification = { ...form, status: 'Issued' }; setStatus(notification.status); onIssued(notification); showNotice(`Notification ${form.number} issued successfully`); };
  if (!proposal || proposal.status !== 'Verified') return <section className="card p-8 text-center"><Bell className="mx-auto text-blue-600" size={36} /><h1 className="mt-4 text-xl font-bold text-[#123e7e]">Notification Management</h1><p className="mt-2 text-sm text-slate-500">A verified proposal is required before issuing a notification.</p></section>;
  return <section className="space-y-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Official notification</p><h1 className="mt-1 text-2xl font-bold text-[#123e7e]">Issue Acquisition Notification</h1><p className="mt-1 text-sm text-slate-500">Proposal {proposal.reference} · {proposal.name}</p></div><span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">Status: {status}</span></div><form onSubmit={issueNotification} className="card p-5 sm:p-6"><div className="grid gap-4 md:grid-cols-2"><label className="text-xs font-semibold text-slate-600">Notification number<input required value={form.number} onChange={(event) => updateField('number', event.target.value)} className="mt-2 w-full rounded-lg border border-[#d7e2ef] bg-[#f8fbff] px-3 py-2.5 text-sm outline-none focus:border-blue-500" placeholder="e.g. LA/NH60/2026/041" /></label><label className="text-xs font-semibold text-slate-600">Issue date<input required type="date" value={form.date} onChange={(event) => updateField('date', event.target.value)} className="mt-2 w-full rounded-lg border border-[#d7e2ef] bg-[#f8fbff] px-3 py-2.5 text-sm outline-none focus:border-blue-500" /></label><label className="text-xs font-semibold text-slate-600">Notification type<select value={form.type} onChange={(event) => updateField('type', event.target.value)} className="mt-2 w-full rounded-lg border border-[#d7e2ef] bg-[#f8fbff] px-3 py-2.5 text-sm outline-none"><option>Preliminary Notification</option><option>Declaration of Acquisition</option><option>Urgency Notification</option></select></label><label className="text-xs font-semibold text-slate-600">Affected villages<input required value={form.villages} onChange={(event) => updateField('villages', event.target.value)} className="mt-2 w-full rounded-lg border border-[#d7e2ef] bg-[#f8fbff] px-3 py-2.5 text-sm outline-none" placeholder="Separate villages with commas" /></label><label className="text-xs font-semibold text-slate-600">Land parcels covered<input required type="number" min="1" value={form.parcels} onChange={(event) => updateField('parcels', event.target.value)} className="mt-2 w-full rounded-lg border border-[#d7e2ef] bg-[#f8fbff] px-3 py-2.5 text-sm outline-none" /></label></div><label className="mt-4 block text-xs font-semibold text-slate-600">Notification document<input required type="file" className="mt-2 block w-full rounded-lg border border-dashed border-[#b9cbe0] bg-[#f8fbff] px-3 py-3 text-xs text-slate-500" /></label><div className="mt-6 flex justify-end"><button type="submit" className="rounded-lg bg-[#0b3b82] px-4 py-2.5 text-sm font-semibold text-white">Issue Notification <ArrowRight className="ml-1 inline" size={15} /></button></div></form></section>;
}

type AwardRecord = { number: string; date: string; parcels: string; assessed: string; authority: string; status: string };

function AwardWorkspace({ proposal, notification, showNotice, onDeclared }: { proposal: ProposalRecord | null; notification: NotificationRecord | null; showNotice: (text: string) => void; onDeclared: (award: AwardRecord) => void }) {
  const [status, setStatus] = useState('Draft');
  const [form, setForm] = useState({ number: '', date: '', parcels: '', assessed: '', authority: '' });
  const updateField = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const declareAward = (event: FormEvent) => { event.preventDefault(); const award = { ...form, status: 'Declared' }; setStatus(award.status); onDeclared(award); showNotice(`Award ${form.number} declared successfully`); };
  if (!proposal || !notification || notification.status !== 'Issued') return <section className="card p-8 text-center"><ShieldCheck className="mx-auto text-blue-600" size={36} /><h1 className="mt-4 text-xl font-bold text-[#123e7e]">Award Declaration</h1><p className="mt-2 text-sm text-slate-500">An issued notification is required before declaring an award.</p></section>;
  return <section className="space-y-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Award workspace</p><h1 className="mt-1 text-2xl font-bold text-[#123e7e]">Declare Land Acquisition Award</h1><p className="mt-1 text-sm text-slate-500">Notification {notification.number} · {proposal.name}</p></div><span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">Status: {status}</span></div><form onSubmit={declareAward} className="card p-5 sm:p-6"><div className="grid gap-4 md:grid-cols-2"><label className="text-xs font-semibold text-slate-600">Award number<input required value={form.number} onChange={(event) => updateField('number', event.target.value)} className="mt-2 w-full rounded-lg border border-[#d7e2ef] bg-[#f8fbff] px-3 py-2.5 text-sm outline-none focus:border-blue-500" placeholder="e.g. AW/NH60/2026/018" /></label><label className="text-xs font-semibold text-slate-600">Award date<input required type="date" value={form.date} onChange={(event) => updateField('date', event.target.value)} className="mt-2 w-full rounded-lg border border-[#d7e2ef] bg-[#f8fbff] px-3 py-2.5 text-sm outline-none focus:border-blue-500" /></label><label className="text-xs font-semibold text-slate-600">Parcels awarded<input required type="number" min="1" value={form.parcels} onChange={(event) => updateField('parcels', event.target.value)} className="mt-2 w-full rounded-lg border border-[#d7e2ef] bg-[#f8fbff] px-3 py-2.5 text-sm outline-none focus:border-blue-500" /></label><label className="text-xs font-semibold text-slate-600">Compensation assessed (₹)<input required type="number" min="0" value={form.assessed} onChange={(event) => updateField('assessed', event.target.value)} className="mt-2 w-full rounded-lg border border-[#d7e2ef] bg-[#f8fbff] px-3 py-2.5 text-sm outline-none focus:border-blue-500" placeholder="Total assessed amount" /></label><label className="text-xs font-semibold text-slate-600 md:col-span-2">Approving authority<input required value={form.authority} onChange={(event) => updateField('authority', event.target.value)} className="mt-2 w-full rounded-lg border border-[#d7e2ef] bg-[#f8fbff] px-3 py-2.5 text-sm outline-none focus:border-blue-500" placeholder="Authority issuing the award" /></label></div><label className="mt-4 block text-xs font-semibold text-slate-600">Award document<input required type="file" className="mt-2 block w-full rounded-lg border border-dashed border-[#b9cbe0] bg-[#f8fbff] px-3 py-3 text-xs text-slate-500" /></label><div className="mt-6 flex justify-end"><button type="submit" className="rounded-lg bg-[#0b3b82] px-4 py-2.5 text-sm font-semibold text-white">Declare Award <ArrowRight className="ml-1 inline" size={15} /></button></div></form></section>;
}

function CompensationWorkspace({ award, showNotice }: { award: AwardRecord | null; showNotice: (text: string) => void }) {
  const [paid, setPaid] = useState('');
  const [status, setStatus] = useState('Pending Assessment');
  if (!award || award.status !== 'Declared') return <section className="card p-8 text-center"><IndianRupee className="mx-auto text-blue-600" size={36} /><h1 className="mt-4 text-xl font-bold text-[#123e7e]">Compensation Management</h1><p className="mt-2 text-sm text-slate-500">A declared award is required before tracking compensation.</p></section>;
  const assessed = Number(award.assessed || 0);
  const paidAmount = Number(paid || 0);
  const recordPayment = (event: FormEvent) => { event.preventDefault(); setStatus(paidAmount >= assessed ? 'Fully Disbursed' : 'Partially Disbursed'); showNotice('Compensation payment recorded'); };
  return <section className="space-y-5"><div><p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Compensation workspace</p><h1 className="mt-1 text-2xl font-bold text-[#123e7e]">Track Compensation</h1><p className="mt-1 text-sm text-slate-500">Award {award.number} · {award.parcels} parcels</p></div><div className="grid gap-4 sm:grid-cols-3"><div className="card p-4"><p className="text-xs text-slate-500">Assessed</p><p className="mt-1 text-xl font-bold text-[#123e7e]">₹ {assessed.toLocaleString('en-IN')}</p></div><div className="card p-4"><p className="text-xs text-slate-500">Paid</p><p className="mt-1 text-xl font-bold text-emerald-600">₹ {paidAmount.toLocaleString('en-IN')}</p></div><div className="card p-4"><p className="text-xs text-slate-500">Status</p><p className="mt-1 text-sm font-bold text-blue-700">{status}</p></div></div><form onSubmit={recordPayment} className="card p-5"><label className="block text-xs font-semibold text-slate-600">Amount disbursed (₹)<input required type="number" min="0" max={assessed} value={paid} onChange={(event) => setPaid(event.target.value)} className="mt-2 w-full rounded-lg border border-[#d7e2ef] bg-[#f8fbff] px-3 py-2.5 text-sm outline-none focus:border-blue-500" placeholder="Enter payment amount" /></label><div className="mt-5 flex justify-end"><button type="submit" className="rounded-lg bg-[#0b3b82] px-4 py-2.5 text-sm font-semibold text-white">Record Disbursement <ArrowRight className="ml-1 inline" size={15} /></button></div></form></section>;
}

function PossessionWorkspace({ award, showNotice }: { award: AwardRecord | null; showNotice: (text: string) => void }) {
  const [status, setStatus] = useState('Pending Handover');
  const [date, setDate] = useState('');
  if (!award || award.status !== 'Declared') return <section className="card p-8 text-center"><MapPin className="mx-auto text-blue-600" size={36} /><h1 className="mt-4 text-xl font-bold text-[#123e7e]">Possession Tracking</h1><p className="mt-2 text-sm text-slate-500">A declared award is required before recording possession.</p></section>;
  const recordPossession = (event: FormEvent) => { event.preventDefault(); setStatus('Possession Recorded'); showNotice('Possession recorded successfully'); };
  return <section className="space-y-5"><div><p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Possession workspace</p><h1 className="mt-1 text-2xl font-bold text-[#123e7e]">Record Land Possession</h1><p className="mt-1 text-sm text-slate-500">Award {award.number} · {award.parcels} parcels covered</p></div><form onSubmit={recordPossession} className="card max-w-2xl p-5"><label className="block text-xs font-semibold text-slate-600">Handover date<input required type="date" value={date} onChange={(event) => setDate(event.target.value)} className="mt-2 w-full rounded-lg border border-[#d7e2ef] bg-[#f8fbff] px-3 py-2.5 text-sm outline-none focus:border-blue-500" /></label><label className="mt-4 block text-xs font-semibold text-slate-600">Handover officer<input required className="mt-2 w-full rounded-lg border border-[#d7e2ef] bg-[#f8fbff] px-3 py-2.5 text-sm outline-none focus:border-blue-500" placeholder="Officer name and designation" /></label><label className="mt-4 block text-xs font-semibold text-slate-600">Possession memo<input required type="file" className="mt-2 block w-full rounded-lg border border-dashed border-[#b9cbe0] bg-[#f8fbff] px-3 py-3 text-xs text-slate-500" /></label><p className="mt-4 text-sm font-semibold text-blue-700">Status: {status}</p><button type="submit" className="mt-5 rounded-lg bg-[#0b3b82] px-4 py-2.5 text-sm font-semibold text-white">Record Possession</button></form></section>;
}

function RrWorkspace({ proposal, showNotice }: { proposal: ProposalRecord | null; showNotice: (text: string) => void }) {
  const [status, setStatus] = useState('Survey Pending');
  const [families, setFamilies] = useState('');
  if (!proposal) return <section className="card p-8 text-center"><Users className="mx-auto text-blue-600" size={36} /><h1 className="mt-4 text-xl font-bold text-[#123e7e]">R&amp;R Monitoring</h1><p className="mt-2 text-sm text-slate-500">Submit a proposal before starting R&amp;R monitoring.</p></section>;
  const saveRr = (event: FormEvent) => { event.preventDefault(); setStatus('Survey Completed'); showNotice('R&R survey updated'); };
  return <section className="space-y-5"><div><p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Rehabilitation and resettlement</p><h1 className="mt-1 text-2xl font-bold text-[#123e7e]">R&amp;R Monitoring</h1><p className="mt-1 text-sm text-slate-500">Track support for affected and displaced families under {proposal.name}.</p></div><form onSubmit={saveRr} className="card max-w-2xl p-5"><label className="block text-xs font-semibold text-slate-600">Affected families<input required type="number" min="0" value={families} onChange={(event) => setFamilies(event.target.value)} className="mt-2 w-full rounded-lg border border-[#d7e2ef] bg-[#f8fbff] px-3 py-2.5 text-sm outline-none focus:border-blue-500" /></label><label className="mt-4 block text-xs font-semibold text-slate-600">R&amp;R package<select className="mt-2 w-full rounded-lg border border-[#d7e2ef] bg-[#f8fbff] px-3 py-2.5 text-sm outline-none"><option>Housing and livelihood support</option><option>Land-for-land package</option><option>One-time rehabilitation grant</option></select></label><label className="mt-4 block text-xs font-semibold text-slate-600">Survey report<input required type="file" className="mt-2 block w-full rounded-lg border border-dashed border-[#b9cbe0] bg-[#f8fbff] px-3 py-3 text-xs text-slate-500" /></label><p className="mt-4 text-sm font-semibold text-blue-700">Status: {status}</p><button type="submit" className="mt-5 rounded-lg bg-[#0b3b82] px-4 py-2.5 text-sm font-semibold text-white">Update R&amp;R Status</button></form></section>;
}

function DocumentsWorkspace({ showNotice }: { showNotice: (text: string) => void }) {
  const [documents, setDocuments] = useState<string[]>(['Award Notice · v2.0', 'Land Schedule · v1.0']);
  const addDocument = (event: React.ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (file) { setDocuments((current) => [...current, `${file.name} · v1.0`]); showNotice('Document added to repository'); } };
  return <section className="space-y-5"><div><p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Secure repository</p><h1 className="mt-1 text-2xl font-bold text-[#123e7e]">Document Management</h1><p className="mt-1 text-sm text-slate-500">Version-controlled project records and audit-ready files.</p></div><section className="card p-5"><label className="inline-flex cursor-pointer rounded-lg bg-[#0b3b82] px-4 py-2.5 text-sm font-semibold text-white">Upload Document<input type="file" onChange={addDocument} className="hidden" /></label><div className="mt-5 divide-y divide-slate-100">{documents.map((document) => <div key={document} className="flex items-center justify-between py-3 text-sm"><span className="font-semibold text-slate-700">{document}</span><span className="text-xs text-emerald-600">Verified</span></div>)}</div></section></section>;
}

function AnalyticsWorkspace() {
  return <section className="space-y-5"><div><p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Decision support</p><h1 className="mt-1 text-2xl font-bold text-[#123e7e]">Analytics</h1><p className="mt-1 text-sm text-slate-500">National and state-wise acquisition performance.</p></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[{ label: 'Area acquired', value: '76%' }, { label: 'Awards declared', value: '68%' }, { label: 'Compensation paid', value: '81%' }, { label: 'R&R progress', value: '62%' }].map((item) => <div key={item.label} className="card p-5"><p className="text-xs text-slate-500">{item.label}</p><p className="mt-2 text-3xl font-bold text-[#123e7e]">{item.value}</p><div className="mt-4 h-2 rounded-full bg-slate-100"><div className="h-2 w-3/4 rounded-full bg-blue-600" /></div></div>)}</div></section>;
}

function ReportsWorkspace({ showNotice }: { showNotice: (text: string) => void }) {
  const reports = ['State-wise acquisition progress', 'Compensation disbursement summary', 'R&R affected families report', 'Pending approvals register'];
  return <section className="space-y-5"><div><p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Management information system</p><h1 className="mt-1 text-2xl font-bold text-[#123e7e]">Reports</h1><p className="mt-1 text-sm text-slate-500">Generate executive and operational reports.</p></div><div className="card divide-y divide-slate-100">{reports.map((report) => <div key={report} className="flex flex-wrap items-center justify-between gap-3 p-4"><span className="font-semibold text-slate-700">{report}</span><button type="button" onClick={() => showNotice(`${report} generated`)} className="rounded-lg border border-[#0b3b82] px-3 py-2 text-xs font-semibold text-[#0b3b82]">Generate Report</button></div>)}</div></section>;
}

function DashboardShell({ onLogout, role }: { onLogout: () => void; role: StakeholderRole }) {
  const { language, setLanguage, t } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [filters, setFilters] = useState({ state: 'Maharashtra', district: 'Nashik', project: 'All Projects', period: 'Last 6 Months' });
  const [zoom, setZoom] = useState(1);
  const [mapExpanded, setMapExpanded] = useState(false);
  const [notice, setNotice] = useState('');
  const [submittedProposal, setSubmittedProposal] = useState<ProposalRecord | null>(null);
  const [issuedNotification, setIssuedNotification] = useState<NotificationRecord | null>(null);
  const [declaredAward, setDeclaredAward] = useState<AwardRecord | null>(null);
  const updateFilter = (key: keyof typeof filters, value: string) => setFilters((current) => ({ ...current, [key]: value }));
  const showNotice = (text: string) => { setNotice(text); window.setTimeout(() => setNotice(''), 2200); };

  return (
    <div className="flex min-h-screen bg-[#f4f7fb]">
      <aside
        className={`dashboard-sidebar fixed inset-y-4 left-4 z-40 flex w-[232px] flex-col bg-[#0b3b82]/90 text-white transition-transform lg:sticky lg:top-4 lg:inset-y-auto lg:translate-x-0 ${
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
          {sidebarItems.filter((item) => roleNavigation[role].includes(item.label)).map((item) => (
            <button key={item.label} type="button" onClick={() => { if (item.label === 'DPR Assessment') { window.open('https://voidframe2.vercel.app/', '_blank', 'noopener,noreferrer'); return; } setActiveSection(item.label); setSidebarOpen(false); showNotice(`${item.label} section selected`); }} className={`sidebar-item ${activeSection === item.label ? 'active' : ''}`}>
              <item.icon size={17} />
              {item.label === 'Dashboard' ? t('dashboard') : item.label === 'Land Parcels' ? t('landParcels') : item.label === 'Approvals' ? t('approvals') : item.label === 'Compensation' ? t('compensation') : item.label === 'Documents' ? t('documents') : item.label === 'Analytics' ? t('analytics') : item.label === 'Reports' ? t('reports') : item.label === 'Settings' ? t('settings') : item.label === 'R&R' ? t('rr') : item.label}
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
          <select aria-label="Language" value={language} onChange={(event) => setLanguage(event.target.value as Language)} className="rounded-lg border border-[#d7e2ef] bg-white px-2 py-2 text-[12px] font-semibold text-[#0b3b82]"><option value="en">EN</option><option value="hi">हिंदी</option></select>
          <button type="button" onClick={onLogout} className="flex items-center gap-2 rounded-lg border border-[#d7e2ef] px-2 py-1.5 text-left">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0b3b82] text-[11px] font-bold text-white">{stakeholderAccounts[role].initials}</div>
            <div className="hidden leading-tight sm:block">
              <p className="text-[12px] font-bold text-[#123e7e]">{stakeholderAccounts[role].label}</p>
              <p className="text-[10px] text-slate-500">Nashik, Maharashtra</p>
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </button>
        </header>

        <main className="flex-1 overflow-x-hidden p-4 sm:p-6">
          {activeSection === 'Projects' && <ProposalWorkspace showNotice={showNotice} onSubmitted={setSubmittedProposal} />}
          {activeSection === 'Approvals' && <VerificationWorkspace proposal={submittedProposal} showNotice={showNotice} onUpdate={(status) => setSubmittedProposal((current) => current ? { ...current, status } : current)} />}
          {activeSection === 'Notifications' && <NotificationWorkspace proposal={submittedProposal} showNotice={showNotice} onIssued={setIssuedNotification} />}
          {activeSection === 'Awards' && <AwardWorkspace proposal={submittedProposal} notification={issuedNotification} showNotice={showNotice} onDeclared={setDeclaredAward} />}
          {activeSection === 'Compensation' && <CompensationWorkspace award={declaredAward} showNotice={showNotice} />}
          {activeSection === 'Land Parcels' && <PossessionWorkspace award={declaredAward} showNotice={showNotice} />}
          {activeSection === 'R&R' && <RrWorkspace proposal={submittedProposal} showNotice={showNotice} />}
          {activeSection === 'Documents' && <DocumentsWorkspace showNotice={showNotice} />}
          {activeSection === 'Analytics' && <AnalyticsWorkspace />}
          {activeSection === 'Reports' && <ReportsWorkspace showNotice={showNotice} />}
          {activeSection !== 'Projects' && activeSection !== 'Approvals' && activeSection !== 'Notifications' && activeSection !== 'Awards' && activeSection !== 'Compensation' && activeSection !== 'Land Parcels' && activeSection !== 'R&R' && activeSection !== 'Documents' && activeSection !== 'Analytics' && activeSection !== 'Reports' && <>
          <div className="mb-5 flex flex-wrap items-start justify-end gap-4">
            <div className="flex flex-wrap gap-2">
              <label className="filter-chip"><span>{t('state')}</span><select value={filters.state} onChange={(event) => updateFilter('state', event.target.value)} aria-label="Filter by state"><option>Maharashtra</option><option>Gujarat</option><option>Rajasthan</option></select><ChevronDown size={14} /></label>
              <label className="filter-chip"><span>{t('district')}</span><select value={filters.district} onChange={(event) => updateFilter('district', event.target.value)} aria-label="Filter by district"><option>Nashik</option><option>Pune</option><option>Nagpur</option></select><ChevronDown size={14} /></label>
              <label className="filter-chip"><span>{t('project')}</span><select value={filters.project} onChange={(event) => updateFilter('project', event.target.value)} aria-label="Filter by project"><option>{t('allProjects')}</option><option>NH-60 Widening</option><option>Sinnar Industrial</option></select><ChevronDown size={14} /></label>
              <label className="filter-chip"><span>{t('period')}</span><select value={filters.period} onChange={(event) => updateFilter('period', event.target.value)} aria-label="Filter by period"><option>{t('lastSixMonths')}</option><option>Last 12 Months</option><option>Year to Date</option></select><ChevronDown size={14} /></label>
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
                  <MapIcon size={17} /> {t('map')}
                </h2>
                <button type="button" onClick={() => setMapExpanded(true)} className="text-xs font-semibold text-[#1456c0]">
                  {t('fullMap')} <ArrowRight size={12} className="inline" />
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
                  <p className="mb-2 font-bold text-slate-700">{t('parcelStatus')}</p>
                  <p className="mb-1"><i className="dot bg-green-500" />{t('acquired')}</p>
                  <p className="mb-1"><i className="dot bg-yellow-400" />{t('underAcquisition')}</p>
                  <p className="mb-1"><i className="dot bg-blue-500" />{t('compensationPending')}</p>
                  <p className="mb-1"><i className="dot bg-orange-400" />{t('rrPending')}</p>
                  <p><i className="dot bg-red-500" />{t('disputed')}</p>
                </div>

              </div>
            </section>

            {mapExpanded && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"><section className="relative h-[min(820px,calc(100vh-2rem))] w-full max-w-6xl overflow-hidden rounded-2xl bg-white p-4 shadow-2xl"><div className="mb-3 flex items-center justify-between"><div><h2 className="flex items-center gap-2 text-lg font-bold text-[#123e7e]"><MapIcon size={19} /> {t('map')}</h2><p className="text-xs text-slate-500">Interactive district view · Zoom {Math.round(zoom * 100)}%</p></div><button type="button" onClick={() => setMapExpanded(false)} className="rounded-full border border-[#d7e2ef] p-2 text-slate-600 hover:bg-slate-50" aria-label="Close full map"><X size={18} /></button></div><div className="relative h-[calc(100%-4.5rem)] overflow-hidden rounded-xl bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(8,40,28,0.18), rgba(8,40,28,0.18)), url(${MAP_BG})`, backgroundSize: `${zoom * 100}% auto` }}><svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 400" preserveAspectRatio="none" aria-hidden="true"><polygon points="120,80 220,60 280,140 180,190" fill="rgba(34,197,94,0.45)" stroke="#16a34a" strokeWidth="2" /><polygon points="300,90 420,70 460,170 320,200" fill="rgba(250,204,21,0.4)" stroke="#ca8a04" strokeWidth="2" /><polygon points="480,100 600,80 640,180 500,210" fill="rgba(59,130,246,0.4)" stroke="#2563eb" strokeWidth="2" /><polygon points="180,230 300,210 340,300 200,330" fill="rgba(249,115,22,0.4)" stroke="#ea580c" strokeWidth="2" /><polygon points="380,240 520,220 560,320 400,340" fill="rgba(239,68,68,0.4)" stroke="#dc2626" strokeWidth="2" /></svg><div className="absolute left-4 top-4 overflow-hidden rounded-lg bg-white text-sm font-bold text-slate-600 shadow"><button type="button" onClick={() => setZoom((value) => Math.min(value + 0.2, 2.5))} className="block w-10 py-2 hover:bg-slate-50">+</button><div className="border-t border-slate-200" /><button type="button" onClick={() => setZoom((value) => Math.max(value - 0.2, 0.6))} className="block w-10 py-2 hover:bg-slate-50">−</button></div><div className="absolute right-4 top-4 rounded-lg bg-white/95 p-4 text-xs text-slate-600 shadow"><p className="mb-2 font-bold text-slate-700">{t('parcelStatus')}</p><p className="mb-1"><i className="dot bg-green-500" />{t('acquired')}</p><p className="mb-1"><i className="dot bg-yellow-400" />{t('underAcquisition')}</p><p className="mb-1"><i className="dot bg-blue-500" />{t('compensationPending')}</p><p className="mb-1"><i className="dot bg-orange-400" />{t('rrPending')}</p><p><i className="dot bg-red-500" />{t('disputed')}</p></div></div></section></div>}

            <div className="space-y-4">
              <section className="card p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-sm font-bold text-[#123e7e]">
                    <Activity size={17} /> {t('progress')}
                  </h2>
                  <button type="button" onClick={() => showNotice('Acquisition progress details selected')} className="text-xs font-semibold text-[#1456c0]">{t('viewDetails')}</button>
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
                    <Sparkles size={16} className="text-violet-500" /> {t('risk')}
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
                  {t('viewAnalysis')} <ArrowRight size={14} />
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
          </>}
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
  const { t } = useLanguage();
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
              <p className="text-sm font-bold">{t('assistant')} <span className="ml-1 rounded bg-white/20 px-1.5 py-0.5 text-[9px] font-semibold uppercase">Beta</span></p>
              <p className="truncate text-[11px] text-blue-100">{t('online')}</p>
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
  const [language, setLanguage] = useState<Language>('en');
  const [role, setRole] = useState<StakeholderRole>('District Administration');
  const content = view === 'home'
    ? <HomePage onLogin={() => setView('login')} />
    : view === 'login'
      ? <LoginPage onLogin={(selectedRole) => { setRole(selectedRole); setView('dashboard'); }} />
      : <DashboardShell role={role} onLogout={() => setView('login')} />;

  return <LanguageContext.Provider value={{ language, setLanguage }}>{content}</LanguageContext.Provider>;
}

export default App;
