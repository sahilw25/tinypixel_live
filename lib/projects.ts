export interface Project {
  id: number
  title: string
  category: string
  year: string
  description: string
  color: string
  accent: string
  slug: string
  type: 'case-study' | 'portfolio'
  tag: string
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'PlaySpot',
    category: 'UX / UI Design',
    year: '2024',
    description: 'A sports facility booking app designed to streamline the experience of discovering and reserving sports venues.',
    color: '#1A1A2E',
    accent: '#FF6B35',
    slug: 'playspot',
    type: 'case-study',
    tag: 'Case Study',
  },
  {
    id: 2,
    title: 'Time Slot Selector',
    category: 'Product Design',
    year: '2024',
    description: 'An intuitive scheduling component that simplifies time slot selection for booking and appointment systems.',
    color: '#0D1B2A',
    accent: '#37C1DB',
    slug: 'timeslot',
    type: 'case-study',
    tag: 'Case Study',
  },
  {
    id: 3,
    title: 'TinyPixel Studio Site',
    category: 'Web Design',
    year: '2024',
    description: 'Full redesign and development of TinyPixel\'s studio website — brand identity, landing pages, and service presentation.',
    color: '#2A1A2E',
    accent: '#FF5886',
    slug: '',
    type: 'portfolio',
    tag: 'Web Design',
  },
  {
    id: 4,
    title: 'Enterprise Dashboard',
    category: 'Product & Enterprise Design',
    year: '2024',
    description: 'A complex data-dense enterprise dashboard for monitoring KPIs, operations, and analytics across teams.',
    color: '#1A2E1A',
    accent: '#32C274',
    slug: '',
    type: 'portfolio',
    tag: 'Enterprise UX',
  },
]

export const CASE_STUDIES = PROJECTS.filter(p => p.type === 'case-study')
export const PORTFOLIO_ITEMS = PROJECTS
