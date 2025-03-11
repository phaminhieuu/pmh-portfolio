import { Link } from "./icons";

interface Props {
	name: string;
	link: string;
}
export default function Header({ name, link }: Props) {
	return (
		<a
			href={link}
			target="_blank"
			rel="noreferrer"
			className="text-3xl flex items-center gap-2 font-semibold group relative font-instrument w-fit text-accent"
		>
			{name}
			<Link className="size-6" />
			<span className="absolute bottom-0 border-b w-0 group-hover:w-full transition-all" />
		</a>
	);
}
