import { Logo } from "./Logo";
// import { Nav } from "./nav/Nav";
import NavServer from "./nav/Nav.server";
import { type LanguageCodeEnum } from "@/gql/graphql";
export function Header({
	channel,
	locale,
	languageCode,
}: {
	channel: string;
	locale: string;
	languageCode: LanguageCodeEnum;
}) {
	return (
		<header className="top-0 z-20 bg-neutral-100/50 backdrop-blur-md">
			<div className="mx-auto max-w-7xl px-3 sm:px-8">
				<div className="flex h-20 items-center justify-between gap-4 md:gap-8">
					<Logo />
					{/* <Nav channel={channel} locale={locale} /> */}
					<NavServer channel={channel} locale={locale} languageCode={languageCode} />
				</div>
			</div>
		</header>
	);
}
