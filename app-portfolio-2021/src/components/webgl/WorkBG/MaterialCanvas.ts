import { text } from 'stream/consumers';
import {
  CanvasTexture,
  DoubleSide,
  FrontSide,
  LinearFilter,
  MirroredRepeatWrapping,
  RepeatWrapping,
  ShaderMaterial,
  UVMapping,
  Vector2,
} from 'three';

const simplexNoise3D = `
//	Simplex 3D Noise 
//	by Ian McEwan, Ashima Arts
//
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){ 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //  x0 = x0 - 0. + 0.0 * C 
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1. + 3.0 * C.xxx;

// Permutations
  i = mod(i, 289.0 ); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients
// ( N*N points uniformly over a square, mapped onto an octahedron.)
  float n_ = 1.0/7.0; // N=7
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}
`;

export default class MaterialCanvas {
  canvas: HTMLCanvasElement;
  width: number = 1;
  height: number = 1;
  texture: CanvasTexture;
  material: ShaderMaterial;
  content: string = 'sungryeol';
  constructor() {
    this.canvas = document.createElement('canvas');
    const { width: textWidth, height: textHeight } = this.setFont(80, 'arial');
    this.width = textWidth;
    this.height = textHeight;
    this.texture = new CanvasTexture(this.canvas);
    this.draw();

    this.texture.offset.set(0, 0);
    this.texture.wrapS = this.texture.wrapT = RepeatWrapping;
    this.texture.repeat.set(100, 100);
    this.texture.mapping = UVMapping;
    this.texture.minFilter = LinearFilter;
    this.texture.needsUpdate = true;
    this.material = new ShaderMaterial({
      transparent: true,
      side: FrontSide,
      uniforms: {
        map: { value: this.texture },
        uTime: { value: 0 },
        uIntensity: { value: 0.1 },
        uRepeat: { value: 100 },
      },
      vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPositionNormal;
      uniform float uTime;
      uniform float uIntensity;

      ${simplexNoise3D}
      
      void main() 
      {
        float t = uTime * 0.0001;
        // convert uv attribute to vUv varying
        vUv = uv;
        vNormal = normalize( normalMatrix * normal );
        vec3 pos = position;
        vec3 mpos = vec3(pos.x + t, pos.y + t, pos.z);
        float n = (snoise(mpos) - 0.5) * uIntensity;
        pos.x += n;
        pos.y += n;
        pos.z += n;
        vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
        vPositionNormal = normalize(( mvPosition ).xyz);
        gl_Position = projectionMatrix * mvPosition;
      }
      `,
      fragmentShader: `
      varying vec2 vUv;
      uniform sampler2D map;
      uniform float uRepeat;
      void main() {
        gl_FragColor = texture2D(map, vUv * uRepeat);
      }
      `,
    });
  }
  get ctx() {
    return this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }
  setFont(px: number, fontFamily: string) {
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';
    this.ctx.font = `${px}px ${fontFamily}`;
    const { width } = this.ctx.measureText(this.content);
    return { width, height: px };
  }
  draw() {
    this.ctx.fillStyle = 'lightgray';
    this.ctx.fillText(this.content, 0, 0);

    if (
      process.env.NODE_ENV === 'test' ||
      process.env.NODE_ENV === 'development'
    )
      console.log(
        '%c   ',
        `font-size:100px;background-image:url(${this.canvas.toDataURL()});background-size:cover;border:solid 1px red;`
      );
  }
}
