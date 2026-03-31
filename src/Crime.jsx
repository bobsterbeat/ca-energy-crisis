import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell, LabelList } from "recharts";
const C={coral:"#FF6B6B",amber:"#FBBF24",green:"#34D399",teal:"#2DD4BF",blue:"#60A5FA",purple:"#A78BFA",orange:"#FB923C",cyan:"#22D3EE",white:"#F8FAFC",slate:"#94A3B8",bg:"#0F172A",card:"#1E293B",border:"#334155"};
const Section=({title,subtitle,children,accent=C.purple})=>(<div style={{marginBottom:44}}><h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:24,fontWeight:700,color:C.white,marginBottom:4,borderLeft:"4px solid "+accent,paddingLeft:16}}>{title}</h2>{subtitle&&<p style={{fontSize:15,color:C.slate,marginTop:4,marginBottom:18,paddingLeft:20}}>{subtitle}</p>}{children}</div>);
const Stat=({label,value,sub,color=C.purple})=>(<div style={{background:C.card,border:"1px solid "+C.border,borderRadius:8,padding:"14px 18px",flex:"1 1 140px",minWidth:140}}><div style={{fontSize:11,color:C.slate,textTransform:"uppercase",letterSpacing:1}}>{label}</div><div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:28,fontWeight:700,color,marginTop:4}}>{value}</div>{sub&&<div style={{fontSize:12,color:C.slate,marginTop:2}}>{sub}</div>}</div>);
const Callout=({children,color=C.purple})=>(<div style={{marginTop:14,padding:"14px 18px",background:color+"15",border:"1px solid "+color+"55",borderRadius:6,fontSize:15,color:C.white,lineHeight:1.65}}>{children}</div>);
const Cards=({items})=>(<div style={{display:"flex",flexWrap:"wrap",gap:16}}>{items.map(function(c,i){return(<div key={i} style={{flex:"1 1 200px",background:c.bg||C.card,border:"1px solid "+C.border,borderRadius:8,padding:16,borderLeft:c.border?"3px solid "+c.color:"none",borderTop:c.topBorder?"3px solid "+c.color:"none"}}>{c.icon&&<div style={{fontSize:22,marginBottom:6}}>{c.icon}</div>}<h4 style={{fontSize:15,color:c.color,marginBottom:6,fontWeight:700}}>{c.title}</h4><p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.5}}>{c.desc}</p></div>);})}</div>);

var crimeHistory=[{year:"2014",property:2730,violent:430},{year:"2016",property:2555,violent:445},{year:"2018",property:2380,violent:450},{year:"2019",property:2370,violent:440},{year:"2020",property:2370,violent:467},{year:"2021",property:2540,violent:490},{year:"2022",property:2315,violent:480},{year:"2023",property:2294,violent:466},{year:"2024",property:2100,violent:440}];
var clearanceData=[{year:"2013",rate:19},{year:"2015",rate:16},{year:"2017",rate:13},{year:"2019",rate:11},{year:"2021",rate:8},{year:"2023",rate:9},{year:"2024",rate:10}];

var tabs=[{id:"data",label:"The Data"},{id:"prop47",label:"Prop 47 Debate"},{id:"retail",label:"Retail Theft"},{id:"quality",label:"Quality of Life"},{id:"honest",label:"Honest Assessment"}];

export default function Crime(){
var s=useState("data"),tab=s[0],setTab=s[1];
return(<>
<div style={{background:C.card,borderBottom:"1px solid "+C.border,padding:"0 24px",overflowX:"auto",whiteSpace:"nowrap"}}><div style={{maxWidth:900,margin:"0 auto",display:"flex"}}>{tabs.map(function(t){return(<button key={t.id} onClick={function(){setTab(t.id);}} style={{background:"none",border:"none",borderBottom:tab===t.id?"3px solid "+C.purple:"3px solid transparent",color:tab===t.id?C.white:C.slate,fontSize:14,fontWeight:tab===t.id?700:400,padding:"12px 16px",cursor:"pointer",fontFamily:"'Source Sans 3',sans-serif"}}>{t.label}</button>);})}</div></div>
<div style={{maxWidth:900,margin:"0 auto",padding:"26px 24px"}}>

{tab==="data"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="Violent Crime" value="-12%" sub="vs 2019" color={C.green}/>
<Stat label="Homicide Rate" value="2nd Low" sub="Since 1966" color={C.green}/>
<Stat label="Property Crime" value="Record Low" sub="2024 data" color={C.teal}/>
<Stat label="Retail Theft" value="213K" sub="Reported incidents" color={C.coral}/>
</div>

<Section title="California Crime Rates: The Actual Numbers" subtitle="Per 100,000 residents">
<div style={{background:C.card,borderRadius:8,padding:"18px 10px",border:"1px solid "+C.border}}>
<ResponsiveContainer width="100%" height={300}>
<LineChart data={crimeHistory} margin={{left:0,right:20,top:10}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
<XAxis dataKey="year" tick={{fill:C.slate,fontSize:12}}/>
<YAxis yAxisId="l" tick={{fill:C.amber,fontSize:11}} domain={[1800,3000]}/>
<YAxis yAxisId="r" orientation="right" tick={{fill:C.coral,fontSize:11}} domain={[350,520]}/>
<Tooltip/>
<Line yAxisId="l" type="monotone" dataKey="property" name="Property Crime Rate" stroke={C.amber} strokeWidth={3} dot={{r:4}}/>
<Line yAxisId="r" type="monotone" dataKey="violent" name="Violent Crime Rate" stroke={C.coral} strokeWidth={3} dot={{r:4}}/>
</LineChart>
</ResponsiveContainer>
</div>
<Callout color={C.green}><strong>The headline numbers are actually positive.</strong> Property crime hit record lows in 2024. The homicide rate is at its second-lowest since 1966. Violent crime is down 12% vs 2019. Compared to the 1980s-90s, California is dramatically safer. But the data doesn't capture the full picture of what residents experience.</Callout>
</Section>

<Section title="The Clearance Problem" subtitle="% of property crimes resulting in arrest (clearance rate)">
<div style={{background:C.card,borderRadius:8,padding:"18px 10px",border:"1px solid "+C.border}}>
<ResponsiveContainer width="100%" height={240}>
<LineChart data={clearanceData} margin={{left:0,right:20,top:10}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
<XAxis dataKey="year" tick={{fill:C.slate,fontSize:12}}/>
<YAxis tick={{fill:C.slate,fontSize:11}} tickFormatter={function(v){return v+"%";}} domain={[0,25]}/>
<Tooltip/>
<Line type="monotone" dataKey="rate" name="Clearance Rate %" stroke={C.coral} strokeWidth={3} dot={{r:4,fill:C.coral}}/>
</LineChart>
</ResponsiveContainer>
</div>
<Callout color={C.coral}>This is the real crisis. Property crime clearance rates have <strong>halved</strong> in a decade. A person is <strong>half as likely to be apprehended</strong> for property crime today as in 2014. When there are no consequences, rational actors steal more. The crime rate may be low, but the <strong>accountability rate is lower</strong>.</Callout>
</Section>
</>)}

{tab==="prop47"&&(<>
<Section title="Proposition 47: The Great Debate" subtitle="Did reclassifying felonies to misdemeanors cause a crime wave?" accent={C.amber}>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
<div style={{display:"flex",flexWrap:"wrap",gap:16,marginBottom:16}}>
{[
{title:"What Prop 47 Did (2014)",items:["Reclassified theft under $950 from felony to misdemeanor","Reclassified drug possession from felony to misdemeanor","Created specific misdemeanor shoplifting category","Directed savings to diversion and treatment programs","Passed with 60% voter support"],color:C.blue,icon:"\u2696\uFE0F"},
{title:"What Critics Say",items:["Removed consequences for theft -- shoplifters know they won't be prosecuted","Drug courts lost leverage to compel treatment","Emboldened organized retail crime rings","San Jose mayor: 'individuals arrested 15-25 times in 24 months'","Retailers closing stores and reducing hours in response"],color:C.coral,icon:"\u26A0\uFE0F"},
{title:"What Research Shows",items:["PPIC: modest increase in larceny, auto theft, burglary post-Prop 47","Pandemic-era changes had LARGER effect on crime than Prop 47","Property crime reached record lows in 2024 -- before Prop 36","Clearance rate decline was the bigger driver of crime increases","No evidence that changes in drug arrests led to any crime increases"],color:C.green,icon:"\uD83D\uDCCA"},
].map(function(c,i){return(
<div key={i} style={{flex:"1 1 250px",background:C.bg,borderRadius:8,padding:16,borderTop:"3px solid "+c.color}}>
<div style={{fontSize:22,marginBottom:6}}>{c.icon}</div>
<h4 style={{fontSize:15,color:c.color,marginBottom:10,fontWeight:700}}>{c.title}</h4>
{c.items.map(function(item,j){return(
<div key={j} style={{fontSize:13,color:"#CBD5E1",lineHeight:1.5,paddingLeft:10,borderLeft:"2px solid "+c.color+"44",marginBottom:6}}>{item}</div>
);})}
</div>
);})}
</div>
<Callout color={C.amber}><strong>The honest answer:</strong> Prop 47 had a real but modest effect on property crime. The pandemic's impact on the criminal justice system was larger. The collapse in clearance rates -- police solving fewer crimes -- was likely the biggest driver. <strong>Prop 36 (2024)</strong> now reverses some of Prop 47's changes, allowing felony charges for repeat theft and drug offenses.</Callout>
</div>
</Section>
</>)}

{tab==="retail"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="Reported Thefts" value="213K" sub="2024 incidents" color={C.coral}/>
<Stat label="Arrests" value="29K+" sub="Since Oct 2023" color={C.green}/>
<Stat label="Recovered" value="$226M" sub="In stolen goods" color={C.amber}/>
<Stat label="State Investment" value="$2.1B" sub="Since 2019" color={C.blue}/>
</div>

<Section title="Retail Theft: Viral Videos vs Data" accent={C.coral}>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.coral}}>The perception:</strong> Viral videos of brazen smash-and-grab robberies, organized theft rings cleaning out stores, retailers closing locations and locking up merchandise. Businesses and shoppers feel unsafe.</p>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.green}}>The data:</strong> Property crime rates reached record lows in 2024. Felony retail theft (non-residential burglary) fell in both 2023 and 2024. The increase in reported misdemeanor shoplifting may partly reflect better reporting, not more crime.</p>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.amber}}>The reality:</strong> Both can be true. Overall rates are down, but organized retail crime is real, concentrated, and highly visible. A single viral video of a Walgreens robbery shapes perception more than a DOJ statistical report.</p>
</div>
</Section>

<Cards items={[
{title:"Organized Retail Crime",desc:"Coordinated rings that steal to resell. Not petty shoplifting. CHP task force recovered $60M+ in stolen goods since 2019. 4,600 arrests.",color:C.coral,icon:"\uD83D\uDEA8",topBorder:true},
{title:"Store Closures",desc:"Walgreens, Target, Nordstrom closed locations citing theft. Some cities lost their only pharmacy or grocery store. Food deserts expand.",color:C.orange,icon:"\uD83C\uDFEA",topBorder:true},
{title:"$2.1B Response",desc:"CA invested record amounts since 2019 in law enforcement, organized retail crime task forces, and prosecution grants. Results improving.",color:C.green,icon:"\uD83D\uDCB0",topBorder:true},
{title:"Prop 36 (2024)",desc:"Voters approved allowing felony charges for repeat theft and drug offenses. Aggregating stolen values across incidents for felony threshold. Reverses key Prop 47 provisions.",color:C.blue,icon:"\u2696\uFE0F",topBorder:true},
]}/>
<Callout color={C.amber}>The state is responding with real investment. <strong>29,060 arrests and $226M in recovered goods</strong> in two years. Violent crime is down 12% vs 2019. But the <strong>perception of lawlessness</strong> -- driven by viral videos and visible homelessness -- may be more damaging to California's brand than the actual statistics.</Callout>
</>)}

{tab==="quality"&&(<>
<Section title="Quality of Life: Beyond the Statistics" subtitle="What the data doesn't capture" accent={C.orange}>
<div style={{display:"flex",flexWrap:"wrap",gap:16}}>
{[
{title:"The Tenderloin, SF",desc:"Open-air drug markets. People injecting on sidewalks. Residents sued the city for streets free of drugs and tents. Families with children walk through this daily.",color:C.coral,icon:"\uD83C\uDF01"},
{title:"Car Break-Ins",desc:"SF car break-ins became so routine that residents leave windows down and trunks open. 'Don't leave anything visible' is standard advice. Insurance doesn't cover the hassle.",color:C.orange,icon:"\uD83D\uDE97"},
{title:"Catalytic Converter Theft",desc:"A specialized crime wave. Organized teams stealing converters for precious metals. Replacement cost: $1,500-3,000. Some owners welded cages onto their cars.",color:C.amber,icon:"\uD83D\uDD27"},
{title:"Porch Pirates",desc:"Package theft so common that Amazon Lockers became standard. Some neighborhoods have community security cameras and group chats to track thieves.",color:C.purple,icon:"\uD83D\uDCE6"},
{title:"Smash and Grab",desc:"Flash mob-style retail robberies where groups overwhelm security. Louis Vuitton, Apple, Nordstrom targeted. Videos go viral globally, damaging CA's image.",color:C.blue,icon:"\uD83D\uDECD\uFE0F"},
{title:"Encampment Safety",desc:"Fires from homeless encampments, aggressive panhandling, used needles in parks. Parents stopped taking kids to some public spaces.",color:C.teal,icon:"\u26FA"},
].map(function(c,i){return(
<div key={i} style={{flex:"1 1 250px",background:C.bg,borderRadius:8,padding:14,borderLeft:"3px solid "+c.color}}>
<div style={{fontSize:20,marginBottom:4}}>{c.icon}</div>
<h4 style={{fontSize:14,color:c.color,marginBottom:4,fontWeight:700}}>{c.title}</h4>
<p style={{fontSize:13,color:"#CBD5E1",lineHeight:1.4}}>{c.desc}</p>
</div>
);})}
</div>
<Callout color={C.orange}>Crime statistics say California is safer than it's been in decades. <strong>Lived experience says otherwise.</strong> The disconnect between data and perception isn't because people are wrong -- it's because statistics don't measure the quality-of-life degradation that comes from visible disorder, even when "serious" crime is down.</Callout>
</Section>
</>)}

{tab==="honest"&&(<>
<Section title="Honest Assessment" subtitle="The crime story is more nuanced than either side admits" accent={C.amber}>
<div style={{background:"linear-gradient(135deg, #78350F22, #1E293B)",border:"1px solid "+C.amber+"55",borderRadius:8,padding:24}}>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.green}}>What the data actually shows:</strong></p>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:20}}>
{[
"Property crime at record lows in 2024",
"Homicide rate at second-lowest since 1966",
"Violent crime down 12% vs 2019 (pre-pandemic)",
"Robberies down 29% vs 2019",
"Prop 47's effect on crime was real but modest -- pandemic was bigger factor",
"$2.1B invested in public safety since 2019 with measurable results",
].map(function(s,i){return(
<div key={i} style={{flex:"1 1 250px",background:C.bg,borderRadius:6,padding:10,borderLeft:"3px solid "+C.green,fontSize:13,color:"#CBD5E1"}}>{s}</div>
);})}
</div>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.coral}}>What's genuinely concerning:</strong></p>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:20}}>
{[
"Property crime clearance rates halved -- accountability collapsed",
"Organized retail crime is real and sophisticated",
"Quality-of-life crimes (car break-ins, package theft) go largely unpunished",
"Visible disorder (encampments, drug use) degrades public spaces",
"Retailers closing stores hurts communities more than crime stats show",
"Perception of lawlessness drives business and resident departure",
].map(function(s,i){return(
<div key={i} style={{flex:"1 1 250px",background:C.bg,borderRadius:6,padding:10,borderLeft:"3px solid "+C.coral,fontSize:13,color:"#CBD5E1"}}>{s}</div>
);})}
</div>
<p style={{fontSize:16,color:"#CBD5E1",lineHeight:1.7,fontStyle:"italic"}}>California's crime story is not "crime is surging out of control" (it isn't) nor "everything is fine" (it isn't). The real problem is the <strong style={{color:C.amber}}>collapse of accountability</strong> -- the sense that minor crimes have no consequences, that visible disorder is tolerated, and that the social contract has frayed. That perception is driving the exodus as much as any tax rate.</p>
</div>
</Section>
</>)}

</div>
</>);}
