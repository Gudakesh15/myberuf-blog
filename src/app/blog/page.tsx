import { getAllPosts } from '@/lib/mdx'
import Link from 'next/link'

export const metadata = {
  title: 'Blog | MyBeruf',
  description: 'Practical German for work — weekly tips & phrases.',
}

export default async function BlogIndex() {
  const posts = await getAllPosts()

  return (
    <div className="max-w-3xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>

      <ul className="space-y-8">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="group">
              <h2 className="text-2xl font-semibold 
group-hover:text-[#0055B8]">
                {p.frontMatter.title}
              </h2>
              <p className="text-gray-600">{p.frontMatter.excerpt}</p>
              <span className="text-sm text-gray-400">
                {new Date(p.frontMatter.date).toLocaleDateString('de-DE')}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

