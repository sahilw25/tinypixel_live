'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactPopup from '@/components/ContactPopup'
import VisionSection from '@/components/VisionSection'


declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lottie-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src?: string; background?: string; speed?: string; autoplay?: boolean; loop?: boolean;
        count?: string;
      }, HTMLElement>
    }
  }
}

const faqs = [
  { q: 'Do you only focus on design, or do you also work on development?', a: 'I enjoy both! While I focus strongly on UX/UI and case study documentation, I also have hands-on experience in web development and QA testing, bridging the gap between design and execution.' },
  { q: 'What kind of projects do we work on?', a: 'UX/UI design, case studies, web development, etc.' },
  { q: 'Which tools and technologies do we use?', a: 'Figma, Framer, HTML, CSS, JavaScript, SQL, etc.' },
  { q: 'How can I contact you?', a: 'Drop an email or a "Hi" on WhatsApp—either one gets a thumbs up! Check the footer for details.' },
]

function FAQSection() {
  const [active, setActive] = useState<number | null>(null)
  return (
    <section className="faq-section">
      <h2 className="faq-heading">FAQ&apos;s</h2>
      <div className="faq-container">
        {faqs.map((item, i) => (
          <div key={i} className={`faq-item${active === i ? ' active' : ''}`}>
            <button className="faq-question" onClick={() => setActive(active === i ? null : i)}>
              {item.q}
            </button>
            <div className="faq-answer"><p>{item.a}</p></div>
          </div>
        ))}
      </div>
    </section>
  )
}

function useIntersection(ref: React.RefObject<HTMLElement | null>, threshold = 0.1) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el) } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, threshold])
  return visible
}

function WorksSection() {
  const works = [
    { title: 'OZo Ads', desc: 'billboard booking platform with integrated analytics.', img: '/images/Ozo_thumnail.png', href: '/casestudies/ozo-ads' },
    { title: 'PlaySpot', desc: 'Book sports turf instantly online.', img: '/images/playspot-poster.png', href: '/casestudies/playspot' },
    { title: 'Time slot selector', desc: 'UI redesigned of time and date selector', img: '/images/timeselector-poster.png', href: '/casestudies/timeslot' },
    
  ]
  const refs = works.map(() => useRef<HTMLDivElement>(null))
  const visible = refs.map(r => useIntersection(r, 0.2))

  return (
    <section className="works-section" style={{ background: 'linear-gradient(to bottom, #EBF3F5, #F5F5F5, #F7F6F2, #FFF9E7)' }}>
      <h2 className="works-heading">Our Works</h2>
      <div className="card-container">
        {works.map((w, i) => (
          <div key={i} ref={refs[i]} className={`work-card${visible[i] ? ' show' : ''}`}>
            <div className="work-image">
              {w.img && <img src={w.img} alt={w.title} />}
            </div>
            <h3 className="work-title">{w.title}</h3>
            <p className="work-desc">{w.desc}</p>
            <button className="work-btn" onClick={() => { if (w.href !== '#') window.location.href = w.href }}>Learn more</button>
          </div>
        ))}
      </div>
      <br />
      <Link href="/portfolio" className="view-all-btn">View All ➝</Link>
    </section>
  )
}

const serviceCards = [
  {
    bg: '#EEF2FF', iconColor: '#4F46E5', href: '/services/web-design',
    title: 'Website & Mobile Design',
    desc: "Let's design fun and engaging apps based on standard design processes validated by research and testing.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" stroke="#4F46E5" strokeWidth="2.2" /><path d="M8 21h8M12 17v4" stroke="#4F46E5" strokeWidth="2.2" strokeLinecap="round" /></svg>,
  },
  {
    bg: '#FFF7ED', iconColor: '#EA580C', href: '/services/product-design',
    title: 'Product & Enterprise Design',
    desc: 'Partner with us to design your products in a consistent, compelling manner across customer touchpoints.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="#EA580C" strokeWidth="2.2" /><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke="#EA580C" strokeWidth="2.2" strokeLinecap="round" /></svg>,
  },
]

function ServiceCards() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  useEffect(() => {
    const el = sectionRef.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el) } }, { threshold: 0.1 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return (
    <section className="services-section">
      <h2 className="heading">Our Services</h2>
      <p className="services-description">
        We are a creative agency specializing in UX/UI and brand design, blending innovation with attention to detail.
        Driven by a love for design and technology, we transform bold ideas into seamless, visually stunning digital experiences.
      </p>
      <div ref={sectionRef} style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', padding: '0 5%' }}>
        {serviceCards.map((c, i) => (
          <Link key={i} href={c.href} className={`category-card${visible ? ' is-visible' : ''}`}
            data-stagger-index={i}
            style={{ textDecoration: 'none', color: 'inherit', flex: '1 1 300px', maxWidth: '420px', minHeight: '260px', justifyContent: 'space-between' }}>
            <div>
              <div style={{ width: '3rem', height: '3rem', borderRadius: '.75rem', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', color: c.iconColor }}>
                {c.icon}
              </div>
              <h4 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#454545', marginBottom: '.75rem' }}>{c.title}</h4>
              <p style={{ fontSize: '1rem', color: '#969696', lineHeight: 1.6 }}>{c.desc}</p>
            </div>
            <div
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '.5rem',
                margin: '1.5rem auto 0',
                border: `1px solid ${c.iconColor}`,
                fontSize: '.875rem',
                fontWeight: 700,
                color: c.iconColor,
                padding: '12px 44px',      // Added some padding for the background to show
                borderRadius: '6px',      // Rounded corners for the hover effect
                width: 'fit-content',     // Keeps the background hug the text
                transition: 'background 0.3s ease', // Smooth transition
                // This creates the 20% opacity effect on hover:
                backgroundColor: hoveredIndex === i ? `${c.iconColor}33` : 'transparent'
              }}
            >
              Learn more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor" // 'currentColor' inherits the color from the parent div (c.iconColor)
                strokeWidth="2.5"      // Slightly thicker stroke to match the font weight
              >
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
            {/* <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginTop: '1.5rem', fontSize: '.875rem', fontWeight: 700, color: c.iconColor }}>
              Learn more
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </div> */}
          </Link>
        ))}
      </div>
    </section>
  )
}

const whatWeDoCards = [
  {
    bg: '#EEF2FF', iconColor: '#4F39F6', href: '/services/web-design',
    title: 'UI Design',
    desc: 'Creating visually engaging, intuitive, and accessible user interfaces for web and mobile platforms.',
    icon: <svg width="23" height="23" viewBox="0 0 23 23" fill="none"><path d="M12.3326 4.76173L5.69701 6.08885C5.32634 6.16298 5.141 6.20005 4.99006 6.29019C4.85664 6.36988 4.74315 6.47897 4.65827 6.60915C4.56225 6.7564 4.51791 6.94014 4.42921 7.3076L1.09998 21.1001M1.09998 21.1001L14.8925 17.7709C15.2599 17.6822 15.4437 17.6379 15.5909 17.5419C15.7211 17.4569 15.8303 17.3435 15.9099 17.21C16.0001 17.0591 16.0371 16.8738 16.1113 16.5031L17.4384 9.86743M1.09998 21.1001L8.84641 13.3536M20.3676 6.66988L15.5302 1.83242C15.1259 1.42803 14.9236 1.22583 14.6905 1.15008C14.4854 1.08344 14.2644 1.08344 14.0594 1.15008C13.8263 1.22583 13.624 1.42803 13.2196 1.83242L12.4668 2.58528C12.0624 2.98967 11.8601 3.19186 11.7845 3.42502C11.7178 3.63012 11.7178 3.85103 11.7845 4.05613C11.8601 4.28928 12.0624 4.49148 12.4668 4.89587L17.3042 9.73335C17.7086 10.1377 17.9108 10.3399 18.144 10.4157C18.349 10.4823 18.57 10.4823 18.775 10.4157C19.0082 10.3399 19.2105 10.1377 19.6148 9.73335L20.3676 8.98046C20.772 8.57608 20.9743 8.37389 21.05 8.14074C21.1166 7.93564 21.1166 7.71472 21.05 7.50962C20.9743 7.27647 20.772 7.07428 20.3676 6.66988ZM10.2903 9.86743C11.4183 9.86743 12.3326 10.7819 12.3326 11.9097C12.3326 13.0377 11.4183 13.952 10.2903 13.952C9.16239 13.952 8.24802 13.0377 8.24802 11.9097C8.24802 10.7819 9.16239 9.86743 10.2903 9.86743Z" stroke="#4F39F6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
  {
    bg: '#FFF7ED', iconColor: '#EA580C', href: '/services/product-design',
    title: 'UX Research',
    desc: 'Crafting seamless and thoughtful user experiences through research, wireframes, prototypes, and testing.',
    icon: <svg width="23" height="23" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#EA580C" strokeWidth="2.2" /><path d="M16.5 16.5L21 21" stroke="#EA580C" strokeWidth="2.2" strokeLinecap="round" /><path d="M11 8v6M8 11h6" stroke="#EA580C" strokeWidth="2.2" strokeLinecap="round" /></svg>,
  },
  {
    bg: '#F0FDF4', iconColor: '#16A34A', href: '/services/web-design',
    title: 'Web Design',
    desc: 'Designing responsive and aesthetic websites that combine functionality with beautiful visual form.',
    icon: <svg width="23" height="23" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" stroke="#16A34A" strokeWidth="2.2" /><path d="M8 21h8M12 17v4" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" /></svg>,
  },
  {
    bg: '#FFF1F2', iconColor: '#E11D48', href: '/services/product-design',
    title: 'User Testing',
    desc: 'Gaining insights from real users to guide design decisions, validate concepts and reduce rework.',
    icon: <svg width="23" height="23" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#E11D48" strokeWidth="2.2" strokeLinecap="round" /><circle cx="9" cy="7" r="4" stroke="#E11D48" strokeWidth="2.2" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#E11D48" strokeWidth="2.2" strokeLinecap="round" /></svg>,
  },
  {
    bg: '#EFF6FF', iconColor: '#2563EB', href: '/services/web-design',
    title: 'Wireframing & Prototyping',
    desc: 'Rapid ideation and validation through low- and high-fidelity prototypes that move fast.',
    icon: <svg width="23" height="23" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8" height="8" rx="1" stroke="#2563EB" strokeWidth="2.2" /><rect x="13" y="3" width="8" height="8" rx="1" stroke="#2563EB" strokeWidth="2.2" /><rect x="3" y="13" width="8" height="8" rx="1" stroke="#2563EB" strokeWidth="2.2" /><path d="M13 17h8M17 13v8" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" /></svg>,
  },
]

function WhatWeDo() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = sectionRef.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el) } }, { threshold: 0.1 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return (
    <section className="what-we-do">
      <h2 className="section-title">What We Do Best</h2>
      <div ref={sectionRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', justifyContent: 'center', maxWidth: '1100px', margin: '0 auto', padding: '0 5%' }}>
        {whatWeDoCards.map((c, i) => (
          <Link key={i} href={c.href} className={`category-card${visible ? ' is-visible' : ''}`}
            data-stagger-index={i}
            style={{ textDecoration: 'none', color: 'inherit', flex: '1 1 260px', maxWidth: '320px' }}>
            <div style={{ width: '3rem', height: '3rem', borderRadius: '.75rem', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', color: c.iconColor }}>
              {c.icon}
            </div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#1e293b', marginBottom: '.5rem' }}>{c.title}</h4>
            <p style={{ fontSize: '.9375rem', color: '#64748b', lineHeight: 1.6, flexGrow: 1 }}>{c.desc}</p>
            {/* <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginTop: '1rem', fontSize: '.875rem', fontWeight: 700, color: c.iconColor }}>
              Explore service
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </div> */}
          </Link>
        ))}
      </div>
    </section>
  )
}

export default function HomePage() {
  const [popupOpen, setPopupOpen] = useState(false)

  return (
    <>
      <Navbar />

      {/* Welcome Hero */}
      <section className="welcome">
        <div className="welcome-left">
          <h1 className="brand-name">Tiny Pixel</h1>
          <p className="brand-tagline">Tiny details, Infinite possibilities</p>
          <div className="lottie-wrapper">
            <lottie-player
              src="https://lottie.host/2bb00282-e36a-4857-975f-a20bc041f6b3/neiY2w5r5P.json"
              background="transparent"
              speed="1"
              style={{ width: '200px', height: '200px' }}
              autoplay
            />
          </div>
        </div>
        <div className="welcome-right">
          <h2 className="welcome-heading">
            We craft engaging <br />
            digital experiences
          </h2>
          <p className="welcome-subtext">
            Crafting clean, intuitive interfaces that power the future of tech.
          </p>
          <a className="open-popup" onClick={() => setPopupOpen(true)} style={{ cursor: 'pointer' }}>
            Get in Touch
          </a>
        </div>
      </section>

      <WhatWeDo />
      <WorksSection />
      <ServiceCards />
      <VisionSection />
      <FAQSection />
      <Footer />

      <ContactPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  )
}
