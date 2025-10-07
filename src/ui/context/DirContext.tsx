"use client";

import { createContext, useContext } from "react";

export const DirContext = createContext<{ isRTL: boolean }>({ isRTL: false });

export const useDir = () => useContext(DirContext);
