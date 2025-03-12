import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

const mainAspect = 16 / 9;
const portraitAspect = 1 / 2;

export function useResize() {
	const { size } = useThree();
	const weight = useRef(0);

	useEffect(() => {
		let portraitWeight =
			1 -
			(size.width / size.height - portraitAspect) /
				(mainAspect - portraitAspect);
		portraitWeight = Math.min(1, Math.max(0, portraitWeight));

		weight.current = portraitWeight;
	}, [size]);

	return { weight: weight.current };
}
