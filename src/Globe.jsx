import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

const C={coral:"#FF6B6B",amber:"#FBBF24",green:"#34D399",teal:"#2DD4BF",blue:"#60A5FA",purple:"#A78BFA",orange:"#FB923C",cyan:"#22D3EE",white:"#F8FAFC",slate:"#94A3B8",bg:"#0F172A",card:"#1E293B",border:"#334155"};

function ll2xyz(lat,lon,r=1.01){
  const p=(90-lat)*Math.PI/180;
  const t=(lon+180)*Math.PI/180;
  return new THREE.Vector3(-r*Math.sin(p)*Math.cos(t),r*Math.cos(p),r*Math.sin(p)*Math.sin(t));
}

function makeArc(lat1,lon1,lat2,lon2,color,h=0.2){
  const pts=[];
  for(let i=0;i<=80;i++){
    const t=i/80;
    const lat=lat1+(lat2-lat1)*t;
    const lon=lon1+(lon2-lon1)*t;
    const alt=1.01+Math.sin(t*Math.PI)*h;
    const p=(90-lat)*Math.PI/180;
    const th=(lon+180)*Math.PI/180;
    pts.push(new THREE.Vector3(-alt*Math.sin(p)*Math.cos(th),alt*Math.cos(p),alt*Math.sin(p)*Math.sin(th)));
  }
  const geo=new THREE.BufferGeometry().setFromPoints(pts);
  return new THREE.Line(geo,new THREE.LineBasicMaterial({color,transparent:true,opacity:0.9}));
}

function makeContinent(coords,r=1.005){
  const pts=coords.map(([lat,lon])=>ll2xyz(lat,lon,r));
  pts.push(pts[0]);
  const geo=new THREE.BufferGeometry().setFromPoints(pts);
  return new THREE.Line(geo,new THREE.LineBasicMaterial({color:0x2a5a3a,transparent:true,opacity:0.6}));
}

function makeLandFill(coords,r=1.004){
  const shape=new THREE.Shape();
  const pts2d=coords.map(([lat,lon])=>[lon*Math.PI/180,lat*Math.PI/180]);
  shape.moveTo(pts2d[0][0],pts2d[0][1]);
  for(let i=1;i<pts2d.length;i++)shape.lineTo(pts2d[i][0],pts2d[i][1]);
  shape.lineTo(pts2d[0][0],pts2d[0][1]);
  return null;
}

const continents={
  namerica:[[70,-168],[72,-140],[70,-120],[60,-140],[55,-130],[48,-125],[38,-122],[32,-117],[25,-110],[20,-105],[18,-97],[20,-87],[25,-80],[30,-82],[30,-85],[35,-75],[40,-74],[42,-70],[45,-67],[47,-65],[50,-60],[52,-55],[55,-60],[60,-65],[60,-75],[58,-80],[55,-85],[58,-95],[60,-110],[62,-115],[65,-140],[70,-165]],
  samerica:[[12,-72],[10,-75],[7,-77],[2,-79],[-5,-80],[-15,-76],[-23,-70],[-33,-72],[-42,-65],[-52,-70],[-55,-68],[-55,-64],[-50,-65],[-42,-63],[-35,-57],[-25,-48],[-22,-40],[-12,-37],[-5,-35],[0,-50],[5,-60],[8,-62],[10,-67]],
  europe:[[36,-10],[38,0],[43,5],[44,8],[46,15],[48,17],[52,14],[54,10],[56,12],[58,18],[60,25],[65,25],[70,30],[72,28],[72,20],[65,14],[58,8],[56,5],[52,5],[50,0],[48,-5],[44,-8],[38,-10]],
  africa:[[35,-5],[37,10],[33,12],[30,32],[22,37],[12,44],[10,42],[0,42],[-12,40],[-25,35],[-34,27],[-35,18],[-30,16],[-20,12],[-10,14],[0,10],[5,2],[5,-5],[10,-15],[15,-17],[20,-17],[25,-15],[30,-10]],
  asia:[[42,30],[40,50],[38,58],[30,48],[25,55],[22,60],[20,73],[10,78],[8,80],[0,104],[-8,115],[2,110],[8,117],[20,110],[22,114],[30,122],[35,129],[40,130],[45,143],[50,140],[55,135],[60,140],[65,180],[70,180],[72,150],[72,120],[68,80],[65,60],[55,55],[50,40],[45,38],[42,30]],
  australia:[[-12,130],[-15,133],[-20,140],[-25,150],[-30,153],[-35,150],[-38,145],[-38,140],[-35,137],[-32,133],[-28,128],[-25,122],[-20,118],[-15,125]],
};

const routeData=[
  {id:"crude",label:"Crude to Asian Refineries",from:[26,50],to:[35,129],color:0xFB923C,hex:"FB923C",h:0.25,desc:"VLCCs carry crude from Persian Gulf to S. Korea. ~18 days burning HFO/VLSFO."},
  {id:"product",label:"CARBOB to California (Pacific)",from:[35,129],to:[34,-118],color:0xFF6B6B,hex:"FF6B6B",h:0.35,desc:"Product tankers cross entire Pacific. 18-21 days. The longest route."},
  {id:"india",label:"India to California (Direct)",from:[22,70],to:[34,-118],color:0x2DD4BF,hex:"2DD4BF",h:0.30,desc:"Alkylate from Gujarat. ~21 days direct Pacific. No Panama Canal."},
  {id:"gulf",label:"Gulf Coast to Bahamas",from:[29,-95],to:[26,-79],color:0xFBBF24,hex:"FBBF24",h:0.08,desc:"Jones Act workaround. US gas shipped east on US-flagged vessels."},
  {id:"bahamas",label:"Bahamas to California",from:[26,-79],to:[34,-118],color:0xFBBF24,hex:"FBBF24",h:0.15,desc:"Foreign tankers carry US fuel west via Panama Canal. 14-16 days."},
];

const locData=[
  {name:"California",lat:34,lon:-118,color:0xFF6B6B,s:0.035},
  {name:"Houston",lat:29,lon:-95,color:0x34D399,s:0.025},
  {name:"Bahamas",lat:26,lon:-79,color:0xFBBF24,s:0.02},
  {name:"Persian Gulf",lat:26,lon:50,color:0xFB923C,s:0.03},
  {name:"India",lat:22,lon:70,color:0x2DD4BF,s:0.025},
  {name:"S. Korea",lat:35,lon:129,color:0x22D3EE,s:0.025},
];

export default function Globe(){
  const ref=useRef(null);
  const [active,setActive]=useState(null);
  const arcsRef=useRef([]);

  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const w=el.clientWidth,h=Math.min(w*0.7,480);
    const scene=new THREE.Scene();
    const cam=new THREE.PerspectiveCamera(45,w/h,0.1,100);
    cam.position.set(0,0.5,2.8);
    const ren=new THREE.WebGLRenderer({antialias:true,alpha:true});
    ren.setSize(w,h);ren.setPixelRatio(Math.min(window.devicePixelRatio,2));
    el.appendChild(ren.domElement);

    // Ocean globe
    const gm=new THREE.MeshPhongMaterial({color:0x0a1a2e,emissive:0x050e1a,specular:0x222244,shininess:20,transparent:true,opacity:0.95});
    const globe=new THREE.Mesh(new THREE.SphereGeometry(1,64,64),gm);
    scene.add(globe);

    // Graticule
    const gratGroup=new THREE.Group();
    for(let lat=-60;lat<=60;lat+=30){const pts=[];for(let lon=-180;lon<=180;lon+=3)pts.push(ll2xyz(lat,lon,1.003));gratGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({color:0x152540,transparent:true,opacity:0.3})));}
    for(let lon=-180;lon<=150;lon+=30){const pts=[];for(let lat=-80;lat<=80;lat+=3)pts.push(ll2xyz(lat,lon,1.003));gratGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({color:0x152540,transparent:true,opacity:0.3})));}
    scene.add(gratGroup);

    // Continents
    const contGroup=new THREE.Group();
    Object.values(continents).forEach(c=>{contGroup.add(makeContinent(c));});
    scene.add(contGroup);

    // Glow
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(1.06,32,32),new THREE.MeshBasicMaterial({color:0x1a4a7a,transparent:true,opacity:0.07,side:THREE.BackSide})));

    // Lights
    scene.add(new THREE.AmbientLight(0x6080a0,0.5));
    const dl=new THREE.DirectionalLight(0xffffff,0.9);dl.position.set(5,3,5);scene.add(dl);

    // Routes
    const arcArr=[];
    routeData.forEach(r=>{
      const arc=makeArc(r.from[0],r.from[1],r.to[0],r.to[1],r.color,r.h);
      arc.userData={id:r.id};
      scene.add(arc);arcArr.push(arc);
    });
    arcsRef.current=arcArr;

    // Dots
    locData.forEach(l=>{
      const dot=new THREE.Mesh(new THREE.SphereGeometry(l.s,12,12),new THREE.MeshBasicMaterial({color:l.color}));
      dot.position.copy(ll2xyz(l.lat,l.lon,1.01));
      scene.add(dot);
      // Pulse ring
      const ring=new THREE.Mesh(new THREE.RingGeometry(l.s*1.2,l.s*2,16),new THREE.MeshBasicMaterial({color:l.color,transparent:true,opacity:0.3,side:THREE.DoubleSide}));
      ring.position.copy(dot.position);ring.lookAt(0,0,0);
      scene.add(ring);
    });

    // Interaction
    let drag=false,px=0,ry=-0.5,auto=true;
    el.addEventListener("mousedown",e=>{drag=true;px=e.clientX;auto=false;});
    el.addEventListener("mousemove",e=>{if(drag){ry+=(e.clientX-px)*0.005;px=e.clientX;}});
    el.addEventListener("mouseup",()=>drag=false);
    el.addEventListener("mouseleave",()=>drag=false);
    el.addEventListener("touchstart",e=>{drag=true;px=e.touches[0].clientX;auto=false;},{passive:true});
    el.addEventListener("touchmove",e=>{if(drag){ry+=(e.touches[0].clientX-px)*0.005;px=e.touches[0].clientX;}},{passive:true});
    el.addEventListener("touchend",()=>drag=false);

    let fid;
    const anim=()=>{fid=requestAnimationFrame(anim);if(auto)ry+=0.001;
      [globe,gratGroup,contGroup,...arcArr,...scene.children.filter(c=>c.type==="Mesh"&&c.geometry.type==="SphereGeometry"&&c!==globe),...scene.children.filter(c=>c.type==="Mesh"&&c.geometry.type==="RingGeometry")].forEach(o=>{if(o&&o.rotation)o.rotation.y=ry;});
      ren.render(scene,cam);};
    anim();

    const onR=()=>{const nw=el.clientWidth,nh=Math.min(nw*0.7,480);cam.aspect=nw/nh;cam.updateProjectionMatrix();ren.setSize(nw,nh);};
    window.addEventListener("resize",onR);
    return()=>{cancelAnimationFrame(fid);window.removeEventListener("resize",onR);if(el.contains(ren.domElement))el.removeChild(ren.domElement);ren.dispose();};
  },[]);

  useEffect(()=>{arcsRef.current.forEach(a=>{a.material.opacity=active===null||a.userData.id===active?0.9:0.08;});},[active]);

  return(<div style={{maxWidth:900,margin:"0 auto",padding:"26px 24px"}}><div style={{marginBottom:24}}><h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:24,fontWeight:700,color:C.white,borderLeft:"4px solid "+C.cyan,paddingLeft:16}}>Global Supply Routes</h2><p style={{fontSize:15,color:C.slate,marginTop:4,paddingLeft:20}}>Drag to rotate the globe. Click a route below to highlight it.</p></div><div style={{background:C.card,borderRadius:12,border:"1px solid "+C.border,overflow:"hidden"}}><div ref={ref} style={{width:"100%",cursor:"grab",background:"radial-gradient(ellipse at center,#0d1b2a 0%,#060d17 100%)"}}/><div style={{padding:"16px 20px"}}><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{routeData.map(r=>(<button key={r.id} onClick={()=>setActive(active===r.id?null:r.id)} style={{background:active===r.id?"rgba(255,255,255,0.08)":C.bg,border:"1px solid "+(active===r.id?"#"+r.hex:C.border),borderRadius:6,padding:"8px 12px",cursor:"pointer",flex:"1 1 170px",textAlign:"left"}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}><div style={{width:14,height:3,background:"#"+r.hex,borderRadius:2}}/><span style={{fontSize:12,fontWeight:600,color:"#"+r.hex}}>{r.label}</span></div><p style={{fontSize:11,color:C.slate,lineHeight:1.4,margin:0}}>{r.desc}</p></button>))}</div><div style={{marginTop:14,padding:"14px 18px",background:C.cyan+"15",border:"1px solid "+C.cyan+"55",borderRadius:6,fontSize:15,color:C.white,lineHeight:1.65}}><strong>Every line represents emissions.</strong> Crude crosses oceans on VLCCs burning heavy fuel oil. Refined CARBOB crosses the Pacific again. US Gulf gasoline detours through the Bahamas to dodge the Jones Act. California calls this environmental progress.</div></div></div></div>);
}
