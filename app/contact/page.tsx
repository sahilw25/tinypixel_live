'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import emailjs from '@emailjs/browser'

// ─── EmailJS config (same credentials as ContactPopup) ────────────
const EMAILJS_SERVICE_ID  = 'service_32k1ngf'
const EMAILJS_TEMPLATE_ID = 'template_pjnheyd'
const EMAILJS_PUBLIC_KEY  = 'GWgrSlvYxmgBFf-6L'
// ─────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', services: '', details: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          services:   form.services,
          message:    form.details || '(no details provided)',
          to_email:   'sahil@tinypixel.in',
        },
        EMAILJS_PUBLIC_KEY
      )
      setStatus('sent')
      setForm({ name: '', email: '', services: '', details: '' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <>
      <Navbar />
      <section className="contact-section">
        <div className="contact-wrapper">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>sahil@tinypixel.in</p>
            <p>+919403094516</p>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            <input type="email" placeholder="Email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            <input type="text" placeholder="Services" required value={form.services} onChange={e => setForm({...form, services: e.target.value})} />
            <textarea placeholder="Project Details (optional)" rows={5} value={form.details} onChange={e => setForm({...form, details: e.target.value})} />
            <button type="submit" className="contact-submit" disabled={status === 'sending'}>
              {status === 'idle'    && 'Submit'}
              {status === 'sending' && 'Sending…'}
              {status === 'sent'    && '✓ Message Sent!'}
              {status === 'error'   && '✗ Failed — try again'}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  )
}
