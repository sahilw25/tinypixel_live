'use client'
import { useEffect, useRef, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import VisionSection from '@/components/VisionSection'
import ContactPopup from '@/components/ContactPopup'
import { useRouter } from 'next/navigation'

const caseStudies = [
  {
    title: 'Time Slot Selector',
    desc: 'UI redesigned of time and date selector to make selection faster and more intuitive',
    img: '/images/timeselector-poster.png',
    href: '/casestudies/timeslot',
  },
]

export default function CaseStudiesPage() {
  const [popupOpen, setPopupOpen] = useState(false)
  const router = useRouter()
  const cardRefs = caseStudies.map(() => useRef<HTMLDivElement>(null))

  useEffect(() => {
    cardRefs.forEach(ref => {
      if (!ref.current) return
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { e.target.classList.add('show'); obs.unobserve(e.target) }
      }, { threshold: 0.2 })
      obs.observe(ref.current)
    })
  }, [])

  return (
    <>
      <Navbar />
      <section className="welcome">
        <div className="welcome-left">
          <h1 className="brand-name">Tiny Pixel</h1>
          <p className="brand-tagline">Tiny details, Infinite possibilities</p>
          <div className="lottie-wrapper">
            <lottie-player src="https://lottie.host/2bb00282-e36a-4857-975f-a20bc041f6b3/neiY2w5r5P.json"
              background="transparent" speed="1" style={{ width: '200px', height: '200px' }} autoplay />
          </div>
        </div>
        <div className="welcome-right">
          <h2 className="welcome-heading">We craft engaging <br />digital experiences</h2>
          <p className="welcome-subtext">Crafting clean, intuitive interfaces that power the future of tech.</p>
          <a className="open-popup" onClick={() => setPopupOpen(true)} style={{ cursor: 'pointer' }}>Get in Touch</a>
        </div>
      </section>

      <section className="portfolio-section">
        <div className="portfolio-wrapper">
          {caseStudies.map((item, i) => (
            <div key={i} ref={cardRefs[i]} className="portfolio-card">
              <div className="portfolio-image">
                {item.img && <img src={item.img} alt={item.title} />}
              </div>
              <div className="portfolio-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <button className="portfolio-btn" onClick={() => router.push(item.href)}>View</button>
            </div>
          ))}
        </div>
      </section>

      <VisionSection />
      <Footer />
      <ContactPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  )
}
