import Card from "@/components/card";
import Container from "@/components/container";
import Header from "@/components/header";
import Image from "next/image";

export default function Works() {
	return (
		<div className="space-y-24">
			<p className="text-center text-5xl font-instrument text-accent">
				Work Experiences
			</p>

			<div className="space-y-10">
				<div className="space-y-2">
					<Header name="Maker Studios" link="https://makerstudios.gg" />

					<p>
						Maker Studios is a game development studio that focuses on creating
						games for mobile devices and NFT games. I was part of the team that
						developed the company’s websites and was responsible for both
						front-end and back-end development, sometimes designing UI/UX. There
						were many opportunities to work with new technologies and learn new
						things. I am very proud to have been a part of the company.
					</p>
				</div>

				<Container>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
						<Card
							className="md:col-span-2"
							description="Popknights - NFT Game"
							link="https://x.com/thepopknights"
						>
							<Image
								alt="napco"
								src="/works/popknights.avif"
                sizes="100vw, (min-width: 768px) 50vw"
								fill
								className="object-contain"
							/>
						</Card>

						<Card description="Homepage & internal management system">
							<Image
								alt="napco"
								src="/works/makerstudios.avif"
                sizes="100vw, (min-width: 768px) 50vw"
								fill
								className="object-contain"
							/>
						</Card>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
						<Card
							description="Landing page & Management system for PigHunter game"
							link="https://pighuntersgame.com"
						>
							<Image
								alt="napco"
								src="/works/pighunters.avif"
                sizes="100vw, (min-width: 768px) 50vw"
								fill
								className="object-contain"
							/>
						</Card>

						<Card
							description="Landing page & Management system for Night at the Valley game"
							link="https://natv.makerstudios.gg/"
							className="p-10"
						>
							<div className="relative h-full">
								<Image
									alt="napco"
									src="/works/natv.avif"
                  sizes="100vw, (min-width: 768px) 50vw"
									fill
									className="object-contain"
								/>
							</div>
						</Card>
					</div>
				</Container>
			</div>

			<div className="space-y-10">
				<div className="space-y-2">
					<Header name="Napco" link="https://www.napco.co.jp/" />

					<p>
						I was leading a small team to develop an internal tool to manage
						attendance, calculate salaries, and handle tasks for employees of
						Japanese construction company, called Napco. This was my first
						freelance project, and it was both very challenging and very
						rewarding.
					</p>
				</div>

				<Card className="h-[300px]" description="Internal management system">
					<Image
						alt="napco"
						src="/works/napco.avif"
            sizes="100vw, (min-width: 768px) 50vw"
						fill
						className="object-cover"
					/>
				</Card>
			</div>
		</div>
	);
}
