import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell, LabelList } from "recharts";
const C={coral:"#FF6B6B",amber:"#FBBF24",green:"#34D399",teal:"#2DD4BF",blue:"#60A5FA",purple:"#A78BFA",orange:"#FB923C",cyan:"#22D3EE",white:"#F8FAFC",slate:"#94A3B8",bg:"#0F172A",card:"#1E293B",border:"#334155"};
const Section=({title,subtitle,children,accent=C.orange})=>(<div style={{marginBottom:44}}><h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:24,fontWeight:700,color:C.white,marginBottom:4,borderLeft:"4px solid "+accent,paddingLeft:16}}>{title}</h2>{subtitle&&<p style={{fontSize:15,color:C.slate,marginTop:4,marginBottom:18,paddingLeft:20}}>{subtitle}</p>}{children}</div>);
const Stat=({label,value,sub,color=C.orange})=>(<div style={{background:C.card,border:"1px solid "+C.border,borderRadius:8,padding:"14px 18px",flex:"1 1 140px",minWidth:140}}><div style={{fontSize:11,color:C.slate,textTransform:"uppercase",letterSpacing:1}}>{label}</div><div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:30,fontWeight:700,color,marginTop:4}}>{value}</div>{sub&&<div style={{fontSize:12,color:C.slate,marginTop:2}}>{sub}</div>}</div>);
const Tip=({active,payload,label})=>{if(!active||!payload)return null;return(<div style={{background:"#0F172AEE",border:"1px solid "+C.border,borderRadius:6,padding:"8px 12px",fontSize:12}}><div style={{color:C.white,fontWeight:600,marginBottom:3}}>{label}</div>{payload.map((p,i)=><div key={i} style={{color:p.color||p.fill,marginTop:1}}>{p.name}: {typeof p.value==="number"?"$"+p.value.toLocaleString()+"B":p.value}</div>)}</div>);};
const Callout=({children,color=C.orange})=>(<div style={{marginTop:14,padding:"14px 18px",background:color+"15",border:"1px solid "+color+"55",borderRadius:6,fontSize:15,color:C.white,lineHeight:1.65}}>{children}</div>);
const Chart=({children,height=320})=>(<div style={{background:C.card,borderRadius:8,padding:"18px 10px",border:"1px solid "+C.border}}><ResponsiveContainer width="100%" height={height}>{children}</ResponsiveContainer></div>);
const Cards=({items})=>(<div style={{display:"flex",flexWrap:"wrap",gap:16}}>{items.map((c,i)=>(<div key={i} style={{flex:"1 1 200px",background:c.bg||C.card,border:"1px solid "+C.border,borderRadius:8,padding:16,borderLeft:c.border?"3px solid "+c.color:"none",borderTop:c.topBorder?"3px solid "+c.color:"none"}}>{c.icon&&<div style={{fontSize:22,marginBottom:6}}>{c.icon}</div>}<h4 style={{fontSize:15,color:c.color,marginBottom:6,fontWeight:700}}>{c.title}</h4><p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.5}}>{c.desc}</p></div>))}</div>);

const costEscalation=[{year:"2008",cost:33,label:"Prop 1A estimate"},{year:"2012",cost:68,label:"First revision"},{year:"2014",cost:68,label:"Held"},{year:"2018",cost:77,label:"Updated"},{year:"2020",cost:80,label:"Revised"},{year:"2022",cost:105,label:"Major jump"},{year:"2024",cost:128,label:"Peak estimate"},{year:"2026",cost:126,label:"Trimmed $1.7B"}];
const globalComp=[{country:"China",costPerMile:25,miles:25000,fill:C.green},{country:"Spain",costPerMile:30,miles:2275,fill:C.teal},{country:"France",costPerMile:35,miles:1740,fill:C.blue},{country:"Japan",costPerMile:60,miles:1914,fill:C.purple},{country:"UK (HS2)",costPerMile:200,miles:140,fill:C.orange},{country:"California",costPerMile:255,miles:0,fill:C.coral}];
const scopeShrink=[{year:"2008",miles:800,label:"Full vision: SF-LA-Sac-SD"},{year:"2012",miles:494,label:"Phase 1: SF to LA"},{year:"2016",miles:300,label:"IOS: SJ to Bakersfield"},{year:"2019",miles:171,label:"IOS: Merced to Bakersfield"},{year:"2026",miles:119,label:"Under construction"}];
const altUses=[{item:"Desalination plants (18)",cost:126,impact:"Permanent water security for entire state",fill:C.blue},{item:"Affordable housing (125K units)",cost:126,impact:"House 300,000+ people",fill:C.green},{item:"Road/bridge repair statewide",cost:126,impact:"Fix every deficient bridge in CA",fill:C.amber},{item:"200 round-trip flights per SF+LA resident",cost:126,impact:"Flight for every person, 200 times",fill:C.purple}];
const timeline=[
{year:"2008",event:"Prop 1A approved. $9.9B bond. Promise: SF-LA by 2020 for $33B.",color:C.green},
{year:"2012",event:"Cost revised to $68B. 'Blended' approach adopted to share tracks with commuter rail.",color:C.amber},
{year:"2015",event:"Groundbreaking in Fresno. Construction begins on Central Valley segment.",color:C.green},
{year:"2018",event:"Cost jumps to $77B. Federal funding disputes begin.",color:C.amber},
{year:"2019",event:"Gov. Newsom scales back to Central Valley segment. 'Let's be real,' he says.",color:C.orange},
{year:"2022",event:"Cost hits $105B. 70% of Central Valley guideway structures complete.",color:C.amber},
{year:"2024",event:"$13.8B spent total. $128B full Phase 1 estimate. No track laid.",color:C.coral},
{year:"2025",event:"70 miles of guideway ready for track. Federal funding termination notice issued.",color:C.coral},
{year:"2026",event:"$4B federal funding terminated. Cost trimmed to $126.2B. Target: 2033 service.",color:C.coral},
];

const tabs=[{id:"promise",label:"Promise vs Reality"},{id:"cost",label:"Cost Explosion"},{id:"global",label:"Global Comparison"},{id:"scope",label:"Scope Shrink"},{id:"alternative",label:"$126B Alternatives"},{id:"steel",label:"The Case FOR"}];

export default function Rail(){
const[tab,setTab]=useState("promise");
return(<>
<div style={{background:C.card,borderBottom:"1px solid "+C.border,padding:"0 24px",overflowX:"auto",whiteSpace:"nowrap"}}><div style={{maxWidth:900,margin:"0 auto",display:"flex"}}>{tabs.map(function(t){return(<button key={t.id} onClick={function(){setTab(t.id);}} style={{background:"none",border:"none",borderBottom:tab===t.id?"3px solid "+C.orange:"3px solid transparent",color:tab===t.id?C.white:C.slate,fontSize:14,fontWeight:tab===t.id?700:400,padding:"12px 16px",cursor:"pointer",fontFamily:"'Source Sans 3',sans-serif"}}>{t.label}</button>);})}</div></div>
<div style={{maxWidth:900,margin:"0 auto",padding:"26px 24px"}}>

{tab==="promise"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="Original Cost" value="$33B" sub="2008 estimate" color={C.green}/>
<Stat label="Current Cost" value="$126B" sub="2026 estimate" color={C.coral}/>
<Stat label="Spent So Far" value="$18B" sub="Zero passengers" color={C.orange}/>
<Stat label="Track Laid" value="0 mi" sub="After 18 years" color={C.coral}/>
</div>

<Section title="A Timeline of Broken Promises">
<div style={{background:C.card,borderRadius:8,border:"1px solid "+C.border,overflow:"hidden"}}>
{timeline.map(function(t,i){return(
<div key={i} style={{display:"flex",gap:14,padding:"14px 20px",borderBottom:i<timeline.length-1?"1px solid "+C.border:"none",alignItems:"flex-start"}}>
<div style={{width:50,flexShrink:0,fontWeight:700,fontSize:15,color:t.color}}>{t.year}</div>
<div style={{width:10,height:10,borderRadius:"50%",background:t.color,flexShrink:0,marginTop:5}}/>
<div style={{flex:1,fontSize:14,color:"#CBD5E1",lineHeight:1.5}}>{t.event}</div>
</div>
);})}
</div>
<Callout color={C.coral}><strong>18 years. $18 billion. Zero passengers.</strong> The project was supposed to be complete by 2020. In 2026, not a single mile of high-speed track has been laid. The scope has shrunk from 800 miles to 119 miles under construction, connecting two Central Valley cities that most Californians have never visited.</Callout>
</Section>

<Section title="What Voters Were Promised vs What They Got">
<div style={{display:"flex",flexWrap:"wrap",gap:16}}>
{[
{title:"Route",promised:"SF to LA to Sacramento to San Diego (800 mi)",got:"Merced to Bakersfield (171 mi planned, 119 under construction)",color:C.coral},
{title:"Travel Time",promised:"SF to LA in 2 hours 40 minutes",got:"Merced to Bakersfield only. No connection to either major city.",color:C.orange},
{title:"Cost",promised:"$33-45 billion total system",got:"$126.2 billion for Phase 1 alone. Central Valley segment: $34.76B.",color:C.amber},
{title:"Completion",promised:"Operational by 2020",got:"Maybe 2033 for Merced-Bakersfield. Full system: unknown.",color:C.purple},
].map(function(c,i){return(
<div key={i} style={{flex:"1 1 200px",background:C.bg,borderRadius:8,padding:16,borderTop:"3px solid "+c.color}}>
<h4 style={{fontSize:15,color:c.color,marginBottom:8,fontWeight:700}}>{c.title}</h4>
<div style={{marginBottom:8}}><div style={{fontSize:11,color:C.green,textTransform:"uppercase",letterSpacing:1,marginBottom:2}}>Promised</div><p style={{fontSize:13,color:"#CBD5E1",lineHeight:1.4}}>{c.promised}</p></div>
<div><div style={{fontSize:11,color:C.coral,textTransform:"uppercase",letterSpacing:1,marginBottom:2}}>Reality</div><p style={{fontSize:13,color:"#CBD5E1",lineHeight:1.4}}>{c.got}</p></div>
</div>
);})}
</div>
</Section>
</>)}

{tab==="cost"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="Cost Growth" value="282%" sub="$33B to $126B" color={C.coral}/>
<Stat label="Per Mile" value="$255M" sub="Phase 1 average" color={C.orange}/>
<Stat label="Central Valley" value="$34.8B" sub="171 miles only" color={C.amber}/>
<Stat label="Federal Cut" value="$4B" sub="Terminated 2026" color={C.purple}/>
</div>

<Section title="The Cost Explosion" subtitle="Estimated total Phase 1 cost over time ($ billions)">
<Chart height={300}>
<BarChart data={costEscalation} margin={{left:0,right:20,top:20}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false}/>
<XAxis dataKey="year" tick={{fill:C.slate,fontSize:12}}/>
<YAxis tick={{fill:C.slate,fontSize:11}} tickFormatter={function(v){return "$"+v+"B";}} domain={[0,140]}/>
<Tooltip content={<Tip/>}/>
<Bar dataKey="cost" name="Estimated Cost" radius={[4,4,0,0]} barSize={40}>
{costEscalation.map(function(d,i){return <Cell key={i} fill={d.cost>100?C.coral:d.cost>60?C.orange:C.green}/>;})}</Bar>
</BarChart>
</Chart>
<Callout color={C.coral}>The cost has grown <strong>282%</strong> from the original $33B estimate. The 2026 plan claims a $1.7B "savings" from the 2024 peak of $128B. That is like celebrating a $1.70 discount on a meal that was supposed to cost $33 and now costs $126.</Callout>
</Section>

<Section title="Where Did the Money Go?">
<Cards items={[
{title:"Land Acquisition",desc:"Buying 2,295 parcels of Central Valley farmland. 98% complete after years of legal battles and eminent domain disputes.",color:C.amber,border:true},
{title:"Civil Structures",desc:"54 completed, 32 underway, 6 not started. Viaducts, overpasses, underpasses. No actual railroad track or systems.",color:C.orange,border:true},
{title:"Change Orders",desc:"Largest single change order in history: $537.3M settlement with Dragados-Flatiron JV. Years of contractor disputes.",color:C.coral,border:true},
{title:"Administration",desc:"Authority staff, consultants, environmental review, legal fees, planning studies. Eighteen years of overhead.",color:C.purple,border:true},
]}/>
</Section>
</>)}

{tab==="global"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="China" value="$25M" sub="Per mile, 25,000 mi built" color={C.green}/>
<Stat label="Spain" value="$30M" sub="Per mile, 2,275 mi built" color={C.teal}/>
<Stat label="France" value="$35M" sub="Per mile, 1,740 mi built" color={C.blue}/>
<Stat label="California" value="$255M" sub="Per mile, 0 mi operational" color={C.coral}/>
</div>

<Section title="Cost Per Mile: Global Comparison" subtitle="Construction cost per mile ($ millions) for high-speed rail systems">
<Chart height={300}>
<BarChart data={globalComp} margin={{left:10,right:30,top:20}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false}/>
<XAxis dataKey="country" tick={{fill:C.slate,fontSize:11}}/>
<YAxis tick={{fill:C.slate,fontSize:11}} tickFormatter={function(v){return "$"+v+"M";}} domain={[0,280]}/>
<Tooltip content={<Tip/>}/>
<Bar dataKey="costPerMile" name="Cost/Mile ($M)" radius={[4,4,0,0]} barSize={45}>
{globalComp.map(function(d,i){return <Cell key={i} fill={d.fill}/>;})}<LabelList dataKey="costPerMile" position="top" fill={C.white} fontSize={11} formatter={function(v){return "$"+v+"M";}}/></Bar>
</BarChart>
</Chart>
<Callout color={C.coral}>California's high-speed rail costs <strong>10x more per mile than China</strong>, 8x more than Spain, 7x more than France, and 4x more than Japan. Only the UK's troubled HS2 project comes close. And unlike every other country on this list, California has <strong>zero operational miles</strong>.</Callout>
</Section>

<Section title="What Other Countries Built for Less">
<Cards items={[
{title:"Japan: Shinkansen",desc:"1,914 miles operational since 1964. Zero passenger fatalities in 60 years. Tokyo-Osaka paid back construction costs in 10 years. Runs 13 trains per hour at peak.",color:C.purple,icon:"\uD83C\uDDEF\uD83C\uDDF5",topBorder:true},
{title:"France: TGV",desc:"1,740 miles. Paris-Lyon paid back in 12 years. Tickets $12-52. Connects every major city. Average speed 168 mph, max 235 mph.",color:C.blue,icon:"\uD83C\uDDEB\uD83C\uDDF7",topBorder:true},
{title:"China: CRH",desc:"25,000+ miles built since 2008 (same year CA voted). Connects 90% of population. Profitable on key routes. Still expanding.",color:C.green,icon:"\uD83C\uDDE8\uD83C\uDDF3",topBorder:true},
{title:"Spain: AVE",desc:"2,275 miles. Longest HSR network in Europe. Serves 40M+ passengers/year. Madrid to Barcelona in 2.5 hours. Tickets $12-30.",color:C.teal,icon:"\uD83C\uDDEA\uD83C\uDDF8",topBorder:true},
]}/>
<Callout color={C.blue}>China built <strong>25,000 miles of high-speed rail</strong> in the same 18 years California has spent failing to build 171 miles. Spain's entire 2,275-mile network cost less than California's single Central Valley segment.</Callout>
</Section>
</>)}

{tab==="scope"&&(<>
<Section title="The Incredible Shrinking Railroad" subtitle="Planned system miles over time">
<Chart height={300}>
<BarChart data={scopeShrink} margin={{left:0,right:20,top:20}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false}/>
<XAxis dataKey="year" tick={{fill:C.slate,fontSize:12}}/>
<YAxis tick={{fill:C.slate,fontSize:11}} domain={[0,900]}/>
<Tooltip/>
<Bar dataKey="miles" name="Miles" radius={[4,4,0,0]} barSize={45}>
{scopeShrink.map(function(d,i){return <Cell key={i} fill={[C.green,C.blue,C.amber,C.orange,C.coral][i]}/>;})}<LabelList dataKey="miles" position="top" fill={C.white} fontSize={12}/></Bar>
</BarChart>
</Chart>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border,marginTop:16}}>
{scopeShrink.map(function(s,i){return(
<div key={i} style={{display:"flex",gap:12,padding:"10px 0",borderBottom:i<scopeShrink.length-1?"1px solid "+C.border:"none"}}>
<div style={{width:50,fontWeight:700,color:[C.green,C.blue,C.amber,C.orange,C.coral][i],fontSize:15}}>{s.year}</div>
<div style={{flex:1}}>
<div style={{fontSize:15,fontWeight:600,color:C.white}}>{s.miles} miles</div>
<div style={{fontSize:13,color:C.slate}}>{s.label}</div>
</div>
</div>
);})}
</div>
<Callout color={C.orange}>The project has <strong>shrunk 85%</strong> from 800 miles to 119 miles under construction. The current segment connects Merced (pop. 86,000) to near Bakersfield (pop. 407,000). Neither is connected to San Francisco or Los Angeles -- the two cities voters were promised the train would serve.</Callout>
</Section>
</>)}

{tab==="alternative"&&(<>
<Section title="What $126 Billion Could Buy Instead" subtitle="Alternative uses for California's high-speed rail budget">
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
{[
{item:"18 large-scale desalination plants",impact:"Permanent water security for entire state. Drought-proof 1M+ acre-feet/year.",cost:"$7B each",total:"$126B",color:C.blue,icon:"\uD83C\uDF0A"},
{item:"125,000 affordable housing units",impact:"House 300,000+ people at CA construction costs ($1M/unit in cities).",cost:"$1M each",total:"$125B",color:C.green,icon:"\uD83C\uDFE0"},
{item:"Statewide road and bridge repair",impact:"Fix every structurally deficient bridge. Repave every failing highway.",cost:"Various",total:"$80-100B",color:C.amber,icon:"\uD83D\uDEE3\uFE0F"},
{item:"Complete EV charging network",impact:"Level 3 charger within 5 miles of every Californian. Grid upgrades included.",cost:"Various",total:"$30-50B",color:C.purple,icon:"\u26A1"},
{item:"200 round-trip flights per resident",impact:"Buy every SF and LA resident 200 flights between the two cities.",cost:"$150/flight",total:"$126B",color:C.orange,icon:"\u2708\uFE0F"},
{item:"Statewide broadband",impact:"Gigabit internet to every household in CA, including rural areas.",cost:"Various",total:"$20-30B",color:C.cyan,icon:"\uD83D\uDCF6"},
].map(function(a,i){return(
<div key={i} style={{display:"flex",gap:14,padding:"16px 0",borderBottom:i<5?"1px solid "+C.border:"none",alignItems:"flex-start"}}>
<div style={{fontSize:24,flexShrink:0,width:36,textAlign:"center"}}>{a.icon}</div>
<div style={{flex:1}}>
<div style={{fontSize:15,fontWeight:700,color:a.color,marginBottom:2}}>{a.item}</div>
<p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.4,marginBottom:2}}>{a.impact}</p>
<div style={{fontSize:12,color:C.slate}}>Estimated: {a.total}</div>
</div>
</div>
);})}
</div>
<Callout color={C.amber}>Every one of these alternatives would deliver tangible benefits to Californians today. The high-speed rail project has consumed $18 billion over 18 years and delivered zero miles of service. The opportunity cost is staggering.</Callout>
</Section>
</>)}

{tab==="steel"&&(<>
<Section title="The Case FOR High-Speed Rail" subtitle="In fairness, there are legitimate arguments for the project" accent={C.green}>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.green+"55"}}>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:16}}>It would be dishonest to present only the failures. Here is the strongest version of the case for California high-speed rail:</p>
<div style={{display:"flex",flexWrap:"wrap",gap:16}}>
{[
{title:"Every HSR System Started Ugly",desc:"Japan's Shinkansen was controversial and over budget when proposed in the 1950s. France's TGV faced fierce opposition. Major infrastructure always looks like a boondoggle mid-construction. The question is whether it's worth it in 50 years.",color:C.green,icon:"\uD83C\uDF31"},
{title:"Central Valley Growth",desc:"The Central Valley is California's fastest-growing region. HSR could transform Merced, Fresno, and Bakersfield into viable commuter cities for Bay Area and LA workers, alleviating the coastal housing crisis.",color:C.teal,icon:"\uD83C\uDFD9\uFE0F"},
{title:"Climate Commitment",desc:"Transportation is CA's largest emissions source. HSR powered by renewable electricity could remove millions of car trips and short-haul flights annually. The Paris-Lyon line reduced air travel by 40%.",color:C.blue,icon:"\uD83C\uDF0D"},
{title:"Real Construction Progress",desc:"70 miles of guideway complete. 54 major structures finished. 98% of land acquired. This isn't vaporware -- physical infrastructure exists. The hardest part (land and structures) is mostly done.",color:C.amber,icon:"\uD83D\uDEA7"},
{title:"Job Creation",desc:"The project has created over 12,000 construction jobs in the Central Valley, one of CA's most economically disadvantaged regions. These are well-paying union jobs in communities that desperately need them.",color:C.purple,icon:"\uD83D\uDC77"},
{title:"No Country Quit Mid-Build",desc:"No country that started building HSR has abandoned it. Even problematic projects (UK HS2) continue because the sunk cost + long-term value equation favors completion over abandonment.",color:C.orange,icon:"\uD83D\uDEE4\uFE0F"},
].map(function(c,i){return(
<div key={i} style={{flex:"1 1 250px",background:C.bg,borderRadius:8,padding:16,borderLeft:"3px solid "+c.color}}>
<div style={{fontSize:22,marginBottom:6}}>{c.icon}</div>
<h4 style={{fontSize:15,color:c.color,marginBottom:6,fontWeight:700}}>{c.title}</h4>
<p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.5}}>{c.desc}</p>
</div>
);})}
</div>
</div>
</Section>

<Section title="The Honest Assessment" accent={C.amber}>
<div style={{background:"linear-gradient(135deg, #78350F22, #1E293B)",border:"1px solid "+C.amber+"55",borderRadius:8,padding:24}}>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>The <strong style={{color:C.green}}>positive case</strong> is real but conditional: HSR could transform California's geography, reduce emissions, and create a genuine transportation alternative. Every successful HSR system in the world was controversial during construction.</p>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>The <strong style={{color:C.coral}}>negative case</strong> is also real and more immediate: the project has cost 4x its estimate, is 13+ years late, has shrunk to 15% of its original scope, has carried zero passengers, and no longer connects the cities voters were promised. The federal government has pulled funding, and the state faces a $50-70B deficit.</p>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>The <strong style={{color:C.amber}}>core question</strong> is not whether high-speed rail is a good idea -- it clearly works in Japan, France, Spain, and China. The question is whether <em>this particular project, managed this way, at this cost, in this fiscal environment</em> is the best use of California's limited resources.</p>
<p style={{fontSize:16,color:"#CBD5E1",lineHeight:1.7,fontStyle:"italic"}}>When the same $126 billion could solve the water crisis, house 300,000 people, or fix every road in the state, the burden of proof falls on the project's managers to explain why 18 years and $18 billion have produced zero miles of service -- and why the next 18 years will be different.</p>
</div>
</Section>
</>)}

</div>
</>);}
