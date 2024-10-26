import type { PropsWithChildren } from "react";

export type Children<T = void> = Readonly<PropsWithChildren<T>>;
