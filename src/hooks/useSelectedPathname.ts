"use client";

import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";

function useSelectedPathname() {
	const pathname = usePathname();
	const { channel } = useParams<{ channel?: string }>();

	return useMemo(() => (channel ? pathname.replace(`/${channel}`, "") : pathname), [pathname, channel]);
}

export default useSelectedPathname;
