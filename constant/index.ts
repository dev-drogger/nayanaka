export const SERVICES = [
  {
    title: "Web Development",
    description:
      "Our development team builds robust, scalable, and performant websites with astonishing 3D animation.",
    services: [
      "Landing Page",
      "E-commerce",
      "E-learning",
      "Custom Web Application",
      "And many more...",
    ],
  },
  {
    title: "Digital Invitation (Coming Soon)",
    description:
      "We develop comprehensive strategies that align with your business goals and drive results.",
    services: [
      "Event Invitation",
      "Wedding Invitation",
      "Birthday Invitation",
      "And many more...",
    ],
  },
  {
    title: "Visual Storytelling (Coming Soon)",
    description:
      "From concept to launch, we manage the entire production process to ensure quality and efficiency for all your visual needs.",
    services: [
      "Product, Wedding, Event Photography",
      "Product, Wedding, Event Video",
      "Company Profile",
      "Design",
      "And many more...",
    ],
  },
  {
    title: "Social Media (Coming Soon)",
    description:
      "We create visually stunning social media content that elevate your brand and engage your audience.",
    services: [
      "Content Creation",
      "Social Media Management",
      "Analytics and Monitoring",
      "Social Media Automation",
      "And many more...",
    ],
  },
];

export const PRICING_TIERS = [
  {
    id: "basic",
    name: "Basic",
    price: {
      "1 years": 699000,
      "2 years": 1099000,
    },
    description: "For your small businesses",
    features: [
      "1 Page",
      "Free domain, hosting, and e-mail",
      "SEO",
      "Integration with your social media",
    ],
    cta: "Get started",
  },
  {
    id: "general",
    name: "General",
    price: {
      "1 years": 1699000,
      "2 years": 2299000,
    },
    description: "Great for medium businesses",
    features: [
      "5 pages",
      "Everything in basic package",
      "No template, your site is unique",
      "Request your own features",
    ],
    cta: "Get started",
    popular: true,
  },
  {
    id: "industry",
    name: "Industry",
    price: {
      "1 years": 3999000,
      "2 years": 5599000,
    },
    description: "Great for large businesses",
    features: [
      "Maximum 12 pages",
      "Everything in general package",
      "Admin panel",
      "Digital Marketing friendly",
    ],
    cta: "Get started",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: {
      "1 years": "Custom",
      "2 years": "Custom",
    },
    description: "For complex web application",
    features: [
      "Everything in One",
      "Fully control your site",
      "Enterprise level architecture",
      "15 status pages",
    ],
    cta: "Contact Us",
    highlighted: true,
  },
];

export const INVITATION_PRICING_TIERS = [
  {
    id: "regular",
    name: "Regular",
    price: {
      "1 years": 159000,
      "2 years": 1099000,
    },
    description: "For your small businesses",
    features: [
      "Unlimited Invitations",
      "Free ",
      "SEO",
      "Integration with your social media",
    ],
    cta: "Get started",
  },
  {
    id: "premium",
    name: "Premium",
    price: {
      "1 years": 1699000,
      "2 years": 2299000,
    },
    description: "Great for medium businesses",
    features: [
      "5 pages",
      "Everything in basic package",
      "No template, your site is unique",
      "Request your own features",
    ],
    cta: "Get started",
    popular: true,
  },
  {
    id: "custom",
    name: "Custom",
    price: {
      "1 years": 699000,
      "2 years": 5599000,
    },
    description: "Great for large businesses",
    features: [
      "Maximum 12 pages",
      "Angpao",
      "Create as you want",
      "Free domain couples-name.com",
    ],
    cta: "Get started",
  },
  {
    id: "3d-invitation",
    name: "3D Invitation",
    price: {
      "1 years": "1199000",
      "2 years": "Custom",
    },
    description: "For complex web application",
    features: [
      "Everything in One",
      "Fully control your site",
      "Enterprise level architecture",
      "15 status pages",
    ],
    cta: "Contact Us",
    highlighted: true,
  },
];

export const IMAGE_URLS = [
  "/pictures/DSC00128.webp",
  "/pictures/DSC09892.webp",
  "/pictures/img6.webp",
  "/pictures/img3.webp",
  "/pictures/img5.webp",
  "/pictures/IMG_0918.webp",
  "/pictures/IMG_1402.webp",
  "/pictures/IMG_1849.webp",
  "/pictures/DSC00212.webp",
  "/pictures/IMG_5501.webp",
  "/pictures/IMG_1867.webp",
  "/pictures/IMG_1868.webp",
  "/pictures/IMG_5299.webp",
  "/pictures/DSC09949.webp",
];

// Desktop layout configuration (scale ratios and position multipliers)
export const DESKTOP_CONFIG = [
  { scaleX: 1 / 3, scaleY: 1 / 3, posX: -1 / 6, posY: -27 },
  { scaleX: 1 / 6.5, scaleY: 1 / 3, posX: 1 / 30, posY: -1, offsetY: -27 },
  { scaleX: 1 / 3, scaleY: 1 / 5, posX: -1 / 4, posY: -1, offsetY: -27 },
  { scaleX: 1 / 5, scaleY: 1 / 5, posX: 1 / 4, posY: -1.2, offsetY: -27 },
  { scaleX: 1 / 5, scaleY: 1 / 5, posX: 1 / 10, posY: -1.75, offsetY: -27 },
  { scaleX: 1 / 3, scaleY: 1 / 3, posX: -1 / 4, posY: -2, offsetY: -27 },
  { scaleX: 1 / 3, scaleY: 1 / 5, posX: -1 / 4, posY: -2.6, offsetY: -27 },
  { scaleX: 1 / 2, scaleY: 1 / 2, posX: 1 / 4.5, posY: -3.1, offsetY: -27 },
  { scaleX: 1 / 2.5, scaleY: 1 / 2, posX: -1 / 6, posY: -4.1, offsetY: -27 },
  { scaleX: 1 / 3, scaleY: 1 / 3, posX: -1 / 6, posY: -4.9, offsetY: -27 },
  { scaleX: 1 / 3, scaleY: 1 / 4, posX: 1 / 3.5, posY: -5.1, offsetY: -27 },
  { scaleX: 1 / 3, scaleY: 1 / 5, posX: -1 / 6, posY: -5.9, offsetY: -27 },
  { scaleX: 1 / 3, scaleY: 1 / 3, posX: -1 / 4, posY: -5.4, offsetY: -27 },
  { scaleX: 1 / 3, scaleY: 1 / 3, posX: 1 / 4, posY: -6, offsetY: -27 },
];

// Mobile layout configuration
export const MOBILE_CONFIG = [
  { scale: [3, 3], pos: [0, -4.3] },
  { scale: [1.5, 2], pos: [-0.7, -5.1] },
  { scale: [1.5, 2], pos: [0.8, -5.1] },
  { scale: [1.5, 2], pos: [-0.7, -5.6] },
  { scale: [1.5, 2], pos: [0.8, -5.6] },
  { scale: [1.5, 2], pos: [-0.7, -6.1] },
  { scale: [1.5, 2], pos: [0.8, -6.1] },
  { scale: [2.2, 2], pos: [-0.3, -6.6] },
  { scale: [1.5, 2], pos: [0.8, -6.6] },
  { scale: [2.2, 2], pos: [-0.3, -7.1] },
  { scale: [1.5, 2], pos: [0.8, -7.1] },
  { scale: [1.5, 2], pos: [0.8, -7.6] },
  { scale: [1.5, 2], pos: [-0.7, -7.6] },
  { scale: [1.5, 2], pos: [0, -8.1] },
];
