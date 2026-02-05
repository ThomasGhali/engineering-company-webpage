import { Message } from '@/features/messages/types';

export const messages: Message[] = [
  {
    firstName: 'Thomas',
    lastName: 'Ghali',
    email: 'thomasghali@gmail.com',
    country: 'Egypt',
    phone: '+20 123 456 7890',
    id: '1',
    createdAt: new Date('2026-01-31T02:14:32'),
    replied: false,
    message:
      'Hello, I am writing to report a suspicious job offer I received via email. The recruiter claimed to be from a reputable firm but asked for my bank details upfront for "onboarding". I believe this is a recruitment scam and wanted to notify you.',
    about: 'Suspected recruitment fraud',
  },
  {
    firstName: 'Sarah',
    lastName: 'Jenkins',
    email: 's.jenkins@londonbuild.co.uk',
    country: 'United Kingdom',
    phone: '+44 20 7946 0958',
    id: '2',
    createdAt: new Date('2026-02-01T12:14:04'),
    replied: false,
    message:
      'Dear team, we are currently planning a new commercial development in Central London and are looking for a reliable structural engineering firm for a long-term consultation. Would you be available for a preliminary call next Tuesday afternoon?',
    about: 'Project Consultation Request',
  },
  {
    firstName: 'Marcus',
    lastName: 'Chen',
    email: 'm.chen.eng@globalsys.sg',
    country: 'Singapore',
    phone: '+65 6789 0123',
    id: '3',
    createdAt: new Date('2026-02-12T21:24:08'),
    replied: false,
    message:
      'I am writing to express my strong interest in the Senior Civil Engineer position advertised on your careers page. Attached to this inquiry is my updated portfolio and CV. I have over 12 years of experience managing large-scale infrastructure projects in Southeast Asia.',
    about: 'Senior Civil Engineer Application',
  },
  {
    firstName: 'Elena',
    lastName: 'Rodriguez',
    email: 'elena.rodriguez@tecnica-esp.es',
    country: 'Spain',
    id: '4',
    createdAt: new Date('2026-04-20T04:27:41'),
    replied: false,
    phone: null,
    message:
      'Hola, our company specializes in sustainable high-grade composites for bridge construction. We have seen your recent projects and believe our materials could significantly reduce your carbon footprint while maintaining structural integrity. Can we schedule a brief demo?',
    about: 'Material Supply Partnership',
  },
  {
    firstName: 'David',
    lastName: 'Miller',
    email: 'dmiller@pacific-surveys.com',
    country: 'United States',
    id: '5',
    phone: null,
    createdAt: new Date('2026-05-04T09:50:27'),
    replied: false,
    message:
      'I am requesting a formal quote for a comprehensive geotechnical site survey for a residential development in Portland, Oregon. We have the topographical maps ready. Could you please let me know your current lead times and required documentation?',
    about: 'Geotechnical Survey Quote',
  },
];
