"use server";

import { getServerAuthClient } from "@/app/config";

export async function loginAction(formData: FormData) {
	const email = formData.get("email")?.toString();
	const password = formData.get("password")?.toString();

	if (!email || !password) {
		throw new Error("Email and password are required");
	}

	const { data } = await (await getServerAuthClient()).signIn({ email, password }, { cache: "no-store" });

	if (data.tokenCreate.errors.length > 0) {
		throw new Error(data.tokenCreate.errors.map((e) => e.message).join(", "));
	}

	return data.tokenCreate;
}
