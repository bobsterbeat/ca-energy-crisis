import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts";
const C={coral:"#FF6B6B",amber:"#FBBF24",green:"#34D399",teal:"#2DD4BF",blue:"#60A5FA",purple:"#A78BFA",orange:"#FB923C",cyan:"#22D3EE",white:"#F8FAFC",slate:"#94A3B8",bg:"#0F172A",card:"#1E293B",border:"#334155"};
const Section=({title,subtitle,children,accent=C.blue})=>(<div style={{marginBottom:44}}><h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:24,fontWeight:700,color:C.white,marginBottom:4,borderLeft:"4px solid "+accent,paddingLeft:16}}>{title}</h2>{subtitle&&<p style={{fontSize:15,color:C.slate,marginTop:4,marginBottom:18,paddingLeft:20}}>{subtitle}</p>}{children}</div>);
const Stat=({label,value,sub,color=C.blue})=>(<div style={{background:C.card,border:"1px solid "+C.border,borderRadius:8,padding:"14px 18px",flex:"1 1 140px",minWidth:140}}><div style={{fontSize:11,color:C.slate,textTransform:"uppercase",letterSpacing:1}}>{label}</div><div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:28,fontWeight:700,color,marginTop:4}}>{value}</div>{sub&&<div style={{fontSize:12,color:C.slate,marginTop:2}}>{sub}</div>}</div>);
const Tip=({active,payload,label})=>{if(!active||!payload)return null;return(<div style={{background:"#0F172AEE",border:"1px solid "+C.border,borderRadius:6,padding:"8px 12px",fontSize:12}}><div style={{color:C.white,fontWeight:600,marginBottom:3}}>{label}</div>{payload.map(function(p,i){return <div key={i} style={{color:p.color||p.fill,marginTop:1}}>{p.name}: {typeof p.value==="number"?p.value.toLocaleString():p.value}</div>;})}</div>);};
const Callout=({children,color=C.blue})=>(<div style={{marginTop:14,padding:"14px 18px",background:color+"15",border:"1px solid "+color+"55",borderRadius:6,fontSize:15,color:C.white,lineHeight:1.65}}>{children}</div>);
const Chart=({children,height=320})=>(<div style={{background:C.card,borderRadius:8,padding:"18px 10px",border:"1px solid "+C.border}}><ResponsiveContainer width="100%" height={height}>{children}</ResponsiveContainer></div>);
const Cards=({items})=>(<div style={{display:"flex",flexWrap:"wrap",gap:16}}>{items.map(function(c,i){return(<div key={i} style={{flex:"1 1 200px",background:c.bg||C.card,border:"1px solid "+C.border,borderRadius:8,padding:16,borderLeft:c.border?"3px solid "+c.color:"none",borderTop:c.topBorder?"3px solid "+c.color:"none"}}>{c.icon&&<div style={{fontSize:22,marginBottom:6}}>{c.icon}</div>}<h4 style={{fontSize:15,color:c.color,marginBottom:6,fontWeight:700}}>{c.title}</h4><p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.5}}>{c.desc}</p></div>);})}</div>);

var spendingComp=[{state:"New York",spend:33437,fill:C.purple},{state:"New Jersey",spend:30267,fill:C.purple},{state:"Connecticut",spend:26500,fill:C.orange},{state:"California",spend:20496,fill:C.amber},{state:"US Average",spend:17699,fill:C.blue},{state:"Texas",spend:13500,fill:C.green},{state:"Florida",spend:13000,fill:C.green},{state:"Utah",spend:12337,fill:C.teal}];
var rankingComp=[{state:"Massachusetts",rank:1,score:74,fill:C.green},{state:"New Jersey",rank:2,score:68,fill:C.green},{state:"Connecticut",rank:3,score:65,fill:C.teal},{state:"California",rank:8,score:58,fill:C.amber},{state:"Texas",rank:30,score:42,fill:C.orange},{state:"Florida",rank:25,score:45,fill:C.orange},{state:"Utah",rank:12,score:55,fill:C.blue}];
var fundingHistory=[{year:"2019-20",amount:102},{year:"2020-21",amount:115},{year:"2021-22",amount:128},{year:"2022-23",amount:134},{year:"2023-24",amount:134},{year:"2024-25",amount:142}];

var tabs=[{id:"spending",label:"Spending"},{id:"outcomes",label:"Outcomes"},{id:"teachers",label:"Teacher Crisis"},{id:"uc",label:"UC System"},{id:"equity",label:"Equity Gap"},{id:"honest",label:"Honest Assessment"}];

export default function Education(){
var s=useState("spending"),tab=s[0],setTab=s[1];
return(<>
<div style={{background:C.card,borderBottom:"1px solid "+C.border,padding:"0 24px",overflowX:"auto",whiteSpace:"nowrap"}}><div style={{maxWidth:900,margin:"0 auto",display:"flex"}}>{tabs.map(function(t){return(<button key={t.id} onClick={function(){setTab(t.id);}} style={{background:"none",border:"none",borderBottom:tab===t.id?"3px solid "+C.blue:"3px solid transparent",color:tab===t.id?C.white:C.slate,fontSize:14,fontWeight:tab===t.id?700:400,padding:"12px 16px",cursor:"pointer",fontFamily:"'Source Sans 3',sans-serif"}}>{t.label}</button>);})}</div></div>
<div style={{maxWidth:900,margin:"0 auto",padding:"26px 24px"}}>

{tab==="spending"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="Per Pupil" value="$20.5K" sub="16th nationally" color={C.amber}/>
<Stat label="Adjusted Rank" value="31st" sub="Cost-of-living adj." color={C.coral}/>
<Stat label="Total Budget" value="$142B" sub="2024-25" color={C.orange}/>
<Stat label="Quality Rank" value="8th" sub="Up 24 spots in 2025" color={C.green}/>
</div>

<Section title="Per-Pupil Spending by State" subtitle="Current operations spending per student ($, 2025 dollars)">
<Chart height={300}>
<BarChart data={spendingComp} margin={{left:10,right:30,top:20}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false}/>
<XAxis dataKey="state" tick={{fill:C.slate,fontSize:10}}/>
<YAxis tick={{fill:C.slate,fontSize:11}} tickFormatter={function(v){return "$"+(v/1000)+"K";}} domain={[0,36000]}/>
<Tooltip content={<Tip/>}/>
<Bar dataKey="spend" name="Spending/Pupil" radius={[4,4,0,0]} barSize={40}>
{spendingComp.map(function(d,i){return <Cell key={i} fill={d.fill}/>;})}<LabelList dataKey="spend" position="top" fill={C.white} fontSize={9} formatter={function(v){return "$"+(v/1000).toFixed(1)+"K";}}/></Bar>
</BarChart>
</Chart>
<Callout color={C.amber}>California spends <strong>$20,496 per pupil</strong> -- 16th nationally, above the US average. But when adjusted for California's higher labor costs, that ranking drops to <strong>31st</strong>. A teacher earning $80K in CA has the purchasing power of a $50K teacher in Texas. The money doesn't go as far.</Callout>
</Section>

<Section title="Where the Money Goes" accent={C.orange}>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>Of California's $142.4 billion K-12 budget:</p>
<div style={{display:"flex",flexWrap:"wrap",gap:12}}>
{[
{item:"Staff Salaries",pct:"~55%",detail:"Teachers, administrators, support staff. Largest single cost.",color:C.blue},
{item:"Benefits & Pensions",pct:"~25%",detail:"Rising pension contributions absorbed 25% of the entire pre-pandemic spending increase. CalSTRS obligations growing faster than budgets.",color:C.coral},
{item:"Operations",pct:"~12%",detail:"Facilities, maintenance, utilities, transportation, food services.",color:C.amber},
{item:"Other/Admin",pct:"~8%",detail:"Administrative costs, technology, materials, programs.",color:C.slate},
].map(function(c,i){return(
<div key={i} style={{flex:"1 1 200px",background:C.bg,borderRadius:6,padding:12,borderLeft:"3px solid "+c.color}}>
<div style={{fontSize:20,fontWeight:700,color:c.color}}>{c.pct}</div>
<div style={{fontSize:14,fontWeight:600,color:C.white,marginBottom:2}}>{c.item}</div>
<p style={{fontSize:12,color:C.slate}}>{c.detail}</p>
</div>
);})}
</div>
<Callout color={C.coral}><strong>Pension costs are eating the budget.</strong> Rising CalSTRS contributions consumed 25% of pre-pandemic spending growth. Money that should go to classrooms goes to retirees. This is a structural problem that gets worse every year.</Callout>
</div>
</Section>
</>)}

{tab==="outcomes"&&(<>
<Section title="Public School Quality Rankings" subtitle="Overall education quality index score by state">
<Chart height={280}>
<BarChart data={rankingComp} margin={{left:0,right:30,top:20}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false}/>
<XAxis dataKey="state" tick={{fill:C.slate,fontSize:10}}/>
<YAxis tick={{fill:C.slate,fontSize:11}} domain={[0,80]}/>
<Tooltip content={<Tip/>}/>
<Bar dataKey="score" name="Quality Score" radius={[4,4,0,0]} barSize={40}>
{rankingComp.map(function(d,i){return <Cell key={i} fill={d.fill}/>;})}<LabelList dataKey="score" position="top" fill={C.white} fontSize={11}/></Bar>
</BarChart>
</Chart>
<Callout color={C.green}><strong>Positive news:</strong> California climbed <strong>24 spots</strong> to rank 8th nationally in 2025, the biggest improvement of any state. This is a genuine achievement worth acknowledging. However, half of Californians still think education quality has gotten worse, and the gap between wealthy and poor districts remains vast.</Callout>
</Section>

<Section title="The Perception Problem" accent={C.orange}>
<div style={{display:"flex",flexWrap:"wrap",gap:16}}>
{[
{title:"50% Say Major Changes Needed",desc:"Half of adults and 44% of parents think the K-12 system needs major overhaul. This despite improving rankings.",color:C.orange,icon:"\uD83D\uDCCA"},
{title:"Quality Getting Worse?",desc:"50% of adults and 41% of parents think quality has gotten worse in recent years. 75% of Republicans, 35% of Democrats agree.",color:C.coral,icon:"\uD83D\uDCC9"},
{title:"Post-Pandemic Gap",desc:"Test scores show widening gap between high and low-scoring students. COVID learning loss hit disadvantaged students hardest and hasn't fully recovered.",color:C.amber,icon:"\uD83D\uDCF1"},
{title:"Chronic Absenteeism",desc:"Absenteeism skyrocketed post-pandemic, especially among low-income, Black, and Latino students. Funding is tied to attendance, creating a fiscal crisis too.",color:C.purple,icon:"\uD83D\uDEB6"},
].map(function(c,i){return(
<div key={i} style={{flex:"1 1 200px",background:C.bg,borderRadius:8,padding:14,borderTop:"3px solid "+c.color}}>
<div style={{fontSize:22,marginBottom:6}}>{c.icon}</div>
<h4 style={{fontSize:14,color:c.color,marginBottom:6,fontWeight:700}}>{c.title}</h4>
<p style={{fontSize:13,color:"#CBD5E1",lineHeight:1.4}}>{c.desc}</p>
</div>
);})}
</div>
</Section>
</>)}

{tab==="teachers"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="Shortage Areas" value="Severe" sub="SpEd, Math, Science" color={C.coral}/>
<Stat label="Emergency Permits" value="24,548" sub="SpEd in 5 years" color={C.orange}/>
<Stat label="New SpEd Creds" value="17,726" sub="Same 5-year period" color={C.amber}/>
<Stat label="State Investment" value="$1.6B" sub="Recruitment decade" color={C.blue}/>
</div>

<Section title="The Teacher Shortage" subtitle="California's most critical educational challenge" accent={C.coral}>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>The numbers tell the story: over five years, California issued <strong style={{color:C.coral}}>24,548 emergency permits and waivers</strong> for underqualified individuals to fill special education roles, while producing only <strong style={{color:C.green}}>17,726 new special education credentials</strong>. The state is filling positions with unqualified people faster than it can train qualified ones.</p>
<div style={{display:"flex",flexWrap:"wrap",gap:16,marginBottom:14}}>
{[
{title:"Can't Afford to Live Here",desc:"A starting teacher earns ~$55K. Median rent for a 2BR is $2,500/mo. In SF, it's $3,450. Teachers commute 90+ minutes or leave the profession.",color:C.coral},
{title:"High-Need Schools Suffer Most",desc:"Schools with more low-income and English learner students have fewer credentialed teachers, less experienced staff, and higher turnover.",color:C.orange},
{title:"Subject Shortages",desc:"Special education, math, science, and bilingual education face the worst shortages. Declines of 13-25% in new credentials since 2020-21.",color:C.amber},
].map(function(c,i){return(
<div key={i} style={{flex:"1 1 250px",background:C.bg,borderRadius:8,padding:14,borderLeft:"3px solid "+c.color}}>
<h4 style={{fontSize:14,color:c.color,marginBottom:4,fontWeight:700}}>{c.title}</h4>
<p style={{fontSize:13,color:"#CBD5E1",lineHeight:1.4}}>{c.desc}</p>
</div>
);})}
</div>
<Callout color={C.coral}>Nearly all Californians (87%) say teacher shortages are a problem. 48% say teacher salaries vs cost of living is a big problem. <strong>You cannot attract and retain teachers if they can't afford to live where they teach.</strong> The housing crisis is also an education crisis.</Callout>
</div>
</Section>
</>)}

{tab==="uc"&&(<>
<Section title="The UC System: California's Crown Jewel" subtitle="The genuinely world-class part of California education" accent={C.green}>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.green+"55"}}>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:16}}>Credit where it's due. The University of California system is <strong style={{color:C.green}}>the best public university system in the world</strong>:</p>
<div style={{display:"flex",flexWrap:"wrap",gap:16,marginBottom:16}}>
{[
{campus:"UC Berkeley",global:"#4 globally",strengths:"Engineering, CS, business, public policy. $2.5B research expenditure.",color:C.green,icon:"\uD83C\uDF3F"},
{campus:"UCLA",global:"#13 globally",strengths:"Medicine, film, social sciences. Most applied-to university in America.",color:C.blue,icon:"\uD83C\uDF1F"},
{campus:"UCSF",global:"Top 5 medical",strengths:"Medical school, pharmaceutical research. Among the best in the world.",color:C.purple,icon:"\uD83C\uDFE5"},
{campus:"UCSD",global:"#18 globally",strengths:"Biotech, oceanography, engineering. Major research hub. La Jolla campus.",color:C.cyan,icon:"\uD83C\uDF0A"},
{campus:"UC Davis",global:"#35 globally",strengths:"Agriculture, veterinary medicine, environmental science. Growing medical school.",color:C.amber,icon:"\uD83C\uDF3E"},
{campus:"UC Santa Barbara",global:"#43 globally",strengths:"Physics, materials science. Nobel laureates. Beautiful campus.",color:C.teal,icon:"\uD83C\uDFD6\uFE0F"},
].map(function(c,i){return(
<div key={i} style={{flex:"1 1 250px",background:C.bg,borderRadius:8,padding:14,borderLeft:"3px solid "+c.color}}>
<div style={{fontSize:20,marginBottom:4}}>{c.icon}</div>
<h4 style={{fontSize:15,color:c.color,marginBottom:2,fontWeight:700}}>{c.campus}</h4>
<div style={{fontSize:12,color:C.amber,marginBottom:4}}>{c.global}</div>
<p style={{fontSize:13,color:"#CBD5E1",lineHeight:1.4}}>{c.strengths}</p>
</div>
);})}
</div>
<Callout color={C.green}>The UC system is a <strong>genuine California success story</strong>. Six campuses rank in the global top 50. It produces more research output than most countries. It was built by decades of visionary investment in the 1960s Master Plan. The question is whether today's California is still capable of building institutions this good.</Callout>
</div>
</Section>

<Section title="But Even the UC Is Under Pressure" accent={C.orange}>
<Cards items={[
{title:"8% Budget Cuts",desc:"Both UC and CSU face ~8% ongoing general fund cuts in 2025-26. UC President Drake warned of impact on students and services.",color:C.coral,topBorder:true},
{title:"Tuition Pressure",desc:"UC tuition has risen steadily. In-state: ~$14,300/yr. Out-of-state: ~$44,000. Affordability increasingly depends on financial aid.",color:C.orange,topBorder:true},
{title:"Faculty Housing",desc:"UC faculty in the Bay Area and LA can't afford to live near campus. UC Berkeley and UCLA offer faculty housing programs to compete.",color:C.amber,topBorder:true},
{title:"Brain Drain Risk",desc:"Top researchers recruited by well-funded universities in TX, NC, FL offering lower cost of living and competitive salaries.",color:C.purple,topBorder:true},
]}/>
</Section>
</>)}

{tab==="equity"&&(<>
<Section title="Two School Systems in One State" subtitle="The gap between wealthy and poor districts is a chasm" accent={C.coral}>
<div style={{display:"flex",flexWrap:"wrap",gap:16,marginBottom:16}}>
{[
{title:"Palo Alto Unified",spend:"$24,000+/pupil",results:"95%+ college enrollment. AP scores among nation's best. Average teacher salary $115K. Parents fund extras through foundations.",color:C.green,icon:"\uD83C\uDFE0"},
{title:"LA Unified",spend:"$22,000/pupil",results:"60% college enrollment. Large achievement gaps. Teacher shortages. 80% of students qualify for free/reduced lunch.",color:C.amber,icon:"\uD83C\uDFD9\uFE0F"},
{title:"Fresno Unified",spend:"$18,000/pupil",results:"50% college enrollment. Severe teacher shortages. High poverty. Limited enrichment programs. Summer learning loss severe.",color:C.coral,icon:"\uD83C\uDF3E"},
].map(function(c,i){return(
<div key={i} style={{flex:"1 1 250px",background:C.bg,borderRadius:8,padding:16,borderTop:"3px solid "+c.color}}>
<div style={{fontSize:22,marginBottom:6}}>{c.icon}</div>
<h4 style={{fontSize:15,color:c.color,marginBottom:2,fontWeight:700}}>{c.title}</h4>
<div style={{fontSize:13,color:C.amber,marginBottom:6}}>{c.spend}</div>
<p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.5}}>{c.results}</p>
</div>
);})}
</div>
<Callout color={C.coral}>The LCFF (Local Control Funding Formula) was supposed to close these gaps by directing more money to high-need districts. After a decade, <strong>spending gaps have narrowed but outcome gaps remain wide</strong>. Money alone doesn't equalize when Palo Alto parents supplement with $5K+ per child in foundation donations and private tutoring.</Callout>
</Section>
</>)}

{tab==="honest"&&(<>
<Section title="Honest Assessment" subtitle="Education is California's most nuanced story" accent={C.amber}>
<div style={{background:"linear-gradient(135deg, #78350F22, #1E293B)",border:"1px solid "+C.amber+"55",borderRadius:8,padding:24}}>

<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.green}}>What California gets right:</strong></p>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:20}}>
{[
"UC system is genuinely world-class -- best public universities globally",
"K-12 ranking jumped 24 spots to 8th nationally in 2025",
"LCFF directs more funding to high-need students (progressive)",
"Free pre-K expansion underway for all 4-year-olds",
"$1.6B invested in teacher recruitment over the decade",
"Community college system is the largest in the nation (2.1M students)",
].map(function(s,i){return(
<div key={i} style={{flex:"1 1 250px",background:C.bg,borderRadius:6,padding:10,borderLeft:"3px solid "+C.green,fontSize:13,color:"#CBD5E1"}}>{s}</div>
);})}
</div>

<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.coral}}>What California gets wrong:</strong></p>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:20}}>
{[
"Spends above average per pupil but ranks 31st when adjusted for costs",
"Issues more emergency permits than new credentials in special education",
"Teachers can't afford to live where they teach -- housing drives everything",
"Pension costs consume 25% of funding growth before it reaches classrooms",
"Widening gap between high and low-scoring students post-pandemic",
"UC and CSU facing 8% budget cuts despite record state budgets",
].map(function(s,i){return(
<div key={i} style={{flex:"1 1 250px",background:C.bg,borderRadius:6,padding:10,borderLeft:"3px solid "+C.coral,fontSize:13,color:"#CBD5E1"}}>{s}</div>
);})}
</div>

<p style={{fontSize:16,color:"#CBD5E1",lineHeight:1.7,fontStyle:"italic"}}>Education is California's most complex story. It has genuine strengths -- the UC system is extraordinary, K-12 is improving, and the LCFF model is innovative. But the housing crisis undermines everything: you can't recruit teachers who can't afford rent, you can't close achievement gaps when poor communities have the worst schools, and you can't maintain world-class universities while cutting their budgets. <strong style={{color:C.amber}}>Fix housing, and half the education crisis fixes itself.</strong></p>
</div>
</Section>
</>)}

</div>
</>);}
