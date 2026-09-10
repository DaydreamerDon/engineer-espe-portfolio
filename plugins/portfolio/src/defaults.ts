import type { PortfolioData } from './types'

export const PORTFOLIO_SEED_VERSION = 1

export const portfolioDefaults: PortfolioData = {
  identity: {
    availability: 'OPEN TO OPPORTUNITIES',
    email: 'ESPERIDIONSAQUINGALACIO@GMAIL.COM',
    fullName: 'ESPERIDION SAQUIN',
    location: 'PASIG CITY, PHILIPPINES',
    monogram: 'ES',
    profession: 'CIVIL ENGINEER  /  QAQC SPECIALIST',
    resumeLabel: 'DOWNLOAD CV ↗',
  },
  hero: {
    currentProject: {
      category: 'CURRENT PROJECT  /  GENERAL CONSTRUCTION',
      period: 'Jul 2025—Present',
      role: 'QAQC Engineer',
      title: 'Ayala Land Premier Project',
    },
    description:
      'Results-oriented Civil Engineer with a proven track record of optimizing project quality outcomes. Skilled in strategic project management and team leadership. Seeking a challenging executive role to leverage technical expertise and drive engineering excellence.',
    eyebrow: 'CIVIL ENGINEER  /  QAQC SPECIALIST',
    headline: 'QUALITY BUILT\nINTO EVERY DETAIL.',
    primaryActionLabel: 'VIEW SELECTED WORK  →',
    secondaryActionLabel: 'GET IN TOUCH',
  },
  projects: {
    additional: {
      category: 'MDC QUALITY SYSTEM  /  ACTIVE',
      code: 'QMS',
      description:
        'Implements MDC policies, processes, procedures, guidelines, and bulletins; monitors the Project Quality Management Plan and recommends improvements. Coordinates Civil, Structural, Architectural, and MEPFS disciplines.',
      title: 'Quality Management\n& Coordination',
    },
    featured: {
      category: 'GENERAL CONSTRUCTION  /  AYALA LAND PREMIER',
      description:
        'Managing end-to-end inspections and final subcontractor handover across under-construction, façade, and fit-out scopes. Coordinates IPL/FCO requirements before CRG inspection and ensures complete Procore reports.',
      period: 'CURRENT ROLE  ·  JUL 2025—PRESENT',
      tags: [{ label: 'QAQC' }, { label: 'PROCORE' }, { label: 'CRG INSPECTION' }],
      title: 'ALP Project\nQuality Delivery',
    },
    heading: 'Quality delivery in active construction.',
  },
  experience: {
    entries: [
      {
        company: 'Makati Development Corporation  ·  General Construction',
        dateRange: 'JUL 2025 —\nPRESENT',
        kind: 'role',
        summary:
          'Currently assigned to an Ayala Land Premier project, supporting end-to-end quality inspection and subcontractor handover.',
        title: 'QAQC Engineer',
      },
      {
        company: 'SSI Metal Incorporation  ·  Façade & Fit-out Subcontractor',
        dateRange: 'AUG 2023 —\nSEP 2024',
        kind: 'role',
        summary: 'Handled three projects across façade, fit-out, and MEPFS scopes.',
        title: 'QAQC Engineer',
      },
      {
        company: 'Eastern Visayas State University  ·  Graduated 2023',
        dateRange: '2023',
        kind: 'education',
        title: 'Bachelor of Science in Civil Engineering',
      },
    ],
    heading: 'On site. On spec.\nAlways accountable.',
  },
  capabilities: {
    exposure: 'General Construction  ·  Façade\nFit-out  ·  Civil  ·  MEPFS',
    items: [
      {
        description: 'Systems, plans, inspections',
        icon: 'clipboard-check',
        title: 'Quality Management',
      },
      {
        description: 'Field teams and packages',
        icon: 'hard-hat',
        title: 'Site Coordination',
      },
      {
        description: 'Procore and MS Office',
        icon: 'file-chart-column',
        title: 'Technical Reporting',
      },
      {
        description: 'AutoCAD · Revit learning',
        icon: 'drafting-compass',
        title: 'Digital Delivery',
      },
    ],
    tools: [
      { label: 'PROCORE' },
      { label: 'AUTOCAD' },
      { label: 'MS EXCEL' },
      { label: 'REVIT · LEARNING' },
      { label: 'INSPECTION' },
      { label: 'REPORTING' },
    ],
  },
  training: {
    groups: [
      {
        count: '05',
        eyebrow: 'PROCORE LEARNING',
        icon: 'blocks',
        items: [
          { label: 'BIM Manager' },
          { label: 'Project Manager · Core Tools' },
          { label: 'Engineer' },
          { label: 'Project Manager · Preconstruction' },
          { label: 'Project Manager · Quality & Safety' },
        ],
        style: 'navy',
        title: 'Procore Certifications',
      },
      {
        eyebrow: 'BIM & PRODUCTIVITY',
        icon: 'drafting-compass',
        items: [
          { label: 'Autodesk Revit Suite · Architectural & Structural BIM Modeling' },
          { label: 'MS Excel, Word & PowerPoint' },
          { label: 'AutoCAD 2D' },
          { label: 'Revit 2026 · Structural & Architectural' },
        ],
        style: 'paper',
        title: 'Digital Tools',
      },
      {
        eyebrow: 'SAFETY & TRADE',
        icon: 'shield-check',
        items: [
          { label: 'Certified BOSH Safety Officer 1' },
          { label: 'National Certificate Holder · Plumbing NC1' },
          { label: 'Certified COSH Safety Officer 2' },
        ],
        style: 'pale',
        title: 'Credentials',
      },
    ],
    heading: 'Training & certifications',
  },
  contact: {
    eyebrow: '05  /  LET’S BUILD SOMETHING BETTER',
    footerMotto: 'QUALITY  ·  COMPLIANCE  ·  DELIVERY',
    heading: 'Let’s discuss your next project.',
    subheading: 'Based in Pasig City, Philippines  ·  Available for quality and project roles',
  },
  seo: {
    description:
      'Portfolio of Esperidion Saquin, a civil engineer and QAQC specialist focused on quality, compliance, and project delivery.',
    title: 'Esperidion Saquin | Civil Engineer & QAQC Specialist',
  },
}
