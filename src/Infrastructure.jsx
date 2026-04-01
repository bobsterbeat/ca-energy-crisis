import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts";
const C={coral:"#FF6B6B",amber:"#FBBF24",green:"#34D399",teal:"#2DD4BF",blue:"#60A5FA",purple:"#A78BFA",orange:"#FB923C",cyan:"#22D3EE",white:"#F8FAFC",slate:"#94A3B8",bg:"#0F172A",card:"#1E293B",border:"#334155"};
const Section=({title,subtitle,children,accent=C.orange})=>(<div style={{marginBottom:44}}><h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:24,fontWeight:700,color:C.white,marginBottom:4,borderLeft:"4px solid "+accent,paddingLeft:16}}>{title}</h2>{subtitle&&<p style={{fontSize:15,color:C.slate,marginTop:4,marginBottom:18,paddingLeft:20}}>{subtitle}</p>}{children}</div>);
const Stat=({label,value,sub,color=C.orange})=>(<div style={{background:C.card,border:"1px solid "+C.border,borderRadius:8,padding:"14px 18px",flex:"1 1 140px",minWidth:140}}><div style={{fontSize:11,color:C.slate,textTransform:"uppercase",letterSpacing:1}}>{label}</div><div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:28,fontWeight:700,color,marginTop:4}}>{value}</div>{sub&&<div style={{fontSize:12,color:C.slate,marginTop:2}}>{sub}</div>}</div>);
const Callout=({children,color=C.orange})=>(<div style={{marginTop:14,padding:"14px 18px",background:color+"15",border:"1px solid "+color+"55",borderRadius:6,fontSize:15,color:C.white,lineHeight:1.65}}>{children}</div>);
const Cards=({items})=>(<div style={{display:"flex",flexWrap:"wrap",gap:16}}>{items.map(function(c,i){return(<div key={i} style={{flex:"1 1 200px",background:c.bg||C.card,border:"1px solid "+C.border,borderRadius:8,padding:16,borderLeft:c.border?"3px solid "+c.color:"none",borderTop:c.topBorder?"3px solid "+c.color:"none"}}>{c.icon&&<div style={{fontSize:22,marginBottom:6}}>{c.icon}</div>}<h4 style={{fontSize:15,color:c.color,marginBottom:6,fontWeight:700}}>{c.title}</h4><p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.5}}>{c.desc}</p></div>);})}</div>);

function gradeColor(g){if(g.startsWith("B"))return C.green;if(g.startsWith("C"))return C.amber;return C.coral;}

var grades=[
{cat:"Ports",grade:"B",change:"up",color:C.green},
{cat:"Rail",grade:"B",change:"same",color:C.green},
{cat:"Aviation",grade:"B-",change:"up",color:C.green},
{cat:"Wastewater",grade:"C+",change:"same",color:C.amber},
{cat:"Hazardous Waste",grade:"C",change:"up",color:C.amber},
{cat:"Bridges",grade:"C-",change:"same",color:C.amber},
{cat:"Solid Waste",grade:"C-",change:"same",color:C.amber},
{cat:"Transit",grade:"C-",change:"same",color:C.amber},
{cat:"Dams",grade:"D+",change:"down",color:C.coral},
{cat:"Drinking Water",grade:"D+",change:"down",color:C.coral},
{cat:"Levees",grade:"D+",change:"up",color:C.orange},
{cat:"Public Parks",grade:"D+",change:"same",color:C.coral},
{cat:"Schools",grade:"D+",change:"down",color:C.coral},
{cat:"Energy",grade:"D",change:"up",color:C.coral},
{cat:"Inland Waterways",grade:"D",change:"same",color:C.coral},
{cat:"Roads",grade:"D",change:"same",color:C.coral},
{cat:"Stormwater",grade:"D",change:"down",color:C.coral},
];

var tabs=[{id:"report",label:"Report Card"},{id:"roads",label:"Roads & Bridges"},{id:"water",label:"Water & Dams"},{id:"energy",label:"Energy Grid"},{id:"gap",label:"The $216B Gap"},{id:"honest",label:"What Works"}];

export default function Infrastructure(){
var s=useState("report"),tab=s[0],setTab=s[1];
return(<>
<div style={{background:C.card,borderBottom:"1px solid "+C.border,padding:"0 24px",overflowX:"auto",whiteSpace:"nowrap"}}><div style={{maxWidth:900,margin:"0 auto",display:"flex"}}>{tabs.map(function(t){return(<button key={t.id} onClick={function(){setTab(t.id);}} style={{background:"none",border:"none",borderBottom:tab===t.id?"3px solid "+C.orange:"3px solid transparent",color:tab===t.id?C.white:C.slate,fontSize:14,fontWeight:tab===t.id?700:400,padding:"12px 16px",cursor:"pointer",fontFamily:"'Source Sans 3',sans-serif"}}>{t.label}</button>);})}</div></div>
<div style={{maxWidth:900,margin:"0 auto",padding:"26px 24px"}}>

{tab==="report"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="Overall Grade" value="C-" sub="Below national C" color={C.coral}/>
<Stat label="Bridges" value="25,392" sub="65% past design life" color={C.orange}/>
<Stat label="Roads" value="30%" sub="In poor condition" color={C.amber}/>
<Stat label="Funding Gap" value="$216B" sub="Over 10 years" color={C.purple}/>
</div>

<Section title="ASCE 2025 Report Card for California" subtitle="17 infrastructure categories graded A through F">
<div style={{background:C.card,borderRadius:8,border:"1px solid "+C.border,overflow:"hidden"}}>
{grades.map(function(g,i){return(
<div key={i} style={{display:"flex",alignItems:"center",padding:"10px 20px",borderBottom:i<grades.length-1?"1px solid "+C.border:"none"}}>
<div style={{width:50,fontWeight:900,fontSize:18,color:gradeColor(g.grade),fontFamily:"'Playfair Display',serif",flexShrink:0}}>{g.grade}</div>
<div style={{flex:1,fontSize:14,color:C.white}}>{g.cat}</div>
<div style={{fontSize:12,color:g.change==="up"?C.green:g.change==="down"?C.coral:C.slate,fontWeight:600}}>{g.change==="up"?"Improved":g.change==="down"?"Declined":"Same"}</div>
</div>
);})}
</div>
<Callout color={C.coral}>California scores <strong>C-</strong>, below the national grade of C. Nine of 17 categories received a D+ or D. Four categories <strong>declined</strong> since 2019: dams, drinking water, schools, and stormwater. The 5th largest economy in the world is running on infrastructure that would get a student held back a year.</Callout>
</Section>
</>)}

{tab==="roads"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="Road Miles" value="177K" sub="Total miles" color={C.orange}/>
<Stat label="Poor Condition" value="30%" sub="vs 22% nationally" color={C.coral}/>
<Stat label="Bridges" value="25,392" sub="Total structures" color={C.amber}/>
<Stat label="Past Design Life" value="65%+" sub="Over 50 years old" color={C.coral}/>
</div>

<Section title="Roads: Grade D" subtitle="Nearly 30% in poor condition — the 5th largest economy has worse roads than the national average">
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>California has <strong style={{color:C.orange}}>177,000 miles of roads</strong>. Nearly <strong style={{color:C.coral}}>30% are in poor condition</strong>, compared to the national average of 22%. The state's roads carry some of the heaviest freight traffic in the nation, serve nearly 40 million residents, and must withstand earthquakes, wildfires, and flooding.</p>
<p style={{fontSize:16,color:C.white,lineHeight:1.7}}>Despite collecting the <strong style={{color:C.amber}}>highest gas tax in America</strong> (70.9 cents/gallon), road conditions lag the national average. Where is the money going?</p>
</div>
</Section>

<Section title="Bridges: Grade C-" subtitle="More than 65% are past their 50-year design life" accent={C.amber}>
<Cards items={[
{title:"25,392 Bridges",desc:"One of the largest bridge inventories in the nation. Critical for connecting communities across valleys, rivers, and mountain passes.",color:C.amber,icon:"\uD83C\uDF09",topBorder:true},
{title:"65% Past Design Life",desc:"More than two-thirds of California's bridges are older than their intended 50-year lifespan. Many were built in the 1950s-60s highway boom.",color:C.coral,icon:"\u23F3",topBorder:true},
{title:"6% in Poor Condition",desc:"Matches the national average, but California's bridges face additional seismic, wildfire, flood, and sea level rise challenges.",color:C.orange,icon:"\u26A0\uFE0F",topBorder:true},
{title:"Earthquake Retrofits",desc:"California leads in seismic retrofit investment. But many local bridges haven't been upgraded. Funding for local agencies remains a challenge.",color:C.green,icon:"\uD83C\uDFD7\uFE0F",topBorder:true},
]}/>
<Callout color={C.amber}>California charges the <strong>highest gas tax</strong>, the <strong>highest registration fees</strong>, and generates billions in transportation revenue. Yet its roads are worse than average and most of its bridges are past their design life. The $216 billion funding gap shows the problem isn't just money — it's the cost of building anything in California.</Callout>
</Section>
</>)}

{tab==="water"&&(<>
<Section title="Drinking Water: Grade D+" subtitle="Downgraded from C in 2019 — the only direction is down" accent={C.coral}>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
<div style={{display:"flex",flexWrap:"wrap",gap:16,marginBottom:16}}>
{[
{stat:"85%",label:"Utilities with aging components",sub:"Older than designed lifespan",color:C.coral},
{stat:"105B",label:"Gallons lost per year",sub:"From leaking pipes alone",color:C.orange},
{stat:"$11.5B",label:"Needed for upgrades",sub:"Over next 5 years",color:C.amber},
{stat:"$3.5B",label:"Currently planned",sub:"Only 30% of what's needed",color:C.purple},
].map(function(c,i){return(
<div key={i} style={{flex:"1 1 180px",background:C.bg,borderRadius:8,padding:14,textAlign:"center",borderTop:"3px solid "+c.color}}>
<div style={{fontSize:26,fontWeight:700,color:c.color,fontFamily:"'Playfair Display',serif"}}>{c.stat}</div>
<div style={{fontSize:13,color:C.white,fontWeight:600,marginTop:4}}>{c.label}</div>
<div style={{fontSize:12,color:C.slate,marginTop:2}}>{c.sub}</div>
</div>
);})}
</div>
<Callout color={C.coral}>California loses <strong>105 billion gallons of water per year</strong> from leaking pipes — while simultaneously imposing mandatory rationing on residents. The state needs $11.5 billion in water infrastructure upgrades but has only $3.5 billion planned. The drinking water grade <strong>dropped from C to D+</strong> since 2019.</Callout>
</div>
</Section>

<Section title="Dams: Grade D+" subtitle="Also declined since 2019" accent={C.orange}>
<Cards items={[
{title:"1,500 Dams Statewide",desc:"Critical for water supply, flood protection, hydropower, and recreation. Many were built 50-100 years ago.",color:C.orange,icon:"\uD83C\uDF0A",topBorder:true},
{title:"Oroville Dam Crisis (2017)",desc:"Emergency spillway failure forced evacuation of 188,000 people. $1.1 billion in repairs. Exposed decades of deferred maintenance.",color:C.coral,icon:"\u26A0\uFE0F",topBorder:true},
{title:"Budget Cuts Hit Safety",desc:"Recent state budget reductions have impacted dam safety programs despite the Division of Safety of Dams getting bolstered after Oroville.",color:C.amber,icon:"\uD83D\uDCC9",topBorder:true},
{title:"Environmental vs Safety",desc:"Environmental regulations complicate and slow dam repairs and capacity expansion. CEQA challenges add years and millions to critical safety work.",color:C.purple,icon:"\u2696\uFE0F",topBorder:true},
]}/>
</Section>

<Section title="Levees: Grade D+" subtitle="Improved from D but still critically underfunded" accent={C.amber}>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>California's levee system protects millions of people and billions of dollars in property, particularly in the Sacramento-San Joaquin Delta. The Delta levees are especially vulnerable — many were built by farmers in the 1800s and were never engineered to modern standards.</p>
<p style={{fontSize:16,color:"#CBD5E1",lineHeight:1.7,fontStyle:"italic"}}>A catastrophic Delta levee failure during an earthquake or extreme flood event could contaminate the water supply for 25 million Californians and cause tens of billions in damage.</p>
</div>
</Section>
</>)}

{tab==="energy"&&(<>
<Section title="Energy Grid: Grade D" subtitle="California is the only state not following the National Electrical Safety Code" accent={C.coral}>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.coral}}>California stands alone</strong> as the only state that does not adhere to the National Electrical Safety Code (NESC). This means the state's minimum design weather loadings for overhead electric lines are <strong style={{color:C.coral}}>weaker than the rest of the US</strong>.</p>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>In a state devastated by wildfires — many caused by power line failures — this is a staggering regulatory gap. PG&E's equipment caused the Camp Fire (2018, 85 deaths) and contributed to multiple other devastating fires.</p>
<p style={{fontSize:16,color:"#CBD5E1",lineHeight:1.7,fontStyle:"italic"}}>The state that imposes the most environmental regulations in the nation exempts itself from the national standard for power line safety. The result: billions in wildfire damage, PG&E bankruptcy, and the highest electricity rates on the mainland.</p>
</div>
</Section>

<Cards items={[
{title:"Grid Transformation",desc:"Massive transition to renewables. Solar doubled 2020-2025. Battery storage 30x. Real progress but at enormous cost passed to ratepayers.",color:C.green,icon:"\u2600\uFE0F",topBorder:true},
{title:"Wildfire Risk",desc:"Power lines cause fires. PG&E went bankrupt. Billions in grid hardening and undergrounding costs. All on your bill.",color:C.coral,icon:"\uD83D\uDD25",topBorder:true},
{title:"Reliability Concerns",desc:"CAISO issues flex alerts during summer heat waves. Grid barely avoided rolling blackouts in 2020 and 2022. Capacity margins are thin.",color:C.orange,icon:"\u26A1",topBorder:true},
{title:"EV Charging Load",desc:"2035 gas car ban requires massive grid expansion. Transformer upgrades needed everywhere. Cost: billions, paid by all ratepayers.",color:C.amber,icon:"\uD83D\uDD0C",topBorder:true},
]}/>
</>)}

{tab==="gap"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="Funding Gap" value="$216B" sub="Transportation alone" color={C.coral}/>
<Stat label="Water Need" value="$11.5B" sub="5-year pipe upgrades" color={C.orange}/>
<Stat label="Bridge Backlog" value="$50B+" sub="To modernize all" color={C.amber}/>
<Stat label="Total Need" value="$400B+" sub="All infrastructure" color={C.purple}/>
</div>

<Section title="The $216 Billion Gap" subtitle="California's transportation funding shortfall over 10 years" accent={C.coral}>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>Despite collecting the <strong style={{color:C.amber}}>highest gas tax in America</strong>, the <strong style={{color:C.amber}}>highest vehicle registration fees</strong>, and significant federal highway funding, California faces a <strong style={{color:C.coral}}>$216 billion transportation funding gap</strong> over the next decade.</p>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>Why? Three factors compound:</p>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:14}}>
{[
{factor:"Cost of Building",desc:"California construction costs are 30-50% above national average. Environmental review (CEQA), labor costs, and land acquisition inflate every project.",color:C.coral},
{factor:"Deferred Maintenance",desc:"Decades of underinvestment mean today's repair bills include compounded damage. A $1 fix deferred becomes a $5 replacement.",color:C.orange},
{factor:"EV Revenue Loss",desc:"As gas cars are replaced by EVs, gas tax revenue plummets. No replacement revenue source has been established. A $7B/year hole opening.",color:C.amber},
].map(function(c,i){return(
<div key={i} style={{flex:"1 1 250px",background:C.bg,borderRadius:6,padding:12,borderLeft:"3px solid "+c.color}}>
<div style={{fontSize:14,fontWeight:700,color:c.color,marginBottom:2}}>{c.factor}</div>
<div style={{fontSize:13,color:"#CBD5E1"}}>{c.desc}</div>
</div>
);})}
</div>
<Callout color={C.coral}>California collects <strong>more per gallon, more per registration, and more per mile</strong> than almost any state. But it costs so much to build and maintain infrastructure here that the money doesn't stretch. The state is literally too expensive to fix itself.</Callout>
</div>
</Section>
</>)}

{tab==="honest"&&(<>
<Section title="What's Actually Working" subtitle="Not everything is failing" accent={C.green}>
<Cards items={[
{title:"Seismic Retrofits",desc:"California leads the nation in earthquake-proofing bridges and buildings. The lessons of Loma Prieta (1989) and Northridge (1994) drove real investment.",color:C.green,icon:"\uD83C\uDFD7\uFE0F",topBorder:true},
{title:"Port Electrification",desc:"Ports of LA and Long Beach are pioneering zero-emission equipment. Grade: B. Genuine global leadership in green shipping infrastructure.",color:C.teal,icon:"\u2693",topBorder:true},
{title:"Water Recycling",desc:"Despite D+ for drinking water, California leads in recycled water technology. 732K AF recycled in 2021. Direct potable reuse regulations developing.",color:C.blue,icon:"\u267B\uFE0F",topBorder:true},
{title:"Rail Grade: B",desc:"One of only two B grades. Investments in passenger rail, grade separations, and Caltrain electrification are paying off.",color:C.green,icon:"\uD83D\uDE86",topBorder:true},
]}/>
</Section>

<Section title="The Infrastructure Pattern" accent={C.amber}>
<div style={{background:"linear-gradient(135deg, #78350F22, #1E293B)",border:"1px solid "+C.amber+"55",borderRadius:8,padding:24}}>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>California's infrastructure crisis follows a familiar pattern:</p>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:14}}>
{[
{step:"Collect the most revenue",detail:"Highest gas tax, registration fees, sales tax. Revenue isn't the problem."},
{step:"Make building expensive",detail:"CEQA, prevailing wage, environmental review. Every project costs 2-3x other states."},
{step:"Defer maintenance",detail:"New projects are more politically visible than pipe repairs. Maintenance gets cut."},
{step:"Crisis hits",detail:"Dam fails (Oroville). Bridge collapses. Pipes burst. Water system fails."},
{step:"Emergency spending",detail:"Crisis repairs cost 5x what maintenance would have. Taxpayers pay the premium."},
{step:"Blame underfunding",detail:"Politicians request more revenue. The cycle repeats."},
].map(function(s,i){return(
<div key={i} style={{flex:"1 1 250px",background:C.bg,borderRadius:6,padding:10,borderLeft:"3px solid "+C.amber,fontSize:13,color:"#CBD5E1"}}><strong style={{color:C.amber}}>{s.step}:</strong> {s.detail}</div>
);})}
</div>
<p style={{fontSize:16,color:"#CBD5E1",lineHeight:1.7,fontStyle:"italic"}}>California doesn't have an infrastructure funding problem. It has an <strong style={{color:C.amber}}>infrastructure cost problem</strong>. Until it costs less to build and maintain things here, no amount of revenue will close the gap. The state that can't build a train, can't insure a house, and can't price water correctly also can't fix a road for less than double what other states pay.</p>
</div>
</Section>
</>)}

</div>
</>);}
