"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
// import { getServerAuthClient } from "@/app/config";
import { loginAction } from "./loginAction";

export function LoginForm() {
	const t = useTranslations("auth");
	const formRef = useRef<HTMLFormElement>(null);

	return (
		<div className="mx-auto mt-16 w-full max-w-lg">
			<form
				className="rounded border p-8 shadow-md"
				action={async (formData: FormData) => {
					try {
						await loginAction(formData);
						formRef.current?.reset();
					} catch (err) {
						console.error(err);
						alert(t("login_error"));
					}
				}}
			>
				<div className="mb-2">
					<label className="sr-only" htmlFor="email">
						{t("email_label")}
					</label>
					<input
						type="email"
						name="email"
						placeholder={t("email_placeholder")}
						className="w-full rounded border bg-neutral-50 px-4 py-2"
					/>
				</div>
				<div className="mb-4">
					<label className="sr-only" htmlFor="password">
						{t("password_label")}
					</label>
					<input
						type="password"
						name="password"
						placeholder={t("password_placeholder")}
						autoCapitalize="off"
						autoComplete="off"
						className="w-full rounded border bg-neutral-50 px-4 py-2"
					/>
				</div>

				<button
					className="rounded bg-neutral-800 px-4 py-2 text-neutral-200 hover:bg-neutral-700"
					type="submit"
				>
					{t("login_button")}
				</button>
			</form>
			<div></div>
		</div>
	);
}
