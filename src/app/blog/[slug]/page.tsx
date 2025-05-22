// src/app/blog/[slug]/page.tsx
import { getPostBySlug, getPostSlugs } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'

// 1) Build-time list of slugs
export async function generateStaticParams() {
  return getPostSlugs().map((name) => ({
    slug: name.replace(/\.mdx?$/, ''),
  }))
}

// 2) Metadata for each page
export async function generateMetadata(props: any): Promise<Metadata> {
  // props.params.slug is guaranteed
  const { frontMatter } = await getPostBySlug(props.params.slug)
  return {
    title: `${frontMatter.title} | MyBeruf Blog`,
    description: frontMatter.excerpt,
  }
}

// 3) Page component: accept the full props object
export default async function BlogPost(props: any) {
  const slug: string = props.params.slug
  const { mdxSource, frontMatter } = await getPostBySlug(slug)

  return (
    <article className="prose lg:prose-xl mx-auto py-16">
      <h1>{frontMatter.title}</h1>
      <MDXRemote source={mdxSource} />
    </article>
  )
}

