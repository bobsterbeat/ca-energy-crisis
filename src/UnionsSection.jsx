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

export default function UnionsSection() {
  // ---- Data ----
  const seiuLocals = [
    { local: "SEIU Local 2015 (long-term care)", members: 500, color: "#FF6B6B" },
    { local: "SEIU-UHW (healthcare west)", members: 150, color: "#FB923C" },
    { local: "SEIU 721 (LA County public)", members: 100, color: "#FBBF24" },
    { local: "SEIU 1000 (state employees)", members: 96, color: "#A78BFA" },
    { local: "Other SEIU CA", members: 154, color: "#60A5FA" },
  ];

  const dueGrowth = [
    { year: "2022", dues: 93.5, color: "#94A3B8" },
    { year: "2023", dues: 104, color: "#94A3B8" },
    { year: "2024", dues: 114.5, color: "#FBBF24" },
  ];

  const themes = [
    {
      title: "Membership Scale",
      color: "#FF6B6B",
      badge: "750K in CA",
      body:
        "SEIU California represents about 750,000 members across long-term care, healthcare, public services, and property services. SEIU Local 2015 alone claims 500,000 long-term care workers (though only 246K pay dues — the rest opted out post-Janus and Harris v. Quinn). The combined CA labor movement — SEIU plus CTA, AFSCME, CNA, UFCW, building trades — has well over 2 million members.",
    },
    {
      title: "Political Spending",
      color: "#FB923C",
      badge: "$200M in 2024",
      body:
        "SEIU's national 2024 election investment was $200M — the largest in the union's history. The SEIU COPE PAC raised $74M in 2023–24. SEIU spent $35.4M in direct federal contributions in 2024 alone, with another $12.6M in outside spending. CTA (teachers) is the second-largest organizational political donor in California history.",
    },
    {
      title: "The Self-Reinforcing Loop",
      color: "#FBBF24",
      badge: "Wages → dues",
      body:
        "Union dues are pegged to wages. When a union-backed wage law passes (SB 525, AB 1228, IHSS expansions), members get raises and dues automatically rise. SEIU Local 2015's dues revenue went from $93.5M (2022) → $114.5M (2024) — a 22% jump tracking the SB 525 phase-in. Higher dues fund more political spending, which produces more wage mandates.",
    },
    {
      title: "How Dues Are Spent",
      color: "#A78BFA",
      badge: "16% representation",
      body:
        "SEIU Local 2015's 2024 LM-2 filing (federal disclosure): $40.7M to SEIU national HQ, $4.5M to political activity and lobbying, $1.9M to grants, but only $18.3M (16%) categorized as 'representational activities.' President Verrett earned $306K; multiple EVPs over $250K. Critics (Cato, Freedom Foundation) call this misallocation; defenders argue political work is representation by other means.",
    },
    {
      title: "The IHSS Question",
      color: "#60A5FA",
      badge: "$28.5B program",
      body:
        "In-Home Supportive Services pays caregivers (mostly family members) to look after elderly parents or disabled children at home. SEIU represents these workers — even though many didn't choose to join. The Supreme Court flagged this in Harris v. Quinn (2014) as a 'money-making scheme.' Default automatic dues withholding continues; many caregivers (elderly, non-English-speaking) keep paying without knowing they can opt out.",
    },
    {
      title: "Hospital-Side Counterforce",
      color: "#2DD4BF",
      badge: "CHA / individual systems",
      body:
        "California Hospital Association (CHA) is the structural counterweight — and is currently sponsoring a 2026 ballot initiative requiring unions to disclose how dues are spent on politics and to get majority member approval for ballot-measure spending. Individual hospital systems (Kaiser, Sutter, Cedars-Sinai) bargain directly. Kaiser pre-empted SB 525 with a Coalition of Kaiser Permanente Unions agreement that mirrored the law.",
    },
    {
      title: "Strike Activity",
      color: "#F472B6",
      badge: "2023–24 wave",
      body:
        "California saw the largest strike wave in 40 years: Kaiser caregivers (75K workers, Oct 2023), UAW autoworkers, SAG-AFTRA, WGA, UPS, fast-food council formation, hotel workers, healthcare workers across multiple systems. Each settlement set precedent and fed back into the next bargaining cycle. CNA's nurse strikes against Kaiser, Sutter, and Stanford in 2024–25 directly informed staffing-ratio legislation.",
    },
    {
      title: "What Survives Janus",
      color: "#FB7185",
      badge: "Public-sector",
      body:
        "Janus v. AFSCME (2018) ended mandatory agency fees for public-sector workers. Membership in CA public-sector unions dipped briefly but recovered — partly because the unions invested heavily in member retention infrastructure. Private-sector unions are unaffected by Janus. The post-Janus reality is that political clout depends on engagement, not compulsion — and CA unions have generally cleared that bar.",
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

  const LocalsTooltip = ({ active, payload }) => {
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
        <div style={{ color: "#94A3B8" }}>{p.payload.local}</div>
        <div style={{ marginTop: 2, color: "#F8FAFC", fontWeight: 600 }}>
          {p.value}K members
        </div>
      </div>
    );
  };

  const DuesTooltip = ({ active, payload }) => {
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
        <div style={{ color: "#94A3B8" }}>SEIU Local 2015 dues, {p.payload.year}</div>
        <div style={{ marginTop: 2, color: "#F8FAFC", fontWeight: 600 }}>
          ${p.value}M
        </div>
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
              "linear-gradient(135deg, rgba(255,107,107,0.18) 0%, rgba(251,191,36,0.10) 30%, rgba(15,23,42,0) 70%)",
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
              Labor & Power
            </h1>
            <p
              style={{
                marginTop: 12,
                color: "#CBD5E1",
                fontSize: 17,
                maxWidth: 640,
              }}
            >
              How California's 2-million-member labor movement shapes wage law,
              healthcare costs, and the legislative agenda — and the
              self-reinforcing loop between mandated raises and union dues.
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
            label="SEIU CA Members"
            value="750K"
            sub="Across long-term care, healthcare, public, property"
            valueColor="#FF6B6B"
          />
          <StatCard
            label="2024 Political Spend"
            value="$200M"
            sub="SEIU national election investment"
            valueColor="#FBBF24"
          />
          <StatCard
            label="Dues Growth"
            value="+22%"
            sub="SEIU Local 2015, 2022 → 2024"
            valueColor="#FB923C"
          />
          <StatCard
            label="On Representation"
            value="16%"
            sub="Share of Local 2015 spending categorized as such"
            valueColor="#A78BFA"
          />
        </div>

        {/* ---------- THE FRAME ---------- */}
        <section style={{ marginBottom: 48 }}>
          <SectionHeader
            title="Why This Matters for Policy"
            subtitle="Unions are not just a stakeholder — they are a structural force in CA legislation."
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
              California organized labor is unusually concentrated in three
              sectors that touch state spending directly:{" "}
              <span style={{ color: "#F8FAFC", fontWeight: 600 }}>healthcare</span>{" "}
              (Medi-Cal reimbursement, hospital regulation),{" "}
              <span style={{ color: "#F8FAFC", fontWeight: 600 }}>public employees</span>{" "}
              (state and county payrolls), and{" "}
              <span style={{ color: "#F8FAFC", fontWeight: 600 }}>long-term care</span>{" "}
              (the $28.5B IHSS program). When wages rise in any of these sectors,
              union dues rise mechanically — and the political budget that funds
              the next campaign rises with them.
            </p>
            <p style={{ marginTop: 12, color: "#94A3B8", fontSize: 13 }}>
              This is not a conspiracy claim. It's a structural observation.
              SB 525 (healthcare $25 floor) and AB 1228 (fast-food $20) were both
              SEIU priority bills. Both produced wage increases for workers and
              dues increases for the unions that organized them. The same dynamic
              is visible in Oregon, Illinois, and New York labor markets.
            </p>
          </div>
        </section>

        {/* ---------- LOCALS CHART ---------- */}
        <section style={{ marginBottom: 48 }}>
          <SectionHeader
            title="The Major California Locals"
            subtitle="Membership by SEIU local. Most are healthcare or public-sector."
          />
          <div
            style={{
              borderRadius: 12,
              border: "1px solid #334155",
              background: "#1E293B",
              padding: 16,
            }}
          >
            <div style={{ height: 340, width: "100%" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={seiuLocals}
                  margin={{ top: 24, right: 12, left: 12, bottom: 30 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#334155"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="local"
                    tick={{ fill: "#94A3B8", fontSize: 10 }}
                    tickLine={false}
                    axisLine={{ stroke: "#334155" }}
                    interval={0}
                  />
                  <YAxis
                    tick={{ fill: "#94A3B8", fontSize: 11 }}
                    tickLine={false}
                    axisLine={{ stroke: "#334155" }}
                    tickFormatter={(v) => `${v}K`}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(148,163,184,0.08)" }}
                    content={<LocalsTooltip />}
                  />
                  <Bar dataKey="members" radius={[4, 4, 0, 0]}>
                    {seiuLocals.map((d, i) => (
                      <Cell key={i} fill={d.color} />
                    ))}
                    <LabelList
                      dataKey="members"
                      position="top"
                      fill="#E2E8F0"
                      fontSize={12}
                      formatter={(v) => `${v}K`}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p style={{ color: "#64748B", fontSize: 12, marginTop: 12, paddingLeft: 8 }}>
              Note: Local 2015 figure includes ~254K covered-but-non-paying workers
              who opted out post-Harris v. Quinn (2014).
            </p>
          </div>
        </section>

        {/* ---------- DUES GROWTH CHART ---------- */}
        <section style={{ marginBottom: 48 }}>
          <SectionHeader
            title="The Wage-Dues Loop"
            subtitle="SEIU Local 2015 dues revenue tracking the SB 525 phase-in."
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
                  data={dueGrowth}
                  margin={{ top: 24, right: 12, left: 12, bottom: 30 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#334155"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="year"
                    tick={{ fill: "#94A3B8", fontSize: 11 }}
                    tickLine={false}
                    axisLine={{ stroke: "#334155" }}
                  />
                  <YAxis
                    tick={{ fill: "#94A3B8", fontSize: 11 }}
                    tickLine={false}
                    axisLine={{ stroke: "#334155" }}
                    tickFormatter={(v) => `$${v}M`}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(148,163,184,0.08)" }}
                    content={<DuesTooltip />}
                  />
                  <Bar dataKey="dues" radius={[4, 4, 0, 0]}>
                    {dueGrowth.map((d, i) => (
                      <Cell key={i} fill={d.color} />
                    ))}
                    <LabelList
                      dataKey="dues"
                      position="top"
                      fill="#E2E8F0"
                      fontSize={12}
                      formatter={(v) => `$${v}M`}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p style={{ color: "#64748B", fontSize: 12, marginTop: 12, paddingLeft: 8 }}>
              SB 525 was signed October 2023; first wage step took effect October
              2024. Dues are pegged to wages, so each mandated raise auto-increases
              union revenue.
            </p>
          </div>
        </section>

        {/* ---------- THEMES ---------- */}
        <section style={{ marginBottom: 48 }}>
          <SectionHeader
            title="Eight Threads"
            subtitle="Membership, money, mechanism, and the limits of the model."
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

        {/* ---------- THE TWO FRAMES ---------- */}
        <section style={{ marginBottom: 48 }}>
          <SectionHeader
            title="Two Honest Frames"
            subtitle="Both are defensible; both are partial."
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
                THE LABOR FRAME
              </div>
              <p style={{ color: "#CBD5E1", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                Without organized labor, low-wage workers in healthcare and
                long-term care would have no counterweight to consolidated hospital
                systems and corporate ownership. Wages have stagnated where unions
                are weak. The political activity is the price of having any voice
                at all when the other side is a $11B/year hospital industry with
                $1M+ CEO compensation.
              </p>
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
                THE CRITIC FRAME
              </div>
              <p style={{ color: "#CBD5E1", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                When 16% of dues actually fund representation and 40%+ flows to
                politics and national HQ, the union has become its own
                stakeholder. The wage-dues feedback loop creates an incentive to
                pursue mandates regardless of whether they're affordable. IHSS
                family caregivers being defaulted into a union they didn't choose
                is a real democratic problem.
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
              California organized labor is a{" "}
              <span style={{ color: "#F8FAFC", fontWeight: 600 }}>
                structural participant in policy, not merely a lobby
              </span>
              . It writes wage law, sponsors ballot initiatives, defaults workers
              into membership, and uses dues revenue to fund the next campaign.
              The mechanism is legal, transparent in LM-2 filings, and sets it
              apart from any other California interest group in scale and
              durability.
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
              The honest debate isn't whether unions matter — they obviously do —
              but whether the current arrangement (automatic dues, defaulted
              membership for IHSS caregivers, 16% representation share, ballot
              initiatives funded by mandate-driven dues growth) is what voters
              would design from scratch. The 2026 CHA-sponsored disclosure
              initiative is the first serious test of that question in years.
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
          <span style={{ color: "#94A3B8", fontWeight: 600 }}>Sources.</span> SEIU
          Local 2015 LM-2 filing (2024); SEIU California; OpenSecrets SEIU profile
          (2024 cycle); Ballotpedia SEIU and California 2026 ballot propositions;
          California Policy Center; Americans for Fair Treatment LM-2 analysis;
          Harris v. Quinn (2014); Janus v. AFSCME (2018); California Hospital
          Association; Federal Election Commission filings; UC Berkeley Labor
          Center.
        </div>
      </div>
    </div>
  );
}
