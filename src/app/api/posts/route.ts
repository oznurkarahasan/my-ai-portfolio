import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog-loader';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const language = searchParams.get('language') || undefined;

        const posts = getAllPosts(language);
        return NextResponse.json({ posts });
    } catch (error) {
        console.error('Error in /api/posts:', error);
        return NextResponse.json({ posts: [], error: 'Failed to load posts' }, { status: 500 });
    }
}
