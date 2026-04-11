'use client'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const OzoGlobe = dynamic(() => import('@/components/OzoGlobe'), {
  ssr: false,
  loading: () => (
    <div style={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 32, height: 32, border: '2px solid #FF5886', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  ),
})

// ─── Shared font ─────────────────────────────────────────────────────────
const FONT = 'Josefin Sans, sans-serif'

// ─── Design Process palette ───────────────────────────────────────────────
const P = {
  ink:      '#0f0f0d',
  ink2:     '#3a3a36',
  ink3:     '#7a7a74',
  surface:  '#fafaf7',
  surface2: '#f2f1ec',
  border:   'rgba(15,15,13,0.1)',
  borderSt: 'rgba(15,15,13,0.2)',
  accent:   '#d45a1e',
  accentLt: '#faeee6',
  green:    '#1a6b5c',
  greenLt:  '#e3f2ef',
  blue:     '#2c4fa8',
  blueLt:   '#e8edf9',
  yellow:   '#e8a320',
  yellowLt: '#fdf4e3',
}

// ─── Hover image block ────────────────────────────────────────────────────
function HoverImageBlock({ children, href, label, style = {} }: {
  children: React.ReactNode; href: string; label: string; style?: React.CSSProperties
}) {
  return (
    <div
      style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', cursor: href !== '#' ? 'pointer' : 'default', ...style }}
      onClick={() => { if (href !== '#') window.open(href, '_blank') }}
    >
      {children}
      {href !== '#' && (
        <div className="ozo-hover-overlay">
          <span className="ozo-hover-btn">
            {label}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 6 }}>
              <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
            </svg>
          </span>
        </div>
      )}
    </div>
  )
}

// ─── Sticky in-page nav ───────────────────────────────────────────────────
function SectionNav({ active }: { active: 'final' | 'process' }) {
  // After
const [stuck, setStuck] = useState(false)
const sentinelRef = useRef<HTMLDivElement>(null)

useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: 1 }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const tab = (id: string, label: string, key: 'final' | 'process') => (
    <button
      onClick={() => scrollTo(id)}
      style={{
        fontFamily: FONT, fontSize: 13, fontWeight: 700, letterSpacing: '0.05em',
        padding: '6px 18px', borderRadius: 999, border: 'none', cursor: 'pointer',
        transition: 'all 0.2s',
        background: active === key ? '#25484e' : 'transparent',
        color:      active === key ? '#fff'     : '#858e8e',
      }}
    >{label}</button>
  )

  return (
    <>
      {/* Sentinel sits just above where the nav would naturally be */}
      <div ref={sentinelRef} style={{ height: 1, marginTop: -1 }} />

      <div style={{ position: 'sticky', top: 70, zIndex: 50 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: stuck ? 'flex-start' : 'center',
            padding: stuck ? '0 24px' : '0',
            transition: 'justify-content 0s', // instant reflow; animate via padding instead
          }}
        >
          {/* Background pill wraps only the tabs */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              height: 52,
              padding: '0 6px',
              borderRadius: 999,
              background: '#f0f2f2',
              transition: 'all 0.3s ease',
            }}
          >
            <span style={{ color: '#ccc', marginRight: 8 }}>·</span>
            {tab('final-result', 'Final Result', 'final')}
            {tab('design-process', 'Design Process', 'process')}
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Design Process sub-components ───────────────────────────────────────
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: P.accent, display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
      <span style={{ width: 20, height: 1, background: P.accent, display: 'inline-block' }} />{children}
    </div>
  )
}
function SecTitle({ children, white }: { children: React.ReactNode; white?: boolean }) {
  return <h2 style={{ fontFamily: FONT, fontSize: 'clamp(22px,3vw,36px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-1px', color: white ? '#fff' : P.ink, margin: 0 }}>{children}</h2>
}
function Divider() {
  return <div style={{ borderTop: `1px solid ${P.border}` }} />
}
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, marginTop: 8 }}>
      <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#25484e' }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: 'rgba(37,72,78,0.15)' }} />
    </div>
  )
}
function Pill({ type, children }: { type: 'pos' | 'neu' | 'neg'; children: string }) {
  const map = { pos: { bg: P.greenLt, c: P.green }, neu: { bg: P.surface2, c: P.ink2 }, neg: { bg: '#fdecea', c: '#b83232' } }
  const { bg, c } = map[type]
  return <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 100, background: bg, color: c, display: 'inline-block', margin: '2px 2px 2px 0' }}>{children}</span>
}

// ─── Main ─────────────────────────────────────────────────────────────────
export default function OzoAdsCaseStudy() {
  const finalRef   = useRef<HTMLDivElement>(null)
  const processRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<'final' | 'process'>('final')

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id === 'design-process' ? 'process' : 'final') }),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    if (finalRef.current) obs.observe(finalRef.current)
    if (processRef.current) obs.observe(processRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.ozo-reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('ozo-visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.08 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <div style={{ background: '#f4f6f6', minHeight: '100vh', paddingTop: 48 }}>

        {/* ── INTRO ───────────────────────────────────────────────── */}
        <div style={{ maxWidth: 1104, margin: '0 auto', padding: '0 24px 24px' }}>
          <div className="ozo-reveal" style={{ background: '#fff', borderRadius: 24, padding: 48, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start', overflow: 'hidden' }}>
            <div>
              <h1 style={{ fontFamily: FONT, fontSize: 'clamp(28px,3vw,36px)', fontWeight: 600, color: '#1a1a1a', lineHeight: 1.2, marginBottom: 24 }}>OZo Ads</h1>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: '#3b3f40', marginBottom: 16 }}>
                A transparent, end-to-end platform that lets any business — local café to global brand — discover, book, and manage outdoor advertising campaigns without agencies, guesswork, or hidden costs.
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: '#858e8e', marginTop: 20 }}><span style={{ color: 'rgba(133,142,142,0.7)' }}>Role:</span> UI / UX Designer</p>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: '#858e8e' }}><span style={{ color: 'rgba(133,142,142,0.7)' }}>Contribution:</span> Website Design, Visual Design, Prototyping</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
              <img src="/images/ozo-ads-hero.png" alt="OZo Ads" style={{ width: '20%', borderRadius: 12, display: 'block', margin: '0 auto' }} />
              <div style={{ width: '100%', marginTop: 1 }}><OzoGlobe height={220} /></div>
            </div>
          </div>
        </div>

        {/* ── STICKY NAV ──────────────────────────────────────────── */}
        <SectionNav active={active} />

        {/* ── CONTENT ─────────────────────────────────────────────── */}
        <div style={{ maxWidth: 1104, margin: '0 auto', padding: '24px 24px 0', display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* ══════════════ FINAL RESULT ════════════════════════════ */}
          <div id="final-result" ref={finalRef} style={{ scrollMarginTop: 60 }}>
            <SectionLabel>Final Result</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div className="ozo-reveal" style={{ background: '#2A1A2E', borderRadius: 24, overflow: 'hidden' }}>
                <img src="/images/Campaing Dashboard.png" alt="Campaign Dashboard" style={{ width: '100%', display: 'block' }} />
              </div>
              <div className="ozo-reveal" style={{ background: '#2A1A2E', borderRadius: 24, overflow: 'hidden' }}>
                <img src="/images/Billboard detail view.png" alt="Billboard Detail" style={{ width: '100%', display: 'block' }} />
              </div>
              <div className="ozo-reveal" style={{ background: '#2A1A2E', borderRadius: 24, overflow: 'hidden' }}>
                <img src="/images/all-campaigns.png" alt="All Campaigns" style={{ width: '100%', display: 'block' }} />
              </div>
              <div className="ozo-reveal" style={{ background: '#2A1A2E', borderRadius: 24, overflow: 'hidden' }}>
                <img src="/images/Create-Campaing.png" alt="Create Campaign" style={{ width: '100%', display: 'block' }} />
              </div>
              <div className="ozo-reveal" style={{ display: 'flex', gap: 24 }}>
                <div style={{ flex: 1, background: '#2A1A2E', borderRadius: 24, overflow: 'hidden' }}>
                  <img src="/images/Billboard brief view.png" alt="Billboard Brief" style={{ width: '100%', display: 'block' }} />
                </div>
                <HoverImageBlock href="https://www.figma.com/design/5prjx4rzRg3RjlyVP4hIUB/OZo?node-id=188-266&t=fR80mKxjj8FsaivS-1" label="View Figma File" style={{ flex: 1, background: '#f8f0fc' }}>
                  <img src="/images/components.png" alt="Components" style={{ width: '100%', display: 'block' }} />
                </HoverImageBlock>
              </div>
              <div className="ozo-reveal" style={{ display: 'flex', gap: 24 }}>
                <div style={{ flex: 1, background: '#2A1A2E', borderRadius: 24, overflow: 'hidden' }}>
                  <img src="/images/Frame-17.png" alt="Mobile View" style={{ width: '100%', display: 'block' }} />
                </div>
                <HoverImageBlock href="#" label="View Live Site" style={{ flex: 1, background: '#1A2E2A' }}>
                  <img src="/images/Frame-19.png" alt="Mobile View 2" style={{ width: '100%', display: 'block' }} />
                </HoverImageBlock>
              </div>
            </div>
          </div>

          {/* ══════════════ DESIGN PROCESS ══════════════════════════ */}
          <div id="design-process" ref={processRef} style={{ scrollMarginTop: 60 }}>
            <SectionLabel>Design Process</SectionLabel>

            <div style={{ background: '#fff', borderRadius: 24, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

              {/* HERO */}
              <div style={{ padding: '72px 48px 56px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: P.accent, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                    <span style={{ width: 24, height: 1, background: P.accent, display: 'inline-block' }} />UX Case Study · 2025–26
                  </div>
                  <h1 style={{ fontFamily: FONT, fontSize: 'clamp(36px,5vw,58px)', fontWeight: 700, lineHeight: 1.0, letterSpacing: '-2px', color: P.ink, marginBottom: 24 }}>
                    Billboard ads,<br /><span style={{ color: P.accent }}>without</span><br />the chaos.
                  </h1>
                  <p style={{ fontFamily: FONT, fontSize: 15, color: P.ink2, lineHeight: 1.65, marginBottom: 28, maxWidth: 440 }}>
                    A transparent, end-to-end platform that lets any business — local café to global brand — discover, book, and manage outdoor advertising campaigns without agencies, guesswork, or hidden costs.
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {['UX Research', 'Product Strategy'].map(t => (
                      <span key={t} style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 100, border: `1px solid ${P.borderSt}`, color: P.ink2, background: '#fff' }}>{t}</span>
                    ))}
                  </div>
                </div>
                {/* Stats */}
                <div style={{ background: P.ink, borderRadius: 20, padding: '36px 28px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: P.accent, opacity: 0.15 }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, position: 'relative' }}>
                    {[['4×','Persona types'],['7+','Pain clusters'],['12','Edge cases mapped'],['6','Journey stages']].map(([n, l]) => (
                      <div key={l} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 18 }}>
                        <div style={{ fontFamily: FONT, fontSize: 28, fontWeight: 700, color: '#fff', lineHeight: 1, marginBottom: 4 }}>
                          {n.replace(/[×+]/g, '')}<span style={{ color: P.accent, fontSize: 18 }}>{n.match(/[×+]/)?.[0]}</span>
                        </div>
                        <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{l}</div>
                      </div>
                    ))}
                    <div style={{ gridColumn: 'span 2', background: P.accent, borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontFamily: FONT, fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Local → Global</div>
                        <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Scales from Tier-2 cities to 50+ countries</div>
                      </div>
                      <span style={{ fontSize: 28, opacity: 0.65 }}>🌍</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* OVERVIEW STRIP */}
              {/* <div style={{ background: P.ink }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'rgba(255,255,255,0.1)' }}>
                  {[['Role','UX Designer & Researcher'],['Scope','Mobile App + Responsive Web Platform'],['Domain','Out-of-Home (OOH) Advertising'],['Methods','Personas · Journey Maps · HMW · User Stories']].map(([l, v]) => (
                    <div key={l} style={{ background: P.ink, padding: '26px 22px' }}>
                      <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>{l}</div>
                      <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: '#fff', lineHeight: 1.35 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div> */}

              <Divider />

              {/* 01 PROBLEM */}
              <div style={{ padding: '64px 48px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 48, gap: 40 }}>
                  <div><Eyebrow>01 — The Problem</Eyebrow><SecTitle>Billboard advertising is broken<br />by design.</SecTitle></div>
                  <p style={{ fontFamily: FONT, fontSize: 13, color: P.ink3, maxWidth: 360, lineHeight: 1.65, marginTop: 8, flexShrink: 0 }}>What should be a powerful offline channel is trapped behind phone calls, opaque pricing, fragmented vendors, and zero measurement.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
                  <div>
                    <div style={{ fontFamily: FONT, fontSize: 20, fontWeight: 700, lineHeight: 1.3, color: P.ink, borderLeft: `3px solid ${P.accent}`, paddingLeft: 20, marginBottom: 24 }}>
                      "I just want to book it online without calling multiple people."
                    </div>
                    <p style={{ fontFamily: FONT, fontSize: 14, color: P.ink2, lineHeight: 1.8, marginBottom: 16 }}>Billboard advertising remains one of the most effective forms of brand awareness — but for most businesses, it&apos;s completely inaccessible without an agency or inside connections. Pricing is hidden. Availability is a phone call. Proof of display is a WhatsApp photo.</p>
                    <p style={{ fontFamily: FONT, fontSize: 14, color: P.ink2, lineHeight: 1.8 }}>The gap between the potential of OOH advertising and the reality of booking it is enormous — and it disproportionately hurts small businesses and new market entrants who need it most.</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {[
                      { t: 'Discovery overload',    d: "Don't know where to start, no audience data, no inventory visibility", a: P.accent },
                      { t: 'Pricing opacity',        d: 'Hidden costs, no benchmarks, fear of overpaying, multi-currency confusion', a: P.green },
                      { t: 'Low trust & ROI',        d: 'No proof of display, no verification, no performance metrics', a: P.blue },
                      { t: 'Operational friction',   d: 'Manual emails & calls, multiple vendors, no central dashboard', a: P.yellow },
                      { t: 'Creative chaos',         d: 'Unknown specs, rejection risk, version control nightmares', a: '#9b59b6' },
                      { t: 'Rigidity',               d: 'Monthly-only bookings, no pausing, no experimentation', a: '#e84393' },
                    ].map(({ t, d, a }) => (
                      <div key={t} style={{ border: `1px solid ${P.border}`, borderLeft: `3px solid ${a}`, borderRadius: 12, padding: '16px 16px 16px 18px', background: '#fff' }}>
                        <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, marginBottom: 4, color: P.ink }}>{t}</div>
                        <div style={{ fontFamily: FONT, fontSize: 11, color: P.ink3, lineHeight: 1.5 }}>{d}</div>
                      </div>
                    ))}
                    <div style={{ gridColumn: 'span 2', border: `1px solid ${P.border}`, borderLeft: `3px solid #1abc9c`, borderRadius: 12, padding: '16px 16px 16px 18px', background: '#fff' }}>
                      <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, marginBottom: 4, color: P.ink }}>Emotional gap</div>
                      <div style={{ fontFamily: FONT, fontSize: 11, color: P.ink3, lineHeight: 1.5 }}>Post-payment anxiety, no status updates, no human support when stuck</div>
                    </div>
                  </div>
                </div>
              </div>

              <Divider />

              {/* 02 PERSONAS */}
              <div style={{ padding: '64px 48px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 48, gap: 40 }}>
                  <div><Eyebrow>02 — Who We&apos;re Designing For</Eyebrow><SecTitle>Four users, one platform.</SecTitle></div>
                  <p style={{ fontFamily: FONT, fontSize: 13, color: P.ink3, maxWidth: 360, lineHeight: 1.65, marginTop: 8, flexShrink: 0 }}>From a local café owner to a global marketing director — the platform must serve radically different needs without sacrificing depth or simplicity.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }}>
                  {[
                    { i: 'M', name: 'Maria Fernandes', role: 'Local Café Owner · Mid-sized city', pills: ['Budget: Low','1st-timer','Trust-driven'], quote: "I don't need fancy marketing — I just want to know it'll actually bring people in.", ab: P.accentLt, ac: P.accent },
                    { i: 'A', name: 'Arjun Mehta', role: 'D2C Startup Founder · Metro city', pills: ['Budget: Mid','Data-driven','Fast-moving'], quote: "If I can't test, tweak, and measure it — it's not worth my budget.", ab: P.greenLt, ac: P.green },
                    { i: 'S', name: 'Sarah Thompson', role: 'National Marketing Manager', pills: ['Budget: High','Process-first','Reporting-heavy'], quote: "I don't want surprises — I want visibility, control, and clean reports.", ab: P.blueLt, ac: P.blue },
                    { i: 'D', name: 'Daniel Wong', role: 'Global Marketing Director · Singapore/London', pills: ['Budget: Very high','Risk-averse','Governance'], quote: "If I can't see it, verify it, and govern it — it's a liability.", ab: P.yellowLt, ac: '#7a4f00' },
                  ].map(({ i, name, role, pills, quote, ab, ac }) => (
                    <div key={name} style={{ border: `1px solid ${P.border}`, borderRadius: 20, background: '#fff', padding: '22px 18px' }}>
                      <div style={{ width: 46, height: 46, borderRadius: '50%', background: ab, color: ac, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontSize: 17, fontWeight: 700, marginBottom: 12 }}>{i}</div>
                      <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, marginBottom: 2, color: P.ink }}>{name}</div>
                      <div style={{ fontFamily: FONT, fontSize: 11, color: P.ink3, marginBottom: 10, fontWeight: 500 }}>{role}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
                        {pills.map(p => <span key={p} style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100, background: ab, color: ac }}>{p}</span>)}
                      </div>
                      <div style={{ fontFamily: FONT, fontSize: 12, color: P.ink2, fontStyle: 'italic', lineHeight: 1.5, borderTop: `1px solid ${P.border}`, paddingTop: 10 }}>{quote}</div>
                    </div>
                  ))}
                </div>
              </div>

              <Divider />

              {/* 03 EMPATHY MAP */}
              <div style={{ padding: '64px 48px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 48, gap: 40 }}>
                  <div><Eyebrow>03 — Empathy Map</Eyebrow><SecTitle>Inside the user&apos;s head.</SecTitle></div>
                  <p style={{ fontFamily: FONT, fontSize: 13, color: P.ink3, maxWidth: 360, lineHeight: 1.65, marginTop: 8, flexShrink: 0 }}>Synthesizing across all four personas to understand the shared emotional and behavioral landscape.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: `1px solid ${P.border}`, borderRadius: 20, overflow: 'hidden' }}>
                  {[
                    { icon: '💬', label: 'Says', color: P.blue, bg: P.blueLt,
                      items: ["I want to advertise in a busy area, but I don't know where to start.", "Why is billboard pricing so unclear?", "I just want to book it online without calling multiple people.", "I need something quick and reliable."] },
                    { icon: '⚙️', label: 'Does', color: P.green, bg: P.greenLt,
                      items: ["Searches online for billboard advertising options", "Compares locations, prices, and visibility", "Uploads creatives or checks design requirements", "Reviews confirmation, payment, and campaign status"] },
                    { icon: '💭', label: 'Thinks', color: P.yellow, bg: P.yellowLt,
                      items: ["Am I paying too much for this location?", "Will this billboard actually get enough visibility?", "I hope this platform is trustworthy.", "I need proof this is worth my money."] },
                    { icon: '❤️', label: 'Feels', color: P.accent, bg: P.accentLt,
                      items: ["Confused at the start — too many unknowns", "Anxious about cost and campaign effectiveness", "Cautiously optimistic when seeing clear options", "Relieved and confident once tracking is live"] },
                  ].map(({ icon, label, color, bg, items }, idx) => (
                    <div key={label} style={{ padding: 26, background: '#fff', borderRight: idx % 2 === 0 ? `1px solid ${P.border}` : 'none', borderBottom: idx < 2 ? `1px solid ${P.border}` : 'none' }}>
                      <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                        <span style={{ width: 26, height: 26, borderRadius: 8, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>{icon}</span>{label}
                      </div>
                      {items.map((item, i) => (
                        <div key={i} style={{ fontFamily: FONT, fontSize: 12, color: P.ink2, padding: '7px 0', borderBottom: i < items.length - 1 ? `1px solid ${P.border}` : 'none', lineHeight: 1.5, display: 'flex', gap: 6 }}>
                          <span style={{ color: P.ink3, flexShrink: 0 }}>"</span>{item}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <Divider />

              {/* 04 JOURNEY MAP */}
              <div style={{ padding: '64px 48px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 48, gap: 40 }}>
                  <div><Eyebrow>04 — User Journey Map</Eyebrow><SecTitle>From &ldquo;how do I start?&rdquo;<br />to &ldquo;my ad is live.&rdquo;</SecTitle></div>
                  <p style={{ fontFamily: FONT, fontSize: 13, color: P.ink3, maxWidth: 360, lineHeight: 1.65, marginTop: 8, flexShrink: 0 }}>Six stages. Every friction point, feeling, and opportunity catalogued.</p>
                </div>
                <div style={{ overflowX: 'auto', border: `1px solid ${P.border}`, borderRadius: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        {['#','Stage','User Actions','Emotions','Opportunity'].map(h => (
                          <th key={h} style={{ background: P.ink, color: 'rgba(255,255,255,0.45)', fontFamily: FONT, fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '13px 18px', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {([
                        { n:'01', s:'Discover', sub:'Awareness', a:'Visits platform, searches for billboard options, enters preferred city, views map', f:[['neu','Curious'],['neg','Unsure'],['pos','Hopeful']], o:['Clear "Find Billboards Near You" entry point','Location-based recommendations','Simple hero messaging, no jargon'] },
                        { n:'02', s:'Evaluate', sub:'Research', a:'Clicks billboard pins, views photos & specs, compares pricing, checks estimated reach', f:[['pos','Interested'],['neg','Confused'],['neu','Cautious']], o:['Side-by-side comparison view','Real-world photo previews with street context','Plain-language traffic & audience data'] },
                        { n:'03', s:'Select & Schedule', sub:'Decision', a:'Selects billboard, chooses dates, reviews availability calendar, confirms duration', f:[['neu','Focused'],['neg','Anxious'],['pos','Hopeful']], o:['Price lock timer (10 min hold)','Availability warnings & scarcity signals','Clear cost summary before next step'] },
                        { n:'04', s:'Upload Creative', sub:'Production', a:'Views requirements, uploads file, previews on billboard mockup, fixes errors', f:[['neg','Uncertain'],['pos','Relieved'],['pos','Confident']], o:['Free templates for common billboard sizes','Real-time mockup preview on actual billboard photo','Live file validation (format, size, resolution)'] },
                        { n:'05', s:'Review & Pay', sub:'Commitment', a:'Reviews campaign summary, checks total cost, enters payment, completes booking', f:[['neg','Nervous'],['neu','Trusting'],['pos','Relieved']], o:['Clear refund & cancellation policies upfront','Secure payment indicators (SSL, trust badges)','Itemised cost breakdown before confirming'] },
                        { n:'06', s:'Track & Measure', sub:'Post-booking', a:'Receives confirmation, views campaign dashboard, tracks status, reviews post-campaign summary', f:[['pos','Satisfied'],['pos','Confident'],['pos','Accomplished']], o:['Real-time status notifications (SMS + email)','Proof-of-display photos once live','Simple performance summary + easy rebooking'] },
                      ] as const).map(({ n, s, sub, a, f, o }, i) => (
                        <tr key={n}>
                          <td style={{ padding: '16px 18px', borderBottom: i < 5 ? `1px solid ${P.border}` : 'none', background: i % 2 === 1 ? P.surface : '#fff', fontFamily: FONT, fontSize: 11, fontWeight: 700, color: P.accent }}>{n}</td>
                          <td style={{ padding: '16px 18px', borderBottom: i < 5 ? `1px solid ${P.border}` : 'none', background: i % 2 === 1 ? P.surface : '#fff', whiteSpace: 'nowrap' }}>
                            <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: P.ink }}>{s}</div>
                            <div style={{ fontFamily: FONT, fontSize: 9, fontWeight: 700, color: P.accent, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>{sub}</div>
                          </td>
                          <td style={{ padding: '16px 18px', borderBottom: i < 5 ? `1px solid ${P.border}` : 'none', background: i % 2 === 1 ? P.surface : '#fff', fontFamily: FONT, fontSize: 12, color: P.ink2, lineHeight: 1.55, maxWidth: 220 }}>{a}</td>
                          <td style={{ padding: '16px 18px', borderBottom: i < 5 ? `1px solid ${P.border}` : 'none', background: i % 2 === 1 ? P.surface : '#fff', whiteSpace: 'nowrap' }}>
                            {(f as readonly (readonly [string, string])[]).map(([t, l]) => <Pill key={l} type={t as 'pos'|'neu'|'neg'}>{l}</Pill>)}
                          </td>
                          <td style={{ padding: '16px 18px', borderBottom: i < 5 ? `1px solid ${P.border}` : 'none', background: i % 2 === 1 ? P.surface : '#fff' }}>
                            {o.map(x => (
                              <div key={x} style={{ fontFamily: FONT, fontSize: 11, color: P.ink2, marginBottom: 5, display: 'flex', alignItems: 'flex-start', gap: 5, lineHeight: 1.4 }}>
                                <span style={{ color: P.accent, flexShrink: 0 }}>→</span>{x}
                              </div>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <Divider />

              {/* 05 HMW */}
              <div style={{ padding: '64px 48px', background: P.surface2 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 48, gap: 40 }}>
                  <div><Eyebrow>05 — How Might We</Eyebrow><SecTitle>Reframing problems<br />as opportunities.</SecTitle></div>
                  <p style={{ fontFamily: FONT, fontSize: 13, color: P.ink3, maxWidth: 360, lineHeight: 1.65, marginTop: 8, flexShrink: 0 }}>Using the HMW framework to unlock design directions for each persona&apos;s most critical challenges.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                  {[
                    { p: 'Maria — Local Business Owner', items: [['Remove the bad','Help small businesses advertise without fearing wasted spend?'],['Change the status quo','Make booking a billboard as simple as boosting a social media post?'],['Question an assumption','Let small businesses try billboard advertising without long-term commitment or large upfront costs?']] },
                    { p: 'Arjun — Startup Founder', items: [['Change the status quo','Allow startups to test billboard campaigns as easily as running A/B tests online?'],['Amp up the good','Turn offline billboard data into actionable growth insights for founders?'],['Remove the bad','Eliminate long approval cycles that slow down startup marketing experiments?']] },
                    { p: 'Sarah — National Marketing Manager', items: [['Break into pieces','Centralize planning, booking, and reporting for multi-city billboard campaigns?'],['Change the status quo','Make OOH planning as measurable and optimizable as digital media?'],['Identify unexpected resources','Use real-time performance signals to optimize placements mid-campaign?']] },
                    { p: 'Daniel — Global Brand Director', items: [['Change the status quo','Manage global billboard campaigns from a single unified platform?'],['Remove the bad','Reduce compliance risks across different countries and advertising regulations?'],['Create an analogy','Make global OOH management feel like one dashboard — not 20 local ones?']] },
                  ].map(({ p, items }) => (
                    <div key={p} style={{ border: `1px solid ${P.border}`, borderRadius: 20, padding: 26, background: '#fff' }}>
                      <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: P.ink3, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                        {p}<span style={{ flex: 1, height: 1, background: P.border, display: 'inline-block' }} />
                      </div>
                      {items.map(([strong, text]) => (
                        <div key={strong} style={{ padding: '11px 0', borderBottom: `1px solid ${P.border}` }}>
                          <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: P.accent, marginBottom: 3 }}>{strong}</div>
                          <div style={{ fontFamily: FONT, fontSize: 13, color: P.ink2, lineHeight: 1.5 }}>{text}</div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <Divider />

              {/* 06 HYPOTHESIS */}
              <div style={{ padding: '64px 48px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 48, gap: 40 }}>
                  <div><Eyebrow>06 — Problem Statements & Hypotheses</Eyebrow><SecTitle>If we solve this,<br />here&apos;s what changes.</SecTitle></div>
                  <p style={{ fontFamily: FONT, fontSize: 13, color: P.ink3, maxWidth: 360, lineHeight: 1.65, marginTop: 8, flexShrink: 0 }}>Grounding each persona&apos;s problem in a testable hypothesis that drives design decisions.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                  {[
                    { dot: P.accent, name: 'Maria — Local Business Owner', ifthen: "If Maria is guided through a step-by-step booking flow with clear pricing and visual previews, then she will feel confident enough to complete her first billboard booking.", believe: "Simplifying the booking process and removing pricing ambiguity will increase billboard adoption among local small businesses." },
                    { dot: P.green,  name: 'Arjun — Startup Founder', ifthen: "If Arjun can compare billboard locations, pricing, and estimated reach in one place, then he will make faster and more confident campaign decisions.", believe: "Providing comparison tools and basic performance metrics will help startup founders scale billboard advertising more effectively." },
                    { dot: P.blue,   name: 'Sarah — National Marketing Manager', ifthen: "If Sarah can book, edit, and report on multiple billboards from one dashboard, then she can execute national campaigns more efficiently and accurately.", believe: "Bulk booking, approvals, and standardized reporting will reduce operational overhead for national marketing teams." },
                    { dot: P.yellow, name: 'Daniel — Global Marketing Director', ifthen: "If Daniel can manage global campaigns with localized pricing, compliance guidance, and time-zone-aware scheduling, then he can launch international campaigns faster and with less risk.", believe: "Centralizing global billboard operations will improve speed, consistency, and confidence for international brands." },
                  ].map(({ dot, name, ifthen, believe }) => (
                    <div key={name} style={{ border: `1px solid ${P.border}`, borderRadius: 20, padding: 26, background: '#fff', display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: P.ink3, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: dot, display: 'inline-block', flexShrink: 0 }} />{name}
                      </div>
                      <div style={{ padding: 13, borderRadius: 6, background: P.blueLt }}>
                        <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: P.blue, marginBottom: 5 }}>If / Then</div>
                        <p style={{ fontFamily: FONT, fontSize: 12, lineHeight: 1.6, color: P.ink2, margin: 0 }}>{ifthen}</p>
                      </div>
                      <div style={{ padding: 13, borderRadius: 6, background: P.accentLt }}>
                        <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: P.accent, marginBottom: 5 }}>We believe</div>
                        <p style={{ fontFamily: FONT, fontSize: 12, lineHeight: 1.6, color: P.ink2, margin: 0 }}>{believe}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Divider />

              {/* 07 VALUE PROPOSITION */}
              <div style={{ padding: '64px 48px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 48, gap: 40 }}>
                  <div><Eyebrow>07 — Value Proposition</Eyebrow><SecTitle>Features become benefits<br />when designed with intent.</SecTitle></div>
                  <p style={{ fontFamily: FONT, fontSize: 13, color: P.ink3, maxWidth: 360, lineHeight: 1.65, marginTop: 8, flexShrink: 0 }}>Every feature exists to close a specific gap between what users fear and what they need to feel confident.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
                  <div style={{ background: P.ink, color: '#fff', borderRadius: 20, padding: 32, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', bottom: -20, right: 20, fontFamily: FONT, fontSize: 140, fontWeight: 700, color: 'rgba(255,255,255,0.05)', lineHeight: 1, pointerEvents: 'none' }}>"</div>
                    <p style={{ fontFamily: FONT, fontSize: 22, fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.5px', position: 'relative', margin: 0 }}>
                      A single, transparent platform that lets <span style={{ color: P.accent }}>any</span> business discover, book, and manage billboard advertising worldwide — without vendors, guesswork, or hidden costs.
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                      { icon: '🗺️', bg: P.accentLt, t: 'Discovery replaces guesswork', d: 'Map-based search with real photos, traffic data, and audience demographics — users understand billboard value before spending anything.' },
                      { icon: '💰', bg: P.greenLt,   t: 'Pricing is never a surprise', d: 'Transparent cost breakdowns, price locks, and comparison tools mean users feel financially safe — even on small budgets.' },
                      { icon: '✅', bg: P.blueLt,    t: 'Creative confidence before go-live', d: 'Templates, real-time validation, and billboard mockup previews eliminate rejection anxiety and spec confusion.' },
                      { icon: '📊', bg: P.yellowLt,  t: 'Proof turns payment into trust', d: 'Verified vendors, go-live notifications, and proof-of-display photos give users accountability through the full campaign lifecycle.' },
                    ].map(({ icon, bg, t, d }) => (
                      <div key={t} style={{ border: `1px solid ${P.border}`, borderRadius: 12, padding: 18, background: '#fff', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 14, alignItems: 'start' }}>
                        <div style={{ width: 38, height: 38, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>{icon}</div>
                        <div>
                          <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, marginBottom: 3, color: P.ink }}>{t}</div>
                          <div style={{ fontFamily: FONT, fontSize: 12, color: P.ink3, lineHeight: 1.55 }}>{d}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 08 FEATURE ARCHITECTURE */}
              <div style={{ background: P.ink, padding: '64px 48px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 48, gap: 40 }}>
                  <div>
                    <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: P.accent, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                      <span style={{ width: 20, height: 1, background: P.accent, display: 'inline-block' }} />08 — Feature Architecture
                    </div>
                    <SecTitle white>Everything the platform<br />needs to deliver.</SecTitle>
                  </div>
                  <p style={{ fontFamily: FONT, fontSize: 13, color: 'rgba(255,255,255,0.35)', maxWidth: 360, lineHeight: 1.65, marginTop: 8, flexShrink: 0 }}>Grouped by the user value they unlock — not by technical category.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'rgba(255,255,255,0.08)', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                  {[
                    { icon: '🗺️', bg: P.accentLt, t: 'Discovery', items: ['Map-based billboard discovery','Location & city search','Filters: price, traffic, type, size','Real billboard photos + street view','Audience & traffic indicators','Save to wishlist','Side-by-side comparison'] },
                    { icon: '💳', bg: '#e3f2ef',   t: 'Pricing & Payments', items: ['Upfront, transparent pricing','Itemised cost breakdown','Price lock timer','Multi-currency support','Secure checkout','Invoices, receipts & tax docs','Refund & cancellation policies'] },
                    { icon: '📅', bg: P.blueLt,    t: 'Booking & Scheduling', items: ['Step-by-step booking wizard','Availability calendar (real-time)','Flexible durations (1 week–custom)','Time-zone-aware scheduling','Auto-saved drafts','Confirmation + go-live alerts'] },
                    { icon: '🎨', bg: P.yellowLt,  t: 'Creative Management', items: ['Creative upload with validation','Billboard mockup live preview','Free design templates','Version control','Brand asset library','Format & resolution checker'] },
                    { icon: '📊', bg: '#fdecea',   t: 'Analytics & Reports', items: ['Estimated impressions & reach','Campaign delivery progress','Proof-of-display photos','Post-campaign summaries','Downloadable reports (PDF/CSV)','Historical campaign archive'] },
                    { icon: '🏢', bg: '#f0e8ff',   t: 'Enterprise & Teams', items: ['Role-based access control','Approval workflows','Bulk booking & editing','Audit logs','Multi-user collaboration','Conflict detection'] },
                    { icon: '🌍', bg: '#e8f5e9',   t: 'Global & Compliance', items: ['Multi-language UI','Local ad regulation guidance','Tax & compliance notes','Country-specific formatting','Currency normalization'] },
                    { icon: '🛡️', bg: P.accentLt, t: 'Trust & Support', items: ['Verified vendor badges','Live chat & ticket support','Help center & onboarding','FAQs & guided tooltips','Auto-save & offline resilience'] },
                  ].map(({ icon, bg, t, items }) => (
                    <div key={t} style={{ background: P.ink, padding: '22px 18px' }}>
                      <div style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 7 }}>
                        <span style={{ width: 26, height: 26, borderRadius: 7, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>{icon}</span>{t}
                      </div>
                      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {items.map(item => (
                          <li key={item} style={{ fontFamily: FONT, fontSize: 11, color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'flex-start', gap: 6, lineHeight: 1.4 }}>
                            <span style={{ color: P.accent, fontSize: 14, lineHeight: 1, flexShrink: 0 }}>·</span>{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <Divider />

              {/* 09 EDGE CASES */}
              <div style={{ padding: '64px 48px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 48, gap: 40 }}>
                  <div><Eyebrow>09 — Edge Cases & Safeguards</Eyebrow><SecTitle>Designing for<br />when things go wrong.</SecTitle></div>
                  <p style={{ fontFamily: FONT, fontSize: 13, color: P.ink3, maxWidth: 360, lineHeight: 1.65, marginTop: 8, flexShrink: 0 }}>Booking systems fail in predictable ways. Every edge case has a designed response.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
                  {[
                    ['EC — 01','Billboard taken mid-booking','Another advertiser books while user is in checkout flow.','Temporary hold + countdown timer'],
                    ['EC — 02','Price changes after selection','Demand or seasonality updates the price after user selects dates.','Price lock for 10 minutes'],
                    ['EC — 03','Creative fails compliance','Uploaded ad violates local advertising regulations or size specs.','Clear error + guided fix suggestions'],
                    ['EC — 04','Payment succeeds, booking fails','System or vendor error after successful payment.','Auto-refund + confirmation email'],
                    ['EC — 05','Vendor cancels post-confirmation','Billboard owner cancels due to maintenance or regulatory issues.','Alternatives surfaced + platform credits'],
                    ['EC — 06','Time zone scheduling error','Global brand schedules without realizing local time zone difference.','Time-zone-aware preview at scheduling step'],
                    ['EC — 07','Wrong location selected','User misreads map and books a similar nearby billboard by mistake.','Confirmation step with map + 24hr free cancel'],
                    ['EC — 08','Internet lost mid-booking','Local business owner loses connectivity while completing checkout.','Auto-save drafts at every step'],
                    ['EC — 09','Simultaneous team edits','Two users make conflicting changes to the same campaign at once.','Conflict detection + version locking'],
                  ].map(([num, title, desc, fix]) => (
                    <div key={num} style={{ border: `1px solid ${P.border}`, borderRadius: 12, padding: 20, background: '#fff' }}>
                      <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: P.accent, letterSpacing: '0.1em', display: 'block', marginBottom: 9 }}>{num}</span>
                      <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, marginBottom: 6, color: P.ink }}>{title}</div>
                      <div style={{ fontFamily: FONT, fontSize: 11, color: P.ink3, lineHeight: 1.5, marginBottom: 11 }}>{desc}</div>
                      <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, padding: '5px 10px', background: P.greenLt, color: P.green, borderRadius: 4, letterSpacing: '0.03em', display: 'inline-block' }}>{fix}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Divider />

              {/* 10 USER STORIES */}
              <div style={{ padding: '64px 48px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 48, gap: 40 }}>
                  <div><Eyebrow>10 — User Stories</Eyebrow><SecTitle>Designing from<br />real user needs.</SecTitle></div>
                  <p style={{ fontFamily: FONT, fontSize: 13, color: P.ink3, maxWidth: 360, lineHeight: 1.65, marginTop: 8, flexShrink: 0 }}>Eight stories across four personas — each one a design requirement in disguise.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
                  {[
                    ['As a local small business owner','I want to see nearby billboards with traffic and visibility indicators','I can confidently choose a location without feeling overwhelmed or misled.'],
                    ['As a budget-conscious café owner','I want to see clear, upfront pricing before I commit',"I don't fear hidden costs or wasting money."],
                    ['As a startup founder running experiments','I want to book short-term campaigns and adjust or pause them easily','I can test ideas quickly without long-term risk.'],
                    ['As a growth marketer at a startup','I want to compare locations by cost, reach, and audience type','I can allocate my limited budget to the highest-impact options.'],
                    ['As a startup founder','I want to upload and preview my creative on real billboard mockups','I can be confident my brand looks professional in the real world.'],
                    ['As a national brand marketing manager','I want a centralized dashboard to manage bookings, creatives, and approvals across regions','I can maintain brand consistency and reduce operational chaos.'],
                    ['As a marketing manager','I want proof-of-display and campaign timelines for each billboard','I can confidently report execution accuracy to leadership.'],
                    ['As a global marketing director','I want standardized metrics, compliance checks, and currency-normalized pricing across countries','I can scale campaigns globally without legal or financial risk.'],
                  ].map(([as_, want, so]) => (
                    <div key={want} style={{ border: `1px solid ${P.border}`, borderRadius: 20, padding: 24, background: '#fff' }}>
                      <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', color: P.ink3, marginBottom: 9, textTransform: 'uppercase' }}>{as_}</div>
                      <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, lineHeight: 1.3, color: P.ink, marginBottom: 9, letterSpacing: '-0.2px' }}>{want}</div>
                      <div style={{ fontFamily: FONT, fontSize: 12, color: P.ink3, lineHeight: 1.55, borderTop: `1px solid ${P.border}`, paddingTop: 9 }}>
                        So that <span style={{ color: P.ink2 }}>{so}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>{/* end white process card */}
          </div>{/* end #design-process */}

          {/* ── FOOTER BAR ──────────────────────────────────────────── */}
          <div style={{ background: '#25484e', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px', height: 64, gap: 16 }}>
            <p style={{ fontFamily: FONT, fontSize: 14, color: 'rgba(255,255,255,0.7)', margin: 0 }}>OZo Ads · TinyPixel Studio</p>
            <div style={{ display: 'flex', gap: 16 }}>
              <Link href="/casestudies/playspot" style={{ fontFamily: FONT, fontSize: 14, color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>← PlaySpot</Link>
              <Link href="/portfolio" style={{ fontFamily: FONT, fontSize: 14, color: '#fff', textDecoration: 'none' }}>All Works ↗</Link>
            </div>
          </div>

        </div>{/* end content */}
      </div>

      <style jsx global>{`
        .ozo-reveal { opacity:0; transform:translateY(40px); transition:opacity .6s ease,transform .6s ease; }
        .ozo-reveal.ozo-visible { opacity:1; transform:translateY(0); }
        .ozo-hover-overlay { position:absolute;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .25s ease;border-radius:inherit; }
        div:hover > .ozo-hover-overlay { opacity:1; }
        .ozo-hover-btn { display:inline-flex;align-items:center;padding:10px 20px;border-radius:999px;background:rgba(255,255,255,.08);border:1.5px solid rgba(255,255,255,.15);backdrop-filter:blur(4px);color:#fff;font-family:'Josefin Sans',sans-serif;font-weight:700;font-size:.875rem;letter-spacing:.02em;cursor:pointer;transition:background .2s; }
        .ozo-hover-btn:hover { background:rgba(255,255,255,.15); }
        @media(max-width:768px){
          div[style*="gridTemplateColumns"]{grid-template-columns:1fr!important;}
          div[style*="display: flex"][style*="gap: 24"]{flex-direction:column!important;}
        }
      `}</style>

      <Footer />
    </>
  )
}
