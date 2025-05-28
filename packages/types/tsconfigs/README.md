# tsconfigs

This is a set of TypeScript config files for various moonlight projects. The most common one is `extension.json` for extensions.

Discord uses [Electron 32](https://releases.electronjs.org/release/v32.2.2).

## Composite hacks

Since moonlight extensions can run in several different environments, different configs are used for different file paths. This requires use of the TypeScript `references` feature, which cannot resolve configs from installed packages (unlike `extends`). Because `references` requires a path, the various config files are referenced from their position in `node_modules`, and each config ascends several levels in their `include`s:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig.json",
  "extends": ["@ts-test/types/tsconfigs/extension"],
  "references": [
    { "path": "./node_modules/@ts-test/types/tsconfigs/extension/web.json" },
    { "path": "./node_modules/@ts-test/types/tsconfigs/extension/webpack.json" },
    { "path": "./node_modules/@ts-test/types/tsconfigs/extension/preload.json" },
    { "path": "./node_modules/@ts-test/types/tsconfigs/extension/electron.json" }
  ]
}
```

This must be specified manually, as [`references` are not inherited with `extends`](https://github.com/microsoft/TypeScript/issues/27098). The extended config simply disables all input files, which [avoids requiring `composite` to be explicitly set](https://github.com/vitejs/vite/pull/17774), which would prevent enabling `noEmit`.

Each environment imports various "base" config files, includes the relevant global environment files from this project, and then includes the extension sources from outside of `node_modules`. `tsBuildInfoFile` (which *has* to be set) is placed in `node_modules/.tmp` to avoid cluttering files.
