---
'shadcn-svelte-extras': patch
---

fix(Password): Lazy load `zxcvbn` so that users not making use of the `Password.Strength` component don't need to import it
