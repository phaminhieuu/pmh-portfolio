import clsx from "clsx";
import { Logo } from "./icons";

interface Props {
	loaded: boolean;
}

export default function Loader({ loaded }: Props) {
	return (
		<div
			className={clsx(
				"fixed inset-0 pointer-events-none grid place-items-center z-50 transition-opacity opacity-100 overflow-hidden bg-background",
			)}
			style={{
				opacity: loaded === true ? 0 : 1,
			}}
		>
			<Logo className="size-14 animate-spin" />
		</div>
	);
}
