import fs            from 'fs';
import path          from 'path';
import matter        from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const BLOG_PATH = path.join(process.cwd(), 'content', 'blog');

// ---------- helpers ----------
export function getPostSlugs() {
  return fs.readdirSync(BLOG_PATH);
}

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx?$/, '');
  const fullPath = path.join(BLOG_PATH, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);
  const mdxSource = await serialize(content);

  return {
    frontMatter: data as {
      title: string;
      excerpt: string;
      date: string;
      tags?: string[];
    },
    mdxSource,
    slug: realSlug,
  };
}

export async function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = await Promise.all(slugs.map(getPostBySlug));
  // newest first
  return posts.sort(
    (a, b) =>
      Number(new Date(b.frontMatter.date)) -
      Number(new Date(a.frontMatter.date))
  );
}

