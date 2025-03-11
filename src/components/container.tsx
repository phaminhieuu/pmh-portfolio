interface Props {
	children: React.ReactNode;
}

export default function Container({ children }: Props) {
	return (
		<div className="lg:w-[calc(100%+320px)] lg:-mx-[160px] space-y-5">
			{children}
		</div>
	);
}
