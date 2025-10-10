"use client";

import { createContext, useContext } from "react";

// نوع دقیق dir
export type Direction = "rtl" | "ltr";

export interface DirContextType {
	dir: Direction;
}

// مقدار پیش‌فرض (در صورت نبود Provider)
const defaultValue: DirContextType = {
	dir: "ltr",
};

export const DirContext = createContext<DirContextType>(defaultValue);

// هوک کمکی برای استفاده راحت‌تر
export function useDir(): DirContextType {
	const ctx = useContext(DirContext);
	if (!ctx) {
		// در مواقعی که اشتباهاً بدون Provider استفاده شود
		throw new Error("useDir must be used within a DirContext.Provider");
	}
	return ctx;
}

// Export default the context for easier imports
export default DirContext;
