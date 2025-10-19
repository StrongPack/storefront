import { draftMode } from "next/headers";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export const DraftModeNotification = async () => {
	const t = await getTranslations("common");
	if (!(await draftMode()).isEnabled) {
		return null;
	}

	return (
		<div className="fixed bottom-0 right-0 z-50 bg-red-100 px-8 py-2 text-red-700">
			{t("draft_mode_message")}{" "}
			<Link className="underline" href="/api/draft/disable">
				{t("draft_mode_disable_link")}
			</Link>
		</div>
	);
};
