---
'shadcn-svelte-extras': patch
---

fix: Registry imports now use explicit `.js`/`.svelte` extensions so installed components resolve in both SvelteKit 2 (`$lib`) and SvelteKit 3 (`#lib`) projects, and the default `component`, `block` and `util` paths point to directories
