export const services = [
  {
    title: "Digital Design",
    description:
      "We create visually stunning and functional designs that elevate your brand and engage your audience.",
    services: [
      "UI/UX Design",
      "Brand Identity",
      "Motion Design",
      "Art Direction",
    ],
  },
  {
    title: "Development",
    description:
      "Our development team builds robust, scalable, and performant websites and applications.",
    services: [
      "Frontend Development",
      "Backend Systems",
      "E-commerce",
      "CMS Integration",
    ],
  },
  {
    title: "Strategy",
    description:
      "We develop comprehensive strategies that align with your business goals and drive results.",
    services: [
      "Digital Strategy",
      "Content Strategy",
      "SEO & Analytics",
      "User Research",
    ],
  },
  {
    title: "Production",
    description:
      "From concept to launch, we manage the entire production process to ensure quality and efficiency.",
    services: [
      "Project Management",
      "Quality Assurance",
      "Performance Optimization",
      "Maintenance",
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
      "Allow transaction on your website",
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
      "Fully own and control your site",
      "Enterprise level architecture",
      "15 status pages",
    ],
    cta: "Contact Us",
    highlighted: true,
  },
];
