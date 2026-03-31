import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts";
const C={coral:"#FF6B6B",amber:"#FBBF24",green:"#34D399",teal:"#2DD4BF",blue:"#60A5FA",purple:"#A78BFA",orange:"#FB923C",cyan:"#22D3EE",white:"#F8FAFC",slate:"#94A3B8",bg:"#0F172A",card:"#1E293B",border:"#334155"};
const Section=({title,subtitle,children,accent=C.orange})=>(<div style={{marginBottom:44}}><h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:24,fontWeight:700,color:C.white,marginBottom:4,borderLeft:"4px solid "+accent,paddingLeft:16}}>{title}</h2>{subtitle&&<p style={{fontSize:15,color:C.slate,marginTop:4,marginBottom:18,paddingLeft:20}}>{subtitle}</p>}{children}</div>);
const Stat=({label,value,sub,color=C.orange})=>(<div style={{background:C.card,border:"1px solid "+C.border,borderRadius:8,padding:"14px 18px",flex:"1 1 140px",minWidth:140}}><div style={{fontSize:11,color:C.slate,textTransform:"uppercase",letterSpacing:1}}>{label}</div><div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:28,fontWeight:700,color,marginTop:4}}>{value}</div>{sub&&<div style={{fontSize:12,color:C.slate,marginTop:2}}>{sub}</div>}</div>);
const Callout=({children,color=C.orange})=>(<div style={{marginTop:14,padding:"14px 18px",background:color+"15",border:"1px solid "+color+"55",borderRadius:6,fontSize:15,color:C.white,lineHeight:1.65}}>{children}</div>);
const Cards=({items})=>(<div style={{display:"flex",flexWrap:"wrap",gap:16}}>{items.map(function(c,i){return(<div key={i} style={{flex:"1 1 200px",background:c.bg||C.card,border:"1px solid "+C.border,borderRadius:8,padding:16,borderLeft:c.border?"3px solid "+c.color:"none",borderTop:c.topBorder?"3px solid "+c.color:"none"}}>{c.icon&&<div style={{fontSize:22,marginBottom:6}}>{c.icon}</div>}<h4 style={{fontSize:15,color:c.color,marginBottom:6,fontWeight:700}}>{c.title}</h4><p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.5}}>{c.desc}</p></div>);})}</div>);

var tabs=[{id:"rankings",label:"Rankings"},{id:"regulation",label:"Red Tape"},{id:"departures",label:"Who Left"},{id:"strengths",label:"Strengths"},{id:"honest",label:"The Puzzle"}];

export default function Business(){
var s=useState("rankings"),tab=s[0],setTab=s[1];
return(<>
<div style={{background:C.card,borderBottom:"1px solid "+C.border,padding:"0 24px",overflowX:"auto",whiteSpace:"nowrap"}}><div style={{maxWidth:900,margin:"0 auto",display:"flex"}}>{tabs.map(function(t){return(<button key={t.id} onClick={function(){setTab(t.id);}} style={{background:"none",border:"none",borderBottom:tab===t.id?"3px solid "+C.orange:"3px solid transparent",color:tab===t.id?C.white:C.slate,fontSize:14,fontWeight:tab===t.id?700:400,padding:"12px 16px",cursor:"pointer",fontFamily:"'Source Sans 3',sans-serif"}}>{t.label}</button>);})}</div></div>
<div style={{maxWidth:900,margin:"0 auto",padding:"26px 24px"}}>

{tab==="rankings"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="Tax Climate" value="49th" sub="Tax Foundation" color={C.coral}/>
<Stat label="Regulatory" value="Worst" sub="Multiple rankings" color={C.orange}/>
<Stat label="Income Tax" value="13.3%" sub="Highest in US" color={C.amber}/>
<Stat label="GDP Rank" value="5th" sub="Global economy" color={C.green}/>
</div>

<Section title="The Paradox: Worst Climate, 5th Largest Economy">
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>California consistently ranks <strong style={{color:C.coral}}>49th or 50th</strong> in business climate surveys -- yet it has the <strong style={{color:C.green}}>5th largest economy in the world</strong>. How?</p>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>A PPIC study found the answer: California's advantages -- <strong style={{color:C.amber}}>climate, industry mix, universities, and talent pool</strong> -- offset its policy disadvantages. The state grows despite its governance, not because of it.</p>
<p style={{fontSize:16,color:"#CBD5E1",lineHeight:1.7,fontStyle:"italic"}}>But the question is: how much faster would California grow -- and how many more people could afford to live here -- if the policy environment matched the natural advantages?</p>
</div>
</Section>

<Section title="Where California Ranks" accent={C.coral}>
<div style={{background:C.card,borderRadius:8,border:"1px solid "+C.border,overflow:"hidden"}}>
{[
{metric:"State Business Tax Climate",rank:"49th",source:"Tax Foundation 2025",detail:"Only New Jersey ranks worse. Combines income, sales, property, corporate tax burden.",color:C.coral},
{metric:"Top Marginal Income Tax",rank:"50th (worst)",source:"Tax Foundation",detail:"13.3% -- highest in nation. Additional 1% mental health surcharge above $1M.",color:C.coral},
{metric:"State Sales Tax Rate",rank:"50th (highest)",source:"Tax Foundation",detail:"7.25% base rate -- highest state-level rate. Combined avg 8.68%, some areas 10%+.",color:C.orange},
{metric:"Regulatory Burden",rank:"50th",source:"Multiple sources",detail:"CEQA, labor law complexity, AB 1228 fast food wage, workers comp costs.",color:C.orange},
{metric:"Economic Freedom",rank:"49th",source:"Fraser Institute",detail:"Only New York scores worse on combined tax + regulation index.",color:C.amber},
{metric:"GDP (Global)",rank:"5th",source:"US BEA / World Bank",detail:"$4.1 trillion -- larger than UK, India, France. Silicon Valley + Hollywood + agriculture.",color:C.green},
{metric:"Venture Capital",rank:"1st",source:"PitchBook",detail:"~50% of all US venture capital flows through California. Unmatched innovation ecosystem.",color:C.green},
].map(function(r,i){return(
<div key={i} style={{display:"flex",alignItems:"center",padding:"14px 20px",borderBottom:i<6?"1px solid "+C.border:"none"}}>
<div style={{width:70,fontWeight:700,fontSize:15,color:r.color,flexShrink:0}}>{r.rank}</div>
<div style={{flex:1}}>
<div style={{fontSize:15,fontWeight:600,color:C.white}}>{r.metric}</div>
<div style={{fontSize:12,color:C.slate}}>{r.source} -- {r.detail}</div>
</div>
</div>
);})}
</div>
</Section>
</>)}

{tab==="regulation"&&(<>
<Section title="The Regulatory Gauntlet" subtitle="What it's like to operate a business in California" accent={C.coral}>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
{[
{rule:"CEQA (Environmental Review)",impact:"Any project can be challenged. Competitors weaponize it. Adds 2-5 years and millions to housing, retail, and infrastructure projects.",cost:"$1M+ per challenge",color:C.coral,icon:"\uD83D\uDCCB"},
{rule:"AB 1228 (Fast Food Wage)",impact:"$20/hr minimum for fast food. Franchises cutting staff, raising prices 15-20%, automating ordering. Small operators closing.",cost:"$20/hr minimum",color:C.orange,icon:"\uD83C\uDF54"},
{rule:"AB 5 (Gig Worker Law)",impact:"Reclassified independent contractors as employees. Devastated freelancers, trucking, creative industries before carveouts added.",cost:"Massive",color:C.amber,icon:"\uD83D\uDE9A"},
{rule:"Workers Comp Costs",impact:"CA workers comp premiums among highest in US. Manufacturing and construction particularly impacted.",cost:"2-3x other states",color:C.purple,icon:"\u2695\uFE0F"},
{rule:"Privacy Law (CCPA/CPRA)",impact:"Most stringent state privacy regulations. Compliance costs significant for small businesses. $7,500 penalties per violation.",cost:"$50K-500K compliance",color:C.blue,icon:"\uD83D\uDD12"},
{rule:"Annual 'Job Killer' Bills",impact:"CA Chamber of Commerce identifies 20-30 bills each year that would add new mandates. Businesses spend resources fighting legislation instead of growing.",cost:"Ongoing",color:C.teal,icon:"\u2696\uFE0F"},
].map(function(item,i){return(
<div key={i} style={{display:"flex",gap:14,padding:"16px 0",borderBottom:i<5?"1px solid "+C.border:"none",alignItems:"flex-start"}}>
<div style={{fontSize:22,flexShrink:0,width:32,textAlign:"center"}}>{item.icon}</div>
<div style={{flex:1}}>
<div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:2}}>
<span style={{fontWeight:700,fontSize:15,color:item.color}}>{item.rule}</span>
<span style={{fontSize:12,color:C.amber,background:C.amber+"18",padding:"2px 8px",borderRadius:4}}>{item.cost}</span>
</div>
<p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.4}}>{item.impact}</p>
</div>
</div>
);})}
</div>
<Callout color={C.coral}>The perception among most California businesses is that <strong>state government views them as adversaries, not partners</strong>. Each year, businesses must spend significant resources fighting new proposed mandates rather than investing in growth. The regulatory burden is cumulative and accelerating.</Callout>
</Section>
</>)}

{tab==="departures"&&(<>
<Section title="Major Headquarters Departures" subtitle="Companies that moved HQ or major operations out of California">
<div style={{background:C.card,borderRadius:8,border:"1px solid "+C.border,overflow:"hidden"}}>
{[
{company:"Tesla",to:"Austin, TX",year:"2021",reason:"Musk cited regulations, costs, and housing. Moved HQ and Gigafactory expansion.",color:C.coral},
{company:"Oracle",to:"Austin, TX",year:"2020",reason:"Relocated from Redwood City. Cited flexibility and lower costs.",color:C.orange},
{company:"Hewlett Packard Enterprise",to:"Houston, TX",year:"2020",reason:"Left San Jose for Texas. Tax savings and employee quality of life.",color:C.amber},
{company:"Charles Schwab",to:"Westlake, TX",year:"2019",reason:"$300M campus. Left SF. Cited costs and regulatory environment.",color:C.purple},
{company:"Chevron",to:"Houston, TX",year:"2024",reason:"Left San Ramon after 145 years in CA. Cited hostile regulatory climate.",color:C.blue},
{company:"SpaceX",to:"Starbase, TX",year:"2024",reason:"Moved HQ from Hawthorne. Musk cited CA gender identity law for schools.",color:C.teal},
{company:"In-N-Out Burger",to:"Nashville, TN",year:"2023",reason:"Heritage CA brand moved HQ to Tennessee. Cited business environment.",color:C.orange},
{company:"Palantir",to:"Denver, CO",year:"2020",reason:"Left Palo Alto. Cited Silicon Valley 'monoculture' and costs.",color:C.amber},
].map(function(r,i){return(
<div key={i} style={{display:"flex",alignItems:"center",padding:"12px 20px",borderBottom:i<7?"1px solid "+C.border:"none"}}>
<div style={{width:60,fontSize:12,color:r.color,fontWeight:700,flexShrink:0}}>{r.year}</div>
<div style={{flex:1}}>
<span style={{fontWeight:700,fontSize:15,color:C.white}}>{r.company}</span>
<span style={{fontSize:13,color:C.slate,marginLeft:8}}>{r.reason}</span>
</div>
<div style={{fontSize:12,color:r.color,fontWeight:600,flexShrink:0}}>{r.to}</div>
</div>
);})}
</div>
<Callout color={C.orange}>These are just the high-profile names. Between 2011 and 2021, far more HQs launched (7,250) and closed (12,700) than relocated. But the <strong>direction is clear</strong>: exiting HQs consistently choose states with lower taxes and lighter regulation. Texas, Florida, Nevada, and Arizona are the top destinations.</Callout>
</Section>
</>)}

{tab==="strengths"&&(<>
<Section title="Why California Still Dominates" subtitle="The advantages that persist despite the governance failures" accent={C.green}>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.green+"55"}}>
<div style={{display:"flex",flexWrap:"wrap",gap:16}}>
{[
{title:"Venture Capital Hub",desc:"~50% of all US VC flows through CA. Sand Hill Road is irreplaceable. Founders still want to be here for the network, mentorship, and deal flow.",color:C.green,icon:"\uD83D\uDCB0"},
{title:"Talent Density",desc:"Stanford, Berkeley, Caltech, UCLA. More PhDs per capita than anywhere. The workforce is the product, and CA's is unmatched.",color:C.teal,icon:"\uD83E\uDDE0"},
{title:"Industry Clusters",desc:"AI in SF, biotech in SD, entertainment in LA, ag in Central Valley. Decades of accumulated expertise in concentrated geographies.",color:C.blue,icon:"\uD83C\uDFED"},
{title:"Pacific Rim Access",desc:"Ports of LA/Long Beach handle 40% of US imports. Gateway to Asian markets. Geographic advantage no policy can replicate.",color:C.purple,icon:"\uD83C\uDF0F"},
{title:"Climate & Lifestyle",desc:"Year-round outdoor living. Cultural diversity. Food scene. National parks. These attract talent that tolerates everything else.",color:C.amber,icon:"\u2600\uFE0F"},
{title:"First-Mover Ecosystem",desc:"Companies like Apple, Google, Meta, Netflix were born here. The ecosystem that created them still exists. Momentum is powerful.",color:C.orange,icon:"\uD83D\uDE80"},
].map(function(c,i){return(
<div key={i} style={{flex:"1 1 250px",background:C.bg,borderRadius:8,padding:14,borderLeft:"3px solid "+c.color}}>
<div style={{fontSize:20,marginBottom:4}}>{c.icon}</div>
<h4 style={{fontSize:14,color:c.color,marginBottom:4,fontWeight:700}}>{c.title}</h4>
<p style={{fontSize:13,color:"#CBD5E1",lineHeight:1.4}}>{c.desc}</p>
</div>
);})}
</div>
<Callout color={C.green}>California's advantages are <strong>real and substantial</strong>. No other state can match the combination of talent, capital, climate, and industry clusters. The question is not whether CA is still powerful -- it is. The question is whether it's <strong>maximizing</strong> those advantages or squandering them through policy choices.</Callout>
</div>
</Section>
</>)}

{tab==="honest"&&(<>
<Section title="The California Puzzle" subtitle="Worst business climate rankings, 5th largest global economy. Both are true." accent={C.amber}>
<div style={{background:"linear-gradient(135deg, #78350F22, #1E293B)",border:"1px solid "+C.amber+"55",borderRadius:8,padding:24}}>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>PPIC's research resolves the puzzle: <strong style={{color:C.amber}}>California's economy grows at roughly the national average despite its policy environment, not because of it.</strong> Natural advantages offset governance disadvantages.</p>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>But <strong style={{color:C.coral}}>the margin is eroding</strong>. CA did not reduce its tax and regulatory burden as much as other states from 2010-2021. HQ departures are accelerating. The companies leaving are choosing states with lower taxes and lighter regulation -- not because those states have better weather or talent, but because the cost-benefit calculation is shifting.</p>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>The <strong style={{color:C.green}}>honest bottom line</strong>: California can afford bad governance because it has extraordinary natural and historical advantages. A less blessed state with the same policies would have collapsed long ago. But those advantages are not infinite, and the trend line points in the wrong direction.</p>
<p style={{fontSize:16,color:"#CBD5E1",lineHeight:1.7,fontStyle:"italic"}}>The businesses that left didn't leave because California isn't great. They left because the gap between what California charges and what it delivers has grown too large to justify.</p>
</div>
</Section>
</>)}

</div>
</>);}
