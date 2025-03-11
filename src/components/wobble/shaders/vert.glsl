varying vec2 vUv;
varying vec3 vNormal;

uniform float uTime;
uniform float uAmplitude;
uniform float uPositionFrequency;
uniform float uTimeFrequency;
uniform float uSpeed;
uniform float uStrength;

#pragma glslify: snoise4 = require(glsl-noise/simplex/4d)

void main() {
    vUv = uv;

    vec3 newPosition = position;

    // Simplex noise
    float noise = snoise4(vec4(position * uPositionFrequency, uTime * uTimeFrequency)) * uAmplitude;

    newPosition += normal * noise;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
}
