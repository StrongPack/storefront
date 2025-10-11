import { UserIcon } from "lucide-react";
import { UserMenu } from "./UserMenu";
// import { UserMenu } from "./UserMenu.client";
import { CurrentUserDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

export default async function UserMenuContainer() {
	// export async function UserMenuContainer() {
	const { me: user } = await executeGraphQL(CurrentUserDocument, {
		cache: "no-cache",
	});

	if (user) {
		// return <UserMenu user={user} />;

		return (
			<>
				{/* نسخه دسکتاپ */}
				<div className="hidden md:block">
					<UserMenu user={user} />
				</div>

				{/* نسخه موبایل */}
				<LinkWithChannel
					href="/account"
					className="flex w-full gap-2 rounded-md border border-gray-200 px-4 py-3 text-lg font-medium text-gray-800 shadow-sm hover:bg-neutral-100 md:hidden"
				>
					<UserIcon className="h-6 w-6 text-gray-700" aria-hidden="true" />
					<span>حساب کاربری</span>
				</LinkWithChannel>
			</>
		);
	} else {
		// return (
		// 	<LinkWithChannel href="/login" className="h-6 w-6 flex-shrink-0">
		// 		<UserIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
		// 		<span className="sr-only">Log in</span>
		// 	</LinkWithChannel>
		// );

		return (
			<>
				{/* نسخه دسکتاپ */}
				<LinkWithChannel href="/login" className="relative hidden md:flex">
					<UserIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
					<span className="sr-only">Log in</span>
				</LinkWithChannel>

				{/* نسخه موبایل */}
				<LinkWithChannel
					href="/login"
					className="flex w-full gap-2 rounded-md border border-gray-200 px-4 py-3 text-lg font-medium text-gray-800 shadow-sm hover:bg-neutral-100 md:hidden"
				>
					<UserIcon className="h-6 w-6 text-gray-700" aria-hidden="true" />
					<span>ورود</span>
				</LinkWithChannel>
			</>
		);
	}
}
