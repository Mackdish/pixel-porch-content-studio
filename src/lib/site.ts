export const SITE = {
  name: "Clisanco Technologies Limited",
  short: "Clisanco",
  tagline: "Africa's Digital Transformation Partner",
  phone: "+254 791 491636",
  phoneHref: "tel:+254791491636",
  whatsapp: "https://wa.me/254791491636",
  email: "info@clisancotechnologies.org",
  location: "Kisumu, Kenya",
  socials: {
    instagram: "https://instagram.com/clisancotechnologies",
    linkedin: "https://linkedin.com/company/clisanco-technologies-limited",
    tiktok: "https://tiktok.com/@clisancotechnologies",
  },
};

export const STATS = [
  { value: "100+", label: "Projects Delivered" },
  { value: "20+", label: "Organizations Served" },
  { value: "95%", label: "Client Satisfaction" },
];

export const PROCESS = [
  { title: "Discovery", text: "A free 30-minute call to understand your goals, users and site." },
  { title: "Assessment", text: "An on-site walk-through to map rooms, routes and existing equipment." },
  { title: "Proposal", text: "A written proposal and bill of quantities within 3 working days." },
  { title: "Delivery", text: "Installation by certified engineers, with weekly progress notes." },
  { title: "Handover", text: "Full documentation and a sign-off checklist you walk through with us." },
  { title: "Support", text: "An optional SLA plan to keep your network healthy long-term." },
];

export const TESTIMONIALS = [
  { quote: "Professional, innovative and highly reliable.", name: "Recruit on Demand", role: "Client" },
  {
    quote:
      "Clisanco Technologies consistently delivered high-quality digital solutions and provided valuable technical guidance throughout our engagement.",
    name: "Shayma Shefan",
    role: "Director, Lighthouse English College",
  },
  {
    quote: "Their commitment to quality, responsiveness, and innovation made them a reliable technology partner.",
    name: "Lighthouse English College",
    role: "Client",
  },
];

export const FAQS = [
  {
    q: "How long does a typical LAN installation take?",
    a: "It depends on the size of the site. A small office of 10–30 points is often done in a few days, while multi-floor buildings or campuses can take several weeks. Your proposal includes a clear timeline before any work starts.",
  },
  {
    q: "How does pricing work?",
    a: "After a site assessment we send a written proposal with an itemised bill of quantities: cabling, hardware, labour and testing. You see exactly what you're paying for, with no hidden extras.",
  },
  {
    q: "What cable standards do you use?",
    a: "We install Cat6 and Cat6A copper and single-mode or multi-mode fibre backbones, following recognised structured-cabling practices for routing, termination and labelling. Every run is tested before handover.",
  },
  {
    q: "Do you supply the network hardware?",
    a: "Yes. We can supply switches, routers, firewalls, access points, racks and UPS units from established vendors, or work with equipment you already own.",
  },
  {
    q: "What warranty and support do you offer?",
    a: "Workmanship is covered after handover, and manufacturer warranties apply to supplied hardware. For ongoing peace of mind, we offer optional SLA-backed maintenance plans.",
  },
  {
    q: "Do you work outside Kisumu?",
    a: "Yes. We're based in Kisumu and take on projects across Kenya. Get in touch with your location and we'll confirm availability.",
  },
  {
    q: "Can you upgrade an existing network?",
    a: "Absolutely. We audit what's in place, keep what still performs, and replace or re-cable only where it's needed, often in phases to avoid downtime.",
  },
  {
    q: "What documentation do I receive?",
    a: "You receive as-built drawings, a labelling schedule, cable test results, device configuration notes and a signed handover checklist. No black boxes.",
  },
];

export const PROJECTS = [
  { title: "Networking Installations", tag: "Lead project", text: "Structured cabling, switching and Wi-Fi rollout for a multi-floor client site.", img: "exterior" },
  { title: "School campus Wi-Fi", tag: "Education", text: "High-density wireless coverage across classrooms and halls.", img: "wifi" },
  { title: "Office server room", tag: "Business", text: "Rack build, cable management and UPS for a growing office.", img: "engineer" },
  { title: "Clinic network upgrade", tag: "Healthcare", text: "Secure, segmented network for a healthcare facility.", img: "design" },
] as const;

// [Placeholder] Blog posts — replace with real articles.
export const POSTS = [
  { title: "Cat6 vs Cat6A: which does your office need?", excerpt: "A plain-language guide to choosing cabling that fits your budget and future plans.", tag: "Cabling", date: "Coming soon" },
  { title: "How to plan Wi-Fi for a school campus", excerpt: "Coverage, capacity and access-point placement for classrooms, halls and offices.", tag: "Wi-Fi", date: "Coming soon" },
  { title: "5 signs your office network needs an upgrade", excerpt: "Slow transfers, dropped calls and tangled racks are telling you something.", tag: "Planning", date: "Coming soon" },
];
