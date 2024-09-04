

export const vertex = `
    varying vec2 vUv;
    uniform float iTime;
    varying float iTimeVarying;

    //	Simplex 3D Noise 
    //	by Ian McEwan, Stefan Gustavson (https://github.com/stegu/webgl-noise)
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
    
    
    void main() {
        vec2 uvCoord = uv * vec2(0.9, 1.5);
        float noise = snoise(vec3(uvCoord.x * iTime  * 0.3, uvCoord.y * iTime  * 0.2 , iTime));
        float tilt = uvCoord.y * -1.0;
        vUv = uv;
        iTimeVarying = iTime;

        vec3 newPos = vec3(position.x, position.y, position.z + noise * 0.5 + tilt);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
    }
`

export const fragment = `
    precision mediump float;

    varying float iTimeVarying;
    uniform vec2 iResolution;
    varying vec2 vUv;

    #define S(a,b,t) smoothstep(a,b,t)

    mat2 Rot(float a) {
        float s = sin(a);
        float c = cos(a);
        return mat2(c, -s, s, c);
    }

    vec2 hash(vec2 p) {
        p = vec2(dot(p,vec2(2127.1,81.17)), dot(p,vec2(1269.5,283.37)));
        return fract(sin(p)*43758.5453);
    }

    float noise(in vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        
        vec2 u = f*f*(3.0-2.0*f);
        float n = mix(mix(dot(-1.0+2.0*hash(i + vec2(0.0,0.0)), f - vec2(0.0,0.0)), 
                          dot(-1.0+2.0*hash(i + vec2(1.0,0.0)), f - vec2(1.0,0.0)), u.x),
                      mix(dot(-1.0+2.0*hash(i + vec2(0.0,1.0)), f - vec2(0.0,1.0)), 
                          dot(-1.0+2.0*hash(i + vec2(1.0,1.0)), f - vec2(1.0,1.0)), u.x), u.y);
        return 0.5 + 0.5*n;
    }

    void main() {
        vec2 fragCoord = vUv * iResolution;
        vec2 uv = fragCoord/iResolution.xy;
        float ratio = iResolution.x / iResolution.y;
        vec2 tuv = uv;
        tuv -= .5;
        
        float degree = noise(vec2(iTimeVarying*.1, tuv.x*tuv.y));
        tuv.y *= 1./ratio;
        tuv *= Rot(radians((degree-.5)*720.+180.));
        tuv.y *= ratio;
        
        float frequency = 5.;
        float amplitude = 30.;
        float speed = iTimeVarying * 2.;
        tuv.x += sin(tuv.y*frequency+speed)/amplitude;
        tuv.y += sin(tuv.x*frequency*1.5+speed)/(amplitude*.5);
        
        // Updated color definitions (converted from hex to RGB, normalized to 0-1)
        vec3 color1 = vec3(0.000, 0.000, 0.999);  // EDE3F7
        vec3 color2 = vec3(0.874, 0.968, 0.776);  // B9CC7C
        vec3 color3 = vec3(0.925, 0.509, 0.933);  // C77869
        vec3 color4 = vec3(0.768, 0.364, 0.192);  // C47AAB
        vec3 color5 = vec3(0.933, 0.858, 0.172);  // A0D1EA
        vec3 color6 = vec3(0.090, 0.545, 0.874);  // 9596A1
        
        // Create three layers using pairs of colors
        vec3 layer1 = mix(color1, color2, S(-.3, .2, (tuv*Rot(radians(-5.))).x));
        vec3 layer2 = mix(color3, color4, S(-.3, .2, (tuv*Rot(radians(5.))).x));
        vec3 layer3 = mix(color5, color6, S(-.3, .2, (tuv*Rot(radians(0.))).x));
        
        // Mix the layers
        vec3 finalComp = mix(layer1, layer2, S(.5, -.3, tuv.y));
        finalComp = mix(finalComp, layer3, S(-.2, .4, sin(tuv.x*3.+iTimeVarying)));
        
        vec3 col = finalComp;
        
        gl_FragColor = vec4(col, 1.0);
    }
`