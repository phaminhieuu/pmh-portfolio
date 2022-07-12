varying vec2 vUv;

void main() {

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 2.0);

    vUv = uv;
}