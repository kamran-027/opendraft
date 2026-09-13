export interface PresetBraindump {
  id: string;
  title: string;
  target_role: string;
  category: string;
  raw_text: string;
}

export const PRESET_BRAINDUMPS: PresetBraindump[] = [
  {
    id: "product_manager",
    title: "Senior Product Manager",
    target_role: "Senior Product Manager / Group PM",
    category: "Non-Tech / Product",
    raw_text: `Alex Rivera
alex.rivera@example.com | +1 (555) 019-XXXX | San Francisco, CA | linkedin.com/in/alex-rivera-pm

Education:
- MBA in Product Leadership, SPJIMR Mumbai (2019 - 2021), Top 5% Rank
- B.Tech in Mechanical Engineering, NIT Surat (2015 - 2019)

Experience:
1. Swiggy (Senior Product Manager, Checkout & Payments) - Jan 2023 to Present
- Led the complete overhaul of Swiggy's 1-click checkout flow for 40M+ monthly active users
- Reduced payment drop-off rate by 14% and boosted order conversion by adding UPI intent auto-switch
- Managed a cross-functional squad of 12 engineers, 2 UX designers, and 3 data analysts
- Launched Swiggy Money wallet revamp which drove 2.2M monthly transacting users and ₹45Cr GMV

2. Meesho (Product Manager, Monetization & Seller Ads) - June 2021 to Dec 2022
- Launched the self-serve seller advertising portal from scratch for 500k+ micro-merchants
- Generated ₹18M in annualized ad revenue within 6 months of rollout
- Built automated budget recommendations using ML models which increased merchant ROI by 35%

Projects:
- QuickCart AI: Built a side project for conversational grocery list auto-replenishment using LLMs and WhatsApp webhook. 10k users.

Skills:
Product Strategy, Go-to-Market (GTM), Wireframing (Figma), A/B Testing, Mixpanel, SQL & Amplitude, Agile/Scrum, User Discovery Interviews`
  },
  {
    id: "growth_marketer",
    title: "Growth Marketing Lead",
    target_role: "Lead Growth Marketer / Head of Marketing",
    category: "Marketing & Ops",
    raw_text: `Priya Nambiar
priya.nambiar@example.com | +91-98765-XXXXX | Bengaluru, India | linkedin.com/in/priya-growth

Education:
- BBA in Digital Marketing, Christ University (2018 - 2021), 8.8 GPA

Experience:
1. Razorpay (Lead Growth Marketer, SME Acquiring) - March 2023 to Present
- Spearheaded organic acquisition and paid performance marketing across Meta, Google Ads, and LinkedIn with ₹1.2Cr monthly spend
- Slashed Customer Acquisition Cost (CAC) by 28% while scaling quarterly merchant signups by 45% YoY
- Designed automated lead scoring sequences in HubSpot that improved sales qualification velocity by 3x

2. CRED (Growth Specialist, Merchant Commerce) - July 2021 to Feb 2023
- Orchestrated viral D2C brand drop campaigns that generated 4.5M organic impressions and ₹8.5Cr partner sales
- Partnered with 40+ luxury brands (Boat, Dyson, Sleepy Cat) to optimize flash sale conversion funnels

Skills:
Performance Marketing (Google Ads, Meta Ads Manager), SEO & SEM, HubSpot Automation, Mixpanel, SQL, Content Strategy, CRO (Conversion Rate Optimization)`
  },
  {
    id: "data_analyst",
    title: "Business & Data Analyst",
    target_role: "Senior Data / Business Intelligence Analyst",
    category: "Analytics & Finance",
    raw_text: `Aarav Mehta
aarav.mehta@example.com | +91-91234-XXXXX | Pune, India | linkedin.com/in/aarav-data

Education:
- B.Sc in Statistics & Data Science, St. Xavier's College (2019 - 2022)

Experience:
1. Zomato (Senior Data Analyst, Delivery Supply Ops) - Jan 2023 to Present
- Built real-time rider dispatch and surge pricing dashboards in Tableau monitored by 150+ regional city managers
- Identified supply-demand bottleneck patterns that reduced rider idle time by 18% across 12 tier-1 cities
- Wrote complex BigQuery SQL pipelines aggregating 200M+ GPS pings daily for delivery SLA optimization

2. Deloitte (Business Technology Analyst) - July 2022 to Dec 2022
- Automated monthly financial audit reporting for Fortune 500 retail client, saving 120+ manual team hours per quarter
- Built predictive customer churn model in Python (Scikit-Learn) with 84% recall

Skills:
SQL (PostgreSQL, BigQuery), Python (Pandas, NumPy, Scikit-Learn), Tableau, PowerBI, ETL Pipelines, Statistical Modeling, A/B Testing`
  },
  {
    id: "software_engineer",
    title: "Full-Stack Software Engineer",
    target_role: "Senior Full-Stack Engineer / Tech Lead",
    category: "Engineering",
    raw_text: `Rohan Sen
rohan.sen@example.com | +91-98765-XXXXX | Hyderabad, India | github.com/rohan-sen | linkedin.com/in/rohan-dev

Education:
- B.Tech in Computer Science, IIIT Hyderabad (2019 - 2023), 8.9 CGPA

Experience:
1. Zeta Suite (Software Engineer II, Core Banking Platform) - Aug 2023 to Present
- Engineered high-throughput ledger microservices in Go & PostgreSQL processing 15,000+ financial TPS at sub-20ms latency
- Designed distributed event-driven settlement pipelines using Apache Kafka and Redis caching
- Migrated legacy monolith services to Docker & Kubernetes on AWS EKS, improving deploy reliability by 99.99%

2. Postman (Software Engineering Intern) - Jan 2023 to June 2023
- Built OpenAPI 3.1 schema auto-mocking engine used by 200k+ API developers
- Optimized Electron app startup memory consumption by 35% through worker thread offloading

Projects:
- HyperDB: High-performance in-memory key-value store in Rust with Raft consensus protocol. 800+ GitHub stars.

Skills:
Languages: Go, TypeScript, Rust, Python, SQL
Frameworks & Cloud: Next.js, React, Node.js, Docker, Kubernetes, AWS, Apache Kafka, Redis, PostgreSQL`
  }
];
