import { useRef, type ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import {
  ArrowRight,
  Broadcast,
  ChartBar,
  Clock,
  GlobeHemisphereWest,
  MapPin,
  Plus,
  SoccerBall,
} from '@phosphor-icons/react'
import { Pitch } from '../components/Pitch'
import { MarketingFooter } from '../components/Footer'
import { useSettings } from '../hooks/useSettings'
import { useSeo } from '../hooks/useSeo'
import { landingContent } from '../lib/landingContent'

/* ————— Bouton magnétique (motion values, hors cycle de rendu React) ————— */
function MagneticLink({
  to,
  children,
  variant = 'primary',
}: {
  to: string
  children: ReactNode
  variant?: 'primary' | 'ghost'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 18 })
  const springY = useSpring(y, { stiffness: 180, damping: 18 })

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left - rect.width / 2) * 0.18)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.18)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      className="inline-block"
    >
      <Link
        to={to}
        className={
          variant === 'primary'
            ? 'group flex items-center gap-2.5 rounded-full bg-[#0a8f59] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_28px_-10px_rgba(10,143,89,0.55)] transition-[filter,box-shadow] hover:brightness-[1.08] active:scale-[0.98]'
            : 'flex items-center gap-2.5 rounded-full border border-zinc-300 bg-white px-7 py-3.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-900 active:scale-[0.98]'
        }
      >
        {children}
      </Link>
    </motion.div>
  )
}

/* ————— Carte match du hero (surface blanche, terrain vert) ————— */
function HeroMatchCard({ liveLabel }: { liveLabel: string }) {
  return (
    <div className="animate-float-soft">
      <motion.div
        initial={{ opacity: 0, y: 32, rotate: 3 }}
        animate={{ opacity: 1, y: 0, rotate: 1.5 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.35 }}
        className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_40px_80px_-28px_rgba(20,40,30,0.28)]"
      >
        <div className="flex items-center justify-between px-5 py-3.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0a8f59]/12 px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wide text-[#0a8f59]">
            <span className="size-1.5 rounded-full bg-[#00d084] animate-pulse-live" />
            <span className="animate-pulse-live">{liveLabel} · 74’</span>
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
            Groupe C · J2
          </span>
        </div>
        <div className="relative mx-3 overflow-hidden rounded-xl">
          <Pitch className="block h-44 w-full" />
          <div className="absolute inset-0 grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-5">
            <div className="flex flex-col items-start gap-2">
              <img
                src="https://flagcdn.com/w80/ar.png"
                alt="Argentina"
                className="h-9 w-13 rounded-sm object-cover shadow-[0_4px_12px_rgba(0,0,0,0.5)] ring-1 ring-white/40"
              />
              <span className="text-sm font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                Argentina
              </span>
            </div>
            <span className="font-mono text-4xl font-bold tracking-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
              2<span className="mx-2 text-white/50">–</span>1
            </span>
            <div className="flex flex-col items-end gap-2">
              <img
                src="https://flagcdn.com/w80/hr.png"
                alt="Croatia"
                className="h-9 w-13 rounded-sm object-cover shadow-[0_4px_12px_rgba(0,0,0,0.5)] ring-1 ring-white/40"
              />
              <span className="text-sm font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                Croatia
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-5 py-3.5 text-xs text-zinc-500">
          <MapPin size={14} weight="fill" />
          SoFi Stadium · Los Angeles
        </div>
      </motion.div>
    </div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 90, damping: 18 },
  },
}

function MiniStanding() {
  const rows = [
    { flag: 'fr', name: 'France', pts: 6, tint: true },
    { flag: 'no', name: 'Norway', pts: 4, tint: true },
    { flag: 'sn', name: 'Senegal', pts: 1, tint: false },
    { flag: 'uz', name: 'Uzbekistan', pts: 0, tint: false },
  ]
  return (
    <div className="divide-y divide-zinc-100 font-mono text-xs">
      {rows.map((row, i) => (
        <div
          key={row.flag}
          className={`flex items-center gap-2.5 px-1 py-2 ${row.tint ? 'text-zinc-900' : 'text-zinc-400'}`}
        >
          <span className="w-3 text-zinc-400">{i + 1}</span>
          <img
            src={`https://flagcdn.com/w40/${row.flag}.png`}
            alt=""
            className="h-3 w-4.5 rounded-[2px] object-cover"
          />
          <span className="flex-1">{row.name}</span>
          {row.tint && <span className="size-1.5 rounded-full bg-[#0a8f59]" />}
          <span className="font-bold">{row.pts}</span>
        </div>
      ))}
    </div>
  )
}

function TimezoneRows() {
  const zones = [
    { city: 'New York', tz: 'America/New_York' },
    { city: 'Mexico', tz: 'America/Mexico_City' },
    { city: 'Vancouver', tz: 'America/Vancouver' },
    { city: 'Paris', tz: 'Europe/Paris' },
  ]
  const kickoff = new Date()
  return (
    <div className="divide-y divide-zinc-100 font-mono text-xs">
      {zones.map((zone) => (
        <div key={zone.tz} className="flex items-center justify-between px-1 py-2">
          <span className="text-zinc-500">{zone.city}</span>
          <span className="font-bold text-zinc-900">
            {new Intl.DateTimeFormat('en-GB', {
              timeZone: zone.tz,
              hour: '2-digit',
              minute: '2-digit',
            }).format(kickoff)}
          </span>
        </div>
      ))}
    </div>
  )
}

function FeatureCard({
  icon: IconComponent,
  title,
  description,
  exploreLabel,
  to,
  children,
}: {
  icon: typeof Broadcast
  title: string
  description: string
  exploreLabel: string
  to: string
  children?: ReactNode
}) {
  return (
    <motion.div variants={fadeUp}>
      <Link
        to={to}
        className="group flex h-full flex-col rounded-[1.75rem] border border-zinc-200 bg-white p-7 shadow-[0_20px_44px_-26px_rgba(20,40,30,0.16)] transition-[border-color,transform] hover:border-zinc-300 active:scale-[0.99] md:p-8"
      >
        <span className="mb-5 flex size-10 items-center justify-center rounded-xl bg-[#1a6b3c]/10 text-[#0a8f59]">
          <IconComponent size={20} weight="bold" />
        </span>
        <h3 className="text-lg font-bold tracking-tight text-zinc-900">{title}</h3>
        <p className="mt-1.5 max-w-[44ch] text-sm leading-relaxed text-zinc-500">{description}</p>
        {children && <div className="mt-6 flex-1">{children}</div>}
        <span className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-[#0a8f59]">
          {exploreLabel}
          <ArrowRight
            size={14}
            weight="bold"
            className="transition-transform duration-300 ease-out group-hover:translate-x-1"
          />
        </span>
      </Link>
    </motion.div>
  )
}

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  return (
    <motion.details
      variants={fadeUp}
      className="group border-b border-zinc-200 py-5 [&_summary::-webkit-details-marker]:hidden"
      open={index === 0}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
        <h3 className="text-base font-semibold text-zinc-900 md:text-lg">{q}</h3>
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-zinc-500 transition-transform duration-300 group-open:rotate-45">
          <Plus size={14} weight="bold" />
        </span>
      </summary>
      <p className="mt-3 max-w-[68ch] text-sm leading-relaxed text-zinc-600">{a}</p>
    </motion.details>
  )
}

export function LandingPage() {
  const { settings } = useSettings()
  const c = landingContent[settings.language]
  useSeo({ title: c.seo.title, description: c.seo.description })

  return (
    <div className="min-h-[100dvh] bg-[#f6f7f5] text-zinc-900">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-30 border-b border-zinc-200/70 bg-[#f6f7f5]/80 backdrop-blur-md">
        <nav className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-4 md:px-8">
          <span className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-pitch">
              <SoccerBall size={18} weight="fill" className="text-white" />
            </span>
            <span className="font-bold tracking-tight">
              WC26<span className="text-[#0a8f59]"> Tracker</span>
            </span>
          </span>
          <div className="flex items-center gap-1.5">
            <Link
              to="/app/standings"
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 sm:block"
            >
              {c.nav.standings}
            </Link>
            <Link
              to="/app"
              className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-bold text-white transition-[filter] hover:brightness-110 active:scale-[0.98]"
            >
              {c.nav.openApp}
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_82%_15%,rgba(10,143,89,0.12),transparent_70%)]"
        />
        <div className="relative mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-14 px-4 pb-20 pt-32 md:px-8 lg:min-h-[100dvh] lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-0">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
          >
            <motion.p
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0a8f59]"
            >
              <span className="size-1.5 rounded-full bg-[#00d084] animate-pulse-live" />
              {c.hero.badge}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="max-w-[15ch] text-4xl font-extrabold leading-[0.95] tracking-tighter md:text-6xl"
            >
              {c.hero.titlePre} <span className="text-[#0a8f59]">{c.hero.titleAccent}</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-[54ch] text-base leading-relaxed text-zinc-600"
            >
              {c.hero.subtitle}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticLink to="/app">
                {c.hero.ctaPrimary}
                <ArrowRight
                  size={16}
                  weight="bold"
                  className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                />
              </MagneticLink>
              <MagneticLink to="/app/standings" variant="ghost">
                {c.hero.ctaSecondary}
              </MagneticLink>
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="mt-8 flex items-center gap-3 font-mono text-xs text-zinc-400"
            >
              <span className="flex -space-x-1.5">
                {['fr', 'br', 'ar', 'us', 'mx'].map((code) => (
                  <img
                    key={code}
                    src={`https://flagcdn.com/w40/${code}.png`}
                    alt=""
                    className="h-4 w-6 rounded-[2px] object-cover ring-2 ring-[#f6f7f5]"
                  />
                ))}
              </span>
              {c.hero.proof}
            </motion.p>
          </motion.div>

          <div className="flex justify-center lg:justify-end lg:pr-4">
            <HeroMatchCard liveLabel={settings.language === 'fr' ? 'EN DIRECT' : 'LIVE'} />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-zinc-200 bg-white">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-2 divide-x divide-zinc-200 md:grid-cols-4">
          {c.stats.map((stat) => (
            <div key={stat.label} className="px-6 py-8 md:px-10">
              <div className="font-mono text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-zinc-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Marquee */}
      <section className="overflow-hidden border-b border-zinc-200 py-5">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[...c.cities, ...c.cities].map((city, i) => (
            <span
              key={`${city}-${i}`}
              className="flex items-center gap-10 font-mono text-xs uppercase tracking-[0.25em] text-zinc-400"
            >
              {city}
              <span className="size-1 rounded-full bg-[#0a8f59]/50" />
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-[1400px] px-4 py-24 md:px-8 md:py-36">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h2
            variants={fadeUp}
            className="max-w-[22ch] text-3xl font-bold tracking-tighter text-zinc-900 md:text-5xl"
          >
            {c.features.heading}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 max-w-[55ch] text-base text-zinc-600">
            {c.features.subheading}
          </motion.p>

          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-[1.4fr_1fr]">
            <FeatureCard
              icon={Broadcast}
              title={c.features.live.title}
              description={c.features.live.description}
              exploreLabel={c.features.explore}
              to="/app"
            >
              <div className="relative h-40 overflow-hidden rounded-2xl">
                <Pitch className="block h-full w-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 font-mono text-xs font-semibold text-[#00d084] backdrop-blur-sm">
                    <span className="size-1.5 rounded-full bg-[#00d084] animate-pulse-live" />
                    {c.features.live.badge}
                  </span>
                </div>
              </div>
            </FeatureCard>

            <FeatureCard
              icon={ChartBar}
              title={c.features.standings.title}
              description={c.features.standings.description}
              exploreLabel={c.features.explore}
              to="/app/standings"
            >
              <MiniStanding />
            </FeatureCard>

            <FeatureCard
              icon={GlobeHemisphereWest}
              title={c.features.teams.title}
              description={c.features.teams.description}
              exploreLabel={c.features.explore}
              to="/app/teams"
            >
              <div className="flex flex-wrap gap-2">
                {['fr', 'br', 'ar', 'us', 'mx', 'ca', 'de', 'jp', 'ma', 'es'].map((code) => (
                  <img
                    key={code}
                    src={`https://flagcdn.com/w40/${code}.png`}
                    alt=""
                    loading="lazy"
                    className="h-5 w-7 rounded-[2px] object-cover ring-1 ring-zinc-200"
                  />
                ))}
              </div>
            </FeatureCard>

            <FeatureCard
              icon={Clock}
              title={c.features.timezone.title}
              description={c.features.timezone.description}
              exploreLabel={c.features.explore}
              to="/app/settings"
            >
              <TimezoneRows />
            </FeatureCard>
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="border-t border-zinc-200 bg-white">
        <div className="mx-auto w-full max-w-3xl px-4 py-24 md:px-8 md:py-32">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 90, damping: 18 }}
            className="mb-10 text-3xl font-bold tracking-tighter text-zinc-900 md:text-4xl"
          >
            {c.faq.heading}
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          >
            {c.faq.items.map((item, i) => (
              <FaqItem key={item.q} q={item.q} a={item.a} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-zinc-200">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-start gap-8 px-4 py-24 md:px-8 md:py-32 lg:pl-[16vw]">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a8f59]">
            {c.cta.eyebrow}
          </p>
          <h2 className="max-w-[18ch] text-3xl font-bold tracking-tighter text-zinc-900 md:text-5xl">
            {c.cta.heading}
          </h2>
          <MagneticLink to="/app">
            {c.cta.button}
            <ArrowRight size={16} weight="bold" />
          </MagneticLink>
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
