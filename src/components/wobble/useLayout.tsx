import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";

const mainAspect = 16 / 9;
const portraitAspect = 1 / 2;

export interface Props {
	object: THREE.Mesh | null;
	scale: number;
	loaded: boolean;
}

const baseScale = new THREE.Vector3(1, 1, 1);

export default function useLayout({ object, scale, loaded }: Props) {
	const { size } = useThree();
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		setRefresh(true);
	}, [loaded]);

	useEffect(() => {
		if (!object) return;

		let weight =
			1 -
			(size.width / size.height - portraitAspect) /
				(mainAspect - portraitAspect);
		weight = Math.min(1, Math.max(0, weight));

		object.scale.copy(
			baseScale.clone().multiplyScalar(scale * weight + 1 - weight),
		);
	}, [size, refresh]);
}
