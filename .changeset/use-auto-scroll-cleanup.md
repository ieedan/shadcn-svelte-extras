---
'shadcn-svelte-extras': patch
---

fix(use-auto-scroll): clean up scroll/resize listeners and disconnect the MutationObserver on unmount or ref rebind by routing through `useEventListener` and `useMutationObserver` from `runed`
