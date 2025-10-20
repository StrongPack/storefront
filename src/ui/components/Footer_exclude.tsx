// import Link from "next/link";
import Image from "next/image";
import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { ChannelSelect } from "./ChannelSelect";
import { ChannelsListDocument, MenuGetBySlugDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";

// import { useTranslation } from "next-i18next";

export async function Footer({ channel }: { channel: string }) {
	const footerLinks = await executeGraphQL(MenuGetBySlugDocument, {
		variables: { slug: "footer", channel },
		revalidate: 60 * 60 * 24,
	});
	const channels = process.env.SALEOR_APP_TOKEN
		? await executeGraphQL(ChannelsListDocument, {
				withAuth: false, // disable cookie-based auth for this call
				headers: {
					// and use app token instead
					Authorization: `Bearer ${process.env.SALEOR_APP_TOKEN}`,
				},
			})
		: null;
	// const currentYear = new Date().getFullYear();
	// const { t } = useTranslation("common");
	return (
		<footer className="border-neutral-300 bg-neutral-50">
			<div className="mx-auto max-w-7xl px-4 lg:px-8">
				<div className="grid grid-cols-3 gap-8 py-16">
					{footerLinks.menu?.items?.map((item) => {
						return (
							<div key={item.id}>
								<h3 className="text-sm font-semibold text-neutral-900">{item.name}</h3>
								<ul className="mt-4 space-y-4 [&>li]:text-neutral-500">
									{item.children?.map((child) => {
										if (child.category) {
											return (
												<li key={child.id} className="text-sm">
													<LinkWithChannel href={`/categories/${child.category.slug}`}>
														{child.category.name}
													</LinkWithChannel>
												</li>
											);
										}
										if (child.collection) {
											return (
												<li key={child.id} className="text-sm">
													<LinkWithChannel href={`/collections/${child.collection.slug}`}>
														{child.collection.name}
													</LinkWithChannel>
												</li>
											);
										}
										if (child.page) {
											return (
												<li key={child.id} className="text-sm">
													<LinkWithChannel href={`/pages/${child.page.slug}`}>
														{child.page.title}
													</LinkWithChannel>
												</li>
											);
										}
										if (child.url) {
											return (
												<li key={child.id} className="text-sm">
													<LinkWithChannel href={child.url}>{child.name}</LinkWithChannel>
												</li>
											);
										}
										return null;
									})}
								</ul>
							</div>
						);
					})}
				</div>

				{channels?.channels && (
					<div className="mb-4 text-neutral-500">
						<label>
							<span className="text-sm">Change currency:</span>
							{/* <span className="text-sm">{t("change_currency")}</span> */}
							<ChannelSelect channels={channels.channels} />
						</label>
					</div>
				)}

				<div className="flex flex-col justify-between border-t border-neutral-200 py-10 sm:flex-row">
					{/* <p className="text-sm text-neutral-500">Copyright &copy; {currentYear} Your Store, Inc.</p>
					<p className="flex gap-1 text-sm text-neutral-500">
						Powered by{" "}
						<Link target={"_blank"} href={"https://saleor.io/"}>
							Saleor
						</Link>{" "}
					</p> */}

					{/* <a referrerpolicy='origin' 
						target='_blank' 
						href='https://trustseal.enamad.ir/?id=656873&Code=Dc3ffq6gJLoOncmD6PabrEbGFhDxbcDh'>
							<img referrerpolicy='origin' 
								src='https://trustseal.enamad.ir/logo.aspx?id=656873&Code=Dc3ffq6gJLoOncmD6PabrEbGFhDxbcDh' 
								alt='' 
								style='cursor:pointer' 
								code='Dc3ffq6gJLoOncmD6PabrEbGFhDxbcDh'>

					</a> */}

					<a
						referrerPolicy="origin"
						target="_blank"
						href="https://trustseal.enamad.ir/?id=662386&Code=rjSjruE6FYX9LOcZMBLx5JylAAONJbQo"
						// rel="noopener noreferrer"
					>
						<Image
							src="https://trustseal.enamad.ir/logo.aspx?id=662386&Code=rjSjruE6FYX9LOcZMBLx5JylAAONJbQo"
							alt="اینماد"
							width={86}
							height={86}
							referrerPolicy="origin"
							style={{ cursor: "pointer" }}
						/>
					</a>
				</div>
			</div>
		</footer>
	);
}
