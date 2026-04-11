import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import VisionSection from '@/components/VisionSection'
import Link from 'next/link'

const approaches = [
  { icon: '📋', title: 'Preparation', desc: 'Set up clear communication, define roles, and align goals to ensure smooth teamwork and top-quality UX design.' },
  { icon: '🔍', title: 'Research and Discovery', desc: 'Explore user needs, market trends, and business goals to build a strong base for product design and strategy.' },
  { icon: '🖌️', title: 'UX and UI Design', desc: 'Use an iterative, user-first approach to craft simple, attractive, and effective interfaces.' },
  { icon: '🧪', title: 'Prototyping and Usability Testing', desc: 'Build interactive prototypes and run usability tests to spot and fix issues, leveraging our product design expertise.' },
]

const works = [
  { title: 'PlaySpot', desc: 'Book sports turf instantly online.', img: '/images/playspot-poster.png', href: '/casestudies/playspot' },
  { title: 'Time slot selector', desc: 'UI redesigned of time and date selector', img: '/images/timeselector-poster.png', href: '/casestudies/timeslot' },
  { title: 'PlaySpot', desc: 'Book sports turf instantly online.', img: '', href: '#' },
  { title: 'PlaySpot', desc: 'Book sports turf instantly online.', img: '', href: '#' },
  { title: 'PlaySpot', desc: 'Book sports turf instantly online.', img: '', href: '#' },
]

export default function ProductDesignPage() {
  return (
    <>
      <Navbar />
      <section className="web-design-intro">
        <p className="tagline">Services</p>
        <h2 className="main-heading">Product Design Services</h2>
        <p className="description">
          Boost your business with a product-first design approach that enhances UX, increases conversions,
          and drives customer loyalty. From new launches to platform revamps, our UI/UX and product design
          expertise delivers real impact.
        </p>
        <Link href="/contact"><button className="cta-button">Kickstart Your Project</button></Link>
      </section>

      <section className="approach-section">
        <div className="approach-header">
          <h2>Our Approach to Product &amp; UX/UI Design</h2>
          <p>Our approach begins with ideation, ensuring that your enterprise achieves its full potential.</p>
        </div>
        <div className="approach-cards">
          {approaches.map((a, i) => (
            <div key={i} className="approach-card">
              <div style={{ fontSize: '40px', marginBottom: '8px' }}>{a.icon}</div>
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
            </div>
          ))}
        </div>
        <div className="approach-footer">
          <h2>User-Centric UX/UI Design for Impactful Digital Experiences</h2>
          <p>
            We collaborate closely with your team to build from the ground up—researching, testing,
            and refining ideas into powerful solutions. By focusing on user needs and behaviors,
            we create dynamic web and mobile experiences that drive conversions, boost retention,
            and elevate enterprise performance.
          </p>
        </div>
      </section>

      <section className="works-section" style={{ background: 'linear-gradient(to bottom, #EBF3F5, #F5F5F5, #F7F6F2, #FFF9E7)' }}>
        <h2 className="works-heading">Our Works</h2>
        <div className="card-container">
          {works.map((w, i) => (
            <div key={i} className="work-card show">
              <div className="work-image">{w.img && <img src={w.img} alt={w.title} />}</div>
              <h3 className="work-title">{w.title}</h3>
              <p className="work-desc">{w.desc}</p>
              {w.href !== '#' ? (
                <Link href={w.href}>
                  <button className="work-btn">Learn more</button>
                </Link>
              ) : (
                <button className="work-btn" disabled>Coming Soon</button>
              )}
            </div>
          ))}
        </div>
        <br />
        <Link href="/portfolio" className="view-all-btn">View All ➝</Link>
      </section>

      <VisionSection />
      <Footer />
    </>
  )
}
