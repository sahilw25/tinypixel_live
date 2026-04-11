'use client'
import { useEffect, useRef, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

/* ─────────── PPT Slides data ─────────── */
const slidesData = [
  { layout:'center', text:' ', img:'Hi_there.png' },
  { layout:'center', text:'So I was designing a web app for booking sports venues something simple and intuitive. Just pick a time, reserve, play. Pretty standard use case, right? But when I got to the date and time selector…it wasn\'t as smooth as I hoped..', img:'PPt_slide2.png' },
  { layout:'right',  text:'Most booking flows follow the same old pattern: First, pick a day from a calendar. Then scroll through a list of time slots 6--7, 7--8, 8--9… on and on. Technically it works. But it\'s messy. Cluttered, Overwhelming. Especially when all you want is a quick window to play.', img:'PPT_slide3.png' },
  { layout:'left',   text:'I knew there had to be a better way. So I started looking for inspiration--outside the usual booking platforms. That\'s when I came across Airbnb\'s vacation duration selector.', img:'PPT_slide4.png' },
  { layout:'right',  text:"If you've seen it, you know what I mean. It's like a circular clock face. You drag a knob, and it creates a smooth arc showing your stay length. And in the center? Just one clean line: '4 months.' It's functional and feels great to use.", img:'PPT_slide5.png' },
  { layout:'left',   text:'That design really stuck with me. It wasn\'t just functional, it felt good to use. Visually clear. Tactile. Simple.', img:'PPT_slide6.png' },
  { layout:'right',  text:'And I thought: Why can\'t booking a sports venue feel like that?', img:'PPT_slide7.png' },
  { layout:'left',   text:'I reimagined the slot selector into a simple two-step flow. First, you pick a date--kept clean and focused on just the current week. Then, you choose a time, neatly organized into Morning, Evening, or Night sessions. Each session opens into a circular time selector with color coding.', img:'PPT_slide8.png' },
  { layout:'right',  text:'The result is a booking flow that feels visual, uncluttered, and effortless--helping players choose their time without the overwhelm of scrolling through endless lists.', text2:'Arriving at this solution wasn\'t immediate--it evolved through multiple iterations and discarded concepts. Check out the design process below.', img:'PPT_slide9.png' },
]

function PPTDeck() {
  const [index, setIndex] = useState(0)
  const go = (n: number) => setIndex((n + slidesData.length) % slidesData.length)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if(e.key==='ArrowRight') go(index+1); if(e.key==='ArrowLeft') go(index-1) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [index])
  const s = slidesData[index]
  return (
    <div style={{ position:'relative', width:'85%', margin:'0 auto 60px', background:'#fff', borderRadius:'20px', boxShadow:'0 8px 30px rgba(0,0,0,0.1)', overflow:'hidden', minHeight:'60vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:'3rem 2rem' }}>
      {/* Slide content */}
      <div style={{ display:'flex', flexDirection: s.layout==='center' ? 'column' : (s.layout==='right' ? 'row-reverse' : 'row'), alignItems:'center', justifyContent:'center', gap:'2rem', width:'100%', maxWidth:'800px', textAlign: s.layout==='center' ? 'center' : 'left', flexWrap:'wrap' }}>
        <img src={`/images/${s.img}`} alt="" style={{ maxWidth:'260px', maxHeight:'260px', objectFit:'contain', borderRadius:'12px' }} />
        <div style={{ maxWidth:'420px' }}>
          {s.text && s.text.trim() && <p style={{ fontSize:'1.05rem', lineHeight:1.7, color:'#222' }} dangerouslySetInnerHTML={{ __html: s.text }} />}
          {s.text2 && <p style={{ fontSize:'1.05rem', lineHeight:1.7, color:'#555', marginTop:'1rem' }}>{s.text2}</p>}
        </div>
      </div>

      {/* Nav buttons */}
      <button onClick={() => go(index-1)} style={{ position:'absolute', left:'16px', bottom:'20px', background:'rgba(0,0,0,0.07)', border:'none', padding:'10px 14px', borderRadius:'8px', cursor:'pointer', fontSize:'14px', fontFamily:'inherit' }}>⟵ Prev</button>
      <button onClick={() => go(index+1)} style={{ position:'absolute', right:'16px', bottom:'20px', background:'rgba(0,0,0,0.07)', border:'none', padding:'10px 14px', borderRadius:'8px', cursor:'pointer', fontSize:'14px', fontFamily:'inherit' }}>Next ⟶</button>

      {/* Timeline dots */}
      <div style={{ display:'flex', gap:'6px', position:'absolute', bottom:'14px', left:'50%', transform:'translateX(-50%)' }}>
        {slidesData.map((_,i) => (
          <button key={i} onClick={() => go(i)} style={{ width:'12px', height:'12px', borderRadius:'50%', border:'none', cursor:'pointer', background: i===index ? '#111' : '#ccc' }} />
        ))}
      </div>
    </div>
  )
}

/* ─────────── Interactive Clock ─────────── */
const cx=160, cy=160, R=118
function rad(deg: number){ return deg*Math.PI/180 }
function polar(r: number, aDeg: number): [number,number] { const a=rad(aDeg); return [cx+r*Math.cos(a), cy+r*Math.sin(a)] }
function arcPath(r: number, a0: number, a1: number){ let s=a0,e=a1; if(e<=s) e+=360; const large=(e-s)>180?1:0; const [x0,y0]=polar(r,s),[x1,y1]=polar(r,e); return `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}` }
function angleForHour(h: number){ return (h%12)*30-90 }

const modes: Record<string,{startH:number,endH:number,arcColor:string,selector:string,bg:string}> = {
  morning:{ startH:6,  endH:12, arcColor:'#FFE39B', selector:'#FFB03A', bg:'linear-gradient(135deg,#68B1FF,#68FAFF,#40BCFF)' },
  evening:{ startH:12, endH:18, arcColor:'#4FC3F7', selector:'#FFC73A', bg:'linear-gradient(135deg,#4FC3F7,#80DEEA)' },
  night:  { startH:18, endH:24, arcColor:'#3A48AF', selector:'#7A7BFF', bg:'linear-gradient(135deg,#1a1a5e,#3A48AF)' },
}

function ClockWidget() {
  const [modeName, setModeName] = useState('morning')
  const [selHour, setSelHour] = useState(6)
  const svgRef = useRef<SVGSVGElement>(null)
  const dragging = useRef(false)
  const mode = modes[modeName]

  function getLabels() {
    const items = []
    for(let h=1;h<=12;h++){
      const ang = angleForHour(h)
      const [tx,ty] = polar(R, ang)
      let show = false
      if(modeName==='morning') show = h>=6 && h<=12
      if(modeName==='evening') show = h===12 || (h>=1 && h<=6)
      if(modeName==='night')   show = h>=6 && h<=12
      if(show){
        items.push(<text key={h} x={tx} y={ty+5} textAnchor="middle" fontSize="13" fontWeight="700"
          fill={modeName==='night' ? '#F2F5FF' : '#333'}>{h}</text>)
      } else {
        items.push(<circle key={h} cx={tx} cy={ty} r="2.5" fill={modeName==='night' ? '#8899cc' : '#aaa'} />)
      }
    }
    return items
  }

  function clientToHour(e: React.MouseEvent | React.TouchEvent) {
    if(!svgRef.current) return selHour
    const rect = svgRef.current.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    const scaleX = 320 / rect.width
    const scaleY = 320 / rect.height
    const dx = (clientX - rect.left) * scaleX - cx
    const dy = (clientY - rect.top)  * scaleY - cy
    let a = Math.atan2(dy, dx) * 180 / Math.PI
    let h = Math.round((a + 90) / 30)
    h = ((h % 12) + 12) % 12; h = h===0 ? 12 : h
    const from = mode.startH, to = mode.endH
    const valid: number[] = []
    for(let t=from;t<to;t++) valid.push(((t-1)%12)+1)
    const nearest = valid.reduce((best,v) => { const d=Math.min(Math.abs(v-h), 12-Math.abs(v-h)); return d<best.d?{h:v,d}:best }, {h:valid[0],d:99}).h
    for(let t=from;t<to;t++) if((((t-1)%12)+1)===nearest) return t
    return from
  }

  const rangeStart = angleForHour(mode.startH)
  const rangeEnd   = (() => { let e = angleForHour(mode.endH); if(e<=rangeStart) e+=360; return e })()
  const selStart = angleForHour(selHour)

  const from12 = ((selHour-1)%12)+1
  const to12   = (selHour%12)+1 || 1
  const timeLabel = `${from12}-${to12}`

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'16px', padding:'40px 0' }}>
      {/* Mode tabs */}
      <div style={{ display:'flex', gap:'12px' }}>
        {Object.keys(modes).map(m => (
          <button key={m} onClick={() => { setModeName(m); setSelHour(modes[m].startH) }}
            style={{ padding:'10px 20px', borderRadius:'14px', border:'none', cursor:'pointer', fontWeight:700, fontFamily:'inherit', fontSize:'15px',
              background: m===modeName ? (m==='morning'?'#FFEEC2':m==='evening'?'#3daad9':'#354ab5') : '#eee',
              color: m===modeName && m!=='morning' ? '#fff' : '#222' }}>
            {m.charAt(0).toUpperCase()+m.slice(1)}
          </button>
        ))}
      </div>

      {/* SVG Clock */}
      <svg ref={svgRef} viewBox="0 0 320 320" style={{ width:'280px', height:'280px', cursor:'grab', userSelect:'none' }}
        onMouseDown={() => { dragging.current=true }}
        onMouseMove={e => { if(dragging.current){ const h=clientToHour(e); if(h>=mode.startH&&h<mode.endH) setSelHour(h) } }}
        onMouseUp={() => { dragging.current=false }}
        onTouchStart={() => { dragging.current=true }}
        onTouchMove={e => { if(dragging.current){ const h=clientToHour(e); if(h>=mode.startH&&h<mode.endH) setSelHour(h) } }}
        onTouchEnd={() => { dragging.current=false }}>
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#68B1FF"/>
            <stop offset="55%" stopColor="#68FAFF"/>
            <stop offset="100%" stopColor="#40BCFF"/>
          </linearGradient>
          <mask id="hole">
            <rect x="0" y="0" width="320" height="320" fill="white"/>
            <circle cx="160" cy="160" r="94" fill="black"/>
          </mask>
        </defs>
        {/* Background donut */}
        <g mask="url(#hole)">
          <circle cx="160" cy="160" r="118" fill="none" stroke="url(#bgGrad)" strokeWidth="40"/>
        </g>
        {/* Range arc */}
        <path d={arcPath(R, rangeStart, rangeEnd)} fill="none" stroke={mode.arcColor} strokeWidth="40" strokeLinecap="round"/>
        {/* Selector pill */}
        <path d={arcPath(R, selStart, selStart+30)} fill="none" stroke={mode.selector} strokeWidth="35" strokeLinecap="round"/>
        {/* Labels */}
        <g>{getLabels()}</g>
        {/* Center text */}
        <text x="160" y="148" textAnchor="middle" fontSize="15" fill={modeName==='night'?'#eee':'#333'}>
          Jul <tspan fontWeight="800">17</tspan> Thu
        </text>
        <text x="160" y="180" textAnchor="middle" fontSize="26" fontWeight="800" fill={modeName==='night'?'#fff':'#111'}>{timeLabel}</text>
        <text x="160" y="120" textAnchor="middle" fontSize="22">⚽</text>
      </svg>
    </div>
  )
}

/* ─────────── Main page ─────────── */
export default function TimeSlotCaseStudy() {
  const [showClock, setShowClock] = useState(false)

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.animate-slide')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.12 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [showClock])

  return (
    <>
      <Navbar />

      {/* Top Header */}
      <div style={{ width:'100%', background:'linear-gradient(135deg,#B3F9FF,#FFF7C2)', borderBottomLeftRadius:'40px', borderBottomRightRadius:'40px', padding:'60px 8%', boxSizing:'border-box' }}>
        <p style={{ fontSize:'14px', color:'#333', margin:'0 0 10px' }}>Case Study</p>
        <h2 style={{ fontSize:'clamp(22px,3vw,34px)', fontWeight:600, color:'#222', lineHeight:1.4, margin:0 }}>
          <span style={{ background:'#FFD84D', borderRadius:'50%', padding:'4px 10px', marginRight:'6px' }}>A</span>
          New Spin on Booking: The Circular Time Slot Selector
        </h2>
      </div>

      {/* Hero image area */}
      <div style={{ position:'relative', width:'100%', display:'flex', justifyContent:'center', alignItems:'center', minHeight:'320px', margin:'40px 0', overflow:'hidden' }}>
        {[{w:500,h:500,op:0.12},{w:350,h:350,op:0.1},{w:220,h:220,op:0.09}].map((c,i) => (
          <div key={i} style={{ position:'absolute', width:c.w, height:c.h, borderRadius:'50%', background:`rgba(0,180,255,${c.op})`, top:'50%', left:'50%', transform:'translate(-50%,-50%)' }} />
        ))}
        <img src="/images/Group 4.png" alt="Time Slot Selector" style={{ width:'100%', maxWidth:'700px', height:'auto', position:'relative', zIndex:1 }} />
      </div>

      {/* Try it button */}
      {!showClock && (
        <div style={{ textAlign:'center', margin:'20px 0 60px' }}>
          <button onClick={() => setShowClock(true)}
            style={{ padding:'16px 56px', fontSize:'18px', fontWeight:600, color:'#fff', border:'none', borderRadius:'40px', cursor:'pointer', background:'linear-gradient(90deg,#005cff,#00ff99)', boxShadow:'0 0 25px rgba(0,150,255,0.5)', fontFamily:'inherit', animation:'tryPulse 2s infinite' }}>
            TRY IT ◉
          </button>
          <style>{`@keyframes tryPulse{0%,100%{transform:scale(1);box-shadow:0 0 20px rgba(0,150,255,0.5)}50%{transform:scale(1.07);box-shadow:0 0 35px rgba(0,255,180,0.6)}}`}</style>
        </div>
      )}

      {/* Interactive clock */}
      {showClock && (
        <div style={{ maxWidth:'600px', margin:'0 auto 60px', background:'#f8faff', borderRadius:'24px', padding:'20px' }}>
          <ClockWidget />
        </div>
      )}

      {/* PPT Deck */}
      <h2 style={{ textAlign:'center', fontSize:'2rem', fontWeight:600, margin:'60px 0 30px' }}>The Story</h2>
      <PPTDeck />

      {/* Design Process */}
      <section style={{ maxWidth:'1000px', margin:'0 auto 80px', padding:'0 5%' }}>
        <h2 className="animate-slide" style={{ fontSize:'1.8rem', fontWeight:600, marginBottom:'20px' }}>Design Process</h2>
        <p className="animate-slide" style={{ fontSize:'18px', lineHeight:1.6, color:'#444', marginBottom:'40px' }}>
          The design process began with the goal of creating a clock-inspired interface to visually select
          time slots for activities throughout the day. The initial approach presented a 24-hour circular picker
          where users could drag a yellow slider to select their preferred slot.
        </p>

        {/* Concept 1 */}
        <h3 className="animate-slide" style={{ fontSize:'20px', fontWeight:600, margin:'20px 0 10px' }}>1. Initial Concept -- Full 24-Hour Clock</h3>
        <div className="animate-slide" style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:'30px', margin:'20px 0 30px' }}>
          {['Time slot selector.png','Time slot selector-1.png','Time slot selector-2.png'].map(img => (
            <img key={img} src={`/images/${img}`} alt={img} style={{ maxWidth:'220px', borderRadius:'12px', objectFit:'cover' }} />
          ))}
        </div>

        <div style={{ display:'flex', flexWrap:'wrap', gap:'40px', margin:'30px 0 50px' }}>
          {[
            { title:'Strengths', items:['Visually engaging and intuitive (clock metaphor).','Users see the entire day at once, making scheduling feel complete.'] },
            { title:'Challenges', items:['Cluttered Layout: With 24 slots crammed into one circle, readability suffers.','Edge Cases: Selecting slots like 00--01 or 12--13 feels awkward.','Cognitive Load: Too many options at once can overwhelm the user.'] },
          ].map(block => (
            <div key={block.title} className="animate-slide" style={{ flex:'1', minWidth:'260px' }}>
              <h4 style={{ fontSize:'18px', fontWeight:600, marginBottom:'10px' }}>{block.title}</h4>
              <ul style={{ paddingLeft:'20px', fontSize:'16px', lineHeight:1.7, color:'#444' }}>
                {block.items.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>

        {/* Concept 2 */}
        <h3 className="animate-slide" style={{ fontSize:'20px', fontWeight:600, margin:'20px 0 10px' }}>2. Iteration -- Dividing the Day into Segments</h3>
        <div className="animate-slide" style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:'30px', margin:'20px 0 20px' }}>
          {[['Morning.png','Morning'],['Mid-day.png','Mid-day'],['Night.png','Night']].map(([img,cap]) => (
            <div key={img} style={{ textAlign:'center' }}>
              <img src={`/images/${img}`} alt={cap} style={{ maxWidth:'220px', borderRadius:'12px' }} />
              <p style={{ fontSize:'15px', color:'#555', marginTop:'8px' }}>{cap}</p>
            </div>
          ))}
        </div>

        <p className="animate-slide" style={{ fontSize:'18px', lineHeight:1.6, color:'#444', margin:'20px 0 16px' }}>
          To simplify, the day was split into three logical segments:<br/>
          <span style={{ background:'#FFE39B', padding:'0 4px', borderRadius:'4px' }}>Morning (6 AM -- 12 PM) = Yellow</span>{' '}·{' '}
          <span style={{ background:'#4FC3F7', padding:'0 4px', borderRadius:'4px' }}>Mid-day (12 PM -- 6 PM) = Blue</span>{' '}·{' '}
          <span style={{ background:'#3A48AF', color:'#fff', padding:'0 4px', borderRadius:'4px' }}>Night (6 PM -- 12 AM) = Dark Blue</span>
        </p>

        <div style={{ display:'flex', flexWrap:'wrap', gap:'40px', margin:'30px 0 50px' }}>
          {[
            { title:'Interaction', items:['Users first choose a segment button (Morning / Evening / Night).','The clock interface then zooms into that part of the day with color coding.','Users pick their slot by dragging the slider within the focused segment.'] },
            { title:'Benefits', items:['Reduced Clutter: Only 6--8 hours visible at once.','Color Coding: Provides quick mental mapping.','Simpler Selection: Removes confusion around boundary hours.'] },
          ].map(block => (
            <div key={block.title} className="animate-slide" style={{ flex:'1', minWidth:'260px' }}>
              <h4 style={{ fontSize:'18px', fontWeight:600, marginBottom:'10px' }}>{block.title}</h4>
              <ul style={{ paddingLeft:'20px', fontSize:'16px', lineHeight:1.7, color:'#444' }}>
                {block.items.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>

        {/* Refinement */}
        <h3 className="animate-slide" style={{ fontSize:'18px', fontWeight:600, margin:'10px 0 16px' }}>Refinement: Subtle Visual Styling</h3>
        <div className="animate-slide" style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:'30px', margin:'0 0 50px' }}>
          {[['Morning (1).png','Morning'],['Mid-day (1).png','Mid-day'],['Night (1).png','Night']].map(([img,cap]) => (
            <div key={img} style={{ textAlign:'center' }}>
              <img src={`/images/${img}`} alt={cap} style={{ maxWidth:'220px', borderRadius:'12px' }} />
              <p style={{ fontSize:'15px', color:'#555', marginTop:'8px' }}>{cap}</p>
            </div>
          ))}
        </div>
      </section>

      {/* User Testing */}
      <section style={{ maxWidth:'1000px', margin:'0 auto 100px', padding:'0 5%' }}>
        <h2 className="animate-slide" style={{ fontSize:'1.8rem', fontWeight:600, marginBottom:'20px' }}>User Testing & Insights</h2>

        <h3 className="animate-slide" style={{ fontSize:'20px', fontWeight:600, margin:'16px 0 10px' }}>1. Testing Setup</h3>
        <p className="animate-slide" style={{ fontSize:'18px', lineHeight:1.6, color:'#444', marginBottom:'30px' }}>
          Usability testing sessions were conducted with a diverse group of participants to validate the
          circular time selector. Each participant interacted with the prototype across mobile and desktop environments.
        </p>
        <div className="animate-slide" style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:'30px', marginBottom:'40px' }}>
          {['testing-1.png','testing-2.png'].map(img => (
            <img key={img} src={`/images/${img}`} alt={img} style={{ maxWidth:'280px', borderRadius:'12px', objectFit:'cover' }} />
          ))}
        </div>

        <h3 className="animate-slide" style={{ fontSize:'20px', fontWeight:600, margin:'16px 0 10px' }}>2. Key Findings</h3>
        <p className="animate-slide" style={{ fontSize:'18px', lineHeight:1.6, color:'#444', marginBottom:'30px' }}>
          <strong>Positive Feedback:</strong> Users found the chunked morning-evening-night division easier to understand than a 24-hour clock.<br/>
          <strong>Challenges:</strong> Some first-time users needed brief guidance on how to drag the time slider.
        </p>

        <div style={{ display:'flex', flexWrap:'wrap', gap:'40px' }}>
          {[
            { title:'Strengths', items:['Fast learning curve -- most users understood within 1--2 minutes.','Visually engaging, enjoyable interaction.'] },
            { title:'Areas to Improve', items:['Provide clearer onboarding hints for new users.','Add haptic/visual feedback when slots are selected.'] },
          ].map(block => (
            <div key={block.title} className="animate-slide" style={{ flex:'1', minWidth:'260px' }}>
              <h4 style={{ fontSize:'18px', fontWeight:600, marginBottom:'10px' }}>{block.title}</h4>
              <ul style={{ paddingLeft:'20px', fontSize:'16px', lineHeight:1.7, color:'#444' }}>
                {block.items.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
