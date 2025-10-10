"use server";

import { redirect } from "next/navigation";

export async function searchAction(formData: FormData, channel: string) {
	const search = formData.get("search") as string;
	if (search && search.trim().length > 0) {
		redirect(`/${encodeURIComponent(channel)}/search?query=${encodeURIComponent(search)}`);
	}
}
