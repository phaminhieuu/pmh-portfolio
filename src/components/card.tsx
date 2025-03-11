import { cn } from "@/utils/cn";
import { Link } from "./icons";

interface Props {
	children: React.ReactNode;
	className?: string;
	description: string;
	link?: string;
}

export default function Card({
	children,
	className,
	description,
	link,
}: Props) {
	return (
		<div
			className={cn(
				"border rounded-lg h-[400px] relative overflow-hidden w-full bg-night",
				className,
			)}
		>
			{children}

			<div className="absolute left-0 bottom-0 h-[200px] w-full bg-linear-to-t from-background to-transparent flex items-end p-4 text-sm">
				{description}
			</div>

			{link && (
				<a
					href={link}
					target="_blank"
					rel="noreferrer"
					className="absolute top-4 right-4 rounded-full bg-muted/60 backdrop-blur-md p-2 hover:bg-muted/80 transition-colors"
				>
					<Link className="size-5" />
				</a>
			)}
		</div>
	);
}
