import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  Legend,
} from "recharts";

const SERIF = "'Playfair Display', Georgia, serif";

export default function RoadChargeSection() {
  // ---- Data ----
  const driverCosts = [
    { profile: "Avg driver", miles: "11,400 mi", vmt: 285, gas: 300 },
    { profile: "Long commute", miles: "20,000 mi", vmt: 500, gas: 525 },
    { profile: "Urban / light", miles: "5,000 mi", vmt: 125, gas: 130 },
    { profile: "EV (avg miles)", miles: "11,400 mi", vmt: 285, gas: 118 },
  ];

  const stateRates = [
    { state: "Hawaii", rate: 0.8, color: "#2DD4BF" },
    { state: "Utah", rate: 1.11, color: "#60A5FA" },
    { state: "Oregon", rate: 2.3, color: "#FBBF24" },
    { state: "CA (pilot)", rate: 2.5, color: "#FB923C" },
    { state: "CA (alt)", rate: 2.8, color: "#FF6B6B" },
  ];

  const themes = [
    {
      title: "Funding Crisis",
      color: "#FF6B6B",
      badge: "−$5B by 2035",
      body:
        "Gas tax funds ~80% of CA road repairs and brought in $7.8B in 2023. With the 2035 ZEV mandate, the legislative analyst projects revenue falls 64% by 2035. The math is not contested.",
    },
    {
      title: "What's Actually Proposed",
      color: "#FBBF24",
      badge: "Study extension",
      body:
        "AB 1421 (passed Jan 2026) extends the Road Usage Charge Technical Advisory Committee to 2035. It does not create a tax. A formal proposal isn't expected until 2027 at earliest.",
    },
    {
      title: "The 2024–25 Pilot",
      color: "#2DD4BF",
      badge: "800 volunteers",
      body:
        "Caltrans tested 2.5¢/mile flat for light-duty (or fuel-economy variable) from Aug 2024 to Jan 2025. Real fees collected, gas-tax credits returned. Three reporting options offered, with and without GPS.",
    },
    {
      title: "Privacy Tradeoff",
      color: "#60A5FA",
      badge: "GPS optional",
      body:
        "Plug-in device (with or without GPS), automaker telematics, or monthly odometer photo. The non-GPS options exist but data retention rules, audit trails, and access policies are not yet drafted.",
    },
    {
      title: "Rural & Equity Burden",
      color: "#FB923C",
      badge: "Flat rate ≠ flat impact",
      body:
        "A flat per-mile fee falls hardest on long-distance drivers — typically Central Valley, Inland Empire, and rural commuters who live far from job centers. Progressive design is possible but unspecified.",
    },
    {
      title: "Employer Cost",
      color: "#A78BFA",
      badge: "Labor Code §2802",
      body:
        "Any state mileage tax is almost certainly reimbursable on top of the 72.5¢/mile IRS rate under §2802. Mobile workforces — outside sales, home health, field service, construction — absorb the cost.",
    },
  ];

  // ---- Reusable components ----
  const SectionHeader = ({ title, subtitle }) => (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 20 }}>
      <div
        style={{
          width: 4,
          alignSelf: "stretch",
          minHeight: 40,
          background: "#FBBF24",
          borderRadius: 2,
        }}
      />
      <div>
        <h2
          style={{
            fontFamily: SERIF,
            fontSize: 30,
            color: "#F8FAFC",
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p style={{ color: "#94A3B8", fontSize: 15, marginTop: 4, marginBottom: 0 }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );

  const StatCard = ({ label, value, sub, valueColor = "#FF6B6B" }) => (
    <div
      style={{
        borderRadius: 12,
        border: "1px solid #334155",
        background: "#1E293B",
        padding: 20,
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.18em",
          color: "#94A3B8",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div
        style={{
          marginTop: 12,
          fontSize: 48,
          lineHeight: 1,
          fontFamily: SERIF,
          color: valueColor,
        }}
      >
        {value}
      </div>
      <div style={{ color: "#94A3B8", fontSize: 13, marginTop: 8 }}>{sub}</div>
    </div>
  );

  const CostTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div
        style={{
          borderRadius: 6,
          border: "1px solid #334155",
          background: "#0F172A",
          padding: "8px 12px",
          fontSize: 12,
          color: "#E2E8F0",
          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
        }}
      >
        <div style={{ color: "#CBD5E1", fontWeight: 500 }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ marginTop: 2, display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: 2,
                background: p.color,
              }}
            />
            <span style={{ color: "#94A3B8" }}>{p.name}:</span>
            <span style={{ color: "#F8FAFC", fontWeight: 600 }}>${p.value}</span>
          </div>
        ))}
      </div>
    );
  };

  const StateTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const p = payload[0];
    return (
      <div
        style={{
          borderRadius: 6,
          border: "1px solid #334155",
          background: "#0F172A",
          padding: "8px 12px",
          fontSize: 12,
          color: "#E2E8F0",
          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
        }}
      >
        <div style={{ color: "#94A3B8" }}>{p.payload.state}</div>
        <div style={{ marginTop: 2, color: "#F8FAFC", fontWeight: 600 }}>{p.value}¢ / mile</div>
      </div>
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#0F172A",
        color: "#E2E8F0",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
        {/* ---------- HERO ---------- */}
        <header
          style={{
            position: "relative",
            borderRadius: 16,
            overflow: "hidden",
            marginBottom: 40,
            borderBottom: "2px solid #FBBF24",
            background:
              "linear-gradient(135deg, rgba(96,165,250,0.18) 0%, rgba(251,191,36,0.10) 30%, rgba(15,23,42,0) 70%)",
          }}
        >
          <div style={{ padding: "32px 28px" }}>
            <div
              style={{
                color: "#FBBF24",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.22em",
              }}
            >
              POLICY ANALYSIS — APRIL 2026
            </div>
            <h1
              style={{
                marginTop: 12,
                fontSize: 48,
                lineHeight: 1.05,
                color: "#F8FAFC",
                fontFamily: SERIF,
                margin: "12px 0 0 0",
              }}
            >
              The Road Charge
            </h1>
            <p
              style={{
                marginTop: 12,
                color: "#CBD5E1",
                fontSize: 17,
                maxWidth: 640,
              }}
            >
              California's gas tax is dying. What's proposed to replace it — and
              why most of what you've read about it is wrong.
            </p>
          </div>
        </header>

        {/* ---------- STAT GRID ---------- */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 48,
          }}
        >
          <StatCard
            label="Pilot Rate"
            value="2.5¢"
            sub="Per mile, light-duty (Aug '24–Jan '25)"
            valueColor="#FBBF24"
          />
          <StatCard
            label="Gas Tax Decline"
            value="−$5B"
            sub="Projected revenue loss by 2035"
            valueColor="#FF6B6B"
          />
          <StatCard
            label="Earliest Proposal"
            value="2027"
            sub="Formal recommendations expected"
            valueColor="#FB923C"
          />
          <StatCard
            label="States With RUC"
            value="4"
            sub="OR, UT, VA, HI (only HI mandatory)"
            valueColor="#2DD4BF"
          />
        </div>

        {/* ---------- THE SETUP ---------- */}
        <section style={{ marginBottom: 48 }}>
          <SectionHeader
            title="Why This Conversation Exists"
            subtitle="The math behind a gas-tax-funded road system in a ZEV state."
          />
          <div
            style={{
              borderRadius: 12,
              border: "1px solid #334155",
              background: "#1E293B",
              padding: 24,
              color: "#CBD5E1",
              fontSize: 15,
              lineHeight: 1.6,
            }}
          >
            <p style={{ margin: 0 }}>
              California's <span style={{ color: "#F8FAFC", fontWeight: 600 }}>59¢/gallon</span>{" "}
              gas tax — the highest in the nation — funds about{" "}
              <span style={{ color: "#F8FAFC", fontWeight: 600 }}>80%</span> of the
              state's road and highway repairs. It generated{" "}
              <span style={{ color: "#F8FAFC", fontWeight: 600 }}>$7.8 billion</span>{" "}
              in 2023.
            </p>
            <p style={{ marginTop: 12, color: "#94A3B8", fontSize: 13 }}>
              Under the 2035 ZEV mandate, 100% of new vehicle sales must be zero
              emission. The Legislative Analyst projects gas tax revenue falls
              roughly <span style={{ color: "#F8FAFC" }}>64%</span> by 2035 if the
              state hits its climate targets. EV owners currently pay a flat $118
              Road Improvement Fee on registration — about a third of what an
              average gas-car driver pays at the pump.
            </p>
          </div>
        </section>

        {/* ---------- WHAT'S PROPOSED ---------- */}
        <section style={{ marginBottom: 48 }}>
          <SectionHeader
            title="What's Actually Proposed"
            subtitle="There is no mileage tax in effect. None is currently scheduled."
          />
          <div
            style={{
              borderRadius: 12,
              border: "1px solid #334155",
              background: "#1E293B",
              padding: 24,
              color: "#CBD5E1",
              fontSize: 15,
              lineHeight: 1.6,
            }}
          >
            <p style={{ margin: 0 }}>
              <span style={{ color: "#FBBF24", fontWeight: 600 }}>SB 339 (2021).</span>{" "}
              Authorized the road charge pilot program with real fee collection,
              replacing earlier mock-invoice studies.
            </p>
            <p style={{ marginTop: 12 }}>
              <span style={{ color: "#FBBF24", fontWeight: 600 }}>AB 1421 (Jan 2026).</span>{" "}
              Does <span style={{ color: "#F8FAFC" }}>not</span> create a tax. It
              extends the Road Usage Charge Technical Advisory Committee from a
              January 2027 sunset to January 2035 — a study extension, not an
              implementation.
            </p>
            <p
              style={{
                marginTop: 12,
                color: "#94A3B8",
                fontSize: 13,
                paddingTop: 12,
                borderTop: "1px solid #334155",
              }}
            >
              A formal recommendation set is expected in 2027. The earliest
              plausible legislative vote on a binding proposal is 2028+, with a
              mandatory rollout, if it happens, likely in the 2030s. Hawaii's path
              from authorizing legislation to its mandatory 2028 EV start took
              about five years.
            </p>
          </div>
        </section>

        {/* ---------- COST CHART ---------- */}
        <section style={{ marginBottom: 48 }}>
          <SectionHeader
            title="What It Would Cost You"
            subtitle="At the pilot rate of 2.5¢/mile, vs. what an equivalent gas-car driver pays today."
          />
          <div
            style={{
              borderRadius: 12,
              border: "1px solid #334155",
              background: "#1E293B",
              padding: 16,
            }}
          >
            <div style={{ height: 360, width: "100%" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={driverCosts}
                  margin={{ top: 30, right: 12, left: 12, bottom: 30 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#334155"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="profile"
                    tick={{ fill: "#94A3B8", fontSize: 11 }}
                    tickLine={false}
                    axisLine={{ stroke: "#334155" }}
                    interval={0}
                  />
                  <YAxis
                    tick={{ fill: "#94A3B8", fontSize: 11 }}
                    tickLine={false}
                    axisLine={{ stroke: "#334155" }}
                    tickFormatter={(v) => `$${v}`}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(148,163,184,0.08)" }}
                    content={<CostTooltip />}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: 12, color: "#CBD5E1" }}
                    iconType="square"
                  />
                  <Bar
                    dataKey="vmt"
                    name="At 2.5¢/mile"
                    fill="#FBBF24"
                    radius={[4, 4, 0, 0]}
                  >
                    <LabelList
                      dataKey="vmt"
                      position="top"
                      fill="#E2E8F0"
                      fontSize={11}
                      formatter={(v) => `$${v}`}
                    />
                  </Bar>
                  <Bar
                    dataKey="gas"
                    name="Current gas tax / fee"
                    fill="#64748B"
                    radius={[4, 4, 0, 0]}
                  >
                    <LabelList
                      dataKey="gas"
                      position="top"
                      fill="#CBD5E1"
                      fontSize={11}
                      formatter={(v) => `$${v}`}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p style={{ color: "#64748B", fontSize: 12, marginTop: 12, paddingLeft: 8 }}>
              Note: Average California driver ~11,400 mi/yr (FHWA). Gas-car estimate
              assumes ~25 mpg at 59¢/gal. EV current fee is the $118 Road Improvement
              Fee on registration.
            </p>
          </div>
        </section>

        {/* ---------- STATE COMPARISON CHART ---------- */}
        <section style={{ marginBottom: 48 }}>
          <SectionHeader
            title="How Other States Compare"
            subtitle="Per-mile rates among states with RUC programs or pilots."
          />
          <div
            style={{
              borderRadius: 12,
              border: "1px solid #334155",
              background: "#1E293B",
              padding: 16,
            }}
          >
            <div style={{ height: 320, width: "100%" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stateRates}
                  margin={{ top: 24, right: 12, left: 12, bottom: 30 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#334155"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="state"
                    tick={{ fill: "#94A3B8", fontSize: 11 }}
                    tickLine={false}
                    axisLine={{ stroke: "#334155" }}
                    interval={0}
                  />
                  <YAxis
                    tick={{ fill: "#94A3B8", fontSize: 11 }}
                    tickLine={false}
                    axisLine={{ stroke: "#334155" }}
                    tickFormatter={(v) => `${v}¢`}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(148,163,184,0.08)" }}
                    content={<StateTooltip />}
                  />
                  <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
                    {stateRates.map((d, i) => (
                      <Cell key={i} fill={d.color} />
                    ))}
                    <LabelList
                      dataKey="rate"
                      position="top"
                      fill="#E2E8F0"
                      fontSize={12}
                      formatter={(v) => `${v}¢`}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p style={{ color: "#64748B", fontSize: 12, marginTop: 12, paddingLeft: 8 }}>
              Hawaii is the only state with a mandatory RUC scheduled — EVs by
              2028, all light vehicles by 2033. Oregon, Utah, and Virginia are
              voluntary.
            </p>
          </div>
        </section>

        {/* ---------- THEMES ---------- */}
        <section style={{ marginBottom: 48 }}>
          <SectionHeader
            title="Six Threads of the Debate"
            subtitle="What the funding gap, the proposal, and the pushback actually look like."
          />
          <div
            style={{
              borderRadius: 12,
              border: "1px solid #334155",
              background: "#1E293B",
              padding: 24,
            }}
          >
            {themes.map((t, i) => (
              <div
                key={i}
                style={{
                  paddingTop: i === 0 ? 0 : 20,
                  paddingBottom: i === themes.length - 1 ? 0 : 20,
                  borderTop: i === 0 ? "none" : "1px solid #334155",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: "8px 12px",
                    marginBottom: 8,
                  }}
                >
                  <h3
                    style={{
                      fontSize: 19,
                      fontWeight: 600,
                      color: t.color,
                      margin: 0,
                    }}
                  >
                    {t.title}
                  </h3>
                  <span
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.04em",
                      padding: "2px 8px",
                      borderRadius: 4,
                      backgroundColor: `${t.color}20`,
                      color: t.color,
                    }}
                  >
                    {t.badge}
                  </span>
                </div>
                <p style={{ color: "#CBD5E1", fontSize: 15, lineHeight: 1.6, margin: 0 }}>
                  {t.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- TRUE vs MISINFORMATION ---------- */}
        <section style={{ marginBottom: 48 }}>
          <SectionHeader
            title="What's True vs. What's Misinformation"
            subtitle="The discourse has stable inaccuracies on both sides."
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            <div
              style={{
                borderRadius: 12,
                border: "1px solid rgba(45,212,191,0.30)",
                background: "rgba(45,212,191,0.04)",
                padding: 20,
              }}
            >
              <div
                style={{
                  color: "#5EEAD4",
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: "0.04em",
                  marginBottom: 12,
                }}
              >
                ACCURATE
              </div>
              <ul
                style={{
                  color: "#CBD5E1",
                  fontSize: 13,
                  lineHeight: 1.6,
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                }}
              >
                <li style={{ marginBottom: 8 }}>
                  <span style={{ color: "#F8FAFC", fontWeight: 500 }}>→</span> The
                  gas tax is declining as a function of math, not policy
                  preference.
                </li>
                <li style={{ marginBottom: 8 }}>
                  <span style={{ color: "#F8FAFC", fontWeight: 500 }}>→</span> A
                  pilot ran Aug 2024 – Jan 2025 with real fee collection at
                  2.5¢/mile.
                </li>
                <li style={{ marginBottom: 8 }}>
                  <span style={{ color: "#F8FAFC", fontWeight: 500 }}>→</span> AB
                  1421 is a study extension to 2035, not an implementation.
                </li>
                <li>
                  <span style={{ color: "#F8FAFC", fontWeight: 500 }}>→</span>{" "}
                  Privacy and rural-equity concerns are unresolved by the pilot.
                </li>
              </ul>
            </div>
            <div
              style={{
                borderRadius: 12,
                border: "1px solid rgba(255,107,107,0.30)",
                background: "rgba(255,107,107,0.04)",
                padding: 20,
              }}
            >
              <div
                style={{
                  color: "#FDA4AF",
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: "0.04em",
                  marginBottom: 12,
                }}
              >
                MISINFORMATION
              </div>
              <ul
                style={{
                  color: "#CBD5E1",
                  fontSize: 13,
                  lineHeight: 1.6,
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                }}
              >
                <li style={{ marginBottom: 8 }}>
                  <span style={{ color: "#F8FAFC", fontWeight: 500 }}>×</span> "30¢
                  per mile." Caltrans confirmed this number is fabricated.
                </li>
                <li style={{ marginBottom: 8 }}>
                  <span style={{ color: "#F8FAFC", fontWeight: 500 }}>×</span> "It's
                  already taking effect." No tax is in effect; 2027+ for any
                  proposal.
                </li>
                <li style={{ marginBottom: 8 }}>
                  <span style={{ color: "#F8FAFC", fontWeight: 500 }}>×</span> "It's
                  a double tax." The proposal is to{" "}
                  <span style={{ fontStyle: "italic" }}>replace</span> the gas tax,
                  not stack on it.
                </li>
                <li>
                  <span style={{ color: "#F8FAFC", fontWeight: 500 }}>×</span> "GPS
                  tracking is required." Odometer-photo and non-GPS plug-in options
                  exist.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- SYNTHESIS CALLOUT ---------- */}
        <section style={{ marginBottom: 48 }}>
          <div
            style={{
              borderRadius: 12,
              padding: 24,
              border: "1px solid rgba(255,107,107,0.45)",
              background: "rgba(255,107,107,0.06)",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#FDA4AF",
                marginBottom: 12,
              }}
            >
              Bottom Line
            </div>
            <p style={{ color: "#E2E8F0", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
              The funding problem is real and not ideologically contestable —{" "}
              <span style={{ color: "#F8FAFC", fontWeight: 600 }}>
                some replacement is coming
              </span>
              . The mainstream proposal (~2.5¢/mile, replacing the gas tax) would
              leave the average gas-car driver roughly where they are today and
              meaningfully{" "}
              <span style={{ color: "#F8FAFC", fontWeight: 600 }}>
                increase what EV drivers pay
              </span>
              . The most-circulated criticisms (30¢/mile, imminent, double tax) are
              factually wrong as proposed.
            </p>
            <p
              style={{
                color: "#94A3B8",
                fontSize: 13,
                lineHeight: 1.6,
                marginTop: 12,
                marginBottom: 0,
              }}
            >
              The honest debate is over four unsolved questions: (1) Will the rate
              actually stay revenue-neutral over time? (2) How is the rural
              long-distance driver protected? (3) Who controls the location data,
              and for how long? (4) How does a state RUC reconcile with a future
              federal one? This is policy that's probably defensible in the
              abstract and very easy to implement badly.
            </p>
          </div>
        </section>

        {/* ---------- SOURCE LINE ---------- */}
        <div
          style={{
            color: "#64748B",
            fontSize: 12,
            lineHeight: 1.6,
            borderTop: "1px solid #334155",
            paddingTop: 20,
          }}
        >
          <span style={{ color: "#94A3B8", fontWeight: 600 }}>Sources.</span>{" "}
          California Department of Transportation (Caltrans) Road Charge Program;
          California Transportation Commission; SB 339 (2021); AB 1421 (2026);
          Legislative Analyst's Office; Tax Foundation; Eno Center for
          Transportation; Federal Highway Administration; UC Davis Institute of
          Transportation Studies; Oregon DOT (OReGO); Utah DOT; Hawaii DOT.
        </div>
      </div>
    </div>
  );
}
