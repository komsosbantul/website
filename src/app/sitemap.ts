import { MetadataRoute } from 'next'
import { createClient } from '@/utils/supabase/server'
import { siteConfig } from '@/lib/data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()
  
  // Base static routes
  const routes = [
    '',
    '/profil',
    '/profil/sejarah',
    '/profil/visi-misi',
    '/profil/pastor',
    '/profil/lingkungan',
    '/jadwal',
    '/galeri',
    '/warta',
    '/unduhan',
    '/kontak'
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Fetch dynamic news articles from Supabase
  try {
    const { data: newsArticles } = await supabase
      .from('news_articles')
      .select('id, updated_at, created_at')
      .order('created_at', { ascending: false })

    if (newsArticles && newsArticles.length > 0) {
      const dynamicNewsRoutes = newsArticles.map((article) => ({
        url: `${siteConfig.url}/warta/${article.id}`,
        lastModified: new Date(article.updated_at || article.created_at).toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
      
      return [...routes, ...dynamicNewsRoutes]
    }
  } catch (error) {
    console.error("Failed to fetch news for sitemap:", error)
  }

  return routes
}
