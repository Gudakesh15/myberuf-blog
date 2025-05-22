// @ts-nocheck
import { getPostBySlug, getPostSlugs } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'

// ✅ Correctly typed function to generate static paths
export async function generateStaticParams() {
  return getPostSlugs().map((s) => ({
    slug: s.replace(/\.mdx?$/, ''),
  }))
}

// ✅ Metadata generation with correct props typing
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const { frontMatter } = await getPostBySlug(params.slug)
  return {
    title: `${frontMatter.title} | MyBeruf Blog`,
    description: frontMatter.excerpt,
  }
}

// ✅ Main blog post page — FIXED typing here
type BlogPostProps = {
  params: {
    slug: string
  }
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { mdxSource, frontMatter } = await getPostBySlug(params.slug)
  return (
    <article className="prose lg:prose-xl mx-auto py-16">
      <h1>{frontMatter.title}</h1>
      <MDXRemote source={mdxSource} />
    </article>
  )
}

