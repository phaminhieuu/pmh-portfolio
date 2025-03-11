"use client";

import { r3f } from "./tunnel";

export const Three = ({ children }: { children: React.ReactNode }) => {
	return <r3f.In>{children}</r3f.In>;
};
