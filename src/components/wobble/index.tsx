import { useTexture } from "@react-three/drei";
import frag from "./shaders/frag.fs";
import vert from "./shaders/vert.vs";
import * as THREE from "three";
import { type ThreeEvent, useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { animate } from "motion";
import { useControls } from "leva";

export default function Wobble() {
	const [cursor] = useState(new THREE.Vector2(9999, 9999));

	const {
		amplitude,
		positionFrequency,
		timeFrequency,
		texSpeed,
		noiseFrequency,
		noiseSpeed,
		noiseStrength,
	} = useControls({
		// Wobble
		amplitude: { value: 0.4, min: 0, max: 1 },
		positionFrequency: { value: 0.5, min: 0, max: 1 },
		timeFrequency: { value: 0.1, min: 0, max: 1 },
		texSpeed: { value: 0.05, min: 0, max: 1 },

		// Noise
		noiseFrequency: { value: 20, min: 0, max: 50 },
		noiseSpeed: { value: 0.5, min: 0, max: 10 },
		noiseStrength: { value: 0.1, min: 0, max: 1 },
	});

	const tex = useTexture("/texture/text.png", (texture) => {
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		texture.minFilter = THREE.LinearFilter;
		texture.magFilter = THREE.LinearFilter;
	});

	const [shaderMaterial] = useState(
		new THREE.ShaderMaterial({
			uniforms: {
				uTex: { value: tex },
				uTime: { value: 0 },

				// Wobble
				uAmplitude: { value: amplitude },
				uTexSpeed: { value: texSpeed },
				uTimeFrequency: { value: timeFrequency },
				uPositionFrequency: { value: positionFrequency },

				// Noise
				uNoiseFrequency: { value: noiseFrequency },
				uNoiseSpeed: { value: noiseSpeed },
				uNoiseStrength: { value: noiseStrength },

				// Hover
				uHoverPosition: { value: new THREE.Vector2(0.5, 0.5) },
				uHoverStrength: { value: 0 },
			},
			vertexShader: vert,
			fragmentShader: frag,
			transparent: true,
			side: THREE.DoubleSide,
			blending: THREE.NormalBlending,
			depthWrite: false,
		}),
	);

	useEffect(() => {
		const uniforms = shaderMaterial.uniforms;

		uniforms.uAmplitude = { value: amplitude };
		uniforms.uPositionFrequency = { value: positionFrequency };
		uniforms.uTimeFrequency = { value: timeFrequency };
		uniforms.uTexSpeed = { value: texSpeed };
		uniforms.uNoiseFrequency = { value: noiseFrequency };
		uniforms.uNoiseSpeed = { value: noiseSpeed };
	}, [
		amplitude,
		positionFrequency,
		timeFrequency,
		texSpeed,
		noiseFrequency,
		noiseFrequency,
	]);

	useFrame(({ clock }) => {
		const e = clock.getElapsedTime();

		const uniforms = shaderMaterial.uniforms;
		uniforms.uTime = { value: e };
		uniforms.uHoverPosition = { value: cursor };
	});

	const onEnter = (e: ThreeEvent<PointerEvent>) => {
		const uv = e.uv;
		if (!uv) return;

		cursor.set(uv.x, uv.y);

		animate(
			shaderMaterial.uniforms.uHoverStrength,
			{ value: 1 },
			{ duration: 1, type: "spring" },
		);

		animate(
			shaderMaterial.uniforms.uNoiseStrength,
			{ value: noiseStrength },
			{ duration: 1, type: "spring" },
		);
	};

	const onMove = (e: ThreeEvent<PointerEvent>) => {
		const uv = e.uv;
		if (!uv) return;
		cursor.set(uv.x, uv.y);
	};

	const onOut = () => {
		animate(
			shaderMaterial.uniforms.uHoverStrength,
			{ value: 0 },
			{ duration: 1, type: "spring" },
		);

		animate(
			shaderMaterial.uniforms.uNoiseStrength,
			{ value: 0 },
			{ duration: 1, type: "spring" },
		);
	};

	return (
		<mesh
			rotation={[0, 0, 0.4]}
			position={[-1.8, -1.8, 0]}
			material={shaderMaterial}
			onPointerEnter={onEnter}
			onPointerMove={onMove}
			onPointerOut={onOut}
		>
			<sphereGeometry args={[4, 128, 128]} />
		</mesh>
	);
}
