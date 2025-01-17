export const vertex = `
    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`

export const fragment = `
    precision mediump float;

    uniform float iTime;
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
        
        float degree = noise(vec2(iTime*.1, tuv.x*tuv.y));
        tuv.y *= 1./ratio;
        tuv *= Rot(radians((degree-.5)*720.+180.));
        tuv.y *= ratio;
        
        float frequency = 5.;
        float amplitude = 30.;
        float speed = iTime * 2.;
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
        finalComp = mix(finalComp, layer3, S(-.2, .4, sin(tuv.x*3.+iTime)));
        
        vec3 col = finalComp;
        
        gl_FragColor = vec4(col, 1.0);
    }
`