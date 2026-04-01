import { useState } from "react";
const C={coral:"#FF6B6B",amber:"#FBBF24",green:"#34D399",teal:"#2DD4BF",blue:"#60A5FA",purple:"#A78BFA",orange:"#FB923C",cyan:"#22D3EE",white:"#F8FAFC",slate:"#94A3B8",bg:"#0F172A",card:"#1E293B",border:"#334155"};

function SB(props){
  return(
    <div style={{marginBottom:44}}>
      <h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:24,fontWeight:700,color:C.white,marginBottom:4,borderLeft:"4px solid "+(props.accent||C.purple),paddingLeft:16}}>{props.title}</h2>
      {props.subtitle && <p style={{fontSize:15,color:C.slate,marginTop:4,marginBottom:18,paddingLeft:20}}>{props.subtitle}</p>}
      {props.children}
    </div>
  );
}

function CB(props){
  var color = props.color || C.purple;
  return(
    <div style={{marginTop:14,padding:"14px 18px",background:color+"15",border:"1px solid "+color+"55",borderRadius:6,fontSize:15,color:C.white,lineHeight:1.65}}>{props.children}</div>
  );
}

var tabs=[
  {id:"oneparty",label:"One-Party State"},
  {id:"unions",label:"Union Power"},
  {id:"money",label:"Follow the Money"},
  {id:"maps",label:"Redistricting"},
  {id:"accountability",label:"Accountability"},
  {id:"change",label:"Can It Change?"}
];

export default function PoliticalStructure(){
  var state = useState("oneparty");
  var tab = state[0];
  var setTab = state[1];

  return(
    <div>
      <div style={{background:C.card,borderBottom:"1px solid "+C.border,padding:"0 24px",overflowX:"auto",whiteSpace:"nowrap"}}>
        <div style={{maxWidth:900,margin:"0 auto",display:"flex"}}>
          {tabs.map(function(t){
            return(
              <button key={t.id} onClick={function(){setTab(t.id);}} style={{background:"none",border:"none",borderBottom:tab===t.id?"3px solid "+C.purple:"3px solid transparent",color:tab===t.id?C.white:C.slate,fontSize:14,fontWeight:tab===t.id?700:400,padding:"12px 16px",cursor:"pointer",fontFamily:"'Source Sans 3',sans-serif"}}>{t.label}</button>
            );
          })}
        </div>
      </div>

      <div style={{maxWidth:900,margin:"0 auto",padding:"26px 24px"}}>

        {tab==="oneparty" && (
          <div>
            <div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:26}}>
              {[
                {label:"Senate",value:"30-10",sub:"Democrat supermajority",color:C.blue},
                {label:"Assembly",value:"60-20",sub:"Democrat supermajority",color:C.blue},
                {label:"Governor",value:"Dem",sub:"Since 2011 (continuous)",color:C.blue},
                {label:"Supermajority Since",value:"2012",sub:"13+ years unbroken",color:C.purple}
              ].map(function(s,i){
                return(
                  <div key={i} style={{background:C.card,border:"1px solid "+C.border,borderRadius:8,padding:"14px 18px",flex:"1 1 140px",minWidth:140}}>
                    <div style={{fontSize:11,color:C.slate,textTransform:"uppercase",letterSpacing:1}}>{s.label}</div>
                    <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:28,fontWeight:700,color:s.color,marginTop:4}}>{s.value}</div>
                    <div style={{fontSize:12,color:C.slate,marginTop:2}}>{s.sub}</div>
                  </div>
                );
              })}
            </div>

            <SB title="California: A One-Party State" subtitle="Democrats hold supermajorities in both chambers, the governorship, and every statewide office">
              <div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
                <p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>California is one of <strong style={{color:C.blue}}>eight states</strong> where a single party holds a veto-proof supermajority in both chambers. Democrats have held this power continuously since 2012 -- over 13 years.</p>
                <p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>A supermajority means Republicans cannot block <strong>any</strong> legislation, <strong>any</strong> budget item, <strong>any</strong> constitutional amendment referral, or <strong>any</strong> tax increase. The minority party is functionally irrelevant to governance.</p>
                <p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>Voter registration as of February 2025: <strong style={{color:C.blue}}>45.3% Democrat</strong>, 24.1% No Party Preference, and declining Republican registration. In many districts, the only competitive election is the Democratic primary.</p>
              </div>
              <CB color={C.purple}>This is not a commentary on whether Democratic policies are good or bad. It is a structural observation: <strong>when one party faces no opposition, accountability breaks down</strong>. Even Democratic State Senator Bill Dodd acknowledged: "I certainly don't think it's good for democracy overall."</CB>
            </SB>

            <SB title="What Supermajority Means in Practice" accent={C.coral}>
              <div style={{display:"flex",flexWrap:"wrap",gap:16}}>
                {[
                  {title:"No Budget Check",desc:"Can pass any budget without a single Republican vote. Spending has nearly doubled since supermajority was achieved.",color:C.coral,icon:"\uD83D\uDCB0"},
                  {title:"No Tax Check",desc:"Can raise taxes with a 2/3 vote -- which they have. Gas tax increases, income tax hikes, new fees -- all passed on party-line votes.",color:C.orange,icon:"\uD83D\uDCCA"},
                  {title:"No Amendment Check",desc:"Can place constitutional amendments on the ballot without any Republican support. Can change the rules of the game unilaterally.",color:C.amber,icon:"\uD83D\uDCDC"},
                  {title:"Primary Is the Election",desc:"In 11 Assembly races in 2024, two Democrats faced each other. The general election was decided before November.",color:C.purple,icon:"\uD83D\uDDF3\uFE0F"},
                ].map(function(c,i){
                  return(
                    <div key={i} style={{flex:"1 1 200px",background:C.bg,borderRadius:8,padding:14,borderTop:"3px solid "+c.color}}>
                      <div style={{fontSize:22,marginBottom:6}}>{c.icon}</div>
                      <h4 style={{fontSize:14,color:c.color,marginBottom:6,fontWeight:700}}>{c.title}</h4>
                      <p style={{fontSize:13,color:"#CBD5E1",lineHeight:1.5}}>{c.desc}</p>
                    </div>
                  );
                })}
              </div>
            </SB>
          </div>
        )}

        {tab==="unions" && (
          <div>
            <SB title="Union Power in California Politics" subtitle="The single most powerful political force in the state" accent={C.coral}>
              <div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
                <p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:16}}>Unions are the largest campaign donors in California politics. They fund the Democratic supermajority, and in return, that supermajority protects union interests. This is not corruption -- it's the system working exactly as designed:</p>

                {[
                  {union:"California Teachers Association (CTA)",members:"310,000+",spending:"$200M+ over last decade in political spending",impact:"Largest single political donor in state history. Opposes charter schools, supports pension increases, resists accountability metrics. Education spending grows but pension costs absorb 25% of growth.",color:C.coral,icon:"\uD83C\uDF93"},
                  {union:"SEIU California",members:"700,000+",spending:"$100M+ in state political spending",impact:"Healthcare, home care, and public sector workers. Pushes minimum wage increases, opposes outsourcing, supports expanded government services. Key ally for every Democratic governor.",color:C.orange,icon:"\uD83C\uDFE5"},
                  {union:"Building Trades Councils",members:"450,000+",spending:"Major contributor through county DCCs",impact:"Use CEQA litigation as leverage for Project Labor Agreements. PLAs add 10-20% to construction costs. 2025 CEQA reform required labor standards for exemptions -- unions got their carveout.",color:C.amber,icon:"\uD83D\uDC77"},
                  {union:"CCPOA (Prison Guards)",members:"29,000+",spending:"$100M+ over career in political spending",impact:"Among highest-paid prison guards in America ($100K+ avg). Historically opposed criminal justice reform. Funded tough-on-crime ballot measures. One of the most powerful per-capita lobbies in the state.",color:C.purple,icon:"\uD83D\uDD12"},
                  {union:"Firefighter Unions",members:"30,000+",spending:"Major local and state donors",impact:"CalFIRE budget tripled. Pension spiking common. Some retiring at 50-55 with $150K+ pensions. Essential service, but costs are unsustainable.",color:C.blue,icon:"\uD83D\uDE92"},
                ].map(function(item,i){
                  return(
                    <div key={i} style={{padding:"18px 0",borderBottom:i<4?"1px solid "+C.border:"none"}}>
                      <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                        <div style={{fontSize:26,flexShrink:0}}>{item.icon}</div>
                        <div style={{flex:1}}>
                          <h4 style={{fontSize:16,fontWeight:700,color:item.color,marginBottom:4}}>{item.union}</h4>
                          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:6}}>
                            <span style={{fontSize:12,color:C.amber,background:C.amber+"18",padding:"2px 8px",borderRadius:4}}>{item.members} members</span>
                            <span style={{fontSize:12,color:C.coral,background:C.coral+"18",padding:"2px 8px",borderRadius:4}}>{item.spending}</span>
                          </div>
                          <p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.5}}>{item.impact}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <CB color={C.coral}><strong>The cycle:</strong> Unions fund Democratic campaigns. Democrats win supermajorities. Supermajorities pass union-friendly legislation (pension increases, prevailing wage, CEQA labor requirements). These policies increase costs for taxpayers and consumers. Taxpayers can't vote for the other party because there is no competitive other party. The cycle repeats.</CB>
            </SB>
          </div>
        )}

        {tab==="money" && (
          <div>
            <SB title="Follow the Money" subtitle="How union dues become Democratic supermajorities through county committee laundering" accent={C.orange}>
              <div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
                <p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>California Policy Center investigation revealed a sophisticated funding pipeline:</p>

                {[
                  {step:"1",title:"Union Dues Collected",desc:"Public sector workers pay mandatory or opt-in union dues. Hundreds of millions flow to union treasuries annually.",color:C.coral},
                  {step:"2",title:"Deposited in Remote County DCCs",desc:"Funds are deposited into Democratic Central Committees in rural counties like Humboldt, Tehama, and Alpine -- far from the races they'll influence.",color:C.orange},
                  {step:"3",title:"Redirected to Targeted Races",desc:"The State Senate Democratic Caucus directs these remote committees to send money to competitive races hundreds of miles away.",color:C.amber},
                  {step:"4",title:"Origin Obscured",desc:"Campaign finance reports show 'Humboldt County DCC' as the donor, not SEIU or CTA. The union fingerprints are laundered through the system.",color:C.purple},
                  {step:"5",title:"Supermajority Protected",desc:"Targeted funding ensures vulnerable Democrats survive close races. The supermajority holds. Union-friendly legislation continues.",color:C.blue},
                ].map(function(s,i){
                  return(
                    <div key={i} style={{display:"flex",gap:12,padding:"12px 0",borderBottom:i<4?"1px solid "+C.border:"none"}}>
                      <div style={{width:28,height:28,borderRadius:"50%",background:s.color+"30",border:"2px solid "+s.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:s.color,flexShrink:0}}>{s.step}</div>
                      <div>
                        <div style={{fontSize:15,fontWeight:700,color:s.color,marginBottom:2}}>{s.title}</div>
                        <p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.4}}>{s.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <CB color={C.orange}><strong>Example:</strong> Humboldt County DCC (pop. 136,000, near Oregon border) raised $1.4M since 2015 -- <strong>88% from unions</strong>. It gave just $158 to its own local Assemblymember. But it sent <strong>$820,000</strong> to legislators in Los Angeles, Orange, and San Bernardino counties. The committee chair confirmed this is coordinated by the State Senate Democratic Caucus.</CB>
            </SB>
          </div>
        )}

        {tab==="maps" && (
          <div>
            <SB title="Redistricting: The 'Gavinmander'" subtitle="How California bypassed its own independent commission" accent={C.amber}>
              <div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
                <p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.green}}>The good news:</strong> In 2008 and 2010, California voters created an independent Citizens Redistricting Commission -- widely praised as a national model for fair, non-partisan map-drawing.</p>
                <p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.coral}}>The bad news:</strong> In 2025, Governor Newsom bypassed that commission entirely. In response to Texas's Republican gerrymander, Newsom pushed a constitutional amendment (Prop 50) letting the <em>legislature</em> redraw congressional maps -- the very thing the commission was created to prevent.</p>
                <p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>Voters approved it in November 2025. The result was dubbed the <strong style={{color:C.amber}}>"Gavinmander"</strong> -- a Democratic gerrymander that could give the party up to 48 of California's 52 congressional seats.</p>
              </div>
            </SB>

            <SB title="The Timeline" accent={C.blue}>
              <div style={{background:C.card,borderRadius:8,border:"1px solid "+C.border,overflow:"hidden"}}>
                {[
                  {year:"2008",event:"Prop 11 creates Citizens Redistricting Commission for state legislature",who:"Voters",color:C.green},
                  {year:"2010",event:"Prop 20 expands commission to congressional districts",who:"Voters",color:C.green},
                  {year:"2011",event:"Commission draws maps. ProPublica later reveals Democrats gamed the process through organized public testimony",who:"Democrats",color:C.amber},
                  {year:"2021",event:"Commission draws new maps after 2020 census. Maps adopted 14-0, no legal challenges",who:"Commission",color:C.green},
                  {year:"2025",event:"Texas passes Republican gerrymander. Newsom bypasses commission, legislature draws new congressional maps",who:"Legislature",color:C.coral},
                  {year:"Nov 2025",event:"Voters approve Prop 50 allowing legislative redistricting. Democrats could win 48 of 52 seats",who:"Voters/Legislature",color:C.coral},
                ].map(function(item,i){
                  return(
                    <div key={i} style={{display:"flex",alignItems:"center",padding:"12px 20px",borderBottom:i<5?"1px solid "+C.border:"none"}}>
                      <div style={{width:60,fontSize:14,color:item.color,fontWeight:700,flexShrink:0}}>{item.year}</div>
                      <div style={{flex:1,fontSize:14,color:C.white}}>{item.event}</div>
                      <div style={{fontSize:12,color:item.color,fontWeight:600,flexShrink:0}}>{item.who}</div>
                    </div>
                  );
                })}
              </div>
              <CB color={C.amber}>The independent commission was <strong>California's proudest democratic reform</strong>. Voters created it specifically to stop politicians from drawing their own maps. In 2025, politicians drew their own maps anyway. Polling showed only 36% supported returning map authority to the legislature -- but the measure was framed as fighting Trump, and it passed.</CB>
            </SB>
          </div>
        )}

        {tab==="accountability" && (
          <div>
            <SB title="The Accountability Deficit" subtitle="When no one can lose, no one is accountable" accent={C.coral}>
              <div style={{background:C.card,borderRadius:8,padding:20,border:"1px solid "+C.border}}>
                <p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}>Healthy democracies require that voters can hold leaders accountable for outcomes. In California, several structural factors prevent this:</p>

                {[
                  {problem:"No Competitive Elections",desc:"In most districts, the Democratic primary is the only election that matters. General elections are formalities. Incumbents face no real threat from Republicans -- their only risk is being outflanked from the left.",color:C.coral,icon:"\uD83D\uDDF3\uFE0F"},
                  {problem:"No Spending Accountability",desc:"The state auditor has repeatedly found that major programs lack outcome tracking. $24B spent on homelessness with no clear accounting. $18B on HSR with zero passengers. No one loses their job.",color:C.orange,icon:"\uD83D\uDCB8"},
                  {problem:"Blame Shifting",desc:"Sacramento blames Washington. Cities blame Sacramento. Agencies blame CEQA. CEQA defenders blame NIMBYs. Everyone has someone else to blame. No one owns outcomes.",color:C.amber,icon:"\uD83E\uDD37"},
                  {problem:"Media Ecosystem",desc:"Most CA political media is sympathetic to Democratic governance. Structural criticism of one-party rule is rare. Coverage focuses on partisan battles with Republicans, not on accountability within the majority.",color:C.purple,icon:"\uD83D\uDCF0"},
                  {problem:"Prop 13 Lock-In",desc:"Homeowners with frozen property taxes have no financial incentive to demand change. Rising home values benefit them. The system works for the people who vote most reliably.",color:C.blue,icon:"\uD83C\uDFE0"},
                ].map(function(item,i){
                  return(
                    <div key={i} style={{display:"flex",gap:12,padding:"14px 0",borderBottom:i<4?"1px solid "+C.border:"none"}}>
                      <div style={{fontSize:24,flexShrink:0}}>{item.icon}</div>
                      <div style={{flex:1}}>
                        <h4 style={{fontSize:15,fontWeight:700,color:item.color,marginBottom:4}}>{item.problem}</h4>
                        <p style={{fontSize:14,color:"#CBD5E1",lineHeight:1.5}}>{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <CB color={C.coral}>The recall of three San Francisco school board members (2022) and DA Chesa Boudin (2022) showed that voters <em>can</em> hold officials accountable when pushed far enough. But these were exceptional cases driven by extraordinary failures. The system is designed to prevent accountability, not enable it.</CB>
            </SB>
          </div>
        )}

        {tab==="change" && (
          <div>
            <SB title="Can California Change?" subtitle="The honest assessment" accent={C.amber}>
              <div style={{background:"linear-gradient(135deg, #78350F22, #1E293B)",border:"1px solid "+C.amber+"55",borderRadius:8,padding:24}}>

                <p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.coral}}>Can Republicans win?</strong> Not statewide, and probably not for a generation. Voter registration trends, demographic shifts, and cultural alignment make California structurally Democratic. The last Republican to win statewide was Schwarzenegger in 2006. Registration is now 45% Dem, declining GOP.</p>

                <p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.amber}}>Can a third party emerge?</strong> Theoretically possible under top-two primary system, but no third party has achieved meaningful representation. No Party Preference voters are 24% of registrations but don't vote as a bloc.</p>

                <p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.green}}>So where does reform come from?</strong> It has to come from <em>within</em> the Democratic Party. And there are signs it's happening:</p>

                <div style={{display:"flex",flexWrap:"wrap",gap:16,marginBottom:16}}>
                  {[
                    {title:"CEQA Reform (2025)",desc:"Newsom and the legislature actually reformed their most sacred cow. Biggest change in 55 years. Every previous governor failed.",color:C.green,icon:"\u2705"},
                    {title:"SF Recalls (2022)",desc:"Ultra-liberal SF recalled school board members and DA. Proved that even deep-blue voters have limits.",color:C.teal,icon:"\uD83D\uDDF3\uFE0F"},
                    {title:"Prop 36 (2024)",desc:"Voters reversed parts of Prop 47 (crime reform). 70% approval -- including Democratic voters. Public safety concerns crossed party lines.",color:C.blue,icon:"\u2696\uFE0F"},
                    {title:"Housing YIMBY Movement",desc:"Pro-housing Democrats (Wiener, Wicks) are challenging the NIMBY wing of their own party. Actual legislation passing.",color:C.amber,icon:"\uD83C\uDFE0"},
                  ].map(function(c,i){
                    return(
                      <div key={i} style={{flex:"1 1 200px",background:C.bg,borderRadius:8,padding:14,borderLeft:"3px solid "+c.color}}>
                        <div style={{fontSize:20,marginBottom:4}}>{c.icon}</div>
                        <h4 style={{fontSize:14,color:c.color,marginBottom:4,fontWeight:700}}>{c.title}</h4>
                        <p style={{fontSize:13,color:"#CBD5E1",lineHeight:1.4}}>{c.desc}</p>
                      </div>
                    );
                  })}
                </div>

                <p style={{fontSize:16,color:C.white,lineHeight:1.7,marginBottom:14}}><strong style={{color:C.coral}}>But the structural barriers remain enormous:</strong></p>

                <div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:16}}>
                  {[
                    "Union funding ensures union-friendly legislators keep winning",
                    "Gerrymandered maps (2025) remove remaining competitive districts",
                    "No spending accountability or outcome tracking",
                    "CEQA reform was housing-only -- infrastructure still trapped",
                    "Pension costs growing faster than revenue with no structural fix",
                    "The people who set policy are the least affected by its failures"
                  ].map(function(s,i){
                    return(
                      <div key={i} style={{flex:"1 1 250px",background:C.bg,borderRadius:6,padding:10,borderLeft:"3px solid "+C.coral,fontSize:13,color:"#CBD5E1"}}>{s}</div>
                    );
                  })}
                </div>

                <p style={{fontSize:16,color:"#CBD5E1",lineHeight:1.7,fontStyle:"italic"}}>California's best hope is not a partisan shift but a <strong style={{color:C.amber}}>reform movement within the Democratic Party</strong> -- a faction that prioritizes building over blocking, outcomes over process, and consumers over incumbents. The YIMBY movement and the 2025 CEQA reform show this is possible. The question is whether it can scale fast enough to reverse decades of accumulated dysfunction.</p>
              </div>
            </SB>
          </div>
        )}

      </div>
    </div>
  );
}
