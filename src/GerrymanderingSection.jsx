import React, { useState } from "react";
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

export default function GerrymanderingSection() {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "california", label: "California" },
    { id: "texas", label: "Texas" },
    { id: "virginia", label: "Virginia" },
    { id: "cascade", label: "The Cascade" },
    { id: "commissions", label: "Why Commissions Fail" },
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

  const SimpleTooltip = ({ active, payload, label, suffix = "" }) => {
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
        <div style={{ color: "#CBD5E1", fontWeight: 500 }}>{label || payload[0].payload.label || payload[0].payload.state}</div>
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
            <span style={{ color: "#F8FAFC", fontWeight: 600 }}>{p.value}{suffix}</span>
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
        <StatCard label="States Redrawn" value="6" sub="CA, TX, MO, NC, OH, UT in 2025-26" valueColor="#FB7185" />
        <StatCard label="House Margin" value="220-213" sub="Republican majority pre-redistricting" valueColor="#FBBF24" />
        <StatCard label="Net Seat Shift" value="+9 GOP" sub="Estimated combined effect of all maps" valueColor="#FB923C" />
        <StatCard label="CA Prop 50 Vote" value="64.4%" sub="Yes — Nov 2025 special election" valueColor="#A78BFA" />
      </div>

      <SectionHeader
        title="What's Happening"
        subtitle="The 2025–26 mid-decade redistricting wave — first since the 1960s."
      />
      <ContentCard>
        <p style={{ margin: 0 }}>
          Redistricting normally happens once a decade after the Census. In summer
          2025, that pattern broke. President Trump pressed Texas Republicans to
          redraw maps mid-decade to{" "}
          <span style={{ color: "#F8FAFC", fontWeight: 600 }}>pick up five US House seats</span>{" "}
          ahead of the 2026 midterms. Texas passed the new map in August.
          California Governor Newsom called a special election to authorize a
          counter-gerrymander — Proposition 50, which voters approved 64.4% to
          35.6% on November 4, 2025.
        </p>
        <p style={{ marginTop: 12 }}>
          The cascade kept going. Missouri, North Carolina, and Ohio passed new
          GOP-favoring maps. Utah was forced by court order to draw a more
          competitive one. Virginia Democrats voted to amend the state
          constitution to allow mid-decade redistricting and approved a new map on
          April 21, 2026. Indiana's GOP Senate rejected its own legislature's
          plan in December 2025 — the first state to break ranks. Florida is
          actively exploring its own redraw.
        </p>
        <p style={{ marginTop: 12, color: "#94A3B8", fontSize: 13, paddingTop: 12, borderTop: "1px solid #334155" }}>
          The Supreme Court allowed the Texas map to take effect for 2026 on
          December 4, 2025, despite a lower-court finding it likely violated the
          Constitution. The trial on the merits will continue. California's map
          survived its own court challenges in January 2026.
        </p>
      </ContentCard>

      <div style={{ marginTop: 32 }}>
        <SectionHeader
          title="The Cascade in One Picture"
          subtitle="Estimated net seat shifts from the 2025-26 mid-decade redistricting cycle."
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
                data={[
                  { state: "Texas", shift: 5, color: "#FB7185" },
                  { state: "Missouri", shift: 1, color: "#FB7185" },
                  { state: "N. Carolina", shift: 1, color: "#FB7185" },
                  { state: "Ohio", shift: 2, color: "#FB7185" },
                  { state: "California", shift: -5, color: "#60A5FA" },
                  { state: "Virginia", shift: -3, color: "#60A5FA" },
                  { state: "Utah", shift: -1, color: "#60A5FA" },
                ]}
                margin={{ top: 24, right: 12, left: 12, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis
                  dataKey="state"
                  tick={{ fill: "#94A3B8", fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: "#334155" }}
                />
                <YAxis
                  tick={{ fill: "#94A3B8", fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: "#334155" }}
                  tickFormatter={(v) => v > 0 ? `+${v} R` : `${Math.abs(v)} D`}
                />
                <Tooltip
                  cursor={{ fill: "rgba(148,163,184,0.08)" }}
                  content={<SimpleTooltip />}
                />
                <Bar dataKey="shift" radius={[4, 4, 0, 0]}>
                  {[
                    { state: "Texas", shift: 5, color: "#FB7185" },
                    { state: "Missouri", shift: 1, color: "#FB7185" },
                    { state: "N. Carolina", shift: 1, color: "#FB7185" },
                    { state: "Ohio", shift: 2, color: "#FB7185" },
                    { state: "California", shift: -5, color: "#60A5FA" },
                    { state: "Virginia", shift: -3, color: "#60A5FA" },
                    { state: "Utah", shift: -1, color: "#60A5FA" },
                  ].map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                  <LabelList
                    dataKey="shift"
                    position="top"
                    fill="#E2E8F0"
                    fontSize={12}
                    formatter={(v) => v > 0 ? `+${v}` : `${v}`}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p style={{ color: "#64748B", fontSize: 12, marginTop: 12, paddingLeft: 8 }}>
            Positive = seats projected to flip Republican. Negative = seats projected to flip Democrat. Net effect: roughly Republicans +9, Democrats -9 — close to a wash, but the timing of court rulings will determine the actual 2026 outcome.
          </p>
        </div>
      </div>
    </>
  );

  // ============== CALIFORNIA TAB ==============
  const CaliforniaPanel = () => (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <StatCard label="Yes Vote" value="64.4%" sub="Of 11.6M ballots cast" valueColor="#60A5FA" />
        <StatCard label="Yes Spending" value="$138M" sub="Newsom + Steyer committees" valueColor="#FBBF24" />
        <StatCard label="No Spending" value="$44M" sub="75% from Charles Munger Jr." valueColor="#FB7185" />
        <StatCard label="Seats at Stake" value="5" sub="Projected Democratic pickup" valueColor="#A78BFA" />
      </div>

      <SectionHeader
        title="Proposition 50 — The Election Rigging Response Act"
        subtitle="How a state with a model independent commission decided to gerrymander itself."
      />
      <ContentCard>
        <p style={{ margin: 0 }}>
          The California Citizens Redistricting Commission was created by Prop 11
          (2008) and expanded to congressional maps by Prop 20 (2010). It's a
          14-member body —{" "}
          <span style={{ color: "#F8FAFC", fontWeight: 600 }}>5 Democrats, 5 Republicans, 4 unaffiliated</span>{" "}
          — broadly considered the national gold standard for nonpartisan
          redistricting.
        </p>
        <p style={{ marginTop: 12 }}>
          Prop 50 doesn't abolish the commission. It{" "}
          <span style={{ color: "#FBBF24", fontWeight: 600 }}>temporarily suspends</span>{" "}
          its congressional-map authority through 2030, replacing the
          commission-drawn lines with a Democratic-friendly map drawn by
          Sacramento. The commission resumes congressional duties after the 2030
          census.
        </p>
        <p style={{ marginTop: 12, color: "#94A3B8", fontSize: 13 }}>
          The new map was drawn by Democratic redistricting expert Paul Mitchell
          and submitted by the DCCC. Analyst Nathaniel Rakich called it "an
          aggressive Democratic gerrymander" that{" "}
          <span style={{ color: "#CBD5E1" }}>more than doubles the bias</span>{" "}
          in the previous map by simultaneously cracking Republican districts and
          unpacking heavily Democratic ones.
        </p>
      </ContentCard>

      <div style={{ marginTop: 32 }}>
        <SectionHeader
          title="The Strange Coalitions"
          subtitle="Who stood where on Prop 50 — and why it didn't break along clean partisan lines."
        />
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
              YES ON 50
            </div>
            <p style={{ color: "#CBD5E1", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
              Newsom, the CA Democratic Party, Obama, AOC, Pelosi, Padilla, Schiff,
              House Majority PAC, George Soros' Fund for Policy Reform, NAACP,
              Planned Parenthood, SEIU. Frame: "fight fire with fire" against the
              Texas gerrymander.
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
            <div style={{ color: "#FF6B6B", fontWeight: 600, fontSize: 13, letterSpacing: "0.04em", marginBottom: 12 }}>
              NO ON 50
            </div>
            <p style={{ color: "#CBD5E1", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
              Charles Munger Jr. ($33M of his own money — he created the 2008
              commission), Schwarzenegger, Kevin McCarthy, CA GOP. Two awkward
              No allies: the Center for American Progress (a Democratic-aligned
              think tank that normally champions independent commissions) called
              for a national pause until Congress sets uniform standards.
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <SectionHeader
          title="The Maps, Side by Side"
          subtitle="Statewide congressional districts — commission map (2021) vs. Prop 50 map (2025)."
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
                color: "#94A3B8",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Commission Map (2021–2025)
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
                src="/maps/ca-commission-2021.png"
                alt="California 2021 commission-drawn congressional districts"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: 4,
                }}
              />
            </div>
            <p style={{ color: "#64748B", fontSize: 11, marginTop: 10, lineHeight: 1.5 }}>
              Drawn by the 14-member Citizens Redistricting Commission. Result: 9 Republican seats of 52 (17%) on ~39% of statewide vote.
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
                color: "#FBBF24",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Prop 50 Map (2026–2030)
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
                src="/maps/ca-prop50-2025.png"
                alt="California 2025 Proposition 50 legislatively-drawn congressional districts"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: 4,
                }}
              />
            </div>
            <p style={{ color: "#64748B", fontSize: 11, marginTop: 10, lineHeight: 1.5 }}>
              Drawn by Paul Mitchell, submitted by the DCCC, codified in AB 604. Projected: 4 Republican seats of 52 (8%).
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
          Source: California Secretary of State Official Voter Information Guide (public domain).
        </p>
      </div>

      <div style={{ marginTop: 32 }}>
        <SectionHeader
          title="The 17% / 39% Problem"
          subtitle="Was the 'gold standard' map already gerrymandered against Republicans?"
        />
        <ContentCard>
          <p style={{ margin: 0 }}>
            Even under the independent commission map, Republicans held{" "}
            <span style={{ color: "#F8FAFC", fontWeight: 600 }}>9 of 52 California congressional seats (17%)</span>{" "}
            — but won{" "}
            <span style={{ color: "#F8FAFC", fontWeight: 600 }}>39% of the statewide vote in 2024</span>.
            That gap is partly geographic (Democrats are concentrated in dense
            metros, which tends to "waste" votes) and partly compositional
            (commissions can't manufacture competitive districts where voters are
            sorted by neighborhood). It's a structural feature of single-member
            geographic districts, not a flaw in the commission's work.
          </p>
          <p style={{ marginTop: 12, color: "#94A3B8", fontSize: 13 }}>
            That said: the new Prop 50 map widens the gap. Under the new lines,
            Republicans are projected to drop from 9 seats to 4 — about{" "}
            <span style={{ color: "#CBD5E1" }}>8% of the delegation against
            ~37–40% of the vote</span>. That's the gerrymander, in numbers.
          </p>
        </ContentCard>
      </div>
    </>
  );

  // ============== TEXAS TAB ==============
  const TexasPanel = () => (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <StatCard label="Current Split" value="25-13" sub="Republican / Democrat seats" valueColor="#FB7185" />
        <StatCard label="Target Split" value="30-8" sub="After new map" valueColor="#FBBF24" />
        <StatCard label="2024 Trump %" value="56%" sub="Statewide vote share" valueColor="#FB923C" />
        <StatCard label="2024 GOP Seats" value="71%" sub="27 of 38 districts under prior map" valueColor="#A78BFA" />
      </div>

      <SectionHeader
        title="The Texas Map"
        subtitle="The mid-decade redistricting that started the cascade."
      />
      <ContentCard>
        <p style={{ margin: 0 }}>
          On July 9, 2025, Governor Abbott called a special legislative session
          for redistricting, citing a Department of Justice letter identifying
          four majority-minority districts as "unconstitutional racial
          gerrymanders." Critics noted the DOJ letter was the legal pretext;
          Trump's call with Texas Republicans the next day urging "five more
          Republican seats" was the actual motivation.
        </p>
        <p style={{ marginTop: 12 }}>
          On August 3, most Texas House Democrats fled the state — to Chicago,
          Albany, and elsewhere — to deny the Republican majority a quorum.
          Abbott threatened removal from office and bribery charges over
          fundraising for the $500/day fines. The walkout delayed the vote two
          weeks; on August 20, the House passed the new map 88-52 along party
          lines. The Senate approved it 18-8 on August 23.
        </p>
        <p style={{ marginTop: 12, color: "#94A3B8", fontSize: 13 }}>
          The map targets five Democratic incumbents — all in coalition districts
          with majority-minority populations: Marc Veasey, Greg Casar, Lloyd
          Doggett, Julie Johnson, and Al Green. Hispanic voters in three districts
          are assumed to vote Republican without Trump on the ballot — an
          empirical bet that may or may not hold.
        </p>
      </ContentCard>

      <div style={{ marginTop: 32 }}>
        <SectionHeader
          title="The Maps, Side by Side"
          subtitle="Texas congressional districts before and after the August 2025 redraw."
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
                color: "#94A3B8",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              118th Congress Map (2021–2025)
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
                src="/maps/tx-118th.png"
                alt="Texas 2021 congressional districts as used in the 118th Congress"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: 4,
                }}
              />
            </div>
            <p style={{ color: "#64748B", fontSize: 11, marginTop: 10, lineHeight: 1.5 }}>
              Drawn by the Texas Legislature in 2021. Result: 25 Republican, 13 Democratic seats.
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
              120th Congress Map (Plan C2333, 2026+)
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
                src="/maps/tx-120th.png"
                alt="Texas 2025 redrawn congressional districts (Plan C2333) for the 120th Congress"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: 4,
                }}
              />
            </div>
            <p style={{ color: "#64748B", fontSize: 11, marginTop: 10, lineHeight: 1.5 }}>
              Plan C2333, signed Aug 29, 2025. Targets 5 Democratic incumbents. Projected split: 30R / 8D.
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
          Source: Wikimedia Commons (CC BY-SA 4.0). Maps by users Twotwofourtysix and OutlawRun.
        </p>
      </div>

      <div style={{ marginTop: 32 }}>
        <SectionHeader
          title="The Court Fight"
          subtitle="Why the map is in effect for 2026 even though a federal panel found it likely unconstitutional."
        />
        <ContentCard>
          <p style={{ margin: 0 }}>
            On{" "}
            <span style={{ color: "#FBBF24", fontWeight: 600 }}>November 18, 2025</span>,
            a three-judge federal panel (with the majority opinion written by a
            Trump nominee) blocked the Texas map, finding challengers were likely
            to prove racial gerrymandering at trial. They cited Republican
            lawmakers' own public statements about engineering racial
            demographics.
          </p>
          <p style={{ marginTop: 12 }}>
            On{" "}
            <span style={{ color: "#FBBF24", fontWeight: 600 }}>December 4, 2025</span>,
            the Supreme Court issued an emergency stay, allowing the Texas map to
            be used in 2026 elections while the trial continues. Justice Alito
            wrote the lower court "improperly inserted itself into an active
            primary campaign." The trial on the merits remains pending; the map
            could be struck down for 2028.
          </p>
          <p style={{ marginTop: 12, color: "#94A3B8", fontSize: 13 }}>
            The legal distinction at trial: drawing maps for{" "}
            <span style={{ color: "#CBD5E1" }}>partisan gain is legal</span>{" "}
            (per Rucho v. Common Cause, 2019). Drawing maps based on{" "}
            <span style={{ color: "#CBD5E1" }}>race is illegal</span>{" "}
            (per the 14th Amendment and Voting Rights Act). The state's defense
            requires arguing the map was purely partisan despite the racial
            language in their own justifications.
          </p>
        </ContentCard>
      </div>
    </>
  );

  // ============== VIRGINIA TAB ==============
  const VirginiaPanel = () => (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <StatCard label="Current Split" value="6-5" sub="Democrat / Republican seats (11 total)" valueColor="#60A5FA" />
        <StatCard label="Target Pickup" value="+3-4" sub="Democratic seats under new map" valueColor="#FBBF24" />
        <StatCard label="Total Spending" value="~$100M" sub="On the April 2026 referendum" valueColor="#FB923C" />
        <StatCard label="Dark Money" value="95%" sub="Share of donations from undisclosed sources" valueColor="#FB7185" />
      </div>

      <SectionHeader
        title="Virginia's Constitutional Workaround"
        subtitle="A state without an independent commission needed a different mechanism."
      />
      <ContentCard>
        <p style={{ margin: 0 }}>
          Unlike California, Virginia doesn't have an independent redistricting
          commission. But the state constitution{" "}
          <span style={{ color: "#F8FAFC", fontWeight: 600 }}>
            prohibits mid-decade congressional redistricting
          </span>{" "}
          — maps are set after each Census and locked in. To work around this,
          Democrats in the legislature passed a constitutional amendment
          authorizing an exception, then put it to voters in a special April 21,
          2026 referendum.
        </p>
        <p style={{ marginTop: 12 }}>
          The amendment passed. The new map will favor Democrats by roughly 3–4
          seats, taking Virginia's congressional delegation from a 6-5 Democratic
          edge to potentially 9-2 or 10-1.
        </p>
        <p style={{ marginTop: 12, color: "#94A3B8", fontSize: 13 }}>
          Almost immediately, a Virginia Superior Court judge issued a temporary
          order on April 22 blocking the state from acting on the results.
          Democratic Attorney General Jay Jones said he would appeal.
          Implementation for 2026 is now uncertain.
        </p>
      </ContentCard>

      <div style={{ marginTop: 32 }}>
        <SectionHeader
          title="The Money Problem"
          subtitle="Why Virginia's referendum was the dark-money story of the cycle."
        />
        <ContentCard>
          <p style={{ margin: 0 }}>
            Per Virginia Public Access Project data, roughly{" "}
            <span style={{ color: "#FB7185", fontWeight: 600 }}>95% of the ~$100M</span>{" "}
            spent on the Virginia referendum came from{" "}
            <span style={{ color: "#F8FAFC", fontWeight: 600 }}>dark-money 501(c)(4) groups</span>{" "}
            that don't disclose donors. Virginia's disclosure rules are weaker
            than California's — there's no Cal-Access equivalent — so traceability
            is much lower.
          </p>
          <p style={{ marginTop: 12, color: "#94A3B8", fontSize: 13 }}>
            Obama and Holder campaigned for it in person. Trump weighed in
            against it at the last minute. National Republicans largely stayed
            out of the campaign — a tactical decision that mirrored the Munger
            campaign in California, where most GOP donors also stayed away.
          </p>
        </ContentCard>
      </div>
    </>
  );

  // ============== CASCADE TAB ==============
  const cascadeStates = [
    { state: "Texas", date: "Aug 2025", direction: "GOP +5", color: "#FB7185", note: "Trial pending; SCOTUS allowed for 2026" },
    { state: "California", date: "Nov 2025", direction: "DEM +5", color: "#60A5FA", note: "Approved 64.4%, suspended commission through 2030" },
    { state: "Missouri", date: "Sep 2025", direction: "GOP +1", color: "#FB7185", note: "Targets Cleaver's KC-area district; referendum pending" },
    { state: "North Carolina", date: "Oct 2025", direction: "GOP +1", color: "#FB7185", note: "Passed by GOP-controlled legislature" },
    { state: "Ohio", date: "Sep 2025", direction: "GOP +2", color: "#FB923C", note: "Required by state law; commission compromise map" },
    { state: "Utah", date: "Nov 2025", direction: "DEM +1", color: "#60A5FA", note: "Court-ordered after judge struck down GOP map" },
    { state: "Virginia", date: "Apr 2026", direction: "DEM +3-4", color: "#60A5FA", note: "Constitutional amendment passed; under court review" },
    { state: "Indiana", date: "Dec 2025", direction: "REJECTED", color: "#A78BFA", note: "GOP Senate refused to pass own legislature's plan" },
    { state: "Florida", date: "Pending", direction: "GOP +5?", color: "#FBBF24", note: "DeSantis pushing; legal hurdles from state ban" },
    { state: "Maryland", date: "Pending", direction: "DEM +1?", color: "#FBBF24", note: "Commission formed; only 1 GOP seat to flip" },
  ];

  const CascadePanel = () => (
    <>
      <SectionHeader
        title="The Cascade State by State"
        subtitle="What each state did, and where the litigation stands."
      />
      <div
        style={{
          borderRadius: 12,
          border: "1px solid #334155",
          background: "#1E293B",
          padding: 24,
        }}
      >
        {cascadeStates.map((s, i) => (
          <div
            key={i}
            style={{
              paddingTop: i === 0 ? 0 : 16,
              paddingBottom: i === cascadeStates.length - 1 ? 0 : 16,
              borderTop: i === 0 ? "none" : "1px solid #334155",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "8px 16px",
            }}
          >
            <div style={{ flex: "0 0 120px", color: "#F8FAFC", fontSize: 15, fontWeight: 600 }}>
              {s.state}
            </div>
            <div style={{ flex: "0 0 80px", color: "#94A3B8", fontSize: 12 }}>
              {s.date}
            </div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.04em",
                padding: "3px 10px",
                borderRadius: 4,
                backgroundColor: `${s.color}20`,
                color: s.color,
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              {s.direction}
            </div>
            <div style={{ flex: "1 1 200px", color: "#CBD5E1", fontSize: 13, lineHeight: 1.5 }}>
              {s.note}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32 }}>
        <SectionHeader
          title="The Asymmetry Problem"
          subtitle="Why Republicans have more redistricting moves available than Democrats."
        />
        <ContentCard>
          <p style={{ margin: 0 }}>
            The redistricting "war" is structurally tilted. Republicans control
            more state legislatures (28 vs. 17), and many of those are pure
            partisan-controlled redistricting states. Democratic states more
            often have legal barriers:
          </p>
          <ul style={{ marginTop: 12, paddingLeft: 20, color: "#CBD5E1", fontSize: 14, lineHeight: 1.7 }}>
            <li><span style={{ color: "#F8FAFC", fontWeight: 600 }}>Independent commissions</span> in California (suspended for now), Arizona, Colorado, Michigan, Washington, New Jersey</li>
            <li><span style={{ color: "#F8FAFC", fontWeight: 600 }}>Constitutional bans on mid-decade redistricting</span> in Virginia (worked around), New York</li>
            <li><span style={{ color: "#F8FAFC", fontWeight: 600 }}>Court-imposed limits</span> in Florida, Pennsylvania (state-court interpretations of state constitutions)</li>
            <li><span style={{ color: "#F8FAFC", fontWeight: 600 }}>Maryland</span> only has one Republican seat to flip, limiting upside</li>
          </ul>
          <p style={{ marginTop: 12, color: "#94A3B8", fontSize: 13 }}>
            This is why the "fight fire with fire" framing is debatable on its
            own terms: Democrats have fewer firefighters than Republicans, and
            the ones they do have are mostly behind reform-era safeguards they'd
            have to dismantle to use.
          </p>
        </ContentCard>
      </div>
    </>
  );

  // ============== COMMISSIONS TAB ==============
  const CommissionsPanel = () => (
    <>
      <SectionHeader
        title="Why Independent Commissions Get Overturned"
        subtitle="The honest answer is more complicated than 'pure political gain.'"
      />
      <ContentCard>
        <p style={{ margin: 0 }}>
          Independent commissions have been a reform priority for 30 years. Voters
          across the political spectrum support them in the abstract — Arizona,
          California, Colorado, Michigan, and Washington all approved them by
          referendum, often with bipartisan majorities. So why do legislatures
          and even voters then suspend them when partisan stakes get high?
          Several genuine reasons, not all cynical:
        </p>
      </ContentCard>

      <div style={{ marginTop: 24 }}>
        {[
          {
            color: "#FB7185",
            title: "1. The Unilateral Disarmament Problem",
            body: "If only some states use independent commissions, those states' parties operate at a structural disadvantage when others gerrymander. California's commission produces a fair map; Texas produces a partisan one. The net effect across states is a Republican advantage. The argument for Prop 50: a commission only works if it's universal, and unilateral commitment to fairness against an opponent who won't reciprocate is naive. The argument against: this is the moral logic of a perpetual arms race.",
          },
          {
            color: "#FBBF24",
            title: "2. Geographic Sorting Doesn't Produce 'Fair' Maps",
            body: "Even a perfectly nonpartisan commission produces maps that systematically disadvantage one party — typically Democrats, whose voters concentrate in cities. California's commission map gave Republicans 17% of seats on 39% of votes. That's not the commission's failure, but it is a real democratic complaint. Voters who feel structurally underrepresented may rationally prefer a partisan map that compensates.",
          },
          {
            color: "#FB923C",
            title: "3. Commissions Are Slow and Their Maps Get Litigated Anyway",
            body: "Independent commissions take 1-2 years and produce maps that still face lawsuits under the Voting Rights Act, the 14th Amendment, and state constitutions. Utah's commission map was struck down by a state judge in November 2025 for violating an anti-gerrymandering provision. The 'independent' label doesn't immunize maps from contestation; it shifts the venue.",
          },
          {
            color: "#A78BFA",
            title: "4. They Lock In Whoever Wrote the Rules",
            body: "Commissions reflect the political balance at the moment they were created. California's 5-5-4 split locked in 2008 assumptions about partisan parity that don't match 2025 demographics. Critics on the right argue commissions freeze Democratic registration advantages; critics on the left argue they advantage rural voters. Both are partly correct.",
          },
          {
            color: "#60A5FA",
            title: "5. They Solve One Problem While Creating Another",
            body: "Commissions reduce extreme partisan gerrymandering but increase the influence of well-funded incumbents and demographic consultants. Drawing 'community-of-interest' districts requires interpretation. Commissioners — even when balanced — have to make value judgments. The work isn't apolitical; it's just less openly political.",
          },
          {
            color: "#2DD4BF",
            title: "6. Voters Often Approve Suspension Once Stakes Are Real",
            body: "Prop 50 passed 64.4%-35.6%. The same California voters who approved the commission in 2008 (Prop 11: 51%-49%) and expanded it in 2010 (Prop 20: 61%-39%) voted to suspend its congressional authority in 2025. The suspension framing — 'temporary, returns after 2030' — was politically essential. A permanent abolition would likely have failed.",
          },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              borderRadius: 12,
              border: `1px solid ${item.color}40`,
              background: `${item.color}08`,
              padding: 20,
              marginBottom: 12,
            }}
          >
            <div style={{ color: item.color, fontWeight: 600, fontSize: 15, marginBottom: 8 }}>
              {item.title}
            </div>
            <p style={{ color: "#CBD5E1", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </>
  );

  // ============== HONEST ASSESSMENT TAB ==============
  const HonestPanel = () => (
    <>
      <SectionHeader
        title="Honest Assessment"
        subtitle="What's defensible, what's spin, and where the real debate lies."
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
          What's accurate on both sides:
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 12,
          }}
        >
          {[
            "Texas drew its new map for partisan gain — the DOJ racial-pretext letter was politically convenient cover",
            "California's Prop 50 is also a partisan gerrymander — Newsom said as much when proposing it",
            "Both maps will likely produce roughly the seat shifts their drawers intended",
            "Independent commissions don't produce 'neutral' maps — they reduce extreme partisan distortion but can't eliminate geographic effects",
            "Mid-decade redistricting is unusual; this is the largest such cycle since the 1960s",
            "The Supreme Court's Rucho decision (2019) made partisan gerrymandering unreviewable in federal court",
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
          What's spin from each side:
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 12,
          }}
        >
          {[
            "GOP claim that Texas was correcting a racial gerrymander — but the DOJ letter post-dated the political decision",
            "DEM claim that Prop 50 'preserves' the commission — it suspends its core function for the cycle that matters most",
            "Both sides framing their gerrymander as 'defensive' while the other's is 'aggressive'",
            "The 'fair maps' framing — no map is fair under partisan geography; the question is which distortions are tolerable",
            "Newsom's framing that this is about Trump specifically — the gerrymander persists through 2030 regardless of who wins",
            "GOP claim that the CA commission already produced a Republican-disadvantaged map — that gap is geographic, not commission-engineered",
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
          The 2025–26 redistricting cascade is{" "}
          <span style={{ color: "#F8FAFC", fontWeight: 600 }}>
            a coordination failure at the federal level
          </span>{" "}
          that both parties are exploiting at the state level. The Supreme Court's
          Rucho decision (2019) ruled partisan gerrymandering claims unreviewable
          in federal court — pushing the entire dispute into state-by-state
          combat. There is no national umpire. Both parties are responding to
          that vacuum rationally if you accept the premise that maximizing seats
          is the legitimate goal.
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
          The honest critique applies to both: you cannot simultaneously claim
          independent commissions are the gold standard and suspend yours when
          stakes get high. You cannot simultaneously claim partisan gerrymandering
          is illegitimate and engineer one yourself. Most participants in this
          fight have made both claims within the past 12 months. The real
          structural fix — federal redistricting standards, or restoration of
          federal-court review — would require congressional action that neither
          party currently has the votes for. Until then, the cascade continues.
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
              "linear-gradient(135deg, rgba(255,107,107,0.18) 0%, rgba(96,165,250,0.10) 30%, rgba(15,23,42,0) 70%)",
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
              Gerrymandering 2026
            </h1>
            <p
              style={{
                marginTop: 12,
                color: "#CBD5E1",
                fontSize: 17,
                maxWidth: 640,
              }}
            >
              The largest mid-decade redistricting cycle in 60 years. Texas,
              California, Virginia, Missouri, North Carolina, Ohio, Utah — and
              what it tells us about why "independent" is harder than it sounds.
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
        {tab === "california" && <CaliforniaPanel />}
        {tab === "texas" && <TexasPanel />}
        {tab === "virginia" && <VirginiaPanel />}
        {tab === "cascade" && <CascadePanel />}
        {tab === "commissions" && <CommissionsPanel />}
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
          California Legislative Analyst's Office (Prop 50 analysis); Ballotpedia
          (CA Prop 50, 2025 Texas redistricting, 2026 redistricting tracker); CNN,
          NPR, CBS News, ABC News (election coverage); Texas Tribune; Houston
          Public Media; Brownstein Hyatt Farber Schreck (Prop 50 legal analysis);
          Virginia Public Access Project; Wikipedia (2025 California Prop 50,
          2025 Texas redistricting); US Supreme Court orders (Dec 4, 2025);
          Rucho v. Common Cause (2019).
        </div>
      </div>
    </div>
  );
}
