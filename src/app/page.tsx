"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { useProgress } from "@react-three/drei";
import Loader from "@/components/loader";

const Scene = dynamic(() => import("@/components/scene"), {
	ssr: false,
});

const Works = dynamic(() => import("@/components/works"));
const Personal = dynamic(() => import("@/components/personal"));
const Background = dynamic(() => import("@/components/background"));

export default function HomePage() {
	const { progress } = useProgress();
	const loaded = progress === 100;

	return (
		<main aria-hidden={true}>
			<Loader loaded={loaded} />
			<Background />
			<div className="h-[90vh] sm:h-[95vh] w-full overflow-hidden relative">
				<Scene />

				<div className="absolute right-5 top-14 md:top-28 text-5xl sm:text-6xl md:text-8xl xl:text-9xl text-right space-y-2">
					<div className="flex flex-row md:flex-col gap-2 font-instrument text-accent">
						<motion.p
							initial={{ opacity: 0 }}
							animate={{
								opacity: loaded ? 1 : 0,
								y: loaded ? 0 : 20,
							}}
							transition={{ delay: 0.2, duration: 0.5 }}
						>
							Pham Minh Hieu
						</motion.p>
					</div>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{
							opacity: loaded ? 1 : 0,
							y: loaded ? 0 : 20,
						}}
						transition={{ delay: 0.5 }}
						className="text-xl md:text-3xl xl:text-4xl text-muted-foreground"
					>
						[Creative Developer]
					</motion.p>
				</div>
			</div>

			<div className="container mx-auto px-5 max-w-3xl py-32 space-y-40">
				<p>
					Hi, I'm Pham Minh Hieu, a Vietnamese creative/fullstack developer. I
					love to experiment, crafting and learning new things about web
					development, especialy in interactive 3D world.
				</p>

				<Works />

				<Personal />
			</div>
		</main>
	);
}
