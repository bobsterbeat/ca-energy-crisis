const C={coral:"#FF6B6B",amber:"#FBBF24",green:"#34D399",teal:"#2DD4BF",blue:"#60A5FA",purple:"#A78BFA",orange:"#FB923C",cyan:"#22D3EE",white:"#F8FAFC",slate:"#94A3B8",bg:"#0F172A",card:"#1E293B",border:"#334155"};

var sections=[
{cat:"Energy & Resources",items:[
{id:"gas",icon:"\u26FD",title:"Gasoline",stat:"$5.90/gal",accent:C.coral,desc:"Refinery closures, boutique fuel mandates, and the Jones Act."},
{id:"elec",icon:"\u26A1",title:"Electricity",stat:"33.8\u00A2/kWh",accent:C.amber,desc:"Double the price, half the usage. Wildfire costs dominate."},
{id:"water",icon:"\uD83D\uDCA7",title:"Water",stat:"80/20 split",accent:C.blue,desc:"80% to agriculture. Desal rejected. Drought overstated."},
{id:"globe",icon:"\uD83C\uDF0D",title:"Supply Routes",stat:"12,300 nm",accent:C.cyan,desc:"3D globe showing the absurd journey of CA gasoline."},
]},
{cat:"Cost & Economy",items:[
{id:"col",icon:"\uD83D\uDCB0",title:"Cost of Living",stat:"+42% premium",accent:C.amber,desc:"Highest taxes, gas, utilities, and groceries on the mainland."},
{id:"housing",icon:"\uD83C\uDFE0",title:"Housing",stat:"$905K median",accent:C.purple,desc:"82% priced out. 3M unit shortage. 25 years to save."},
{id:"insurance",icon:"\uD83D\uDD25",title:"Insurance",stat:"7 insurers left",accent:C.orange,desc:"Wildfires + Prop 103 = insurer exodus. FAIR Plan overwhelmed."},
{id:"biz",icon:"\uD83C\uDFE2",title:"Business Climate",stat:"49th ranked",accent:C.orange,desc:"Worst tax climate. Highest regulation. 5th largest economy."},
]},
{cat:"Social & Infrastructure",items:[
{id:"homeless",icon:"\uD83D\uDECC",title:"Homelessness",stat:"183,000 people",accent:C.coral,desc:"$24B spent. Numbers went up. 7 die daily in LA County."},
{id:"rail",icon:"\uD83D\uDE84",title:"High-Speed Rail",stat:"$126B, 0 riders",accent:C.orange,desc:"18 years, $18B spent. Zero passengers. Zero track laid."},
{id:"edu",icon:"\uD83C\uDF93",title:"Education",stat:"16th spending",accent:C.blue,desc:"Spending more per pupil but 31st adjusted. UC system is world-class."},
{id:"crime",icon:"\uD83D\uDEA8",title:"Crime",stat:"Record lows*",accent:C.purple,desc:"Data says safer. Experience says worse. Accountability collapsed."},
{id:"infra",icon:"\uD83D\uDEA7",title:"Infrastructure",stat:"Grade C-",accent:C.orange,desc:"$216B funding gap. 30% of roads poor. 65% of bridges past design life."},
]},
{cat:"Migration",items:[
{id:"exodus",icon:"\uD83D\uDCE6",title:"The Exodus",stat:"-367K (2021)",accent:C.coral,desc:"1.7M residents gone. Companies, tax revenue, talent leaving."},
]}
];

export default function Landing({onNavigate}){
return(
<div style={{maxWidth:900,margin:"0 auto",padding:"40px 24px"}}>
<div style={{textAlign:"center",marginBottom:40}}>
<div style={{fontSize:12,color:C.amber,textTransform:"uppercase",letterSpacing:4,marginBottom:12,fontWeight:600}}>Interactive Policy Analysis \u2014 March 2026</div>
<h1 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:38,fontWeight:900,color:C.white,lineHeight:1.1,marginBottom:16}}>California:<br/>A State of Crisis?</h1>
<p style={{fontSize:17,color:"#CBD5E1",maxWidth:620,margin:"0 auto",lineHeight:1.6}}>15 interactive dashboards examining California's most pressing policy failures \u2014 and the pattern that connects them all. Data-driven. Source-cited. Balanced where possible. Blunt where necessary.</p>
</div>

{sections.map(function(sec,si){return(
<div key={si} style={{marginBottom:32}}>
<h2 style={{fontSize:14,color:C.amber,textTransform:"uppercase",letterSpacing:3,marginBottom:14,fontWeight:600,paddingLeft:4}}>{sec.cat}</h2>
<div style={{display:"flex",flexWrap:"wrap",gap:14}}>
{sec.items.map(function(s){return(
<div key={s.id} onClick={function(){onNavigate(s.id);}} style={{flex:"1 1 200px",background:C.card,border:"1px solid "+C.border,borderRadius:10,padding:"18px 16px",cursor:"pointer",borderTop:"3px solid "+s.accent,transition:"transform 0.15s",position:"relative"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
<div style={{fontSize:28}}>{s.icon}</div>
<div style={{fontSize:12,color:s.accent,background:s.accent+"18",padding:"2px 8px",borderRadius:4,fontWeight:700}}>{s.stat}</div>
</div>
<h3 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:18,color:C.white,marginBottom:6}}>{s.title}</h3>
<p style={{fontSize:13,color:"#94A3B8",lineHeight:1.5}}>{s.desc}</p>
<div style={{marginTop:10,fontSize:13,color:s.accent,fontWeight:600}}>Explore \u2192</div>
</div>
);})}
</div>
</div>
);})}

<div style={{background:C.card,borderRadius:10,padding:24,border:"1px solid "+C.purple+"55",marginTop:20}}>
<h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:22,color:C.purple,marginBottom:12}}>The Pattern</h2>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>Across gasoline, electricity, water, housing, insurance, and business \u2014 the same playbook repeats:</p>
<div style={{display:"flex",flexWrap:"wrap",gap:10}}>
{[
{step:"1. Regulate heavily",color:C.coral},
{step:"2. Drive out supply",color:C.orange},
{step:"3. Become dependent",color:C.amber},
{step:"4. Pay the highest prices",color:C.green},
{step:"5. Claim victory",color:C.blue},
{step:"6. Burden the vulnerable",color:C.purple},
].map(function(s,i){return(
<div key={i} style={{flex:"1 1 140px",background:C.bg,borderRadius:6,padding:"10px 12px",borderLeft:"3px solid "+s.color,fontSize:13,color:C.white,fontWeight:600}}>{s.step}</div>
);})}
</div>
<p style={{fontSize:14,color:"#94A3B8",lineHeight:1.5,marginTop:14,fontStyle:"italic"}}>California's crises are not random. They are the predictable result of a governance model that prioritizes regulation over outcomes, incumbents over consumers, and coastal interests over inland communities.</p>
</div>

<div style={{marginTop:30,padding:"16px 0",borderTop:"1px solid "+C.border,fontSize:12,color:C.slate,lineHeight:1.6}}>
<strong style={{color:C.white}}>Sources:</strong> EIA, CAISO, CA Energy Commission, CPUC, Legislative Analyst's Office, HUD, Census Bureau, Tax Foundation, PPIC, NRC, AAA, CalMatters, Stanford/MIT, NASA (GRACE), CA Dept of Insurance, CA State Auditor, Hoover Institution, UC Davis. All data March 2026 or most recent available.
</div>
</div>
);}
