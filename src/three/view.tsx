"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import { OrbitControls, View as ViewImpl } from "@react-three/drei";
import { Three } from "./helpers/three";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	orbit?: boolean;
	children: React.ReactNode;
}

const View = forwardRef(({ children, orbit, ...props }: Props, ref) => {
	const localRef = useRef(null);
	useImperativeHandle(ref, () => localRef.current);

	return (
		<>
			<div ref={localRef} {...props} />
			<Three>
				<ViewImpl track={localRef}>
					{children}
					{orbit && <OrbitControls />}
				</ViewImpl>
			</Three>
		</>
	);
});

export default View;
