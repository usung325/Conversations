precision mediump float;

    uniform float iTime;
    uniform vec2 iResolution;

    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform vec3 uColor4;
    uniform vec3 uColor5;
    uniform vec3 uColor6;

    uniform float uFrequency;
    uniform float uAmplitude;
    uniform float uSpeed;
    uniform float uMixLayer1A;
    uniform float uMixLayer1B;
    uniform float uMixLayer2A;
    uniform float uMixLayer2B;
    uniform float uSinMultiplier;

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
        
        vec2 u = f*f*(3.0-2.0*f) ;
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
        
        float frequency = uFrequency;
        float amplitude = uAmplitude;
        float speed = iTime * uSpeed;
        tuv.x += sin(tuv.y*frequency+speed)/amplitude;
        tuv.y += sin(tuv.x*frequency*1.5+speed)/(amplitude*.5);
        
        // Updated color definitions (converted from hex to RGB, normalized to 0-1)
        vec3 color1 = uColor1;
        vec3 color2 = uColor2;
        vec3 color3 = uColor3;
        vec3 color4 = uColor4;
        vec3 color5 = uColor5;
        vec3 color6 = uColor6;
        
        // Create three layers using pairs of colors
        vec3 layer1 = mix(color1, color2, S(-.3, .2, (tuv*Rot(radians(-5.))).x));
        vec3 layer2 = mix(color3, color4, S(-.3, .2, (tuv*Rot(radians(5.))).x));
        vec3 layer3 = mix(color5, color6, S(-.3, .2, (tuv*Rot(radians(0.))).x));
        
        // Mix the layers
        vec3 finalComp = mix(layer1, layer2, S(uMixLayer1A, uMixLayer1B, tuv.x+iTime));
        finalComp = mix(finalComp, layer3, S(uMixLayer2A, uMixLayer2B, sin(tuv.y*uSinMultiplier+iTime)));
        
        vec3 col = finalComp;
        
        gl_FragColor = vec4(col, 1.0);
    }