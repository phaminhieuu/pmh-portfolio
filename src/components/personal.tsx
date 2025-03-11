import Card from "@/components/card";
import Container from "@/components/container";

export default function Personal() {
	return (
		<div className="space-y-24">
			<h1 className="text-center text-5xl font-instrument text-accent">
				Learning, Crafting, and Sharing
			</h1>

			<p>
				In my free time, I like to learn new things, craft exciting
				projects—mostly web applications and 3D interactive experiences—and
				sometimes write blog posts to share my knowledge and remind myself of
				what I’ve learned. My favorite blog posts and some creative projects are
				listed below:
			</p>

			<div className="space-y-5">
				<a
					href="https://blog.threes.dev/posts/evenly-distributing-points-on-a-sphere-with-the-golden-ratio"
					target="_blank"
					rel="noreferrer"
					className="border rounded-lg bg-night p-3 px-4 text-base flex items-center justify-between hover:border-zinc-500 transition-colors cursor-pointer"
				>
					<p>Evenly Distributing Points on a Sphere with the Golden Ratio</p>
					<p className="text-muted-foreground">2025</p>
				</a>

				<a
					href="https://blog.threes.dev"
					target="_blank"
					rel="noreferrer"
					className="border rounded-lg bg-night p-3 px-4 text-base flex items-center justify-between hover:border-zinc-500 transition-colors cursor-pointer"
				>
					<p>Spring animation in Three.js</p>
					<p className="text-muted-foreground">2025</p>
				</a>
			</div>

			<Container>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
					<Card
						description="Water shader"
						link="https://pmh-showcase.vercel.app/water-shader"
					>
						<video
							autoPlay
							loop
							muted
							playsInline
							className="size-full object-cover"
						>
							<source
								src="/works/water-shader.mp4"
								type="video/mp4;codecs=hvc1"
							/>
							<source
								src="/works/water-shader.webm"
								type="video/webm;codecs=vp9"
							/>
						</video>
					</Card>

					<Card
						description="Draggable 3D"
						link="https://pmh-showcase.vercel.app/draggable"
					>
						<video
							autoPlay
							loop
							muted
							playsInline
							className="size-full object-cover"
						>
							<source src="/works/draggable.mp4" type="video/mp4;codecs=hvc1" />
							<source
								src="/works/draggable.webm"
								type="video/webm;codecs=vp9"
							/>
						</video>
					</Card>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
					<Card
						description="Kishimisu"
						className="md:h-[300px]"
						link="https://sketch.threes.dev/kishimisu/"
					>
						<video
							autoPlay
							loop
							muted
							playsInline
							className="size-full object-cover"
						>
							<source src="/works/kishimisu.mp4" type="video/mp4;codecs=hvc1" />
							<source
								src="/works/kishimisu.webm"
								type="video/webm;codecs=vp9"
							/>
						</video>
					</Card>

					<Card
						description="Cubes raymarching"
						link="https://sketch.threes.dev/raymarching/"
						className="md:h-[300px]"
					>
						<video
							autoPlay
							loop
							muted
							playsInline
							className="size-full object-cover"
						>
							<source
								src="/works/cube-raymarching.mp4"
								type="video/mp4;codecs=hvc1"
							/>
							<source
								src="/works/cube-raymarching.webm"
								type="video/webm;codecs=vp9"
							/>
						</video>
					</Card>

					<Card
						description="Ball pit physics"
						link="https://pmh-showcase.vercel.app/ballpit"
						className="md:h-[300px]"
					>
						<video
							autoPlay
							loop
							muted
							playsInline
							className="size-full object-cover"
						>
							<source src="/works/ballpit.webm" type="video/webm;codecs=vp9" />
							<source src="/works/ballpit.mp4" type="video/mp4;codecs=hvc1" />
						</video>
					</Card>
				</div>
			</Container>
		</div>
	);
}
