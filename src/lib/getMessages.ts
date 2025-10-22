// src/lib/getMessages.ts
import fs from "node:fs";
import path from "node:path";

export async function getMessages(locale: string) {
	const basePath = path.resolve(process.cwd(), "src/messages");

	// const namespaces = ["common"];
	const namespaces = ["common", "auth", "checkout", "orders", "errors", "ui"];

	const messages: Record<string, any> = {};

	for (const ns of namespaces) {
		const filePath = path.join(basePath, locale, `${ns}.json`);
		// const content = await fs.promises.readFile(filePath, "utf8");
		// messages[ns] = JSON.parse(content);

		try {
			const content = await fs.promises.readFile(filePath, "utf8");
			messages[ns] = JSON.parse(content);
		} catch {
			// Fallback: اگر فایل یافت نشد، نسخه انگلیسی را بده
			const fallbackPath = path.join(basePath, "en", `${ns}.json`);
			const fallback = await fs.promises.readFile(fallbackPath, "utf8");
			messages[ns] = JSON.parse(fallback);
		}
	}

	return messages;
}
