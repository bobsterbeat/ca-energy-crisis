import { useState } from "react";
const C={coral:"#FF6B6B",amber:"#FBBF24",green:"#34D399",teal:"#2DD4BF",blue:"#60A5FA",purple:"#A78BFA",orange:"#FB923C",cyan:"#22D3EE",white:"#F8FAFC",slate:"#94A3B8",bg:"#0F172A",card:"#1E293B",border:"#334155"};
const Section=({title,subtitle,children,accent=C.amber})=>(<div style={{marginBottom:44}}><h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:24,fontWeight:700,color:C.white,marginBottom:4,borderLeft:"4px solid "+accent,paddingLeft:16}}>{title}</h2>{subtitle&&<p style={{fontSize:15,color:C.slate,marginTop:4,marginBottom:18,paddingLeft:20}}>{subtitle}</p>}{children}</div>);
const Callout=({children,color=C.amber})=>(<div style={{marginTop:14,padding:"14px 18px",background:color+"15",border:"1px solid "+color+"55",borderRadius:6,fontSize:15,color:C.white,lineHeight:1.65}}>{children}</div>);

var tabs=[{id:"pattern",label:"The Pattern"},{id:"politics",label:"Political Economy"},{id:"solutions",label:"What Would Fix It"},{id:"right",label:"What CA Gets Right"},{id:"verdict",label:"The Verdict"}];

export default function Conclusions(){
var s=useState("pattern"),tab=s[0],setTab=s[1];
return(<>
<div style={{background:C.card,borderBottom:"1px solid "+C.border,padding:"0 24px",overflowX:"auto",whiteSpace:"nowrap"}}><div style={{maxWidth:900,margin:"0 auto",display:"flex"}}>{tabs.map(function(t){return(<button key={t.id} onClick={function(){setTab(t.id);}} style={{background:"none",border:"none",borderBottom:tab===t.id?"3px solid "+C.amber:"3px solid transparent",color:tab===t.id?C.white:C.slate,fontSize:14,fontWeight:tab===t.id?700:400,padding:"12px 16px",cursor:"pointer",fontFamily:"'Source Sans 3',sans-serif"}}>{t.label}</button>);})}</div></div>
<div style={{maxWidth:900,margin:"0 auto",padding:"26px 24px"}}>

{tab==="pattern"&&(<>
<Section title="The Pattern: Six Steps to Crisis" subtitle="The same playbook repeats across every domain on this site" accent={C.purple}>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
{[
{step:"1. Regulate beyond what the market can absorb",examples:[{area:"Gas",detail:"CARBOB, LCFS, cap-and-trade"},{area:"Electric",detail:"RPS, 100% clean mandate"},{area:"Water",detail:"Prop 103-style price controls"},{area:"Housing",detail:"CEQA, zoning restrictions"},{area:"Insurance",detail:"Prop 103 rate suppression"}],color:C.coral},
{step:"2. Drive out domestic supply",examples:[{area:"Gas",detail:"Refineries: 23 to 11"},{area:"Electric",detail:"Nuclear plants: 5 to 1"},{area:"Insurance",detail:"7 of 12 top carriers left"},{area:"Business",detail:"Tesla, Oracle, Chevron departed"},{area:"Housing",detail:"Builders can't build profitably"}],color:C.orange},
{step:"3. Become dependent on imports or substitutes",examples:[{area:"Gas",detail:"70% from Asia"},{area:"Electric",detail:"19% from other states"},{area:"Insurance",detail:"FAIR Plan up 202%"},{area:"Housing",detail:"Workers commute from 100+ miles"},{area:"Water",detail:"Colorado River allocation under stress"}],color:C.amber},
{step:"4. Pay the highest prices in America",examples:[{area:"Gas",detail:"$5.90/gal (TX: $3.10)"},{area:"Electric",detail:"33.8c/kWh (US avg: 18.1c)"},{area:"Housing",detail:"$905K median (US: $404K)"},{area:"Insurance",detail:"30-40% premium increases coming"},{area:"Taxes",detail:"13.3% income tax, 8.68% sales tax"}],color:C.green},
{step:"5. Claim success while exporting the problem",examples:[{area:"Gas",detail:"Lower in-state refinery emissions but 20% more globally"},{area:"Electric",detail:"Import fossil power from Nevada"},{area:"Homelessness",detail:"$24B spent, numbers went up"},{area:"HSR",detail:"$18B spent, zero passengers"},{area:"Crime",detail:"Record low stats, record high disorder"}],color:C.blue},
{step:"6. Burden the vulnerable disproportionately",examples:[{area:"Gas",detail:"Central Valley farmworkers pay same $5.90"},{area:"Electric",detail:"Can't afford solar/EVs, pay highest rates"},{area:"Housing",detail:"Teachers can't live where they teach"},{area:"Cost",detail:"$100K earner has $22K left (OH: $50K)"},{area:"Insurance",detail:"Fire-zone homeowners can't sell or insure"}],color:C.purple},
].map(function(s,i){return(
<div key={i} style={{marginBottom:20}}>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
<div style={{width:32,height:32,borderRadius:"50%",background:s.color+"30",border:"2px solid "+s.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:s.color,flexShrink:0}}>{i+1}</div>
<h3 style={{fontSize:16,fontWeight:700,color:s.color}}>{s.step}</h3>
</div>
<div style={{display:"flex",flexWrap:"wrap",gap:8,paddingLeft:42}}>
{s.examples.map(function(e,j){return(
<div key={j} style={{background:C.bg,borderRadius:4,padding:"4px 10px",fontSize:12,color:"#CBD5E1"}}>
<strong style={{color:s.color}}>{e.area}:</strong> {e.detail}
</div>
);})}
</div>
</div>
);})}
</div>
<Callout color={C.purple}>This is not a coincidence. It is a <strong>governance model</strong>. California's political system consistently chooses regulation over outcomes, process over results, and incumbents over consumers. The pattern is so consistent across domains that it constitutes a systemic failure, not a collection of isolated problems.</Callout>
</Section>
</>)}

{tab==="politics"&&(<>
<Section title="The Political Economy" subtitle="Why reform is so hard: the interests that benefit from the status quo" accent={C.coral}>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:16}}>California's crises persist not because solutions are unknown, but because powerful interests benefit from the current system:</p>
{[
{group:"Public Sector Unions",influence:"$1B+ in political spending over last decade. Largest campaign donors in state politics. SEIU, CTA, AFSCME, firefighter unions.",mechanism:"Negotiate pension benefits that consume 25% of education budget growth. Oppose charter school expansion. Support regulations that expand government workforce. Prevailing wage requirements add 15-30% to public construction costs.",reform:"Any effort to control pension costs, streamline government, or allow non-union labor faces organized political opposition.",color:C.coral,icon:"\uD83C\uDFDB\uFE0F"},
{group:"Construction Trades Unions",influence:"CEQA is their leverage tool. Threaten environmental lawsuits to force project labor agreements (PLAs).",mechanism:"PLAs require union labor on projects. Non-union contractors excluded from bidding. Adds 10-20% to construction costs. Used CEQA challenges to enforce compliance.",reform:"2025 CEQA reform carved out labor requirements. Any project wanting CEQA exemption must meet specified labor standards.",color:C.orange,icon:"\uD83D\uDC77"},
{group:"Homeowner NIMBYs",influence:"Vote in every local election. Organize against density. Use CEQA, zoning boards, and city councils to block housing.",mechanism:"Property values rise with scarcity. Existing homeowners benefit from blocking new supply. Prop 13 locks in low taxes. No incentive to allow growth.",reform:"State mandates (SB 35, AB 130) are starting to override local opposition. But implementation is slow and contested.",color:C.amber,icon:"\uD83C\uDFE0"},
{group:"Environmental Organizations",influence:"Powerful lobby in Sacramento. CEQA is their primary tool. Well-funded litigation capacity.",mechanism:"Blocked desalination (Huntington Beach), delayed solar farms, challenged infrastructure. Genuine environmental mission but sometimes blocks projects that help the environment.",reform:"2025 reform exempted housing. But water, energy, and transport infrastructure still face full CEQA review.",color:C.green,icon:"\uD83C\uDF3F"},
{group:"Trial Lawyers",influence:"CEQA litigation is a profit center. No standing requirement means anyone can sue. No cost barrier.",mechanism:"File challenges, negotiate settlements, collect fees. Even losing cases generate income from fees and settlements. No downside to filing.",reform:"Loser-pays provisions or standing requirements would reduce frivolous litigation but face fierce opposition from the bar.",color:C.purple,icon:"\u2696\uFE0F"},
{group:"Agricultural Interests",influence:"80% of developed water at near-zero cost. Senior water rights from 1850s. Politically connected in Central Valley.",mechanism:"Water priced at $0.12-$30/acre-foot vs $512 for cities. Subsidized water makes desert farming profitable. Oppose any reallocation to urban users.",reform:"Water market reform and price rationalization would unlock massive efficiency. But farm lobbies fight any change to water rights.",color:C.blue,icon:"\uD83C\uDF3E"},
].map(function(item,i){return(
<div key={i} style={{padding:"18px 0",borderBottom:i<5?"1px solid "+C.border:"none"}}>
<div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
<div style={{fontSize:26,flexShrink:0}}>{item.icon}</div>
<div style={{flex:1}}>
<div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:6}}>
<h4 style={{fontSize:16,fontWeight:700,color:item.color}}>{item.group}</h4>
</div>
<p style={{fontSize:14,color:C.amber,lineHeight:1.4,marginBottom:6}}><strong>Influence:</strong> {item.influence}</p>
<p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.5,marginBottom:6}}><strong>Mechanism:</strong> {item.mechanism}</p>
<p style={{fontSize:14,color:C.slate,lineHeight:1.4,fontStyle:"italic"}}><strong>Reform barrier:</strong> {item.reform}</p>
</div>
</div>
</div>
);})}
</div>
<Callout color={C.coral}>California is a <strong>one-party state</strong> where Democrats hold supermajorities in both chambers. Reform requires challenging the party's own donor base — unions, environmental groups, and trial lawyers. This is why Governor Newsom called CEQA reform "the Lord's work" — it requires a political courage that Sacramento rarely musters.</Callout>
</Section>
</>)}

{tab==="solutions"&&(<>
<Section title="What Would Actually Fix California" subtitle="Concrete, evidence-based reforms drawn from every section of this site" accent={C.green}>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.green+"55"}}>
{[
{area:"Housing",reforms:["Complete CEQA reform for all infill housing (underway)","Upzone all transit corridors for 4-8 story buildings","Cap permitting fees at $30K/unit (currently $150K+)","Reform Prop 13 for vacant/commercial land to incentivize building","Adopt Japanese-style national zoning standards"],timeline:"5-10 years to see supply impact",difficulty:"Hard -- NIMBYs, local control, Prop 13",color:C.coral,icon:"\uD83C\uDFE0"},
{area:"Energy",reforms:["Extend Diablo Canyon to 2045 (underway)","Allow market-rate utility pricing with targeted subsidies for poor","Separate wildfire liability from utility rates","Invest in 4-hour battery storage at scale","Streamline solar + storage permitting"],timeline:"3-5 years for rate relief",difficulty:"Medium -- utility reform, PG&E restructuring",color:C.amber,icon:"\u26A1"},
{area:"Water",reforms:["Build 5+ large-scale desalination plants","Reform water rights: price water at market value","Create functioning water market for ag-urban trading","Mandatory groundwater recharge during wet years","Expand recycled water to 3M acre-feet/year"],timeline:"5-15 years for water security",difficulty:"Hard -- agricultural lobby, environmental opposition",color:C.blue,icon:"\uD83D\uDCA7"},
{area:"Insurance",reforms:["Allow catastrophe model pricing (underway since 2025)","Require home hardening in fire zones for coverage","Create state reinsurance backstop for catastrophic events","Restrict building in highest-risk zones","Mandate clearing and defensible space enforcement"],timeline:"2-5 years for market stabilization",difficulty:"Medium -- reform is underway, execution matters",color:C.orange,icon:"\uD83D\uDD25"},
{area:"Infrastructure",reforms:["Comprehensive CEQA reform for all essential projects","Adopt NESC electrical safety code (only state that hasn't)","Establish EV mileage fee to replace declining gas tax revenue","Prioritize maintenance over new construction","Streamline procurement -- reduce 30-50% cost premium"],timeline:"10-20 years for full modernization",difficulty:"Hard -- CEQA reform, cost reduction, funding",color:C.purple,icon:"\uD83D\uDEE3\uFE0F"},
{area:"Governance",reforms:["Require cost-benefit analysis for all new regulations","Sunset all regulations after 10 years unless reauthorized","Track spending outcomes (state auditor found no tracking)","Establish independent infrastructure authority","Loser-pays provision for frivolous CEQA litigation"],timeline:"Ongoing",difficulty:"Very hard -- requires challenging every interest group",color:C.teal,icon:"\uD83C\uDFDB\uFE0F"},
].map(function(item,i){return(
<div key={i} style={{marginBottom:24,paddingBottom:20,borderBottom:i<5?"1px solid "+C.border:"none"}}>
<div style={{display:"flex",gap:10,alignItems:"center",marginBottom:10}}>
<div style={{fontSize:24}}>{item.icon}</div>
<h3 style={{fontSize:17,fontWeight:700,color:item.color}}>{item.area}</h3>
<div style={{marginLeft:"auto",display:"flex",gap:8}}>
<span style={{fontSize:11,color:C.amber,background:C.amber+"18",padding:"2px 8px",borderRadius:4}}>{item.timeline}</span>
<span style={{fontSize:11,color:item.difficulty.startsWith("Very")?C.coral:item.difficulty.startsWith("Hard")?C.orange:C.amber,background:(item.difficulty.startsWith("Very")?C.coral:item.difficulty.startsWith("Hard")?C.orange:C.amber)+"18",padding:"2px 8px",borderRadius:4}}>{item.difficulty}</span>
</div>
</div>
<div style={{display:"flex",flexWrap:"wrap",gap:8,paddingLeft:34}}>
{item.reforms.map(function(r,j){return(
<div key={j} style={{background:C.bg,borderRadius:6,padding:"6px 12px",fontSize:13,color:"#CBD5E1",borderLeft:"3px solid "+item.color,flex:"1 1 280px"}}>{r}</div>
);})}
</div>
</div>
);})}
</div>
<Callout color={C.green}>None of these solutions are mysterious. Japan builds affordable housing in Tokyo. Israel desalinates water. France built TGV on time and budget. Spain insures homes in fire zones. The solutions exist globally. <strong>California's challenge is not knowledge -- it's political will.</strong></Callout>
</Section>
</>)}

{tab==="right"&&(<>
<Section title="What California Gets Right" subtitle="Intellectual honesty requires acknowledging genuine achievements" accent={C.green}>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.green+"55"}}>
<div style={{display:"flex",flexWrap:"wrap",gap:16}}>
{[
{title:"UC System",desc:"Best public university system in the world. Six campuses in the global top 50. Produces more research than most countries. A genuinely transformative institution.",color:C.green,icon:"\uD83C\uDF93"},
{title:"Tech & Innovation",desc:"Silicon Valley remains the world's innovation engine. AI, biotech, cleantech, entertainment. ~50% of US venture capital. Nothing else comes close.",color:C.teal,icon:"\uD83D\uDE80"},
{title:"Solar Leadership",desc:"Solar generation doubled 2020-2025. Battery storage grew 30x. Genuine world leadership in renewable energy deployment, even if expensive.",color:C.amber,icon:"\u2600\uFE0F"},
{title:"Worker Protections",desc:"$16.50 minimum wage. Paid family leave. Strong labor standards. Workers in CA have more protections than almost anywhere in America.",color:C.blue,icon:"\uD83D\uDC77"},
{title:"Environmental Standards",desc:"Cleanest air quality regulations. Strictest auto emissions standards. Other states and countries adopt CA's environmental rules.",color:C.green,icon:"\uD83C\uDF0D"},
{title:"Cultural Richness",desc:"Most diverse state. World-class food, arts, music. 200+ languages. National parks and 840 miles of coast. Quality of life for those who can afford it.",color:C.purple,icon:"\uD83C\uDFA8"},
{title:"Agriculture",desc:"$50B+ industry. 13% of US food value. Unique climate for specialty crops. Central Valley feeds the nation despite water challenges.",color:C.orange,icon:"\uD83C\uDF3E"},
{title:"Healthcare Access",desc:"Expanded Medi-Cal covers millions. Covered California marketplace. Better access than many states, especially for low-income populations.",color:C.cyan,icon:"\uD83C\uDFE5"},
].map(function(c,i){return(
<div key={i} style={{flex:"1 1 200px",background:C.bg,borderRadius:8,padding:14,borderLeft:"3px solid "+c.color}}>
<div style={{fontSize:22,marginBottom:4}}>{c.icon}</div>
<h4 style={{fontSize:14,color:c.color,marginBottom:4,fontWeight:700}}>{c.title}</h4>
<p style={{fontSize:13,color:"#CBD5E1",lineHeight:1.4}}>{c.desc}</p>
</div>
);})}
</div>
<Callout color={C.green}>These achievements are real and substantial. California is not a failed state. It is a <strong>great state with terrible governance</strong>. The tragedy is the gap between what California could be -- with its natural advantages, talent, capital, and institutions -- and what its political system delivers.</Callout>
</div>
</Section>
</>)}

{tab==="verdict"&&(<>
<Section title="The Verdict" accent={C.amber}>
<div style={{background:"linear-gradient(135deg, #78350F22, #1E293B)",border:"1px solid "+C.amber+"55",borderRadius:8,padding:24}}>
<p style={{fontSize:18,color:C.white,lineHeight:1.7,marginBottom:16,fontFamily:"'Playfair Display',Georgia,serif"}}>California is the most naturally blessed state in America. Mediterranean climate. 840 miles of coast. The most productive farmland on earth. The world's best universities. The global center of technology and entertainment.</p>

<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:16}}>And yet:</p>
<div style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:20}}>
{[
"82% can't afford a median home",
"Highest gas prices in America",
"Highest electricity rates on the mainland",
"183,000 homeless ($24B spent, numbers rose)",
"$126B train with zero passengers",
"7 of 12 insurers leaving the state",
"28% of US homeless despite 12% of population",
"49th in business tax climate",
"Infrastructure graded C-",
"1.7 million residents left since 2020",
].map(function(s,i){return(
<div key={i} style={{background:C.bg,borderRadius:6,padding:"6px 12px",fontSize:13,color:C.coral,borderLeft:"3px solid "+C.coral}}>{s}</div>
);})}
</div>

<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:16}}>Every one of these crises is <strong style={{color:C.amber}}>policy-created</strong>. Not one is caused by insufficient resources, bad geography, or lack of talent. California has more money, better weather, and smarter people than almost anywhere on earth. What it lacks is governance that matches its potential.</p>

<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:16}}>The common thread is a political system that:</p>
<div style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:20}}>
{[
{item:"Prioritizes process over results",color:C.coral},
{item:"Protects incumbents over consumers",color:C.orange},
{item:"Regulates supply instead of enabling it",color:C.amber},
{item:"Spends without tracking outcomes",color:C.purple},
{item:"Exports costs while claiming progress",color:C.blue},
{item:"Burdens the poor to satisfy the comfortable",color:C.teal},
].map(function(s,i){return(
<div key={i} style={{flex:"1 1 250px",background:C.bg,borderRadius:6,padding:10,borderLeft:"3px solid "+s.color,fontSize:14,color:C.white}}>{s.item}</div>
);})}
</div>

<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:16}}>The 2025 CEQA reform shows that change is possible. The question is whether California's leaders will extend that courage to water, energy, insurance, infrastructure, and the broader regulatory environment -- or whether the state will continue to coast on its natural advantages while governance erodes them.</p>

<p style={{fontSize:18,color:C.amber,lineHeight:1.7,fontStyle:"italic",fontFamily:"'Playfair Display',Georgia,serif",textAlign:"center",padding:"20px 0"}}>California doesn't need more money, more programs, or more regulations. It needs permission to build, price signals that reflect reality, accountability for spending, and the political courage to challenge the interests that benefit from dysfunction.</p>
</div>
</Section>

<div style={{marginTop:30,padding:"20px 0",borderTop:"1px solid "+C.border}}>
<p style={{fontSize:13,color:C.slate,lineHeight:1.6,textAlign:"center"}}>This analysis was compiled from public data sources including EIA, CAISO, ASCE, HUD, Census Bureau, PPIC, Legislative Analyst's Office, CA State Auditor, Tax Foundation, CalMatters, and peer-reviewed research from Stanford, MIT, UC Davis, and UC Berkeley. March 2026.</p>
<p style={{fontSize:13,color:C.slate,lineHeight:1.6,textAlign:"center",marginTop:8}}>This site presents data-driven analysis with balanced perspective. Where data is ambiguous, both sides are presented. Corrections and additional data are welcome.</p>
</div>
</Section>
</>)}

</div>
</>);}
