import { useState } from "react";
const C={coral:"#FF6B6B",amber:"#FBBF24",green:"#34D399",teal:"#2DD4BF",blue:"#60A5FA",purple:"#A78BFA",orange:"#FB923C",cyan:"#22D3EE",white:"#F8FAFC",slate:"#94A3B8",bg:"#0F172A",card:"#1E293B",border:"#334155"};
const Section=({title,subtitle,children,accent=C.amber})=>(<div style={{marginBottom:44}}><h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:24,fontWeight:700,color:C.white,marginBottom:4,borderLeft:"4px solid "+accent,paddingLeft:16}}>{title}</h2>{subtitle&&<p style={{fontSize:15,color:C.slate,marginTop:4,marginBottom:18,paddingLeft:20}}>{subtitle}</p>}{children}</div>);
const Stat=({label,value,sub,color=C.amber})=>(<div style={{background:C.card,border:"1px solid "+C.border,borderRadius:8,padding:"14px 18px",flex:"1 1 140px",minWidth:140}}><div style={{fontSize:11,color:C.slate,textTransform:"uppercase",letterSpacing:1}}>{label}</div><div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:28,fontWeight:700,color,marginTop:4}}>{value}</div>{sub&&<div style={{fontSize:12,color:C.slate,marginTop:2}}>{sub}</div>}</div>);
const Callout=({children,color=C.amber})=>(<div style={{marginTop:14,padding:"14px 18px",background:color+"15",border:"1px solid "+color+"55",borderRadius:6,fontSize:15,color:C.white,lineHeight:1.65}}>{children}</div>);
const Cards=({items})=>(<div style={{display:"flex",flexWrap:"wrap",gap:16}}>{items.map(function(c,i){return(<div key={i} style={{flex:"1 1 200px",background:c.bg||C.card,border:"1px solid "+C.border,borderRadius:8,padding:16,borderLeft:c.border?"3px solid "+c.color:"none",borderTop:c.topBorder?"3px solid "+c.color:"none"}}>{c.icon&&<div style={{fontSize:22,marginBottom:6}}>{c.icon}</div>}<h4 style={{fontSize:15,color:c.color,marginBottom:6,fontWeight:700}}>{c.title}</h4><p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.5}}>{c.desc}</p></div>);})}</div>);

var tabs=[{id:"what",label:"What Is CEQA?"},{id:"weapon",label:"Weaponization"},{id:"cost",label:"The Cost"},{id:"touches",label:"Touches Everything"},{id:"reform",label:"2025 Reform"},{id:"honest",label:"Honest Take"}];

export default function CEQA(){
var s=useState("what"),tab=s[0],setTab=s[1];
return(<>
<div style={{background:C.card,borderBottom:"1px solid "+C.border,padding:"0 24px",overflowX:"auto",whiteSpace:"nowrap"}}><div style={{maxWidth:900,margin:"0 auto",display:"flex"}}>{tabs.map(function(t){return(<button key={t.id} onClick={function(){setTab(t.id);}} style={{background:"none",border:"none",borderBottom:tab===t.id?"3px solid "+C.amber:"3px solid transparent",color:tab===t.id?C.white:C.slate,fontSize:14,fontWeight:tab===t.id?700:400,padding:"12px 16px",cursor:"pointer",fontFamily:"'Source Sans 3',sans-serif"}}>{t.label}</button>);})}</div></div>
<div style={{maxWidth:900,margin:"0 auto",padding:"26px 24px"}}>

{tab==="what"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="Signed" value="1970" sub="By Gov. Ronald Reagan" color={C.green}/>
<Stat label="Intent" value="Protect" sub="The environment" color={C.teal}/>
<Stat label="Reality" value="Weapon" sub="To block anything" color={C.coral}/>
<Stat label="Reform" value="2025" sub="Biggest in 55 years" color={C.amber}/>
</div>

<Section title="What Is CEQA?" subtitle="The California Environmental Quality Act, signed by Ronald Reagan in 1970">
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.green}}>The original intent was noble:</strong> before any significant project is built in California, study its environmental impact. Identify harms. Mitigate them. Give the public a voice. Protect air, water, wildlife, and communities.</p>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.coral}}>What it became:</strong> a tool that allows <em>anyone</em> to sue to block <em>any</em> project by arguing the environmental study wasn't thorough enough. NIMBYs use it to block housing. Business competitors use it to delay rivals. Labor unions use it to force project labor agreements. Environmental groups use it to stop infrastructure.</p>
<p style={{fontSize:16,color:"#CBD5E1",lineHeight:1.7,fontStyle:"italic"}}>Every governor since Reagan has attempted CEQA reform. Every attempt failed until 2025. For 55 years, this single law has been the hidden engine behind California's inability to build.</p>
</div>
</Section>

<Section title="How CEQA Works" accent={C.blue}>
<div style={{background:C.card,borderRadius:8,border:"1px solid "+C.border,overflow:"hidden"}}>
{[
{step:"1. Project Proposed",desc:"Developer, government agency, or utility proposes building something -- housing, road, solar farm, water plant, anything.",color:C.blue},
{step:"2. Environmental Review Required",desc:"Lead agency must study environmental impacts. Can take 1-5+ years depending on complexity and challenges.",color:C.teal},
{step:"3. Draft EIR Published",desc:"Environmental Impact Report published for public comment. Often hundreds of pages. Consultants cost $500K-$2M+.",color:C.amber},
{step:"4. Anyone Can Challenge",desc:"Any individual or group can sue claiming the EIR is inadequate. No standing requirement. No cost to file challenge.",color:C.coral},
{step:"5. Court Can Halt Project",desc:"Judge can issue injunction stopping all work while case is decided. Litigation takes 1-3 years. Project bleeds money.",color:C.coral},
{step:"6. Start Over or Settle",desc:"Even if you win in court, the delay killed the economics. Many projects are abandoned or settled with concessions.",color:C.orange},
].map(function(s,i){return(
<div key={i} style={{display:"flex",gap:14,padding:"14px 20px",borderBottom:i<5?"1px solid "+C.border:"none"}}>
<div style={{width:28,height:28,borderRadius:"50%",background:s.color+"30",border:"2px solid "+s.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:s.color,flexShrink:0}}>{i+1}</div>
<div><div style={{fontSize:15,fontWeight:700,color:s.color,marginBottom:2}}>{s.step.split(". ")[1]}</div><p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.4}}>{s.desc}</p></div>
</div>
);})}
</div>
</Section>
</>)}

{tab==="weapon"&&(<>
<Section title="How CEQA Gets Weaponized" subtitle="The law's biggest vulnerability: anyone can sue, for any reason, with no standing requirement">
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
{[
{who:"NIMBY Homeowners",why:"Block apartment buildings near their homes. 'Environmental concerns' mask property value protection.",example:"SF homeowner sued to block 63-unit project, citing shadow impact on a community garden.",color:C.coral,icon:"\uD83C\uDFE0"},
{who:"Business Competitors",why:"Delay a rival's project to protect market position. File CEQA challenge, tie them up for years.",example:"Walmart competitors used CEQA to block new stores. Auto dealers challenged EV charging stations.",color:C.orange,icon:"\uD83C\uDFE2"},
{who:"Labor Unions",why:"Force developers to sign project labor agreements by threatening CEQA litigation if they don't.",example:"Construction unions filed CEQA challenges against non-union projects, dropped suits after union deals were signed.",color:C.amber,icon:"\uD83D\uDC77"},
{who:"Activist Groups",why:"Legitimate environmental concerns, but also used to block projects that would actually help the environment.",example:"Environmental groups sued to block solar farms, wind turbines, and a desalination plant (Huntington Beach).",color:C.purple,icon:"\uD83C\uDF3F"},
{who:"Local Governments",why:"Cities use CEQA to resist state housing mandates. Study requirements become delay tactics.",example:"Cities require CEQA review for projects the state has already approved, adding years to state-mandated housing.",color:C.blue,icon:"\uD83C\uDFDB\uFE0F"},
].map(function(item,i){return(
<div key={i} style={{display:"flex",gap:14,padding:"16px 0",borderBottom:i<4?"1px solid "+C.border:"none",alignItems:"flex-start"}}>
<div style={{fontSize:24,flexShrink:0,width:36,textAlign:"center"}}>{item.icon}</div>
<div style={{flex:1}}>
<div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:4}}>
<span style={{fontWeight:700,fontSize:15,color:item.color}}>{item.who}</span>
</div>
<p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.4,marginBottom:4}}><strong>Why:</strong> {item.why}</p>
<p style={{fontSize:13,color:C.slate,lineHeight:1.4,fontStyle:"italic"}}>{item.example}</p>
</div>
</div>
);})}
</div>
<Callout color={C.coral}>The "fair argument" standard means that if <strong>anyone</strong> presents a <strong>fair argument</strong> that a project <em>might</em> have a significant environmental effect, a full EIR is required. The bar for triggering a multi-year, million-dollar review is extraordinarily low. And there's no penalty for filing frivolous challenges.</Callout>
</Section>
</>)}

{tab==="cost"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="EIR Cost" value="$500K-$2M+" sub="Per project" color={C.coral}/>
<Stat label="Timeline" value="2-5 yrs" sub="For review + litigation" color={C.orange}/>
<Stat label="Cost Increase" value="30-50%" sub="Construction premium" color={C.amber}/>
<Stat label="Projects Killed" value="Unknown" sub="No one tracks this" color={C.slate}/>
</div>

<Section title="The Cost of CEQA" subtitle="How environmental review inflates every project in California">
<div style={{display:"flex",flexWrap:"wrap",gap:16}}>
{[
{title:"Direct EIR Costs",desc:"Environmental consultants charge $500K-$2M+ for a full EIR. Complex projects can exceed $5M. These costs are passed to consumers through higher housing prices, utility rates, and taxes.",color:C.coral,topBorder:true},
{title:"Time = Money",desc:"2-5 years of environmental review and potential litigation. During this time, land costs rise, materials inflate, interest accrues, and market conditions change. Delay alone can double project costs.",color:C.orange,topBorder:true},
{title:"Legal Costs",desc:"Defending a CEQA challenge costs $500K-$2M+ in legal fees, even if you win. Many developers settle or abandon rather than fight. The threat alone is a deterrent.",color:C.amber,topBorder:true},
{title:"Opportunity Cost",desc:"Projects that never get proposed because developers know CEQA will make them uneconomic. This invisible cost -- the housing not built, the infrastructure not repaired -- is incalculable.",color:C.purple,topBorder:true},
].map(function(c,i){return(
<div key={i} style={{flex:"1 1 200px",background:C.bg,borderRadius:8,padding:14,borderTop:"3px solid "+c.color}}>
<h4 style={{fontSize:14,color:c.color,marginBottom:6,fontWeight:700}}>{c.title}</h4>
<p style={{fontSize:13,color:"#CBD5E1",lineHeight:1.5}}>{c.desc}</p>
</div>
);})}
</div>
<Callout color={C.coral}>No one knows the total cost of CEQA because <strong>no one tracks it</strong>. The direct costs (EIR preparation, legal fees) are measurable. The indirect costs (delay, inflation, abandoned projects) are enormous but invisible. The opportunity costs (projects never proposed) are incalculable. California's construction costs are 30-50% above national average, and CEQA is the single largest contributor.</Callout>
</Section>
</>)}

{tab==="touches"&&(<>
<Section title="CEQA Touches Every Crisis on This Site" subtitle="One law, connected to every failure">
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
{[
{crisis:"Housing",link:"NIMBYs weaponize CEQA to block apartment buildings. Shadow studies, traffic studies, noise studies -- each a potential lawsuit. 3 million unit shortage is partly a CEQA shortage.",color:C.coral,icon:"\uD83C\uDFE0"},
{crisis:"High-Speed Rail",link:"Environmental review for HSR took years and cost hundreds of millions. Every segment faces CEQA challenges. Contributed to the $33B to $126B cost explosion.",color:C.orange,icon:"\uD83D\uDE84"},
{crisis:"Water Infrastructure",link:"New reservoirs, desalination plants, and dam repairs all face CEQA review. Huntington Beach desal plant killed partly by Coastal Commission using environmental analysis. Oroville dam repairs delayed.",color:C.amber,icon:"\uD83D\uDCA7"},
{crisis:"Energy Grid",link:"Solar farms, wind projects, transmission lines, and grid hardening all require EIRs. Even renewable energy projects get challenged by environmental groups under CEQA.",color:C.purple,icon:"\u26A1"},
{crisis:"Roads & Bridges",link:"Highway widening, bridge replacement, and road repair projects face CEQA review. Transportation funding gap of $216B partly reflects the cost premium CEQA adds.",color:C.blue,icon:"\uD83D\uDEE3\uFE0F"},
{crisis:"Business Climate",link:"CEQA compliance adds months and millions to any commercial project. Businesses cite it as a top reason for leaving California. Impossible to calculate total economic cost.",color:C.teal,icon:"\uD83C\uDFE2"},
{crisis:"Insurance",link:"Building in fire-safe locations requires construction, which requires CEQA review. Fire-hardening projects face environmental review. Even wildfire mitigation gets CEQA'd.",color:C.orange,icon:"\uD83D\uDD25"},
{crisis:"Homelessness",link:"Emergency shelters, navigation centers, and supportive housing face CEQA challenges from neighbors. One Palo Alto shelter was delayed 2 years by CEQA litigation.",color:C.coral,icon:"\uD83D\uDECC"},
].map(function(item,i){return(
<div key={i} style={{display:"flex",gap:12,padding:"14px 0",borderBottom:i<7?"1px solid "+C.border:"none"}}>
<div style={{fontSize:22,flexShrink:0,width:36,textAlign:"center"}}>{item.icon}</div>
<div style={{flex:1}}>
<span style={{fontWeight:700,fontSize:15,color:item.color}}>{item.crisis}: </span>
<span style={{fontSize:14,color:"#CBD5E1",lineHeight:1.5}}>{item.link}</span>
</div>
</div>
);})}
</div>
<Callout color={C.amber}>CEQA is the <strong>invisible thread</strong> connecting California's housing crisis, infrastructure decay, energy costs, water shortages, and business exodus. It is arguably the single most consequential law in the state -- and until 2025, it had barely been reformed since 1970.</Callout>
</Section>
</>)}

{tab==="reform"&&(<>
<Section title="The 2025 Reform: 55 Years in the Making" subtitle="Governor Newsom called it 'the most consequential housing reform in modern California history'" accent={C.green}>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.green+"55"}}>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>On June 30, 2025, Newsom signed <strong style={{color:C.green}}>AB 130 and SB 131</strong> -- the biggest CEQA overhaul in 55 years. Every governor since Reagan had tried. All failed until now.</p>
<div style={{display:"flex",flexWrap:"wrap",gap:16,marginBottom:16}}>
{[
{title:"Infill Housing Exempt",desc:"Most urban apartment buildings can now bypass CEQA entirely. No EIR required for qualifying projects on already-zoned land.",color:C.green},
{title:"10 New Exemptions",desc:"Childcare centers, health clinics, broadband, food banks, wildfire mitigation, clean water systems, farmworker housing -- all exempted.",color:C.teal},
{title:"Shorter Timelines",desc:"30-60 day approval deadlines for smaller projects. Projects deemed approved if agencies miss deadlines.",color:C.blue},
{title:"Narrowed Litigation",desc:"If a project misses an exemption by one condition, CEQA review limited to that single condition only.",color:C.amber},
].map(function(c,i){return(
<div key={i} style={{flex:"1 1 200px",background:C.bg,borderRadius:8,padding:14,borderLeft:"3px solid "+c.color}}>
<h4 style={{fontSize:14,color:c.color,marginBottom:4,fontWeight:700}}>{c.title}</h4>
<p style={{fontSize:13,color:"#CBD5E1",lineHeight:1.4}}>{c.desc}</p>
</div>
);})}
</div>
<Callout color={C.green}>This is real progress. For the first time, most urban housing can be built without environmental litigation risk. But the reform only applies to housing and specific project types. <strong>Roads, bridges, water plants, energy infrastructure, and commercial buildings</strong> still face full CEQA review. The "Lord's work" (as Jerry Brown called comprehensive reform) remains unfinished.</Callout>
</div>
</Section>

<Section title="What's Next: BACA Ballot Initiative (2026)" accent={C.amber}>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>The California Chamber of Commerce has proposed the <strong style={{color:C.amber}}>Build Affordably in California Act (BACA)</strong> for the 2026 ballot. It would extend CEQA streamlining to "essential projects" beyond housing: water systems, clean energy, and other infrastructure.</p>
<div style={{display:"flex",flexWrap:"wrap",gap:16}}>
{[
{title:"Supporters Say",desc:"Broken permitting makes everything expensive. One-year EIR cap for essential projects. California needs to build again.",color:C.green},
{title:"Opponents Say",desc:"Gutting alternatives analysis removes protection from high-risk locations. Freezes environmental standards. Too broad.",color:C.coral},
].map(function(c,i){return(
<div key={i} style={{flex:"1 1 300px",background:C.bg,borderRadius:8,padding:14,borderTop:"3px solid "+c.color}}>
<h4 style={{fontSize:14,color:c.color,marginBottom:4,fontWeight:700}}>{c.title}</h4>
<p style={{fontSize:13,color:"#CBD5E1",lineHeight:1.4}}>{c.desc}</p>
</div>
);})}
</div>
</div>
</Section>
</>)}

{tab==="honest"&&(<>
<Section title="The Honest Take on CEQA" accent={C.amber}>
<div style={{background:"linear-gradient(135deg, #78350F22, #1E293B)",border:"1px solid "+C.amber+"55",borderRadius:8,padding:24}}>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.green}}>CEQA has done real good:</strong></p>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:20}}>
{[
"Prevented genuinely harmful projects from destroying ecosystems",
"Gave communities a voice against industrial pollution in their neighborhoods",
"Protected endangered species, wetlands, and air quality for 55 years",
"Environmental justice communities have used it to fight toxic facilities",
"Forced developers to consider environmental impacts they would have ignored",
].map(function(s,i){return(
<div key={i} style={{flex:"1 1 250px",background:C.bg,borderRadius:6,padding:10,borderLeft:"3px solid "+C.green,fontSize:13,color:"#CBD5E1"}}>{s}</div>
);})}
</div>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.coral}}>But it has also caused enormous harm:</strong></p>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:20}}>
{[
"Made California the most expensive place to build anything in America",
"Added 2-5 years and 30-50% cost premiums to every major project",
"Been weaponized by NIMBYs, competitors, and unions for non-environmental purposes",
"Blocked housing, renewable energy, water infrastructure, and transit projects",
"No penalty for frivolous challenges -- asymmetric warfare against builders",
].map(function(s,i){return(
<div key={i} style={{flex:"1 1 250px",background:C.bg,borderRadius:6,padding:10,borderLeft:"3px solid "+C.coral,fontSize:13,color:"#CBD5E1"}}>{s}</div>
);})}
</div>
<p style={{fontSize:16,color:"#CBD5E1",lineHeight:1.7,fontStyle:"italic"}}>CEQA is not evil. Environmental review is necessary and good. But California's version has become a process so slow, expensive, and easily abused that it <strong style={{color:C.amber}}>prevents the state from solving its own crises</strong>. You cannot fix a housing shortage if building takes 5 years. You cannot fix a water crisis if desalination plants get killed. You cannot fix infrastructure if every road repair needs a 500-page study. The 2025 reform is a start. But until CEQA is reformed for <em>all</em> essential projects -- not just housing -- California will remain the state that can't build.</p>
</div>
</Section>
</>)}

</div>
</>);}
