import { MetadataRoute } from 'next'
import { createClient } from '@/utils/supabase/server'
import { siteConfig } from '@/lib/data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()
  
  // Base static routes with optimized priorities
  const routes = [
    { route: '', priority: 1.0, changeFrequency: 'daily' as const },
    { route: '/gereja-klodran-bantul', priority: 0.95, changeFrequency: 'weekly' as const },
    { route: '/jadwal', priority: 0.95, changeFrequency: 'weekly' as const },
    { route: '/profil', priority: 0.9, changeFrequency: 'monthly' as const },
    { route: '/profil/sejarah', priority: 0.85, changeFrequency: 'monthly' as const },
    { route: '/profil/visi-misi', priority: 0.85, changeFrequency: 'monthly' as const },
    { route: '/profil/pastor', priority: 0.85, changeFrequency: 'monthly' as const },
    { route: '/profil/lingkungan', priority: 0.8, changeFrequency: 'monthly' as const },
    { route: '/warta', priority: 0.9, changeFrequency: 'daily' as const },
    { route: '/galeri', priority: 0.75, changeFrequency: 'weekly' as const },
    { route: '/unduhan', priority: 0.7, changeFrequency: 'monthly' as const },
    { route: '/kontak', priority: 0.8, changeFrequency: 'monthly' as const },
  ].map(({ route, priority, changeFrequency }) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency,
    priority,
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
