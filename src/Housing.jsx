import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell, LabelList, PieChart, Pie } from "recharts";
const C={coral:"#FF6B6B",amber:"#FBBF24",green:"#34D399",teal:"#2DD4BF",blue:"#60A5FA",purple:"#A78BFA",orange:"#FB923C",cyan:"#22D3EE",white:"#F8FAFC",slate:"#94A3B8",bg:"#0F172A",card:"#1E293B",border:"#334155"};
const Section=({title,subtitle,children,accent=C.purple})=>(<div style={{marginBottom:44}}><h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:24,fontWeight:700,color:C.white,marginBottom:4,borderLeft:"4px solid "+accent,paddingLeft:16}}>{title}</h2>{subtitle&&<p style={{fontSize:15,color:C.slate,marginTop:4,marginBottom:18,paddingLeft:20}}>{subtitle}</p>}{children}</div>);
const Stat=({label,value,sub,color=C.purple})=>(<div style={{background:C.card,border:"1px solid "+C.border,borderRadius:8,padding:"14px 18px",flex:"1 1 140px",minWidth:140}}><div style={{fontSize:11,color:C.slate,textTransform:"uppercase",letterSpacing:1}}>{label}</div><div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:28,fontWeight:700,color,marginTop:4}}>{value}</div>{sub&&<div style={{fontSize:12,color:C.slate,marginTop:2}}>{sub}</div>}</div>);
const Tip=({active,payload,label})=>{if(!active||!payload)return null;return(<div style={{background:"#0F172AEE",border:"1px solid "+C.border,borderRadius:6,padding:"8px 12px",fontSize:12}}><div style={{color:C.white,fontWeight:600,marginBottom:3}}>{label}</div>{payload.map(function(p,i){return <div key={i} style={{color:p.color||p.fill,marginTop:1}}>{p.name}: {typeof p.value==="number"?p.value.toLocaleString():p.value}</div>;})}</div>);};
const Callout=({children,color=C.purple})=>(<div style={{marginTop:14,padding:"14px 18px",background:color+"15",border:"1px solid "+color+"55",borderRadius:6,fontSize:15,color:C.white,lineHeight:1.65}}>{children}</div>);
const Chart=({children,height=320})=>(<div style={{background:C.card,borderRadius:8,padding:"18px 10px",border:"1px solid "+C.border}}><ResponsiveContainer width="100%" height={height}>{children}</ResponsiveContainer></div>);
const Cards=({items})=>(<div style={{display:"flex",flexWrap:"wrap",gap:16}}>{items.map(function(c,i){return(<div key={i} style={{flex:"1 1 200px",background:c.bg||C.card,border:"1px solid "+C.border,borderRadius:8,padding:16,borderLeft:c.border?"3px solid "+c.color:"none",borderTop:c.topBorder?"3px solid "+c.color:"none"}}>{c.icon&&<div style={{fontSize:22,marginBottom:6}}>{c.icon}</div>}<h4 style={{fontSize:15,color:c.color,marginBottom:6,fontWeight:700}}>{c.title}</h4><p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.5}}>{c.desc}</p></div>);})}</div>);

var medianPrices=[{state:"California",price:905,fill:C.coral},{state:"Hawaii",price:850,fill:C.orange},{state:"Massachusetts",price:620,fill:C.amber},{state:"US Average",price:404,fill:C.blue},{state:"Texas",price:340,fill:C.green},{state:"Ohio",price:240,fill:C.teal},{state:"Iowa",price:247,fill:C.teal}];
var affordability=[{year:"2019",pct:32},{year:"2020",pct:28},{year:"2021",pct:24},{year:"2022",pct:17},{year:"2023",pct:16},{year:"2024",pct:16},{year:"2025",pct:17},{year:"2026",pct:18}];
var savingsYears=[{state:"Iowa",years:8.7,fill:C.green},{state:"Ohio",years:9.9,fill:C.green},{state:"Texas",years:10.3,fill:C.teal},{state:"US Average",years:14.5,fill:C.blue},{state:"Washington",years:18.2,fill:C.amber},{state:"Massachusetts",years:20.1,fill:C.orange},{state:"California",years:25,fill:C.coral}];
var rentData=[{city:"San Francisco",rent:3450,fill:C.coral},{city:"San Jose",rent:3200,fill:C.coral},{city:"Los Angeles",rent:2650,fill:C.orange},{city:"San Diego",rent:2500,fill:C.orange},{city:"Sacramento",rent:2100,fill:C.amber},{city:"US Average",rent:1750,fill:C.blue},{city:"Houston",rent:1400,fill:C.green}];
var shortage=[{year:"2010",units:1.5},{year:"2012",units:1.8},{year:"2014",units:2.0},{year:"2016",units:2.2},{year:"2018",units:2.5},{year:"2020",units:2.7},{year:"2022",units:2.9},{year:"2025",units:3.0}];
var jobsVsHousing=[{region:"Bay Area",jobs:7,housing:1,fill:C.coral},{region:"LA Metro",jobs:4,housing:1,fill:C.orange},{region:"San Diego",jobs:3.5,housing:1,fill:C.amber},{region:"Sacramento",jobs:2.5,housing:1,fill:C.blue}];
var costBreakdown=[{component:"Land",pct:35,color:C.coral},{component:"Construction",pct:30,color:C.orange},{component:"Permits/Fees",pct:15,color:C.amber},{component:"Regulation/Delay",pct:12,color:C.purple},{component:"Financing",pct:8,color:C.blue}];

var tabs=[{id:"prices",label:"Home Prices"},{id:"afford",label:"Affordability"},{id:"rent",label:"Rent Burden"},{id:"shortage",label:"The Shortage"},{id:"why",label:"Why So Expensive?"},{id:"compare",label:"The Compound Effect"}];

export default function Housing(){
var s=useState("prices"),tab=s[0],setTab=s[1];
return(<>
<div style={{background:C.card,borderBottom:"1px solid "+C.border,padding:"0 24px",overflowX:"auto",whiteSpace:"nowrap"}}><div style={{maxWidth:900,margin:"0 auto",display:"flex"}}>{tabs.map(function(t){return(<button key={t.id} onClick={function(){setTab(t.id);}} style={{background:"none",border:"none",borderBottom:tab===t.id?"3px solid "+C.purple:"3px solid transparent",color:tab===t.id?C.white:C.slate,fontSize:14,fontWeight:tab===t.id?700:400,padding:"12px 16px",cursor:"pointer",fontFamily:"'Source Sans 3',sans-serif"}}>{t.label}</button>);})}</div></div>
<div style={{maxWidth:900,margin:"0 auto",padding:"26px 24px"}}>

{tab==="prices"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="CA Median" value="$905K" sub="2026 forecast" color={C.coral}/>
<Stat label="US Median" value="$404K" sub="National average" color={C.blue}/>
<Stat label="Premium" value="2.2x" sub="CA vs national" color={C.amber}/>
<Stat label="Can Afford" value="18%" sub="Of CA households" color={C.green}/>
</div>

<Section title="Median Home Prices by State" subtitle="2026 projections ($ thousands)">
<Chart height={300}>
<BarChart data={medianPrices} margin={{left:10,right:30,top:20}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false}/>
<XAxis dataKey="state" tick={{fill:C.slate,fontSize:11}}/>
<YAxis tick={{fill:C.slate,fontSize:11}} tickFormatter={function(v){return "$"+v+"K";}} domain={[0,1000]}/>
<Tooltip content={<Tip/>}/>
<Bar dataKey="price" name="Median Price ($K)" radius={[4,4,0,0]} barSize={40}>
{medianPrices.map(function(d,i){return <Cell key={i} fill={d.fill}/>;})}<LabelList dataKey="price" position="top" fill={C.white} fontSize={11} formatter={function(v){return "$"+v+"K";}}/></Bar>
</BarChart>
</Chart>
<Callout color={C.coral}>California's median home price is <strong>$905,000</strong> -- more than double the national average of $404,000. A bottom-tier CA home costs <strong>30% more</strong> than a mid-tier home in the rest of the US. The entry-level California dream costs more than the American average dream.</Callout>
</Section>

<Section title="What $905K Buys You" accent={C.amber}>
<div style={{display:"flex",flexWrap:"wrap",gap:16}}>
{[
{title:"California: $905K",desc:"1,400 sq ft, 3BR/2BA ranch in Sacramento suburb. Needs updates. No garage in coastal cities. Might be a condo in SF/LA.",color:C.coral,topBorder:true},
{title:"Texas: $340K",desc:"2,200 sq ft, 4BR/3BA new-build in Austin suburb. Two-car garage, yard, modern finishes. Community pool included.",color:C.green,topBorder:true},
{title:"Ohio: $240K",desc:"2,800 sq ft, 4BR/2.5BA in Columbus suburb. Finished basement, large yard, top-rated schools. Money left over.",color:C.teal,topBorder:true},
].map(function(c,i){return(
<div key={i} style={{flex:"1 1 220px",background:C.bg,borderRadius:8,padding:16,borderTop:"3px solid "+c.color}}>
<h4 style={{fontSize:15,color:c.color,marginBottom:6,fontWeight:700}}>{c.title}</h4>
<p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.5}}>{c.desc}</p>
</div>
);})}
</div>
</Section>
</>)}

{tab==="afford"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="Can Afford" value="18%" sub="Of CA households" color={C.coral}/>
<Stat label="Cannot Afford" value="82%" sub="Priced out" color={C.orange}/>
<Stat label="Years to Save" value="25+" sub="For down payment" color={C.amber}/>
<Stat label="San Mateo" value="$500K+" sub="Income needed" color={C.purple}/>
</div>

<Section title="Share of Households That Can Afford Median Home" subtitle="California Housing Affordability Index (%)">
<Chart height={260}>
<LineChart data={affordability} margin={{left:0,right:20,top:10}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
<XAxis dataKey="year" tick={{fill:C.slate,fontSize:12}}/>
<YAxis tick={{fill:C.slate,fontSize:11}} tickFormatter={function(v){return v+"%";}} domain={[10,35]}/>
<Tooltip content={<Tip/>}/>
<Line type="monotone" dataKey="pct" name="% Can Afford" stroke={C.coral} strokeWidth={3} dot={{r:4,fill:C.coral}}/>
</LineChart>
</Chart>
<Callout color={C.coral}>Only <strong>18% of California households</strong> can afford the median-priced home. That means 82% are priced out of homeownership. In 2019 it was 32% -- bad but not catastrophic. In Orange County, the figure is <strong>9%</strong>.</Callout>
</Section>

<Section title="Years to Save for a Down Payment" subtitle="Estimated years to save 10% down, by state">
<Chart height={280}>
<BarChart data={savingsYears} margin={{left:0,right:30,top:20}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false}/>
<XAxis dataKey="state" tick={{fill:C.slate,fontSize:10}}/>
<YAxis tick={{fill:C.slate,fontSize:11}} domain={[0,30]}/>
<Tooltip content={<Tip/>}/>
<Bar dataKey="years" name="Years to Save" radius={[4,4,0,0]} barSize={40}>
{savingsYears.map(function(d,i){return <Cell key={i} fill={d.fill}/>;})}<LabelList dataKey="years" position="top" fill={C.white} fontSize={11}/></Bar>
</BarChart>
</Chart>
<Callout color={C.amber}>It takes <strong>25+ years</strong> to save for a down payment in California, vs 8.7 years in Iowa. A teacher starting at age 25 won't be able to buy a home until age 50. In San Mateo County, you need a <strong>$500,000+ annual income</strong> to qualify for the median home.</Callout>
</Section>

<Section title="The Lock-In Effect" accent={C.purple}>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>Nearly <strong style={{color:C.amber}}>80% of California homeowners</strong> have mortgage rates under 5%, compared to current rates around 6.25%. Moving means giving up a cheap mortgage for an expensive one on a more expensive house.</p>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>This creates a <strong style={{color:C.coral}}>paralyzed market</strong>: owners won't sell, inventory stays low, prices stay high, and new buyers can't enter. The golden handcuffs of pandemic-era refinancing.</p>
<p style={{fontSize:16,color:"#CBD5E1",lineHeight:1.7,fontStyle:"italic"}}>Result: home sales are below Great Recession levels despite strong demand. Buyers want to buy. Sellers won't sell. The market is frozen by policy-created rate distortion.</p>
</div>
</Section>
</>)}

{tab==="rent"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="CA Median Rent" value="$2,500" sub="2BR statewide" color={C.coral}/>
<Stat label="SF Rent" value="$3,450" sub="2BR average" color={C.orange}/>
<Stat label="Rent-Burdened" value="50%+" sub="Of CA renters" color={C.amber}/>
<Stat label="Min Wage Hours" value="70+" sub="Per week to afford rent" color={C.purple}/>
</div>

<Section title="Monthly Rent: California Cities vs US" subtitle="Average 2BR apartment rent, 2026">
<Chart height={300}>
<BarChart data={rentData} margin={{left:10,right:30,top:20}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false}/>
<XAxis dataKey="city" tick={{fill:C.slate,fontSize:10}}/>
<YAxis tick={{fill:C.slate,fontSize:11}} tickFormatter={function(v){return "$"+v.toLocaleString();}} domain={[0,4000]}/>
<Tooltip content={<Tip/>}/>
<Bar dataKey="rent" name="Monthly Rent" radius={[4,4,0,0]} barSize={38}>
{rentData.map(function(d,i){return <Cell key={i} fill={d.fill}/>;})}<LabelList dataKey="rent" position="top" fill={C.white} fontSize={10} formatter={function(v){return "$"+v.toLocaleString();}}/></Bar>
</BarChart>
</Chart>
<Callout color={C.coral}>Over half of California renters spend more than <strong>30% of income on housing</strong>. A minimum-wage worker must work <strong>70+ hours/week</strong> just to afford a basic apartment. Many teachers, nurses, and chefs live out of their cars.</Callout>
</Section>

<Cards items={[
{title:"The Rent Trap",desc:"Can't save for a down payment because rent consumes all income. Can't buy because you can't save. Permanent renter class by design.",color:C.coral,border:true},
{title:"Roommate Economy",desc:"Adults in their 30s and 40s sharing apartments like college students. Not by choice -- by necessity. The new California normal.",color:C.orange,border:true},
{title:"Super Commuters",desc:"Teachers in SF live in Tracy (90 min each way). Nurses in LA live in Riverside. 3-hour daily commutes to afford housing.",color:C.amber,border:true},
{title:"Car Living",desc:"In SLO County, teachers and nurses live in cars. Middle-class homelessness is a uniquely Californian invention.",color:C.purple,border:true},
]}/>
</>)}

{tab==="shortage"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="Housing Deficit" value="3M" sub="Units short" color={C.coral}/>
<Stat label="Bay Area Ratio" value="7:1" sub="Jobs to housing" color={C.orange}/>
<Stat label="Permits" value="Slow" sub="Years of delays" color={C.amber}/>
<Stat label="Solution" value="Build" sub="But NIMBY says no" color={C.green}/>
</div>

<Section title="California's Growing Housing Shortage" subtitle="Estimated housing unit deficit (millions)">
<Chart height={260}>
<LineChart data={shortage} margin={{left:0,right:20,top:10}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
<XAxis dataKey="year" tick={{fill:C.slate,fontSize:12}}/>
<YAxis tick={{fill:C.slate,fontSize:11}} tickFormatter={function(v){return v+"M";}} domain={[0,3.5]}/>
<Tooltip content={<Tip/>}/>
<Line type="monotone" dataKey="units" name="Deficit (M units)" stroke={C.coral} strokeWidth={3} dot={{r:4,fill:C.coral}}/>
</LineChart>
</Chart>
<Callout color={C.coral}>The shortage has doubled from 1.5 million to <strong>3 million units</strong> in 15 years. For every five new residents, only one housing unit was built. In the Bay Area, <strong>seven jobs were created for every one housing unit</strong> since the Great Recession.</Callout>
</Section>

<Section title="Jobs Created vs Housing Built" subtitle="Ratio since Great Recession, by region">
<Chart height={260}>
<BarChart data={jobsVsHousing} margin={{left:10,right:30,top:20}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false}/>
<XAxis dataKey="region" tick={{fill:C.slate,fontSize:11}}/>
<YAxis tick={{fill:C.slate,fontSize:11}} domain={[0,8]}/>
<Tooltip content={<Tip/>}/>
<Bar dataKey="jobs" name="Jobs per Housing Unit" radius={[4,4,0,0]} barSize={45}>
{jobsVsHousing.map(function(d,i){return <Cell key={i} fill={d.fill}/>;})}<LabelList dataKey="jobs" position="top" fill={C.white} fontSize={12} formatter={function(v){return v+":1";}}/></Bar>
</BarChart>
</Chart>
<Callout color={C.orange}>The Bay Area created <strong>7 jobs for every 1 housing unit</strong>. Where did those workers go? They either commute 2+ hours, pay astronomical rent, double up with roommates, or leave the state entirely.</Callout>
</Section>
</>)}

{tab==="why"&&(<>
<Section title="Why Is California Housing So Expensive?" subtitle="The root causes are almost entirely policy-created">
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
{[
{title:"NIMBY Zoning",desc:"Single-family zoning covers the vast majority of residential land in CA cities. Illegal to build apartments in most neighborhoods. Berkeley just repealed its 109-year-old single-family zoning in 2025 -- but most cities haven't.",pct:"Root Cause",color:C.coral,icon:"\uD83D\uDEAB"},
{title:"CEQA Abuse",desc:"The California Environmental Quality Act, designed to protect nature, is routinely weaponized to block housing projects. Anyone can file a CEQA challenge -- including competitors and NIMBYs -- adding years and millions to projects.",pct:"Years of delay",color:C.orange,icon:"\u2696\uFE0F"},
{title:"Permitting Costs",desc:"Development fees in CA average $150K+ per unit in coastal cities. Impact fees, school fees, park fees, traffic fees -- each individually small, collectively crushing. SF charges ~$170K in fees per unit.",pct:"$150K+/unit",color:C.amber,icon:"\uD83D\uDCCB"},
{title:"Construction Costs",desc:"Prevailing wage requirements, material costs, and contractor shortages drive building costs 30-50% above national average. A unit that costs $200K in Texas costs $350K+ in CA before land.",pct:"30-50% premium",color:C.purple,icon:"\uD83D\uDEA7"},
{title:"Land Costs",desc:"Artificial scarcity from zoning restrictions inflates land prices. When you can only build 1 unit on a lot zoned for 1, the land price reflects the entire value. Upzone it for 8 units and per-unit land cost drops 85%.",pct:"35% of cost",color:C.blue,icon:"\uD83D\uDDFA\uFE0F"},
{title:"Prop 13 Distortion",desc:"Property tax locked at 1975 values for long-term owners. Cities earn more revenue from commercial development than housing, so they zone for offices and retail, not homes.",pct:"Revenue incentive",color:C.teal,icon:"\uD83C\uDFDB\uFE0F"},
].map(function(item,i){return(
<div key={i} style={{display:"flex",gap:14,padding:"16px 0",borderBottom:i<5?"1px solid "+C.border:"none",alignItems:"flex-start"}}>
<div style={{fontSize:24,flexShrink:0,width:36,textAlign:"center"}}>{item.icon}</div>
<div style={{flex:1}}>
<div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:4}}>
<span style={{fontWeight:700,fontSize:15,color:item.color}}>{item.title}</span>
<span style={{fontSize:12,color:C.amber,background:C.amber+"18",padding:"2px 8px",borderRadius:4}}>{item.pct}</span>
</div>
<p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.5}}>{item.desc}</p>
</div>
</div>
);})}
</div>
<Callout color={C.purple}>Every single cause is <strong>policy-created</strong>. California has plenty of land, plenty of demand, plenty of construction capacity, and plenty of capital. What it lacks is <strong>permission to build</strong>. The housing crisis is a zoning crisis.</Callout>
</Section>
</>)}

{tab==="compare"&&(<>
<Section title="The Compound Effect" subtitle="How housing costs cascade through everything else" accent={C.coral}>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>Housing isn't just one crisis -- it's the <strong style={{color:C.amber}}>root cause of half the others</strong> on this site:</p>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:14}}>
{[
{crisis:"Exodus",link:"People leave because they can't afford to live here. Net 367K left in 2021 alone.",color:C.coral},
{crisis:"Homelessness",link:"A 2022 study found homelessness rates are driven by housing costs, not drugs or mental illness.",color:C.orange},
{crisis:"Insurance",link:"Building in fire zones because affordable areas are all wildland-urban interface.",color:C.amber},
{crisis:"Labor Shortages",link:"Teachers, nurses, firefighters can't afford to live where they work.",color:C.purple},
{crisis:"Inequality",link:"Homeowners gained $200K+ in equity since 2020. Renters gained nothing. Wealth gap widens.",color:C.blue},
{crisis:"Business Climate",link:"Companies leave partly because they can't recruit workers who can't afford housing.",color:C.teal},
].map(function(c,i){return(
<div key={i} style={{flex:"1 1 250px",background:C.bg,borderRadius:6,padding:12,borderLeft:"3px solid "+c.color}}>
<div style={{fontSize:14,fontWeight:700,color:c.color,marginBottom:2}}>{c.crisis}</div>
<div style={{fontSize:13,color:"#CBD5E1"}}>{c.link}</div>
</div>
);})}
</div>
</div>
</Section>

<Section title="Two Californias" accent={C.amber}>
<div style={{display:"flex",flexWrap:"wrap",gap:16}}>
{[
{title:"If You Bought Before 2015",desc:"Your home has doubled in value. Your Prop 13 property tax is frozen low. Your mortgage rate is 3-4%. You've accumulated $300K+ in equity. You vote against new housing to protect your investment.",color:C.green,icon:"\uD83C\uDFE0"},
{title:"If You Didn't",desc:"You spend 40-50% of income on rent. You can't save for a down payment. You commute 90+ minutes. You'll rent for life unless you leave the state. Your kids will never afford to live near you.",color:C.coral,icon:"\uD83D\uDCB8"},
].map(function(c,i){return(
<div key={i} style={{flex:"1 1 300px",background:C.bg,borderRadius:8,padding:20,borderTop:"3px solid "+c.color}}>
<div style={{fontSize:32,marginBottom:8}}>{c.icon}</div>
<h4 style={{fontSize:16,color:c.color,marginBottom:8,fontWeight:700}}>{c.title}</h4>
<p style={{fontSize:15,color:"#CBD5E1",lineHeight:1.6}}>{c.desc}</p>
</div>
);})}
</div>
<Callout color={C.amber}>California's housing crisis has created a <strong>two-tier society</strong>: property owners who benefit from scarcity and everyone else who pays for it. The people who vote on housing policy are overwhelmingly the ones who benefit from blocking it. This is the structural lock that makes reform nearly impossible.</Callout>
</Section>

<Section title="What Would Fix It" accent={C.green}>
<Cards items={[
{title:"Upzone Transit Corridors",desc:"Allow 4-8 story buildings within 1/2 mile of transit. SB 35 and SB 423 started this. Need to go much further.",color:C.green,topBorder:true},
{title:"Streamline Permitting",desc:"Cap approval timelines at 6 months. Limit CEQA challenges for housing. Other states build in 1/3 the time.",color:C.teal,topBorder:true},
{title:"Cut Fees",desc:"$150K in fees per unit is a hidden tax on housing. Shift infrastructure costs to general revenue.",color:C.blue,topBorder:true},
{title:"Reform Prop 13 for Land",desc:"Tax vacant and underutilized land at market rates to incentivize development, not speculation.",color:C.purple,topBorder:true},
]}/>
<Callout color={C.green}>The solution is known. It is not mysterious. Japan, which has national zoning, builds enough housing to keep Tokyo rents affordable despite being the world's largest metro area. <strong>California chooses not to build.</strong> That is the entire crisis in one sentence.</Callout>
</Section>
</>)}

</div>
</>);}
