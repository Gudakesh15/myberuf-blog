// src/app/blog/[slug]/page.tsx
import { getPostBySlug, getPostSlugs } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'

// 1) Tell Next.js which slugs to pre-render at build time
export async function generateStaticParams() {
  return getPostSlugs()
    .map((filename) => filename.replace(/\.mdx?$/, ''))
    .map((slug) => ({ slug }))
}

// 2) Provide page-specific meta tags
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { frontMatter } = await getPostBySlug(params.slug)
  return {
    title: `${frontMatter.title} | MyBeruf Blog`,
    description: frontMatter.excerpt,
  }
}

// 3) The actual page component: Next injects { params }
//    No extra properties, no custom types—just inline.
export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  const { mdxSource, frontMatter } = await getPostBySlug(params.slug)

  return (
    <article className="prose lg:prose-xl mx-auto py-16">
      <h1>{frontMatter.title}</h1>
      <MDXRemote source={mdxSource} />
    </article>
  )
}

