import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

export default async function ChannelRoot({ params }: { params: Promise<{ channel: string }> }) {
	const { channel } = await params;
	redirect(`/${channel}/${routing.defaultLocale}`);
}
