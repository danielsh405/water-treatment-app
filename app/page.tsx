"use client";

import { useMemo, useState } from "react";

type Company = {
  id: number;
  name: string;
  niche: string;
  region: string;
  city: string;
  website: string;
  signals: string[];
  saleProbability: number;
  score: number;
  employeeEstimate: string;
  revenueEstimate: string;
  likelyOwnership: string;
  sourceType: string[];
  note: string;
  outreachAngle: string;
};

const sampleCompanies: Company[] = [
  {
    id: 1,
    name: "Midwest Water Systems",
    niche: "Cooling towers, boilers, closed loop systems",
    region: "Illinois",
    city: "Chicago",
    website: "midwestwatersystems.com",
    signals: [
      "Founder-owned",
      "Owner age estimated 64+",
      "Website last refreshed years ago",
      "Mentions succession and continuity",
      "No visible PE ownership",
    ],
    saleProbability: 82,
    score: 86,
    employeeEstimate: "25-50",
    revenueEstimate: "$7.5M-$12M",
    likelyOwnership: "Founder-owned",
    sourceType: ["Website", "LinkedIn", "State records"],
    note:
      "Looks like a relationship-driven regional player with technical service focus and recurring routes. Good fit for proprietary outreach.",
    outreachAngle:
      "Emphasize legacy preservation, technician continuity, and owner transition away from day-to-day operations.",
  },
  {
    id: 2,
    name: "Great Lakes Chemical Treatment",
    niche: "Industrial water treatment and Legionella risk management",
    region: "Wisconsin",
    city: "Milwaukee",
    website: "greatlakeschemicaltreatment.com",
    signals: [
      "Small private operator",
      "Thin digital footprint",
      "Long-tenured leadership",
      "Service-heavy model",
    ],
    saleProbability: 68,
    score: 73,
    employeeEstimate: "15-25",
    revenueEstimate: "$7.5M-$9M",
    likelyOwnership: "Privately held",
    sourceType: ["Website", "Google Maps", "LinkedIn"],
    note:
      "Good add-on or small platform candidate if route density and customer retention are strong.",
    outreachAngle:
      "Lead with personal operator model and willingness to preserve customer relationships and technical culture.",
  },
  {
    id: 3,
    name: "Southeastern Water Tech Services",
    niche: "Boiler and cooling water treatment",
    region: "Georgia",
    city: "Atlanta",
    website: "sewaterservices.com",
    signals: [
      "Family business references",
      "Limited hiring activity",
      "No corporate parent visible",
      "Owner quoted in local trade article 12 years ago",
    ],
    saleProbability: 76,
    score: 79,
    employeeEstimate: "20-40",
    revenueEstimate: "$8M-$15M",
    likelyOwnership: "Family-owned",
    sourceType: ["Website", "News archive", "LinkedIn", "Secretary of State"],
    note:
      "Likely relationship-led and locally entrenched. Could be attractive if concentrated healthcare and industrial accounts are stable.",
    outreachAngle:
      "Speak to retirement planning, thoughtful succession, and maintaining service quality post-close.",
  },
  {
    id: 4,
    name: "Pacific Process Water Care",
    niche: "Industrial process water, cooling towers, closed loops",
    region: "California",
    city: "Fresno",
    website: "ppwatercare.com",
    signals: [
      "Founder biography on homepage",
      "No known sponsor ownership",
      "Older branding",
      "Field service emphasis",
    ],
    saleProbability: 61,
    score: 67,
    employeeEstimate: "15-30",
    revenueEstimate: "$7.5M-$10M",
    likelyOwnership: "Founder-owned",
    sourceType: ["Website", "Maps", "Industry directory"],
    note:
      "Worth tracking. Looks founder-led, but sale timing less obvious from current signals.",
    outreachAngle:
      "Open with industry credibility and a genuine learning conversation before discussing transition.",
  },
  {
    id: 5,
    name: "River City Water Management",
    niche: "Commercial HVAC water treatment and monitoring",
    region: "Missouri",
    city: "St. Louis",
    website: "rivercitywatermgmt.com",
    signals: [
      "Mentions looking for next generation leadership",
      "Regional customer base",
      "No recent acquisitions",
      "Small leadership bench",
    ],
    saleProbability: 88,
    score: 91,
    employeeEstimate: "25-60",
    revenueEstimate: "$8M-$18M",
    likelyOwnership: "Founder-owned",
    sourceType: ["Website", "LinkedIn", "Industry membership list"],
    note:
      "Highest-priority outreach candidate based on explicit continuity language and likely need for leadership transition.",
    outreachAngle:
      "Approach directly on continuity, culture, and willingness to personally lead the company after closing.",
  },
];

const searchTemplates = [
  '"cooling tower water treatment" "for sale"',
  '"boiler water treatment" acquisition OR succession',
  'site:linkedin.com/company "water treatment" "cooling tower"',
  'site:bizbuysell.com "water treatment"',
  'site:loopnet.com "industrial water treatment"',
  'site:ibba.org water treatment business',
  '"Association of Water Technologies" members',
  '"family-owned" "water treatment company"',
];

const scoreSignals = [
  ["Founder-owned or family-owned", 20],
  ["Owner age or retirement clues", 20],
  ["Outdated site / limited hiring / thin digital footprint", 12],
  ["Service-heavy recurring model", 10],
  ["No visible PE or strategic ownership", 15],
  ["Geography and niche fit", 10],
  ["Leadership continuity or next-generation language", 13],
];

function bucketLabel(score: number) {
  if (score >= 85) return "High Priority";
  if (score >= 70) return "Medium Priority";
  return "Monitor";
}

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState("hunter@lonepinesuccession.com");
  const [loginPassword, setLoginPassword] = useState("demo-password");
  const [keyword, setKeyword] = useState("water");
  const [geography, setGeography] = useState("all");
  const [niche, setNiche] = useState("all");
  const [sortBy, setSortBy] = useState("score");
  const [selectedCompany, setSelectedCompany] = useState<Company>(sampleCompanies[0]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [outreachPrompt, setOutreachPrompt] = useState(
    "Write a short first-touch email to a founder-owned industrial water treatment company focused on cooling towers and boilers. Emphasize personal operator model, succession sensitivity, and long-term legacy preservation."
  );

  const filteredCompanies = useMemo(() => {
    let results = [...sampleCompanies];

    if (keyword.trim()) {
      const q = keyword.toLowerCase();
      results = results.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.niche.toLowerCase().includes(q) ||
          c.note.toLowerCase().includes(q) ||
          c.signals.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (geography !== "all") {
      results = results.filter((c) => c.region === geography);
    }

    if (niche !== "all") {
      results = results.filter((c) => c.niche.toLowerCase().includes(niche));
    }

    results.sort((a, b) => {
      if (sortBy === "saleProbability") return b.saleProbability - a.saleProbability;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return b.score - a.score;
    });

    return results;
  }, [keyword, geography, niche, sortBy]);

  const generatedEmail = useMemo(() => {
    return `Subject: Introduction from a long-term buyer in water treatment

Hi [First Name],

I came across ${selectedCompany.name} while researching independent water treatment businesses focused on technical service and customer relationships. Your business appears to have built a strong position in ${selectedCompany.niche.toLowerCase()} in the ${selectedCompany.region} market.

I wanted to reach out directly because I am looking to acquire and personally operate one water treatment company over the long term. My interest is specifically in businesses where the owner cares deeply about employee continuity, customer relationships, and preserving the legacy of what they have built.

If selling the business or planning for succession is something you may consider over the next few years, I would value the chance to introduce myself and learn more about your goals.

Best,
Hunter`;
  }, [selectedCompany]);

  if (!isAuthenticated) {
    return (
      <main className="login-shell">
        <div className="login-grid">
          <section className="card hero-card">
            <span className="hero-badge">Private Deal Intelligence</span>
            <h1 className="hero-title">Water treatment sourcing engine</h1>
            <p className="hero-copy">
              A private login-gated platform for tracking privately owned U.S.
              industrial water treatment companies focused on cooling towers,
              boilers, and closed loop systems.
            </p>

            <div className="hero-stats">
              <div className="stat">
                <div className="stat-label">Coverage</div>
                <div className="stat-value">United States</div>
              </div>
              <div className="stat">
                <div className="stat-label">Target size</div>
                <div className="stat-value">$7.5M+ revenue</div>
              </div>
              <div className="stat">
                <div className="stat-label">Team size</div>
                <div className="stat-value">15+ employees</div>
              </div>
            </div>

            <div className="hero-note">
              Protect proprietary targets, brokered opportunities, imported
              source files, and outreach history. This mockup is set up to
              become a real authenticated app in the next build.
            </div>
          </section>

          <section className="card login-card">
            <h2 className="login-title">Sign in</h2>

            <div className="field">
              <label className="label">Email</label>
              <input
                className="input"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="you@firm.com"
              />
            </div>

            <div className="field">
              <label className="label">Password</label>
              <input
                className="input"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>

            <button className="button button-primary" onClick={() => setIsAuthenticated(true)}>
              Sign in to dashboard
            </button>

            <div className="helper">
              This is a front-end login mockup. To make it real, the next step
              is connecting it to Supabase Auth, Clerk, Auth0, or NextAuth.
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="topbar">
        <div>
          <div className="brand">Water Treatment Deal Sourcing App</div>
          <div className="topbar-sub">Private pipeline for industrial water treatment targets</div>
        </div>
        <button className="button button-secondary" onClick={() => setIsAuthenticated(false)}>
          Log out
        </button>
      </div>

      <div className="container">
        <div className="header-grid">
          <section className="card padded">
            <span className="badge">Deal Sourcing Prototype</span>
            <h1 className="h1">Water treatment M&amp;A sourcing app</h1>
            <p className="subtle">
              A working front-end prototype for identifying privately owned,
              U.S.-based industrial water treatment companies that may be worth
              proprietary outreach. It is tuned to cooling towers, boilers, and
              closed loop systems, with focus on companies at roughly $7.5M+
              revenue and 15+ employees.
            </p>
          </section>

          <section className="card padded">
            <div className="section-title">Best use case</div>
            <p className="subtle">
              Independent industrial water treatment companies serving cooling
              towers, boilers, and closed loop systems with recurring service routes.
            </p>
            <div className="mini-grid">
              <div className="mini-box">
                <div className="stat-label">Targets loaded</div>
                <div className="mini-value">{sampleCompanies.length}</div>
              </div>
              <div className="mini-box">
                <div className="stat-label">High priority</div>
                <div className="mini-value">
                  {sampleCompanies.filter((c) => c.score >= 85).length}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="tabs">
          {[
            ["dashboard", "Dashboard"],
            ["queries", "Query Builder"],
            ["scoring", "Scoring Model"],
            ["outreach", "Outreach"],
          ].map(([value, label]) => (
            <button
              key={value}
              className={`tab ${activeTab === value ? "tab-active" : ""}`}
              onClick={() => setActiveTab(value)}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === "dashboard" && (
          <>
            <div className="content-grid">
              <section className="card filter-card">
                <h2 className="section-title">Search and filter</h2>

                <div className="field">
                  <label className="label">Keyword</label>
                  <input
                    className="input"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search by niche, signal, or company"
                  />
                </div>

                <div className="field">
                  <label className="label">Geography</label>
                  <select
                    className="select"
                    value={geography}
                    onChange={(e) => setGeography(e.target.value)}
                  >
                    <option value="all">All geographies</option>
                    <option value="Illinois">Illinois</option>
                    <option value="Wisconsin">Wisconsin</option>
                    <option value="Georgia">Georgia</option>
                    <option value="California">California</option>
                    <option value="Missouri">Missouri</option>
                  </select>
                </div>

                <div className="field">
                  <label className="label">Niche</label>
                  <select
                    className="select"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                  >
                    <option value="all">All niches</option>
                    <option value="cooling">Cooling towers</option>
                    <option value="boiler">Boilers</option>
                    <option value="closed loop">Closed loop systems</option>
                    <option value="legionella">Legionella</option>
                  </select>
                </div>

                <div className="field">
                  <label className="label">Sort</label>
                  <select
                    className="select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="score">Best fit score</option>
                    <option value="saleProbability">Sale probability</option>
                    <option value="name">Name</option>
                  </select>
                </div>

                <div className="alert">
                  This version uses sample data. After launch, we can wire in
                  Grata imports, real authentication, a database, and daily
                  scraping jobs.
                </div>
              </section>

              <section className="company-list">
                {filteredCompanies.map((company) => (
                  <div
                    key={company.id}
                    className={`company-item ${selectedCompany.id === company.id ? "active" : ""}`}
                    onClick={() => setSelectedCompany(company)}
                  >
                    <div className="company-title">
                      <strong>{company.name}</strong>
                      <span className="badge">{bucketLabel(company.score)}</span>
                    </div>

                    <p className="subtle">
                      {company.city}, {company.region} · {company.niche} · {company.likelyOwnership}
                    </p>

                    <p className="subtle">{company.note}</p>

                    <div className="tags">
                      {company.signals.slice(0, 4).map((signal) => (
                        <span key={signal} className="tag">
                          {signal}
                        </span>
                      ))}
                    </div>

                    <div className="score-box">
                      <div className="score-mini">
                        <div className="stat-label">Fit score</div>
                        <div className="score-number">{company.score}</div>
                      </div>
                      <div className="score-mini">
                        <div className="stat-label">Sale probability</div>
                        <div className="score-number">{company.saleProbability}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            </div>

            <section className="card detail-card" style={{ marginTop: 20 }}>
              <h2 className="section-title">Selected target profile</h2>
              <div className="detail-grid">
                <div>
                  <h3>{selectedCompany.name}</h3>
                  <p className="kv">
                    <span>{selectedCompany.website}</span>
                    <span>{selectedCompany.employeeEstimate} employees</span>
                    <span>{selectedCompany.revenueEstimate} revenue est.</span>
                  </p>

                  <ul className="list-plain">
                    {selectedCompany.signals.map((signal) => (
                      <li key={signal}>{signal}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="panel">
                    <strong>Suggested outreach angle</strong>
                    <p className="subtle">{selectedCompany.outreachAngle}</p>
                  </div>

                  <div className="panel" style={{ marginTop: 14 }}>
                    <strong>Source stack</strong>
                    <div className="tags">
                      {selectedCompany.sourceType.map((source) => (
                        <span key={source} className="tag">
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === "queries" && (
          <div className="content-grid">
            <section className="card padded">
              <h2 className="section-title">Search query builder</h2>
              <p className="subtle">
                Use these query patterns to search public sources for targets and sale signals.
              </p>

              <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
                {searchTemplates.map((template) => (
                  <div key={template} className="query-box">
                    {template}
                  </div>
                ))}
              </div>
            </section>

            <section className="card padded">
              <h2 className="section-title">Recommended backend pipeline</h2>
              <ol className="list-plain">
                <li>Discover candidates from public websites, directories, broker listings, state registrations, and imported source files.</li>
                <li>Enrich ownership clues, team size, revenue estimates, digital freshness, and niche relevance.</li>
                <li>Score and rank against your acquisition criteria.</li>
                <li>Generate outreach and push reviewed targets into a CRM workflow.</li>
              </ol>
            </section>
          </div>
        )}

        {activeTab === "scoring" && (
          <section className="card padded">
            <h2 className="section-title">Sale likelihood scoring model</h2>
            <div style={{ display: "grid", gap: 12 }}>
              {scoreSignals.map(([label, weight]) => (
                <div key={label} className="panel" style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                  <div>
                    <strong>{label}</strong>
                  </div>
                  <div>
                    <span className="badge">Weight {weight}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "outreach" && (
          <div className="content-grid">
            <section className="card padded">
              <h2 className="section-title">Outreach prompt</h2>
              <div className="field">
                <textarea
                  className="input"
                  style={{ minHeight: 220, resize: "vertical" }}
                  value={outreachPrompt}
                  onChange={(e) => setOutreachPrompt(e.target.value)}
                />
              </div>
              <button className="button button-primary">Generate draft</button>
              <div className="helper">
                In production, this can connect to a real model workflow and your CRM.
              </div>
            </section>

            <section className="card padded">
              <h2 className="section-title">Draft for {selectedCompany.name}</h2>
              <div className="pre">{generatedEmail}</div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
