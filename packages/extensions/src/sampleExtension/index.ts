// @ts-expect-error
import * as fs from "node:fs";
import type { SharedType } from "./types";

type Test = [
  (typeof globalThis)["moonlight"],
  // @ts-expect-error
  (typeof globalThis)["moonlightPreload"],
  // @ts-expect-error
  (typeof globalThis)["moonlightElectron"],
  // @ts-expect-error
  Buffer
];

type Buh = SharedType["buh"];

await new Promise((r) => setTimeout(r, 1000));
