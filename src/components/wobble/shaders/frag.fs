uniform sampler2D uTex;
uniform float uTime;
uniform float uTexSpeed;
uniform vec2 uHoverPosition;

uniform float uNoiseFrequency;
uniform float uNoiseSpeed;
uniform float uNoiseStrength;

varying vec2 vUv;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

float random(float seed) {
    return fract(sin(seed) * 43758.5453123);
}

void main() {
    // Draw circle at mouse position
    float dist = length(uHoverPosition - vUv);
    float hover = 1.0 - smoothstep(0.0, 0.05, dist);

    vec2 uv = vUv;

    // Repeat the texture
    uv.y *= 8.0;
    uv.x *= 2.0;

    float repeat = floor(uv.y);
    uv.y = fract(uv.y);

    // Move the texture
    float direction = mod(repeat, 2.0) == 0.0 ? 1.0 : -1.0;
    uv.x += direction * uTexSpeed * uTime;

    // Simplex noise distortion
    vec3 noise = vec3(vUv * uNoiseFrequency, uTime * uNoiseSpeed);
    float noiseX = snoise3(noise);
    float noiseY = snoise3(noise + vec3(0.0, 0.0, 1.0));
    vec2 distortion = vec2(noiseX, noiseY) * hover * uNoiseStrength;

    // Glitch effect
    float glitchDuration = 1.0;
    float glitchStrength = step(uTime, glitchDuration) * (1.0 - uTime / glitchDuration);
    float glitchOffset = glitchStrength * (random(uv.y) - 0.5) * 0.05;
    uv.x += glitchOffset;

    // Distored UV
    vec2 distortedUv = uv + distortion + vec2(glitchOffset, 0.0);

    // Final color
    vec4 col = texture2D(uTex, distortedUv);

    // Transparency
    if (col.a < 0.5) {
        discard;
    }

    // Opacity
    col.a = 0.5;

    if (!gl_FrontFacing) {
        col.a = 0.05;
    }

    gl_FragColor = col;
}
