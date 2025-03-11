import { useTexture } from "@react-three/drei";
import frag from "./shaders/frag.glsl";
import vert from "./shaders/vert.glsl";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { animate } from "motion";
import { useControls } from "leva";

export default function Wobble() {
	const [onHold, setOnHold] = useState(false);

	const { amplitude, positionFrequency, timeFrequency, speed, texSpeed } =
		useControls({
			amplitude: { value: 0.4, min: 0, max: 1 },
			positionFrequency: { value: 0.5, min: 0, max: 1 },
			timeFrequency: { value: 0.1, min: 0, max: 1 },
			speed: { value: 0.02, min: 0, max: 1 },
			texSpeed: { value: 0.5, min: 0, max: 1 },
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
				uSpeed: { value: speed },
				uAmplitude: { value: amplitude },
				uTexSpeed: { value: texSpeed },
				uTimeFrequency: { value: timeFrequency },
				uPositionFrequency: { value: positionFrequency },
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
		uniforms.uSpeed = { value: speed };
		uniforms.uTexSpeed = { value: texSpeed };

		animate(
			uniforms.uTexSpeed,
			{ value: 0.05 },
			{ duration: 1, type: "spring", bounce: 0 },
		);
	}, [amplitude, positionFrequency, timeFrequency, speed, texSpeed]);

	useEffect(() => {
		const handleMouseDown = () => {
			setOnHold(true);
		};

		const handleMouseUp = () => {
			setOnHold(false);
		};

		window.addEventListener("mousedown", handleMouseDown);

		window.addEventListener("mouseup", handleMouseUp);

		return () => {
			window.removeEventListener("mousedown", handleMouseDown);
			window.removeEventListener("mouseup", handleMouseUp);
		};
	}, []);

	useEffect(() => {
		const uniforms = shaderMaterial.uniforms;

		if (onHold) {
			uniforms.uTexSpeed = { value: 0.1 };
		} else {
			uniforms.uTexSpeed = { value: 0.05 };
		}
	}, [onHold]);

	useFrame(({ clock }) => {
		const e = clock.getElapsedTime();

		const uniforms = shaderMaterial.uniforms;
		uniforms.uTime = { value: e };
	});

	return (
		<mesh
			rotation={[0, 0, 0.4]}
			position={[-2, -1.8, 0]}
			material={shaderMaterial}
			onPointerOver={(e) => {
				console.log(e.uv);
			}}
      onPointerMove={(e) => {
        console.log(e.uv);
      }}
		>
			<sphereGeometry args={[4, 128, 128]} />
		</mesh>
	);
}
