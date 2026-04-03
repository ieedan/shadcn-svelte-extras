import { getDocMarkdown } from '$lib/features/docs/markdown/get-doc-markdown';

export async function GET({ params }) {
    const markdown = await getDocMarkdown(params.slug)

    if (!markdown) {
        return new Response('Not Found', { status: 404 })
    }

    return new Response(markdown, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } })
}