interface Props {
	children: React.ReactNode;
	href: string;
}

export default function Link({ children, href }: Props) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noreferrer"
			className="hover:text-muted-foreground transition-colors"
		>
			{children}
		</a>
	);
}
