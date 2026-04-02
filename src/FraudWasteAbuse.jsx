import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts";
const C={coral:"#FF6B6B",amber:"#FBBF24",green:"#34D399",teal:"#2DD4BF",blue:"#60A5FA",purple:"#A78BFA",orange:"#FB923C",cyan:"#22D3EE",white:"#F8FAFC",slate:"#94A3B8",bg:"#0F172A",card:"#1E293B",border:"#334155"};
const Section=({title,subtitle,children,accent=C.blue})=>(<div style={{marginBottom:44}}><h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:24,fontWeight:700,color:C.white,marginBottom:4,borderLeft:"4px solid "+accent,paddingLeft:16}}>{title}</h2>{subtitle&&<p style={{fontSize:15,color:C.slate,marginTop:4,marginBottom:18,paddingLeft:20}}>{subtitle}</p>}{children}</div>);
const Stat=({label,value,sub,color=C.blue})=>(<div style={{background:C.card,border:"1px solid "+C.border,borderRadius:8,padding:"14px 18px",flex:"1 1 140px",minWidth:140}}><div style={{fontSize:11,color:C.slate,textTransform:"uppercase",letterSpacing:1}}>{label}</div><div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:28,fontWeight:700,color,marginTop:4}}>{value}</div>{sub&&<div style={{fontSize:12,color:C.slate,marginTop:2}}>{sub}</div>}</div>);
const Tip=({active,payload,label})=>{if(!active||!payload)return null;return(<div style={{background:"#0F172AEE",border:"1px solid "+C.border,borderRadius:6,padding:"8px 12px",fontSize:12}}><div style={{color:C.white,fontWeight:600,marginBottom:3}}>{label}</div>{payload.map(function(p,i){return <div key={i} style={{color:p.color||p.fill,marginTop:1}}>{p.name}: {typeof p.value==="number"?p.value.toLocaleString():p.value}</div>;})}</div>);};
const Callout=({children,color=C.blue})=>(<div style={{marginTop:14,padding:"14px 18px",background:color+"15",border:"1px solid "+color+"55",borderRadius:6,fontSize:15,color:C.white,lineHeight:1.65}}>{children}</div>);
const Chart=({children,height=320})=>(<div style={{background:C.card,borderRadius:8,padding:"18px 10px",border:"1px solid "+C.border}}><ResponsiveContainer width="100%" height={height}>{children}</ResponsiveContainer></div>);
const Cards=({items})=>(<div style={{display:"flex",flexWrap:"wrap",gap:16}}>{items.map(function(c,i){return(<div key={i} style={{flex:"1 1 200px",background:c.bg||C.card,border:"1px solid "+C.border,borderRadius:8,padding:16,borderLeft:c.border?"3px solid "+c.color:"none",borderTop:c.topBorder?"3px solid "+c.color:"none"}}>{c.icon&&<div style={{fontSize:22,marginBottom:6}}>{c.icon}</div>}<h4 style={{fontSize:15,color:c.color,marginBottom:6,fontWeight:700}}>{c.title}</h4><p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.5}}>{c.desc}</p></div>);})}</div>);
var Src=function(p){return <a href={p.href} target="_blank" rel="noopener noreferrer" style={{color:C.cyan,fontSize:12,textDecoration:"none"}}>{p.children}</a>;};

var fraudScale=[{program:"EDD (admitted)",amount:20,fill:C.coral},{program:"EDD (improper)",amount:55,fill:C.orange},{program:"Medi-Cal (est.)",amount:146,fill:C.purple},{program:"Hospice (LA est.)",amount:3.5,fill:C.amber}];

var tabs=[{id:"scale",label:"Scale"},{id:"medcal",label:"Medi-Cal & Hospice"},{id:"edd",label:"EDD Fraud"},{id:"other",label:"Other Programs"},{id:"enforcement",label:"Enforcement"},{id:"honest",label:"Honest Assessment"}];

export default function FraudWasteAbuse(){
var s=useState("scale"),tab=s[0],setTab=s[1];
return(<>
<div style={{background:C.card,borderBottom:"1px solid "+C.border,padding:"0 24px",overflowX:"auto",whiteSpace:"nowrap"}}><div style={{maxWidth:900,margin:"0 auto",display:"flex"}}>{tabs.map(function(t){return(<button key={t.id} onClick={function(){setTab(t.id);}} style={{background:"none",border:"none",borderBottom:tab===t.id?"3px solid "+C.coral:"3px solid transparent",color:tab===t.id?C.white:C.slate,fontSize:14,fontWeight:tab===t.id?700:400,padding:"12px 16px",cursor:"pointer",fontFamily:"'Source Sans 3',sans-serif"}}>{t.label}</button>);})}</div></div>
<div style={{maxWidth:900,margin:"0 auto",padding:"26px 24px"}}>

{tab==="scale"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="EDD Fraud" value="$20B+" sub="Admitted pandemic fraud" color={C.coral}/>
<Stat label="EDD Improper" value="$55B" sub="Total improper payments" color={C.orange}/>
<Stat label="Medi-Cal Est." value="$146B" sub="Cumulative since 2019 @ 15%" color={C.purple}/>
<Stat label="Hospice Revoked" value="280+" sub="Licenses in 2 years" color={C.amber}/>
</div>
<Section title="Estimated Fraud by Program" subtitle="Cumulative losses ($B) — various methodologies and sources" accent={C.coral}>
<Chart height={260}>
<BarChart data={fraudScale} margin={{left:10,right:30,top:20}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false}/>
<XAxis dataKey="program" tick={{fill:C.slate,fontSize:10}}/>
<YAxis tick={{fill:C.slate,fontSize:11}} tickFormatter={function(v){return "$"+v+"B";}}/>
<Tooltip content={<Tip/>}/>
<Bar dataKey="amount" name="Est. Loss ($B)" radius={[4,4,0,0]} barSize={50}>
{fraudScale.map(function(d,i){return <Cell key={i} fill={d.fill}/>;})}<LabelList dataKey="amount" position="top" fill={C.white} fontSize={11} formatter={function(v){return "$"+v+"B";}}/></Bar>
</BarChart>
</Chart>
<Callout color={C.coral}>City Journal (April 2026) estimated <strong>$180B total fraud</strong> under Newsom. The $146B Medi-Cal figure uses a conservative 15% rate — anonymous HHS sources suggested 25%, but this is not an official audit. <strong>The EDD numbers are state-acknowledged. The Medi-Cal numbers are extrapolations.</strong> <Src href="https://www.city-journal.org/article/gavin-newsom-california-fraud">Source</Src></Callout>
</Section>
<Section title="Context" accent={C.amber}>
<Cards items={[
{title:"'Improper' ≠ Fraud",desc:"Includes paperwork errors, eligibility mistakes, and overpayments — not just criminal fraud. The 25% HHS figure is an initial anonymous estimate.",color:C.amber,topBorder:true},
{title:"CA Ranks 4th in Recoveries",desc:"4th nationally in Medicaid fraud dollars recovered per enrollee (2024), leading all large states. Enforcement is more active than most.",color:C.green,topBorder:true},
{title:"Political Backdrop",desc:"Congressional probes signed by Republicans only. Newsom is a likely 2028 candidate. Trump admin paused its own hospice oversight program in early 2025.",color:C.slate,topBorder:true},
]}/>
</Section>
</>)}

{tab==="medcal"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:20}}>
<Stat label="LA Billing" value="$3.5B" sub="Suspicious (CMS)" color={C.coral}/>
<Stat label="Provider Growth" value="1,500%" sub="LA hospices since 2010" color={C.orange}/>
<Stat label="One Address" value="89" sub="Companies at Van Nuys bldg" color={C.amber}/>
<Stat label="Avg/Patient" value="$29K" sub="LA vs $13.2K national" color={C.purple}/>
</div>
<Section title="Hospice: Ground Zero" subtitle="LA County is the epicenter — 18% of all US hospice billing from one county" accent={C.coral}>
<Cards items={[
{title:"$16M Sham Hospices",desc:"Four sentenced (2025). Fake hospices using foreign nationals' identities. Lead defendant: 12 years. Medicare paid $16M for nonexistent services.",color:C.coral,icon:"⚖️"},
{title:"Monterey County $3.2M",desc:"Seven arrested Feb 2026 — owners, doctors, nurse. Enrolled non-terminal patients, shuffled between entities to avoid detection.",color:C.orange,icon:"🏥"},
{title:"IEHP $320M Lawsuit",desc:"DOJ: Inland Empire Health Plan retained surplus Medi-Cal expansion funds via sham incentives. IEHP calls suit 'misguided.' State didn't join.",color:C.amber,icon:"📋"},
{title:"CVS $18.2M Settlement",desc:"False certifications for Medi-Cal pharmacy claims 2010-2021. Whistleblower-initiated.",color:C.blue,icon:"💊"},
]}/>
<Callout color={C.amber}><strong>CMS clarified</strong> the $3.5B is total billing, not confirmed fraud. Oz's claim of "Russian, Armenian mafia" is not supported in any published prosecution — the US Attorney's office said it doesn't track defendants by nationality. <Src href="https://kffhealthnews.org/news/article/hospice-fraud-medicaid-mehmet-oz-cms-california/">KFF Health News</Src></Callout>
</Section>
<Section title="Other Medi-Cal Fraud" accent={C.purple}>
<Cards items={[
{title:"IHSS (In-Home Care)",desc:"Billing for unperformed hours, services to ineligible recipients. Schwarzenegger estimated 25% fraud rate in 2009. Top category for national Medicaid fraud convictions.",color:C.purple,topBorder:true},
{title:"Pharmacy & Lab Fraud",desc:"Fraudulent prescriptions, unnecessary tests (post-COVID labs), billing for unprovided medications. Monte Vista Pharmacy case (2025 DOJ charges).",color:C.blue,topBorder:true},
{title:"$297M Recovered",desc:"Central District of CA: $297M in False Claims Act recoveries Jul 2024-Jul 2025. CA led all state AGs with $134.25M in the same period.",color:C.green,topBorder:true},
]}/>
</Section>
</>)}

{tab==="edd"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:20}}>
<Stat label="Admitted Fraud" value="$20B" sub="State acknowledged" color={C.coral}/>
<Stat label="Total Improper" value="$55B" sub="Fraud + errors combined" color={C.orange}/>
<Stat label="Claims Surge" value="2,300%" sub="Pandemic spike" color={C.amber}/>
<Stat label="Recovered" value="$1.1B" sub="Mostly frozen debit cards" color={C.green}/>
</div>
<Section title="The Pandemic Collapse" subtitle="California's most documented government fraud failure" accent={C.orange}>
<p style={{fontSize:15,color:"#CBD5E1",lineHeight:1.7,marginBottom:14}}>COVID hit March 2020. The Newsom administration relaxed verification to expedite payments. The State Auditor found EDD removed identity verification safeguards for five months ($1B in that period). It didn't cross-reference claims against prisoner data ($810M to inmates). At one point, more people were applying for benefits than there were adults in the state. <Src href="https://information.auditor.ca.gov/reports/2020-628.2/summary.html">State Auditor</Src></p>
<Cards items={[
{title:"International Crime Rings",desc:"Romanian fraud ring recruited via Facebook in SoCal parks. Nigerian scammers used bulk emails. Rapper 'Nuke Bizzle' bragged about EDD fraud in a music video, stole $700K.",color:C.coral,topBorder:true},
{title:"Still Broken in 2026",desc:"State Auditor: EDD improper payments still above 10% federal threshold. Fraudulent payments in 2024 exceed pre-pandemic rates. ~$1.5B improper in 2023-24 alone.",color:C.orange,topBorder:true},
{title:"Fiscal Hangover",desc:"CA is the only state that hasn't repaid federal UI loans. Interest: $593M/year → projected $1B. Employer payroll taxes rising ~$500/employee. The debt may never be fully repaid.",color:C.amber,topBorder:true},
]}/>
</Section>
</>)}

{tab==="other"&&(<>
<Section title="Homelessness" accent={C.orange}>
<p style={{fontSize:15,color:"#CBD5E1",lineHeight:1.7,marginBottom:14}}>$24B spent over five years. State Auditor (2024): insufficient data to assess if programs worked. CFO Cody Holmes charged with embezzling $2.2M for exotic cars. Federal task force now targeting California homelessness fraud specifically.</p>
</Section>
<Section title="CalFresh / EBT" accent={C.amber}>
<p style={{fontSize:15,color:"#CBD5E1",lineHeight:1.7,marginBottom:14}}>50+ individuals charged (2024-25) for EBT skimming — many tied to Romanian organized crime. Dept. of Social Services added to high-risk list in 2026. Errors could cost $2.5B/year under new federal cost-sharing rules (H.R. 1).</p>
</Section>
<Section title="Political Corruption" accent={C.coral}>
<p style={{fontSize:15,color:"#CBD5E1",lineHeight:1.7,marginBottom:14}}>Newsom's former chief of staff Dana Williamson charged Nov 2025 with siphoning campaign/COVID recovery funds. Pleaded not guilty. Two connected aides struck plea deals.</p>
<Callout color={C.amber}><strong>Legislative split:</strong> Republican Castillo proposed a Medi-Cal fraud task force. Democrat Smallwood-Cuevas wants to raise the felony welfare fraud threshold from $950 to $25,000.</Callout>
</Section>
</>)}

{tab==="enforcement"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:20}}>
<Stat label="Licenses Revoked" value="280+" sub="Hospice, past 2 years" color={C.green}/>
<Stat label="Under Investigation" value="~300" sub="Additional hospices" color={C.amber}/>
<Stat label="Criminal Defendants" value="284" sub="Under AG Bonta" color={C.blue}/>
<Stat label="FCA Recoveries" value="$297M" sub="Central District, 2024-25" color={C.teal}/>
</div>
<Section title="State Actions" accent={C.green}>
<Cards items={[
{title:"Hospice Moratorium (2021→2027)",desc:"SB 664 banned new licenses. Extended via AB 177. Multi-agency task force: CDPH, DHCS, DSS, DOJ.",color:C.green,icon:"🛑"},
{title:"AG Enforcement",desc:"101 criminal enterprises, 284 defendants, 24 civil cases. Consumer alert on hospice red flags (Aug 2025).",color:C.blue,icon:"⚖️"},
{title:"EDD Task Force",desc:"1,800 cases, 500+ arrests, $1.1B recovered. ID.me claims $125B in prevented fraud attempts.",color:C.teal,icon:"🔍"},
]}/>
</Section>
<Section title="Federal Actions" accent={C.purple}>
<Cards items={[
{title:"CMS Enhanced Oversight",desc:"PPEO for hospices in CA/AZ/NV/TX since 2023. 668 reviewed, 122 revoked. Expanded to GA and OH (Dec 2025).",color:C.purple,icon:"🏛️"},
{title:"Congressional Probe",desc:"House Oversight (March 2026) requested documents from Newsom. Republicans only. Deadline April 6, 2026.",color:C.orange,icon:"📜"},
{title:"Fraud Hotlines",desc:"Medi-Cal: 800-822-6222. Federal: 800-HHS-TIPS. Whistleblower rewards up to 35% federal / 50% state.",color:C.cyan,icon:"📞"},
]}/>
</Section>
</>)}

{tab==="honest"&&(<>
<Section title="Honest Assessment" subtitle="Fraud is real — but so is the political inflation of the numbers" accent={C.amber}>
<div style={{background:"linear-gradient(135deg, #78350F22, #1E293B)",border:"1px solid "+C.amber+"55",borderRadius:8,padding:24}}>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.green}}>What's documented:</strong></p>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:20}}>
{["EDD paid $20B+ in fraudulent claims — state admitted","$55B in improper EDD payments — state acknowledged","280+ hospice licenses revoked, 284 criminal defendants","$297M FCA recoveries from Central District CA (2024-25)","State Auditor: EDD and CDSS both designated high-risk","1,500% hospice provider growth in LA County since 2010"].map(function(s,i){return(
<div key={i} style={{flex:"1 1 250px",background:C.bg,borderRadius:6,padding:10,borderLeft:"3px solid "+C.green,fontSize:13,color:"#CBD5E1"}}>{s}</div>);})}
</div>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.coral}}>What's estimated or contested:</strong></p>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:20}}>
{["25% Medi-Cal fraud rate from anonymous HHS sources — not official","$180B aggregate mixes confirmed fraud with extrapolated estimates","$3.5B LA hospice figure is total billing, not confirmed fraud","Organized crime claims unsupported in court filings","Congressional investigations are exclusively Republican-led","California leads all large states in fraud recoveries per enrollee"].map(function(s,i){return(
<div key={i} style={{flex:"1 1 250px",background:C.bg,borderRadius:6,padding:10,borderLeft:"3px solid "+C.coral,fontSize:13,color:"#CBD5E1"}}>{s}</div>);})}
</div>
<p style={{fontSize:16,color:"#CBD5E1",lineHeight:1.7,fontStyle:"italic"}}>California has both a genuine fraud problem and a genuine enforcement record. The EDD failure is indefensible. Hospice fraud in LA is real. But the $180B headline mixes hard facts with aggressive extrapolation. <strong style={{color:C.amber}}>The truth is bad enough without inflation. Suspended oversight during rapid expansion is the real story — not organized crime conspiracies.</strong></p>
</div>
</Section>
</>)}

</div>
</>);}
