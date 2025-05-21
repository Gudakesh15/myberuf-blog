import { getPostBySlug, getPostSlugs } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'

type PageProps = {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

// ---------- static params ----------
export async function generateStaticParams() {
  return getPostSlugs().map((s) => ({
    slug: s.replace(/\.mdx?$/, ''),
  }))
}

// ---------- metadata ----------
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { frontMatter } = await getPostBySlug(params.slug)
  return {
    title: `${frontMatter.title} | MyBeruf Blog`,
    description: frontMatter.excerpt,
  }
}

// ---------- page component ----------
export default async function BlogPost({ params }: PageProps) {
  const { mdxSource, frontMatter } = await getPostBySlug(params.slug)

  return (
    <article className="prose lg:prose-xl mx-auto py-16">
      <h1>{frontMatter.title}</h1>
      <MDXRemote source={mdxSource} />
    </article>
  )
}

