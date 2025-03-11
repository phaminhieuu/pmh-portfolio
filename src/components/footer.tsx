import { Github, LinkedIn, Logo, Mail, X } from "@/components/icons";
import Link from "./link";

export default function Footer() {
	return (
		<footer className="bg-night p-5 py-8 font-mono text-sm">
			<div className="container mx-auto max-w-3xl flex flex-col justify-between items-center sm:flex-row gap-5">
				<div className="flex items-center gap-2">
					<Logo className="size-7 sm:size-10" />
					<div>
						© {new Date().getFullYear()} crafted by{" "}
						<br className="hidden sm:block" />
						Pham Minh Hieu
					</div>
				</div>

				<div className="space-y-1">
					<div className="text-center sm:text-right">Get in touch</div>

					<div className="flex items-center justify-end gap-2">
						<Link href="mailto:minhhieupham851999@gmail.com">
							<Mail className="size-7" />
						</Link>

						<Link href="https://github.com/phaminhieuu">
							<Github className="size-6" />
						</Link>

						<Link href="https://x.com/NovaaEraa">
							<X className="size-6" />
						</Link>

						<Link href="https://www.linkedin.com/in/minh-hieu-pham-a3a714276">
							<LinkedIn className="size-6" />
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
