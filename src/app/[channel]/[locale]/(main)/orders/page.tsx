import { getTranslations } from "next-intl/server";
import { CurrentUserOrderListDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { LoginForm } from "@/ui/components/LoginForm";
import { OrderListItem } from "@/ui/components/OrderListItem";

export default async function OrderPage({
	params,
}: {
	params: Promise<{ channel: string; locale: string }>;
}) {
	// چون layout اصلی params را به‌صورت Promise صادر کرده
	const { locale } = await params; // ✅ همین خط رفع خطای TypeScript است
	const t = await getTranslations("common");
	const { me: user } = await executeGraphQL(CurrentUserOrderListDocument, {
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
