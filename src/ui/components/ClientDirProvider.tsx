"use client";

import { type ReactNode, useEffect } from "react";
// import { DirContext } from "@/ui/context/DirContext";

export type Direction = "rtl" | "ltr";

interface ClientDirProviderProps {
	children: ReactNode;
	dir: Direction;
}

export default function ClientDirProvider({ children, dir }: ClientDirProviderProps) {
	// return <DirContext.Provider value={{ dir }}>{children}</DirContext.Provider>;

	useEffect(() => {
		document.documentElement.setAttribute("dir", dir);
	}, [dir]);

	return <>{children}</>;
}
