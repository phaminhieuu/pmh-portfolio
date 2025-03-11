uniform sampler2D uTex;
uniform float uTime;
uniform float uTexSpeed;

varying vec2 vUv;

float random(float seed) {
    return fract(sin(seed) * 43758.5453123);
}

void main() {
    vec2 uv = vUv;

    // Repeat the texture
    uv.y *= 6.0;
    uv.x *= 2.0;

    float repeat = floor(uv.y);
    uv.y = fract(uv.y);

    // Move the texture
    float direction = mod(repeat, 2.0) == 0.0 ? -1.0 : 1.0;
    uv.x += direction * uTexSpeed * uTime;

    // Glitch effect
    float glitchDuration = 1.0;
    float glitchStrength = step(uTime, glitchDuration) * (1.0 - uTime / glitchDuration);

    // UV Distortion
    float glitchOffset = glitchStrength * (random(uv.y) - 0.5) * 0.05;
    uv.x += glitchOffset;

    vec4 col = texture2D(uTex, uv);

    // Glitch lines
    float scanline = sin(uv.y * 800.0 + uTime * 5.0) * 0.1;
    col.rgb += scanline * glitchStrength;

    // Transparency
    if (col.a < 0.5) {
        discard;
    }

    vec4 finalColor = col;

    // Opacity
    finalColor.a = 0.5;

    if (!gl_FrontFacing) {
        finalColor.a = 0.05;
    }

    gl_FragColor = finalColor;
}
