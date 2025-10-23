import { getTranslations } from "next-intl/server";
import { CurrentUserOrderListDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { LoginForm } from "@/ui/components/LoginForm";
import { OrderListItem } from "@/ui/components/OrderListItem";
import { getChannelConfig } from "@/lib/channelConfig";

interface OrderPageProps {
	params: Promise<{ channel: string }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
	const { channel } = await params;

	// get channel config (synchronous helper)
	const { languageCode, locale } = await getChannelConfig(channel);

	// use short languageCode (en, fa, ...) for next-intl translations
	const t = await getTranslations({ locale: languageCode, namespace: "common" });
	const { me: user } = await executeGraphQL(CurrentUserOrderListDocument, {
		variables: {
			languageCode: languageCode,
		},
		cache: "no-cache",
	});

	if (!user) {
		return <LoginForm />;
	}

	const orders = user.orders?.edges || [];

	return (
		<div className="mx-auto max-w-7xl p-8">
			<h1 className="text-2xl font-bold tracking-tight text-neutral-900">
				{user.firstName ? user.firstName : user.email}
				{t("orders_title_suffix")}
			</h1>

			{orders.length === 0 ? (
				<div className="mt-8">
					<div className="rounded border border-neutral-100 bg-white p-4">
						<div className="flex items-center">{t("no_orders")}</div>
					</div>
				</div>
			) : (
				// <ul className="mt-8 space-y-6">
				// 	{orders.map(({ node: order }) => {
				// 		return <OrderListItem order={order} locale={locale} key={order.id} />;
				// 	})}
				// </ul>

				<ul className="mt-8 space-y-6">
					{orders.map(({ node: order }) => (
						<OrderListItem key={order.id} order={order} locale={locale} />
					))}
				</ul>
			)}
		</div>
	);
}
