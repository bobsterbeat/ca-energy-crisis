import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell, LabelList, PieChart, Pie } from "recharts";
const C={coral:"#FF6B6B",amber:"#FBBF24",green:"#34D399",teal:"#2DD4BF",blue:"#60A5FA",purple:"#A78BFA",orange:"#FB923C",cyan:"#22D3EE",white:"#F8FAFC",slate:"#94A3B8",bg:"#0F172A",card:"#1E293B",border:"#334155"};
const Section=({title,subtitle,children,accent=C.orange})=>(<div style={{marginBottom:44}}><h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:24,fontWeight:700,color:C.white,marginBottom:4,borderLeft:"4px solid "+accent,paddingLeft:16}}>{title}</h2>{subtitle&&<p style={{fontSize:15,color:C.slate,marginTop:4,marginBottom:18,paddingLeft:20}}>{subtitle}</p>}{children}</div>);
const Stat=({label,value,sub,color=C.orange})=>(<div style={{background:C.card,border:"1px solid "+C.border,borderRadius:8,padding:"14px 18px",flex:"1 1 140px",minWidth:140}}><div style={{fontSize:11,color:C.slate,textTransform:"uppercase",letterSpacing:1}}>{label}</div><div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:28,fontWeight:700,color,marginTop:4}}>{value}</div>{sub&&<div style={{fontSize:12,color:C.slate,marginTop:2}}>{sub}</div>}</div>);
const Tip=({active,payload,label})=>{if(!active||!payload)return null;return(<div style={{background:"#0F172AEE",border:"1px solid "+C.border,borderRadius:6,padding:"8px 12px",fontSize:12}}><div style={{color:C.white,fontWeight:600,marginBottom:3}}>{label}</div>{payload.map(function(p,i){return <div key={i} style={{color:p.color||p.fill,marginTop:1}}>{p.name}: {typeof p.value==="number"?p.value.toLocaleString():p.value}</div>;})}</div>);};
const Callout=({children,color=C.orange})=>(<div style={{marginTop:14,padding:"14px 18px",background:color+"15",border:"1px solid "+color+"55",borderRadius:6,fontSize:15,color:C.white,lineHeight:1.65}}>{children}</div>);
const Chart=({children,height=320})=>(<div style={{background:C.card,borderRadius:8,padding:"18px 10px",border:"1px solid "+C.border}}><ResponsiveContainer width="100%" height={height}>{children}</ResponsiveContainer></div>);
const Cards=({items})=>(<div style={{display:"flex",flexWrap:"wrap",gap:16}}>{items.map(function(c,i){return(<div key={i} style={{flex:"1 1 200px",background:c.bg||C.card,border:"1px solid "+C.border,borderRadius:8,padding:16,borderLeft:c.border?"3px solid "+c.color:"none",borderTop:c.topBorder?"3px solid "+c.color:"none"}}>{c.icon&&<div style={{fontSize:22,marginBottom:6}}>{c.icon}</div>}<h4 style={{fontSize:15,color:c.color,marginBottom:6,fontWeight:700}}>{c.title}</h4><p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.5}}>{c.desc}</p></div>);})}</div>);

var fairPlanGrowth=[{year:"2020",premium:0.65},{year:"2021",premium:0.82},{year:"2022",premium:0.98},{year:"2023",premium:1.35},{year:"2024",premium:1.72},{year:"2025",premium:1.98}];
var nonrenewals=[{county:"Los Angeles",count:56558,fill:C.coral},{county:"San Diego",count:18200,fill:C.orange},{county:"Santa Barbara",count:9800,fill:C.amber},{county:"Sonoma",count:8500,fill:C.amber},{county:"Santa Cruz",count:7200,fill:C.purple},{county:"Riverside",count:6900,fill:C.blue}];
var declineRate=[{period:"Jun 2022",pct:14.6},{period:"Oct 2022",pct:22.1},{period:"Feb 2023",pct:35.8},{period:"Apr 2023",pct:52.3},{period:"National Avg",pct:26.2}];
var fireLosses=[{year:"2017",losses:12},{year:"2018",losses:24},{year:"2019",losses:4},{year:"2020",losses:10},{year:"2021",losses:2.5},{year:"2022",losses:1.8},{year:"2023",losses:3.2},{year:"2024",losses:5.1},{year:"2025",losses:51.7}];
var palisadesData=[{item:"Structures Destroyed",value:"18,000+",color:C.coral},{item:"Lives Lost",value:"30+",color:C.coral},{item:"State Farm Payouts",value:"$7.6B",color:C.orange},{item:"Total Insurer Payouts",value:"$20.4B+",color:C.amber},{item:"FAIR Plan Claims",value:"$914M+",color:C.purple},{item:"Estimated Total Damage",value:"$51.7B",color:C.coral}];
var premiumComp=[{state:"Florida",premium:7136,fill:C.coral},{state:"Louisiana",premium:5624,fill:C.orange},{state:"California*",premium:4200,fill:C.amber},{state:"Texas",premium:3670,fill:C.blue},{state:"US Average",premium:2377,fill:C.green},{state:"Ohio",premium:1456,fill:C.teal}];

var tabs=[{id:"exodus",label:"Insurer Exodus"},{id:"fires",label:"The Fires"},{id:"fair",label:"FAIR Plan Crisis"},{id:"prop103",label:"Prop 103"},{id:"palisades",label:"Palisades Fire"},{id:"future",label:"What's Next"}];

export default function Insurance(){
var s=useState("exodus"),tab=s[0],setTab=s[1];
return(<>
<div style={{background:C.card,borderBottom:"1px solid "+C.border,padding:"0 24px",overflowX:"auto",whiteSpace:"nowrap"}}><div style={{maxWidth:900,margin:"0 auto",display:"flex"}}>{tabs.map(function(t){return(<button key={t.id} onClick={function(){setTab(t.id);}} style={{background:"none",border:"none",borderBottom:tab===t.id?"3px solid "+C.orange:"3px solid transparent",color:tab===t.id?C.white:C.slate,fontSize:14,fontWeight:tab===t.id?700:400,padding:"12px 16px",cursor:"pointer",fontFamily:"'Source Sans 3',sans-serif"}}>{t.label}</button>);})}</div></div>
<div style={{maxWidth:900,margin:"0 auto",padding:"26px 24px"}}>

{tab==="exodus"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="Carriers Leaving" value="7+" sub="Of top 12 insurers" color={C.coral}/>
<Stat label="Quote Declines" value="52%" sub="In CA vs 26% national" color={C.orange}/>
<Stat label="Nonrenewals" value="100K+" sub="Policies dropped" color={C.amber}/>
<Stat label="Coverage Cut" value="-20%" sub="Statewide options" color={C.purple}/>
</div>

<Section title="The Insurance Exodus" subtitle="Major insurers that have stopped or restricted California coverage">
<div style={{background:C.card,borderRadius:8,border:"1px solid "+C.border,overflow:"hidden"}}>
{[
{name:"State Farm",status:"No new policies since May 2023",detail:"Largest insurer in CA. 2.8M policies. $7.6B in LA fire payouts. S&P downgraded from A+ to A-. Requested 17% + 11% rate hikes.",color:C.coral},
{name:"Allstate",status:"Paused new home/condo policies",detail:"Cited wildfire risk and reinsurance costs. Working with Commissioner on potential return under new catastrophe models.",color:C.orange},
{name:"Farmers",status:"Pulled back, partially returning",detail:"Reduced new policies significantly. Reopened condo and renter markets. Still limiting homeowner policies in high-risk areas.",color:C.amber},
{name:"AIG",status:"Restricted coverage",detail:"Major pullback from high-risk zones. Focused on commercial lines. Residential exposure being reduced.",color:C.purple},
{name:"Chubb",status:"Restricted coverage",detail:"Reduced wildfire-zone exposure. Focusing on high-value properties with mitigation measures in place.",color:C.blue},
{name:"Hartford / Tokio Marine",status:"Stopped writing new policies",detail:"Complete withdrawal from new California homeowner policies. Existing policies being maintained for now.",color:C.teal},
].map(function(r,i){return(
<div key={i} style={{padding:"14px 20px",borderBottom:i<5?"1px solid "+C.border:"none",borderLeft:"4px solid "+r.color}}>
<div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:4}}>
<span style={{fontWeight:700,fontSize:16,color:C.white}}>{r.name}</span>
<span style={{fontSize:12,color:r.color,fontWeight:600,background:r.color+"18",padding:"2px 8px",borderRadius:4}}>{r.status}</span>
</div>
<p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.4}}>{r.detail}</p>
</div>
);})}
</div>
<Callout color={C.coral}>Seven of the top twelve carriers have halted, restricted, or refused renewals. <strong>Quote declinations jumped from 14.6% to 52.3%</strong> in under a year -- double the national average. Over 1.5 million homeowners now have limited options in the voluntary market.</Callout>
</Section>

<Section title="Policy Nonrenewals by County" subtitle="Residential policies nonrenewed, 2020-2023">
<Chart height={280}>
<BarChart data={nonrenewals} margin={{left:10,right:20,top:20}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false}/>
<XAxis dataKey="county" tick={{fill:C.slate,fontSize:10}}/>
<YAxis tick={{fill:C.slate,fontSize:11}} tickFormatter={function(v){return (v/1000)+"K";}}/>
<Tooltip content={<Tip/>}/>
<Bar dataKey="count" name="Nonrenewals" radius={[4,4,0,0]} barSize={40}>
{nonrenewals.map(function(d,i){return <Cell key={i} fill={d.fill}/>;})}<LabelList dataKey="count" position="top" fill={C.white} fontSize={10} formatter={function(v){return (v/1000).toFixed(1)+"K";}}/></Bar>
</BarChart>
</Chart>
<Callout color={C.orange}>LA County alone had <strong>56,558 nonrenewed policies</strong> from 2020-2023 -- 22% of the state total. Wildfire-prone ZIP codes like 95033 in the Santa Cruz Mountains saw nonrenewal rates above <strong>65%</strong>, even for homeowners who fire-hardened their properties.</Callout>
</Section>
</>)}

{tab==="fires"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="2025 Fire Damage" value="$51.7B" sub="January LA fires" color={C.coral}/>
<Stat label="Structures" value="18,000+" sub="Destroyed" color={C.orange}/>
<Stat label="Lives Lost" value="30+" sub="Deaths" color={C.amber}/>
<Stat label="Total Payouts" value="$20.4B+" sub="Insurer payments" color={C.purple}/>
</div>

<Section title="Wildfire Insured Losses" subtitle="California wildfire insured losses by year ($ billions)">
<Chart height={300}>
<BarChart data={fireLosses} margin={{left:10,right:20,top:20}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false}/>
<XAxis dataKey="year" tick={{fill:C.slate,fontSize:12}}/>
<YAxis tick={{fill:C.slate,fontSize:11}} tickFormatter={function(v){return "$"+v+"B";}} domain={[0,55]}/>
<Tooltip content={<Tip/>}/>
<Bar dataKey="losses" name="Insured Losses ($B)" radius={[4,4,0,0]} barSize={40}>
{fireLosses.map(function(d,i){return <Cell key={i} fill={d.losses>20?C.coral:d.losses>10?C.orange:d.losses>5?C.amber:C.blue}/>;})}<LabelList dataKey="losses" position="top" fill={C.white} fontSize={10} formatter={function(v){return "$"+v+"B";}}/></Bar>
</BarChart>
</Chart>
<Callout color={C.coral}>The January 2025 LA wildfires produced <strong>$51.7 billion in residential damage</strong> -- more than all other California wildfire years combined. This single event may have permanently broken the state's insurance market. State Farm alone expects to pay <strong>$7.6 billion</strong> from one fire.</Callout>
</Section>

<Cards items={[
{title:"Camp Fire (2018)",desc:"Paradise destroyed. 85 deaths. 18,800 structures. Led to PG&E bankruptcy. The event that started the insurance exodus.",color:C.amber,icon:"\uD83D\uDD25",topBorder:true},
{title:"Wine Country (2017)",desc:"Tubbs, Nuns, Atlas fires across Sonoma/Napa. 44 deaths. 8,900 structures. $12B insured losses. First major modern CA wildfire insurance shock.",color:C.orange,icon:"\uD83C\uDF77",topBorder:true},
{title:"Dixie Fire (2021)",desc:"Largest single fire in CA history. 963K acres. Destroyed the town of Greenville. Burned for 104 days.",color:C.purple,icon:"\uD83C\uDF32",topBorder:true},
{title:"Palisades/Eaton (2025)",desc:"$51.7B damage. 18,000+ structures in LA. Costliest wildfire in US history. Hit wealthy, well-insured neighborhoods. The insurance industry's worst nightmare.",color:C.coral,icon:"\uD83C\uDFD9\uFE0F",topBorder:true},
]}/>
</>)}

{tab==="fair"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="FAIR Plan Growth" value="+202%" sub="Since 2022" color={C.coral}/>
<Stat label="Written Premium" value="$1.98B" sub="Dec 2025" color={C.orange}/>
<Stat label="Assessment" value="$1B" sub="Levied on insurers" color={C.amber}/>
<Stat label="Avg Cost" value="$3,200" sub="2x normal policy" color={C.purple}/>
</div>

<Section title="FAIR Plan: The Insurer of Last Resort" subtitle="FAIR Plan written premiums ($ billions)">
<Chart height={260}>
<LineChart data={fairPlanGrowth} margin={{left:10,right:20,top:10}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
<XAxis dataKey="year" tick={{fill:C.slate,fontSize:12}}/>
<YAxis tick={{fill:C.slate,fontSize:11}} tickFormatter={function(v){return "$"+v+"B";}} domain={[0,2.2]}/>
<Tooltip content={<Tip/>}/>
<Line type="monotone" dataKey="premium" name="Written Premium ($B)" stroke={C.coral} strokeWidth={3} dot={{r:4,fill:C.coral}}/>
</LineChart>
</Chart>
<Callout color={C.coral}>The FAIR Plan was designed as a <strong>temporary safety net</strong> for high-risk areas. It has become a permanent fixture housing hundreds of thousands of policies. Premium volume grew <strong>202% since 2022</strong>. It covers only named perils -- no theft, no water damage, no liability. Average cost: $3,200/year, double a normal policy.</Callout>
</Section>

<Section title="Pacific Palisades: A Case Study" accent={C.orange}>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>Before the January 2025 fire, Pacific Palisades was already deep in crisis:</p>
<div style={{display:"flex",flexWrap:"wrap",gap:16,marginBottom:14}}>
{[
{stat:"1,400",label:"Homes on FAIR Plan",sub:"Out of 9,000 total -- 1 in 7 households",color:C.coral},
{stat:"4x",label:"Increase since 2020",sub:"FAIR Plan coverage quadrupled in 4 years",color:C.orange},
{stat:"$0",label:"Voluntary Options",sub:"State Farm had already nonrenewed hundreds",color:C.amber},
].map(function(c,i){return(
<div key={i} style={{flex:"1 1 180px",background:C.bg,borderRadius:8,padding:14,textAlign:"center",borderTop:"3px solid "+c.color}}>
<div style={{fontSize:28,fontWeight:700,color:c.color,fontFamily:"'Playfair Display',serif"}}>{c.stat}</div>
<div style={{fontSize:13,color:C.white,fontWeight:600,marginTop:4}}>{c.label}</div>
<div style={{fontSize:12,color:C.slate,marginTop:2}}>{c.sub}</div>
</div>
);})}
</div>
<Callout color={C.orange}><strong>One in seven Palisades homes</strong> was already on the bare-bones FAIR Plan before the fire hit. The FAIR Plan then paid out <strong>$914 million+</strong> on just this one fire, forcing a <strong>$1 billion assessment</strong> on all insurers in the state -- costs ultimately passed to every CA policyholder.</Callout>
</div>
</Section>
</>)}

{tab==="prop103"&&(<>
<Section title="Proposition 103: The Root Cause" subtitle="How a 1988 voter initiative created the 2025 insurance crisis" accent={C.amber}>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
<div style={{display:"flex",flexWrap:"wrap",gap:16,marginBottom:16}}>
{[
{title:"What Prop 103 Did (1988)",items:["Required prior approval for all rate increases","Rolled back rates 20%","Banned use of credit scores in pricing","Required insurers to use historical loss data only","Created elected Insurance Commissioner position"],color:C.green,icon:"\u2705"},
{title:"What Went Wrong (2025)",items:["Blocked forward-looking catastrophe models for 30+ years","Every other US state allows these models","Insurers couldn't price for increasing wildfire risk","Rates didn't reflect reality, so companies left","Political pressure kept rates artificially low"],color:C.coral,icon:"\u274C"},
].map(function(c,i){return(
<div key={i} style={{flex:"1 1 300px",background:C.bg,borderRadius:8,padding:16,borderTop:"3px solid "+c.color}}>
<div style={{fontSize:22,marginBottom:6}}>{c.icon}</div>
<h4 style={{fontSize:15,color:c.color,marginBottom:10,fontWeight:700}}>{c.title}</h4>
{c.items.map(function(item,j){return(
<div key={j} style={{fontSize:14,color:"#CBD5E1",lineHeight:1.5,paddingLeft:12,borderLeft:"2px solid "+c.color+"44",marginBottom:6}}>{item}</div>
);})}
</div>
);})}
</div>
<Callout color={C.amber}><strong>Only California</strong> banned insurers from using forward-looking catastrophe models. Every other state allows them. For 30+ years, CA forced insurers to price based on historical losses while wildfire risk was escalating exponentially. When reality caught up, they left.</Callout>
</div>
</Section>

<Section title="The Reform Attempt" accent={C.green}>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>Insurance Commissioner Lara's <strong style={{color:C.green}}>Sustainable Insurance Strategy</strong> (2025) attempts to fix the market:</p>
<div style={{display:"flex",flexWrap:"wrap",gap:12}}>
{[
{reform:"Allow catastrophe models",desc:"Insurers can now use forward-looking wildfire models to set rates. Three models approved by August 2025.",color:C.green},
{reform:"Write-more mandate",desc:"Insurers using new models must expand coverage in wildfire areas and reduce FAIR Plan dependency.",color:C.teal},
{reform:"Pass-through reinsurance costs",desc:"Insurers can pass reinsurance costs to policyholders. Expected 30-40% average premium increases.",color:C.amber},
{reform:"Home hardening discounts",desc:"Insurers must offer credits for defensible space, fire-rated roofing, ember-resistant vents (5-20% discount).",color:C.blue},
].map(function(r,i){return(
<div key={i} style={{flex:"1 1 200px",background:C.bg,borderRadius:6,padding:12,borderLeft:"3px solid "+r.color}}>
<div style={{fontSize:14,fontWeight:700,color:r.color,marginBottom:2}}>{r.reform}</div>
<div style={{fontSize:13,color:"#CBD5E1"}}>{r.desc}</div>
</div>
);})}
</div>
<Callout color={C.green}>The reforms are a step in the right direction but come <strong>30 years too late</strong>. And the tradeoff is blunt: insurers will return, but premiums will jump 30-40%. Californians will pay the cost of decades of suppressed pricing all at once.</Callout>
</div>
</Section>
</>)}

{tab==="palisades"&&(<>
<Section title="January 2025: The Fire That Changed Everything" accent={C.coral}>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
<div style={{display:"flex",flexWrap:"wrap",gap:16,marginBottom:16}}>
{palisadesData.map(function(d,i){return(
<div key={i} style={{flex:"1 1 140px",background:C.bg,borderRadius:8,padding:14,textAlign:"center",borderTop:"3px solid "+d.color}}>
<div style={{fontSize:22,fontWeight:700,color:d.color,fontFamily:"'Playfair Display',serif"}}>{d.value}</div>
<div style={{fontSize:12,color:C.slate,marginTop:4}}>{d.item}</div>
</div>
);})}
</div>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>The Palisades and Eaton fires of January 2025 were the <strong style={{color:C.coral}}>costliest wildfire disaster in American history</strong>. They struck wealthy, densely built neighborhoods with high property values and high insurance coverage.</p>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>State Farm, the state's largest insurer, has already paid <strong style={{color:C.orange}}>$5 billion+</strong> on 13,500 claims and expects to pay $7.6 billion total from this single event. Its credit rating was downgraded from A+ to A-.</p>
<p style={{fontSize:16,color:"#CBD5E1",lineHeight:1.7,fontStyle:"italic"}}>The fire that was supposed to force reform may instead accelerate the exodus. When a single event costs an insurer $7.6 billion, the rational response is to leave the state entirely.</p>
</div>
</Section>

<Section title="The Cascading Impact" accent={C.orange}>
<Cards items={[
{title:"Mortgage Crisis",desc:"Banks require insurance to hold a mortgage. No insurance = no mortgage = no home sale. Entire neighborhoods becoming untransactable.",color:C.coral,icon:"\uD83C\uDFE6",topBorder:true},
{title:"Property Values",desc:"Uninsurable homes lose value immediately. Fire-prone ZIP codes face permanent discounts. Wealth destruction for millions of homeowners.",color:C.orange,icon:"\uD83D\uDCC9",topBorder:true},
{title:"Assessment Pass-Through",desc:"The $1B FAIR Plan assessment gets passed to ALL policyholders statewide. State Farm's $165M share is recouped through surcharges on every customer.",color:C.amber,icon:"\uD83D\uDCB8",topBorder:true},
{title:"Rebuilding Barrier",desc:"Fire survivors can't rebuild without insurance. Insurance won't cover rebuilt homes in fire zones. Catch-22 trapping thousands of families.",color:C.purple,icon:"\uD83D\uDEA7",topBorder:true},
]}/>
</Section>
</>)}

{tab==="future"&&(<>
<Section title="The Future of California Insurance" subtitle="Where this is heading and what it means for homeowners" accent={C.amber}>
<div style={{background:"linear-gradient(135deg, #78350F22, #1E293B)",border:"1px solid "+C.amber+"55",borderRadius:8,padding:24}}>

<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.coral}}>The pessimistic scenario:</strong></p>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:20}}>
{[
"More insurers leave after absorbing $20B+ in 2025 fire losses",
"FAIR Plan becomes de facto state insurer for millions",
"Premiums jump 30-50% statewide as catastrophe models are priced in",
"Fire-prone homes become effectively uninsurable and unsaleable",
"State taxpayers bail out FAIR Plan after next major fire",
].map(function(s,i){return(
<div key={i} style={{flex:"1 1 250px",background:C.bg,borderRadius:6,padding:10,borderLeft:"3px solid "+C.coral,fontSize:13,color:"#CBD5E1"}}>{s}</div>
);})}
</div>

<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.green}}>The optimistic scenario:</strong></p>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:20}}>
{[
"New catastrophe models allow accurate risk pricing",
"Insurers return to market with higher but sustainable rates",
"Home hardening and defensible space reduce actual fire risk",
"Building codes prevent construction in highest-risk zones",
"Market stabilizes at higher premiums but broader coverage",
].map(function(s,i){return(
<div key={i} style={{flex:"1 1 250px",background:C.bg,borderRadius:6,padding:10,borderLeft:"3px solid "+C.green,fontSize:13,color:"#CBD5E1"}}>{s}</div>
);})}
</div>

<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.amber}}>The pattern:</strong></p>
<p style={{fontSize:16,color:"#CBD5E1",lineHeight:1.7,marginBottom:14}}>Once again, California's response to a market problem was to <strong style={{color:C.coral}}>regulate prices below cost</strong> (Prop 103), <strong style={{color:C.orange}}>drive out providers</strong> (insurer exodus), <strong style={{color:C.amber}}>leave consumers exposed</strong> (FAIR Plan), and then <strong style={{color:C.purple}}>blame the industry</strong> (lawsuits alleging collusion).</p>
<p style={{fontSize:16,color:"#CBD5E1",lineHeight:1.7,fontStyle:"italic"}}>The same playbook that created the gasoline crisis, the electricity crisis, and the water crisis has now created an insurance crisis. The common thread is always the same: suppress market signals, punish suppliers, protect consumers from price reality, and then act surprised when supply disappears.</p>
</div>
</Section>

<Section title="Home Insurance Premiums by State" subtitle="Average annual homeowner premium ($)" accent={C.blue}>
<Chart height={280}>
<BarChart data={premiumComp} margin={{left:10,right:30,top:20}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false}/>
<XAxis dataKey="state" tick={{fill:C.slate,fontSize:10}}/>
<YAxis tick={{fill:C.slate,fontSize:11}} tickFormatter={function(v){return "$"+v.toLocaleString();}} domain={[0,8000]}/>
<Tooltip content={<Tip/>}/>
<Bar dataKey="premium" name="Annual Premium" radius={[4,4,0,0]} barSize={40}>
{premiumComp.map(function(d,i){return <Cell key={i} fill={d.fill}/>;})}<LabelList dataKey="premium" position="top" fill={C.white} fontSize={10} formatter={function(v){return "$"+v.toLocaleString();}}/></Bar>
</BarChart>
</Chart>
<Callout color={C.amber}>*California's average is artificially low because Prop 103 suppressed rates for decades. The <strong>true risk-adjusted cost</strong> is likely $6,000-8,000+ for fire-zone properties. The 30-40% premium increases from the reform will only begin to close this gap. Florida, which allowed market pricing, has higher premiums but functioning coverage.</Callout>
</Section>
</>)}

</div>
</>);}
