import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
const C={coral:"#FF6B6B",amber:"#FBBF24",green:"#34D399",teal:"#2DD4BF",blue:"#60A5FA",purple:"#A78BFA",orange:"#FB923C",cyan:"#22D3EE",white:"#F8FAFC",slate:"#94A3B8",bg:"#0F172A",card:"#1E293B",border:"#334155"};
function ll(lat,lon,r){const p=(90-lat)*Math.PI/180,t=(lon+180)*Math.PI/180;return new THREE.Vector3(-r*Math.sin(p)*Math.cos(t),r*Math.cos(p),r*Math.sin(p)*Math.sin(t));}
function seaRoute(waypoints,col){const pts=[];for(let w=0;w<waypoints.length-1;w++){const[la1,lo1]=waypoints[w],[la2,lo2]=waypoints[w+1];for(let i=0;i<=30;i++){const t=i/30,la=la1+(la2-la1)*t,lo=lo1+(lo2-lo1)*t;const p=(90-la)*Math.PI/180,th=(lo+180)*Math.PI/180;pts.push(new THREE.Vector3(-1.006*Math.sin(p)*Math.cos(th),1.006*Math.cos(p),1.006*Math.sin(p)*Math.sin(th)));}}return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({color:col,transparent:true,opacity:0.9}));}
const R=[
{id:"crude",label:"Crude: Persian Gulf \u2192 S. Korea",miles:"6,800 nm",days:"~18 days",color:0xFB923C,hex:"FB923C",desc:"VLCCs exit Hormuz, cross Indian Ocean, through Malacca Strait.",wp:[[26,56],[24,58],[20,63],[15,68],[10,75],[5,80],[2,95],[1,103],[3,108],[6,112],[10,115],[15,118],[20,120],[25,123],[30,127],[35,128]]},
{id:"product",label:"CARBOB: S. Korea \u2192 LA",miles:"5,500 nm",days:"18-21 days",color:0xFF6B6B,hex:"FF6B6B",desc:"Product tankers cross North Pacific great circle route.",wp:[[35,128],[36,135],[38,145],[40,155],[41,165],[42,175],[42,-175],[41,-165],[40,-155],[39,-145],[38,-138],[37,-132],[36,-125],[34,-119]]},
{id:"india",label:"India \u2192 LA (Direct Pacific)",miles:"8,500 nm",days:"~25 days",color:0x2DD4BF,hex:"2DD4BF",desc:"From Gujarat across Indian Ocean, past Singapore, across Pacific.",wp:[[22,70],[18,72],[12,75],[8,78],[5,82],[2,90],[1,100],[2,108],[5,115],[10,125],[15,135],[20,145],[25,155],[30,165],[33,175],[35,-175],[37,-165],[38,-155],[37,-145],[36,-135],[35,-125],[34,-119]]},
{id:"gulf",label:"Houston \u2192 Bahamas",miles:"900 nm",days:"~3 days",color:0xFBBF24,hex:"FBBF24",desc:"Jones Act dodge. US gas east on US-flagged vessels.",wp:[[29.7,-95],[28,-92],[27,-88],[26,-85],[25.5,-81],[26,-79]]},
{id:"bahamas",label:"Bahamas \u2192 LA via Panama",miles:"4,200 nm",days:"14-16 days",color:0xFBBF24,hex:"FBBF24",desc:"Foreign tankers south to Panama, through canal, up Pacific coast.",wp:[[26,-79],[24,-79],[20,-78],[15,-78],[10,-80],[9,-79.5],[8,-80],[6,-82],[5,-85],[8,-90],[12,-95],[16,-100],[20,-105],[24,-110],[28,-114],[30,-117],[33,-118],[34,-119]]}];
const L=[{name:"Los Angeles",lat:34,lon:-118,color:0xFF6B6B,s:0.022},{name:"Houston",lat:29.7,lon:-95.3,color:0x34D399,s:0.018},{name:"Freeport, Bahamas",lat:26.5,lon:-78.7,color:0xFBBF24,s:0.015},{name:"Strait of Hormuz",lat:26.5,lon:56,color:0xFB923C,s:0.018},{name:"Gujarat, India",lat:22.3,lon:70,color:0x2DD4BF,s:0.018},{name:"Yeosu, S. Korea",lat:34.7,lon:127.7,color:0x22D3EE,s:0.018},{name:"Panama Canal",lat:9,lon:-79.5,color:0xFBBF24,s:0.012},{name:"Malacca Strait",lat:2,lon:103,color:0xFB923C,s:0.012}];
export default function Globe(){
const ref=useRef(null);const[active,setActive]=useState(null);const arcsRef=useRef([]);const cleanupRef=useRef({});
useEffect(()=>{const el=ref.current;if(!el)return;while(el.firstChild)el.removeChild(el.firstChild);
const w=el.clientWidth,h=Math.min(w*0.75,520);
const scene=new THREE.Scene();const cam=new THREE.PerspectiveCamera(45,w/h,0.1,100);cam.position.set(0,0.3,2.6);
const ren=new THREE.WebGLRenderer({antialias:true,alpha:true});ren.setSize(w,h);ren.setPixelRatio(Math.min(window.devicePixelRatio,2));el.appendChild(ren.domElement);
scene.add(new THREE.AmbientLight(0x888899,0.6));
const dl=new THREE.DirectionalLight(0xffffff,1.0);dl.position.set(5,3,5);scene.add(dl);
const pivot=new THREE.Group();scene.add(pivot);
new THREE.TextureLoader().load("/earth.jpg",function(tex){
tex.anisotropy=ren.capabilities.getMaxAnisotropy();
var globe=new THREE.Mesh(new THREE.SphereGeometry(1,64,64),new THREE.MeshPhongMaterial({map:tex,specular:new THREE.Color(0x222233),shininess:12}));
pivot.add(globe);
var aa=[];
R.forEach(function(r){var a=seaRoute(r.wp,r.color);a.userData={id:r.id};pivot.add(a);aa.push(a);});
arcsRef.current=aa;
L.forEach(function(l){var d=new THREE.Mesh(new THREE.SphereGeometry(l.s,10,10),new THREE.MeshBasicMaterial({color:l.color}));d.position.copy(ll(l.lat,l.lon,1.008));pivot.add(d);});
var drag=false,px=0,ry=-1.8,auto=true;
el.addEventListener("mousedown",function(e){drag=true;px=e.clientX;auto=false;});
el.addEventListener("mousemove",function(e){if(drag){ry+=(e.clientX-px)*0.005;px=e.clientX;}});
el.addEventListener("mouseup",function(){drag=false;});
el.addEventListener("mouseleave",function(){drag=false;});
el.addEventListener("touchstart",function(e){drag=true;px=e.touches[0].clientX;auto=false;},{passive:true});
el.addEventListener("touchmove",function(e){if(drag){ry+=(e.touches[0].clientX-px)*0.005;px=e.touches[0].clientX;}},{passive:true});
el.addEventListener("touchend",function(){drag=false;});
var fid;
var anim=function(){fid=requestAnimationFrame(anim);if(auto)ry+=0.0012;pivot.rotation.y=ry;ren.render(scene,cam);};
anim();
var onR=function(){var nw=el.clientWidth,nh=Math.min(nw*0.75,520);cam.aspect=nw/nh;cam.updateProjectionMatrix();ren.setSize(nw,nh);};
window.addEventListener("resize",onR);
cleanupRef.current={fid:fid,onR:onR,ren:ren};
});
return function(){var c=cleanupRef.current;if(c.fid)cancelAnimationFrame(c.fid);if(c.onR)window.removeEventListener("resize",c.onR);if(c.ren){if(el.contains(c.ren.domElement))el.removeChild(c.ren.domElement);c.ren.dispose();}};
},[]);
useEffect(function(){arcsRef.current.forEach(function(a){a.material.opacity=active===null||a.userData.id===active?0.9:0.08;});},[active]);
var totalMiles=R.reduce(function(s,r){return s+parseInt(r.miles.replace(/,/g,""));},0).toLocaleString();
return(
<div style={{maxWidth:900,margin:"0 auto",padding:"26px 24px"}}>
<div style={{marginBottom:24}}>
<h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:24,fontWeight:700,color:C.white,borderLeft:"4px solid "+C.cyan,paddingLeft:16}}>Global Supply Routes</h2>
<p style={{fontSize:15,color:C.slate,marginTop:4,paddingLeft:20}}>Drag to rotate. Click a route below to highlight.</p>
</div>
<div style={{background:C.card,borderRadius:12,border:"1px solid "+C.border,overflow:"hidden"}}>
<div ref={ref} style={{width:"100%",cursor:"grab",background:"radial-gradient(ellipse at center,#0a1525 0%,#050c15 100%)"}}/>
<div style={{padding:"10px 20px",display:"flex",flexWrap:"wrap",gap:14,borderBottom:"1px solid "+C.border}}>
{L.map(function(l){return(
<div key={l.name} style={{display:"flex",alignItems:"center",gap:5}}>
<div style={{width:8,height:8,borderRadius:"50%",background:"#"+l.color.toString(16).padStart(6,"0")}}/>
<span style={{fontSize:11,color:"#CBD5E1"}}>{l.name}</span>
</div>
);})}
</div>
<div style={{padding:"16px 20px"}}>
<div style={{display:"flex",flexWrap:"wrap",gap:8}}>
{R.map(function(r){return(
<button key={r.id} onClick={function(){setActive(active===r.id?null:r.id);}} style={{background:active===r.id?"rgba(255,255,255,0.08)":C.bg,border:"1px solid "+(active===r.id?"#"+r.hex:C.border),borderRadius:6,padding:"8px 12px",cursor:"pointer",flex:"1 1 170px",textAlign:"left"}}>
<div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
<div style={{width:14,height:3,background:"#"+r.hex,borderRadius:2}}/>
<span style={{fontSize:12,fontWeight:600,color:"#"+r.hex}}>{r.label}</span>
</div>
<div style={{fontSize:12,color:C.amber,marginBottom:2,fontWeight:700}}>{r.miles} | {r.days}</div>
<p style={{fontSize:11,color:C.slate,lineHeight:1.4,margin:0}}>{r.desc}</p>
</button>
);})}
</div>
<div style={{marginTop:14,padding:"14px 18px",background:C.cyan+"15",border:"1px solid "+C.cyan+"55",borderRadius:6,fontSize:15,color:C.white,lineHeight:1.65}}>
<strong>Total: {totalMiles} nautical miles of shipping routes.</strong> Korean-route gasoline alone travels 12,300 nm (14,150 statute miles) on ships burning heavy fuel oil. The India direct route covers 8,500 nm. The Bahamas Jones Act workaround adds 5,100 nm of unnecessary travel.
</div>
</div>
</div>
<div style={{marginTop:8,fontSize:11,color:C.slate,textAlign:"right"}}>Earth imagery: NASA Blue Marble (public domain)</div>
</div>
);}
