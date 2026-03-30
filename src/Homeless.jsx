import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell, LabelList, PieChart, Pie } from "recharts";
const C={coral:"#FF6B6B",amber:"#FBBF24",green:"#34D399",teal:"#2DD4BF",blue:"#60A5FA",purple:"#A78BFA",orange:"#FB923C",cyan:"#22D3EE",white:"#F8FAFC",slate:"#94A3B8",bg:"#0F172A",card:"#1E293B",border:"#334155"};
const Section=({title,subtitle,children,accent=C.coral})=>(<div style={{marginBottom:44}}><h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:24,fontWeight:700,color:C.white,marginBottom:4,borderLeft:"4px solid "+accent,paddingLeft:16}}>{title}</h2>{subtitle&&<p style={{fontSize:15,color:C.slate,marginTop:4,marginBottom:18,paddingLeft:20}}>{subtitle}</p>}{children}</div>);
const Stat=({label,value,sub,color=C.coral})=>(<div style={{background:C.card,border:"1px solid "+C.border,borderRadius:8,padding:"14px 18px",flex:"1 1 140px",minWidth:140}}><div style={{fontSize:11,color:C.slate,textTransform:"uppercase",letterSpacing:1}}>{label}</div><div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:28,fontWeight:700,color,marginTop:4}}>{value}</div>{sub&&<div style={{fontSize:12,color:C.slate,marginTop:2}}>{sub}</div>}</div>);
const Tip=({active,payload,label})=>{if(!active||!payload)return null;return(<div style={{background:"#0F172AEE",border:"1px solid "+C.border,borderRadius:6,padding:"8px 12px",fontSize:12}}><div style={{color:C.white,fontWeight:600,marginBottom:3}}>{label}</div>{payload.map(function(p,i){return <div key={i} style={{color:p.color||p.fill,marginTop:1}}>{p.name}: {typeof p.value==="number"?p.value.toLocaleString():p.value}</div>;})}</div>);};
const Callout=({children,color=C.coral})=>(<div style={{marginTop:14,padding:"14px 18px",background:color+"15",border:"1px solid "+color+"55",borderRadius:6,fontSize:15,color:C.white,lineHeight:1.65}}>{children}</div>);
const Chart=({children,height=320})=>(<div style={{background:C.card,borderRadius:8,padding:"18px 10px",border:"1px solid "+C.border}}><ResponsiveContainer width="100%" height={height}>{children}</ResponsiveContainer></div>);
const Cards=({items})=>(<div style={{display:"flex",flexWrap:"wrap",gap:16}}>{items.map(function(c,i){return(<div key={i} style={{flex:"1 1 200px",background:c.bg||C.card,border:"1px solid "+C.border,borderRadius:8,padding:16,borderLeft:c.border?"3px solid "+c.color:"none",borderTop:c.topBorder?"3px solid "+c.color:"none"}}>{c.icon&&<div style={{fontSize:22,marginBottom:6}}>{c.icon}</div>}<h4 style={{fontSize:15,color:c.color,marginBottom:6,fontWeight:700}}>{c.title}</h4><p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.5}}>{c.desc}</p></div>);})}</div>);

var popData=[{year:"2013",count:118},{year:"2015",count:116},{year:"2017",count:134},{year:"2019",count:151},{year:"2020",count:161},{year:"2022",count:172},{year:"2023",count:181},{year:"2024",count:183}];
var stateComp=[{state:"California",count:183000,pct:28,fill:C.coral},{state:"New York",count:103000,pct:16,fill:C.orange},{state:"Florida",count:31000,pct:5,fill:C.amber},{state:"Washington",count:29000,pct:4,fill:C.blue},{state:"Texas",count:27000,pct:4,fill:C.green}];
var spendingData=[{year:"2018-19",amount:2.0},{year:"2019-20",amount:3.5},{year:"2020-21",amount:5.8},{year:"2021-22",amount:7.2},{year:"2022-23",amount:5.5}];
var causesDeath=[{cause:"Drug/Alcohol Overdose",pct:45,color:C.coral},{cause:"Heart Disease",pct:14,color:C.orange},{cause:"Traffic Injuries",pct:8,color:C.amber},{cause:"Homicide",pct:5,color:C.purple},{cause:"Suicide",pct:3,color:C.blue},{cause:"Other",pct:25,color:C.slate}];
var fentanylRise=[{year:"2018",pct:12.5},{year:"2019",pct:22},{year:"2020",pct:38},{year:"2021",pct:55},{year:"2022",pct:66},{year:"2023",pct:70.4}];
var costPerUnit=[{type:"Santa Monica PSH",cost:1025,fill:C.coral},{type:"LA Avg PSH",cost:750,fill:C.orange},{type:"CA New Construction",cost:570,fill:C.amber},{type:"Homekey (motel conv.)",cost:144,fill:C.green},{type:"Modular/Prefab",cost:200,fill:C.teal}];
var exitOutcomes=[{outcome:"Returned to Homelessness",pct:44,color:C.coral},{outcome:"Found Shelter/Housing",pct:24,color:C.green},{outcome:"Unknown/Other",pct:32,color:C.slate}];

var tabs=[{id:"scale",label:"The Scale"},{id:"spending",label:"$24 Billion"},{id:"deaths",label:"Dying on the Streets"},{id:"drugs",label:"The Fentanyl Crisis"},{id:"solutions",label:"What Works"},{id:"honest",label:"Honest Assessment"}];

export default function Homeless(){
var s=useState("scale"),tab=s[0],setTab=s[1];
return(<>
<div style={{background:C.card,borderBottom:"1px solid "+C.border,padding:"0 24px",overflowX:"auto",whiteSpace:"nowrap"}}><div style={{maxWidth:900,margin:"0 auto",display:"flex"}}>{tabs.map(function(t){return(<button key={t.id} onClick={function(){setTab(t.id);}} style={{background:"none",border:"none",borderBottom:tab===t.id?"3px solid "+C.coral:"3px solid transparent",color:tab===t.id?C.white:C.slate,fontSize:14,fontWeight:tab===t.id?700:400,padding:"12px 16px",cursor:"pointer",fontFamily:"'Source Sans 3',sans-serif"}}>{t.label}</button>);})}</div></div>
<div style={{maxWidth:900,margin:"0 auto",padding:"26px 24px"}}>

{tab==="scale"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="Homeless" value="183K" sub="People in California" color={C.coral}/>
<Stat label="US Share" value="28%" sub="Of all US homeless" color={C.orange}/>
<Stat label="Unsheltered" value="50%" sub="Of all US unsheltered" color={C.amber}/>
<Stat label="10yr Growth" value="+53%" sub="Since 2013" color={C.purple}/>
</div>

<Section title="California's Homeless Population" subtitle="Point-in-time count (thousands)">
<Chart height={280}>
<LineChart data={popData} margin={{left:0,right:20,top:10}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
<XAxis dataKey="year" tick={{fill:C.slate,fontSize:12}}/>
<YAxis tick={{fill:C.slate,fontSize:11}} tickFormatter={function(v){return v+"K";}} domain={[100,200]}/>
<Tooltip content={<Tip/>}/>
<Line type="monotone" dataKey="count" name="Homeless (thousands)" stroke={C.coral} strokeWidth={3} dot={{r:4,fill:C.coral}}/>
</LineChart>
</Chart>
<Callout color={C.coral}>California's homeless population has grown <strong>53% in a decade</strong>, from 118,000 to 183,000. This happened during the strongest economy in state history and despite <strong>$24 billion in spending</strong>. More than two-thirds are unsheltered -- living on streets, in tents, under bridges, or in vehicles.</Callout>
</Section>

<Section title="California vs Other States" subtitle="Homeless population by state (2024 HUD count)">
<Chart height={280}>
<BarChart data={stateComp} margin={{left:10,right:30,top:20}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false}/>
<XAxis dataKey="state" tick={{fill:C.slate,fontSize:11}}/>
<YAxis tick={{fill:C.slate,fontSize:11}} tickFormatter={function(v){return (v/1000)+"K";}} domain={[0,200000]}/>
<Tooltip content={<Tip/>}/>
<Bar dataKey="count" name="Homeless Population" radius={[4,4,0,0]} barSize={45}>
{stateComp.map(function(d,i){return <Cell key={i} fill={d.fill}/>;})}<LabelList dataKey="count" position="top" fill={C.white} fontSize={10} formatter={function(v){return (v/1000)+"K";}}/></Bar>
</BarChart>
</Chart>
<Callout color={C.orange}>California has <strong>28% of all US homeless</strong> despite being 12% of the population. It has <strong>half of all unsheltered homeless</strong> in the entire country. A 2022 study found this disparity is driven not by mental illness or drug addiction, but by <strong>housing costs</strong>. West Coast cities have homelessness rates 5x that of places like Arkansas and Detroit -- which have far higher poverty and opioid rates.</Callout>
</Section>

<Cards items={[
{title:"Skid Row, Los Angeles",desc:"50 square blocks in downtown LA. Estimated 4,600 people living on the streets. Open-air drug markets. America's most concentrated zone of human suffering.",color:C.coral,icon:"\uD83C\uDFD9\uFE0F",topBorder:true},
{title:"The Tenderloin, San Francisco",desc:"Residents sued the city for streets free of drugs and tents. Fentanyl dealers operate openly. Families with children walk past people injecting.",color:C.orange,icon:"\uD83C\uDF01",topBorder:true},
{title:"Sacramento Riverbanks",desc:"Tent cities along the American River. State capital city can't keep its own riverfront safe. Fires from encampments are routine.",color:C.amber,icon:"\u26FA",topBorder:true},
{title:"Central Valley",desc:"Fresno saw the largest homeless increase in a decade despite having some of CA's most affordable housing. COVID worsened instability.",color:C.purple,icon:"\uD83C\uDF3E",topBorder:true},
]}/>
</>)}

{tab==="spending"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="State Spending" value="$24B" sub="Over 5 years" color={C.coral}/>
<Stat label="Per Person" value="$42K" sub="Per year (2021-22)" color={C.orange}/>
<Stat label="LA Budget" value="$1.3B" sub="City alone, per year" color={C.amber}/>
<Stat label="SF Budget" value="$846M" sub="One city, one year" color={C.purple}/>
</div>

<Section title="State Homelessness Spending" subtitle="California annual spending ($ billions)">
<Chart height={260}>
<BarChart data={spendingData} margin={{left:10,right:20,top:20}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false}/>
<XAxis dataKey="year" tick={{fill:C.slate,fontSize:11}}/>
<YAxis tick={{fill:C.slate,fontSize:11}} tickFormatter={function(v){return "$"+v+"B";}} domain={[0,8]}/>
<Tooltip content={<Tip/>}/>
<Bar dataKey="amount" name="Spending ($B)" radius={[4,4,0,0]} barSize={45} fill={C.coral}>
<LabelList dataKey="amount" position="top" fill={C.white} fontSize={12} formatter={function(v){return "$"+v+"B";}}/></Bar>
</BarChart>
</Chart>
<Callout color={C.coral}><strong>$24 billion in 5 years.</strong> Homelessness increased 30,000 people during this period. That is roughly <strong>$160,000 per homeless person</strong> over 5 years. San Francisco alone budgets $846 million annually. LA spends $1.3 billion. The numbers went up anyway.</Callout>
</Section>

<Section title="The Cost of Housing the Homeless" subtitle="Cost per unit by approach ($K)">
<Chart height={280}>
<BarChart data={costPerUnit} margin={{left:10,right:30,top:20}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false}/>
<XAxis dataKey="type" tick={{fill:C.slate,fontSize:9}} angle={-10} textAnchor="end" height={60}/>
<YAxis tick={{fill:C.slate,fontSize:11}} tickFormatter={function(v){return "$"+v+"K";}} domain={[0,1100]}/>
<Tooltip content={<Tip/>}/>
<Bar dataKey="cost" name="Cost/Unit ($K)" radius={[4,4,0,0]} barSize={40}>
{costPerUnit.map(function(d,i){return <Cell key={i} fill={d.fill}/>;})}<LabelList dataKey="cost" position="top" fill={C.white} fontSize={11} formatter={function(v){return "$"+v+"K";}}/></Bar>
</BarChart>
</Chart>
<Callout color={C.orange}>A Santa Monica permanent supportive housing project costs <strong>$1.025 million per unit</strong> -- for a studio apartment three blocks from the beach. LA averages $750K/unit. Meanwhile, the Homekey program converts motels at $144K/unit. The expensive approach dominates spending.</Callout>
</Section>

<Section title="Where Do People Go After Programs?" subtitle="Outcomes for interim housing placements" accent={C.orange}>
<div style={{display:"flex",flexWrap:"wrap",gap:20,alignItems:"center"}}>
<div style={{flex:"1 1 280px"}}><Chart height={240}>
<PieChart><Pie data={exitOutcomes} dataKey="pct" nameKey="outcome" cx="50%" cy="50%" outerRadius={95} innerRadius={50} paddingAngle={3} label={function(d){return d.pct+"%";}}>
{exitOutcomes.map(function(d,i){return <Cell key={i} fill={d.color}/>;})}</Pie><Tooltip/></PieChart>
</Chart></div>
<div style={{flex:"1 1 280px",background:C.card,border:"1px solid "+C.border,borderRadius:8,padding:18}}>
<h3 style={{fontSize:16,color:C.coral,marginBottom:10,fontFamily:"'Playfair Display',serif"}}>The Revolving Door</h3>
<p style={{fontSize:15,color:"#CBD5E1",lineHeight:1.6,marginBottom:10}}><strong style={{color:C.coral}}>44%</strong> of people placed in interim housing returned to homelessness.</p>
<p style={{fontSize:15,color:"#CBD5E1",lineHeight:1.6,marginBottom:10}}>Only <strong style={{color:C.green}}>13%</strong> of interim placements led to permanent housing.</p>
<p style={{fontSize:15,color:"#CBD5E1",lineHeight:1.6}}><strong style={{color:C.slate}}>32%</strong> went to "unknown" destinations -- likely back on the streets.</p>
</div>
</div>
<Callout color={C.amber}>The state auditor found California <strong>doesn't consistently track</strong> whether its programs work. The Interagency Council on Homelessness stopped tracking spending in 2021. Three of five major programs couldn't even be evaluated because <strong>no data was collected</strong>.</Callout>
</Section>
</>)}

{tab==="deaths"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="Deaths (LA)" value="2,508" sub="In 2023 alone" color={C.coral}/>
<Stat label="Mortality Rate" value="49x" sub="Drug OD vs general pop" color={C.orange}/>
<Stat label="Death Rate" value="3,326" sub="Per 100K homeless" color={C.amber}/>
<Stat label="Rate Increase" value="+56%" sub="2019 to 2021" color={C.purple}/>
</div>

<Section title="How Homeless People Die in California" subtitle="Leading causes of death, LA County 2023">
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
{causesDeath.map(function(d,i){return(
<div key={i} style={{marginBottom:12}}>
<div style={{display:"flex",justifyContent:"space-between",fontSize:14,marginBottom:3}}>
<span style={{color:C.white}}>{d.cause}</span>
<span style={{color:d.color,fontWeight:700}}>{d.pct}%</span>
</div>
<div style={{background:C.bg,borderRadius:4,height:18,overflow:"hidden"}}>
<div style={{width:d.pct*2+"%",height:"100%",background:d.color+"CC",borderRadius:4,display:"flex",alignItems:"center",paddingLeft:6}}>
<span style={{fontSize:10,color:C.white,fontWeight:600}}>{d.pct}%</span>
</div></div>
</div>
);})}
</div>
<Callout color={C.coral}><strong>Drug and alcohol overdose is the #1 killer</strong> -- accounting for 45% of all homeless deaths. The overdose mortality rate among homeless people is <strong>49 times higher</strong> than the general population. Traffic injuries (getting hit by cars while sleeping near roads) are third. Homicide is fourth.</Callout>
</Section>

<Cards items={[
{title:"2,508 Deaths in One County",desc:"LA County alone recorded 2,508 homeless deaths in 2023. That's nearly 7 people per day dying on the streets of a single American county.",color:C.coral,icon:"\u2620\uFE0F",topBorder:true},
{title:"Mortality Spike",desc:"Homeless mortality rate surged 56% from 2019 to 2021, driven by fentanyl, COVID-19, and rising traffic deaths. It has since plateaued -- but at a devastatingly high level.",color:C.orange,icon:"\uD83D\uDCC8",topBorder:true},
{title:"Younger Than You Think",desc:"Average age of death among homeless is mid-50s. Life expectancy 20-30 years shorter than housed population. Chronic exposure, untreated conditions, violence.",color:C.amber,icon:"\u23F3",topBorder:true},
{title:"Race Disparities",desc:"Black Californians are 6% of population but ~30% of homeless. Overdose and homicide rates disproportionately affect Black and Latino homeless individuals.",color:C.purple,icon:"\u26A0\uFE0F",topBorder:true},
]}/>
</>)}

{tab==="drugs"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="Fentanyl Deaths" value="70.4%" sub="Of homeless OD deaths" color={C.coral}/>
<Stat label="Growth" value="5.6x" sub="Fentanyl since 2018" color={C.orange}/>
<Stat label="Drug Use" value="30%+" sub="Report regular use" color={C.amber}/>
<Stat label="Prop 47" value="2014" sub="Removed drug court leverage" color={C.purple}/>
</div>

<Section title="Fentanyl's Takeover" subtitle="% of homeless overdose deaths involving fentanyl">
<Chart height={280}>
<LineChart data={fentanylRise} margin={{left:0,right:20,top:10}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
<XAxis dataKey="year" tick={{fill:C.slate,fontSize:12}}/>
<YAxis tick={{fill:C.slate,fontSize:11}} tickFormatter={function(v){return v+"%";}} domain={[0,80]}/>
<Tooltip content={<Tip/>}/>
<Line type="monotone" dataKey="pct" name="Fentanyl %" stroke={C.coral} strokeWidth={3} dot={{r:5,fill:C.coral}}/>
</LineChart>
</Chart>
<Callout color={C.coral}>Fentanyl involvement in homeless overdose deaths went from <strong>12.5% in 2018 to 70.4% in 2023</strong> -- a 5.6x increase in five years. Fentanyl is 50x stronger than heroin and 100x more potent than morphine. It replaced heroin as the primary street drug around 2016 and devastated the homeless population.</Callout>
</Section>

<Section title="Proposition 47: The Unintended Consequence" accent={C.orange}>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.amber}}>Prop 47 (2014)</strong> aimed to reduce prison overcrowding by reclassifying drug possession from a felony to a misdemeanor. The intention was compassionate. The consequence was devastating.</p>
<div style={{display:"flex",flexWrap:"wrap",gap:16,marginBottom:14}}>
{[
{title:"Before Prop 47",desc:"Drug courts offered a carrot-and-stick: complete treatment and felony charges are dropped. This was the primary mechanism forcing people into recovery programs.",color:C.green},
{title:"After Prop 47",desc:"Drug possession is now a misdemeanor citation -- like a parking ticket. No leverage to compel treatment. Many addicts cycle through the system with no intervention.",color:C.coral},
].map(function(c,i){return(
<div key={i} style={{flex:"1 1 280px",background:C.bg,borderRadius:8,padding:16,borderTop:"3px solid "+c.color}}>
<h4 style={{fontSize:15,color:c.color,marginBottom:6,fontWeight:700}}>{c.title}</h4>
<p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.5}}>{c.desc}</p>
</div>
);})}
</div>
<Callout color={C.orange}>Prop 47 removed the primary tool for getting addicts into treatment at exactly the moment fentanyl arrived on the streets. <strong>The timing was catastrophic.</strong> Open-air drug markets in the Tenderloin and Skid Row operate with near-impunity because possession carries minimal consequences.</Callout>
</div>
</Section>
</>)}

{tab==="solutions"&&(<>
<Section title="What Actually Works" subtitle="Evidence-based approaches vs California's approach" accent={C.green}>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
{[
{what:"Homekey (Motel Conversions)",works:"Yes",cost:"$144K/unit",evidence:"State auditor found it cost-effective. 2.5x cheaper than new construction. Fast deployment.",color:C.green,icon:"\uD83C\uDFE8"},
{what:"CalWORKs Housing Support",works:"Yes",cost:"$12-22K/family",evidence:"Gives financial help to at-risk families. Prevents homelessness for $22K vs $50K+ to serve someone after they become homeless.",color:C.green,icon:"\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67"},
{what:"Housing First (with services)",works:"Mixed",cost:"$750K+/unit",evidence:"Works for some. But 1 in 5 PSH residents in LA returned to homelessness. Black residents had higher return rates.",color:C.amber,icon:"\uD83C\uDFE0"},
{what:"$1M/Unit Luxury PSH",works:"No",cost:"$1M+/unit",evidence:"Not scalable. Santa Monica building 120 units for $123M near the beach. You cannot solve a 183,000-person crisis at this price.",color:C.coral,icon:"\uD83D\uDCB8"},
{what:"Encampment Clearings (alone)",works:"No",cost:"Varies",evidence:"Without housing alternatives, people move to the next block. Costly and ineffective without services. But Supreme Court now allows it.",color:C.coral,icon:"\uD83D\uDEA7"},
{what:"Drug Courts (pre-Prop 47)",works:"Was working",cost:"Low",evidence:"Provided leverage to compel treatment. Prop 47 eliminated felony drug charges, removing this tool entirely.",color:C.amber,icon:"\u2696\uFE0F"},
].map(function(s,i){return(
<div key={i} style={{display:"flex",gap:14,padding:"16px 0",borderBottom:i<5?"1px solid "+C.border:"none",alignItems:"flex-start"}}>
<div style={{fontSize:24,flexShrink:0,width:36,textAlign:"center"}}>{s.icon}</div>
<div style={{flex:1}}>
<div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:4}}>
<span style={{fontWeight:700,fontSize:15,color:s.color}}>{s.what}</span>
<span style={{fontSize:12,color:s.works==="Yes"?C.green:s.works==="No"?C.coral:C.amber,background:(s.works==="Yes"?C.green:s.works==="No"?C.coral:C.amber)+"18",padding:"2px 8px",borderRadius:4,fontWeight:700}}>{s.works==="Yes"?"Evidence: Effective":s.works==="No"?"Evidence: Ineffective":"Evidence: Mixed"}</span>
</div>
<div style={{fontSize:12,color:C.slate,marginBottom:4}}>Cost: {s.cost}</div>
<p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.4}}>{s.evidence}</p>
</div>
</div>
);})}
</div>
<Callout color={C.green}>The <strong>cheapest solutions work best</strong>. Prevention ($22K/family) beats treatment ($50K+/person). Motel conversions ($144K/unit) beat new construction ($750K+). But California consistently chooses the most expensive approach in the most expensive locations.</Callout>
</Section>
</>)}

{tab==="honest"&&(<>
<Section title="An Honest Assessment" subtitle="Why this crisis is so intractable -- and what would actually help" accent={C.amber}>
<div style={{background:"linear-gradient(135deg, #78350F22, #1E293B)",border:"1px solid "+C.amber+"55",borderRadius:8,padding:24}}>

<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.coral}}>What California got wrong:</strong></p>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:20}}>
{[
"Spent $24B without tracking if programs worked",
"Built $1M/unit housing when $144K alternatives existed",
"Removed drug court leverage right as fentanyl arrived",
"No central authority coordinating 30+ programs across 9 agencies",
"Political incentives favor visible spending over effective spending",
"Treated a housing problem with social services (and vice versa)",
].map(function(s,i){return(
<div key={i} style={{flex:"1 1 250px",background:C.bg,borderRadius:6,padding:10,borderLeft:"3px solid "+C.coral,fontSize:13,color:"#CBD5E1"}}>{s}</div>
);})}
</div>

<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.green}}>What's worth acknowledging:</strong></p>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:20}}>
{[
"Homelessness is genuinely harder in CA -- housing costs are the primary driver",
"2025 data shows first significant decline in unsheltered homelessness (9%)",
"Homekey program successfully housed thousands at reasonable cost",
"Mental health and addiction are real factors that pure housing alone can't solve",
"Other states export their homeless to CA's mild climate (documented)",
"Federal pandemic-era protections ending has created new instability",
].map(function(s,i){return(
<div key={i} style={{flex:"1 1 250px",background:C.bg,borderRadius:6,padding:10,borderLeft:"3px solid "+C.green,fontSize:13,color:"#CBD5E1"}}>{s}</div>
);})}
</div>

<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.amber}}>The uncomfortable truth:</strong></p>
<p style={{fontSize:16,color:"#CBD5E1",lineHeight:1.7,marginBottom:14}}>California's homelessness crisis is primarily a <strong style={{color:C.amber}}>housing crisis</strong>. The same NIMBY zoning that prices out middle-class families also creates the conditions for mass homelessness. You cannot solve homelessness without building dramatically more housing -- and California has chosen not to build.</p>
<p style={{fontSize:16,color:"#CBD5E1",lineHeight:1.7,marginBottom:14}}>But it is also a <strong style={{color:C.coral}}>drug crisis</strong>, a <strong style={{color:C.purple}}>mental health crisis</strong>, and an <strong style={{color:C.orange}}>accountability crisis</strong>. No amount of housing will help someone dying of fentanyl addiction without treatment. And no amount of money will work if nobody tracks whether it's working.</p>
<p style={{fontSize:16,color:"#CBD5E1",lineHeight:1.7,fontStyle:"italic"}}>Seven people die every day on the streets of LA County alone. California has spent more money on homelessness than most countries spend on their entire social safety nets. The crisis is not a lack of resources. It is a failure of execution, accountability, and political courage.</p>
</div>
</Section>
</>)}

</div>
</>);}
