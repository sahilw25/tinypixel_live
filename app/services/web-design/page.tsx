import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import VisionSection from '@/components/VisionSection'
import Link from 'next/link'

const approaches = [
  { icon: '🔬', title: 'User Research', desc: "We study your audience's needs, preferences, and pain points to guide the design process." },
  { icon: '🗺️', title: 'Strategy Development', desc: 'We build wireframes and prototypes to map user flows and interactions, allowing early feedback and agile updates.' },
  { icon: '🔄', title: 'Iterative Design', desc: 'We refine designs through continuous feedback from users and stakeholders at every stage.' },
  { icon: '🎨', title: 'Visual Design', desc: 'We crafts sleek, brand-aligned UI designs that are both eye-catching and functional.' },
]

const works = [
  { title: 'PlaySpot', desc: 'Book sports turf instantly online.', img: '/images/playspot-poster.png', href: '/casestudies/playspot' },
  { title: 'Time slot selector', desc: 'UI redesigned of time and date selector', img: '/images/timeselector-poster.png', href: '/casestudies/timeslot' },
  { title: 'PlaySpot', desc: 'Book sports turf instantly online.', img: '', href: '#' },
  { title: 'PlaySpot', desc: 'Book sports turf instantly online.', img: '', href: '#' },
  { title: 'PlaySpot', desc: 'Book sports turf instantly online.', img: '', href: '#' },
]

export default function WebDesignPage() {
  return (
    <>
      <Navbar />
      <section className="web-design-intro">
        <p className="tagline">Services</p>
        <h2 className="main-heading">Web &amp; Mobile application design services</h2>
        <p className="description">
          Enhance your digital presence with our expert web and mobile app design services.
          We deliver SEO-friendly, high-performance solutions tailored for all platforms.
        </p>
        <Link href="/contact"><button className="cta-button">Kickstart Your Project</button></Link>
      </section>

      <section className="approach-section">
        <div className="approach-header">
          <h2>Our Successful Method for Web and Mobile App Solutions</h2>
          <p>
            We use a user-focused approach to provide top-tier web and mobile app design services.
            By understanding your audience, we create designs that connect with users and align with
            your business objectives. Here&apos;s our process:
          </p>
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
