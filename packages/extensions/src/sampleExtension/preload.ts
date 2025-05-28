import * as fs from "node:fs";
import type { SharedType } from "./types";

type Test = [
  // @ts-expect-error
  (typeof globalThis)["moonlight"],
  (typeof globalThis)["moonlightPreload"],
  // @ts-expect-error
  (typeof globalThis)["moonlightElectron"],
  Buffer
];

type Buh = SharedType["buh"];

// @ts-expect-error
await new Promise((r) => setTimeout(r, 1000));
