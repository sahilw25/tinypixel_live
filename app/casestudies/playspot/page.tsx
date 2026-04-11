'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function PlayspotCaseStudy() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.animate-slide')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.12 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section style={{ position:'relative', height:'500px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', overflow:'hidden', background:'#D3DCE1' }}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,#D3DCE1 0%,#D3DCE1 81%,#D9D9D9 100%)', opacity:0.9 }} />
        <img src="/images/Playspot logo.png" alt="PlaySpot Logo" style={{ position:'relative', zIndex:2, maxWidth:'320px', width:'60%' }} />
        <p style={{ position:'relative', zIndex:2, marginTop:'14px', fontSize:'20px', color:'#000' }}>Browse · Book · Play</p>
      </section>

      {/* Project Summary */}
      <section style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'2.5rem', maxWidth:'1100px', margin:'80px auto', padding:'0 5%', flexWrap:'wrap' }}>
        <div>
          <h2 style={{ fontSize:'2.5rem', fontWeight:600, marginBottom:'20px' }}>Project Summary</h2>
          <p style={{ fontSize:'1.2rem', color:'#737373', lineHeight:1.6, maxWidth:'400px' }}>
            Brand Identity & UX-UI design for a Web app that helps people to book venues at ease.
          </p>
        </div>
        <div style={{ fontSize:'1.1rem', color:'#737373' }}>
          {[['Role','UX Designer / Researcher'],['Project Type','Personal project'],['Tools','Figma'],['Duration','125 hrs']].map(([k,v]) => (
            <p key={k} style={{ margin:'14px 0', lineHeight:1.4 }}><strong style={{ color:'#000' }}>{k} : </strong>{v}</p>
          ))}
        </div>
      </section>

      {/* Typography & Colour */}
      <section style={{ padding:'20px 5% 60px' }}>
        <h2 style={{ fontSize:'1.8rem', fontWeight:600, marginBottom:'2rem',textAlign:'center' }}>Typography & Colour</h2>
        <div style={{ display:'flex', gap:'40px', justifyContent:'center', alignItems:'flex-start', flexWrap:'wrap' }}>
          <div className="animate-slide" style={{ background:'#fff', padding:'30px', borderRadius:'16px', boxShadow:'-8px 8px 31px rgba(0,0,0,0.18)', width:'320px', height:'320px', display:'flex', flexDirection:'column', justifyContent:'center', textAlign:'center' }}>
            <h3 style={{ fontWeight:600, fontSize:'22px' }}>Montserrat</h3>
            <div style={{ fontSize:'80px', margin:'10px 0', fontWeight:700 }}>Aa</div>
            <p style={{ fontSize:'16px', color:'#555' }}>SemiBold · Medium · Regular</p>
          </div>
          <div className="animate-slide" style={{ background:'#e8fafa', padding:'30px', borderRadius:'16px', boxShadow:'-8px 8px 31px rgba(0,0,0,0.18)', width:'560px', minHeight:'320px', display:'flex', flexDirection:'column', gap:'10px' }}>
            {[
              [{ bg:'#D9D9D9', label:'#D9D9D9' }],
              [{ bg:'#F5F5F5', label:'#F5F5F5' },{ bg:'#191919', label:'#191919', light:true },{ bg:'#92CAFF', label:'#92CAFF' },{ bg:'#349CFF', label:'#349CFF' }],
              [{ bg:'#DE7921', label:'#DE7921' },{ bg:'#00C306', label:'#00C306' },{ bg:'#E6E6E6', label:'#E6E6E6' },{ bg:'#8D8D8D', label:'#8D8D8D' },{ bg:'#A6CEE5', label:'#A6CEE5' }],
              [{ bg:'linear-gradient(to right,#FFE5B4,#FFF9C4)', label:'#FFE5B4→#FFF9C4' },{ bg:'linear-gradient(to right,#4FC3F7,#80DEEA)', label:'#4FC3F7→#80DEEA' },{ bg:'linear-gradient(to right,#3F51B5,#1A237E)', label:'#3F51B5→#1A237E', light:true }],
              [{ bg:'#FFE500', label:'#FFE500' },{ bg:'#787AFF', label:'#787AFF' }],
            ].map((row,ri) => (
              <div key={ri} style={{ display:'flex', gap:'10px', height:[60,50,45,40,40][ri]+'px' }}>
                {row.map((c,ci) => (
                  <div key={ci} style={{ flex:1, borderRadius:'8px', background:c.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:500, color:c.light ? '#fff' : '#000' }}>{c.label}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Icons */}
      <section style={{ padding:'40px 5% 60px 5%' }}>
        <h2 style={{ fontSize:'1.8rem', fontWeight:600, marginBottom:'1.5rem',textAlign:'center' }}>Icons</h2>
        <div className="animate-slide" style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'30px', maxWidth:'500px', justifyContent:'center', alignItems:'flex-start', flexWrap:'wrap', textAlign:'center',margin: '0 auto' }}>
          {['Football','badminton','basketball','mdi_cricket','mdi_tennis','mdi_squash','volleyball','chess','billiards','carbon_cafe','toilet-paper','location-filled','giftcard','credit-card','cash-on-delivery'].map(n => (
            <img key={n} src={`/images/${n}.png`} alt={n} style={{ width:'48px', height:'48px', objectFit:'contain' }} />
          ))}
        </div>
      </section>

      {/* UI Screens heading */}
      <h2 style={{ fontSize:'2rem', fontWeight:600, textAlign:'center', margin:'60px 0 50px', color:'#000' }}>UI Screens</h2>

      {/* Landing Screen */}
      <div style={{ maxWidth:'1000px', margin:'0 auto 100px', padding:'0 5%' }}>
        <div className="animate-slide" style={{ display:'flex', alignItems:'flex-start', justifyContent:'center', gap:'40px', flexWrap:'wrap' }}>
          <img src="/images/Landinging screen.png" alt="Landing Screen" style={{ maxWidth:'260px', borderRadius:'12px', boxShadow:'0 6px 16px rgba(0,0,0,0.15)' }} />
          <div style={{ maxWidth:'480px' }}>
            <h3 style={{ fontSize:'24px', fontWeight:600, marginBottom:'12px' }}>Landing Screen</h3>
            <p style={{ fontSize:'18px', lineHeight:1.6, color:'#444' }}>The landing screen displays categories of sports venues, filters, recently booked venues, recommended venues, and nearby venues based on the user&apos;s location. Users can allow location access or enter it manually to get personalized results.</p>
          </div>
        </div>
      </div>
      <div style={{ width:'2px', height:'60px', background:'#ccc', margin:'0 auto 60px' }} />

      {/* Details Page */}
      <div style={{ maxWidth:'1000px', margin:'0 auto 100px', padding:'0 5%' }}>
        <div className="animate-slide" style={{ display:'flex', alignItems:'flex-start', justifyContent:'center', gap:'40px', flexWrap:'wrap' }}>
          <div style={{ position:'relative', minWidth:'260px' }}>
            <img src="/images/Details page (2).png" alt="Details Main" style={{ maxWidth:'260px', borderRadius:'12px', boxShadow:'0 6px 16px rgba(0,0,0,0.15)', position:'relative', zIndex:2 }} />
            <img src="/images/Details on phone.png" alt="Details BG" style={{ position:'absolute', top:'30px', left:'-180px', width:'80%', zIndex:1, borderRadius:'12px' }} />
          </div>
          <div style={{ maxWidth:'480px' }}>
            <h3 style={{ fontSize:'24px', fontWeight:600, marginBottom:'12px' }}>Details Page</h3>
            <p style={{ fontSize:'18px', lineHeight:1.6, color:'#444' }}>The details page provides key information at a glance, including venue images, ratings, reviews, availability status, and price per hour.</p>
            <div style={{ marginTop:'24px' }}>
              {["The map shows the venue's location, with options to get directions or call the venue directly.","This section highlights the sports available at the venue, helping users quickly see if it matches their interests.","This section shows the facilities available at the venue, helping users understand what amenities they can expect."].map((note,i) => (
                <p key={i} style={{ fontSize:'15px', borderLeft:'2px dotted #333', paddingLeft:'12px', margin:'12px 0', color:'#333' }}>{note}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ width:'2px', height:'60px', background:'#ccc', margin:'0 auto 60px' }} />

      {/* Booking Page */}
      <div style={{ maxWidth:'1000px', margin:'0 auto 100px', padding:'0 5%' }}>
        <div className="animate-slide" style={{ display:'flex', justifyContent:'center', gap:'20px', flexWrap:'wrap' }}>
          {['SS evening.png','Slot selector morning.png','SS night.png'].map((img,i) => (
            <img key={img} src={`/images/${img}`} alt={img} style={{ width:'200px', borderRadius:'12px', transform:i===1?'scale(1.1)':undefined, zIndex:i===1?2:1, position:'relative' }} />
          ))}
        </div>
        <div className="animate-slide" style={{ textAlign:'center', maxWidth:'560px', margin:'50px auto 0' }}>
          <h3 style={{ fontSize:'24px', fontWeight:600, marginBottom:'12px' }}>Booking Page</h3>
          <p style={{ fontSize:'18px', lineHeight:1.6, color:'#444', marginBottom:'28px' }}>The booking page lets users select their preferred sport at the chosen venue, pick a date, choose from available time slots, and confirm their booking. I redesigned the date and time slot selector to make booking simpler and more intuitive.</p>
          <Link href="/casestudies/timeslot" style={{ background:'#ff9100', color:'#fff', padding:'0.9rem 1.8rem', borderRadius:'999px', fontSize:'1rem', textDecoration:'none', display:'inline-block', fontFamily:'inherit' }}>
            Explore the full case study
          </Link>
        </div>
      </div>
      <div style={{ width:'2px', height:'60px', background:'#ccc', margin:'0 auto 60px' }} />

      {/* Billing */}
      <div style={{ maxWidth:'1000px', margin:'0 auto 120px', padding:'0 5%' }}>
        <div className="animate-slide" style={{ display:'flex', justifyContent:'center', gap:'20px', marginBottom:'40px', flexWrap:'wrap' }}>
          {['billing.png','payment.png','Booking confirmation 1.png'].map(img => (
            <img key={img} src={`/images/${img}`} alt={img} style={{ width:'220px', borderRadius:'10px', boxShadow:'0 4px 10px rgba(0,0,0,0.15)' }} />
          ))}
        </div>
        <div className="animate-slide" style={{ textAlign:'center', maxWidth:'560px', margin:'0 auto' }}>
          <h3 style={{ fontSize:'24px', fontWeight:600, marginBottom:'12px' }}>Billing, Payment & Confirmation</h3>
          <p style={{ fontSize:'18px', lineHeight:1.6, color:'#444' }}>Users can review their booking details, select a payment method, and confirm the booking. Once payment is completed, a big confirmation tick with a unique code is displayed, ensuring the slot is successfully booked and ready for check-in.</p>
        </div>
      </div>

      <Footer />
    </>
  )
}
