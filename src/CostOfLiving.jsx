import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts";
const C={coral:"#FF6B6B",amber:"#FBBF24",green:"#34D399",teal:"#2DD4BF",blue:"#60A5FA",purple:"#A78BFA",orange:"#FB923C",cyan:"#22D3EE",white:"#F8FAFC",slate:"#94A3B8",bg:"#0F172A",card:"#1E293B",border:"#334155"};
const Section=({title,subtitle,children,accent=C.amber})=>(<div style={{marginBottom:44}}><h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:24,fontWeight:700,color:C.white,marginBottom:4,borderLeft:"4px solid "+accent,paddingLeft:16}}>{title}</h2>{subtitle&&<p style={{fontSize:15,color:C.slate,marginTop:4,marginBottom:18,paddingLeft:20}}>{subtitle}</p>}{children}</div>);
const Stat=({label,value,sub,color=C.amber})=>(<div style={{background:C.card,border:"1px solid "+C.border,borderRadius:8,padding:"14px 18px",flex:"1 1 140px",minWidth:140}}><div style={{fontSize:11,color:C.slate,textTransform:"uppercase",letterSpacing:1}}>{label}</div><div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:28,fontWeight:700,color,marginTop:4}}>{value}</div>{sub&&<div style={{fontSize:12,color:C.slate,marginTop:2}}>{sub}</div>}</div>);
const Tip=({active,payload,label})=>{if(!active||!payload)return null;return(<div style={{background:"#0F172AEE",border:"1px solid "+C.border,borderRadius:6,padding:"8px 12px",fontSize:12}}><div style={{color:C.white,fontWeight:600,marginBottom:3}}>{label}</div>{payload.map(function(p,i){return <div key={i} style={{color:p.color||p.fill,marginTop:1}}>{p.name}: {typeof p.value==="number"?p.value.toLocaleString():p.value}</div>;})}</div>);};
const Callout=({children,color=C.amber})=>(<div style={{marginTop:14,padding:"14px 18px",background:color+"15",border:"1px solid "+color+"55",borderRadius:6,fontSize:15,color:C.white,lineHeight:1.65}}>{children}</div>);
const Chart=({children,height=320})=>(<div style={{background:C.card,borderRadius:8,padding:"18px 10px",border:"1px solid "+C.border}}><ResponsiveContainer width="100%" height={height}>{children}</ResponsiveContainer></div>);
const Cards=({items})=>(<div style={{display:"flex",flexWrap:"wrap",gap:16}}>{items.map(function(c,i){return(<div key={i} style={{flex:"1 1 200px",background:c.bg||C.card,border:"1px solid "+C.border,borderRadius:8,padding:16,borderLeft:c.border?"3px solid "+c.color:"none",borderTop:c.topBorder?"3px solid "+c.color:"none"}}>{c.icon&&<div style={{fontSize:22,marginBottom:6}}>{c.icon}</div>}<h4 style={{fontSize:15,color:c.color,marginBottom:6,fontWeight:700}}>{c.title}</h4><p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.5}}>{c.desc}</p></div>);})}</div>);

var colIndex=[{state:"Hawaii",index:186,fill:C.coral},{state:"Massachusetts",index:150,fill:C.orange},{state:"California",index:142,fill:C.coral},{state:"New York",index:139,fill:C.orange},{state:"US Average",index:100,fill:C.blue},{state:"Texas",index:92,fill:C.green},{state:"Ohio",index:88,fill:C.green},{state:"Mississippi",index:84,fill:C.teal}];
var taxRates=[{state:"California",rate:13.3,fill:C.coral},{state:"New York",rate:10.9,fill:C.orange},{state:"New Jersey",rate:10.75,fill:C.orange},{state:"Oregon",rate:9.9,fill:C.amber},{state:"Minnesota",rate:9.85,fill:C.amber},{state:"Texas",rate:0,fill:C.green},{state:"Florida",rate:0,fill:C.green},{state:"Nevada",rate:0,fill:C.teal}];
var salesTax=[{state:"California",rate:8.68,fill:C.coral},{state:"Louisiana",rate:9.56,fill:C.orange},{state:"Tennessee",rate:9.55,fill:C.orange},{state:"Texas",rate:8.20,fill:C.amber},{state:"US Average",rate:6.57,fill:C.blue},{state:"Oregon",rate:0,fill:C.green},{state:"Montana",rate:0,fill:C.teal}];

var tabs=[{id:"overview",label:"The Premium"},{id:"taxes",label:"Tax Burden"},{id:"budget",label:"$100K Comparison"},{id:"hidden",label:"Hidden Costs"},{id:"who",label:"Who Pays Most"},{id:"worth",label:"Is It Worth It?"}];

export default function CostOfLiving(){
var s=useState("overview"),tab=s[0],setTab=s[1];
return(<>
<div style={{background:C.card,borderBottom:"1px solid "+C.border,padding:"0 24px",overflowX:"auto",whiteSpace:"nowrap"}}><div style={{maxWidth:900,margin:"0 auto",display:"flex"}}>{tabs.map(function(t){return(<button key={t.id} onClick={function(){setTab(t.id);}} style={{background:"none",border:"none",borderBottom:tab===t.id?"3px solid "+C.amber:"3px solid transparent",color:tab===t.id?C.white:C.slate,fontSize:14,fontWeight:tab===t.id?700:400,padding:"12px 16px",cursor:"pointer",fontFamily:"'Source Sans 3',sans-serif"}}>{t.label}</button>);})}</div></div>
<div style={{maxWidth:900,margin:"0 auto",padding:"26px 24px"}}>

{tab==="overview"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="COL Index" value="142" sub="vs 100 national avg" color={C.coral}/>
<Stat label="Monthly (Single)" value="$3,514" sub="Basic expenses" color={C.orange}/>
<Stat label="Monthly (Family)" value="$7,739" sub="Family of four" color={C.amber}/>
<Stat label="Living Wage" value="$110K" sub="Family of four" color={C.purple}/>
</div>

<Section title="Cost of Living Index by State" subtitle="US Average = 100. Higher = more expensive.">
<Chart height={300}>
<BarChart data={colIndex} margin={{left:10,right:30,top:20}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false}/>
<XAxis dataKey="state" tick={{fill:C.slate,fontSize:10}}/>
<YAxis tick={{fill:C.slate,fontSize:11}} domain={[0,200]}/>
<Tooltip content={<Tip/>}/>
<Bar dataKey="index" name="COL Index" radius={[4,4,0,0]} barSize={40}>
{colIndex.map(function(d,i){return <Cell key={i} fill={d.fill}/>;})}<LabelList dataKey="index" position="top" fill={C.white} fontSize={11}/></Bar>
</BarChart>
</Chart>
<Callout color={C.coral}>California's cost of living is <strong>42% above the national average</strong>. Housing alone is 97% higher. A family of four needs <strong>$110,255</strong> just to meet basic expenses -- and the median family income is only $105,232. Most California families are technically underwater before any discretionary spending.</Callout>
</Section>

<Section title="Where the Money Goes" accent={C.orange}>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
{[
{category:"Housing",caPremium:"+97%",detail:"Rent $2,500/mo 2BR. Mortgage on median home: $5,200/mo at 6.25%.",color:C.coral},
{category:"Transportation",detail:"Gas $5.90/gal. Car insurance 30% above avg. Registration fees highest in US.",caPremium:"+42%",color:C.orange},
{category:"Utilities",detail:"Electricity 33.8c/kWh (87% above national). Water rates rising with infrastructure costs.",caPremium:"+21%",color:C.amber},
{category:"Food",detail:"Groceries 15% above national avg. Restaurant meals 20%+ premium in metro areas.",caPremium:"+15%",color:C.purple},
{category:"Healthcare",detail:"Ranked 23rd in access/affordability. Premiums above average. Provider shortages in rural areas.",caPremium:"+12%",color:C.blue},
{category:"Childcare",detail:"Average $16,000-$22,000/year per child. Bay Area can exceed $30,000. Free pre-K coming 2025-26.",caPremium:"+20%",color:C.teal},
].map(function(item,i){return(
<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 0",borderBottom:i<5?"1px solid "+C.border:"none"}}>
<div style={{flex:1}}>
<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}>
<span style={{fontWeight:700,fontSize:15,color:item.color}}>{item.category}</span>
<span style={{fontSize:12,color:item.color,background:item.color+"18",padding:"2px 8px",borderRadius:4}}>{item.caPremium} vs US avg</span>
</div>
<p style={{fontSize:13,color:"#CBD5E1",lineHeight:1.4}}>{item.detail}</p>
</div>
</div>
);})}
</div>
</Section>
</>)}

{tab==="taxes"&&(<>
<div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
<Stat label="Income Tax" value="13.3%" sub="Highest in US" color={C.coral}/>
<Stat label="Sales Tax" value="8.68%" sub="Avg combined" color={C.orange}/>
<Stat label="Per Capita Tax" value="$10K" sub="Annual collection" color={C.amber}/>
<Stat label="No-Tax States" value="8" sub="TX, FL, NV, etc." color={C.green}/>
</div>

<Section title="Top Marginal Income Tax Rate by State" subtitle="Highest bracket rate (%)">
<Chart height={280}>
<BarChart data={taxRates} margin={{left:0,right:20,top:20}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false}/>
<XAxis dataKey="state" tick={{fill:C.slate,fontSize:10}}/>
<YAxis tick={{fill:C.slate,fontSize:11}} tickFormatter={function(v){return v+"%";}} domain={[0,15]}/>
<Tooltip content={<Tip/>}/>
<Bar dataKey="rate" name="Top Rate %" radius={[4,4,0,0]} barSize={40}>
{taxRates.map(function(d,i){return <Cell key={i} fill={d.fill}/>;})}<LabelList dataKey="rate" position="top" fill={C.white} fontSize={11} formatter={function(v){return v+"%";}}/></Bar>
</BarChart>
</Chart>
<Callout color={C.coral}>California's <strong>13.3% top rate</strong> is the highest state income tax in America. An additional 1% Mental Health Services Tax applies above $1M. Eight states charge <strong>zero</strong> income tax. A high earner moving from CA to TX saves 13.3% of income immediately -- no wonder they're leaving.</Callout>
</Section>

<Section title="Combined Sales Tax Rate" subtitle="State + local average (%)">
<Chart height={260}>
<BarChart data={salesTax} margin={{left:0,right:20,top:20}}>
<CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false}/>
<XAxis dataKey="state" tick={{fill:C.slate,fontSize:10}}/>
<YAxis tick={{fill:C.slate,fontSize:11}} tickFormatter={function(v){return v+"%";}} domain={[0,11]}/>
<Tooltip content={<Tip/>}/>
<Bar dataKey="rate" name="Sales Tax %" radius={[4,4,0,0]} barSize={40}>
{salesTax.map(function(d,i){return <Cell key={i} fill={d.fill}/>;})}<LabelList dataKey="rate" position="top" fill={C.white} fontSize={11} formatter={function(v){return v+"%";}}/></Bar>
</BarChart>
</Chart>
<Callout color={C.orange}>CA has the <strong>highest base state sales tax</strong> at 7.25%. With local add-ons, some areas exceed <strong>10%</strong>. Combined with the highest income tax, Californians face a double squeeze on both earning and spending. Oregon has zero sales tax; Nevada has zero income tax.</Callout>
</Section>
</>)}

{tab==="budget"&&(<>
<Section title="What $100K Really Buys You" subtitle="Annual household budget comparison at $100,000 gross income" accent={C.amber}>
<div style={{background:C.card,borderRadius:8,border:"1px solid "+C.border,overflow:"hidden"}}>
<div style={{display:"flex",borderBottom:"1px solid "+C.border,padding:"12px 16px",background:C.bg}}>
<div style={{flex:1,fontSize:13,fontWeight:700,color:C.slate}}>Category</div>
<div style={{width:100,textAlign:"right",fontSize:13,fontWeight:700,color:C.coral}}>California</div>
<div style={{width:100,textAlign:"right",fontSize:13,fontWeight:700,color:C.green}}>Texas</div>
<div style={{width:100,textAlign:"right",fontSize:13,fontWeight:700,color:C.teal}}>Ohio</div>
</div>
{[
{cat:"Gross Income",ca:"$100,000",tx:"$100,000",oh:"$100,000"},
{cat:"Federal Tax",ca:"-$14,700",tx:"-$14,700",oh:"-$14,700"},
{cat:"State Income Tax",ca:"-$6,200",tx:"$0",oh:"-$3,200"},
{cat:"FICA/Medicare",ca:"-$7,650",tx:"-$7,650",oh:"-$7,650"},
{cat:"Take-Home Pay",ca:"$71,450",tx:"$77,650",oh:"$74,450",bold:true},
{cat:"Housing (rent/mortgage)",ca:"-$30,000",tx:"-$16,800",oh:"-$12,000"},
{cat:"Gasoline (15K mi/yr)",ca:"-$3,540",tx:"-$1,860",oh:"-$2,100"},
{cat:"Electricity",ca:"-$2,040",tx:"-$1,740",oh:"-$1,440"},
{cat:"Car Insurance",ca:"-$2,400",tx:"-$1,800",oh:"-$1,200"},
{cat:"Groceries",ca:"-$6,900",tx:"-$5,400",oh:"-$5,100"},
{cat:"Sales Tax on Spending",ca:"-$2,100",tx:"-$1,800",oh:"-$1,400"},
{cat:"Home/Renter Insurance",ca:"-$2,400",tx:"-$2,100",oh:"-$1,200"},
{cat:"Remaining for Everything Else",ca:"$22,070",tx:"$46,150",oh:"$50,010",bold:true,highlight:true},
].map(function(r,i){return(
<div key={i} style={{display:"flex",padding:"10px 16px",borderBottom:"1px solid "+C.border,background:r.highlight?C.amber+"10":"transparent"}}>
<div style={{flex:1,fontSize:14,color:C.white,fontWeight:r.bold?700:400}}>{r.cat}</div>
<div style={{width:100,textAlign:"right",fontSize:14,color:r.highlight?C.coral:r.bold?C.coral:"#CBD5E1",fontWeight:r.bold?700:400}}>{r.ca}</div>
<div style={{width:100,textAlign:"right",fontSize:14,color:r.highlight?C.green:r.bold?C.green:"#CBD5E1",fontWeight:r.bold?700:400}}>{r.tx}</div>
<div style={{width:100,textAlign:"right",fontSize:14,color:r.highlight?C.teal:r.bold?C.teal:"#CBD5E1",fontWeight:r.bold?700:400}}>{r.oh}</div>
</div>
);})}
</div>
<Callout color={C.coral}>After taxes and basic expenses, a California family on $100K has <strong>$22,070 left</strong> for savings, childcare, healthcare, entertainment, and everything else. The same income in Texas leaves <strong>$46,150</strong>. In Ohio: <strong>$50,010</strong>. California's $100K earner has the purchasing power of a $48K earner in Ohio.</Callout>
</Section>
</>)}

{tab==="hidden"&&(<>
<Section title="The Hidden Costs Nobody Talks About" subtitle="Fees, surcharges, and mandates that aren't called 'taxes' but act like them" accent={C.orange}>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
{[
{cost:"Cap-and-Trade (gas)",amount:"~23c/gallon",annual:"~$276/yr",desc:"Carbon market surcharge on every gallon. Invisible to consumers. Unique to CA.",color:C.coral,icon:"\u26FD"},
{cost:"LCFS (gas)",amount:"~15c/gallon",annual:"~$180/yr",desc:"Low Carbon Fuel Standard. Another invisible per-gallon charge. Only CA.",color:C.orange,icon:"\uD83C\uDF31"},
{cost:"Mystery Surcharge (gas)",amount:"~41c/gallon",annual:"~$492/yr",desc:"Unexplained markup. CEC investigation couldn't fully explain it. $59B total since 2015.",color:C.amber,icon:"\u2753"},
{cost:"Vehicle Registration",amount:"$300-700+",annual:"$300-700/yr",desc:"Based on vehicle value. Among highest in nation. Plus smog check fees.",color:C.purple,icon:"\uD83D\uDE97"},
{cost:"Utility Surcharges",amount:"Varies",annual:"~$600/yr",desc:"Wildfire mitigation, grid hardening, renewable mandates, NEM subsidies -- all on your bill.",color:C.blue,icon:"\u26A1"},
{cost:"CEQA Compliance",amount:"Built into prices",annual:"Embedded",desc:"Environmental review costs passed to consumers via housing, construction, retail prices.",color:C.teal,icon:"\uD83D\uDCCB"},
{cost:"Bag/Straw/Container Fees",amount:"Small individually",annual:"~$50-100/yr",desc:"10c per bag, container deposit, styrofoam ban compliance. Death by a thousand cuts.",color:C.slate,icon:"\uD83D\uDECD\uFE0F"},
].map(function(item,i){return(
<div key={i} style={{display:"flex",gap:14,padding:"14px 0",borderBottom:i<6?"1px solid "+C.border:"none",alignItems:"flex-start"}}>
<div style={{fontSize:22,flexShrink:0,width:32,textAlign:"center"}}>{item.icon}</div>
<div style={{flex:1}}>
<div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:2}}>
<span style={{fontWeight:700,fontSize:15,color:item.color}}>{item.cost}</span>
<span style={{fontSize:12,color:C.amber,background:C.amber+"18",padding:"2px 8px",borderRadius:4}}>{item.annual}</span>
</div>
<div style={{fontSize:12,color:C.slate,marginBottom:2}}>Per-unit cost: {item.amount}</div>
<p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.4}}>{item.desc}</p>
</div>
</div>
);})}
</div>
<Callout color={C.orange}>These "hidden taxes" add <strong>$2,000-3,000+ per year</strong> to a typical CA household's costs, on top of the highest income tax and sales tax. None appear on a tax return. Most are invisible to consumers -- built into gas prices, utility bills, and retail costs. This is taxation without representation in its most modern form.</Callout>
</Section>
</>)}

{tab==="who"&&(<>
<Section title="Who Gets Hit Hardest?" subtitle="California's cost crisis is deeply regressive" accent={C.coral}>
<div style={{display:"flex",flexWrap:"wrap",gap:16,marginBottom:20}}>
{[
{title:"Central Valley Farmworker",income:"$35K/year",burden:"Gas at $5.90 = 12% of income on fuel alone. No transit alternative. Cheapest housing still $1,400/mo. Power bill $200+ in summer heat.",pct:"75%+ of income on basics",color:C.coral,icon:"\uD83C\uDF3E"},
{title:"Bay Area Teacher",income:"$75K/year",burden:"Can't afford to live where they work. Commutes 90 min from Tracy. $2,800/mo rent or $5K mortgage. After taxes and commute: negative savings.",pct:"85%+ of income on basics",color:C.orange,icon:"\uD83D\uDCDA"},
{title:"LA Tech Worker",income:"$150K/year",burden:"Comfortable but not wealthy. $3,500/mo rent for 1BR. 13.3% state tax bracket. After housing and taxes: lives like a $70K earner elsewhere.",pct:"65% of income on basics",color:C.amber,icon:"\uD83D\uDCBB"},
{title:"SF Executive",income:"$500K/year",burden:"$13.3% + 1% mental health tax. $5M home, Prop 13 frozen tax. Can absorb costs. Benefits from asset appreciation. The system works for this person.",pct:"System works fine",color:C.green,icon:"\uD83C\uDFE2"},
].map(function(c,i){return(
<div key={i} style={{flex:"1 1 200px",background:C.bg,borderRadius:8,padding:16,borderTop:"3px solid "+c.color}}>
<div style={{fontSize:22,marginBottom:6}}>{c.icon}</div>
<h4 style={{fontSize:15,color:c.color,marginBottom:4,fontWeight:700}}>{c.title}</h4>
<div style={{fontSize:13,color:C.amber,marginBottom:6}}>{c.income}</div>
<p style={{fontSize:13,color:"#CBD5E1",lineHeight:1.5,marginBottom:6}}>{c.burden}</p>
<div style={{fontSize:12,color:c.color,fontWeight:700}}>{c.pct}</div>
</div>
);})}
</div>
<Callout color={C.coral}>California's cost crisis is <strong>profoundly regressive</strong>. The farmworker in Fresno pays the same gas price, the same sales tax, and faces the same utility rates as the executive in Pacific Heights. But those costs represent 75% of the farmworker's income and 5% of the executive's. The people who set policy are the ones least affected by it.</Callout>
</Section>
</>)}

{tab==="worth"&&(<>
<Section title="Is California Worth the Premium?" subtitle="An honest look at what you get for the highest costs in America" accent={C.green}>
<div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.green+"55"}}>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:16}}>It would be dishonest to ignore what California offers. The premium buys <em>something</em>:</p>
<div style={{display:"flex",flexWrap:"wrap",gap:16,marginBottom:16}}>
{[
{title:"Climate & Geography",desc:"Mediterranean climate. 840 miles of coast. Sierra Nevada. Redwoods. Yosemite. Genuinely unmatched natural beauty.",color:C.green,icon:"\uD83C\uDF05"},
{title:"Economy & Innovation",desc:"5th largest economy globally. Silicon Valley. Hollywood. Biotech. Venture capital hub. If you're in tech, there's nowhere better.",color:C.teal,icon:"\uD83D\uDE80"},
{title:"UC System",desc:"6 campuses in the global top 50. UCLA, Berkeley, UCSF, UCSD. Best public university system in the world.",color:C.blue,icon:"\uD83C\uDF93"},
{title:"Cultural Diversity",desc:"Most diverse state in America. World-class food, arts, music. 200+ languages spoken. Genuinely cosmopolitan.",color:C.purple,icon:"\uD83C\uDF0D"},
{title:"Worker Protections",desc:"Highest minimum wage ($16.50). Paid family leave. Strong labor laws. Environmental regulations. If you value these, CA delivers.",color:C.amber,icon:"\uD83D\uDC77"},
{title:"Healthcare Access",desc:"Expanded Medi-Cal covers millions. Covered California marketplace. Better access than many states, especially for low-income.",color:C.orange,icon:"\uD83C\uDFE5"},
].map(function(c,i){return(
<div key={i} style={{flex:"1 1 250px",background:C.bg,borderRadius:8,padding:14,borderLeft:"3px solid "+c.color}}>
<div style={{fontSize:20,marginBottom:4}}>{c.icon}</div>
<h4 style={{fontSize:14,color:c.color,marginBottom:4,fontWeight:700}}>{c.title}</h4>
<p style={{fontSize:13,color:"#CBD5E1",lineHeight:1.4}}>{c.desc}</p>
</div>
);})}
</div>
</div>

<div style={{background:"linear-gradient(135deg, #7F1D1D22, #1E293B)",border:"1px solid "+C.coral+"55",borderRadius:8,padding:24,marginTop:20}}>
<p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.coral}}>But the question isn't whether California is nice.</strong> The question is whether the <em>premium</em> is justified by the <em>governance</em>.</p>
<p style={{fontSize:16,color:"#CBD5E1",lineHeight:1.7,marginBottom:14}}>Climate and geography are free -- they exist regardless of policy. The UC system was built decades ago. The economy runs on private innovation, not state management. What the state government actually controls -- housing policy, energy regulation, infrastructure, public safety -- is where the failures are concentrated.</p>
<p style={{fontSize:16,color:"#CBD5E1",lineHeight:1.7,fontStyle:"italic"}}>Californians pay a 42% premium for the privilege of living in a state that can't build housing, can't keep the lights affordable, can't insure homes, can't finish a train, and can't keep gas under $6. The weather is wonderful. The governance is the problem.</p>
</div>
</Section>
</>)}

</div>
</>);}
