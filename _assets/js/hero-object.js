(function () {
'use strict';
var VERT = 'attribute vec2 p; void main(){ gl_Position=vec4(p,0.,1.); }';
var FRAG = [
'precision highp float;',
'uniform vec2 iRes; uniform float iTime; uniform vec3 accent; uniform float dist; uniform vec3 baseCol; uniform float lightBg; uniform float thick; uniform float ink;',
'mat2 rot(float a){ float c=cos(a),s=sin(a); return mat2(c,-s,s,c); }',
'float torus(vec3 p, vec2 t){ vec2 q=vec2(length(p.xz)-t.x,p.y); return length(q)-t.y; }',
'float map(vec3 p){',
'  float T=iTime;',
'__SHAPE__',
'}',
'float glowMap(vec3 p){',
'  float T=iTime;',
'__GLOW__',
'}',
'vec3 nrm(vec3 p){ vec2 e=vec2(1e-3,0.);',
'  return normalize(vec3(map(p+e.xyy)-map(p-e.xyy), map(p+e.yxy)-map(p-e.yxy), map(p+e.yyx)-map(p-e.yyx))); }',
'float shadow(vec3 ro, vec3 rd){ float res=1.,t=.05;',
'  for(int i=0;i<32;i++){ float h=map(ro+rd*t); res=min(res,10.*h/t); t+=clamp(h,.02,.28);',
'    if(res<.003||t>9.) break; } return clamp(res,0.,1.); }',
'float ao(vec3 p, vec3 n){ float o=0.,s=1.;',
'  for(int i=0;i<5;i++){ float h=.02+.11*float(i); o+=(h-map(p+n*h))*s; s*=.72; }',
'  return clamp(1.-1.4*o,0.,1.); }',
'void main(){',
'  vec2 uv=(gl_FragCoord.xy-.5*iRes)/iRes.y;',
'  vec3 ro=vec3(0.,0.,dist); vec3 rd=normalize(vec3(uv,-1.7));',
'  float t=0.; bool hit=false; float glo=0.;',
'  for(int i=0;i<96;i++){ vec3 q=ro+rd*t; float d=map(q); float gd=max(glowMap(q),0.);',
'    glo += max(d,.02) * (1.0/(1.0+58.0*gd*gd));',
'    if(d<.0014){hit=true;break;} t+=d; if(t>13.) break; }',
'  glo=clamp(glo*.42,0.,1.6);',
'  vec2 vq=(gl_FragCoord.xy/iRes)*2.-1.;',
'  glo*=pow(max(1.-vq.x*vq.x,0.),1.15)*pow(max(1.-vq.y*vq.y,0.),1.15);',
'  if(!hit){ vec3 h=accent*glo*(1.05-.35*lightBg); gl_FragColor=vec4(pow(max(h,0.),vec3(.4545)), clamp(glo*(.85+.75*lightBg),0.,1.)*mix(1.0,ink,lightBg)); return; }',
'  vec3 p=ro+rd*t, n=nrm(p), v=-rd;',
'  vec3 l=normalize(vec3(2.6,3.4,3.0)-p);',
'  float dif=clamp(dot(n,l),0.,1.), sh=shadow(p+n*.02,l), occ=ao(p,n);',
'  vec3 h=normalize(l+v);',
'  float spe=pow(clamp(dot(n,h),0.,1.),84.)*1.15;',
'  float fres=pow(1.-clamp(dot(n,v),0.,1.),3.4);',
'  float rim=pow(1.-clamp(dot(n,v),0.,1.),1.7);',
'  vec3 base=baseCol;',
'  vec3 col=base*(.055+.95*dif*sh)*occ;',
'  col+=vec3(.55,.68,1.)*.16*occ*(.5+.5*n.y)*(1.-.92*lightBg);',
'  col+=accent*rim*(.38+.55*lightBg)*occ;',
'  col+=vec3(1.)*spe*sh*(1.-.78*lightBg);',
'  col+=accent*fres*(.30+.35*lightBg);',
'  float em=smoothstep(.055,0.,max(glowMap(p),0.));',
'  col+=accent*em*(1.45-.45*lightBg);',
'  col+=vec3(1.)*em*em*(.34-.20*lightBg);',
'  col+=accent*glo*(.55-.18*lightBg);',
'  col=pow(max(col,0.),vec3(.4545));',
'  col*=(1.-.25*lightBg);',
'  gl_FragColor=vec4(col, mix(clamp(exp(-.0050*t*t*t),0.,1.), ink, lightBg));',
'}'
];
var SHAPES = {
gimbal: [
'  vec3 a=p; a.xz*=rot(T*.33); a.yz*=rot(.52);      float r1=torus(a, vec2(1.46,.052));',
'  vec3 b=p; b.xy*=rot(T*.25+1.1); b.yz*=rot(1.5708); float r2=torus(b, vec2(1.14,.046));',
'  vec3 c=p; c.yz*=rot(T*.40+2.2); c.xz*=rot(1.5708); float r3=torus(c, vec2(.86,.040));',
'  vec3 g=p; g.xz*=rot(-T*.5); g.yz*=rot(T*.2);',
'  float s=7.0;',
'  float gy=(abs(dot(sin(g*s), cos(g.zxy*s)))-.55)/s;',
'  float core=max(length(g)-.46, gy*.7);',
'  return min(min(r1,r2), min(r3,core));'
],
globe: [
'  vec3 g=p; g.xz*=rot(T*.16); g.yz*=rot(.30);',
'  float r=length(g)+1e-4, R=1.05;',
'  float la=asin(clamp(g.y/r,-1.,1.)), lo=atan(g.z,g.x);',
'  float NLA=7.0, NLO=14.0, ca=max(cos(la),.20);',
'  float dla=abs(fract(la*NLA/3.14159265+.5)-.5)*3.14159265/NLA*r;',
'  float dlo=abs(fract(lo*NLO/6.28318531+.5)-.5)*6.28318531/NLO*ca*r;',
'  float band=abs(r-R);',
'  float wire=max(band-.008, min(dla,dlo)-.0050);',
'  float node=length(vec3(dla,band,dlo))-.036;',
'  return min(wire,node)*.55;'
],
nodes: [
'  vec3 g=p; g.xy*=rot(.26); g.xz*=rot(T*.17); g.yz*=rot(.50);',
'  float R=.94, N=3.0, cell=2.0*R/N;',
'  vec3 a=abs(g);',
'  float m=max(a.x,max(a.y,a.z));',
'  float shell=abs(m-R);',
'  vec3 q=abs(fract(g/cell+.5)-.5)*cell;',
'  vec3 sel=step(vec3(m-.004), a);',
'  vec3 tn=q*(1.0-sel);',
'  vec3 tl=tn+sel*9.0;',
'  float lineD=min(tl.x,min(tl.y,tl.z));',
'  float wire=max(shell-.009, lineD-.0055);',
'  float bead=length(vec2(length(tn), shell))-.036;',
'  return min(wire, bead)*.55;'
],
board: [
"  vec3 g=p; g.xz*=rot(-.34+.10*sin(T*.30)); g.yz*=rot(1.12+.07*sin(T*.23));",
"  vec3 b=abs(g)-vec3(1.02,.055,.86);",
"  float plate=length(max(b,0.))+min(max(b.x,max(b.y,b.z)),0.)-.055;",
"  float leds=1e5;",
"  for(int i=0;i<25;i++){",
"    float fi=float(i);",
"    vec2 id=vec2(mod(fi,5.)-2., floor(fi/5.)-2.);",
"    vec3 q=g-vec3(id.x*.30, -.128, id.y*.26);",
"    leds=min(leds, (length(q*vec3(1.,1.5,1.))-.115)/1.5);",
"  }",
"  float pin=1e5;",
"  for(int i=0;i<3;i++){ float fi=float(i);",
"    vec3 q=g-vec3(-.52+fi*.52, -.10, .86);",
"    vec3 e=abs(q)-vec3(.13,.02,.07);",
"    pin=min(pin, length(max(e,0.))+min(max(e.x,max(e.y,e.z)),0.)-.02); }",
"  return min(plate, min(leds, pin));"
],
cube: [
'  vec3 g=p; g.xz*=rot(T*.24); g.yz*=rot(.46);',
'  float d=1e5;',
'  for(int i=0;i<27;i++){',
'    float fi=float(i);',
'    vec3 id=vec3(mod(fi,3.)-1., mod(floor(fi/3.),3.)-1., floor(fi/9.)-1.);',
'    float push=1.0+.22*(abs(id.x)+abs(id.y)+abs(id.z))+.07*sin(T*.7+fi*.5);',
'    vec3 q=g-id*.62*push;',
'    vec3 b=abs(q)-vec3(.20);',
'    d=min(d, length(max(b,0.))+min(max(b.x,max(b.y,b.z)),0.)-.045);',
'  }',
'  return d;'
],
wave: [
'  vec3 g=p; g.xz*=rot(T*.20); g.yz*=rot(.56);',
'  float an=atan(g.z,g.x), rr=length(g.xz);',
'  float band=rr-(1.02+.20*sin(an*2.0+T*.35));',
'  float hh=g.y-.40*sin(an*3.0+T*.55);',
'  float ribbon=max(abs(hh)*.52-.050, abs(band)-.26);',
'  return ribbon;'
],
slab: [
'  vec3 g=p; g.xz*=rot(T*.22); g.yz*=rot(.46);',
'  float d=1e5;',
'  for(int i=0;i<3;i++){ float fi=float(i);',
'    float ph=T*.55+fi*2.1;',
'    float sw=.30+fi*.34;',
'    vec3 q=g-vec3(.15*sin(ph)*sw, -.40+fi*.40, .11*cos(ph)*sw);',
'    q.xz*=rot(fi*.17+.06*sin(ph));',
'    vec3 e=abs(q)-vec3(.88,.055,.64);',
'    d=min(d, length(max(e,0.))+min(max(e.x,max(e.y,e.z)),0.)-.035); }',
'  return d;'
],
blocks: [
'  vec3 g=p; g.xz*=rot(T*.26); g.yz*=rot(.42);',
'  float d=1e5; ',
'  for(int i=0;i<4;i++){',
'    float fi=float(i);',
'    vec3 q=g-vec3(sin(fi*1.9)*.16, .96-fi*.52, cos(fi*1.5)*.14);',
'    q.xz*=rot(fi*.26+T*.10);',
'    vec3 b=abs(q)-vec3(.66,.16,.34);',
'    float slab=length(max(b,0.))+min(max(b.x,max(b.y,b.z)),0.)-.075;',
'    vec3 k=q-vec3(-.28,.22,0.);',
'    float knob=length(vec2(length(k.xz)-.0,k.y*1.6))-.13;',
'    d=min(d, min(slab, knob));',
'  }',
'  return d;'
],
phonics: [
'  vec3 g=p; g.xz*=rot(T*.21); g.yz*=rot(.40);',
'  float PHI=1.6180339;',
'  float k=1.06/sqrt(1.0+PHI*PHI);',
'  vec3 q=abs(g);',
'  float v=min(length(q-vec3(0.,1.,PHI)*k), min(length(q-vec3(1.,PHI,0.)*k), length(q-vec3(PHI,0.,1.)*k)))-.145;',
'  float s=3.1;',
'  float cage=(abs(dot(sin(g*s), cos(g.zxy*s)))-.42)/s;',
'  float shell=max(abs(length(g)-1.06)-.038, cage*.62);',
'  return min(v, shell);'
],
book: [
'  vec3 g=p; g.xz*=rot(-.62); g.yz*=rot(.50); g.y+=.12;',
'  vec3 a=g-vec3(-.50,-.34,0.); a.xy*=rot(-.16);',
'  vec3 da=abs(a)-vec3(.60,.042,.44);',
'  float pl=length(max(da,0.))+min(max(da.x,max(da.y,da.z)),0.)-.030;',
'  vec3 b=g-vec3( .50,-.34,0.); b.xy*=rot( .16);',
'  vec3 db=abs(b)-vec3(.60,.042,.44);',
'  float pr=length(max(db,0.))+min(max(db.x,max(db.y,db.z)),0.)-.030;',
'  vec3 sp=g-vec3(0.,-.36,0.);',
'  float spine=length(vec2(length(sp.xz*vec2(.30,1.))-.0, sp.y))-.055;',
'  vec3 m=g-vec3(.20,-.02,-.04);',
'  float mt=max(length(m.xz)*1.20+m.y*.88-.42, -m.y-.30);',
'  float tr=1e5;',
'  for(int i=0;i<3;i++){ float fi=float(i);',
'    vec3 t=g-vec3(-.44+fi*.30, -.06+fi*.03, .16-fi*.14);',
'    float cone=max(length(t.xz)*1.85+t.y*.62-.235, -t.y-.30);',
'    float trunk=max(length(t.xz)-.032, abs(t.y+.255)-.075);',
'    tr=min(tr, min(cone,trunk)); }',
'  vec3 bd=g-vec3(-.26+.16*sin(T*.50), .74+.055*sin(T*.95), .14*cos(T*.50));',
'  bd.xz*=rot(-.35+.30*sin(T*.50));',
'  float body=length(bd*vec3(1.,1.55,1.15))-.070;',
'  float wing=length(vec3(abs(bd.x)-.105, bd.y-.055*sin(T*3.4), bd.z)*vec3(1.,3.4,1.5))-.058;',
'  return min(min(min(pl,pr), min(spine, min(mt,tr))), min(body,wing));'
],
frames: [
'  vec3 g=p; g.xz*=rot(-.42+.10*sin(T*.28)); g.yz*=rot(.30+.06*sin(T*.21));',
'  float d=1e5;',
'  for(int i=0;i<3;i++){',
'    float fi=float(i);',
'    vec3 q=g-vec3(-.30+fi*.30, .26-fi*.26, -.34+fi*.34);',
'    vec3 e=abs(q)-vec3(.74,.50,.028);',
'    float outer=length(max(e,0.))+min(max(e.x,max(e.y,e.z)),0.)-.030;',
'    vec3 h=abs(q)-vec3(.63,.39,.09);',
'    float inner=length(max(h,0.))+min(max(h.x,max(h.y,h.z)),0.)-.030;',
'    d=min(d, max(outer, -inner));',
'  }',
'  return d;'
]
};
var GLOWS = {
gimbal: [
'  vec3 g=p; g.xz*=rot(-T*.5); g.yz*=rot(T*.2);',
'  float s=7.0;',
'  float gy=(abs(dot(sin(g*s), cos(g.zxy*s)))-.55)/s;',
'  return max(length(g)-.46, gy*.7);'
],
globe: [
'  vec3 g=p; g.xz*=rot(T*.16); g.yz*=rot(.30);',
'  float r=length(g)+1e-4, R=1.05;',
'  float la=asin(clamp(g.y/r,-1.,1.)), lo=atan(g.z,g.x);',
'  float NLA=7.0, NLO=14.0, ca=max(cos(la),.20);',
'  float dla=abs(fract(la*NLA/3.14159265+.5)-.5)*3.14159265/NLA*r;',
'  float dlo=abs(fract(lo*NLO/6.28318531+.5)-.5)*6.28318531/NLO*ca*r;',
'  float band=abs(r-R);',
'  float bead=(length(vec3(dla,band,dlo))-.030)*1.9;',
'  float line=(max(band-.008, min(dla,dlo)-.005))*3.4;',
'  return min(bead, line);'
],
nodes: [
'  vec3 g=p; g.xy*=rot(.26); g.xz*=rot(T*.17); g.yz*=rot(.50);',
'  float R=.94, N=3.0, cell=2.0*R/N;',
'  vec3 a=abs(g);',
'  float m=max(a.x,max(a.y,a.z));',
'  float shell=abs(m-R);',
'  vec3 q=abs(fract(g/cell+.5)-.5)*cell;',
'  vec3 sel=step(vec3(m-.004), a);',
'  vec3 tn=q*(1.0-sel);',
'  vec3 tl=tn+sel*9.0;',
'  float bead=(length(vec2(length(tn), shell))-.030)*1.9;',
'  float line=(max(shell-.009, min(tl.x,min(tl.y,tl.z))-.0055))*3.4;',
'  return min(bead, line);'
],
cube: [
'  vec3 g=p; g.xz*=rot(T*.24); g.yz*=rot(.46);',
'  vec3 b=abs(g)-vec3(.205);',
'  return length(max(b,0.))+min(max(b.x,max(b.y,b.z)),0.)-.045;'
],
wave: [
'  vec3 g=p; g.xz*=rot(T*.20); g.yz*=rot(.56);',
'  float an=atan(g.z,g.x), rr=length(g.xz);',
'  float band=rr-(1.02+.20*sin(an*2.0+T*.35));',
'  float hh=g.y-.40*sin(an*3.0+T*.55);',
'  return max(abs(hh)*.52-.052, abs(abs(band)-.245)-.022);'
],
board: [
'  vec3 g=p; g.xz*=rot(-.34+.10*sin(T*.30)); g.yz*=rot(1.12+.07*sin(T*.23));',
'  float leds=1e5;',
'  for(int i=0;i<25;i++){',
'    float fi=float(i);',
'    vec2 id=vec2(mod(fi,5.)-2., floor(fi/5.)-2.);',
'    vec3 q=g-vec3(id.x*.30, -.128, id.y*.26);',
'    leds=min(leds, (length(q*vec3(1.,1.5,1.))-.128)/1.5);',
'  }',
'  return leds;'
],
slab: [
'  vec3 g=p; g.xz*=rot(T*.22); g.yz*=rot(.46);',
'  float ph=T*.55+2.*2.1;',
'  vec3 q=g-vec3(.15*sin(ph)*.98, .40, .11*cos(ph)*.98);',
'  q.xz*=rot(2.*.17+.06*sin(ph));',
'  vec3 e=abs(q-vec3(0.,.055,-.34+.30*(.5+.5*sin(T*.8))))-vec3(.66,.013,.075);',
'  return length(max(e,0.))+min(max(e.x,max(e.y,e.z)),0.)-.012;'
],
frames: [
'  vec3 g=p; g.xz*=rot(-.42+.10*sin(T*.28)); g.yz*=rot(.30+.06*sin(T*.21));',
'  vec3 q=g-vec3(.30, -.26, .34);',
'  vec3 e=abs(q)-vec3(.70,.46,.024);',
'  float outer=length(max(e,0.))+min(max(e.x,max(e.y,e.z)),0.)-.026;',
'  vec3 h=abs(q)-vec3(.645,.405,.075);',
'  float inner=length(max(h,0.))+min(max(h.x,max(h.y,h.z)),0.)-.026;',
'  return max(outer, -inner);'
]
};
var NO_GLOW = ['  return 1e5;'];
var SCALE = { gimbal: 1.070, wave: 1.337, cube: 0.660, nodes: 0.870, slab: 1.224, globe: 1.000, frames: 1.430, board: 0.950 };
var THICK = { gimbal: 0.0045, wave: 0.003, cube: 0.002, nodes: 0.0015, slab: 0.002,
globe: 0.004, frames: 0.005, board: 0.003, phonics: 0.004, book: 0.002 };
var INK = { gimbal: 0.72, wave: 0.80, cube: 0.68, nodes: 1.0, slab: 0.78,
globe: 1.0, frames: 0.90, board: 0.90, phonics: 1.0, book: 0.90 };
function fragFor(name) {
var body = SHAPES[name] || SHAPES.gimbal;
var glow = GLOWS[name] || NO_GLOW;
var k = SCALE[name] || 1.0;
var wrap = function (lines, tail) {
var pre = ['  p/=' + k.toFixed(3) + ';'], j, out2 = [];
tail = tail || '';
for (j = 0; j < lines.length; j++) {
out2.push(lines[j].replace(/return\s+([\s\S]+);\s*$/, 'return ' + k.toFixed(3) + '*(' + '$1' + ')' + tail + ';'));
}
return pre.concat(out2);
};
var out = [], i;
for (i = 0; i < FRAG.length; i++) {
if (FRAG[i] === '__SHAPE__') { out = out.concat(wrap(body, ' - thick')); }
else if (FRAG[i] === '__GLOW__') { out = out.concat(wrap(glow)); }
else { out.push(FRAG[i]); }
}
return out.join('\n');
}
function toRGB(css) {
var m = /^#([0-9a-f]{6})$/i.exec((css || '').trim());
if (m) {
var v = parseInt(m[1], 16);
return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255];
}
m = /rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/.exec(css || '');
if (m) return [+m[1] / 255, +m[2] / 255, +m[3] / 255];
return [0.40, 0.58, 1.0];
}
function boot(header) {
var shape = header.getAttribute('data-object') || 'gimbal';
if (header.querySelector('canvas.hero-object')) return;
var cv = document.createElement('canvas');
cv.className = 'hero-object';
cv.setAttribute('aria-hidden', 'true');
var gl = cv.getContext('webgl', { antialias: false, alpha: true });
if (!gl) return;
var host = header.querySelector('.hero-scene') || header;
host.insertBefore(cv, host.firstChild);
function sh(type, src) {
var o = gl.createShader(type);
gl.shaderSource(o, src); gl.compileShader(o);
if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) { console.error(gl.getShaderInfoLog(o)); return null; }
return o;
}
var vs = sh(gl.VERTEX_SHADER, VERT), fs = sh(gl.FRAGMENT_SHADER, fragFor(shape));
if (!vs || !fs) { cv.remove(); return; }
var pr = gl.createProgram();
gl.attachShader(pr, vs); gl.attachShader(pr, fs); gl.linkProgram(pr); gl.useProgram(pr);
var buf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buf);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
var loc = gl.getAttribLocation(pr, 'p');
gl.enableVertexAttribArray(loc);
gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
var uR = gl.getUniformLocation(pr, 'iRes'),
uT = gl.getUniformLocation(pr, 'iTime'),
uA = gl.getUniformLocation(pr, 'accent'),
uD = gl.getUniformLocation(pr, 'dist'),
uB = gl.getUniformLocation(pr, 'baseCol');
var uL = gl.getUniformLocation(pr, 'lightBg');
var uK = gl.getUniformLocation(pr, 'thick');
var uI = gl.getUniformLocation(pr, 'ink');
var rootCS = getComputedStyle(document.documentElement), hostCS = getComputedStyle(header);
var accentCss = hostCS.getPropertyValue('--level').trim() || hostCS.getPropertyValue('--_accent').trim()
|| rootCS.getPropertyValue('--_accent').trim() || rootCS.getPropertyValue('--color-accent').trim();
var accent = toRGB(accentCss);
var dist = 6.35;
var isHero = header.classList.contains('hero');
var lightScene = header.classList.contains('is-soft3d') || header.getAttribute('data-scene') === 'light';
var baseCol = lightScene ? [accent[0] * 0.20 + 0.03, accent[1] * 0.20 + 0.03, accent[2] * 0.22 + 0.05]
: !isHero    ? [0.95, 0.96, 1.0]
: [0.54, 0.62, 0.80];
var still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
function size() {
var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
var w = cv.clientWidth || host.clientWidth || 720;
var h = cv.clientHeight || host.clientHeight || 360;
cv.width = Math.max(240, Math.round(w * dpr));
cv.height = Math.max(120, Math.round(h * dpr));
gl.viewport(0, 0, cv.width, cv.height);
}
addEventListener('resize', function () { size(); draw(); });
size();
var t0 = performance.now(), running = false, raf = 0;
function draw() {
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.uniform2f(uR, cv.width, cv.height);
gl.uniform1f(uT, still ? 1.4 : (performance.now() - t0) / 1000);
gl.uniform3f(uA, accent[0], accent[1], accent[2]);
gl.uniform1f(uD, dist);
gl.uniform3f(uB, baseCol[0], baseCol[1], baseCol[2]);
gl.uniform1f(uL, lightScene ? 1.0 : 0.0);
gl.uniform1f(uK, lightScene ? (THICK[shape] || 0.003) : 0.0);
gl.uniform1f(uI, lightScene ? (INK[shape] || 1.0) : 1.0);
gl.drawArrays(gl.TRIANGLES, 0, 3);
}
function loop() { draw(); if (running) raf = requestAnimationFrame(loop); }
function start() { if (running || still) return; running = true; loop(); }
function stop() { running = false; if (raf) cancelAnimationFrame(raf); }
draw();
var woke = header.getBoundingClientRect().height > 1;
if ('ResizeObserver' in window) new ResizeObserver(function () {
size();
if (!woke && header.getBoundingClientRect().height > 1) { woke = true; draw(); start(); }
else if (still) draw();
}).observe(header);
if (still) return;
if ('IntersectionObserver' in window) {
new IntersectionObserver(function (es) {
es[0].isIntersecting ? start() : stop();
}, { threshold: 0 }).observe(header);
} else {
start();
}
document.addEventListener('visibilitychange', function () {
document.hidden ? stop() : start();
});
}
function init() {
var host = document.querySelector('.app-header[data-object], [data-hero-object]');
if (host) boot(host);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
})();
