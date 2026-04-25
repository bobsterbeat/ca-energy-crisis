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

export default function FastFoodWageSection() {
  // ---- Data ----
  const employmentData = [
    { label: "Reich (Berkeley)", value: 0, color: "#2DD4BF" },
    { label: "Schneider (Harvard-UCSF)", value: 0, color: "#60A5FA" },
    { label: "Clemens (NBER)", value: -18000, color: "#FF6B6B" },
    { label: "EPI / BLS QCEW", value: -19102, color: "#FB923C" },
  ];

  const priceData = [
    { label: "Reich (Apr '26)", value: 1.5, color: "#2DD4BF" },
    { label: "Reich (Oct '24)", value: 3.7, color: "#60A5FA" },
    { label: "Owen (UCSC)", value: 10, color: "#FBBF24" },
    { label: "BRG / Datassential", value: 14.5, color: "#FF6B6B" },
  ];

  const studies = [
    {
      name: "Reich (UC Berkeley)",
      color: "#2DD4BF",
      badge: "No job loss",
      method:
        "Glassdoor + Square payroll, Advan cell-phone proximity (4-hr stay = worker), DoorDash prices.",
      finding: "Wages +11%. Employment unchanged. Prices +1.5%.",
      flaw: "GPS proxy mistakes lingerers and delivery drivers for staff; geofencing imprecise in strip malls.",
    },
    {
      name: "Schneider (Harvard / UCSF)",
      color: "#60A5FA",
      badge: "No benefit cuts",
      method:
        "Survey of 3,420 CA fast-food workers vs. 6,194 CA retail and 14,416 out-of-state controls.",
      finding:
        "Share earning <$20/hr fell 60+ pp. No reductions in hours, scheduling, or benefits.",
      flaw: "Captures incumbents only — by design misses workers who lost jobs and exited.",
    },
    {
      name: "Clemens et al. (NBER)",
      color: "#FF6B6B",
      badge: "−18,000 jobs",
      method:
        "BLS QCEW administrative payroll data (95% of US jobs). Difference-in-differences vs. rest of US.",
      finding:
        "CA fast-food employment −2.7% to −3.9% vs. counterfactual. Implied elasticity −0.09 to −0.16.",
      flaw: "NAICS 722513 includes restaurants not covered by AB 1228; elasticities at upper end of literature.",
    },
    {
      name: "Employment Policies Institute",
      color: "#FB923C",
      badge: "−250 hrs / worker",
      method:
        "Self-reported survey of 182 operators (Jul 2024) + CPS-ORG hours analysis + ongoing QCEW tracking.",
      finding:
        "98% raised prices, 89% cut hours, 73% cut OT. Median worker −5 hrs/wk (~$4,000/yr).",
      flaw: "Industry-funded (Berman & Co.); operator survey non-random and self-selected.",
    },
    {
      name: "Berkeley Research Group",
      color: "#F472B6",
      badge: "+14.5% prices",
      method:
        "Datassential menu price data, Sep 2023 → Oct 2024. Industry consultancy, not academic.",
      finding:
        "CA fast-food prices rose ~2× the national average over the comparison window.",
      flaw: "Not peer-reviewed; baseline window includes pre-implementation moves and food inflation.",
    },
    {
      name: "Owen (UC Santa Cruz)",
      color: "#FBBF24",
      badge: "Automation up",
      method:
        "Interviews with 100+ franchise owners/managers + financial and hiring records review.",
      finding:
        "21% shift-work decline at one Burger King group; 12% labor-hour drop across 18 McDonald's. Prices +8–12%.",
      flaw: "Qualitative-heavy, no formal control group; sector automation predates AB 1228.",
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
        padding: "20px",
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

  const ChartTooltip = ({ active, payload, suffix = "" }) => {
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
        <div style={{ marginTop: 2, color: "#F8FAFC", fontWeight: 600 }}>
          {p.value.toLocaleString()}
          {suffix}
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
              "linear-gradient(135deg, rgba(255,107,107,0.18) 0%, rgba(251,146,60,0.10) 30%, rgba(15,23,42,0) 70%)",
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
              The $20 Fast-Food Wage
            </h1>
            <p
              style={{
                marginTop: 12,
                color: "#CBD5E1",
                fontSize: 17,
                maxWidth: 640,
              }}
            >
              Two years in. Six major studies. Two opposing narratives. Here's
              what the evidence actually supports.
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
            label="Wage Floor"
            value="$20.00"
            sub="Hourly minimum since Apr 1, 2024"
            valueColor="#FF6B6B"
          />
          <StatCard
            label="Workers Covered"
            value="~525K"
            sub="At chains with 60+ locations"
            valueColor="#FBBF24"
          />
          <StatCard
            label="Wage Jump"
            value="+25%"
            sub="From the prior $16 floor"
            valueColor="#FB923C"
          />
          <StatCard
            label="Jobs Lost (Est.)"
            value="~18K"
            sub="NBER counterfactual estimate"
            valueColor="#A78BFA"
          />
        </div>

        {/* ---------- THE LAW ---------- */}
        <section style={{ marginBottom: 48 }}>
          <SectionHeader
            title="The Law in Brief"
            subtitle="AB 1228 — signed Sep 2023, effective Apr 2024."
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
              AB 1228 set a{" "}
              <span style={{ color: "#F8FAFC", fontWeight: 600 }}>$20/hour</span>{" "}
              floor for limited-service restaurants in chains with 60+ locations
              nationwide — roughly{" "}
              <span style={{ color: "#F8FAFC", fontWeight: 600 }}>525,000 workers</span>{" "}
              at ~30,000 establishments. A Fast Food Council can adjust the rate
              annually (capped at the lower of 3.5% or CPI). No 2026 increase has
              been enacted; a discussed 70-cent COLA bump has stalled since the
              council chair resigned mid-2025.
            </p>
            <p style={{ marginTop: 12, color: "#94A3B8", fontSize: 13 }}>
              <span style={{ color: "#CBD5E1", fontWeight: 500 }}>Exempt:</span>{" "}
              bakeries producing on-site stand-alone bread items (as of Sep 15,
              2023); restaurants in airports, hotels, event centers, theme parks,
              schools, museums, and gambling establishments. Cities cannot set
              higher fast-food-only minimums.
            </p>
          </div>
        </section>

        {/* ---------- EMPLOYMENT CHART ---------- */}
        <section style={{ marginBottom: 48 }}>
          <SectionHeader
            title="Employment Effect by Study"
            subtitle="Net jobs vs. counterfactual. Same law, very different numbers."
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
                  data={employmentData}
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
                    tickFormatter={(v) => (v === 0 ? "0" : `${v / 1000}K`)}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(148,163,184,0.08)" }}
                    content={<ChartTooltip />}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {employmentData.map((d, i) => (
                      <Cell key={i} fill={d.color} />
                    ))}
                    <LabelList
                      dataKey="value"
                      position="top"
                      fill="#E2E8F0"
                      fontSize={12}
                      formatter={(v) => (v === 0 ? "0" : v.toLocaleString())}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* ---------- PRICE CHART ---------- */}
        <section style={{ marginBottom: 48 }}>
          <SectionHeader
            title="Menu Price Effect by Study"
            subtitle="Reported price increases for fast-food menu items, percent."
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
                  data={priceData}
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
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(148,163,184,0.08)" }}
                    content={<ChartTooltip suffix="%" />}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {priceData.map((d, i) => (
                      <Cell key={i} fill={d.color} />
                    ))}
                    <LabelList
                      dataKey="value"
                      position="top"
                      fill="#E2E8F0"
                      fontSize={12}
                      formatter={(v) => `${v}%`}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p style={{ color: "#64748B", fontSize: 12, marginTop: 12, paddingLeft: 8 }}>
              Note: Owen (UCSC) reported a range of 8–12%; midpoint shown.
            </p>
          </div>
        </section>

        {/* ---------- STUDY CARDS ---------- */}
        <section style={{ marginBottom: 48 }}>
          <SectionHeader
            title="The Studies, Side by Side"
            subtitle="Method, finding, and the most defensible critique of each."
          />
          <div
            style={{
              borderRadius: 12,
              border: "1px solid #334155",
              background: "#1E293B",
              padding: 24,
            }}
          >
            {studies.map((s, i) => (
              <div
                key={i}
                style={{
                  paddingTop: i === 0 ? 0 : 20,
                  paddingBottom: i === studies.length - 1 ? 0 : 20,
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
                      color: s.color,
                      margin: 0,
                    }}
                  >
                    {s.name}
                  </h3>
                  <span
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.04em",
                      padding: "2px 8px",
                      borderRadius: 4,
                      backgroundColor: `${s.color}20`,
                      color: s.color,
                    }}
                  >
                    {s.badge}
                  </span>
                </div>
                <p style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                  <span style={{ color: "#CBD5E1", fontWeight: 500 }}>Method.</span>{" "}
                  {s.method}
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
                  <span style={{ color: "#E2E8F0", fontWeight: 500 }}>Finding.</span>{" "}
                  {s.finding}
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
                    Caveat.
                  </span>{" "}
                  {s.flaw}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- METHODOLOGY DIVIDE ---------- */}
        <section style={{ marginBottom: 48 }}>
          <SectionHeader
            title="Why the Studies Disagree"
            subtitle="Same law, different instruments — different answers."
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
                  color: "#5EEAD4",
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: "0.04em",
                  marginBottom: 8,
                }}
              >
                THE "NO HARM" CAMP
              </div>
              <p style={{ color: "#CBD5E1", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                Worker surveys, payroll-platform data, and cell-phone proximity
                proxies. Captures wage gains and incumbent experience well. Misses
                workers who exited; Advan GPS data has known imprecision in
                clustered retail environments.
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
                  color: "#FDA4AF",
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: "0.04em",
                  marginBottom: 8,
                }}
              >
                THE "REAL HARM" CAMP
              </div>
              <p style={{ color: "#CBD5E1", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                BLS QCEW administrative payroll data — gold standard for sector
                employment counts. Captures aggregate effects, but NAICS
                classification includes establishments not covered by AB 1228,
                blurring the law's direct effect.
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
              Both the "win-win-win" and "job-killer" framings are too clean. The
              defensible read: covered workers got a real{" "}
              <span style={{ color: "#F8FAFC", fontWeight: 600 }}>10–18% wage gain</span>.
              About{" "}
              <span style={{ color: "#F8FAFC", fontWeight: 600 }}>16,000–19,000</span>{" "}
              net jobs were lost relative to the counterfactual, and the median
              retained worker lost roughly{" "}
              <span style={{ color: "#F8FAFC", fontWeight: 600 }}>5 hours per week</span>
              . Prices rose more than Reich's 1.5% but less than industry's 14.5%
              — most likely{" "}
              <span style={{ color: "#F8FAFC", fontWeight: 600 }}>4–8%</span> on
              average. Capital substitution (kiosks, AI ordering) is the
              longest-tail effect.
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
              The unanswered welfare question is whether the gains to retained
              workers exceed the losses to displaced workers and consumers. No
              study has cleanly answered that.
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
          <span style={{ color: "#94A3B8", fontWeight: 600 }}>Sources.</span> Reich
          & Sosinskiy, UC Berkeley CWED (Apr 2026). Schneider, Harknett & Bruey,
          Harvard Kennedy / UCSF Shift Project (Oct 2024). Clemens, Edwards & Meer,
          NBER WP 34033 (Jul 2025). Employment Policies Institute (2024–2026).
          Berkeley Research Group / Datassential (Feb 2025). Owen et al., UC Santa
          Cruz (Mar 2026). California DIR; BLS QCEW.
        </div>
      </div>
    </div>
  );
}
