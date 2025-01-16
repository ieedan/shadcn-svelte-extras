import TextAreaAutoSize from './textarea-autosize.svelte';

export { TextAreaAutoSize };

export type WithTextAreaAutoSize<T, _U extends HTMLElement = HTMLElement> = T & {
    autosize?: boolean;
};