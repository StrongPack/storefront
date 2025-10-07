import { NavClient } from "./Nav.client";

export async function Nav({ channel }: { channel: string }) {
	// داده‌های سرور اگر نیاز باشه اینجا fetch می‌کنی
	return <NavClient channel={channel} />;
}
