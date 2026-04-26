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
  PieChart,
  Pie,
  Legend,
} from "recharts";

const SERIF = "'Playfair Display', Georgia, serif";

export default function WildfiresSection() {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "history", label: "The Numbers" },
    { id: "la2025", label: "2025 LA Fires" },
    { id: "pge", label: "The PG&E Story" },
    { id: "forests", label: "Forest Management" },
    { id: "debate", label: "Climate vs. Management" },
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

  const ContentCard = ({ children, style: extraStyle = {} }) => (
    <div
      style={{
        borderRadius: 12,
        border: "1px solid #334155",
        background: "#1E293B",
        padding: 24,
        color: "#CBD5E1",
        fontSize: 15,
        lineHeight: 1.6,
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );

  const SimpleTooltip = ({ active, payload, label, suffix = "", prefix = "" }) => {
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
        <div style={{ color: "#CBD5E1", fontWeight: 500 }}>
          {label || payload[0].payload.label || payload[0].payload.year}
        </div>
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
            <span style={{ color: "#F8FAFC", fontWeight: 600 }}>
              {prefix}{p.value.toLocaleString()}{suffix}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // ============== OVERVIEW TAB ==============
  const OverviewPanel = () => (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <StatCard label="2025 Acres Burned" value="525K" sub="Below 5-yr average; LA fires drove damage" valueColor="#FB7185" />
        <StatCard label="LA Fires Cost" value="$250B+" sub="Estimated total economic loss" valueColor="#FB923C" />
        <StatCard label="Forest Federally Owned" value="57%" sub="Of CA's 33M forest acres" valueColor="#FBBF24" />
        <StatCard label="PG&E Wildfire Cost" value="$30B+" sub="Liabilities since 2017" valueColor="#A78BFA" />
      </div>

      <SectionHeader
        title="Why California Burns"
        subtitle="Multiple causes, layered over a century of fire suppression."
      />
      <ContentCard>
        <p style={{ margin: 0 }}>
          California's fire problem is{" "}
          <span style={{ color: "#F8FAFC", fontWeight: 600 }}>
            structural, not new
          </span>
          . Pre-1850 estimates suggest 4–12 million acres burned annually — many
          set deliberately by Indigenous peoples to manage landscape. By contrast,
          the worst recent year (2020) burned 4.3 million acres, and the average
          since 2000 has been around 800,000.
        </p>
        <p style={{ marginTop: 12 }}>
          What changed isn't fire frequency — it's where people live, how forests
          have been managed, and how much fuel has accumulated. Three forces
          converge: a century of fire suppression that built up fuel loads,
          climate change extending the fire season and drying vegetation, and
          1.5+ million homes built in the wildland-urban interface (WUI) since
          1990.
        </p>
        <p style={{ marginTop: 12, color: "#94A3B8", fontSize: 13, paddingTop: 12, borderTop: "1px solid #334155" }}>
          The question isn't whether California will keep burning. It will. The
          honest debate is over which interventions actually reduce damage, who
          pays, and whether the rebuild-and-repeat cycle in high-risk areas is
          financially sustainable for the state and its utilities.
        </p>
      </ContentCard>

      <div style={{ marginTop: 32 }}>
        <SectionHeader
          title="The Six Threads"
          subtitle="What this section covers, tab by tab."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 12,
          }}
        >
          {[
            { color: "#FB7185", title: "The Numbers", body: "Acres burned, structures destroyed, deaths — historical context for the recent fire seasons." },
            { color: "#FB923C", title: "2025 LA Fires", body: "Palisades, Eaton, and 12 others. 31 dead, 18,000 structures, $250B+ in damage." },
            { color: "#FBBF24", title: "The PG&E Story", body: "Camp Fire bankruptcy, AB 1054, the wildfire fund, and how it shows up on your bill." },
            { color: "#2DD4BF", title: "Forest Management", body: "Federal vs. state ownership, prescribed burns, the 33-million-acre problem." },
            { color: "#60A5FA", title: "Climate vs. Management", body: "What share is climate change, what share is fuel buildup, and why both sides oversimplify." },
            { color: "#A78BFA", title: "Honest Assessment", body: "What's working, what isn't, and the rebuild question California has yet to answer." },
          ].map((t, i) => (
            <div
              key={i}
              style={{
                borderRadius: 12,
                border: `1px solid ${t.color}40`,
                background: `${t.color}08`,
                padding: 16,
              }}
            >
              <div style={{ color: t.color, fontWeight: 600, fontSize: 14, marginBottom: 6 }}>
                {t.title}
              </div>
              <p style={{ color: "#CBD5E1", fontSize: 13, lineHeight: 1.5, margin: 0 }}>
                {t.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  // ============== HISTORY TAB ==============
  const acresByYear = [
    { year: "2017", acres: 1548 },
    { year: "2018", acres: 1976 },
    { year: "2019", acres: 260 },
    { year: "2020", acres: 4257 },
    { year: "2021", acres: 2569 },
    { year: "2022", acres: 363 },
    { year: "2023", acres: 332 },
    { year: "2024", acres: 1050 },
    { year: "2025", acres: 525 },
  ];

  const causeData = [
    { cause: "Lightning", value: 38, color: "#A78BFA" },
    { cause: "Power lines", value: 15, color: "#FB7185" },
    { cause: "Human activity", value: 22, color: "#FB923C" },
    { cause: "Equipment", value: 9, color: "#FBBF24" },
    { cause: "Arson", value: 5, color: "#F472B6" },
    { cause: "Unknown / undetermined", value: 11, color: "#64748B" },
  ];

  const HistoryPanel = () => (
    <>
      <SectionHeader
        title="Acres Burned by Year"
        subtitle="2017–2025, in thousands of acres. Note: variability is the norm, not the exception."
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
        <div style={{ height: 320, width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={acresByYear}
              margin={{ top: 24, right: 12, left: 12, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
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
                tickFormatter={(v) => `${v}K`}
              />
              <Tooltip
                cursor={{ fill: "rgba(148,163,184,0.08)" }}
                content={<SimpleTooltip suffix="K acres" />}
              />
              <Bar dataKey="acres" radius={[4, 4, 0, 0]}>
                {acresByYear.map((d, i) => (
                  <Cell key={i} fill={d.acres > 2000 ? "#FF6B6B" : d.acres > 1000 ? "#FB923C" : "#FBBF24"} />
                ))}
                <LabelList
                  dataKey="acres"
                  position="top"
                  fill="#E2E8F0"
                  fontSize={11}
                  formatter={(v) => `${v}K`}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p style={{ color: "#64748B", fontSize: 12, marginTop: 12, paddingLeft: 8 }}>
          2020 was the worst year on record by acres burned (lightning siege). 2025 was
          below average by acreage but among the most destructive by structures and dollar damage,
          driven almost entirely by the January LA fires.
        </p>
      </div>

      <SectionHeader
        title="What Causes California Wildfires"
        subtitle="Share of large-fire acreage by cause, 2008–2024."
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
            <PieChart>
              <Pie
                data={causeData}
                dataKey="value"
                nameKey="cause"
                cx="50%"
                cy="50%"
                outerRadius={110}
                innerRadius={50}
                paddingAngle={2}
                label={({ cause, value }) => `${cause}: ${value}%`}
                labelLine={{ stroke: "#475569" }}
                style={{ fontSize: 11 }}
              >
                {causeData.map((d, i) => (
                  <Cell key={i} fill={d.color} stroke="#1E293B" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0];
                  return (
                    <div style={{
                      borderRadius: 6,
                      border: "1px solid #334155",
                      background: "#0F172A",
                      padding: "8px 12px",
                      fontSize: 12,
                      color: "#E2E8F0",
                    }}>
                      <div style={{ color: "#CBD5E1" }}>{p.payload.cause}</div>
                      <div style={{ color: "#F8FAFC", fontWeight: 600 }}>{p.value}% of acreage</div>
                    </div>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p style={{ color: "#64748B", fontSize: 12, marginTop: 12, paddingLeft: 8 }}>
          Lightning is the single largest cause by acreage but most lightning fires
          burn in remote terrain. Power lines cause fewer fires by count but more
          structure loss because they ignite near populated areas.
        </p>
      </div>

      <SectionHeader
        title="Worst Single Fires"
        subtitle="The five most destructive in California history, by structures destroyed."
      />
      <ContentCard>
        {[
          { rank: "1", name: "Camp Fire (2018)", structures: "18,804", deaths: "85", cause: "PG&E transmission line", color: "#FB7185" },
          { rank: "2", name: "Palisades Fire (2025)", structures: "~7,000", deaths: "12", cause: "Arson (alleged)", color: "#FB923C" },
          { rank: "3", name: "Eaton Fire (2025)", structures: "~9,400", deaths: "17", cause: "Under investigation; SCE equipment suspected", color: "#FBBF24" },
          { rank: "4", name: "Tubbs Fire (2017)", structures: "5,636", deaths: "22", cause: "Private electrical (not utility)", color: "#A78BFA" },
          { rank: "5", name: "Tunnel Fire (1991, Oakland)", structures: "2,900", deaths: "25", cause: "Rekindled brush fire", color: "#60A5FA" },
        ].map((f, i) => (
          <div
            key={i}
            style={{
              paddingTop: i === 0 ? 0 : 14,
              paddingBottom: 14,
              borderTop: i === 0 ? "none" : "1px solid #334155",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              gap: "6px 16px",
            }}
          >
            <div style={{ fontSize: 24, fontFamily: SERIF, color: f.color, minWidth: 24 }}>
              {f.rank}
            </div>
            <div style={{ flex: "1 1 200px" }}>
              <div style={{ color: "#F8FAFC", fontWeight: 600, fontSize: 15 }}>{f.name}</div>
              <div style={{ color: "#94A3B8", fontSize: 13, marginTop: 2 }}>
                {f.structures} structures · {f.deaths} deaths · {f.cause}
              </div>
            </div>
          </div>
        ))}
      </ContentCard>
    </>
  );

  // ============== 2025 LA FIRES TAB ==============
  const LAPanel = () => (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <StatCard label="Lives Lost" value="31" sub="Plus ~440 indirect deaths (BU/Helsinki)" valueColor="#FB7185" />
        <StatCard label="Structures" value="18,000" sub="Destroyed across 14 fires" valueColor="#FB923C" />
        <StatCard label="Acres" value="57.5K" sub="Most concentrated WUI fire in CA history" valueColor="#FBBF24" />
        <StatCard label="Total Cost" value="$250B+" sub="Direct + economic; LA Fed Reserve estimate" valueColor="#A78BFA" />
      </div>

      <SectionHeader
        title="Where the Fires Burned"
        subtitle="Palisades and Eaton — the two largest fires of the January 2025 outbreak."
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
        <div
          style={{
            background: "#F8FAFC",
            borderRadius: 8,
            padding: 8,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src="/maps/la-fires-overview.png"
            alt="Overview map of the 2025 Los Angeles fires showing the Palisades fire on the coast and the Eaton fire in Altadena"
            style={{
              maxWidth: "100%",
              height: "auto",
              display: "block",
              borderRadius: 4,
            }}
          />
        </div>
        <p
          style={{
            color: "#64748B",
            fontSize: 12,
            lineHeight: 1.5,
            marginTop: 10,
            marginBottom: 0,
            textAlign: "right",
          }}
        >
          Source: NASA Scientific Visualization Studio (public domain).
        </p>
      </div>

      <SectionHeader
        title="What Happened"
        subtitle="January 7-31, 2025. Two fires drove most of the damage."
      />
      <ContentCard>
        <p style={{ margin: 0 }}>
          On January 7, 2025, hurricane-force Santa Ana winds — gusts up to{" "}
          <span style={{ color: "#F8FAFC", fontWeight: 600 }}>100 mph</span> — combined
          with extreme drought and heavy fuel loads from the previous wet winter.
          Fourteen fires ignited across Los Angeles and San Diego counties over
          three weeks.
        </p>
        <p style={{ marginTop: 12 }}>
          Two fires caused most of the destruction. The{" "}
          <span style={{ color: "#FBBF24", fontWeight: 600 }}>Palisades Fire</span>{" "}
          (Pacific Palisades) destroyed roughly 7,000 structures and killed 12.
          The <span style={{ color: "#FBBF24", fontWeight: 600 }}>Eaton Fire</span>{" "}
          (Altadena) destroyed roughly 9,400 structures and killed 17. Together they
          rank as the second and third most destructive fires in California history,
          behind only the 2018 Camp Fire.
        </p>
        <p style={{ marginTop: 12, color: "#94A3B8", fontSize: 13 }}>
          The Palisades Fire was a rekindling of the smaller Lachman Fire from
          January 1, which the LAFD believed was extinguished. In October 2025,
          Jonathan Rinderknecht (29) was arrested and charged with arson for
          starting the original Lachman Fire. The Eaton Fire's cause remains under
          investigation, with Southern California Edison transmission equipment
          considered the leading suspect.
        </p>
      </ContentCard>

      <div style={{ marginTop: 32 }}>
        <SectionHeader
          title="Fire Perimeters in Detail"
          subtitle="The two largest fires shown at neighborhood scale."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              borderRadius: 12,
              border: "1px solid #334155",
              background: "#1E293B",
              padding: 16,
            }}
          >
            <div
              style={{
                color: "#FB923C",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Palisades Fire
            </div>
            <div
              style={{
                background: "#F8FAFC",
                borderRadius: 8,
                padding: 8,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src="/maps/palisades-fire.png"
                alt="2025 Palisades Fire perimeter map showing burn area along the Pacific coastline"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: 4,
                }}
              />
            </div>
            <p style={{ color: "#64748B", fontSize: 11, marginTop: 10, lineHeight: 1.5 }}>
              23,713 acres. ~7,000 structures destroyed. 12 deaths. Started 10:30 AM Jan 7;
              fully contained Jan 31. Cause: arson (charged Oct 2025).
            </p>
          </div>
          <div
            style={{
              borderRadius: 12,
              border: "1px solid #334155",
              background: "#1E293B",
              padding: 16,
            }}
          >
            <div
              style={{
                color: "#FB7185",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Eaton Fire
            </div>
            <div
              style={{
                background: "#F8FAFC",
                borderRadius: 8,
                padding: 8,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src="/maps/eaton-fire.png"
                alt="2025 Eaton Fire perimeter map showing burn area in Altadena"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: 4,
                }}
              />
            </div>
            <p style={{ color: "#64748B", fontSize: 11, marginTop: 10, lineHeight: 1.5 }}>
              14,021 acres. ~9,400 structures destroyed. 17 deaths. Started Jan 7 in Altadena.
              Cause under investigation; SCE equipment leading suspect.
            </p>
          </div>
        </div>
        <p
          style={{
            color: "#64748B",
            fontSize: 12,
            lineHeight: 1.5,
            marginTop: 4,
            marginBottom: 0,
            textAlign: "right",
          }}
        >
          Source: Wikimedia Commons / Cal Fire DINS (public domain). Maps based on satellite imagery, aerial surveillance, and on-ground reports.
        </p>
      </div>
    </>
  );

  // ============== PG&E TAB ==============
  const PGEPanel = () => (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <StatCard label="2019 Bankruptcy" value="$30B" sub="Wildfire liabilities" valueColor="#FB7185" />
        <StatCard label="Wildfire Fund" value="$21B" sub="AB 1054 — half customer, half shareholder" valueColor="#FBBF24" />
        <StatCard label="Rate Hikes" value="+90%" sub="PG&E electric rates 2018→2024" valueColor="#FB923C" />
        <StatCard label="Wildfire Mitigation" value="$18B" sub="PG&E spend 2020–2024" valueColor="#A78BFA" />
      </div>

      <SectionHeader
        title="From Camp Fire to Bankruptcy"
        subtitle="The 2018 fire that triggered the largest utility bankruptcy in US history."
      />
      <ContentCard>
        <p style={{ margin: 0 }}>
          On{" "}
          <span style={{ color: "#FBBF24", fontWeight: 600 }}>November 8, 2018</span>,
          a 99-year-old transmission line hook on PG&E's Caribou-Palermo line failed.
          The resulting Camp Fire killed 85 people, destroyed 18,804 structures, and
          erased the town of Paradise. PG&E pleaded guilty to 84 counts of involuntary
          manslaughter — the largest corporate criminal case in California history.
        </p>
        <p style={{ marginTop: 12 }}>
          On <span style={{ color: "#FBBF24", fontWeight: 600 }}>January 29, 2019</span>,
          PG&E filed for Chapter 11 bankruptcy with{" "}
          <span style={{ color: "#F8FAFC", fontWeight: 600 }}>$30 billion in wildfire liabilities</span>.
          It exited bankruptcy in July 2020 with a restructured ownership and a
          $13.5 billion settlement fund for victims (paid half in cash, half in PG&E stock —
          a structure that has since lost much of its value as PG&E shares declined).
        </p>
        <p style={{ marginTop: 12, color: "#94A3B8", fontSize: 13 }}>
          The bankruptcy didn't just affect PG&E. It rewrote California utility law,
          changed how wildfire costs are spread, and set the precedent for the rate
          increases that followed.
        </p>
      </ContentCard>

      <div style={{ marginTop: 32 }}>
        <SectionHeader
          title="AB 1054 — The Wildfire Fund"
          subtitle="The 2019 law that protects utilities from future bankruptcy."
        />
        <ContentCard>
          <p style={{ margin: 0 }}>
            Signed July 12, 2019, AB 1054 created a{" "}
            <span style={{ color: "#F8FAFC", fontWeight: 600 }}>$21 billion wildfire insurance fund</span>{" "}
            to backstop the three big investor-owned utilities (PG&E, SCE, SDG&E)
            against future wildfire claims. The structure:
          </p>
          <ul style={{ marginTop: 12, paddingLeft: 20, color: "#CBD5E1", fontSize: 14, lineHeight: 1.8 }}>
            <li><span style={{ color: "#F8FAFC", fontWeight: 600 }}>$10.5B from utility shareholders</span> over 10 years</li>
            <li><span style={{ color: "#F8FAFC", fontWeight: 600 }}>$10.5B from ratepayers</span> via a non-bypassable charge on bills (extension of an existing surcharge)</li>
            <li>Utilities must obtain annual{" "}
              <span style={{ color: "#FBBF24" }}>safety certificates</span> by demonstrating
              wildfire mitigation plans and executive compensation tied to safety
            </li>
            <li>Utilities found to have caused fires can still face liability, but the
              fund acts as backstop and reduces ratings-agency punishment
            </li>
          </ul>
          <p style={{ marginTop: 12, color: "#94A3B8", fontSize: 13, paddingTop: 12, borderTop: "1px solid #334155" }}>
            The 2025 Eaton Fire is the first major test. SCE could face billions in
            liability if found responsible. Whether the wildfire fund handles that
            without another rate spike is a 2026-2027 story still unfolding.
          </p>
        </ContentCard>
      </div>

      <div style={{ marginTop: 32 }}>
        <SectionHeader
          title="How It Shows Up On Your Bill"
          subtitle="Where wildfire costs land for the average California ratepayer."
        />
        <ContentCard>
          <p style={{ margin: 0 }}>
            PG&E's average electric rate went from{" "}
            <span style={{ color: "#F8FAFC", fontWeight: 600 }}>~24¢/kWh in 2020</span>{" "}
            to <span style={{ color: "#F8FAFC", fontWeight: 600 }}>~46¢/kWh in 2025</span>{" "}
            — roughly a 90% increase. Of that increase:
          </p>
          <ul style={{ marginTop: 12, paddingLeft: 20, color: "#CBD5E1", fontSize: 14, lineHeight: 1.8 }}>
            <li><span style={{ color: "#FBBF24" }}>Wildfire mitigation capex</span> (undergrounding, vegetation, sensors): ~35-40%</li>
            <li><span style={{ color: "#FBBF24" }}>Wildfire fund + insurance</span>: ~10-15%</li>
            <li><span style={{ color: "#FBBF24" }}>Standard cost recovery</span> (transmission, gas): ~25-30%</li>
            <li><span style={{ color: "#FBBF24" }}>Public purpose programs</span> (low-income, efficiency): ~10%</li>
            <li><span style={{ color: "#FBBF24" }}>Stranded NEM 1.0/2.0 + PCIA</span>: ~10-15%</li>
          </ul>
          <p style={{ marginTop: 12, color: "#94A3B8", fontSize: 13 }}>
            Wildfire-related costs account for{" "}
            <span style={{ color: "#CBD5E1" }}>roughly half</span>{" "}
            of the rate increase since the bankruptcy. The rest is everything else
            — including the fact that California electricity was already among the
            highest-priced in the nation before any of this.
          </p>
        </ContentCard>
      </div>
    </>
  );

  // ============== FORESTS TAB ==============
  const ownershipData = [
    { owner: "US Forest Service", acres: 19, color: "#FB7185" },
    { owner: "BLM / NPS / other federal", acres: 1.6, color: "#FB923C" },
    { owner: "State (Cal Fire SRA)", acres: 0.7, color: "#FBBF24" },
    { owner: "Local govt", acres: 1.7, color: "#2DD4BF" },
    { owner: "Private", acres: 9.4, color: "#60A5FA" },
    { owner: "Tribal", acres: 0.6, color: "#A78BFA" },
  ];

  const ForestsPanel = () => (
    <>
      <SectionHeader
        title="Who Owns California's Forests"
        subtitle="33 million acres of forest land. The split matters more than most realize."
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
        <div style={{ height: 320, width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={ownershipData}
              layout="vertical"
              margin={{ top: 16, right: 60, left: 100, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fill: "#94A3B8", fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: "#334155" }}
                tickFormatter={(v) => `${v}M`}
              />
              <YAxis
                type="category"
                dataKey="owner"
                tick={{ fill: "#94A3B8", fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: "#334155" }}
                width={100}
              />
              <Tooltip
                cursor={{ fill: "rgba(148,163,184,0.08)" }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0];
                  return (
                    <div style={{
                      borderRadius: 6, border: "1px solid #334155", background: "#0F172A",
                      padding: "8px 12px", fontSize: 12, color: "#E2E8F0",
                    }}>
                      <div style={{ color: "#CBD5E1" }}>{p.payload.owner}</div>
                      <div style={{ color: "#F8FAFC", fontWeight: 600 }}>{p.value}M acres</div>
                    </div>
                  );
                }}
              />
              <Bar dataKey="acres" radius={[0, 4, 4, 0]}>
                {ownershipData.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
                <LabelList
                  dataKey="acres"
                  position="right"
                  fill="#E2E8F0"
                  fontSize={11}
                  formatter={(v) => `${v}M`}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p style={{ color: "#64748B", fontSize: 12, marginTop: 12, paddingLeft: 8 }}>
          Acres in millions. The federal government — primarily the US Forest
          Service — owns 57% of California's forest land. State and local
          ownership combined is under 10%.
        </p>
      </div>

      <SectionHeader
        title="Why Forest Management Is Hard"
        subtitle="The structural problems that prescribed burns and thinning haven't solved."
      />
      <ContentCard>
        <p style={{ margin: 0 }}>
          California's forests are{" "}
          <span style={{ color: "#F8FAFC", fontWeight: 600 }}>
            roughly twice as dense as they were in 1850
          </span>
          . A century of fire suppression — driven by the 1910 Big Burn and codified
          in the Forest Service's "10 a.m. policy" (every fire out by 10 a.m. the
          next morning) — let fuel accumulate at unprecedented rates. Indigenous
          burning practices were criminalized starting in the 1850s.
        </p>
        <p style={{ marginTop: 12, color: "#CBD5E1", fontSize: 14 }}>
          The fix is well-known: prescribed burns plus mechanical thinning, applied
          to roughly 1 million acres per year. California is currently treating
          about <span style={{ color: "#F8FAFC", fontWeight: 600 }}>~150,000 acres
          per year</span> — well short of the target. Why the gap?
        </p>
        <ul style={{ marginTop: 12, paddingLeft: 20, color: "#CBD5E1", fontSize: 14, lineHeight: 1.8 }}>
          <li><span style={{ color: "#F8FAFC", fontWeight: 600 }}>Federal-state split.</span> Most fuel buildup is on USFS land. State agencies can't legally treat it without federal approval and funding.</li>
          <li><span style={{ color: "#F8FAFC", fontWeight: 600 }}>Air quality regulations.</span> Prescribed burns require specific weather windows. CARB and air districts can veto burns that would push regional AQI above thresholds.</li>
          <li><span style={{ color: "#F8FAFC", fontWeight: 600 }}>NEPA review.</span> Federal land treatments require environmental impact statements. Lawsuits from environmental groups can delay projects 5-10 years.</li>
          <li><span style={{ color: "#F8FAFC", fontWeight: 600 }}>Liability fear.</span> A prescribed burn that escapes (rare but it happens) can result in massive damage claims. Few private contractors will accept the risk.</li>
          <li><span style={{ color: "#F8FAFC", fontWeight: 600 }}>Capacity.</span> Fewer than 2,000 trained burn-boss personnel statewide. Cal Fire alone needs ~3-4× more.</li>
        </ul>
      </ContentCard>

      <div style={{ marginTop: 32 }}>
        <SectionHeader
          title="What's Actually Being Done"
          subtitle="Recent state and federal initiatives — partial progress, real limits."
        />
        <ContentCard>
          <p style={{ margin: 0 }}>
            The 2020 Newsom-Trump shared stewardship agreement targeted treatment
            of 1 million acres annually by 2025 — split between federal and state
            agencies. Actual progress has been roughly{" "}
            <span style={{ color: "#F8FAFC", fontWeight: 600 }}>30-40% of target</span>.
          </p>
          <p style={{ marginTop: 12 }}>
            The 2022 federal Inflation Reduction Act and 2021 Bipartisan
            Infrastructure Law included roughly{" "}
            <span style={{ color: "#FBBF24", fontWeight: 600 }}>$5.5 billion</span>{" "}
            for wildfire mitigation, including hazardous fuels reduction. The 2024
            California Wildfire & Forest Resilience Bond (Prop 4) included$1.9B for
            forest health, watershed protection, and prescribed burn capacity.
          </p>
          <p style={{ marginTop: 12, color: "#94A3B8", fontSize: 13, paddingTop: 12, borderTop: "1px solid #334155" }}>
            The honest read: California has the funding and the policy framework
            for accelerated treatment. The bottleneck is workforce, weather windows,
            and federal-state coordination. Money alone doesn't fix any of these
            quickly.
          </p>
        </ContentCard>
      </div>
    </>
  );

  // ============== DEBATE TAB ==============
  const DebatePanel = () => (
    <>
      <SectionHeader
        title="Climate vs. Management"
        subtitle="The single most-misframed debate about California fires."
      />
      <ContentCard>
        <p style={{ margin: 0 }}>
          Public discussion of California wildfires usually gets stuck in a binary:{" "}
          <span style={{ color: "#F8FAFC", fontWeight: 600 }}>"It's climate change"</span>{" "}
          vs.{" "}
          <span style={{ color: "#F8FAFC", fontWeight: 600 }}>"It's bad forest management"</span>.
          Both sides are partly right, both are wrong to deny the other, and the
          interaction effects matter more than either factor alone.
        </p>
      </ContentCard>

      <div style={{ marginTop: 24 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          <div
            style={{
              borderRadius: 12,
              border: "1px solid rgba(96,165,250,0.30)",
              background: "rgba(96,165,250,0.04)",
              padding: 20,
            }}
          >
            <div style={{ color: "#60A5FA", fontWeight: 600, fontSize: 13, letterSpacing: "0.04em", marginBottom: 12 }}>
              THE CLIMATE FRAME
            </div>
            <p style={{ color: "#CBD5E1", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              Vapor pressure deficit (the "thirst" of the atmosphere) has roughly
              doubled across the western US since 1980. Drought has lengthened the
              fire season by ~75 days statewide. Climate Central and World Weather
              Attribution analyses found climate change{" "}
              <span style={{ color: "#F8FAFC", fontWeight: 600 }}>
                substantially increased the likelihood
              </span>{" "}
              of the 2025 LA fires through multiple channels.
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
            <div style={{ color: "#FB7185", fontWeight: 600, fontSize: 13, letterSpacing: "0.04em", marginBottom: 12 }}>
              THE MANAGEMENT FRAME
            </div>
            <p style={{ color: "#CBD5E1", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              Fuel loads in California forests are 2-5× pre-1850 levels in many
              areas. Pre-contact fire regimes burned 4-12 million acres annually.
              Even at 2020 levels (4.3M acres), modern California burns less than
              historical equilibrium. The intensity is what's changed —{" "}
              <span style={{ color: "#F8FAFC", fontWeight: 600 }}>
                fuel buildup makes today's fires hotter and more catastrophic
              </span>{" "}
              than the same acreage burned would have been in 1850.
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <SectionHeader
          title="Why Both Frames Are Incomplete"
          subtitle="The interaction effect that gets lost in the binary."
        />
        <ContentCard>
          <p style={{ margin: 0 }}>
            Climate change makes the same fuel load{" "}
            <span style={{ color: "#FBBF24", fontWeight: 600 }}>more flammable</span>:
            drier, hotter, with longer windows of extreme weather. Fuel buildup
            makes the same climate{" "}
            <span style={{ color: "#FBBF24", fontWeight: 600 }}>more dangerous</span>:
            more energy released per acre, faster spread, longer-duration fires.
          </p>
          <p style={{ marginTop: 12 }}>
            The 2025 LA fires are the canonical interaction case:
          </p>
          <ul style={{ marginTop: 12, paddingLeft: 20, color: "#CBD5E1", fontSize: 14, lineHeight: 1.8 }}>
            <li>Heavy 2024 winter rain produced abundant grass and brush growth (vegetation buildup)</li>
            <li>Dry 2024-25 fall and early winter cured the fuels (climate signal)</li>
            <li>Hurricane-force Santa Anas drove rapid spread (weather, partly climate-influenced)</li>
            <li>Decades of fuel accumulation in nearby chaparral provided ladder fuels (management)</li>
            <li>1.5 million homes built in WUI since 1990 placed structures in ignition zones (planning)</li>
          </ul>
          <p style={{ marginTop: 12, color: "#94A3B8", fontSize: 13 }}>
            Removing any single factor would have reduced damage. Removing all of
            them together would have made the fires manageable. Politicians and
            advocates who isolate one cause are usually doing so to protect
            preferred policy responses.
          </p>
        </ContentCard>
      </div>
    </>
  );

  // ============== HONEST ASSESSMENT TAB ==============
  const HonestPanel = () => (
    <>
      <SectionHeader
        title="Honest Assessment"
        subtitle="What's working, what isn't, and what California has yet to decide."
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
          What's working:
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 12,
          }}
        >
          {[
            "Cal Fire response capability — fastest large-air-tanker arrival times in the world",
            "PSPS (Public Safety Power Shutoffs) — reduced utility-caused ignitions ~70% since 2019",
            "PG&E undergrounding program — 1,800+ miles completed, target 10,000 miles by 2035",
            "AB 1054 wildfire fund — kept utilities solvent without federal bailout",
            "Cal Fire prescribed-burn capacity has roughly doubled since 2018",
            "Building code updates — Chapter 7A construction in WUI zones reduces structure loss",
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
          What isn't:
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 12,
          }}
        >
          {[
            "Treatment pace — ~150K acres/year vs. ~1M needed to catch up",
            "Federal-state coordination — 57% of forest is federal, but funding/policy mismatched",
            "Insurance market — major carriers exiting; FAIR Plan exposure ballooning",
            "Rebuilding in burn scars without serious code or zoning changes",
            "Air-quality vetoes prevent prescribed burns during the windows when they're most useful",
            "Workforce — chronic shortage of trained burn bosses, fuel-treatment crews, foresters",
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
          California has{" "}
          <span style={{ color: "#F8FAFC", fontWeight: 600 }}>
            spent enormous money treating the symptoms while avoiding the
            structural questions
          </span>
          . Wildfire mitigation is now a major component of every electricity
          bill, the FAIR Plan insures property the private market won't touch,
          and Cal Fire's budget has tripled since 2010. But fuel loads keep
          climbing, WUI development keeps accelerating, and the rebuild-in-place
          assumption after each fire goes unchallenged.
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
          The questions California hasn't answered: Should homes destroyed in
          high-severity zones be rebuildable on the same lot? Should insurance
          subsidies cross-subsidize WUI risk? Should air-quality regulations
          yield to prescribed-burn windows even when they push AQI into red zones
          for 24-48 hours? Each is politically explosive. None can be deferred
          forever. The 2025 LA fires made the cost of the status quo$250 billion
          visible in a single month — and the structural debate has yet to begin
          in earnest.
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
              Wildfires & Forestry
            </h1>
            <p
              style={{
                marginTop: 12,
                color: "#CBD5E1",
                fontSize: 17,
                maxWidth: 640,
              }}
            >
              From the Camp Fire bankruptcy to the 2025 LA fires. Why California
              burns, who pays, and the climate-vs-management debate that misses
              the interaction effect.
            </p>
          </div>
        </header>

        {/* ---------- TAB NAV ---------- */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 28,
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
        {tab === "overview" && <OverviewPanel />}
        {tab === "history" && <HistoryPanel />}
        {tab === "la2025" && <LAPanel />}
        {tab === "pge" && <PGEPanel />}
        {tab === "forests" && <ForestsPanel />}
        {tab === "debate" && <DebatePanel />}
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
          California Department of Forestry and Fire Protection (Cal Fire);
          California Public Utilities Commission; AB 1054 (Statutes of 2019);
          Pacific Gas & Electric Company SEC filings; CalMatters wildfire tracker;
          National Interagency Fire Center; US Forest Service Pacific Southwest
          Region; UC Berkeley Center for Forestry; Climate Central; World Weather
          Attribution; Boston University School of Public Health (LA fire mortality
          study, Aug 2025); LA Fed Reserve damage estimates.
        </div>
      </div>
    </div>
  );
}
