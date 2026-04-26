import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList, ReferenceLine, LineChart, Line, PieChart, Pie } from "recharts";
const C={coral:"#FF6B6B",amber:"#FBBF24",green:"#34D399",teal:"#2DD4BF",blue:"#60A5FA",purple:"#A78BFA",orange:"#FB923C",cyan:"#22D3EE",white:"#F8FAFC",slate:"#94A3B8",bg:"#0F172A",card:"#1E293B",border:"#334155"};
const Section=({title,subtitle,children,accent=C.blue})=>(<div style={{marginBottom:44}}><h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:24,fontWeight:700,color:C.white,marginBottom:4,borderLeft:"4px solid "+accent,paddingLeft:16}}>{title}</h2>{subtitle&&<p style={{fontSize:15,color:C.slate,marginTop:4,marginBottom:18,paddingLeft:20}}>{subtitle}</p>}{children}</div>);
const Stat=({label,value,sub,color=C.blue})=>(<div style={{background:C.card,border:"1px solid "+C.border,borderRadius:8,padding:"14px 18px",flex:"1 1 140px",minWidth:140}}><div style={{fontSize:11,color:C.slate,textTransform:"uppercase",letterSpacing:1}}>{label}</div><div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:28,fontWeight:700,color,marginTop:4}}>{value}</div>{sub&&<div style={{fontSize:12,color:C.slate,marginTop:2}}>{sub}</div>}</div>);
const Tip=({active,payload,label})=>{if(!active||!payload)return null;return(<div style={{background:"#0F172AEE",border:"1px solid "+C.border,borderRadius:6,padding:"8px 12px",fontSize:12}}><div style={{color:C.white,fontWeight:600,marginBottom:3}}>{label}</div>{payload.map(function(p,i){return <div key={i} style={{color:p.color||p.fill,marginTop:1}}>{p.name}: {typeof p.value==="number"?p.value.toLocaleString():p.value}</div>;})}</div>);};
const Callout=({children,color=C.blue})=>(<div style={{marginTop:14,padding:"14px 18px",background:color+"15",border:"1px solid "+color+"55",borderRadius:6,fontSize:15,color:C.white,lineHeight:1.65}}>{children}</div>);
const Chart=({children,height=320})=>(<div style={{background:C.card,borderRadius:8,padding:"18px 10px",border:"1px solid "+C.border}}><ResponsiveContainer width="100%" height={height}>{children}</ResponsiveContainer></div>);
const Cards=({items})=>(<div style={{display:"flex",flexWrap:"wrap",gap:16}}>{items.map(function(c,i){return(<div key={i} style={{flex:"1 1 200px",background:c.bg||C.card,border:"1px solid "+C.border,borderRadius:8,padding:16,borderLeft:c.border?"3px solid "+c.color:"none",borderTop:c.topBorder?"3px solid "+c.color:"none"}}>{c.icon&&<div style={{fontSize:22,marginBottom:6}}>{c.icon}</div>}<h4 style={{fontSize:15,color:c.color,marginBottom:6,fontWeight:700}}>{c.title}</h4><p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.5}}>{c.desc}</p></div>);})}</div>);
var Src=function(p){return <a href={p.href} target="_blank" rel="noopener noreferrer" style={{color:C.cyan,fontSize:12,textDecoration:"none"}}>{p.children}</a>;};

var migrationData=[{year:"2020-21",domestic:-261,international:86},{year:"2021-22",domestic:-407,international:91},{year:"2022-23",domestic:-249,international:151},{year:"2023-24",domestic:-140,international:260},{year:"2024-25",domestic:-216,international:126}];
var originData=[{country:"Mexico",pop:3950,fill:C.coral},{country:"Philippines",pop:856,fill:C.orange},{country:"China",pop:823,fill:C.amber},{country:"India",pop:626,fill:C.green},{country:"Vietnam",pop:514,fill:C.teal},{country:"El Salvador",pop:456,fill:C.blue}];
var costData=[{item:"Medi-Cal",cost:8.4,fill:C.coral},{item:"K-12 Education",cost:14.5,fill:C.orange},{item:"Incarceration",cost:1.5,fill:C.amber},{item:"Tax Revenue",cost:-8.5,fill:C.green}];

var h1bTimeline=[{year:"2014",approvals:316},{year:"2015",approvals:275},{year:"2016",approvals:345},{year:"2017",approvals:366},{year:"2018",approvals:335},{year:"2019",approvals:389},{year:"2020",approvals:426},{year:"2021",approvals:407},{year:"2022",approvals:442},{year:"2023",approvals:386},{year:"2024",approvals:399}];
var h1bOrigin=[{country:"India",pct:72.3,color:C.coral},{country:"China",pct:11.7,color:C.amber},{country:"Philippines",pct:1.5,color:C.green},{country:"Canada",pct:1.0,color:C.teal},{country:"S. Korea",pct:1.0,color:C.blue},{country:"Taiwan",pct:0.7,color:C.purple},{country:"Other",pct:11.8,color:C.slate}];
var h1bCAEmployers=[{employer:"Google",approvals:8400,fill:C.blue},{employer:"Apple",approvals:7500,fill:C.coral},{employer:"Meta",approvals:6200,fill:C.purple},{employer:"TCS",approvals:5100,fill:C.amber},{employer:"Infosys",approvals:4400,fill:C.orange},{employer:"Cisco",approvals:3800,fill:C.green},{employer:"Cognizant",approvals:3500,fill:C.teal},{employer:"Intel",approvals:3300,fill:C.cyan}];

var tabs=[{id:"overview",label:"Overview"},{id:"migration",label:"Population Flow"},{id:"h1b",label:"H-1B Visas"},{id:"undoc",label:"Undocumented"},{id:"costs",label:"Cost vs. Revenue"},{id:"policy",label:"Policy & Conflict"},{id:"honest",label:"Honest Assessment"}];

export default function ImmigrationPopulation(){
var s=useState("overview"),tab=s[0],setTab=s[1];
return(<>
<div style={{background:C.card,borderBottom:"1px solid "+C.border,padding:"0 24px",overflowX:"auto",whiteSpace:"nowrap"}}><div style={{maxWidth:900,margin:"0 auto",display:"flex"}}>{tabs.map(function(t){return(<button key={t.id} onClick={function(){setTab(t.id);}} style={{background:"none",border:"none",borderBottom:tab===t.id?"3px solid "+C.orange:"3px solid transparent",color:tab===t.id?C.white:C.slate,fontSize:14,fontWeight:tab===t.id?700:400,padding:"12px 16px",cursor:"pointer",fontFamily:"'Source Sans 3',sans-serif"}}>{t.label}</button>);})}</div></div>
<div style={{maxWidth:900,margin:"0 auto",padding:"26px 24px"}}>

{tab==="overview"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="Immigrants" value="10.9M" sub="28% of CA population" color={C.blue}/>
<Stat label="Undocumented" value="2.25M" sub="Down from 2.8M (2007)" color={C.orange}/>
<Stat label="Domestic Loss" value="−1.46M" sub="Net out-migration 2020-24" color={C.coral}/>
<Stat label="House Seats" value="52→48" sub="Projected loss by 2030" color={C.purple}/>
</div>

<Section title="Two Migrations, One State" subtitle="California is simultaneously losing Americans and gaining immigrants" accent={C.orange}>
<p style={{fontSize:15,color:"#CBD5E1",lineHeight:1.7,marginBottom:14}}>California is home to 10.9 million immigrants — 22% of the US foreign-born population. 28% of Californians are foreign-born (double the national 13%). Almost half (44%) of California's children have at least one immigrant parent. The vast majority were born in Latin America (49%) or Asia (41%). <Src href="https://www.ppic.org/publication/immigrants-in-california/">PPIC</Src></p>
<p style={{fontSize:15,color:"#CBD5E1",lineHeight:1.7,marginBottom:14}}>At the same time, the state has experienced 20+ years of continuous negative domestic migration. Since 2020, 1.46 million more people left for other states than arrived, while 934,000 international migrants came in. The net result: California's population is still below its April 2020 Census count. <Src href="https://dof.ca.gov/forecasting/demographics/estimates/E-2/">CA DOF</Src></p>
<Callout color={C.orange}>The state is undergoing a <strong>population exchange</strong> — losing domestic residents (disproportionately higher-income, educated, Republican-leaning) while gaining international migrants (younger, more economically diverse). This reshapes the tax base, political composition, workforce, and demand for public services.</Callout>
</Section>

<Section title="Top Countries of Origin" subtitle="California's immigrant population by birth country (thousands)" accent={C.blue}>
<Chart height={250}>
<BarChart data={originData} margin={{left:10,right:30,top:20}} layout="vertical">
<CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false}/>
<XAxis type="number" tick={{fill:C.slate,fontSize:11}} tickFormatter={function(v){return v+"K";}}/>
<YAxis type="category" dataKey="country" tick={{fill:C.slate,fontSize:11}} width={90}/>
<Tooltip content={<Tip/>}/>
<Bar dataKey="pop" name="Population (thousands)" radius={[0,4,4,0]} barSize={28}>
{originData.map(function(d,i){return <Cell key={i} fill={d.fill}/>;})}</Bar>
</BarChart>
</Chart>
</Section>
</>)}

{tab==="migration"&&(<>
<Section title="The Population Flow" subtitle="Domestic out-migration vs. international arrivals (thousands/year)" accent={C.coral}>
<Chart height={300}>
<BarChart data={migrationData} margin={{left:10,right:20,top:20}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false}/>
<XAxis dataKey="year" tick={{fill:C.slate,fontSize:10}}/>
<YAxis tick={{fill:C.slate,fontSize:11}} tickFormatter={function(v){return v+"K";}}/>
<Tooltip content={<Tip/>}/>
<Bar dataKey="domestic" name="Domestic (net)" radius={[4,4,0,0]} barSize={30} fill={C.coral}/>
<Bar dataKey="international" name="International (net)" radius={[4,4,0,0]} barSize={30} fill={C.blue}/>
</BarChart>
</Chart>
<Callout color={C.coral}>The 2023-24 year looked better: domestic outflow slowed to −140K while international arrivals surged to 260K (highest since 2018, driven by humanitarian programs). Then 2024-25 reversed: Trump terminated humanitarian programs, cutting international migration in half. Domestic outflow worsened to −216K. <strong>Net total migration: −89,000.</strong></Callout>
</Section>

<Section title="Where They're Going" accent={C.amber}>
<Cards items={[
{title:"Top Destinations",desc:"Arizona, Texas, Nevada, Oregon, Washington. High-income leavers disproportionately choose no-income-tax states (TX, FL, NV, TN, WA).",color:C.amber,topBorder:true},
{title:"Who's Leaving",desc:"Younger, wealthier, more educated than average. 39% of 2020-24 leavers were Republican (vs 25% of all registrants). 54% of in-migrants were Democratic.",color:C.coral,topBorder:true},
{title:"Business Exodus",desc:"Highest net corporate outflow of any state 2015-2025. Schwab, Oracle, HPE, Palantir, Tesla, SpaceX, Chevron all relocated HQ — mostly to Texas.",color:C.orange,topBorder:true},
{title:"Income Drain",desc:"IRS data: CA lost $24B in net adjusted gross income via domestic out-migration 2011-2021. $102B by some calculations.",color:C.purple,topBorder:true},
]}/>
</Section>

<Section title="Political Representation" accent={C.purple}>
<p style={{fontSize:15,color:"#CBD5E1",lineHeight:1.7,marginBottom:14}}>California lost a House seat for the first time in its history in the 2020 redistricting (53→52). Multiple forecasts project a loss of <strong>4 more seats</strong> after 2030 (down to 48). Texas is projected to gain 4 (to 42), potentially surpassing CA as the largest delegation by 2040. Every lost seat = one fewer electoral vote.</p>
<Callout color={C.purple}>Ironically, Biden-era immigration temporarily propped up CA's Census count. But many immigrants subsequently moved to TX and FL. The largest single state-to-state flow (2022-24): <strong>171,000 people from California to Texas.</strong> So immigration buoys blue-state counts temporarily while accelerating red-state growth. <Src href="https://www.brennancenter.org/our-work/analysis-opinion/how-states-seats-us-house-could-change-after-next-census">Brennan Center</Src></Callout>
</Section>
</>)}

{tab==="h1b"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:20}}>
<Stat label="Annual Cap" value="85,000" sub="65K regular + 20K masters" color={C.blue}/>
<Stat label="Lottery Odds" value="5.5:1" sub="2024 registrations vs slots" color={C.coral}/>
<Stat label="CA Share" value="~26%" sub="Of all US H-1B approvals" color={C.amber}/>
<Stat label="Active in CA" value="~165K" sub="Estimated H-1B workforce" color={C.purple}/>
</div>

<Section title="The Cap Hasn't Moved Since 2004" subtitle="Annual H-1B approvals (initial + extensions, thousands)" accent={C.blue}>
<Chart height={300}>
<LineChart data={h1bTimeline} margin={{left:0,right:30,top:20}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
<XAxis dataKey="year" tick={{fill:C.slate,fontSize:12}}/>
<YAxis tick={{fill:C.slate,fontSize:11}} tickFormatter={function(v){return v+"K";}} domain={[0,500]}/>
<Tooltip content={<Tip/>}/>
<ReferenceLine y={85} stroke={C.coral} strokeDasharray="5 5" label={{value:"New-petition cap: 85K",fill:C.coral,fontSize:11,position:"insideTopRight"}}/>
<Line type="monotone" dataKey="approvals" name="Total approvals" stroke={C.blue} strokeWidth={3} dot={{r:4}}/>
</LineChart>
</Chart>
<Callout color={C.blue}>The 85,000 annual cap on <strong>new</strong> H-1Bs has not budged since 2004. But extensions and renewals are uncapped, so total approvals each year run 4-5× the cap. The 2024 lottery saw <strong>470,000 registrations for 85,000 slots</strong> (~5.5:1 odds). USCIS introduced a "beneficiary-centric" rule in 2025 to curb gaming. <Src href="https://www.uscis.gov/sites/default/files/document/data/h-1b-petitions-by-gender-country-of-birth-fy2023.pdf">USCIS H-1B FY2023 report</Src></Callout>
</Section>

<Section title="Where They Come From" subtitle="H-1B approvals by country of birth, FY 2023" accent={C.green}>
<div style={{display:"flex",flexWrap:"wrap",gap:20,alignItems:"center"}}>
<div style={{flex:"1 1 280px"}}>
<Chart height={300}>
<PieChart>
<Pie data={h1bOrigin} dataKey="pct" nameKey="country" cx="50%" cy="50%" outerRadius={110} innerRadius={55} paddingAngle={2} label={function(p){return p.country+" "+p.pct+"%";}} labelLine={{stroke:C.slate}}>
{h1bOrigin.map(function(d,i){return <Cell key={i} fill={d.color} stroke="#1E293B" strokeWidth={2}/>;})}
</Pie>
<Tooltip content={<Tip/>}/>
</PieChart>
</Chart>
</div>
<div style={{flex:"1 1 280px",background:C.card,border:"1px solid "+C.border,borderRadius:8,padding:18}}>
<h3 style={{fontSize:16,color:C.green,marginBottom:10,fontFamily:"'Playfair Display',serif"}}>India's growing dominance</h3>
<p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.6,marginBottom:10}}>India's share has grown from <strong style={{color:C.white}}>~40% in 2003</strong> to <strong style={{color:C.white}}>72%+ today</strong>. Three drivers: (1) the rise of US STEM pipelines among Indian graduates, (2) Indian outsourcing firms (TCS, Infosys, Wipro, Cognizant) using H-1B for client-site placements, and (3) China's share holding flat as Chinese tech grew domestically.</p>
<p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.6}}>The <strong style={{color:C.coral}}>7% per-country green-card cap</strong> means Indian H-1B holders face a backlog of 50+ years for an EB-2/3. They renew H-1B repeatedly while waiting — many become "permanently temporary."</p>
</div>
</div>
</Section>

<Section title="California's Top H-1B Sponsors" subtitle="Approvals to CA-based employers, recent year" accent={C.amber}>
<Chart height={320}>
<BarChart data={h1bCAEmployers} margin={{left:10,right:30,top:20}} layout="vertical">
<CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false}/>
<XAxis type="number" tick={{fill:C.slate,fontSize:11}} tickFormatter={function(v){return v.toLocaleString();}}/>
<YAxis type="category" dataKey="employer" tick={{fill:C.slate,fontSize:11}} width={90}/>
<Tooltip content={<Tip/>}/>
<Bar dataKey="approvals" name="Approvals" radius={[0,4,4,0]} barSize={22}>
{h1bCAEmployers.map(function(d,i){return <Cell key={i} fill={d.fill}/>;})}
<LabelList dataKey="approvals" position="right" fill={C.white} fontSize={11} formatter={function(v){return v.toLocaleString();}}/>
</Bar>
</BarChart>
</Chart>
<Callout color={C.amber}>CA receives <strong>~26-28%</strong> of all H-1B approvals nationally — roughly double Texas (#2) and triple New York (#3). Top sponsors split between <strong>Big Tech direct hires</strong> (Apple, Google, Meta, Cisco, Intel) and <strong>Indian outsourcing bodyshops</strong> (TCS, Infosys, Cognizant) that place workers at client sites. <Src href="https://www.uscis.gov/h-1b-data-hub">USCIS H-1B Employer Data Hub</Src></Callout>
</Section>

<Section title="Why It Matters" accent={C.purple}>
<Cards items={[
{title:"The talent funnel",desc:"H-1B → green card → citizen is the primary path for skilled tech immigration. CA's tech industry was built on it; ~25% of Bay Area engineers hold H-1B at any given time.",color:C.green,topBorder:true},
{title:"The wage debate",desc:"Outsourcing-firm H-1Bs are filed at the lowest of four DOL wage tiers (Level I, ~$85K). Big-tech H-1Bs file at Levels III-IV ($180K+). The 'displaces US workers' argument is heavily about Level I.",color:C.coral,topBorder:true},
{title:"The 'durable temporary' problem",desc:"H-1Bs are 'temporary' but green-card backlogs trap Indians for decades. Job changes restart paperwork. US-born children age out of dependent status at 21, often leading to self-deportation of young adults.",color:C.orange,topBorder:true},
{title:"The cap is stuck",desc:"85K since 2004 while the US labor market grew 25%+ and the global tech industry doubled. Reform bills proposing 195K-300K caps (Issa, Lofgren) consistently fail to clear. Both parties officially favor expansion. None passes.",color:C.purple,topBorder:true},
]}/>
</Section>

<Section title="Sources" accent={C.slate}>
<p style={{fontSize:13,color:"#CBD5E1",lineHeight:1.7}}>
<Src href="https://www.uscis.gov/h-1b-data-hub">USCIS H-1B Employer Data Hub</Src> · <Src href="https://www.uscis.gov/working-in-the-united-states/h-1b-specialty-occupations">USCIS H-1B program data</Src> · <Src href="https://www.dhs.gov/ohss/topics/immigration/yearbook">DHS Yearbook of Immigration Statistics</Src> · <Src href="https://www.dol.gov/agencies/eta/foreign-labor/performance">DOL Foreign Labor Certification</Src>
</p>
</Section>
</>)}

{tab==="undoc"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:20}}>
<Stat label="Undocumented" value="2.25M" sub="Pew Research, 2023" color={C.orange}/>
<Stat label="CA Share" value="16%" sub="Down from 23% of US total" color={C.amber}/>
<Stat label="Workforce" value="~1.75M" sub="9% of CA workers" color={C.blue}/>
<Stat label="On Medi-Cal" value="1.7M" sub="Full-scope (enrollment frozen)" color={C.purple}/>
</div>

<Section title="Profile" subtitle="California's undocumented population: established, concentrated, essential to key industries" accent={C.orange}>
<p style={{fontSize:15,color:"#CBD5E1",lineHeight:1.7,marginBottom:14}}>Most are long-term residents — nationally, 66% have lived in the US 10+ years. ~40% reside in LA County. Concentrated in agriculture, construction, hospitality, domestic services, and food processing. 80% of California's immigrants are legal residents or citizens (2023). 54% are naturalized (up from 31% in 1990). <Src href="https://www.ppic.org/publication/undocumented-immigrants-in-california/">PPIC</Src></p>
<Cards items={[
{title:"Education",desc:"~162K foreign-born K-12 students. ~86,800 undocumented in CA colleges. $23,878/student in K-12. CA Dream Act provides state financial aid.",color:C.amber,topBorder:true},
{title:"Economic Impact",desc:"USC estimated $275B in statewide losses if all undocumented workers were removed — labor shortages, price increases, reduced business activity.",color:C.blue,topBorder:true},
{title:"Public Opinion",desc:"73% of Californians (Oct 2025) say immigrants are a benefit. 74% favor a legal pathway for undocumented residents — consistent since PPIC first asked in 2016.",color:C.green,topBorder:true},
]}/>
</Section>
</>)}

{tab==="costs"&&(<>
<Section title="The Full Cost Question" subtitle="What does undocumented immigration cost California — and what does it generate?" accent={C.amber}>
<Chart height={280}>
<BarChart data={costData} margin={{left:10,right:30,top:20}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false}/>
<XAxis dataKey="item" tick={{fill:C.slate,fontSize:10}}/>
<YAxis tick={{fill:C.slate,fontSize:11}} tickFormatter={function(v){return (v<0?"-":"")+"$"+Math.abs(v)+"B";}} domain={[-10,16]} ticks={[-8.5,0,5,10,15]}/>
<Tooltip content={<Tip/>}/>
<ReferenceLine y={0} stroke={C.slate}/>
<Bar dataKey="cost" name="Annual ($B)" radius={[4,4,0,0]} barSize={50}>
{costData.map(function(d,i){return <Cell key={i} fill={d.fill}/>;})}</Bar>
</BarChart>
</Chart>
<Callout color={C.amber}>Identifiable state/local costs (~$24-31B) significantly exceed identifiable tax revenues (~$8.5B), producing a <strong>net fiscal cost of roughly $17-22B/year</strong>. But this requires major caveats — see below.</Callout>
</Section>

<Section title="Cost Side" accent={C.coral}>
<Cards items={[
{title:"Medi-Cal: $8.4-9.5B GF",desc:"FY 2024-25 actuals. Original LAO projection was $2.1B ongoing — actual costs exceeded estimates by 4×. Enrollment + pharmacy costs far higher than budgeted.",color:C.coral,icon:"🏥"},
{title:"K-12 Education: ~$14.5B",desc:"For ~607K students at $23,878/student. Most are US citizens (children of undocumented parents). Constitutionally mandated under Plyler v. Doe (1982).",color:C.orange,icon:"🏫"},
{title:"Incarceration: ~$1.5B",desc:"Net annual cost after limited federal SCAAP reimbursements.",color:C.amber,icon:"⚖️"},
]}/>
</Section>

<Section title="Revenue Side" accent={C.green}>
<Cards items={[
{title:"$8.5B in State/Local Taxes",desc:"ITEP 2022 study. 46% sales/excise, 31% property, 21% income/business. Would rise to $10.3B with work authorization.",color:C.green,icon:"💰"},
{title:"Federal Taxes (Additional)",desc:"Nationally $59.4B in federal taxes (2022). CA share proportionally significant — 16% of US undocumented population.",color:C.teal,icon:"🏛️"},
{title:"$275B GDP Contribution",desc:"USC estimate of statewide economic losses from total removal. Proxy for economic output contribution.",color:C.blue,icon:"📈"},
]}/>
</Section>

<Section title="Why the Numbers Are Contested" accent={C.slate}>
<Cards items={[
{title:"Costs May Be Overstated",desc:"K-12 costs (~$14.5B) are for US-citizen children. Medi-Cal displaces costlier ER uncompensated care. Economic multiplier effects aren't captured. Some federal matching offsets state costs.",color:C.green,topBorder:true},
{title:"Costs May Be Understated",desc:"Medi-Cal costs exceeded LAO projections by 4× within 3 years. Infrastructure pressure not included. Wage suppression effects documented but excluded. No formal state fiscal impact study exists.",color:C.coral,topBorder:true},
]}/>
<Callout color={C.amber}><strong>The projection problem:</strong> The LAO estimated in 2021 that full-scope Medi-Cal expansion would cost $2.1B/year ongoing. By Feb 2025, actual spending was $8.4B — the Department of Finance acknowledged $2.7B beyond budget. This pattern of dramatic underestimation complicates all fiscal planning. <Src href="https://calmatters.org/health/2025/03/medi-cal-budget-shortfall/">CalMatters</Src></Callout>
</Section>
</>)}

{tab==="policy"&&(<>
<Section title="Sanctuary Policy (SB 54)" subtitle="The California Values Act — what it does and doesn't do" accent={C.blue}>
<p style={{fontSize:15,color:"#CBD5E1",lineHeight:1.7,marginBottom:14}}>Passed 2017, SB 54 prevents local law enforcement from using resources for federal immigration enforcement — <strong>except</strong> for individuals convicted of serious/violent felonies (~800 qualifying offenses). A 2020 study found no impact on crime rates. Survived federal legal challenge (9th Circuit); Supreme Court declined to hear the case. <Src href="https://en.wikipedia.org/wiki/California_Senate_Bill_54_(2017)">Wikipedia/SB54</Src></p>
<Callout color={C.blue}>SB 54 does <strong>not</strong> protect violent criminals. State prisons have handed <strong>9,000+ individuals</strong> to ICE since 2019. In FY 2025, ICE picked up 87% of inmates with active detainers. Some sheriffs complain ICE doesn't pick up everyone they flag. <Src href="https://calmatters.org/justice/2025/07/sanctuary-state-immigration-raid/">CalMatters</Src></Callout>
</Section>

<Section title="2025-26 Escalation" accent={C.coral}>
<Cards items={[
{title:"LA Raids (Jun 2025)",desc:"Large-scale ICE operations in LA sparked weeks of protests. National Guard deployed. Trump threatened Bay Area forces, then backed off.",color:C.coral,icon:"🚨"},
{title:"Newsom Resistance Laws (Sep 2025)",desc:"First-in-nation ban on ICE agents wearing masks. SB 48 limits ICE access to schools. DHS called mask bill 'despicable.' Constitutional challenges expected.",color:C.orange,icon:"📜"},
{title:"H.R. 1 (Jul 2025)",desc:"FMAP for emergency services for undocumented drops from 90% to 50% (Oct 2026). Work requirements imposed. $658M annual hit to CA General Fund.",color:C.amber,icon:"💵"},
{title:"Medi-Cal Freeze (Jan 2026)",desc:"No new undocumented adults can enroll in full-scope coverage. Existing enrollees retained. $30/month premiums start Jul 2027. Dental eliminated Jul 2026.",color:C.purple,icon:"❄️"},
]}/>
</Section>

<Section title="How Hospitals Get Paid (The Three Layers)" accent={C.teal}>
<Cards items={[
{title:"Layer 1: EMTALA",desc:"Federal mandate (1986): hospitals must screen + stabilize ANY emergency patient regardless of status/insurance. Ends at stabilization. Largely unfunded — hospitals absorb costs.",color:C.coral,topBorder:true},
{title:"Layer 2: Emergency Medi-Cal",desc:"Federal Medicaid covers emergency + pregnancy services for qualifying undocumented residents. Jointly funded (historically 90% federal). H.R. 1 cuts to 50%. Still no primary care.",color:C.amber,topBorder:true},
{title:"Layer 3: Full-Scope Medi-Cal",desc:"CA's expansion (2016-2024): comprehensive coverage regardless of status. The $8.4B figure. Federal law bars federal funds — almost 100% state General Fund. Now frozen for new adults.",color:C.green,topBorder:true},
]}/>
<Callout color={C.teal}>With the enrollment freeze, new undocumented adults revert to <strong>emergency-only coverage</strong>. No primary care, no prescriptions, no chronic disease management. A patient with diabetes gets emergency care for DKA but not the insulin and monitoring to prevent it. This is more expensive in the long run — and hospitals bear the cost gap.</Callout>
</Section>
</>)}

{tab==="honest"&&(<>
<Section title="Honest Assessment" subtitle="Immigration is California's most polarized topic — the data is more nuanced than the politics" accent={C.amber}>
<div style={{background:"linear-gradient(135deg, #78350F22, #1E293B)",border:"1px solid "+C.amber+"55",borderRadius:8,padding:24}}>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.green}}>What California gets right:</strong></p>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:20}}>
{["Immigrants comprise 28% of population and are essential to agriculture, tech, healthcare, and construction","UC system + H-1B pipeline make CA the global talent magnet","73% of Californians view immigrants as beneficial — strong social consensus","Full-scope Medi-Cal expansion was evidence-based: primary care reduces costly ER utilization","Sanctuary law doesn't protect violent felons — 9,000+ handed to ICE since 2019","Uninsured rate dropped from 17.2% to 6.4% during the expansion era"].map(function(s,i){return(
<div key={i} style={{flex:"1 1 250px",background:C.bg,borderRadius:6,padding:10,borderLeft:"3px solid "+C.green,fontSize:13,color:"#CBD5E1"}}>{s}</div>);})}
</div>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.coral}}>What California gets wrong:</strong></p>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:20}}>
{["Medi-Cal expansion costs exceeded projections by 4× — $2.1B estimate became $8.4B","Net fiscal cost of $17-22B/year is real even if the exact number is debated","1.46M domestic out-migration 2020-24 threatens the tax base and political representation","Projected loss of 4 House seats by 2030 — historic decline in federal influence","State budget now structurally dependent on a program it can't fully afford","No formal fiscal impact study has ever been conducted — policy is flying blind on costs"].map(function(s,i){return(
<div key={i} style={{flex:"1 1 250px",background:C.bg,borderRadius:6,padding:10,borderLeft:"3px solid "+C.coral,fontSize:13,color:"#CBD5E1"}}>{s}</div>);})}
</div>
<p style={{fontSize:16,color:"#CBD5E1",lineHeight:1.7,fontStyle:"italic"}}>Immigration is California's defining policy tension. The economic contribution is real — $8.5B in taxes, essential workforce roles, $275B in GDP contribution. The fiscal cost is also real — $24B+ in identifiable public service costs. Both can be true. <strong style={{color:C.amber}}>The missing piece is honest accounting: California expanded coverage without accurate cost projections, and now faces a structural deficit partly of its own making. Fix the forecasting, and the politics becomes manageable.</strong></p>
</div>
</Section>
</>)}

</div>
</>);}
