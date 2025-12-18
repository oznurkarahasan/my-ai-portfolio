import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
    slug: string;
    title: string;
    summary: string;
    date: string;
    link?: string;
    content: string;
    language?: string;
}

const postsDirectory = path.join(process.cwd(), 'src/posts');

export function getAllPosts(language?: string): BlogPost[] {
    try {
        // Check if directory exists
        if (!fs.existsSync(postsDirectory)) {
            return [];
        }

        const fileNames = fs.readdirSync(postsDirectory);
        const allPostsData = fileNames
            .filter(fileName => fileName.endsWith('.md'))
            .map(fileName => {
                // Remove ".md" from file name to get slug
                const slug = fileName.replace(/\.md$/, '');

                // Read markdown file as string
                const fullPath = path.join(postsDirectory, fileName);
                const fileContents = fs.readFileSync(fullPath, 'utf8');

                // Use gray-matter to parse the post metadata section
                const { data, content } = matter(fileContents);

                // Combine the data with the slug and content
                return {
                    slug,
                    title: data.title || 'Untitled',
                    summary: data.summary || '',
                    date: data.date || '',
                    link: data.link,
                    content,
                    language: data.language || 'en',
                } as BlogPost;
            });

        // Filter by language if specified
        const filteredPosts = language
            ? allPostsData.filter(post => post.language === language)
            : allPostsData;

        // Sort posts by date (newest first)
        return filteredPosts.sort((a, b) => {
            if (a.date < b.date) {
                return 1;
            } else {
                return -1;
            }
        });
    } catch (error) {
        console.error('Error loading blog posts:', error);
        return [];
    }
}

export function getPostBySlug(slug: string): BlogPost | null {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.md`);

        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            title: data.title || 'Untitled',
            summary: data.summary || '',
            date: data.date || '',
            link: data.link,
            content,
        } as BlogPost;
    } catch (error) {
        console.error(`Error loading post ${slug}:`, error);
        return null;
    }
}
