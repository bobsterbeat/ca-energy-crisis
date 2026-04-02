import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";
const C={coral:"#FF6B6B",amber:"#FBBF24",green:"#34D399",teal:"#2DD4BF",blue:"#60A5FA",purple:"#A78BFA",orange:"#FB923C",cyan:"#22D3EE",white:"#F8FAFC",slate:"#94A3B8",bg:"#0F172A",card:"#1E293B",border:"#334155"};
const Section=({title,subtitle,children,accent=C.blue})=>(<div style={{marginBottom:44}}><h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:24,fontWeight:700,color:C.white,marginBottom:4,borderLeft:"4px solid "+accent,paddingLeft:16}}>{title}</h2>{subtitle&&<p style={{fontSize:15,color:C.slate,marginTop:4,marginBottom:18,paddingLeft:20}}>{subtitle}</p>}{children}</div>);
const Stat=({label,value,sub,color=C.blue})=>(<div style={{background:C.card,border:"1px solid "+C.border,borderRadius:8,padding:"14px 18px",flex:"1 1 140px",minWidth:140}}><div style={{fontSize:11,color:C.slate,textTransform:"uppercase",letterSpacing:1}}>{label}</div><div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:28,fontWeight:700,color,marginTop:4}}>{value}</div>{sub&&<div style={{fontSize:12,color:C.slate,marginTop:2}}>{sub}</div>}</div>);
const Tip=({active,payload,label})=>{if(!active||!payload)return null;return(<div style={{background:"#0F172AEE",border:"1px solid "+C.border,borderRadius:6,padding:"8px 12px",fontSize:12}}><div style={{color:C.white,fontWeight:600,marginBottom:3}}>{label}</div>{payload.map(function(p,i){return <div key={i} style={{color:p.color||p.fill,marginTop:1}}>{p.name}: {typeof p.value==="number"?p.value.toLocaleString():p.value}</div>;})}</div>);};
const Callout=({children,color=C.blue})=>(<div style={{marginTop:14,padding:"14px 18px",background:color+"15",border:"1px solid "+color+"55",borderRadius:6,fontSize:15,color:C.white,lineHeight:1.65}}>{children}</div>);
const Cards=({items})=>(<div style={{display:"flex",flexWrap:"wrap",gap:16}}>{items.map(function(c,i){return(<div key={i} style={{flex:"1 1 200px",background:c.bg||C.card,border:"1px solid "+C.border,borderRadius:8,padding:16,borderLeft:c.border?"3px solid "+c.color:"none",borderTop:c.topBorder?"3px solid "+c.color:"none"}}>{c.icon&&<div style={{fontSize:22,marginBottom:6}}>{c.icon}</div>}<h4 style={{fontSize:15,color:c.color,marginBottom:6,fontWeight:700}}>{c.title}</h4><p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.5}}>{c.desc}</p></div>);})}</div>);

var coverageData=[{name:"Medi-Cal",value:14.5,fill:C.blue},{name:"Employer",value:17,fill:C.amber},{name:"Medicare",value:6.7,fill:C.green},{name:"Covered CA",value:2,fill:C.purple},{name:"Uninsured",value:2.5,fill:C.coral}];
var paymentComp=[{payer:"Private Insurance",rate:250,fill:C.amber},{payer:"Medicare",rate:100,fill:C.green},{payer:"Medi-Cal",rate:70,fill:C.blue},{payer:"Uninsured",rate:30,fill:C.coral}];

var tabs=[{id:"system",label:"The System"},{id:"payments",label:"How Hospitals Get Paid"},{id:"safety",label:"Safety Net"},{id:"crisis",label:"2026 Crisis"},{id:"honest",label:"Honest Assessment"}];

export default function HealthcareFinancing(){
var s=useState("system"),tab=s[0],setTab=s[1];
return(<>
<div style={{background:C.card,borderBottom:"1px solid "+C.border,padding:"0 24px",overflowX:"auto",whiteSpace:"nowrap"}}><div style={{maxWidth:900,margin:"0 auto",display:"flex"}}>{tabs.map(function(t){return(<button key={t.id} onClick={function(){setTab(t.id);}} style={{background:"none",border:"none",borderBottom:tab===t.id?"3px solid "+C.teal:"3px solid transparent",color:tab===t.id?C.white:C.slate,fontSize:14,fontWeight:tab===t.id?700:400,padding:"12px 16px",cursor:"pointer",fontFamily:"'Source Sans 3',sans-serif"}}>{t.label}</button>);})}</div></div>
<div style={{maxWidth:900,margin:"0 auto",padding:"26px 24px"}}>

{tab==="system"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="Medi-Cal" value="14.5M" sub="1 in 3 Californians" color={C.blue}/>
<Stat label="Employer" value="~17M" sub="~44% of population" color={C.amber}/>
<Stat label="Uninsured" value="6.4%" sub="Record low (was 17.2%)" color={C.green}/>
<Stat label="Covered CA" value="~2M" sub="Record enrollment 2025" color={C.purple}/>
</div>

<Section title="If You're Used to the NHS" accent={C.teal}>
<div style={{background:C.bg,borderRadius:8,padding:16,border:"2px dashed "+C.teal+"55"}}>
<p style={{fontSize:15,color:"#CBD5E1",lineHeight:1.7,margin:0}}>In the UK: one system, one payer, free at point of use. In the US: <strong style={{color:C.amber}}>multiple overlapping programs</strong> for different populations, each with different eligibility, funding, payment mechanisms, and benefits. The same hip replacement generates four completely different payments depending on whether the patient has Medicare, Medi-Cal, employer insurance, or nothing.</p>
</div>
</Section>

<Section title="Who Covers Whom" subtitle="California's ~39.5 million residents by coverage source" accent={C.blue}>
<Cards items={[
{title:"Medicare (Federal — 65+/Disabled)",desc:"~6.7M Californians. Funded by payroll taxes + premiums + general revenue. Parts A (hospital), B (physician), C (managed care), D (drugs). Why EMTALA exists — accepting Medicare = must treat all emergencies.",color:C.green,icon:"🏛️"},
{title:"Medi-Cal (State — Low-Income)",desc:"~14.5M enrollees (1 in 3 Californians). Income ≤138% FPL (~$20.8K). Jointly federal/state funded. Pays providers significantly less than Medicare or private — many doctors limit Medi-Cal patients.",color:C.blue,icon:"🏥"},
{title:"Employer Insurance (Private)",desc:"~17M Californians. Employer + employee split premiums. Average family premium ~$25,572/year nationally (2024). Historical accident from WWII wage freezes.",color:C.amber,icon:"🏢"},
{title:"Covered California (ACA Exchange)",desc:"~2M enrollees (record 2025). For people without employer coverage earning too much for Medi-Cal. Enhanced subsidies expired Dec 2025 — premiums roughly doubled for 2026.",color:C.purple,icon:"🛡️"},
{title:"Uninsured / Safety Net",desc:"~2.5M Californians (6.4%). Rely on EMTALA for emergencies, FQHCs for primary care, county programs. Can't access specialists, elective surgery, or consistent chronic care.",color:C.coral,icon:"⚠️"},
]}/>
<Callout color={C.teal}>A person might be on parents' insurance (until 26) → employer insurance → COBRA ($600-2K/mo) → Covered California → new job → employer again → Medicare (65) → Medi-Cal (nursing home). <strong>Each transition = different doctors, networks, formularies, deductibles.</strong> This is why Americans find it bewildering.</Callout>
</Section>
</>)}

{tab==="payments"&&(<>
<Section title="How the Same Procedure Gets Paid" subtitle="Relative payment rates by payer (Medicare = 100% baseline)" accent={C.amber}>
<div style={{background:C.card,borderRadius:8,padding:"18px 10px",border:"1px solid "+C.border}}>
<ResponsiveContainer width="100%" height={250}>
<BarChart data={paymentComp} margin={{left:10,right:30,top:20}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false}/>
<XAxis dataKey="payer" tick={{fill:C.slate,fontSize:11}}/>
<YAxis tick={{fill:C.slate,fontSize:11}} tickFormatter={function(v){return v+"%";}} domain={[0,300]}/>
<Tooltip content={<Tip/>}/>
<Bar dataKey="rate" name="% of Medicare Rate" radius={[4,4,0,0]} barSize={50}>
{paymentComp.map(function(d,i){return <Cell key={i} fill={d.fill}/>;})}</Bar>
</BarChart>
</ResponsiveContainer>
</div>
<Callout color={C.amber}><strong>Private insurance pays 2-3× what Medicare pays</strong> for the same service. Medi-Cal pays ~70% of Medicare. Uninsured patients are billed at chargemaster rates but hospitals collect ~30%. This cross-subsidy is how the entire system works — private insurance profits cover Medi-Cal and uninsured losses.</Callout>
</Section>

<Section title="Payment Mechanisms" accent={C.blue}>
<Cards items={[
{title:"Medicare: DRGs",desc:"Fixed payment per diagnosis regardless of length of stay or resources. Efficient hospital profits; complex case loses money. Predictable but not generous.",color:C.green,icon:"📊"},
{title:"Medi-Cal: Managed Care",desc:"Most patients in managed care plans negotiating rates. Fee-for-service schedule among lowest nationally. Many hospitals lose money on every Medi-Cal patient.",color:C.blue,icon:"📉"},
{title:"Private: Negotiated Rates",desc:"Each insurer negotiates rates with hospital networks. Large systems (Kaiser, Sutter) negotiate from strength. This is where hospitals make their margin.",color:C.amber,icon:"🤝"},
{title:"Uninsured: Good Luck",desc:"Billed at chargemaster (highest rates). Collection rates very low. Hospitals absorb as 'uncompensated care.' Some recovery via DSH payments and Emergency Medi-Cal.",color:C.coral,icon:"💸"},
]}/>
<Callout color={C.coral}><strong>When the payer mix shifts</strong> — more Medi-Cal, fewer privately insured — the cross-subsidy breaks down. California has lost 70+ hospitals since 1995, predominantly in low-income and rural areas where the privately insured population was too small to cover losses.</Callout>
</Section>
</>)}

{tab==="safety"&&(<>
<Section title="The Safety Net" subtitle="What happens when you have no insurance in California" accent={C.coral}>
<Cards items={[
{title:"Layer 1: EMTALA (Emergency Room)",desc:"Federal mandate since 1986: any Medicare-participating hospital must screen + stabilize emergency patients regardless of status or insurance. Obligation ends at stabilization (~2 days). No follow-up required. Largely unfunded.",color:C.coral,icon:"🚑"},
{title:"Layer 2: FQHCs (Primary Care)",desc:"1,300+ community health center sites serving 7.7M patients. Sliding-fee scale. Primary care, limited dental, behavioral health, 340B pharmacy (discounted drugs). Long waits, limited specialists.",color:C.amber,icon:"🏥"},
{title:"Layer 3: County Programs",desc:"My Health LA (free for uninsured LA County residents regardless of status). County public hospitals as providers of last resort (LAC+USC, Harbor-UCLA, Zuckerberg SF General).",color:C.blue,icon:"🏛️"},
]}/>
<Callout color={C.coral}>For uninsured Californians: you can see a doctor at a community clinic (if you can get an appointment), go to the ER for emergencies (and get a big bill), but generally <strong>cannot access specialists, elective surgery, advanced imaging, or consistent chronic disease management</strong>. When something goes wrong, it goes very wrong — because the system is designed around acute intervention, not prevention.</Callout>
</Section>

<Section title="Emergency vs. Full Coverage" subtitle="What each level actually covers" accent={C.amber}>
<div style={{background:C.card,borderRadius:8,padding:16,border:"1px solid "+C.border,fontSize:13,color:"#CBD5E1"}}>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:0,borderBottom:"1px solid "+C.border,padding:"8px 0",fontWeight:700,color:C.white,fontSize:11,textTransform:"uppercase",letterSpacing:1}}>
<div style={{paddingLeft:8}}>Service</div><div style={{textAlign:"center"}}>Full Medi-Cal</div><div style={{textAlign:"center"}}>Emergency Only</div>
</div>
{[["ER visits","✅","✅"],["Primary care","✅","❌"],["Prescriptions","✅","❌"],["Surgery (elective)","✅","❌"],["Mental health","✅","❌"],["Dental","✅ (cut Jul 26)","❌"],["Pregnancy","✅","✅"],["Chronic disease mgmt","✅","❌"],["Preventive/screening","✅","❌"]].map(function(r,i){return(
<div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:0,borderBottom:"1px solid "+C.border+"55",padding:"6px 0"}}>
<div style={{paddingLeft:8}}>{r[0]}</div><div style={{textAlign:"center"}}>{r[1]}</div><div style={{textAlign:"center"}}>{r[2]}</div>
</div>);})}
</div>
<Callout color={C.amber}>After the Jan 2026 enrollment freeze, new undocumented adults get <strong>emergency-only</strong>. No insulin for their diabetes — just emergency care when they crash into DKA. No antihypertensives — just stroke treatment. This costs more in the long run. One argument for expansion was precisely to break this cycle.</Callout>
</Section>
</>)}

{tab==="crisis"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="Could Lose Coverage" value="660K" sub="Covered CA subsidy loss" color={C.coral}/>
<Stat label="Federal Match Cut" value="$658M" sub="H.R. 1 FMAP reduction" color={C.orange}/>
<Stat label="New UIS Enrollment" value="Frozen" sub="Since January 2026" color={C.purple}/>
<Stat label="Premium Increase" value="~97%" sub="Avg for Covered CA enrollees" color={C.amber}/>
</div>
<Section title="Three Simultaneous Shocks" subtitle="2025-26 convergence hitting California's coverage system" accent={C.coral}>
<Cards items={[
{title:"ACA Subsidies Expired (Federal)",desc:"Enhanced premium tax credits expired Dec 31, 2025. Premiums doubled. New enrollment down 32%. 73% switching to high-deductible bronze. 12% cancelling entirely. CA has $190M in state funds — vs $2.5B in lost federal subsidies.",color:C.coral,icon:"📈"},
{title:"H.R. 1 Cuts (Federal)",desc:"FMAP for undocumented emergency services: 90% → 50% (Oct 2026). Hospital payment caps tightened. ~200K lawfully present immigrants lose full-scope Medi-Cal. $1.2B total General Fund hit across outlook.",color:C.orange,icon:"✂️"},
{title:"State Budget Cuts",desc:"$4.7B in Medi-Cal solutions. Enrollment freeze (Jan 2026). Dental eliminated for UIS (Jul 2026). Safety net clinic payments cut ~$1B. $30/month premiums (Jul 2027). ~500K fewer Medi-Cal enrollees projected.",color:C.amber,icon:"📋"},
]}/>
<Callout color={C.coral}>Each shock pushes people into cheaper coverage or out of coverage entirely. <strong>More uninsured = more uncompensated ER care = more hospital financial stress.</strong> Safety-net hospitals in high-immigration areas will be hit hardest — and the state is simultaneously cutting payments to the clinics serving those patients.</Callout>
</Section>
</>)}

{tab==="honest"&&(<>
<Section title="Honest Assessment" subtitle="California's healthcare system is a marvel and a mess" accent={C.amber}>
<div style={{background:"linear-gradient(135deg, #78350F22, #1E293B)",border:"1px solid "+C.amber+"55",borderRadius:8,padding:24}}>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.green}}>What works:</strong></p>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:20}}>
{["Uninsured rate dropped from 17.2% to 6.4% — largest improvement of any state","Medi-Cal covers 14.5M people — the largest state Medicaid program in the US","Covered CA reached record 2M enrollment with strong subsidy support","FQHC network (1,300+ sites) provides essential primary care safety net","Full-scope expansion evidence: primary care access reduces costly ER utilization","County programs (My Health LA) fill gaps other states don't even try to address"].map(function(s,i){return(
<div key={i} style={{flex:"1 1 250px",background:C.bg,borderRadius:6,padding:10,borderLeft:"3px solid "+C.green,fontSize:13,color:"#CBD5E1"}}>{s}</div>);})}
</div>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.coral}}>What's breaking:</strong></p>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:20}}>
{["Medi-Cal expansion costs exceeded projections by 4× — from $2.1B to $8.4B","Cross-subsidy model failing: 70+ hospitals closed since 1995 as payer mix shifts","ACA subsidy expiration will push hundreds of thousands back to uninsured","The enrollment freeze returns new arrivals to the expensive emergency-only model","Medi-Cal reimbursement rates so low many providers refuse patients","No state has attempted what CA did with universal coverage — and the fiscal math doesn't work yet"].map(function(s,i){return(
<div key={i} style={{flex:"1 1 250px",background:C.bg,borderRadius:6,padding:10,borderLeft:"3px solid "+C.coral,fontSize:13,color:"#CBD5E1"}}>{s}</div>);})}
</div>
<p style={{fontSize:16,color:"#CBD5E1",lineHeight:1.7,fontStyle:"italic"}}>California attempted something no other state has: near-universal coverage including undocumented residents. The coverage gains are real — millions have access who didn't before. But the cost estimates were wildly wrong, the federal funding environment has turned hostile, and the state is now cutting the very programs it built. <strong style={{color:C.amber}}>The core tension: California's ambitions outran its fiscal planning. Good intentions don't balance budgets.</strong></p>
</div>
</Section>
</>)}

</div>
</>);}
