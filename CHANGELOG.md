# shadcn-svelte-extras

## 5.0.0

### Major Changes

- breaking(hooks/is-mac.svelte): Export const (`isMac`) instead of class. ([#227](https://github.com/ieedan/shadcn-svelte-extras/pull/227))

### Minor Changes

- feat(hooks/is-mac.svelte): Export `cmdOrCtrl` and `optionOrAlt` helpers ([#227](https://github.com/ieedan/shadcn-svelte-extras/pull/227))

## 4.4.1

### Patch Changes

- fix(ui/pm-command): Wrap tooltip in `Tooltip.Provider` to prevent errors ([#224](https://github.com/ieedan/shadcn-svelte-extras/pull/224))

## 4.4.0

### Minor Changes

- feat(hooks): Add `is-mac` hook ([#222](https://github.com/ieedan/shadcn-svelte-extras/pull/222))

## 4.3.1

### Patch Changes

- fix: Correctly bind strength for `Password.Strength` ([#220](https://github.com/ieedan/shadcn-svelte-extras/pull/220))

- chore: bump deps ([#220](https://github.com/ieedan/shadcn-svelte-extras/pull/220))

## 4.3.0

### Minor Changes

- feat(ui/password): Add a password component ([#218](https://github.com/ieedan/shadcn-svelte-extras/pull/218))

## 4.2.0

### Minor Changes

- feat(ui/emoji-picker): Emoji picker ([#208](https://github.com/ieedan/shadcn-svelte-extras/pull/208))

## 4.1.0

### Minor Changes

- fix(ui/phone-input): Ensure country flags are the correct size ([#214](https://github.com/ieedan/shadcn-svelte-extras/pull/214))

### Patch Changes

- chore: Bump deps ([#214](https://github.com/ieedan/shadcn-svelte-extras/pull/214))

## 4.0.1

### Patch Changes

- fix(ui/button): Relocate types to be exported from the same place as the original component ([#210](https://github.com/ieedan/shadcn-svelte-extras/pull/210))

## 4.0.0

### Major Changes

- feat: Export types from all components ([#205](https://github.com/ieedan/shadcn-svelte-extras/pull/205))

- feat: Make `<Code/>` composable ([#205](https://github.com/ieedan/shadcn-svelte-extras/pull/205))

## 3.4.0

### Minor Changes

- feat(ui/button): Add `onClickPromise` api to allow for easy loading states until promise resolution ([#203](https://github.com/ieedan/shadcn-svelte-extras/pull/203))

### Patch Changes

- fix: Use `font-light` anywhere we use `font-mono` ([#203](https://github.com/ieedan/shadcn-svelte-extras/pull/203))

- fix(ui/pm-command): Improve accessibility by using `Tabs` for pm selection ([#203](https://github.com/ieedan/shadcn-svelte-extras/pull/203))

- fix(ui/pm-command): Styling parity with original ([#203](https://github.com/ieedan/shadcn-svelte-extras/pull/203))

- fix(ui/snippet): Styling parity with original ([#203](https://github.com/ieedan/shadcn-svelte-extras/pull/203))

## 3.3.1

### Patch Changes

- fix(rules): Updated cursor rules name so as not to conflict with other jsrepo registries. ([#201](https://github.com/ieedan/shadcn-svelte-extras/pull/201))

## 3.3.0

### Minor Changes

- refactor(star-rating): Use `RatingGroup` instead of `RadioGroup` for `ui/star-rating` ([#186](https://github.com/ieedan/shadcn-svelte-extras/pull/186))

## 3.2.4

### Patch Changes

- chore: bump deps ([#196](https://github.com/ieedan/shadcn-svelte-extras/pull/196))

## 3.2.3

### Patch Changes

- feat: Configure `defaultPaths` ([#193](https://github.com/ieedan/shadcn-svelte-extras/pull/193))

## 3.2.2

### Patch Changes

- fix(ui/drawer): Fix padding ([#191](https://github.com/ieedan/shadcn-svelte-extras/pull/191))

## 3.2.1

### Patch Changes

- feat(ui/copy-button): Allow the button to have text ([#189](https://github.com/ieedan/shadcn-svelte-extras/pull/189))

## 3.2.0

### Minor Changes

- refactor(ui/modal): Refactors `ui/modal` for better composability ([#187](https://github.com/ieedan/shadcn-svelte-extras/pull/187))

## 3.1.1

### Patch Changes

- feat: Add optional `Cursor Rules` file to provide additional context to llms ([#184](https://github.com/ieedan/shadcn-svelte-extras/pull/184))

## 3.1.0

### Minor Changes

- feat: Add attachment versions of `actions` apis. ([#182](https://github.com/ieedan/shadcn-svelte-extras/pull/182))

- feat(active): Allow usage of search params as href ([#182](https://github.com/ieedan/shadcn-svelte-extras/pull/182))

## 3.0.0

### Major Changes

- feat: 🎉 Tailwind v4 🎉 ([#179](https://github.com/ieedan/shadcn-svelte-extras/pull/179))

### Patch Changes

- feat: Update lucide icon names from `X` -> `XIcon` ([#179](https://github.com/ieedan/shadcn-svelte-extras/pull/179))

## 2.1.1

### Patch Changes

- chore: Include star-rating in jsrepo release ([#175](https://github.com/ieedan/shadcn-svelte-extras/pull/175))

## 2.1.0

### Minor Changes

- feat: 🎉 New component `<StarRating/>` ([#173](https://github.com/ieedan/shadcn-svelte-extras/pull/173))

### Patch Changes

- chore: bump deps ([#173](https://github.com/ieedan/shadcn-svelte-extras/pull/173))

## 2.0.5

### Patch Changes

- fix(tags-input): Ensure reactivity works correctly with stores ([#171](https://github.com/ieedan/shadcn-svelte-extras/pull/171))

## 2.0.4

### Patch Changes

- chore: bump deps ([#168](https://github.com/ieedan/shadcn-svelte-extras/pull/168))

## 2.0.3

### Patch Changes

- chore: update readme badges ([#164](https://github.com/ieedan/shadcn-svelte-extras/pull/164))

## 2.0.2

### Patch Changes

- fix: fix phone-input auto focus ([#159](https://github.com/ieedan/shadcn-svelte-extras/pull/159))

- chore: bump mode-watcher to v1 ([#159](https://github.com/ieedan/shadcn-svelte-extras/pull/159))

- chore: bump deps ([#159](https://github.com/ieedan/shadcn-svelte-extras/pull/159))

## 2.0.1

### Patch Changes

- chore: bump jsrepo to official release ([#157](https://github.com/ieedan/shadcn-svelte-extras/pull/157))

## 2.0.0

### Major Changes

- breaking: host on jsrepo.com. You can now add with `jsrepo add --repo @ieedan/shadcn-svelte-extras` ([#155](https://github.com/ieedan/shadcn-svelte-extras/pull/155))
