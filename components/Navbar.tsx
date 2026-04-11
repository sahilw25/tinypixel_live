'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScroll(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="progress-bar" style={{ width: `${scroll}%` }} />

      <nav className="navbar">
        <div style={{ display: 'flex', alignItems: 'center', padding: '0.75rem 2rem', position: 'relative' }}>
          {/* Logo */}
          <Link href="/" className="logo" style={{ textDecoration: 'none' }}>
            <svg width="30" height="50" viewBox="0 0 1236 1920" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M297.313 1343.28C459.537 1343.28 591.045 1472.39 591.045 1631.64C591.045 1790.9 459.537 1920 297.313 1920C135.09 1920 3.58203 1790.9 3.58203 1631.64C3.5822 1472.39 135.09 1343.28 297.313 1343.28ZM297.313 1444.21C191.868 1444.21 106.388 1528.13 106.388 1631.64C106.388 1735.16 191.868 1819.08 297.313 1819.08C402.759 1819.08 488.238 1735.16 488.238 1631.64C488.238 1528.13 402.758 1444.21 297.313 1444.21ZM1184.41 0C1212.8 0.000406294 1235.82 23.0186 1235.82 51.4131V958.567L1235.82 960.476C1234.79 1122.61 1103.03 1253.73 940.657 1253.73H717.683L717.018 1253.73C689.15 1253.37 666.626 1230.85 666.273 1202.98L666.269 1202.32V51.4141L666.273 50.749C666.629 22.6604 689.51 0 717.683 0H1184.41ZM297.313 677.015C459.537 677.015 591.045 806.117 591.045 965.373C591.045 1124.63 459.537 1253.73 297.313 1253.73C135.09 1253.73 3.58227 1124.63 3.58203 965.373C3.58203 806.117 135.09 677.015 297.313 677.015ZM297.313 777.939C191.868 777.939 106.388 861.857 106.388 965.373C106.388 1068.89 191.868 1152.81 297.313 1152.81C402.758 1152.81 488.238 1068.89 488.238 965.373C488.238 861.857 402.759 777.94 297.313 777.939ZM809.553 1110.45H940.657C1024.54 1110.45 1092.54 1042.45 1092.54 958.567V143.283H809.553V1110.45ZM288.358 0C447.614 0.000134407 576.717 131.508 576.717 293.731C576.717 455.955 447.614 587.463 288.358 587.463C129.103 587.463 4.85871e-05 455.955 0 293.731C0 131.508 129.103 0 288.358 0ZM288.358 102.806C184.842 102.806 100.926 188.286 100.926 293.731C100.926 399.177 184.842 484.656 288.358 484.656C391.875 484.656 475.791 399.176 475.791 293.731C475.791 188.286 391.875 102.806 288.358 102.806Z" fill="#333" />
            </svg>
          </Link>

          {/* Desktop Nav Links */}
          <div className="nav-links" style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <ul style={{ listStyle: 'none', display: 'flex', gap: '2rem', margin: 0, padding: 0 }}>
              <li><Link href="/" className="nav-link-item">Home</Link></li>
              <li><Link href="/portfolio" className="nav-link-item">Portfolio</Link></li>
              <li><Link href="/casestudies" className="nav-link-item">Case Studies</Link></li>
            </ul>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: 'auto' }} className="nav-links">
            <Link href="/contact" className="c-btn desktop-contact">
              Contact
            </Link>
            <Link href="/personal-portfolio" target="_blank" rel="noopener noreferrer" className="portfolio-nav-btn desktop-contact">
              My Portfolio ↗
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="hamburger"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ marginLeft: 'auto' }}
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/portfolio" onClick={() => setMenuOpen(false)}>Portfolio</Link>
          <Link href="/casestudies" onClick={() => setMenuOpen(false)}>Case Studies</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link href="/personal-portfolio" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}
            style={{ background: '#1A1A2E', color: '#fff', borderRadius: '999px', padding: '0.5rem 1.2rem', fontWeight: 700, width: 'fit-content' }}>
            My Portfolio ↗
          </Link>
        </div>
      </nav>
    </>
  )
}
