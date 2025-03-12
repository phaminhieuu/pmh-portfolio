varying vec2 vUv;
varying vec3 vNormal;

uniform float uTime;
uniform float uAmplitude;
uniform float uPositionFrequency;
uniform float uTimeFrequency;
uniform float uStrength;

uniform vec2 uHoverPosition;
uniform float uHoverStrength;

#pragma glslify: snoise4 = require(glsl-noise/simplex/4d)

void main() {
    vUv = uv;

    vec3 newPosition = position;

    // Simplex noise
    float noise = snoise4(vec4(position * uPositionFrequency, uTime * uTimeFrequency)) * uAmplitude;
    newPosition += normal * noise;

    // Create a empty hole when hovering
    float dist = length(uHoverPosition - vUv);
    float hover = smoothstep(0.0, 0.1, dist);
    float hoverEffect = (1.0 - hover) * uHoverStrength;
    newPosition -= normal * hoverEffect * 0.5;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    vUv = uv;
}
