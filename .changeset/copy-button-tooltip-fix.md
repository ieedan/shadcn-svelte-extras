---
'shadcn-svelte-extras': patch
---

fix(CopyButton): compose `onclick` with spread props so wrappers like `Tooltip.Trigger` no longer override the copy handler (fixes broken copy in `PMCommand` and `JsrepoCommand`)
