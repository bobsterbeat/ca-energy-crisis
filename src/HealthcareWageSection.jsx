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
} from "recharts";

const SERIF = "'Playfair Display', Georgia, serif";

export default function HealthcareWageSection() {
  // ---- Data ----

  // Current wage by tier (as of April 2026, before July 1 step-up)
  const tierData = [
    { tier: "Large hospitals / dialysis", current: 24, jul2026: 25, color: "#FF6B6B" },
    { tier: "Community clinics", current: 21, jul2026: 22, color: "#FBBF24" },
    { tier: "All other facilities", current: 21, jul2026: 23, color: "#FB923C" },
    { tier: "Safety-net / rural", current: 18.63, jul2026: 19.28, color: "#2DD4BF" },
  ];

  // Comparison vs. fast food and standard CA min wage
  const wageContext = [
    { label: "CA standard min", value: 16.9, color: "#94A3B8" },
    { label: "Safety-net / rural HC", value: 18.63, color: "#2DD4BF" },
    { label: "Fast food", value: 20, color: "#A78BFA" },
    { label: "Clinic HC", value: 21, color: "#FBBF24" },
    { label: "Other HC", value: 21, color: "#FB923C" },
    { label: "Large hospital HC", value: 24, color: "#FF6B6B" },
  ];

  const tiers = [
    {
      name: "Tier 1 — Large Systems & Dialysis",
      color: "#FF6B6B",
      badge: "$24 → $25 (Jul '26)",
      who: "Hospitals/systems with 10,000+ FTEs, dialysis clinics, LA County facilities, Kaiser.",
      schedule: "$23 (Oct '24) → $24 (Jul '25) → $25 (Jul '26).",
      note: "Reaches the $25 target first. Kaiser implemented via collective bargaining ahead of statute.",
    },
    {
      name: "Tier 2 — Safety-Net & Rural",
      color: "#2DD4BF",
      badge: "Slow climb to $25",
      who: "Hospitals with high government payor mix (≥75% Medicare/Medi-Cal), independent rurals, small-county facilities (<250K pop.).",
      schedule: "$18 (Oct '24) with 3.5% annual increases through 2033, then $25.",
      note: "The longest phase-in. Currently at $18.63; reaches $25 only in 2033.",
    },
    {
      name: "Tier 3 — Community Clinics",
      color: "#FBBF24",
      badge: "$21 → $22 (Jul '26)",
      who: "Primary care clinics, community clinics, rural health clinics, urgent care affiliated with community/rural clinics.",
      schedule: "$21 (Oct '24) → $22 (Jul '26) → $25 (Jul '27).",
      note: "Waiver program available for clinics that demonstrate financial hardship.",
    },
    {
      name: "Tier 4 — All Other Covered Facilities",
      color: "#FB923C",
      badge: "$21 → $23 (Jul '26)",
      who: "Everything else covered: physician practices, psych hospitals, mid-size county facilities, county correctional health, county mental health.",
      schedule: "$21 (Oct '24) → $23 (Jul '26) → $25 (Jul '28).",
      note: "The catch-all tier. Two-step phase-in — moderate jump in 2026, target hit in 2028.",
    },
  ];

  const themes = [
    {
      title: "Who's Covered",
      color: "#60A5FA",
      badge: "~426K workers",
      body:
        "Direct patient care plus support staff: techs, CNAs, custodial, housekeeping, food service, security, clerical. The 'covered employees' definition is intentionally broad — anyone whose work supports patient care delivery.",
    },
    {
      title: "Who Isn't",
      color: "#A78BFA",
      badge: "Notable carve-outs",
      body:
        "State-owned hospitals (DSH, prisons, UC and CSU campus health are debated under Home Rule), tribal clinics, stand-alone skilled nursing facilities (until a patient-care minimum-spending law triggers coverage), and physicians/dentists in private practice not at a covered facility.",
    },
    {
      title: "Salary-Exempt Threshold",
      color: "#FBBF24",
      badge: "150% of HC wage",
      body:
        "Exempt managers must earn at least 150% of the applicable healthcare minimum wage OR 200% of the standard state minimum, whichever is higher. At Tier 1, that's ~$74,880/yr; at Tier 4, ~$65,520/yr.",
    },
    {
      title: "Cost Estimate",
      color: "#FF6B6B",
      badge: "$2.7B+ annually",
      body:
        "UC Berkeley Labor Center projects total CA health expenditures rise ~0.5% ($2.7B) in year one, with the state budget hit in the low hundreds of millions for FY 2025 (Medi-Cal share + own-employee costs).",
    },
    {
      title: "Offsetting Savings",
      color: "#2DD4BF",
      badge: "Medi-Cal caseload",
      body:
        "An estimated 216,000 affected workers (and household members) currently receive Medi-Cal. As the wage approaches $25, many will earn out — combined fed+state savings of $1.66B/yr at full implementation, with $731M of that to the state.",
    },
    {
      title: "Spillover Wages",
      color: "#FB923C",
      badge: "Limited evidence",
      body:
        "Research on prior healthcare wage floors found small spillover effects — about 20¢ on the dollar for nearby hospitals within 15 miles, dropping to 10¢ at 15–30 miles. Larger spillovers will already be required by SB 525's tiered schedule.",
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

  const TierTooltip = ({ active, payload, label }) => {
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
            <span style={{ color: "#F8FAFC", fontWeight: 600 }}>${p.value}/hr</span>
          </div>
        ))}
      </div>
    );
  };

  const ContextTooltip = ({ active, payload }) => {
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
        <div style={{ color: "#94A3B8" }}>{p.payload.label}</div>
        <div style={{ marginTop: 2, color: "#F8FAFC", fontWeight: 600 }}>${p.value}/hr</div>
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
              "linear-gradient(135deg, rgba(45,212,191,0.18) 0%, rgba(167,139,250,0.10) 30%, rgba(15,23,42,0) 70%)",
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
              The $25 Healthcare Wage
            </h1>
            <p
              style={{
                marginTop: 12,
                color: "#CBD5E1",
                fontSize: 17,
                maxWidth: 640,
              }}
            >
              SB 525 — the first-in-the-nation $25 floor for healthcare workers.
              Four tiers, schedules ranging from 18 months to 9 years, and the
              biggest step-up arrives July 2026.
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
            label="Workers Covered"
            value="~426K"
            sub="Direct patient care plus support staff"
            valueColor="#FF6B6B"
          />
          <StatCard
            label="Target Wage"
            value="$25"
            sub="Reached over 18 months to 9 years"
            valueColor="#FBBF24"
          />
          <StatCard
            label="Tiers"
            value="4"
            sub="By facility size, payor mix, and type"
            valueColor="#FB923C"
          />
          <StatCard
            label="Annual Cost"
            value="$2.7B"
            sub="Year-1 total CA health expenditure rise"
            valueColor="#A78BFA"
          />
        </div>

        {/* ---------- THE LAW ---------- */}
        <section style={{ marginBottom: 48 }}>
          <SectionHeader
            title="The Law in Brief"
            subtitle="SB 525 — signed Oct 2023, effective Oct 16, 2024."
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
              SB 525 phases in a{" "}
              <span style={{ color: "#F8FAFC", fontWeight: 600 }}>$25/hour</span>{" "}
              minimum wage for covered healthcare workers across four facility
              tiers. About{" "}
              <span style={{ color: "#F8FAFC", fontWeight: 600 }}>426,000 workers</span>{" "}
              are affected — direct patient care, plus the techs, custodial staff,
              housekeepers, food-service workers, security, and clerical employees
              who support care delivery.
            </p>
            <p style={{ marginTop: 12 }}>
              The next major step-up is{" "}
              <span style={{ color: "#FBBF24", fontWeight: 600 }}>July 1, 2026</span>:
              large hospitals hit the full $25 floor, "all other" facilities jump
              from $21 to $23, and community clinics tick up to $22.
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
              Once each tier reaches $25, future increases are capped at the lower
              of 3.5% or the CPI — the same indexing formula used for the standard
              California minimum wage. A clinic waiver program exists for
              demonstrated financial hardship.
            </p>
          </div>
        </section>

        {/* ---------- TIER CHART ---------- */}
        <section style={{ marginBottom: 48 }}>
          <SectionHeader
            title="Where Each Tier Stands"
            subtitle="Current wage (April 2026) and the July 1, 2026 step-up."
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
                  data={tierData}
                  margin={{ top: 30, right: 12, left: 12, bottom: 30 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#334155"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="tier"
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
                    content={<TierTooltip />}
                  />
                  <Bar
                    dataKey="current"
                    name="Current (Apr 2026)"
                    fill="#64748B"
                    radius={[4, 4, 0, 0]}
                  >
                    <LabelList
                      dataKey="current"
                      position="top"
                      fill="#CBD5E1"
                      fontSize={11}
                      formatter={(v) => `$${v}`}
                    />
                  </Bar>
                  <Bar
                    dataKey="jul2026"
                    name="After Jul 1, 2026"
                    fill="#FBBF24"
                    radius={[4, 4, 0, 0]}
                  >
                    <LabelList
                      dataKey="jul2026"
                      position="top"
                      fill="#E2E8F0"
                      fontSize={11}
                      formatter={(v) => `$${v}`}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p style={{ color: "#64748B", fontSize: 12, marginTop: 12, paddingLeft: 8 }}>
              Note: Safety-net / rural tier increases at 3.5% annually until 2033;
              shown values are the indexed July 2025 and July 2026 rates.
            </p>
          </div>
        </section>

        {/* ---------- WAGE CONTEXT ---------- */}
        <section style={{ marginBottom: 48 }}>
          <SectionHeader
            title="In Context"
            subtitle="Healthcare wage tiers vs. the rest of California's wage floors."
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
                  data={wageContext}
                  margin={{ top: 24, right: 12, left: 12, bottom: 30 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#334155"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="label"
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
                    content={<ContextTooltip />}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {wageContext.map((d, i) => (
                      <Cell key={i} fill={d.color} />
                    ))}
                    <LabelList
                      dataKey="value"
                      position="top"
                      fill="#E2E8F0"
                      fontSize={12}
                      formatter={(v) => `$${v}`}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p style={{ color: "#64748B", fontSize: 12, marginTop: 12, paddingLeft: 8 }}>
              California has three concurrent wage-floor systems: standard
              ($16.90), fast food ($20), and healthcare (four tiers from $18.63 to
              $24, climbing to $25).
            </p>
          </div>
        </section>

        {/* ---------- TIER CARDS ---------- */}
        <section style={{ marginBottom: 48 }}>
          <SectionHeader
            title="The Four Tiers"
            subtitle="Who's in each, what they pay now, and when they hit $25."
          />
          <div
            style={{
              borderRadius: 12,
              border: "1px solid #334155",
              background: "#1E293B",
              padding: 24,
            }}
          >
            {tiers.map((t, i) => (
              <div
                key={i}
                style={{
                  paddingTop: i === 0 ? 0 : 20,
                  paddingBottom: i === tiers.length - 1 ? 0 : 20,
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
                    {t.name}
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
                <p style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                  <span style={{ color: "#CBD5E1", fontWeight: 500 }}>Who.</span>{" "}
                  {t.who}
                </p>
                <p
                  style={{
                    color: "#CBD5E1",
                    fontSize: 15,
                    lineHeight: 1.6,
                    marginTop: 6,
                    marginBottom: 0,
                  }}
                >
                  <span style={{ color: "#E2E8F0", fontWeight: 500 }}>Schedule.</span>{" "}
                  {t.schedule}
                </p>
                <p
                  style={{
                    color: "#64748B",
                    fontSize: 13,
                    lineHeight: 1.6,
                    marginTop: 6,
                    marginBottom: 0,
                    fontStyle: "italic",
                  }}
                >
                  <span style={{ color: "#94A3B8", fontWeight: 500, fontStyle: "normal" }}>
                    Note.
                  </span>{" "}
                  {t.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- THEMES ---------- */}
        <section style={{ marginBottom: 48 }}>
          <SectionHeader
            title="What the Law Actually Does"
            subtitle="Six dimensions: coverage, costs, offsets, and second-order effects."
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

        {/* ---------- COMPARED TO FAST FOOD ---------- */}
        <section style={{ marginBottom: 48 }}>
          <SectionHeader
            title="How This Compares to AB 1228"
            subtitle="Same legislative session, very different design."
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
                border: "1px solid #334155",
                background: "#1E293B",
                padding: 20,
              }}
            >
              <div
                style={{
                  color: "#A78BFA",
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: "0.04em",
                  marginBottom: 8,
                }}
              >
                AB 1228 — FAST FOOD
              </div>
              <p style={{ color: "#CBD5E1", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                Single uniform $20 floor. One-step jump (April 1, 2024). 60+
                location chain test. Industry-wide regardless of margin.
                Private-payer cost passed through to consumers via menu prices.
              </p>
            </div>
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
                  color: "#FF6B6B",
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: "0.04em",
                  marginBottom: 8,
                }}
              >
                SB 525 — HEALTHCARE
              </div>
              <p style={{ color: "#CBD5E1", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                Tiered $18–$25 by facility size and payor mix. Multi-step phase-in
                over 18 months to 9 years. Hardship waiver process. State partly
                self-pays via Medi-Cal reimbursement, recoups some via reduced
                Medi-Cal caseload.
              </p>
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
              SB 525 is{" "}
              <span style={{ color: "#F8FAFC", fontWeight: 600 }}>
                a more carefully designed minimum wage hike
              </span>{" "}
              than AB 1228. The tiered structure, hardship waiver, and slow
              phase-in for safety-net hospitals all reflect lessons that fast-food
              critics argue were ignored. The state captures roughly{" "}
              <span style={{ color: "#F8FAFC", fontWeight: 600 }}>$731M/yr</span> in
              Medi-Cal savings as workers earn out, partly offsetting its{" "}
              <span style={{ color: "#F8FAFC", fontWeight: 600 }}>~$2.7B</span>{" "}
              total annual cost.
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
              Open questions: (1) Do safety-net hospitals on the slow phase-in
              survive the 2025–2033 window? Centinela and Madera tell different
              stories. (2) Does the wage premium reduce healthcare worker shortage
              the way Berkeley projects, or accelerate consolidation that makes
              the shortage worse? (3) Can community clinics actually use the
              waiver, or is the process too burdensome to matter? Early evidence
              is mixed — closures and layoffs at the margin (Centinela, Kaweah
              warnings, Madera before the law) but no sector-wide collapse.
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
          <span style={{ color: "#94A3B8", fontWeight: 600 }}>Sources.</span> SB
          525 (Chapter 890, Statutes of 2023); SB 828 (2024); SB 159 (2024);
          California Labor Code §§1182.14–1182.16; California Department of
          Industrial Relations FAQ; Department of Health Care Access and
          Information (HCAI); UC Berkeley Labor Center (Feb 2024); Liebert Cassidy
          Whitmore implementation guide (May 2025); California Hospital
          Association SB 525 FAQ; SHRM compliance brief (Jul 2025).
        </div>
      </div>
    </div>
  );
}
