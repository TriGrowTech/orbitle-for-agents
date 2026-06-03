import { useState } from 'react';
import {
  ShieldCheck, Award, BadgeCheck, Phone, Mail, MapPin,
  Globe, Users, Star, TrendingUp, Clock, FileText,
  Building2, Plane, CalendarDays, IndianRupee, ChevronRight,
  CheckCircle2, HeartHandshake, Landmark, Medal
} from 'lucide-react';
import { Topbar } from '../components/Topbar';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ChatbotButton } from '../components/ChatbotButton';
import { PlanTourModal } from '../components/PlanTourModal';
import { useAgent } from '../context/AgentContext';

// ─── Fallback / default data ────────────────────────────────────────────────

const DEFAULT_CREDENTIALS = [
  {
    label: 'IATA Accreditation',
    number: 'IATA: 14-3-1234',
    icon: Globe,
    color: 'blue',
    description: 'International Air Transport Association certified travel agent.',
  },
  {
    label: 'Ministry of Tourism',
    number: 'Reg. No: TG/MOT/2019/04521',
    icon: Landmark,
    color: 'green',
    description: 'Registered with Government of India, Ministry of Tourism.',
  },
  {
    label: 'TAAI Membership',
    number: 'TAAI: D/MH/5678',
    icon: Medal,
    color: 'amber',
    description: 'Proud member of Travel Agents Association of India.',
  },
  {
    label: 'GST Registered',
    number: 'GSTIN: 27AAGCT0123M1Z5',
    icon: FileText,
    color: 'purple',
    description: 'Fully GST compliant business entity.',
  },
];

const DEFAULT_STATS = [
  { value: '15,000+', label: 'Happy Travellers', icon: Users },
  { value: '12+', label: 'Years of Experience', icon: CalendarDays },
  { value: '4.9★', label: 'Average Rating', icon: Star },
  { value: '200+', label: 'Destinations Covered', icon: Globe },
  { value: '₹50 Cr+', label: 'Travel Bookings Done', icon: IndianRupee },
  { value: '98%', label: 'Client Satisfaction', icon: TrendingUp },
];

const DEFAULT_AWARDS = [
  { year: '2024', title: 'Best Travel Agency – Maharashtra', org: 'TAAI State Awards' },
  { year: '2023', title: 'Excellence in Customer Service', org: 'Indian Tourism Congress' },
  { year: '2022', title: 'Top Performing Agent', org: 'IndiGo Airline Partner Awards' },
  { year: '2021', title: 'Trusted Tour Operator', org: 'Tourism Ministry, Govt. of India' },
];

const STAT_ICONS = [Users, CalendarDays, Star, Globe, IndianRupee, TrendingUp];

const CREDENTIAL_ICONS: Record<string, any> = {
  blue: Globe,
  green: Landmark,
  amber: Medal,
  purple: FileText,
};

const WHY_US = [
  {
    icon: ShieldCheck,
    title: 'Fully Verified & Licensed',
    desc: 'IATA accredited, Ministry of Tourism registered, TAAI member — every credential audited annually.',
  },
  {
    icon: HeartHandshake,
    title: 'Personalised Service',
    desc: 'Dedicated travel consultant assigned to each client for end-to-end support.',
  },
  {
    icon: Clock,
    title: '24 × 7 Support',
    desc: 'Our team is reachable round-the-clock on phone, WhatsApp & email during your trip.',
  },
  {
    icon: IndianRupee,
    title: 'Best Price Guarantee',
    desc: 'We negotiate direct contracts with hotels and airlines to offer you the lowest rates.',
  },
  {
    icon: Plane,
    title: 'Pan-India & International',
    desc: 'From Leh–Ladakh circuits to Maldives water villas — we cover 200+ destinations.',
  },
  {
    icon: Building2,
    title: 'Corporate & Group Travel',
    desc: 'Specialised teams for MICE, incentive tours, family groups, and destination weddings.',
  },
];

const DEFAULT_BULLETS = [
  'Dedicated B2B desk for travel agents & sub-agents across India',
  'In-house visa assistance for 50+ countries',
  'Tailor-made packages — from budget homestays to luxury villas',
  'Largest group tour operator for Char Dham Yatra in western India',
];

// ─── Colour helpers ─────────────────────────────────────────────────────────

const colorMap: Record<string, { bg: string; text: string; border: string; icon: string }> = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-800',
    icon: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400',
  },
  green: {
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800',
    icon: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-800',
    icon: 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-800',
    icon: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400',
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function AboutUs() {
  const [showPlanTourModal, setShowPlanTourModal] = useState(false);
  const { siteConfig, agent, isTenantMode } = useAgent();

  const aboutUs = siteConfig?.aboutUs;
  const hasAboutUs = aboutUs && (aboutUs.heroTitle || aboutUs.stats?.length || aboutUs.storyTitle || aboutUs.credentials?.length || aboutUs.awards?.length);

  // ── Derived data — use agent-entered data if available, else defaults
  const heroTitle = aboutUs?.heroTitle || 'Crafting Unforgettable Indian Journeys Since 2012';
  const heroSubtitle = aboutUs?.heroSubtitle || `${agent?.businessName || 'TG Travels'} is a Ministry-of-Tourism registered, IATA-accredited travel company headquartered in Mumbai, serving 15,000+ satisfied travellers across India and beyond.`;
  const heroBg = aboutUs?.heroBackgroundImage || 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&q=80';

  const stats = (aboutUs?.stats?.length ? aboutUs.stats : DEFAULT_STATS.map(s => ({ value: s.value, label: s.label })))
    .map((s, i) => ({ ...s, icon: STAT_ICONS[i % STAT_ICONS.length] }));

  const storyTitle = aboutUs?.storyTitle || 'Born in Mumbai, Trusted Across India';
  const storyParagraph1 = aboutUs?.storyParagraph1 || `Founded in 2012 by travel enthusiast Rajesh Kumar Sharma, ${agent?.businessName || 'TG Travels'} began as a boutique agency with a single mission — to deliver authentic, hassle-free travel experiences to Indian families and corporates alike.`;
  const storyParagraph2 = aboutUs?.storyParagraph2 || `Over 12 years we have grown into one of Maharashtra's most trusted travel operators, with offices in Mumbai and Pune, a team of 45+ certified travel professionals, and partnerships with 500+ hotels, airlines, and cruise lines worldwide.`;
  const storyBullets = aboutUs?.storyBullets?.length ? aboutUs.storyBullets : DEFAULT_BULLETS;
  const storyImage1 = aboutUs?.storyImage1 || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=700&q=80';
  const storyImage2 = aboutUs?.storyImage2 || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80';
  const yearsBadgeText = aboutUs?.yearsBadgeText || '12+ Years of Excellence';

  const credentials = aboutUs?.credentials?.length
    ? aboutUs.credentials.map(c => ({
        label: c.label,
        number: c.number,
        description: c.description,
        color: c.color,
        icon: CREDENTIAL_ICONS[c.color] || Globe,
      }))
    : DEFAULT_CREDENTIALS;

  const awards = aboutUs?.awards?.length ? aboutUs.awards : DEFAULT_AWARDS;

  const displayName = agent?.businessName || agent?.name || 'TG Travels';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Topbar />
      <Navbar />

      {/* ── Hero Banner ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${heroBg}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/50" />

        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <span>Home</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">About Us</span>
          </div>

          {/* Verified Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <BadgeCheck className="w-4 h-4 text-green-400" />
            Government of India Recognised Travel Agency
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {heroTitle.includes('\n') ? (
              heroTitle.split('\n').map((line, i) => (
                <span key={i}>
                  {i === 1 ? (
                    <span
                      className="text-transparent bg-clip-text"
                      style={{ backgroundImage: 'var(--theme-gradient)' }}
                    >
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                  {i < heroTitle.split('\n').length - 1 && <br />}
                </span>
              ))
            ) : (
              <span>{heroTitle}</span>
            )}
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
            {heroSubtitle}
          </p>

          <button
            id="about-cta-plan-tour"
            onClick={() => setShowPlanTourModal(true)}
            className="inline-flex items-center gap-3 text-white font-bold px-8 py-4 rounded-xl shadow-2xl transition-all hover:-translate-y-1 hover:shadow-xl active:scale-95 text-lg"
            style={{ background: 'var(--theme-gradient)' }}
          >
            <Plane className="w-5 h-5" />
            Plan Your Tour
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ── Stats Row ──────────────────────────────────────────────── */}
      {stats.length > 0 && (
      <section className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-${Math.min(stats.length, 6)} gap-6`}>
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center group">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110"
                  style={{ background: 'var(--theme-gradient)' }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ── Our Story ──────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Image collage */}
            <div className="relative h-[480px]">
              <img
                src={storyImage1}
                alt="Our team on tour"
                className="absolute top-0 left-0 w-3/4 h-3/4 object-cover rounded-2xl shadow-2xl"
              />
              <img
                src={storyImage2}
                alt="Beautiful destination"
                className="absolute bottom-0 right-0 w-1/2 h-1/2 object-cover rounded-2xl shadow-2xl border-4 border-white dark:border-gray-900"
              />
              {/* Years badge */}
              {yearsBadgeText && (
              <div
                className="absolute top-1/2 right-0 -translate-y-1/2 w-28 h-28 rounded-2xl flex flex-col items-center justify-center text-white shadow-xl"
                style={{ background: 'var(--theme-gradient)' }}
              >
                <span className="text-sm font-semibold text-center leading-tight px-2">
                  {yearsBadgeText}
                </span>
              </div>
              )}
            </div>

            {/* Content */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 text-white"
                style={{ background: 'var(--theme-gradient)' }}
              >
                <Award className="w-4 h-4" />
                Our Story
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-snug"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {storyTitle}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                {storyParagraph1}
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {storyParagraph2}
              </p>

              {/* Bullet highlights */}
              {storyBullets.length > 0 && (
              <ul className="space-y-3">
                {storyBullets.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--theme-primary)' }} />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Credentials & Registrations ────────────────────────────── */}
      {credentials.length > 0 && (
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 text-white"
              style={{ background: 'var(--theme-gradient)' }}
            >
              <ShieldCheck className="w-4 h-4" />
              Verified Credentials
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Licensed, Registered &amp; Accredited
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">
              Every credential is publicly verifiable. We believe in full transparency with our
              clients and partner agencies.
            </p>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Math.min(credentials.length, 4)} gap-6`}>
            {credentials.map(({ label, number, icon: Icon, color, description }) => {
              const c = colorMap[color] || colorMap.blue;
              return (
                <div
                  key={label}
                  className={`relative rounded-2xl border-2 ${c.border} ${c.bg} p-6 flex flex-col gap-4 group hover:-translate-y-1 transition-transform`}
                >
                  {/* Verified tick */}
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2.5 py-1 rounded-full text-xs font-bold">
                      <BadgeCheck className="w-3.5 h-3.5" />
                      Verified
                    </div>
                  </div>

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.icon}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-base">{label}</p>
                    <p className={`text-xs font-mono font-semibold mt-1 ${c.text}`}>{number}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">{description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* ── Why Choose Us ──────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 text-white"
              style={{ background: 'var(--theme-gradient)' }}
            >
              <Star className="w-4 h-4" />
              Why {displayName}
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The {displayName} Difference
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">
              Six pillars that set us apart from every other travel agency in India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_US.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white dark:bg-gray-800 rounded-2xl p-7 shadow-md hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 group"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                  style={{ background: 'var(--theme-gradient)' }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* ── Awards ─────────────────────────────────────────────────── */}
      {awards.length > 0 && (
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 text-white"
              style={{ background: 'var(--theme-gradient)' }}
            >
              <Award className="w-4 h-4" />
              Recognition
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Awards &amp; Accolades
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {awards.map(({ year, title, org }) => (
              <div
                key={title}
                className="flex items-start gap-4 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700"
              >
                <div
                  className="w-14 h-14 rounded-xl flex-shrink-0 flex flex-col items-center justify-center text-white font-black text-sm leading-tight"
                  style={{ background: 'var(--theme-gradient)' }}
                >
                  {year}
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ── Contact Info ───────────────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Get in Touch
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3">
              Our travel experts are ready to craft your perfect itinerary.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Phone,
                label: 'Call / WhatsApp',
                value: siteConfig?.contactPhone || agent?.whatsapp || '+91 98765 43210',
                sub: 'Mon – Sat, 9 AM – 8 PM',
                href: `tel:${siteConfig?.contactPhone || agent?.whatsapp || '+919876543210'}`,
              },
              {
                icon: Mail,
                label: 'Email Us',
                value: siteConfig?.contactEmail || 'tours@tgtravels.in',
                sub: 'Response within 2 hours',
                href: `mailto:${siteConfig?.contactEmail || 'tours@tgtravels.in'}`,
              },
              {
                icon: MapPin,
                label: 'Visit Our Office',
                value: siteConfig?.address || '304, Andheri West, Mumbai – 400058',
                sub: '',
                href: '#',
              },
            ].map(({ icon: Icon, label, value, sub, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-start gap-4 bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-[var(--theme-primary)] hover:-translate-y-1 transition-all group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ background: 'var(--theme-gradient)' }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mb-1">{label}</p>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{value}</p>
                  {sub && <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{sub}</p>}
                </div>
              </a>
            ))}
          </div>

          {/* CTA Banner */}
          <div
            className="rounded-3xl p-10 md:p-16 text-center text-white overflow-hidden relative"
            style={{ background: 'var(--theme-gradient)' }}
          >
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-white/5" />
            <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-white/5" />

            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-3">
                Ready to explore?
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Let's Plan Your Dream Vacation
              </h2>
              <p className="text-white/80 max-w-xl mx-auto mb-8 text-base">
                Fill in our quick tour planner and we'll send you a custom itinerary &amp;
                best-price quote within 2 hours — absolutely free.
              </p>
              <button
                id="about-cta-bottom-plan-tour"
                onClick={() => setShowPlanTourModal(true)}
                className="inline-flex items-center gap-3 bg-white font-bold px-10 py-4 rounded-xl shadow-2xl hover:-translate-y-1 hover:shadow-xl transition-all active:scale-95 text-base"
                style={{ color: 'var(--theme-primary)' }}
              >
                <Plane className="w-5 h-5" />
                Plan My Tour — It's Free
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatbotButton />

      {/* Plan Tour Modal */}
      <PlanTourModal
        isOpen={showPlanTourModal}
        onClose={() => setShowPlanTourModal(false)}
      />
    </div>
  );
}
