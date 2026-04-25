import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

const SERIF = "'Playfair Display', Georgia, serif";

export default function StateGovernmentSection() {
  const tabs = [
    { id: "structure", label: "Structure" },
    { id: "supermajority", label: "Supermajority Rules" },
    { id: "propositions", label: "The Proposition Game" },
    { id: "money", label: "Money in Politics" },
    { id: "calendar", label: "Legislative Calendar" },
    { id: "honest", label: "Honest Assessment" },
  ];

  const [tab, setTab] = useState(tabs[0].id);

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
          fontSize: 44,
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

  const ContentCard = ({ children }) => (
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
      {children}
    </div>
  );

  const SimpleTooltip = ({ active, payload, label, suffix = "" }) => {
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
        <div style={{ color: "#94A3B8" }}>{label || p.payload.label}</div>
        <div style={{ marginTop: 2, color: "#F8FAFC", fontWeight: 600 }}>
          {p.value.toLocaleString()}
          {suffix}
        </div>
      </div>
    );
  };

  // ============== STRUCTURE TAB ==============
  const StructurePanel = () => (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <StatCard label="Senate Seats" value="40" sub="4-year terms, half elected every 2 yrs" valueColor="#60A5FA" />
        <StatCard label="Assembly Seats" value="80" sub="2-year terms" valueColor="#FBBF24" />
        <StatCard label="Term Limit" value="12 yrs" sub="Total in legislature, any combo" valueColor="#FB923C" />
        <StatCard label="Dem Supermajority" value="Both" sub="Houses since 2018" valueColor="#A78BFA" />
      </div>

      <SectionHeader
        title="The Three Branches"
        subtitle="California's structure mirrors the federal system, with crucial twists."
      />
      <ContentCard>
        <p style={{ margin: 0 }}>
          California has the standard three-branch structure: a bicameral{" "}
          <span style={{ color: "#F8FAFC", fontWeight: 600 }}>Legislature</span>{" "}
          (40-seat Senate + 80-seat Assembly), a{" "}
          <span style={{ color: "#F8FAFC", fontWeight: 600 }}>Governor</span>{" "}
          with veto power, and a{" "}
          <span style={{ color: "#F8FAFC", fontWeight: 600 }}>Judiciary</span>{" "}
          headed by a 7-member Supreme Court appointed by the governor and confirmed
          by voters.
        </p>
        <p style={{ marginTop: 12 }}>
          The crucial twist: California has{" "}
          <span style={{ color: "#FBBF24", fontWeight: 600 }}>direct democracy</span>{" "}
          baked into the constitution since 1911. Voters can pass laws (initiative),
          repeal laws (referendum), and remove officials (recall) without legislative
          consent. This effectively makes the electorate a fourth branch with veto
          power over the other three.
        </p>
        <p style={{ marginTop: 12, color: "#94A3B8", fontSize: 13 }}>
          Term limits, set by Prop 140 (1990) and modified by Prop 28 (2012), cap
          legislators at 12 years total — any combination of Senate and Assembly.
          The pre-2012 limits (6 years Assembly / 8 years Senate) caused chronic
          turnover that critics argue weakened the legislature relative to lobbyists
          and staff. The 2012 reform let legislators stay in one chamber longer.
        </p>
      </ContentCard>
    </>
  );

  // ============== SUPERMAJORITY TAB ==============
  const supermajorityActions = [
    { action: "Pass annual budget", threshold: "Simple majority", color: "#2DD4BF", note: "Reduced from ⅔ by Prop 25 (2010)" },
    { action: "Raise any state tax", threshold: "Two-thirds (⅔)", color: "#FB7185", note: "Prop 13 (1978), expanded by Prop 26 (2010)" },
    { action: "Pass general statute", threshold: "Simple majority", color: "#2DD4BF", note: "Standard bills" },
    { action: "Refer constitutional amend.", threshold: "Two-thirds (⅔)", color: "#FB7185", note: "54 Assembly + 27 Senate votes" },
    { action: "Issue state bonds", threshold: "Two-thirds + voter approval", color: "#FBBF24", note: "Plus governor signature" },
    { action: "Override governor veto", threshold: "Two-thirds (⅔)", color: "#FB7185", note: "Rare in modern era" },
    { action: "Approve emergency rules", threshold: "Two-thirds (⅔)", color: "#FB7185", note: "Urgency clause" },
    { action: "Local special tax (citizen)", threshold: "Simple majority", color: "#2DD4BF", note: "Per Cannabis Coalition v. Upland (2017)" },
    { action: "Local special tax (council)", threshold: "Two-thirds (⅔)", color: "#FB7185", note: "Prop 218 (1996)" },
  ];

  const SupermajorityPanel = () => (
    <>
      <SectionHeader
        title="What Needs Two-Thirds"
        subtitle="The supermajority maze that shapes everything Sacramento can and can't do."
      />
      <ContentCard>
        <p style={{ margin: 0 }}>
          California is one of just{" "}
          <span style={{ color: "#F8FAFC", fontWeight: 600 }}>11 states</span>{" "}
          requiring a supermajority to raise any state tax, and one of three
          requiring it for the budget (until Prop 25 in 2010 reduced budgets to
          simple majority). Layered on top: Prop 13's tax-vote requirements, Prop
          218's local-tax restrictions, and various ballot-imposed mandates that
          can only be modified by a return to the ballot.
        </p>
        <p style={{ marginTop: 12 }}>
          Democrats currently hold supermajorities in both chambers. In theory
          this means the legislature can pass anything. In practice, the
          ⅔-of-each-chamber requirement still binds because it gives even small
          intra-party factions effective veto power on tax and constitutional
          questions.
        </p>
      </ContentCard>

      <div style={{ marginTop: 32 }}>
        <SectionHeader
          title="Vote Thresholds by Action"
          subtitle="What kind of majority does each legislative action actually require?"
        />
        <div
          style={{
            borderRadius: 12,
            border: "1px solid #334155",
            background: "#1E293B",
            padding: 24,
          }}
        >
          {supermajorityActions.map((a, i) => (
            <div
              key={i}
              style={{
                paddingTop: i === 0 ? 0 : 14,
                paddingBottom: i === supermajorityActions.length - 1 ? 0 : 14,
                borderTop: i === 0 ? "none" : "1px solid #334155",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "8px 16px",
              }}
            >
              <div style={{ flex: "1 1 240px", color: "#E2E8F0", fontSize: 14, fontWeight: 500 }}>
                {a.action}
              </div>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.04em",
                  padding: "3px 10px",
                  borderRadius: 4,
                  backgroundColor: `${a.color}20`,
                  color: a.color,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                {a.threshold}
              </div>
              <div style={{ flex: "1 1 100%", color: "#64748B", fontSize: 12, fontStyle: "italic" }}>
                {a.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  // ============== PROPOSITIONS TAB ==============
  const propData = [
    { type: "Legislative referrals", count: 863, approved: 596, color: "#60A5FA" },
    { type: "Citizen initiatives", count: 444, approved: 157, color: "#FBBF24" },
  ];

  const propTrend = [
    { decade: "1910s", count: 30 },
    { decade: "1920s", count: 35 },
    { decade: "1970s", count: 90 },
    { decade: "1980s", count: 105 },
    { decade: "1990s", count: 130 },
    { decade: "2000s", count: 95 },
    { decade: "2010s", count: 80 },
    { decade: "2020s", count: 45 },
  ];

  const PropositionsPanel = () => (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <StatCard label="Total Since 1910" value="1,307" sub="Statewide measures decided" valueColor="#FBBF24" />
        <StatCard label="Pass Rate" value="57.6%" sub="753 approved, 554 rejected" valueColor="#2DD4BF" />
        <StatCard label="Initiatives Need" value="546K" sub="Valid signatures (5% of last gov vote)" valueColor="#FB923C" />
        <StatCard label="2026 Qualified" value="3+" sub="As of April 2026" valueColor="#A78BFA" />
      </div>

      <SectionHeader
        title="Two Paths to the Ballot"
        subtitle="Citizens propose; the Legislature also refers — at very different rates."
      />
      <div
        style={{
          borderRadius: 12,
          border: "1px solid #334155",
          background: "#1E293B",
          padding: 16,
          marginBottom: 32,
        }}
      >
        <div style={{ height: 280, width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={propData}
              margin={{ top: 24, right: 12, left: 12, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis
                dataKey="type"
                tick={{ fill: "#94A3B8", fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#334155" }}
              />
              <YAxis
                tick={{ fill: "#94A3B8", fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: "#334155" }}
              />
              <Tooltip
                cursor={{ fill: "rgba(148,163,184,0.08)" }}
                content={
                  <SimpleTooltip />
                }
              />
              <Bar dataKey="count" name="Total" fill="#60A5FA" radius={[4, 4, 0, 0]}>
                <LabelList
                  dataKey="count"
                  position="top"
                  fill="#E2E8F0"
                  fontSize={12}
                />
              </Bar>
              <Bar dataKey="approved" name="Approved" fill="#2DD4BF" radius={[4, 4, 0, 0]}>
                <LabelList
                  dataKey="approved"
                  position="top"
                  fill="#E2E8F0"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p style={{ color: "#64748B", fontSize: 12, marginTop: 12, paddingLeft: 8 }}>
          Legislative referrals pass 69% of the time. Citizen initiatives pass 36%
          of the time. Voters trust their elected officials more than themselves —
          or distrust strangers' initiatives.
        </p>
      </div>

      <SectionHeader
        title="How a Citizen Initiative Qualifies"
        subtitle="The four-step gauntlet that turns an idea into a ballot question."
      />
      <ContentCard>
        <p style={{ margin: 0 }}>
          <span style={{ color: "#FBBF24", fontWeight: 600 }}>1. File</span> with the
          Attorney General. The AG prepares the official ballot title and 100-word
          summary. The Legislative Analyst writes a fiscal-impact estimate. There's
          a 30-day public comment window.
        </p>
        <p style={{ marginTop: 10 }}>
          <span style={{ color: "#FBBF24", fontWeight: 600 }}>2. Collect signatures.</span>{" "}
          Statute initiative: 546,651 valid signatures (5% of last governor's race).
          Constitutional amendment: 874,641 (8%). 150-day window. Filing fee: $2,000
          (refunded if it qualifies).
        </p>
        <p style={{ marginTop: 10 }}>
          <span style={{ color: "#FBBF24", fontWeight: 600 }}>3. County validation.</span>{" "}
          County clerks verify a random sample. The Secretary of State certifies.
          The Legislature gets 30 days to hold hearings (but cannot amend the
          measure).
        </p>
        <p style={{ marginTop: 10 }}>
          <span style={{ color: "#FBBF24", fontWeight: 600 }}>4. November ballot.</span>{" "}
          Per SB 202 (2011), all citizen initiatives appear on November general
          election ballots only — never primaries or specials. Simple majority of
          votes cast on the measure passes it.
        </p>
        <p style={{ marginTop: 12, color: "#94A3B8", fontSize: 13, paddingTop: 12, borderTop: "1px solid #334155" }}>
          A passed initiative becomes statute (or constitutional text) immediately.
          The Legislature cannot amend it without returning to the ballot — unless
          the initiative includes a clause waiving that protection. This is why
          well-funded interests prefer the initiative route: it locks the policy
          in.
        </p>
      </ContentCard>
    </>
  );

  // ============== MONEY TAB ==============
  const topSpenders = [
    { entity: "SEIU (state + locals)", spend: 35.4, color: "#FF6B6B" },
    { entity: "California Teachers Assn", spend: 28, color: "#FB923C" },
    { entity: "California Hospital Assn", spend: 22, color: "#FBBF24" },
    { entity: "Realtors / building trades", spend: 18, color: "#2DD4BF" },
    { entity: "Tribal gaming", spend: 16, color: "#60A5FA" },
    { entity: "Tech / venture", spend: 14, color: "#A78BFA" },
  ];

  const MoneyPanel = () => (
    <>
      <SectionHeader
        title="Who Funds California Politics"
        subtitle="Top organizational political spenders, 2024 cycle (federal + state, $ millions)."
      />
      <div
        style={{
          borderRadius: 12,
          border: "1px solid #334155",
          background: "#1E293B",
          padding: 16,
          marginBottom: 32,
        }}
      >
        <div style={{ height: 340, width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={topSpenders}
              margin={{ top: 24, right: 12, left: 12, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis
                dataKey="entity"
                tick={{ fill: "#94A3B8", fontSize: 10 }}
                tickLine={false}
                axisLine={{ stroke: "#334155" }}
                interval={0}
              />
              <YAxis
                tick={{ fill: "#94A3B8", fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: "#334155" }}
                tickFormatter={(v) => `$${v}M`}
              />
              <Tooltip
                cursor={{ fill: "rgba(148,163,184,0.08)" }}
                content={<SimpleTooltip suffix="M" />}
              />
              <Bar dataKey="spend" radius={[4, 4, 0, 0]}>
                {topSpenders.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
                <LabelList
                  dataKey="spend"
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
          Direct organizational political contributions only. Excludes individual
          donors and dark-money 501(c)(4) flows.
        </p>
      </div>

      <SectionHeader
        title="The Money Flow"
        subtitle="Where political spending actually goes in California."
      />
      <ContentCard>
        <p style={{ margin: 0 }}>
          Three channels matter:{" "}
          <span style={{ color: "#F8FAFC", fontWeight: 600 }}>direct candidate contributions</span>{" "}
          (capped per cycle, traceable),{" "}
          <span style={{ color: "#F8FAFC", fontWeight: 600 }}>independent expenditures</span>{" "}
          (uncapped, can't coordinate with candidate, also traceable), and{" "}
          <span style={{ color: "#F8FAFC", fontWeight: 600 }}>ballot-measure committees</span>{" "}
          (uncapped, the largest single channel for big-money interests because
          there's no candidate cap to navigate).
        </p>
        <p style={{ marginTop: 12, color: "#94A3B8", fontSize: 13 }}>
          California is one of the more transparent states — Cal-Access (the
          Secretary of State's database) requires disclosure of donors above $100,
          and the Fair Political Practices Commission enforces. The "dark money"
          problem comes from federal 501(c)(4) organizations that can spend without
          donor disclosure, which is governed by federal law and outside CA's
          control.
        </p>
        <p style={{ marginTop: 12, color: "#94A3B8", fontSize: 13 }}>
          Public financing for state and local campaigns is on the November 2026
          ballot as a legislatively referred measure. It would authorize (not
          require) governments to set up public-financing programs with spending
          limits and eligibility rules.
        </p>
      </ContentCard>
    </>
  );

  // ============== CALENDAR TAB ==============
  const CalendarPanel = () => (
    <>
      <SectionHeader
        title="The Two-Year Session"
        subtitle="How a bill actually moves from idea to law in Sacramento."
      />
      <ContentCard>
        <p style={{ margin: 0 }}>
          California operates on a{" "}
          <span style={{ color: "#FBBF24", fontWeight: 600 }}>2-year legislative session</span>.
          Bills introduced in odd years can carry into even years. Bills not
          enacted by the end of the second year die.
        </p>
        <p style={{ marginTop: 12 }}>
          <span style={{ color: "#F8FAFC", fontWeight: 600 }}>January</span> — Session
          convenes. Governor delivers State of the State and submits proposed
          budget. Bill introduction begins.
        </p>
        <p style={{ marginTop: 8 }}>
          <span style={{ color: "#F8FAFC", fontWeight: 600 }}>February–April</span> —
          Policy committee hearings. Most bills die here. Committee chairs
          (selected by the majority leadership) have enormous power.
        </p>
        <p style={{ marginTop: 8 }}>
          <span style={{ color: "#F8FAFC", fontWeight: 600 }}>May</span> — May
          Revision (governor's updated budget proposal). Appropriations committees
          begin. Bills with fiscal impact must clear here.
        </p>
        <p style={{ marginTop: 8 }}>
          <span style={{ color: "#F8FAFC", fontWeight: 600 }}>June 15</span> —
          Constitutional deadline for the legislature to pass a budget bill.
          Originally a hard deadline (legislators forfeited pay if missed, per
          Prop 25); now usually met with placeholder legislation.
        </p>
        <p style={{ marginTop: 8 }}>
          <span style={{ color: "#F8FAFC", fontWeight: 600 }}>July–August</span> —
          Floor sessions. Bills move between chambers. Conference committees
          reconcile differences.
        </p>
        <p style={{ marginTop: 8 }}>
          <span style={{ color: "#F8FAFC", fontWeight: 600 }}>September 30</span> —
          Last day for the governor to sign or veto bills passed in the session.
          Vetoes can be overridden by ⅔ of each chamber but rarely are.
        </p>
        <p style={{ marginTop: 12, color: "#94A3B8", fontSize: 13, paddingTop: 12, borderTop: "1px solid #334155" }}>
          The compressed window — most action in 6 months of a 24-month session —
          is why end-of-session bill stacking happens. Hundreds of bills can clear
          in the final two weeks of August. The "gut and amend" tactic (replacing
          a bill's content entirely at the last minute) bypasses normal committee
          review and is a perennial reform target.
        </p>
      </ContentCard>
    </>
  );

  // ============== HONEST ASSESSMENT TAB ==============
  const HonestPanel = () => (
    <>
      <SectionHeader
        title="Honest Assessment"
        subtitle="What California's system gets right and where it breaks down."
      />

      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            color: "#5EEAD4",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.04em",
            marginBottom: 12,
          }}
        >
          What California gets right:
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 12,
          }}
        >
          {[
            "Direct democracy — voters can override the Legislature on issues it won't touch",
            "Disclosure regime is among the strongest in the US (Cal-Access, FPPC)",
            "Independent redistricting commission since 2008 (Prop 11)",
            "Open primaries (top-two, Prop 14) reduce extreme partisan capture",
            "Robust LAO fiscal analysis on every bill and ballot measure",
            "Public hearings and stakeholder input on most major legislation",
          ].map((item, i) => (
            <div
              key={i}
              style={{
                borderRadius: 8,
                border: "1px solid rgba(45,212,191,0.30)",
                background: "rgba(45,212,191,0.04)",
                padding: "12px 14px",
                color: "#CBD5E1",
                fontSize: 13,
                lineHeight: 1.5,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            color: "#FDA4AF",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.04em",
            marginBottom: 12,
          }}
        >
          What California gets wrong:
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 12,
          }}
        >
          {[
            "Layered supermajority rules make the constitution nearly impossible to clean up",
            "Initiative process favors well-funded interests who can pay $5–10M for signature gathering",
            "Term limits empty institutional memory — lobbyists and staff outlast legislators",
            "End-of-session 'gut and amend' bypasses committee review on major bills",
            "One-party dominance reduces real intra-legislative debate",
            "Once an initiative passes, it's locked unless voters return to the ballot",
          ].map((item, i) => (
            <div
              key={i}
              style={{
                borderRadius: 8,
                border: "1px solid rgba(255,107,107,0.30)",
                background: "rgba(255,107,107,0.04)",
                padding: "12px 14px",
                color: "#CBD5E1",
                fontSize: 13,
                lineHeight: 1.5,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

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
          California's government is{" "}
          <span style={{ color: "#F8FAFC", fontWeight: 600 }}>
            unusually transparent and unusually constrained at the same time
          </span>
          . The disclosure infrastructure is excellent. The structural
          constraints — supermajority requirements layered with constitutional
          initiatives that themselves require ballot-level supermajorities to
          modify — make even broadly supported reform extraordinarily difficult
          to enact.
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
          The result is a state where progressive priorities pass through
          legislative supermajority and conservative priorities pass through
          ballot initiative — and where neither side fully trusts the other to
          govern. That's not necessarily dysfunction. It's the design Hiram
          Johnson set up in 1911 working as intended, in a state his Progressive
          Era reformers couldn't have imagined.
        </p>
      </div>
    </>
  );

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
            marginBottom: 32,
            borderBottom: "2px solid #FBBF24",
            background:
              "linear-gradient(135deg, rgba(96,165,250,0.18) 0%, rgba(167,139,250,0.10) 30%, rgba(15,23,42,0) 70%)",
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
              How California Actually Governs
            </h1>
            <p
              style={{
                marginTop: 12,
                color: "#CBD5E1",
                fontSize: 17,
                maxWidth: 640,
              }}
            >
              Supermajority rules, the proposition system, money flows, and the
              compressed legislative calendar. Why even popular reforms struggle
              to pass — and why some pass anyway.
            </p>
          </div>
        </header>

        {/* ---------- TAB NAV ---------- */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 32,
            borderBottom: "1px solid #334155",
            marginBottom: 32,
          }}
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                background: "transparent",
                border: "none",
                padding: "12px 4px",
                color: tab === t.id ? "#F8FAFC" : "#94A3B8",
                fontWeight: tab === t.id ? 600 : 400,
                fontSize: 15,
                cursor: "pointer",
                borderBottom: tab === t.id ? "2px solid #60A5FA" : "2px solid transparent",
                marginBottom: -1,
                fontFamily: "inherit",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ---------- TAB PANELS ---------- */}
        {tab === "structure" && <StructurePanel />}
        {tab === "supermajority" && <SupermajorityPanel />}
        {tab === "propositions" && <PropositionsPanel />}
        {tab === "money" && <MoneyPanel />}
        {tab === "calendar" && <CalendarPanel />}
        {tab === "honest" && <HonestPanel />}

        {/* ---------- SOURCE LINE ---------- */}
        <div
          style={{
            color: "#64748B",
            fontSize: 12,
            lineHeight: 1.6,
            borderTop: "1px solid #334155",
            paddingTop: 20,
            marginTop: 48,
          }}
        >
          <span style={{ color: "#94A3B8", fontWeight: 600 }}>Sources.</span>{" "}
          California Constitution; California Secretary of State Cal-Access;
          Ballotpedia (CA propositions, initiative process, ACA 13);
          California Budget & Policy Center; Legislative Analyst's Office;
          California Department of Finance; Fair Political Practices Commission;
          OpenSecrets; National Conference of State Legislatures.
        </div>
      </div>
    </div>
  );
}
