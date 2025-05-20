import { getPostBySlug, getPostSlugs } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return getPostSlugs().map((s) => ({
    slug: s.replace(/\.mdx?$/, ''),
  }))
}

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

