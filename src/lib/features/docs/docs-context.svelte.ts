import { Context } from "runed";
import { page } from "$app/state";
import type { CurrentDoc } from "./types";

class DocsContext {
    constructor() {
        if (!page.url.pathname.startsWith('/docs')) {
            throw new Error('Docs context can only be used in docs pages');
        }
    }

    get doc() {
        return page.data.doc as CurrentDoc
    }
}

export const DocsCtx = new Context<DocsContext>('docs-context');

export function setupDocs() {
    return DocsCtx.set(new DocsContext());
}

export function useDocs() {
    return DocsCtx.get();
}