'use client'
import { useState } from 'react'
import emailjs from '@emailjs/browser'

// ─── EmailJS config ───────────────────────────────────────────────
// Replace these three values with your real EmailJS credentials.
// 1. Go to https://www.emailjs.com  → sign up free
// 2. "Email Services" → Add Service (Gmail works) → copy Service ID
// 3. "Email Templates" → Create Template (use vars below) → copy Template ID
// 4. "Account" → API Keys → copy Public Key
const EMAILJS_SERVICE_ID  = 'service_32k1ngf'   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'template_pjnheyd'  // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY  = 'GWgrSlvYxmgBFf-6L'   // e.g. 'AbCdEfGhIjKlMnOp'
// Template variables to map in EmailJS dashboard:
//   {{from_name}}  {{from_email}}  {{services}}  {{message}}
// ─────────────────────────────────────────────────────────────────

interface ContactPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactPopup({ isOpen, onClose }: ContactPopupProps) {
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
      setTimeout(() => {
        setStatus('idle')
        onClose()
        setForm({ name: '', email: '', services: '', details: '' })
      }, 2000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <div className={`popup-overlay${isOpen ? ' active' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="popup">
        <div className="info">
          <h2>Get in Touch</h2>
          <p>sahil@tinypixel.in</p>
          <p>+919403094516</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <input type="email" placeholder="Email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          <input type="text" placeholder="Services" required value={form.services} onChange={e => setForm({...form, services: e.target.value})} />
          <textarea rows={5} placeholder="Project Details (optional)" value={form.details} onChange={e => setForm({...form, details: e.target.value})} />
          <button type="submit" className="submit-btn" disabled={status === 'sending'}>
            {status === 'idle'    && 'Submit'}
            {status === 'sending' && 'Sending…'}
            {status === 'sent'    && '✓ Sent!'}
            {status === 'error'   && '✗ Failed — try again'}
          </button>
        </form>
        <span onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '24px', cursor: 'pointer', color: '#454545' }}>×</span>
      </div>
    </div>
  )
}
