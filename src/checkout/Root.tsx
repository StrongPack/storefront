"use client";
import { ErrorBoundary } from "react-error-boundary";
import {
	type Client,
	Provider as UrqlProvider,
	cacheExchange,
	createClient,
	dedupExchange,
	fetchExchange,
} from "urql";

import { ToastContainer } from "react-toastify";
import { useAuthChange, useSaleorAuthContext } from "@saleor/auth-sdk/react";
import { useState } from "react";
import { alertsContainerProps } from "./hooks/useAlerts/consts";
import { RootViews } from "./views/RootViews";
import { PageNotFound } from "@/checkout/views/PageNotFound";
import "./index.css";
import { type LanguageCodeEnum } from "@/gql/graphql";
export const Root = ({
	saleorApiUrl,
	locale,
	languageCode,
}: {
	saleorApiUrl: string;
	locale: string;
	languageCode: LanguageCodeEnum;
}) => {
	const saleorAuthClient = useSaleorAuthContext();

	const makeUrqlClient = () =>
		createClient({
			url: saleorApiUrl,
			suspense: true,
			requestPolicy: "cache-first",
			fetch: (input, init) => saleorAuthClient.fetchWithAuth(input as NodeJS.fetch.RequestInfo, init),
			exchanges: [dedupExchange, cacheExchange, fetchExchange],
		});

	const [urqlClient, setUrqlClient] = useState<Client>(makeUrqlClient());
	useAuthChange({
		saleorApiUrl,
		onSignedOut: () => setUrqlClient(makeUrqlClient()),
		onSignedIn: () => setUrqlClient(makeUrqlClient()),
	});

	return (
		<UrqlProvider value={urqlClient}>
			<ToastContainer {...alertsContainerProps} />
			<ErrorBoundary FallbackComponent={PageNotFound}>
				<RootViews locale={locale} languageCode={languageCode} />
			</ErrorBoundary>
		</UrqlProvider>
	);
};
