import { Suspense } from "react";

import { Canvas } from "@react-three/fiber";
import Wobble from "./wobble";
import { Leva } from "leva";
import { Preload } from "@react-three/drei";

export default function Scene() {
	return (
		<div className="absolute inset-0">
			<Leva hidden />
			<Canvas dpr={[1, 2]}>
				<Suspense fallback="Loading">
					<Wobble />
					{/* <OrbitControls /> */}
				</Suspense>
				<Preload all />
			</Canvas>
		</div>
	);
}
