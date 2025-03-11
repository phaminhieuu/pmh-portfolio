"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { r3f } from "./helpers/tunnel";

export default function Scene({ ...props }) {
	return (
		<Canvas dpr={[1, 2]} {...props}>
			<r3f.Out />
			<Preload all />
		</Canvas>
	);
}
